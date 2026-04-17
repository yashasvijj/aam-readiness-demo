// ── TIERS.JS ──
// Defines the three eVTOL market adoption scenarios used in the Grant Planning Tool.
//
// Each tier represents a different demand forecast and maps to a matching
// infrastructure scale:
//   low    → 0.8% adoption  · Vertistop  (2 pads)
//   medium → 2.5% adoption  · Vertiport  (4 pads)  ★ recommended
//   high   → 5.8% adoption  · Vertihub   (8 pads)  — not viable at 42J
//
// Each entry contains:
//   - ops        daily eVTOL operations
//   - pax        projected annual passengers
//   - adopt      market adoption rate
//   - infra      required infrastructure tier
//   - power      peak power draw
//   - status     42J gate pass/fail status
//   - color      accent colour used in the summary stats and chart highlights
//   - grantText  HTML string with grant justification copy for that scenario
//
// Consumed by ResourceScaling.jsx to drive the tier toggle, summary stats,
// chart highlighting, resource table column emphasis, and grant callout text.

export const TIERS = {
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
