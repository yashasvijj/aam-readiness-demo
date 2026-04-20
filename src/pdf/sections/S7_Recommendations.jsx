import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import ChartFigure from '../shared/ChartFigure';
import UpsellCallout from '../shared/UpsellCallout';
import { RECS, NPV, DOC } from '../../data/reportData';

export default function S7_Recommendations({ tier, charts, premium }) {
  const doc = DOC[tier];

  const totalCapex = RECS.capex.reduce((sum, r) => sum + r.cost, 0);

  const fundingRows = RECS.federalFunding.map(f => [
    f.program,
    f.agency,
    f.awardRange,
    f.eligibility,
    f.matching,
    f.appWindow,
  ]);

  return (
    <>
      {/* ── Page: Optimal Configuration + Roadmap ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="7" title="Recommendations and Implementation" />

        <View style={S.body}>
          <Text style={S.h2}>7.1 Recommended Configuration</Text>
          <Text style={S.p}>
            Based on the 90-day simulation results and two-gate safety framework, the
            recommended configuration for Keystone Heights Airport (42J) is a{' '}
            <Text style={{ fontFamily: 'Times-Bold' }}>Vertiport with Medium eVTOL Traffic</Text>{' '}
            — the highest-scoring scenario (93/100) that passes both Gate 1 (Safety &amp;
            Regulatory) and Gate 2 (Power &amp; Grid Resiliency). This configuration
            achieves 100% throughput efficiency with zero queue events across the
            90-day simulation window.
          </Text>

          <DataTable
            headers={['Configuration Parameter', 'Specification', 'Basis']}
            flex={[2, 1.5, 3]}
            rows={RECS.optimalConfig.map(r => [r.parameter, r.spec, r.basis])}
            highlight={1}
            caption="Table 15. Recommended Configuration Specification — Medium Traffic + Vertiport. Source: AAM Readiness System scoring engine; FAA EB-105; RS Means 2025."
          />

          <Text style={S.h2}>7.2 Phased Implementation Roadmap</Text>
          <Text style={[S.sub, { marginBottom: 8 }]}>
            Total CAPEX: $4.1M–$5.4M across 36 months · Phase-gated to match demand ramp-up
          </Text>

          <View style={S.timeline} wrap={false}>
            {RECS.phases.map(p => (
              <View key={p.num} style={[S.phase, { borderTop: `3 solid ${p.color}` }]}>
                <View style={[S.phaseDot, { backgroundColor: p.color }]}>
                  <Text style={S.phaseDotTxt}>{p.num}</Text>
                </View>
                <Text style={S.phaseTitle}>{p.title}</Text>
                <Text style={S.phaseMonths}>{p.months}</Text>
                <Text style={S.phaseCapex}>{p.capex}</Text>
                {p.deliverables.slice(0, 3).map((d, i) => (
                  <Text key={i} style={S.phaseItem}>› {d}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* ── Page: CAPEX Breakdown + Financial Projection ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          <Text style={S.h2}>7.3 CAPEX Breakdown</Text>

          {charts?.capexBreakdown && (
            <ChartFigure
              src={charts.capexBreakdown}
              num={premium ? 13 : 10}
              caption="Program CAPEX Breakdown — Vertiport Configuration (36-month phased deployment). Source: RS Means Site Work §02 00 00 and Electrical §26 00 00, 2025 Q4; AAM Readiness System infrastructure engine."
              height={180}
            />
          )}

          <DataTable
            headers={['CAPEX Item', 'Estimate ($M)', 'Unit Basis']}
            flex={[2, 1, 3.5]}
            rows={[
              ...RECS.capex.map(r => [r.item, `$${r.cost.toFixed(2)}M`, r.unitBasis]),
              ['TOTAL PROGRAM CAPEX', `$${totalCapex.toFixed(2)}M`, 'Phased over 36 months'],
            ]}
            highlight={2}
            caption="Table 16. Program CAPEX Breakdown — Vertiport Configuration. Source: RS Means Construction Cost Data 2025 Q4; AAM Readiness System infrastructure engine."
          />

          <Text style={S.h2}>7.4 Financial Projections</Text>
          <Text style={[S.sub, { marginBottom: 6 }]}>
            10-year revenue model · Medium Traffic baseline · $M annual
          </Text>

          {premium ? (
            <>
              {charts?.allTiersProjection && (
                <ChartFigure
                  src={charts.allTiersProjection}
                  num={14}
                  caption="10-Year Revenue Projections by Traffic Scenario — Low (0.8%), Medium (2.5%), High (5.8%) adoption. Source: AAM Readiness System demand and revenue model."
                  height={180}
                />
              )}
            </>
          ) : (
            <>
              {charts?.financialProjection && (
                <ChartFigure
                  src={charts.financialProjection}
                  num={11}
                  caption="10-Year Revenue Projection — Medium Traffic Scenario with conservative and optimistic bands. Break-even at Year 4–5 under base case. Source: AAM Readiness System demand and revenue model."
                  height={190}
                />
              )}
            </>
          )}

          <DataTable
            headers={['Revenue Assumption', 'Value', 'Basis']}
            flex={[2, 1.5, 3]}
            rows={RECS.revenueAssumptions.map(r => [r.metric, r.value, r.basis])}
            caption="Table 17. Revenue Model Assumptions. Source: eVTOL market rate survey 2025; commercial EV charging benchmark; AAM Readiness System demand model."
          />

          {/* Premium: CAPEX by scenario chart */}
          {premium && charts?.capexByScenario && (
            <ChartFigure
              src={charts.capexByScenario}
              num="P14"
              caption="Program CAPEX Range by Traffic Scenario. Source: RS Means 2025 Q4; AAM Readiness System infrastructure engine."
              height={165}
            />
          )}

          {/* Premium: NPV Analysis Table */}
          {premium && (
            <>
              <Text style={[S.h2, { marginTop: 16 }]}>7.4.1 Net Present Value Analysis</Text>
              <Text style={S.p}>
                The 10-year NPV of economic benefits — including time savings (USDOT VoT $21.10/hr),
                regional connectivity, and employment generation — was calculated at three discount
                rates for each traffic scenario. The USDOT RAISE program requires a benefit-cost
                ratio ≥ 1.0:1 at a 7% discount rate.
              </Text>
              <DataTable
                headers={['Traffic Scenario', 'Discount Rate', '10-Year NPV', 'B/C Ratio', 'RAISE Threshold Met']}
                flex={[2, 1.2, 1.2, 1, 1.8]}
                rows={NPV.scenarios.flatMap(s =>
                  s.discountRates.map((d, i) => [
                    i === 0 ? s.label : '',
                    d.rate,
                    d.npv,
                    d.bcr,
                    parseFloat(d.bcr) >= NPV.bcaThreshold ? 'YES' : 'NO',
                  ])
                )}
                statusCols={[4]}
                caption="Table 18. Net Present Value Analysis — 10-Year Economic Benefits. Total investment basis: $5.75M. Source: AAM Readiness System demand and revenue model; USDOT VoT Guidance 2024."
              />
              <Text style={[S.captionItalic, { textAlign: 'left', marginTop: 4 }]}>
                {NPV.note}
              </Text>
            </>
          )}
        </View>
      </Page>

      {/* ── Page: Federal Funding ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          <Text style={S.h2}>7.5 Federal Funding Pathways</Text>
          <Text style={S.p}>
            Three federal grant programs are confirmed eligible for the proposed Vertiport
            development at 42J. Combined available funding (FAA RAISE + AIP) totals up to
            $30M — significantly exceeding the $4.1M–$5.4M program CAPEX. The airport
            is positioned to pursue a zero-gap financing strategy with local match requirements
            of 10–20%.
          </Text>

          <DataTable
            headers={['Program', 'Agency', 'Award Range', 'Eligibility', 'Match Required', 'Application Window']}
            flex={[1, 1, 1.5, 1, 1.2, 1.8]}
            rows={fundingRows}
            caption="Table 18. Federal Funding Pathways — Keystone Heights Airport (42J) eVTOL Vertiport. Source: USDOT RAISE Program; FAA AIP Program; USDOT SCASDP."
          />

          {/* Detail cards for each program */}
          {RECS.federalFunding.map((f, i) => (
            <View key={i} style={[S.card, i === 0 ? S.cardGreen : i === 1 ? S.cardBlue : S.cardNavy]} wrap={false}>
              <Text style={S.h3}>{f.program} — {f.agency}</Text>
              <Text style={[S.gateDesc, { marginBottom: 4 }]}>
                Award range: {f.awardRange} · Match: {f.matching} · Window: {f.appWindow}
              </Text>
              <Text style={[S.gateDesc, { marginBottom: 2 }]}>
                Key contact: {f.keyContact}
              </Text>
              <Text style={S.gateDesc}>
                Required documentation: {f.docReqs}
              </Text>
              {premium && (
                <Text style={[S.gateDesc, { marginTop: 4, color: C.blue }]}>
                  Report sections supporting application: {f.fromReport}
                </Text>
              )}
            </View>
          ))}

          {!premium && (
            <UpsellCallout
              title="Premium Report: Ready-to-Submit Grant Language Pack"
              message="Appendix D of the Premium report contains pre-drafted BCA Summary, Needs Assessment narrative, and Equity Analysis — formatted for direct submission to USDOT RAISE and FAA AIP applications."
            />
          )}
        </View>
      </Page>
    </>
  );
}
