import { Document, Page, View, Text } from '@react-pdf/renderer';
import { S, C } from './styles';
import PageHeader from './PageHeader';
import CoverPage from './CoverPage';

const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const Footer = ({ label }) => (
  <View style={S.pageFooter} fixed>
    <Text style={S.footerTxt}>AAM Readiness Assessment · Keystone Heights Airport (42J)</Text>
    <Text style={S.footerTxt}>{today} · Preliminary Report · {label}</Text>
  </View>
);

export default function PreliminaryReport() {
  return (
    <Document title="AAM Readiness — Preliminary Report" author="AAMReadiness">

      {/* ── PAGE 1: Cover ── */}
      <CoverPage tier="PRELIMINARY REPORT" />

      {/* ── PAGE 2: Summary + Gates ── */}
      <Page size="LETTER" style={S.page}>

        <PageHeader section="Assessment Summary" />

        <View style={S.body}>

          {/* Score summary card */}
          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>Overall Verdict</Text>
            <Text style={S.h2}>Readiness Score — 93 / 100</Text>
            <Text style={S.sub}>Keystone Heights Airport (42J) · April 2026 Assessment</Text>

            <View style={S.statRow} wrap={false}>
              <View style={S.statChip}>
                <Text style={[S.statChipVal, { color: C.accent }]}>93/100</Text>
                <Text style={S.statChipLbl}>Overall Score</Text>
              </View>
              <View style={S.statChip}>
                <Text style={[S.statChipVal, { color: C.green }]}>OPTIMAL</Text>
                <Text style={S.statChipLbl}>Verdict</Text>
              </View>
              <View style={S.statChip}>
                <Text style={[S.statChipVal, { color: C.teal }]}>Vertiport</Text>
                <Text style={S.statChipLbl}>Recommended Tier</Text>
              </View>
              <View style={[S.statChip, S.statChipLast]}>
                <Text style={[S.statChipVal, { color: C.blue }]}>$6.0M</Text>
                <Text style={S.statChipLbl}>Est. CAPEX</Text>
              </View>
            </View>

            <Text style={S.p}>
              Keystone Heights Airport (42J) has achieved an overall AAM Readiness Score of 93 out
              of 100, placing it in the OPTIMAL tier. This score reflects the airport's ability to
              safely and efficiently support eVTOL operations across the recommended Vertiport
              configuration at B SOUTH / A2 Ramp.
            </Text>
            <Text style={S.p}>
              The assessment evaluated 9 combinations of traffic demand and infrastructure scale
              across a 90-day Monte Carlo simulation, drawing on 50,236 actual flight operations
              recorded at 42J between May 2024 and March 2026. Of the 9 scenarios tested, 4 passed
              all mandatory safety and power gates.
            </Text>
            <Text style={S.p}>
              The recommended configuration — a Vertiport with 4 landing pads and 4 × 150kW DC fast
              chargers — is correctly sized for medium-tier market adoption (2.5%), projecting 128
              daily operations and 131,400 annual passengers at maturity.
            </Text>
          </View>

          <View style={S.divider} />

          {/* Gate status */}
          <View style={S.section} wrap={false}>
            <Text style={S.sectionLabel}>Mandatory Readiness Gates</Text>
            <Text style={S.h2}>Gate Assessment</Text>
            <Text style={S.sub}>Two thresholds must both pass — failure at either scores zero</Text>

            <View style={[S.card, S.cardGreen]} wrap={false}>
              <View style={S.gateRow}>
                <Text style={[S.gateBadge, S.gatePass]}>PASS</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>Gate 1 — Safety & Regulatory Compliance</Text>
                  <Text style={S.gateDesc}>
                    Obstacle surfaces clear, no Part 77 penetrations. Existing ARFF infrastructure
                    adequate for eVTOL lithium-ion events at Vertiport scale. Minor ramp
                    reconfiguration at B SOUTH needed (~$150–300K), achievable within existing footprint.
                  </Text>
                </View>
              </View>
              <View style={[S.gateRow, S.gateRowLast]}>
                <Text style={[S.gateBadge, S.gatePass]}>PASS</Text>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>Gate 2 — Power & Grid Resiliency</Text>
                  <Text style={S.gateDesc}>
                    Peak Vertiport demand of 387kW is well within the 800kW available from Clay
                    County EMC. No grid constraint blocks AAM deployment at any configuration tier.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Disclaimer */}
          <View style={S.callout} wrap={false}>
            <Text style={S.calloutTitle}>Preliminary Report</Text>
            <Text style={S.calloutTxt}>
              This report contains the overall readiness score and gate status only. Upgrade to
              Standard for assessment methodology and recommended configuration details, or Premium
              for the full simulation dataset including all 9 scenario results, route demand
              analysis, and resource scaling tables.
            </Text>
          </View>

          <View style={S.calloutWarn} wrap={false}>
            <Text style={S.calloutWarnTxt}>
              This assessment is for preliminary planning purposes and does not constitute an
              FAA-approved engineering study. Infrastructure recommendations should be validated by a
              licensed FAA DER before use in ALP submissions or grant applications.
            </Text>
          </View>

        </View>

        <Footer label="Page 2 of 2" />
      </Page>

    </Document>
  );
}
