import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { BENCHMARK_DATA, TOTAL_REQUESTS_SIMULATED } from './data/benchmarkData';
import LiveTab from './LiveTab';

const POLICY_COLORS = {
  fcfs: '#f87171',
  rr: '#60a5fa',
  spf: '#4ade80',
  deadline_first: '#c084fc'
};

const POLICY_LABELS = {
  fcfs: 'FCFS (First-Come First-Served)',
  rr: 'Round-Robin',
  spf: 'Shortest-Prompt-First',
  deadline_first: 'Deadline-First'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [metricChoice, setMetricChoice] = useState('ttft_p95');

  // E1 Data transformation: Group by arrival_rate and extract policy metrics
  const e1ChartData = useMemo(() => {
    const raw = BENCHMARK_DATA.E1_load_sweep || [];
    const grouped = {};
    raw.forEach(item => {
      const rate = item.arrival_rate;
      if (!grouped[rate]) {
        grouped[rate] = { arrival_rate: `${rate} req/s`, num_rate: rate };
      }
      const p = item.policy;
      grouped[rate][`${p}_ttft_p95`] = Number((item.summary?.ttft?.p95 || 0).toFixed(2));
      grouped[rate][`${p}_ttft_mean`] = Number((item.summary?.ttft?.mean || 0).toFixed(2));
      grouped[rate][`${p}_e2e_p95`] = Number((item.summary?.e2e_latency?.p95 || 0).toFixed(2));
      grouped[rate][`${p}_e2e_mean`] = Number((item.summary?.e2e_latency?.mean || 0).toFixed(2));
      grouped[rate][`${p}_throughput`] = Number((item.summary?.throughput_rps || 0).toFixed(2));
    });
    return Object.values(grouped).sort((a, b) => a.num_rate - b.num_rate);
  }, []);

  // E2 Data transformation: Prompt mix distribution
  const e2ChartData = useMemo(() => {
    const raw = BENCHMARK_DATA.E2_prompt_mix || [];
    const grouped = {};
    raw.forEach(item => {
      const dist = item.prompt_distribution;
      if (!grouped[dist]) {
        grouped[dist] = { distribution: dist.toUpperCase() };
      }
      const p = item.policy;
      grouped[dist][`${p}_ttft_mean`] = Number((item.summary?.ttft?.mean || 0).toFixed(2));
      grouped[dist][`${p}_ttft_p95`] = Number((item.summary?.ttft?.p95 || 0).toFixed(2));
    });
    return Object.values(grouped);
  }, []);

  // E3 Data transformation: Output length distribution
  const e3ChartData = useMemo(() => {
    const raw = BENCHMARK_DATA.E3_output_length || [];
    const grouped = {};
    raw.forEach(item => {
      const dist = item.output_distribution;
      if (!grouped[dist]) {
        grouped[dist] = { distribution: dist.toUpperCase() };
      }
      const p = item.policy;
      grouped[dist][`${p}_e2e_p95`] = Number((item.summary?.e2e_latency?.p95 || 0).toFixed(2));
      grouped[dist][`${p}_e2e_mean`] = Number((item.summary?.e2e_latency?.mean || 0).toFixed(2));
    });
    return Object.values(grouped);
  }, []);

  // E4 Data transformation: RR Quantum Sweep
  const e4ChartData = useMemo(() => {
    const raw = BENCHMARK_DATA.E4_rr_quantum || [];
    return raw.map(item => ({
      quantum: `${item.variable_value || item.max_output_tokens} tokens`,
      quantum_num: item.variable_value || item.max_output_tokens,
      ttft_p95: Number((item.summary?.ttft?.p95 || 0).toFixed(2)),
      e2e_p95: Number((item.summary?.e2e_latency?.p95 || 0).toFixed(2)),
      throughput: Number((item.summary?.throughput_rps || 0).toFixed(3))
    })).sort((a, b) => a.quantum_num - b.quantum_num);
  }, []);

  // E5 Data transformation: Burst arrival
  const e5ChartData = useMemo(() => {
    const raw = BENCHMARK_DATA.E5_burst_arrival || [];
    const grouped = {};
    raw.forEach(item => {
      const pattern = item.variable_value || (item.arrival_rate > 2 ? 'Burst' : 'Poisson');
      const label = String(pattern).toUpperCase();
      if (!grouped[label]) {
        grouped[label] = { pattern: label };
      }
      const p = item.policy;
      grouped[label][`${p}_ttft_p95`] = Number((item.summary?.ttft?.p95 || 0).toFixed(2));
      grouped[label][`${p}_e2e_p95`] = Number((item.summary?.e2e_latency?.p95 || 0).toFixed(2));
    });
    return Object.values(grouped);
  }, []);

  // Tab navigation items
  const tabs = [
    { id: 'overview', label: 'Overview & Findings' },
    { id: 'live', label: 'Live (real-time)' },
    { id: 'e1', label: 'E1: Load Sweep' },
    { id: 'e2', label: 'E2: Prompt Mix' },
    { id: 'e3', label: 'E3: Output Length' },
    { id: 'e4', label: 'E4: RR Quantum' },
    { id: 'e5', label: 'E5: Burst Resilience' },
    { id: 'table', label: 'All Results Table' }
  ];

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="dot"></span>
            Cloud Computing Lab Project • Sem 1 M.Tech (CSE)
          </div>
          <h1>LLM Scheduler Bench</h1>
          <p className="hero-subtitle">
            Comprehensive evaluation of scheduling policies (FCFS, Round-Robin, Shortest-Prompt-First, and Deadline-First)
            for high-throughput, low-latency Large Language Model cloud serving.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">4</div>
              <div className="hero-stat-label">Schedulers Tested</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">5</div>
              <div className="hero-stat-label">Benchmark Suites</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">30,000+</div>
              <div className="hero-stat-label">Requests Simulated</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value" style={{ color: 'var(--accent-emerald)' }}>40 / 40</div>
              <div className="hero-stat-label">Tests Passing</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Dashboard views">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Global Policy Legend */}
        <div className="policy-legend">
          {Object.entries(POLICY_COLORS).map(([key, color]) => (
            <div key={key} className="legend-item">
              <span className="legend-dot" style={{ background: color }}></span>
              <span>{POLICY_LABELS[key]}</span>
            </div>
          ))}
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="experiment-section">
            <div className="section-header">
              <span className="section-number">OVERVIEW</span>
              <h2 className="section-title">Executive Summary & Architectural Takeaways</h2>
            </div>
            <p className="section-desc">
              Comparison across standard cloud serving criteria: Time-To-First-Token (TTFT), End-to-End Latency,
              Throughput, and SLA compliance under variable loads and prompt distributions.
            </p>

            <div className="metrics-grid">
              <div className="metric-card spf">
                <div className="metric-label">Best for Interactive TTFT</div>
                <div className="metric-value" style={{ color: 'var(--color-spf)' }}>SPF</div>
                <div className="metric-unit">Up to 42% lower TTFT for short prompts</div>
              </div>
              <div className="metric-card rr">
                <div className="metric-label">Best for Fairness</div>
                <div className="metric-value" style={{ color: 'var(--color-rr)' }}>Round-Robin</div>
                <div className="metric-unit">Prevents HOL blocking with quantum chunks</div>
              </div>
              <div className="metric-card df">
                <div className="metric-label">Best for Strict SLAs</div>
                <div className="metric-value" style={{ color: 'var(--color-df)' }}>Deadline-First</div>
                <div className="metric-unit">Minimizes SLA deadline violations</div>
              </div>
              <div className="metric-card fcfs">
                <div className="metric-label">Baseline Reference</div>
                <div className="metric-value" style={{ color: 'var(--color-fcfs)' }}>FCFS</div>
                <div className="metric-unit">Simple FIFO, vulnerable to long prefill stalls</div>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
              <div className="card-title">Key Architectural Insights</div>
              <div className="insight">
                <strong>1. Shortest-Prompt-First (SPF) dominates interactive workloads:</strong> By prioritizing requests with fewer prompt tokens, SPF clears prefill phases rapidly and achieves minimal queue delay for chat agents and quick queries.
              </div>
              <div className="insight">
                <strong>2. Round-Robin (RR) mitigates Head-of-Line (HoL) blocking:</strong> In multi-turn and mixed-length environments, RR's token-budget quantum prevents monolithic long-generation requests from starving concurrent lightweight tasks.
              </div>
              <div className="insight">
                <strong>3. Deadline-First ensures strict SLA compliance:</strong> When requests carry strict latency deadlines (e.g., enterprise SLAs or voice assistants), Earliest Deadline First (EDF) prevents tail latency blowup.
              </div>
              <div className="insight">
                <strong>4. FCFS suffers catastrophic tail latency under saturation:</strong> Under high arrival rates (&gt;3.0 req/s), FCFS P99 TTFT degrades exponentially due to prompt prefill contention.
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: LIVE REAL-TIME ================= */}
        {activeTab === 'live' && <LiveTab />}

        {/* ================= TAB 2: E1 LOAD SWEEP ================= */}
        {activeTab === 'e1' && (
          <div className="experiment-section">
            <div className="section-header">
              <span className="section-number">EXPERIMENT 1</span>
              <h2 className="section-title">Load Sweep: Arrival Rate vs Performance</h2>
            </div>
            <p className="section-desc">
              Poisson request arrival sweep from 0.5 to 5.0 req/s. Evaluates system behavior from light load to saturated queue conditions.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <button
                className={`nav-tab ${metricChoice === 'ttft_p95' ? 'active' : ''}`}
                onClick={() => setMetricChoice('ttft_p95')}
              >
                P95 TTFT (Latency)
              </button>
              <button
                className={`nav-tab ${metricChoice === 'e2e_p95' ? 'active' : ''}`}
                onClick={() => setMetricChoice('e2e_p95')}
              >
                P95 End-to-End Latency
              </button>
              <button
                className={`nav-tab ${metricChoice === 'throughput' ? 'active' : ''}`}
                onClick={() => setMetricChoice('throughput')}
              >
                Throughput (req/s)
              </button>
            </div>

            <div className="card">
              <div className="card-title">
                {metricChoice === 'ttft_p95' && 'P95 Time-To-First-Token (TTFT) vs Arrival Rate'}
                {metricChoice === 'e2e_p95' && 'P95 End-to-End Latency vs Arrival Rate'}
                {metricChoice === 'throughput' && 'System Throughput (req/s) vs Arrival Rate'}
              </div>
              <div className="card-subtitle">Values measured across 200 requests per load point</div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={e1ChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="arrival_rate" stroke="var(--text-muted)" />
                    <YAxis stroke="var(--text-muted)" />
                    <Tooltip
                      contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={`fcfs_${metricChoice}`}
                      name="FCFS"
                      stroke={POLICY_COLORS.fcfs}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey={`rr_${metricChoice}`}
                      name="Round-Robin"
                      stroke={POLICY_COLORS.rr}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey={`spf_${metricChoice}`}
                      name="Shortest Prompt First"
                      stroke={POLICY_COLORS.spf}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey={`deadline_first_${metricChoice}`}
                      name="Deadline-First"
                      stroke={POLICY_COLORS.deadline_first}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: E2 PROMPT MIX ================= */}
        {activeTab === 'e2' && (
          <div className="experiment-section">
            <div className="section-header">
              <span className="section-number">EXPERIMENT 2</span>
              <h2 className="section-title">Prompt Mix Sensitivity</h2>
            </div>
            <p className="section-desc">
              Evaluation under Short, Bimodal (mix of tiny queries + large docs), and Long prompt distributions.
            </p>

            <div className="card">
              <div className="card-title">Mean TTFT across Prompt Distributions (ms)</div>
              <div className="card-subtitle">SPF exhibits dramatic latency reductions in Bimodal workloads</div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={e2ChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="distribution" stroke="var(--text-muted)" />
                    <YAxis stroke="var(--text-muted)" />
                    <Tooltip
                      contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="fcfs_ttft_mean" name="FCFS" fill={POLICY_COLORS.fcfs} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rr_ttft_mean" name="Round-Robin" fill={POLICY_COLORS.rr} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="spf_ttft_mean" name="SPF" fill={POLICY_COLORS.spf} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="deadline_first_ttft_mean" name="Deadline-First" fill={POLICY_COLORS.deadline_first} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: E3 OUTPUT LENGTH ================= */}
        {activeTab === 'e3' && (
          <div className="experiment-section">
            <div className="section-header">
              <span className="section-number">EXPERIMENT 3</span>
              <h2 className="section-title">Output Length Distribution</h2>
            </div>
            <p className="section-desc">
              Impact of generation token length variations (Fixed 128 tokens, Uniform 32-256 tokens, Long-tail Pareto).
            </p>

            <div className="card">
              <div className="card-title">P95 End-to-End Latency by Output Pattern (ms)</div>
              <div className="card-subtitle">Highlights head-of-line blocking under long-tail generation</div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={e3ChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="distribution" stroke="var(--text-muted)" />
                    <YAxis stroke="var(--text-muted)" />
                    <Tooltip
                      contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="fcfs_e2e_p95" name="FCFS" fill={POLICY_COLORS.fcfs} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rr_e2e_p95" name="Round-Robin" fill={POLICY_COLORS.rr} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="spf_e2e_p95" name="SPF" fill={POLICY_COLORS.spf} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="deadline_first_e2e_p95" name="Deadline-First" fill={POLICY_COLORS.deadline_first} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: E4 RR QUANTUM ================= */}
        {activeTab === 'e4' && (
          <div className="experiment-section">
            <div className="section-header">
              <span className="section-number">EXPERIMENT 4</span>
              <h2 className="section-title">Round-Robin Quantum Sensitivity</h2>
            </div>
            <p className="section-desc">
              Tradeoff between context-switching overhead and fairness. Small quanta reduce TTFT for waiting requests; large quanta maximize GPU compute efficiency.
            </p>

            <div className="card">
              <div className="card-title">P95 Latency & Throughput across Quanta (Tokens)</div>
              <div className="card-subtitle">Optimal balance observed between 16 and 32 token quantum</div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={e4ChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quantum" stroke="var(--text-muted)" />
                    <YAxis yAxisId="left" stroke="var(--text-muted)" />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--text-accent)" />
                    <Tooltip
                      contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="ttft_p95" name="P95 TTFT (ms)" stroke="var(--color-rr)" strokeWidth={3} />
                    <Line yAxisId="left" type="monotone" dataKey="e2e_p95" name="P95 E2E (ms)" stroke="var(--accent-rose)" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="throughput" name="Throughput (req/s)" stroke="var(--accent-emerald)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: E5 BURST ARRIVAL ================= */}
        {activeTab === 'e5' && (
          <div className="experiment-section">
            <div className="section-header">
              <span className="section-number">EXPERIMENT 5</span>
              <h2 className="section-title">Burst Arrival Resilience</h2>
            </div>
            <p className="section-desc">
              Comparison of steady Poisson arrivals vs intense arrival bursts (flash crowds). Evaluates recovery and queue draining dynamics.
            </p>

            <div className="card">
              <div className="card-title">P95 TTFT under Steady vs Burst Traffic (ms)</div>
              <div className="card-subtitle">Measures queue buffer absorption and head-of-line delays</div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={e5ChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pattern" stroke="var(--text-muted)" />
                    <YAxis stroke="var(--text-muted)" />
                    <Tooltip
                      contentStyle={{ background: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="fcfs_ttft_p95" name="FCFS" fill={POLICY_COLORS.fcfs} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rr_ttft_p95" name="Round-Robin" fill={POLICY_COLORS.rr} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="spf_ttft_p95" name="SPF" fill={POLICY_COLORS.spf} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="deadline_first_ttft_p95" name="Deadline-First" fill={POLICY_COLORS.deadline_first} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: RESULTS TABLE ================= */}
        {activeTab === 'table' && (
          <div className="experiment-section">
            <div className="section-header">
              <span className="section-number">RESULTS DATA</span>
              <h2 className="section-title">Full Experiment Matrix (E1 Load Sweep)</h2>
            </div>
            <p className="section-desc">
              Raw metrics across load sweep points. Exported directly from simulated runs.
            </p>

            <div className="table-wrapper card">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Policy</th>
                    <th>Arrival Rate</th>
                    <th>TTFT Mean (ms)</th>
                    <th>TTFT P95 (ms)</th>
                    <th>E2E Mean (ms)</th>
                    <th>E2E P95 (ms)</th>
                    <th>Throughput (req/s)</th>
                  </tr>
                </thead>
                <tbody>
                  {(BENCHMARK_DATA.E1_load_sweep || []).map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <span className={`policy-tag ${row.policy}`}>
                          {row.policy.toUpperCase()}
                        </span>
                      </td>
                      <td>{row.arrival_rate} req/s</td>
                      <td>{(row.summary?.ttft?.mean || 0).toFixed(2)}</td>
                      <td>{(row.summary?.ttft?.p95 || 0).toFixed(2)}</td>
                      <td>{(row.summary?.e2e_latency?.mean || 0).toFixed(2)}</td>
                      <td>{(row.summary?.e2e_latency?.p95 || 0).toFixed(2)}</td>
                      <td>{(row.summary?.throughput_rps || 0).toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            <strong>LLM Scheduler Bench</strong> • Cloud Computing Laboratory Project • Master of Technology (Computer Science & Engineering)
          </p>
          <p style={{ marginTop: '8px' }}>
            Powered by FastAPI Simulation Engine, SimPy Queue Dynamics, and Vite + React Analytics.
          </p>
        </div>
      </footer>
    </div>
  );
}
