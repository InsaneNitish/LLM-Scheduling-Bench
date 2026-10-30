# LLM Scheduler Bench

A Docker-based benchmarking and simulation system for evaluating iteration-level Large Language Model (LLM) scheduling policies. Implements and empirically compares four scheduling strategies — **FCFS**, **Round Robin**, **Shortest Prompt First (SPF)**, and **Decode First (DF)** — inspired by state-of-the-art serving systems like ORCA (OSDI'22) and SARATHI (arXiv:2308.16369).

## Repository

Repository: <paste your GitHub URL here>

---

## Two Execution Modes

LLM Scheduler Bench provides two distinct execution modes:

1. **Simulated Mode (`BACKEND=sim`, default):** Uses a parametric latency model for high-speed discrete-event simulation. Evaluates tens of thousands of requests in seconds to conduct extensive multi-variable load sweeps, arrival distributions, and sensitivity analyses.
2. **Real Mode (`BACKEND=real`):** Loads a real local language model (**Qwen2.5-0.5B-Instruct**) on CPU using Hugging Face Transformers (`torch.float32`, greedy decoding). Interacts live over HTTP REST, generating real textual completions token-by-token across concurrent requests and powering live curl demos.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FastAPI Server                          │
│   POST /generate  GET /health  GET /metrics  GET/POST /policy   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │    Engine     │  ORCA-style iteration-level
                    │  (Virtual /   │  scheduling loop
                    │   Real-time)  │
                    └───┬───────┬───┘
                        │       │
              ┌─────────▼──┐  ┌─▼──────────┐
              │  Scheduler │  │  Backend    │
              │  (Policy)  │  │  (Sim/Real) │
              └────────────┘  └─────────────┘
                   │                 │
          ┌────────┼────────┐       ├── SimBackend (linear parametric latency model)
          │    │    │    │   │      │
        FCFS  RR  SPF  DF   │      └── RealBackend (Qwen2.5-0.5B-Instruct on CPU)
```

---

## Scheduling Policies

| Policy | Description | Trade-offs |
|--------|-------------|------------|
| **FCFS** | First-Come First-Served. Runs each request through prefill and decode to completion. | Simple, predictable, but suffers severe head-of-line (HoL) blocking under long requests. |
| **Round Robin** | Rotates decode steps across active requests with a configurable token quantum ($Q$). | Fair, prevents starvation, slashes TTFT, but introduces context rotation overhead. |
| **Shortest Prompt First** | Prioritizes requests with the shortest prompt token count; includes dynamic aging. | Near-optimal TTFT for interactive queries; requires aging to prevent long-prompt starvation. |
| **Decode First** | Prioritizes active DECODE iterations over new PREFILLs; supports chunked prefill. | Minimizes per-token latency jitter (TPOT) for streaming responses. |

---

## Metrics

- **TTFT** — Time To First Token ($T_{\text{first\_token}} - T_{\text{arrival}}$)
- **TPOT** — Time Per Output Token ($[T_{\text{completion}} - T_{\text{first\_token}}] / [N_{\text{tokens}} - 1]$)
- **E2E Latency** — Total turnaround time ($T_{\text{completion}} - T_{\text{arrival}}$)
- **Waiting Time** — Queue latency before first execution ($T_{\text{scheduled}} - T_{\text{arrival}}$)
- **Throughput** — Completed requests per second
- **Percentiles** — p50, p95, and p99 distributions across all metrics

---

## Prerequisites & Windows Setup

### Hardware & Engine Requirements
- **Docker & Docker Compose:** Docker Desktop with WSL2 backend on Windows (or native Docker on Linux/macOS).
- **RAM Allocation:** Allocate at least **4 GB RAM** (recommended **6 GB RAM**) to Docker.
  - On Windows with WSL2, create or edit `%USERPROFILE%\.wslconfig`:
    ```ini
    [wsl2]
    memory=6GB
    processors=4
    ```
  - Apply the changes by running:
    ```cmd
    wsl --shutdown
    ```
- **Disk Space:** ~1.2 GB for the local model weights in `./models/`.
- **Python 3.10+** (if executing scripts or tests locally outside Docker).

---

## Model Download (For Real Backend)

The real backend runs **Qwen2.5-0.5B-Instruct** offline from `./models/Qwen2.5-0.5B-Instruct`. Download the model once prior to starting the real server:

```bash
# Using huggingface_hub CLI
pip install -U huggingface_hub
hf download Qwen/Qwen2.5-0.5B-Instruct --local-dir models/Qwen2.5-0.5B-Instruct
```

Alternatively, download via Python:
```bash
python -c "from huggingface_hub import snapshot_download; snapshot_download('Qwen/Qwen2.5-0.5B-Instruct', local_dir='models/Qwen2.5-0.5B-Instruct')"
```

To verify the model weights locally before running Docker:
```bash
python scripts/check_model.py
```

---

## Running the Servers

> **CRITICAL OPERATIONAL RULES:**
> 1. **Port Sharing:** Both `llm-server` and `llm-server-real` map to host port `8000`. **Only run one server container at a time.**
> 2. **In-Flight Requests:** Do not switch scheduling policies (`POST /policy`) while requests are actively in flight.

### Option A: Run the Real LLM Server (Live Qwen2.5 Model)

Builds the container with PyTorch and Transformers and runs Qwen2.5 on CPU:

```bash
docker compose --profile real up --build llm-server-real
```

Wait until the container reports healthy:
```powershell
docker compose ps
```

### Option B: Run the Simulated Server (Fast Benchmarking)

Starts the simulated server using the linear parametric latency model:

```bash
docker compose up llm-server -d
```

---

## API & curl Examples

### 1. Health Check

```bash
# Linux / macOS
curl -s http://localhost:8000/health

# Windows PowerShell
Invoke-RestMethod -Uri http://localhost:8000/health -Method Get
```

Expected response in real mode:
```json
{
  "status": "ok",
  "policy": "fcfs",
  "backend": "real",
  "simulated": false
}
```

### 2. Switching Scheduling Policy

Switch the active scheduling algorithm dynamically without restarting the server:

```bash
# Linux / macOS
curl -X POST http://localhost:8000/policy \
  -H "Content-Type: application/json" \
  -d '{"policy": "round_robin"}'

# Windows PowerShell (Invoke-RestMethod)
Invoke-RestMethod -Uri http://localhost:8000/policy -Method Post `
  -Body (@{ policy = "round_robin" } | ConvertTo-Json) -ContentType "application/json"
```

Supported policy names: `fcfs`, `round_robin`, `spf`, `decode_first`.

### 3. Submitting Generation Requests (`/generate`)

#### Windows PowerShell (Recommended Approach via JSON file):
Quoting inline JSON on the Windows command line is error-prone. The cleanest and most reliable way with `curl.exe` is creating a `request.json` file:

```powershell
# Create request payload file
@"
{
  "prompt": "Explain what an operating system scheduler does in two sentences.",
  "max_tokens": 48
}
"@ | Out-File -Encoding utf8 request.json

# Submit via curl.exe
curl.exe -sS -X POST http://localhost:8000/generate `
  -H "Content-Type: application/json" `
  -d @request.json
```

#### Windows PowerShell (via `Invoke-RestMethod`):
```powershell
$body = @{
    prompt = "Explain what an operating system scheduler does in two sentences."
    max_tokens = 48
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:8000/generate -Method Post -Body $body -ContentType "application/json"
```

#### Linux / macOS (via `curl`):
```bash
curl -sS -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain what an operating system scheduler does in two sentences.",
    "max_tokens": 48
  }'
```

Sample Real Backend Response:
```json
{
  "text": "An operating system scheduler allocates CPU time to active processes, ensuring responsive multitasking and balanced resource utilization.",
  "ttft": 0.1824,
  "waiting_time": 0.0012,
  "e2e_latency": 1.4285,
  "tokens": 48,
  "policy": "round_robin",
  "simulated": false
}
```

### 4. Automated Demo Scripts

Run automated test sequences across all four policies:

- **Linux / macOS (Bash):**
  ```bash
  chmod +x scripts/demo_curl.sh
  ./scripts/demo_curl.sh
  ```
- **Windows (PowerShell):**
  ```powershell
  powershell -ExecutionPolicy Bypass -File .\scripts\demo_curl.ps1
  ```

---

## Demonstrating Head-of-Line Blocking (`scripts/concurrent_demo.py`)

To evaluate how Round-Robin and SPF eliminate head-of-line blocking compared to FCFS under concurrent traffic, run:

```bash
# Compare FCFS, Round-Robin, SPF, and Decode-First side-by-side
python scripts/concurrent_demo.py --compare
```

This sends 4 concurrent requests (1 heavy ~250-word prompt request followed immediately by 3 short interactive queries dispatched 0.3s apart).
- Under **FCFS**, the short queries wait in the queue until the long request finishes generating all tokens.
- Under **Round-Robin**, the short queries are interleaved into the token budget and achieve significantly lower TTFT.

---

## Real Model Validation

When evaluated with the live Qwen2.5-0.5B model on CPU inside Docker (`docker compose --profile real up --build llm-server-real`), scheduling policies are tested using `scripts/demo_curl.*` and `scripts/concurrent_demo.py --compare`.
- The multi-threaded client dispatches 1 long request and 3 short interactive requests concurrently under each policy and tracks TTFT, waiting time, and E2E latency.
- The comparison table is written to `results/real_concurrent_demo.md` and raw telemetry to `results/real_concurrent_demo.json`.

*Measured results: paste the contents of results/real_concurrent_demo.md here after running the demo.*

---

## Running Simulated Benchmarks & Analysis

The benchmark suite evaluates five key experiments:

| ID | Name | Objective |
|----|------|-----------|
| **E1** | Load Sweep | TTFT, E2E latency, and throughput across arrival rates $\lambda \in [0.5, 1.0, 2.0, 4.0, 8.0]$ req/s. |
| **E2** | Prompt Mix | Sensitivity to Short (10–50 tokens), Long (200–500 tokens), and Bimodal prompt length distributions. |
| **E3** | Output Length | Impact of output generation lengths (32, 128, 512 tokens). |
| **E4** | RR Quantum | Sensitivity sweep of Round-Robin token quantum ($Q \in \{1, 4, 16, 64\}$). |
| **E5** | Burst Arrival | System recovery dynamics under burst arrivals (20 requests every 5.0 s at 8.0 req/s). |

### Run Full Benchmark Pipeline with Docker:

```bash
docker compose --profile bench up --build
```
Results are saved to `./results/` (CSV & JSON), and generated charts are saved to `./plots/`.

### Run Benchmark Analysis / Reproduce Graphs:

```bash
docker compose run --rm analysis
```

Generated plots in `./plots/`:
- `ttft_vs_load.png` — TTFT (mean & p99) vs arrival rate
- `e2e_vs_load.png` — End-to-end latency vs arrival rate
- `throughput_bar.png` — Throughput comparison across policies
- `waiting_time_cdf.png` — Empirical CDF of request waiting time
- `fairness_short_vs_long.png` — Short vs long prompt fairness comparison
- `rr_quantum_sweep.png` — Latency vs throughput tradeoff across quanta
- `timeline_gantt.png` — Fine-grained token execution timeline

---

## Interactive Web Dashboard

To explore all benchmark results interactively:

```powershell
cd dashboard
npm install
npm run dev
```
Open **`http://localhost:5173`** to access interactive Recharts visualizations.

---

## Packaging Submission Bundle

To create a clean, Linux-compatible submission zip archive (excluding model weights, caches, and node_modules):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\package_submission.ps1
```
This produces `../LLM_Scheduler_Bench_Submission.zip` with verified forward-slash paths.

---

## Project Structure

```
Project/
├── Dockerfile                    # Multi-stage Dockerfile (supports simulated & real backend)
├── docker-compose.yml            # Compose configurations (llm-server, llm-server-real, bench)
├── Makefile                      # Make targets for build, test, and run
├── requirements.txt              # Core simulation dependencies (FastAPI, uvicorn, pytest, httpx, matplotlib)
├── requirements-real.txt         # Real backend ML dependencies (PyTorch CPU, Transformers)
├── README.md                     # Comprehensive system documentation
├── CURRENT_STATE_AND_MODEL_HANDOFF.md # Master handoff specification document
├── .gitignore                    # Excludes model weights, pycache, dist, and zip archives
├── .dockerignore                 # Excludes models, git, and build caches from image build context
├── configs/
│   ├── latency_model.json        # Simulated parametric latency constants
│   └── experiments.yaml          # Benchmark experiment matrices
├── models/
│   ├── .gitkeep                  # Preserves directory in git
│   ├── README.md                 # Model download instructions
│   └── Qwen2.5-0.5B-Instruct/    # Local offline model weights (downloaded)
├── src/
│   ├── api/
│   │   └── server.py             # FastAPI REST endpoints (/generate, /health, /policy)
│   ├── backend/
│   │   ├── base.py               # Abstract Backend interface (prefill, decode_step)
│   │   ├── sim.py                # SimBackend (parametric latency model)
│   │   └── real.py               # RealBackend (Qwen2.5-0.5B on CPU via Transformers)
│   ├── core/
│   │   ├── request.py            # Request state machine and metrics timestamps
│   │   └── metrics.py            # MetricsCollector (p50, p95, p99, throughput)
│   ├── engine/
│   │   └── engine.py             # ORCA-style iteration-level engine (virtual & real-time)
│   ├── scheduler/
│   │   ├── base.py               # Abstract Scheduler interface
│   │   ├── fcfs.py               # First-Come First-Served policy
│   │   ├── round_robin.py        # Round Robin policy with token quantum
│   │   ├── spf.py                # Shortest Prompt First policy with aging
│   │   └── decode_first.py       # Decode First policy with chunked prefill
│   ├── workload/
│   │   └── generator.py          # Synthetic Poisson & burst workload generator
│   └── benchmark/
│       ├── run_benchmark.py       # Automated benchmark experiment executor
│       └── analyze.py             # Matplotlib visualizer and results compiler
├── tests/
│   ├── test_schedulers.py        # Scheduler logic tests
│   ├── test_metrics.py           # Metric calculation tests
│   ├── test_engine.py            # Virtual & real-time engine tests
│   └── test_real_backend.py      # RealBackend generation & KV cache isolation tests
├── scripts/
│   ├── check_model.py            # Verifies local model and measures prefill/decode time
│   ├── demo_curl.sh              # Bash API demo across all policies
│   ├── demo_curl.ps1             # PowerShell API demo across all policies
│   ├── concurrent_demo.py        # Concurrent request demo (demonstrates HoL blocking)
│   └── package_submission.ps1    # Automated submission zip packager
├── results/                      # Raw benchmark outputs (CSV & JSON)
├── plots/                        # Generated benchmark figures & charts
├── report/
│   ├── project_report.md         # Full academic project report (IEEE/ACM style)
│   └── analysis_report.md        # In-depth empirical benchmark findings report
└── dashboard/                    # React + Vite interactive analytics dashboard
```

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BACKEND` | `sim` | Inference backend: `sim` or `real` |
| `MODEL_PATH` | `/models/Qwen2.5-0.5B-Instruct` | Path to offline model directory |
| `DEFAULT_POLICY` | `fcfs` | Default scheduling policy: `fcfs`, `round_robin`, `spf`, `decode_first` |
| `TIME_SCALE` | `1.0` | Real-time mode speed multiplier (simulated mode only) |
| `RR_QUANTUM` | `4` | Round-Robin decode step quantum |
| `CHUNK_SIZE` | `64` | Chunked prefill token size for Decode-First |
| `RESULTS_DIR` | `/results` | Benchmark output directory |
| `PLOTS_DIR` | `/plots` | Analysis plots directory |

---

## Running Unit Tests

Run the complete test suite:
```bash
python -m pytest tests/ -v
```

---

## References

1. **ORCA**: Yu et al., *"ORCA: A Distributed Serving System for Transformer-Based Generative Models,"* OSDI 2022.
2. **SARATHI**: Agrawal et al., *"SARATHI: Efficient LLM Inference by Piggybacking Decodes with Chunked Prefills,"* arXiv:2308.16369.
3. **vLLM**: Kwon et al., *"Efficient Memory Management for Large Language Model Serving with PagedAttention,"* SOSP 2023.

---

## License

MIT
