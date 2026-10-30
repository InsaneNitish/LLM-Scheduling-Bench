"""
Benchmark runner for LLM scheduling policies.

Runs experiments defined in configs/experiments.yaml using virtual-time mode
(discrete-event simulation). Outputs per-request CSV and summary JSON to /results.

Usage:
    python -m src.benchmark.run_benchmark [--mode sim|live] [--experiment E1_load_sweep]

Modes:
    sim  — Virtual-time simulation (default). Runs in seconds.
    live — Reserved for future real backend. Currently prints a message and exits.
"""
from __future__ import annotations

import argparse
import csv
import json
import logging
import os
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional

import yaml

# Add project root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from src.backend.sim import SimBackend
from src.core.metrics import MetricsCollector
from src.core.request import Request
from src.engine.engine import Engine
from src.scheduler.base import Scheduler
from src.scheduler.fcfs import FCFSScheduler
from src.scheduler.round_robin import RoundRobinScheduler
from src.scheduler.spf import SPFScheduler
from src.scheduler.decode_first import DecodeFirstScheduler
from src.workload.generator import WorkloadGenerator

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(name)s] %(levelname)s: %(message)s")

RESULTS_DIR = Path(os.environ.get("RESULTS_DIR", "/results"))
CONFIGS_DIR = Path(os.environ.get("CONFIGS_DIR", str(Path(__file__).resolve().parent.parent.parent / "configs")))


def create_scheduler(policy: str, **kwargs) -> Scheduler:
    """Create a scheduler by policy name."""
    if policy == "fcfs":
        return FCFSScheduler()
    elif policy == "round_robin":
        quantum = kwargs.get("rr_quantum", 4)
        return RoundRobinScheduler(quantum=quantum)
    elif policy == "spf":
        return SPFScheduler(aging_factor=kwargs.get("aging_factor", 1.0))
    elif policy == "decode_first":
        return DecodeFirstScheduler(chunk_size=kwargs.get("chunk_size", 64))
    else:
        raise ValueError(f"Unknown policy: {policy}")


def run_single_experiment(
    policy: str,
    arrival_rate: float,
    prompt_distribution: str,
    output_distribution: str,
    max_output_tokens: int,
    total_requests: int,
    warmup_requests: int,
    seed: int,
    burst_mode: bool = False,
    burst_size: int = 20,
    burst_interval: float = 5.0,
    **scheduler_kwargs,
) -> Dict:
    """
    Run a single experiment trial in virtual-time mode.

    Returns:
        Dictionary with summary metrics and per-request data.
    """
    # Generate workload
    gen = WorkloadGenerator(
        arrival_rate=arrival_rate,
        prompt_distribution=prompt_distribution,
        output_distribution=output_distribution,
        max_output_tokens=max_output_tokens,
        seed=seed,
        burst_mode=burst_mode,
        burst_size=burst_size,
        burst_interval=burst_interval,
    )
    requests = gen.generate(total_requests, warmup=warmup_requests)

    # Set policy on each request
    for r in requests:
        r.policy = policy

    # Create engine
    backend = SimBackend()
    scheduler = create_scheduler(policy, **scheduler_kwargs)
    metrics = MetricsCollector()
    engine = Engine(scheduler=scheduler, backend=backend, metrics=metrics)

    # Run
    start = time.time()
    engine.run_virtual(requests)
    wall_time = time.time() - start

    # Compute summary (exclude warmup)
    summary = metrics.summarize(exclude_warmup=warmup_requests)
    records = metrics.to_records(exclude_warmup=warmup_requests)

    return {
        "policy": policy,
        "arrival_rate": arrival_rate,
        "prompt_distribution": prompt_distribution,
        "output_distribution": output_distribution,
        "max_output_tokens": max_output_tokens,
        "total_requests": total_requests,
        "warmup_requests": warmup_requests,
        "seed": seed,
        "wall_time_seconds": round(wall_time, 3),
        "summary": summary.to_dict(),
        "records": records,
        **scheduler_kwargs,
    }


