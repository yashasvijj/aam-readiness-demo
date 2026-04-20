import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import ChartFigure from '../shared/ChartFigure';
import UpsellCallout from '../shared/UpsellCallout';
import { SIM, DOC } from '../../data/reportData';

// Colour per verdict
function cellColorStyle(verdict) {
  if (verdict === 'OPTIMAL ★')    return [S.matrixCell, S.cellNavy];
  if (verdict === 'READY')        return [S.matrixCell, S.cellGreen];
  if (verdict === 'CONDITIONAL')  return [S.matrixCell, S.cellAmber];
  if (verdict === 'NOT READY')    return [S.matrixCell, S.cellRed];
  return [S.matrixCell, S.cellGray];
}
function cellTextColor(verdict) {
  if (verdict === 'OPTIMAL ★')    return C.navy;
  if (verdict === 'READY')        return C.green;
  if (verdict === 'CONDITIONAL')  return C.amber;
  if (verdict === 'NOT READY')    return C.red;
  return C.mutedText;
}

const TRAFFIC_LABELS  = ['Low eVTOL Traffic\n(0.8% adoption)', 'Medium eVTOL Traffic\n(2.5% adoption)', 'High eVTOL Traffic\n(5.8% adoption)'];
const INFRA_LABELS    = ['Vertistop\n(2 pads)', 'Vertiport\n(4 pads)', 'Vertihub\n(8 pads)'];
const SCENARIO_KEYS   = [
  ['lo-lo',  'lo-med',  'lo-hi'],
  ['med-lo', 'med-med', 'med-hi'],
  ['hi-lo',  'hi-med',  'hi-hi'],
];

