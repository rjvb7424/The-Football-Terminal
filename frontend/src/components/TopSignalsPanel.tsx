import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Bolt from '@mui/icons-material/Bolt';
import WarningAmber from '@mui/icons-material/WarningAmber';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingDown from '@mui/icons-material/TrendingDown';
import Timeline from '@mui/icons-material/Timeline';
import { C, impactColor, impactBg } from '../colors';
import { SIGNALS } from '../data/mockSignals';
import type { Signal, EventType } from '../data/mockSignals';

const EVENT_LABELS: Record<EventType, string> = {
  injury: 'INJURY',
  lineup: 'LINEUP',
  transfer: 'TRANSFER',
  tactical: 'TACTICAL',
  red_card: 'RED CARD',
  rumour: 'RUMOUR',
};

const EVENT_COLORS: Record<EventType, string> = {
  injury: C.negative,
  lineup: C.positive,
  transfer: C.amber,
  tactical: C.accent,
  red_card: C.negative,
  rumour: C.amber,
};

const FILTER_TYPES: Record<string, EventType | null> = {
  all: null,
  injuries: 'injury',
  lineups: 'lineup',
  transfers: 'transfer',
  live: null,
  titles: null,
};

interface Props {
  activeFilter: string;
  onSelectSignal: (id: string) => void;
  selectedId: string;
}

function SignalRow({ signal, selected, onClick }: { signal: Signal; selected: boolean; onClick: () => void }) {
  const color = impactColor(signal.impact);
  const bg = impactBg(signal.impact);
  const sign = signal.impact > 0 ? '+' : '';
  const isLive = signal.minutesAgo < 10;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 52px 52px 56px',
        gap: 0.5,
        alignItems: 'center',
        px: 1,
        py: 0.75,
        cursor: 'pointer',
        borderRadius: '4px',
        bgcolor: selected ? 'rgba(0,180,216,0.08)' : 'transparent',
        border: selected ? `1px solid ${C.accent}30` : '1px solid transparent',
        '&:hover': { bgcolor: selected ? 'rgba(0,180,216,0.1)' : 'rgba(255,255,255,0.03)' },
        transition: 'all 0.1s',
      }}
    >
      {/* Signal info */}
      <Box>
        <Stack direction="row" alignItems="center" gap={0.5} mb={0.25}>
          {isLive && <span className="live-dot" style={{ width: 5, height: 5 }} />}
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: C.text1, lineHeight: 1.2 }}>
            {signal.title}
          </Typography>
          <Box
            sx={{
              bgcolor: `${EVENT_COLORS[signal.eventType]}18`,
              border: `1px solid ${EVENT_COLORS[signal.eventType]}35`,
              borderRadius: '3px',
              px: 0.4,
            }}
          >
            <Typography sx={{ fontSize: '0.55rem', color: EVENT_COLORS[signal.eventType], fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.04em' }}>
              {EVENT_LABELS[signal.eventType]}
            </Typography>
          </Box>
        </Stack>
        <Typography sx={{ fontSize: '0.63rem', color: C.text3 }}>{signal.club} · {signal.competition}</Typography>
      </Box>

      {/* Impact */}
      <Typography className="mono" sx={{ fontSize: '0.78rem', fontWeight: 800, color, textAlign: 'right' }}>
        {sign}{signal.impact}
      </Typography>

      {/* Confidence */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography className="mono" sx={{ fontSize: '0.7rem', color: C.text2 }}>
          {signal.confidence}%
        </Typography>
        <Box sx={{ height: 2, bgcolor: C.border, borderRadius: 1, mt: 0.3 }}>
          <Box sx={{ height: '100%', width: `${signal.confidence}%`, bgcolor: color, borderRadius: 1, transition: 'width 0.3s' }} />
        </Box>
      </Box>

      {/* Time */}
      <Typography sx={{ fontSize: '0.62rem', color: C.text3, textAlign: 'right' }}>
        {signal.minutesAgo}m ago
      </Typography>
    </Box>
  );
}

export default function TopSignalsPanel({ activeFilter, onSelectSignal, selectedId }: Props) {
  const filterType = FILTER_TYPES[activeFilter] ?? null;
  const filtered = filterType
    ? SIGNALS.filter(s => s.eventType === filterType)
    : SIGNALS;

  return (
    <Card className="panel-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.75}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <Bolt sx={{ fontSize: 14, color: C.amber }} />
            <Typography variant="h6" sx={{ color: C.text2 }}>Top Signals</Typography>
            <Chip
              size="small"
              label={`${filtered.length} ACTIVE`}
              sx={{ bgcolor: C.amberDim, color: C.amber, fontSize: '0.58rem', height: 16, border: `1px solid ${C.amber}30` }}
            />
          </Stack>
        </Stack>

        {/* Column headers */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 52px 52px 56px',
            gap: 0.5,
            px: 1,
            mb: 0.25,
          }}
        >
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, letterSpacing: '0.06em' }}>SIGNAL</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, letterSpacing: '0.06em', textAlign: 'right' }}>IMPACT</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, letterSpacing: '0.06em', textAlign: 'right' }}>CONF.</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, letterSpacing: '0.06em', textAlign: 'right' }}>TIME</Typography>
        </Box>

        <Divider sx={{ mb: 0.5 }} />

        {/* Signals list */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map((signal, i) => (
            <Box key={signal.id}>
              <SignalRow
                signal={signal}
                selected={selectedId === signal.id}
                onClick={() => onSelectSignal(signal.id)}
              />
              {i < filtered.length - 1 && <Divider sx={{ opacity: 0.4 }} />}
            </Box>
          ))}
          {filtered.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography sx={{ fontSize: '0.72rem', color: C.text3 }}>No signals match this filter</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
