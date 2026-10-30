"""
Round-Robin Scheduler.

Rotates through active requests, giving each a configurable quantum of decode
steps before moving to the next. Prefill is always completed in one shot before
entering the decode rotation.

Known characteristics:
  - Fair across all requests regardless of length
  - Small quantum → low TTFT variance but higher scheduling overhead
  - Large quantum → approaches FCFS behavior
"""
from __future__ import annotations

import logging
from collections import deque
from typing import Optional

from src.core.request import Request, RequestState
from src.scheduler.base import ScheduleAction, Scheduler

logger = logging.getLogger(__name__)


class RoundRobinScheduler(Scheduler):
    """
    Round-Robin scheduler with configurable quantum.

    Args:
        quantum: Number of decode steps per request before rotation.
    """

    def __init__(self, quantum: int = 4) -> None:
        self.quantum = max(1, quantum)
        self._waiting: deque[Request] = deque()  # requests needing prefill
        self._decode_queue: deque[Request] = deque()  # requests in decode rotation
        self._current: Optional[Request] = None

    def add_request(self, request: Request) -> None:
        """Add request; it will be prefilled first, then enter decode rotation."""
        self._waiting.append(request)
        logger.debug("RR: added request %s (prompt=%d tokens)", request.id, request.prompt_tokens)

    def next_step(self) -> Optional[ScheduleAction]:
        """
        Scheduling logic:
        1. If there's a current decode request with remaining quantum, continue it.
        2. If waiting requests exist, prefill the next one (then it enters decode queue).
        3. Otherwise, pick the next from decode queue.
        """
        # Continue current decode request if quantum not exhausted
        if self._current is not None:
            if self._current.state == RequestState.DONE:
                self._current = None
            elif self._current.rr_steps_in_quantum < self.quantum:
                return ScheduleAction(request=self._current, action="decode")
            else:
                # Quantum exhausted, rotate to back
                self._current.rr_steps_in_quantum = 0
                self._decode_queue.append(self._current)
                self._current = None

        # Prefill waiting requests (one at a time, full prefill)
        while self._waiting:
            req = self._waiting[0]
            if req.state == RequestState.DONE:
                self._waiting.popleft()
                continue
            if not req.is_prefill_complete:
                self._waiting.popleft()
                remaining = req.prompt_tokens - req.tokens_prefilled
                return ScheduleAction(request=req, action="prefill", prefill_tokens=remaining)
            else:
                # Already prefilled (shouldn't happen normally), move to decode
                self._waiting.popleft()
                self._decode_queue.append(req)

        # Pick next from decode queue
        while self._decode_queue:
            req = self._decode_queue.popleft()
            if req.state == RequestState.DONE:
                continue
            self._current = req
            req.rr_steps_in_quantum = 0
            return ScheduleAction(request=req, action="decode")

        return None

    def on_step_complete(self, request: Request) -> None:
        """Track decode steps and handle state transitions."""
        if request.state == RequestState.DONE:
            if self._current is request:
                self._current = None
            return

        # After prefill completes, move to decode queue
        if request.is_prefill_complete and request.state == RequestState.DECODE:
            if self._current is not request and request not in self._decode_queue:
                self._decode_queue.append(request)
                return

        # Track decode steps for quantum
        if request.state == RequestState.DECODE:
            request.rr_steps_in_quantum += 1

    def remove_request(self, request: Request) -> None:
        """Remove a completed request from all queues."""
        if self._current is request:
            self._current = None
        try:
            self._waiting.remove(request)
        except ValueError:
            pass
        try:
            self._decode_queue.remove(request)
        except ValueError:
            pass

    def name(self) -> str:
        return "round_robin"
