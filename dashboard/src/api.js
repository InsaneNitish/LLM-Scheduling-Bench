/**
 * API client for LLM Scheduler Bench FastAPI backend.
 * All requests route through the Vite dev-server proxy (/api -> http://localhost:8000).
 */

export const API_BASE = import.meta.env.VITE_API_BASE || '/api';

/**
 * Internal helper to perform fetch and handle HTTP errors gracefully.
 */
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  let response;

  try {
    response = await fetch(url, options);
  } catch (err) {
    if (err.name === 'AbortError') {
      throw err;
    }
    throw new Error(`Network failure connecting to ${url}: ${err.message || 'Server unreachable'}`);
  }

  let data = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    let detailMsg = '';
    if (data && data.detail) {
      detailMsg = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
    }
    const errorText = detailMsg
      ? `HTTP ${response.status}: ${detailMsg}`
      : `HTTP ${response.status} ${response.statusText}`;
    throw new Error(errorText);
  }

  return data;
}

/**
 * GET /health
 * Returns { status: "ok", policy: "...", backend: "sim"|"real", simulated: bool }
 */
export async function getHealth(signal) {
  return request('/health', { signal });
}

/**
 * GET /metrics
 * Returns { summary: {...}, completed_requests: number, active_policy: "...", ... }
 */
export async function getMetrics(signal) {
  return request('/metrics', { signal });
}

/**
 * GET /policy
 * Returns { active_policy: "..." }
 */
export async function getPolicy(signal) {
  return request('/policy', { signal });
}

/**
 * POST /policy
 * Body: { policy: "fcfs"|"round_robin"|"spf"|"decode_first" }
 * Returns { active_policy: "..." }
 */
export async function setPolicy(name, signal) {
  return request('/policy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ policy: name }),
    signal,
  });
}

/**
 * POST /generate
 * Body: { prompt: string, max_tokens: number }
 * Returns { text, ttft, waiting_time, e2e_latency, tokens, policy, simulated }
 * Accepts an AbortSignal and does NOT impose any client-side timeout.
 */
export async function generate({ prompt, max_tokens }, signal) {
  return request('/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, max_tokens }),
    signal,
  });
}
