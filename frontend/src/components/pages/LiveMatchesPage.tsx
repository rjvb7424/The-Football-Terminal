import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';
import { MATCHES, type Match } from '../../data/mockMatches';
import PageHeader from '../shared/PageHeader';

function MatchCard({ match, selected, onClick }: { match: Match; selected: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        p: 3,
        border: `1px solid ${selected ? 'rgba(0,180,216,0.34)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '9px',
        bgcolor: selected ? 'rgba(0,180,216,0.055)' : C.surface,
        textAlign: 'left',
        cursor: 'pointer',
        '&:hover': { borderColor: selected ? 'rgba(0,180,216,0.42)' : 'rgba(255,255,255,0.12)' },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: '0.68rem', color: C.text3, fontFamily: 'monospace' }}>{match.competition}</Typography>
        <Typography sx={{ fontSize: '0.68rem', color: match.status === 'live' ? C.positive : C.text3, fontFamily: 'monospace' }}>
          {match.status === 'live' ? `${match.minute}'` : 'UPCOMING'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: 2.5 }}>
        <Typography sx={{ fontSize: '1rem', color: C.text1, fontWeight: 780 }}>{match.homeTeam}</Typography>
        <Typography sx={{ fontSize: '1.35rem', color: C.text1, fontFamily: 'monospace', fontWeight: 850 }}>{match.score}</Typography>
        <Typography sx={{ fontSize: '1rem', color: C.text1, fontWeight: 780, textAlign: 'right' }}>{match.awayTeam}</Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5, mb: 2 }}>
        {[
          [match.homeTeam, match.homeWin, C.accent],
          ['Draw', match.draw, C.text2],
          [match.awayTeam, match.awayWin, C.text2],
        ].map(([label, value, color]) => (
          <Box key={String(label)}>
            <Typography sx={{ fontSize: '0.62rem', color: C.text3, mb: 0.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</Typography>
            <Typography sx={{ fontSize: '1.15rem', color, fontFamily: 'monospace', fontWeight: 850 }}>{value}%</Typography>
          </Box>
        ))}
      </Box>
      <Typography sx={{ fontSize: '0.78rem', color: C.text2, lineHeight: 1.5 }}>
        {match.biggestEvent ?? 'No major trigger yet'}
      </Typography>
    </Box>
  );
}

function Timeline({ match }: { match: Match }) {
  return (
    <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '9px', p: 3 }}>
      <Typography sx={{ fontSize: '0.72rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', mb: 2.5 }}>
        TIMELINE
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {match.events.filter(event => event.type !== 'kickoff').map((event, index) => {
          const color = event.impact > 0 ? C.positive : event.impact < 0 ? C.negative : C.text3;
          const sign = event.impact > 0 ? '+' : '';
          return (
            <Box key={`${event.minute}-${index}`} sx={{ display: 'grid', gridTemplateColumns: '42px 1fr auto', gap: 1.5, alignItems: 'start' }}>
              <Typography sx={{ fontSize: '0.72rem', color: C.text3, fontFamily: 'monospace' }}>{event.minute}'</Typography>
              <Box>
                <Typography sx={{ fontSize: '0.86rem', color: C.text1, fontWeight: 720 }}>{event.description}</Typography>
                {event.player && <Typography sx={{ fontSize: '0.7rem', color: C.text3, mt: 0.25 }}>{event.player} · {event.team}</Typography>}
              </Box>
              {event.impact !== 0 && (
                <Typography sx={{ fontSize: '0.78rem', color, fontFamily: 'monospace', fontWeight: 850 }}>{sign}{event.impact}pp</Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function LiveMatchesPage() {
  const [selectedId, setSelectedId] = useState(MATCHES[0].id);
  const selected = MATCHES.find(match => match.id === selectedId) ?? MATCHES[0];

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader title="Live Matches" subtitle="Current probabilities and the single trigger moving each match." />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' }, gap: 3 }}>
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          {MATCHES.map(match => (
            <MatchCard key={match.id} match={match} selected={selected.id === match.id} onClick={() => setSelectedId(match.id)} />
          ))}
        </Box>
        <Timeline match={selected} />
      </Box>
    </Box>
  );
}
