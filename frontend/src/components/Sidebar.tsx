import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import SportsSoccer from '@mui/icons-material/SportsSoccer';
import Public from '@mui/icons-material/Public';
import ShowChart from '@mui/icons-material/ShowChart';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Speed from '@mui/icons-material/Speed';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import Settings from '@mui/icons-material/Settings';
import { C } from '../colors';

const NAV_ITEMS = [
  { id: 'situation', icon: <SportsSoccer sx={{ fontSize: 20 }} />, label: 'Situation' },
  { id: 'matches',   icon: <Public sx={{ fontSize: 20 }} />,       label: 'Live Matches' },
  { id: 'titles',    icon: <ShowChart sx={{ fontSize: 20 }} />,    label: 'Title Races' },
  { id: 'transfers', icon: <TrendingUp sx={{ fontSize: 20 }} />,   label: 'Transfers' },
  { id: 'injuries',  icon: <Speed sx={{ fontSize: 20 }} />,        label: 'Injuries' },
  { id: 'alerts',    icon: <NotificationsActive sx={{ fontSize: 20 }} />, label: 'Alerts' },
];

interface Props {
  active: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ active, onSelect }: Props) {
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
      {/* Brand icon */}
      <Box
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
        }}
      >
        <SportsSoccer sx={{ fontSize: 18, color: '#000' }} />
      </Box>

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

      <Divider sx={{ width: 32, my: 1 }} />

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
