import { Document, Page, View, Text } from '@react-pdf/renderer';
import { S, C } from './styles';
import { SCENARIOS } from '../data/scenarios';
import PageHeader from './PageHeader';
import CoverPage from './CoverPage';

const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const CONFIG_ITEMS = [
  { val: '4',      lbl: 'Landing Pads (FATO/TLOF)' },
  { val: '4',      lbl: 'DC Fast Chargers (150kW ea.)' },
  { val: '$6.0M',  lbl: 'Est. Vertiport CAPEX', note: '+$1.4M grid upgrade' },
  { val: '36 mo',  lbl: 'Phased Timeline' },
  { val: '26,280', lbl: 'Annual Passengers (projected)' },
  { val: '24',     lbl: 'Daily eVTOL Ops at maturity' },
];
const PHASES = [
  { num: 1, title: 'Site Prep',       months: 'Months 1–6',   capex: '$250–400K', color: C.accent,
    items: ['B SOUTH ramp reconfiguration', 'Helipad → 2-pad FATO/TLOF', 'EB-105 compliance work', 'Grid assessment'] },
  { num: 2, title: 'Infrastructure',  months: 'Months 7–18',  capex: '$2.8–3.5M', color: C.blue,
    items: ['+0.3MW grid distribution line', '4 × 150kW DC fast chargers', 'UTM ground infrastructure'] },
  { num: 3, title: 'Full Operations', months: 'Months 19–36', capex: '$1.0–1.5M', color: C.green,
    items: ['Full Vertiport operations', 'Scale to medium traffic tier', 'Jacksonville corridor launch', 'Annual re-assessment'] },
];
const ROUTES = [
  { dest: 'Jacksonville SW Corridor', primary: true, dist: '47 mi', time: '47 min', fare: '$144', vs: '+21 min saved', saved: true,  daily: '26' },
  { dest: 'Orange Park / Fleming Island',             dist: '34 mi', time: '42 min', fare: '$104', vs: '+9 min saved',  saved: true,  daily: '14' },
  { dest: 'Lake City',   dist: '39 mi', time: '44 min', fare: '$118', vs: '+10 min saved',  saved: true,  daily: '4'  },
  { dest: 'Gainesville', dist: '25 mi', time: '39 min', fare: '$78',  vs: '-1 min (cost)',  saved: false, daily: '18' },
  { dest: 'Palatka',     dist: '21 mi', time: '38 min', fare: '$65',  vs: '-7 min (cost)',  saved: false, daily: '1'  },
  { dest: 'Starke',      dist: '18 mi', time: '37 min', fare: '$55',  vs: '-11 min (cost)', saved: false, daily: '1'  },
];
const RESOURCE_ROWS = [
  ['Infrastructure Tier',      'Vertistop',          'Vertiport ★',        'Vertihub'],
  ['Landing Pads (FATO/TLOF)', '2',                  '4',                  '8'],
  ['DC Fast Chargers',         '2',                  '4',                  '8'],
  ['Peak Power Draw',          '194 kW',             '387 kW',             '774 kW'],
  ['Grid Available at 42J',    '800 kW  PASS',       '800 kW  PASS',       '800 kW  WARN'],
  ['ARFF Requirement',         'Existing GA  PASS',  'Existing GA  PASS',  'Dedicated  FAIL'],
  ['Ramp Geometry (EB-105)',   'Minor reconfig',     'Minor reconfig',     'New apron needed'],
  ['Daily eVTOL Ops',          '42 ops/day',         '128 ops/day',        '288 ops/day'],
  ['Annual Passengers',        '24,528',             '131,400',            '327,680'],
  ['Market Adoption Rate',     '0.8%',               '2.5%',               '5.8%'],
  ['Est. Implementation Cost', '~$2.5–3.5M',         '$4.1–5.4M',          'Not viable at 42J'],
  ['42J Gate Status',          'Passes all gates',   'Passes all gates',   'Fails Gate 1'],
];
const MATRIX_ROWS = [
  ['Low eVTOL',    ['lo-lo',  'lo-med',  'lo-hi']],
  ['Medium eVTOL', ['med-lo', 'med-med', 'med-hi']],
  ['High eVTOL',   ['hi-lo',  'hi-med',  'hi-hi']],
];

