import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import QueryStats from '@mui/icons-material/QueryStats';
import { C } from '../colors';
import { CHART_TEAMS } from '../data/mockSignals';

const W = 560;
const H = 160;
const PAD_L = 36;
const PAD_R = 12;
const PAD_T = 10;
const PAD_B = 24;
const CW = W - PAD_L - PAD_R;
const CH = H - PAD_T - PAD_B;

// Shock event position (x-coordinate where the drop happens)
const SHOCK_X = PAD_L + (17 / 24) * CW;

function toPoints(data: number[]) {
  return data
    .map((v, i) => {
      const x = PAD_L + (i / (data.length - 1)) * CW;
      const y = PAD_T + CH - (Math.max(0, Math.min(100, v)) / 100) * CH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

const Y_LABELS = [100, 75, 50, 25, 0];
const X_LABELS = ['24h', '18h', '12h', '6h', 'NOW'];

interface Props {
  shockActive: boolean;
}

export default function ProbabilityIndexChart({ shockActive }: Props) {
  const teams = CHART_TEAMS;

  // Current values (last data point)
  const current = useMemo(
    () => teams.map(t => ({ name: t.name, color: t.color, value: shockActive ? t.points[t.points.length - 1] : 80 })),
    [shockActive]
  );

  return (
    <Card className="panel-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <QueryStats sx={{ fontSize: 14, color: C.accent }} />
            <Typography variant="h6" sx={{ color: C.text2 }}>Football Situation Index</Typography>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: C.positive, boxShadow: `0 0 6px ${C.positive}`, animation: 'pulse-live 1.4s ease-in-out infinite' }} />
          </Stack>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace' }}>
            La Liga · Title Race · 24h window
          </Typography>
        </Stack>

        {/* Legend */}
        <Stack direction="row" gap={1.5} mb={1}>
          {teams.map(t => (
            <Stack key={t.name} direction="row" alignItems="center" gap={0.5}>
              <Box sx={{ width: 16, height: 2, bgcolor: t.color, borderRadius: 1 }} />
              <Typography sx={{ fontSize: '0.62rem', color: C.text2 }}>{t.name}</Typography>
              <Typography className="mono" sx={{ fontSize: '0.65rem', fontWeight: 700, color: t.color }}>
                {shockActive ? t.points[t.points.length - 1] : (t.name === 'Real Madrid' ? 80 : t.points[0])}%
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* SVG Chart */}
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              {teams.map(t => (
                <linearGradient key={t.name} id={`grad-${t.name.replace(' ', '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={t.color} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={t.color} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>

            {/* Grid lines */}
            {Y_LABELS.map(v => {
              const y = PAD_T + CH - (v / 100) * CH;
              return (
                <g key={v}>
                  <line x1={PAD_L} y1={y} x2={PAD_L + CW} y2={y} stroke={C.border} strokeWidth="0.5" />
                  <text x={PAD_L - 4} y={y + 3} fill={C.text3} fontSize="7" textAnchor="end">{v}%</text>
                </g>
              );
            })}

            {/* X axis labels */}
            {X_LABELS.map((label, i) => {
              const x = PAD_L + (i / (X_LABELS.length - 1)) * CW;
              return (
                <text key={label} x={x} y={H - 4} fill={C.text3} fontSize="7" textAnchor="middle">{label}</text>
              );
            })}

            {/* Shock event vertical line */}
            <line
              x1={SHOCK_X} y1={PAD_T} x2={SHOCK_X} y2={PAD_T + CH}
              stroke={C.negative}
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            <text x={SHOCK_X + 3} y={PAD_T + 10} fill={C.negative} fontSize="6.5" opacity="0.8">
              SHOCK
            </text>

            {/* Team area fills + lines */}
            {teams.map(t => {
              const pts = shockActive ? t.points : t.points.map(() => t.points[0]);
              const polyPoints = toPoints(pts);
              // Build closed polygon for fill
              const firstX = PAD_L;
              const lastX = PAD_L + CW;
              const baseY = PAD_T + CH;
              const areaPoints = `${firstX},${baseY} ${polyPoints} ${lastX},${baseY}`;
              return (
                <g key={t.name}>
                  <polygon
                    points={areaPoints}
                    fill={`url(#grad-${t.name.replace(' ', '')})`}
                    opacity="0.7"
                  />
                  <polyline
                    points={polyPoints}
                    fill="none"
                    stroke={t.color}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* End dot */}
                  {(() => {
                    const lastPt = pts[pts.length - 1];
                    const dotX = PAD_L + CW;
                    const dotY = PAD_T + CH - (Math.max(0, Math.min(100, lastPt)) / 100) * CH;
                    return (
                      <circle cx={dotX} cy={dotY} r="3" fill={t.color} stroke={C.card} strokeWidth="1.5" />
                    );
                  })()}
                </g>
              );
            })}
          </svg>
        </Box>
      </CardContent>
    </Card>
  );
}
