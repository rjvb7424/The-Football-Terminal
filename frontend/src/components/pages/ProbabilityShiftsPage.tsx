import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { C, impactColor } from '../../colors';
import { SIGNALS, type Signal } from '../../data/mockSignals';
import PageHeader from '../shared/PageHeader';

function ShiftCard({ signal }: { signal: Signal }) {
  const color = impactColor(signal.impact);
  const sign = signal.impact > 0 ? '+' : '';

  return (
    <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '9px', p: 3, display: 'flex', flexDirection: 'column', gap: 2.4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: '0.68rem', color: signal.eventType === 'rumour' ? C.amber : C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.8 }}>
            {signal.eventType}
          </Typography>
          <Typography sx={{ fontSize: '1.08rem', color: C.text1, fontWeight: 800, lineHeight: 1.25 }}>
            {signal.club} · {signal.competition}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '1.2rem', color, fontFamily: 'monospace', fontWeight: 850, flexShrink: 0 }}>
          {sign}{signal.impact}pp
        </Typography>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
          <Typography sx={{ fontSize: '2rem', color: C.text2, fontFamily: 'monospace', fontWeight: 820 }}>{signal.before}%</Typography>
          <Typography sx={{ color: C.text3 }}>→</Typography>
          <Typography sx={{ fontSize: '2rem', color, fontFamily: 'monospace', fontWeight: 820 }}>{signal.after}%</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={signal.after}
          sx={{ height: 5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.08)', '& .MuiLinearProgress-bar': { bgcolor: color } }}
        />
      </Box>

      <Box>
        <Typography sx={{ fontSize: '0.72rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.7 }}>
          Trigger
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', color: C.text1, fontWeight: 720, lineHeight: 1.45 }}>
          {signal.title}
        </Typography>
      </Box>

      <Typography sx={{ fontSize: '0.82rem', color: C.text2, lineHeight: 1.7 }}>
        {signal.explanation}
      </Typography>
    </Box>
  );
}

export default function ProbabilityShiftsPage() {
  const sorted = [...SIGNALS].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader
        title="Probability Shifts"
        subtitle="What changed? Before-and-after outcome movement with the trigger attached."
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        {sorted.map(signal => (
          <ShiftCard key={signal.id} signal={signal} />
        ))}
      </Box>
    </Box>
  );
}
