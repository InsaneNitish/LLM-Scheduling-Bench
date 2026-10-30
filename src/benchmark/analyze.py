"""
Analysis and visualization for LLM scheduling benchmark results.

Reads per-request CSV and summary JSON from /results, generates publication-quality
graphs to /plots, and writes a markdown results table.

Plots generated:
  1. TTFT vs load per policy (mean and p99)
  2. Throughput bar chart
  3. Waiting-time CDF
  4. Short-vs-long fairness plot
  5. RR quantum sweep
  6. Timeline/Gantt chart for a small example
  7. E2E latency comparison
  8. TPOT comparison
"""
from __future__ import annotations

import argparse
import csv
import json
import logging
import os
import sys
from pathlib import Path
from typing import Dict, List, Optional

import matplotlib
matplotlib.use("Agg")  # Non-interactive backend
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(name)s] %(levelname)s: %(message)s")

RESULTS_DIR = Path(os.environ.get("RESULTS_DIR", "/results"))
PLOTS_DIR = Path(os.environ.get("PLOTS_DIR", "/plots"))

# Color palette for policies
POLICY_COLORS = {
    "fcfs": "#E74C3C",
    "round_robin": "#3498DB",
    "spf": "#2ECC71",
    "decode_first": "#9B59B6",
}
POLICY_LABELS = {
    "fcfs": "FCFS",
    "round_robin": "Round Robin",
    "spf": "Shortest Prompt First",
    "decode_first": "Decode First",
}


def setup_style():
    """Set up matplotlib style for publication-quality plots."""
    plt.style.use("seaborn-v0_8-whitegrid")
    plt.rcParams.update({
        "figure.figsize": (10, 6),
        "figure.dpi": 150,
        "font.size": 12,
        "axes.titlesize": 14,
        "axes.labelsize": 12,
        "legend.fontsize": 10,
        "xtick.labelsize": 10,
        "ytick.labelsize": 10,
        "figure.facecolor": "white",
        "axes.facecolor": "#FAFAFA",
        "grid.alpha": 0.3,
    })


def load_summary(experiment: str) -> List[Dict]:
    """Load summary JSON for an experiment."""
    path = RESULTS_DIR / f"{experiment}_summary.json"
    if not path.exists():
        logger.warning("Summary not found: %s", path)
        return []
    with open(path) as f:
        return json.load(f)


def load_requests(experiment: str) -> pd.DataFrame:
    """Load per-request CSV for an experiment."""
    path = RESULTS_DIR / f"{experiment}_requests.csv"
    if not path.exists():
        logger.warning("Requests CSV not found: %s", path)
        return pd.DataFrame()
    return pd.read_csv(path)


