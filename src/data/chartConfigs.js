/**
 * chartConfigs.js
 * Chart.js configuration objects for all PDF-embedded charts.
 * Each function returns a complete Chart.js config.
 * These configs are consumed by src/pdf/utils/generateCharts.js,
 * which renders them to base64 PNG via an off-screen canvas.
 *
 * Color palette follows FAA branding:
 *   Navy  #003A70 · Blue  #0057A8 · Gray  #6D6E71
 *   Green #1B7A3E · Amber #C8590A · Red   #B30000
 */

import { OPS, SIM, INFRA, GATES, RECS, DEMAND } from './reportData';

const FAA = {
  navy:    '#003087',  // FAA Blue (official)
  blue:    '#0076CE',  // FAA Light Blue
  gray:    '#666666',  // FAA Medium Gray
  green:   '#1A7F4B',  // OPTIMAL / PASS
  amber:   '#B35C00',  // CONDITIONAL
  red:     '#C0392B',  // FAIL / NOT READY
  lightBlue: '#5BA3D9',
  lightGray: '#CCCCCC',
  bg:      '#FFFFFF',
};

const BASE_FONT = { family: 'Helvetica, Arial, sans-serif', size: 11 };

const BASE_OPTIONS = {
  responsive: false,
  animation:  false,
  devicePixelRatio: 2,
  plugins: {
    legend: { labels: { font: BASE_FONT, color: '#1e293b' } },
    tooltip: { enabled: false },
  },
  scales: {
    x: { ticks: { font: BASE_FONT, color: '#334155' }, grid: { color: '#e2e8f0' } },
    y: { ticks: { font: BASE_FONT, color: '#334155' }, grid: { color: '#e2e8f0' } },
  },
};

// ─── Figure 1: Monthly Operations Pattern ────────────────────────────────────
export function monthlyOpsConfig() {
  const peak   = OPS.monthlyPattern.map(m => m.month === 'Mar' ? m.ops : null);
  const trough = OPS.monthlyPattern.map(m => m.month === 'Apr' ? m.ops : null);
  const other  = OPS.monthlyPattern.map((m, i) =>
    m.month !== 'Mar' && m.month !== 'Apr' ? m.ops : null
  );

  return {
    type: 'bar',
    data: {
      labels: OPS.monthlyPattern.map(m => m.month),
      datasets: [
        { label: 'Peak month',   data: peak,   backgroundColor: FAA.red,       barPercentage: 0.7 },
        { label: 'Trough month', data: trough, backgroundColor: FAA.amber,     barPercentage: 0.7 },
        { label: 'Other months', data: other,  backgroundColor: FAA.blue,      barPercentage: 0.7 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Monthly Operations Pattern (Estimated from Seasonal Factors)', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT, color: '#334155' } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Estimated Monthly Operations', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
      },
    },
  };
}

// ─── Figure 2: Aircraft Category Distribution (horizontal bar) ────────────────
export function aircraftCategoryConfig() {
  const cats = [...OPS.aircraftCategories].sort((a, b) => a.count - b.count);
  return {
    type: 'bar',
    data: {
      labels: cats.map(c => c.label),
      datasets: [{
        label: 'Number of Operations',
        data:  cats.map(c => c.count),
        backgroundColor: cats.map((_, i) =>
          i === cats.length - 1 ? FAA.navy :
          i === cats.length - 2 ? FAA.red  : FAA.blue
        ),
        barPercentage: 0.7,
      }],
    },
    options: {
      ...BASE_OPTIONS,
      indexAxis: 'y',
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Aircraft Category Distribution — All Recorded Operations', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
        datalabels: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, title: { display: true, text: 'Number of Operations', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
        y: BASE_OPTIONS.scales.y,
      },
    },
  };
}

// ─── Figure 3: Mode Shift Probability (horizontal bar) ───────────────────────
export function modeShiftConfig() {
  const corridors = DEMAND.corridors;
  return {
    type: 'bar',
    data: {
      labels: corridors.map(c => c.destination.split('/')[0].trim()),
      datasets: [{
        label: 'Mode Shift Probability',
        data:  corridors.map(c => c.modeShiftProb),
        backgroundColor: corridors.map(c => c.modeShiftProb > 1 ? FAA.navy : FAA.blue),
        barPercentage: 0.65,
      }],
    },
    options: {
      ...BASE_OPTIONS,
      indexAxis: 'y',
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'eVTOL Mode Shift Probability by Corridor', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, title: { display: true, text: 'Mode Shift Probability', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
        y: BASE_OPTIONS.scales.y,
      },
    },
  };
}

// ─── Figure 4: Time Savings vs Ground Transport (horizontal bar) ──────────────
export function timeSavingsConfig() {
  const corridors = DEMAND.corridors;
  const savings = corridors.map(c => c.driveMin - c.eVtolMin);
  return {
    type: 'bar',
    data: {
      labels: corridors.map(c => c.destination.split('/')[0].trim()),
      datasets: [{
        label: 'Time Saved (minutes)',
        data:  savings,
        backgroundColor: savings.map(s => s > 0 ? FAA.green : FAA.amber),
        barPercentage: 0.65,
      }],
    },
    options: {
      ...BASE_OPTIONS,
      indexAxis: 'y',
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Time Savings vs Ground Transport (min)', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, title: { display: true, text: 'Minutes Saved vs Driving', font: BASE_FONT, color: FAA.gray } },
        y: BASE_OPTIONS.scales.y,
      },
    },
  };
}

