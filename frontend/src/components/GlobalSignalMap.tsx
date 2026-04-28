import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Public from '@mui/icons-material/Public';
import { C } from '../colors';
import { MAP_SIGNALS } from '../data/mockSignals';

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

export default function GlobalSignalMap() {
  return (
    <Card className="panel-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <Public sx={{ fontSize: 14, color: C.accent }} />
            <Typography variant="h6" sx={{ color: C.text2 }}>Global Signal Map</Typography>
          </Stack>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3 }}>
            {MAP_SIGNALS.length} active signals
          </Typography>
        </Stack>

        {/* Map area */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
            bgcolor: 'rgba(0,0,0,0.3)',
            border: `1px solid ${C.border}`,
            minHeight: 0,
          }}
        >
          {/* Background grid */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}
            preserveAspectRatio="none"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`v${i}`} x1={`${(i + 1) * 12.5}%`} y1="0" x2={`${(i + 1) * 12.5}%`} y2="100%" stroke={C.accent} strokeWidth="0.5" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${(i + 1) * 16.66}%`} x2="100%" y2={`${(i + 1) * 16.66}%`} stroke={C.accent} strokeWidth="0.5" />
            ))}
          </svg>

          {/* Europe outline hint (abstract SVG polygon) */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="10,80 15,65 18,60 22,55 25,45 30,40 35,30 40,20 45,15 50,18 55,20 60,22 65,30 70,35 75,40 78,50 75,55 70,58 68,65 65,70 62,75 55,72 50,78 45,80 40,82 35,80 28,82 22,85"
              fill={C.accent}
            />
          </svg>

          {/* City signal bubbles */}
          {MAP_SIGNALS.map((sig) => {
            const color = kindColor(sig.kind);
            const bg = kindBg(sig.kind);
            const sign = sig.change > 0 ? '+' : '';
            return (
              <Tooltip
                key={sig.city}
                title={`${sig.club} · ${sig.signal}`}
                placement="top"
                arrow
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: sig.left,
                    top: sig.top,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: 2,
                    '&:hover .bubble': {
                      transform: 'scale(1.15)',
                      boxShadow: `0 0 16px ${color}60`,
                    },
                  }}
                >
                  {/* Pulse ring */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: '50%',
                      border: `1px solid ${color}`,
                      opacity: 0.35,
                      animation: 'pulse-live 2s ease-in-out infinite',
                    }}
                  />
                  {/* Bubble */}
                  <Box
                    className="bubble"
                    sx={{
                      bgcolor: bg,
                      border: `1px solid ${color}60`,
                      borderRadius: '6px',
                      px: 0.75,
                      py: 0.3,
                      transition: 'all 0.2s ease',
                      boxShadow: `0 0 8px ${color}30`,
                      minWidth: 52,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.58rem', color, fontWeight: 800, fontFamily: 'monospace', lineHeight: 1 }}>
                      {sig.city}
                    </Typography>
                    <Typography sx={{ fontSize: '0.6rem', color, fontWeight: 700, fontFamily: 'monospace', lineHeight: 1.2 }}>
                      {sign}{sig.change}
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            );
          })}

          {/* Corner label */}
          <Typography
            sx={{
              position: 'absolute',
              bottom: 6,
              right: 8,
              fontSize: '0.58rem',
              color: C.text3,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
            }}
          >
            EUROPE SIGNAL GRID
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
