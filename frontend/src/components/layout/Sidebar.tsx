import type { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SportsSoccer from '@mui/icons-material/SportsSoccer';
import Dashboard from '@mui/icons-material/Dashboard';
import Bolt from '@mui/icons-material/Bolt';
import QueryStats from '@mui/icons-material/QueryStats';
import SportsSoccerOutlined from '@mui/icons-material/SportsSoccerOutlined';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import Article from '@mui/icons-material/Article';
import Forum from '@mui/icons-material/Forum';
import Settings from '@mui/icons-material/Settings';
import Home from '@mui/icons-material/Home';
import { C } from '../../colors';

export type PageId = 'overview' | 'signals' | 'shifts' | 'matches' | 'titles' | 'transfers' | 'alerts' | 'news' | 'chat';

const NAV_ITEMS: { id: PageId; icon: ReactElement; label: string; question: string }[] = [
  { id: 'overview',   icon: <Dashboard sx={{ fontSize: 16 }} />,                label: 'Overview',            question: 'What matters most?' },
  { id: 'signals',    icon: <Bolt sx={{ fontSize: 16 }} />,                     label: 'Live Signals',        question: 'What happened?' },
  { id: 'shifts',     icon: <QueryStats sx={{ fontSize: 16 }} />,               label: 'Probability Shifts',  question: 'What changed?' },
  { id: 'matches',    icon: <SportsSoccerOutlined sx={{ fontSize: 16 }} />,     label: 'Live Matches',        question: 'How is it changing?' },
  { id: 'titles',     icon: <EmojiEvents sx={{ fontSize: 16 }} />,              label: 'Title Races',         question: 'Who is winning?' },
  { id: 'transfers',  icon: <SwapHoriz sx={{ fontSize: 16 }} />,                label: 'Transfers',           question: 'What moves are live?' },
  { id: 'alerts',     icon: <NotificationsActive sx={{ fontSize: 16 }} />,      label: 'Alerts',              question: 'What to watch?' },
  { id: 'news',       icon: <Article sx={{ fontSize: 16 }} />,                  label: 'News',                question: 'What\'s the story?' },
  { id: 'chat',       icon: <Forum sx={{ fontSize: 16 }} />,                    label: 'Chat',                question: 'What are people saying?' },
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
        width: 164,
        flexShrink: 0,
        height: '100vh',
        bgcolor: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Brand */}
      <Box
        onClick={onBackHome}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          pt: 2,
          pb: 1.75,
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          cursor: onBackHome ? 'pointer' : 'default',
          flexShrink: 0,
          transition: 'opacity 0.15s',
          '&:hover': onBackHome ? { opacity: 0.8 } : {},
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '7px',
            background: `linear-gradient(135deg, ${C.accent} 0%, rgba(46,230,200,0.16) 78%)`,
            border: `1px solid rgba(46,230,200,0.34)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          boxShadow: 'none',
          }}
        >
          <SportsSoccer sx={{ fontSize: 15, color: C.bg }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: C.text1,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              lineHeight: 1.15,
            }}
          >
            TFT
          </Typography>
          <Typography sx={{ fontSize: '0.54rem', color: C.text3, fontFamily: 'monospace', lineHeight: 1 }}>
            Signal Room
          </Typography>
        </Box>
      </Box>

      {/* Section label */}
      <Box sx={{ px: 1.5, pt: 2.25, pb: 0.75, flexShrink: 0 }}>
        <Typography
          sx={{
            fontSize: '0.54rem',
            color: C.text3,
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Pages
        </Typography>
      </Box>

      {/* Nav items */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.2, px: 0.75 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <Box
              key={item.id}
              onClick={() => onSelect(item.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1,
                py: 0.82,
                borderRadius: '6px',
                borderLeft: `1px solid ${isActive ? C.accent : 'transparent'}`,
                bgcolor: isActive ? 'rgba(46,230,200,0.08)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.12s ease',
                '&:hover': {
                  bgcolor: isActive ? 'rgba(46,230,200,0.08)' : 'rgba(255,255,255,0.03)',
                  borderLeftColor: isActive ? C.accent : C.borderLight,
                },
              }}
            >
              <Box sx={{ color: isActive ? C.accent : C.text3, display: 'flex', flexShrink: 0 }}>
                {item.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? C.accent : C.text2,
                  transition: 'color 0.12s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 1.25, my: 0.5 }} />

      {/* Bottom */}
      <Box sx={{ px: 1.25, pb: 1.5, display: 'flex', flexDirection: 'column', gap: 0.25, flexShrink: 0 }}>
        {onBackHome && (
          <Box
            onClick={onBackHome}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1.25,
              py: 0.875,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.12s',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' },
            }}
          >
            <Home sx={{ fontSize: 16, color: C.text3 }} />
            <Typography sx={{ fontSize: '0.75rem', color: C.text2 }}>Home</Typography>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 1.25,
            py: 0.875,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.12s',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' },
          }}
        >
          <Settings sx={{ fontSize: 16, color: C.text3 }} />
          <Typography sx={{ fontSize: '0.75rem', color: C.text2 }}>Settings</Typography>
        </Box>
      </Box>
    </Box>
  );
}
