import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { C } from '../../colors';
import { TRANSFER_RUMOURS } from '../../data/mockTransfers';
import PageHeader from '../shared/PageHeader';

export default function TransfersPage() {
  const sorted = [...TRANSFER_RUMOURS].sort((a, b) => b.currentProbability - a.currentProbability);

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader title="Transfers" subtitle="Clean transfer probability cards. Player, destination, movement, and reason." />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        {sorted.map(transfer => {
          const delta = transfer.currentProbability - transfer.morningProbability;
          const color = delta > 0 ? C.positive : delta < 0 ? C.negative : C.text3;
          const sign = delta > 0 ? '+' : '';
          return (
            <Box key={transfer.id} sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '9px', p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2.5 }}>
                <Box>
                  <Typography sx={{ fontSize: '1.1rem', color: C.text1, fontWeight: 830 }}>{transfer.player}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: C.text2, mt: 0.45 }}>
                    {transfer.currentClub} → {transfer.linkedClub}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: '1.6rem', color: C.text1, fontFamily: 'monospace', fontWeight: 850, lineHeight: 1 }}>
                    {transfer.currentProbability}%
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color, fontFamily: 'monospace', fontWeight: 850, mt: 0.5 }}>
                    {sign}{delta}pp today
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={transfer.currentProbability}
                sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.08)', mb: 2.2, '& .MuiLinearProgress-bar': { bgcolor: transfer.status === 'cooling' ? C.negative : transfer.status === 'quiet' ? C.text3 : C.accent } }}
              />
              <Typography sx={{ fontSize: '0.72rem', color: transfer.status === 'heating_up' || transfer.status === 'exploding' ? C.amber : C.text3, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1 }}>
                {transfer.status.replace('_', ' ')}
              </Typography>
              <Typography sx={{ fontSize: '0.84rem', color: C.text2, lineHeight: 1.7 }}>
                {transfer.reason}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
