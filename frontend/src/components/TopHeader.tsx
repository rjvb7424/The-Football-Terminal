import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Search from '@mui/icons-material/Search';
import CrisisAlert from '@mui/icons-material/CrisisAlert';
import Bolt from '@mui/icons-material/Bolt';
import { C } from '../colors';

interface Props {
  shockActive: boolean;
  onSimulateShock: () => void;
}

export default function TopHeader({ shockActive, onSimulateShock }: Props) {
  return (
    <Box
      sx={{
        height: 52,
        bgcolor: C.surface,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        px: 2,
        gap: 2,
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* Brand */}
      <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 220 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '0.82rem',
            letterSpacing: '0.12em',
            color: C.accent,
            textTransform: 'uppercase',
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: `0 0 10px ${C.accentGlow}`,
            whiteSpace: 'nowrap',
          }}
        >
          The Football Terminal
        </Typography>
        <Typography
          sx={{
            fontSize: '0.62rem',
            color: C.text3,
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
            display: { xs: 'none', lg: 'block' },
          }}
        >
          before the narrative catches up
        </Typography>
      </Stack>

      {/* Monitoring stats */}
      <Stack direction="row" alignItems="center" gap={2} sx={{ flex: 1 }}>
        <Stack direction="row" alignItems="center" gap={0.75}>
          <span className="live-dot" />
          <Typography sx={{ fontSize: '0.7rem', color: C.text2, fontWeight: 600, letterSpacing: '0.04em' }}>
            LIVE
          </Typography>
        </Stack>

        <Typography sx={{ fontSize: '0.68rem', color: C.text3, fontFamily: 'monospace' }}>
          Monitoring{' '}
          <Box component="span" sx={{ color: C.text1, fontWeight: 600 }}>128</Box>{' '}
          matches ·{' '}
          <Box component="span" sx={{ color: C.text1, fontWeight: 600 }}>14</Box>{' '}
          leagues ·{' '}
          <Box component="span" sx={{ color: C.accent, fontWeight: 700 }}>2,481</Box>{' '}
          active signals
        </Typography>

        <Chip
          size="small"
          label="HIGH ACTIVITY"
          sx={{
            bgcolor: 'rgba(248,81,73,0.12)',
            color: C.negative,
            border: `1px solid rgba(248,81,73,0.25)`,
            fontSize: '0.6rem',
            height: 18,
            letterSpacing: '0.06em',
            fontWeight: 700,
          }}
        />
      </Stack>

      {/* Simulate Shock */}
      <Tooltip title="Trigger a major football shock event and watch probabilities shift" arrow>
        <Button
          onClick={onSimulateShock}
          size="small"
          startIcon={shockActive ? <CrisisAlert sx={{ fontSize: 14 }} /> : <Bolt sx={{ fontSize: 14 }} />}
          sx={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: shockActive ? C.negative : C.amber,
            bgcolor: shockActive ? C.negativeDim : C.amberDim,
            border: `1px solid ${shockActive ? 'rgba(248,81,73,0.35)' : 'rgba(210,153,34,0.35)'}`,
            px: 1.5,
            py: 0.5,
            minWidth: 0,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            '&:hover': {
              bgcolor: shockActive ? 'rgba(248,81,73,0.2)' : 'rgba(210,153,34,0.2)',
            },
          }}
        >
          {shockActive ? '⚡ Shock Active' : '⚡ Simulate Shock'}
        </Button>
      </Tooltip>

      {/* Search */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          bgcolor: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: '6px',
          px: 1.25,
          py: 0.5,
          cursor: 'pointer',
          '&:hover': { borderColor: C.borderLight },
          transition: 'border-color 0.15s',
        }}
      >
        <Search sx={{ fontSize: 14, color: C.text3 }} />
        <Typography sx={{ fontSize: '0.68rem', color: C.text3, whiteSpace: 'nowrap' }}>
          Search signals…
        </Typography>
        <Typography
          sx={{
            fontSize: '0.6rem',
            color: C.text3,
            bgcolor: C.border,
            px: 0.5,
            py: 0.1,
            borderRadius: '3px',
            fontFamily: 'monospace',
            ml: 1,
          }}
        >
          ⌘K
        </Typography>
      </Box>

      {/* Avatar */}
      <Avatar
        sx={{
          width: 28,
          height: 28,
          bgcolor: C.accentDim,
          border: `1px solid ${C.borderLight}`,
          fontSize: '0.7rem',
          color: C.accent,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        FT
      </Avatar>
    </Box>
  );
}
