import { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import LiveTicker from './components/LiveTicker';
import FilterBar from './components/FilterBar';
import DashboardGrid from './components/DashboardGrid';

export default function App() {
  const [selectedNav, setSelectedNav] = useState('situation');
  const [activeFilter, setActiveFilter] = useState('all');
  const [shockActive, setShockActive] = useState(true);
  const [featuredSignalId, setFeaturedSignalId] = useState('sig-001');

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
          display: 'flex',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          bgcolor: '#080b0f',
        }}
      >
        {/* Left sidebar */}
        <Sidebar active={selectedNav} onSelect={setSelectedNav} />

        {/* Main content area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          <TopHeader shockActive={shockActive} onSimulateShock={handleSimulateShock} />
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
    </ThemeProvider>
  );
}
