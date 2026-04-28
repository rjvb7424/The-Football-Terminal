import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import CrisisAlert from '@mui/icons-material/CrisisAlert';
import { C, impactColor } from '../colors';
import { SIGNALS } from '../data/mockSignals';
import type { Signal } from '../data/mockSignals';

interface Props {
  signalId: string;
  shockActive: boolean;
}

export default function FeaturedSituationPanel({ signalId, shockActive }: Props) {
  const signal = SIGNALS.find(s => s.id === signalId) ?? SIGNALS[0];
  const sign = signal.impact > 0 ? '+' : '';
  const color = impactColor(signal.impact);
  const isNeg = signal.impact < 0;

  // When shock is not active, show pre-shock values
  const displayBefore = shockActive ? signal.before : signal.after;
  const displayAfter = shockActive ? signal.after : signal.before;
  const displayImpact = shockActive ? signal.impact : Math.abs(signal.impact) * 0.1;

  return (
    <Card
      className={`panel-lift ${shockActive ? 'shock-flash' : ''}`}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: `1px solid ${color}30` }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <CrisisAlert sx={{ fontSize: 14, color }} />
            <Typography variant="h6" sx={{ color: C.text2 }}>Featured Situation</Typography>
            <span className={`live-dot ${isNeg ? 'live-dot-red' : ''}`} />
          </Stack>
          <Stack direction="row" gap={0.5}>
            <Chip
              size="small"
              label={signal.status.toUpperCase()}
              sx={{
                bgcolor: signal.status === 'live' ? 'rgba(63,185,80,0.12)' : signal.status === 'confirmed' ? 'rgba(0,180,216,0.12)' : C.amberDim,
                color: signal.status === 'live' ? C.positive : signal.status === 'confirmed' ? C.accent : C.amber,
                fontSize: '0.58rem',
                height: 18,
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            />
          </Stack>
        </Stack>

        {/* Title */}
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 800,
            color: C.text1,
            lineHeight: 1.2,
            mb: 0.25,
          }}
        >
          {signal.title}
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: C.text2, mb: 1.5 }}>
          {signal.subtitle}
        </Typography>

        {/* Before / After probability bars */}
        <Box mb={1.5}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.4}>
            <Typography sx={{ fontSize: '0.65rem', color: C.text3, letterSpacing: '0.04em' }}>
              BEFORE
            </Typography>
            <Typography className="mono" sx={{ fontSize: '0.75rem', color: C.text2, fontWeight: 700 }}>
              {displayBefore}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={displayBefore}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: C.border,
              '& .MuiLinearProgress-bar': { bgcolor: C.text2, borderRadius: 3 },
            }}
          />
        </Box>

        <Box mb={1.5}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.4}>
            <Typography sx={{ fontSize: '0.65rem', color: C.text3, letterSpacing: '0.04em' }}>
              AFTER SIGNAL
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.75}>
              <Typography
                className="mono"
                sx={{ fontSize: '0.82rem', color, fontWeight: 800 }}
              >
                {displayAfter}%
              </Typography>
              <Typography
                className="mono"
                sx={{
                  fontSize: '0.72rem',
                  color,
                  fontWeight: 700,
                  bgcolor: `${color}18`,
                  border: `1px solid ${color}35`,
                  borderRadius: '4px',
                  px: 0.5,
                  py: 0.1,
                }}
              >
                {sign}{signal.impact}
              </Typography>
            </Stack>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={displayAfter}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: C.border,
              '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3, boxShadow: `0 0 6px ${color}60` },
            }}
          />
        </Box>

        <Divider sx={{ mb: 1 }} />

        {/* Explanation */}
        <Typography sx={{ fontSize: '0.68rem', color: C.text2, lineHeight: 1.5, mb: 1 }}>
          {signal.explanation}
        </Typography>

        {/* Affected teams */}
        {signal.affectedTeams.length > 0 && (
          <Box mb={1}>
            <Typography sx={{ fontSize: '0.6rem', color: C.text3, letterSpacing: '0.06em', mb: 0.4 }}>
              RIVAL IMPACT
            </Typography>
            <Stack gap={0.3}>
              {signal.affectedTeams.map(team => {
                const tc = team.impact > 0 ? C.positive : C.negative;
                const ts = team.impact > 0 ? '+' : '';
                return (
                  <Stack key={team.name} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontSize: '0.68rem', color: C.text2 }}>{team.name}</Typography>
                    <Typography className="mono" sx={{ fontSize: '0.72rem', fontWeight: 700, color: tc }}>
                      {ts}{team.impact}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Footer */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt="auto" pt={0.5}>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3 }}>
            Confidence: <Box component="span" sx={{ color: C.text2, fontWeight: 600 }}>{signal.confidence}%</Box>
          </Typography>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3 }}>
            {signal.minutesAgo}m ago · {signal.competition}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