function verdictShort(v) {
  if (v.includes('OPTIMAL')) return 'OPTIMAL';
  return v;
}
function cellBg(key) {
  const v = SCENARIOS[key].verdict;
  if (v.includes('OPTIMAL')) return S.cellGreen;
  if (v === 'READY')         return S.cellTeal;
  return S.cellRed;
}
function cellColor(key) {
  const v = SCENARIOS[key].verdict;
  if (v.includes('OPTIMAL')) return S.greenTxt;
  if (v === 'READY')         return S.tealTxt;
  return S.redTxt;
}
function badgeStyle(v) {
  if (v.includes('OPTIMAL')) return [S.scenarioBadge, { backgroundColor: C.greenBg, color: C.greenTxt }];
  if (v === 'READY')         return [S.scenarioBadge, { backgroundColor: C.tealBg,  color: C.tealTxt  }];
  return [S.scenarioBadge, { backgroundColor: C.redBg, color: C.redTxt }];
}

const Footer = () => (
  <View style={S.pageFooter} fixed>
    <Text style={S.footerTxt}>AAM Readiness Assessment · Keystone Heights Airport (42J)</Text>
    <Text
      style={S.footerTxt}
      render={({ pageNumber, totalPages }) => `${today} · Premium Report · Page ${pageNumber} of ${totalPages}`}
    />
  </View>
);

