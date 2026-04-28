import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FilterList from '@mui/icons-material/FilterList';
import { C } from '../colors';

const FILTERS = [
  { id: 'all',       label: 'All Signals' },
  { id: 'injuries',  label: 'Injuries' },
  { id: 'lineups',   label: 'Lineups' },
  { id: 'transfers', label: 'Transfers' },
  { id: 'live',      label: 'Live Matches' },
  { id: 'titles',    label: 'Title Races' },
];

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function FilterBar({ active, onChange }: Props) {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.75,
        bgcolor: C.bg,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexShrink: 0,
      }}
    >
      <FilterList sx={{ fontSize: 13, color: C.text3 }} />
      <Stack direction="row" gap={0.5} flexWrap="nowrap" overflow="auto">
        {FILTERS.map(f => {
          const isActive = active === f.id;
          return (
            <Chip
              key={f.id}
              label={f.label}
              size="small"
              onClick={() => onChange(f.id)}
              sx={{
                cursor: 'pointer',
                bgcolor: isActive ? C.accentDim : 'transparent',
                color: isActive ? C.accent : C.text3,
                border: `1px solid ${isActive ? C.accent + '50' : C.border}`,
                fontSize: '0.65rem',
                height: 22,
                fontWeight: isActive ? 700 : 400,
                flexShrink: 0,
                '&:hover': {
                  bgcolor: isActive ? C.accentDim : 'rgba(255,255,255,0.05)',
                  color: isActive ? C.accentBright : C.text2,
                },
                transition: 'all 0.15s',
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
