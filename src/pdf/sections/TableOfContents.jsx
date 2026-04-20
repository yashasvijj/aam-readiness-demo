import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import { DOC } from '../../data/reportData';

// TOC entry data by tier
// Page numbers are approximate for the assembled PDF (cover = 1, TOC = 2)
const TOC_STANDARD = [
  {
    num: '1', title: 'Executive Summary', page: '3',
    subs: [
      { title: '1.1 Summary Financial Metrics', page: '4' },
    ],
  },
  {
    num: '2', title: 'Airport Profile', page: '5',
    subs: [
      { title: '2.1 Location and Airspace Classification', page: '5' },
      { title: '2.2 Existing Infrastructure Inventory', page: '5' },
      { title: '2.3 Operational Baseline Analysis', page: '6' },
      { title: '2.4 Military VTOL Integration Precedent', page: '7' },
    ],
  },
  {
    num: '3', title: 'Demand Analysis', page: '8',
    subs: [
      { title: '3.1 Demand Modelling Methodology', page: '8' },
      { title: '3.2 Identified Route Network', page: '8' },
      { title: '3.3 eVTOL Traffic Projections', page: '9' },
      { title: '3.4 Sensitivity Analysis', page: '10' },
    ],
  },
  {
    num: '4', title: 'Infrastructure Assessment', page: '11',
    subs: [
      { title: '4.1 FAA EB-105 Ramp Geometry Compliance', page: '11' },
      { title: '4.2 Aircraft Rescue and Fire Fighting (ARFF)', page: '11' },
      { title: '4.3 Electrical Grid Assessment', page: '12' },
      { title: '4.4 UTM Ground Infrastructure', page: '13' },
    ],
  },
  {
    num: '5', title: '90-Day Simulation Results', page: '14',
    subs: [
      { title: '5.1 Simulation Methodology', page: '14' },
      { title: '5.2 Nine-Scenario Results Matrix', page: '14' },
      { title: '5.3 Detailed Scenario Results', page: '15' },
    ],
  },
  {
    num: '6', title: 'Readiness Score and Gate Analysis', page: '16',
    subs: [
      { title: '6.1 Gate 1 — Safety and Regulatory Compliance', page: '16' },
      { title: '6.2 Gate 2 — Power and Grid Resiliency', page: '17' },
      { title: '6.3 Efficiency Score Breakdown', page: '17' },
    ],
  },
  {
    num: '7', title: 'Recommendations and Implementation', page: '18',
    subs: [
      { title: '7.1 Recommended Configuration', page: '18' },
      { title: '7.2 Phased Implementation Roadmap', page: '18' },
      { title: '7.3 CAPEX Breakdown', page: '19' },
      { title: '7.4 Financial Projections', page: '19' },
      { title: '7.5 Federal Funding Pathways', page: '20' },
    ],
  },
  {
    num: '8', title: 'Regulatory Pathway', page: '21',
    subs: [
      { title: '8.1 Airport Layout Plan (ALP) Amendment', page: '21' },
      { title: '8.2 NEPA / Categorical Exclusion (CATEX)', page: '21' },
      { title: '8.3 Part 139 Certification Amendment', page: '21' },
      { title: '8.4 UTM Integration and LOA', page: '21' },
    ],
  },
  {
    num: 'A', title: 'Appendix A — Data Sources and Citations', page: '23',
    subs: [],
  },
  {
    num: 'B', title: 'Appendix B — Simulation Methodology Technical Specification', page: '24',
    subs: [],
  },
  {
    num: 'C', title: 'Appendix C — DER Methodology Review', page: '25',
    subs: [],
  },
];

const TOC_PRELIMINARY = [
  {
    num: '1', title: 'Executive Summary', page: '3',
    subs: [{ title: '1.1 Summary Financial Metrics', page: '4' }],
  },
  {
    num: '2', title: 'Airport Profile (Highlights)', page: '5',
    subs: [
      { title: '2.1 Location and Infrastructure Overview', page: '5' },
      { title: '2.2 Military VTOL Precedent', page: '5' },
    ],
  },
  {
    num: '3', title: 'Demand Overview', page: '6',
    subs: [
      { title: '3.1 Primary Corridor Analysis', page: '6' },
      { title: '3.2 Traffic Projections', page: '6' },
    ],
  },
  {
    num: '4', title: 'Infrastructure Highlights', page: '7',
    subs: [{ title: '4.1 EB-105 and Grid Summary', page: '7' }],
  },
  {
    num: '5', title: 'Simulation Summary', page: '8',
    subs: [{ title: '5.1 Scenario Matrix Overview', page: '8' }],
  },
  {
    num: '6', title: 'Gate Analysis and Score', page: '9',
    subs: [],
  },
  {
    num: '7', title: 'Recommendations', page: '10',
    subs: [{ title: '7.1 Configuration and Phased Roadmap', page: '10' }],
  },
  {
    num: 'A', title: 'Appendix A — Data Sources', page: '11',
    subs: [],
  },
];

const TOC_PREMIUM = [
  ...TOC_STANDARD.map(s => ({ ...s })),
  {
    num: 'D', title: 'Appendix D — Grant Language Pack', page: '26',
    subs: [
      { title: 'D.1 Benefit-Cost Analysis Summary', page: '26' },
      { title: 'D.2 Needs Assessment Narrative', page: '26' },
      { title: 'D.3 Equity Analysis', page: '27' },
      { title: 'D.4 RAISE Application Checklist', page: '27' },
      { title: 'D.5 AIP Supplemental Checklist', page: '27' },
    ],
  },
];

export default function TableOfContents({ tier }) {
  const doc = DOC[tier];
  const entries = tier === 'preliminary' ? TOC_PRELIMINARY
    : tier === 'premium' ? TOC_PREMIUM
    : TOC_STANDARD;

  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <View style={S.body}>
        <Text style={S.h2}>Table of Contents</Text>
        <View style={S.dividerNavy} />

        {entries.map((entry, i) => (
          <View key={i}>
            {/* Main entry */}
            <View style={S.tocEntry} wrap={false}>
              <View style={S.tocEntrySection}>
                <Text style={S.tocNum}>{entry.num}.</Text>
                <Text style={S.tocTitle}>{entry.title}</Text>
              </View>
              <Text style={S.tocPage}>{entry.page}</Text>
            </View>
            {/* Sub-entries */}
            {entry.subs.map((sub, j) => (
              <View key={j} style={S.tocSubEntry}>
                <Text style={S.tocSubTitle}>{sub.title}</Text>
                <Text style={S.tocSubPage}>{sub.page}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={[S.divider, { marginTop: 20 }]} />
        <Text style={[S.captionItalic, { marginTop: 8 }]}>
          Page numbers are approximate and reflect the assembled PDF document.
          Section content and page count may vary based on the selected report tier.
        </Text>
      </View>
    </Page>
  );
}
