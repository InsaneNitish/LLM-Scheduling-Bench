# CURRENT STATE & MODEL HANDOFF GUIDE
## LLM Scheduler Bench — Iteration-Level Cloud Serving System

> **Document Type:** Master AI Model & Engineering Handoff Document  
> **Target Audience:** Any incoming AI coding agent (Claude, GPT, Gemini) or software engineer  
> **Course:** Master of Technology (M.Tech) in Computer Science & Engineering — Cloud Computing  
> **Status:** 100% Complete, Fully Implemented, Tested, and Empirically Benchmarked  

---

## 1. Executive Summary & Domain Fundamentals

### 1.1 What is LLM Scheduler Bench?
**LLM Scheduler Bench** is an extensible research and engineering platform designed to simulate, benchmark, and live-serve Large Language Model (LLM) inference requests under various request scheduling policies.

In traditional cloud systems, requests are scheduled as atomic units (e.g., standard FCFS queueing in HTTP proxies). In LLM serving, however, requests cannot be treated as black boxes due to the fundamentally asymmetric nature of autoregressive Transformer inference.

### 1.2 The Two-Phase Nature of LLM Inference
Every LLM inference request consists of two distinct computational phases:

1. **Prefill Phase (Prompt Evaluation):**
   - **Nature:** Highly compute-bound (GEMM operations).
   - **Complexity:** Scales with prompt length ($O(N^2)$ or $O(N)$ with FlashAttention/chunked kernels).
   - **Action:** Processes all prompt tokens in parallel, saturating GPU Tensor Cores / CPU matrix units and populating the Key-Value (KV) cache.
2. **Decode Phase (Token Generation):**
   - **Nature:** Highly memory-bandwidth-bound (GEMV operations).
   - **Complexity:** Processes exactly 1 token per active sequence per step.
   - **Action:** Autoregressively reads model parameters and the accumulated KV cache from memory to SRAM to generate the next token.

### 1.3 The Core Problem: Head-of-Line (HoL) Blocking
Under coarse-grained First-Come, First-Served (**FCFS**) batching:
- If Request 1 has a long prompt or generates 512 tokens, it monopolizes the engine.
- Subsequent interactive or short queries (Requests 2, 3, 4) sit waiting in the queue.
- **Time-to-First-Token (TTFT)** blows up exponentially for lightweight queries.

