/**
 * generateCharts.js
 * Pre-generates all PDF chart images for a given report tier.
 * Called by ExportButton before pdf().toBlob() — returns a map of
 * { chartKey: base64DataURL } which is passed as the `charts` prop
 * to each report component.
 *
 * Tier controls which charts are generated:
 *   'preliminary' — heatmap matrix only (no charts, just the matrix visual)
 *   'standard'    — core 10 charts
 *   'premium'     — all 14 charts
 */

import chartToImage from './chartToImage';
import { CHART_CONFIGS } from '../../data/chartConfigs';

// Chart dimensions for each key (width × height in logical px)
const DIMENSIONS = {
  monthlyOps:          [520, 240],
  aircraftCategory:    [520, 260],
  modeShift:           [480, 200],
  timeSavings:         [480, 200],
  peakPower:           [500, 260],
  avgTat:              [520, 240],
  monteCarlo:          [500, 220],
  resiliency:          [520, 240],
  efficiencyBreakdown: [500, 180],
  capexBreakdown:      [520, 240],
  financialProjection: [520, 260],
  passengersByCorridor:[520, 240],
  sensitivityTornado:  [480, 180],
  allTiersProjection:  [520, 260],
  // Premium-exclusive
  hourlyOps:           [520, 220],
  rampAreaComparison:  [500, 240],
  passengerRampUp:     [520, 260],
  ciComparison:        [500, 200],
  throughputScaling:   [520, 240],
  tatScaling:          [520, 240],
  queueScaling:        [520, 240],
  capexByScenario:     [500, 220],
};

// Which charts each tier needs
const TIER_CHARTS = {
  preliminary: [],  // no charts in prelim (matrix is JSX-rendered, not chart)
  standard: [
    'monthlyOps', 'aircraftCategory',
    'modeShift', 'timeSavings',
    'peakPower',
    'avgTat', 'monteCarlo', 'resiliency',
    'efficiencyBreakdown',
    'capexBreakdown', 'financialProjection',
  ],
  premium: [
    // All Standard charts
    'monthlyOps', 'aircraftCategory',
    'modeShift', 'timeSavings',
    'peakPower',
    'avgTat', 'monteCarlo', 'resiliency',
    'efficiencyBreakdown',
    'capexBreakdown', 'financialProjection',
    'passengersByCorridor', 'sensitivityTornado', 'allTiersProjection',
    // Premium-exclusive charts
    'hourlyOps', 'rampAreaComparison',
    'passengerRampUp', 'ciComparison',
    'throughputScaling', 'tatScaling', 'queueScaling',
    'capexByScenario',
  ],
};

/**
 * @param {'preliminary'|'standard'|'premium'} tier
 * @param {function} onProgress  optional (completed, total) => void callback
 * @returns {Promise<Record<string, string>>}  { chartKey: base64PNG }
 */
export default async function generateCharts(tier, onProgress) {
  const keys = TIER_CHARTS[tier] ?? TIER_CHARTS.standard;
  const result = {};
  let done = 0;

  for (const key of keys) {
    const configFn = CHART_CONFIGS[key];
    if (!configFn) continue;
    const [w, h] = DIMENSIONS[key] ?? [520, 260];
    result[key] = await chartToImage(configFn(), w, h);
    done++;
    onProgress?.(done, keys.length);
  }

  return result;
}
