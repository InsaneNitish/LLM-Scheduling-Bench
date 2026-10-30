import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { getHealth, getMetrics, getPolicy, setPolicy, generate } from './api';
import './App.css';

// Readable ~200 words text for the heavy/long prompt test
const LONG_PROMPT_TEXT = (
  "Please provide a comprehensive summary of the following passage on modern cloud computing architectures: " +
  "In large language model serving architectures, scheduling algorithms play a fundamental role in arbitrating " +
  "access to shared computational accelerators such as graphics processing units. Deep learning inference diverges " +
  "sharply from conventional web service request lifecycles due to its two-phase execution profile: an initial compute-heavy " +
  "prefill phase followed by an autoregressive memory-bandwidth-bound decode phase. During prefill, the entire input prompt " +
  "is ingested concurrently, exercising matrix multiplication units at peak computational intensity. Conversely, each decode step " +
  "generates merely one token per sequence, repeatedly loading high-dimensional weight matrices and key-value cache memory from " +
  "device high-bandwidth memory into fast register files. Under naive first-come first-served queue disciplines, a long document " +
  "summarization query monopolizes the execution pipeline, inducing severe head-of-line blocking for subsequent lightweight interactive " +
  "queries. Modern iteration-level serving systems address this structural deficiency by decomposing the scheduling granularity down " +
  "to individual forward-pass steps. By employing preemptive round-robin time slicing, dynamic prompt aging, and chunked prefill pipelining, " +
  "multi-tenant cloud inference platforms can dramatically attenuate time-to-first-token latency while preserving high hardware utilization " +
  "and steady per-token generation speeds across heterogeneous production workloads."
);

const POLICIES = [
  { id: 'fcfs', name: 'FCFS', desc: 'First-Come First-Served' },
  { id: 'round_robin', name: 'Round-Robin', desc: 'Token Quantum Preemption' },
  { id: 'spf', name: 'SPF', desc: 'Shortest-Prompt-First' },
  { id: 'decode_first', name: 'Decode-First', desc: 'Chunked Prefill Priority' },
];

/**
 * Format numeric seconds with 2 decimals, or display em dash if invalid.
 */
function formatSec(val) {
  if (val == null || isNaN(val) || val === '') return '—';
  return `${Number(val).toFixed(2)}s`;
}

/**
 * Format generic numbers with given decimals.
 */
function formatNum(val, dec = 2) {
  if (val == null || isNaN(val) || val === '') return '—';
  return Number(val).toFixed(dec);
}