def plot_ttft_vs_load(summaries: List[Dict], output_path: Path) -> None:
    """Plot TTFT (mean and p99) vs arrival rate for each policy."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    for policy in POLICY_COLORS:
        data = [s for s in summaries if s["policy"] == policy]
        if not data:
            continue

        # Group by arrival rate, average across seeds
        rates = sorted(set(s["variable_value"] for s in data if s.get("variable") == "arrival_rate"))
        if not rates:
            rates = sorted(set(s["arrival_rate"] for s in data))

        means = []
        p99s = []
        stds = []
        for rate in rates:
            matching = [s for s in data if (s.get("variable_value") == rate or s["arrival_rate"] == rate)]
            ttft_means = [s["summary"]["ttft"]["mean"] for s in matching]
            ttft_p99s = [s["summary"]["ttft"]["p99"] for s in matching]
            means.append(np.mean(ttft_means))
            stds.append(np.std(ttft_means))
            p99s.append(np.mean(ttft_p99s))

        label = POLICY_LABELS.get(policy, policy)
        color = POLICY_COLORS[policy]
        ax1.errorbar(rates, means, yerr=stds, marker="o", label=label, color=color,
                     capsize=3, linewidth=2, markersize=6)
        ax2.plot(rates, p99s, marker="s", label=label, color=color, linewidth=2, markersize=6)

    ax1.set_xlabel("Arrival Rate (req/s)")
    ax1.set_ylabel("Mean TTFT (s)")
    ax1.set_title("Mean TTFT vs Load")
    ax1.legend()
    ax1.set_xscale("log", base=2)

    ax2.set_xlabel("Arrival Rate (req/s)")
    ax2.set_ylabel("p99 TTFT (s)")
    ax2.set_title("p99 TTFT vs Load")
    ax2.legend()
    ax2.set_xscale("log", base=2)

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches="tight")
    plt.close()
    logger.info("Saved: %s", output_path)


def plot_throughput_bar(summaries: List[Dict], output_path: Path) -> None:
    """Plot throughput bar chart across policies."""
    fig, ax = plt.subplots(figsize=(10, 6))

    policies = list(POLICY_COLORS.keys())
    # Use moderate load (arrival_rate=2.0) if available
    target_rate = 2.0

    throughputs = {}
    errors = {}
    for policy in policies:
        data = [s for s in summaries if s["policy"] == policy
                and (s.get("variable_value") == target_rate or s.get("arrival_rate") == target_rate)]
        if data:
            vals = [s["summary"]["throughput_rps"] for s in data]
            throughputs[policy] = np.mean(vals)
            errors[policy] = np.std(vals)

    if not throughputs:
        # Fall back to whatever data we have
        for policy in policies:
            data = [s for s in summaries if s["policy"] == policy]
            if data:
                vals = [s["summary"]["throughput_rps"] for s in data]
                throughputs[policy] = np.mean(vals)
                errors[policy] = np.std(vals)

    x = np.arange(len(throughputs))
    labels = [POLICY_LABELS.get(p, p) for p in throughputs.keys()]
    colors = [POLICY_COLORS.get(p, "#999") for p in throughputs.keys()]

    bars = ax.bar(x, list(throughputs.values()), yerr=list(errors.values()),
                  color=colors, capsize=5, edgecolor="white", linewidth=1.5)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, rotation=15)
    ax.set_ylabel("Throughput (req/s)")
    ax.set_title("Throughput by Policy (Simulated)")

    # Add value labels
    for bar, val in zip(bars, throughputs.values()):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.02,
                f"{val:.2f}", ha="center", va="bottom", fontsize=10)

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches="tight")
    plt.close()
    logger.info("Saved: %s", output_path)


def plot_waiting_time_cdf(df: pd.DataFrame, output_path: Path) -> None:
    """Plot waiting-time CDF for each policy."""
    fig, ax = plt.subplots(figsize=(10, 6))

    for policy in POLICY_COLORS:
        subset = df[df["policy"] == policy]
        if subset.empty:
            continue
        waits = subset["waiting_time"].dropna().sort_values()
        if waits.empty:
            continue
        cdf = np.arange(1, len(waits) + 1) / len(waits)
        ax.plot(waits.values, cdf, label=POLICY_LABELS.get(policy, policy),
                color=POLICY_COLORS[policy], linewidth=2)

    ax.set_xlabel("Waiting Time (s)")
    ax.set_ylabel("CDF")
    ax.set_title("Waiting Time Distribution (CDF)")
    ax.legend()
    ax.set_ylim(0, 1.05)

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches="tight")
    plt.close()
    logger.info("Saved: %s", output_path)


def plot_fairness(df: pd.DataFrame, output_path: Path) -> None:
    """Plot short-vs-long prompt fairness: TTFT by prompt length category."""
    fig, ax = plt.subplots(figsize=(12, 6))

    # Categorize by prompt length
    df = df.copy()
    df["prompt_category"] = df["prompt_tokens"].apply(
        lambda x: "Short (≤50)" if x <= 50 else "Long (>50)"
    )

    policies = [p for p in POLICY_COLORS if p in df["policy"].unique()]
    categories = ["Short (≤50)", "Long (>50)"]
    x = np.arange(len(policies))
    width = 0.35

    for i, cat in enumerate(categories):
        means = []
        stds = []
        for policy in policies:
            subset = df[(df["policy"] == policy) & (df["prompt_category"] == cat)]
            ttfts = subset["ttft"].dropna()
            means.append(ttfts.mean() if not ttfts.empty else 0)
            stds.append(ttfts.std() if not ttfts.empty else 0)

        offset = (i - 0.5) * width
        bars = ax.bar(x + offset, means, width, yerr=stds, label=cat,
                      capsize=3, alpha=0.85)

    ax.set_xticks(x)
    ax.set_xticklabels([POLICY_LABELS.get(p, p) for p in policies], rotation=15)
    ax.set_ylabel("Mean TTFT (s)")
    ax.set_title("Fairness: TTFT by Prompt Length (Short vs Long)")
    ax.legend()

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches="tight")
    plt.close()
    logger.info("Saved: %s", output_path)


def plot_rr_quantum_sweep(summaries: List[Dict], output_path: Path) -> None:
    """Plot RR quantum sensitivity: TTFT and TPOT vs quantum size."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    data = [s for s in summaries if s.get("variable") == "rr_quantum"]
    if not data:
        logger.warning("No RR quantum sweep data found")
        return

    quanta = sorted(set(s["variable_value"] for s in data))
    ttft_means = []
    tpot_means = []
    ttft_stds = []
    tpot_stds = []

    for q in quanta:
        matching = [s for s in data if s["variable_value"] == q]
        ttfts = [s["summary"]["ttft"]["mean"] for s in matching]
        tpots = [s["summary"]["tpot"]["mean"] for s in matching]
        ttft_means.append(np.mean(ttfts))
        ttft_stds.append(np.std(ttfts))
        tpot_means.append(np.mean(tpots))
        tpot_stds.append(np.std(tpots))

    color = POLICY_COLORS["round_robin"]
    ax1.errorbar(quanta, ttft_means, yerr=ttft_stds, marker="o", color=color,
                 capsize=3, linewidth=2, markersize=8)
    ax1.set_xlabel("Round-Robin Quantum (decode steps)")
    ax1.set_ylabel("Mean TTFT (s)")
    ax1.set_title("TTFT vs RR Quantum")

    ax2.errorbar(quanta, tpot_means, yerr=tpot_stds, marker="s", color=color,
                 capsize=3, linewidth=2, markersize=8)
    ax2.set_xlabel("Round-Robin Quantum (decode steps)")
    ax2.set_ylabel("Mean TPOT (s)")
    ax2.set_title("TPOT vs RR Quantum")

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches="tight")
    plt.close()
    logger.info("Saved: %s", output_path)


