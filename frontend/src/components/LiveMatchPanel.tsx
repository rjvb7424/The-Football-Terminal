import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import SportsSoccer from '@mui/icons-material/SportsSoccer';
import { C } from '../colors';
import { LIVE_MATCH } from '../data/mockSignals';

const EVENT_ICONS: Record<string, string> = {
  kickoff: '🔔',
  lineup_confirmed: '📋',
  goal: '⚽',
  yellow_card: '🟡',
  red_card: '🔴',
  now: '📍',
};

export default function LiveMatchPanel() {
  const match = LIVE_MATCH;
  const totalW = match.homeWin + match.draw + match.awayWin;

  return (
    <Card className="panel-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <SportsSoccer sx={{ fontSize: 14, color: C.accent }} />
            <Typography variant="h6" sx={{ color: C.text2 }}>Live Match</Typography>
            <span className="live-dot" />
          </Stack>
          <Chip
            size="small"
            label={`${match.minute}'`}
            sx={{ bgcolor: 'rgba(63,185,80,0.12)', color: C.positive, fontSize: '0.62rem', height: 18, fontWeight: 700, fontFamily: 'monospace' }}
          />
        </Stack>

        {/* Teams + score */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.25}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: C.text1 }}>
            {match.homeTeam}
          </Typography>
          <Box
            sx={{
              bgcolor: C.card,
              border: `1px solid ${C.borderLight}`,
              borderRadius: '6px',
              px: 1.25,
              py: 0.3,
            }}
          >
            <Typography className="mono" sx={{ fontSize: '0.9rem', fontWeight: 800, color: C.text1, letterSpacing: '0.08em' }}>
              {match.score}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: C.text1 }}>
            {match.awayTeam}
          </Typography>
        </Stack>

        {/* Win/Draw/Loss probabilities */}
        <Box mb={1.5}>
          <Stack direction="row" justifyContent="space-between" mb={0.4}>
            <Typography className="mono" sx={{ fontSize: '0.7rem', fontWeight: 700, color: C.positive }}>
              {match.homeWin}%
            </Typography>
            <Typography className="mono" sx={{ fontSize: '0.7rem', fontWeight: 700, color: C.text2 }}>
              D {match.draw}%
            </Typography>
            <Typography className="mono" sx={{ fontSize: '0.7rem', fontWeight: 700, color: C.negative }}>
              {match.awayWin}%
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', gap: '1px' }}>
            <Box sx={{ width: `${(match.homeWin / totalW) * 100}%`, bgcolor: C.positive, transition: 'width 0.4s' }} />
            <Box sx={{ width: `${(match.draw / totalW) * 100}%`, bgcolor: C.text3, transition: 'width 0.4s' }} />
            <Box sx={{ width: `${(match.awayWin / totalW) * 100}%`, bgcolor: C.negative, transition: 'width 0.4s' }} />
          </Box>
          <Stack direction="row" justifyContent="space-between" mt={0.3}>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3 }}>Pre: {match.preHomeWin}%</Typography>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3 }}>Pre: {match.preDraw}%</Typography>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3 }}>Pre: {match.preAwayWin}%</Typography>
          </Stack>
        </Box>

        {/* Timeline */}
        <Typography sx={{ fontSize: '0.6rem', color: C.text3, letterSpacing: '0.06em', mb: 0.5 }}>
          MATCH TIMELINE
        </Typography>
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {match.events.map((evt, i) => (
            <Stack key={i} direction="row" alignItems="center" gap={0.75} py={0.35}>
              <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace', minWidth: 22, textAlign: 'right' }}>
                {evt.minute}'
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', lineHeight: 1 }}>{EVENT_ICONS[evt.type] ?? '·'}</Typography>
              <Typography sx={{ fontSize: '0.65rem', color: C.text2 }}>
                {evt.type.replace('_', ' ')}
                {evt.team ? ` · ${evt.team}` : ''}
              </Typography>
              {evt.impact !== 0 && (
                <Typography
                  className="mono"
                  sx={{ fontSize: '0.62rem', fontWeight: 700, color: evt.impact > 0 ? C.positive : C.negative, ml: 'auto' }}
                >
                  {evt.impact > 0 ? '+' : ''}{evt.impact}
                </Typography>
              )}
            </Stack>
          ))}
        </Box>

        {/* Competition */}
        <Typography sx={{ fontSize: '0.6rem', color: C.text3, mt: 0.5 }}>
          {match.competition} · Live probability tracking
        </Typography>
      </CardContent>
    </Card>
  );
}
