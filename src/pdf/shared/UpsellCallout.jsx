import { View, Text } from '@react-pdf/renderer';
import { S } from '../styles';

/**
 * UpsellCallout — blue upgrade nudge used at the end of each Prelim section.
 *
 * Props:
 *   title    {string}  Callout header
 *   message  {string}  Body text
 */
export default function UpsellCallout({ title, message }) {
  return (
    <View style={S.upsell} wrap={false}>
      <Text style={S.upsellTitle}>{title}</Text>
      <Text style={S.upsellTxt}>{message}</Text>
    </View>
  );
}
