import { View, Text } from '@react-pdf/renderer';
import { S } from '../styles';

/**
 * DataTable — reusable styled table component.
 *
 * Props:
 *   headers   {string[]}              Column header labels
 *   rows      {(string|ReactNode)[][]} 2-D array of cell values
 *   flex      {number[]}              Optional flex weights per column (default: all 1)
 *   caption   {string}                Optional italic caption below the table
 *   highlight {number}                Optional column index to highlight (bold navy)
 *   statusCols {number[]}             Column indices that contain PASS/FAIL/CONDITIONAL
 */
export default function DataTable({ headers, rows, flex, caption, highlight, statusCols = [] }) {
  const colFlex = flex ?? headers.map(() => 1);

  function cellStyle(colIdx, value) {
    if (statusCols.includes(colIdx)) {
      if (typeof value === 'string') {
        if (value.includes('PASS'))        return [S.td, S.tdGreen, { flex: colFlex[colIdx] }];
        if (value.includes('FAIL'))        return [S.td, S.tdRed,   { flex: colFlex[colIdx] }];
        if (value.includes('CONDITIONAL')) return [S.td, S.tdAmber, { flex: colFlex[colIdx] }];
      }
    }
    if (colIdx === highlight) return [S.tdBold, { flex: colFlex[colIdx] }];
    return [S.td, { flex: colFlex[colIdx] }];
  }

  return (
    <View style={S.table} wrap={false}>
      {/* Header row */}
      <View style={S.tableHead}>
        {headers.map((h, i) => (
          <Text key={i} style={[S.th, { flex: colFlex[i] }]}>{h}</Text>
        ))}
      </View>
      {/* Data rows */}
      {rows.map((row, ri) => (
        <View
          key={ri}
          style={[
            S.tableRow,
            ri % 2 !== 0 ? S.tableRowAlt : {},
            ri === rows.length - 1 ? S.tableRowLast : {},
          ]}
        >
          {row.map((cell, ci) => (
            <Text key={ci} style={cellStyle(ci, cell)}>{cell ?? ''}</Text>
          ))}
        </View>
      ))}
      {caption && <Text style={S.tableCaption}>{caption}</Text>}
    </View>
  );
}