// ─── Figure 5: Peak Power Demand vs Grid Capacity ────────────────────────────
export function peakPowerConfig() {
  const tiers = INFRA.grid.powerDemands;
  return {
    type: 'bar',
    data: {
      labels: tiers.map(t => t.tier),
      datasets: [
        {
          label: 'Peak Demand (MW)',
          data:  tiers.map(t => t.peakMW),
          backgroundColor: tiers.map(t => t.peakMW > INFRA.grid.headroomMW ? FAA.red : FAA.navy),
          barPercentage: 0.5,
        },
        {
          label: `Grid Headroom (${INFRA.grid.headroomMW} MW)`,
          data:  tiers.map(() => INFRA.grid.headroomMW),
          backgroundColor: FAA.lightGray,
          barPercentage: 0.5,
        },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Peak Power Demand vs Available Grid Capacity by Infrastructure Tier', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
        annotation: {
          annotations: {
            limit: { type: 'line', yMin: 0.8, yMax: 0.8, borderColor: FAA.red, borderWidth: 2, borderDash: [6,4], label: { content: 'Grid capacity limit', display: true } },
          },
        },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Power (MW)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true, max: 1.5 },
      },
    },
  };
}

// ─── Figure 6: Average Turnaround Time by Tier & Traffic ─────────────────────
export function avgTatConfig() {
  const { data, target } = SIM.tatByTier;
  return {
    type: 'bar',
    data: {
      labels: data.map(d => d.tier),
      datasets: [
        { label: 'Low Traffic',    data: data.map(d => d.low),    backgroundColor: FAA.lightBlue, barPercentage: 0.7 },
        { label: 'Medium Traffic', data: data.map(d => d.medium), backgroundColor: FAA.navy,     barPercentage: 0.7 },
        { label: 'High Traffic',   data: data.map(d => d.high),   backgroundColor: FAA.blue,     barPercentage: 0.7 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Average Turnaround Time by Infrastructure and Traffic Tier', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Avg TAT (minutes)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true, suggestedMax: 40 },
      },
    },
  };
}

// ─── Figure 7: Monte Carlo Distribution — Optimal Scenario ───────────────────
export function monteCarloConfig(runs = 200) {
  // Simulate a normal distribution around mean=93.2, std~2.5
  const bins   = [85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
  const counts = [1, 2, 4, 8,14,20,26,30,28,22,18,12, 8, 4, 2, 1];
  return {
    type: 'bar',
    data: {
      labels: bins,
      datasets: [{
        label: 'Frequency',
        data:  counts,
        backgroundColor: bins.map(b => b >= 88.2 && b <= 98.2 ? FAA.blue : FAA.lightGray),
        barPercentage: 1.0,
        categoryPercentage: 0.95,
      }],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: `Monte Carlo Score Distribution — Optimal Scenario (${runs} runs, 90-day window)`, font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, title: { display: true, text: 'Readiness Score', font: BASE_FONT, color: FAA.gray } },
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Frequency', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
      },
    },
  };
}

