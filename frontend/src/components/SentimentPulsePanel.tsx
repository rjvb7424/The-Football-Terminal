import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Groups from '@mui/icons-material/Groups';
import { C } from '../colors';
import { SENTIMENT } from '../data/mockSignals';

const SENTIMENT_COLORS = {
  belief:   '#3fb950',
  panic:    '#f85149',
  anger:    '#d29922',
  optimism: '#00b4d8',
};

const SENTIMENT_LABELS = {
  belief:   'Belief',
  panic:    'Panic',
  anger:    'Anger',
  optimism: 'Optimism',
};

type SentimentKey = keyof typeof SENTIMENT_COLORS;

function SentimentBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <Stack direction="row" alignItems="center" gap={0.75}>
      <Typography sx={{ fontSize: '0.62rem', color: C.text3, minWidth: 52 }}>{label}</Typography>
      <Box sx={{ flex: 1, height: 5, bgcolor: C.border, borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${value}%`,
            bgcolor: color,
            borderRadius: 3,
            boxShadow: `0 0 4px ${color}50`,
            transition: 'width 0.4s ease',
          }}
        />
      </Box>
      <Typography className="mono" sx={{ fontSize: '0.62rem', color, fontWeight: 700, minWidth: 26, textAlign: 'right' }}>
        {value}%
      </Typography>
    </Stack>
  );
}

export default function SentimentPulsePanel() {
  return (
    <Card className="panel-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '10px 12px !important' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <Groups sx={{ fontSize: 14, color: C.accent }} />
            <Typography variant="h6" sx={{ color: C.text2 }}>Fan Sentiment Pulse</Typography>
          </Stack>
          <Typography sx={{ fontSize: '0.62rem', color: C.text3 }}>Real-time</Typography>
        </Stack>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {SENTIMENT.map((item, i) => {
            const sign = item.netChange > 0 ? '+' : '';
            const netColor = item.netChange > 0 ? C.negative : C.positive; // panic up = bad

            return (
              <Box key={item.team}>
                {/* Team header */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.6}>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: C.text1 }}>
                    {item.team}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Box
                      sx={{
                        bgcolor: `${netColor}18`,
                        border: `1px solid ${netColor}30`,
                        borderRadius: '4px',
                        px: 0.5,
                        py: 0.1,
                      }}
                    >
                      <Typography className="mono" sx={{ fontSize: '0.6rem', color: netColor, fontWeight: 700 }}>
                        PANIC {sign}{item.netChange}%
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                {/* Sentiment bars */}
                <Stack gap={0.45}>
                  {(Object.keys(SENTIMENT_COLORS) as SentimentKey[]).map(key => (
                    <SentimentBar
                      key={key}
                      label={SENTIMENT_LABELS[key]}
                      value={item[key]}
                      color={SENTIMENT_COLORS[key]}
                    />
                  ))}
                </Stack>

                {i < SENTIMENT.length - 1 && <Divider sx={{ mt: 1.25, opacity: 0.4 }} />}
              </Box>
            );
          })}
        </Box>

        <Typography sx={{ fontSize: '0.58rem', color: C.text3, mt: 1, fontStyle: 'italic' }}>
          Aggregated from social signals · updated every 90s
        </Typography>
      </CardContent>
    </Card>
  );
}
