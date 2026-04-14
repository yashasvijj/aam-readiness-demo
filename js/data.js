// ── SCENARIO MATRIX DATA ──
// Each key maps to a traffic + infrastructure combination from the 90-day simulation.
// Keys: 'lo-lo', 'lo-med', 'lo-hi', 'med-lo', 'med-med', 'med-hi', 'hi-lo', 'hi-med', 'hi-hi'

const SCENARIOS = {
  'lo-lo': {
    title: 'Low Traffic + Vertistop',
    verdict: 'OPTIMAL', verdictClass: 'verdict-optimal', panelClass: 'panel-green',
    reason: '<span class="reason-green">Passes both gates.</span> At low adoption (0.8%), a 2-pad Vertistop is perfectly sized — 100% throughput, zero queue time, and zero resilience failures. Efficient and right-sized for early market entry.',
    metrics: [
      { val: '92/100', lbl: 'Score' }, { val: '100%', lbl: 'Throughput' },
      { val: '0.0 min', lbl: 'Queue Time' }, { val: '270 kW', lbl: 'Peak Power' }, { val: '0', lbl: 'Failures' }
    ]
  },
  'lo-med': {
    title: 'Low Traffic + Vertiport',
    verdict: 'OPTIMAL', verdictClass: 'verdict-optimal', panelClass: 'panel-green',
    reason: '<span class="reason-green">Passes both gates.</span> A Vertiport handles low traffic with no strain — 100% throughput and zero queuing. Score is lower than Vertistop because the infrastructure is oversized for this demand level, meaning capital is underutilized.',
    metrics: [
      { val: '86/100', lbl: 'Score' }, { val: '100%', lbl: 'Throughput' },
      { val: '0.0 min', lbl: 'Queue Time' }, { val: '405 kW', lbl: 'Peak Power' }, { val: '0', lbl: 'Failures' }
    ]
  },
  'lo-hi': {
    title: 'Low Traffic + Vertihub',
    verdict: 'NOT READY', verdictClass: 'verdict-fail', panelClass: 'panel-red',
    reason: '<span class="reason-red">Fails Gate 1.</span> All Vertihub configurations fail at 42J — the 8-pad layout exceeds available ramp geometry and requires dedicated ARFF per FAA AC 150/5210-6D, which is not warranted at this airport\'s volume. No score is issued regardless of traffic.',
    metrics: [
      { val: '0', lbl: 'Score' }, { val: '100%', lbl: 'Throughput' },
      { val: 'Gate 1', lbl: 'Failure Point' }, { val: 'ARFF', lbl: 'Blocker' }
    ]
  },
  'med-lo': {
    title: 'Medium Traffic + Vertistop',
    verdict: 'READY', verdictClass: 'verdict-ready', panelClass: 'panel-teal',
    reason: '<span class="reason-teal">Passes both gates, but showing strain.</span> At medium adoption, the 2-pad Vertistop starts to feel the pressure — 99.2% throughput with 18.8 min average queue time and 55 resilience failures in the 90-day simulation. Viable, but not the right long-term configuration.',
    metrics: [
      { val: '73/100', lbl: 'Score' }, { val: '99.2%', lbl: 'Throughput' },
      { val: '18.8 min', lbl: 'Avg Queue' }, { val: '270 kW', lbl: 'Peak Power' }, { val: '55', lbl: 'Failures' }
    ]
  },
  'med-med': {
    title: 'Medium Traffic + Vertiport',
    verdict: '★ OPTIMAL — RECOMMENDED', verdictClass: 'verdict-optimal', panelClass: 'panel-green',
    reason: '<span class="reason-green">Best overall configuration for 42J.</span> Perfect throughput, zero queue time, zero resilience failures — and the infrastructure is correctly sized for medium adoption demand. Passes both gates cleanly. This is the configuration the grant application should be built around.',
    metrics: [
      { val: '93/100', lbl: 'Score' }, { val: '100%', lbl: 'Throughput' },
      { val: '0.0 min', lbl: 'Queue Time' }, { val: '540 kW', lbl: 'Peak Power' }, { val: '0', lbl: 'Failures' }
    ]
  },
  'med-hi': {
    title: 'Medium Traffic + Vertihub',
    verdict: 'NOT READY', verdictClass: 'verdict-fail', panelClass: 'panel-red',
    reason: '<span class="reason-red">Fails Gate 1.</span> Vertihub fails at 42J regardless of traffic level. Ramp geometry and ARFF requirements are the hard blockers. Even though the simulation shows good throughput, the airport physically cannot support this infrastructure tier today.',
    metrics: [
      { val: '0', lbl: 'Score' }, { val: '100%', lbl: 'Throughput' },
      { val: 'Gate 1', lbl: 'Failure Point' }, { val: 'ARFF', lbl: 'Blocker' }
    ]
  },
  'hi-lo': {
    title: 'High Traffic + Vertistop',
    verdict: 'NOT READY', verdictClass: 'verdict-fail', panelClass: 'panel-red',
    reason: '<span class="reason-red">Fails Gate 1 — severely undersized.</span> At 5.8% adoption, a 2-pad Vertistop collapses: 76.5% throughput with 28.7 min average queues and 2,126 resilience failures across the 90-day simulation. The infrastructure is overwhelmed and cannot safely process demand.',
    metrics: [
      { val: '0', lbl: 'Score' }, { val: '76.5%', lbl: 'Throughput' },
      { val: '28.7 min', lbl: 'Avg Queue' }, { val: '270 kW', lbl: 'Peak Power' }, { val: '2,126', lbl: 'Failures' }
    ]
  },
  'hi-med': {
    title: 'High Traffic + Vertiport',
    verdict: 'NOT READY', verdictClass: 'verdict-fail', panelClass: 'panel-red',
    reason: '<span class="reason-red">Fails Gate 1 — infrastructure overwhelmed at high demand.</span> A 4-pad Vertiport handles high traffic reasonably in throughput (98.8%) but accumulates 230 resilience failures and 20.2 min queues. The airport would need to scale to Vertihub — which itself cannot pass gates at 42J.',
    metrics: [
      { val: '0', lbl: 'Score' }, { val: '98.8%', lbl: 'Throughput' },
      { val: '20.2 min', lbl: 'Avg Queue' }, { val: '540 kW', lbl: 'Peak Power' }, { val: '230', lbl: 'Failures' }
    ]
  },
  'hi-hi': {
    title: 'High Traffic + Vertihub',
    verdict: 'NOT READY', verdictClass: 'verdict-fail', panelClass: 'panel-red',
    reason: '<span class="reason-red">Fails Gate 1.</span> Perfect simulation performance — but the Vertihub still cannot pass safety gates at 42J. The ramp geometry and ARFF requirements are hard physical constraints that cannot be overcome by traffic demand alone. Land acquisition and dedicated fire infrastructure would be required.',
    metrics: [
      { val: '0', lbl: 'Score' }, { val: '100%', lbl: 'Throughput' },
      { val: '0.0 min', lbl: 'Queue Time' }, { val: '1,080 kW', lbl: 'Peak Power' }, { val: '0', lbl: 'Failures' }
    ]
  }
};

