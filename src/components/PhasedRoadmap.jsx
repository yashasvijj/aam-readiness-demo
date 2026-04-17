// ── PHASEDROADMAP.JSX ──
// Renders the 3-phase implementation timeline for the recommended Vertiport
// build-out at Keystone Heights Airport (42J).
//
// Each phase is represented as a numbered node on a horizontal timeline:
//   Phase 1 · Site Prep        · Months 1–6   · $250–400K
//   Phase 2 · Infrastructure   · Months 7–18  · $2.8–3.5M
//   Phase 3 · Full Operations  · Months 19–36 · $1.0–1.5M
//
// Each phase node shows a phase number, title, month range, bullet-point
// task list, and CAPEX estimate. The connecting line between nodes is drawn
// with a CSS ::before pseudo-element on .timeline.
//
// All content is static — no props or state.
// Styles live in index.css under the ── TIMELINE ── section.

const PHASES = [
  {
    num: 1, title: 'Site Prep', months: 'Months 1–6', capex: '$250–400K',
    items: ['B SOUTH ramp reconfiguration', 'Helipad → 2-pad FATO/TLOF', 'EB-105 compliance work', 'Grid assessment'],
  },
  {
    num: 2, title: 'Infrastructure', months: 'Months 7–18', capex: '$2.8–3.5M',
    items: ['+0.3MW grid distribution line', '4 × 150kW DC fast chargers', 'UTM ground infrastructure'],
  },
  {
    num: 3, title: 'Full Operations', months: 'Months 19–36', capex: '$1.0–1.5M',
    items: ['Full Vertiport operations', 'Scale to medium traffic tier', 'Jacksonville corridor launch', 'Annual re-assessment'],
  },
];

export default function PhasedRoadmap() {
  return (
    <div className="card">
      <div className="section-label">Implementation</div>
      <h2>Phased Deployment Roadmap</h2>
      <div className="sub">Total investment: $4.1–5.4M across 36 months</div>
      <div className="timeline">
        {PHASES.map((p) => (
          <div key={p.num} className="phase">
            <div className="phase-dot">{p.num}</div>
            <div className="phase-title">{p.title}</div>
            <div className="phase-months">{p.months}</div>
            <ul className="phase-items">
              {p.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <div className="phase-capex">{p.capex}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
