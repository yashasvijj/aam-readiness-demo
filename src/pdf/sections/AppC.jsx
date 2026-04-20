import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import { DOC } from '../../data/reportData';

export default function AppC({ tier }) {
  const doc = DOC[tier];

  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="C" title="Appendix C — DER Methodology Review" />

      <View style={S.body}>
        <View style={[S.calloutAmber]} wrap={false}>
          <Text style={S.calloutTitleAmber}>Review Status — PENDING</Text>
          <Text style={S.calloutTxtAmber}>
            Independent DER (Designated Engineering Representative) methodology review has
            not yet been completed for this assessment cycle. This appendix will be populated
            upon completion of the DER review process. A completed DER review is recommended
            before submitting the ALP amendment package or federal grant applications.
          </Text>
        </View>

        <Text style={S.h2}>About the DER Review</Text>
        <Text style={S.p}>
          The AAM Readiness System provides clients with the option of an independent review
          by a FAA-designated DER (Designated Engineering Representative) to validate the
          simulation methodology and scoring framework used in this assessment. This review
          is not required for planning purposes but is recommended for airports proceeding
          to ALP submission or federal grant applications where third-party technical
          validation strengthens the application.
        </Text>

        <Text style={S.h3}>Scope of DER Review</Text>
        {[
          'Validation of simulation methodology against FAA-accepted discrete-event simulation practices',
          'Review of demand model calibration sources and recency',
          'Confirmation that gate check thresholds align with current FAA EB-105 and AC 150/5210-6D versions',
          'Review of infrastructure cost estimates against RS Means and comparable project data',
          'Issuance of DER Letter of Concurrence for inclusion in ALP and grant packages',
        ].map((item, i) => (
          <View key={i} style={S.methodBullet}>
            <Text style={S.bulletDot}>›</Text>
            <Text style={S.bulletText}>{item}</Text>
          </View>
        ))}

        <Text style={S.h3}>Initiating a DER Review</Text>
        <Text style={S.p}>
          To initiate a DER review for this assessment, contact the AAM Readiness System
          client services team. The review typically requires 30–45 business days and is
          included as a deliverable in the Premium+ service tier. The DER Letter of
          Concurrence will be issued directly to the airport sponsor and FAA Airports
          District Office upon completion.
        </Text>

        <View style={[S.card, S.cardBlue]} wrap={false}>
          <Text style={S.h3}>Regulatory Note</Text>
          <Text style={S.gateDesc}>
            This assessment does not constitute an FAA-approved engineering study or a
            DER-certified technical report. It is intended for planning and pre-application
            purposes only. Before ALP submission, grant application filing, or construction
            commencement, the airport sponsor should obtain validation from a licensed FAA
            DER or FAA-approved engineering firm per FAA Order 5100.38D.
          </Text>
        </View>
      </View>
    </Page>
  );
}