// ── TRAFFIC TIER DATA ──
// Three adoption scenarios from the demand model.
const TIERS = {
  low: {
    ops: 42, pax: '24,528', adopt: '0.8%', infra: 'Vertistop',
    power: '194 kW', status: '✅ Ready', color: '#0d9488',
    grantText: '<strong>Grant Justification (Low Traffic Scenario):</strong> A Vertistop configuration supports initial eVTOL market entry at 42 daily operations and 24,528 annual passengers. Infrastructure investment of ~$2.5–3.5M activates the Jacksonville and Orange Park corridors and establishes the vertipad foundation for future expansion to Vertiport scale as demand materializes.'
  },
  medium: {
    ops: 128, pax: '131,400', adopt: '2.5%', infra: 'Vertiport',
    power: '387 kW', status: '✅ Optimal', color: '#6366f1',
    grantText: '<strong>Grant Justification (Medium Traffic Scenario — Recommended):</strong> A full Vertiport with 4 pads and 4 DC fast chargers serves 128 daily eVTOL operations and 131,400 annual passengers at 2.5% market adoption. The $4.1–5.4M phased investment over 36 months is matched to demonstrated demand and fully passes both FAA readiness gates. This is the recommended configuration for 42J.'
  },
  high: {
    ops: 288, pax: '327,680', adopt: '5.8%', infra: 'Vertihub',
    power: '774 kW', status: '❌ Not viable', color: '#3b82f6',
    grantText: '<strong>Note (High Traffic Scenario):</strong> A Vertihub configuration would serve 288 daily operations and 327,680 annual passengers, but fails Gate 1 at 42J due to ARFF requirements and ramp geometry constraints. This scale is not viable at the current facility without significant land acquisition and dedicated fire infrastructure. Not recommended for this grant cycle.'
  }
};
