import type { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import SportsSoccer from '@mui/icons-material/SportsSoccer';
import Dashboard from '@mui/icons-material/Dashboard';
import Bolt from '@mui/icons-material/Bolt';
import QueryStats from '@mui/icons-material/QueryStats';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import Settings from '@mui/icons-material/Settings';
import Home from '@mui/icons-material/Home';
import { C } from '../../colors';

export type PageId = 'overview' | 'signals' | 'shifts' | 'matches' | 'titles' | 'transfers' | 'alerts';

const NAV_ITEMS: { id: PageId; icon: ReactElement; label: string }[] = [
  { id: 'overview',   icon: <Dashboard sx={{ fontSize: 19 }} />,         label: 'Overview' },
  { id: 'signals',    icon: <Bolt sx={{ fontSize: 19 }} />,              label: 'Live Signals' },
  { id: 'shifts',     icon: <QueryStats sx={{ fontSize: 19 }} />,        label: 'Probability Shifts' },
  { id: 'matches',    icon: <SportsSoccer sx={{ fontSize: 19 }} />,      label: 'Live Matches' },
  { id: 'titles',     icon: <EmojiEvents sx={{ fontSize: 19 }} />,       label: 'Title Races' },
  { id: 'transfers',  icon: <SwapHoriz sx={{ fontSize: 19 }} />,         label: 'Transfers' },
  { id: 'alerts',     icon: <NotificationsActive sx={{ fontSize: 19 }} />, label: 'Alerts' },
];

interface Props {
  active: PageId;
  onSelect: (id: PageId) => void;
  onBackHome?: () => void;
}

export default function Sidebar({ active, onSelect, onBackHome }: Props) {
  return (
    <Box
      sx={{
        width: 56,
        flexShrink: 0,
        height: '100vh',
        bgcolor: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 1,
        pb: 1,
        zIndex: 10,
      }}
    >
      {/* Brand icon — click to go home */}
      <Tooltip title="Home" placement="right" arrow>
        <Box
          onClick={onBackHome}
          sx={{
            width: 34,
            height: 34,
            borderRadius: '8px',
            bgcolor: C.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2.5,
            boxShadow: `0 0 14px ${C.accentGlow}`,
            flexShrink: 0,
            cursor: onBackHome ? 'pointer' : 'default',
            transition: 'opacity 0.15s ease',
            '&:hover': onBackHome ? { opacity: 0.8 } : {},
          }}
        >
          <SportsSoccer sx={{ fontSize: 18, color: '#000' }} />
        </Box>
      </Tooltip>

      {/* Nav items */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <Tooltip key={item.id} title={item.label} placement="right" arrow>
              <IconButton
                onClick={() => onSelect(item.id)}
                sx={{
                  width: 38,
                  height: 38,
                  color: isActive ? C.accent : C.text3,
                  bgcolor: isActive ? C.accentDim : 'transparent',
                  boxShadow: isActive ? `inset 0 0 0 1px ${C.accentDim}` : 'none',
                  '&:hover': {
                    bgcolor: isActive ? C.accentDim : 'rgba(255,255,255,0.05)',
                    color: isActive ? C.accentBright : C.text2,
                  },
                  transition: 'all 0.15s ease',
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>

      <Divider sx={{ width: 32, my: 1, borderColor: C.border }} />

      {onBackHome && (
        <Tooltip title="Back to Home" placement="right" arrow>
          <IconButton
            onClick={onBackHome}
            sx={{
              width: 38,
              height: 38,
              color: C.text3,
              mb: 0.5,
              '&:hover': { color: C.text2, bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            <Home sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Settings" placement="right" arrow>
        <IconButton
          sx={{
            width: 38,
            height: 38,
            color: C.text3,
            '&:hover': { color: C.text2, bgcolor: 'rgba(255,255,255,0.05)' },
          }}
        >
          <Settings sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
