import { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';

import LandingPage from './components/pages/LandingPage';
import MapTerminal from './components/MapTerminal';

type View = 'home' | 'terminal';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [fading, setFading] = useState(false);

  const switchView = useCallback((next: View) => {
    setFading(true);
    setTimeout(() => {
      setView(next);
      setFading(false);
    }, 280);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.28s ease',
        }}
      >
        {view === 'home' ? (
          <LandingPage onEnterDashboard={() => switchView('terminal')} />
        ) : (
          <MapTerminal onBackHome={() => switchView('home')} />
        )}
      </Box>
    </ThemeProvider>
  );
}
