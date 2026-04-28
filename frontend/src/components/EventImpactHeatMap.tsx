import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment';
import { C } from '../colors';
import { HEATMAP_TILES } from '../data/mockSignals';

const kindColor = (kind: 'positive' | 'negative' | 'amber') => {
  if (kind === 'positive') return C.positive;
  if (kind === 'negative') return C.negative;
  return C.amber;
};

const kindBg = (kind: 'positive' | 'negative' | 'amber', intensity: number) => {
  const alpha = Math.min(0.05 + intensity * 0.3, 0.45);
  if (kind === 'positive') return `rgba(63,185,80,${alpha})`;
  if (kind === 'negative') return `rgba(248,81,73,${alpha})`;
  return `rgba(210,153,34,${alpha})`;
};

const sizeToSpan = (size: 'large' | 'medium' | 'small') => {
  if (size === 'large') return 2;
  if (size === 'medium') return 1;
  return 1;
};

export default function EventImpactHeatMap() {
  const maxImpact = Math.max(...HEATMAP_TILES.map(t => Math.abs(t.impactSum)));

  return (
    <Card className="panel-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <LocalFireDepartment sx={{ fontSize: 14, color: C.amber }} />
            <Typography variant="h6" sx={{ color: C.text2 }}>Event Impact Heat Map</Typography>
          </Stack>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3 }}>
            All competitions
          </Typography>
        </Stack>

        {/* Grid */}
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: '3px',
            minHeight: 0,
          }}
        >
          {HEATMAP_TILES.map((tile) => {
            const color = kindColor(tile.kind);
            const intensity = Math.abs(tile.impactSum) / maxImpact;
            const bg = kindBg(tile.kind, intensity);
            const sign = tile.impactSum > 0 ? '+' : '';
            const span = sizeToSpan(tile.size);

            return (
              <Tooltip
                key={tile.label}
                title={`${tile.count} events · Net impact ${sign}${tile.impactSum}`}
                arrow
              >
                <Box
                  sx={{
                    gridColumn: tile.size === 'large' ? 'span 2' : 'span 1',
                    bgcolor: bg,
                    border: `1px solid ${color}30`,
                    borderRadius: '4px',
                    p: 0.75,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'default',
                    transition: 'all 0.15s',
                    '&:hover': {
                      bgcolor: kindBg(tile.kind, intensity + 0.15),
                      border: `1px solid ${color}60`,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: tile.size === 'large' ? '0.72rem' : '0.65rem',
                      fontWeight: 700,
                      color: C.text1,
                      lineHeight: 1.2,
                    }}
                  >
                    {tile.label}
                  </Typography>
                  <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
                    <Typography
                      className="mono"
                      sx={{
                        fontSize: tile.size === 'large' ? '0.85rem' : '0.72rem',
                        fontWeight: 800,
                        color,
                        lineHeight: 1,
                      }}
                    >
                      {sign}{tile.impactSum}
                    </Typography>
                    <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>
                      ×{tile.count}
                    </Typography>
                  </Stack>
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        {/* Legend */}
        <Stack direction="row" gap={1.5} mt={0.75}>
          {(['positive', 'negative', 'amber'] as const).map(k => (
            <Stack key={k} direction="row" alignItems="center" gap={0.5}>
              <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: kindColor(k) }} />
              <Typography sx={{ fontSize: '0.58rem', color: C.text3, textTransform: 'capitalize' }}>{k === 'amber' ? 'uncertain' : k}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
