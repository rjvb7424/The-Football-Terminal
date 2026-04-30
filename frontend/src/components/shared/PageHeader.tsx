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
    <Box sx={{ mb: 3.5 }}>
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
              fontSize: '1.3rem',
              fontWeight: 700,
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
                mt: 0.5,
                lineHeight: 1.55,
                maxWidth: 540,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {right && <Box sx={{ flexShrink: 0 }}>{right}</Box>}
      </Box>
      <Box
        sx={{
          mt: 2,
          height: 1,
          bgcolor: C.border,
          width: '100%',
        }}
      />
    </Box>
  );
}
