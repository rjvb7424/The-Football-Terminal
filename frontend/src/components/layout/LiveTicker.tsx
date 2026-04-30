import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';
import { TICKER_ITEMS } from '../../data/mockSignals';

export default function LiveTicker() {
  const item = TICKER_ITEMS[0];
  const color = item.change < 0 ? C.negative : item.change > 0 ? C.positive : C.text3;
  const sign = item.change > 0 ? '+' : '';

  return (
    <Box
      sx={{
        minHeight: 30,
        bgcolor: C.bg,
        borderBottom: `1px solid rgba(255,255,255,0.045)`,
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 3 },
        gap: 1.2,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', flexShrink: 0 }}>
        LATEST
      </Typography>
      <Typography sx={{ fontSize: '0.68rem', color: C.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {item.tag}: {item.text}
      </Typography>
      <Typography sx={{ fontSize: '0.66rem', color, fontFamily: 'monospace', fontWeight: 800, flexShrink: 0 }}>
        {sign}{item.change}pp
      </Typography>
    </Box>
  );
}
