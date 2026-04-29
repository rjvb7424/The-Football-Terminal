import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { C, impactColor } from '../../colors';
import { SIGNALS, GAINERS, LOSERS, CHART_TEAMS } from '../../data/mockSignals';
import PageHeader from '../shared/PageHeader';
import FeatureCard from '../shared/FeatureCard';
import StatusChip from '../shared/StatusChip';
import ProbabilityBar from '../shared/ProbabilityBar';
import SignalRow from '../shared/SignalRow';

interface Props {
  shockActive: boolean;
}

function FeaturedSituation({ shockActive }: { shockActive: boolean }) {
  const sig = SIGNALS[0];
  const after = shockActive ? sig.after : sig.before;
  const impact = shockActive ? sig.impact : 0;
  const sign = impact >= 0 ? '+' : '';

  return (
    <FeatureCard
      title="Featured Situation"
      accent
      titleRight={<StatusChip variant={sig.status} pulse />}
      noPadding
    >
      <Box sx={{ p: 2 }}>
        {/* Title row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', mb: 0.5, letterSpacing: '0.06em' }}>
              [{sig.eventType.toUpperCase()}] · {sig.club.toUpperCase()}
            </Typography>
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: C.text1, lineHeight: 1.25, mb: 0.5 }}>
              {sig.title}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: C.text2, lineHeight: 1.5 }}>
              {sig.subtitle}
            </Typography>
          </Box>
          {shockActive && (
            <Box sx={{ px: 1.25, py: 0.5, bgcolor: C.negativeDim, border: `1px solid rgba(248,81,73,0.3)`, borderRadius: '5px', textAlign: 'center', flexShrink: 0 }}>
              <Typography sx={{ fontSize: '1.1rem', fontFamily: 'monospace', fontWeight: 700, color: C.negative, lineHeight: 1 }}>
                {sign}{impact}
              </Typography>
              <Typography sx={{ fontSize: '0.52rem', color: C.negative, fontFamily: 'monospace' }}>IMPACT</Typography>
            </Box>
          )}
        </Box>

        {/* Probability shift */}
        <Box sx={{ mb: 2 }}>
          <ProbabilityBar
            label={`${sig.club} — ${sig.competition} title probability`}
            before={sig.before}
            after={after}
            color={impact < 0 ? C.negative : C.positive}
          />
        </Box>

        {/* Source + confidence */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1, p: 1.25, bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: '6px' }}>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', mb: 0.25 }}>CONFIDENCE</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '0.95rem', fontFamily: 'monospace', fontWeight: 700, color: C.text1 }}>{sig.confidence}%</Typography>
              <LinearProgress
                variant="determinate"
                value={sig.confidence}
                sx={{ flex: 1, height: 4, borderRadius: 2, bgcolor: C.border, '& .MuiLinearProgress-bar': { bgcolor: C.accent } }}
              />
            </Box>
          </Box>
          <Box sx={{ p: 1.25, bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: '6px', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', mb: 0.25 }}>AGO</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 700, color: C.text1 }}>{sig.minutesAgo}m</Typography>
          </Box>
        </Box>

        {/* Explanation */}
        <Box sx={{ p: 1.5, bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: '6px', mb: 2 }}>
          <Typography sx={{ fontSize: '0.72rem', color: C.text2, lineHeight: 1.6 }}>
            {sig.explanation}
          </Typography>
        </Box>

        {/* Rival impact */}
        <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', mb: 1, letterSpacing: '0.06em' }}>RIVAL IMPACT</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {sig.affectedTeams.map(t => {
            const tc = impactColor(t.impact);
            const ts = t.impact > 0 ? '+' : '';
            return (
              <Box key={t.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, py: 0.75, bgcolor: t.impact > 0 ? 'rgba(63,185,80,0.05)' : 'rgba(248,81,73,0.05)', border: `1px solid ${t.impact > 0 ? 'rgba(63,185,80,0.2)' : 'rgba(248,81,73,0.15)'}`, borderRadius: '5px' }}>
                <Typography sx={{ fontSize: '0.72rem', color: C.text2 }}>{t.name}</Typography>
                <Typography sx={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: tc }}>{ts}{t.impact}pp</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </FeatureCard>
  );
}

function TopSignalsCard() {
  const top = SIGNALS.slice(0, 5);
  return (
    <FeatureCard title="Top Signals" noPadding>
      <Box>
        {top.map(sig => (
          <SignalRow key={sig.id} signal={sig} />
        ))}
      </Box>
    </FeatureCard>
  );
}

function BiggestShiftsCard() {
  return (
    <FeatureCard title="Biggest Shifts Today">
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {/* Losers */}
        <Box>
          <Typography sx={{ fontSize: '0.6rem', color: C.negative, fontFamily: 'monospace', letterSpacing: '0.08em', mb: 1.25 }}>
            ▼ BIGGEST DROPS
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {LOSERS.slice(0, 4).map(item => (
              <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.7rem', color: C.text1, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.club ?? item.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>{item.category}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: C.negative }}>{item.change}pp</Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>{item.current}%</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Gainers */}
        <Box>
          <Typography sx={{ fontSize: '0.6rem', color: C.positive, fontFamily: 'monospace', letterSpacing: '0.08em', mb: 1.25 }}>
            ▲ BIGGEST GAINS
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {GAINERS.slice(0, 4).map(item => (
              <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.7rem', color: C.text1, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.club ?? item.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>{item.category}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: C.positive }}>+{item.change}pp</Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>{item.current}%</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </FeatureCard>
  );
}

function ProbabilityIndexCard({ shockActive }: { shockActive: boolean }) {
  const teams = shockActive ? CHART_TEAMS : CHART_TEAMS.map(t => ({ ...t, points: t.points.map((_, i) => (i < 17 ? t.points[i] : t.points[16])) }));

  return (
    <FeatureCard title="La Liga Title Race">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {teams.map(team => {
          const current = team.points[team.points.length - 1];
          const prev = team.points[16];
          const delta = current - prev;
          const sign = delta >= 0 ? '+' : '';
          const color = delta > 0 ? C.positive : delta < 0 ? C.negative : C.text3;

          return (
            <Box key={team.name}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.72rem', color: C.text1, fontWeight: 600 }}>{team.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {shockActive && delta !== 0 && (
                    <Typography sx={{ fontSize: '0.6rem', color, fontFamily: 'monospace' }}>{sign}{Math.round(delta)}pp</Typography>
                  )}
                  <Typography sx={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: team.color }}>{current}%</Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={current}
                sx={{ height: 5, borderRadius: 2, bgcolor: C.border, '& .MuiLinearProgress-bar': { bgcolor: team.color, transition: 'width 0.6s ease' } }}
              />
            </Box>
          );
        })}
      </Box>
    </FeatureCard>
  );
}

export default function OverviewPage({ shockActive }: Props) {
  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
      <PageHeader
        title="Overview"
        subtitle="Monitor the football world before the narrative catches up."
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '3fr 2fr' }, gap: 2, mb: 2 }}>
        <FeaturedSituation shockActive={shockActive} />
        <TopSignalsCard />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '3fr 2fr' }, gap: 2 }}>
        <BiggestShiftsCard />
        <ProbabilityIndexCard shockActive={shockActive} />
      </Box>
    </Box>
  );
}
