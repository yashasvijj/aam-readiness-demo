const CONFIG_ITEMS = [
  { val: '4',      lbl: 'Landing Pads (FATO/TLOF)' },
  { val: '4',      lbl: 'DC Fast Chargers (150kW ea.)' },
  { val: '$6.0M',  lbl: 'Est. Vertiport CAPEX', note: '+$1.4M grid upgrade' },
  { val: '36 mo',  lbl: 'Phased Timeline' },
  { val: '26,280', lbl: 'Annual Passengers (projected)' },
  { val: '24',     lbl: 'Daily eVTOL Ops at maturity' },
];

export default function RecommendedConfig() {
  return (
    <div className="card">
      <div className="section-label">Recommended Path</div>
      <h2>Your Optimal Configuration</h2>
      <div className="sub">Vertiport · B SOUTH / A2 Ramp · Phased over 36 months</div>
      <div className="config-grid">
        {CONFIG_ITEMS.map((item, i) => (
          <div key={i} className="config-item">
            <div className="val">{item.val}</div>
            <div className="lbl">{item.lbl}</div>
            {item.note && <div className="note">{item.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
