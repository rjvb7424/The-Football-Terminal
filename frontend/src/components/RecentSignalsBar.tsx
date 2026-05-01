import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type MapSignal, signalColor } from '../data/mapSignals';
import { C } from '../colors';

interface Props {
  signals: MapSignal[];
  selectedSignal: MapSignal | null;
  onSelect: (s: MapSignal) => void;
}

export default function RecentSignalsBar({ signals, selectedSignal, onSelect }: Props) {
  const recent = signals.slice(0, 6);

  return (
    <Box
      sx={{
        height: 60,
        flexShrink: 0,
        bgcolor: '#050d0a',
        borderTop: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        px: 2,
        gap: 1,
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar': { height: 2 },
        '&::-webkit-scrollbar-thumb': { bgcolor: C.border },
      }}
    >
      <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.07em', flexShrink: 0, mr: 0.5 }}>
        RECENT
      </Typography>

      {recent.map(signal => {
        const color = signalColor(signal);
        const selected = selectedSignal?.id === signal.id;
        const sign = signal.impact >= 0 ? '+' : '';

        return (
          <Box
            key={signal.id}
            onClick={() => onSelect(signal)}
            sx={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.25,
              py: 0.6,
              borderRadius: '5px',
              cursor: 'pointer',
              border: `1px solid ${selected ? color + '55' : C.border}`,
              bgcolor: selected ? `${color}0d` : 'rgba(255,255,255,0.02)',
              transition: 'all 0.15s',
              '&:hover': {
                border: `1px solid ${color}44`,
                bgcolor: `${color}0a`,
              },
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, boxShadow: `0 0 5px ${color}`, flexShrink: 0 }} />
            <Box>
              <Typography sx={{ fontSize: '0.66rem', color: C.text1, fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {signal.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>
                  {signal.city}
                </Typography>
                <Typography sx={{ fontSize: '0.58rem', fontFamily: 'monospace', fontWeight: 700, color }}>
                  {sign}{signal.impact}
                </Typography>
                <Typography sx={{ fontSize: '0.56rem', color: C.text3, fontFamily: 'monospace' }}>
                  {signal.time}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
