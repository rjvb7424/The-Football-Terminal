export type EventType = 'injury' | 'lineup' | 'transfer' | 'tactical' | 'red_card' | 'rumour';
export type SignalStatus = 'live' | 'confirmed' | 'rumour';

export interface AffectedTeam {
  name: string;
  impact: number;
}

export interface Signal {
  id: string;
  title: string;
  subtitle: string;
  club: string;
  competition: string;
  eventType: EventType;
  impact: number;
  confidence: number;
  minutesAgo: number;
  before: number;
  after: number;
  explanation: string;
  affectedTeams: AffectedTeam[];
  status: SignalStatus;
}

export interface GainerLoser {
  name: string;
  category: string;
  change: number;
  current: number;
  club?: string;
}

export interface MatchProbabilityData {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  minute: number;
  score: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  preHomeWin: number;
  preDraw: number;
  preAwayWin: number;
  events: Array<{ minute: number; type: string; team: string; impact: number }>;
}

export interface Transfer {
  player: string;
  from: string;
  to: string;
  current: number;
  previous: number;
  hoursAgo: number;
  reason: string;
}

export interface SentimentData {
  team: string;
  belief: number;
  panic: number;
  anger: number;
  optimism: number;
  netChange: number;
}

export interface TickerItem {
  tag: string;
  text: string;
  metric: string;
  change: number;
  kind: 'positive' | 'negative' | 'amber';
}

export interface HeatMapTile {
  label: string;
  count: number;
  impactSum: number;
  kind: 'positive' | 'negative' | 'amber';
  size: 'large' | 'medium' | 'small';
}

export interface ChartTeam {
  name: string;
  color: string;
  points: number[];
  pointsShocked: number[];
}

// ─── Chart Data ───────────────────────────────────────────────

export const CHART_TEAMS: ChartTeam[] = [
  {
    name: 'Real Madrid',
    color: '#ff5f5f',
    points:       [80,81,80,79,80,81,82,81,80,79,80,81,80,79,80,81,80,75,60,48,44,43,42,42,42],
    pointsShocked:[80,81,80,79,80,81,82,81,80,79,80,81,80,79,80,81,80,75,60,48,44,43,42,42,42],
  },
  {
    name: 'Barcelona',
    color: '#2ee6c8',
    points:       [39,39,40,40,41,40,39,40,41,42,41,40,41,42,43,42,41,42,50,60,63,65,67,67,67],
    pointsShocked:[39,39,40,40,41,40,39,40,41,42,41,40,41,42,43,42,41,42,50,60,63,65,67,67,67],
  },
  {
    name: 'Arsenal',
    color: '#ff5f5f',
    points:       [43,43,44,43,42,43,44,43,42,41,42,41,40,39,38,37,36,35,35,34,34,33,34,34,34],
    pointsShocked:[43,43,44,43,42,43,44,43,42,41,42,41,40,39,38,37,36,35,35,34,34,33,34,34,34],
  },
  {
    name: 'Man City',
    color: '#54d66f',
    points:       [24,23,24,25,24,23,22,23,22,21,22,21,20,21,20,19,18,19,18,18,18,17,18,18,18],
    pointsShocked:[24,23,24,25,24,23,22,23,22,21,22,21,20,21,20,19,18,19,18,18,18,17,18,18,18],
  },
];

export const CHART_PRE_SHOCK: ChartTeam[] = [
  { ...CHART_TEAMS[0], points: Array(25).fill(0).map((_) => Math.max(0, 80 + (Math.random() - 0.5) * 3)), pointsShocked: [] },
  { ...CHART_TEAMS[1], points: Array(25).fill(0).map((_) => Math.max(0, 39 + (Math.random() - 0.5) * 3)), pointsShocked: [] },
  { ...CHART_TEAMS[2], points: Array(25).fill(0).map((_) => Math.max(0, 43 + (Math.random() - 0.5) * 3)), pointsShocked: [] },
  { ...CHART_TEAMS[3], points: Array(25).fill(0).map((_) => Math.max(0, 24 + (Math.random() - 0.5) * 3)), pointsShocked: [] },
];

// ─── Ticker Items ──────────────────────────────────────────────

