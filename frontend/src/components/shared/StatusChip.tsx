import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';

type Variant =
  | 'live' | 'confirmed' | 'rumour'
  | 'heating_up' | 'exploding' | 'moving' | 'cooling' | 'quiet'
  | 'critical' | 'high' | 'medium' | 'low'
  | 'positive' | 'negative' | 'amber'
  | 'injury' | 'lineup' | 'transfer' | 'red_card' | 'tactical' | 'market' | 'sentiment';

interface Props {
  label?: string;
  variant: Variant;
  pulse?: boolean;
}

function resolveColors(variant: Variant): { bg: string; border: string; text: string } {
  switch (variant) {
    case 'live':
    case 'confirmed':
    case 'positive':
      return { bg: C.positiveDim, border: `rgba(63,185,80,0.3)`, text: C.positive };

    case 'exploding':
    case 'heating_up':
    case 'critical':
    case 'red_card':
    case 'negative':
      return { bg: C.negativeDim, border: `rgba(248,81,73,0.3)`, text: C.negative };

    case 'rumour':
    case 'moving':
    case 'transfer':
    case 'market':
    case 'amber':
    case 'high':
      return { bg: C.amberDim, border: `rgba(210,153,34,0.3)`, text: C.amber };

    case 'lineup':
    case 'tactical':
      return { bg: C.accentDim, border: `rgba(0,180,216,0.3)`, text: C.accent };

    case 'cooling':
    case 'quiet':
    case 'low':
    case 'sentiment':
      return { bg: 'rgba(72,79,88,0.25)', border: `rgba(72,79,88,0.4)`, text: C.text3 };

    case 'injury':
      return { bg: C.negativeDim, border: `rgba(248,81,73,0.3)`, text: C.negative };

    case 'medium':
      return { bg: 'rgba(0,180,216,0.08)', border: `rgba(0,180,216,0.2)`, text: C.accent };

    default:
      return { bg: C.accentDim, border: `rgba(0,180,216,0.2)`, text: C.text2 };
  }
}

function resolveLabel(variant: Variant, label?: string): string {
  if (label) return label;
  const map: Partial<Record<Variant, string>> = {
    live: 'LIVE',
    confirmed: 'CONFIRMED',
    rumour: 'RUMOUR',
    heating_up: 'HEATING UP',
    exploding: 'EXPLODING',
    moving: 'MOVING',
    cooling: 'COOLING',
    quiet: 'QUIET',
    critical: 'CRITICAL',
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW',
    positive: 'POSITIVE',
    negative: 'NEGATIVE',
    amber: 'AMBER',
    injury: 'INJURY',
    lineup: 'LINEUP',
    transfer: 'TRANSFER',
    red_card: 'RED CARD',
    tactical: 'TACTICAL',
    market: 'MARKET',
    sentiment: 'SENTIMENT',
  };
  return map[variant] ?? variant.toUpperCase();
}

export default function StatusChip({ label, variant, pulse }: Props) {
  const { bg, border, text } = resolveColors(variant);
  const displayLabel = resolveLabel(variant, label);
  const showDot = pulse || variant === 'live' || variant === 'exploding';

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 0.875,
        py: 0.2,
        bgcolor: bg,
        border: `1px solid ${border}`,
        borderRadius: '4px',
        flexShrink: 0,
      }}
    >
      {showDot && (
        <Box
          component="span"
          className="live-dot"
          sx={{
            background: text,
            boxShadow: `0 0 6px ${text}`,
            width: 5,
            height: 5,
          }}
        />
      )}
      <Typography
        sx={{
          fontSize: '0.58rem',
          fontWeight: 700,
          color: text,
          fontFamily: 'monospace',
          letterSpacing: '0.07em',
          whiteSpace: 'nowrap',
        }}
      >
        {displayLabel}
      </Typography>
    </Box>
  );
}
