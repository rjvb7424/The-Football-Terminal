import { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import LiveTicker from './components/LiveTicker';
import FilterBar from './components/FilterBar';
import DashboardGrid from './components/DashboardGrid';

type View = 'home' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [fading, setFading] = useState(false);

  const [selectedNav, setSelectedNav] = useState('situation');
  const [activeFilter, setActiveFilter] = useState('all');
  const [shockActive, setShockActive] = useState(true);
  const [featuredSignalId, setFeaturedSignalId] = useState('sig-001');

  const switchView = useCallback((next: View) => {
    setFading(true);
    setTimeout(() => {
      setView(next);
      setFading(false);
    }, 280);
  }, []);

  const handleEnterDashboard = useCallback(() => switchView('dashboard'), [switchView]);
  const handleBackHome = useCallback(() => switchView('home'), [switchView]);

  const handleSimulateShock = useCallback(() => {
    setShockActive(prev => !prev);
    if (!shockActive) {
      setFeaturedSignalId('sig-001');
    }
  }, [shockActive]);

  const handleSignalSelect = useCallback((id: string) => {
    setFeaturedSignalId(id);
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
          <LandingPage onEnterDashboard={handleEnterDashboard} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              bgcolor: '#080b0f',
            }}
          >
            <Sidebar active={selectedNav} onSelect={setSelectedNav} />

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
              <TopHeader
                shockActive={shockActive}
                onSimulateShock={handleSimulateShock}
                onBackHome={handleBackHome}
              />
              <LiveTicker />
              <FilterBar active={activeFilter} onChange={setActiveFilter} />
              <DashboardGrid
                shockActive={shockActive}
                activeFilter={activeFilter}
                featuredSignalId={featuredSignalId}
                onSignalSelect={handleSignalSelect}
              />
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
