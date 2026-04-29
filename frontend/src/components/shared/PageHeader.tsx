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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        mb: 3,
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: C.text1,
            letterSpacing: '-0.01em',
            fontFamily: 'monospace',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ fontSize: '0.75rem', color: C.text2, mt: 0.4, lineHeight: 1.4 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {right && <Box sx={{ flexShrink: 0 }}>{right}</Box>}
    </Box>
  );
}
