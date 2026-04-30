import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { C } from '../../colors';
import { TRANSFER_RUMOURS, type TransferRumour, type TransferStatus } from '../../data/mockTransfers';
import PageHeader from '../shared/PageHeader';
import FeatureCard from '../shared/FeatureCard';
import StatusChip from '../shared/StatusChip';

const STATUS_ORDER: TransferStatus[] = ['exploding', 'heating_up', 'moving', 'quiet', 'cooling'];

function VelocityBar({ velocity }: { velocity: number }) {
  const abs = Math.abs(velocity);
  const capped = Math.min(abs, 40);
  const pct = (capped / 40) * 100;
  const color = velocity > 15 ? C.negative : velocity > 5 ? C.amber : velocity < 0 ? C.text3 : C.positive;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>VELOCITY</Typography>
        <Typography sx={{ fontSize: '0.65rem', fontFamily: 'monospace', fontWeight: 700, color }}>
          {velocity > 0 ? '+' : ''}{velocity}pp / {TRANSFER_RUMOURS.find(t => t.velocity === velocity)?.hoursWindow ?? 6}h
        </Typography>
      </Box>
      <Box sx={{ position: 'relative', height: 5, bgcolor: C.border, borderRadius: 1, overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, bgcolor: color, borderRadius: 1, transition: 'width 0.4s ease' }} />
      </Box>
    </Box>
  );
}

function TransferCard({ transfer }: { transfer: TransferRumour }) {
  const delta = transfer.currentProbability - transfer.morningProbability;
  const deltaColor = delta > 0 ? C.positive : delta < 0 ? C.negative : C.text3;
  const sign = delta >= 0 ? '+' : '';

  return (
    <FeatureCard noPadding>
      {/* Header */}
      <Box sx={{ px: 2, py: 1.25, borderBottom: `1px solid ${C.border}`, bgcolor: C.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StatusChip variant={transfer.status} label={transfer.status.replace('_', ' ').toUpperCase()} pulse={transfer.status === 'exploding' || transfer.status === 'heating_up'} />
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>{transfer.lastUpdate}</Typography>
        </Box>
        <Typography sx={{ fontSize: '0.65rem', fontFamily: 'monospace', fontWeight: 700, color: deltaColor }}>
          {sign}{delta}pp today
        </Typography>
      </Box>

      {/* Body */}
      <Box sx={{ p: 2 }}>
        {/* Player + clubs */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.75 }}>
          <Box>
            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: C.text1, lineHeight: 1.1 }}>{transfer.player}</Typography>
            <Typography sx={{ fontSize: '0.68rem', color: C.text2, mt: 0.3 }}>
              {transfer.position} · {transfer.currentClub}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', mb: 0.25 }}>TO</Typography>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: C.accent }}>{transfer.linkedClub}</Typography>
          </Box>
        </Box>

        {/* Probability shift */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 1.5, alignItems: 'center', mb: 2 }}>
          <Box sx={{ p: 1.25, bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: '6px', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.52rem', color: C.text3, fontFamily: 'monospace', mb: 0.25 }}>MORNING</Typography>
            <Typography sx={{ fontSize: '1.3rem', fontFamily: 'monospace', fontWeight: 700, color: C.text3, lineHeight: 1 }}>
              {transfer.morningProbability}%
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '1rem', color: deltaColor, fontFamily: 'monospace', fontWeight: 700 }}>
              {sign}{delta}
            </Typography>
            <Typography sx={{ fontSize: '0.55rem', color: C.text3 }}>→</Typography>
          </Box>

          <Box sx={{ p: 1.25, bgcolor: delta > 0 ? 'rgba(63,185,80,0.06)' : delta < 0 ? 'rgba(248,81,73,0.06)' : C.card, border: `1px solid ${delta > 0 ? 'rgba(63,185,80,0.25)' : delta < 0 ? 'rgba(248,81,73,0.25)' : C.border}`, borderRadius: '6px', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.52rem', color: delta > 0 ? C.positive : delta < 0 ? C.negative : C.text3, fontFamily: 'monospace', mb: 0.25 }}>NOW</Typography>
            <Typography sx={{ fontSize: '1.3rem', fontFamily: 'monospace', fontWeight: 700, color: deltaColor, lineHeight: 1 }}>
              {transfer.currentProbability}%
            </Typography>
          </Box>
        </Box>

        {/* Velocity */}
        <Box sx={{ mb: 2 }}>
          <VelocityBar velocity={transfer.velocity} />
        </Box>

        {/* Confidence */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>CONFIDENCE</Typography>
            <Typography sx={{ fontSize: '0.62rem', color: C.text2, fontFamily: 'monospace' }}>{transfer.confidence}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={transfer.confidence} sx={{ height: 4, borderRadius: 2, bgcolor: C.border, '& .MuiLinearProgress-bar': { bgcolor: C.accent } }} />
        </Box>

        {/* Reason */}
        <Box sx={{ p: 1.25, bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: '6px', mb: 1.5 }}>
          <Typography sx={{ fontSize: '0.7rem', color: C.text2, lineHeight: 1.6 }}>{transfer.reason}</Typography>
        </Box>

        {/* Sources */}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {transfer.sources.map(s => (
            <Box key={s} sx={{ px: 0.875, py: 0.2, bgcolor: C.accentDim, border: `1px solid rgba(0,180,216,0.2)`, borderRadius: '3px' }}>
              <Typography sx={{ fontSize: '0.58rem', color: C.accent, fontFamily: 'monospace' }}>{s}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </FeatureCard>
  );
}

export default function TransfersPage() {
  const sorted = [...TRANSFER_RUMOURS].sort((a, b) => {
    const ai = STATUS_ORDER.indexOf(a.status);
    const bi = STATUS_ORDER.indexOf(b.status);
    return ai - bi || b.velocity - a.velocity;
  });

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 4 } }}>
      <PageHeader
        title="Transfers"
        subtitle="Which moves are becoming more likely? Probability velocity across the market."
      />

      {/* Summary row */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3.5, flexWrap: 'wrap' }}>
        {(['exploding', 'heating_up', 'moving', 'cooling'] as TransferStatus[]).map(status => {
          const count = TRANSFER_RUMOURS.filter(t => t.status === status).length;
          if (count === 0) return null;
          return (
            <Box key={status} sx={{ px: 2, py: 1, bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '6px', display: 'flex', alignItems: 'center', gap: 1 }}>
              <StatusChip variant={status} />
              <Typography sx={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: C.text1 }}>{count}</Typography>
            </Box>
          );
        })}
      </Box>

      {/* Cards grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }, gap: 3 }}>
        {sorted.map(t => (
          <TransferCard key={t.id} transfer={t} />
        ))}
      </Box>
    </Box>
  );
}
