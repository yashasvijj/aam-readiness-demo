import { Document, Page, View, Text } from '@react-pdf/renderer';
import { S, C } from './styles';
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

const METHODOLOGY = [
  {
    title: 'Baseline Data Collection',
    bullets: [
      'FAA Form 5010 airport master record and current operations data',
      'Virtower ADS-B traffic logs: 50,236 operations (May 2024 – March 2026)',
      'Grid capacity data from Clay County EMC service territory records',
      'Ramp geometry and obstacle surface surveys per FAA AC 150/5300-13B',
    ],
  },
  {
    title: 'Two-Gate Safety Framework',
    bullets: [
      'Gate 1 assesses safety and regulatory compliance: Part 77 obstacle surfaces, ARFF adequacy per FAA AC 150/5210-6D, and ramp geometry per FAA EB-105',
      'Gate 2 assesses power and grid resiliency: peak eVTOL charging demand vs. available grid capacity',
      'Failure at either gate scores the full scenario zero — no partial credit',
    ],
  },
  {
    title: '9-Scenario Monte Carlo Simulation',
    bullets: [
      '3 traffic tiers (0.8%, 2.5%, 5.8% market adoption) crossed with 3 infrastructure tiers (Vertistop, Vertiport, Vertihub)',
      '90-day simulation using stochastic arrival modeling calibrated to 42J baseline operations',
      'Outputs measured: throughput rate, average queue time, and resilience failure count',
    ],
  },
  {
    title: 'Scoring & Recommendation',
    bullets: [
      'Each gate-passing scenario is scored on throughput efficiency, infrastructure fit, and capital utilisation',
      'The highest-scoring scenario correctly sized for demonstrated demand becomes the recommendation',
      'Medium Traffic + Vertiport (93/100) is the optimal configuration for 42J',
    ],
  },
];

const PHASES = [
  { num: 1, title: 'Site Prep',       months: 'Months 1–6',   capex: '$250–400K',  color: C.accent,
    items: ['B SOUTH ramp reconfiguration', 'Helipad → 2-pad FATO/TLOF', 'EB-105 compliance', 'Grid assessment'] },
  { num: 2, title: 'Infrastructure',  months: 'Months 7–18',  capex: '$2.8–3.5M',  color: C.blue,
    items: ['+0.3MW grid distribution line', '4 × 150kW DC fast chargers', 'UTM ground infrastructure'] },
  { num: 3, title: 'Full Operations', months: 'Months 19–36', capex: '$1.0–1.5M',  color: C.green,
    items: ['Full Vertiport operations', 'Scale to medium traffic tier', 'Jacksonville corridor launch'] },
];

const Footer = ({ page, total }) => (
  <View style={S.pageFooter} fixed>
    <Text style={S.footerTxt}>AAM Readiness Assessment · Keystone Heights Airport (42J)</Text>
    <Text style={S.footerTxt}>{today} · Standard Report · Page {page} of {total}</Text>
  </View>
);

export default function StandardReport() {
  return (
    <Document title="AAM Readiness — Standard Report" author="AAMReadiness">

      {/* ── PAGE 1: Cover ── */}
      <CoverPage tier="STANDARD REPORT" />

      {/* ── PAGE 2: Recommended Config + Gate Assessment ── */}
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
            <Text style={S.sectionLabel}>Safety & Power Readiness</Text>
            <Text style={S.h2}>Gate Assessment</Text>
            <Text style={S.sub}>Two mandatory pass/fail thresholds — failure at either gate scores zero</Text>

            <View style={[S.card, S.cardGreen]} wrap={false}>
              <View style={S.gateRow}>
                <Text style={[S.gateBadge, S.gatePass]}>PASS</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>Gate 1 — Safety & Regulatory Compliance (Vertiport)</Text>
                  <Text style={S.gateDesc}>
                    Obstacle surfaces clear, no Part 77 penetrations. ARFF infrastructure adequate for
                    eVTOL lithium-ion events at Vertiport scale. Minor ramp reconfiguration at B SOUTH
                    needed (~$150–300K), achievable within the existing footprint.
                  </Text>
                </View>
              </View>
              <View style={[S.gateRow, { borderColor: C.redBg }]}>
                <Text style={[S.gateBadge, S.gateFail]}>FAIL</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>Gate 1 — Safety & Regulatory Compliance (Vertihub)</Text>
                  <Text style={S.gateDesc}>
                    8-pad Vertihub exceeds available ramp geometry and requires dedicated ARFF per FAA
                    AC 150/5210-6D — not warranted at this volume. All Vertihub scenarios score zero.
                    This protects 42J from a $10M+ overbuild.
                  </Text>
                </View>
              </View>
              <View style={[S.gateRow, S.gateRowLast]}>
                <Text style={[S.gateBadge, S.gatePass]}>PASS</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>Gate 2 — Power & Grid Resiliency (All Configurations)</Text>
                  <Text style={S.gateDesc}>
                    Peak Vertiport demand: 387kW vs. 800kW available from Clay County EMC rural grid.
                    All infrastructure tiers pass power requirements — no grid constraint blocks
                    AAM deployment at 42J.
                  </Text>
                </View>
              </View>
            </View>
          </View>

        </View>
        <Footer page={2} total={3} />
      </Page>

      {/* ── PAGE 3: Methodology + Phased Roadmap ── */}
      <Page size="LETTER" style={S.page}>
        <PageHeader section="Assessment Methodology" />
        <View style={S.body}>

          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>How the Score Is Calculated</Text>
            <Text style={S.h2}>Assessment Methodology</Text>
            <Text style={S.p}>
              The AAM Readiness Score is produced through a four-step process combining regulatory
              compliance checks, grid capacity analysis, and 90-day probabilistic demand simulation.
              The methodology is calibrated to identify the optimal infrastructure scale for a given
              airport — neither under-building for early demand nor over-capitalising ahead of it.
            </Text>

            {METHODOLOGY.map((m, i) => (
              <View key={i} style={S.methodStep} wrap={false}>
                <View style={S.methodNumCircle}>
                  <Text style={S.methodNumTxt}>{i + 1}</Text>
                </View>
                <View style={S.methodContent}>
                  <Text style={S.methodTitle}>{m.title}</Text>
                  {m.bullets.map((b, j) => (
                    <View key={j} style={S.methodBullet}>
                      <Text style={S.bulletDot}>›</Text>
                      <Text style={S.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
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

          <View style={S.callout} wrap={false}>
            <Text style={S.calloutTitle}>Full Simulation Data Available in Premium</Text>
            <Text style={S.calloutTxt}>
              The Premium report includes all 9 scenario simulation results with individual metrics,
              route demand analysis across 6 corridors, and the full resource scaling breakdown
              across all three traffic and infrastructure tiers.
            </Text>
          </View>

          <View style={S.calloutWarn} wrap={false}>
            <Text style={S.calloutWarnTxt}>
              This assessment is for preliminary planning purposes and does not constitute an
              FAA-approved engineering study. Validate with a licensed FAA DER before ALP
              submissions or grant applications.
            </Text>
          </View>

        </View>
        <Footer page={3} total={3} />
      </Page>

    </Document>
  );
}
