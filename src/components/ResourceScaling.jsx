import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, PointElement, LineElement,
  Title, Tooltip, Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { TIERS } from '../data/tiers';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const RESOURCE_ROWS = [
  ['Infrastructure Tier',         'Vertistop',        'Vertiport',        'Vertihub'],
  ['Landing Pads (FATO/TLOF)',    '2',                '4',                '8'],
  ['DC Fast Chargers',            '2',                '4',                '8'],
  ['Peak Power Draw',             '194 kW',           '387 kW',           '774 kW'],
  ['Grid Available at 42J',       '800 kW ✅',        '800 kW ✅',        '800 kW ⚠️'],
  ['ARFF Requirement',            'Existing GA ✅',   'Existing GA ✅',   'Dedicated ARFF ❌'],
  ['Ramp Geometry (EB-105)',      'Minor reconfig ⚠️','Minor reconfig ⚠️','New apron needed ❌'],
  ['Daily eVTOL Ops',             '42 ops/day',       '128 ops/day',      '288 ops/day'],
  ['Annual Passengers',           '24,528',           '131,400',          '327,680'],
  ['Market Adoption Rate',        '0.8%',             '2.5%',             '5.8%'],
  ['Est. Implementation Cost',    '~$2.5–3.5M',       '$4.1–5.4M',        'Not viable at 42J'],
  ['42J Gate Status',             '✅ Passes all gates','✅ Passes all gates','❌ Fails Gate 1'],
];

const BG_COLORS  = { low: '#f0fdfa', medium: '#f5f3ff', high: '#eff6ff' };
const TXT_COLORS = { low: '#0f766e', medium: '#6366f1', high: '#1d4ed8' };

const TIER_COLORS  = ['#0d9488', '#6366f1', '#3b82f6'];
const TIER_IDX     = { low: 0, medium: 1, high: 2 };

function alpha(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

function buildDemandData(tier) {
  const active = TIER_IDX[tier];
  return {
    labels: ['Low (0.8%)', 'Medium (2.5%)', 'High (5.8%)'],
    datasets: [
      {
        label: 'Annual Passengers',
        data: [24528, 131400, 327680],
        backgroundColor: TIER_COLORS.map((c, i) => alpha(c, i === active ? 0.35 : 0.1)),
        borderColor:     TIER_COLORS.map((c, i) => alpha(c, i === active ? 1   : 0.3)),
        borderWidth: 2, borderRadius: 6, yAxisID: 'y',
      },
      {
        label: 'Daily Ops',
        data: [42, 128, 288],
        backgroundColor: TIER_COLORS.map((c, i) => alpha(c, i === active ? 0.8 : 0.2)),
        borderColor:     TIER_COLORS.map((c, i) => alpha(c, i === active ? 1   : 0.3)),
        borderWidth: 2, borderRadius: 6, yAxisID: 'y1', type: 'line',
        tension: 0.4,
        pointRadius:      TIER_COLORS.map((_, i) => i === active ? 8 : 4),
        pointHoverRadius: TIER_COLORS.map((_, i) => i === active ? 10 : 6),
      },
    ],
  };
}

function buildInfraData(tier) {
  const active = TIER_IDX[tier];
  return {
    labels: ['Low (Vertistop)', 'Medium (Vertiport)', 'High (Vertihub)'],
    datasets: [
      {
        label: 'Landing Pads',
        data: [2, 4, 8],
        backgroundColor: TIER_COLORS.map((c, i) => alpha(c, i === active ? 0.8 : 0.15)),
        borderRadius: 6, yAxisID: 'y',
      },
      {
        label: 'Peak Power (kW)',
        data: [194, 387, 774],
        backgroundColor: TIER_COLORS.map((c, i) => alpha(c, i === active ? 0.35 : 0.1)),
        borderColor:     TIER_COLORS.map((c, i) => alpha(c, i === active ? 1   : 0.3)),
        borderWidth: 2, borderRadius: 6, yAxisID: 'y1', type: 'line',
        tension: 0.4,
        pointRadius:      TIER_COLORS.map((_, i) => i === active ? 8 : 4),
        pointHoverRadius: TIER_COLORS.map((_, i) => i === active ? 10 : 6),
      },
    ],
  };
}

const demandOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
  scales: {
    y:  { type: 'linear', position: 'left',  title: { display: true, text: 'Annual Passengers', font: { size: 10 } }, grid: { color: '#f1f5f9' } },
    y1: { type: 'linear', position: 'right', title: { display: true, text: 'Daily Ops', font: { size: 10 } }, grid: { drawOnChartArea: false } },
  },
};

const infraOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 11 } } },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          if (ctx.datasetIndex === 1) return ` Peak Power: ${ctx.raw} kW`;
          return ` Landing Pads: ${ctx.raw}`;
        },
      },
    },
  },
  scales: {
    y:  { type: 'linear', position: 'left',  title: { display: true, text: 'Landing Pads', font: { size: 10 } }, grid: { color: '#f1f5f9' }, beginAtZero: true },
    y1: { type: 'linear', position: 'right', title: { display: true, text: 'Peak Power (kW)', font: { size: 10 } }, grid: { drawOnChartArea: false }, beginAtZero: true },
  },
};

export default function ResourceScaling() {
  const [tier, setTier]           = useState('low');
  const [tableOpen, setTableOpen] = useState(false);

  const d          = TIERS[tier];
  const idx        = TIER_IDX[tier];
  const demandData = buildDemandData(tier);
  const infraData  = buildInfraData(tier);

  return (
    <div className="card">
      <div className="section-label">Grant Planning Tool</div>
      <h2>Resource Scaling by Traffic Tier</h2>
      <div className="sub">
        Select a traffic scenario to see how infrastructure requirements scale — use this to justify grant funding levels
      </div>

      <div className="tier-toggle">
        {['low', 'medium', 'high'].map((t) => (
          <button
            key={t}
            className={`tier-btn ${t}${tier === t ? ' active' : ''}`}
            onClick={() => setTier(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} Traffic
          </button>
        ))}
      </div>

      <div className="tier-summary">
        {[
          { id: 'ops',    val: d.ops,    lbl: 'Daily eVTOL Ops' },
          { id: 'pax',    val: d.pax,    lbl: 'Annual Passengers' },
          { id: 'adopt',  val: d.adopt,  lbl: 'Market Adoption Rate' },
          { id: 'infra',  val: d.infra,  lbl: 'Required Infrastructure' },
          { id: 'power',  val: d.power,  lbl: 'Peak Power Draw' },
          { id: 'status', val: d.status, lbl: '42J Gate Status' },
        ].map((s) => (
          <div key={s.id} className="tier-stat">
            <div className="ts-val" style={{ color: d.color }}>{s.val}</div>
            <div className="ts-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="scaling-grid">
        <div>
          <div className="section-label">Passengers & Operations vs. Traffic Tier</div>
          <div className="chart-wrap">
            <Chart type="bar" data={demandData} options={demandOptions} />
          </div>
        </div>
        <div>
          <div className="section-label">Infrastructure & Power Requirements</div>
          <div className="chart-wrap">
            <Chart type="bar" data={infraData} options={infraOptions} />
          </div>
        </div>
      </div>

      <button
        className="dropdown-toggle"
        aria-expanded={tableOpen}
        onClick={() => setTableOpen(!tableOpen)}
      >
        <span>Full Resource Requirement Breakdown</span>
        <span className="dropdown-chevron">▼</span>
      </button>

      <div className={`resource-table-wrap dropdown-body${tableOpen ? ' open' : ''}`}>
        <table className="resource-table">
          <thead>
            <tr>
              <th>Resource</th>
              <th>Low Traffic</th>
              <th>Medium Traffic ★</th>
              <th>High Traffic</th>
            </tr>
          </thead>
          <tbody>
            {RESOURCE_ROWS.map((row, ri) => (
              <tr
                key={ri}
                style={{ background: BG_COLORS[tier] }}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      color: ci === 0 ? undefined : TXT_COLORS[['low','medium','high'][ci - 1]],
                      fontWeight: ci === idx + 1 ? 700 : undefined,
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="grant-callout"
        dangerouslySetInnerHTML={{ __html: d.grantText }}
      />
    </div>
  );
}
