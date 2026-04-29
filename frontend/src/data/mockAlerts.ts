export type AlertPriority = 'critical' | 'high' | 'medium' | 'low';
export type AlertType = 'injury' | 'lineup' | 'transfer' | 'red_card' | 'tactical' | 'market' | 'sentiment';

export interface Alert {
  id: string;
  time: string;
  minutesAgo: number;
  event: string;
  detail: string;
  impact: number;
  confidence: number;
  sourceType: string;
  priority: AlertPriority;
  alertType: AlertType;
  team: string;
  competition: string;
}

export interface WatchlistItem {
  id: string;
  name: string;
  type: 'team' | 'competition' | 'market';
  activeAlerts: number;
}

export const WATCHLIST: WatchlistItem[] = [
  { id: 'w-1', name: 'Real Madrid', type: 'team', activeAlerts: 3 },
  { id: 'w-2', name: 'Barcelona', type: 'team', activeAlerts: 2 },
  { id: 'w-3', name: 'Arsenal', type: 'team', activeAlerts: 2 },
  { id: 'w-4', name: 'Benfica', type: 'team', activeAlerts: 1 },
  { id: 'w-5', name: 'Champions League', type: 'competition', activeAlerts: 4 },
  { id: 'w-6', name: 'Transfer Market', type: 'market', activeAlerts: 3 },
];

export const ALERTS: Alert[] = [
  {
    id: 'alert-001',
    time: '14:32',
    minutesAgo: 2,
    event: 'Mbappé Training Absence',
    detail: 'Absent from final session. Two sources aligned within 4 minutes. Muscular concern flagged.',
    impact: -38,
    confidence: 76,
    sourceType: 'Dual journalist signal',
    priority: 'critical',
    alertType: 'injury',
    team: 'Real Madrid',
    competition: 'La Liga',
  },
  {
    id: 'alert-002',
    time: '14:28',
    minutesAgo: 4,
    event: 'Barcelona XI Confirmed',
    detail: 'Strongest lineup confirmed. Lewandowski, Yamal, Raphinha to start vs Girona.',
    impact: 11,
    confidence: 88,
    sourceType: 'Club insider',
    priority: 'high',
    alertType: 'lineup',
    team: 'Barcelona',
    competition: 'La Liga',
  },
  {
    id: 'alert-003',
    time: '14:19',
    minutesAgo: 14,
    event: 'Osimhen Transfer Velocity +26',
    detail: 'Agent confirmed in London. Chelsea third contact. Napoli stance softening on fee.',
    impact: 26,
    confidence: 63,
    sourceType: 'Transfer network',
    priority: 'high',
    alertType: 'transfer',
    team: 'Napoli',
    competition: 'Transfer Market',
  },
  {
    id: 'alert-004',
    time: '14:02',
    minutesAgo: 31,
    event: 'Van Dijk Precautionary Sub',
    detail: 'Withdrew early from training session. Fitness concern flagged before Man City clash.',
    impact: -13,
    confidence: 55,
    sourceType: 'Training report',
    priority: 'medium',
    alertType: 'injury',
    team: 'Liverpool',
    competition: 'Premier League',
  },
  {
    id: 'alert-005',
    time: '13:48',
    minutesAgo: 44,
    event: 'Arsenal Striker Ruled Out',
    detail: '3-week absence confirmed by club official. Title probability drops −9pp.',
    impact: -9,
    confidence: 91,
    sourceType: 'Official medical report',
    priority: 'high',
    alertType: 'injury',
    team: 'Arsenal',
    competition: 'Premier League',
  },
  {
    id: 'alert-006',
    time: '13:30',
    minutesAgo: 60,
    event: 'Inter Tactical Switch Detected',
    detail: '3-4-3 formation confirmed for Napoli derby via training footage.',
    impact: 9,
    confidence: 72,
    sourceType: 'Training footage',
    priority: 'medium',
    alertType: 'tactical',
    team: 'Inter Milan',
    competition: 'Serie A',
  },
  {
    id: 'alert-007',
    time: '13:12',
    minutesAgo: 78,
    event: 'Girona Red Card',
    detail: 'Blind second yellow. 10 men for 56 minutes. Win probability collapses to 2%.',
    impact: -22,
    confidence: 99,
    sourceType: 'Live match event',
    priority: 'high',
    alertType: 'red_card',
    team: 'Girona',
    competition: 'La Liga',
  },
  {
    id: 'alert-008',
    time: '12:45',
    minutesAgo: 105,
    event: 'PSG Squad Rotation Signal',
    detail: 'B squad expected vs Brest. CL second leg preparation takes priority.',
    impact: -5,
    confidence: 67,
    sourceType: 'Press conference',
    priority: 'low',
    alertType: 'lineup',
    team: 'PSG',
    competition: 'Ligue 1',
  },
];
