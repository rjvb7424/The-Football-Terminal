import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { C } from '../../colors';
import { MATCHES, type Match, type MatchEvent } from '../../data/mockMatches';
import PageHeader from '../shared/PageHeader';
import FeatureCard from '../shared/FeatureCard';
import StatusChip from '../shared/StatusChip';

function ProbBar({ value, color }: { value: number; color: string }) {
  return (
    <Box sx={{ position: 'relative', height: 6, bgcolor: C.border, borderRadius: 1, overflow: 'hidden', flex: 1 }}>
      <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${value}%`, bgcolor: color, borderRadius: 1, transition: 'width 0.4s ease' }} />
    </Box>
  );
}

function MatchCard({ match, selected, onClick }: { match: Match; selected: boolean; onClick: () => void }) {
  const isLive = match.status === 'live';

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        border: `1px solid ${selected ? C.accent : C.border}`,
        borderRadius: '8px',
        bgcolor: selected ? C.accentDim : C.surface,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        '&:hover': { borderColor: selected ? C.accent : C.borderLight, bgcolor: selected ? C.accentDim : C.card },
      }}
    >
      {/* Competition + status */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
        <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
          {match.competition}
        </Typography>
        {isLive ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <span className="live-dot" style={{ width: 6, height: 6 }} />
            <Typography sx={{ fontSize: '0.6rem', color: C.positive, fontFamily: 'monospace', fontWeight: 700 }}>{match.minute}'</Typography>
          </Box>
        ) : (
          <StatusChip variant="amber" label="UPCOMING" />
        )}
      </Box>

      {/* Teams + score */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: C.text1 }}>{match.homeTeam}</Typography>
        <Typography sx={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: 800, color: isLive ? C.text1 : C.text3, px: 1 }}>{match.score}</Typography>
        <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: C.text1 }}>{match.awayTeam}</Typography>
      </Box>

      {/* Win probabilities */}
      <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', mb: 0.75 }}>
        <Typography sx={{ fontSize: '0.62rem', fontFamily: 'monospace', color: C.accent, fontWeight: 700, minWidth: 32 }}>{match.homeWin}%</Typography>
        <ProbBar value={match.homeWin} color={C.accent} />
        <Typography sx={{ fontSize: '0.62rem', fontFamily: 'monospace', color: C.text3, minWidth: 28, textAlign: 'center' }}>{match.draw}%</Typography>
        <ProbBar value={match.awayWin} color={C.text3} />
        <Typography sx={{ fontSize: '0.62rem', fontFamily: 'monospace', color: C.text3, fontWeight: 700, minWidth: 32, textAlign: 'right' }}>{match.awayWin}%</Typography>
      </Box>

      {/* Biggest event */}
      {match.biggestEvent && (
        <Typography sx={{ fontSize: '0.62rem', color: C.text3, mt: 0.75 }}>
          ↑ {match.biggestEvent}
        </Typography>
      )}
    </Box>
  );
}

function EventIcon({ type }: { type: MatchEvent['type'] }) {
  const map: Record<string, { icon: string; color: string }> = {
    goal: { icon: '⚽', color: C.positive },
    red_card: { icon: '🟥', color: C.negative },
    yellow_card: { icon: '🟨', color: C.amber },
    substitution: { icon: '↔', color: C.text2 },
    tactical: { icon: '◈', color: C.accent },
    var: { icon: 'VAR', color: C.amber },
    penalty: { icon: '●', color: C.positive },
    kickoff: { icon: '▶', color: C.text3 },
  };
  const { icon, color } = map[type] ?? { icon: '·', color: C.text3 };
  return <Typography sx={{ fontSize: type === 'var' ? '0.52rem' : '0.75rem', color, flexShrink: 0, width: 20, textAlign: 'center' }}>{icon}</Typography>;
}

function MatchDetail({ match }: { match: Match }) {
  const preDelta = match.homeWin - match.preHomeWin;
  const sign = preDelta >= 0 ? '+' : '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Win probability summary */}
      <FeatureCard title="Win Probabilities">
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 2, alignItems: 'center' }}>
          {/* Home */}
          <Box>
            <Typography sx={{ fontSize: '0.7rem', color: C.text2, mb: 0.5 }}>{match.homeTeam}</Typography>
            <Typography sx={{ fontSize: '1.8rem', fontFamily: 'monospace', fontWeight: 800, color: C.accent, lineHeight: 1 }}>{match.homeWin}%</Typography>
            {preDelta !== 0 && (
              <Typography sx={{ fontSize: '0.65rem', color: preDelta > 0 ? C.positive : C.negative, fontFamily: 'monospace' }}>
                {sign}{preDelta}pp vs pre-match
              </Typography>
            )}
            <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>Pre: {match.preHomeWin}%</Typography>
          </Box>

          {/* Draw */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', mb: 0.5 }}>DRAW</Typography>
            <Typography sx={{ fontSize: '1.1rem', fontFamily: 'monospace', fontWeight: 700, color: C.text2 }}>{match.draw}%</Typography>
          </Box>

          {/* Away */}
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: '0.7rem', color: C.text2, mb: 0.5 }}>{match.awayTeam}</Typography>
            <Typography sx={{ fontSize: '1.8rem', fontFamily: 'monospace', fontWeight: 800, color: C.text3, lineHeight: 1 }}>{match.awayWin}%</Typography>
            <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>Pre: {match.preAwayWin}%</Typography>
          </Box>
        </Box>

        {match.xgHome !== undefined && (
          <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>xG</Typography>
              <Typography sx={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 700, color: C.accent }}>{match.xgHome}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>xG</Typography>
              <Typography sx={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 700, color: C.text3 }}>{match.xgAway}</Typography>
            </Box>
          </Box>
        )}
      </FeatureCard>

      {/* Event timeline */}
      {match.events.length > 0 && (
        <FeatureCard title="Event Timeline" noPadding>
          <Stack>
            {match.events.filter(e => e.type !== 'kickoff').map((evt, i) => {
              const impactColor = evt.impact > 0 ? C.positive : evt.impact < 0 ? C.negative : C.text3;
              const sign = evt.impact > 0 ? '+' : '';
              return (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    px: 2,
                    py: 1.25,
                    borderBottom: `1px solid ${C.border}`,
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <Typography sx={{ fontSize: '0.65rem', fontFamily: 'monospace', color: C.text3, flexShrink: 0, width: 24, pt: 0.1 }}>
                    {evt.minute}'
                  </Typography>
                  <EventIcon type={evt.type} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: C.text1, fontWeight: 600 }}>{evt.description}</Typography>
                    {evt.player && <Typography sx={{ fontSize: '0.62rem', color: C.text2, mt: 0.25 }}>{evt.player} · {evt.team}</Typography>}
                  </Box>
                  {evt.impact !== 0 && (
                    <Typography sx={{ fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700, color: impactColor, flexShrink: 0 }}>
                      {sign}{evt.impact}pp
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Stack>
        </FeatureCard>
      )}
    </Box>
  );
}

export default function LiveMatchesPage() {
  const [selectedId, setSelectedId] = useState(MATCHES[0].id);
  const selected = MATCHES.find(m => m.id === selectedId) ?? MATCHES[0];

  const live = MATCHES.filter(m => m.status === 'live');
  const upcoming = MATCHES.filter(m => m.status === 'upcoming');

  return (
    <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', p: 3 }}>
      <PageHeader
        title="Live Matches"
        subtitle="How is the match changing live? Probability shifts in real time."
      />

      <Box sx={{ display: 'flex', gap: 2, flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {/* Left: match list */}
        <Box sx={{ width: 300, flexShrink: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {live.length > 0 && (
            <>
              <Typography sx={{ fontSize: '0.6rem', color: C.positive, fontFamily: 'monospace', letterSpacing: '0.08em' }}>LIVE NOW</Typography>
              {live.map(m => (
                <MatchCard key={m.id} match={m} selected={selectedId === m.id} onClick={() => setSelectedId(m.id)} />
              ))}
            </>
          )}
          {upcoming.length > 0 && (
            <>
              <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', mt: 0.5 }}>UPCOMING</Typography>
              {upcoming.map(m => (
                <MatchCard key={m.id} match={m} selected={selectedId === m.id} onClick={() => setSelectedId(m.id)} />
              ))}
            </>
          )}
        </Box>

        {/* Right: detail */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Match header */}
          <Box sx={{ mb: 2, p: 2, bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', mb: 0.5 }}>{selected.competition}</Typography>
              <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: C.text1 }}>
                {selected.homeTeam} <Box component="span" sx={{ color: C.text3 }}>vs</Box> {selected.awayTeam}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '1.5rem', fontFamily: 'monospace', fontWeight: 800, color: C.text1 }}>{selected.score}</Typography>
              {selected.status === 'live' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                  <span className="live-dot" style={{ width: 6, height: 6 }} />
                  <Typography sx={{ fontSize: '0.65rem', color: C.positive, fontFamily: 'monospace' }}>{selected.minute}'</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <MatchDetail match={selected} />
        </Box>
      </Box>
    </Box>
  );
}
