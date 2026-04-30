import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import { C, impactColor } from '../../colors';
import { SIGNALS, type EventType, type Signal } from '../../data/mockSignals';
import PageHeader from '../shared/PageHeader';

const FILTERS: Array<{ id: EventType | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'injury', label: 'Injuries' },
  { id: 'lineup', label: 'Lineups' },
  { id: 'transfer', label: 'Transfers' },
  { id: 'tactical', label: 'Tactical' },
  { id: 'rumour', label: 'Rumours' },
];

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        px: 1.35,
        py: 0.6,
        border: `1px solid ${active ? 'rgba(0,180,216,0.42)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '7px',
        bgcolor: active ? 'rgba(0,180,216,0.08)' : 'transparent',
        color: active ? C.accent : C.text2,
        fontSize: '0.72rem',
        cursor: 'pointer',
      }}
    >
      {label}
    </Box>
  );
}

function SignalLine({ signal, onClick }: { signal: Signal; onClick: () => void }) {
  const color = impactColor(signal.impact);
  const sign = signal.impact > 0 ? '+' : '';
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr auto', md: '1fr 110px 90px 90px 70px' },
        gap: 1.75,
        alignItems: 'center',
        px: { xs: 2, md: 2.5 },
        py: 2,
        border: 0,
        borderTop: `1px solid rgba(255,255,255,0.055)`,
        bgcolor: 'transparent',
        textAlign: 'left',
        cursor: 'pointer',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.025)' },
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.9rem', color: C.text1, fontWeight: 760, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {signal.title}
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: C.text3, mt: 0.25 }}>
          {signal.club}
        </Typography>
      </Box>
      <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.68rem', color: signal.eventType === 'rumour' ? C.amber : C.text3, fontFamily: 'monospace', textTransform: 'uppercase' }}>
        {signal.eventType}
      </Typography>
      <Typography sx={{ fontSize: '0.86rem', color, fontFamily: 'monospace', fontWeight: 850, textAlign: 'right' }}>
        {sign}{signal.impact}pp
      </Typography>
      <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.76rem', color: C.text2, fontFamily: 'monospace', textAlign: 'right' }}>
        {signal.confidence}%
      </Typography>
      <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.72rem', color: C.text3, fontFamily: 'monospace', textAlign: 'right' }}>
        {signal.minutesAgo}m
      </Typography>
    </Box>
  );
}

function DetailDrawer({ signal, onClose }: { signal: Signal; onClose: () => void }) {
  const color = impactColor(signal.impact);
  const sign = signal.impact > 0 ? '+' : '';

  return (
    <Drawer
      anchor="right"
      open
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 440 },
            bgcolor: C.surface,
            color: C.text1,
            borderLeft: `1px solid rgba(255,255,255,0.08)`,
            p: 3,
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '0.66rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1 }}>
            Signal Detail
          </Typography>
          <Typography sx={{ fontSize: '1.45rem', color: C.text1, fontWeight: 820, lineHeight: 1.15 }}>
            {signal.title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: C.text3 }}>
          <Close />
        </IconButton>
      </Box>

      {[
        ['What happened?', signal.subtitle],
        ['What changed?', `${signal.club} moved from ${signal.before}% to ${signal.after}% (${sign}${signal.impact}pp).`],
        ['Why it matters', signal.explanation],
      ].map(([label, text]) => (
        <Box key={label} sx={{ mb: 3.5 }}>
          <Typography sx={{ fontSize: '0.68rem', color: C.accent, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1 }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: C.text2, lineHeight: 1.75 }}>
            {text}
          </Typography>
        </Box>
      ))}

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 1 }}>
        <Box sx={{ p: 2, bgcolor: C.card, borderRadius: '8px' }}>
          <Typography sx={{ fontSize: '0.64rem', color: C.text3, fontFamily: 'monospace', mb: 0.75 }}>IMPACT</Typography>
          <Typography sx={{ fontSize: '1.3rem', color, fontFamily: 'monospace', fontWeight: 850 }}>{sign}{signal.impact}pp</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: C.card, borderRadius: '8px' }}>
          <Typography sx={{ fontSize: '0.64rem', color: C.text3, fontFamily: 'monospace', mb: 0.75 }}>DETECTED</Typography>
          <Typography sx={{ fontSize: '1.3rem', color: C.text1, fontFamily: 'monospace', fontWeight: 850 }}>{signal.minutesAgo}m</Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default function LiveSignalsPage() {
  const [filter, setFilter] = useState<EventType | 'all'>('all');
  const [selected, setSelected] = useState<Signal | null>(null);
  const filtered = useMemo(() => filter === 'all' ? SIGNALS : SIGNALS.filter(signal => signal.eventType === filter), [filter]);

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader title="Live Signals" subtitle="What happened? A clean feed of events that moved football outcomes." />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {FILTERS.map(item => (
          <FilterButton key={item.id} label={item.label} active={filter === item.id} onClick={() => setFilter(item.id)} />
        ))}
      </Box>

      <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '8px', overflow: 'hidden' }}>
        {filtered.map(signal => (
          <SignalLine key={signal.id} signal={signal} onClick={() => setSelected(signal)} />
        ))}
      </Box>

      {selected && <DetailDrawer signal={selected} onClose={() => setSelected(null)} />}
    </Box>
  );
}