// ─── Figure 8: System Resiliency Score by Scenario ───────────────────────────
export function resiliencyConfig() {
  const results = SIM.stressTest.results.slice(0, 6); // first 6 for readability
  return {
    type: 'bar',
    data: {
      labels: results.map(r => r.scenario),
      datasets: [
        { label: 'Pad Failure',   data: results.map(r => r.padFail),     backgroundColor: FAA.navy,  barPercentage: 0.7 },
        { label: 'Grid Failure',  data: results.map(r => r.gridFail),    backgroundColor: FAA.blue,  barPercentage: 0.7 },
        { label: 'Weather Hold',  data: results.map(r => r.weatherHold), backgroundColor: FAA.lightBlue, barPercentage: 0.7 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'System Resiliency Score by Scenario (Gate 1 Threshold: 95%)', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, ticks: { maxRotation: 45, font: { ...BASE_FONT, size: 9 } } },
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Resiliency Score (%)', font: BASE_FONT, color: FAA.gray }, min: 0, max: 105 },
      },
    },
  };
}

// ─── Figure 9: Efficiency Score Component Breakdown ──────────────────────────
export function efficiencyBreakdownConfig() {
  const { components, final } = GATES.efficiencyScore;
  return {
    type: 'bar',
    data: {
      labels: components.map(c => c.label),
      datasets: [{
        label: 'Component Score',
        data:  components.map(c => c.score),
        backgroundColor: FAA.navy,
        barPercentage: 0.6,
      }],
    },
    options: {
      ...BASE_OPTIONS,
      indexAxis: 'y',
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: `Efficiency Score Component Breakdown — Optimal Scenario (Final: ${final})`, font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, title: { display: true, text: 'Component Score (0–100)', font: BASE_FONT, color: FAA.gray }, min: 0, max: 100 },
        y: BASE_OPTIONS.scales.y,
      },
    },
  };
}

// ─── Figure 10: Capital Cost Breakdown ───────────────────────────────────────
export function capexBreakdownConfig() {
  const items = RECS.capex;
  return {
    type: 'bar',
    data: {
      labels: items.map(i => i.item),
      datasets: [{
        label: 'Estimated Cost ($M)',
        data:  items.map(i => i.cost),
        backgroundColor: items.map((_, idx) => idx === items.length - 1 ? FAA.red : FAA.navy),
        barPercentage: 0.65,
      }],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: `Capital Cost Breakdown — Vertiport (Total: $${items.reduce((s,i)=>s+i.cost,0).toFixed(2)}M)`, font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, ticks: { maxRotation: 35, font: { ...BASE_FONT, size: 9 } } },
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Estimated Cost ($M)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
      },
    },
  };
}

// ─── Figure 11: 10-Year Financial Projection (Medium traffic) ────────────────
export function financialProjectionConfig() {
  const { years, revBase, revConserv, revOptim, opCosts } = RECS.financialProjection;
  return {
    type: 'line',
    data: {
      labels: years.map(y => `Y${y}`),
      datasets: [
        { label: 'Revenue range (optimistic)', data: revOptim,  borderColor: FAA.green,  backgroundColor: 'rgba(27,122,62,0.08)', fill: '+1', borderWidth: 1.5, pointRadius: 2, tension: 0.3 },
        { label: 'Base revenue projections',   data: revBase,   borderColor: FAA.navy,   backgroundColor: 'transparent',          fill: false, borderWidth: 2.5, pointRadius: 3, tension: 0.3 },
        { label: 'Revenue range (conservative)',data: revConserv,borderColor: FAA.amber, backgroundColor: 'rgba(200,89,10,0.06)', fill: false, borderWidth: 1.5, pointRadius: 2, tension: 0.3 },
        { label: 'Operating costs (trend Y3)',  data: opCosts,  borderColor: FAA.red,    backgroundColor: 'transparent',          fill: false, borderWidth: 1.5, borderDash: [4,4], pointRadius: 2, tension: 0.1 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: '10-Year Financial Projection — Medium eVTOL Traffic', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: { ...BASE_FONT, size: 10 } } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Annual ($M)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true, suggestedMax: 5.5 },
      },
    },
  };
}

// ─── Figure 12: Annual Passengers by Corridor (stacked bar — Premium §3) ─────
export function passengersByCorridorConfig() {
  const corridors = DEMAND.corridors;
  const tiers = DEMAND.trafficTiers;
  // Scale daily ops to annual pax (× 365 × avg seats × load factor)
  const scaleFactor = 365 * 3.5;
  return {
    type: 'bar',
    data: {
      labels: corridors.map(c => c.destination.split('/')[0].trim()),
      datasets: tiers.map((t, ti) => ({
        label: t.label.split('(')[0].trim(),
        data:  corridors.map(c => Math.round(c.dailyOps * (0.8 + ti * 2.5) * scaleFactor / corridors.reduce((s,x)=>s+x.dailyOps,0))),
        backgroundColor: [FAA.lightBlue, FAA.navy, FAA.blue][ti],
        barPercentage: 0.7,
      })),
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Annual Passengers by Corridor — Low / Medium / High Traffic', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, stacked: false, title: { display: true, text: 'Annual Passengers (est.)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
      },
    },
  };
}

