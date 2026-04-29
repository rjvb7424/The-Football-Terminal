export type TransferStatus = 'quiet' | 'moving' | 'heating_up' | 'exploding' | 'cooling';

export interface TransferRumour {
  id: string;
  player: string;
  position: string;
  currentClub: string;
  linkedClub: string;
  morningProbability: number;
  currentProbability: number;
  velocity: number;
  hoursWindow: number;
  status: TransferStatus;
  confidence: number;
  reason: string;
  sources: string[];
  lastUpdate: string;
}

export const TRANSFER_RUMOURS: TransferRumour[] = [
  {
    id: 'tr-001',
    player: 'Victor Osimhen',
    position: 'ST',
    currentClub: 'Napoli',
    linkedClub: 'Chelsea',
    morningProbability: 18,
    currentProbability: 44,
    velocity: 26,
    hoursWindow: 6,
    status: 'heating_up',
    confidence: 63,
    reason: 'Two reliable journalist signals aligned within 12 minutes. Agent confirmed in London. Napoli stance softening on asking price.',
    sources: ['Fabrizio Romano', 'Ben Jacobs', 'Club source'],
    lastUpdate: '12 min ago',
  },
  {
    id: 'tr-002',
    player: 'Florian Wirtz',
    position: 'AM',
    currentClub: 'Bayer Leverkusen',
    linkedClub: 'Real Madrid',
    morningProbability: 31,
    currentProbability: 38,
    velocity: 7,
    hoursWindow: 8,
    status: 'moving',
    confidence: 55,
    reason: 'Madrid interest confirmed by Leverkusen CEO comments. Player open to move per agent. Fee structure discussed.',
    sources: ['Fabrizio Romano', 'Sky Sport Germany'],
    lastUpdate: '1h ago',
  },
  {
    id: 'tr-003',
    player: 'Erling Haaland',
    position: 'ST',
    currentClub: 'Man City',
    linkedClub: 'Dortmund',
    morningProbability: 5,
    currentProbability: 12,
    velocity: 7,
    hoursWindow: 4,
    status: 'moving',
    confidence: 31,
    reason: 'Low-confidence signal. Two peripheral journalists. No buyback clause in contract — monitoring for further escalation.',
    sources: ['German tabloid', 'Secondary source'],
    lastUpdate: '44 min ago',
  },
  {
    id: 'tr-004',
    player: 'Pedri',
    position: 'CM',
    currentClub: 'Barcelona',
    linkedClub: 'Man City',
    morningProbability: 12,
    currentProbability: 19,
    velocity: 7,
    hoursWindow: 5,
    status: 'moving',
    confidence: 41,
    reason: 'Contract renewal talks stalled. City scouted Pedri twice this month. Barcelona remain optimistic but nervous.',
    sources: ['Sport (Spain)', 'David Ornstein'],
    lastUpdate: '38 min ago',
  },
  {
    id: 'tr-005',
    player: 'Leny Yoro',
    position: 'CB',
    currentClub: 'Man United',
    linkedClub: 'PSG',
    morningProbability: 8,
    currentProbability: 6,
    velocity: -2,
    hoursWindow: 6,
    status: 'cooling',
    confidence: 24,
    reason: 'PSG interest cooling after fee demands. Man United unwilling to sell in January. Story dying down.',
    sources: ["L'Équipe"],
    lastUpdate: '2h ago',
  },
  {
    id: 'tr-006',
    player: 'Rúben Amorim',
    position: 'Manager',
    currentClub: 'Man United',
    linkedClub: 'Benfica',
    morningProbability: 4,
    currentProbability: 11,
    velocity: 7,
    hoursWindow: 3,
    status: 'moving',
    confidence: 28,
    reason: 'Speculation after difficult run of results. Board sources deny any contact. Monitoring.',
    sources: ['A Bola', 'Portuguese TV'],
    lastUpdate: '1h 20 min ago',
  },
];
