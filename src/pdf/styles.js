/**
 * styles.js
 * Centralised style sheet for all three PDF report tiers.
 *
 * Typography (built-in react-pdf fonts):
 *   Body text   → Times-Roman  (closest available to Source Serif 4)
 *   Headers / tables → Helvetica (closest available to Source Sans 3)
 *
 * FAA Color Palette:
 *   Navy  #003A70  ·  Blue  #0057A8  ·  Gray  #6D6E71
 *   Green #1B7A3E  ·  Amber #C8590A  ·  Red   #B30000
 *   Light bg #F5F7FA  ·  Border #D1D5DB
 */

import { StyleSheet } from '@react-pdf/renderer';

// ─── Color constants ──────────────────────────────────────────────────────────
export const C = {
  // FAA brand (official palette — FAA document standard)
  navy:    '#003087',  // FAA Blue
  blue:    '#0076CE',  // FAA Light Blue
  gray:    '#666666',  // FAA Medium Gray
  green:   '#1A7F4B',  // OPTIMAL / PASS green
  amber:   '#B35C00',  // CONDITIONAL amber
  red:     '#C0392B',  // NOT READY / FAIL red
  // Extended palette
  navyMid: '#1a5491',
  lightBlue: '#5BA3D9',
  white:   '#ffffff',
  light:   '#F5F7FA',
  border:  '#CCCCCC',
  bodyText:'#333333',  // FAA Dark Gray
  mutedText:'#666666', // FAA Medium Gray
  // Status backgrounds (light tints — FAA spec)
  greenBg: '#E8F5EE', greenTxt: '#1A7F4B',
  amberBg: '#FFF3E0', amberTxt: '#B35C00',
  redBg:   '#FDECEC', redTxt:   '#C0392B',
  blueBg:  '#E6F1FB', blueTxt:  '#0076CE',
};

