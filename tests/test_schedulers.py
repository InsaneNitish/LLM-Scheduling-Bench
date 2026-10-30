"""
Unit tests for all scheduler implementations.

Tests verify:
  - Correct request ordering
  - State transitions (WAITING -> PREFILL -> DECODE -> DONE)
  - Policy-specific behavior (FCFS ordering, RR rotation, SPF priority, DF decode priority)
"""
# pyrefly: ignore[missing-import]
import pytest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.core.request import Request, RequestState
from src.scheduler.fcfs import FCFSScheduler
from src.scheduler.round_robin import RoundRobinScheduler
from src.scheduler.spf import SPFScheduler
from src.scheduler.decode_first import DecodeFirstScheduler


def make_request(id: str, prompt_tokens: int = 20, max_output: int = 5, arrival: float = 0.0) -> Request:
    """Helper to create test requests."""
    return Request(id=id, prompt_tokens=prompt_tokens, max_output_tokens=max_output, arrival_time=arrival)


# ======================== FCFS Tests ========================

class TestFCFS:
    def test_name(self):
        s = FCFSScheduler()
        assert s.name() == "fcfs"

    def test_empty_returns_none(self):
        s = FCFSScheduler()
        assert s.next_step() is None

    def test_single_request_prefill_then_decode(self):
        s = FCFSScheduler()
        r = make_request("r1", prompt_tokens=10, max_output=3)
        s.add_request(r)

        # First step should be prefill
        action = s.next_step()
        assert action is not None
        assert action.action == "prefill"
        assert action.request.id == "r1"
        assert action.prefill_tokens == 10

        # Simulate prefill completion
        r.tokens_prefilled = 10
        r.state = RequestState.DECODE
        s.on_step_complete(r)

        # Next steps should be decode
        action = s.next_step()
        assert action.action == "decode"

    def test_fifo_order(self):
        s = FCFSScheduler()
        r1 = make_request("r1", prompt_tokens=5, arrival=0.0)
        r2 = make_request("r2", prompt_tokens=5, arrival=1.0)
        s.add_request(r1)
        s.add_request(r2)

        # r1 should be served first
        action = s.next_step()
        assert action.request.id == "r1"

    def test_run_to_completion(self):
        """FCFS runs r1 to completion before starting r2."""
        s = FCFSScheduler()
        r1 = make_request("r1", prompt_tokens=5, max_output=2)
        r2 = make_request("r2", prompt_tokens=5, max_output=2)
        s.add_request(r1)
        s.add_request(r2)

        # Prefill r1
        action = s.next_step()
        assert action.request.id == "r1"
        r1.tokens_prefilled = 5
        r1.state = RequestState.DECODE
        s.on_step_complete(r1)

        # Decode r1 (still r1, not r2)
        action = s.next_step()
        assert action.request.id == "r1"
        assert action.action == "decode"


# ======================== Round Robin Tests ========================

class TestRoundRobin:
    def test_name(self):
        s = RoundRobinScheduler()
        assert s.name() == "round_robin"

    def test_empty_returns_none(self):
        s = RoundRobinScheduler()
        assert s.next_step() is None

    def test_quantum_rotation(self):
        """After quantum decode steps, request rotates to back of queue."""
        s = RoundRobinScheduler(quantum=2)
        r1 = make_request("r1", prompt_tokens=5, max_output=10)
        r2 = make_request("r2", prompt_tokens=5, max_output=10)
        s.add_request(r1)
        s.add_request(r2)

        # Prefill r1
        action = s.next_step()
        assert action.request.id == "r1"
        assert action.action == "prefill"
        r1.tokens_prefilled = 5
        r1.state = RequestState.DECODE
        s.on_step_complete(r1)

        # Prefill r2
        action = s.next_step()
        assert action.request.id == "r2"
        assert action.action == "prefill"
        r2.tokens_prefilled = 5
        r2.state = RequestState.DECODE
        s.on_step_complete(r2)

        # Decode r1 - step 1
        action = s.next_step()
        assert action.request.id == "r1"
        s.on_step_complete(r1)

        # Decode r1 - step 2
        action = s.next_step()
        assert action.request.id == "r1"
        s.on_step_complete(r1)

        # Now quantum exhausted, should rotate to r2
        action = s.next_step()
        assert action.request.id == "r2"

    def test_prefill_before_decode(self):
        """Waiting requests get prefilled before entering decode rotation."""
        s = RoundRobinScheduler(quantum=4)
        r1 = make_request("r1", prompt_tokens=5, max_output=10)
        s.add_request(r1)

        action = s.next_step()
        assert action.action == "prefill"


