import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import ChartFigure from '../shared/ChartFigure';
import UpsellCallout from '../shared/UpsellCallout';
import { AIRPORT, OPS, DOC } from '../../data/reportData';

export default function S2_AirportProfile({ tier, charts, premium }) {
  const doc = DOC[tier];

  const infraRows = [
    ['Primary Runway (05/23)', `${AIRPORT.runways[0].lengthFt.toLocaleString()} ft × ${AIRPORT.runways[0].widthFt} ft`, AIRPORT.runways[0].surface, AIRPORT.runways[0].pcn],
    ['FBO / Fuel Service',     `${AIRPORT.fbo.name}`,                  AIRPORT.fbo.fuel,    AIRPORT.fbo.status],
    ['Ramp — B SOUTH',         '18,000 sq ft',                          'Asphalt',            'Primary Vertiport candidate'],
    ['Ramp — A2 Ramp',         '12,500 sq ft',                          'Asphalt',            'Secondary / overflow'],
    ['North Tie-Down',          '8,400 sq ft',                           'Asphalt',            'GA tie-down'],
    ['ARFF Capability',         'Index A — GA unit',                     'Mutual aid: Clay Co.','Adequate for Vertistop/Vertiport'],
    ['Airspace Class',          `Class ${AIRPORT.airspaceClass}`,        `CTAF ${AIRPORT.ctaf}`,'No ATC — self-announce'],
    ['Elevation',               `${AIRPORT.elevationFt} ft MSL`,         'Clay County, FL',    'No MSA constraint'],
    ['Site Acreage',            `${AIRPORT.acreage} acres`,              `Est. ${AIRPORT.yearEstablished}`, AIRPORT.ownership],
  ];

  const opsRows = [
    ['Total Operations (22 months)', OPS.totalOps.toLocaleString(), 'May 2024 – March 2026', OPS.source],
    ['Average Daily Operations',     OPS.avgDailyOps.toString(),     'Mean across full period', ''],
    ['Median Daily Operations',       OPS.medianDailyOps.toString(),  'Excludes outlier peaks',  ''],
    ['Peak Single Day',               OPS.peakSingleDay.toString(),   OPS.peakDayDate,           'Military exercise event'],
    ['Standard Deviation (daily)',    OPS.stdDevDaily.toString(),     '',                        'High variability — seasonal and military driven'],
    ['Military VTOL Operations',      OPS.militaryVtol.toLocaleString(),'5.9% of total traffic', 'Camp Blanding LOA — Camp Blanding JTC'],
    ['Touch-and-Go Rate',             `${OPS.touchAndGoRate}%`,       'Training traffic',        ''],
    ['Primary Runway Load (05/23)',   `${OPS.primaryRunwayLoad}%`,    '',                        'Adequate capacity margin for eVTOL'],
    ['Peak Month',                    OPS.peakMonth,                   OPS.peakMonthFactor,       'March — military training season'],
  ];

  return (
    <>
      {/* ── Page: Airport Profile ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <SectionBanner number="2" title="Airport Profile" />

        <View style={S.body}>
          {/* 2.1 Location */}
          <Text style={S.h2}>2.1 Location and Airspace Classification</Text>
          <Text style={S.p}>
            Keystone Heights Airport (FAA Identifier: 42J) is a public-use general aviation airport
            located in Clay County, Florida, approximately 28 miles southwest of Jacksonville and
            25 miles east of Gainesville. The airport operates within Class G uncontrolled airspace
            with a published CTAF frequency of {AIRPORT.ctaf} MHz. No approach control or departure
            control services are available, and pilots self-announce on CTAF — a characteristic that
            simplifies UTM integration relative to controlled-airspace airports.
          </Text>
          <Text style={S.p}>
            The airport sits at {AIRPORT.elevationFt} feet MSL, consistent with the surrounding
            north-central Florida coastal plain. No terrain constraints limit approach surfaces for
            any of the three infrastructure tiers assessed. The single {AIRPORT.runways[0].lengthFt.toLocaleString()}-foot
            asphalt runway (05/23) carries 79.6% of all operations, with the remaining traffic
            using the ramp system and touch-and-go pattern.
          </Text>

          {/* 2.2 Infrastructure Inventory */}
          <Text style={S.h2}>2.2 Existing Infrastructure Inventory</Text>
          <DataTable
            headers={['Asset', 'Specification', 'Detail', 'AAM Relevance']}
            flex={[2, 1.5, 1.5, 2]}
            rows={infraRows}
            caption="Table 2. Keystone Heights Airport (42J) — Existing Infrastructure Inventory. Source: FAA Form 5010; AAM Readiness System site assessment."
          />

          {!premium && (
            <UpsellCallout
              title="Upgrade to Standard for Full Infrastructure Analysis"
              message="The Standard report includes a detailed EB-105 ramp geometry compliance table, ARFF gap analysis, grid assessment, and current-vs-required infrastructure comparison across all three vertiport tiers."
            />
          )}
        </View>
      </Page>

      {/* ── Page: Operational Baseline ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          {/* 2.3 Operational Baseline */}
          <Text style={S.h2}>2.3 Operational Baseline Analysis</Text>
          <Text style={S.p}>
            Operations data was collected via Airport Operations passive ADS-B monitoring
            over a 22-month period (May 2024 – March 2026), capturing {OPS.totalOps.toLocaleString()} total
            operations. This dataset provides the calibration baseline for the 90-day Monte Carlo
            simulation and demand model.
          </Text>

          {/* Stat chips */}
          <View style={S.statRow}>
            {[
              { val: OPS.totalOps.toLocaleString(), lbl: 'Total Operations' },
              { val: OPS.avgDailyOps.toString(),    lbl: 'Avg Daily Ops' },
              { val: OPS.peakSingleDay.toString(),   lbl: 'Peak Day' },
              { val: OPS.militaryVtol.toLocaleString(), lbl: 'Military VTOL' },
            ].map((s, i, arr) => (
              <View key={i} style={[S.statChip, i === arr.length - 1 ? S.statChipLast : {}]}>
                <Text style={[S.statChipVal, { color: [C.navy, C.blue, C.amber, C.green][i] }]}>{s.val}</Text>
                <Text style={S.statChipLbl}>{s.lbl}</Text>
              </View>
            ))}
          </View>

          {charts?.monthlyOps && (
            <ChartFigure
              src={charts.monthlyOps}
              num={1}
              caption="Monthly Operations Distribution — Keystone Heights Airport (42J), May 2024–March 2026. Peak in March driven by Camp Blanding military training season"
              source="Airport Operations — 42J Operations Data"
              height={180}
            />
          )}

          <DataTable
            headers={['Metric', 'Value', 'Notes', 'Simulation Impact']}
            flex={[2, 1.2, 2, 2]}
            rows={opsRows}
            caption="Table 3. Operational Baseline Summary — Keystone Heights Airport (42J). Source: Airport Operations."
          />
        </View>
      </Page>

      {/* ── Page: Aircraft Categories + Military Precedent ── */}
      <Page size="LETTER" style={S.page}>
        <DocHeader tierLabel={doc.tier} docId={doc.id} />
        <DocFooter />

        <View style={S.body}>
          {/* Aircraft category chart */}
          {charts?.aircraftCategory && (
            <ChartFigure
              src={charts.aircraftCategory}
              num={2}
              caption="Aircraft Category Distribution — Keystone Heights Airport (42J), May 2024–March 2026. Military helicopter operations (5.9%) establish VTOL operational precedent"
              source="Airport Operations — 42J Operations Data"
              height={200}
            />
          )}

          {/* 2.4 Military VTOL Precedent */}
          <Text style={S.h2}>2.4 Military VTOL Integration Precedent</Text>
          <Text style={S.p}>
            Keystone Heights Airport has an active Letter of Agreement (LOA) with U.S. Army Reserve
            Command (USARC) for periodic rotary-wing training operations from Camp Blanding Joint
            Training Center, located {AIRPORT.military.distanceMi} miles to the northeast. During the
            22-month assessment window, {OPS.militaryVtol.toLocaleString()} military helicopter
            operations were recorded, representing 5.9% of total airport traffic.
          </Text>

          <View style={[S.card, S.cardNavy]} wrap={false}>
            <Text style={S.h3}>Why Military VTOL Matters for AAM</Text>
            <Text style={[S.p, { marginBottom: 4 }]}>
              Military helicopter operations at 42J demonstrate that the airport has already managed
              VTOL operations at scale under FAA oversight — including UH-60 Black Hawk operations. This establishes:
            </Text>
            {[
              'Existing operational familiarity with VTOL approach and departure procedures at 42J.',
              'Active CTAF coordination protocols adaptable to eVTOL UTM integration.',
              'Demonstrated ramp handling capacity for rotary-wing aircraft at the B SOUTH area.',
              'Precedent for federal LOA frameworks applicable to USS UTM agreements.',
            ].map((pt, i) => (
              <View key={i} style={S.methodBullet}>
                <Text style={S.bulletDot}>›</Text>
                <Text style={S.bulletText}>{pt}</Text>
              </View>
            ))}
          </View>

          <DataTable
            headers={['Military Attribute', 'Detail']}
            flex={[2, 3]}
            rows={[
              ['Facility',            AIRPORT.military.facility],
              ['Distance',            `${AIRPORT.military.distanceMi} miles ${AIRPORT.military.bearing} of 42J`],
              ['Aircraft Types',      AIRPORT.military.aircraftTypes.join(', ')],
              ['LOA Status',          AIRPORT.military.loaStatus],
              ['Relationship Type',   AIRPORT.military.relationship],
              ['Ops During Period',   `${OPS.militaryVtol.toLocaleString()} (${((OPS.militaryVtol / OPS.totalOps) * 100).toFixed(1)}% of total)`],
            ]}
            caption="Table 4. Military VTOL Integration — Camp Blanding JTC Relationship. Source: FAA Form 5010; Airport Operations Data; USARC LOA records."
          />

          {!premium && (
            <UpsellCallout
              title="Premium Report: Hourly Operations Heatmap"
              message="The Premium report includes an hour-of-day operations heatmap revealing peak demand windows — critical for scheduling eVTOL slot times and UTM traffic management planning."
            />
          )}
        </View>
      </Page>
    </>
  );
}