def plot_timeline_gantt(df: pd.DataFrame, output_path: Path, max_requests: int = 15) -> None:
    """Plot a timeline/Gantt chart showing request lifecycles."""
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    axes = axes.flatten()

    policies = [p for p in POLICY_COLORS if p in df["policy"].unique()]
    if not policies:
        return

    for idx, policy in enumerate(policies[:4]):
        ax = axes[idx]
        subset = df[df["policy"] == policy].head(max_requests).copy()
        if subset.empty:
            continue

        for i, (_, row) in enumerate(subset.iterrows()):
            arrival = row["arrival_time"]
            first_sched = row.get("first_scheduled", arrival)
            first_tok = row.get("first_token_time", first_sched)
            finish = row.get("finish_time", first_tok)

            # Handle NaN
            if pd.isna(first_sched):
                first_sched = arrival
            if pd.isna(first_tok):
                first_tok = first_sched
            if pd.isna(finish):
                finish = first_tok

            # Waiting
            ax.barh(i, first_sched - arrival, left=arrival, color="#FFA726",
                    alpha=0.7, height=0.6)
            # Prefill
            ax.barh(i, first_tok - first_sched, left=first_sched, color="#42A5F5",
                    alpha=0.7, height=0.6)
            # Decode
            ax.barh(i, finish - first_tok, left=first_tok, color="#66BB6A",
                    alpha=0.7, height=0.6)

        ax.set_xlabel("Time (s)")
        ax.set_ylabel("Request")
        ax.set_title(POLICY_LABELS.get(policy, policy))
        ax.invert_yaxis()

    # Legend
    patches = [
        mpatches.Patch(color="#FFA726", alpha=0.7, label="Waiting"),
        mpatches.Patch(color="#42A5F5", alpha=0.7, label="Prefill"),
        mpatches.Patch(color="#66BB6A", alpha=0.7, label="Decode"),
    ]
    fig.legend(handles=patches, loc="lower center", ncol=3, fontsize=12)
    plt.suptitle("Request Timeline (Gantt Chart)", fontsize=16, y=1.02)
    plt.tight_layout()
    plt.savefig(output_path, bbox_inches="tight")
    plt.close()
    logger.info("Saved: %s", output_path)


def plot_e2e_latency(summaries: List[Dict], output_path: Path) -> None:
    """Plot E2E latency vs load."""
    fig, ax = plt.subplots(figsize=(10, 6))

    for policy in POLICY_COLORS:
        data = [s for s in summaries if s["policy"] == policy]
        if not data:
            continue

        rates = sorted(set(s.get("variable_value", s["arrival_rate"]) for s in data
                           if s.get("variable") == "arrival_rate" or s.get("variable") is None))
        if not rates:
            continue

        means = []
        stds = []
        for rate in rates:
            matching = [s for s in data if (s.get("variable_value") == rate or s["arrival_rate"] == rate)]
            vals = [s["summary"]["e2e_latency"]["mean"] for s in matching]
            means.append(np.mean(vals))
            stds.append(np.std(vals))

        ax.errorbar(rates, means, yerr=stds, marker="o", label=POLICY_LABELS.get(policy, policy),
                    color=POLICY_COLORS[policy], capsize=3, linewidth=2, markersize=6)

    ax.set_xlabel("Arrival Rate (req/s)")
    ax.set_ylabel("Mean E2E Latency (s)")
    ax.set_title("E2E Latency vs Load")
    ax.legend()
    ax.set_xscale("log", base=2)

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches="tight")
    plt.close()
    logger.info("Saved: %s", output_path)