# ======================== SPF Tests ========================

class TestSPF:
    def test_name(self):
        s = SPFScheduler()
        assert s.name() == "spf"

    def test_empty_returns_none(self):
        s = SPFScheduler()
        assert s.next_step() is None

    def test_shortest_prompt_first(self):
        """SPF picks the request with the fewest prompt tokens."""
        s = SPFScheduler(aging_factor=0.0)  # disable aging
        r_long = make_request("r_long", prompt_tokens=500, arrival=0.0)
        r_short = make_request("r_short", prompt_tokens=10, arrival=0.0)
        s.add_request(r_long)
        s.add_request(r_short)

        action = s.next_step()
        assert action.request.id == "r_short"

    def test_aging_prevents_starvation(self):
        """With aging, a long-waiting request eventually gets priority."""
        s = SPFScheduler(aging_factor=100.0)  # aggressive aging
        r_long = make_request("r_long", prompt_tokens=100, arrival=0.0)
        r_short = make_request("r_short", prompt_tokens=10, arrival=5.0)

        s.add_request(r_long)
        s.add_request(r_short)

        # At time=5.1, r_long has waited 5.1s, effective priority = 100 - 100*5.1 = -410
        # r_short effective priority = 10 - 100*0.1 = 0
        s.set_time(5.1)
        action = s.next_step()
        assert action.request.id == "r_long"  # aged enough to get priority

    def test_decode_to_completion(self):
        """Once prefilled, SPF decodes to completion (like FCFS for decode phase)."""
        s = SPFScheduler(aging_factor=0.0)
        r = make_request("r1", prompt_tokens=5, max_output=3)
        s.add_request(r)

        # Prefill
        action = s.next_step()
        assert action.action == "prefill"
        r.tokens_prefilled = 5
        r.state = RequestState.DECODE
        s.on_step_complete(r)

        # Should continue decoding
        action = s.next_step()
        assert action.action == "decode"
        assert action.request.id == "r1"


# ======================== Decode First Tests ========================

class TestDecodeFirst:
    def test_name(self):
        s = DecodeFirstScheduler()
        assert s.name() == "decode_first"

    def test_empty_returns_none(self):
        s = DecodeFirstScheduler()
        assert s.next_step() is None

    def test_decode_priority_over_prefill(self):
        """Requests in DECODE state take priority over new prefills."""
        s = DecodeFirstScheduler()
        r1 = make_request("r1", prompt_tokens=10, max_output=5)
        r2 = make_request("r2", prompt_tokens=10, max_output=5)

        # Add r1 and complete its prefill
        s.add_request(r1)
        action = s.next_step()
        assert action.action == "prefill"
        r1.tokens_prefilled = 10
        r1.state = RequestState.DECODE
        s.on_step_complete(r1)

        # Now add r2 (needs prefill)
        s.add_request(r2)

        # r1 should get priority (it's in DECODE)
        action = s.next_step()
        assert action.request.id == "r1"
        assert action.action == "decode"

    def test_chunked_prefill(self):
        """With chunk_size, prefill happens in chunks."""
        s = DecodeFirstScheduler(chunk_size=32)
        r = make_request("r1", prompt_tokens=100, max_output=5)
        s.add_request(r)

        # First chunk
        action = s.next_step()
        assert action.action == "prefill"
        assert action.prefill_tokens == 32  # chunk_size

    def test_no_chunking_when_zero(self):
        """With chunk_size=0, full prefill."""
        s = DecodeFirstScheduler(chunk_size=0)
        r = make_request("r1", prompt_tokens=100, max_output=5)
        s.add_request(r)

        action = s.next_step()
        assert action.prefill_tokens == 100


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
