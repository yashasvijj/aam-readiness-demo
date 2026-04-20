import { View, Text } from '@react-pdf/renderer';
import { S } from '../styles';

/**
 * DocHeader — fixed navy bar at top of every interior page.
 * Matches the reference: "STANDARD AAM READINESS ASSESSMENT · KEYSTONE HEIGHTS AIRPORT (42J)"
 * left-aligned, document number right-aligned.
 */
export default function DocHeader({ tierLabel, docId }) {
  return (
    <View style={S.docHeader} fixed>
      <Text style={S.docHeaderLeft}>
        {tierLabel.toUpperCase()} AAM READINESS ASSESSMENT · KEYSTONE HEIGHTS AIRPORT (42J)
      </Text>
      <Text style={S.docHeaderRight}>Document No. {docId}</Text>
    </View>
  );
}
