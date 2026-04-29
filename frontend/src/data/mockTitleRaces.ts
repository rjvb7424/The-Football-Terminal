export interface TitleTeam {
  club: string;
  probability: number;
  change: number;
  recentTrigger: string;
  form: ('W' | 'D' | 'L')[];
}

export interface TitleEvent {
  event: string;
  impact: string;
  time: string;
}

export interface TitleRace {
  id: string;
  league: string;
  season: string;
  teams: TitleTeam[];
  recentEvents: TitleEvent[];
}

export const TITLE_RACES: TitleRace[] = [
  {
    id: 'laliga',
    league: 'La Liga',
    season: '2024/25',
    teams: [
      { club: 'Barcelona', probability: 58, change: 27, recentTrigger: 'Madrid shock · XI confirmed strongest', form: ['W', 'W', 'W', 'D', 'W'] },
      { club: 'Real Madrid', probability: 32, change: -38, recentTrigger: 'Mbappé training absence detected', form: ['W', 'W', 'D', 'W', 'L'] },
      { club: 'Atlético Madrid', probability: 8, change: 8, recentTrigger: 'Benefited from Madrid probability collapse', form: ['W', 'D', 'W', 'D', 'W'] },
      { club: 'Girona', probability: 2, change: 3, recentTrigger: 'Minor probability gain from Madrid news', form: ['D', 'W', 'L', 'W', 'D'] },
    ],
    recentEvents: [
      { event: 'Mbappé training absence confirmed', impact: 'Madrid −38pp · Barça +27pp', time: '14 min ago' },
      { event: 'Barcelona XI leak — strongest front three', impact: 'Barça win probability +11pp', time: '4 min ago' },
      { event: 'Real Madrid yellow card vs Atlético — 8\'', impact: 'Slight draw probability increase +2pp', time: '8 min ago' },
    ],
  },
  {
    id: 'epl',
    league: 'Premier League',
    season: '2024/25',
    teams: [
      { club: 'Man City', probability: 42, change: 6, recentTrigger: 'Arsenal striker ruled out 3 weeks', form: ['W', 'W', 'D', 'W', 'W'] },
      { club: 'Arsenal', probability: 34, change: -9, recentTrigger: 'Striker ruled out · muscle strain confirmed', form: ['W', 'D', 'W', 'W', 'L'] },
      { club: 'Liverpool', probability: 18, change: -4, recentTrigger: 'Van Dijk precautionary withdrawal', form: ['W', 'W', 'W', 'D', 'D'] },
      { club: 'Chelsea', probability: 6, change: 7, recentTrigger: 'Winning run continues · rivals wobbling', form: ['W', 'W', 'W', 'W', 'D'] },
    ],
    recentEvents: [
      { event: 'Arsenal striker ruled out — 3-week absence', impact: 'Arsenal −9pp · City +6pp', time: '7 min ago' },
      { event: 'Van Dijk precautionary sub in training', impact: 'Liverpool −4pp · City +3pp', time: '31 min ago' },
      { event: 'Chelsea win vs Wolves — rivals dropped points', impact: 'Chelsea +7pp title probability', time: '2h ago' },
    ],
  },
  {
    id: 'seriea',
    league: 'Serie A',
    season: '2024/25',
    teams: [
      { club: 'Inter Milan', probability: 61, change: 4, recentTrigger: 'Tactical switch detected · Napoli edge', form: ['W', 'W', 'D', 'W', 'W'] },
      { club: 'Napoli', probability: 28, change: -3, recentTrigger: 'Inter tactical advantage confirmed', form: ['W', 'D', 'W', 'L', 'W'] },
      { club: 'Juventus', probability: 9, change: -1, recentTrigger: 'Draw narrows points gap', form: ['D', 'W', 'D', 'D', 'W'] },
      { club: 'AC Milan', probability: 2, change: 0, recentTrigger: 'No significant event in last 3h', form: ['L', 'D', 'W', 'L', 'D'] },
    ],
    recentEvents: [
      { event: 'Inter 3-4-3 tactical switch confirmed', impact: 'Inter live win +9pp vs Napoli', time: '18 min ago' },
      { event: 'Napoli defensive line exposed in training footage', impact: 'Napoli in-game risk +7%', time: '25 min ago' },
    ],
  },
  {
    id: 'ucl',
    league: 'Champions League',
    season: '2024/25',
    teams: [
      { club: 'Barcelona', probability: 24, change: 8, recentTrigger: 'Madrid wobble · dominant form continues', form: ['W', 'W', 'W', 'W', 'D'] },
      { club: 'Real Madrid', probability: 22, change: -12, recentTrigger: 'Mbappé fitness doubt hits CL probability', form: ['W', 'W', 'D', 'W', 'W'] },
      { club: 'Man City', probability: 18, change: 3, recentTrigger: 'Arsenal weakened in title rival group', form: ['W', 'W', 'W', 'D', 'W'] },
      { club: 'Bayern Munich', probability: 16, change: 1, recentTrigger: 'Solid quarter-final form continues', form: ['W', 'D', 'W', 'W', 'W'] },
      { club: 'PSG', probability: 12, change: -4, recentTrigger: 'Rotation signals ahead of CL second leg', form: ['W', 'W', 'L', 'W', 'D'] },
      { club: 'Benfica', probability: 8, change: 5, recentTrigger: 'Di María return confirmed for Europa QF', form: ['W', 'W', 'W', 'D', 'W'] },
    ],
    recentEvents: [
      { event: 'Mbappé training absence — CL implications', impact: 'Madrid −12pp · Barça +8pp', time: '14 min ago' },
      { event: 'Di María return confirmed — Benfica vs Porto', impact: 'Benfica CL probability +5pp', time: '22 min ago' },
      { event: 'PSG squad rotation confirmed ahead of second leg', impact: 'PSG CL probability −4pp', time: '1h ago' },
    ],
  },
  {
    id: 'bundesliga',
    league: 'Bundesliga',
    season: '2024/25',
    teams: [
      { club: 'Bayern Munich', probability: 71, change: 2, recentTrigger: 'Dominant win · Dortmund dropped points', form: ['W', 'W', 'W', 'D', 'W'] },
      { club: 'Bayer Leverkusen', probability: 19, change: -1, recentTrigger: 'Wirtz transfer noise — distraction risk', form: ['W', 'D', 'W', 'W', 'L'] },
      { club: 'Dortmund', probability: 7, change: -2, recentTrigger: 'Points dropped vs Freiburg', form: ['D', 'L', 'W', 'D', 'W'] },
      { club: 'Stuttgart', probability: 3, change: 1, recentTrigger: 'Surprise win keeps slim hopes alive', form: ['W', 'W', 'D', 'L', 'W'] },
    ],
    recentEvents: [
      { event: 'Haaland return rumour — Dortmund links', impact: 'Dortmund transfer market +7pp', time: '44 min ago' },
      { event: 'Bayern dominant home win · Leverkusen drew', impact: 'Bayern title probability +2pp', time: '3h ago' },
    ],
  },
];
