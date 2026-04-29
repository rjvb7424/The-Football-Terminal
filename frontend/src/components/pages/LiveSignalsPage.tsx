import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import Close from '@mui/icons-material/Close';
import { C, impactColor } from '../../colors';
import { SIGNALS, type Signal } from '../../data/mockSignals';
import PageHeader from '../shared/PageHeader';
import StatusChip from '../shared/StatusChip';
import SignalRow from '../shared/SignalRow';
import ProbabilityBar from '../shared/ProbabilityBar';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'injury', label: 'Injuries' },
  { id: 'lineup', label: 'Lineups' },
  { id: 'transfer', label: 'Transfers' },
  { id: 'red_card', label: 'Red Cards' },
  { id: 'tactical', label: 'Tactical' },
  { id: 'rumour', label: 'Rumours' },
];

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
        letterSpacing: '0.04em',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        '&:hover': { borderColor: active ? C.accent : C.borderLight, color: active ? C.accent : C.text1 },
        flexShrink: 0,
      }}
    >
      {label}
    </Box>
  );
}

function SignalDetailModal({ signal, onClose }: { signal: Signal; onClose: () => void }) {
  const color = impactColor(signal.impact);
  const sign = signal.impact > 0 ? '+' : '';

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: '10px',
            boxShadow: `0 0 40px rgba(0,0,0,0.8)`,
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 1.5, borderBottom: `1px solid ${C.border}`, bgcolor: C.surface }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <StatusChip variant={signal.status} pulse />
            <StatusChip variant={signal.eventType as any} label={signal.eventType.replace('_', ' ').toUpperCase()} />
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: C.text3, '&:hover': { color: C.text1 } }}>
            <Close sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* Body */}
        <Box sx={{ p: 2.5 }}>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', mb: 0.5, letterSpacing: '0.06em' }}>
            {signal.club.toUpperCase()} · {signal.competition.toUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: C.text1, mb: 0.75, lineHeight: 1.25 }}>
            {signal.title}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: C.text2, mb: 2.5, lineHeight: 1.6 }}>
            {signal.subtitle}
          </Typography>

          {/* Probability shift */}
          <Box sx={{ mb: 2.5 }}>
            <ProbabilityBar
              label="Probability shift"
              before={signal.before}
              after={signal.after}
              color={signal.impact < 0 ? C.negative : C.positive}
            />
          </Box>

          {/* Stats row */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, mb: 2.5 }}>
            <Box sx={{ p: 1.25, bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '6px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.55rem', color: C.text3, fontFamily: 'monospace', mb: 0.25 }}>IMPACT</Typography>
              <Typography sx={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: 700, color }}>{sign}{signal.impact}pp</Typography>
            </Box>
            <Box sx={{ p: 1.25, bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '6px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.55rem', color: C.text3, fontFamily: 'monospace', mb: 0.25 }}>CONFIDENCE</Typography>
              <Typography sx={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: 700, color: C.text1 }}>{signal.confidence}%</Typography>
            </Box>
            <Box sx={{ p: 1.25, bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '6px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.55rem', color: C.text3, fontFamily: 'monospace', mb: 0.25 }}>DETECTED</Typography>
              <Typography sx={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: 700, color: C.text1 }}>{signal.minutesAgo}m ago</Typography>
            </Box>
          </Box>

          {/* Confidence bar */}
          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
              <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>SIGNAL CONFIDENCE</Typography>
              <Typography sx={{ fontSize: '0.6rem', color: C.accent, fontFamily: 'monospace' }}>{signal.confidence}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={signal.confidence} sx={{ height: 5, borderRadius: 2, bgcolor: C.border, '& .MuiLinearProgress-bar': { bgcolor: C.accent } }} />
          </Box>

          {/* Explanation */}
          <Box sx={{ p: 1.5, bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '6px', mb: 2 }}>
            <Typography sx={{ fontSize: '0.6rem', color: C.accent, fontFamily: 'monospace', mb: 0.5, letterSpacing: '0.06em' }}>WHY IT CHANGED</Typography>
            <Typography sx={{ fontSize: '0.78rem', color: C.text2, lineHeight: 1.65 }}>
              {signal.explanation}
            </Typography>
          </Box>

          {/* Affected teams */}
          {signal.affectedTeams.length > 0 && (
            <Box>
              <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', mb: 0.75, letterSpacing: '0.06em' }}>AFFECTED TEAMS</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {signal.affectedTeams.map(t => {
                  const tc = impactColor(t.impact);
                  return (
                    <Box key={t.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, py: 0.75, bgcolor: t.impact > 0 ? 'rgba(63,185,80,0.05)' : 'rgba(248,81,73,0.05)', border: `1px solid ${t.impact > 0 ? 'rgba(63,185,80,0.2)' : 'rgba(248,81,73,0.15)'}`, borderRadius: '5px' }}>
                      <Typography sx={{ fontSize: '0.72rem', color: C.text2 }}>{t.name}</Typography>
                      <Typography sx={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: tc }}>{t.impact > 0 ? '+' : ''}{t.impact}pp</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function LiveSignalsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Signal | null>(null);

  const filtered = useMemo(() => {
    let list = SIGNALS;
    if (activeFilter !== 'all') list = list.filter(s => s.eventType === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s => s.title.toLowerCase().includes(q) || s.club.toLowerCase().includes(q) || s.competition.toLowerCase().includes(q));
    }
    return list;
  }, [activeFilter, search]);

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
      <PageHeader
        title="Live Signals"
        subtitle="What happened? Every signal that shifted an outcome."
      />

      {/* Filters + search */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={activeFilter === f.id}
              onClick={() => setActiveFilter(f.id)}
            />
          ))}
        </Box>

        {/* Search box — native input to avoid MUI v9 API issues */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            flex: 1,
            minWidth: 180,
            maxWidth: 280,
            bgcolor: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: '6px',
            px: 1.25,
            py: 0.6,
            '&:focus-within': { borderColor: C.accent },
            transition: 'border-color 0.15s',
          }}
        >
          <SearchIcon sx={{ fontSize: 15, color: C.text3, flexShrink: 0 }} />
          <Box
            component="input"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search signals…"
            sx={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: C.text1,
              fontSize: '0.75rem',
              fontFamily: 'inherit',
              '&::placeholder': { color: C.text3 },
            }}
          />
        </Box>
      </Box>

      {/* Signal count */}
      <Typography sx={{ fontSize: '0.65rem', color: C.text3, fontFamily: 'monospace', mb: 1.5 }}>
        {filtered.length} SIGNAL{filtered.length !== 1 ? 'S' : ''} · SORTED BY IMPACT
      </Typography>

      {/* Signal list */}
      <Box sx={{ bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        {/* Table header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.75, py: 1, borderBottom: `1px solid ${C.border}`, bgcolor: C.card }}>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', width: 70, flexShrink: 0 }}>TYPE</Typography>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', flex: 1 }}>SIGNAL</Typography>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', width: 42, textAlign: 'right', flexShrink: 0 }}>IMPACT</Typography>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', width: 36, textAlign: 'right', flexShrink: 0 }}>CONF.</Typography>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', width: 40, textAlign: 'right', flexShrink: 0 }}>AGO</Typography>
        </Box>

        {filtered.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: C.text3, fontSize: '0.8rem' }}>No signals match your filters.</Typography>
          </Box>
        ) : (
          filtered.map(sig => (
            <SignalRow
              key={sig.id}
              signal={sig}
              selected={selected?.id === sig.id}
              onClick={() => setSelected(sig)}
            />
          ))
        )}
      </Box>

      {selected && <SignalDetailModal signal={selected} onClose={() => setSelected(null)} />}
    </Box>
  );
}