export const TICKER_ITEMS: TickerItem[] = [
  { tag: 'MADRID', text: 'training absence detected · final session missed', metric: 'title probability', change: -38, kind: 'negative' },
  { tag: 'BARÇA', text: 'XI leak confirms strongest front three vs Girona', metric: 'match win', change: 11, kind: 'positive' },
  { tag: 'ARSENAL', text: 'striker ruled out · muscle strain confirmed', metric: 'title probability', change: -9, kind: 'negative' },
  { tag: 'OSIMHEN', text: 'transfer velocity rising sharply · agent talks resuming', metric: 'Chelsea move', change: 26, kind: 'amber' },
  { tag: 'INTER', text: 'tactical switch detected · 3-4-3 vs Napoli', metric: 'live win', change: 9, kind: 'positive' },
  { tag: 'PSG', text: 'squad rotation confirmed ahead of CL second leg', metric: 'Ligue 1 probability', change: -5, kind: 'negative' },
  { tag: 'ATLÉTICO', text: 'title probability rising after Madrid news', metric: 'La Liga', change: 8, kind: 'positive' },
  { tag: 'CHELSEA', text: 'fresh contact with Osimhen camp · deal terms', metric: 'transfer probability', change: 16, kind: 'amber' },
  { tag: 'LIVERPOOL', text: 'clean sheet probability falling · injury to CB', metric: 'vs Man City', change: -13, kind: 'negative' },
  { tag: 'GIRONA', text: 'live win probability collapsed post Barça XI leak', metric: 'vs Barcelona', change: -22, kind: 'negative' },
  { tag: 'BENFICA', text: 'Di María return confirmed for Europa Quarter Final', metric: 'match win', change: 14, kind: 'positive' },
  { tag: 'DORTMUND', text: 'Haaland return signals detected · two journos aligned', metric: 'transfer rumour', change: 7, kind: 'amber' },
];

// ─── Signals ──────────────────────────────────────────────────

export const SIGNALS: Signal[] = [
  {
    id: 'sig-001',
    title: "Mbappé Training Absence",
    subtitle: "Madrid #9 absent from final session before El Clásico",
    club: "Real Madrid",
    competition: "La Liga",
    eventType: "injury",
    impact: -38,
    confidence: 76,
    minutesAgo: 2,
    before: 80,
    after: 42,
    explanation: "Unconfirmed muscular issue. Two independent sources aligned within 4 minutes. Absence from final session before a title decider is a +3.2σ event historically.",
    affectedTeams: [
      { name: "Barcelona", impact: 27 },
      { name: "Atlético Madrid", impact: 8 },
      { name: "Girona", impact: 3 },
    ],
    status: "live",
  },
  {
    id: 'sig-002',
    title: "Barcelona XI Leaked",
    subtitle: "Strongest front three confirmed for Girona away",
    club: "Barcelona",
    competition: "La Liga",
    eventType: "lineup",
    impact: 11,
    confidence: 88,
    minutesAgo: 4,
    before: 56,
    after: 67,
    explanation: "Club source confirms Lewandowski, Yamal, Raphinha start. Lineup signal matched against Girona's expected defensive setup.",
    affectedTeams: [
      { name: "Girona", impact: -22 },
      { name: "Real Madrid", impact: -4 },
    ],
    status: "confirmed",
  },
  {
    id: 'sig-003',
    title: "Arsenal Striker Ruled Out",
    subtitle: "3-week absence confirmed · muscle strain",
    club: "Arsenal",
    competition: "Premier League",
    eventType: "injury",
    impact: -9,
    confidence: 91,
    minutesAgo: 7,
    before: 43,
    after: 34,
    explanation: "Official medical report released. Arsenal title challenge now relies on results elsewhere. Market responds instantly.",
    affectedTeams: [
      { name: "Man City", impact: 6 },
      { name: "Liverpool", impact: 4 },
    ],
    status: "confirmed",
  },
  {
    id: 'sig-004',
    title: "Osimhen Transfer Velocity Rising",
    subtitle: "Agent talks resumed · Chelsea third contact detected",
    club: "Napoli",
    competition: "Serie A",
    eventType: "transfer",
    impact: 24,
    confidence: 63,
    minutesAgo: 12,
    before: 18,
    after: 44,
    explanation: "Two reliable journalist signals aligned within 12 minutes. Agent spotted in London. Napoli stance softening.",
    affectedTeams: [
      { name: "Chelsea", impact: 18 },
      { name: "Al-Ahli", impact: -14 },
    ],
    status: "rumour",
  },
  {
    id: 'sig-005',
    title: "Inter Tactical Switch Detected",
    subtitle: "3-4-3 confirmed for Napoli derby · pace over possession",
    club: "Inter Milan",
    competition: "Serie A",
    eventType: "tactical",
    impact: 9,
    confidence: 72,
    minutesAgo: 18,
    before: 54,
    after: 63,
    explanation: "Training footage leaked. Simone Inzaghi favours high-press setup against Napoli's high defensive line.",
    affectedTeams: [
      { name: "Napoli", impact: -11 },
    ],
    status: "live",
  },
  {
    id: 'sig-006',
    title: "Girona Live Win Collapsed",
    subtitle: "Barça XI confirming strongest lineup crushes market",
    club: "Girona",
    competition: "La Liga",
    eventType: "lineup",
    impact: -22,
    confidence: 88,
    minutesAgo: 4,
    before: 38,
    after: 16,
    explanation: "Girona's probability dropped sharply once Barcelona XI confirmed. Market is now pricing in a comfortable away win.",
    affectedTeams: [
      { name: "Barcelona", impact: 11 },
    ],
    status: "live",
  },
  {
    id: 'sig-007',
    title: "Liverpool CB Injury Concern",
    subtitle: "Van Dijk precautionary substitution in training",
    club: "Liverpool",
    competition: "Premier League",
    eventType: "injury",
    impact: -13,
    confidence: 55,
    minutesAgo: 31,
    before: 72,
    after: 59,
    explanation: "Van Dijk withdrew early from training session. Precautionary per club. Clean sheet probability drops significantly.",
    affectedTeams: [
      { name: "Man City", impact: 9 },
      { name: "Arsenal", impact: 5 },
    ],
    status: "rumour",
  },
  {
    id: 'sig-008',
    title: "Haaland Return Signal",
    subtitle: "Two journalists report potential Dortmund return",
    club: "Man City",
    competition: "Premier League",
    eventType: "rumour",
    impact: 7,
    confidence: 31,
    minutesAgo: 44,
    before: 5,
    after: 12,
    explanation: "Low-confidence signal. Two peripheral journalists. Haaland contract has no buyback clause — monitoring for escalation.",
    affectedTeams: [
      { name: "Dortmund", impact: 22 },
    ],
    status: "rumour",
  },
];

