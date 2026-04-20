import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import ChartFigure from '../shared/ChartFigure';
import UpsellCallout from '../shared/UpsellCallout';
import { INFRA, DOC } from '../../data/reportData';

export default function S4_Infrastructure({ tier, charts, premium }) {
  const doc = DOC[tier];

  const eb105Rows = INFRA.eb105.map(row => [
    row.tier,
    row.pads.toString(),
    row.areaRequiredSqFt.toLocaleString(),
    row.areaAvailSqFt.toLocaleString(),
    row.eb105Status,
    row.upgradeEst,
  ]);

  const arffRows = INFRA.eb105.map(row => [
    row.tier,
    row.arff,
    row.arffNote,
  ]);

  const powerRows = INFRA.grid.powerDemands.map(d => [
    d.tier,
    `${d.peakMW} MW`,
    `${INFRA.grid.headroomMW} MW (est.)`,
    d.peakMW < INFRA.grid.headroomMW ? 'PASS' : 'FAIL',
    d.peakMW < INFRA.grid.headroomMW
      ? `${((INFRA.grid.headroomMW - d.peakMW) * 1000).toFixed(0)} kW margin`
      : `${((d.peakMW - INFRA.grid.headroomMW) * 1000).toFixed(0)} kW shortfall`,
  ]);

  const currentVsReqRows = INFRA.currentVsRequired.map(r => [
    r.item,
    r.current,
    r.vertistop,
    r.vertiport,
    r.vertihub,
  ]);

  return (
    <>
      {/* ── Page: EB-105 Compliance ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="4" title="Infrastructure Assessment" />

        <View style={S.body}>
          <Text style={S.h2}>4.1 FAA EB-105 Ramp Geometry Compliance</Text>
          <Text style={S.p}>
            FAA Engineering Brief 105 (EB-105) establishes minimum ramp area requirements for
            eVTOL infrastructure, including FATO (Final Approach and Takeoff Area) and TLOF
            (Touchdown and Liftoff Area) dimensions scaled to pad count. The B SOUTH ramp at
            42J (18,000 sq ft available) was assessed against all three infrastructure tiers.
          </Text>

          <DataTable
            headers={['Tier', 'Pads', 'Required (sq ft)', 'Available (sq ft)', 'EB-105 Status', 'Est. Upgrade']}
            flex={[1.2, 0.6, 1.5, 1.5, 1.5, 1.5]}
            rows={eb105Rows}
            statusCols={[4]}
            caption="Table 8. FAA EB-105 §4.2 Ramp Area Compliance — Keystone Heights Airport (42J). Source: FAA Engineering Brief 105 §4.2; AAM Readiness System site assessment."
          />

          <View style={[S.calloutAmber]} wrap={false}>
            <Text style={S.calloutTitleAmber}>Regulatory Note — EB-105 §4.2</Text>
            <Text style={S.calloutTxtAmber}>
              The Vertiport (4-pad) scenario shows a ~4% ramp area shortfall (18,000 sq ft
              available vs. 18,838 sq ft required). This is achievable within the existing
              B SOUTH ramp footprint through minor reconfiguration estimated at $150K–$300K.
              No new apron construction is required for Vertistop or Vertiport tiers.
              The Vertihub (8-pad) scenario passes EB-105 geometry but fails the ARFF
              gate — see Section 4.2.
            </Text>
          </View>

          {/* 4.2 ARFF */}
          <Text style={S.h2}>4.2 Aircraft Rescue and Fire Fighting (ARFF)</Text>
          <Text style={S.p}>
            FAA Advisory Circular 150/5210-6D defines ARFF capability requirements for airports
            accommodating eVTOL operations. Keystone Heights Airport currently maintains an
            Index A GA ARFF unit with mutual aid from Clay County Fire Rescue.
          </Text>

          <DataTable
            headers={['Infrastructure Tier', 'ARFF Gate', 'Assessment Note']}
            flex={[1.5, 0.9, 3.5]}
            rows={arffRows}
            statusCols={[1]}
            caption="Table 9. ARFF Capability Assessment by Infrastructure Tier. Source: FAA AC 150/5210-6D §3.2–§3.4; AAM Readiness System gate framework."
          />

          {!premium && (
            <UpsellCallout
              title="Standard Report: Full Infrastructure Gap Analysis"
              message="The Standard report includes a current-vs-required infrastructure comparison table across all three vertiport tiers, plus UTM ground infrastructure specifications and cost estimates."
            />
          )}
        </View>
      </Page>

      {/* ── Page: Grid Assessment ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          <Text style={S.h2}>4.3 Electrical Grid Assessment</Text>
          <Text style={S.p}>
            Peak electrical demand for eVTOL charging infrastructure was modelled against
            available grid capacity from Clay County Electric Cooperative. Available headroom
            is estimated at {INFRA.grid.headroomMW} MW — this figure requires utility
            verification before federal grant submission.
          </Text>

          <View style={[S.calloutAmber]} wrap={false}>
            <Text style={S.calloutTitleAmber}>Data Confidence — Grid Capacity</Text>
            <Text style={S.calloutTxtAmber}>
              The {INFRA.grid.headroomMW} MW grid headroom figure is an airport-class estimate.
              {' '}{INFRA.grid.verificationNote} The Vertistop and Vertiport scenarios both pass
              the Gate 2 power check with this estimate, providing reasonable confidence in
              the recommended configuration.
            </Text>
          </View>

          {charts?.peakPower && (
            <ChartFigure
              src={charts.peakPower}
              num={premium ? 7 : 5}
              caption="Peak Electrical Demand vs. Grid Capacity by Infrastructure Tier. The 0.8 MW available headroom (dashed line) is an estimated figure — utility verification recommended. Source: AAM Readiness System infrastructure engine; NFPA 855 §9.4; FAA EB-105 Appendix E."
              source="Clay County Electric Cooperative — airport class estimate"
              height={200}
            />
          )}

          <DataTable
            headers={['Infrastructure Tier', 'Peak Demand', 'Grid Available', 'Gate 2', 'Margin / Shortfall']}
            flex={[2, 1.2, 1.4, 1, 1.8]}
            rows={powerRows}
            statusCols={[3]}
            caption="Table 10. Gate 2 Power Check — Peak eVTOL Charging Demand vs. Grid Capacity. Source: AAM Readiness System infrastructure engine; NFPA 855 §9.4."
          />

          <Text style={[S.p, { marginTop: 8 }]}>
            The regulatory basis for the power assessment is NFPA 855 §9.4 (energy storage system
            electrical requirements) and FAA EB-105 Appendix E (grid assessment methodology for
            vertiport development). Thermal management requirements per NFPA 855 §12.5 and
            UL 9540A are addressed through standard suppression systems includable in the
            project CAPEX at no additional gate impact.
          </Text>

          {/* UTM section — Standard and Premium only */}
          {tier !== 'preliminary' && (
            <>
              <Text style={S.h2}>4.4 UTM Ground Infrastructure</Text>
              <Text style={S.p}>
                eVTOL operations at 42J require integration with a FAA-approved UTM USS
                (UAS Service Supplier) provider per the FAA BEYOND program framework.
                Ground infrastructure requirements include ADS-B receiver, UTM datalink
                transceiver, and a network-connected operations console.
              </Text>
              <DataTable
                headers={['Item', 'Specification']}
                flex={[2, 4]}
                rows={[
                  ['UTM Status',          INFRA.utm.status],
                  ['Requirement',         INFRA.utm.requirement],
                  ['Ground Infrastructure', INFRA.utm.groundInfra],
                  ['Estimated Cost',      INFRA.utm.estimatedCost],
                  ['Implementation Phase', INFRA.utm.timeline],
                  ['Regulatory Basis',   INFRA.utm.regulatoryBasis],
                ]}
                caption="Table 11. UTM Ground Infrastructure Requirements — Keystone Heights Airport (42J). Source: FAA Order JO 7900.9; ASTM F3411; FAA BEYOND Program."
              />
            </>
          )}
        </View>
      </Page>

      {/* ── Page: Current vs Required (Premium) ── */}
      {premium && (
        <Page size="LETTER" style={S.page}>
          <DocHeader tierLabel={doc.tier} docId={doc.id} />
          <DocFooter />

          <View style={S.body}>
            <Text style={S.h2}>4.5 Current vs. Required Infrastructure Matrix</Text>
            <Text style={S.p}>
              The following matrix compares existing airport infrastructure against the
              requirements of each vertiport tier. Costs shown are incremental upgrade estimates
              using RS Means 2025 construction cost indices.
            </Text>

            <DataTable
              headers={['Infrastructure Item', 'Current Status', 'Vertistop', 'Vertiport ★', 'Vertihub']}
              flex={[2, 2, 1.5, 1.5, 1.5]}
              rows={currentVsReqRows}
              highlight={3}
              caption="Table 12. Current vs. Required Infrastructure by Tier. ★ = Recommended configuration. Source: RS Means Site Work and Electrical 2025; FAA EB-105; AAM Readiness System infrastructure engine."
            />

            <View style={[S.card, S.cardGreen]} wrap={false}>
              <Text style={S.h3}>Infrastructure Summary — Recommended Configuration</Text>
              <Text style={[S.p, { marginBottom: 4 }]}>
                The Vertiport (4-pad) configuration at 42J requires three primary upgrades:
              </Text>
              {[
                `Ramp reconfiguration — B SOUTH: ~$250K to achieve EB-105 §4.2 compliance within existing footprint.`,
                `Grid distribution line — +0.08 MW: estimated $180K to extend airport substation service to Vertiport pad locations.`,
                `UTM ground infrastructure — $110K for ADS-B receiver, datalink transceiver, and operations console.`,
              ].map((pt, i) => (
                <View key={i} style={S.methodBullet}>
                  <Text style={S.bulletDot}>›</Text>
                  <Text style={S.bulletText}>{pt}</Text>
                </View>
              ))}
              <Text style={[S.p, { marginTop: 8, marginBottom: 0 }]}>
                No ARFF upgrade is required. Existing Index A capability is adequate for Vertiport
                operations per FAA AC 150/5210-6D §3.2. This represents a significant capital
                advantage over competing sites requiring dedicated ARFF stations.
              </Text>
            </View>
          </View>
        </Page>
      )}
    </>
  );
}
