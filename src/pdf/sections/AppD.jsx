import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import { GRANT_PACK, RECS, DOC } from '../../data/reportData';

export default function AppD({ tier }) {
  const doc = DOC[tier];

  return (
    <>
      {/* ── Page: BCA Summary + Needs Assessment ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="D" title="Appendix D — Grant Language Pack (Premium)" />

        <View style={S.body}>
          <Text style={[S.p, { fontStyle: 'italic', marginBottom: 12 }]}>
            This appendix contains pre-drafted language for use in federal grant applications.
            Content is derived directly from the assessment findings in this report. Sponsors
            should review and adapt text to reflect project-specific details before submission.
          </Text>

          {/* BCA Summary */}
          <View style={[S.card, S.cardGreen]} wrap={false}>
            <Text style={S.h3}>D.1 Benefit-Cost Analysis (BCA) Summary</Text>
            <Text style={[S.captionItalic, { textAlign: 'left', marginBottom: 8 }]}>
              For use in: USDOT RAISE Application — Section 3 (Project Justification)
            </Text>
            <Text style={S.p}>{GRANT_PACK.bcaSummary}</Text>
          </View>

          {/* Needs Assessment */}
          <View style={[S.card, S.cardBlue]} wrap={false}>
            <Text style={S.h3}>D.2 Needs Assessment Narrative</Text>
            <Text style={[S.captionItalic, { textAlign: 'left', marginBottom: 8 }]}>
              For use in: USDOT RAISE Application — Section 2 (Problem Statement); FAA AIP Supplemental
            </Text>
            <Text style={S.p}>{GRANT_PACK.needsAssessment}</Text>
          </View>
        </View>
      </Page>

      {/* ── Page: Equity Analysis + RAISE Checklist ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          {/* Equity Analysis */}
          <View style={[S.card, S.cardNavy]} wrap={false}>
            <Text style={S.h3}>D.3 Equity Analysis</Text>
            <Text style={[S.captionItalic, { textAlign: 'left', marginBottom: 8 }]}>
              For use in: USDOT RAISE Application — Section 5 (Equity and Environmental Justice)
            </Text>
            <Text style={S.p}>{GRANT_PACK.equityAnalysis}</Text>
          </View>

          {/* RAISE Application checklist */}
          <Text style={S.h2}>D.4 RAISE Application Documentation Checklist</Text>
          <Text style={[S.sub, { marginBottom: 6 }]}>
            Cross-reference to sections of this report supporting each RAISE requirement
          </Text>

          {RECS.federalFunding
            .filter(f => f.program === 'RAISE')
            .map(f => (
              <View key={f.program} style={{ marginBottom: 8 }}>
                {f.docReqs.split(',').map((req, i) => (
                  <View key={i} style={[S.methodBullet, { marginBottom: 6 }]} wrap={false}>
                    <Text style={S.bulletDot}>›</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.navy, marginBottom: 2 }}>
                        {req.trim()}
                      </Text>
                      <Text style={S.bulletText}>
                        Source: {f.fromReport}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}

          <View style={[S.callout]} wrap={false}>
            <Text style={S.calloutTitle}>Application Submission Notes</Text>
            <Text style={S.calloutTxt}>
              RAISE applications are due annually, typically in January. Contact the USDOT
              RAISE Program Office at raise@dot.gov to confirm the current year deadline.
              The pre-drafted language in this appendix (Sections D.1–D.3) provides the
              core narrative. Sponsors will additionally need to provide site control
              documentation (deed or long-term lease), local match commitment letter,
              and any required environmental coordination letters from state agencies.
            </Text>
          </View>

          <Text style={S.h2}>D.5 AIP Supplemental Checklist</Text>
          {RECS.federalFunding
            .filter(f => f.program === 'AIP Supplemental')
            .map(f => (
              <View key={f.program}>
                {f.docReqs.split(',').map((req, i) => (
                  <View key={i} style={[S.methodBullet, { marginBottom: 4 }]} wrap={false}>
                    <Text style={S.bulletDot}>›</Text>
                    <Text style={S.bulletText}>{req.trim()}</Text>
                  </View>
                ))}
                <Text style={[S.gateDesc, { marginTop: 6, color: C.blue }]}>
                  Contact: {f.keyContact} · Application Window: {f.appWindow}
                </Text>
              </View>
            ))}
        </View>
      </Page>
    </>
  );
}
