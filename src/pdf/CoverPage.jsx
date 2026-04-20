import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from './styles';

const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const FACTS = [
  { val: '93 / 100',  lbl: 'Overall Readiness Score' },
  { val: 'Vertiport', lbl: 'Recommended Tier\nB SOUTH / A2 Ramp' },
  { val: '$6.0M',     lbl: 'Estimated CAPEX\n36-month phased build' },
];

const STATS = [
  { val: '537',    lbl: 'Simulated eVTOL\nOperations',    color: C.accent },
  { val: '4 / 9',  lbl: 'Scenarios Passing\nAll Gates',   color: C.green  },
  { val: '90',     lbl: 'Simulation Days\n(Monte Carlo)', color: C.teal   },
  { val: '50,236', lbl: 'Virtower Baseline\nOperations',  color: C.blue   },
];

export default function CoverPage({ tier }) {
  return (
    <Page size="LETTER" style={S.coverPage}>

      {/* Top nav bar */}
      <View style={S.coverTopBar}>
        <Text style={S.coverTopLogo}>
          <Text style={S.coverTopLogoMuted}>AAM</Text>
          <Text style={S.coverTopLogoWhite}>Readiness</Text>
        </Text>
        <Text style={S.coverTopBadge}>{tier}</Text>
      </View>

      {/* Main content */}
      <View style={S.coverMain}>

        {/* Airport identity */}
        <View>
          <Text style={S.coverAirportLabel}>AAM Readiness Assessment</Text>
          <Text style={S.coverAirportName}>Keystone Heights{'\n'}Airport</Text>
          <Text style={S.coverAirportSub}>ICAO: 42J · Keystone Heights, Florida · Clay County EMC Grid</Text>
          <View style={S.coverRule} />

          {/* Score */}
          <View style={S.coverScoreRow}>
            <Text style={S.coverScoreNum}>93</Text>
            <Text style={S.coverScoreDenom}>/ 100</Text>
            <View style={S.coverVerdictBadge}>
              <Text style={S.coverVerdictTxt}>OPTIMAL</Text>
            </View>
          </View>
          <Text style={S.coverScoreLabel}>
            Keystone Heights is ready for Advanced Air Mobility operations.
          </Text>

          {/* Key facts */}
          <View style={S.coverFactsRow}>
            {FACTS.map((f, i) => (
              <View key={i} style={S.coverFact}>
                <Text style={S.coverFactVal}>{f.val}</Text>
                <Text style={S.coverFactLbl}>{f.lbl}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Simulation stats */}
        <View style={S.coverStatsRow}>
          {STATS.map((s, i) => (
            <View key={i} style={S.coverStat}>
              <Text style={[S.coverStatVal, { color: s.color }]}>{s.val}</Text>
              <Text style={S.coverStatLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>

      </View>

      {/* Bottom date line */}
      <View style={S.coverDateLine}>
        <Text style={S.coverDateTxt}>{today}</Text>
        <Text style={S.coverDateTxt}>
          This report is for preliminary planning purposes only and does not constitute an FAA-approved engineering study.
        </Text>
      </View>

    </Page>
  );
}
