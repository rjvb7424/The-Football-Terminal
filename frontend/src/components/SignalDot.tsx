import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { type MapSignal, signalColor } from '../data/mapSignals';
import { C } from '../colors';

interface Props {
  signal: MapSignal;
  selected: boolean;
  onClick: (s: MapSignal) => void;
}

export default function SignalDot({ signal, selected, onClick }: Props) {
  const color = signalColor(signal);
  const isLive = signal.status === 'Live' || signal.status === 'Volatile';
  const sign = signal.impact >= 0 ? '+' : '';

  return (
    <Tooltip
      title={
        <Box>
          <Box sx={{ fontSize: '0.72rem', fontWeight: 700, color: C.text1, mb: 0.25 }}>{signal.title}</Box>
          <Box sx={{ fontSize: '0.64rem', color: C.text3 }}>{signal.city} · {signal.time}</Box>
          <Box sx={{ fontSize: '0.64rem', color, fontFamily: 'monospace', fontWeight: 700, mt: 0.25 }}>
            Impact {sign}{signal.impact}
          </Box>
        </Box>
      }
      placement="top"
      arrow
    >
      <Box
        onClick={() => onClick(signal)}
        sx={{
          position: 'absolute',
          left: `${signal.coordinates.x}%`,
          top: `${signal.coordinates.y}%`,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: selected ? 10 : 5,
          '&:hover': { zIndex: 20 },
        }}
      >
        {/* Outer pulse ring — only for live/volatile signals */}
        {isLive && (
          <Box
            sx={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              bgcolor: `${color}20`,
              animation: 'pulseRing 2s ease-out infinite',
              '@keyframes pulseRing': {
                '0%': { transform: 'scale(0.8)', opacity: 0.8 },
                '100%': { transform: 'scale(2)', opacity: 0 },
              },
            }}
          />
        )}

        {/* Selected ring */}
        {selected && (
          <Box
            sx={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: `2px solid ${color}`,
              boxShadow: `0 0 10px ${color}66`,
            }}
          />
        )}

        {/* Main dot */}
        <Box
          sx={{
            width: selected ? 14 : 10,
            height: selected ? 14 : 10,
            borderRadius: '50%',
            bgcolor: color,
            boxShadow: `0 0 ${selected ? 12 : 6}px ${color}88`,
            transition: 'all 0.18s ease',
            border: `1.5px solid ${color}cc`,
          }}
        />
      </Box>
    </Tooltip>
  );
}