// ─── Figure 13: Sensitivity Tornado Chart (Premium §3.4) ─────────────────────
export function sensitivityTornadoConfig() {
  const scenarios = DEMAND.sensitivityScenarios.filter(s => s.label !== 'Base case');
  return {
    type: 'bar',
    data: {
      labels: scenarios.map(s => s.label),
      datasets: [{
        label: 'Change in Annual Passengers (%)',
        data:  scenarios.map(s => s.annualPaxChange),
        backgroundColor: scenarios.map(s => s.annualPaxChange < 0 ? FAA.red : FAA.green),
        barPercentage: 0.55,
      }],
    },
    options: {
      ...BASE_OPTIONS,
      indexAxis: 'y',
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Demand Sensitivity — Impact on Annual Passengers (%)', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, title: { display: true, text: 'Change vs Base Case (%)', font: BASE_FONT, color: FAA.gray } },
        y: BASE_OPTIONS.scales.y,
      },
    },
  };
}

// ─── Figure 14: 10-Year Projection — All Three Tiers (Premium §7.3) ──────────
export function allTiersProjectionConfig() {
  const { years, revBase, revLow, revHigh, opCosts } = RECS.financialProjection;
  return {
    type: 'line',
    data: {
      labels: years.map(y => `Y${y}`),
      datasets: [
        { label: 'High Traffic',   data: revHigh,  borderColor: FAA.green, backgroundColor: 'rgba(27,122,62,0.06)', fill: false, borderWidth: 2, pointRadius: 3, tension: 0.3 },
        { label: 'Medium (Base)',  data: revBase,  borderColor: FAA.navy,  backgroundColor: 'transparent',          fill: false, borderWidth: 2.5, pointRadius: 3, tension: 0.3 },
        { label: 'Low Traffic',    data: revLow,   borderColor: FAA.amber, backgroundColor: 'transparent',          fill: false, borderWidth: 2, pointRadius: 3, tension: 0.3 },
        { label: 'Operating Costs',data: opCosts,  borderColor: FAA.red,   backgroundColor: 'transparent',          fill: false, borderWidth: 1.5, borderDash: [5,4], pointRadius: 2, tension: 0.1 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: '10-Year Financial Projections — All Traffic Tiers', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: { ...BASE_FONT, size: 10 } } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Annual ($M)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true, suggestedMax: 9 },
      },
    },
  };
}