// ─── Featured Signal ───────────────────────────────────────────

export const FEATURED_SIGNAL = SIGNALS[0];

// ─── Gainers ──────────────────────────────────────────────────

export const GAINERS: GainerLoser[] = [
  { name: 'Barcelona title probability', category: 'La Liga', change: 27, current: 67, club: 'Barcelona' },
  { name: 'Atlético title probability', category: 'La Liga', change: 8, current: 21, club: 'Atlético Madrid' },
  { name: 'Osimhen Chelsea transfer', category: 'Transfer', change: 26, current: 44, club: 'Napoli' },
  { name: 'Benfica CL qualification', category: 'Champions League', change: 14, current: 78, club: 'Benfica' },
  { name: 'Inter live win', category: 'Serie A', change: 9, current: 63, club: 'Inter Milan' },
  { name: 'Man City title probability', category: 'Premier League', change: 6, current: 42, club: 'Man City' },
];

// ─── Losers ───────────────────────────────────────────────────

export const LOSERS: GainerLoser[] = [
  { name: 'Real Madrid title probability', category: 'La Liga', change: -38, current: 42, club: 'Real Madrid' },
  { name: 'Girona match win', category: 'La Liga', change: -22, current: 16, club: 'Girona' },
  { name: 'Liverpool clean sheet', category: 'Premier League', change: -13, current: 47, club: 'Liverpool' },
  { name: 'Arsenal title probability', category: 'Premier League', change: -9, current: 34, club: 'Arsenal' },
  { name: 'PSG Ligue 1 win', category: 'Ligue 1', change: -5, current: 71, club: 'PSG' },
  { name: 'Al-Ahli Osimhen signing', category: 'Transfer', change: -14, current: 22, club: 'Al-Ahli' },
];

// ─── Live Match ───────────────────────────────────────────────

