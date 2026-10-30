"""
Abstract Backend interface for LLM inference.

The Backend defines two operations matching the two phases of autoregressive
LLM inference:
  1. prefill — process prompt tokens (compute KV cache)
  2. decode_step — generate one output token per active request

Concrete implementations return the wall-clock duration of each operation.
This design decouples scheduling logic from the inference engine, allowing
the same schedulers and engine to work with both simulated and real backends.
"""
from __future__ import annotations

import abc
from typing import List

from src.core.request import Request


class Backend(abc.ABC):
    """
    Abstract base class for LLM inference backends.

    Subclasses must implement prefill() and decode_step(), each returning
    the simulated or actual duration in seconds.
    """

    @abc.abstractmethod
    def prefill(self, request: Request, num_tokens: int) -> float:
        """
        Execute prefill for a request (process prompt tokens, build KV cache).

        Args:
            request: The request being prefilled.
            num_tokens: Number of prompt tokens to process in this chunk.

        Returns:
            Duration of this prefill step in seconds.
        """
        ...

    @abc.abstractmethod
    def decode_step(self, requests: List[Request]) -> float:
        """
        Execute one decode step: generate one output token for each active request.

        Args:
            requests: List of requests currently in DECODE state.

        Returns:
            Duration of this decode step in seconds.
        """
        ...

    @abc.abstractmethod
    def name(self) -> str:
        """Return the backend name."""
        ...
