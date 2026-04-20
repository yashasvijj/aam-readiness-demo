import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import ChartFigure from '../shared/ChartFigure';
import UpsellCallout from '../shared/UpsellCallout';
import { GATES, SIM, INFRA, DOC } from '../../data/reportData';

function StatusBadge({ value }) {
  if (!value) return null;
  const normalized = value.toUpperCase();
  let style = S.badgeCond;
  if (normalized === 'PASS')        style = S.badgePass;
  else if (normalized === 'FAIL')   style = S.badgeFail;
  else if (normalized === 'CONDITIONAL') style = S.badgeCond;
  return (
    <View style={[S.badge, style, { alignSelf: 'flex-start' }]}>
      <Text>{normalized}</Text>
    </View>
  );
}

// Premium: "How this check is calculated" box
function CalcBox({ children }) {
  return (
    <View style={{ backgroundColor: '#F5F7FA', border: `1 solid ${C.border}`, borderRadius: 3, padding: '8 12', marginTop: 6 }}>
      <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.mutedText, letterSpacing: 1, marginBottom: 4 }}>
        HOW THIS CHECK IS CALCULATED
      </Text>
      {children}
    </View>
  );
}

function CalcLine({ children, indent = 0 }) {
  return (
    <Text style={{ fontSize: 8, fontFamily: 'Helvetica', color: C.bodyText, lineHeight: 1.6, paddingLeft: indent * 10 }}>
      {children}
    </Text>
  );
}

