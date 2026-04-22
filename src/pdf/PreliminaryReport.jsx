import { Document, Page, View, Text } from '@react-pdf/renderer';
import { S, C } from './styles';
import CoverPage from './CoverPage';
import TableOfContents from './sections/TableOfContents';
import DocHeader from './shared/DocHeader';
import DocFooter from './shared/DocFooter';
import SectionBanner from './shared/SectionBanner';
import DataTable from './shared/DataTable';
import UpsellCallout from './shared/UpsellCallout';
import { DOC, AIRPORT, OPS, DEMAND, INFRA, SIM, GATES, RECS, SUMMARY } from '../data/reportData';

const doc = DOC.preliminary;

// ── Condensed section: Airport Overview ──────────────────────────────────────
function PrelimAirportOverview() {
  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="2" title="Airport Profile" />

      <View style={S.body}>
        <Text style={S.h2}>2.1 Airport Overview</Text>

        <View style={S.statRow}>
          {[
            { val: OPS.totalOps.toLocaleString(), lbl: 'Baseline Ops (22 mo)', color: C.navy },
            { val: OPS.militaryVtol.toLocaleString(), lbl: 'Military VTOL Ops',   color: C.green },
            { val: OPS.avgDailyOps.toString(),     lbl: 'Avg Daily Ops',         color: C.blue },
            { val: OPS.peakSingleDay.toString(),   lbl: 'Peak Day (Feb 2026)',   color: C.amber },
          ].map((s, i, arr) => (
            <View key={i} style={[S.statChip, i === arr.length - 1 ? S.statChipLast : {}]}>
              <Text style={[S.statChipVal, { color: s.color }]}>{s.val}</Text>
              <Text style={S.statChipLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>

        <Text style={S.p}>
          Keystone Heights Airport (42J) is a public-use general aviation airport in Clay County,
          Florida, operating in Class G uncontrolled airspace. The airport has an active LOA with
          Camp Blanding Joint Training Center for military helicopter operations — establishing
          VTOL precedent under FAA oversight. {OPS.militaryVtol.toLocaleString()} military
          helicopter operations were recorded during the assessment period.
        </Text>

        <DataTable
          headers={['Key Parameter', 'Value']}
          flex={[2, 4]}
          rows={[
            ['FAA Identifier', `${AIRPORT.icao} — ${AIRPORT.city}, ${AIRPORT.state}`],
            ['Airspace Class', `Class ${AIRPORT.airspaceClass} — CTAF ${AIRPORT.ctaf} MHz`],
            ['Primary Runway', `${AIRPORT.runways[0].designator} — ${AIRPORT.runways[0].lengthFt.toLocaleString()} ft × ${AIRPORT.runways[0].widthFt} ft`],
            ['Primary Ramp',   'B SOUTH — 18,000 sq ft (Vertiport candidate)'],
            ['ARFF',           'Index A GA unit — adequate for Vertistop/Vertiport tier'],
            ['Utility Provider', `${AIRPORT.utility.provider} — ~${AIRPORT.utility.gridHeadroom} MW estimated`],
            ['Military LOA',   AIRPORT.military.loaStatus],
          ]}
          caption="Key Airport Parameters — Keystone Heights Airport (42J). Source: FAA Form 5010; Airport Operations Data."
        />

        <UpsellCallout
          title="Standard Report: Full Airport Profile with Infrastructure Inventory"
          message="The Standard report includes the complete infrastructure inventory, monthly operations charts, aircraft category analysis, and military VTOL operational precedent assessment across 22 months of Airport Operations data."
        />
      </View>
    </Page>
  );
}

// ── Condensed section: Demand Overview ───────────────────────────────────────
function PrelimDemandOverview() {
  const jax = DEMAND.corridors.find(c => c.primary);
  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="3" title="Demand Overview" />

      <View style={S.body}>
        <Text style={S.h2}>3.1 Primary Corridor</Text>
        <Text style={S.p}>
          The demand model identifies {jax?.destination} as the primary eVTOL corridor
          from 42J. The current 68-minute drive is reduced to {jax?.eVtolMin} minutes by eVTOL,
          saving {jax?.timeSavedMin} minutes for a fare of ${jax?.fare}. The corridor serves a
          population of {jax?.population.toLocaleString()} with high employment density
          (logistics, healthcare, financial services).
        </Text>

        <DataTable
          headers={['Traffic Scenario', 'Adoption', 'Annual Pax (Year 3)', 'Daily Ops']}
          flex={[2.5, 1, 1.5, 1]}
          rows={DEMAND.trafficTiers.map(t => [
            `${t.label}${t.recommended ? ' ★' : ''}`,
            `${t.adoptionPct}%`,
            t.annualPassengers.toLocaleString(),
            t.dailyOps.toString(),
          ])}
          highlight={0}
          caption="eVTOL Traffic Projections — Year 3 Steady State. ★ = Recommended baseline. Source: AAM Readiness System demand model."
        />

        <UpsellCallout
          title="Standard Report: Full Route Network Analysis"
          message="The Standard report includes demand model methodology, mode-shift probability for all six corridors, sensitivity analysis, and time savings charts."
        />
      </View>
    </Page>
  );
}

// ── Condensed section: Infrastructure + Simulation Highlights ────────────────
function PrelimInfraSimHighlights() {
  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="4" title="Infrastructure and Simulation Highlights" />

      <View style={S.body}>
        <Text style={S.h2}>4.1 Key Infrastructure Findings</Text>

        <DataTable
          headers={['Infrastructure Check', 'Vertistop', 'Vertiport ★', 'Vertihub']}
          flex={[2.5, 1.2, 1.4, 1.2]}
          rows={[
            ['EB-105 Ramp Geometry', 'CONDITIONAL', 'CONDITIONAL', 'PASS'],
            ['ARFF Capability',     'PASS',          'PASS',         'FAIL'],
            ['Grid Capacity',       'PASS',          'PASS',         'FAIL'],
            ['Overall Gate Status', 'PASS',          'PASS',         'FAIL'],
          ]}
          statusCols={[1, 2, 3]}
          caption="Infrastructure Gate Summary by Tier. ★ = Recommended configuration. Source: AAM Readiness System gate framework."
        />

        <Text style={S.h2}>5.1 Simulation — Key Results</Text>
        <Text style={S.p}>
          The 90-day Monte Carlo simulation tested nine demand and infrastructure combinations.
          Five of nine scenarios passed both safety and power gates. The optimal configuration —
          Medium Traffic + Vertiport — achieved a Readiness Index of 93/100 (95% CI: 88.2–98.2)
          with 100% throughput and zero queue events.
        </Text>

        <DataTable
          headers={['Scenario', 'Score', 'Throughput', 'Verdict']}
          flex={[2.5, 1, 1.2, 1.5]}
          rows={[
            ['Low Traffic + Vertistop',    '86/100',  '100%', 'READY'],
            ['Low Traffic + Vertiport',    '88/100',  '100%', 'READY'],
            ['Medium Traffic + Vertistop', '89/100',  '100%', 'READY'],
            ['Medium Traffic + Vertiport', '93/100',  '100%', 'OPTIMAL ★'],
            ['High Traffic + Vertihub',    '55/100',  '100%', 'CONDITIONAL'],
            ['All Vertihub (other)',       '—',        '—',    'NOT READY'],
            ['High Traffic + Vertistop',   '—',        '78.9%','NOT READY'],
            ['High Traffic + Vertiport',   '—',        '99.1%','NOT READY'],
          ]}
          statusCols={[3]}
          caption="Simulation Results Summary — Key Scenarios. Source: AAM Readiness System 90-day simulation."
        />

        <UpsellCallout
          title="Premium Report: Complete Simulation Dataset"
          message="The Premium report includes all nine scenario results with individual metrics, Monte Carlo distribution charts, TAT analysis, and full stress test resiliency results."
        />
      </View>
    </Page>
  );
}

// ── Condensed section: Gate + Score ──────────────────────────────────────────
function PrelimGateScore() {
  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="6" title="Gate Analysis and Readiness Score" />

      <View style={S.body}>
        <View style={S.statRow}>
          {[
            { val: '93/100',        lbl: 'Readiness Index',      color: C.navy },
            { val: '88.2–98.2',     lbl: '95% CI',               color: C.blue },
            { val: '5/9',           lbl: 'Scenarios Passing',    color: C.amber },
            { val: 'OPTIMAL',       lbl: 'Verdict',              color: C.green },
          ].map((s, i, arr) => (
            <View key={i} style={[S.statChip, i === arr.length - 1 ? S.statChipLast : {}]}>
              <Text style={[S.statChipVal, { color: s.color }]}>{s.val}</Text>
              <Text style={S.statChipLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>

        <Text style={S.h2}>Gate Summary</Text>

        <View style={[S.card, S.cardGreen]} wrap={false}>
          {[
            { verdict: 'PASS', title: 'Gate 1 — Safety & Regulatory (Vertiport)', desc: 'Obstacle surfaces clear. ARFF adequate at Vertiport scale. Minor ramp reconfiguration needed at B SOUTH (~$150–300K).' },
            { verdict: 'PASS', title: 'Gate 2 — Power & Grid (Vertiport)', desc: '0.51 MW demand vs. 0.8 MW available. No grid constraint at Vertistop or Vertiport tier.' },
            { verdict: 'FAIL', title: 'Gate 1 — Safety & Regulatory (Vertihub)', desc: '8-pad Vertihub requires dedicated ARFF per FAA AC 150/5210-6D. All Vertihub scenarios score zero.' },
          ].map((g, i, arr) => {
            const badgeStyle = g.verdict === 'PASS' ? [S.gateBadge, S.badgePass] : [S.gateBadge, S.badgeFail];
            return (
              <View key={i} style={[S.gateRow, i === arr.length - 1 ? S.gateRowLast : {}]} wrap={false}>
                <View style={[S.badge, g.verdict === 'PASS' ? S.badgePass : S.badgeFail, { width: 44, marginRight: 14, marginTop: 2, flexShrink: 0 }]}>
                  <Text>{g.verdict}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={S.gateTitle}>{g.title}</Text>
                  <Text style={S.gateDesc}>{g.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <UpsellCallout
          title="Standard Report: Detailed Gate Analysis"
          message="The Standard report provides per-check gate results for all four Gate 1 checks and all three Gate 2 checks, including regulatory basis citations and per-tier PASS/FAIL/CONDITIONAL status."
        />
      </View>
    </Page>
  );
}

// ── Condensed section: Recommendations ───────────────────────────────────────
function PrelimRecommendations() {
  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="7" title="Recommendations" />

      <View style={S.body}>
        <Text style={S.h2}>7.1 Recommended Configuration</Text>
        <Text style={S.p}>
          The recommended configuration for Keystone Heights Airport (42J) is a{' '}
          <Text style={{ fontFamily: 'Times-Bold' }}>Vertiport with Medium eVTOL Traffic</Text>
          {' '}— 4 landing pads, 4 × 150 kW DC fast chargers, phased over 36 months at a
          program CAPEX of $4.1M–$5.4M.
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
            </View>
          ))}
        </View>

        <Text style={[S.h2, { marginTop: 16 }]}>Federal Funding Available</Text>
        <DataTable
          headers={['Program', 'Agency', 'Award Range', 'Eligibility']}
          flex={[1, 1, 1.5, 1.2]}
          rows={RECS.federalFunding.map(f => [f.program, f.agency, f.awardRange, f.eligibility])}
          caption="Federal Grant Programs — Keystone Heights Airport (42J) eVTOL Vertiport. Source: USDOT; FAA."
        />

        <UpsellCallout
          title="Premium Report: Ready-to-Submit Grant Language Pack"
          message="Appendix D of the Premium report contains pre-drafted BCA Summary, Needs Assessment narrative, and Equity Analysis for RAISE and AIP Supplemental applications — formatted for direct submission."
        />

        <View style={S.calloutAmber} wrap={false}>
          <Text style={S.calloutTitleAmber}>Preliminary Report Limitation</Text>
          <Text style={S.calloutTxtAmber}>
            This Preliminary report provides a high-level summary of findings. For full simulation
            data, infrastructure analysis, regulatory pathway, and grant application support,
            upgrade to Standard or Premium. This report does not constitute an FAA-approved
            engineering study.
          </Text>
        </View>
      </View>
    </Page>
  );
}

// ── Executive Summary (shared with S1) — inline for Prelim ───────────────────
function PrelimExecutiveSummary() {
  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="1" title="Executive Summary" />

      <View style={S.body}>
        <Text style={S.p}>
          Keystone Heights Airport (42J), located in Clay County, Florida, is well-positioned for
          Advanced Air Mobility (AAM) integration and is recommended to proceed immediately to
          infrastructure development planning. The airport has been assessed against the AAM
          Readiness System framework and assigned a Readiness Index of 93 out of 100 (95% CI:
          88.2 – 98.2) under the optimal configuration of a Vertiport serving Medium eVTOL Traffic.
        </Text>
        <Text style={S.p}>
          This is a {doc.tier} ASSESSMENT with data confidence of {SUMMARY.confidence.preliminary.pct}%.{' '}
          {SUMMARY.confidence.preliminary.verifyNote}
        </Text>

        <Text style={S.h2}>Key Findings</Text>
        {SUMMARY.keyFindings.map((f, i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: 8 }} wrap={false}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, width: 22, flexShrink: 0 }}>
              {i + 1}.
            </Text>
            <Text style={[S.p, { marginBottom: 0, flex: 1 }]}>{f}</Text>
          </View>
        ))}

        <UpsellCallout
          title="Upgrade to Standard for Full Executive Summary + Financial Metrics"
          message="The Standard report includes a detailed financial metrics table comparing CAPEX, revenue potential, and break-even horizon across all three traffic scenarios."
        />
      </View>
    </Page>
  );
}

// ── Main Preliminary Report ───────────────────────────────────────────────────
export default function PreliminaryReport() {
  return (
    <Document
      title="AAM Readiness Assessment — Preliminary Report"
      author="AAM Readiness System"
      subject="Keystone Heights Airport (42J) AAM Readiness Assessment — Preliminary"
      keywords="AAM, eVTOL, vertiport, Keystone Heights, 42J"
    >
      <CoverPage tier="preliminary" />
      <TableOfContents tier="preliminary" />
      <PrelimExecutiveSummary />
      <PrelimAirportOverview />
      <PrelimDemandOverview />
      <PrelimInfraSimHighlights />
      <PrelimGateScore />
      <PrelimRecommendations />
    </Document>
  );
}
