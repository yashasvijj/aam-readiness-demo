import { View, Text } from '@react-pdf/renderer';
import { S } from '../styles';

/**
 * SectionBanner — full-width navy band used as a section header.
 * Matches the reference style: "6. READINESS SCORE AND GATE ANALYSIS"
 *
 * Props:
 *   number  {string}  e.g. "6"
 *   title   {string}  e.g. "Readiness Score and Gate Analysis"
 */
export default function SectionBanner({ number, title }) {
  return (
    <View style={S.sectionBanner} wrap={false}>
      <Text style={S.sectionBannerTxt}>
        {number}. {title.toUpperCase()}
      </Text>
    </View>
  );
}
