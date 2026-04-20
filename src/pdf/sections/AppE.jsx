import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import { DATA_SOURCES, DOC } from '../../data/reportData';

const PREMIUM_DATA_SOURCES = [
  {
    source:  'OPS Hourly Pattern',
    date:    'May 2024–March 2026',
    method:  'Virtower AI Tower System — hour-of-day aggregation',
    status:  'VERIFIED',
    confidence: 'HIGH',
    verification: 'No action required — captured from same Virtower dataset as baseline ops',
  },
  {
    source:  'Corridor Congestion Index',
    date:    'Rolling (2025)',
    method:  'Google Maps API travel time baseline — weekday morning peak average',
    status:  'VERIFIED',
    confidence: 'HIGH',
    verification: 'No action required — API-sourced and periodically refreshed',
  },
  {
    source:  'UF Enrollment / UF Health Employment',
    date:    '2024–25',
    method:  'UF Office of Institutional Planning — published enrollment data',
    status:  'VERIFIED',
    confidence: 'HIGH',
    verification: 'No action required — publicly available institutional data',
  },
  {
    source:  'Jacksonville MSA Job Growth',
    date:    '2024',
    method:  'LEHD QWI — quarterly workforce indicators',
    status:  'VERIFIED',
    confidence: 'MEDIUM',
    verification: 'Confirm 2025 LEHD release available before grant submission',
  },
  {
    source:  'Clay County Poverty Rate',
    date:    '2020',
    method:  'US Census 2020 — American Community Survey 5-year estimates',
    status:  'VERIFIED',
    confidence: 'HIGH',
    verification: 'Update to ACS 2023 5-year estimates when available (expected 2025)',
  },
  {
    source:  'NPV Economic Benefits',
    date:    '2026-04-14',
    method:  'AAM Readiness System revenue model + USDOT BCA framework',
    status:  'MODELLED',
    confidence: 'MEDIUM',
    verification: 'Recommended: engage BCA specialist for formal RAISE submission documentation',
  },
  {
    source:  'Coincidence Factor (charging demand)',
    date:    '2026-04-14',
    method:  'AAM Readiness System proprietary dispatch model',
    status:  'PROPRIETARY',
    confidence: 'N/A',
    verification: 'Proprietary — not disclosed. Utility verification provides independent check on demand estimate.',
  },
  {
    source:  'RS Means — Florida Regional Multipliers',
    date:    '2025 Q4',
    method:  'RS Means City Cost Index — Northeast Florida (Jacksonville division)',
    status:  'VERIFIED',
    confidence: 'HIGH',
    verification: 'No action required — current edition used',
  },
];

const VERIFICATION_ACTIONS = [
  {
    priority: 'CRITICAL',
    action:   'Obtain written grid capacity confirmation from Clay County Electric Cooperative',
    deadline: 'Before ALP filing or RAISE/AIP submission',
    contact:  'Clay County Electric Cooperative — (904) 284-3319',
    impact:   'Gate 2 power check is the only ESTIMATED input affecting a gate-level pass/fail. Written utility confirmation converts this to VERIFIED status and removes the asterisk from grant submissions.',
  },
  {
    priority: 'RECOMMENDED',
    action:   'Engage licensed FAA DER for methodology validation',
    deadline: 'Before ALP submission or RAISE application submission',
    contact:  'Contact AAM Readiness System client services to initiate DER review',
    impact:   'A DER Letter of Concurrence strengthens federal grant applications and provides independent technical validation for FAA ADO review.',
  },
  {
    priority: 'RECOMMENDED',
    action:   'Update LEHD LODES8 demand data to 2022+ release when available',
    deadline: 'Before Year 3 annual re-assessment',
    contact:  'US Census Bureau LEHD program: lehd@census.gov',
    impact:   'Current demand model uses 2021 LODES8 (latest available at assessment date). Fresher O-D data may revise corridor demand estimates, particularly for Gainesville (UF corridor growth post-pandemic).',
  },
  {
    priority: 'OPTIONAL',
    action:   'Commission formal Benefit-Cost Analysis for RAISE submission',
    deadline: 'Before next RAISE application deadline (typically January)',
    contact:  'USDOT RAISE Program: raise@dot.gov',
    impact:   'The NPV figures in Section 7.4.1 are Readiness System model outputs. A formal BCA by a licensed transportation economist provides a stronger evidentiary basis for the grant narrative.',
  },
];

