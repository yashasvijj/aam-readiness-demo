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

/**
 * StandardReport — full baseline AAM readiness assessment (~25–35 pages)
 * Props:
 *   charts  {Record<string,string>}  pre-generated chart base64 images from generateCharts('standard')
 */
export default function StandardReport({ charts = {} }) {
  return (
    <Document
      title="AAM Readiness Assessment — Standard Report"
      author="AAM Readiness System"
      subject="Keystone Heights Airport (42J) AAM Readiness Assessment"
      keywords="AAM, eVTOL, vertiport, Keystone Heights, 42J, FAA"
    >
      <CoverPage tier="standard" />
      <TableOfContents tier="standard" />
      <S1_ExecutiveSummary tier="standard" charts={charts} premium={false} />
      <S2_AirportProfile   tier="standard" charts={charts} premium={false} />
      <S3_DemandAnalysis   tier="standard" charts={charts} premium={false} />
      <S4_Infrastructure   tier="standard" charts={charts} premium={false} />
      <S5_Simulation       tier="standard" charts={charts} premium={false} />
      <S6_GateAnalysis     tier="standard" charts={charts} premium={false} />
      <S7_Recommendations  tier="standard" charts={charts} premium={false} />
      <S8_Regulatory       tier="standard" charts={charts} premium={false} />
      <AppA tier="standard" />
      <AppB tier="standard" />
      <AppC tier="standard" />
    </Document>
  );
}
