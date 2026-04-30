/**
 * CoverPage.jsx
 * Shared cover page for all three report tiers.
 * Matches the reference document layout (AAM-42J-2026-001 page 1):
 *   • FAA Navy top bar (tier label + doc number)
 *   • Hero block (report title, airport name, assessment meta)
 *   • Score block (93/100, CI, OPTIMAL verdict, data confidence indicator)
 *   • Key stats bar
 *
 * Props:
 *   tier  {'preliminary'|'standard'|'premium'}
 */

import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from './styles';
import { DOC, SUMMARY, AIRPORT, SIM } from '../data/reportData';

const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function CoverPage({ tier }) {
  const doc   = DOC[tier];
  const conf  = SUMMARY.confidence[tier];
  const confColor = conf.level === 'GREEN' ? C.green : C.amber;

  return (
    <Page size="LETTER" style={S.coverPage}>

      {/* ── Top nav bar ── */}
      <View style={S.coverNavyBar}>
        <Text style={S.coverNavyBarLeft}>
          {doc.label.toUpperCase()} · {AIRPORT.name.toUpperCase()} ({AIRPORT.icao})
        </Text>
        <Text style={S.coverNavyBarRight}>Document No. {doc.id}</Text>
      </View>

      {/* ── Hero block ── */}
      <View style={S.coverHeroBlock}>
        <Text style={S.coverHeroLabel}>Advanced Air Mobility</Text>
        <Text style={S.coverHeroTitle}>Airport Readiness Assessment</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Helvetica-Bold', color: C.amber, marginBottom: 4 }}>
          {AIRPORT.name}
        </Text>
        <Text style={S.coverHeroSubtitle}>
          FAA Identifier: {AIRPORT.icao} · {AIRPORT.city}, {AIRPORT.state}
        </Text>
        <Text style={S.coverHeroMeta}>
          Assessment Date: {today} · Document No.: {doc.id}
          {'\n'}
          90-Day Monte Carlo Simulation · {SIM.runsByTier[tier]} Runs · 9 Infrastructure-Traffic Scenarios
        </Text>

        {/* Tier badge */}
        <View style={S.coverTierBadge}>
          <Text style={S.coverTierBadgeTxt}>{doc.tier} ASSESSMENT</Text>
        </View>
      </View>

      {/* ── Score + confidence block ── */}
      <View style={S.coverScoreBlock}>

        {/* Score ring */}
        <View style={S.coverScoreLeft}>
          <Text style={S.coverScoreNum}>{SUMMARY.score}</Text>
          <Text style={S.coverScoreDenom}>out of 100</Text>
          <Text style={S.coverScoreCI}>{SUMMARY.scoreCI}</Text>
          <View style={S.coverVerdictBadge}>
            <Text style={S.coverVerdictTxt}>{SUMMARY.verdict}</Text>
          </View>
        </View>

        {/* Confidence + optimal config */}
        <View style={S.coverConfBlock}>
          <Text style={S.coverConfLabel}>Assessment Confidence</Text>

          <View style={S.coverConfRow}>
            <View style={[S.coverConfDot, { backgroundColor: confColor }]} />
            <View>
              <Text style={S.coverConfTitle}>
                {conf.level} — {conf.label}
              </Text>
              <Text style={S.coverConfPct}>Data Confidence: {conf.pct}%</Text>
            </View>
          </View>

          <Text style={S.coverConfNote}>{conf.verifyNote}</Text>

          <View style={{ marginTop: 14 }}>
            <Text style={[S.coverConfLabel, { marginBottom: 3 }]}>Optimal Configuration</Text>
            <Text style={[S.coverOptConfig, { fontFamily: 'Helvetica-Bold', color: C.navy, fontSize: 12 }]}>
              {SUMMARY.optimalConfig}
            </Text>
            <Text style={[S.coverConfPct, { marginTop: 4 }]}>
              {SUMMARY.scenariosPassing}/{SUMMARY.scenariosTotal} scenarios passed safety and power gates.
            </Text>
          </View>
        </View>

      </View>

      {/* ── Key stats bar ── */}
      <View style={S.coverStatsBar}>
        {SUMMARY.keyStats.map((s, i) => (
          <View key={i} style={S.coverStat}>
            <Text style={[S.coverStatVal, { color: [C.navy, C.blue, C.amber, C.green, C.red][i % 5] }]}>
              {s.val}
            </Text>
            <Text style={S.coverStatLbl}>{s.lbl}</Text>
          </View>
        ))}
      </View>

    </Page>
  );
}
