import { StyleSheet } from '@react-pdf/renderer';

export const C = {
  navy:    '#0f172a',
  navyMid: '#1e3a5f',
  accent:  '#6366f1',
  green:   '#22c55e',
  teal:    '#0d9488',
  red:     '#ef4444',
  yellow:  '#f59e0b',
  blue:    '#3b82f6',
  muted:   '#64748b',
  light:   '#f8fafc',
  border:  '#e2e8f0',
  white:   '#ffffff',
  greenBg: '#dcfce7', greenTxt: '#15803d',
  redBg:   '#fee2e2', redTxt:   '#991b1b',
  tealBg:  '#ccfbf1', tealTxt:  '#0f766e',
  accentBg:'#ede9fe',
};

export const S = StyleSheet.create({

  // ── PAGE ──
  page: { fontFamily: 'Helvetica', backgroundColor: C.white, paddingBottom: 52, paddingTop: 62 },

  // ── LEGACY COVER (header band + hero + stats bar) ──
  coverHeader: {
    backgroundColor: C.navy, padding: '32 48',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  coverLogoMuted: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#94a3b8', letterSpacing: 1 },
  coverLogoWhite: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: C.white,   letterSpacing: 1 },
  tierBadge: {
    fontSize: 10, fontFamily: 'Helvetica-Bold', letterSpacing: 1,
    color: C.white, backgroundColor: 'rgba(255,255,255,0.15)',
    padding: '4 12', borderRadius: 4,
  },
  heroBand: {
    backgroundColor: '#1e3a5f', padding: '36 48 28',
    flexDirection: 'row', alignItems: 'center', gap: 40,
  },
  scoreBox: {
    width: 110, height: 110, borderRadius: 55, backgroundColor: C.navy,
    border: '3 solid #22c55e', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  scoreNum:   { fontSize: 36, fontFamily: 'Helvetica-Bold', color: C.white, lineHeight: 1 },
  scoreDenom: { fontSize: 12, color: '#94a3b8' },
  scoreBadge: { marginTop: 4, backgroundColor: C.green, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 99 },
  scoreBadgeTxt: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.white, letterSpacing: 1 },
  heroRight: { flex: 1 },
  heroH1:    { fontSize: 20, fontFamily: 'Helvetica-Bold', color: C.white, marginBottom: 6 },
  heroSub:   { fontSize: 11, color: '#94a3b8', lineHeight: 1.6 },
  pillRow:   { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.08)', border: '1 solid rgba(255,255,255,0.12)',
    borderRadius: 4, padding: '4 10', flexDirection: 'row', alignItems: 'center', gap: 5,
  },
  pillDot:  { width: 5, height: 5, borderRadius: 99, backgroundColor: C.green },
  pillText: { fontSize: 9, color: '#cbd5e1' },
  statsBar: {
    backgroundColor: C.white, borderBottom: `1 solid ${C.border}`,
    flexDirection: 'row', justifyContent: 'space-around', padding: '14 48',
  },
  stat:    { alignItems: 'center' },
  statVal: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: C.accent },
  statLbl: { fontSize: 8, color: C.muted, marginTop: 2 },

  // ── COVER PAGE ──
  coverPage: { fontFamily: 'Helvetica', backgroundColor: C.white, flexDirection: 'column' },
  coverTopBar: {
    backgroundColor: C.navy, padding: '16 40',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  coverTopLogo:      { fontSize: 14, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 },
  coverTopLogoMuted: { color: '#64748b' },
  coverTopLogoWhite: { color: C.white },
  coverTopBadge: {
    fontSize: 8, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5,
    color: '#94a3b8', border: '1 solid #334155',
    padding: '4 12', borderRadius: 3,
  },
  coverMain: {
    flex: 1, padding: '52 48 36',
    flexDirection: 'column',
  },
  coverAirportLabel: {
    fontSize: 9, fontFamily: 'Helvetica-Bold', letterSpacing: 2.5,
    color: C.muted, textTransform: 'uppercase', marginBottom: 8,
  },
  coverAirportName: {
    fontSize: 32, fontFamily: 'Helvetica-Bold', color: C.navy,
    lineHeight: 1.15, marginBottom: 6,
  },
  coverAirportSub: { fontSize: 12, color: C.muted, marginBottom: 28 },
  coverRule: { borderBottom: `2 solid ${C.navy}`, marginBottom: 28, width: 48 },
  coverScoreRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 },
  coverScoreNum:   { fontSize: 64, fontFamily: 'Helvetica-Bold', color: C.navy, lineHeight: 1 },
  coverScoreDenom: { fontSize: 18, color: C.muted, marginBottom: 10, marginLeft: 4 },
  coverVerdictBadge: {
    backgroundColor: '#dcfce7', border: `1 solid #86efac`,
    borderRadius: 4, padding: '5 14', marginLeft: 18, marginBottom: 12,
  },
  coverVerdictTxt: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#15803d', letterSpacing: 0.5 },
  coverScoreLabel: { fontSize: 10, color: C.muted, marginBottom: 32 },
  coverFactsRow: { flexDirection: 'row', gap: 10, marginBottom: 36 },
  coverFact: {
    flex: 1, backgroundColor: C.light, border: `1 solid ${C.border}`,
    borderRadius: 6, padding: '12 14',
  },
  coverFactVal: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: C.navy, marginBottom: 3 },
  coverFactLbl: { fontSize: 8, color: C.muted, lineHeight: 1.5 },
  coverStatsRow: {
    flexDirection: 'row', borderTop: `1 solid ${C.border}`, paddingTop: 20, marginTop: 24,
  },
  coverStat:    { flex: 1, alignItems: 'center' },
  coverStatVal: { fontSize: 18, fontFamily: 'Helvetica-Bold' },
  coverStatLbl: { fontSize: 8, color: C.muted, marginTop: 3, textAlign: 'center' },
  coverDateLine: {
    padding: '12 48', borderTop: `1 solid ${C.border}`,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  coverDateTxt: { fontSize: 8, color: C.muted },

  // ── PAGE HEADER (subsequent pages) ──
  pageHeader: {
    position: 'absolute', top: 0, left: 0, right: 0,
    backgroundColor: C.navy, padding: '14 40',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  pageHeaderLogo:      { fontSize: 12, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 },
  pageHeaderLogoMuted: { color: '#64748b' },
  pageHeaderLogoWhite: { color: C.white },
  pageHeaderSection: {
    fontSize: 8, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5,
    color: '#94a3b8', textTransform: 'uppercase',
  },

  // ── BODY ──
  body: { padding: '0 40 24', flex: 1 },

  // ── TYPOGRAPHY ──
  sectionLabel: {
    fontSize: 8, fontFamily: 'Helvetica-Bold', letterSpacing: 2,
    color: C.muted, textTransform: 'uppercase', marginBottom: 5,
  },
  h2:  { fontSize: 16, fontFamily: 'Helvetica-Bold', color: C.navy, marginBottom: 4 },
  h3:  { fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.navy, marginBottom: 4 },
  sub: { fontSize: 10, color: C.muted, marginBottom: 14 },
  p:   { fontSize: 10, color: '#334155', lineHeight: 1.7, marginBottom: 10 },

  // ── SECTION BLOCK ──
  section: { marginBottom: 24 },

  // ── CARD ──
  card: {
    backgroundColor: C.white, border: `1 solid ${C.border}`,
    borderRadius: 8, padding: '18 22', marginBottom: 14,
  },
  cardAccent: { borderLeft: `4 solid ${C.accent}` },
  cardGreen:  { borderLeft: `4 solid ${C.green}` },
  cardRed:    { borderLeft: `4 solid ${C.red}` },

  // ── TWO-COLUMN ──
  twoCol: { flexDirection: 'row', gap: 14, marginBottom: 14 },
  col:    { flex: 1 },

  // ── CONFIG GRID ──
  configGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  configItem: {
    backgroundColor: C.light, border: `1 solid ${C.border}`,
    borderRadius: 6, padding: '12 14', width: '31%',
    marginRight: '2%', marginBottom: 8, alignItems: 'center',
  },
  configVal:  { fontSize: 18, fontFamily: 'Helvetica-Bold', color: C.accent },
  configLbl:  { fontSize: 8, color: C.muted, marginTop: 3, textAlign: 'center' },
  configNote: { fontSize: 7, color: C.yellow, marginTop: 2 },

  // ── GATE ROWS ──
  gateRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingVertical: 12, borderBottom: `1 solid ${C.border}`,
  },
  gateRowLast: { borderBottom: 0 },
  gateBadge: {
    width: 44, textAlign: 'center', padding: '4 0',
    borderRadius: 4, fontSize: 7, fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5, marginRight: 14, marginTop: 1, flexShrink: 0,
  },
  gatePass:  { backgroundColor: C.greenBg, color: C.greenTxt },
  gateFail:  { backgroundColor: C.redBg,   color: C.redTxt },
  gateTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, marginBottom: 3 },
  gateDesc:  { fontSize: 9, color: C.muted, lineHeight: 1.6 },

  // ── METHODOLOGY ──
  methodStep: {
    flexDirection: 'row', marginBottom: 14,
  },
  methodNumCircle: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center',
    marginRight: 12, marginTop: 1, flexShrink: 0,
  },
  methodNumTxt: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.white },
  methodContent: { flex: 1 },
  methodTitle:   { fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.navy, marginBottom: 5 },
  methodBullet:  { flexDirection: 'row', marginBottom: 4 },
  bulletDot:     { fontSize: 9, color: C.accent, marginRight: 6, marginTop: 1 },
  bulletText:    { fontSize: 9, color: '#334155', lineHeight: 1.6, flex: 1 },

  // ── TIMELINE ──
  timeline:    { flexDirection: 'row', marginTop: 10 },
  phase:       { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
  phaseLine:   { position: 'absolute', top: 16, left: '50%', right: '-50%', height: 2, backgroundColor: C.border },
  phaseDot:    { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  phaseDotTxt: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C.white },
  phaseTitle:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.navy, textAlign: 'center' },
  phaseMonths: { fontSize: 8, color: C.muted, marginTop: 2, textAlign: 'center' },
  phaseItem:   { fontSize: 8, color: C.muted, textAlign: 'center', lineHeight: 1.7, marginTop: 1 },
  phaseCapex:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.navy, marginTop: 6, textAlign: 'center' },

  // ── TABLES ──
  table:     { marginTop: 6 },
  tableHead: {
    flexDirection: 'row', backgroundColor: C.navy,
    padding: '7 10', borderRadius: '4 4 0 0',
  },
  tableRow:     { flexDirection: 'row', padding: '7 10', borderBottom: `1 solid ${C.border}` },
  tableRowAlt:  { backgroundColor: C.light },
  tableRowLast: { borderBottom: 0 },
  th:  { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#94a3b8', letterSpacing: 0.5 },
  td:  { fontSize: 9, color: C.navy },
  tdBold:  { fontSize: 9, color: C.navy, fontFamily: 'Helvetica-Bold' },
  tdGreen: { fontSize: 9, color: C.greenTxt, fontFamily: 'Helvetica-Bold' },
  tdMuted: { fontSize: 9, color: C.muted, fontStyle: 'italic' },
  tdAccent:{ fontSize: 9, color: C.accent, fontFamily: 'Helvetica-Bold' },
  tdBlue:  { fontSize: 9, color: C.blue },
  tdTeal:  { fontSize: 9, color: C.tealTxt },

  // ── SCENARIO MATRIX ──
  matrixGrid:     { marginTop: 8 },
  matrixColRow:   { flexDirection: 'row', marginBottom: 4, marginLeft: 52 },
  matrixColHdr:   { flex: 1, alignItems: 'center' },
  matrixColHdrTxt:{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.muted, textAlign: 'center' },
  matrixRow:      { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  matrixRowLbl:   { width: 52, paddingRight: 6 },
  matrixRowLblTxt:{ fontSize: 8, color: C.muted, textAlign: 'right', fontFamily: 'Helvetica-Bold' },
  matrixCell:     { flex: 1, borderRadius: 6, padding: '10 8', alignItems: 'center', marginHorizontal: 2 },
  cellGreen:      { backgroundColor: '#dcfce7' },
  cellTeal:       { backgroundColor: '#ccfbf1' },
  cellRed:        { backgroundColor: '#fee2e2' },
  matrixCellTxt:  { fontSize: 8, fontFamily: 'Helvetica-Bold', textAlign: 'center' },
  matrixCellSub:  { fontSize: 7, textAlign: 'center', marginTop: 2 },
  greenTxt: { color: C.greenTxt },
  tealTxt:  { color: C.tealTxt },
  redTxt:   { color: C.redTxt },

  // ── SCENARIO DETAIL ──
  scenarioCard: {
    borderRadius: 6, padding: '10 14', marginBottom: 8,
    border: `1 solid ${C.border}`,
  },
  scenarioHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  scenarioBadge:  {
    fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5,
    padding: '3 8', borderRadius: 4, marginRight: 10, flexShrink: 0,
  },
  scenarioTitle:  { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy },
  scenarioMetrics:{ flexDirection: 'row', flexWrap: 'wrap' },
  metricChip: {
    backgroundColor: C.light, border: `1 solid ${C.border}`,
    borderRadius: 4, padding: '5 10', marginRight: 6, marginBottom: 4,
    alignItems: 'center', minWidth: 64,
  },
  metricVal: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy },
  metricLbl: { fontSize: 7, color: C.muted, marginTop: 1 },

  // ── CALLOUT ──
  callout: {
    backgroundColor: '#f0fdf4', border: `1 solid #bbf7d0`,
    borderRadius: 6, padding: '12 16', marginTop: 14,
  },
  calloutWarn: {
    backgroundColor: '#fff7ed', border: `1 solid #fed7aa`,
    borderRadius: 6, padding: '12 16', marginTop: 10,
  },
  calloutTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#14532d', marginBottom: 4 },
  calloutTxt:   { fontSize: 9, color: '#166534', lineHeight: 1.7 },
  calloutWarnTxt:{ fontSize: 9, color: '#9a3412', lineHeight: 1.7 },

  // ── DIVIDER ──
  divider: { borderBottom: `1 solid ${C.border}`, marginVertical: 16 },

  // ── STAT CHIPS (inline) ──
  statRow:  { flexDirection: 'row', marginBottom: 14 },
  statChip: {
    flex: 1, backgroundColor: C.light, border: `1 solid ${C.border}`,
    borderRadius: 6, padding: '10 12', alignItems: 'center', marginRight: 8,
  },
  statChipLast: { marginRight: 0 },
  statChipVal:  { fontSize: 16, fontFamily: 'Helvetica-Bold' },
  statChipLbl:  { fontSize: 8, color: C.muted, marginTop: 3, textAlign: 'center' },

  // ── FOOTER ──
  pageFooter: {
    position: 'absolute', bottom: 18, left: 40, right: 40,
    flexDirection: 'row', justifyContent: 'space-between',
    borderTop: `1 solid ${C.border}`, paddingTop: 7,
  },
  footerTxt: { fontSize: 8, color: C.muted },
});
