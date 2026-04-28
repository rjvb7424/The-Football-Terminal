import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Speed from '@mui/icons-material/Speed';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { C } from '../colors';
import { TRANSFERS } from '../data/mockSignals';

export default function TransferVelocityPanel() {
  return (
    <Card className="panel-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <Speed sx={{ fontSize: 14, color: C.amber }} />
            <Typography variant="h6" sx={{ color: C.text2 }}>Transfer Velocity</Typography>
          </Stack>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3 }}>
            {TRANSFERS.length} tracked
          </Typography>
        </Stack>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {TRANSFERS.map((t, i) => {
            const delta = t.current - t.previous;
            const sign = delta > 0 ? '+' : '';
            const color = delta > 0 ? C.amber : C.negative;
            const velocity = Math.abs(delta);
            const intensityBar = Math.min(100, velocity * 2.5);

            return (
              <Box key={t.player}>
                {/* Player + clubs */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
                  <Box>
                    <Stack direction="row" alignItems="center" gap={0.75}>
                      <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: C.text1 }}>
                        {t.player}
                      </Typography>
                      <Chip
                        size="small"
                        label={`${sign}${delta} in ${t.hoursAgo}h`}
                        sx={{
                          bgcolor: `${color}18`,
                          color,
                          fontSize: '0.58rem',
                          height: 16,
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          border: `1px solid ${color}30`,
                        }}
                      />
                    </Stack>
                    <Typography sx={{ fontSize: '0.63rem', color: C.text3 }}>
                      {t.from} → {t.to}
                    </Typography>
                  </Box>
                  <Stack alignItems="flex-end">
                    <Typography className="mono" sx={{ fontSize: '0.88rem', fontWeight: 800, color }}>
                      {t.current}%
                    </Typography>
                    <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace' }}>
                      was {t.previous}%
                    </Typography>
                  </Stack>
                </Stack>

                {/* Velocity bar */}
                <Box mb={0.4}>
                  <Stack direction="row" justifyContent="space-between" mb={0.3}>
                    <Typography sx={{ fontSize: '0.6rem', color: C.text3 }}>Transfer probability</Typography>
                    <Stack direction="row" alignItems="center" gap={0.4}>
                      <TrendingUp sx={{ fontSize: 10, color }} />
                      <Typography className="mono" sx={{ fontSize: '0.62rem', color, fontWeight: 700 }}>
                        VELOCITY {sign}{delta}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box sx={{ position: 'relative', height: 8, bgcolor: C.border, borderRadius: 4 }}>
                    {/* Previous bar */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${t.previous}%`,
                        bgcolor: C.borderLight,
                        borderRadius: 4,
                      }}
                    />
                    {/* Current bar */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${t.current}%`,
                        bgcolor: color,
                        borderRadius: 4,
                        boxShadow: `0 0 6px ${color}60`,
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </Box>
                </Box>

                {/* Reason */}
                <Box
                  sx={{
                    bgcolor: C.amberDim,
                    border: `1px solid ${C.amber}25`,
                    borderRadius: '4px',
                    px: 0.75,
                    py: 0.4,
                  }}
                >
                  <Typography sx={{ fontSize: '0.62rem', color: C.text2, fontStyle: 'italic', lineHeight: 1.4 }}>
                    "{t.reason}"
                  </Typography>
                </Box>

                {i < TRANSFERS.length - 1 && <Divider sx={{ mt: 1.25, opacity: 0.4 }} />}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
