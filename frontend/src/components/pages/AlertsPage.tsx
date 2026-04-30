import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C, impactColor } from '../../colors';
import { ALERTS, WATCHLIST, type Alert, type AlertPriority } from '../../data/mockAlerts';
import PageHeader from '../shared/PageHeader';
import FeatureCard from '../shared/FeatureCard';
import StatusChip from '../shared/StatusChip';

const PRIORITY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'critical', label: 'Critical' },
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' },
];

const TYPE_FILTERS = [
  { id: 'all', label: 'All Types' },
  { id: 'injury', label: 'Injury' },
  { id: 'lineup', label: 'Lineup' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'red_card', label: 'Red Card' },
  { id: 'tactical', label: 'Tactical' },
];

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        px: 1.25, py: 0.4,
        border: `1px solid ${active ? C.accent : C.border}`,
        borderRadius: '5px',
        bgcolor: active ? C.accentDim : 'transparent',
        color: active ? C.accent : C.text2,
        fontFamily: 'monospace',
        fontSize: '0.65rem',
        fontWeight: active ? 700 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        flexShrink: 0,
        '&:hover': { borderColor: active ? C.accent : C.borderLight },
      }}
    >
      {label}
    </Box>
  );
}

function AlertRow({ alert }: { alert: Alert }) {
  const color = impactColor(alert.impact);
  const sign = alert.impact > 0 ? '+' : '';

  const priorityColor: Record<AlertPriority, string> = {
    critical: C.negative,
    high: C.amber,
    medium: C.accent,
    low: C.text3,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        px: 2,
        py: 1.5,
        borderBottom: `1px solid ${C.border}`,
        '&:last-child': { borderBottom: 'none' },
        '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
        transition: 'background-color 0.1s',
      }}
    >
      {/* Priority indicator */}
      <Box
        sx={{
          width: 3,
          alignSelf: 'stretch',
          bgcolor: priorityColor[alert.priority],
          borderRadius: 2,
          flexShrink: 0,
          opacity: alert.priority === 'low' ? 0.4 : 1,
        }}
      />

      {/* Time */}
      <Box sx={{ flexShrink: 0, width: 36 }}>
        <Typography sx={{ fontSize: '0.65rem', fontFamily: 'monospace', color: C.text3 }}>{alert.time}</Typography>
        <Typography sx={{ fontSize: '0.58rem', fontFamily: 'monospace', color: C.text3, mt: 0.25 }}>{alert.minutesAgo}m ago</Typography>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: C.text1, lineHeight: 1.2 }}>{alert.event}</Typography>
          <StatusChip variant={alert.alertType} label={alert.alertType.replace('_', ' ').toUpperCase()} />
          <StatusChip variant={alert.priority} />
        </Box>
        <Typography sx={{ fontSize: '0.72rem', color: C.text2, lineHeight: 1.5, mb: 0.75 }}>{alert.detail}</Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>{alert.team}</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>·</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>{alert.competition}</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>·</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>{alert.sourceType}</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>·</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: C.text2, fontFamily: 'monospace' }}>Confidence {alert.confidence}%</Typography>
        </Box>
      </Box>

      {/* Impact */}
      <Box sx={{ flexShrink: 0, textAlign: 'right' }}>
        <Typography sx={{ fontSize: '0.88rem', fontFamily: 'monospace', fontWeight: 700, color }}>{sign}{alert.impact}pp</Typography>
      </Box>
    </Box>
  );
}

function WatchlistPanel() {
  const typeIcon: Record<string, string> = { team: '⊙', competition: '◎', market: '◈' };

  return (
    <FeatureCard title="My Watchlist" noPadding>
      <Box>
        {WATCHLIST.map(item => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.25,
              borderBottom: `1px solid ${C.border}`,
              '&:last-child': { borderBottom: 'none' },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
              cursor: 'pointer',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <Typography sx={{ fontSize: '0.75rem', color: item.type === 'team' ? C.accent : item.type === 'competition' ? C.positive : C.amber }}>
                {typeIcon[item.type]}
              </Typography>
              <Box>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: C.text1 }}>{item.name}</Typography>
                <Typography sx={{ fontSize: '0.6rem', color: C.text3, textTransform: 'capitalize' }}>{item.type}</Typography>
              </Box>
            </Box>
            {item.activeAlerts > 0 && (
              <Box sx={{ px: 0.875, py: 0.2, bgcolor: C.negativeDim, border: `1px solid rgba(248,81,73,0.3)`, borderRadius: '10px' }}>
                <Typography sx={{ fontSize: '0.6rem', fontFamily: 'monospace', fontWeight: 700, color: C.negative }}>{item.activeAlerts}</Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Add to watchlist */}
      <Box
        sx={{
          px: 2,
          py: 1.25,
          borderTop: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
        }}
      >
        <Typography sx={{ fontSize: '0.7rem', color: C.text3 }}>+</Typography>
        <Typography sx={{ fontSize: '0.72rem', color: C.text3 }}>Add team or competition</Typography>
      </Box>
    </FeatureCard>
  );
}

export default function AlertsPage() {
  const [priority, setPriority] = useState('all');
  const [type, setType] = useState('all');

  const filtered = ALERTS
    .filter(a => priority === 'all' || a.priority === priority)
    .filter(a => type === 'all' || a.alertType === type);

  const totalActive = ALERTS.filter(a => a.priority === 'critical' || a.priority === 'high').length;

  return (
    <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', p: { xs: 3, md: 4 } }}>
      <PageHeader
        title="Alerts"
        subtitle="What should you be notified about? Your watchlist, live."
        right={
          <Box sx={{ px: 1.5, py: 0.5, bgcolor: C.negativeDim, border: `1px solid rgba(248,81,73,0.3)`, borderRadius: '5px', display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <span className="live-dot live-dot-red" />
            <Typography sx={{ fontSize: '0.65rem', fontFamily: 'monospace', fontWeight: 700, color: C.negative }}>
              {totalActive} ACTIVE ALERTS
            </Typography>
          </Box>
        }
      />

      <Box sx={{ display: 'flex', gap: 3, flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {/* Alert feed */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {PRIORITY_FILTERS.map(f => (
              <FilterChip key={f.id} label={f.label} active={priority === f.id} onClick={() => setPriority(f.id)} />
            ))}
            <Box sx={{ width: 1, bgcolor: C.border, height: 'auto' }} />
            {TYPE_FILTERS.map(f => (
              <FilterChip key={f.id} label={f.label} active={type === f.id} onClick={() => setType(f.id)} />
            ))}
          </Box>

          <Typography sx={{ fontSize: '0.62rem', color: C.text3, fontFamily: 'monospace', mb: 1.5 }}>
            {filtered.length} ALERT{filtered.length !== 1 ? 'S' : ''}
          </Typography>

          {/* Feed */}
          <Box sx={{ flex: 1, overflow: 'auto', bgcolor: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px' }}>
            {filtered.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography sx={{ color: C.text3, fontSize: '0.8rem' }}>No alerts match your filters.</Typography>
              </Box>
            ) : (
              filtered.map(alert => <AlertRow key={alert.id} alert={alert} />)
            )}
          </Box>
        </Box>

        {/* Watchlist sidebar */}
        <Box sx={{ width: 240, flexShrink: 0, overflow: 'auto' }}>
          <WatchlistPanel />
        </Box>
      </Box>
    </Box>
  );
}
