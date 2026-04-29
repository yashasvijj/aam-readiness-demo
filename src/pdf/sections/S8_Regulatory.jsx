import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import UpsellCallout from '../shared/UpsellCallout';
import { REGULATORY, CONTACTS, REG_RISKS, DOC } from '../../data/reportData';

const REG_SECTIONS = [
  { key: 'alp',    num: '8.1' },
  { key: 'nepa',   num: '8.2' },
  { key: 'part139', num: '8.3' },
  { key: 'utm',    num: '8.4' },
];

export default function S8_Regulatory({ tier, charts, premium }) {
  const doc = DOC[tier];

  return (
    <>
      {/* ── Page: Regulatory Pathway ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="8" title="Regulatory Pathway" />

        <View style={S.body}>
          <Text style={S.p}>
            The following regulatory actions are required to bring eVTOL Vertiport operations
            at Keystone Heights Airport (42J) into compliance with FAA standards. Actions are
            sequenced to align with the three-phase implementation roadmap in Section 7.2.
          </Text>

          {/* Summary table */}
          <DataTable
            headers={['Action', 'Citation', 'Timeline', 'Filing Fee', 'Phase']}
            flex={[2, 2, 1.5, 1.3, 0.8]}
            rows={[
              ['ALP Amendment',            REGULATORY.alp.citation,     REGULATORY.alp.estimatedReview,     REGULATORY.alp.filingFee,     '1'],
              ['NEPA / CATEX Review',       REGULATORY.nepa.citation,    REGULATORY.nepa.estimatedReview,    REGULATORY.nepa.filingFee,    '1'],
              ['Part 139 Amendment',        REGULATORY.part139.citation, REGULATORY.part139.estimatedReview, REGULATORY.part139.filingFee, '2'],
              ['UTM LOA — Jacksonville ARTCC', REGULATORY.utm.citation,  REGULATORY.utm.estimatedReview,     REGULATORY.utm.filingFee,     '3'],
            ]}
            caption="Table 19. Regulatory Pathway Summary — Keystone Heights Airport (42J) eVTOL Vertiport. Source: FAA Airports District Office; FAA Order 1050.1F; 14 CFR Part 139."
          />

          {/* Detail for each regulatory section */}
          {REG_SECTIONS.map(({ key, num }) => {
            const reg = REGULATORY[key];
            return (
              <View key={key} wrap={false} style={{ marginBottom: 10 }}>
                <Text style={S.h2}>{num} {reg.title}</Text>
                <Text style={[S.captionItalic, { textAlign: 'left', marginBottom: 4 }]}>
                  Regulatory citation: {reg.citation}
                </Text>
                <Text style={S.p}>{reg.description}</Text>
                {reg.actions.map((action, i) => (
                  <View key={i} style={S.methodBullet}>
                    <Text style={S.bulletDot}>›</Text>
                    <Text style={S.bulletText}>{action}</Text>
                  </View>
                ))}
              </View>
            );
          })}

          {!premium && tier === 'standard' && (
            <UpsellCallout
              title="Premium Report: Regulatory Gantt Chart + Action Tracker"
              message="The Premium report includes a month-by-month regulatory action Gantt aligned to all three implementation phases, with contact details for each FAA office, filing fee schedules, and decision gate checkpoints."
            />
          )}
        </View>
      </Page>

      {/* ── Page: Regulatory Gantt (Premium) ── */}
      {premium && (
        <Page size="LETTER" style={S.page}>
          <DocHeader tierLabel={doc.tier} docId={doc.id} />
          <DocFooter />

          <View style={S.body}>
            <Text style={S.h2}>8.5 Regulatory Timeline — Gantt Overview</Text>
            <Text style={[S.sub, { marginBottom: 8 }]}>
              All regulatory actions mapped to the three-phase implementation roadmap
            </Text>

            {/* Gantt as table with visual bar approximation */}
            <DataTable
              headers={['Regulatory Action', 'Phase', 'Start (Month)', 'End (Month)', 'Duration']}
              flex={[3, 0.8, 1.2, 1.2, 1]}
              rows={REGULATORY.gantt.map(g => [
                g.task,
                g.phase.toString(),
                `Month ${g.startMo}`,
                `Month ${g.endMo}`,
                `${g.endMo - g.startMo} months`,
              ])}
              caption="Table 20. Regulatory Action Timeline — Keystone Heights Airport (42J) eVTOL Vertiport. Source: FAA Airports Division; FAA Order 1050.1F; 14 CFR Part 139; FAA BEYOND Program."
            />

            {/* Phase callout boxes */}
            <View style={S.twoCol} wrap={false}>
              <View style={[S.card, S.cardNavy, S.col]}>
                <Text style={S.h3}>Phase 1 (Months 0–6): Critical Path</Text>
                <Text style={S.gateDesc}>
                  ALP pre-application meeting and CATEX review initiation are on the critical
                  path — delays here compress the Phase 2 grant application window. Schedule
                  FAA ADO contact within 30 days of project authorisation.
                </Text>
              </View>
              <View style={[S.card, S.cardBlue, S.col]}>
                <Text style={S.h3}>Phase 2 (Months 7–18): Grant Windows</Text>
                <Text style={S.gateDesc}>
                  RAISE applications are typically due in January. A Phase 2 start in Month 7
                  allows 3–5 months for application preparation before the next RAISE cycle.
                  AIP applications can be submitted concurrently with the ALP amendment.
                </Text>
              </View>
            </View>

            <View style={[S.callout]} wrap={false}>
              <Text style={S.calloutTitle}>Recommended First Action</Text>
              <Text style={S.calloutTxt}>
                Contact FAA Orlando Airports District Office (ADO) within 30 days to schedule
                an ALP pre-application meeting. This single action unlocks both the ALP
                amendment track and the AIP Supplemental funding pathway simultaneously.
                Contact: FAA Orlando ADO · (407) 812-6331
              </Text>
            </View>

            {/* Regulatory Risk Assessment */}
            <Text style={[S.h2, { marginTop: 16 }]}>8.6 Regulatory Risk Assessment</Text>
            <DataTable
              headers={['Regulatory Action', 'Risk Level', 'Key Risk', 'Mitigation']}
              flex={[1.5, 0.9, 2.2, 2.8]}
              rows={REG_RISKS.map(r => [r.action, r.risk, r.keyRisk, r.mitigation])}
              statusCols={[1]}
              caption="Table 21. Regulatory Risk Assessment — Keystone Heights Airport (42J). Source: AAM Readiness System regulatory framework."
            />

            {/* Contact Directory */}
            <Text style={[S.h2, { marginTop: 16 }]}>8.7 Key Contact Directory</Text>
            <Text style={[S.sub, { marginBottom: 8 }]}>
              All contacts relevant to the regulatory pathway and funding applications
            </Text>
            {CONTACTS.map((c, i) => (
              <View key={i} style={[S.card, i % 2 === 0 ? S.cardNavy : S.cardBlue]} wrap={false}>
                <Text style={S.h3}>{c.agency}</Text>
                <Text style={[S.gateDesc, { marginBottom: 2 }]}>
                  Role: {c.role}
                </Text>
                {c.phone && <Text style={S.gateDesc}>Phone: {c.phone}</Text>}
                {c.email && <Text style={S.gateDesc}>Email: {c.email}</Text>}
                {c.address && <Text style={S.gateDesc}>Address: {c.address}</Text>}
                <Text style={[S.gateDesc, { marginTop: 4, color: C.blue, fontStyle: 'italic' }]}>
                  {c.note}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      )}

    </>
  );
}