function GateCheck({ chk, idx, last, premium }) {
  return (
    <View
      style={[
        S.gateRow,
        last ? S.gateRowLast : {},
        { paddingVertical: 10 },
      ]}
      wrap={false}
    >
      <View style={{ flex: 2, paddingRight: 12 }}>
        <Text style={S.gateTitle}>{chk.check}</Text>
        <Text style={S.gateBasis}>{chk.regulatoryBasis}</Text>
        <Text style={[S.gateDesc, { marginTop: 4 }]}>Threshold: {chk.threshold}</Text>
        <Text style={S.gateDesc}>42J status: {chk.value42J}</Text>
      </View>
      <View style={{ flex: 1.8, flexDirection: 'row', gap: 6 }}>
        {[
          { label: 'Vertistop', status: chk.low,  note: chk.lowNote },
          { label: 'Vertiport', status: chk.med,  note: chk.medNote },
          { label: 'Vertihub',  status: chk.high, note: chk.highNote },
        ].map((col, j) => (
          <View key={j} style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 7, color: C.mutedText, marginBottom: 3, textAlign: 'center' }}>{col.label}</Text>
            <StatusBadge value={col.status} />
            {col.note ? (
              <Text style={{ fontSize: 7, color: C.mutedText, marginTop: 3, textAlign: 'center', lineHeight: 1.5 }}>
                {col.note}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function S6_GateAnalysis({ tier, charts, premium }) {
  const doc = DOC[tier];

  return (
    <>
      {/* ── Page: Gate 1 ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="6" title="Readiness Score and Gate Analysis" />

        <View style={S.body}>
          {/* Score summary */}
          <View style={[S.statRow, { marginBottom: 14 }]}>
            {[
              { val: `${SIM.optimal.mean}/100`, lbl: 'Readiness Index', color: C.navy },
              { val: `${SIM.optimal.ci95[0]}–${SIM.optimal.ci95[1]}`, lbl: '95% CI', color: C.blue },
              { val: `${SIM.scenarios['med-med'].throughput}%`, lbl: 'Throughput (Optimal)', color: C.green },
              { val: '5/9', lbl: 'Scenarios Passing', color: C.amber },
            ].map((s, i, arr) => (
              <View key={i} style={[S.statChip, i === arr.length - 1 ? S.statChipLast : {}]}>
                <Text style={[S.statChipVal, { color: s.color }]}>{s.val}</Text>
                <Text style={S.statChipLbl}>{s.lbl}</Text>
              </View>
            ))}
          </View>

          <Text style={S.h2}>{GATES.gate1.title}</Text>
          <Text style={[S.p, { marginBottom: 8 }]}>{GATES.gate1.description}</Text>

          {GATES.gate1.checks.slice(0, 2).map((chk, i) => (
            <GateCheck key={i} chk={chk} idx={i} last={false} premium={premium} />
          ))}
        </View>
      </Page>

      {/* ── Page: Gate 1 continued ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          {GATES.gate1.checks.slice(2).map((chk, i) => (
            <GateCheck key={i} chk={chk} idx={i + 2} last={i === GATES.gate1.checks.slice(2).length - 1} premium={premium} />
          ))}

          {/* Premium: EB-105 calculation logic */}
          {premium && (
            <CalcBox>
              <CalcLine>EB-105 §4.2 Ramp Geometry Check — Vertiport Example:</CalcLine>
              <CalcLine indent={1}>Required FATO/TLOF area = f(pad count, aircraft class D_to_D)</CalcLine>
              <CalcLine indent={1}>Vertiport (4 pads): 18,838 sq ft required per EB-105 §4.2 geometry tables</CalcLine>
              <CalcLine indent={1}>Available at B SOUTH: 18,000 sq ft</CalcLine>
              <CalcLine indent={1}>Shortfall: 838 sq ft (~4.4%) → CONDITIONAL status</CalcLine>
              <CalcLine indent={1}>Resolution: minor ramp reconfiguration within existing footprint (~$250K)</CalcLine>
              <Text style={{ fontSize: 8, fontFamily: 'Times-Italic', color: C.mutedText, marginTop: 5 }}>
                Note: The ramp area requirement formula parameters are derived from FAA EB-105 Table 4-1.
                Exact input values (D_to_D spacing, safety area multipliers) follow published EB-105 guidance.
              </Text>
            </CalcBox>
          )}

          <Text style={[S.h2, { marginTop: 16 }]}>{GATES.gate2.title}</Text>
          <Text style={[S.p, { marginBottom: 8 }]}>{GATES.gate2.description}</Text>

          {GATES.gate2.checks.slice(0, 2).map((chk, i) => (
            <GateCheck key={i} chk={chk} idx={i} last={false} premium={premium} />
          ))}

          {/* Premium: Grid calculation logic */}
          {premium && (
            <CalcBox>
              <CalcLine>Gate 2 — Grid Capacity Check (Vertiport):</CalcLine>
              <CalcLine indent={1}>Peak demand = N_pads × charger_rated_kW × coincidence_factor</CalcLine>
              <CalcLine indent={1}>            = 4 pads × 150 kW × [proprietary coincidence factor]</CalcLine>
              <CalcLine indent={1}>            = 510 kW = 0.51 MW (per AAM Readiness System model)</CalcLine>
              <CalcLine indent={0}> </CalcLine>
              <CalcLine indent={1}>Available headroom: 0.80 MW (estimated — Clay County Electric Cooperative)</CalcLine>
              <CalcLine indent={1}>Gate check: 0.51 MW &lt; 0.80 MW → PASS    Margin: 0.29 MW (290 kW)</CalcLine>
              <Text style={{ fontSize: 8, fontFamily: 'Times-Italic', color: C.mutedText, marginTop: 5 }}>
                Note: The coincidence factor value is proprietary to the AAM Readiness System.
                It reflects simultaneous charging probability under realistic dispatch patterns.
                The 0.51 MW figure represents the model output; the coincidence factor is not disclosed.
              </Text>
            </CalcBox>
          )}
        </View>
      </Page>

      {/* ── Page: Gate 2 continued + Efficiency Score ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          {GATES.gate2.checks.slice(2).map((chk, i) => (
            <GateCheck key={i} chk={chk} idx={i + 2} last={true} premium={premium} />
          ))}

          {/* CI Comparison — Premium */}
          {premium && charts?.ciComparison && (
            <ChartFigure
              src={charts.ciComparison}
              num="P6"
              caption="95% Confidence Intervals — Passing Scenario Readiness Scores. 200 Monte Carlo runs per scenario. Source: AAM Readiness System simulation."
              height={165}
            />
          )}

          {/* Efficiency Score */}
          <Text style={[S.h2, { marginTop: 14 }]}>6.3 Efficiency Score Breakdown</Text>
          <Text style={S.p}>
            The Readiness Index of {GATES.efficiencyScore.final}/100 (95% CI: {GATES.efficiencyScore.ci95[0]}–{GATES.efficiencyScore.ci95[1]})
            is derived from three composite components under the optimal scenario (Medium Traffic + Vertiport).
            Component weights are proprietary to the AAM Readiness System scoring methodology.
          </Text>

          {charts?.efficiencyBreakdown && (
            <ChartFigure
              src={charts.efficiencyBreakdown}
              num={premium ? 'P7' : 9}
              caption="Readiness Score Component Breakdown — Optimal Configuration. Component weights are proprietary and not disclosed. Source: AAM Readiness System."
              height={150}
            />
          )}

          {/* Premium: Component narrative */}
          {premium && (
            <>
              {[
                {
                  comp: GATES.efficiencyScore.components[0],
                  narrative: 'This component rewards 100% throughput with zero queue events and penalizes average turnaround times above the 15-minute EB-105 target. The current 22.3-minute average TAT reflects the charging time floor for 100–200 kWh lithium-ion battery packs at 150 kW charge rate — a structural feature of current eVTOL technology, not a pad-level congestion constraint.',
                },
                {
                  comp: GATES.efficiencyScore.components[1],
                  narrative: 'This component evaluates ease of UTM integration given airspace class, ATC infrastructure, and military coordination complexity. Class G uncontrolled airspace at 42J is favorable — no ATC clearance requirements simplify USS integration. The Camp Blanding LOA adds coordination complexity but also provides a proven federal LOA framework directly applicable to UTM agreements.',
                },
                {
                  comp: GATES.efficiencyScore.components[2],
                  narrative: 'This component evaluates how well the airport\'s location captures available corridor demand. The primary Jacksonville SW corridor is strong (congestion index 8.4, high employment density). The Gainesville corridor\'s marginal time savings creates a structural ceiling. Demand Capture is the most improvable component as eVTOL technology matures and fares decrease.',
                },
              ].map(({ comp, narrative }, i) => (
                <View key={i} style={[S.card, S.cardBlue, { marginBottom: 8 }]} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy }}>{comp.label}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.navy }}>{comp.score}/100</Text>
                  </View>
                  <Text style={S.gateDesc}>{narrative}</Text>
                </View>
              ))}
            </>
          )}

          {!premium && (
            <View style={[S.card, S.cardBlue]} wrap={false}>
              <Text style={S.h3}>Score Component Summary</Text>
              {GATES.efficiencyScore.components.map((c, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={[S.gateDesc, { flex: 1 }]}>{c.label}</Text>
                  <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy }}>{c.score}/100</Text>
                </View>
              ))}
              <View style={[S.divider, { marginVertical: 8 }]} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.navy }}>Readiness Index</Text>
                <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.navy }}>{GATES.efficiencyScore.final}/100</Text>
              </View>
              <Text style={[S.gateDesc, { marginTop: 6, fontStyle: 'italic' }]}>
                {GATES.efficiencyScore.weightNote}
              </Text>
            </View>
          )}

          {!premium && (
            <UpsellCallout
              title="Premium Report: Score Component Narrative + Calculation Logic"
              message="The Premium report provides a plain-language explanation of each score component, calculation logic for every gate check, and confidence interval comparison charts across all five passing scenarios."
            />
          )}
        </View>
      </Page>
    </>
  );
}
