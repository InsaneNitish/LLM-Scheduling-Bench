"""
FastAPI server for the LLM Scheduler Bench.

Endpoints:
  POST /generate  — submit an inference request (simulated in sim mode, real generated text in real mode)
  GET  /health    — health check
  GET  /metrics   — aggregate scheduling metrics
  GET  /policy    — get current active policy
  POST /policy    — set active policy

Output is simulated when running in sim mode and real when running in real mode.
"""
from __future__ import annotations

import asyncio
import logging
import os
import threading
import time
import uuid
from typing import Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from src.backend.sim import SimBackend
from src.core.metrics import MetricsCollector
from src.core.request import Request
from src.engine.engine import Engine
from src.scheduler.base import Scheduler
from src.scheduler.fcfs import FCFSScheduler
from src.scheduler.round_robin import RoundRobinScheduler
from src.scheduler.spf import SPFScheduler
from src.scheduler.decode_first import DecodeFirstScheduler

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(name)s] %(levelname)s: %(message)s")

# --- Configuration from environment ---
DEFAULT_POLICY = os.environ.get("DEFAULT_POLICY", "fcfs")
TIME_SCALE = float(os.environ.get("TIME_SCALE", "1.0"))
RR_QUANTUM = int(os.environ.get("RR_QUANTUM", "4"))
CHUNK_SIZE = int(os.environ.get("CHUNK_SIZE", "64"))
BACKEND = os.environ.get("BACKEND", "sim")

# --- Pydantic models ---

class GenerateRequest(BaseModel):
    """Request body for /generate."""
    prompt: str = Field(..., description="Input prompt text")
    max_tokens: int = Field(default=128, description="Maximum tokens to generate", ge=1, le=2048)
    policy: Optional[str] = Field(default=None, description="Override scheduling policy for this request")


class GenerateResponse(BaseModel):
    """Response body for /generate."""
    text: str
    ttft: float
    waiting_time: float
    e2e_latency: float
    tokens: int
    policy: str
    simulated: bool = True


class PolicyRequest(BaseModel):
    """Request body for POST /policy."""
    policy: str = Field(..., description="Policy name: fcfs, round_robin, spf, decode_first")


class PolicyResponse(BaseModel):
    """Response body for /policy."""
    active_policy: str


# --- Factory functions ---

def create_scheduler(policy: str) -> Scheduler:
    """Create a scheduler instance by policy name."""
    if policy == "fcfs":
        return FCFSScheduler()
    elif policy == "round_robin":
        return RoundRobinScheduler(quantum=RR_QUANTUM)
    elif policy == "spf":
        return SPFScheduler(aging_factor=1.0)
    elif policy == "decode_first":
        return DecodeFirstScheduler(chunk_size=CHUNK_SIZE)
    else:
        raise ValueError(f"Unknown policy: {policy}. Choose from: fcfs, round_robin, spf, decode_first")


