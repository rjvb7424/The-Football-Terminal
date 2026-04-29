export type MatchStatus = 'live' | 'upcoming' | 'finished';
export type MatchEventType =
  | 'kickoff' | 'goal' | 'red_card' | 'yellow_card'
  | 'substitution' | 'var' | 'penalty' | 'tactical';

export interface MatchEvent {
  minute: number;
  type: MatchEventType;
  team: string;
  player?: string;
  description: string;
  impact: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  status: MatchStatus;
  minute?: number;
  score: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  preHomeWin: number;
  preDraw: number;
  preAwayWin: number;
  xgHome?: number;
  xgAway?: number;
  biggestEvent?: string;
  events: MatchEvent[];
}

export const MATCHES: Match[] = [
  {
    id: 'match-001',
    homeTeam: 'Barcelona',
    awayTeam: 'Girona',
    competition: 'La Liga',
    status: 'live',
    minute: 67,
    score: '2–0',
    homeWin: 94,
    draw: 4,
    awayWin: 2,
    preHomeWin: 58,
    preDraw: 24,
    preAwayWin: 18,
    xgHome: 2.8,
    xgAway: 0.4,
    biggestEvent: "Girona red card 34'",
    events: [
      { minute: 0, type: 'kickoff', team: '', description: 'Kickoff', impact: 0 },
      { minute: 4, type: 'tactical', team: 'Barcelona', description: 'XI confirmed — strongest front three start', impact: 11 },
      { minute: 23, type: 'goal', team: 'Barcelona', player: 'Lewandowski', description: 'Goal — Lewandowski taps home from 6 yards', impact: 18 },
      { minute: 28, type: 'yellow_card', team: 'Girona', player: 'Romeu', description: 'Yellow card — cynical foul on Pedri', impact: 5 },
      { minute: 34, type: 'red_card', team: 'Girona', player: 'Blind', description: 'Red card — Blind second yellow for handball', impact: 22 },
      { minute: 54, type: 'goal', team: 'Barcelona', player: 'Yamal', description: 'Goal — Yamal cuts inside and finishes low', impact: 14 },
    ],
  },
  {
    id: 'match-002',
    homeTeam: 'Real Madrid',
    awayTeam: 'Atlético Madrid',
    competition: 'La Liga',
    status: 'live',
    minute: 12,
    score: '0–0',
    homeWin: 38,
    draw: 31,
    awayWin: 31,
    preHomeWin: 52,
    preDraw: 28,
    preAwayWin: 20,
    xgHome: 0.3,
    xgAway: 0.4,
    biggestEvent: 'Mbappé absent from squad',
    events: [
      { minute: 0, type: 'kickoff', team: '', description: 'Kickoff', impact: 0 },
      { minute: 0, type: 'tactical', team: 'Real Madrid', description: 'Mbappé absent from matchday squad — muscular concern', impact: -18 },
      { minute: 8, type: 'yellow_card', team: 'Real Madrid', player: 'Valverde', description: 'Yellow card — Valverde rash challenge in midfield', impact: -4 },
    ],
  },
  {
    id: 'match-003',
    homeTeam: 'Inter Milan',
    awayTeam: 'Napoli',
    competition: 'Serie A',
    status: 'live',
    minute: 28,
    score: '1–1',
    homeWin: 52,
    draw: 27,
    awayWin: 21,
    preHomeWin: 54,
    preDraw: 25,
    preAwayWin: 21,
    xgHome: 1.1,
    xgAway: 0.9,
    biggestEvent: 'Inter tactical switch to 3-4-3',
    events: [
      { minute: 0, type: 'kickoff', team: '', description: 'Kickoff', impact: 0 },
      { minute: 5, type: 'tactical', team: 'Inter Milan', description: '3-4-3 formation confirmed — high press vs Napoli line', impact: 9 },
      { minute: 17, type: 'goal', team: 'Napoli', player: 'Simeone', description: 'Goal — counter-attack, Simeone finishes low', impact: -14 },
      { minute: 26, type: 'goal', team: 'Inter Milan', player: 'Lautaro', description: 'Goal — Lautaro Martinez from the spot', impact: 16 },
    ],
  },
  {
    id: 'match-004',
    homeTeam: 'Arsenal',
    awayTeam: 'Man City',
    competition: 'Premier League',
    status: 'upcoming',
    score: '–',
    homeWin: 38,
    draw: 29,
    awayWin: 33,
    preHomeWin: 38,
    preDraw: 29,
    preAwayWin: 33,
    biggestEvent: 'Arsenal striker ruled out',
    events: [],
  },
  {
    id: 'match-005',
    homeTeam: 'PSG',
    awayTeam: 'Brest',
    competition: 'Ligue 1',
    status: 'upcoming',
    score: '–',
    homeWin: 74,
    draw: 16,
    awayWin: 10,
    preHomeWin: 76,
    preDraw: 15,
    preAwayWin: 9,
    biggestEvent: 'PSG squad rotation confirmed',
    events: [],
  },
];