def run_experiment(experiment_name: str, experiment_config: Dict, defaults: Dict) -> List[Dict]:
    """Run all trials for an experiment (across policies, variable values, and seeds)."""
    results = []

    policies = experiment_config.get("policies", defaults.get("policies", ["fcfs"]))
    seeds = experiment_config.get("seeds", defaults.get("seeds", [42]))
    variable = experiment_config.get("variable", None)
    values = experiment_config.get("values", [None])
    total_requests = experiment_config.get("total_requests", defaults.get("total_requests", 200))
    warmup_requests = experiment_config.get("warmup_requests", defaults.get("warmup_requests", 10))

    # Base parameters
    base_params = {
        "arrival_rate": experiment_config.get("arrival_rate", defaults.get("arrival_rate", 2.0)),
        "prompt_distribution": experiment_config.get("prompt_distribution", defaults.get("prompt_distribution", "bimodal")),
        "output_distribution": experiment_config.get("output_distribution", defaults.get("output_distribution", "fixed")),
        "max_output_tokens": experiment_config.get("max_output_tokens", defaults.get("max_output_tokens", 128)),
        "burst_mode": experiment_config.get("burst_mode", False),
        "burst_size": experiment_config.get("burst_size", 20),
        "burst_interval": experiment_config.get("burst_interval", 5.0),
    }

    total_trials = len(policies) * len(values) * len(seeds)
    trial_num = 0

    for policy in policies:
        for value in values:
            for seed in seeds:
                trial_num += 1
                params = dict(base_params)
                scheduler_kwargs = {}

                # Set the variable
                if variable and value is not None:
                    if variable == "arrival_rate":
                        params["arrival_rate"] = value
                    elif variable == "prompt_distribution":
                        params["prompt_distribution"] = value
                    elif variable == "max_output_tokens":
                        params["max_output_tokens"] = value
                    elif variable == "rr_quantum":
                        scheduler_kwargs["rr_quantum"] = value
                    else:
                        params[variable] = value

                logger.info(
                    "[%s] Trial %d/%d: policy=%s, %s=%s, seed=%d",
                    experiment_name, trial_num, total_trials,
                    policy, variable, value, seed,
                )

                result = run_single_experiment(
                    policy=policy,
                    total_requests=total_requests,
                    warmup_requests=warmup_requests,
                    seed=seed,
                    **params,
                    **scheduler_kwargs,
                )
                result["experiment"] = experiment_name
                result["variable"] = variable
                result["variable_value"] = value
                results.append(result)

    return results


def save_results(results: List[Dict], experiment_name: str) -> None:
    """Save experiment results to CSV and JSON."""
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)

    # Save summary JSON
    summary_path = RESULTS_DIR / f"{experiment_name}_summary.json"
    summary_data = []
    for r in results:
        s = {k: v for k, v in r.items() if k != "records"}
        summary_data.append(s)
    with open(summary_path, "w") as f:
        json.dump(summary_data, f, indent=2, default=str)
    logger.info("Saved summary: %s", summary_path)

    # Save per-request CSV
    csv_path = RESULTS_DIR / f"{experiment_name}_requests.csv"
    all_records = []
    for r in results:
        for rec in r.get("records", []):
            rec["experiment"] = experiment_name
            rec["variable"] = r.get("variable")
            rec["variable_value"] = r.get("variable_value")
            rec["seed"] = r.get("seed")
            rec["arrival_rate"] = r.get("arrival_rate")
            all_records.append(rec)

    if all_records:
        with open(csv_path, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=all_records[0].keys())
            writer.writeheader()
            writer.writerows(all_records)
        logger.info("Saved per-request CSV: %s (%d records)", csv_path, len(all_records))


def main() -> None:
    """Main entry point for benchmark runner."""
    parser = argparse.ArgumentParser(description="LLM Scheduler Benchmark Runner")
    parser.add_argument("--mode", choices=["sim", "live"], default="sim",
                        help="Execution mode: sim (virtual-time) or live (reserved for real backend)")
    parser.add_argument("--experiment", type=str, default=None,
                        help="Run a specific experiment (e.g., E1_load_sweep). Default: all.")
    parser.add_argument("--config", type=str, default=None,
                        help="Path to experiments.yaml config file")
    args = parser.parse_args()

    if args.mode == "live":
        print("=" * 60)
        print("LIVE MODE NOT YET IMPLEMENTED")
        print("=" * 60)
        print()
        print("Live mode requires a real LLM backend (BACKEND=real).")
        print("This feature is reserved for future implementation.")
        print("See README.md 'Future Work: Real Model Integration' for details.")
        print()
        print("To run benchmarks with the simulated backend, use:")
        print("  python -m src.benchmark.run_benchmark --mode sim")
        sys.exit(0)

    # Load experiment config
    config_path = Path(args.config) if args.config else CONFIGS_DIR / "experiments.yaml"
    if not config_path.exists():
        logger.error("Config file not found: %s", config_path)
        sys.exit(1)

    with open(config_path) as f:
        config = yaml.safe_load(f)

    defaults = config.get("defaults", {})
    experiments = config.get("experiments", {})

    if args.experiment:
        if args.experiment not in experiments:
            logger.error("Unknown experiment: %s. Available: %s",
                         args.experiment, list(experiments.keys()))
            sys.exit(1)
        experiments = {args.experiment: experiments[args.experiment]}

    logger.info("Running %d experiment(s): %s", len(experiments), list(experiments.keys()))
    start_time = time.time()

    for exp_name, exp_config in experiments.items():
        logger.info("=" * 60)
        logger.info("Starting experiment: %s", exp_name)
        logger.info("Description: %s", exp_config.get("description", "N/A"))
        logger.info("=" * 60)

        results = run_experiment(exp_name, exp_config, defaults)
        save_results(results, exp_name)

    total_time = time.time() - start_time
    logger.info("All experiments complete in %.1fs. Results saved to %s", total_time, RESULTS_DIR)


if __name__ == "__main__":
    main()
