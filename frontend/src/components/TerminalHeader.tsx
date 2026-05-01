import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../colors';

interface Props {
  signalCount: number;
}

export default function TerminalHeader({ signalCount }: Props) {
  return (
    <Box
      sx={{
        height: 44,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        px: 2.5,
        bgcolor: '#050d0a',
        borderBottom: `1px solid ${C.border}`,
        gap: 2,
      }}
    >
      {/* Brand */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: '4px',
            background: `linear-gradient(135deg, ${C.accent} 0%, rgba(46,230,200,0.2) 100%)`,
            border: `1px solid ${C.accent}44`,
          }}
        />
        <Typography sx={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.1em', color: C.text1, textTransform: 'uppercase' }}>
          The Football Terminal
        </Typography>
      </Box>

      {/* Divider */}
      <Box sx={{ width: 1, height: 16, bgcolor: C.border }} />

      {/* Slogan */}
      <Typography sx={{ fontSize: '0.63rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', display: { xs: 'none', md: 'block' } }}>
        Before the narrative catches up
      </Typography>

      <Box sx={{ flex: 1 }} />

      {/* Signal count */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: C.accent, boxShadow: `0 0 6px ${C.accent}` }} />
        <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace' }}>
          {signalCount.toLocaleString()} signals monitored
        </Typography>
      </Box>

      {/* Live badge */}
      <Box
        sx={{
          px: 1,
          py: 0.3,
          borderRadius: '4px',
          bgcolor: `${C.negative}18`,
          border: `1px solid ${C.negative}33`,
          display: 'flex',
          alignItems: 'center',
          gap: 0.6,
        }}
      >
        <Box
          sx={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            bgcolor: C.negative,
            animation: 'blinkDot 1.4s ease-in-out infinite',
            '@keyframes blinkDot': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.2 },
            },
          }}
        />
        <Typography sx={{ fontSize: '0.6rem', fontFamily: 'monospace', fontWeight: 700, color: C.negative, letterSpacing: '0.07em' }}>
          LIVE
        </Typography>
      </Box>
    </Box>
  );
}
