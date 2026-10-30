"""
Engine: ORCA-style iteration-level scheduling engine.

Implements two execution modes:
1. Virtual-time mode (benchmarks): discrete-event loop with simulated clock.
   No sleeping, so thousands of requests run in seconds.
2. Real-time mode (API server): background thread runs the engine loop and
   sleeps for each step's simulated duration, scaled by TIME_SCALE.

Reference: ORCA (OSDI'22) — iteration-level scheduling for LLM serving.
"""
from __future__ import annotations

import logging
import os
import threading
import time
from typing import Callable, Dict, List, Optional

from src.backend.base import Backend
from src.core.metrics import MetricsCollector
from src.core.request import Request, RequestState
from src.scheduler.base import ScheduleAction, Scheduler

logger = logging.getLogger(__name__)


class Engine:
    """
    ORCA-style iteration-level scheduling engine.

    At each iteration, the engine asks the scheduler which request to process
    next, executes the appropriate backend operation (prefill or decode),
    and updates request state and timestamps.

    Args:
        scheduler: The scheduling policy to use.
        backend: The inference backend (sim or real).
        metrics: MetricsCollector for tracking completed requests.
    """

    def __init__(
        self,
        scheduler: Scheduler,
        backend: Backend,
        metrics: Optional[MetricsCollector] = None,
    ) -> None:
        self.scheduler = scheduler
        self.backend = backend
        self.metrics = metrics or MetricsCollector()
        self._clock: float = 0.0  # virtual clock
        self._running: bool = False
        self._lock = threading.Lock()
        self._thread: Optional[threading.Thread] = None
        self._completion_callbacks: Dict[str, Callable] = {}

    @property
    def clock(self) -> float:
        """Current virtual clock time."""
        return self._clock

    def add_request(self, request: Request, callback: Optional[Callable] = None) -> None:
        """
        Submit a request to the engine.

        Args:
            request: The request to schedule.
            callback: Optional callback invoked when the request completes.
        """
        with self._lock:
            self.scheduler.add_request(request)
            if callback:
                self._completion_callbacks[request.id] = callback

    def _execute_step(self, action: ScheduleAction) -> float:
        """
        Execute a single step (prefill or decode) and update request state.

        Returns:
            Duration of the step in seconds.
        """
        req = action.request

        # Mark scheduled time
        req.mark_scheduled(self._clock)

        if action.action == "prefill":
            # Execute prefill
            req.state = RequestState.PREFILL
            duration = self.backend.prefill(req, action.prefill_tokens)
            req.tokens_prefilled += action.prefill_tokens

            # If prefill complete, transition to DECODE
            if req.is_prefill_complete:
                req.state = RequestState.DECODE

            return duration

        elif action.action == "decode":
            # Execute one decode step
            req.state = RequestState.DECODE
            duration = self.backend.decode_step([req])
            req.tokens_generated += 1

            # Record first token time
            if req.tokens_generated == 1:
                self._clock += duration  # advance clock for the first token
                req.mark_first_token(self._clock)
                self._clock -= duration  # revert; caller will advance

            # Check if generation is complete
            if req.tokens_generated >= req.max_output_tokens:
                self._clock += duration
                req.mark_done(self._clock)
                self._clock -= duration  # revert; caller will advance
                self.metrics.add(req)
                if hasattr(self.backend, "release"):
                    self.backend.release(req)
                self.scheduler.on_step_complete(req)

                # Fire completion callback
                cb = self._completion_callbacks.pop(req.id, None)
                if cb:
                    cb(req)
                return duration

            return duration
        else:
            raise ValueError(f"Unknown action: {action.action}")

    def run_virtual(self, requests: List[Request]) -> MetricsCollector:
        """
        Run in virtual-time mode (for benchmarks).

        Processes all requests using a discrete-event simulation with no
        real-time delays. Requests are injected at their arrival_time.

        Args:
            requests: List of requests with pre-set arrival_times.

        Returns:
            MetricsCollector with all completed request metrics.
        """
        self._clock = 0.0
        self.metrics.clear()

        # Sort by arrival time
        pending = sorted(requests, key=lambda r: r.arrival_time)
        pending_idx = 0

        logger.info("Engine: starting virtual-time run with %d requests", len(requests))

        iteration = 0
        max_iterations = len(requests) * 2000  # safety limit

        while iteration < max_iterations:
            iteration += 1

            # Inject requests that have arrived by current clock time
            while pending_idx < len(pending) and pending[pending_idx].arrival_time <= self._clock:
                self.scheduler.add_request(pending[pending_idx])
                pending_idx += 1

            # Get next action from scheduler
            # Update SPF time if applicable
            if hasattr(self.scheduler, 'set_time'):
                self.scheduler.set_time(self._clock)

            action = self.scheduler.next_step()

            if action is None:
                # No work available
                if pending_idx >= len(pending):
                    # All requests submitted and processed
                    break
                # Jump clock to next arrival
                self._clock = pending[pending_idx].arrival_time
                continue

            # Execute the step
            duration = self._execute_step(action)
            self._clock += duration

            # Notify scheduler of step completion
            if action.request.state != RequestState.DONE:
                self.scheduler.on_step_complete(action.request)

        logger.info(
            "Engine: virtual-time run complete. %d requests, %d iterations, clock=%.2fs",
            len(requests), iteration, self._clock,
        )
        return self.metrics

    def start_realtime(self, time_scale: float = 1.0) -> None:
        """
        Start the engine in real-time mode (background thread).

        The engine loop runs continuously, sleeping for each step's duration
        scaled by time_scale. This mode is used by the API server.

        Args:
            time_scale: Multiplier for sleep duration. 1.0 = real-time.
                        0.1 = 10x faster. 0.0 = no sleeping.
        """
        self._running = True
        self._clock = time.time()

        def _loop() -> None:
            while self._running:
                with self._lock:
                    # Update SPF time if applicable
                    if hasattr(self.scheduler, 'set_time'):
                        self.scheduler.set_time(time.time())

                    action = self.scheduler.next_step()

                if action is None:
                    time.sleep(0.001)  # idle poll
                    continue

                with self._lock:
                    req = action.request
                    req.mark_scheduled(time.time())

                    if action.action == "prefill":
                        req.state = RequestState.PREFILL
                        duration = self.backend.prefill(req, action.prefill_tokens)
                        # Sleep only for simulated backend
                        if time_scale > 0 and self.backend.name() != "real":
                            time.sleep(duration * time_scale)
                        req.tokens_prefilled += action.prefill_tokens
                        if req.is_prefill_complete:
                            req.state = RequestState.DECODE
                        self.scheduler.on_step_complete(req)

                    elif action.action == "decode":
                        req.state = RequestState.DECODE
                        duration = self.backend.decode_step([req])
                        # Sleep only for simulated backend
                        if time_scale > 0 and self.backend.name() != "real":
                            time.sleep(duration * time_scale)
                        req.tokens_generated += 1

                        if req.tokens_generated == 1:
                            req.mark_first_token(time.time())

                        if req.tokens_generated >= req.max_output_tokens:
                            req.mark_done(time.time())
                            self.metrics.add(req)
                            if hasattr(self.backend, "release"):
                                self.backend.release(req)
                            self.scheduler.on_step_complete(req)
                            cb = self._completion_callbacks.pop(req.id, None)
                            if cb:
                                cb(req)
                        else:
                            self.scheduler.on_step_complete(req)

        self._thread = threading.Thread(target=_loop, daemon=True, name="engine-loop")
        self._thread.start()
        logger.info("Engine: real-time loop started (time_scale=%.2f)", time_scale)

    def stop_realtime(self) -> None:
        """Stop the real-time engine loop."""
        self._running = False
        if self._thread:
            self._thread.join(timeout=5.0)
            self._thread = None
        logger.info("Engine: real-time loop stopped")
