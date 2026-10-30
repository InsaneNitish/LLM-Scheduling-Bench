"""
Unit tests for MetricsCollector.
"""
# pyrefly: ignore[missing-import]
import pytest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.core.request import Request, RequestState
from src.core.metrics import MetricsCollector, MetricsSummary


def make_completed_request(
    id: str, prompt_tokens: int = 20, max_output: int = 10,
    arrival: float = 0.0, first_sched: float = 0.1, first_tok: float = 0.5,
    finish: float = 1.0, tokens_gen: int = 10,
) -> Request:
    """Create a completed request with known timestamps."""
    r = Request(id=id, prompt_tokens=prompt_tokens, max_output_tokens=max_output,
                arrival_time=arrival)
    r.state = RequestState.DONE
    r.first_scheduled = first_sched
    r.first_token_time = first_tok
    r.finish_time = finish
    r.tokens_generated = tokens_gen
    return r


class TestMetricsCollector:
    def test_empty_collector(self):
        mc = MetricsCollector()
        assert mc.completed_count == 0
        summary = mc.summarize()
        assert summary.count == 0

    def test_add_and_count(self):
        mc = MetricsCollector()
        r = make_completed_request("r1")
        mc.add(r)
        assert mc.completed_count == 1

    def test_ttft_computation(self):
        mc = MetricsCollector()
        r = make_completed_request("r1", arrival=0.0, first_tok=0.5)
        mc.add(r)
        summary = mc.summarize()
        assert abs(summary.ttft_mean - 0.5) < 1e-6

    def test_waiting_time(self):
        mc = MetricsCollector()
        r = make_completed_request("r1", arrival=0.0, first_sched=0.2)
        mc.add(r)
        summary = mc.summarize()
        assert abs(summary.waiting_mean - 0.2) < 1e-6

    def test_e2e_latency(self):
        mc = MetricsCollector()
        r = make_completed_request("r1", arrival=0.0, finish=2.0)
        mc.add(r)
        summary = mc.summarize()
        assert abs(summary.e2e_mean - 2.0) < 1e-6

    def test_tpot(self):
        mc = MetricsCollector()
        # 10 tokens, first at 0.5, finish at 1.0 → TPOT = 0.5/9 ≈ 0.0556
        r = make_completed_request("r1", first_tok=0.5, finish=1.0, tokens_gen=10)
        mc.add(r)
        summary = mc.summarize()
        assert abs(summary.tpot_mean - (0.5 / 9)) < 1e-6

    def test_exclude_warmup(self):
        mc = MetricsCollector()
        r1 = make_completed_request("warmup", arrival=0.0, finish=1.0)
        r2 = make_completed_request("real", arrival=1.0, first_tok=1.5, finish=2.0)
        mc.add(r1)
        mc.add(r2)
        summary = mc.summarize(exclude_warmup=1)
        assert summary.count == 1
        assert abs(summary.ttft_mean - 0.5) < 1e-6

    def test_percentiles(self):
        mc = MetricsCollector()
        # Add 100 requests with varying latencies
        for i in range(100):
            r = make_completed_request(
                f"r{i}", arrival=0.0, first_tok=float(i) * 0.01,
                finish=float(i) * 0.01 + 1.0, tokens_gen=10,
            )
            mc.add(r)
        summary = mc.summarize()
        assert summary.ttft_p50 < summary.ttft_p95
        assert summary.ttft_p95 < summary.ttft_p99

    def test_throughput(self):
        mc = MetricsCollector()
        # 10 requests over 10 seconds
        for i in range(10):
            r = make_completed_request(
                f"r{i}", arrival=float(i), finish=float(i) + 0.5,
            )
            mc.add(r)
        summary = mc.summarize()
        assert summary.throughput > 0

    def test_to_records(self):
        mc = MetricsCollector()
        r = make_completed_request("r1")
        mc.add(r)
        records = mc.to_records()
        assert len(records) == 1
        assert records[0]["id"] == "r1"

    def test_clear(self):
        mc = MetricsCollector()
        mc.add(make_completed_request("r1"))
        mc.clear()
        assert mc.completed_count == 0

    def test_summary_to_dict(self):
        s = MetricsSummary(count=1, throughput=5.0, ttft_mean=0.1)
        d = s.to_dict()
        assert d["count"] == 1
        assert d["throughput_rps"] == 5.0


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
