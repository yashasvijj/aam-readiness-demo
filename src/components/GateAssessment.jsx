const GATES = [
  {
    badge: '✓ PASS', badgeCls: 'gate-pass',
    title: 'Gate 1 — Safety & Regulatory Compliance (Vertiport)',
    desc: 'Obstacle surfaces clear, no Part 77 penetrations. Existing ARFF infrastructure adequate for eVTOL lithium-ion events at Vertiport scale. Minor ramp reconfiguration at B SOUTH needed (~$150–300K), achievable within existing footprint.',
  },
  {
    badge: '✗ FAIL', badgeCls: 'gate-fail',
    title: 'Gate 1 — Safety & Regulatory Compliance (Vertihub)',
    desc: '8-pad Vertihub exceeds available ramp geometry at 42J and requires dedicated ARFF per FAA AC 150/5210-6D — not warranted at this volume. All Vertihub scenarios score zero. This protects 42J from a $10M+ overbuild.',
  },
  {
    badge: '✓ PASS', badgeCls: 'gate-pass',
    title: 'Gate 2 — Power & Grid Resiliency (All Configurations)',
    desc: 'Peak Vertiport demand: 387kW vs. 800kW available from Clay County EMC rural grid. All infrastructure tiers pass power requirements — no grid constraint blocks AAM deployment at 42J.',
  },
];

export default function GateAssessment() {
  return (
    <div className="card">
      <div className="section-label">Safety & Power Readiness</div>
      <h2>Gate Assessment</h2>
      <div className="sub">Two mandatory pass/fail thresholds — failure at either gate scores zero</div>
      {GATES.map((g, i) => (
        <div key={i} className="gate-row">
          <div className={`gate-badge ${g.badgeCls}`}>{g.badge}</div>
          <div>
            <div className="gate-title">{g.title}</div>
            <div className="gate-desc">{g.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
