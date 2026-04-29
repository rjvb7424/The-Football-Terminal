import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../colors';

interface Props {
  onEnterDashboard: () => void;
}

function TerminalPreview() {
  const signals = [
    { label: 'REAL MADRID', val: '−38pp', color: C.negative },
    { label: 'BARCELONA', val: '+27pp', color: C.positive },
    { label: 'ATLETICO', val: '+11pp', color: C.positive },
  ];

  const ticker = [
    { team: 'LIV', val: '+12', color: C.positive },
    { team: 'MCI', val: '−8', color: C.negative },
    { team: 'ATM', val: '+5', color: C.positive },
    { team: 'PSG', val: '−14', color: C.negative },
    { team: 'BAR', val: '+27', color: C.positive },
  ];

  return (
    <Box
      sx={{
        width: 400,
        maxWidth: '100%',
        border: `1px solid rgba(0,180,216,0.2)`,
        borderRadius: '8px',
        overflow: 'hidden',
        bgcolor: C.surface,
        boxShadow: `0 0 60px rgba(0,0,0,0.7), 0 0 1px rgba(0,180,216,0.15), inset 0 1px 0 rgba(255,255,255,0.03)`,
        fontFamily: 'monospace',
        flexShrink: 0,
      }}
    >
      {/* Panel header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.25,
          borderBottom: `1px solid ${C.border}`,
          bgcolor: C.card,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span className="live-dot" />
          <Typography sx={{ fontSize: '0.62rem', color: C.accent, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em' }}>
            SITUATION SHIFT
          </Typography>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>
            // FEATURED
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              px: 1, py: 0.2,
              bgcolor: C.negativeDim,
              border: `1px solid rgba(248,81,73,0.3)`,
              borderRadius: '3px',
              fontSize: '0.58rem',
              color: C.negative,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            IMPACT −38
          </Box>
        </Box>
      </Box>

      {/* Signal info */}
      <Box sx={{ px: 2, pt: 1.75, pb: 1 }}>
        <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', mb: 0.5, letterSpacing: '0.06em' }}>
          [INJURY] · MBAPPÉ TRAINING ABSENCE
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: C.text1, fontFamily: 'monospace', fontWeight: 600, mb: 0.5, lineHeight: 1.35 }}>
          Absent from training 2nd consecutive day.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>RMC Sport</Typography>
          <Box sx={{ width: 1, height: 10, bgcolor: C.border }} />
          <Typography sx={{ fontSize: '0.58rem', color: C.accent, fontFamily: 'monospace' }}>84% confidence</Typography>
          <Box sx={{ width: 1, height: 10, bgcolor: C.border }} />
          <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>14 min ago</Typography>
        </Box>

        {/* Probability shift tiles */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 1.5 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: '6px',
            }}
          >
            <Typography sx={{ fontSize: '0.52rem', color: C.text3, fontFamily: 'monospace', mb: 0.5, letterSpacing: '0.05em' }}>
              REAL MADRID — BEFORE
            </Typography>
            <Typography sx={{ fontSize: '1.7rem', fontFamily: 'monospace', fontWeight: 700, color: C.text1, lineHeight: 1 }}>
              80%
            </Typography>
            <Typography sx={{ fontSize: '0.52rem', color: C.text3, fontFamily: 'monospace', mt: 0.25 }}>
              La Liga title prob.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.5,
              bgcolor: 'rgba(248,81,73,0.05)',
              border: `1px solid rgba(248,81,73,0.25)`,
              borderRadius: '6px',
            }}
          >
            <Typography sx={{ fontSize: '0.52rem', color: C.negative, fontFamily: 'monospace', mb: 0.5, letterSpacing: '0.05em' }}>
              REAL MADRID — AFTER
            </Typography>
            <Typography sx={{ fontSize: '1.7rem', fontFamily: 'monospace', fontWeight: 700, color: C.negative, lineHeight: 1 }}>
              42%
            </Typography>
            <Typography sx={{ fontSize: '0.6rem', color: C.negative, fontFamily: 'monospace', mt: 0.25, fontWeight: 700 }}>
              ▼ −38pp
            </Typography>
          </Box>
        </Box>

        {/* Rival impact */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 1.5 }}>
          {signals.map(s => (
            <Box
              key={s.label}
              sx={{
                px: 1.5, py: 0.75,
                bgcolor: s.color === C.negative ? 'rgba(248,81,73,0.05)' : 'rgba(63,185,80,0.05)',
                border: `1px solid ${s.color === C.negative ? 'rgba(248,81,73,0.2)' : 'rgba(63,185,80,0.2)'}`,
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontSize: '0.6rem', color: C.text2, fontFamily: 'monospace' }}>{s.label}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: s.color, fontFamily: 'monospace', fontWeight: 700 }}>{s.val}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Mini ticker strip */}
      <Box
        sx={{
          borderTop: `1px solid ${C.border}`,
          px: 2, py: 0.75,
          bgcolor: C.card,
          display: 'flex',
          gap: 2.5,
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Typography sx={{ fontSize: '0.52rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', flexShrink: 0 }}>
          LIVE
        </Typography>
        {ticker.map(item => (
          <Box key={item.team} sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexShrink: 0 }}>
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>{item.team}</Typography>
            <Typography sx={{ fontSize: '0.6rem', color: item.color, fontFamily: 'monospace', fontWeight: 700 }}>{item.val}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ValueCard({ icon, title, body, color }: { icon: string; title: string; body: string; color: string }) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 2.5,
        border: `1px solid ${C.border}`,
        borderRadius: '8px',
        bgcolor: C.surface,
        transition: 'border-color 0.2s ease, background-color 0.2s ease',
        '&:hover': { borderColor: C.borderLight, bgcolor: C.card },
      }}
    >
      <Typography sx={{ fontSize: '1rem', color, mb: 1 }}>{icon}</Typography>
      <Typography sx={{ fontSize: '0.78rem', color: C.text1, fontWeight: 700, mb: 0.75, fontFamily: 'monospace', letterSpacing: '0.03em' }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '0.78rem', color: C.text2, lineHeight: 1.65 }}>
        {body}
      </Typography>
    </Box>
  );
}

