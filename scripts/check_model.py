"""
Check local model weights and verify RealBackend inference.

Run from the project root with:
    python scripts/check_model.py
"""
from __future__ import annotations

import sys
import time
from pathlib import Path

# Add project root to sys.path so 'from src.backend.real import RealBackend' works
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))


def main() -> int:
    try:
        from src.backend.real import RealBackend
        from src.core.request import Request, RequestState
        backend = RealBackend()
    except (FileNotFoundError, ImportError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    except Exception as exc:
        print(f"Error loading RealBackend: {exc}", file=sys.stderr)
        return 1

    prompt = "Hello"
    prompt_ids = backend.build_prompt_ids(prompt)

    req = Request(
        id="check",
        prompt_tokens=len(prompt_ids),
        max_output_tokens=20,
        arrival_time=time.time(),
        prompt_text=prompt,
        prompt_token_ids=prompt_ids,
    )

    # Full prompt prefill (same bookkeeping order as the engine:
    # call the backend first, then advance tokens_prefilled)
    req.state = RequestState.PREFILL
    prefill_seconds = backend.prefill(req, len(prompt_ids))
    req.tokens_prefilled += len(prompt_ids)
    req.state = RequestState.DECODE

    # Decode loop, up to max_output_tokens (stops earlier if the model emits EOS,
    # because the backend then lowers req.max_output_tokens)
    decode_times = []
    while req.tokens_generated < req.max_output_tokens and not req.is_done:
        step_duration = backend.decode_step([req])
        decode_times.append(step_duration)
        req.tokens_generated += 1

    backend.release(req)

    # The first decode step only emits the token already computed during prefill,
    # and the last step needs no further forward pass, so both take ~0 s.
    # Average only over steps that actually ran a forward pass.
    real_steps = [d for d in decode_times if d > 0]
    avg_decode_seconds = (sum(real_steps) / len(real_steps)) if real_steps else 0.0
    tokens_per_second = (1.0 / avg_decode_seconds) if avg_decode_seconds > 0 else 0.0

    print("============================================================")
    print("RealBackend Model Verification")
    print("============================================================")
    print(f"Prompt token count:               {req.prompt_tokens}")
    print(f"Tokens generated:                 {req.tokens_generated}")
    print(f"Prefill duration (seconds):       {prefill_seconds:.4f} s")
    print(f"Average decode seconds per token: {avg_decode_seconds:.4f} s/tok")
    print(f"Tokens per second:                {tokens_per_second:.2f} tok/s")
    print(f"Generated text:                   {req.output_text}")
    print("============================================================")
    return 0


if __name__ == "__main__":
    sys.exit(main())