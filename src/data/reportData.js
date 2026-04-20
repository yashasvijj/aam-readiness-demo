/**
 * reportData.js
 * Centralised placeholder data for all three report tiers.
 * All values are realistic placeholders derived from the AAM-42J-2026-001
 * reference document.  Replace with live model output when the backend is wired.
 *
 * ALGORITHM PROTECTION — this file must NEVER contain:
 *   • Scoring component weights (Throughput / Airspace / Demand %)
 *   • β coefficients from the demand logit model
 *   • SoC arrival distribution parameters
 *   • CC/CV charging curve parameters
 *   • Coincidence factor values
 *   • Monte Carlo seed values or per-tier run counts
 *   • References to internal config files (faa_rules.json, audit.json)
 */

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT META
// ─────────────────────────────────────────────────────────────────────────────
export const DOC = {
  standard:    { id: 'AAM-42J-2026-001', tier: 'STANDARD',    label: 'Standard Assessment'    },
  preliminary: { id: 'AAM-42J-2026-P01', tier: 'PRELIMINARY', label: 'Preliminary Assessment' },
  premium:     { id: 'AAM-42J-2026-PR1', tier: 'PREMIUM',     label: 'Premium Assessment'     },
  date:        'April 2026',
  generated:   '2026-04-14',
  systemVersion: 'v2.0',
  rulesVersion:  '2026.1',
};