### 1.4 State-of-the-Art Inspirations
This framework implements fine-grained **iteration-level scheduling** inspired by seminal research:
- **ORCA (OSDI '22):** Iteration-level scheduling that preempts and interleaves decode steps across concurrent requests.
- **SARATHI (arXiv:2308.16369):** Chunked prefill to divide heavy prefill phases and co-schedule them alongside active decodes to prevent latency jitter.
- **vLLM (SOSP '23):** Fine-grained per-request KV cache memory tracking.

### 1.5 Dual Execution Modes
The system operates seamlessly across two backends with zero changes to scheduler algorithms:
1. **Simulated Backend (`BACKEND=sim`, default):** Uses a parametric latency formulation ($T_{\text{prefill}} = a \cdot N + b$, $T_{\text{decode}} = c \cdot N$) in a discrete-event virtual clock loop. Evaluates **31,200+ requests** in seconds without real CPU delays.
2. **Real Local Backend (`BACKEND=real`):** Uses Hugging Face Transformers to run a real local **Qwen2.5-0.5B-Instruct** model on CPU with `torch.float32`, chunked prefill, per-request `DynamicCache`, and greedy decoding.

---

## 2. Complete Repository Tree & File Inventory

```
Project/
├── Dockerfile                      # Multi-stage Dockerfile (supports sim & real backend)
├── docker-compose.yml              # Services: llm-server, llm-server-real, benchmark, analysis, test
├── Makefile                        # Automation targets: build, up, bench-sim, analyze, test, clean
├── requirements.txt                # Core dependencies (FastAPI, uvicorn, pytest, httpx, matplotlib)
├── requirements-real.txt           # Real backend dependencies (torch CPU build, transformers, accelerate)
├── README.md                       # Comprehensive user guide, curl examples, and architecture overview
├── CURRENT_STATE_AND_MODEL_HANDOFF.md # Master system handoff document (this file)
├── .gitignore                      # Excludes models weights, pycache, dist, and zip archives
├── .dockerignore                   # Excludes models, git, and build caches from image build context
├── configs/
│   ├── latency_model.json          # Latency parameters (a=0.0005, b=0.02, c=0.025, chunk=64)
│   └── experiments.yaml            # Benchmark definitions for E1, E2, E3, E4, E5
├── models/
│   ├── .gitkeep                    # Preserves directory in git
│   ├── README.md                   # Instructions for downloading Qwen2.5-0.5B-Instruct
│   └── Qwen2.5-0.5B-Instruct/      # Local model folder (safetensors, config.json, tokenizer)
├── src/
│   ├── api/
│   │   └── server.py               # FastAPI REST API (/generate, /health, /metrics, /policy)
│   ├── backend/
│   │   ├── base.py                 # Abstract Backend interface (prefill, decode_step, name)
│   │   ├── sim.py                  # SimBackend (parametric latency model)
│   │   └── real.py                 # RealBackend (Qwen2.5-0.5B on CPU via Transformers)
│   ├── core/
│   │   ├── request.py              # Request dataclass & RequestState lifecycle enum
│   │   └── metrics.py              # MetricsCollector (p50, p95, p99, TTFT, TPOT, throughput)
│   ├── engine/
│   │   └── engine.py               # ORCA-style Engine: Virtual-Time & Real-Time execution loops
│   ├── scheduler/
│   │   ├── base.py                 # Abstract Scheduler base class & ScheduleAction
│   │   ├── fcfs.py                 # First-Come First-Served scheduling policy
│   │   ├── round_robin.py          # Preemptive Round Robin policy with quantum Q
│   │   ├── spf.py                  # Shortest Prompt First policy with aging factor alpha
│   │   └── decode_first.py         # Decode-First policy with chunked prefill
│   ├── workload/
│   │   └── generator.py            # Workload generator (Poisson/burst arrivals, prompt mixes)
│   └── benchmark/
│       ├── run_benchmark.py         # Automated benchmark execution engine
│       └── analyze.py               # Statistical compilation & Matplotlib publication plots
├── tests/
│   ├── test_schedulers.py          # 19 tests verifying all 4 scheduling policies
│   ├── test_engine.py              # 9 tests verifying virtual-time engine and event loops
│   ├── test_metrics.py             # 12 tests verifying statistical percentiles and metric tracking
│   └── test_real_backend.py        # 4 tests for RealBackend (KV cache isolation, chunked prefill)
├── scripts/
│   ├── check_model.py              # Standalone model verification and latency benchmarking script
│   ├── demo_curl.sh                # Bash script testing all policies via curl
│   ├── demo_curl.ps1               # PowerShell script testing all policies via Invoke-RestMethod
│   ├── concurrent_demo.py          # Multi-threaded client demonstrating HoL blocking vs Round-Robin
│   └── package_submission.ps1      # Automated packaging script producing clean submission zip
├── results/                        # Raw experimental output data (CSV and JSON summaries)
├── plots/                          # Generated high-resolution publication figures & results table
├── report/
│   ├── project_report.md           # Full academic project report (IEEE/ACM style)
│   └── analysis_report.md          # In-depth empirical benchmark findings report
└── dashboard/                      # Production-ready React + Vite analytics dashboard
    ├── index.html                  # HTML entry point with Google Fonts (Inter + JetBrains Mono)
    ├── package.json                # React 18, Vite 5, Recharts 2
    └── src/
        ├── App.jsx                 # Full interactive dashboard with 7 tabs and charts
        ├── index.css               # Premium dark glassmorphism design system
        ├── main.jsx                # React DOM mount point
        └── data/
            └── benchmarkData.js    # Pre-compiled benchmark data (31,200+ requests)
```

---

## 3. Subsystem Architecture & Implementation Details

```mermaid
graph TD
    Client["Client / curl / Dashboard"] -->|HTTP REST| API["FastAPI Server (:8000)"]
    API -->|Submit Request / Set Policy| Engine["Iteration-Level Engine"]
    
    subgraph "Scheduling Subsystem"
        Engine <-->|next_step() / on_step_complete()| Sched["Scheduler Interface"]
        Sched --- FCFS["FCFS Scheduler"]
        Sched --- RR["Round-Robin Scheduler (Quantum Q)"]
        Sched --- SPF["Shortest-Prompt-First (Aging α)"]
        Sched --- DF["Decode-First (Chunk C)"]
    end
    
    subgraph "Backend Inference Abstraction"
        Engine -->|prefill() / decode_step()| Backend["Backend Interface"]
        Backend --- Sim["SimBackend (Parametric Latency)"]
        Backend --- Real["RealBackend (Qwen2.5 on CPU)"]
    end

    subgraph "Telemetry & Metrics Analysis"
        Engine --> Metrics["MetricsCollector"]
        Metrics --> Bench["Benchmark Runner"]
        Bench --> Plots["Matplotlib Plots & JSON Data"]
        Plots --> Dashboard["React Analytics Dashboard"]
    end
```

### 3.1 Request State Machine (`src/core/request.py`)

A request progresses monotonically through four states:
`WAITING` $\rightarrow$ `PREFILL` $\rightarrow$ `DECODE` $\rightarrow$ `DONE`

```python
@dataclass
class Request:
    id: str
    prompt_tokens: int
    max_output_tokens: int
    arrival_time: float

    state: RequestState = RequestState.WAITING
    tokens_generated: int = 0
    tokens_prefilled: int = 0

    # Timestamps (used for KPI derivation)
    first_scheduled: Optional[float] = None
    first_token_time: Optional[float] = None
    finish_time: Optional[float] = None

    # Metadata & Real Backend state
    prompt_text: str = ""
    policy: str = ""
    output_text: str = ""
    prompt_token_ids: Optional[List[int]] = None
    generated_token_ids: List[int] = field(default_factory=list)
    rr_steps_in_quantum: int = 0
```

#### Derived Key Performance Indicators (KPIs):
- **Waiting Time:** $\text{scheduled} - \text{arrival}$
- **Time-to-First-Token (TTFT):** $\text{first token} - \text{arrival}$
- **End-to-End Latency (E2E):** $\text{finish} - \text{arrival}$
- **Time-Per-Output-Token (TPOT):** $(\text{finish} - \text{first token}) / (\text{generated} - 1)$

### 3.2 The Four Scheduling Policies (`src/scheduler/`)

All policies implement `src.scheduler.base.Scheduler`:
1. `add_request(request: Request) -> None`
2. `next_step() -> Optional[ScheduleAction]` (where `ScheduleAction(action="prefill"|"decode", request=req, prefill_tokens=N)`)
3. `on_step_complete(request: Request) -> None`
4. `remove_request(request: Request) -> None`
5. `name() -> str`

#### 1. First-Come First-Served (`src/scheduler/fcfs.py`)
- Standard FIFO queue.
- Picks the oldest waiting request and runs its prefill to completion.
- Once in `DECODE`, it runs that request's decode steps continuously until `tokens_generated == max_output_tokens`.
- **Flaw:** Zero time-sharing; causes severe Head-of-Line blocking.

#### 2. Round-Robin (`src/scheduler/round_robin.py`)
- Maintains a prefill queue and a circular decode queue.
- Prefills newly arrived requests immediately if no decode is pending.
- In decode, grants each request a token quantum $Q$ (default $Q=4$).
- After generating $Q$ tokens, the request is rotated to the back of the active decode queue, allowing concurrent requests to interleave.
- **Strength:** Slashes TTFT by $>95\%$ under high concurrency.

#### 3. Shortest Prompt First (`src/scheduler/spf.py`)
- Priority queue ordered by effective prompt length:
  $$\text{Effective Length} = L_{\text{prompt}} - \alpha \cdot (t_{\text{current}} - t_{\text{arrival}})$$
- Short interactive prompts jump ahead of massive prompt prefills.
- The aging factor $\alpha$ guarantees that long prompts eventually gain priority, preventing starvation.

#### 4. Decode-First (`src/scheduler/decode_first.py`)
- Prioritizes active `DECODE` iterations over new `PREFILL` requests to keep GPU memory flowing and maintain a smooth, jitter-free reading speed (low TPOT variance).
- When a prefill must occur, it utilizes **chunked prefill** (chunk size $C=64$ tokens) so long prompts do not monopolize execution.

### 3.3 The Two Backends (`src/backend/`)

#### 1. SimBackend (`src/backend/sim.py`)
- Linear parametric latency formulation:
  $$T_{\text{prefill}} = a \cdot N_{\text{tokens}} + b \quad (a = 0.0005\text{ s/tok}, b = 0.02\text{ s})$$
  $$T_{\text{decode}} = c \cdot N_{\text{tokens}} \quad (c = 0.025\text{ s/tok} = 40\text{ tok/s})$$
- Deterministic, ultra-fast, and reproducible across varying workload distributions.

#### 2. RealBackend (`src/backend/real.py`)
- Loads **Qwen2.5-0.5B-Instruct** offline from `./models/Qwen2.5-0.5B-Instruct` using Hugging Face Transformers (`local_files_only=True`).
- Operates on CPU with `torch.float32`, `torch.inference_mode()`, and threads set to `os.cpu_count()`.
- **Chunked Prefill:** Takes `request.prompt_token_ids[start:end]`, updates per-request `DynamicCache`, and stores the argmax next token when the final prompt chunk completes.
- **Step-by-Step Decode:** Emits pending token, decodes accumulated text, checks for EOS (`<|im_end|>`, `<|endoftext|>`), and executes a single forward pass with `input_ids = [[token_id]]` and the request's cached KV tensors.
- **Cache Lifecycle:** Explicit `release(request)` method frees `DynamicCache` and state upon request completion.

### 3.4 Iteration-Level Engine (`src/engine/engine.py`)

- **Virtual-Time Mode (`run_virtual`):** Discrete-event simulation. Monotonically advances `_clock` by `backend.prefill()` or `backend.decode_step()`. Injects requests at their scheduled `arrival_time`. Runs 30,000+ token iterations in seconds without CPU sleeping.
- **Real-Time Mode (`start_realtime`):** Background daemon thread powering the FastAPI server. If `backend.name() == "sim"`, sleeps for `duration * time_scale`. If `backend.name() == "real"`, execution already takes physical wall-clock time, so sleeping is completely bypassed (`time_scale` ignored). All timestamps consistently use `time.time()`.

### 3.5 FastAPI REST Server (`src/api/server.py`)

- `POST /generate`: Submits an inference request. Blocks until generation completes. In real mode, tokenizes prompt via chat template and returns real model generated text with `"simulated": false`.
- `GET /health`: Health probe returning status, active policy, backend name, and simulation flag.
- `GET /metrics`: Returns aggregate statistics (mean, p50, p95, p99 for TTFT, TPOT, E2E, wait time, and throughput).
- `POST /policy`: Dynamic runtime switching between `fcfs`, `round_robin`, `spf`, and `decode_first` without restarting the server process.

---

## 4. Benchmark Suites & Quantitative Findings

The framework includes 5 comprehensive benchmark suites defined in [`configs/experiments.yaml`](file:///c:/Users/nitis/OneDrive/Desktop/M.Tech(CSE)/Sem%201/Core%20Courses/CLOUD/Project/configs/experiments.yaml):

| Suite | Description | Key Variable / Configurations | Policies Tested |
|---|---|---|---|
| **E1** | Load Sweep | Arrival rates $\lambda \in [0.5, 1.0, 2.0, 4.0, 8.0]$ req/s; bimodal prompt distribution, max 128 output tokens | FCFS, RR, SPF, DF |
| **E2** | Prompt Mix | Prompt length distributions: `short` (10–50 tokens), `long` (200–500 tokens), `bimodal` (80% short, 20% long mix); $\lambda = 2.0$, max 128 output tokens | FCFS, RR, SPF, DF |
| **E3** | Output Length | Max output tokens: 32, 128, 512 tokens; bimodal prompt distribution, $\lambda = 2.0$ | FCFS, RR, SPF, DF |
| **E4** | RR Quantum | Round-Robin decode quantum $Q \in [1, 4, 16, 64]$ tokens; $\lambda = 2.0$, max 128 output tokens | Round-Robin |
| **E5** | Burst Arrival | Burst arrival stress test: burst of 20 requests every 5.0 s (burst_size=20, burst_interval=5.0 s, arrival_rate=8.0 req/s); bimodal prompt distribution, max 128 output tokens | FCFS, RR, SPF, DF |

All experiments evaluate 3 random seeds (`[42, 123, 7]`) with 200 requests per run (10 warmup requests), totaling 31,200 evaluated request executions across the benchmark suite.

### Key Empirical Findings:

1. **Massive TTFT Reduction via Preemption:**
   Under heavy load (E1, arrival rate 8.0 req/s), FCFS exhibits an average TTFT of **345.4 seconds** due to HoL blocking. Round-Robin slashes this to **16.2 seconds** (about **95% lower**), because new requests are immediately prefilled and interleaved.
2. **Throughput Invariance:**
   Aggregate request throughput across all four policies is identical (~0.29 req/s under standard test loads). Schedulers do not create raw compute; they redistribute queue delays and latency percentiles.
3. **TTFT vs TPOT Tradeoff:**
   While Round-Robin optimizes TTFT, its inter-token decode latency (TPOT) increases under high concurrency because the engine rotates across $N$ active requests. Decode-First provides the most stable TPOT.
4. **Short-Prompt Bias in SPF:**
   SPF achieves optimal average TTFT under skewed bimodal distributions, but tail p99 TTFT for long prompts explodes unless the aging parameter $\alpha \ge 1.0$.
5. **Optimal Round-Robin Quantum ($Q$):**
   - $Q=1$: Minimizes TTFT (3.29s), but increases rotation overhead.
   - $Q=64$: Degrades into run-to-completion FCFS (TTFT 174.36s).
   - **Recommended Cloud Sweet Spot:** $Q=4$ tokens per quantum.

---

## 5. Interactive React Analytics Dashboard

Located in [`dashboard/`](file:///c:/Users/nitis/OneDrive/Desktop/M.Tech(CSE)/Sem%201/Core%20Courses/CLOUD/Project/dashboard), the dashboard is built with **React 18**, **Vite 5**, and **Recharts**:
- **Design System:** Custom dark theme (`#0a0e1a`) with glassmorphism, glowing policy markers, and micro-animations.
- **Embedded Data:** Embedded with all 31,200+ simulated benchmark request records in `dashboard/src/data/benchmarkData.js`.
- **Views:**
  1. *Overview & Findings:* Metric highlight cards and architectural tradeoff summaries.
  2. *E1 Load Sweep:* Interactive curves for P95 TTFT, E2E Latency, and Throughput.
  3. *E2 Prompt Mix:* Bar chart comparing sensitivity across prompt lengths.
  4. *E3 Output Length:* E2E latency distributions across generation patterns.
  5. *E4 RR Quantum:* Dual-axis line chart illustrating the latency vs throughput trade-off.
  6. *E5 Burst Resilience:* Resilience to traffic spikes.
  7. *Full Results Table:* Filterable data matrix with raw percentiles.

Run locally:
```powershell
cd dashboard
npm run dev
```

---

## 6. Docker & Containerization Architecture

The multi-stage [Dockerfile](file:///c:/Users/nitis/OneDrive/Desktop/M.Tech(CSE)/Sem%201/Core%20Courses/CLOUD/Project/Dockerfile) and [docker-compose.yml](file:///c:/Users/nitis/OneDrive/Desktop/M.Tech(CSE)/Sem%201/Core%20Courses/CLOUD/Project/docker-compose.yml) manage all services:

### Services Defined:
1. `llm-server` (profile: default):
   - Fast simulated inference API server on port 8000.
2. `llm-server-real` (profile: `real`):
   - Real local Qwen2.5 server on port 8000.
   - Mounts `./models:/models:ro`, enforces 4 GB RAM limit, builds with `INSTALL_REAL=true`.
3. `benchmark` (profile: `bench`):
   - Executes the full E1–E5 benchmark matrix.
4. `analysis` (profile: `bench`):
   - Compiles results into Matplotlib PNG figures and markdown tables.
5. `test` (profile: `test`):
   - Runs the complete Pytest suite inside Docker.

---

## 7. Automated Test Suite (44 Tests)

All tests are in `tests/` (44 collected tests total: 41 passing, 3 skipped when offline model weights are not downloaded):
- `tests/test_schedulers.py` (19 tests): Validates FCFS run-to-completion, Round-Robin quantum rotation, SPF prompt prioritization and aging starvation prevention, and Decode-First chunked prefill.
- `tests/test_engine.py` (9 tests): Validates virtual clock advancement, timestamp monotonicity, event callbacks, and large synthetic workloads.
- `tests/test_metrics.py` (12 tests): Validates TTFT, TPOT, E2E, wait time calculations, warmup trimming, percentile math, and dictionary serialization.
- `tests/test_real_backend.py` (4 tests): Validates missing-path exception handling, text generation on CPU, chunked prefill equivalence (chunk size 16 produces the identical initial token as one-shot prefill), and KV cache isolation (interleaved requests do not corrupt each other's output). Model generation tests are skipped if local model weights are absent.

Execute test suite:
```powershell
python -m pytest tests/ -v
```

---

## 8. Solved Bugs & Technical Gotchas (Critical History)

1. **Virtual Clock Inversion Bug:**
   - *Issue:* In early versions of `engine.py`, `self._clock` was advanced *after* `_execute_step`, but `mark_first_token` was stamped before advancing.
   - *Fix:* In `_execute_step`, temporarily advance `_clock += duration` when recording `mark_first_token` and `mark_done`, then revert for the caller.
2. **Chunked Prefill Offset Ordering:**
   - *Issue:* In `DecodeFirst`, `request.tokens_prefilled` was updated after `prefill()`. Passing `tokens_prefilled` directly into slicing caused offset errors.
   - *Fix:* Explicitly slice `prompt_token_ids[tokens_prefilled : tokens_prefilled + num_tokens]`.
3. **Real Backend Sleeping Bypass:**
   - *Issue:* In real-time mode, `start_realtime()` originally called `time.sleep(duration * time_scale)`. When running a real model, this double-delayed execution.
   - *Fix:* Added `if time_scale > 0 and self.backend.name() != "real": time.sleep(...)`.
4. **FastAPI Dynamic Policy Switch Engine Lifecycle:**
   - *Issue:* Calling `POST /policy` changed the policy but kept the old engine thread alive.
   - *Fix:* Properly stop the active engine thread (`old_engine.stop_realtime()`), instantiate the new scheduler and engine, and start the new thread.
5. **PowerShell Quoting with JSON curl:**
   - *Issue:* Windows PowerShell parses quotes inside `-d "{\"prompt\": \"...\"}"` differently than bash.
   - *Fix:* Provided native `Invoke-RestMethod` scripts ([`scripts/demo_curl.ps1`](file:///c:/Users/nitis/OneDrive/Desktop/M.Tech(CSE)/Sem%201/Core%20Courses/CLOUD/Project/scripts/demo_curl.ps1)) alongside bash scripts.

---

## 9. Quick Command Reference

```powershell
# 1. Run all unit tests
python -m pytest tests/ -v

# 2. Check local Qwen2.5 model & latency
python scripts/check_model.py

# 3. Start simulated API server
python -m uvicorn src.api.server:app --host 0.0.0.0 --port 8000

# 4. Start real LLM server with Docker
docker compose --profile real up --build llm-server-real

# 5. Run API demo across all 4 policies
powershell -ExecutionPolicy Bypass -File .\scripts\demo_curl.ps1

# 6. Run concurrent HoL blocking demonstration
python scripts/concurrent_demo.py --compare

# 7. Start React Analytics Dashboard
cd dashboard ; npm run dev

# 8. Re-package complete project into submission ZIP
powershell -ExecutionPolicy Bypass -File .\scripts\package_submission.ps1
```
