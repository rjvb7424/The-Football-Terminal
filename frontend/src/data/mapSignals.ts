export type SignalType = 'Injury' | 'Lineup' | 'Transfer' | 'Tactical' | 'Schedule' | 'Rumour';
export type SignalStatus = 'Volatile' | 'Confirmed' | 'Live' | 'Heating Up' | 'Rumour';
export type SignalSeverity = 'High' | 'Medium' | 'Low';

export interface MapSignal {
  id: string;
  city: string;
  club: string;
  competition: string;
  type: SignalType;
  status: SignalStatus;
  severity: SignalSeverity;
  title: string;
  summary: string;
  time: string;
  coordinates: { x: number; y: number };
  impact: number;
  probability: { label: string; before: number; after: number };
  relatedOutcomes: { label: string; change: number }[];
  whyItMatters: string;
  signals: string[];
  forecast: string;
}

export const MAP_SIGNALS: MapSignal[] = [
  {
    id: 'madrid-mbappe-injury',
    city: 'Madrid',
    club: 'Real Madrid',
    competition: 'La Liga',
    type: 'Injury',
    status: 'Volatile',
    severity: 'High',
    title: 'Mbappé training absence',
    summary: "Madrid's #9 missed the final training session before a decisive league fixture. Medical staff activity reported near the treatment room.",
    time: '2 min ago',
    coordinates: { x: 46.0, y: 36.2 },
    impact: -38,
    probability: { label: 'Real Madrid title probability', before: 80, after: 42 },
    relatedOutcomes: [
      { label: 'Barcelona title probability', change: +27 },
      { label: 'Atlético title probability', change: +8 },
      { label: 'Girona title probability', change: +1 },
    ],
    whyItMatters: "Madrid's projected attacking output drops sharply. Rival title probabilities rise as the event affects upcoming fixtures and market confidence.",
    signals: ['Training absence detected', 'Medical staff activity reported', 'Two journalist signals aligned', 'Market movement confirmed'],
    forecast: 'Madrid title probability now 42% by May 25.',
  },
  {
    id: 'barcelona-lineup-leak',
    city: 'Barcelona',
    club: 'Barcelona',
    competition: 'La Liga',
    type: 'Lineup',
    status: 'Confirmed',
    severity: 'Medium',
    title: 'XI leak confirms strongest front three',
    summary: 'Reliable source confirms Barça deploy their optimal attacking trio. Formation unchanged from last week, full fitness across the squad.',
    time: '8 min ago',
    coordinates: { x: 47.4, y: 35.3 },
    impact: +11,
    probability: { label: 'Barcelona match win probability', before: 62, after: 73 },
    relatedOutcomes: [
      { label: 'Valencia win probability', change: -9 },
      { label: 'Draw probability', change: -2 },
    ],
    whyItMatters: 'Confirmed full-strength selection removes roster uncertainty. Barça market confidence rises immediately.',
    signals: ['Insider source confirmed', 'Photo leak from training verified', 'Journalist corroboration received'],
    forecast: 'Barcelona win probability 73% at kick-off.',
  },
  {
    id: 'arsenal-striker-out',
    city: 'London',
    club: 'Arsenal',
    competition: 'Premier League',
    type: 'Injury',
    status: 'Confirmed',
    severity: 'High',
    title: 'Arsenal striker ruled out',
    summary: 'Arsenal confirm their leading scorer will miss the next two fixtures. Hamstring issue sustained in training detected 6 hours before announcement.',
    time: '14 min ago',
    coordinates: { x: 48.6, y: 28.4 },
    impact: -9,
    probability: { label: 'Arsenal title probability', before: 31, after: 22 },
    relatedOutcomes: [
      { label: 'Liverpool title probability', change: +5 },
      { label: 'Man City title probability', change: +3 },
    ],
    whyItMatters: "Two key fixtures without Arsenal's top scorer changes the expected points trajectory by an estimated 3.2 points.",
    signals: ['Official club announcement', 'Training video analysis flagged absence', 'Physio reports corroborated'],
    forecast: 'Arsenal title probability falls to 22% pending fixture results.',
  },
  {
    id: 'mancity-congestion',
    city: 'Manchester',
    club: 'Man City',
    competition: 'Premier League',
    type: 'Schedule',
    status: 'Live',
    severity: 'Medium',
    title: 'City fixture congestion rising',
    summary: 'Man City now face 4 matches in 11 days after Cup rescheduling. Squad rotation signals detected in training patterns.',
    time: '21 min ago',
    coordinates: { x: 48.1, y: 27.1 },
    impact: -7,
    probability: { label: 'Man City title probability', before: 44, after: 37 },
    relatedOutcomes: [
      { label: 'Arsenal title probability', change: +4 },
      { label: 'Liverpool title probability', change: +2 },
    ],
    whyItMatters: 'Fixture congestion historically reduces City win rate by 12%. Rotation risk adds squad fatigue as a live variable.',
    signals: ['Cup rescheduling confirmed', 'Squad rotation pattern detected', 'Pep press conference language shift noted'],
    forecast: 'City projected points drop 2.1 over next 11-day window.',
  },
  {
    id: 'benfica-talent-trending',
    city: 'Lisbon',
    club: 'Benfica',
    competition: 'Primeira Liga',
    type: 'Transfer',
    status: 'Heating Up',
    severity: 'Medium',
    title: 'Benfica academy talent trending',
    summary: 'Elite youth midfielder drawing interest from 3 top-5 European clubs. Agent meetings confirmed in Lisbon this week.',
    time: '35 min ago',
    coordinates: { x: 44.7, y: 37.0 },
    impact: +18,
    probability: { label: 'Transfer completion probability', before: 22, after: 40 },
    relatedOutcomes: [
      { label: 'Premier League club interest', change: +18 },
      { label: 'Bundesliga club interest', change: +12 },
    ],
    whyItMatters: 'Agent activity and club scouting alignment suggests deal velocity is accelerating. Window opens in 8 weeks.',
    signals: ['Agent spotted at Lisbon hotel', 'Scout delegations confirmed', 'Player social media activity shift noted'],
    forecast: 'Transfer probability reaches 40% — escalating to 65% if bid submitted.',
  },
  {
    id: 'napoli-osimhen-transfer',
    city: 'Naples',
    club: 'Napoli',
    competition: 'Serie A',
    type: 'Transfer',
    status: 'Rumour',
    severity: 'High',
    title: 'Osimhen transfer velocity rising',
    summary: 'Multiple sources report Chelsea and PSG have entered formal discussions with Napoli. Release clause activation timeline accelerating.',
    time: '42 min ago',
    coordinates: { x: 51.3, y: 35.8 },
    impact: +26,
    probability: { label: 'Chelsea transfer probability', before: 18, after: 44 },
    relatedOutcomes: [
      { label: 'PSG transfer probability', change: +21 },
      { label: 'Napoli replacement search probability', change: +55 },
    ],
    whyItMatters: 'Two clubs entering formal talks simultaneously compresses the negotiation timeline and raises bidding pressure.',
    signals: ['Source A: Chelsea approach confirmed', 'Source B: PSG delegation in Naples', 'Market odds shift detected', 'Fan panic rising'],
    forecast: 'Transfer expected to complete before June 15 if bid exceeds €130m.',
  },
  {
    id: 'inter-tactical-switch',
    city: 'Milan',
    club: 'Inter Milan',
    competition: 'Serie A',
    type: 'Tactical',
    status: 'Live',
    severity: 'Medium',
    title: 'Inter tactical switch detected',
    summary: 'Inzaghi shifts to 3-4-2-1 mid-match, away from usual 3-5-2. Formation change appears to respond to opponent pressing triggers.',
    time: '1 min ago',
    coordinates: { x: 50.6, y: 32.4 },
    impact: +9,
    probability: { label: 'Inter live win probability', before: 48, after: 57 },
    relatedOutcomes: [
      { label: 'AC Milan draw probability', change: -4 },
      { label: 'Over 2.5 goals probability', change: +7 },
    ],
    whyItMatters: 'The switch opens space in wider channels. Expected goals model updates immediately after formation recognition.',
    signals: ['Live tracking data confirmed formation shift', 'Two attacking midfielder movements aligned', 'xG model recomputed'],
    forecast: 'Inter win probability now 57% — rising if formation holds for 20+ minutes.',
  },
  {
    id: 'liverpool-contract-news',
    city: 'Liverpool',
    club: 'Liverpool',
    competition: 'Premier League',
    type: 'Transfer',
    status: 'Confirmed',
    severity: 'Low',
    title: 'Key midfielder signs contract extension',
    summary: 'Liverpool confirm a 3-year extension for their creative midfielder, removing summer transfer uncertainty.',
    time: '1 hr ago',
    coordinates: { x: 47.8, y: 27.3 },
    impact: +6,
    probability: { label: 'Liverpool squad stability index', before: 71, after: 82 },
    relatedOutcomes: [
      { label: 'Rival club interest resolved', change: -30 },
    ],
    whyItMatters: "Eliminates a key squad uncertainty variable. Liverpool's summer planning now simplified.",
    signals: ['Club official announcement', 'Player statement released', 'Agent confirms deal closed'],
    forecast: 'Liverpool squad depth rating improves heading into final 6 fixtures.',
  },
  {
    id: 'dortmund-ucl-pressure',
    city: 'Dortmund',
    club: 'Borussia Dortmund',
    competition: 'UEFA Champions League',
    type: 'Tactical',
    status: 'Volatile',
    severity: 'High',
    title: 'Dortmund UCL exit risk elevated',
    summary: 'Dortmund trail on aggregate with 65 minutes played. Tactical adjustments failing to create clear chances. Exit probability climbs.',
    time: '3 min ago',
    coordinates: { x: 51.4, y: 29.5 },
    impact: -22,
    probability: { label: 'Dortmund UCL progression probability', before: 55, after: 33 },
    relatedOutcomes: [
      { label: 'Opponent progression probability', change: +22 },
    ],
    whyItMatters: 'UCL exit removes estimated €40m revenue and changes Dortmund squad planning for next season.',
    signals: ['Live match tracking: 0 shots on target last 30 min', 'Tactical substitution failed to shift xG', 'Press box sentiment shift detected'],
    forecast: 'Dortmund exit probability 67% if no goal in next 20 minutes.',
  },
  {
    id: 'flamengo-copa-surge',
    city: 'Rio de Janeiro',
    club: 'Flamengo',
    competition: 'Copa Libertadores',
    type: 'Lineup',
    status: 'Confirmed',
    severity: 'Medium',
    title: 'Flamengo full squad confirmed',
    summary: 'Flamengo announce full-strength lineup including returning star. Copa Libertadores quarter-final confidence rising.',
    time: '28 min ago',
    coordinates: { x: 34.0, y: 56.4 },
    impact: +14,
    probability: { label: 'Flamengo Copa win probability', before: 58, after: 72 },
    relatedOutcomes: [
      { label: 'Opponent win probability', change: -11 },
    ],
    whyItMatters: 'Full squad return removes the key absence risk that had suppressed pre-match probability.',
    signals: ['Official XI confirmed', 'Star player cleared by medical team', 'Training video confirms full fitness'],
    forecast: 'Flamengo favoured at 72% to advance to Copa semi-finals.',
  },
  {
    id: 'psg-galactico-rumour',
    city: 'Paris',
    club: 'PSG',
    competition: 'Ligue 1',
    type: 'Rumour',
    status: 'Rumour',
    severity: 'Medium',
    title: 'Galáctico signing rumour gaining traction',
    summary: 'Three independent sources suggest PSG targeting a marquee summer signing. Club president meeting reported at undisclosed location.',
    time: '52 min ago',
    coordinates: { x: 49.0, y: 31.1 },
    impact: +12,
    probability: { label: 'PSG marquee signing probability', before: 15, after: 27 },
    relatedOutcomes: [
      { label: 'Target club exit probability', change: +18 },
    ],
    whyItMatters: 'Presidential involvement historically increases deal probability by 2x vs. sporting director alone.',
    signals: ['Source A signal received', 'Source B corroboration partial', 'Airport tracking unconfirmed'],
    forecast: 'Rumour credibility at 27% — escalation likely if third source confirms.',
  },
  {
    id: 'alhilal-asian-dominance',
    city: 'Riyadh',
    club: 'Al Hilal',
    competition: 'AFC Champions League',
    type: 'Tactical',
    status: 'Live',
    severity: 'Low',
    title: 'Al Hilal dominating possession phase',
    summary: 'Al Hilal recording 72% possession with high press intensity. Opponent showing fatigue signals after 60 minutes.',
    time: '6 min ago',
    coordinates: { x: 60.8, y: 40.0 },
    impact: +8,
    probability: { label: 'Al Hilal win probability', before: 61, after: 69 },
    relatedOutcomes: [
      { label: 'Opponent hold probability', change: -8 },
    ],
    whyItMatters: 'High possession combined with opponent fatigue creates high-probability scoring window in next 15 minutes.',
    signals: ['Live tracking: 72% possession', 'Opponent pressing intensity drop detected', 'Expected goals model updating'],
    forecast: 'Al Hilal probability peaks at next corner/set piece opportunity.',
  },
];

export const LAYER_FILTERS = [
  { id: 'all', label: 'All Signals' },
  { id: 'Injury', label: 'Injuries' },
  { id: 'Lineup', label: 'Lineups' },
  { id: 'Transfer', label: 'Transfers' },
  { id: 'Tactical', label: 'Live Matches' },
  { id: 'Schedule', label: 'Schedule' },
  { id: 'Rumour', label: 'Rumours' },
] as const;

export type LayerId = typeof LAYER_FILTERS[number]['id'];

export function signalColor(signal: MapSignal): string {
  if (signal.impact <= -10) return '#ff5f5f';
  if (signal.impact >= 10) return '#54d66f';
  if (signal.type === 'Rumour') return '#d7a84a';
  if (signal.status === 'Live') return '#2ee6c8';
  if (signal.impact < 0) return '#ff8585';
  return '#d7a84a';
}
