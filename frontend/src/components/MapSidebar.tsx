import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PublicIcon from '@mui/icons-material/Public';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupsIcon from '@mui/icons-material/Groups';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HomeIcon from '@mui/icons-material/Home';
import { C } from '../colors';
import { type LayerId, LAYER_FILTERS } from '../data/mapSignals';

const ICONS: Record<string, React.ReactNode> = {
  all: <PublicIcon sx={{ fontSize: 16 }} />,
  Injury: <LocalHospitalIcon sx={{ fontSize: 16 }} />,
  Lineup: <GroupsIcon sx={{ fontSize: 16 }} />,
  Transfer: <SwapHorizIcon sx={{ fontSize: 16 }} />,
  Tactical: <SportsSoccerIcon sx={{ fontSize: 16 }} />,
  Schedule: <EmojiEventsIcon sx={{ fontSize: 16 }} />,
  Rumour: <WhatshotIcon sx={{ fontSize: 16 }} />,
};

interface Props {
  activeLayer: LayerId;
  onLayerChange: (id: LayerId) => void;
  onBackHome: () => void;
}

export default function MapSidebar({ activeLayer, onLayerChange, onBackHome }: Props) {
  return (
    <Box
      sx={{
        width: 48,
        flexShrink: 0,
        bgcolor: '#050d0a',
        borderRight: `1px solid ${C.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 1.5,
        gap: 0.5,
      }}
    >
      {/* Back home */}
      <Tooltip title="Back to home" placement="right" arrow>
        <Box
          onClick={onBackHome}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: C.text3,
            mb: 1.5,
            '&:hover': { bgcolor: C.accentDim, color: C.accent },
            transition: 'all 0.15s',
          }}
        >
          <HomeIcon sx={{ fontSize: 16 }} />
        </Box>
      </Tooltip>

      {/* Divider */}
      <Box sx={{ width: 24, height: 1, bgcolor: C.border, mb: 1 }} />

      {/* Layer filters */}
      {LAYER_FILTERS.map(layer => {
        const active = activeLayer === layer.id;
        return (
          <Tooltip key={layer.id} title={layer.label} placement="right" arrow>
            <Box
              onClick={() => onLayerChange(layer.id)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: active ? C.accent : C.text3,
                bgcolor: active ? C.accentDim : 'transparent',
                border: active ? `1px solid ${C.accent}33` : '1px solid transparent',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: C.accentDim, color: active ? C.accentBright : C.text2 },
              }}
            >
              {ICONS[layer.id]}
            </Box>
          </Tooltip>
        );
      })}

      <Box sx={{ flex: 1 }} />

      {/* Active layer label */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {LAYER_FILTERS.find(l => l.id === activeLayer)?.label.split(' ').map((word, i) => (
          <Typography key={i} sx={{ fontSize: '0.48rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em', lineHeight: 1.4 }}>
            {word.toUpperCase()}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