export default function LandingPage({ onEnterDashboard }: Props) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        bgcolor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `
          linear-gradient(rgba(0,180,216,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,180,216,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 6 },
          py: 1.75,
          borderBottom: `1px solid ${C.border}`,
          bgcolor: 'rgba(8,11,15,0.92)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: C.accent,
              boxShadow: `0 0 10px ${C.accent}`,
              animation: 'pulse-live 2s ease-in-out infinite',
            }}
          />
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontWeight: 800,
              fontSize: '0.82rem',
              letterSpacing: '0.14em',
              color: C.text1,
              textTransform: 'uppercase',
            }}
          >
            The Football Terminal
          </Typography>

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 0.75,
              ml: 2,
              px: 1.25,
              py: 0.3,
              border: `1px solid ${C.border}`,
              borderRadius: '4px',
            }}
          >
            <span className="live-dot" />
            <Typography sx={{ fontSize: '0.58rem', color: C.text2, fontFamily: 'monospace', letterSpacing: '0.08em' }}>
              LIVE INTELLIGENCE
            </Typography>
          </Box>
        </Box>

        <Box
          component="button"
          onClick={onEnterDashboard}
          sx={{
            cursor: 'pointer',
            border: `1px solid ${C.accent}`,
            borderRadius: '4px',
            px: 2.25,
            py: 0.7,
            bgcolor: 'transparent',
            color: C.accent,
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: C.accentDim,
              boxShadow: `0 0 14px ${C.accentGlow}`,
            },
          }}
        >
          Open Terminal
        </Box>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 3, md: 8, lg: 12 },
          py: { xs: 5, md: 7 },
          gap: { xs: 5, lg: 10 },
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {/* Left: text + CTAs + value cards */}
        <Box sx={{ flex: 1, maxWidth: { lg: 520 } }}>
          {/* Status badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.5,
              mb: 3,
              border: `1px solid rgba(0,180,216,0.25)`,
              borderRadius: '4px',
              bgcolor: C.accentDim,
            }}
          >
            <span className="live-dot" />
            <Typography sx={{ fontSize: '0.62rem', color: C.accent, fontFamily: 'monospace', letterSpacing: '0.1em', fontWeight: 700 }}>
              REAL-TIME FOOTBALL INTELLIGENCE
            </Typography>
          </Box>

          {/* Headline */}
          <Typography
            sx={{
              fontSize: { xs: '1.75rem', md: '2.2rem', lg: '2.55rem' },
              fontWeight: 800,
              lineHeight: 1.15,
              color: C.text1,
              mb: 2.5,
              letterSpacing: '-0.02em',
            }}
          >
            Monitor the football world{' '}
            <Box component="span" sx={{ color: C.accent }}>
              before the narrative catches up.
            </Box>
          </Typography>

          {/* Subheading */}
          <Typography
            sx={{
              fontSize: '0.95rem',
              color: C.text2,
              lineHeight: 1.75,
              mb: 4,
              maxWidth: 460,
            }}
          >
            Track injuries, lineup leaks, red cards, transfers, and title-race shocks as they shift football probabilities in real time.
          </Typography>

          {/* CTAs */}
          <Box sx={{ display: 'flex', gap: 1.75, flexWrap: 'wrap', mb: 5 }}>
            <Box
              component="button"
              onClick={onEnterDashboard}
              sx={{
                cursor: 'pointer',
                px: 3,
                py: 1.2,
                bgcolor: C.accent,
                color: C.bg,
                border: 'none',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: C.accentBright,
                  boxShadow: `0 0 24px ${C.accentGlow}`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              ▶&nbsp;&nbsp;Open the Terminal
            </Box>
            <Box
              component="button"
              onClick={onEnterDashboard}
              sx={{
                cursor: 'pointer',
                px: 3,
                py: 1.2,
                bgcolor: 'transparent',
                color: C.text2,
                border: `1px solid ${C.border}`,
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: C.text3, color: C.text1 },
              }}
            >
              View Live Signals →
            </Box>
          </Box>

          {/* Value cards */}
          <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
            <ValueCard icon="◉" title="Detect the signal" body="Injuries, absences, and lineup leaks surface before kickoff." color={C.accent} />
            <ValueCard icon="▲" title="Measure the shift" body="See how each event moves title, match, and transfer probabilities." color={C.positive} />
            <ValueCard icon="◈" title="See the story early" body="Understand the narrative before pundits and media catch on." color={C.amber} />
          </Box>
        </Box>

        {/* Right: terminal preview */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignSelf: { lg: 'center' },
            width: { xs: '100%', lg: 'auto' },
          }}
        >
          <TerminalPreview />
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          px: { xs: 3, md: 8, lg: 12 },
          py: 2,
          borderTop: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em' }}>
          THE FOOTBALL TERMINAL · SIGNAL INTELLIGENCE PLATFORM
        </Typography>
        <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace' }}>
          Mock data · For demonstration only
        </Typography>
      </Box>
    </Box>
  );
}
