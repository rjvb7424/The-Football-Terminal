import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}

export default function PageHeader({ title, subtitle, right }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '1.35rem', md: '1.55rem' },
              fontWeight: 750,
              color: C.text1,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                fontSize: '0.78rem',
                color: C.text3,
                mt: 0.75,
                lineHeight: 1.55,
                maxWidth: 620,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {right && <Box sx={{ flexShrink: 0 }}>{right}</Box>}
      </Box>
    </Box>
  );
}
