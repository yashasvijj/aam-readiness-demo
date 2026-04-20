import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import { SUMMARY, RECS, DOC } from '../../data/reportData';

export default function S1_ExecutiveSummary({ tier, charts, premium }) {
  const doc = DOC[tier];

  const financialRows = RECS.revenueAssumptions.map(() => null); // placeholder filled below
  const finMetrics = [
    ['Program CAPEX (phased, 36mo)',      '$4.1M – $5.4M',    'Phased implementation estimate'],
    ['FAA RAISE Grant (available)',       'Up to $25M',        'RAISE Program — AAM eligible'],
    ['FAA AIP Supplemental (available)',  'Up to $5M',         'Airport Improvement Program'],
    ['Annual Passengers (Year 3)',        '131,400',           'Medium tier, 75% load factor'],
    ['Annual Revenue Potential (Year 3)', '$2.1M – $3.8M',     'Landing fees + charging + FBO'],
    ['Estimated Break-Even',             'Year 4–5',           'Base demand scenario'],
  ];

  return (
    <>
      {/* ── Page: Executive Summary ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="1" title="Executive Summary" />

        <View style={S.body}>
          <Text style={S.p}>
            Keystone Heights Airport (42J), located in Clay County, Florida, is well-positioned for
            Advanced Air Mobility (AAM) integration and is recommended to proceed immediately to
            infrastructure development planning. The airport has been assessed against the AAM
            Readiness System framework and assigned a Readiness Index of 93 out of 100 (95% CI:
            88.2 – 98.2) under the optimal configuration of a Vertiport serving Medium eVTOL Traffic.
          </Text>
          <Text style={S.p}>
            This is a {doc.tier} ASSESSMENT with data confidence of {SUMMARY.confidence[tier].pct}%.{' '}
            {SUMMARY.confidence[tier].verifyNote}
          </Text>

          <Text style={S.h2}>Key Findings</Text>
          {SUMMARY.keyFindings.map((f, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 8 }} wrap={false}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, width: 22, flexShrink: 0 }}>
                {i + 1}.
              </Text>
              <Text style={[S.p, { marginBottom: 0, flex: 1 }]}>{f}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* ── Page: 1.1 Financial Metrics ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          <Text style={S.h2}>1.1 Summary Financial Metrics</Text>

          {premium ? (
            // Premium: side-by-side Low/Medium/High columns
            <>
              <Text style={[S.sub, { marginBottom: 10 }]}>
                Financial projections by traffic scenario — Low (0.8%), Medium (2.5%), High (5.8%) adoption
              </Text>
              <DataTable
                headers={['Metric', 'Low Traffic', 'Medium Traffic ★', 'High Traffic']}
                flex={[2, 1.2, 1.4, 1.2]}
                rows={[
                  ['Program CAPEX',          '$2.5–3.5M',  '$4.1–5.4M',  '$8.0–12M'],
                  ['FAA RAISE (available)',  'Up to $25M', 'Up to $25M', 'Up to $25M'],
                  ['Annual Pax (Year 3)',    '24,528',     '131,400',    '327,680'],
                  ['Revenue Potential (Y3)', '$0.6–0.9M',  '$2.1–3.8M',  '$5.2–9.1M'],
                  ['Break-Even',            'Year 5–6',   'Year 4–5',   'Year 2–3'],
                ]}
                caption="Table 1. Executive Summary — Key Financial Metrics by Traffic Scenario. Source: AAM Readiness System demand and cost models; FAA RAISE and AIP program guidelines."
              />
            </>
          ) : (
            <>
              <DataTable
                headers={['Metric', 'Estimate', 'Basis']}
                flex={[2, 1.2, 2]}
                rows={finMetrics}
                caption="Table 1. Executive Summary — Key Financial Metrics. Source: AAM Readiness System demand and cost models; FAA RAISE and AIP program guidelines."
              />
            </>
          )}
        </View>
      </Page>
    </>
  );
}
