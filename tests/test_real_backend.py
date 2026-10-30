"""
Tests for RealBackend (local Qwen2.5 on CPU).

Tests that require the local model weights or transformers library are safely skipped
with pytest.mark.skipif when the model folder or dependencies are not available.
"""
from __future__ import annotations

import os
import time
from pathlib import Path

import pytest

from src.core.request import Request, RequestState

MODEL_PATH = Path(os.environ.get("MODEL_PATH", Path(__file__).resolve().parent.parent / "models" / "Qwen2.5-0.5B-Instruct"))
HAS_MODEL = MODEL_PATH.exists() and (MODEL_PATH / "config.json").exists()

try:
    import torch
    import transformers
    HAS_DEPS = True
except ImportError:
    HAS_DEPS = False

CAN_RUN_REAL_TESTS = HAS_MODEL and HAS_DEPS
skip_unless_real = pytest.mark.skipif(
    not CAN_RUN_REAL_TESTS,
    reason="Requires Qwen2.5-0.5B-Instruct model in models/ and torch/transformers installed",
)


def test_missing_model_raises_file_not_found():
    """Verify that RealBackend raises FileNotFoundError with download guidance when model is missing."""
    from src.backend.real import RealBackend
    nonexistent = Path("nonexistent_model_dir_xyz_123")
    with pytest.raises(FileNotFoundError) as exc_info:
        RealBackend(model_path=nonexistent)
    assert "hf download Qwen/Qwen2.5-0.5B-Instruct" in str(exc_info.value)


@skip_unless_real
def test_real_backend_generation():
    """Verify that prefill + decode produces non-empty generated text."""
    from src.backend.real import RealBackend

    backend = RealBackend(model_path=MODEL_PATH)
    prompt = "The capital of France is"
    prompt_ids = backend.build_prompt_ids(prompt)
    assert len(prompt_ids) > 0

    req = Request(
        id="test-gen-1",
        prompt_tokens=len(prompt_ids),
        max_output_tokens=5,
        arrival_time=time.time(),
        prompt_text=prompt,
        prompt_token_ids=prompt_ids,
    )

    # Execute prefill
    dur_prefill = backend.prefill(req, len(prompt_ids))
    req.tokens_prefilled += len(prompt_ids)
    req.state = RequestState.DECODE
    assert dur_prefill >= 0.0

    # Execute 5 decode steps
    for _ in range(5):
        if req.is_done:
            break
        dur_decode = backend.decode_step([req])
        req.tokens_generated += 1
        assert dur_decode >= 0.0

    backend.release(req)

    assert req.tokens_generated > 0
    assert len(req.output_text.strip()) > 0
    assert len(req.generated_token_ids) == req.tokens_generated


@skip_unless_real
def test_chunked_prefill_equivalence():
    """
    Verify that chunked prefill (chunk size 16) produces the exact same first
    generated token as monolithic one-shot prefill.
    """
    from src.backend.real import RealBackend

    backend = RealBackend(model_path=MODEL_PATH)
    # Long prompt to ensure multiple chunks (> 30 tokens)
    prompt = (
        "In modern cloud computing and distributed systems, scheduling policies "
        "determine the allocation of hardware accelerators to concurrent requests."
    )
    prompt_ids = backend.build_prompt_ids(prompt)
    assert len(prompt_ids) > 16, f"Prompt tokens {len(prompt_ids)} must exceed chunk size 16"

    # 1. Run one-shot prefill
    req1 = Request(
        id="req-oneshot",
        prompt_tokens=len(prompt_ids),
        max_output_tokens=1,
        arrival_time=time.time(),
        prompt_text=prompt,
        prompt_token_ids=list(prompt_ids),
    )
    backend.prefill(req1, len(prompt_ids))
    oneshot_first_token = backend.pending_tokens.get(req1.id)
    backend.release(req1)

    # 2. Run chunked prefill with chunk size 16
    chunk_size = 16
    req2 = Request(
        id="req-chunked",
        prompt_tokens=len(prompt_ids),
        max_output_tokens=1,
        arrival_time=time.time(),
        prompt_text=prompt,
        prompt_token_ids=list(prompt_ids),
    )

    while req2.tokens_prefilled < req2.prompt_tokens:
        tokens_to_process = min(chunk_size, req2.prompt_tokens - req2.tokens_prefilled)
        backend.prefill(req2, tokens_to_process)
        req2.tokens_prefilled += tokens_to_process

    chunked_first_token = backend.pending_tokens.get(req2.id)
    backend.release(req2)

    assert oneshot_first_token is not None
    assert chunked_first_token is not None
    assert oneshot_first_token == chunked_first_token, (
        f"Chunked first token ({chunked_first_token}) did not match one-shot ({oneshot_first_token})"
    )


@skip_unless_real
def test_interleaved_requests_isolation():
    """
    Verify that two requests interleaved in decode steps do not corrupt
    each other's KV cache state or generated output.
    """
    from src.backend.real import RealBackend

    backend = RealBackend(model_path=MODEL_PATH)
    prompt_a = "One plus one is"
    prompt_b = "The sun rises in the"

    prompt_a_ids = backend.build_prompt_ids(prompt_a)
    prompt_b_ids = backend.build_prompt_ids(prompt_b)

    # Helper to generate isolated output
    def run_isolated(req_id: str, prompt: str, p_ids: list[int], num_steps: int) -> tuple[str, list[int]]:
        r = Request(
            id=req_id,
            prompt_tokens=len(p_ids),
            max_output_tokens=num_steps,
            arrival_time=time.time(),
            prompt_text=prompt,
            prompt_token_ids=list(p_ids),
        )
        backend.prefill(r, len(p_ids))
        r.tokens_prefilled += len(p_ids)
        r.state = RequestState.DECODE
        for _ in range(num_steps):
            backend.decode_step([r])
            r.tokens_generated += 1
        backend.release(r)
        return r.output_text, list(r.generated_token_ids)

    # Run each isolated
    text_a_solo, tokens_a_solo = run_isolated("solo-a", prompt_a, prompt_a_ids, 4)
    text_b_solo, tokens_b_solo = run_isolated("solo-b", prompt_b, prompt_b_ids, 4)

    # Now run interleaved: A then B each step
    req_a = Request(
        id="interleaved-a",
        prompt_tokens=len(prompt_a_ids),
        max_output_tokens=4,
        arrival_time=time.time(),
        prompt_text=prompt_a,
        prompt_token_ids=list(prompt_a_ids),
    )
    req_b = Request(
        id="interleaved-b",
        prompt_tokens=len(prompt_b_ids),
        max_output_tokens=4,
        arrival_time=time.time(),
        prompt_text=prompt_b,
        prompt_token_ids=list(prompt_b_ids),
    )

    # Prefill both
    backend.prefill(req_a, len(prompt_a_ids))
    req_a.tokens_prefilled += len(prompt_a_ids)
    req_a.state = RequestState.DECODE

    backend.prefill(req_b, len(prompt_b_ids))
    req_b.tokens_prefilled += len(prompt_b_ids)
    req_b.state = RequestState.DECODE

    # Interleave decode steps
    for _ in range(4):
        backend.decode_step([req_a])
        req_a.tokens_generated += 1
        backend.decode_step([req_b])
        req_b.tokens_generated += 1

    backend.release(req_a)
    backend.release(req_b)

    assert req_a.generated_token_ids == tokens_a_solo, "Interleaved Request A was corrupted!"
    assert req_b.generated_token_ids == tokens_b_solo, "Interleaved Request B was corrupted!"
    assert req_a.output_text == text_a_solo
    assert req_b.output_text == text_b_solo
