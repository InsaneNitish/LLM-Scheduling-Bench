"""
SimBackend: Simulated LLM backend with configurable latency model.

Latency model (from configs/latency_model.json):
  - prefill_time = a * num_tokens + b  (seconds)
  - decode_time  = c per token          (seconds)

These are ASSUMED values, not calibrated against real hardware.
The model deliberately ignores batching effects, memory pressure, and
GPU scheduling overhead to focus purely on scheduling policy comparisons.
"""
from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import List

from src.backend.base import Backend
from src.core.request import Request

logger = logging.getLogger(__name__)

DEFAULT_CONFIG_PATH = Path(__file__).resolve().parent.parent.parent / "configs" / "latency_model.json"


class SimBackend(Backend):
    """
    Simulated LLM inference backend.

    Uses a simple linear latency model for prefill and constant-time
    per-token decode. No actual computation is performed.
    """

    def __init__(self, config_path: str | Path | None = None) -> None:
        config_path = Path(config_path) if config_path else DEFAULT_CONFIG_PATH
        if config_path.exists():
            with open(config_path, "r") as f:
                cfg = json.load(f)
            self.prefill_a: float = cfg.get("prefill_a", 0.0005)
            self.prefill_b: float = cfg.get("prefill_b", 0.02)
            self.decode_c: float = cfg.get("decode_c", 0.025)
            self.default_chunk_size: int = cfg.get("default_chunk_size", 64)
        else:
            logger.warning("Latency config not found at %s, using defaults", config_path)
            self.prefill_a = 0.0005
            self.prefill_b = 0.02
            self.decode_c = 0.025
            self.default_chunk_size = 64

        logger.info(
            "SimBackend initialized: prefill=%.4f*tokens+%.4f, decode=%.4f/token",
            self.prefill_a, self.prefill_b, self.decode_c,
        )

    def prefill(self, request: Request, num_tokens: int) -> float:
        """
        Simulate prefill: duration = a * num_tokens + b.

        Args:
            request: The request being prefilled.
            num_tokens: Number of tokens to prefill in this step.

        Returns:
            Simulated duration in seconds.
        """
        duration = self.prefill_a * num_tokens + self.prefill_b
        return duration

    def decode_step(self, requests: List[Request]) -> float:
        """
        Simulate one decode step for all active requests.

        In simulation, we model this as a constant per-token latency.
        In a real backend, batched decode would have throughput benefits.

        Args:
            requests: Active requests in DECODE state.

        Returns:
            Simulated duration in seconds.
        """
        if not requests:
            return 0.0
        # Simulate: decode time is constant per token, regardless of batch size
        # (simplified; real batching would amortize overhead)
        duration = self.decode_c
        return duration

    def name(self) -> str:
        return "sim"
