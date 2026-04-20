import { View, Text } from '@react-pdf/renderer';
import { S } from './styles';

export default function PageHeader({ section }) {
  return (
    <View style={S.pageHeader} fixed>
      <Text style={S.pageHeaderLogo}>
        <Text style={S.pageHeaderLogoMuted}>AAM</Text>
        <Text style={S.pageHeaderLogoWhite}>Readiness</Text>
      </Text>
      <Text style={S.pageHeaderSection}>{section}</Text>
    </View>
  );
}
