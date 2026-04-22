import { Page, View, Text } from '@react-pdf/renderer';
import { S, C } from '../styles';
import DocHeader from '../shared/DocHeader';
import DocFooter from '../shared/DocFooter';
import SectionBanner from '../shared/SectionBanner';
import DataTable from '../shared/DataTable';
import { SIM, DOC } from '../../data/reportData';

const SIM_STEPS = [
  {
    title: 'Traffic Arrival Generation',
    bullets: [
      'Stochastic arrival events are generated for each 90-day simulation run using a non-homogeneous Poisson process calibrated to 42J\'s observed daily operations distribution.',
      'Seasonal demand factors (monthly multipliers derived from Airport Operations data) are applied to modulate inter-arrival times across the simulation window.',
      'eVTOL arrivals are injected at the modelled adoption rate for each traffic tier, proportional to the corridor demand shares from the route network model.',
    ],
  },
  {
    title: 'Pad Queue and Service Discipline',
    bullets: [
      'Each simulation run models a discrete-event queue with pad count as the service channel capacity (2 pads for Vertistop, 4 for Vertiport, 8 for Vertihub).',
      'Service time per pad event (turnaround time, TAT) incorporates arrival, touchdown, charging, and departure sub-events with independent stochastic distributions.',
      'Queue discipline is first-in, first-out (FIFO) with priority override for emergency and military VTOL events consistent with the Camp Blanding LOA.',
    ],
  },
  {
    title: 'Charging Demand Modelling',
    bullets: [
      'Peak electrical demand is computed from simultaneous charging events across all occupied pads at each time step.',
      'Charging duration is a function of state-of-charge on arrival and charger rated capacity, modelled using a publicly available CC/CV charging curve approximation for lithium-ion battery packs in the 100–200 kWh class.',
      'Grid capacity is treated as a hard constraint — simultaneous demand exceeding available headroom triggers a grid fault event, counted against the resiliency score.',
    ],
  },
  {
    title: 'Stress Testing',
    bullets: [
      'Three independent fault conditions are injected in separate simulation sub-runs: single pad failure (removed from queue capacity), partial grid outage (50% capacity reduction for a 4-hour window), and weather-driven hold events (arrival rate suspended for a stochastic hold duration).',
      'Resiliency score is the percentage of stress event sub-runs in which the system recovers to full throughput within 2 hours of fault onset.',
      'Scenarios where resiliency falls below 95% fail Gate 1 under the AAM Readiness System gate framework.',
    ],
  },
  {
    title: 'Score Aggregation',
    bullets: [
      'Each scenario that passes both Gate 1 and Gate 2 receives a composite Readiness Index score derived from throughput efficiency, airspace integration performance, and demand capture rate.',
      'The score is computed across all Monte Carlo runs and expressed as a mean with 95% confidence interval.',
      'Component weights are proprietary to the AAM Readiness System methodology. The scoring formula is not disclosed in customer-facing reports to protect the integrity of the system\'s recommendations.',
    ],
  },
];

export default function AppB({ tier }) {
  const doc = DOC[tier];

  return (
    <Page size="LETTER" style={S.page}>
      <DocHeader tierLabel={doc.tier} docId={doc.id} />
      <DocFooter />

      <SectionBanner number="B" title="Appendix B — Simulation Methodology Technical Specification" />

      <View style={S.body}>
        <Text style={S.p}>
          This appendix provides a technical description of the 90-day discrete-event simulation
          used to produce the scenario results in Section 5. The methodology is designed to
          provide statistically robust throughput and resiliency estimates without disclosing
          proprietary model parameters.
        </Text>

        <DataTable
          headers={['Parameter', 'Specification']}
          flex={[2, 4]}
          rows={[
            ['Simulation framework',  'Discrete-event simulation'],
            ['Simulation window',     '90 days per scenario run'],
            ['Monte Carlo runs',      `${SIM.optimal.runs} runs per scenario`],
            ['Scenarios modelled',    '9 (3 traffic tiers × 3 infrastructure tiers)'],
            ['Traffic tiers',        'Low (0.8%), Medium (2.5%), High (5.8%) market adoption'],
            ['Infrastructure tiers', 'Vertistop (2 pads), Vertiport (4 pads), Vertihub (8 pads)'],
            ['Key outputs',           'Throughput rate, average TAT, peak queue depth, resiliency score'],
            ['Calibration source',    'Airport Operations — 42J Operations Data (May 2024–March 2026)'],
            ['Regulatory alignment',  'FAA EB-105; FAA AC 150/5325-4B resiliency framework'],
          ]}
          caption="Table B-1. Simulation Configuration Parameters. Source: AAM Readiness System simulation engine."
        />

        <Text style={S.h2}>Simulation Process — Step-by-Step</Text>

        {SIM_STEPS.map((step, i) => (
          <View key={i} style={S.methodStep} wrap={false}>
            <View style={S.methodNumCircle}>
              <Text style={S.methodNumTxt}>{i + 1}</Text>
            </View>
            <View style={S.methodContent}>
              <Text style={S.methodTitle}>{step.title}</Text>
              {step.bullets.map((b, j) => (
                <View key={j} style={S.methodBullet}>
                  <Text style={S.bulletDot}>›</Text>
                  <Text style={S.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={[S.calloutAmber]} wrap={false}>
          <Text style={S.calloutTitleAmber}>Proprietary Parameters — Not Disclosed</Text>
          <Text style={S.calloutTxtAmber}>
            The following model parameters are proprietary to the AAM Readiness System and are
            not disclosed in customer-facing reports: scoring component weights, β coefficients
            from the demand logit model, state-of-charge arrival distribution parameters,
            CC/CV charging curve parameters, coincidence factor values, and Monte Carlo
            seed values. The methodology described above is sufficient to understand the
            simulation structure; parameter values are maintained in the AAM Readiness System
            configuration and updated as the eVTOL market matures.
          </Text>
        </View>
      </View>
    </Page>
  );
}