export default function LiveTab() {
  // Connection & Server state
  const [serverState, setServerState] = useState({
    connected: false,
    backend: 'unknown',
    simulated: true,
    policy: 'fcfs',
    error: null,
  });

  // Server-side aggregate metrics
  const [serverMetrics, setServerMetrics] = useState(null);
  const [metricsLastUpdated, setMetricsLastUpdated] = useState(null);

  // Policy switching state
  const [isSwitchingPolicy, setIsSwitchingPolicy] = useState(false);
  const [policyError, setPolicyError] = useState(null);

  // Single request form state
  const [prompt, setPrompt] = useState('Explain what a scheduler does in two sentences.');
  const [maxTokens, setMaxTokens] = useState(48);
  const [isSinglePending, setIsSinglePending] = useState(false);
  const [singleElapsed, setSingleElapsed] = useState(0);
  const [singleResult, setSingleResult] = useState(null);
  const [singleError, setSingleError] = useState(null);
  const singleAbortRef = useRef(null);

  // Concurrent scenario state
  const [burstN, setBurstN] = useState(3);
  const [isConcurrentPending, setIsConcurrentPending] = useState(false);
  const [concurrentTasks, setConcurrentTasks] = useState([]);
  const [concurrentCompleted, setConcurrentCompleted] = useState(false);
  const concurrentAbortRef = useRef(null);

  // Request history (max 50)
  const [history, setHistory] = useState([]);

  // Refs for tracking mounted state and overlapping intervals
  const isMountedRef = useRef(true);
  const isHealthPollingRef = useRef(false);
  const isMetricsPollingRef = useRef(false);

  // Check if any request is currently in flight
  const hasInFlightRequests = isSinglePending || isConcurrentPending;

  // Append a completed request to history
  const addHistoryItem = useCallback((item) => {
    if (!isMountedRef.current) return;
    setHistory((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        time: new Date().toLocaleTimeString(),
        ...item,
      },
      ...prev.slice(0, 49),
    ]);
  }, []);

  // --- Health Polling (every 3 seconds) ---
  useEffect(() => {
    isMountedRef.current = true;

    async function pollHealth() {
      if (!isMountedRef.current || isHealthPollingRef.current) return;
      isHealthPollingRef.current = true;
      try {
        const data = await getHealth();
        if (!isMountedRef.current) return;
        setServerState({
          connected: true,
          backend: data.backend || 'sim',
          simulated: data.simulated !== false,
          policy: data.policy || 'fcfs',
          error: null,
        });
      } catch (err) {
        if (!isMountedRef.current) return;
        setServerState((prev) => ({
          ...prev,
          connected: false,
          error: err.message,
        }));
      } finally {
        isHealthPollingRef.current = false;
      }
    }

    pollHealth();
    const interval = setInterval(pollHealth, 3000);
    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  // --- Metrics Polling (every 2 seconds if server is connected) ---
  useEffect(() => {
    async function pollMetrics() {
      if (!isMountedRef.current || isMetricsPollingRef.current || !serverState.connected) return;
      isMetricsPollingRef.current = true;
      try {
        const data = await getMetrics();
        if (!isMountedRef.current) return;
        setServerMetrics(data);
        setMetricsLastUpdated(new Date().toLocaleTimeString());
      } catch {
        // Silently tolerate single tick network lapses while connected
      } finally {
        isMetricsPollingRef.current = false;
      }
    }

    if (serverState.connected) {
      pollMetrics();
    }
    const interval = setInterval(pollMetrics, 2000);
    return () => clearInterval(interval);
  }, [serverState.connected]);

  // --- Timer for Single Request ---
  useEffect(() => {
    let timer;
    if (isSinglePending) {
      const startTime = Date.now();
      timer = setInterval(() => {
        setSingleElapsed(((Date.now() - startTime) / 1000).toFixed(1));
      }, 100);
    } else {
      setSingleElapsed(0);
    }
    return () => clearInterval(timer);
  }, [isSinglePending]);

  // --- Policy Switch Handler ---
  const handlePolicyChange = async (newPolicy) => {
    if (hasInFlightRequests || isSwitchingPolicy) return;
    setIsSwitchingPolicy(true);
    setPolicyError(null);
    try {
      const res = await setPolicy(newPolicy);
      if (!isMountedRef.current) return;
      setServerState((prev) => ({ ...prev, policy: res.active_policy }));
    } catch (err) {
      if (!isMountedRef.current) return;
      setPolicyError(err.message);
    } finally {
      if (isMountedRef.current) {
        setIsSwitchingPolicy(false);
      }
    }
  };

  // --- Single Request Handler ---
  const handleSendSingle = async () => {
    if (!prompt.trim() || isSinglePending) return;

    setIsSinglePending(true);
    setSingleError(null);
    setSingleResult(null);

    const controller = new AbortController();
    singleAbortRef.current = controller;

    try {
      const res = await generate(
        { prompt: prompt.trim(), max_tokens: Number(maxTokens) },
        controller.signal
      );

      if (!isMountedRef.current) return;
      setSingleResult(res);
      addHistoryItem({
        label: 'Single Request',
        policy: res.policy || serverState.policy,
        backend: serverState.backend,
        simulated: res.simulated,
        tokens: res.tokens,
        ttft: res.ttft,
        waiting: res.waiting_time,
        e2e: res.e2e_latency,
        text: res.text,
      });
    } catch (err) {
      if (!isMountedRef.current) return;
      if (err.name === 'AbortError') {
        setSingleError('Request was aborted by user.');
      } else {
        setSingleError(err.message);
      }
    } finally {
      if (isMountedRef.current) {
        setIsSinglePending(false);
        singleAbortRef.current = null;
      }
    }
  };

  const handleCancelSingle = () => {
    if (singleAbortRef.current) {
      singleAbortRef.current.abort();
    }
  };

  // --- Concurrent Execution Engine ---
  const executeConcurrent = async (workloadList) => {
    if (hasInFlightRequests) return;

    setIsConcurrentPending(true);
    setConcurrentCompleted(false);

    const controller = new AbortController();
    concurrentAbortRef.current = controller;

    // Initialize tasks in state
    const initialTasks = workloadList.map((item, idx) => ({
      id: idx + 1,
      label: item.label,
      prompt: item.prompt,
      maxTokens: item.maxTokens,
      delay: item.delay || 0,
      status: 'queued', // queued -> running -> done | error
      elapsed: 0,
      startTime: null,
      data: null,
      error: null,
    }));

    setConcurrentTasks(initialTasks);

    // Live timer for concurrent tasks
    const timerInterval = setInterval(() => {
      setConcurrentTasks((current) =>
        current.map((task) => {
          if (task.status === 'running' && task.startTime) {
            return {
              ...task,
              elapsed: ((Date.now() - task.startTime) / 1000).toFixed(1),
            };
          }
          return task;
        })
      );
    }, 100);

    // Launch each task respecting optional dispatch delay
    const promises = initialTasks.map(async (task) => {
      if (task.delay > 0) {
        await new Promise((r) => setTimeout(r, task.delay * 1000));
      }

      if (controller.signal.aborted) {
        setConcurrentTasks((prev) =>
          prev.map((t) => (t.id === task.id ? { ...t, status: 'error', error: 'Aborted' } : t))
        );
        return;
      }

      // Mark running
      const startT = Date.now();
      setConcurrentTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: 'running', startTime: startT } : t
        )
      );

      try {
        const res = await generate(
          { prompt: task.prompt, max_tokens: task.maxTokens },
          controller.signal
        );

        if (!isMountedRef.current) return;
        const totalElapsed = ((Date.now() - startT) / 1000).toFixed(2);

        setConcurrentTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: 'done', elapsed: totalElapsed, data: res }
              : t
          )
        );

        addHistoryItem({
          label: task.label,
          policy: res.policy || serverState.policy,
          backend: serverState.backend,
          simulated: res.simulated,
          tokens: res.tokens,
          ttft: res.ttft,
          waiting: res.waiting_time,
          e2e: res.e2e_latency,
          text: res.text,
        });
      } catch (err) {
        if (!isMountedRef.current) return;
        const totalElapsed = ((Date.now() - startT) / 1000).toFixed(2);
        setConcurrentTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? {
                  ...t,
                  status: 'error',
                  elapsed: totalElapsed,
                  error: err.name === 'AbortError' ? 'Aborted' : err.message,
                }
              : t
          )
        );
      }
    });

    await Promise.all(promises);
    clearInterval(timerInterval);

    if (isMountedRef.current) {
      setIsConcurrentPending(false);
      setConcurrentCompleted(true);
      concurrentAbortRef.current = null;
    }
  };

  // Scenario 1: 1 Long + 3 Short queries (0.3s apart)
  const handleRunHoLScenario = () => {
    const shortTokens = Math.min(Number(maxTokens) || 48, 24);
    const workload = [
      {
        label: 'Long (Summary)',
        prompt: LONG_PROMPT_TEXT,
        maxTokens: Number(maxTokens) || 48,
        delay: 0,
      },
      {
        label: 'Short 1 (2+2)',
        prompt: 'What is 2+2?',
        maxTokens: shortTokens,
        delay: 0.3,
      },
      {
        label: 'Short 2 (Color)',
        prompt: 'Name a color.',
        maxTokens: shortTokens,
        delay: 0.6,
      },
      {
        label: 'Short 3 (Hello)',
        prompt: 'Say hello.',
        maxTokens: shortTokens,
        delay: 0.9,
      },
    ];
    executeConcurrent(workload);
  };

  // Scenario 2: N identical copies at once
  const handleRunNConcurrent = () => {
    const n = Math.max(1, Math.min(8, Number(burstN) || 3));
    const workload = Array.from({ length: n }, (_, i) => ({
      label: `Req ${i + 1}`,
      prompt: prompt.trim() || 'Explain what a scheduler does.',
      maxTokens: Number(maxTokens) || 48,
      delay: 0,
    }));
    executeConcurrent(workload);
  };

  // --- CSV Export Helper ---
  const handleExportCSV = () => {
    if (!history.length) return;
    const headers = ['Time', 'Label', 'Policy', 'Backend', 'Simulated', 'Tokens', 'TTFT (s)', 'Waiting (s)', 'E2E (s)'];
    const rows = history.map((item) => [
      `"${item.time}"`,
      `"${item.label}"`,
      `"${item.policy}"`,
      `"${item.backend}"`,
      item.simulated ? 'true' : 'false',
      item.tokens,
      item.ttft != null ? Number(item.ttft).toFixed(4) : '',
      item.waiting != null ? Number(item.waiting).toFixed(4) : '',
      item.e2e != null ? Number(item.e2e).toFixed(4) : '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `llm_scheduler_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- Chart Data Computations ---
  // Bar Chart for concurrent scenario
  const concurrentBarData = useMemo(() => {
    if (!concurrentCompleted || !concurrentTasks.length) return [];
    return concurrentTasks.map((t) => ({
      label: t.label,
      ttft: t.data && t.data.ttft != null ? Number(t.data.ttft) : 0,
      e2e: t.data && t.data.e2e_latency != null ? Number(t.data.e2e_latency) : 0,
    }));
  }, [concurrentCompleted, concurrentTasks]);

  // Line Chart for TTFT progression across history (oldest first)
  const historyLineData = useMemo(() => {
    return [...history].reverse().map((item, idx) => ({
      reqNum: idx + 1,
      ttft: item.ttft != null ? Number(item.ttft) : 0,
      label: item.label,
    }));
  }, [history]);

  // Server summary metrics extraction
  const summary = serverMetrics?.summary;
  const completedCount = serverMetrics?.completed_requests ?? 0;
  const hasCompletedRequests = completedCount > 0 && summary && summary.count > 0;

  return (
    <div className="experiment-section">
      {/* ================= A. CONNECTION PANEL ================= */}
      <div className="connection-bar">
        <div className="connection-info">
          <span
            className={`status-dot ${serverState.connected ? 'connected' : 'disconnected'}`}
            title={serverState.connected ? 'Connected to backend' : 'Backend unreachable'}
          />
          <div>
            <strong>Status:</strong>{' '}
            <span style={{ color: serverState.connected ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
              {serverState.connected ? 'Connected' : 'Not Reachable'}
            </span>
            {serverState.connected && (
              <span style={{ marginLeft: 12, color: 'var(--text-secondary)' }}>
                Backend: <strong style={{ color: 'var(--text-primary)' }}>{serverState.backend}</strong> • Policy:{' '}
                <strong style={{ color: 'var(--text-primary)' }}>{serverState.policy}</strong>
              </span>
            )}
          </div>
        </div>

        <div>
          {serverState.connected && (
            <span className={`mode-badge ${serverState.simulated ? 'simulated' : 'real'}`}>
              {serverState.simulated ? '⚡ SIMULATED OUTPUT' : '🧠 REAL MODEL'}
            </span>
          )}
        </div>

        {!serverState.connected && (
          <div className="connection-warning">
            ⚠️ Start the server first:{' '}
            <code>docker compose up llm-server</code> (or:{' '}
            <code>docker compose --profile real up llm-server-real</code>) and keep this page open.
          </div>
        )}
      </div>

      {/* ================= B. POLICY SELECTOR ================= */}
      <div className="live-card" style={{ marginBottom: 24 }}>
        <div className="card-title">Scheduling Policy Selector</div>
        <div className="card-subtitle">
          Dynamically change the active server scheduler. FCFS, Round-Robin, SPF, and Decode-First arbitrate queue execution.
        </div>

        <div className="policy-group" role="group" aria-label="Scheduling Policy Selector">
          {POLICIES.map((p) => {
            const isActive = serverState.policy === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`policy-btn ${isActive ? `active ${p.id}` : ''}`}
                onClick={() => handlePolicyChange(p.id)}
                disabled={!serverState.connected || hasInFlightRequests || isSwitchingPolicy}
                aria-pressed={isActive}
                aria-label={`Switch scheduling policy to ${p.name}`}
              >
                <span>{p.name}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>({p.desc})</span>
              </button>
            );
          })}
        </div>

        {hasInFlightRequests && (
          <div className="policy-note" style={{ color: 'var(--accent-amber)' }}>
            ⚠️ Policy switching is disabled while requests are in flight to prevent queue state corruption.
          </div>
        )}

        <div className="policy-note">
          Notice: Switching the scheduling policy on the server reinitializes the engine, dropping in-flight requests and resetting server-side metrics.
        </div>

        {policyError && (
          <div className="connection-warning" style={{ marginTop: 10 }}>
            Error switching policy: {policyError}
          </div>
        )}
      </div>

      {/* ================= TWO COLUMN: C. SINGLE REQUEST & D. CONCURRENT DEMO ================= */}
      <div className="live-grid-2col">
        {/* --- C. Single Request Form --- */}
        <div className="live-card">
          <div className="card-title">Single Request Submission</div>
          <div className="card-subtitle">
            Send an interactive generation request to evaluate per-request turnaround time.
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSendSingle(); }}>
            <div className="live-form-group">
              <label htmlFor="prompt-input" className="live-label">Input Prompt</label>
              <textarea
                id="prompt-input"
                className="live-textarea"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt text..."
                disabled={isSinglePending}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label htmlFor="max-tokens-input" className="live-label" style={{ margin: 0 }}>Max Tokens:</label>
                <input
                  id="max-tokens-input"
                  type="number"
                  className="live-input"
                  min="1"
                  max="512"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(Math.max(1, Math.min(512, Number(e.target.value))))}
                  disabled={isSinglePending}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {isSinglePending && (
                  <>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                      ⏱️ {singleElapsed}s
                    </span>
                    <button
                      type="button"
                      className="live-btn live-btn-danger"
                      onClick={handleCancelSingle}
                      aria-label="Cancel active request"
                    >
                      Cancel
                    </button>
                  </>
                )}

                <button
                  type="submit"
                  className="live-btn"
                  disabled={!serverState.connected || isSinglePending || isConcurrentPending}
                  aria-label="Send generation request"
                >
                  {isSinglePending ? 'Generating...' : 'Send Request'}
                </button>
              </div>
            </div>

            {isSinglePending && (
              <div className="policy-note" style={{ marginTop: 8 }}>
                Note: Cancelling only stops waiting in the browser; the server engine may still complete the job.
              </div>
            )}
          </form>

          {singleError && (
            <div className="connection-warning" style={{ marginTop: 12 }}>
              {singleError}
            </div>
          )}

          {singleResult && (
            <div style={{ marginTop: 16 }}>
              <div className="live-label">Generated Response</div>
              <div className="response-box">{singleResult.text || '(Empty output)'}</div>

              <div className="metrics-grid" style={{ marginTop: 12, marginBottom: 0, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="metric-card" style={{ padding: 12 }}>
                  <div className="metric-label">TTFT</div>
                  <div className="metric-value" style={{ fontSize: '1.2rem', color: 'var(--color-rr)' }}>
                    {formatSec(singleResult.ttft)}
                  </div>
                </div>
                <div className="metric-card" style={{ padding: 12 }}>
                  <div className="metric-label">Queue Wait</div>
                  <div className="metric-value" style={{ fontSize: '1.2rem' }}>
                    {formatSec(singleResult.waiting_time)}
                  </div>
                </div>
                <div className="metric-card" style={{ padding: 12 }}>
                  <div className="metric-label">E2E Latency</div>
                  <div className="metric-value" style={{ fontSize: '1.2rem', color: 'var(--color-df)' }}>
                    {formatSec(singleResult.e2e_latency)}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
                <span>Tokens: <strong>{singleResult.tokens}</strong></span>
                <span>Policy: <strong>{singleResult.policy}</strong></span>
                <span>Mode: <strong>{singleResult.simulated ? 'Simulated' : 'Real'}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* --- D. Concurrent Scenario Buttons (HoL Blocking Demo) --- */}
        <div className="live-card">
          <div className="card-title">Concurrent Scheduling Demo</div>
          <div className="card-subtitle">
            Demonstrate Head-of-Line (HoL) blocking vs Preemptive Interleaving across concurrent queries.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <strong style={{ fontSize: '0.9rem' }}>Heterogeneous Scenario:</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  1 Long (~200w) + 3 Short queries (2+2, color, hello) spaced 0.3s apart.
                </div>
              </div>
              <button
                type="button"
                className="live-btn"
                onClick={handleRunHoLScenario}
                disabled={!serverState.connected || hasInFlightRequests}
                aria-label="Send 4 requests at once (1 long and 3 short)"
              >
                Send 4 at once (1 Long + 3 Short)
              </button>
            </div>

            <div style={{ height: 1, background: 'var(--border-glass)', margin: '4px 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.9rem' }}>Send N identical at once:</span>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={burstN}
                  onChange={(e) => setBurstN(Math.max(1, Math.min(8, Number(e.target.value))))}
                  className="live-input"
                  style={{ width: 60 }}
                  disabled={hasInFlightRequests}
                  aria-label="Number of identical requests to send at once"
                />
              </div>
              <button
                type="button"
                className="live-btn live-btn-secondary"
                onClick={handleRunNConcurrent}
                disabled={!serverState.connected || hasInFlightRequests}
                aria-label={`Send ${burstN} requests concurrently`}
              >
                Send {burstN} at once
              </button>
            </div>
          </div>

          {/* Live request cards */}
          {concurrentTasks.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div className="live-label">Concurrent Execution Status</div>
              <div className="scenario-cards">
                {concurrentTasks.map((t) => (
                  <div key={t.id} className={`req-status-card ${t.status}`}>
                    <div className="req-header">
                      <span className="req-label">{t.label}</span>
                      <span className={`req-badge ${t.status}`}>
                        {t.status === 'running' ? `⏱️ ${t.elapsed}s` : t.status}
                      </span>
                    </div>

                    {t.status === 'done' && t.data && (
                      <div className="req-stats">
                        <span>TTFT: <strong>{formatSec(t.data.ttft)}</strong></span>
                        <span>E2E: <strong>{formatSec(t.data.e2e_latency)}</strong></span>
                        <span>Wait: <strong>{formatSec(t.data.waiting_time)}</strong></span>
                        <span>Tok: <strong>{t.data.tokens}</strong></span>
                      </div>
                    )}

                    {t.status === 'error' && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-rose)' }}>
                        {t.error || 'Failed'}
                      </div>
                    )}

                    {t.status === 'queued' && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Scheduled delay: {t.delay}s
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Bar Chart after concurrent completion */}
          {concurrentCompleted && concurrentBarData.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div className="live-label">Latency Breakdown per Request (TTFT vs E2E)</div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={concurrentBarData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="label" stroke="var(--text-muted)" fontSize={11} />
                    <YAxis stroke="var(--text-muted)" fontSize={11} unit="s" />
                    <Tooltip
                      contentStyle={{
                        background: '#111827',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        fontSize: '0.8rem',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                    <Bar dataKey="ttft" name="TTFT (s)" fill="#60a5fa" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="e2e" name="E2E Latency (s)" fill="#c084fc" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= F. LIVE SERVER METRICS & TTFT PROGRESSION ================= */}
      <div className="live-grid-2col" style={{ marginBottom: 24 }}>
        {/* Aggregate Server Metrics */}
        <div className="live-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div className="card-title">Live Server Aggregate Metrics</div>
            {metricsLastUpdated && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Updated: {metricsLastUpdated}
              </span>
            )}
          </div>
          <div className="card-subtitle">
            Polled every 2s from <code>GET /metrics</code>. Reflects metrics on the active engine.
          </div>

          {!hasCompletedRequests ? (
            <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              No completed requests recorded on the active engine yet.
            </div>
          ) : (
            <div>
              <div className="metrics-grid" style={{ marginBottom: 16, gridTemplateColumns: '1fr 1fr' }}>
                <div className="metric-card highlight" style={{ padding: 14 }}>
                  <div className="metric-label">Completed Requests</div>
                  <div className="metric-value">{completedCount}</div>
                  <div className="metric-unit">Active policy: {serverMetrics?.active_policy}</div>
                </div>
                <div className="metric-card" style={{ padding: 14 }}>
                  <div className="metric-label">Throughput</div>
                  <div className="metric-value">{formatNum(summary?.throughput_rps, 3)}</div>
                  <div className="metric-unit">req / sec</div>
                </div>
              </div>

              {/* Detailed statistical breakdowns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="live-card" style={{ padding: 12, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-rr)', marginBottom: 6 }}>
                    TTFT (First Token)
                  </div>
                  <div className="submetric-row"><span className="submetric-name">Mean</span><span className="submetric-val">{formatSec(summary?.ttft?.mean)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p50</span><span className="submetric-val">{formatSec(summary?.ttft?.p50)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p95</span><span className="submetric-val">{formatSec(summary?.ttft?.p95)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p99</span><span className="submetric-val">{formatSec(summary?.ttft?.p99)}</span></div>
                </div>

                <div className="live-card" style={{ padding: 12, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-spf)', marginBottom: 6 }}>
                    Waiting Time (Queue)
                  </div>
                  <div className="submetric-row"><span className="submetric-name">Mean</span><span className="submetric-val">{formatSec(summary?.waiting_time?.mean)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p50</span><span className="submetric-val">{formatSec(summary?.waiting_time?.p50)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p95</span><span className="submetric-val">{formatSec(summary?.waiting_time?.p95)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p99</span><span className="submetric-val">{formatSec(summary?.waiting_time?.p99)}</span></div>
                </div>

                <div className="live-card" style={{ padding: 12, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-df)', marginBottom: 6 }}>
                    E2E Turnaround
                  </div>
                  <div className="submetric-row"><span className="submetric-name">Mean</span><span className="submetric-val">{formatSec(summary?.e2e_latency?.mean)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p50</span><span className="submetric-val">{formatSec(summary?.e2e_latency?.p50)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p95</span><span className="submetric-val">{formatSec(summary?.e2e_latency?.p95)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p99</span><span className="submetric-val">{formatSec(summary?.e2e_latency?.p99)}</span></div>
                </div>

                <div className="live-card" style={{ padding: 12, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: 6 }}>
                    TPOT (Time/Token)
                  </div>
                  <div className="submetric-row"><span className="submetric-name">Mean</span><span className="submetric-val">{formatSec(summary?.tpot?.mean)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p50</span><span className="submetric-val">{formatSec(summary?.tpot?.p50)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p95</span><span className="submetric-val">{formatSec(summary?.tpot?.p95)}</span></div>
                  <div className="submetric-row"><span className="submetric-name">p99</span><span className="submetric-val">{formatSec(summary?.tpot?.p99)}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real-time TTFT Progression LineChart */}
        <div className="live-card">
          <div className="card-title">Real-Time TTFT Stream (Session History)</div>
          <div className="card-subtitle">
            Monitors Time-To-First-Token in chronological order of completed requests from this dashboard session.
          </div>

          {historyLineData.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              Send requests using the forms above to plot live TTFT progression.
            </div>
          ) : (
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyLineData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="reqNum" stroke="var(--text-muted)" fontSize={11} label={{ value: 'Request #', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)' }} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} unit="s" />
                  <Tooltip
                    contentStyle={{
                      background: '#111827',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      fontSize: '0.8rem',
                    }}
                    formatter={(val) => [`${Number(val).toFixed(4)}s`, 'TTFT']}
                    labelFormatter={(label, payload) => {
                      const item = payload && payload[0] ? payload[0].payload : null;
                      return item ? `Req #${label} (${item.label})` : `Req #${label}`;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ttft"
                    name="TTFT (s)"
                    stroke="#4ade80"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#4ade80' }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* ================= E. REQUEST HISTORY TABLE ================= */}
      <div className="live-card">
        <div className="table-actions">
          <div>
            <div className="card-title">Live Request History (Last 50)</div>
            <div className="card-subtitle" style={{ marginBottom: 0 }}>
              Chronological log of requests initiated from this dashboard view.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="live-btn live-btn-secondary"
              onClick={handleExportCSV}
              disabled={history.length === 0}
              aria-label="Download request history as CSV"
            >
              📥 Download CSV
            </button>
            <button
              type="button"
              className="live-btn live-btn-danger"
              onClick={() => setHistory([])}
              disabled={history.length === 0}
              aria-label="Clear session history"
            >
              🗑️ Clear History
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table" aria-label="Request history table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Label</th>
                <th>Policy</th>
                <th>Mode</th>
                <th>Tokens</th>
                <th>TTFT</th>
                <th>Waiting</th>
                <th>E2E</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px 0' }}>
                    No requests dispatched in this session yet.
                  </td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.time}
                    </td>
                    <td><strong>{item.label}</strong></td>
                    <td>
                      <span className={`pill-btn policy-pill ${item.policy}`} style={{ cursor: 'default' }}>
                        {item.policy.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: item.simulated ? '#fbbf24' : '#34d399' }}>
                        {item.simulated ? 'Sim' : 'Real'}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{item.tokens}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-rr)' }}>
                      {formatSec(item.ttft)}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      {formatSec(item.waiting)}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-df)' }}>
                      {formatSec(item.e2e)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