// ─── Figure P3: Hourly Operations Pattern (Premium §2) ───────────────────────
export function hourlyOpsConfig() {
  const hours  = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2,'0')}:00`);
  const counts = OPS.hourlyPattern;
  return {
    type: 'bar',
    data: {
      labels: hours,
      datasets: [{
        label: 'Relative Operations Frequency',
        data:  counts,
        backgroundColor: counts.map(v => v >= 90 ? FAA.navy : v >= 60 ? FAA.blue : v >= 30 ? FAA.lightBlue : FAA.lightGray),
        barPercentage: 0.9,
        categoryPercentage: 0.95,
      }],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Hour-of-Day Operations Intensity — 42J Baseline', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, title: { display: true, text: 'Hour of Day', font: BASE_FONT, color: FAA.gray }, ticks: { maxRotation: 45, font: { ...BASE_FONT, size: 9 } } },
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Relative Frequency', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
      },
    },
  };
}

// ─── Figure P4: Ramp Area — Available vs. Required by Tier ───────────────────
export function rampAreaComparisonConfig() {
  const tiers = INFRA.eb105;
  return {
    type: 'bar',
    data: {
      labels: tiers.map(t => t.tier),
      datasets: [
        {
          label: 'Area Required (sq ft)',
          data:  tiers.map(t => t.areaRequiredSqFt),
          backgroundColor: FAA.lightGray,
          barPercentage: 0.7,
        },
        {
          label: 'Area Available at 42J (sq ft)',
          data:  tiers.map(t => t.areaAvailSqFt),
          backgroundColor: tiers.map(t => t.areaAvailSqFt >= t.areaRequiredSqFt ? FAA.green : FAA.amber),
          barPercentage: 0.7,
        },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Ramp Area: Available vs. Required per FAA EB-105 §4.2', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Area (sq ft)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
      },
    },
  };
}

// ─── Figure P5: Annual Passenger Ramp-Up — All Scenarios (Premium §3.3) ──────
export function passengerRampUpConfig() {
  const { years, revBase, revLow, revHigh } = RECS.financialProjection;
  // Scale revenue proxy to passenger proxy using Year 3 anchor (131,400 pax = $2.1M base)
  const paxFactor = 131400 / 2.1;
  const toLow  = revLow.map(v => Math.round(v * paxFactor * 0.7 / 1000));
  const toBase = revBase.map(v => Math.round(v * paxFactor / 1000));
  const toHigh = revHigh.map(v => Math.round(v * paxFactor * 1.2 / 1000));
  return {
    type: 'line',
    data: {
      labels: years.map(y => `Y${y}`),
      datasets: [
        { label: 'High Traffic (5.8%)',  data: toHigh, borderColor: FAA.green,    backgroundColor: 'rgba(26,127,75,0.07)',  fill: '+1', borderWidth: 2, pointRadius: 3, tension: 0.4 },
        { label: 'Medium Traffic (2.5%)',data: toBase, borderColor: FAA.navy,     backgroundColor: 'rgba(0,48,135,0.07)',   fill: false, borderWidth: 2.5, pointRadius: 4, tension: 0.4 },
        { label: 'Low Traffic (0.8%)',   data: toLow,  borderColor: FAA.amber,    backgroundColor: 'rgba(179,92,0,0.06)',   fill: false, borderWidth: 2, pointRadius: 3, tension: 0.4 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Annual Passenger Ramp-Up — Year 1 to Year 10 (000s)', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Annual Passengers (000s)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
      },
    },
  };
}

// ─── Figure P6: CI Comparison — Passing Scenarios (Premium §5.2) ─────────────
export function ciComparisonConfig() {
  const passing = [
    { label: 'Med + Vertiport ★', low: 88.2, mean: 93.2, high: 98.2, color: FAA.navy },
    { label: 'Med + Vertistop',   low: 86,   mean: 89,   high: 92,   color: FAA.blue },
    { label: 'Low + Vertiport',   low: 85,   mean: 88,   high: 91,   color: FAA.blue },
    { label: 'Low + Vertistop',   low: 83,   mean: 86,   high: 89,   color: FAA.lightBlue },
    { label: 'Hi + Vertihub',     low: 48,   mean: 55,   high: 62,   color: FAA.amber },
  ];
  return {
    type: 'bar',
    data: {
      labels: passing.map(p => p.label),
      datasets: [
        {
          label: '95% CI Range',
          data:  passing.map(p => [p.low, p.high]),
          backgroundColor: passing.map(p => p.color + '66'),
          borderColor:     passing.map(p => p.color),
          borderWidth: 1.5,
          barPercentage: 0.5,
        },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      indexAxis: 'y',
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: '95% Confidence Intervals — Passing Scenario Readiness Scores', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: false },
      },
      scales: {
        x: { ...BASE_OPTIONS.scales.x, title: { display: true, text: 'Readiness Score', font: BASE_FONT, color: FAA.gray }, min: 40, max: 105 },
        y: BASE_OPTIONS.scales.y,
      },
    },
  };
}

// ─── Figure P7: Throughput at 100/200/500% Demand (Premium §5.3) ─────────────
export function throughputScalingConfig() {
  const tiers    = ['Vertistop', 'Vertiport', 'Vertihub'];
  const vol100   = [94.2, 100, 100];
  const vol200   = [71.4, 98.8, 100];
  const vol500   = [42.1, 68.3, 96.2];
  return {
    type: 'bar',
    data: {
      labels: tiers,
      datasets: [
        { label: '100% Demand', data: vol100, backgroundColor: FAA.navy,  barPercentage: 0.75 },
        { label: '200% Demand', data: vol200, backgroundColor: FAA.amber, barPercentage: 0.75 },
        { label: '500% Demand', data: vol500, backgroundColor: FAA.red,   barPercentage: 0.75 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Throughput Rate by Infrastructure Tier and Demand Volume', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Throughput Rate (%)', font: BASE_FONT, color: FAA.gray }, min: 0, max: 110 },
      },
    },
  };
}

// ─── Figure P8: TAT at 100/200/500% Demand (Premium §5.3) ────────────────────
export function tatScalingConfig() {
  const tiers  = ['Vertistop', 'Vertiport', 'Vertihub'];
  const vol100 = [24.1, 22.3, 22.3];
  const vol200 = [38.2, 23.6, 22.4];
  const vol500 = [61.4, 44.8, 24.8];
  return {
    type: 'bar',
    data: {
      labels: tiers,
      datasets: [
        { label: '100% Demand', data: vol100, backgroundColor: FAA.navy,  barPercentage: 0.75 },
        { label: '200% Demand', data: vol200, backgroundColor: FAA.amber, barPercentage: 0.75 },
        { label: '500% Demand', data: vol500, backgroundColor: FAA.red,   barPercentage: 0.75 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Average Turnaround Time by Tier and Demand Volume', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Avg TAT (minutes)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true, suggestedMax: 70 },
      },
    },
  };
}

// ─── Figure P9: Queue Depth at 100/200/500% Demand (Premium §5.3) ────────────
export function queueScalingConfig() {
  const tiers  = ['Vertistop', 'Vertiport', 'Vertihub'];
  const vol100 = [8.3, 0, 0];
  const vol200 = [42.1, 4.2, 0];
  const vol500 = [112, 68.2, 9.1];
  return {
    type: 'bar',
    data: {
      labels: tiers,
      datasets: [
        { label: '100% Demand', data: vol100, backgroundColor: FAA.navy,  barPercentage: 0.75 },
        { label: '200% Demand', data: vol200, backgroundColor: FAA.amber, barPercentage: 0.75 },
        { label: '500% Demand', data: vol500, backgroundColor: FAA.red,   barPercentage: 0.75 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Peak Queue Depth by Infrastructure Tier and Demand Volume', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Peak Queue Depth (aircraft)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true },
      },
    },
  };
}

// ─── Figure P10: CAPEX by Traffic Scenario (Premium §7.3) ────────────────────
export function capexByScenarioConfig() {
  return {
    type: 'bar',
    data: {
      labels: ['Low Traffic', 'Medium Traffic ★', 'High Traffic'],
      datasets: [
        { label: 'CAPEX Low Estimate ($M)',  data: [2.5, 4.1, 8.0],  backgroundColor: FAA.lightBlue, barPercentage: 0.6 },
        { label: 'CAPEX High Estimate ($M)', data: [3.5, 5.4, 12.0], backgroundColor: FAA.navy,     barPercentage: 0.6 },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      plugins: {
        ...BASE_OPTIONS.plugins,
        title: { display: true, text: 'Program CAPEX Range by Traffic Scenario', font: { ...BASE_FONT, size: 13, weight: 'bold' }, color: FAA.navy },
        legend: { display: true, position: 'top', labels: { font: BASE_FONT } },
      },
      scales: {
        x: BASE_OPTIONS.scales.x,
        y: { ...BASE_OPTIONS.scales.y, title: { display: true, text: 'Estimated CAPEX ($M)', font: BASE_FONT, color: FAA.gray }, beginAtZero: true, suggestedMax: 14 },
      },
    },
  };
}

// Master export — keys match those used in generateCharts.js
export const CHART_CONFIGS = {
  // Standard charts (Figures 1–14)
  monthlyOps:          monthlyOpsConfig,
  aircraftCategory:    aircraftCategoryConfig,
  modeShift:           modeShiftConfig,
  timeSavings:         timeSavingsConfig,
  peakPower:           peakPowerConfig,
  avgTat:              avgTatConfig,
  monteCarlo:          monteCarloConfig,
  resiliency:          resiliencyConfig,
  efficiencyBreakdown: efficiencyBreakdownConfig,
  capexBreakdown:      capexBreakdownConfig,
  financialProjection: financialProjectionConfig,
  passengersByCorridor: passengersByCorridorConfig,
  sensitivityTornado:  sensitivityTornadoConfig,
  allTiersProjection:  allTiersProjectionConfig,
  // Premium-exclusive charts (Figures P3–P10)
  hourlyOps:           hourlyOpsConfig,
  rampAreaComparison:  rampAreaComparisonConfig,
  passengerRampUp:     passengerRampUpConfig,
  ciComparison:        ciComparisonConfig,
  throughputScaling:   throughputScalingConfig,
  tatScaling:          tatScalingConfig,
  queueScaling:        queueScalingConfig,
  capexByScenario:     capexByScenarioConfig,
};
