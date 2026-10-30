"""
Concurrent Demo: Demonstrates Head-of-Line (HoL) blocking and scheduler interleaving.

Sends 4 concurrent requests to /generate:
  - Request 1: Long prompt (~250 words asking for summary)
  - Requests 2, 3, 4: Short interactive prompts ("What is 2+2?", "Name a color.", "Say hello.")
    dispatched 0.3s apart.

Dependencies: httpx and standard library only.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import threading
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

try:
    import httpx
except ImportError:
    print("[ERROR] httpx is required. Install it using: pip install httpx", file=sys.stderr)
    sys.exit(1)

# ~250 words of readable text asking for a summary
LONG_PROMPT_TEXT = (
    "Please provide a clear and concise summary of the following passage on cloud computing architectures:\n\n"
    "In large language model serving architectures, scheduling algorithms play a fundamental role in arbitrating "
    "access to shared computational accelerators such as graphics processing units. Deep learning inference diverges "
    "sharply from conventional web service request lifecycles due to its two-phase execution profile: an initial compute-heavy "
    "prefill phase followed by an autoregressive memory-bandwidth-bound decode phase. During prefill, the entire input prompt "
    "is ingested concurrently, exercising matrix multiplication units at peak computational intensity. Conversely, each decode step "
    "generates merely one token per sequence, repeatedly loading high-dimensional weight matrices and key-value cache memory from "
    "device high-bandwidth memory into fast register files. Under naive first-come first-served queue disciplines, a long document "
    "summarization query monopolizes the execution pipeline, inducing severe head-of-line blocking for subsequent lightweight interactive "
    "queries. Modern iteration-level serving systems address this structural deficiency by decomposing the scheduling granularity down "
    "to individual forward-pass steps. By employing preemptive round-robin time slicing, dynamic prompt aging, and chunked prefill pipelining, "
    "multi-tenant cloud inference platforms can dramatically attenuate time-to-first-token latency while preserving high hardware utilization "
    "and steady per-token generation speeds across heterogeneous production workloads."
)


def check_server_health(base_url: str) -> Dict[str, Any]:
    """Check server health probe or exit with clear error message if unreachable."""
    try:
        with httpx.Client(timeout=10.0) as client:
            resp = client.get(f"{base_url}/health")
            resp.raise_for_status()
            return resp.json()
    except Exception as exc:
        print(f"\n[ERROR] Server at {base_url} is unreachable: {exc}", file=sys.stderr)
        print("Please start the server first before running this script.\n", file=sys.stderr)
        sys.exit(1)


def set_server_policy(client: httpx.Client, base_url: str, policy: str) -> None:
    """Set active policy on server via POST /policy."""
    resp = client.post(f"{base_url}/policy", json={"policy": policy}, timeout=30.0)
    resp.raise_for_status()


def send_single_request(
    base_url: str,
    label: str,
    prompt: str,
    max_tokens: int,
    policy: str,
    results_list: List[Dict[str, Any]],
    index: int,
) -> None:
    """Send a single /generate request and record response metrics."""
    t_start = time.time()
    try:
        with httpx.Client(timeout=300.0) as client:
            resp = client.post(
                f"{base_url}/generate",
                json={"prompt": prompt, "max_tokens": max_tokens},
            )
            resp.raise_for_status()
            data = resp.json()

            raw_text = data.get("text", "")
            first_60 = raw_text.strip().replace("\n", " ")[:60]

            record = {
                "index": index,
                "label": label,
                "policy": policy,
                "ttft": float(data.get("ttft", 0.0)),
                "waiting_time": float(data.get("waiting_time", 0.0)),
                "e2e_latency": float(data.get("e2e_latency", 0.0)),
                "tokens": int(data.get("tokens", 0)),
                "simulated": bool(data.get("simulated", True)),
                "text_snippet": first_60,
                "wall_time": time.time() - t_start,
                "error": None,
            }
            results_list.append(record)
    except Exception as exc:
        results_list.append({
            "index": index,
            "label": label,
            "policy": policy,
            "ttft": 0.0,
            "waiting_time": 0.0,
            "e2e_latency": 0.0,
            "tokens": 0,
            "simulated": True,
            "text_snippet": f"ERROR: {exc}",
            "wall_time": time.time() - t_start,
            "error": str(exc),
        })


def run_scenario(
    base_url: str,
    policy: str,
    max_tokens: int,
) -> List[Dict[str, Any]]:
    """
    Run one scenario for a policy:
    Sets policy, then dispatches 4 requests (1 long, 3 short spaced 0.3s apart).
    Waits for all requests to finish before returning.
    """
    with httpx.Client(timeout=30.0) as client:
        set_server_policy(client, base_url, policy)

    print(f"\n>>> Running Scenario for Policy: {policy.upper()}")
    print("Dispatched 1 Long request (~250 words) and 3 Short queries (0.3s apart)...")

    workload = [
        (1, "Long prompt (summary)", LONG_PROMPT_TEXT),
        (2, "Short prompt 1 (2+2)", "What is 2+2?"),
        (3, "Short prompt 2 (color)", "Name a color."),
        (4, "Short prompt 3 (hello)", "Say hello."),
    ]

    records: List[Dict[str, Any]] = []
    threads: List[threading.Thread] = []

    for idx, label, prompt in workload:
        t = threading.Thread(
            target=send_single_request,
            args=(base_url, label, prompt, max_tokens, policy, records, idx),
            name=f"worker-{policy}-{idx}",
        )
        threads.append(t)
        t.start()
        # Stagger subsequent requests by 0.3s
        time.sleep(0.3)

    # Wait for all 4 requests to finish before returning
    for t in threads:
        t.join()

    # Sort by original request index
    records.sort(key=lambda r: r["index"])

    # Print scenario table
    print(f"\nResults for Policy: {policy.upper()}")
    print("-" * 115)
    print(f"{'#':<3} {'Label':<25} {'TTFT (s)':<10} {'Wait (s)':<10} {'E2E (s)':<10} {'Tokens':<8} {'Simulated':<11} {'First 60 chars of text'}")
    print("-" * 115)
    for r in records:
        print(
            f"{r['index']:<3} {r['label']:<25} {r['ttft']:<10.4f} {r['waiting_time']:<10.4f} "
            f"{r['e2e_latency']:<10.4f} {r['tokens']:<8} {str(r['simulated']):<11} \"{r['text_snippet']}\""
        )
    print("-" * 115)

    return records


def main() -> None:
    parser = argparse.ArgumentParser(description="Concurrent request benchmark for LLM Scheduler Bench")
    parser.add_argument("--url", default="http://localhost:8000", help="Base URL of server (default: http://localhost:8000)")
    parser.add_argument("--policy", default="round_robin", choices=["fcfs", "round_robin", "spf", "decode_first"], help="Active policy to test (default: round_robin)")
    parser.add_argument("--compare", action="store_true", help="Compare all four policies (fcfs, round_robin, spf, decode_first) and save results")
    parser.add_argument("--max-tokens", type=int, default=48, help="Max output tokens per request (default: 48)")
    parser.add_argument("--out-dir", default="results", help="Output directory for generated results (default: results)")
    args = parser.parse_args()

    # Verify server health first
    health = check_server_health(args.url)
    print("=" * 115)
    print(f"LLM Scheduler Bench — Concurrent Request Demo (Target: {args.url})")
    print(f"Server Status: OK | Backend: {health.get('backend', 'unknown')} | Simulated: {health.get('simulated', True)}")
    print("=" * 115)

    if not args.compare:
        run_scenario(args.url, policy=args.policy, max_tokens=args.max_tokens)
        return

    # Comparative evaluation across all four policies
    all_policies = ["fcfs", "round_robin", "spf", "decode_first"]
    all_records: List[Dict[str, Any]] = []
    matrix: Dict[str, Dict[str, Dict[str, float]]] = {}  # label -> policy -> {ttft, e2e}

    for policy in all_policies:
        scenario_records = run_scenario(args.url, policy=policy, max_tokens=args.max_tokens)
        all_records.extend(scenario_records)
        for r in scenario_records:
            lbl = r["label"]
            if lbl not in matrix:
                matrix[lbl] = {}
            matrix[lbl][policy] = {
                "ttft": r["ttft"],
                "e2e": r["e2e_latency"],
                "wait": r["waiting_time"],
            }
        # Pause briefly between policies to ensure complete engine drain
        time.sleep(0.5)

    # Print combined comparative table (TTFT)
    print("\n" + "=" * 115)
    print("SUMMARY COMPARISON: Time-To-First-Token (TTFT in seconds) Across Schedulers")
    print("=" * 115)
    print(f"{'Request Label':<28} {'FCFS':<14} {'Round-Robin':<14} {'SPF':<14} {'Decode-First':<14}")
    print("-" * 115)
    for lbl, pdata in matrix.items():
        fcfs_ttft = pdata.get("fcfs", {}).get("ttft", 0.0)
        rr_ttft = pdata.get("round_robin", {}).get("ttft", 0.0)
        spf_ttft = pdata.get("spf", {}).get("ttft", 0.0)
        df_ttft = pdata.get("decode_first", {}).get("ttft", 0.0)
        print(f"{lbl:<28} {fcfs_ttft:<14.4f} {rr_ttft:<14.4f} {spf_ttft:<14.4f} {df_ttft:<14.4f}")
    print("=" * 115)

    # Ensure output directory exists
    out_path = Path(args.out_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    # Save raw records as JSON
    json_path = out_path / "real_concurrent_demo.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(all_records, f, indent=2)
    print(f"\n[Saved] Raw records saved to: {json_path}")

    # Save summary table as Markdown
    md_path = out_path / "real_concurrent_demo.md"
    md_lines = [
        "# Real Concurrent Demo Results",
        "",
        "Comparison of scheduling behavior with 1 long prompt and 3 short interactive prompts dispatched concurrently.",
        "",
        "### Time-To-First-Token (TTFT in seconds)",
        "",
        "| Request Label | FCFS | Round-Robin | SPF | Decode-First |",
        "|---|---|---|---|---|",
    ]
    for lbl, pdata in matrix.items():
        fcfs_val = f"{pdata.get('fcfs', {}).get('ttft', 0.0):.4f} s"
        rr_val = f"{pdata.get('round_robin', {}).get('ttft', 0.0):.4f} s"
        spf_val = f"{pdata.get('spf', {}).get('ttft', 0.0):.4f} s"
        df_val = f"{pdata.get('decode_first', {}).get('ttft', 0.0):.4f} s"
        md_lines.append(f"| **{lbl}** | {fcfs_val} | {rr_val} | {spf_val} | {df_val} |")

    md_lines.extend([
        "",
        "### End-to-End Latency (E2E in seconds)",
        "",
        "| Request Label | FCFS | Round-Robin | SPF | Decode-First |",
        "|---|---|---|---|---|",
    ])
    for lbl, pdata in matrix.items():
        fcfs_e2e = f"{pdata.get('fcfs', {}).get('e2e', 0.0):.4f} s"
        rr_e2e = f"{pdata.get('round_robin', {}).get('e2e', 0.0):.4f} s"
        spf_e2e = f"{pdata.get('spf', {}).get('e2e', 0.0):.4f} s"
        df_e2e = f"{pdata.get('decode_first', {}).get('e2e', 0.0):.4f} s"
        md_lines.append(f"| **{lbl}** | {fcfs_e2e} | {rr_e2e} | {spf_e2e} | {df_e2e} |")

    with open(md_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines) + "\n")
    print(f"[Saved] Markdown summary saved to: {md_path}")


if __name__ == "__main__":
    main()
