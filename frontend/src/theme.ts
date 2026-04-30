import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050807',
      paper: '#0c1210',
    },
    primary: {
      main: '#2ee6c8',
      light: '#75ffe9',
    },
    error: {
      main: '#ff5f5f',
    },
    success: {
      main: '#54d66f',
    },
    warning: {
      main: '#d7a84a',
    },
    text: {
      primary: '#f1f5ef',
      secondary: '#a0aaa4',
      disabled: '#5f6b65',
    },
    divider: '#1d2926',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 13,
    h6: { fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const },
    body2: { fontSize: '0.75rem', lineHeight: 1.5 },
    caption: { fontSize: '0.7rem', lineHeight: 1.4 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: '#121917',
          border: '1px solid #1d2926',
          borderRadius: 6,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '10px 12px',
          '&:last-child': { paddingBottom: 10 },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 22,
          fontSize: '0.7rem',
          fontWeight: 600,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          backgroundColor: '#1d2926',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#1d2926' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#17211e',
          border: '1px solid #2c3a36',
          fontSize: '0.72rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
        },
      },
    },
  },
});

export default theme;
