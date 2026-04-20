import { View, Text } from '@react-pdf/renderer';
import { S } from '../styles';

const today = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

/**
 * DocFooter — fixed two-line footer matching the reference document:
 *   Line 1:  "Keystone Heights Airport (42J) · AAM Readiness Assessment · April 2026"  |  "Page N"
 *   Line 2:  "PRELIMINARY — For Planning Purposes Only…" (italic, centred)
 */
export default function DocFooter() {
  return (
    <View style={S.docFooter} fixed>
      <View style={S.docFooterRow}>
        <Text style={S.docFooterTxt}>
          Keystone Heights Airport (42J) · AAM Readiness Assessment · {today}
        </Text>
        <Text
          style={S.docFooterTxt}
          render={({ pageNumber }) => `Page ${pageNumber}`}
        />
      </View>
      <Text style={S.docFooterDisclaimer}>
        PRELIMINARY — For Planning Purposes Only. Not a substitute for FAA-approved engineering review.
      </Text>
    </View>
  );
}
