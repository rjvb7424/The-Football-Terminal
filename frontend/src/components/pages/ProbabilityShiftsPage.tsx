import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C, impactColor } from '../../colors';
import { SIGNALS } from '../../data/mockSignals';
import PageHeader from '../shared/PageHeader';
import FeatureCard from '../shared/FeatureCard';
import StatusChip from '../shared/StatusChip';
import ProbabilityBar from '../shared/ProbabilityBar';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'title', label: 'Title Race' },
  { id: 'match', label: 'Match Outcome' },
  { id: 'transfer', label: 'Transfer' },
];

const SORTS = [
  { id: 'negative', label: 'Biggest Drop' },
  { id: 'positive', label: 'Biggest Gain' },
  { id: 'recent', label: 'Most Recent' },
  { id: 'confidence', label: 'Highest Confidence' },
];

function getCategoryFromEvent(eventType: string): string {
  if (eventType === 'transfer' || eventType === 'rumour') return 'transfer';
  if (eventType === 'injury' || eventType === 'tactical') return 'title';
  return 'match';
}

interface ShiftData {
  id: string;
  outcome: string;
  team: string;
  competition: string;
  category: string;
  before: number;
  after: number;
  change: number;
  trigger: string;
  confidence: number;
  explanation: string;
  eventType: string;
  minutesAgo: number;
}

const SHIFTS: ShiftData[] = SIGNALS.map(s => ({
  id: s.id,
  outcome: `${s.club} — ${s.competition}`,
  team: s.club,
  competition: s.competition,
  category: getCategoryFromEvent(s.eventType),
  before: s.before,
  after: s.after,
  change: s.impact,
  trigger: s.title,
  confidence: s.confidence,
  explanation: s.explanation,
  eventType: s.eventType,
  minutesAgo: s.minutesAgo,
}));

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        px: 1.5, py: 0.5,
        border: `1px solid ${active ? C.accent : C.border}`,
        borderRadius: '5px',
        bgcolor: active ? C.accentDim : 'transparent',
        color: active ? C.accent : C.text2,
        fontFamily: 'monospace',
        fontSize: '0.68rem',
        fontWeight: active ? 700 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        flexShrink: 0,
        '&:hover': { borderColor: active ? C.accent : C.borderLight },
      }}
    >
      {label}
    </Box>
  );
}

function ShiftCard({ shift }: { shift: ShiftData }) {
  const color = impactColor(shift.change);
  const sign = shift.change > 0 ? '+' : '';
  const isPositive = shift.change > 0;

  return (
    <FeatureCard
      noPadding
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* Card header */}
      <Box sx={{ px: 2, py: 1.25, borderBottom: `1px solid ${C.border}`, bgcolor: C.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StatusChip variant={shift.eventType as any} label={shift.eventType.replace('_', ' ').toUpperCase()} />
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>{shift.minutesAgo}m ago</Typography>
        </Box>
        <Box sx={{ px: 1, py: 0.2, bgcolor: isPositive ? C.positiveDim : C.negativeDim, border: `1px solid ${isPositive ? 'rgba(63,185,80,0.3)' : 'rgba(248,81,73,0.3)'}`, borderRadius: '3px' }}>
          <Typography sx={{ fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700, color }}>{sign}{shift.change}pp</Typography>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Trigger */}
        <Box>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', mb: 0.25, letterSpacing: '0.05em' }}>TRIGGER</Typography>
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: C.text1, lineHeight: 1.25 }}>
            {shift.trigger}
          </Typography>
          <Typography sx={{ fontSize: '0.68rem', color: C.text2, mt: 0.25 }}>
            {shift.team} · {shift.competition}
          </Typography>
        </Box>

        {/* Probability bar */}
        <ProbabilityBar
          before={shift.before}
          after={shift.after}
          color={isPositive ? C.positive : C.negative}
        />

        {/* Explanation */}
        <Typography sx={{ fontSize: '0.72rem', color: C.text2, lineHeight: 1.6 }}>
          {shift.explanation}
        </Typography>

        {/* Footer */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 0.5, borderTop: `1px solid ${C.border}` }}>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>
            Confidence: <Box component="span" sx={{ color: C.text2 }}>{shift.confidence}%</Box>
          </Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>
            {shift.competition}
          </Typography>
        </Box>
      </Box>
    </FeatureCard>
  );
}

export default function ProbabilityShiftsPage() {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('negative');

  const filtered = SHIFTS
    .filter(s => category === 'all' || s.category === category)
    .sort((a, b) => {
      if (sort === 'negative') return a.change - b.change;
      if (sort === 'positive') return b.change - a.change;
      if (sort === 'recent') return a.minutesAgo - b.minutesAgo;
      if (sort === 'confidence') return b.confidence - a.confidence;
      return 0;
    });

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 4 } }}>
      <PageHeader
        title="Probability Shifts"
        subtitle="What changed because of it? Every outcome that moved in the last 24h."
      />

      {/* Category filters */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <FilterChip key={c.id} label={c.label} active={category === c.id} onClick={() => setCategory(c.id)} />
        ))}

        <Box sx={{ flex: 1 }} />

        {/* Sort */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {SORTS.map(s => (
            <FilterChip key={s.id} label={s.label} active={sort === s.id} onClick={() => setSort(s.id)} />
          ))}
        </Box>
      </Box>

      {/* Count */}
      <Typography sx={{ fontSize: '0.65rem', color: C.text3, fontFamily: 'monospace', mb: 2.5 }}>
        {filtered.length} SHIFT{filtered.length !== 1 ? 'S' : ''}
      </Typography>

      {/* Cards grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }, gap: 3 }}>
        {filtered.map(shift => (
          <ShiftCard key={shift.id} shift={shift} />
        ))}
      </Box>
    </Box>
  );
}
