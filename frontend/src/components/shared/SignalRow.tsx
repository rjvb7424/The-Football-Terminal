import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C, impactColor } from '../../colors';
import StatusChip from './StatusChip';
import type { Signal } from '../../data/mockSignals';

interface Props {
  signal: Signal;
  selected?: boolean;
  onClick?: () => void;
  compact?: boolean;
}

const TYPE_LABEL: Record<string, string> = {
  injury: 'INJURY',
  lineup: 'LINEUP',
  transfer: 'TRANSFER',
  tactical: 'TACTICAL',
  red_card: 'RED CARD',
  rumour: 'RUMOUR',
};

export default function SignalRow({ signal, selected, onClick, compact }: Props) {
  const color = impactColor(signal.impact);
  const sign = signal.impact > 0 ? '+' : '';
  const isSelected = selected ?? false;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 1.75,
        py: compact ? 1 : 1.25,
        borderBottom: `1px solid ${C.border}`,
        bgcolor: isSelected ? C.accentDim : 'transparent',
        borderLeft: isSelected ? `2px solid ${C.accent}` : '2px solid transparent',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease',
        '&:hover': onClick ? { bgcolor: isSelected ? C.accentDim : 'rgba(255,255,255,0.03)' } : {},
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      {/* Signal type chip — fixed width matches "TYPE" column header (70px) */}
      <Box sx={{ width: 70, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <StatusChip
          variant={signal.eventType === 'rumour' ? 'rumour' : signal.eventType as any}
          label={TYPE_LABEL[signal.eventType] ?? signal.eventType.toUpperCase()}
        />
      </Box>

      {/* Title + club */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.78rem',
            fontWeight: 600,
            color: isSelected ? C.text1 : C.text1,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {signal.title}
        </Typography>
        {!compact && (
          <Typography sx={{ fontSize: '0.65rem', color: C.text2, mt: 0.25 }}>
            {signal.club} · {signal.competition}
          </Typography>
        )}
      </Box>

      {/* Impact */}
      <Typography
        className="mono"
        sx={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color,
          flexShrink: 0,
          minWidth: 42,
          textAlign: 'right',
        }}
      >
        {sign}{signal.impact}
      </Typography>

      {/* Confidence */}
      {!compact && (
        <Box sx={{ flexShrink: 0, width: 36, textAlign: 'right' }}>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace' }}>
            {signal.confidence}%
          </Typography>
        </Box>
      )}

      {/* Time */}
      <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', flexShrink: 0, minWidth: 40, textAlign: 'right' }}>
        {signal.minutesAgo}m ago
      </Typography>
    </Box>
  );
}