export default function AppE({ tier }) {
  const doc = DOC[tier];

  return (
    <>
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="E" title="Appendix E — Full Data Sources (Premium)" />

        <View style={S.body}>
          <Text style={S.p}>
            This appendix expands on Appendix A with all data sources used in Premium-exclusive
            sections, confidence levels for each source, and recommended verification actions
            before federal grant submission. Sources shared with the Standard report are included
            here with updated confidence ratings and verification guidance.
          </Text>

          <Text style={S.h2}>E.1 Premium-Exclusive Data Sources</Text>
          <DataTable
            headers={['Data Source', 'Date', 'Method', 'Status', 'Confidence', 'Verification Action']}
            flex={[2, 1, 1.8, 1.2, 1, 2.5]}
            rows={PREMIUM_DATA_SOURCES.map(d => [
              d.source, d.date, d.method, d.status, d.confidence, d.verification,
            ])}
            statusCols={[3]}
            caption="Table E-1. Premium-Exclusive Data Sources — Keystone Heights Airport (42J). Source: AAM Readiness System data pipeline."
          />

          <Text style={[S.h2, { marginTop: 12 }]}>E.2 Complete Data Source Index (All Tiers)</Text>
          <DataTable
            headers={['Data Source', 'Date', 'Verification', 'Model Impact']}
            flex={[2.5, 1.3, 1.2, 2.5]}
            rows={DATA_SOURCES.map(d => [d.source, d.date, d.status, d.impact])}
            statusCols={[2]}
            caption="Table E-2. Complete Data Source Index — All Tiers. Source: AAM Readiness System data pipeline."
          />
        </View>
      </Page>

      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          <Text style={S.h2}>E.3 Pre-Submission Verification Actions</Text>
          <Text style={S.p}>
            The following verification actions are recommended before submitting this assessment
            in support of federal grant applications or ALP filings. Actions are prioritized by
            their impact on data confidence and regulatory defensibility.
          </Text>

          {VERIFICATION_ACTIONS.map((a, i) => {
            const cardStyle = a.priority === 'CRITICAL' ? S.cardRed
              : a.priority === 'RECOMMENDED' ? S.cardAmber
              : S.cardBlue;
            const badgeStyle = a.priority === 'CRITICAL' ? S.badgeFail
              : a.priority === 'RECOMMENDED' ? S.badgeCond
              : [S.badge, { backgroundColor: C.blueBg, color: C.blue }];
            return (
              <View key={i} style={[S.card, cardStyle]} wrap={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                  <View style={[S.badge, a.priority === 'CRITICAL' ? S.badgeFail : a.priority === 'RECOMMENDED' ? S.badgeCond : { backgroundColor: C.blueBg, color: C.blue, borderRadius: 3, padding: '3 8', fontSize: 7, fontFamily: 'Helvetica-Bold' }]}>
                    <Text>{a.priority}</Text>
                  </View>
                  <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, flex: 1 }}>{a.action}</Text>
                </View>
                <View style={S.methodBullet}>
                  <Text style={[S.bulletDot, { width: 60, flexShrink: 0 }]}>Deadline:</Text>
                  <Text style={S.bulletText}>{a.deadline}</Text>
                </View>
                <View style={S.methodBullet}>
                  <Text style={[S.bulletDot, { width: 60, flexShrink: 0 }]}>Contact:</Text>
                  <Text style={S.bulletText}>{a.contact}</Text>
                </View>
                <Text style={[S.gateDesc, { marginTop: 6 }]}>{a.impact}</Text>
              </View>
            );
          })}

          <View style={[S.calloutAmber]} wrap={false}>
            <Text style={S.calloutTitleAmber}>Data Currency Notice</Text>
            <Text style={S.calloutTxtAmber}>
              This assessment was generated on April 19, 2026. FAA regulatory standards (EB-105,
              AC 150/5210-6D, Order 1050.1F) are verified current as of that date. Before use in
              grant applications or ALP submissions, confirm that no superseding FAA guidance has
              been issued. Subscribe to FAA Advisory Circular update notifications at faa.gov/regulations_policies.
            </Text>
          </View>
        </View>
      </Page>
    </>
  );
}
