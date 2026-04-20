import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import { DATA_SOURCES, DOC } from '../../data/reportData';

export default function AppA({ tier }) {
  const doc = DOC[tier];

  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="A" title="Appendix A — Data Sources and Citations" />

      <View style={S.body}>
        <Text style={S.p}>
          The following table lists all primary data sources used in this assessment, their
          verification status, and their role in the scoring and simulation model. Sources
          marked ESTIMATED should be verified before federal grant submission or ALP filing.
        </Text>

        <DataTable
          headers={['Data Source', 'Date / Period', 'Collection Method', 'Verification Status', 'Model Impact']}
          flex={[2, 1.5, 2, 1.4, 2.5]}
          rows={DATA_SOURCES.map(d => [
            d.source,
            d.date,
            d.method,
            d.status,
            d.impact,
          ])}
          statusCols={[3]}
          caption="Table A-1. Data Sources and Verification Status — Keystone Heights Airport (42J) AAM Readiness Assessment. Source: AAM Readiness System data pipeline."
        />

        <View style={[S.calloutAmber]} wrap={false}>
          <Text style={S.calloutTitleAmber}>Critical — Grid Capacity Verification Required</Text>
          <Text style={S.calloutTxtAmber}>
            The grid capacity figure (0.8 MW available headroom) is the only ESTIMATED input
            that affects a gate-level check. This figure is based on an airport-class estimate
            from the Clay County Electric Cooperative service territory. Before federal grant
            submission or ALP filing, obtain written confirmation of available capacity from
            Clay County Electric Cooperative and update this assessment accordingly.
          </Text>
        </View>

        <Text style={S.h2}>Regulatory Standards and Advisory Circulars</Text>

        <DataTable
          headers={['Standard', 'Title', 'Application in This Report']}
          flex={[1.8, 2.5, 2.5]}
          rows={[
            ['FAA EB-105',              'Engineering Brief 105 — eVTOL Infrastructure', 'Gate 1 ramp geometry and FATO/TLOF sizing (Section 4.1)'],
            ['FAA AC 150/5210-6D',      'Aircraft Rescue and Fire Fighting (ARFF)',      'Gate 1 ARFF capability check (Section 4.2)'],
            ['FAA AC 150/5300-13B',     'Airport Design Standards',                      'Obstacle surface clearance (Section 6.1)'],
            ['FAA AC 150/5070-6B',      'Airport Master Plans',                          'ALP amendment guidance (Section 8.1)'],
            ['FAA Order 1050.1F',       'Environmental Impacts: Policies and Procedures','NEPA / CATEX review framework (Section 8.2)'],
            ['14 CFR Part 139',         'Airport Certification',                         'Part 139 certification pathway (Section 8.3)'],
            ['FAA Order JO 7900.9',     'Special Operations Procedures',                 'UTM LOA framework (Section 8.4)'],
            ['ASTM F3411',              'Remote ID and Tracking UTM Standard',           'UTM integration specification (Section 4.4)'],
            ['NFPA 855',                'Energy Storage Systems',                        'Gate 2 thermal and electrical safety (Section 4.3)'],
            ['UL 9540A',                'Cell-Level Thermal Runaway Testing',            'Battery thermal containment standard (Section 6.2)'],
            ['USDOT VoT Guidance 2024', 'Value of Time — Revised Departmental Guidance', 'Demand logit model calibration (Section 3.1)'],
          ]}
          caption="Table A-2. Regulatory Standards and Advisory Circulars Referenced in This Assessment."
        />
      </View>
    </Page>
  );
}
