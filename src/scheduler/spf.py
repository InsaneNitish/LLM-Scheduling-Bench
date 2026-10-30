"""
Shortest Prompt First (SPF) Scheduler.

Selects the waiting request with the fewest prompt tokens for prefill.
Once prefilled, requests decode to completion (like FCFS for the decode phase).

Optional aging parameter prevents starvation of long-prompt requests by
boosting their effective priority over time.

Known characteristics:
  - Minimizes average TTFT (optimal for SJF-style scheduling)
  - Risk of starvation for long prompts without aging
  - With aging, becomes more fair but loses some TTFT advantage
"""
from __future__ import annotations

import logging
from typing import List, Optional

from src.core.request import Request, RequestState
from src.scheduler.base import ScheduleAction, Scheduler

logger = logging.getLogger(__name__)


class SPFScheduler(Scheduler):
    """
    Shortest Prompt First scheduler.

    Args:
        aging_factor: Per-second reduction in effective prompt length for
                      waiting requests. 0.0 disables aging. Default: 1.0
    """

    def __init__(self, aging_factor: float = 1.0) -> None:
        self.aging_factor = aging_factor
        self._waiting: List[Request] = []
        self._active: Optional[Request] = None  # currently decoding request
        self._current_time: float = 0.0

    def set_time(self, t: float) -> None:
        """Update the scheduler's view of current time (for aging calculation)."""
        self._current_time = t

    def add_request(self, request: Request) -> None:
        """Add request to the waiting pool."""
        self._waiting.append(request)
        logger.debug("SPF: added request %s (prompt=%d tokens)", request.id, request.prompt_tokens)

    def _effective_priority(self, req: Request) -> float:
        """
        Compute effective priority (lower = higher priority).

        Without aging: just prompt_tokens.
        With aging: prompt_tokens - aging_factor * wait_time.
        """
        wait_time = max(0, self._current_time - req.arrival_time)
        return req.prompt_tokens - self.aging_factor * wait_time

    def next_step(self) -> Optional[ScheduleAction]:
        """
        Pick the next step:
        1. Continue decoding the active request.
        2. If no active request, pick the shortest-prompt waiting request.
        """
        # Continue active decode request
        if self._active is not None:
            if self._active.state == RequestState.DONE:
                self._active = None
            else:
                return ScheduleAction(request=self._active, action="decode")

        # Remove completed from waiting
        self._waiting = [r for r in self._waiting if r.state != RequestState.DONE]

        if not self._waiting:
            return None

        # Pick shortest prompt (with aging)
        best = min(self._waiting, key=self._effective_priority)
        self._waiting.remove(best)

        if not best.is_prefill_complete:
            remaining = best.prompt_tokens - best.tokens_prefilled
            return ScheduleAction(request=best, action="prefill", prefill_tokens=remaining)
        else:
            self._active = best
            return ScheduleAction(request=best, action="decode")

    def on_step_complete(self, request: Request) -> None:
        """Handle step completion; transition from prefill to decode."""
        if request.is_prefill_complete and request.state != RequestState.DONE:
            # After prefill, this request becomes the active decoder
            self._active = request
        if request.state == RequestState.DONE:
            if self._active is request:
                self._active = None

    def remove_request(self, request: Request) -> None:
        """Remove a request."""
        if self._active is request:
            self._active = None
        try:
            self._waiting.remove(request)
        except ValueError:
            pass

    def name(self) -> str:
        return "spf"
