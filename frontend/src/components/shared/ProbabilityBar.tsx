import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';

interface Props {
  label?: string;
  before: number;
  after: number;
  color?: string;
  showLabels?: boolean;
}

export default function ProbabilityBar({ label, before, after, color, showLabels = true }: Props) {
  const delta = after - before;
  const isPositive = delta >= 0;
  const barColor = color ?? (isPositive ? C.positive : C.negative);
  const deltaColor = isPositive ? C.positive : C.negative;
  const sign = isPositive ? '+' : '';

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', mb: 0.5, letterSpacing: '0.06em' }}>
          {label}
        </Typography>
      )}

      {showLabels && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontSize: '0.65rem', color: C.text2, fontFamily: 'monospace' }}>
            Before: <Box component="span" sx={{ color: C.text1, fontWeight: 600 }}>{before}%</Box>
          </Typography>
          <Typography sx={{ fontSize: '0.65rem', fontFamily: 'monospace', color: deltaColor, fontWeight: 700 }}>
            {sign}{delta}pp
          </Typography>
          <Typography sx={{ fontSize: '0.65rem', color: C.text2, fontFamily: 'monospace' }}>
            After: <Box component="span" sx={{ color: barColor, fontWeight: 700 }}>{after}%</Box>
          </Typography>
        </Box>
      )}

      {/* Before bar */}
      <Box sx={{ position: 'relative', height: 6, bgcolor: C.border, borderRadius: 1, mb: 0.75, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${before}%`,
            bgcolor: C.text3,
            borderRadius: 1,
            opacity: 0.5,
          }}
        />
      </Box>

      {/* After bar */}
      <Box sx={{ position: 'relative', height: 6, bgcolor: C.border, borderRadius: 1, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${after}%`,
            bgcolor: barColor,
            borderRadius: 1,
            boxShadow: `0 0 6px ${barColor}40`,
            transition: 'width 0.6s ease',
          }}
        />
      </Box>
    </Box>
  );
}