export const LIVE_MATCH: MatchProbabilityData = {
  homeTeam: 'Barcelona',
  awayTeam: 'Girona',
  competition: 'La Liga',
  minute: 34,
  score: '1–0',
  homeWin: 78,
  draw: 14,
  awayWin: 8,
  preHomeWin: 58,
  preDraw: 24,
  preAwayWin: 18,
  events: [
    { minute: 0, type: 'kickoff', team: 'Barcelona', impact: 0 },
    { minute: 4, type: 'lineup_confirmed', team: 'Barcelona', impact: 11 },
    { minute: 23, type: 'goal', team: 'Barcelona', impact: 18 },
    { minute: 28, type: 'yellow_card', team: 'Girona', impact: 5 },
    { minute: 34, type: 'now', team: '', impact: 0 },
  ],
};

// ─── Transfers ────────────────────────────────────────────────

export const TRANSFERS: Transfer[] = [
  {
    player: "Victor Osimhen",
    from: "Napoli",
    to: "Chelsea",
    current: 44,
    previous: 18,
    hoursAgo: 6,
    reason: "Two reliable journalist signals aligned within 12 minutes. Agent confirmed in London.",
  },
  {
    player: "Erling Haaland",
    from: "Man City",
    to: "Dortmund",
    current: 12,
    previous: 5,
    hoursAgo: 4,
    reason: "Low-confidence rumour. Monitoring for escalation.",
  },
];

// ─── Sentiment ────────────────────────────────────────────────

export const SENTIMENT: SentimentData[] = [
  { team: 'Real Madrid', belief: 18, panic: 74, anger: 61, optimism: 12, netChange: 340 },
  { team: 'Barcelona', belief: 88, panic: 9, anger: 11, optimism: 91, netChange: 180 },
  { team: 'Arsenal', belief: 34, panic: 52, anger: 48, optimism: 22, netChange: -40 },
];

// ─── Heat Map Tiles ───────────────────────────────────────────

export const HEATMAP_TILES: HeatMapTile[] = [
  { label: 'Injuries', count: 14, impactSum: -89, kind: 'negative', size: 'large' },
  { label: 'Transfers', count: 8, impactSum: 44, kind: 'amber', size: 'large' },
  { label: 'Lineup Leaks', count: 11, impactSum: 67, kind: 'positive', size: 'medium' },
  { label: 'Red Cards', count: 3, impactSum: -41, kind: 'negative', size: 'medium' },
  { label: 'Tactical Shifts', count: 6, impactSum: 28, kind: 'positive', size: 'medium' },
  { label: 'Fan Panic', count: 22, impactSum: -33, kind: 'negative', size: 'small' },
  { label: 'VAR Decisions', count: 5, impactSum: -18, kind: 'negative', size: 'small' },
  { label: 'Fixture Congestion', count: 9, impactSum: -24, kind: 'amber', size: 'small' },
  { label: 'Press Conference', count: 4, impactSum: 12, kind: 'amber', size: 'small' },
];

// ─── Signal Map Cities ────────────────────────────────────────

export const MAP_SIGNALS = [
  { city: 'Madrid', club: 'Real Madrid', signal: 'Injury shock', change: -38, left: '22%', top: '61%', kind: 'negative' as const },
  { city: 'Barcelona', club: 'Barcelona', signal: 'XI leaked', change: 27, left: '29%', top: '54%', kind: 'positive' as const },
  { city: 'Manchester', club: 'Man City', signal: 'CB concern', change: -9, left: '30%', top: '22%', kind: 'negative' as const },
  { city: 'London', club: 'Arsenal', signal: 'Striker out', change: -9, left: '33%', top: '28%', kind: 'negative' as const },
  { city: 'Paris', club: 'PSG', signal: 'Squad rotated', change: -5, left: '39%', top: '38%', kind: 'amber' as const },
  { city: 'Milan', club: 'Inter Milan', signal: 'Tactical switch', change: 9, left: '48%', top: '47%', kind: 'positive' as const },
  { city: 'Naples', club: 'Napoli', signal: 'Osimhen deal', change: 24, left: '52%', top: '56%', kind: 'amber' as const },
  { city: 'Lisbon', club: 'Benfica', signal: 'Di María back', change: 14, left: '16%', top: '63%', kind: 'positive' as const },
  { city: 'Dortmund', club: 'Dortmund', signal: 'Haaland rumour', change: 7, left: '49%', top: '27%', kind: 'amber' as const },
];