export const S = StyleSheet.create({

  // ── PAGE ─────────────────────────────────────────────────────────────────
  // paddingTop reserves space for the fixed DocHeader (~36px)
  // paddingBottom reserves space for the fixed DocFooter (~44px)
  page: {
    fontFamily: 'Times-Roman',
    backgroundColor: C.white,
    paddingTop: 50,
    paddingBottom: 56,
  },

  // ── COVER PAGE ───────────────────────────────────────────────────────────
  coverPage: {
    fontFamily: 'Helvetica',
    backgroundColor: C.white,
    flexDirection: 'column',
  },
  coverNavyBar: {
    backgroundColor: C.navy,
    padding: '18 40',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverNavyBarLeft:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#94a3b8', letterSpacing: 1 },
  coverNavyBarRight: { fontSize: 9, color: '#94a3b8' },
  coverHeroBlock: {
    backgroundColor: C.navy,
    padding: '32 40 28',
  },
  coverHeroLabel: {
    fontSize: 9, fontFamily: 'Helvetica-Bold', letterSpacing: 2.5,
    color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6,
  },
  coverHeroTitle: {
    fontSize: 28, fontFamily: 'Helvetica-Bold', color: C.white,
    lineHeight: 1.2, marginBottom: 4,
  },
  coverHeroSubtitle: {
    fontSize: 11, color: '#94a3b8', marginBottom: 2,
  },
  coverHeroMeta: {
    fontSize: 9, color: '#64748b', marginTop: 8, lineHeight: 1.6,
  },

  // Score + confidence block
  coverScoreBlock: {
    flexDirection: 'row',
    padding: '24 40',
    borderBottom: `1 solid ${C.border}`,
    gap: 24,
  },
  coverScoreLeft: {
    width: 160,
    backgroundColor: C.navy,
    borderRadius: 6,
    padding: '18 16',
    alignItems: 'center',
    flexShrink: 0,
  },
  coverScoreNum:    { fontSize: 52, fontFamily: 'Helvetica-Bold', color: C.white, lineHeight: 1 },
  coverScoreDenom:  { fontSize: 13, color: '#94a3b8', marginTop: 2 },
  coverScoreCI:     { fontSize: 8, color: '#64748b', marginTop: 4, textAlign: 'center' },
  coverVerdictBadge:{ marginTop: 10, backgroundColor: C.greenBg, border: `1 solid #86efac`, borderRadius: 4, padding: '4 12' },
  coverVerdictTxt:  { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.greenTxt, letterSpacing: 0.5 },
  coverConfBlock: {
    flex: 1,
    paddingLeft: 16,
    borderLeft: `1 solid ${C.border}`,
  },
  coverConfLabel: {
    fontSize: 8, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5,
    color: C.mutedText, textTransform: 'uppercase', marginBottom: 6,
  },
  coverConfRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  coverConfDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  coverConfTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.bodyText },
  coverConfPct:   { fontSize: 10, color: C.mutedText, marginTop: 2 },
  coverConfNote:  { fontSize: 9, color: C.mutedText, marginTop: 6, lineHeight: 1.6 },
  coverOptConfig: { fontSize: 10, color: C.bodyText, marginTop: 12 },
  coverOptConfigBold: { fontFamily: 'Helvetica-Bold' },

  // Key stats bar
  coverStatsBar: {
    flexDirection: 'row',
    padding: '16 40',
    borderBottom: `1 solid ${C.border}`,
  },
  coverStat:    { flex: 1, alignItems: 'center' },
  coverStatVal: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: C.navy },
  coverStatLbl: { fontSize: 8, color: C.mutedText, marginTop: 3, textAlign: 'center' },

  // Cover tier badge
  coverTierBadge: {
    backgroundColor: C.blueBg,
    border: `1 solid ${C.blue}`,
    borderRadius: 3,
    padding: '3 10',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  coverTierBadgeTxt: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.blue, letterSpacing: 1 },

  // ── DOC HEADER (fixed, top of every interior page) ───────────────────────
  docHeader: {
    position: 'absolute', top: 0, left: 0, right: 0,
    backgroundColor: C.navy,
    padding: '9 40',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docHeaderLeft:  { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#94a3b8', letterSpacing: 0.5 },
  docHeaderRight: { fontSize: 8, color: '#94a3b8' },

  // ── DOC FOOTER (fixed, bottom of every page) ─────────────────────────────
  docFooter: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    borderTop: `1 solid ${C.border}`,
    backgroundColor: C.white,
    padding: '6 40 4',
  },
  docFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  docFooterTxt:       { fontSize: 8, color: C.mutedText },
  docFooterDisclaimer:{ fontSize: 7, color: '#94a3b8', textAlign: 'center', fontStyle: 'italic' },

  // ── SECTION BANNER (full-width navy, like ref p17 "6. READINESS SCORE…") ─
  sectionBanner: {
    backgroundColor: C.navy,
    padding: '10 40',
    marginBottom: 0,
  },
  sectionBannerTxt: {
    fontSize: 13, fontFamily: 'Helvetica-Bold',
    color: C.white, letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ── BODY ─────────────────────────────────────────────────────────────────
  body: { padding: '0 40 20', flex: 1 },

  // ── TYPOGRAPHY ───────────────────────────────────────────────────────────
  h2: {
    fontSize: 14, fontFamily: 'Helvetica-Bold',
    color: C.navy, marginTop: 18, marginBottom: 6,
  },
  h3: {
    fontSize: 11, fontFamily: 'Helvetica-Bold',
    color: C.navy, marginTop: 12, marginBottom: 4,
  },
  p: {
    fontSize: 10, fontFamily: 'Times-Roman',
    color: C.bodyText, lineHeight: 1.75, marginBottom: 8,
    textAlign: 'justify',
  },
  captionItalic: {
    fontSize: 8, fontFamily: 'Times-Italic',
    color: C.mutedText, textAlign: 'center',
    marginTop: 4, marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 8, fontFamily: 'Helvetica-Bold',
    letterSpacing: 2, color: C.mutedText,
    textTransform: 'uppercase', marginBottom: 3,
  },
  sub: {
    fontSize: 9, color: C.mutedText,
    fontFamily: 'Times-Italic', marginBottom: 12,
  },

  // ── TABLE ────────────────────────────────────────────────────────────────
  table: { marginTop: 8, marginBottom: 4 },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: C.navy,
    padding: '6 10',
  },
  tableRow: {
    flexDirection: 'row',
    padding: '6 10',
    borderBottom: `1 solid ${C.border}`,
  },
  tableRowAlt:  { backgroundColor: '#EEF2F7' },
  tableRowLast: { borderBottom: 0 },
  th:      { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#cbd5e1', letterSpacing: 0.5 },
  td:      { fontSize: 9, fontFamily: 'Times-Roman', color: C.bodyText },
  tdBold:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.navy },
  tdGreen: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.greenTxt },
  tdAmber: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.amberTxt },
  tdRed:   { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.redTxt },
  tdBlue:  { fontSize: 9, color: C.blue },
  tdMuted: { fontSize: 9, color: C.mutedText, fontStyle: 'italic' },
  tableCaption: {
    fontSize: 8, fontFamily: 'Times-Italic',
    color: C.mutedText, textAlign: 'center', marginTop: 4, marginBottom: 14,
  },

  // ── STATUS BADGES ────────────────────────────────────────────────────────
  badge: {
    borderRadius: 3, padding: '3 8',
    fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5,
    textAlign: 'center', flexShrink: 0,
  },
  badgePass:        { backgroundColor: C.greenBg, color: C.greenTxt },
  badgeFail:        { backgroundColor: C.redBg,   color: C.redTxt },
  badgeCond:        { backgroundColor: C.amberBg, color: C.amberTxt },
  badgeOptimal:     { backgroundColor: '#dbeafe',  color: C.navy },
  badgeReady:       { backgroundColor: '#dcfce7',  color: C.greenTxt },
  badgeNotReady:    { backgroundColor: C.redBg,    color: C.redTxt },
  badgeConditional: { backgroundColor: C.amberBg,  color: C.amberTxt },

  // ── GATE TABLE ───────────────────────────────────────────────────────────
  gateRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingVertical: 10, borderBottom: `1 solid ${C.border}`,
  },
  gateRowLast: { borderBottom: 0 },
  gateBadge: {
    width: 44, textAlign: 'center',
    padding: '4 0', borderRadius: 3,
    fontSize: 7, fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5, marginRight: 14, marginTop: 1, flexShrink: 0,
  },
  gateTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, marginBottom: 2 },
  gateDesc:  { fontSize: 9, fontFamily: 'Times-Roman', color: C.mutedText, lineHeight: 1.6 },
  gateBasis: { fontSize: 8, color: C.blue, marginTop: 3 },

  // ── CARD ─────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: C.white,
    border: `1 solid ${C.border}`,
    borderRadius: 4,
    padding: '14 18',
    marginBottom: 10,
  },
  cardGreen: { borderLeft: `4 solid ${C.green}` },
  cardAmber: { borderLeft: `4 solid ${C.amber}` },
  cardRed:   { borderLeft: `4 solid ${C.red}` },
  cardBlue:  { borderLeft: `4 solid ${C.blue}` },
  cardNavy:  { borderLeft: `4 solid ${C.navy}` },

  // ── CALLOUT ──────────────────────────────────────────────────────────────
  callout: {
    backgroundColor: '#f0fdf4', border: `1 solid #86efac`,
    borderRadius: 4, padding: '10 14', marginTop: 12,
  },
  calloutAmber: {
    backgroundColor: '#fffbeb', border: `1 solid #fcd34d`,
    borderRadius: 4, padding: '10 14', marginTop: 10,
  },
  calloutWarn: {
    backgroundColor: '#fff7ed', border: `1 solid #fed7aa`,
    borderRadius: 4, padding: '10 14', marginTop: 10,
  },
  calloutTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.greenTxt, marginBottom: 4 },
  calloutTitleAmber: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.amberTxt, marginBottom: 4 },
  calloutTxt:   { fontSize: 9, fontFamily: 'Times-Roman', color: '#166534', lineHeight: 1.65 },
  calloutTxtAmber: { fontSize: 9, fontFamily: 'Times-Roman', color: C.amberTxt, lineHeight: 1.65 },
  calloutWarnTxt:  { fontSize: 9, fontFamily: 'Times-Roman', color: '#9a3412', lineHeight: 1.65 },

  // ── UPSELL CALLOUT (Prelim) ───────────────────────────────────────────────
  upsell: {
    backgroundColor: C.blueBg,
    border: `1 solid ${C.blue}`,
    borderRadius: 4,
    padding: '10 14',
    marginTop: 16,
  },
  upsellTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.blue, marginBottom: 3 },
  upsellTxt:   { fontSize: 9, fontFamily: 'Times-Roman', color: C.blueTxt, lineHeight: 1.65 },

  // ── DIVIDER ──────────────────────────────────────────────────────────────
  divider: { borderBottom: `1 solid ${C.border}`, marginVertical: 14 },
  dividerNavy: { borderBottom: `2 solid ${C.navy}`, marginVertical: 14 },

  // ── SCENARIO MATRIX ──────────────────────────────────────────────────────
  matrixColRow:    { flexDirection: 'row', marginBottom: 4, marginLeft: 58 },
  matrixColHdr:    { flex: 1, alignItems: 'center', paddingHorizontal: 2 },
  matrixColHdrTxt: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.mutedText, textAlign: 'center' },
  matrixRow:       { flexDirection: 'row', alignItems: 'stretch', marginBottom: 3 },
  matrixRowLbl:    { width: 58, paddingRight: 6, justifyContent: 'center' },
  matrixRowLblTxt: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.mutedText, textAlign: 'right' },
  matrixCell:      { flex: 1, borderRadius: 4, padding: '10 6', alignItems: 'center', marginHorizontal: 2 },
  matrixCellTxt:   { fontSize: 8, fontFamily: 'Helvetica-Bold', textAlign: 'center' },
  matrixCellSub:   { fontSize: 7, textAlign: 'center', marginTop: 2 },
  matrixCellCI:    { fontSize: 6, textAlign: 'center', marginTop: 1, fontStyle: 'italic' },
  cellNavy:  { backgroundColor: '#dbeafe' },  // optimal
  cellGreen: { backgroundColor: '#dcfce7' },  // ready
  cellAmber: { backgroundColor: '#fff7ed' },  // conditional
  cellRed:   { backgroundColor: '#fee2e2' },  // not ready
  cellGray:  { backgroundColor: '#f1f5f9' },  // n/a / zero

  // ── CHART FIGURE ─────────────────────────────────────────────────────────
  chartFigure:       { marginTop: 10, marginBottom: 4, alignItems: 'center' },
  chartFigureImage:  { width: '100%' },
  chartFigureCaption:{ fontSize: 8, fontFamily: 'Times-Italic', color: C.mutedText, textAlign: 'center', marginTop: 4 },

  // ── TOC ──────────────────────────────────────────────────────────────────
  tocEntry: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-end', marginBottom: 5,
    borderBottom: `1 solid ${C.border}`,
    paddingBottom: 3,
  },
  tocEntrySection: { flexDirection: 'row', alignItems: 'baseline', flex: 1 },
  tocNum:    { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, width: 32, flexShrink: 0 },
  tocTitle:  { fontSize: 10, fontFamily: 'Times-Roman', color: C.bodyText },
  tocPage:   { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, minWidth: 24, textAlign: 'right' },
  tocSubEntry: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-end', marginBottom: 3,
    paddingLeft: 32, paddingBottom: 2,
  },
  tocSubTitle: { fontSize: 9, fontFamily: 'Times-Roman', color: C.mutedText, flex: 1 },
  tocSubPage:  { fontSize: 9, color: C.mutedText, minWidth: 24, textAlign: 'right' },

  // ── CONFIG GRID ──────────────────────────────────────────────────────────
  configGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  configItem: {
    backgroundColor: C.light, border: `1 solid ${C.border}`,
    borderRadius: 4, padding: '10 12',
    width: '31%', marginRight: '2%', marginBottom: 8,
    alignItems: 'center',
  },
  configVal:  { fontSize: 16, fontFamily: 'Helvetica-Bold', color: C.navy },
  configLbl:  { fontSize: 8, color: C.mutedText, marginTop: 3, textAlign: 'center' },
  configNote: { fontSize: 7, color: C.amber, marginTop: 2, textAlign: 'center' },

  // ── STAT CHIP ROW ────────────────────────────────────────────────────────
  statRow:  { flexDirection: 'row', marginBottom: 12 },
  statChip: {
    flex: 1, backgroundColor: C.light, border: `1 solid ${C.border}`,
    borderRadius: 4, padding: '9 10', alignItems: 'center', marginRight: 6,
  },
  statChipLast:  { marginRight: 0 },
  statChipVal:   { fontSize: 15, fontFamily: 'Helvetica-Bold', color: C.navy },
  statChipLbl:   { fontSize: 8, color: C.mutedText, marginTop: 2, textAlign: 'center' },

  // ── TIMELINE (phased roadmap) ─────────────────────────────────────────────
  timeline:    { flexDirection: 'row', marginTop: 10, gap: 6 },
  phase: {
    flex: 1, backgroundColor: C.light, border: `1 solid ${C.border}`,
    borderRadius: 4, padding: '10 10', alignItems: 'center',
  },
  phaseDot:    { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  phaseDotTxt: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.white },
  phaseTitle:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.navy, textAlign: 'center' },
  phaseMonths: { fontSize: 8, color: C.mutedText, marginTop: 2, textAlign: 'center' },
  phaseItem:   { fontSize: 8, fontFamily: 'Times-Roman', color: C.mutedText, textAlign: 'center', lineHeight: 1.5, marginTop: 2 },
  phaseCapex:  { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, marginTop: 6, textAlign: 'center' },

  // ── METHODOLOGY STEPS ────────────────────────────────────────────────────
  methodStep:      { flexDirection: 'row', marginBottom: 12 },
  methodNumCircle: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center',
    marginRight: 10, marginTop: 1, flexShrink: 0,
  },
  methodNumTxt:  { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.white },
  methodContent: { flex: 1 },
  methodTitle:   { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.navy, marginBottom: 4 },
  methodBullet:  { flexDirection: 'row', marginBottom: 3 },
  bulletDot:     { fontSize: 9, color: C.navy, marginRight: 6, marginTop: 1 },
  bulletText:    { fontSize: 9, fontFamily: 'Times-Roman', color: C.bodyText, lineHeight: 1.6, flex: 1 },

  // ── TWO-COLUMN ───────────────────────────────────────────────────────────
  twoCol: { flexDirection: 'row', gap: 16, marginBottom: 10 },
  col:    { flex: 1 },

});
