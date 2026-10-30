"""
FCFS (First-Come, First-Served) Scheduler.

Processes requests in strict arrival order. Each request runs to completion
(full prefill + all decode steps) before the next request begins.

Known characteristics:
  - Simple and fair in arrival order
  - Suffers from head-of-line blocking: a long prompt blocks all subsequent requests
  - High TTFT variance under mixed workloads
"""
from __future__ import annotations

import logging
from collections import deque
from typing import Optional

from src.core.request import Request, RequestState
from src.scheduler.base import ScheduleAction, Scheduler

logger = logging.getLogger(__name__)


class FCFSScheduler(Scheduler):
    """First-Come, First-Served: arrival order, run each request to completion."""

    def __init__(self) -> None:
        self._queue: deque[Request] = deque()
        self._active: Optional[Request] = None

    def add_request(self, request: Request) -> None:
        """Add request to the back of the FCFS queue."""
        self._queue.append(request)
        logger.debug("FCFS: added request %s (prompt=%d tokens)", request.id, request.prompt_tokens)

    def next_step(self) -> Optional[ScheduleAction]:
        """
        Pick the next step: continue the active request or start the next one.

        FCFS runs each request to completion before moving to the next.
        """
        # Continue active request if it's still running
        if self._active is not None:
            if self._active.state == RequestState.DONE:
                self._active = None
            else:
                return self._make_action(self._active)

        # Pick next from queue
        while self._queue:
            req = self._queue[0]
            if req.state == RequestState.DONE:
                self._queue.popleft()
                continue
            self._active = req
            self._queue.popleft()
            return self._make_action(req)

        return None

    def _make_action(self, req: Request) -> ScheduleAction:
        """Create the appropriate action for the request's current state."""
        if not req.is_prefill_complete:
            remaining = req.prompt_tokens - req.tokens_prefilled
            return ScheduleAction(request=req, action="prefill", prefill_tokens=remaining)
        else:
            return ScheduleAction(request=req, action="decode")

    def on_step_complete(self, request: Request) -> None:
        """No special bookkeeping needed for FCFS."""
        if request.state == RequestState.DONE and self._active is request:
            self._active = None

    def remove_request(self, request: Request) -> None:
        """Remove a request from the queue."""
        if self._active is request:
            self._active = None
        try:
            self._queue.remove(request)
        except ValueError:
            pass

    def name(self) -> str:
        return "fcfs"
