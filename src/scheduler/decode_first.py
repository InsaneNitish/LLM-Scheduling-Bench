"""
Decode First Scheduler (Sarathi-inspired).

Prioritizes requests in DECODE state over new prefills. This protects decode
latency (TPOT) by avoiding prefill/decode interference.

Supports optional chunked prefill: instead of prefilling the entire prompt at
once, breaks it into chunks of configurable size. This is inspired by
SARATHI (arXiv 2308.16369) which demonstrated that chunked prefill reduces
tail latency for decode-phase requests.

Known characteristics:
  - Low TPOT variance (decode latency protected)
  - Higher TTFT than FCFS for initial requests (decode takes priority)
  - Chunked prefill enables interleaving prefill with decode for better GPU utilization
"""
from __future__ import annotations

import logging
from collections import deque
from typing import List, Optional

from src.core.request import Request, RequestState
from src.scheduler.base import ScheduleAction, Scheduler

logger = logging.getLogger(__name__)


class DecodeFirstScheduler(Scheduler):
    """
    Decode-first scheduler with optional chunked prefill.

    Args:
        chunk_size: Number of prompt tokens to prefill per chunk.
                    0 or None means prefill the entire prompt at once.
    """

    def __init__(self, chunk_size: int = 0) -> None:
        self.chunk_size = chunk_size if chunk_size and chunk_size > 0 else 0
        self._waiting: deque[Request] = deque()  # requests needing prefill
        self._decoding: deque[Request] = deque()  # requests in decode phase

    def add_request(self, request: Request) -> None:
        """Add request to the waiting (prefill) queue."""
        self._waiting.append(request)
        logger.debug("DecodeFirst: added request %s (prompt=%d tokens)", request.id, request.prompt_tokens)

    def next_step(self) -> Optional[ScheduleAction]:
        """
        Scheduling priority:
        1. Decode-phase requests always take priority.
        2. If no decode work, prefill the next waiting request (chunked or full).
        """
        # Clean up completed decode requests
        self._decoding = deque(r for r in self._decoding if r.state != RequestState.DONE)
        self._waiting = deque(r for r in self._waiting if r.state != RequestState.DONE)

        # Priority 1: Decode
        if self._decoding:
            req = self._decoding[0]
            return ScheduleAction(request=req, action="decode")

        # Priority 2: Prefill (with optional chunking)
        if self._waiting:
            req = self._waiting[0]
            remaining = req.prompt_tokens - req.tokens_prefilled
            if self.chunk_size > 0:
                tokens = min(self.chunk_size, remaining)
            else:
                tokens = remaining
            return ScheduleAction(request=req, action="prefill", prefill_tokens=tokens)

        return None

    def on_step_complete(self, request: Request) -> None:
        """
        After a step:
        - If prefill is complete, move request from waiting to decode queue.
        - If request is done, remove it.
        """
        if request.state == RequestState.DONE:
            # Remove from decode queue
            try:
                self._decoding.remove(request)
            except ValueError:
                pass
            try:
                self._waiting.remove(request)
            except ValueError:
                pass
            return

        if request.is_prefill_complete and request not in self._decoding:
            # Prefill done, move to decode queue
            try:
                self._waiting.remove(request)
            except ValueError:
                pass
            self._decoding.append(request)

    def remove_request(self, request: Request) -> None:
        """Remove a request from all queues."""
        try:
            self._waiting.remove(request)
        except ValueError:
            pass
        try:
            self._decoding.remove(request)
        except ValueError:
            pass

    def name(self) -> str:
        return "decode_first"
