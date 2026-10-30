# ============================================================
# LLM Scheduler Bench — Docker Image
# Simulated & Real LLM serving system for scheduling policy benchmarks
# ============================================================
FROM python:3.11-slim AS base

LABEL maintainer="llm-scheduler-bench"
LABEL description="LLM scheduling benchmark system (simulated & real)"

# Build argument to optionally install real backend ML libraries (torch, transformers)
ARG INSTALL_REAL=false

# Prevent Python from writing .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    BACKEND=sim \
    DEFAULT_POLICY=fcfs \
    TIME_SCALE=1.0

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser -m appuser

WORKDIR /app

# Install base dependencies, and conditionally install real model backend packages
COPY requirements.txt requirements-real.txt ./
RUN pip install --no-cache-dir -r requirements.txt && \
    if [ "$INSTALL_REAL" = "true" ]; then \
        pip install --no-cache-dir --extra-index-url https://download.pytorch.org/whl/cpu -r requirements-real.txt ; \
    fi

# Copy source code, configurations, and test suites
COPY src/ src/
COPY configs/ configs/
COPY tests/ tests/

# Create output and model directories with non-root ownership
RUN mkdir -p /results /plots /report /models && \
    chown -R appuser:appuser /app /results /plots /report /models

USER appuser

# Health check with 120s start-period to accommodate model loading on CPU
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
    CMD python -c "import httpx; r = httpx.get('http://localhost:8000/health'); r.raise_for_status()" || exit 1

EXPOSE 8000

# Default command: run the API server
CMD ["python", "-m", "uvicorn", "src.api.server:app", "--host", "0.0.0.0", "--port", "8000"]
