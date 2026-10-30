"""
Workload generator for LLM scheduling benchmarks.

Generates synthetic request traces with configurable:
  - Arrival pattern: Poisson (exponential inter-arrivals) or burst
  - Prompt-length distribution: short, long, bimodal (80/20)
  - Output-length distribution: fixed, uniform, or bimodal
  - Reproducible via fixed random seeds
"""
from __future__ import annotations

import logging
from typing import List, Literal, Optional

import numpy as np

from src.core.request import Request

logger = logging.getLogger(__name__)


class WorkloadGenerator:
    """
    Generates synthetic LLM inference request traces.

    Args:
        arrival_rate: Average requests per second (Poisson process).
        prompt_distribution: 'short' (10-50), 'long' (200-500), 'bimodal' (80/20 mix).
        output_distribution: 'fixed', 'uniform', 'bimodal'.
        max_output_tokens: Fixed output length (or mean for distributions).
        seed: Random seed for reproducibility.
        burst_mode: If True, use burst arrival pattern instead of Poisson.
        burst_size: Number of requests per burst.
        burst_interval: Seconds between burst centers.
    """

    def __init__(
        self,
        arrival_rate: float = 2.0,
        prompt_distribution: str = "bimodal",
        output_distribution: str = "fixed",
        max_output_tokens: int = 128,
        seed: int = 42,
        burst_mode: bool = False,
        burst_size: int = 20,
        burst_interval: float = 5.0,
    ) -> None:
        self.arrival_rate = arrival_rate
        self.prompt_distribution = prompt_distribution
        self.output_distribution = output_distribution
        self.max_output_tokens = max_output_tokens
        self.seed = seed
        self.burst_mode = burst_mode
        self.burst_size = burst_size
        self.burst_interval = burst_interval
        self.rng = np.random.RandomState(seed)

    def _sample_prompt_tokens(self) -> int:
        """Sample prompt length based on distribution."""
        if self.prompt_distribution == "short":
            return int(self.rng.uniform(10, 50))
        elif self.prompt_distribution == "long":
            return int(self.rng.uniform(200, 500))
        elif self.prompt_distribution == "bimodal":
            # 80% short, 20% long
            if self.rng.random() < 0.8:
                return int(self.rng.uniform(10, 50))
            else:
                return int(self.rng.uniform(200, 500))
        else:
            raise ValueError(f"Unknown prompt distribution: {self.prompt_distribution}")

    def _sample_output_tokens(self) -> int:
        """Sample output length based on distribution."""
        if self.output_distribution == "fixed":
            return self.max_output_tokens
        elif self.output_distribution == "uniform":
            return int(self.rng.uniform(
                max(1, self.max_output_tokens // 4),
                self.max_output_tokens
            ))
        elif self.output_distribution == "bimodal":
            if self.rng.random() < 0.7:
                return int(self.rng.uniform(16, self.max_output_tokens // 2))
            else:
                return int(self.rng.uniform(self.max_output_tokens // 2, self.max_output_tokens))
        else:
            raise ValueError(f"Unknown output distribution: {self.output_distribution}")

    def generate(self, num_requests: int, warmup: int = 0) -> List[Request]:
        """
        Generate a list of requests with arrival times.

        Args:
            num_requests: Total number of requests (including warmup).
            warmup: Number of warmup requests (included in output, excluded in metrics).

        Returns:
            List of Request objects sorted by arrival_time.
        """
        total = num_requests + warmup
        requests: List[Request] = []

        if self.burst_mode:
            arrival_times = self._generate_burst_arrivals(total)
        else:
            arrival_times = self._generate_poisson_arrivals(total)

        for i, arrival in enumerate(arrival_times):
            prompt_tokens = self._sample_prompt_tokens()
            output_tokens = self._sample_output_tokens()

            req = Request(
                id=f"req_{i:04d}",
                prompt_tokens=prompt_tokens,
                max_output_tokens=output_tokens,
                arrival_time=arrival,
                prompt_text=" ".join(f"word_{j}" for j in range(prompt_tokens)),
            )
            requests.append(req)

        logger.info(
            "Generated %d requests (arrival_rate=%.1f, prompt=%s, output=%s, seed=%d)",
            total, self.arrival_rate, self.prompt_distribution,
            self.output_distribution, self.seed,
        )
        return requests

    def _generate_poisson_arrivals(self, n: int) -> List[float]:
        """Generate Poisson process arrival times."""
        inter_arrivals = self.rng.exponential(1.0 / self.arrival_rate, size=n)
        arrivals = np.cumsum(inter_arrivals)
        return arrivals.tolist()

    def _generate_burst_arrivals(self, n: int) -> List[float]:
        """Generate bursty arrival times: clusters of requests."""
        arrivals: List[float] = []
        t = 0.0
        while len(arrivals) < n:
            # Generate a burst
            for _ in range(min(self.burst_size, n - len(arrivals))):
                # Small jitter within burst
                arrivals.append(t + self.rng.uniform(0, 0.1))
            t += self.burst_interval
        arrivals.sort()
        return arrivals[:n]