// ─────────────────────────────────────────────────────────────────────────────
// AIRPORT PROFILE
// ─────────────────────────────────────────────────────────────────────────────
export const AIRPORT = {
  name:        'Keystone Heights Airport',
  icao:        '42J',
  city:        'Keystone Heights',
  state:       'Florida',
  county:      'Clay County',
  lat:         29.738,
  lon:         -82.052,
  elevationFt: 196,
  airspaceClass: 'G',
  ctaf:        '122.7',
  atc:         'None — CTAF self-announce',
  acreage:     280,

  runways: [
    {
      designator: '05/23',
      lengthFt:   3597,
      widthFt:    75,
      surface:    'Asphalt',
      pcn:        '12/F/B/X/T',
      primaryLoad: '79.6%',
    },
  ],

  fbo: {
    name:   'Keystone Heights FBO',
    fuel:   '100LL, Jet-A',
    status: 'Active',
  },

  yearEstablished: 1944,
  ownership:       'Public — Clay County Airport Authority',
  historicalUse:   'WWII training airfield; transitioned to general aviation post-1945; active military touch-and-go since 1990s',

  military: {
    facility:  'Camp Blanding Joint Training Center',
    distanceMi: 28,
    bearing:   'NE',
    aircraftTypes: ['UH-60 Black Hawk', 'CH-47 Chinook', 'AH-64 Apache'],
    relationship: 'Active LOA with USARC for periodic rotary-wing training operations',
    loaStatus:  'Active — renewed 2024',
  },

  utility: {
    provider:       'Clay County Electric Cooperative',
    gridHeadroom:   0.8,   // MW — estimated, utility verification recommended
    verified:       false,
  },

  rampAreas: [
    { name: 'B SOUTH',  sqFt: 18000, designation: 'Primary Ramp Candidate' },
    { name: 'A2 Ramp',  sqFt: 12500, designation: 'Secondary / overflow' },
    { name: 'North Tie-Down', sqFt: 8400, designation: 'GA tie-down' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BASELINE OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const OPS = {
  source:         'Virtower AI Tower System — 42J Operations Data',
  periodStart:    'May 2024',
  periodEnd:      'March 2026',
  totalOps:       50236,
  militaryVtol:   2953,
  avgDailyOps:    73.8,
  medianDailyOps: 60,
  peakSingleDay:  337,
  peakDayDate:    '2026-02-25',
  stdDevDaily:    52.7,
  peakMonth:      'March',
  peakMonthFactor: '+1.72 vs average',
  troughMonth:    'April',
  troughMonthFactor: '-0.91 vs average',
  touchAndGoRate: 24.2,
  primaryRunwayLoad: 79.6,

  // Monthly distribution (Jan–Dec, normalised to avg daily)
  monthlyPattern: [
    { month: 'Jan', ops: 3200 },
    { month: 'Feb', ops: 3800 },
    { month: 'Mar', ops: 5100 },
    { month: 'Apr', ops: 2900 },
    { month: 'May', ops: 3400 },
    { month: 'Jun', ops: 3600 },
    { month: 'Jul', ops: 3700 },
    { month: 'Aug', ops: 3500 },
    { month: 'Sep', ops: 3300 },
    { month: 'Oct', ops: 3900 },
    { month: 'Nov', ops: 4200 },
    { month: 'Dec', ops: 3700 },
  ],

  // Aircraft category distribution
  aircraftCategories: [
    { label: 'Single Engine Land (SEL)',  count: 41829, pct: 83.3 },
    { label: 'Military Helicopter',        count:  2953, pct:  5.9 },
    { label: 'Single Engine Turbine',      count:  1945, pct:  3.9 },
    { label: 'Multi Engine Land (MEL)',    count:  1148, pct:  2.3 },
    { label: 'Light Sport Aircraft',       count:   984, pct:  2.0 },
    { label: 'Civil Helicopter',           count:   489, pct:  1.0 },
    { label: 'Military Fixed Wing',        count:   509, pct:  1.0 },
    { label: 'Other / Unknown',            count:   379, pct:  0.8 },
  ],

  // Hour-of-day heatmap (Premium §2)
  hourlyPattern: [
    6,8,14,22,38,55,72,88,95,98,92,85,78,82,88,90,85,76,62,44,28,18,10,7
  ], // index = hour 0–23
};

// ─────────────────────────────────────────────────────────────────────────────
// DEMAND ANALYSIS — EVTOL ROUTE NETWORK
// ─────────────────────────────────────────────────────────────────────────────
export const DEMAND = {
  modelBasis: 'Multinomial logit mode-shift model calibrated to USDOT 2024 Value of Time guidance',
  attractivenessFormula: 'A_i = w₁·PopDensity + w₂·EmpDensity + w₃·CommuteFlow + w₄·TimeDifferential',
  attractivenessNote: 'Composite index weights are proprietary; relative magnitudes reflect Census 2020 and LEHD data.',

  corridors: [
    {
      destination: 'Jacksonville SW Corridor',
      primary: true,
      distMi: 47,
      driveMin: 68,
      eVtolMin: 47,
      timeSavedMin: 21,
      fare: 104,
      modeShiftProb: 1.90,
      dailyOps: 26,
      population: 971319,
      employmentDensity: 'High — logistics, healthcare, financial services',
      commutePattern: 'Work (primary), medical (secondary)',
      congestionIndex: 8.4,
      dataSources: 'US Census 2020; LEHD LODES8 2021',
    },
    {
      destination: 'Orange Park / Fleming Island',
      primary: false,
      distMi: 34,
      driveMin: 51,
      eVtolMin: 42,
      timeSavedMin: 9,
      fare: 104,
      modeShiftProb: 0.53,
      dailyOps: 14,
      population: 87400,
      employmentDensity: 'Medium — retail, healthcare, residential services',
      commutePattern: 'Work commute to Jacksonville',
      congestionIndex: 5.2,
      dataSources: 'US Census 2020; LEHD LODES8 2021',
    },
    {
      destination: 'Gainesville',
      primary: false,
      distMi: 25,
      driveMin: 38,
      eVtolMin: 39,
      timeSavedMin: -1,
      fare: 78,
      modeShiftProb: 2.20,
      dailyOps: 18,
      population: 143860,
      employmentDensity: 'High — University of Florida, UF Health, tech corridor',
      commutePattern: 'Academic / medical (dominant), tourism (secondary)',
      congestionIndex: 6.1,
      dataSources: 'US Census 2020; LEHD LODES8 2021',
    },
    {
      destination: 'Lake City',
      primary: false,
      distMi: 39,
      driveMin: 54,
      eVtolMin: 44,
      timeSavedMin: 10,
      fare: 118,
      modeShiftProb: 0.42,
      dailyOps: 4,
      population: 13477,
      employmentDensity: 'Low — agricultural, light industrial',
      commutePattern: 'Work, medical access',
      congestionIndex: 2.8,
      dataSources: 'US Census 2020; LEHD LODES8 2021',
    },
    {
      destination: 'Palatka',
      primary: false,
      distMi: 21,
      driveMin: 45,
      eVtolMin: 38,
      timeSavedMin: 7,
      fare: 65,
      modeShiftProb: 0.23,
      dailyOps: 1,
      population: 10136,
      employmentDensity: 'Low — paper manufacturing, retail',
      commutePattern: 'Work, tourism (St. Johns River)',
      congestionIndex: 2.1,
      dataSources: 'US Census 2020',
    },
    {
      destination: 'Starke',
      primary: false,
      distMi: 18,
      driveMin: 48,
      eVtolMin: 37,
      timeSavedMin: 11,
      fare: 55,
      modeShiftProb: 0.13,
      dailyOps: 1,
      population: 5598,
      employmentDensity: 'Low — correctional facilities, agriculture',
      commutePattern: 'Work, essential services',
      congestionIndex: 1.9,
      dataSources: 'US Census 2020',
    },
  ],

  trafficTiers: [
    {
      id: 'low',
      label: 'Low eVTOL Traffic',
      adoptionPct: 0.8,
      adoptionScenario: 'P10 adoption scenario',
      dailyOps: 8,
      annualPassengers: 24528,
      confidenceInterval: '±3.2',
    },
    {
      id: 'medium',
      label: 'Medium eVTOL Traffic (Base)',
      adoptionPct: 2.5,
      adoptionScenario: 'P50 adoption scenario',
      dailyOps: 24,
      annualPassengers: 131400,
      confidenceInterval: '±12.4',
      recommended: true,
    },
    {
      id: 'high',
      label: 'High eVTOL Traffic',
      adoptionPct: 5.8,
      adoptionScenario: 'P90 adoption scenario',
      dailyOps: 56,
      annualPassengers: 327680,
      confidenceInterval: '±31.1',
    },
  ],

  sensitivityScenarios: [
    { label: 'Fare +25%',       annualPaxChange: -12, direction: 'negative' },
    { label: 'Adoption −50%',   annualPaxChange: -48, direction: 'negative' },
    { label: 'VoT shift +20%',  annualPaxChange: +9,  direction: 'positive' },
    { label: 'Base case',       annualPaxChange:   0, direction: 'neutral'  },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// INFRASTRUCTURE ASSESSMENT
// ─────────────────────────────────────────────────────────────────────────────
export const INFRA = {
  eb105: [
    {
      tier:           'Vertistop',
      pads:           2,
      areaRequiredSqFt: 9419,
      areaAvailSqFt:  8000,
      eb105Status:    'CONDITIONAL',
      eb105Note:      '~15% ramp shortfall; minor reconfiguration required per FAA EB-105 §4.2',
      arff:           'PASS',
      arffNote:       'Existing GA ARFF adequate per FAA AC 150/5210-6D',
      upgradeEst:     '$150K–$250K',
    },
    {
      tier:           'Vertiport',
      pads:           4,
      areaRequiredSqFt: 18838,
      areaAvailSqFt:  18000,
      eb105Status:    'CONDITIONAL',
      eb105Note:      '~4% ramp shortfall; achievable within existing B SOUTH footprint per FAA EB-105 §4.2',
      arff:           'PASS',
      arffNote:       'Existing GA ARFF adequate per FAA AC 150/5210-6D at Vertiport scale',
      upgradeEst:     '$150K–$300K',
    },
    {
      tier:           'Vertihub',
      pads:           8,
      areaRequiredSqFt: 27677,
      areaAvailSqFt:  38000,
      eb105Status:    'PASS',
      eb105Note:      'Ramp geometry sufficient; new apron construction required',
      arff:           'FAIL',
      arffNote:       'Dedicated ARFF station required per FAA AC 150/5210-6D §3.4 — not warranted at current traffic volume',
      upgradeEst:     '$10M+ (not viable)',
    },
  ],

  grid: {
    provider:         'Clay County Electric Cooperative',
    headroomMW:       0.8,
    verified:         false,
    verificationNote: 'Utility verification recommended before federal grant submission',
    powerDemands: [
      { tier: 'Vertistop (2 pads)', peakMW: 0.23 },
      { tier: 'Vertiport (4 pads)', peakMW: 0.51 },
      { tier: 'Vertihub (8 pads)',  peakMW: 1.14 },
    ],
    regulatoryBasis: 'NFPA 855 §9.4; FAA EB-105 Appendix E grid assessment methodology',
  },

  arff: {
    currentCategory: 'Index A — General Aviation',
    currentCapability: 'Single 300-gallon ARFF unit, mutual aid with Clay County Fire',
    vertiportRequirement: 'Index A sufficient per FAA AC 150/5210-6D §3.2 for eVTOL lithium-ion events at Vertiport scale',
    vertihubRequirement:  'Index B minimum required per FAA AC 150/5210-6D §3.4 — dedicated station, ~$2.1M',
    remediationCost: {
      vertiport: 'No additional cost — existing capability adequate',
      vertihub:  '$1.8M–$2.4M for dedicated ARFF station and vehicle',
    },
  },

  utm: {
    status:         'Not yet established',
    requirement:    'FAA UAS Service Supplier (USS) integration required per FAA BEYOND program framework',
    groundInfra:    'ADS-B ground receiver, UTM datalink transceiver, network-connected operations console',
    estimatedCost:  '$85K–$140K for ground infrastructure',
    timeline:       'Phase 2 (Months 7–18)',
    regulatoryBasis: 'FAA Order JO 7900.9; ASTM F3411 UTM standard',
  },

  currentVsRequired: [
    {
      item:         'Ramp Area (B SOUTH)',
      current:      '18,000 sq ft available',
      vertistop:    'Minor reconfig — $150K',
      vertiport:    'Minor reconfig — $250K',
      vertihub:     'New apron — $1.8M',
    },
    {
      item:         'Electrical Service',
      current:      '0.8 MW available (est.)',
      vertistop:    'No upgrade needed',
      vertiport:    '+0.08 MW distribution line — $180K',
      vertihub:     '+0.5 MW substation upgrade — $1.4M',
    },
    {
      item:         'ARFF Capability',
      current:      'Index A GA unit',
      vertistop:    'No upgrade needed',
      vertiport:    'No upgrade needed',
      vertihub:     'Index B station — $2.1M',
    },
    {
      item:         'UTM Ground Infrastructure',
      current:      'None',
      vertistop:    '$85K',
      vertiport:    '$110K',
      vertihub:     '$140K',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 90-DAY SIMULATION RESULTS
// ─────────────────────────────────────────────────────────────────────────────
export const SIM = {
  methodology: {
    approach: 'Discrete-event simulation using SimPy framework, 90-day window, 200 Monte Carlo runs per scenario.',
    conditions: 'Each run incorporates stochastic arrival variability calibrated to 42J baseline traffic, seasonal demand factors, pad availability, and weather-driven hold events.',
    outputs: 'Throughput rate (% of scheduled ops completed), average turnaround time (TAT), peak queue depth, and system resiliency score.',
    plainLanguage: 'The simulation asks: if eVTOL aircraft start operating at 42J under each of nine demand and infrastructure combinations, how well does the airport cope over a 90-day period? It models realistic variations in weather, passenger demand, charging availability, and equipment reliability to give airport planners a statistically robust answer rather than a single-point estimate.',
  },

  scenarios: {
    'lo-lo':  { title: 'Low Traffic + Vertistop',   throughput: 100.0, avgTat: 22.3, queue: 0.0,  resil: 100.0, gate1: true,  gate2: true,  score: 86, verdict: 'READY',   ci: [83, 89]  },
    'lo-med': { title: 'Low Traffic + Vertiport',   throughput: 100.0, avgTat: 22.4, queue: 0.0,  resil: 100.0, gate1: true,  gate2: true,  score: 88, verdict: 'READY',   ci: [85, 91]  },
    'lo-hi':  { title: 'Low Traffic + Vertihub',    throughput: 100.0, avgTat: 22.4, queue: 0.0,  resil: 100.0, gate1: false, gate2: true,  score: 0,  verdict: 'NOT READY', ci: [0, 0]   },
    'med-lo': { title: 'Medium Traffic + Vertistop',throughput: 100.0, avgTat: 22.4, queue: 0.0,  resil: 100.0, gate1: true,  gate2: true,  score: 89, verdict: 'READY',   ci: [86, 92]  },
    'med-med':{ title: 'Medium Traffic + Vertiport',throughput: 100.0, avgTat: 22.3, queue: 0.0,  resil: 100.0, gate1: true,  gate2: true,  score: 93, verdict: 'OPTIMAL ★',ci: [88.2, 98.2] },
    'med-hi': { title: 'Medium Traffic + Vertihub', throughput: 100.0, avgTat: 22.3, queue: 0.0,  resil: 100.0, gate1: false, gate2: null,  score: 0,  verdict: 'NOT READY', ci: [0, 0]   },
    'hi-lo':  { title: 'High Traffic + Vertistop',  throughput: 78.9,  avgTat: 33.0, queue: 28.6, resil: 100.0, gate1: false, gate2: true,  score: 0,  verdict: 'NOT READY', ci: [0, 0]   },
    'hi-med': { title: 'High Traffic + Vertiport',  throughput: 99.1,  avgTat: 26.0, queue: 19.8, resil: 95.3,  gate1: false, gate2: true,  score: 0,  verdict: 'NOT READY', ci: [0, 0]   },
    'hi-hi':  { title: 'High Traffic + Vertihub',   throughput: 100.0, avgTat: 22.3, queue: 0.0,  resil: 100.0, gate1: false, gate2: null,  score: 55, verdict: 'CONDITIONAL',ci: [48, 62] },
  },

  optimal: {
    key:   'med-med',
    mean:  93.2,
    ci95:  [88.2, 98.2],
    runs:  200,
  },

  // Average TAT by tier and traffic (for bar chart)
  tatByTier: {
    target: 15,
    data: [
      { tier: 'Vertistop', low: 22.3, medium: 22.4, high: 33.0 },
      { tier: 'Vertiport', low: 22.4, medium: 22.3, high: 26.0 },
      { tier: 'Vertihub',  low: 22.4, medium: 22.3, high: 22.3 },
    ],
  },

  // Stress test results (resiliency score by scenario)
  stressTest: {
    threshold: 95,
    results: [
      { scenario: 'T.Low / I.Low',   padFail: 100, gridFail: 100, weatherHold: 100 },
      { scenario: 'T.Low / I.Med',   padFail: 100, gridFail: 100, weatherHold: 100 },
      { scenario: 'T.Low / I.High',  padFail: 100, gridFail: 100, weatherHold: 100 },
      { scenario: 'T.Med / I.Low',   padFail: 100, gridFail: 100, weatherHold: 100 },
      { scenario: 'T.Med / I.Med',   padFail: 100, gridFail: 100, weatherHold: 100 },
      { scenario: 'T.Med / I.High',  padFail:  88, gridFail:  72, weatherHold:  91 },
      { scenario: 'T.High / I.Low',  padFail:  41, gridFail:  38, weatherHold:  55 },
      { scenario: 'T.High / I.Med',  padFail:  77, gridFail:  63, weatherHold:  82 },
      { scenario: 'T.High / I.High', padFail:  95, gridFail:  88, weatherHold:  97 },
    ],
  },

  // Multi-volume analysis (Premium §5.3)
  multiVolume: [
    { volume: 100, tier: 'Vertistop', throughput: 94.2, tat: 24.1, queueDepth: 8.3,  overCapacity: false },
    { volume: 100, tier: 'Vertiport', throughput: 100,  tat: 22.3, queueDepth: 0,    overCapacity: false },
    { volume: 100, tier: 'Vertihub',  throughput: 100,  tat: 22.3, queueDepth: 0,    overCapacity: false },
    { volume: 200, tier: 'Vertistop', throughput: 71.4, tat: 38.2, queueDepth: 42.1, overCapacity: true  },
    { volume: 200, tier: 'Vertiport', throughput: 98.8, tat: 23.6, queueDepth: 4.2,  overCapacity: false },
    { volume: 200, tier: 'Vertihub',  throughput: 100,  tat: 22.4, queueDepth: 0,    overCapacity: false },
    { volume: 500, tier: 'Vertistop', throughput: 42.1, tat: 61.4, queueDepth: 112,  overCapacity: true  },
    { volume: 500, tier: 'Vertiport', throughput: 68.3, tat: 44.8, queueDepth: 68.2, overCapacity: true  },
    { volume: 500, tier: 'Vertihub',  throughput: 96.2, tat: 24.8, queueDepth: 9.1,  overCapacity: false },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// GATE ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────
export const GATES = {
  gate1: {
    title: 'Gate 1 — Safety & Regulatory Compliance',
    description: 'Evaluates ramp geometry, obstacle clearance, and ARFF capability against FAA regulatory thresholds. Failure at any check zeros the scenario score.',
    checks: [
      {
        check:         'EB-105 Ramp Area',
        regulatoryBasis: 'FAA EB-105 §4.2',
        threshold:     'Minimum FATO/TLOF area per pad count',
        value42J:      'B SOUTH: 18,000 sq ft available',
        low:   'CONDITIONAL', lowNote:  '9,419 sq ft required; minor reconfig needed',
        med:   'CONDITIONAL', medNote:  '18,838 sq ft required; 4% shortfall, achievable within footprint',
        high:  'PASS',        highNote: '27,677 sq ft required; 38,000 available',
      },
      {
        check:         'Obstacle Surface Clear',
        regulatoryBasis: 'FAA EB-105 §4.3; FAA AC 150/5300-13B',
        threshold:     'No Part 77 penetrations within approach surface',
        value42J:      'No known obstructions; survey confirmed',
        low:   'PASS', lowNote:  '',
        med:   'PASS', medNote:  '',
        high:  'PASS', highNote: '',
      },
      {
        check:         'ARFF Capability',
        regulatoryBasis: 'FAA AC 150/5210-6D §3.2–§3.4',
        threshold:     'Index A (Vertistop/Vertiport); Index B (Vertihub)',
        value42J:      'Index A single-unit GA ARFF; mutual aid with Clay County Fire',
        low:   'PASS', lowNote:  'Existing capability adequate',
        med:   'PASS', medNote:  'Existing capability adequate',
        high:  'FAIL', highNote: 'Index B station required — not warranted at this volume',
      },
      {
        check:         'System Resiliency',
        regulatoryBasis: 'FAA Advisory Circular 150/5325-4B; AAM Readiness System resiliency framework',
        threshold:     '≥95% resiliency score under stress conditions',
        value42J:      'Varies by scenario (see simulation results)',
        low:   'PASS',        lowNote:  '100% across all low-traffic scenarios',
        med:   'PASS',        medNote:  '100% for Vertistop/Vertiport; Vertihub not evaluated',
        high:  'CONDITIONAL', highNote: '95.3% for Vertiport; 100% for Vertistop — borderline',
      },
    ],
  },

  gate2: {
    title: 'Gate 2 — Power & Grid Resiliency',
    description: 'Evaluates peak electrical demand against available grid capacity and thermal safety requirements. Must pass independently of Gate 1.',
    checks: [
      {
        check:         'Grid Capacity Sufficient',
        regulatoryBasis: 'NFPA 855 §9.4; FAA EB-105 Appendix E',
        threshold:     'Peak demand < available grid headroom',
        value42J:      '0.8 MW available (estimated — utility verification recommended)',
        low:   'PASS', lowNote:  '0.23 MW demand vs 0.8 MW available',
        med:   'PASS', medNote:  '0.51 MW demand vs 0.8 MW available',
        high:  'FAIL', highNote: '1.14 MW demand exceeds 0.8 MW grid headroom',
      },
      {
        check:         'Thermal Management',
        regulatoryBasis: 'NFPA 855 §12.5; UL 9540A cell-level test standard',
        threshold:     'Thermal runaway containment system required for battery arrays >20 kWh',
        value42J:      'Site-level HVAC and containment plan required at construction',
        low:   'PASS', lowNote:  'Standard suppression system adequate',
        med:   'PASS', medNote:  'Standard suppression system adequate',
        high:  'PASS', highNote: 'Enhanced suppression system required — includable in CAPEX',
      },
      {
        check:         'Peak Winter Demand',
        regulatoryBasis: 'FAA EB-105 Appendix E seasonal load analysis',
        threshold:     'Peak simultaneous charging demand within rated capacity',
        value42J:      'Seasonal demand modelled across 90-day simulation window',
        low:   'PASS', lowNote:  '',
        med:   'PASS', medNote:  '',
        high:  'FAIL', highNote: 'Exceeds rated capacity under peak winter simultaneous charging',
      },
    ],
  },

  efficiencyScore: {
    final: 93.2,
    ci95:  [88.2, 98.2],
    components: [
      { label: 'Throughput & TAT',    score: 95.1 },
      { label: 'Airspace Integration', score: 91.3 },
      { label: 'Demand Capture',       score: 85.7 },
    ],
    weightNote: 'Component weights are proprietary to the AAM Readiness System scoring methodology and are not disclosed in customer-facing reports.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// RECOMMENDATIONS & IMPLEMENTATION
// ─────────────────────────────────────────────────────────────────────────────
export const RECS = {
  optimalConfig: [
    { parameter: 'Infrastructure Tier',        spec: 'Vertiport',           basis: 'Highest-scoring scenario passing both safety and power gates' },
    { parameter: 'Landing Pads (FATO/TLOF)',   spec: '4',                   basis: 'FAA EB-105 §4.2 compliant with minor ramp reconfiguration' },
    { parameter: 'Charging Gates',             spec: '4 × 150 kW (600 kW total)', basis: 'AAM Readiness System infrastructure engine' },
    { parameter: 'Power Upgrade Required',     spec: '+0.08 MW',            basis: 'Distribution line from airport substation' },
    { parameter: 'Primary Location',           spec: 'B SOUTH / A2 Ramp',   basis: 'Highest existing ramp utilisation at 42J' },
    { parameter: 'Estimated CAPEX',            spec: '$4.1M – $5.4M (36 mo)', basis: 'Excludes grid upgrade ~$1.4M additional' },
    { parameter: 'Traffic Volume',             spec: '24 ops/day',          basis: 'Medium eVTOL Traffic, P50 adoption scenario' },
    { parameter: 'Annual Passengers (Year 3)', spec: '131,400',             basis: 'At 75% load factor, 4-seat eVTOL fleet' },
  ],

  phases: [
    {
      num: 1, title: 'Ramp & Assessment', months: 'Months 0–6', capex: '$0.3M',
      color: '#003A70',
      deliverables: [
        'B SOUTH ramp reconfiguration — EB-105 §4.2 compliance',
        'ALP amendment submission to FAA Airports Division',
        'Utility verification with Clay County Electric Cooperative',
        'CATEX environmental review initiation',
        'Grid assessment and interconnection study',
      ],
      responsible: { airport: true, faa: true, utility: true, contractor: false },
      decisionGate: 'Utility confirmation of 0.8 MW headroom; ALP pre-application meeting with FAA',
    },
    {
      num: 2, title: 'Grid & Infrastructure', months: 'Months 7–18', capex: '$3.2M',
      color: '#0057A8',
      deliverables: [
        '+0.3 MW grid distribution line installation',
        '4 × 150 kW DC fast charger procurement and installation',
        'FATO/TLOF surface construction and marking',
        'UTM ground infrastructure (ADS-B receiver, datalink)',
        'FAA Part 139 certification amendment (if applicable)',
      ],
      responsible: { airport: true, faa: true, utility: true, contractor: true },
      decisionGate: 'Successful CATEX approval; charger procurement lead-time confirmation',
    },
    {
      num: 3, title: 'Operations & Scale', months: 'Months 19–36', capex: '$1.0M',
      color: '#1B7A3E',
      deliverables: [
        'Full Vertiport operations launch',
        'LOA with USS provider for UTM airspace coordination',
        'Operator agreements with initial eVTOL carriers',
        'Jacksonville SW Corridor service launch',
        'Annual re-assessment and performance benchmarking',
      ],
      responsible: { airport: true, faa: false, utility: false, contractor: false },
      decisionGate: 'Minimum 2 eVTOL operator LOIs; FAA UTM Letter of Agreement',
    },
  ],

  capex: [
    { item: 'Ramp reconfiguration',      cost: 0.35, unitBasis: 'RS Means Site Work §02 00 00; $18/sq ft ramp work' },
    { item: 'Grid upgrade',              cost: 1.05, unitBasis: 'RS Means Electrical §26 00 00; $3,500/kW distribution' },
    { item: 'Charging infrastructure',   cost: 1.20, unitBasis: '$300K/charger × 4 units (DC fast charger, installed)' },
    { item: 'FATO/TLOF construction',    cost: 1.80, unitBasis: 'RS Means Site Work; $450/sq ft specialty aviation surface' },
    { item: 'Passenger amenities',       cost: 0.60, unitBasis: 'Lounge, signage, access control — national average' },
    { item: 'Contingency (15%)',         cost: 0.75, unitBasis: 'Standard FAA project contingency' },
  ],

  revenueAssumptions: [
    { metric: 'Landing Fee',          value: '$18/op',           basis: 'eVTOL market rate survey 2025' },
    { metric: 'Charging Revenue',     value: '$0.28/kWh',        basis: 'Commercial EV charging benchmark' },
    { metric: 'Load Factor',          value: '75%',              basis: 'Medium-demand scenario assumption' },
    { metric: 'Fleet Size (Year 3)',   value: '6 aircraft/day',   basis: 'Medium traffic tier projection' },
    { metric: 'Seats per Aircraft',    value: '4',                basis: 'Current eVTOL fleet average' },
    { metric: 'Avg Fare (blended)',    value: '$92/pax',          basis: 'Corridor-weighted demand model output' },
  ],

  // 10-year financial projection (Medium traffic, $M annual)
  financialProjection: {
    years:    [1,   2,   3,   4,   5,   6,   7,   8,   9,   10  ],
    revBase:  [0.5, 1.1, 2.1, 2.6, 2.9, 3.1, 3.2, 3.3, 3.4, 3.5],
    revConserv:[0.3,0.7, 1.5, 1.9, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8],
    revOptim: [0.7, 1.6, 2.8, 3.4, 3.8, 4.1, 4.3, 4.5, 4.6, 4.8],
    opCosts:  [0.8, 0.9, 1.0, 1.0, 1.1, 1.1, 1.2, 1.2, 1.3, 1.3],
    // Low and high traffic for Premium side-by-side view
    revLow:   [0.2, 0.4, 0.7, 0.9, 1.0, 1.1, 1.2, 1.2, 1.3, 1.3],
    revHigh:  [1.1, 2.4, 4.4, 5.6, 6.4, 6.9, 7.3, 7.6, 7.8, 8.0],
  },

  federalFunding: [
    {
      program:     'RAISE',
      agency:      'USDOT',
      awardRange:  '$5M – $25M',
      eligibility: 'Confirmed',
      matching:    '20% local match required',
      appWindow:   'Annual — typically January deadline',
      keyContact:  'USDOT RAISE Program Office: raise@dot.gov',
      docReqs:     'Needs assessment narrative, BCA summary, equity analysis, site control documentation',
      fromReport:  'Section 3.2 route demand analysis + Section 7.1 configuration specification + Section 7.3 revenue projections',
    },
    {
      program:     'AIP Supplemental',
      agency:      'FAA',
      awardRange:  '$100K – $5M',
      eligibility: 'Confirmed',
      matching:    '10% local match (public airport)',
      appWindow:   'Rolling — submit with ALP amendment',
      keyContact:  'FAA Orlando Airports District Office: (407) 812-6331',
      docReqs:     'ALP amendment, environmental review, benefit analysis, sponsor assurances',
      fromReport:  'Section 4.1 EB-105 compliance + Section 7.2 phased roadmap',
    },
    {
      program:     'SCASDP',
      agency:      'USDOT',
      awardRange:  '$100K – $1M',
      eligibility: 'Eligible',
      matching:    '25% local match',
      appWindow:   'Annual — typically March deadline',
      keyContact:  'USDOT OST Small Community Air Service: (202) 366-4000',
      docReqs:     'Air service development plan, demand analysis, community support letters',
      fromReport:  'Section 3.3 traffic projections + Section 1 executive summary',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// REGULATORY PATHWAY
// ─────────────────────────────────────────────────────────────────────────────
export const REGULATORY = {
  alp: {
    title:       'Airport Layout Plan (ALP) Amendment',
    citation:    'FAA AC 150/5070-6B; FAA Order 5100.38D',
    description: 'The proposed Vertiport requires an ALP amendment to reflect the new FATO/TLOF configuration, revised ramp layout, and updated building area plan.',
    actions: [
      'Contact FAA Orlando ADO for pre-application meeting (Form 7460-1)',
      'Submit ALP amendment package including updated drawing set',
      'Complete FAA Form 5100-100 (AIP Application) if funding requested',
      'Estimated review timeline: 90–180 days',
    ],
    filingFee: 'No fee — federal sponsor',
    estimatedReview: '90–180 days',
  },
  nepa: {
    title:       'NEPA / Categorical Exclusion (CATEX)',
    citation:    'FAA Order 1050.1F; 40 CFR Part 1508',
    description: 'The proposed improvements are expected to qualify for a Categorical Exclusion under FAA Order 1050.1F §5-6.5g (minor airport development not involving new runways).',
    actions: [
      'Prepare CATEX checklist per FAA Order 1050.1F Appendix B',
      'Submit through FAA Airports GIS for environmental review',
      'Coordinate with Florida DEP for stormwater review',
      'Estimated review timeline: 30–90 days',
    ],
    filingFee: 'None for CATEX',
    estimatedReview: '30–90 days',
  },
  part139: {
    title:       'Part 139 Certification Amendment',
    citation:    '14 CFR Part 139; FAA AC 150/5210-22',
    description: 'Scheduled eVTOL operations at 42J will require Part 139 certification. Current GA airport status does not require 139 certification unless scheduled service is initiated.',
    actions: [
      'Determine applicability threshold based on aircraft MTOW and passenger count',
      'Submit Form 8240-1 (Application for Airport Operating Certificate)',
      'Develop Airport Certification Manual (ACM) addendum for eVTOL operations',
      'Estimated review timeline: 6–12 months',
    ],
    filingFee: 'No fee',
    estimatedReview: '6–12 months',
  },
  utm: {
    title:       'UTM Integration & LOA',
    citation:    'FAA Order JO 7900.9; ASTM F3411; FAA BEYOND Program',
    description: 'eVTOL operations require integration with a FAA-approved UTM USS provider and a Letter of Agreement with the local TRACON (Jacksonville ARTCC).',
    actions: [
      'Select FAA-approved USS provider (ANRA, AirMap, or equivalent)',
      'Execute USS service agreement and data sharing protocol',
      'Submit LOA application to Jacksonville ARTCC (ZJX)',
      'Estimated processing: 90–180 days post-infrastructure completion',
    ],
    filingFee: 'USS subscription cost: ~$8K–$15K/year',
    estimatedReview: '90–180 days',
  },

  // Regulatory Gantt aligned to Phase 1–3
  gantt: [
    { task: 'ALP Pre-Application Meeting',        phase: 1, startMo: 1,  endMo: 2  },
    { task: 'CATEX Environmental Review',         phase: 1, startMo: 2,  endMo: 5  },
    { task: 'ALP Amendment Submission',           phase: 1, startMo: 3,  endMo: 6  },
    { task: 'Utility Interconnection Study',      phase: 1, startMo: 2,  endMo: 4  },
    { task: 'AIP Supplemental Application',       phase: 2, startMo: 6,  endMo: 9  },
    { task: 'RAISE Grant Application',            phase: 2, startMo: 8,  endMo: 10 },
    { task: 'Part 139 Application (if required)', phase: 2, startMo: 10, endMo: 18 },
    { task: 'USS Provider Agreement',             phase: 3, startMo: 16, endMo: 19 },
    { task: 'UTM LOA — Jacksonville ARTCC',       phase: 3, startMo: 18, endMo: 24 },
    { task: 'Operator LOI / Service Agreements',  phase: 3, startMo: 20, endMo: 28 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA SOURCES (Appendix A)
// ─────────────────────────────────────────────────────────────────────────────
export const DATA_SOURCES = [
  { source: 'Virtower Operations Data',      date: 'May 2024–March 2026', method: 'ADS-B passive collection',        status: 'VERIFIED',  impact: 'Simulation baseline calibration' },
  { source: 'Grid Capacity (0.8 MW)',        date: '2026-04-14',          method: 'Airport class estimate',           status: 'ESTIMATED', impact: 'Gate 2 power check — CRITICAL, utility verification required' },
  { source: 'Population Data',              date: '2020',                method: 'US Census Bureau decennial count', status: 'VERIFIED',  impact: 'Demand model population inputs' },
  { source: 'Commute Flow Data',            date: '2021 (latest available)', method: 'LEHD LODES8 Origin-Destination', status: 'CACHED', impact: 'Route demand estimates' },
  { source: 'Value of Time Coefficients',   date: '2024',                method: 'USDOT Revised Departmental Guidance', status: 'VERIFIED', impact: 'Logit model calibration' },
  { source: 'FAA Regulatory Standards',     date: '2026-04-14',          method: 'Proprietary rules engine — current', status: 'CURRENT', impact: 'All scoring thresholds and gate checks' },
  { source: 'Weather Pattern',             date: 'Rolling 5-year',      method: 'NOAA ASOS — regional average',     status: 'LIVE API',  impact: 'Simulation weather hold frequency' },
  { source: 'Infrastructure Cost Indices',  date: '2025 Q4',             method: 'RS Means Construction Cost Data',  status: 'VERIFIED',  impact: 'CAPEX estimates in Section 7' },
];

// ─────────────────────────────────────────────────────────────────────────────
// COVER / SUMMARY STATS
// ─────────────────────────────────────────────────────────────────────────────
export const SUMMARY = {
  score:           93,
  scoreCI:         '95% CI: 88.2 — 98.2',
  verdict:         'OPTIMAL',
  optimalConfig:   'Vertiport + Medium eVTOL Traffic',
  scenariosPassing: 5,
  scenariosTotal:  9,

  confidence: {
    preliminary: { level: 'AMBER', pct: 72, label: 'Some Inputs Estimated', verifyNote: 'Utility bill verification recommended before grant submission.' },
    standard:    { level: 'AMBER', pct: 72, label: 'Some Inputs Estimated', verifyNote: 'Utility bill verification recommended before grant submission.' },
    premium:     { level: 'GREEN', pct: 91, label: 'Primary Inputs Verified', verifyNote: 'Utility data verified. DER review recommended before ALP submission.' },
  },

  keyStats: [
    { val: '50,236', lbl: 'Baseline Operations' },
    { val: '2,953',  lbl: 'Military VTOL Ops' },
    { val: '74',     lbl: 'Avg Daily Ops' },
    { val: '5/9',    lbl: 'Scenarios Passing' },
    { val: '337',    lbl: 'Peak Day Ops' },
  ],

  keyFindings: [
    'Military VTOL Integration Precedent Established: 2,953 military helicopter operations during the assessment period — approximately 78% of comparable general aviation facilities in the peer reference group.',
    'Optimal Configuration — Vertiport + Medium eVTOL Traffic: A Vertiport (4 landing pads) achieves a Readiness Index of 93/100 with 100% throughput efficiency and zero queue events across the 90-day simulation.',
    'Grid Upgrade Required — Primary Capital Barrier: The primary capital investment is a +0.3 MW grid distribution line upgrade estimated at $1.05M. Utility verification is recommended before federal grant submission.',
    'Finding 4 — Jacksonville SW Corridor: Demand modelling identifies Jacksonville SW Corridor as the highest-value eVTOL corridor from 42J. This market alone supports the medium-tier adoption projection at maturity.',
    'Finding 5 — Vertihub Not Ready: All 8-pad Vertihub scenarios fail Gate 1 due to ARFF requirements exceeding current capability. This protects 42J from a $10M+ premature over-build.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// NPV ANALYSIS (Premium §7.3)
// ─────────────────────────────────────────────────────────────────────────────
export const NPV = {
  totalCapexMid:  5.08,   // midpoint of $4.1–$5.4M + $1.4M grid = ~$5.75M total
  bcaThreshold:   1.0,    // USDOT RAISE minimum B/C ratio
  scenarios: [
    {
      label: 'Low Traffic',
      discountRates: [
        { rate: '5%',  npv: '$8.1M',  bcr: '1.8:1' },
        { rate: '7%',  npv: '$5.9M',  bcr: '1.3:1' },
        { rate: '10%', npv: '$3.2M',  bcr: '0.9:1' },
      ],
    },
    {
      label: 'Medium Traffic (Base)',
      discountRates: [
        { rate: '5%',  npv: '$24.6M', bcr: '4.3:1' },
        { rate: '7%',  npv: '$18.4M', bcr: '3.2:1' },
        { rate: '10%', npv: '$11.8M', bcr: '2.1:1' },
      ],
    },
    {
      label: 'High Traffic',
      discountRates: [
        { rate: '5%',  npv: '$51.2M', bcr: '8.9:1' },
        { rate: '7%',  npv: '$38.7M', bcr: '6.7:1' },
        { rate: '10%', npv: '$24.3M', bcr: '4.2:1' },
      ],
    },
  ],
  note: 'NPV of economic benefits includes time savings (USDOT VoT $21.10/hr), regional connectivity, and employment generation. Total investment basis: $5.75M (CAPEX + grid upgrade). USDOT RAISE minimum B/C threshold: 1.0:1 at 7% discount rate.',
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT DIRECTORY (Premium §8 — Regulatory Pathway)
// ─────────────────────────────────────────────────────────────────────────────
export const CONTACTS = [
  {
    agency:   'FAA Orlando Airports District Office (ADO)',
    role:     'ALP amendment, AIP funding, CATEX coordination',
    phone:    '(407) 812-6331',
    address:  '5950 Hazeltine National Dr, Suite 400, Orlando, FL 32822',
    note:     'First contact for ALP pre-application meeting. Schedule within 30 days of project authorisation.',
  },
  {
    agency:   'Jacksonville ARTCC (ZJX) — UTM LOA',
    role:     'UTM Letter of Agreement, airspace coordination',
    phone:    '(904) 741-7670',
    address:  '6002 Heckscher Dr, Jacksonville, FL 32226',
    note:     'Contact after USS provider agreement is executed. Allow 90–180 days for LOA processing.',
  },
  {
    agency:   'USDOT RAISE Program Office',
    role:     'RAISE grant application and eligibility determination',
    email:    'raise@dot.gov',
    phone:    '(202) 366-4000',
    note:     'Confirm annual application deadline (typically January). Grant language in Appendix D is ready for use.',
  },
  {
    agency:   'Clay County Electric Cooperative',
    role:     'Utility verification — grid headroom confirmation',
    phone:    '(904) 284-3319',
    address:  'PO Box 308, Green Cove Springs, FL 32043',
    note:     'Request written confirmation of 0.8 MW available headroom before ALP filing or grant submission.',
  },
  {
    agency:   'USARC — Camp Blanding JTC (LOA Renewal)',
    role:     'Military LOA management, Camp Blanding coordination',
    address:  '5629 State Road 16, Starke, FL 32091',
    note:     'Current LOA active — renewed 2024. Contact for UTM airspace deconfliction protocol.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CORRIDOR RATIONALE (Premium §3.2 — detailed per-corridor analysis)
// ─────────────────────────────────────────────────────────────────────────────
export const CORRIDOR_RATIONALE = {
  'Jacksonville SW Corridor': {
    status: 'PRIMARY DEMAND DRIVER',
    tripPurposes: 'Work commute (primary), medical access (secondary)',
    employmentAnchors: 'Jacksonville financial district, Mayo Clinic Jacksonville, Baptist Health, Amazon fulfillment centers (I-295 corridor)',
    modeShiftRationale: 'Congestion index of 8.4/10 on the I-295 corridor creates strong willingness to pay for time savings. The 21-minute time advantage at a $104 fare is competitive with ride-share on this corridor. Mode shift of 1.9% is conservative — higher adoption likely as fleet matures and fares decrease.',
    peakWindow: 'AM commute (7–9am), PM return (4–6pm)',
    growthNote: 'Jacksonville MSA added 28,000 jobs in 2024 (LEHD). This corridor has the highest structural demand growth of any 42J route.',
  },
  'Orange Park / Fleming Island': {
    status: 'SECONDARY',
    tripPurposes: 'Work commute to Jacksonville metro',
    employmentAnchors: 'NavalStation Mayport (civilian workers), St. Vincent\'s Medical Center Riverside, Oakleaf Town Center commercial district',
    modeShiftRationale: '9-minute time savings at $104 fare is marginally compelling. Lower congestion (index 5.2) reduces pain-point intensity vs. the primary corridor. Mode shift of 0.53% reflects fare sensitivity of bedroom-community commuters.',
    peakWindow: 'AM/PM commute; weekend shopping (Oakleaf)',
    growthNote: 'Clay County population growth (+4.2% since 2020) will improve this corridor\'s demand outlook at maturity.',
  },
  'Gainesville': {
    status: 'SECONDARY',
    tripPurposes: 'Academic / medical (dominant), tourism and weekend travel (secondary)',
    employmentAnchors: 'University of Florida (enrolls 56,000+ students), UF Health Shands Hospital, UF Innovation Square tech corridor, Alachua County government',
    modeShiftRationale: 'Despite a -1 minute time differential (eVTOL is marginally slower due to ground access time), mode shift is 2.2% — driven by convenience, parking elimination ($12–18/day at UF), and the comfort premium of air travel for the academic/medical demographic. The UF community has high VoT.',
    peakWindow: 'Academic calendar peaks (August, January); UF Football Saturdays; medical appointment weekdays',
    growthNote: 'UF Health is the fastest-growing employer in the corridor. Direct routing eliminates SR-26 construction delays.',
  },
  'Lake City': {
    status: 'SECONDARY',
    tripPurposes: 'Work, medical access (Lake City VA Medical Center)',
    employmentAnchors: 'Columbia County government, Lake City Medical Center, North Florida Regional Airport (general aviation hub)',
    modeShiftRationale: '10-minute time savings, but small population (13,477) limits total addressable demand. Mode shift of 0.42% reflects limited commute flow volume — few people travel this corridor daily.',
    peakWindow: 'Weekday medical appointments; weekend leisure',
    growthNote: 'Limited growth potential without major economic development in Columbia County.',
  },
  'Palatka': {
    status: 'SECONDARY',
    tripPurposes: 'Work, tourism (St. Johns River)',
    employmentAnchors: 'Putnam County government, Palatka Paper Mill (Georgia-Pacific), St. Johns River corridor tourism',
    modeShiftRationale: '7-minute time savings at $65 fare. Mode shift of 0.23% reflects the high fare-to-income ratio for Putnam County ($42,500 median HHI) and limited commute flow volume.',
    peakWindow: 'Weekday work; spring/fall tourism season',
    growthNote: 'Tourism growth could improve this corridor\'s weekend demand.',
  },
  'Starke': {
    status: 'SECONDARY',
    tripPurposes: 'Work, essential services',
    employmentAnchors: 'Federal Correctional Complex Jesup (nearby), Bradford County government, Florida State Prison (correctional staff commute)',
    modeShiftRationale: '11-minute time savings but very small population (5,598) and low median income ($38,200). Fare burden analysis: $55 fare represents 0.14% of monthly median income — marginal. Mode shift of 0.13%.',
    peakWindow: 'Weekday correctional staff shifts',
    growthNote: 'Limited growth potential. Essential services corridor — equity access value exceeds commercial revenue.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// REGULATORY RISK ASSESSMENT (Premium §8)
// ─────────────────────────────────────────────────────────────────────────────
export const REG_RISKS = [
  {
    action:     'ALP Amendment',
    risk:       'LOW',
    keyRisk:    'FAA ADO review timeline (90–180 days) may compress Phase 2 grant application window',
    mitigation: 'Schedule pre-application meeting within 30 days of project authorisation. Submit draft ALP drawings at same time as grant application — FAA accepts concurrent review.',
  },
  {
    action:     'NEPA / CATEX',
    risk:       'LOW',
    keyRisk:    'Extraordinary circumstances review (if triggered) could extend to full EA',
    mitigation: 'Confirm no listed species or wetlands within project footprint before submission. Pre-coordinate with Florida DEP for stormwater exemption letter.',
  },
  {
    action:     'Part 139 Amendment',
    risk:       'MEDIUM',
    keyRisk:    'Applicability determination may require legal review — threshold depends on eVTOL MTOW and scheduled service definition',
    mitigation: 'Request pre-determination meeting with FAA ADO (Orlando) before infrastructure is built. A negative determination (Part 139 not required) is possible at Vertistop/Vertiport scale.',
  },
  {
    action:     'UTM LOA — Jacksonville ARTCC',
    risk:       'MEDIUM',
    keyRisk:    'ZJX coordination requirements and Camp Blanding deconfliction protocol may add conditions to LOA',
    mitigation: 'Engage Camp Blanding JTC Military Airspace Coordinator early (Phase 2) to develop joint deconfliction protocol. This proactive step typically reduces ZJX review time.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GRANT LANGUAGE PACK (Appendix D — Premium only)
// ─────────────────────────────────────────────────────────────────────────────
export const GRANT_PACK = {
  bcaSummary: `Keystone Heights Airport (42J) demonstrates a positive benefit-cost ratio for the proposed Vertiport development under all three traffic scenarios modelled. At the medium (base) adoption tier, annual passenger throughput reaches 131,400 by Year 3 with revenue potential of $2.1M–$3.8M annually. The 10-year NPV of economic benefits, including time savings, regional connectivity, and employment generation, is estimated at $18.4M–$24.6M against a total capital investment of $5.75M. The benefit-cost ratio at a 7% discount rate is 3.2:1 (base case), well above the USDOT RAISE threshold of 1.0:1. This assessment is supported by 90-day Monte Carlo simulation results and demand modelling calibrated to US Census 2020 and LEHD 2021 origin-destination data.`,

  needsAssessment: `Clay County, Florida lacks reliable ground transportation connections to the Jacksonville metropolitan area (population 971,319), creating a documented commute burden for residents and a barrier to economic development. Current transit options require 68-minute highway drives that are subject to I-295 congestion. The proposed eVTOL Vertiport at 42J directly addresses this connectivity gap by providing a 47-minute air transit alternative at a projected fare of $104 per trip — competitive with ride-share costs on the corridor. The facility is site-ready: FAA EB-105 compliance is achievable within the existing B SOUTH ramp footprint, grid capacity is sufficient at the Vertiport tier, and military helicopter operations at 42J demonstrate prior VTOL operational precedent under FAA oversight.`,

  equityAnalysis: `The proposed Vertiport serves a rural county (Clay County, Florida) with a poverty rate of 9.8% (US Census 2020) and limited access to metropolitan employment centres and medical facilities. 42J is within 15 miles of two federally designated rural communities. At the low-adoption tier, the service remains financially viable and provides access to Jacksonville-area employment, UF Health medical facilities in Gainesville, and regional educational institutions. Fare modelling at $78–$118 per trip is consistent with FTA low-income transportation cost burden guidelines at median household income levels for Clay County ($68,400). The airport sponsor commits to a community benefit agreement establishing reduced-fare access for qualifying passengers, subject to operator agreement.`,
};
