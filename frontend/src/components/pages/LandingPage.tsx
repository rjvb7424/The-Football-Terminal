import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';

interface Props {
  onEnterDashboard: () => void;
}

function PreviewCard() {
  return (
    <Box
      sx={{
        width: 380,
        maxWidth: '100%',
        bgcolor: 'rgba(13,17,23,0.82)',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: '10px',
        p: 3,
        boxShadow: '0 30px 90px rgba(0,0,0,0.34)',
      }}
    >
      <Typography sx={{ fontSize: '0.68rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', mb: 2 }}>
        FEATURED SHIFT
      </Typography>
      <Typography sx={{ fontSize: '1.05rem', color: C.text1, fontWeight: 750, mb: 2.5 }}>
        Mbappé training absence
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.25, mb: 2 }}>
        <Typography sx={{ fontSize: '1.9rem', color: C.text1, fontFamily: 'monospace', fontWeight: 800, lineHeight: 1 }}>
          80%
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: C.text3 }}>→</Typography>
        <Typography sx={{ fontSize: '1.9rem', color: C.negative, fontFamily: 'monospace', fontWeight: 800, lineHeight: 1 }}>
          42%
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '0.78rem', color: C.text2, lineHeight: 1.7, mb: 2.5 }}>
        Real Madrid title probability recalculated after a second consecutive missed final session.
      </Typography>
      <Typography sx={{ fontSize: '0.66rem', color: C.text3, fontFamily: 'monospace' }}>
        Detected 2 min ago
      </Typography>
    </Box>
  );
}

export default function LandingPage({ onEnterDashboard }: Props) {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        overflow: 'auto',
        bgcolor: C.bg,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ px: { xs: 3, md: 6 }, py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontFamily: 'monospace', fontWeight: 850, fontSize: '0.78rem', letterSpacing: '0.12em', color: C.text1, textTransform: 'uppercase' }}>
          The Football Terminal
        </Typography>
        <Box
          component="button"
          onClick={onEnterDashboard}
          sx={{
            px: 2,
            py: 0.85,
            border: 0,
            borderRadius: '7px',
            bgcolor: C.accent,
            color: '#001014',
            fontSize: '0.72rem',
            fontFamily: 'monospace',
            fontWeight: 850,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            '&:hover': { bgcolor: C.accentBright },
          }}
        >
          Open the Terminal
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.08fr 0.92fr' },
          alignItems: 'center',
          gap: { xs: 6, lg: 9 },
          px: { xs: 3, md: 8, lg: 12 },
          py: { xs: 7, md: 10 },
        }}
      >
        <Box sx={{ maxWidth: 650 }}>
          <Typography sx={{ fontSize: '0.72rem', color: C.accent, fontFamily: 'monospace', letterSpacing: '0.1em', mb: 3, fontWeight: 800 }}>
            LIVE FOOTBALL INTELLIGENCE
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.45rem', md: '4.2rem', lg: '4.85rem' },
              color: C.text1,
              fontWeight: 850,
              lineHeight: 0.98,
              letterSpacing: '-0.045em',
              mb: 3,
            }}
          >
            Monitor the football world before the narrative catches up.
          </Typography>
          <Typography sx={{ fontSize: { xs: '0.98rem', md: '1.08rem' }, color: C.text2, lineHeight: 1.75, maxWidth: 520, mb: 4.5 }}>
            A live football intelligence system for injuries, lineup leaks, transfers, and probability shifts.
          </Typography>
          <Box
            component="button"
            onClick={onEnterDashboard}
            sx={{
              px: 3,
              py: 1.2,
              border: 0,
              borderRadius: '7px',
              bgcolor: C.accent,
              color: '#001014',
              fontSize: '0.78rem',
              fontFamily: 'monospace',
              fontWeight: 850,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              '&:hover': { bgcolor: C.accentBright },
            }}
          >
            Open the Terminal
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', lg: 'center' } }}>
          <PreviewCard />
        </Box>
      </Box>
    </Box>
  );
}
