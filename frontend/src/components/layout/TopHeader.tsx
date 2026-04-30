import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Search from '@mui/icons-material/Search';
import { C } from '../../colors';

interface Props {
  shockActive: boolean;
  onSimulateShock: () => void;
  onBackHome?: () => void;
}

export default function TopHeader({ onBackHome }: Props) {
  return (
    <Box
      sx={{
        height: 58,
        bgcolor: 'rgba(8,11,15,0.86)',
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 3 },
        gap: 2,
        flexShrink: 0,
        zIndex: 10,
        backdropFilter: 'blur(14px)',
      }}
    >
      <Box
        onClick={onBackHome}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: { xs: 160, md: 260 },
          cursor: onBackHome ? 'pointer' : 'default',
          '&:hover': onBackHome ? { opacity: 0.76 } : {},
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.1em', color: C.text1, textTransform: 'uppercase', fontFamily: 'monospace' }}>
          The Football Terminal
        </Typography>
        <Typography sx={{ fontSize: '0.66rem', color: C.text3, display: { xs: 'none', md: 'block' } }}>
          Monitor the football world before the narrative catches up.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.65, flexShrink: 0 }}>
        <Box component="span" className="live-dot" />
        <Typography sx={{ fontSize: '0.65rem', color: C.text2, fontFamily: 'monospace', letterSpacing: '0.06em' }}>
          LIVE
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          width: { xs: 154, sm: 220, md: 280 },
          bgcolor: 'rgba(255,255,255,0.035)',
          border: `1px solid rgba(255,255,255,0.07)`,
          borderRadius: '7px',
          px: 1.25,
          py: 0.75,
        }}
      >
        <Search sx={{ fontSize: 15, color: C.text3 }} />
        <Typography sx={{ fontSize: '0.72rem', color: C.text3, whiteSpace: 'nowrap' }}>
          Search signals
        </Typography>
      </Box>
    </Box>
  );
}
