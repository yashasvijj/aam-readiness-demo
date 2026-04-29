import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import ChartFigure from '../shared/ChartFigure';
import UpsellCallout from '../shared/UpsellCallout';
import { DEMAND, CORRIDOR_RATIONALE, DOC } from '../../data/reportData';

// Mono-spaced formula block
function FormulaBlock({ children }) {
  return (
    <View style={{ backgroundColor: '#F5F7FA', border: `1 solid ${C.border}`, borderRadius: 4, padding: '10 14', marginVertical: 8 }}>
      {children}
    </View>
  );
}

function FormulaLine({ children, indent = 0 }) {
  return (
    <Text style={{ fontSize: 9, fontFamily: 'Helvetica', color: C.bodyText, lineHeight: 1.6, paddingLeft: indent * 12 }}>
      {children}
    </Text>
  );
}

function FormulaNote({ children }) {
  return (
    <Text style={{ fontSize: 8, fontFamily: 'Times-Italic', color: C.mutedText, marginTop: 6, lineHeight: 1.5 }}>
      {children}
    </Text>
  );
}

export default function S3_DemandAnalysis({ tier, charts, premium }) {
  const doc = DOC[tier];

  const corridorRows = DEMAND.corridors.map(c => [
    `${c.destination}${c.primary ? ' ★' : ''}`,
    `${c.distMi} mi`,
    `${c.driveMin} min`,
    `${c.eVtolMin} min`,
    c.timeSavedMin >= 0 ? `+${c.timeSavedMin} min saved` : `${c.timeSavedMin} min (no savings)`,
    `$${c.fare}`,
    `${c.modeShiftProb}%`,
  ]);

  const trafficRows = DEMAND.trafficTiers.map(t => [
    `${t.label}${t.recommended ? ' ★' : ''}`,
    `${t.adoptionPct}%`,
    t.dailyOps.toString(),
    t.annualPassengers.toLocaleString(),
    t.confidenceInterval,
  ]);

  return (
    <>
      {/* ── Page: Demand Methodology ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="3" title="Demand Analysis" />

        <View style={S.body}>
          <Text style={S.h2}>3.1 Demand Modelling Methodology</Text>
          <Text style={S.p}>
            eVTOL passenger demand at 42J was modelled using a multinomial logit mode-shift
            framework calibrated to USDOT 2024 Value of Time (VoT) guidance. The model estimates
            the probability that a traveller on each corridor switches from their current mode
            (primarily private automobile) to eVTOL, given fare, time savings, and destination
            attractiveness.
          </Text>

          {/* Mathematical Framework box */}
          <Text style={S.h3}>Mathematical Framework</Text>
          <FormulaBlock>
            <FormulaLine>Multinomial Logit Mode-Choice Model (Ben-Akiva & Lerman, 1985)</FormulaLine>
            <FormulaLine indent={0}>{' '}</FormulaLine>
            <FormulaLine>Corridor attractiveness index:</FormulaLine>
            <FormulaLine indent={1}>A_c = w₁·(PopDensity_c) + w₂·(EmpDensity_c)</FormulaLine>
            <FormulaLine indent={2}>+ w₃·(CommuteFlow_c) + w₄·max(0, ΔT_c)</FormulaLine>
            <FormulaLine indent={0}>{' '}</FormulaLine>
            <FormulaLine>Utility functions:</FormulaLine>
            <FormulaLine indent={1}>V_eVTOL = β₁·(−fare_c) + β₂·(−evtol_time_c) + β₃·(A_c) + β₄·(congestion_c)</FormulaLine>
            <FormulaLine indent={1}>V_auto  = β₁·(−auto_cost_c) + β₂·(−drive_time_c) + β₅·(parking_cost)</FormulaLine>
            <FormulaLine indent={0}>{' '}</FormulaLine>
            <FormulaLine>Mode shift probability:</FormulaLine>
            <FormulaLine indent={1}>P(eVTOL | c) = exp(V_eVTOL) / [exp(V_eVTOL) + exp(V_auto)]</FormulaLine>
            <FormulaLine indent={0}>{' '}</FormulaLine>
            <FormulaLine>Annual demand:</FormulaLine>
            <FormulaLine indent={1}>Annual_pax_c = CommuteFlow_c × P(eVTOL | c) × 365 × load_factor</FormulaLine>
            <FormulaNote>
              β coefficient values are proprietary calibration parameters maintained by the AAM Readiness System.
              The model structure follows standard transportation demand modelling practice (USDOT, 2024).
              VoT calibration: $21.10/hour personal travel (USDOT Revised Departmental Guidance 2024).
            </FormulaNote>
          </FormulaBlock>

          {/* Data inputs */}
          <DataTable
            headers={['Model Input', 'Data Source', 'Date', 'Verification']}
            flex={[2, 2.5, 1.2, 1.2]}
            rows={[
              ['Population density',       'US Census 2020 decennial count',      '2020',          'VERIFIED'],
              ['Employment flows',         'LEHD LODES8 Origin-Destination',       '2021 (latest)', 'VERIFIED'],
              ['Value of Time (VoT)',      'USDOT Revised Departmental Guidance',  '2024',          'VERIFIED'],
              ['Congestion index',         'Google Maps API travel time baseline', 'Rolling',       'VERIFIED'],
              ['Attractiveness weights',   'Proprietary composite index',          '2025',          'PROPRIETARY'],
            ]}
            statusCols={[3]}
            caption="Table 5. Demand Model Input Sources and Verification Status."
          />
        </View>
      </Page>

      {/* ── Page: Route Network + Corridor Table ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          {/* 3.2 Route Network */}
          <Text style={S.h2}>3.2 Identified Route Network</Text>
          <Text style={S.p}>
            Six corridors were assessed within a 55-mile radius of 42J using the demand model.
            The Jacksonville SW Corridor was identified as the primary demand driver, accounting
            for the largest share of projected eVTOL passengers at all three traffic adoption tiers.
          </Text>
          <Text style={[S.sub, { marginBottom: 8 }]}>
            Six corridors assessed — ★ = primary demand driver · Mode Shift = logit model probability
          </Text>

          <DataTable
            headers={['Corridor', 'Distance', 'Drive', 'eVTOL', 'Time Savings', 'Fare', 'Mode Shift']}
            flex={[2.5, 0.9, 0.9, 0.9, 1.4, 0.9, 1.1]}
            rows={corridorRows}
            caption="Table 6. eVTOL Route Network — Keystone Heights Airport (42J). Source: US Census 2020; LEHD LODES8 2021; USDOT VoT Guidance 2024."
          />

          <View style={S.twoCol}>
            <View style={S.col}>
              {charts?.modeShift && (
                <ChartFigure
                  src={charts.modeShift}
                  num={3}
                  caption="Mode Shift Probability by Corridor. Source: Multinomial logit demand model."
                  height={165}
                />
              )}
            </View>
            <View style={S.col}>
              {charts?.timeSavings && (
                <ChartFigure
                  src={charts.timeSavings}
                  num={4}
                  caption="Travel Time Savings vs. Auto (minutes). Negative value = time penalty. Source: Google Maps API baseline."
                  height={165}
                />
              )}
            </View>
          </View>
        </View>
      </Page>

      {/* ── Page: Primary Corridor + Traffic Projections ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          {/* Primary corridor detail */}
          {(() => {
            const jax = DEMAND.corridors.find(c => c.primary);
            const rationale = CORRIDOR_RATIONALE[jax?.destination];
            return jax ? (
              <View style={[S.card, S.cardNavy]} wrap={false}>
                <Text style={S.h3}>Primary Corridor: {jax.destination}</Text>
                <View style={S.twoCol}>
                  <View style={S.col}>
                    {[
                      ['Distance',      `${jax.distMi} miles`],
                      ['Drive time',    `${jax.driveMin} min (I-295 corridor)`],
                      ['eVTOL time',    `${jax.eVtolMin} minutes`],
                      ['Time saved',    `${jax.timeSavedMin} minutes`],
                    ].map(([k, v], i) => (
                      <View key={i} style={[S.methodBullet, { marginBottom: 3 }]}>
                        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.mutedText, width: 80, flexShrink: 0 }}>{k}:</Text>
                        <Text style={S.bulletText}>{v}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={S.col}>
                    {[
                      ['Fare',          `$${jax.fare}`],
                      ['Population',    jax.population.toLocaleString()],
                      ['Congestion',    `${jax.congestionIndex}/10`],
                      ['Mode shift',    `${jax.modeShiftProb}%`],
                    ].map(([k, v], i) => (
                      <View key={i} style={[S.methodBullet, { marginBottom: 3 }]}>
                        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.mutedText, width: 80, flexShrink: 0 }}>{k}:</Text>
                        <Text style={S.bulletText}>{v}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                {rationale && (
                  <>
                    <Text style={[S.gateDesc, { marginTop: 8 }]}>
                      <Text style={{ fontFamily: 'Helvetica-Bold' }}>Employment anchors: </Text>
                      {rationale.employmentAnchors}
                    </Text>
                    <Text style={[S.gateDesc, { marginTop: 4 }]}>
                      <Text style={{ fontFamily: 'Helvetica-Bold' }}>Mode-shift rationale: </Text>
                      {rationale.modeShiftRationale}
                    </Text>
                  </>
                )}
              </View>
            ) : null;
          })()}

          {/* 3.3 Traffic Projections */}
          <Text style={S.h2}>3.3 eVTOL Traffic Projections</Text>
          <Text style={S.p}>
            Three traffic scenarios are modelled corresponding to Low (P10), Medium (P50), and High
            (P90) eVTOL adoption. The Medium scenario (2.5% mode shift) is recommended as the planning
            baseline. All projections reflect Year 3 steady-state at 75% load factor.
          </Text>

          <DataTable
            headers={['Traffic Scenario', 'Adoption', 'Daily Ops', 'Annual Pax (Yr 3)', '95% CI']}
            flex={[2.5, 1, 1, 1.5, 1.2]}
            rows={trafficRows}
            highlight={0}
            caption="Table 7. eVTOL Traffic Projections by Adoption Scenario. ★ = Recommended planning baseline. Source: AAM Readiness System demand model."
          />

          {charts?.passengersByCorridor && (
            <ChartFigure
              src={charts.passengersByCorridor}
              num={5}
              caption="Annual Passenger Projections by Corridor — all traffic scenarios. Source: AAM Readiness System demand model."
              height={175}
            />
          )}

          {!premium && (
            <UpsellCallout
              title="Premium Report: Full Corridor Analysis"
              message="The Premium report provides a detailed analysis card for each of the six corridors, covering population catchment, employment anchors, peak demand windows, mode-shift rationale, and growth outlook — plus a 10-year passenger ramp-up chart across all three traffic scenarios."
            />
          )}
        </View>
      </Page>

      {/* ── Page: Sensitivity Analysis ── */}
      {(premium || tier === 'standard') && (
        <Page size="LETTER" style={S.page}>
          <DocHeader tierLabel={doc.tier} docId={doc.id} />
          <DocFooter />

          <View style={S.body}>
            <Text style={S.h2}>3.4 Sensitivity Analysis</Text>
            <Text style={S.p}>
              Demand projections were stress-tested against four scenario perturbations. Results
              show the percentage change in Year 3 annual passengers relative to the base case.
              The medium-traffic Vertiport recommendation remains viable under all scenarios except
              the most adverse adoption reduction (−50%), which still supports Vertistop operations.
            </Text>

            {charts?.sensitivityTornado && (
              <ChartFigure
                src={charts.sensitivityTornado}
                num={premium ? 7 : 6}
                caption="Sensitivity Tornado Diagram — Impact on Year 3 Annual Passengers (% change vs. base case). Source: AAM Readiness System demand model."
                height={165}
              />
            )}

            <DataTable
              headers={['Scenario', 'Pax Change', 'Direction', 'Planning Implication']}
              flex={[1.5, 1.3, 1.2, 3]}
              rows={DEMAND.sensitivityScenarios.map(s => [
                s.label,
                `${s.annualPaxChange > 0 ? '+' : ''}${s.annualPaxChange}%`,
                s.direction === 'negative' ? 'Downside risk' : s.direction === 'positive' ? 'Upside' : 'Base case',
                s.direction === 'negative'
                  ? 'Monitor fare competitiveness vs. ride-share benchmarks'
                  : s.direction === 'positive'
                  ? 'Supports Vertiport over Vertistop at maturity'
                  : 'Medium Traffic + Vertiport — recommended configuration',
              ])}
              caption="Table 8. Demand Sensitivity Analysis — Year 3 Annual Passenger Impact. Source: AAM Readiness System."
            />

            <View style={S.callout} wrap={false}>
              <Text style={S.calloutTitle}>Key Demand Finding</Text>
              <Text style={S.calloutTxt}>
                Even under the most adverse sensitivity scenario (adoption −50%), 42J generates
                sufficient demand to sustain Vertistop operations profitably. The medium-traffic
                Vertiport recommendation is robust across all four sensitivity perturbations modelled.
              </Text>
            </View>
          </View>
        </Page>
      )}

      {/* ── Pages: Premium Corridor Analysis Cards ── */}
      {premium && (
        <>
          <Page size="LETTER" style={S.page}>
            <DocHeader tierLabel={doc.tier} docId={doc.id} />
            <DocFooter />

            <View style={S.body}>
              <Text style={S.h2}>3.2 Why Each Corridor Was Selected</Text>
              <Text style={S.p}>
                The following analysis provides the demand rationale for each of the six corridors,
                addressing population served, primary trip purposes, key employment anchors, and
                mode-shift probability drivers.
              </Text>

              {DEMAND.corridors.slice(0, 3).map((c, i) => {
                const rat = CORRIDOR_RATIONALE[c.destination];
                if (!rat) return null;
                return (
                  <View key={i} style={[S.card, i === 0 ? S.cardNavy : i === 1 ? S.cardBlue : S.cardGreen]} wrap={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <Text style={S.h3}>{c.destination}</Text>
                      <View style={[S.badge, i === 0 ? S.badgePass : S.badgeCond]}>
                        <Text>{rat.status}</Text>
                      </View>
                    </View>
                    <View style={S.twoCol}>
                      <View style={S.col}>
                        {[
                          ['Population', c.population.toLocaleString()],
                          ['Trip purposes', rat.tripPurposes],
                          ['Mode shift', `${c.modeShiftProb}%`],
                          ['Peak window', rat.peakWindow],
                        ].map(([k, v], j) => (
                          <View key={j} style={[S.methodBullet, { marginBottom: 4 }]}>
                            <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.mutedText, width: 80, flexShrink: 0 }}>{k}:</Text>
                            <Text style={[S.bulletText, { fontSize: 8 }]}>{v}</Text>
                          </View>
                        ))}
                      </View>
                      <View style={S.col}>
                        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.mutedText, marginBottom: 3 }}>Employment anchors:</Text>
                        <Text style={[S.bulletText, { fontSize: 8, marginBottom: 6 }]}>{rat.employmentAnchors}</Text>
                        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.mutedText, marginBottom: 3 }}>Mode-shift rationale:</Text>
                        <Text style={[S.bulletText, { fontSize: 8 }]}>{rat.modeShiftRationale}</Text>
                      </View>
                    </View>
                    {rat.growthNote && (
                      <Text style={[S.gateDesc, { marginTop: 6, color: C.blue, fontStyle: 'italic' }]}>
                        Growth outlook: {rat.growthNote}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </Page>

          <Page size="LETTER" style={S.page}>
            <DocHeader tierLabel={doc.tier} docId={doc.id} />
            <DocFooter />

            <View style={S.body}>
              {DEMAND.corridors.slice(3).map((c, i) => {
                const rat = CORRIDOR_RATIONALE[c.destination];
                if (!rat) return null;
                return (
                  <View key={i} style={[S.card, S.cardBlue]} wrap={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <Text style={S.h3}>{c.destination}</Text>
                      <View style={[S.badge, S.badgeCond]}>
                        <Text>{rat.status}</Text>
                      </View>
                    </View>
                    <View style={S.twoCol}>
                      <View style={S.col}>
                        {[
                          ['Population', c.population.toLocaleString()],
                          ['Trip purposes', rat.tripPurposes],
                          ['Mode shift', `${c.modeShiftProb}%`],
                        ].map(([k, v], j) => (
                          <View key={j} style={[S.methodBullet, { marginBottom: 4 }]}>
                            <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.mutedText, width: 80, flexShrink: 0 }}>{k}:</Text>
                            <Text style={[S.bulletText, { fontSize: 8 }]}>{v}</Text>
                          </View>
                        ))}
                      </View>
                      <View style={S.col}>
                        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.mutedText, marginBottom: 3 }}>Mode-shift rationale:</Text>
                        <Text style={[S.bulletText, { fontSize: 8, marginBottom: 6 }]}>{rat.modeShiftRationale}</Text>
                        {rat.growthNote && (
                          <Text style={[S.bulletText, { fontSize: 8, color: C.blue, fontStyle: 'italic' }]}>
                            Growth outlook: {rat.growthNote}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}

              {/* Premium chart: Passenger ramp-up */}
              {charts?.passengerRampUp && (
                <ChartFigure
                  src={charts.passengerRampUp}
                  num="P5"
                  caption="Annual Passenger Ramp-Up — Year 1 to Year 10, all traffic scenarios. Source: AAM Readiness System demand and revenue model."
                  height={175}
                />
              )}
            </View>
          </Page>
        </>
      )}

    </>
  );
}
