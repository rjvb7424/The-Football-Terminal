import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { C } from '../../colors';
import { TITLE_RACES } from '../../data/mockTitleRaces';
import PageHeader from '../shared/PageHeader';
import FeatureCard from '../shared/FeatureCard';

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        px: 1.5, py: 0.5,
        border: `1px solid ${active ? C.accent : C.border}`,
        borderRadius: '5px',
        bgcolor: active ? C.accentDim : 'transparent',
        color: active ? C.accent : C.text2,
        fontFamily: 'monospace',
        fontSize: '0.68rem',
        fontWeight: active ? 700 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        flexShrink: 0,
        '&:hover': { borderColor: active ? C.accent : C.borderLight },
      }}
    >
      {label}
    </Box>
  );
}

function FormBadge({ result }: { result: 'W' | 'D' | 'L' }) {
  const colors = { W: C.positive, D: C.amber, L: C.negative };
  return (
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: '3px',
        bgcolor: result === 'W' ? 'rgba(63,185,80,0.15)' : result === 'D' ? 'rgba(210,153,34,0.15)' : 'rgba(248,81,73,0.15)',
        border: `1px solid ${result === 'W' ? 'rgba(63,185,80,0.3)' : result === 'D' ? 'rgba(210,153,34,0.3)' : 'rgba(248,81,73,0.3)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography sx={{ fontSize: '0.5rem', fontFamily: 'monospace', fontWeight: 800, color: colors[result] }}>{result}</Typography>
    </Box>
  );
}

export default function TitleRacesPage() {
  const [activeLeague, setActiveLeague] = useState(TITLE_RACES[0].id);
  const race = TITLE_RACES.find(r => r.id === activeLeague) ?? TITLE_RACES[0];

  const maxProb = Math.max(...race.teams.map(t => t.probability));

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
      <PageHeader
        title="Title Races"
        subtitle="Who is gaining or losing the race? Probability shifts across competitions."
      />

      {/* League chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {TITLE_RACES.map(r => (
          <FilterChip key={r.id} label={r.league} active={activeLeague === r.id} onClick={() => setActiveLeague(r.id)} />
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 2 }}>
        {/* Probability table */}
        <FeatureCard
          title={`${race.league} — Title Probabilities`}
          titleRight={
            <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>{race.season}</Typography>
          }
          noPadding
        >
          {/* Table header */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderBottom: `1px solid ${C.border}`, bgcolor: C.card }}>
            <Typography sx={{ flex: 1, fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em' }}>CLUB</Typography>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', width: 60, textAlign: 'right' }}>PROB.</Typography>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', width: 50, textAlign: 'right' }}>SHIFT</Typography>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', width: 60, textAlign: 'right' }}>FORM</Typography>
          </Box>

          <Stack>
            {race.teams.map((team, idx) => {
              const changeColor = team.change > 0 ? C.positive : team.change < 0 ? C.negative : C.text3;
              const changeSign = team.change > 0 ? '+' : '';
              const barWidth = (team.probability / maxProb) * 100;

              return (
                <Box
                  key={team.club}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: `1px solid ${C.border}`,
                    '&:last-child': { borderBottom: 'none' },
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
                  }}
                >
                  {/* Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', width: 14 }}>{idx + 1}</Typography>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: C.text1 }}>{team.club}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 800, color: C.text1, width: 60, textAlign: 'right' }}>
                      {team.probability}%
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700, color: changeColor, width: 50, textAlign: 'right' }}>
                      {changeSign}{team.change}pp
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.35, width: 60, justifyContent: 'flex-end' }}>
                      {team.form.slice(-5).map((r, i) => <FormBadge key={i} result={r} />)}
                    </Box>
                  </Box>

                  {/* Probability bar */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 14, flexShrink: 0 }} />
                    <LinearProgress
                      variant="determinate"
                      value={barWidth}
                      sx={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        bgcolor: C.border,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: team.change > 5 ? C.positive : team.change < -5 ? C.negative : C.accent,
                          transition: 'width 0.6s ease',
                        },
                      }}
                    />
                  </Box>

                  {/* Trigger */}
                  <Box sx={{ ml: '22px', mt: 0.5 }}>
                    <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>{team.recentTrigger}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </FeatureCard>

        {/* Recent events timeline */}
        <FeatureCard
          title="Race Shaping Events"
          titleRight={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><span className="live-dot" style={{ width: 6, height: 6 }} /><Typography sx={{ fontSize: '0.6rem', color: C.positive, fontFamily: 'monospace' }}>LIVE</Typography></Box>}
          noPadding
        >
          <Stack>
            {race.recentEvents.map((evt, i) => (
              <Box
                key={i}
                sx={{
                  px: 2,
                  py: 1.75,
                  borderBottom: `1px solid ${C.border}`,
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: C.text1, flex: 1, pr: 1, lineHeight: 1.3 }}>
                    {evt.event}
                  </Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', flexShrink: 0 }}>{evt.time}</Typography>
                </Box>
                <Box sx={{ px: 1.25, py: 0.75, bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: '5px' }}>
                  <Typography sx={{ fontSize: '0.72rem', color: C.text2, fontFamily: 'monospace' }}>
                    {evt.impact}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          {/* League insight */}
          <Box sx={{ p: 2, borderTop: `1px solid ${C.border}`, bgcolor: C.card }}>
            <Typography sx={{ fontSize: '0.6rem', color: C.accent, fontFamily: 'monospace', mb: 0.5, letterSpacing: '0.06em' }}>TERMINAL INSIGHT</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: C.text2, lineHeight: 1.6 }}>
              The narrative hasn't caught up yet. The shift is already priced in here.
            </Typography>
          </Box>
        </FeatureCard>
      </Box>
    </Box>
  );
}
