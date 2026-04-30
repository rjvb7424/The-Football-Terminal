import { C } from '../colors';

export interface SituationPoint {
  id: string;
  city: string;
  club: string;
  event: string;
  type: 'injury' | 'lineup' | 'transfer' | 'tactical' | 'rumour';
  impact: number;
  minutesAgo: number;
  lat: number;
  lng: number;
}

export const SITUATION_POINTS: SituationPoint[] = [
  {
    id: 'madrid-mbappe',
    city: 'Madrid',
    club: 'Real Madrid',
    event: 'Mbappe training absence',
    type: 'injury',
    impact: -38,
    minutesAgo: 2,
    lat: 40.453,
    lng: -3.688,
  },
  {
    id: 'barcelona-xi',
    city: 'Barcelona',
    club: 'Barcelona',
    event: 'Strongest XI leaked',
    type: 'lineup',
    impact: 11,
    minutesAgo: 4,
    lat: 41.381,
    lng: 2.122,
  },
  {
    id: 'london-arsenal',
    city: 'London',
    club: 'Arsenal',
    event: 'Striker ruled out',
    type: 'injury',
    impact: -9,
    minutesAgo: 7,
    lat: 51.555,
    lng: -0.108,
  },
  {
    id: 'naples-osimhen',
    city: 'Naples',
    club: 'Napoli',
    event: 'Osimhen talks resumed',
    type: 'transfer',
    impact: 24,
    minutesAgo: 12,
    lat: 40.827,
    lng: 14.193,
  },
  {
    id: 'milan-inter',
    city: 'Milan',
    club: 'Inter Milan',
    event: '3-4-3 tactical switch',
    type: 'tactical',
    impact: 9,
    minutesAgo: 18,
    lat: 45.478,
    lng: 9.124,
  },
  {
    id: 'manchester-liverpool',
    city: 'Liverpool',
    club: 'Liverpool',
    event: 'CB injury concern',
    type: 'injury',
    impact: -13,
    minutesAgo: 31,
    lat: 53.43,
    lng: -2.961,
  },
  {
    id: 'paris-psg',
    city: 'Paris',
    club: 'PSG',
    event: 'Squad rotation confirmed',
    type: 'tactical',
    impact: -5,
    minutesAgo: 39,
    lat: 48.841,
    lng: 2.253,
  },
  {
    id: 'dortmund-haaland',
    city: 'Dortmund',
    club: 'Dortmund',
    event: 'Haaland return signal',
    type: 'rumour',
    impact: 7,
    minutesAgo: 44,
    lat: 51.492,
    lng: 7.451,
  },
];

export function pointColor(point: SituationPoint): string {
  if (point.type === 'rumour' || point.type === 'transfer') return C.amber;
  if (point.impact > 5) return C.positive;
  if (point.impact < -5) return C.negative;
  return C.accent;
}
