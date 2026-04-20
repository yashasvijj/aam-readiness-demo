import { Document } from '@react-pdf/renderer';
import CoverPage from './CoverPage';
import TableOfContents from './sections/TableOfContents';
import S1_ExecutiveSummary from './sections/S1_ExecutiveSummary';
import S2_AirportProfile from './sections/S2_AirportProfile';
import S3_DemandAnalysis from './sections/S3_DemandAnalysis';
import S4_Infrastructure from './sections/S4_Infrastructure';
import S5_Simulation from './sections/S5_Simulation';
import S6_GateAnalysis from './sections/S6_GateAnalysis';
import S7_Recommendations from './sections/S7_Recommendations';
import S8_Regulatory from './sections/S8_Regulatory';
import AppA from './sections/AppA';
import AppB from './sections/AppB';
import AppC from './sections/AppC';
import AppD from './sections/AppD';
import AppE from './sections/AppE';

/**
 * PremiumReport — expanded assessment with all charts, premium sections, and
 * Appendix D Grant Language Pack (~48–55 pages)
 * Props:
 *   charts  {Record<string,string>}  pre-generated chart base64 images from generateCharts('premium')
 */
export default function PremiumReport({ charts = {} }) {
  return (
    <Document
      title="AAM Readiness Assessment — Premium Report"
      author="AAM Readiness System"
      subject="Keystone Heights Airport (42J) AAM Readiness Assessment — Premium"
      keywords="AAM, eVTOL, vertiport, Keystone Heights, 42J, FAA, RAISE, AIP"
    >
      <CoverPage tier="premium" />
      <TableOfContents tier="premium" />
      <S1_ExecutiveSummary tier="premium" charts={charts} premium={true} />
      <S2_AirportProfile   tier="premium" charts={charts} premium={true} />
      <S3_DemandAnalysis   tier="premium" charts={charts} premium={true} />
      <S4_Infrastructure   tier="premium" charts={charts} premium={true} />
      <S5_Simulation       tier="premium" charts={charts} premium={true} />
      <S6_GateAnalysis     tier="premium" charts={charts} premium={true} />
      <S7_Recommendations  tier="premium" charts={charts} premium={true} />
      <S8_Regulatory       tier="premium" charts={charts} premium={true} />
      <AppA tier="premium" />
      <AppB tier="premium" />
      <AppC tier="premium" />
      <AppD tier="premium" />
      <AppE tier="premium" />
    </Document>
  );
}
