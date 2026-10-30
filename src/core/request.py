"""
Request dataclass and state machine for LLM scheduling.

Each request tracks its lifecycle: WAITING -> PREFILL -> DECODE -> DONE
with timestamps at each transition for metrics computation.
"""
from __future__ import annotations

import enum
import time
from dataclasses import dataclass, field
from typing import Optional, List


class RequestState(enum.Enum):
    """Lifecycle states of an LLM inference request."""
    WAITING = "waiting"
    PREFILL = "prefill"
    DECODE = "decode"
    DONE = "done"


@dataclass
class Request:
    """
    Represents a single LLM inference request.

    Attributes:
        id: Unique request identifier.
        prompt_tokens: Number of tokens in the prompt.
        max_output_tokens: Maximum number of tokens to generate.
        arrival_time: Time when the request arrived (simulated or real).
        state: Current lifecycle state.
        tokens_generated: Number of output tokens generated so far.
        tokens_prefilled: Number of prompt tokens prefilled so far.
        first_scheduled: Timestamp when the request was first picked by the scheduler.
        first_token_time: Timestamp when the first output token was produced.
        finish_time: Timestamp when generation completed.
        prompt_text: Original prompt text (for API responses).
        policy: Scheduling policy that handled this request.
        output_text: Accumulated generated text for real model backend.
        prompt_token_ids: Tokenized prompt token IDs for real model prefill.
        generated_token_ids: List of generated output token IDs.
    """
    id: str
    prompt_tokens: int
    max_output_tokens: int
    arrival_time: float

    state: RequestState = RequestState.WAITING
    tokens_generated: int = 0
    tokens_prefilled: int = 0

    # Timestamps for metrics
    first_scheduled: Optional[float] = None
    first_token_time: Optional[float] = None
    finish_time: Optional[float] = None

    # Metadata
    prompt_text: str = ""
    policy: str = ""

    # Real backend generation state
    output_text: str = ""
    prompt_token_ids: Optional[List[int]] = None
    generated_token_ids: List[int] = field(default_factory=list)

    # For round-robin: track decode steps in current quantum
    rr_steps_in_quantum: int = 0

    @property
    def waiting_time(self) -> Optional[float]:
        """Time spent waiting before first being scheduled."""
        if self.first_scheduled is not None:
            return self.first_scheduled - self.arrival_time
        return None

    @property
    def ttft(self) -> Optional[float]:
        """Time To First Token: arrival -> first output token."""
        if self.first_token_time is not None:
            return self.first_token_time - self.arrival_time
        return None

    @property
    def e2e_latency(self) -> Optional[float]:
        """End-to-end latency: arrival -> finish."""
        if self.finish_time is not None:
            return self.finish_time - self.arrival_time
        return None

    @property
    def tpot(self) -> Optional[float]:
        """Time Per Output Token (average)."""
        if self.finish_time is not None and self.first_token_time is not None and self.tokens_generated > 1:
            return (self.finish_time - self.first_token_time) / (self.tokens_generated - 1)
        return None

    @property
    def is_prefill_complete(self) -> bool:
        """Whether prefill phase is complete."""
        return self.tokens_prefilled >= self.prompt_tokens

    @property
    def is_done(self) -> bool:
        """Whether generation is complete."""
        return self.state == RequestState.DONE

    def mark_scheduled(self, t: float) -> None:
        """Record the first time this request is scheduled."""
        if self.first_scheduled is None:
            self.first_scheduled = t

    def mark_first_token(self, t: float) -> None:
        """Record when the first output token is produced."""
        if self.first_token_time is None:
            self.first_token_time = t

    def mark_done(self, t: float) -> None:
        """Mark the request as complete."""
        self.state = RequestState.DONE
        self.finish_time = t

    def to_dict(self) -> dict:
        """Serialize to dictionary for CSV/JSON output."""
        return {
            "id": self.id,
            "prompt_tokens": self.prompt_tokens,
            "max_output_tokens": self.max_output_tokens,
            "tokens_generated": self.tokens_generated,
            "arrival_time": self.arrival_time,
            "first_scheduled": self.first_scheduled,
            "first_token_time": self.first_token_time,
            "finish_time": self.finish_time,
            "waiting_time": self.waiting_time,
            "ttft": self.ttft,
            "e2e_latency": self.e2e_latency,
            "tpot": self.tpot,
            "state": self.state.value,
            "policy": self.policy,
        }
