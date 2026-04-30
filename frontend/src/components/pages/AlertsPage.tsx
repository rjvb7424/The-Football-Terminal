import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C, impactColor } from '../../colors';
import { ALERTS, type AlertPriority } from '../../data/mockAlerts';
import PageHeader from '../shared/PageHeader';

const PRIORITIES: Array<AlertPriority | 'all'> = ['all', 'critical', 'high', 'medium', 'low'];

export default function AlertsPage() {
  const [priority, setPriority] = useState<AlertPriority | 'all'>('all');
  const filtered = ALERTS.filter(alert => priority === 'all' || alert.priority === priority);

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader title="Alerts" subtitle="A calm notification feed. Time, event, impact, priority." />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {PRIORITIES.map(item => (
          <Box
            key={item}
            component="button"
            onClick={() => setPriority(item)}
            sx={{
              px: 1.35,
              py: 0.6,
              border: `1px solid ${priority === item ? 'rgba(0,180,216,0.42)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '7px',
              bgcolor: priority === item ? 'rgba(0,180,216,0.08)' : 'transparent',
              color: priority === item ? C.accent : C.text2,
              fontSize: '0.72rem',
              textTransform: 'capitalize',
              cursor: 'pointer',
            }}
          >
            {item}
          </Box>
        ))}
      </Box>

      <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '9px', overflow: 'hidden' }}>
        {filtered.map(alert => {
          const color = impactColor(alert.impact);
          const sign = alert.impact > 0 ? '+' : '';
          return (
            <Box key={alert.id} sx={{ display: 'grid', gridTemplateColumns: { xs: '48px 1fr auto', md: '70px 1fr 90px 90px' }, gap: 2, alignItems: 'center', px: 2.5, py: 1.8, borderTop: `1px solid rgba(255,255,255,0.055)` }}>
              <Typography sx={{ fontSize: '0.72rem', color: C.text3, fontFamily: 'monospace' }}>{alert.time}</Typography>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.88rem', color: C.text1, fontWeight: 740, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {alert.event}
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: C.text3, mt: 0.25 }}>{alert.team}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.84rem', color, fontFamily: 'monospace', fontWeight: 850, textAlign: 'right' }}>
                {sign}{alert.impact}pp
              </Typography>
              <Typography sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.72rem', color: alert.priority === 'critical' ? C.negative : alert.priority === 'high' ? C.amber : C.text3, fontFamily: 'monospace', textAlign: 'right', textTransform: 'uppercase' }}>
                {alert.priority}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
