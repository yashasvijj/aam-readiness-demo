export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stat"><div className="val">537</div><div className="lbl">Simulated eVTOL Operations</div></div>
      <div className="stat"><div className="val green">4/9</div><div className="lbl">Scenarios Passing All Gates</div></div>
      <div className="stat"><div className="val teal">90</div><div className="lbl">Simulation Days (Monte Carlo)</div></div>
      <div className="stat"><div className="val blue">50,236</div><div className="lbl">Airport Operations Baseline</div></div>
    </div>
  );
}
