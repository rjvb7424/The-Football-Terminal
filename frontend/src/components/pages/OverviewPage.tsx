import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { C, impactColor } from '../../colors';
import { GAINERS, LOSERS, SIGNALS } from '../../data/mockSignals';
import PageHeader from '../shared/PageHeader';
import FeatureCard from '../shared/FeatureCard';

interface Props {
  shockActive: boolean;
}

function TypeLabel({ children }: { children: string }) {
  return (
    <Typography sx={{ fontSize: '0.64rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {children}
    </Typography>
  );
}

function FeaturedShift({ shockActive }: Props) {
  const sig = SIGNALS[0];
  const after = shockActive ? sig.after : sig.before;
  const impact = shockActive ? sig.impact : 0;
  const color = impact < 0 ? C.negative : impact > 0 ? C.positive : C.text3;
  const sign = impact > 0 ? '+' : '';

  return (
    <FeatureCard accent>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr auto' }, gap: { xs: 4, lg: 6 }, alignItems: 'end' }}>
        <Box>
          <TypeLabel>{sig.eventType}</TypeLabel>
          <Typography sx={{ mt: 1.2, fontSize: { xs: '1.7rem', md: '2.25rem' }, fontWeight: 850, color: C.text1, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            {sig.title}
          </Typography>
          <Typography sx={{ mt: 1.5, fontSize: '0.94rem', color: C.text2, lineHeight: 1.75, maxWidth: 620 }}>
            {sig.explanation}
          </Typography>
        </Box>

        <Box sx={{ minWidth: { lg: 330 } }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.4, mb: 1.5 }}>
            <Typography sx={{ fontSize: { xs: '2.4rem', md: '3.4rem' }, fontFamily: 'monospace', fontWeight: 850, color: C.text1, lineHeight: 1 }}>
              {sig.before}%
            </Typography>
            <Typography sx={{ fontSize: '1.35rem', color: C.text3 }}>→</Typography>
            <Typography sx={{ fontSize: { xs: '2.4rem', md: '3.4rem' }, fontFamily: 'monospace', fontWeight: 850, color, lineHeight: 1 }}>
              {after}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={after}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.08)',
              '& .MuiLinearProgress-bar': { bgcolor: color },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.25 }}>
            <Typography sx={{ fontSize: '0.72rem', color, fontFamily: 'monospace', fontWeight: 800 }}>
              {sign}{impact}pp impact
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: C.text3, fontFamily: 'monospace' }}>
              {sig.confidence}% confidence · {sig.minutesAgo}m ago
            </Typography>
          </Box>
        </Box>
      </Box>
    </FeatureCard>
  );
}

function TopSignals() {
  return (
    <FeatureCard title="Top Signals" noPadding>
      {SIGNALS.slice(0, 5).map(sig => {
        const color = impactColor(sig.impact);
        const sign = sig.impact > 0 ? '+' : '';
        return (
          <Box key={sig.id} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr auto', md: '1fr 110px 70px 54px' }, gap: 1.5, alignItems: 'center', px: 2.5, py: 1.55, borderTop: `1px solid rgba(255,255,255,0.055)` }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.84rem', color: C.text1, fontWeight: 720, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {sig.title}
              </Typography>
              <Typography sx={{ fontSize: '0.68rem', color: C.text3, mt: 0.2 }}>{sig.club}</Typography>
            </Box>
            <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.68rem', color: C.text3, fontFamily: 'monospace', textTransform: 'uppercase' }}>
              {sig.eventType}
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color, fontFamily: 'monospace', fontWeight: 850, textAlign: 'right' }}>
              {sign}{sig.impact}pp
            </Typography>
            <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.68rem', color: C.text3, fontFamily: 'monospace', textAlign: 'right' }}>
              {sig.minutesAgo}m
            </Typography>
          </Box>
        );
      })}
    </FeatureCard>
  );
}

function MoversColumn({ title, items, positive }: { title: string; items: typeof GAINERS; positive: boolean }) {
  const color = positive ? C.positive : C.negative;
  return (
    <Box>
      <Typography sx={{ fontSize: '0.64rem', color, fontFamily: 'monospace', letterSpacing: '0.08em', mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {items.slice(0, 3).map(item => (
          <Box key={item.name} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.82rem', color: C.text1, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.club ?? item.name}
              </Typography>
              <Typography sx={{ fontSize: '0.68rem', color: C.text3 }}>{item.category}</Typography>
            </Box>
            <Typography sx={{ fontSize: '0.86rem', color, fontFamily: 'monospace', fontWeight: 850, flexShrink: 0 }}>
              {positive ? '+' : ''}{item.change}pp
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function BiggestMovers() {
  return (
    <FeatureCard title="Biggest Movers">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <MoversColumn title="GAINERS" items={GAINERS} positive />
        <MoversColumn title="LOSERS" items={LOSERS} positive={false} />
      </Box>
    </FeatureCard>
  );
}

export default function OverviewPage({ shockActive }: Props) {
  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader title="Overview" subtitle="Monitor the football world before the narrative catches up." />
      <Box sx={{ display: 'grid', gap: 3.5 }}>
        <FeaturedShift shockActive={shockActive} />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1.15fr 0.85fr' }, gap: 3.5 }}>
          <TopSignals />
          <BiggestMovers />
        </Box>
      </Box>
    </Box>
  );
}