export default function S5_Simulation({ tier, charts, premium }) {
  const doc = DOC[tier];

  return (
    <>
      {/* ── Page: Simulation Methodology ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="5" title="90-Day Simulation Results" />

        <View style={S.body}>
          <Text style={S.h2}>5.1 Simulation Methodology</Text>
          <Text style={S.p}>{SIM.methodology.plainLanguage}</Text>

          <View style={S.twoCol} wrap={false}>
            <View style={S.col}>
              <View style={[S.card, S.cardBlue]}>
                <Text style={S.h3}>Technical Approach</Text>
                {[
                  SIM.methodology.approach,
                  SIM.methodology.conditions,
                ].map((t, i) => (
                  <View key={i} style={[S.methodBullet, { marginBottom: 4 }]}>
                    <Text style={S.bulletDot}>›</Text>
                    <Text style={S.bulletText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={S.col}>
              <View style={[S.card, S.cardNavy]}>
                <Text style={S.h3}>Simulation Outputs</Text>
                {[
                  'Throughput rate — % of scheduled operations completed within window',
                  'Average turnaround time (TAT) — minutes pad-in to pad-out',
                  'Peak queue depth — maximum concurrent aircraft waiting for pad',
                  'System resiliency score — % of stress events handled without service disruption',
                ].map((t, i) => (
                  <View key={i} style={[S.methodBullet, { marginBottom: 4 }]}>
                    <Text style={S.bulletDot}>›</Text>
                    <Text style={S.bulletText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* 5.2 Scenario Matrix — full JSX heatmap */}
          <Text style={S.h2}>5.2 Nine-Scenario Results Matrix</Text>
          <Text style={[S.sub, { marginBottom: 8 }]}>
            3 traffic tiers × 3 infrastructure tiers · {SIM.optimal.runs} Monte Carlo runs each · 90-day window
          </Text>

          {/* Column headers (Infrastructure tiers) */}
          <View style={S.matrixColRow}>
            {INFRA_LABELS.map((lbl, i) => (
              <View key={i} style={S.matrixColHdr}>
                <Text style={S.matrixColHdrTxt}>{lbl}</Text>
              </View>
            ))}
          </View>

          {/* Matrix rows (Traffic tiers) */}
          {TRAFFIC_LABELS.map((tLbl, ti) => (
            <View key={ti} style={[S.matrixRow, { marginBottom: 4 }]} wrap={false}>
              {/* Row label */}
              <View style={S.matrixRowLbl}>
                <Text style={S.matrixRowLblTxt}>{tLbl}</Text>
              </View>
              {/* Cells */}
              {SCENARIO_KEYS[ti].map((key, ii) => {
                const s = SIM.scenarios[key];
                return (
                  <View key={ii} style={cellColorStyle(s.verdict)}>
                    <Text style={[S.matrixCellTxt, { color: cellTextColor(s.verdict) }]}>
                      {s.verdict === 'NOT READY' ? 'NOT\nREADY' : s.verdict}
                    </Text>
                    {s.score > 0 && (
                      <Text style={[S.matrixCellSub, { color: cellTextColor(s.verdict) }]}>
                        {s.score}/100
                      </Text>
                    )}
                    {s.score > 0 && s.ci[0] > 0 && (
                      <Text style={[S.matrixCellCI, { color: cellTextColor(s.verdict) }]}>
                        CI: {s.ci[0]}–{s.ci[1]}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
          <Text style={S.tableCaption}>
            Figure {premium ? 8 : 6}. Nine-Scenario Results Matrix — Keystone Heights Airport (42J). Source: AAM Readiness System 90-day discrete-event simulation.
          </Text>
        </View>
      </Page>

      {/* ── Page: Monte Carlo + TAT Charts ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          <View style={S.twoCol}>
            <View style={S.col}>
              {charts?.monteCarlo && (
                <ChartFigure
                  src={charts.monteCarlo}
                  num={premium ? 9 : 7}
                  caption="Monte Carlo Score Distribution — Optimal Scenario (Medium + Vertiport). 95% CI: 88.2–98.2. Source: AAM Readiness System simulation."
                  height={170}
                />
              )}
            </View>
            <View style={S.col}>
              {charts?.avgTat && (
                <ChartFigure
                  src={charts.avgTat}
                  num={premium ? 10 : 8}
                  caption="Average Turnaround Time by Traffic and Infrastructure Tier (minutes). Target ≤15 min shown. Source: AAM Readiness System simulation."
                  height={170}
                />
              )}
            </View>
          </View>

          {/* Scenario detail table */}
          <Text style={S.h2}>5.3 Detailed Scenario Results</Text>
          <DataTable
            headers={['Scenario', 'Throughput', 'Avg TAT', 'Peak Queue', 'Resiliency', 'Score', 'Verdict']}
            flex={[2.5, 1.1, 1, 1.1, 1.1, 0.9, 1.5]}
            rows={Object.values(SIM.scenarios).map(s => [
              s.title,
              `${s.throughput}%`,
              `${s.avgTat} min`,
              s.queue === 0 ? '0' : s.queue.toFixed(1),
              s.resil != null ? `${s.resil}%` : '—',
              s.score > 0 ? `${s.score}/100` : '—',
              s.verdict,
            ])}
            statusCols={[6]}
            caption="Table 13. Complete Scenario Simulation Results — Keystone Heights Airport (42J). Source: AAM Readiness System 90-day discrete-event simulation, 200 Monte Carlo runs."
          />

          {!premium && (
            <UpsellCallout
              title="Premium Report: Stress Test Results + Multi-Volume Analysis"
              message="The Premium report includes the full stress test resiliency matrix across nine fault conditions (pad failure, grid failure, weather hold) and a multi-volume scaling analysis at 100%, 200%, and 500% demand."
            />
          )}
        </View>
      </Page>

      {/* ── Page: Stress Test + Multi-Volume (Premium) ── */}
      {premium && (
        <Page size="LETTER" style={S.page}>
          <DocHeader tierLabel={doc.tier} docId={doc.id} />
          <DocFooter />

          <View style={S.body}>
            <Text style={S.h2}>5.4 Stress Test Results</Text>
            <Text style={S.p}>
              Each scenario was subjected to three independent fault conditions: single pad
              failure, partial grid outage (50% capacity reduction), and weather-driven hold
              events. Resiliency scores below {SIM.stressTest.threshold}% fail Gate 1.
            </Text>

            {charts?.resiliency && (
              <ChartFigure
                src={charts.resiliency}
                num={11}
                caption="Stress Test Resiliency Scores by Scenario and Fault Type. Dashed line = 95% Gate 1 threshold. Source: AAM Readiness System simulation."
                height={180}
              />
            )}

            <Text style={S.h2}>5.5 Multi-Volume Scaling Analysis</Text>
            <Text style={S.p}>
              The multi-volume analysis evaluates system performance at demand multiples of
              1×, 2×, and 5× the base medium-traffic projection to identify the practical
              capacity ceiling for each infrastructure tier.
            </Text>

            <DataTable
              headers={['Demand Volume', 'Infrastructure', 'Throughput', 'Avg TAT', 'Peak Queue', 'Over-Capacity']}
              flex={[1.3, 1.3, 1.2, 1.1, 1.2, 1.3]}
              rows={SIM.multiVolume.map(r => [
                `${r.volume}%`,
                r.tier,
                `${r.throughput}%`,
                `${r.tat} min`,
                r.queueDepth === 0 ? '0' : r.queueDepth.toFixed(1),
                r.overCapacity ? 'YES' : 'No',
              ])}
              statusCols={[5]}
              caption="Table 14. Multi-Volume Scaling Analysis — Throughput and TAT at 100%, 200%, and 500% of Medium Traffic baseline. Source: AAM Readiness System simulation."
            />
          </View>
        </Page>
      )}
    </>
  );
}
