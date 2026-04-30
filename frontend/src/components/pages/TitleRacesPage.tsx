import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { C } from '../../colors';
import { TITLE_RACES } from '../../data/mockTitleRaces';
import PageHeader from '../shared/PageHeader';

function LeagueButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        px: 1.4,
        py: 0.65,
        border: `1px solid ${active ? 'rgba(46,230,200,0.42)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '7px',
        bgcolor: active ? 'rgba(46,230,200,0.08)' : 'transparent',
        color: active ? C.accent : C.text2,
        fontSize: '0.72rem',
        cursor: 'pointer',
      }}
    >
      {label}
    </Box>
  );
}

export default function TitleRacesPage() {
  const [activeLeague, setActiveLeague] = useState(TITLE_RACES[0].id);
  const race = TITLE_RACES.find(item => item.id === activeLeague) ?? TITLE_RACES[0];

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader title="Title Races" subtitle="One league at a time. Current probability, recent movement, and the trigger." />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3.5 }}>
        {TITLE_RACES.map(item => (
          <LeagueButton key={item.id} label={item.league} active={item.id === activeLeague} onClick={() => setActiveLeague(item.id)} />
        ))}
      </Box>

      <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '9px', p: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 4 }}>
          <Box>
            <Typography sx={{ fontSize: '0.7rem', color: C.text3, fontFamily: 'monospace', mb: 0.5 }}>{race.season}</Typography>
            <Typography sx={{ fontSize: '1.45rem', color: C.text1, fontWeight: 830 }}>{race.league}</Typography>
          </Box>
          <Typography sx={{ fontSize: '0.76rem', color: C.text3, textAlign: 'right', maxWidth: 260 }}>
            {race.recentEvents[0]?.event}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: 2.6 }}>
          {race.teams.map(team => {
            const color = team.change > 0 ? C.positive : team.change < 0 ? C.negative : C.text3;
            const sign = team.change > 0 ? '+' : '';
            return (
              <Box key={team.club}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 2, alignItems: 'baseline', mb: 0.9 }}>
                  <Typography sx={{ fontSize: '0.95rem', color: C.text1, fontWeight: 760 }}>{team.club}</Typography>
                  <Typography sx={{ fontSize: '1.1rem', color: C.text1, fontFamily: 'monospace', fontWeight: 850 }}>{team.probability}%</Typography>
                  <Typography sx={{ fontSize: '0.82rem', color, fontFamily: 'monospace', fontWeight: 850 }}>{sign}{team.change}pp</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={team.probability}
                  sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.07)', '& .MuiLinearProgress-bar': { bgcolor: team.change < 0 ? C.negative : team.change > 0 ? C.positive : C.accent } }}
                />
                <Typography sx={{ mt: 0.75, fontSize: '0.74rem', color: C.text3 }}>
                  {team.recentTrigger}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