export default function PremiumReport() {
  return (
    <Document title="AAM Readiness — Premium Report" author="AAMReadiness">

      {/* ── PAGE 1: Cover ── */}
      <CoverPage tier="PREMIUM REPORT" />

      {/* ── PAGE 2: Recommended Config + Phased Roadmap ── */}
      <Page size="LETTER" style={S.page}>
        <PageHeader section="Recommended Configuration" />
        <View style={S.body}>

          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>Recommended Path</Text>
            <Text style={S.h2}>Optimal Configuration — Medium Traffic + Vertiport</Text>
            <Text style={S.sub}>Vertiport · B SOUTH / A2 Ramp · Phased over 36 months · Score 93/100</Text>
            <View style={S.configGrid} wrap={false}>
              {CONFIG_ITEMS.map((item, i) => (
                <View key={i} style={S.configItem}>
                  <Text style={S.configVal}>{item.val}</Text>
                  <Text style={S.configLbl}>{item.lbl}</Text>
                  {item.note && <Text style={S.configNote}>{item.note}</Text>}
                </View>
              ))}
            </View>
          </View>

          <View style={S.divider} />

          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>Implementation</Text>
            <Text style={S.h2}>Phased Deployment Roadmap</Text>
            <Text style={S.sub}>Total investment: $4.1–5.4M across 36 months</Text>
            <View style={S.timeline} wrap={false}>
              {PHASES.map((p) => (
                <View key={p.num} style={S.phase}>
                  <View style={[S.phaseDot, { backgroundColor: p.color }]}>
                    <Text style={S.phaseDotTxt}>{p.num}</Text>
                  </View>
                  <Text style={S.phaseTitle}>{p.title}</Text>
                  <Text style={S.phaseMonths}>{p.months}</Text>
                  {p.items.map((item, i) => <Text key={i} style={S.phaseItem}>{item}</Text>)}
                  <Text style={S.phaseCapex}>{p.capex}</Text>
                </View>
              ))}
            </View>
          </View>

        </View>
        <Footer page={2} />
      </Page>

      {/* ── PAGE 3: Scenario Matrix + Gate Assessment ── */}
      <Page size="LETTER" style={S.page}>
        <PageHeader section="9-Scenario Simulation Results" />
        <View style={S.body}>

          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>Scenario Analysis</Text>
            <Text style={S.h2}>9-Scenario Results Matrix</Text>
            <Text style={S.sub}>3 traffic tiers × 3 infrastructure tiers — 90-day Monte Carlo simulation</Text>

            {/* Column headers */}
            <View style={[S.matrixColRow]}>
              {['Vertistop (Low)', 'Vertiport (Med)', 'Vertihub (High)'].map((h, i) => (
                <View key={i} style={[S.matrixColHdr, { flex: 1 }]}>
                  <Text style={S.matrixColHdrTxt}>{h}</Text>
                </View>
              ))}
            </View>

            {MATRIX_ROWS.map(([lbl, keys]) => (
              <View key={lbl} style={S.matrixRow}>
                <View style={S.matrixRowLbl}>
                  <Text style={S.matrixRowLblTxt}>{lbl}</Text>
                </View>
                {keys.map((key) => (
                  <View key={key} style={[S.matrixCell, cellBg(key)]}>
                    <Text style={[S.matrixCellTxt, cellColor(key)]}>{verdictShort(SCENARIOS[key].verdict)}</Text>
                    {SCENARIOS[key].metrics[0]?.val !== '0' && (
                      <Text style={[S.matrixCellSub, cellColor(key)]}>{SCENARIOS[key].metrics[0]?.val}</Text>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={S.divider} />

          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>Safety & Power Readiness</Text>
            <Text style={S.h2}>Gate Assessment</Text>
            <Text style={S.sub}>Two mandatory pass/fail thresholds — failure at either gate scores zero</Text>

            <View style={[S.card, S.cardGreen]} wrap={false}>
              <View style={S.gateRow}>
                <Text style={[S.gateBadge, S.gatePass]}>PASS</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>Gate 1 — Safety & Regulatory Compliance (Vertiport)</Text>
                  <Text style={S.gateDesc}>Obstacle surfaces clear, no Part 77 penetrations. ARFF adequate at Vertiport scale. Minor ramp reconfiguration at B SOUTH needed (~$150–300K).</Text>
                </View>
              </View>
              <View style={[S.gateRow, { borderColor: C.redBg }]}>
                <Text style={[S.gateBadge, S.gateFail]}>FAIL</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>Gate 1 — Safety & Regulatory Compliance (Vertihub)</Text>
                  <Text style={S.gateDesc}>8-pad Vertihub exceeds ramp geometry and requires dedicated ARFF per FAA AC 150/5210-6D. All Vertihub scenarios score zero.</Text>
                </View>
              </View>
              <View style={[S.gateRow, S.gateRowLast]}>
                <Text style={[S.gateBadge, S.gatePass]}>PASS</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>Gate 2 — Power & Grid Resiliency (All Configurations)</Text>
                  <Text style={S.gateDesc}>Peak demand 387kW vs. 800kW available from Clay County EMC. No grid constraint at any tier.</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
        <Footer />
      </Page>

      {/* ── PAGES 4+: Detailed Scenario Results + Route Demand + Resource Scaling ── */}
      <Page size="LETTER" style={S.page}>
        <PageHeader section="Detailed Scenario Results" />
        <View style={S.body}>

          <Text style={S.sectionLabel}>Simulation Data</Text>
          <Text style={S.h2}>All 9 Scenario Results</Text>
          <Text style={S.sub}>Individual metrics from the 90-day Monte Carlo simulation for each scenario</Text>

          {Object.entries(SCENARIOS).map(([key, s]) => (
            <View key={key} style={[S.scenarioCard, { marginBottom: 8 }]} wrap={false}>
              <View style={S.scenarioHeader}>
                <Text style={badgeStyle(s.verdict)}>{verdictShort(s.verdict)}</Text>
                <Text style={S.scenarioTitle}>{s.title}</Text>
              </View>
              <View style={S.scenarioMetrics}>
                {s.metrics.map((m, i) => (
                  <View key={i} style={S.metricChip}>
                    <Text style={S.metricVal}>{m.val}</Text>
                    <Text style={S.metricLbl}>{m.lbl}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View style={S.divider} />

          {/* Route demand */}
          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>Market Opportunity</Text>
            <Text style={S.h2}>eVTOL Route Demand Analysis</Text>
            <Text style={S.sub}>6 population centres modelled within 50-mile range envelope</Text>

            <View style={S.table}>
              <View style={S.tableHead}>
                {['Destination', 'Dist.', 'Time', 'Fare', 'vs. Car', 'Daily'].map((h, i) => (
                  <Text key={i} style={[S.th, { flex: i === 0 ? 2.2 : 1 }]}>{h}</Text>
                ))}
              </View>
              {ROUTES.map((r, i) => (
                <View key={i} style={[S.tableRow, i % 2 !== 0 ? S.tableRowAlt : {}, i === ROUTES.length - 1 ? S.tableRowLast : {}]}>
                  <Text style={[S.td, { flex: 2.2 }, r.primary ? { fontFamily: 'Helvetica-Bold', color: C.accent } : {}]}>
                    {r.dest}{r.primary ? '  PRIMARY' : ''}
                  </Text>
                  <Text style={[S.td, { flex: 1 }]}>{r.dist}</Text>
                  <Text style={[S.td, { flex: 1 }]}>{r.time}</Text>
                  <Text style={[S.td, { flex: 1 }]}>{r.fare}</Text>
                  <Text style={[r.saved ? S.tdGreen : S.tdMuted, { flex: 1 }]}>{r.vs}</Text>
                  <Text style={[S.tdBold, { flex: 1 }]}>{r.daily}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={S.divider} />

          {/* Resource scaling */}
          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>Grant Planning Tool</Text>
            <Text style={S.h2}>Resource Requirements by Traffic Tier</Text>
            <Text style={S.sub}>Infrastructure and demand data — Medium Traffic (Vertiport) is the recommended configuration</Text>

            <View style={S.table}>
              <View style={S.tableHead}>
                {['Resource', 'Low Traffic', 'Medium Traffic', 'High Traffic'].map((h, i) => (
                  <Text key={i} style={[S.th, { flex: i === 0 ? 1.6 : 1 }]}>{h}</Text>
                ))}
              </View>
              {RESOURCE_ROWS.map((row, ri) => (
                <View key={ri} style={[S.tableRow, ri % 2 === 0 ? S.tableRowAlt : {}, ri === RESOURCE_ROWS.length - 1 ? S.tableRowLast : {}]}>
                  <Text style={[ri === 0 ? S.tdBold : S.td, { flex: 1.6 }]}>{row[0]}</Text>
                  <Text style={[S.tdTeal,  { flex: 1 }]}>{row[1]}</Text>
                  <Text style={[S.tdAccent,{ flex: 1 }]}>{row[2]}</Text>
                  <Text style={[S.tdBlue,  { flex: 1 }]}>{row[3]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={S.callout} wrap={false}>
            <Text style={S.calloutTitle}>Grant Justification — Medium Traffic (Recommended)</Text>
            <Text style={S.calloutTxt}>
              A full Vertiport with 4 pads and 4 DC fast chargers serves 128 daily eVTOL operations
              and 131,400 annual passengers at 2.5% market adoption. The $4.1–5.4M phased investment
              over 36 months is matched to demonstrated demand and fully passes both FAA readiness
              gates. This is the recommended configuration for grant applications at 42J.
            </Text>
          </View>

          <View style={S.calloutWarn} wrap={false}>
            <Text style={S.calloutWarnTxt}>
              This assessment is for preliminary planning purposes and does not constitute an FAA-approved
              engineering study. Validate with a licensed FAA DER before use in ALP submissions or grant applications.
            </Text>
          </View>

        </View>
        <Footer />
      </Page>

    </Document>
  );
}
