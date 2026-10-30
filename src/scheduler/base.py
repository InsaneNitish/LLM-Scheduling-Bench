"""
Abstract Scheduler base class for LLM request scheduling.

Defines the interface that all scheduling policies must implement.
The engine calls these methods at each iteration to determine which
request(s) to process next (ORCA-style iteration-level scheduling).
"""
from __future__ import annotations

import abc
from dataclasses import dataclass
from typing import List, Optional

from src.core.request import Request, RequestState


@dataclass
class ScheduleAction:
    """
    Describes what the engine should do in the next iteration step.

    Attributes:
        request: The request to process.
        action: Either 'prefill' or 'decode'.
        prefill_tokens: Number of prompt tokens to prefill (for chunked prefill).
    """
    request: Request
    action: str  # "prefill" or "decode"
    prefill_tokens: int = 0


class Scheduler(abc.ABC):
    """
    Abstract base class for scheduling policies.

    Each scheduler maintains its own internal queue(s) and decides which
    request to process next at each engine iteration.
    """

    @abc.abstractmethod
    def add_request(self, request: Request) -> None:
        """
        Add a new request to the scheduler's queue.

        Args:
            request: A newly arrived request in WAITING state.
        """
        ...

    @abc.abstractmethod
    def next_step(self) -> Optional[ScheduleAction]:
        """
        Decide which request gets the next iteration step.

        Returns:
            A ScheduleAction describing what to do, or None if no work is available.
        """
        ...

    @abc.abstractmethod
    def on_step_complete(self, request: Request) -> None:
        """
        Callback after a step completes. Use for bookkeeping (e.g., RR quantum tracking).

        Args:
            request: The request that just completed a step.
        """
        ...

    @abc.abstractmethod
    def name(self) -> str:
        """Return the policy name."""
        ...

    @property
    def has_work(self) -> bool:
        """Whether the scheduler has any pending or active requests."""
        return self.next_step() is not None

    def remove_request(self, request: Request) -> None:
        """Remove a completed request from internal queues (optional override)."""
        pass
