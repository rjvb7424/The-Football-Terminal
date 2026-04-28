import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#080b0f',
      paper: '#0d1117',
    },
    primary: {
      main: '#00b4d8',
      light: '#00d4ff',
    },
    error: {
      main: '#f85149',
    },
    success: {
      main: '#3fb950',
    },
    warning: {
      main: '#d29922',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#8b949e',
      disabled: '#484f58',
    },
    divider: '#21262d',
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
          backgroundColor: '#161b22',
          border: '1px solid #21262d',
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
          backgroundColor: '#21262d',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#21262d' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1c2129',
          border: '1px solid #30363d',
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
