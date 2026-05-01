import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { C } from '../colors';

interface Props {
  label: string;
  before: number;
  after: number;
}

export default function ProbabilityShift({ label, before, after }: Props) {
  const impact = after - before;
  const color = impact >= 0 ? C.positive : C.negative;
  const sign = impact >= 0 ? '+' : '';

  return (
    <Box
      sx={{
        bgcolor: 'rgba(255,255,255,0.03)',
        border: `1px solid ${C.border}`,
        borderRadius: '6px',
        p: 1.5,
      }}
    >
      <Typography sx={{ fontSize: '0.65rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.07em', mb: 1.25 }}>
        {label.toUpperCase()}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1.25 }}>
        <Typography sx={{ fontSize: '1.6rem', fontFamily: 'monospace', fontWeight: 800, color: C.text2, lineHeight: 1 }}>
          {before}%
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', color: C.text3 }}>→</Typography>
        <Typography sx={{ fontSize: '1.6rem', fontFamily: 'monospace', fontWeight: 800, color, lineHeight: 1 }}>
          {after}%
        </Typography>
        <Box
          sx={{
            ml: 'auto',
            px: 1,
            py: 0.3,
            borderRadius: '4px',
            bgcolor: impact >= 0 ? C.positiveDim : C.negativeDim,
            border: `1px solid ${color}22`,
          }}
        >
          <Typography sx={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 800, color }}>
            {sign}{impact}%
          </Typography>
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={after}
        sx={{
          height: 3,
          borderRadius: 2,
          bgcolor: C.border,
          '& .MuiLinearProgress-bar': { bgcolor: color },
        }}
      />
    </Box>
  );
}
