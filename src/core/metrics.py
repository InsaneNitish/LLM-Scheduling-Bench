"""
MetricsCollector: aggregates per-request metrics and computes summary statistics.

Supports TTFT, TPOT, E2E latency, waiting time, throughput, and
percentile breakdowns (p50, p95, p99).
"""
from __future__ import annotations

import json
import logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional

import numpy as np

from src.core.request import Request

logger = logging.getLogger(__name__)


@dataclass
class MetricsSummary:
    """Summary statistics for a set of completed requests."""
    count: int = 0
    throughput: float = 0.0  # requests / second

    ttft_mean: float = 0.0
    ttft_p50: float = 0.0
    ttft_p95: float = 0.0
    ttft_p99: float = 0.0

    tpot_mean: float = 0.0
    tpot_p50: float = 0.0
    tpot_p95: float = 0.0
    tpot_p99: float = 0.0

    e2e_mean: float = 0.0
    e2e_p50: float = 0.0
    e2e_p95: float = 0.0
    e2e_p99: float = 0.0

    waiting_mean: float = 0.0
    waiting_p50: float = 0.0
    waiting_p95: float = 0.0
    waiting_p99: float = 0.0

    def to_dict(self) -> dict:
        """Serialize to dictionary."""
        return {
            "count": self.count,
            "throughput_rps": round(self.throughput, 4),
            "ttft": {"mean": round(self.ttft_mean, 4), "p50": round(self.ttft_p50, 4),
                     "p95": round(self.ttft_p95, 4), "p99": round(self.ttft_p99, 4)},
            "tpot": {"mean": round(self.tpot_mean, 4), "p50": round(self.tpot_p50, 4),
                     "p95": round(self.tpot_p95, 4), "p99": round(self.tpot_p99, 4)},
            "e2e_latency": {"mean": round(self.e2e_mean, 4), "p50": round(self.e2e_p50, 4),
                            "p95": round(self.e2e_p95, 4), "p99": round(self.e2e_p99, 4)},
            "waiting_time": {"mean": round(self.waiting_mean, 4), "p50": round(self.waiting_p50, 4),
                             "p95": round(self.waiting_p95, 4), "p99": round(self.waiting_p99, 4)},
        }


class MetricsCollector:
    """
    Collects completed requests and computes aggregate metrics.

    Usage:
        collector = MetricsCollector()
        collector.add(completed_request)
        summary = collector.summarize()
    """

    def __init__(self) -> None:
        self._completed: List[Request] = []

    def add(self, request: Request) -> None:
        """Add a completed request to the collector."""
        if request.finish_time is None:
            logger.warning("Adding incomplete request %s to metrics", request.id)
        self._completed.append(request)

    @property
    def completed_count(self) -> int:
        """Number of completed requests."""
        return len(self._completed)

    @property
    def completed_requests(self) -> List[Request]:
        """List of completed requests."""
        return list(self._completed)

    def clear(self) -> None:
        """Clear all collected data."""
        self._completed.clear()

    def summarize(self, exclude_warmup: int = 0) -> MetricsSummary:
        """
        Compute summary statistics.

        Args:
            exclude_warmup: Number of initial requests to exclude from statistics.

        Returns:
            MetricsSummary with all computed statistics.
        """
        requests = self._completed[exclude_warmup:]
        if not requests:
            return MetricsSummary()

        summary = MetricsSummary(count=len(requests))

        # Throughput: completed requests / total time span
        arrivals = [r.arrival_time for r in requests]
        finishes = [r.finish_time for r in requests if r.finish_time is not None]
        if finishes and arrivals:
            time_span = max(finishes) - min(arrivals)
            if time_span > 0:
                summary.throughput = len(finishes) / time_span

        # TTFT
        ttfts = [r.ttft for r in requests if r.ttft is not None]
        if ttfts:
            summary.ttft_mean = float(np.mean(ttfts))
            summary.ttft_p50 = float(np.percentile(ttfts, 50))
            summary.ttft_p95 = float(np.percentile(ttfts, 95))
            summary.ttft_p99 = float(np.percentile(ttfts, 99))

        # TPOT
        tpots = [r.tpot for r in requests if r.tpot is not None]
        if tpots:
            summary.tpot_mean = float(np.mean(tpots))
            summary.tpot_p50 = float(np.percentile(tpots, 50))
            summary.tpot_p95 = float(np.percentile(tpots, 95))
            summary.tpot_p99 = float(np.percentile(tpots, 99))

        # E2E Latency
        e2es = [r.e2e_latency for r in requests if r.e2e_latency is not None]
        if e2es:
            summary.e2e_mean = float(np.mean(e2es))
            summary.e2e_p50 = float(np.percentile(e2es, 50))
            summary.e2e_p95 = float(np.percentile(e2es, 95))
            summary.e2e_p99 = float(np.percentile(e2es, 99))

        # Waiting time
        waits = [r.waiting_time for r in requests if r.waiting_time is not None]
        if waits:
            summary.waiting_mean = float(np.mean(waits))
            summary.waiting_p50 = float(np.percentile(waits, 50))
            summary.waiting_p95 = float(np.percentile(waits, 95))
            summary.waiting_p99 = float(np.percentile(waits, 99))

        return summary

    def to_records(self, exclude_warmup: int = 0) -> List[dict]:
        """Export per-request metrics as list of dicts (for CSV/DataFrame)."""
        return [r.to_dict() for r in self._completed[exclude_warmup:]]
