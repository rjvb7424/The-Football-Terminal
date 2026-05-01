import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { C } from '../colors';
import { type MapSignal, signalColor } from '../data/mapSignals';
import ProbabilityShift from './ProbabilityShift';

interface Props {
  signal: MapSignal;
  onClose: () => void;
}

function typeColor(type: string): string {
  switch (type) {
    case 'Injury': return C.negative;
    case 'Lineup': return C.positive;
    case 'Transfer': return C.amber;
    case 'Tactical': return C.accent;
    case 'Schedule': return C.accent;
    case 'Rumour': return C.amberBright;
    default: return C.text3;
  }
}

function statusColor(status: string): string {
  switch (status) {
    case 'Volatile': return C.negative;
    case 'Confirmed': return C.positive;
    case 'Live': return C.accent;
    case 'Heating Up': return C.amber;
    case 'Rumour': return C.amberBright;
    default: return C.text3;
  }
}

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <Box
      sx={{
        px: 1,
        py: 0.3,
        borderRadius: '4px',
        border: `1px solid ${color}33`,
        bgcolor: `${color}11`,
      }}
    >
      <Typography sx={{ fontSize: '0.62rem', fontFamily: 'monospace', fontWeight: 700, color, letterSpacing: '0.07em' }}>
        {label.toUpperCase()}
      </Typography>
    </Box>
  );
}

export default function SignalDetailPanel({ signal, onClose }: Props) {
  const dotColor = signalColor(signal);
  const sign = signal.impact >= 0 ? '+' : '';

  return (
    <Box
      sx={{
        width: 340,
        height: '100%',
        bgcolor: '#08100e',
        borderLeft: `1px solid ${C.border}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 1.5,
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
          <Chip label={signal.type} color={typeColor(signal.type)} />
          <Chip label={signal.status} color={statusColor(signal.status)} />
          <Box sx={{ ml: 'auto' }}>
            <IconButton size="small" onClick={onClose} sx={{ color: C.text3, '&:hover': { color: C.text1 } }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>

        <Typography sx={{ fontSize: '0.98rem', fontWeight: 700, color: C.text1, lineHeight: 1.3, mb: 1 }}>
          {signal.title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography sx={{ fontSize: '0.63rem', color: C.text3, fontFamily: 'monospace' }}>
            {signal.time}
          </Typography>
          <Typography sx={{ fontSize: '0.63rem', color: C.text3, fontFamily: 'monospace' }}>
            {signal.city} · {signal.competition}
          </Typography>
        </Box>
      </Box>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1.5, display: 'flex', flexDirection: 'column', gap: 1.75 }}>

        {/* Summary */}
        <Typography sx={{ fontSize: '0.78rem', color: C.text2, lineHeight: 1.7 }}>
          {signal.summary}
        </Typography>

        {/* Probability shift */}
        <ProbabilityShift
          label={signal.probability.label}
          before={signal.probability.before}
          after={signal.probability.after}
        />

        {/* Impact badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: dotColor,
              boxShadow: `0 0 6px ${dotColor}`,
              flexShrink: 0,
            }}
          />
          <Typography sx={{ fontSize: '0.7rem', color: C.text3 }}>
            Impact
          </Typography>
          <Typography sx={{ fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700, color: dotColor, ml: 'auto' }}>
            {sign}{signal.impact}
          </Typography>
        </Box>

        {/* Why it matters */}
        <Box>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.07em', mb: 0.75 }}>
            WHY IT MATTERS
          </Typography>
          <Typography sx={{ fontSize: '0.76rem', color: C.text2, lineHeight: 1.65 }}>
            {signal.whyItMatters}
          </Typography>
        </Box>

        {/* Related outcomes */}
        {signal.relatedOutcomes.length > 0 && (
          <Box>
            <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.07em', mb: 0.75 }}>
              RELATED OUTCOMES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
              {signal.relatedOutcomes.map((o, i) => {
                const c = o.change >= 0 ? C.positive : C.negative;
                const s = o.change >= 0 ? '+' : '';
                return (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '0.73rem', color: C.text2 }}>{o.label}</Typography>
                    <Typography sx={{ fontSize: '0.73rem', fontFamily: 'monospace', fontWeight: 700, color: c }}>
                      {s}{o.change}%
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Signals */}
        <Box>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.07em', mb: 0.75 }}>
            SIGNALS
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {signal.signals.map((s, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: '0.66rem', color: C.accent, mt: 0.15, flexShrink: 0 }}>—</Typography>
                <Typography sx={{ fontSize: '0.73rem', color: C.text2 }}>{s}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Forecast */}
        <Box
          sx={{
            p: 1.25,
            borderRadius: '6px',
            border: `1px solid ${C.accent}22`,
            bgcolor: `${C.accent}08`,
          }}
        >
          <Typography sx={{ fontSize: '0.62rem', color: C.accent, fontFamily: 'monospace', letterSpacing: '0.07em', mb: 0.6 }}>
            FORECAST
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: C.text2, lineHeight: 1.6 }}>
            {signal.forecast}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
