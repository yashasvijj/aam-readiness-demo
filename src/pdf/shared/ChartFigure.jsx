import { View, Text, Image } from '@react-pdf/renderer';
import { S } from '../styles';

/**
 * ChartFigure — wraps a base64 chart image with a numbered caption.
 *
 * Props:
 *   src     {string}   base64 PNG data URL from generateCharts()
 *   num     {number}   Figure number
 *   caption {string}   Caption text (source citation appended automatically)
 *   source  {string}   Optional source note
 *   height  {number}   Image height in points (default 200)
 */
export default function ChartFigure({ src, num, caption, source, height = 200 }) {
  if (!src) return null;
  const sourceStr = source ? ` Source: ${source}` : '';
  return (
    <View style={S.chartFigure} wrap={false}>
      <Image src={src} style={[S.chartFigureImage, { height }]} />
      <Text style={S.chartFigureCaption}>
        Figure {num}. {caption}.{sourceStr}
      </Text>
    </View>
  );
}