def generate_markdown_table(summaries: List[Dict], output_path: Path) -> None:
    """Generate a markdown results table."""
    lines = [
        "# Benchmark Results Summary",
        "",
        "**Note:** All results are from simulated workloads with assumed (uncalibrated) latency parameters.",
        "Values reflect relative policy behavior, not absolute real-world latency.",
        "",
    ]

    # Group by experiment
    experiments = {}
    for s in summaries:
        exp = s.get("experiment", "unknown")
        experiments.setdefault(exp, []).append(s)

    for exp_name, exp_data in sorted(experiments.items()):
        lines.append(f"## {exp_name}")
        lines.append("")
        lines.append("| Policy | Variable | Value | TTFT Mean | TTFT p99 | Throughput | E2E Mean | TPOT Mean | Wait Mean |")
        lines.append("|--------|----------|-------|-----------|----------|------------|----------|-----------|-----------|")

        for s in sorted(exp_data, key=lambda x: (x["policy"], str(x.get("variable_value", "")))):
            sm = s["summary"]
            lines.append(
                f"| {s['policy']} | {s.get('variable', '-')} | {s.get('variable_value', '-')} "
                f"| {sm['ttft']['mean']:.4f} | {sm['ttft']['p99']:.4f} "
                f"| {sm['throughput_rps']:.2f} | {sm['e2e_latency']['mean']:.4f} "
                f"| {sm['tpot']['mean']:.4f} | {sm['waiting_time']['mean']:.4f} |"
            )
        lines.append("")

    with open(output_path, "w") as f:
        f.write("\n".join(lines))
    logger.info("Saved: %s", output_path)


def main() -> None:
    """Main analysis entry point."""
    parser = argparse.ArgumentParser(description="LLM Scheduler Benchmark Analysis")
    parser.add_argument("--results-dir", type=str, default=str(RESULTS_DIR))
    parser.add_argument("--plots-dir", type=str, default=str(PLOTS_DIR))
    args = parser.parse_args()

    results_dir = Path(args.results_dir)
    plots_dir = Path(args.plots_dir)
    plots_dir.mkdir(parents=True, exist_ok=True)

    setup_style()

    # Collect all summaries and request data
    all_summaries = []
    all_requests = pd.DataFrame()

    for json_file in sorted(results_dir.glob("*_summary.json")):
        with open(json_file) as f:
            summaries = json.load(f)
            all_summaries.extend(summaries)

    for csv_file in sorted(results_dir.glob("*_requests.csv")):
        df = pd.read_csv(csv_file)
        all_requests = pd.concat([all_requests, df], ignore_index=True)

    if not all_summaries:
        logger.error("No results found in %s", results_dir)
        sys.exit(1)

    logger.info("Loaded %d summary entries and %d request records", len(all_summaries), len(all_requests))

    # Generate plots
    # 1. TTFT vs load (E1)
    e1_summaries = [s for s in all_summaries if s.get("experiment") == "E1_load_sweep"]
    if e1_summaries:
        plot_ttft_vs_load(e1_summaries, plots_dir / "ttft_vs_load.png")
        plot_e2e_latency(e1_summaries, plots_dir / "e2e_vs_load.png")

    # 2. Throughput bar chart
    e1_or_e2 = [s for s in all_summaries if s.get("experiment") in ("E1_load_sweep", "E2_prompt_mix")]
    if e1_or_e2:
        plot_throughput_bar(e1_or_e2, plots_dir / "throughput_bar.png")

    # 3. Waiting-time CDF
    if not all_requests.empty:
        plot_waiting_time_cdf(all_requests, plots_dir / "waiting_time_cdf.png")

    # 4. Fairness plot
    if not all_requests.empty:
        plot_fairness(all_requests, plots_dir / "fairness_short_vs_long.png")

    # 5. RR quantum sweep (E4)
    e4_summaries = [s for s in all_summaries if s.get("experiment") == "E4_rr_quantum"]
    if e4_summaries:
        plot_rr_quantum_sweep(e4_summaries, plots_dir / "rr_quantum_sweep.png")

    # 6. Timeline/Gantt chart
    if not all_requests.empty:
        # Use a single seed at moderate load for clarity
        gantt_df = all_requests[all_requests["seed"] == 42].copy()
        if not gantt_df.empty:
            plot_timeline_gantt(gantt_df, plots_dir / "timeline_gantt.png")

    # 7. Markdown results table
    generate_markdown_table(all_summaries, plots_dir / "results_table.md")

    logger.info("Analysis complete. Plots saved to %s", plots_dir)


if __name__ == "__main__":
    main()
