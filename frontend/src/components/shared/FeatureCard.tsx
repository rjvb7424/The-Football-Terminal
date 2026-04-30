import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';
import type { ReactNode } from 'react';

interface Props {
  title?: string;
  titleRight?: ReactNode;
  children: ReactNode;
  accent?: boolean;
  noPadding?: boolean;
  sx?: object;
}

export default function FeatureCard({ title, titleRight, children, accent, noPadding, sx }: Props) {
  return (
    <Box
      className="panel-lift"
      sx={{
        bgcolor: C.surface,
        border: `1px solid ${accent ? 'rgba(0,180,216,0.22)' : C.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {title && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 1.5,
            borderBottom: `1px solid ${C.border}`,
            bgcolor: C.card,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: accent ? C.accent : C.text3,
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </Typography>
          {titleRight}
        </Box>
      )}
      <Box sx={{ flex: 1, p: noPadding ? 0 : 2.5 }}>{children}</Box>
    </Box>
  );
}
