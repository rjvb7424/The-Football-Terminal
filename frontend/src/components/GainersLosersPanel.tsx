import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingDown from '@mui/icons-material/TrendingDown';
import { C } from '../colors';
import { GAINERS, LOSERS } from '../data/mockSignals';
import type { GainerLoser } from '../data/mockSignals';

function StatRow({ item, kind }: { item: GainerLoser; kind: 'gainer' | 'loser' }) {
  const color = kind === 'gainer' ? C.positive : C.negative;
  const sign = kind === 'gainer' ? '+' : '';
  const barPct = Math.min(100, Math.abs(item.change) * 2);

  return (
    <Box sx={{ py: 0.5 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.2}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: '0.68rem',
              color: C.text1,
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {item.name}
          </Typography>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, lineHeight: 1 }}>
            {item.category}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" gap={0.5} ml={1}>
          <Typography className="mono" sx={{ fontSize: '0.72rem', fontWeight: 700, color }}>
            {sign}{item.change}
          </Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>
            {item.current}%
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ height: 2, bgcolor: C.border, borderRadius: 1 }}>
        <Box
          sx={{
            height: '100%',
            width: `${barPct}%`,
            bgcolor: color,
            borderRadius: 1,
            boxShadow: `0 0 4px ${color}60`,
            transition: 'width 0.4s ease',
          }}
        />
      </Box>
    </Box>
  );
}

interface Props {
  shockActive: boolean;
}

export default function GainersLosersPanel({ shockActive }: Props) {
  const gainers = shockActive ? GAINERS : GAINERS.map(g => ({ ...g, change: Math.round(g.change * 0.1) }));
  const losers = shockActive ? LOSERS : LOSERS.map(l => ({ ...l, change: Math.round(l.change * 0.1), current: l.current + Math.abs(l.change) * 0.9 }));

  return (
    <Card className="panel-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        {/* Gainers */}
        <Stack direction="row" alignItems="center" gap={0.75} mb={0.75}>
          <TrendingUp sx={{ fontSize: 14, color: C.positive }} />
          <Typography variant="h6" sx={{ color: C.text2 }}>Top Gainers</Typography>
        </Stack>

        <Box>
          {gainers.slice(0, 4).map((item, i) => (
            <Box key={item.name}>
              <StatRow item={item} kind="gainer" />
              {i < gainers.length - 1 && <Divider sx={{ opacity: 0.3 }} />}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 1, borderColor: C.borderLight }} />

        {/* Losers */}
        <Stack direction="row" alignItems="center" gap={0.75} mb={0.75}>
          <TrendingDown sx={{ fontSize: 14, color: C.negative }} />
          <Typography variant="h6" sx={{ color: C.text2 }}>Top Losers</Typography>
        </Stack>

        <Box>
          {losers.slice(0, 4).map((item, i) => (
            <Box key={item.name}>
              <StatRow item={item} kind="loser" />
              {i < losers.length - 1 && <Divider sx={{ opacity: 0.3 }} />}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
