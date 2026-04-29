import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';
import { TICKER_ITEMS } from '../../data/mockSignals';

const kindColor = (kind: 'positive' | 'negative' | 'amber') => {
  if (kind === 'positive') return C.positive;
  if (kind === 'negative') return C.negative;
  return C.amber;
};

const kindBg = (kind: 'positive' | 'negative' | 'amber') => {
  if (kind === 'positive') return C.positiveDim;
  if (kind === 'negative') return C.negativeDim;
  return C.amberDim;
};

function TickerItem({ item }: { item: typeof TICKER_ITEMS[0] }) {
  const sign = item.change > 0 ? '+' : '';
  const color = kindColor(item.kind);
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 2,
        borderRight: `1px solid ${C.border}`,
        height: '100%',
        flexShrink: 0,
        '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
        transition: 'background 0.1s',
        cursor: 'default',
      }}
    >
      <Box
        sx={{
          bgcolor: kindBg(item.kind),
          border: `1px solid ${color}30`,
          borderRadius: '3px',
          px: 0.5,
          py: 0.1,
        }}
      >
        <Typography sx={{ fontSize: '0.58rem', fontWeight: 800, color, letterSpacing: '0.08em', fontFamily: 'monospace' }}>
          {item.tag}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '0.7rem', color: C.text2, whiteSpace: 'nowrap' }}>
        {item.text}
      </Typography>
      <Typography className="mono" sx={{ fontSize: '0.68rem', fontWeight: 700, color, ml: 0.5, whiteSpace: 'nowrap' }}>
        {sign}{item.change}
      </Typography>
    </Box>
  );
}

const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function LiveTicker() {
  return (
    <Box
      sx={{
        height: 34,
        bgcolor: C.bg,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 40,
          background: `linear-gradient(to right, ${C.bg}, transparent)`,
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      <Box className="ticker-track" sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        {items.map((item, i) => (
          <TickerItem key={`${item.tag}-${i}`} item={item} />
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 40,
          background: `linear-gradient(to left, ${C.bg}, transparent)`,
          zIndex: 2, pointerEvents: 'none',
        }}
      />
    </Box>
  );
}