def estimate_prompt_tokens(text: str) -> int:
    """Approximate prompt token count by whitespace splitting or len/4."""
    words = text.split()
    if len(words) > 1:
        return len(words)
    return max(1, len(text) // 4)


# --- App setup ---

app = FastAPI(
    title="LLM Scheduler Bench",
    description=(
        "LLM serving and scheduling benchmark platform supporting both simulated "
        "and real local LLM backends across FCFS, Round Robin, Shortest Prompt First, "
        "and Decode First policies."
    ),
    version="1.0.0",
)

# Global state
_state = {
    "policy": DEFAULT_POLICY,
    "engine": None,
    "metrics": None,
    "backend": None,
}


@app.on_event("startup")
async def startup():
    """Initialize the engine with the default policy."""
    if BACKEND == "real":
        from src.backend.real import RealBackend
        try:
            backend = RealBackend()
        except Exception as e:
            logger.error("Failed to initialize RealBackend: %s", e)
            raise
    else:
        backend = SimBackend()

    metrics = MetricsCollector()
    scheduler = create_scheduler(_state["policy"])
    engine = Engine(scheduler=scheduler, backend=backend, metrics=metrics)
    engine.start_realtime(time_scale=TIME_SCALE)

    _state["engine"] = engine
    _state["metrics"] = metrics
    _state["backend"] = backend
    logger.info("Server started: policy=%s, backend=%s, time_scale=%.2f",
                _state["policy"], backend.name(), TIME_SCALE)


@app.on_event("shutdown")
async def shutdown():
    """Stop the engine."""
    engine = _state.get("engine")
    if engine:
        engine.stop_realtime()


@app.get("/health")
async def health():
    """Health check endpoint."""
    backend = _state.get("backend")
    backend_name = backend.name() if backend else BACKEND
    is_sim = backend_name == "sim"
    return {
        "status": "ok",
        "policy": _state["policy"],
        "backend": backend_name,
        "simulated": is_sim,
    }


@app.post("/generate", response_model=GenerateResponse)
async def generate(req: GenerateRequest):
    """
    Submit an inference request.

    In real mode, the prompt is tokenized using the model chat template,
    and actual model generation text is returned.
    In simulated mode, token count is estimated and placeholder tokens are returned.

    This endpoint blocks until the request is fully processed by the engine.
    """
    engine: Engine = _state["engine"]
    backend = _state["backend"]
    is_real = backend.name() == "real"

    policy_name = req.policy or _state["policy"]
    request_id = str(uuid.uuid4())[:8]

    if is_real:
        prompt_token_ids = backend.build_prompt_ids(req.prompt)
        prompt_tokens = len(prompt_token_ids)
    else:
        prompt_token_ids = None
        prompt_tokens = estimate_prompt_tokens(req.prompt)

    request = Request(
        id=request_id,
        prompt_tokens=prompt_tokens,
        max_output_tokens=req.max_tokens,
        arrival_time=time.time(),
        prompt_text=req.prompt,
        policy=policy_name,
        prompt_token_ids=prompt_token_ids,
    )

    # Create an event that fires on completion
    done_event = threading.Event()
    completed_req = [None]

    def on_complete(r: Request):
        completed_req[0] = r
        done_event.set()

    engine.add_request(request, callback=on_complete)

    # Wait for completion (with timeout)
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, lambda: done_event.wait(timeout=300))

    if completed_req[0] is None:
        raise HTTPException(status_code=504, detail="Request timed out after 300s")

    r = completed_req[0]

    # In real mode, use output_text from model; in sim mode, use token placeholders
    if is_real:
        output_text = r.output_text
    else:
        output_text = " ".join(f"tok_{i}" for i in range(r.tokens_generated))

    return GenerateResponse(
        text=output_text,
        ttft=round(r.ttft or 0.0, 4),
        waiting_time=round(r.waiting_time or 0.0, 4),
        e2e_latency=round(r.e2e_latency or 0.0, 4),
        tokens=r.tokens_generated,
        policy=policy_name,
        simulated=not is_real,
    )


@app.get("/metrics")
async def get_metrics():
    """Return aggregate scheduling metrics."""
    metrics: MetricsCollector = _state["metrics"]
    summary = metrics.summarize()
    backend = _state.get("backend")
    backend_name = backend.name() if backend else BACKEND
    is_sim = backend_name == "sim"
    return {
        "summary": summary.to_dict(),
        "completed_requests": metrics.completed_count,
        "active_policy": _state["policy"],
        "backend": backend_name,
        "simulated": is_sim,
    }


@app.get("/policy", response_model=PolicyResponse)
async def get_policy():
    """Get the currently active scheduling policy."""
    return PolicyResponse(active_policy=_state["policy"])


@app.post("/policy", response_model=PolicyResponse)
async def set_policy(req: PolicyRequest):
    """
    Set the active scheduling policy.

    This creates a new scheduler and engine. In-flight requests on the old
    engine will complete but new requests use the new policy.
    """
    valid_policies = ["fcfs", "round_robin", "spf", "decode_first"]
    if req.policy not in valid_policies:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid policy: {req.policy}. Choose from: {valid_policies}"
        )

    # Stop old engine
    old_engine: Engine = _state["engine"]
    if old_engine:
        old_engine.stop_realtime()

    # Create new engine with new policy
    _state["policy"] = req.policy
    scheduler = create_scheduler(req.policy)
    metrics = MetricsCollector()
    engine = Engine(scheduler=scheduler, backend=_state["backend"], metrics=metrics)
    engine.start_realtime(time_scale=TIME_SCALE)
    _state["engine"] = engine
    _state["metrics"] = metrics

    logger.info("Policy changed to: %s", req.policy)
    return PolicyResponse(active_policy=req.policy)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.api.server:app", host="0.0.0.0", port=8000, reload=False)
