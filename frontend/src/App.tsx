import { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';

import DashboardLayout from './components/layout/DashboardLayout';
import type { PageId } from './components/layout/Sidebar';

import LandingPage from './components/pages/LandingPage';
import OverviewPage from './components/pages/OverviewPage';
import LiveSignalsPage from './components/pages/LiveSignalsPage';
import ProbabilityShiftsPage from './components/pages/ProbabilityShiftsPage';
import SituationMapPage from './components/pages/SituationMapPage';
import LiveMatchesPage from './components/pages/LiveMatchesPage';
import TitleRacesPage from './components/pages/TitleRacesPage';
import TransfersPage from './components/pages/TransfersPage';
import AlertsPage from './components/pages/AlertsPage';
import NewsPage from './components/pages/NewsPage';
import ChatPage from './components/pages/ChatPage';

type View = 'home' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [fading, setFading] = useState(false);
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [shockActive, setShockActive] = useState(true);

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
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'overview':   return <OverviewPage shockActive={shockActive} />;
      case 'signals':    return <LiveSignalsPage />;
      case 'shifts':     return <ProbabilityShiftsPage />;
      case 'map':        return <SituationMapPage />;
      case 'matches':    return <LiveMatchesPage />;
      case 'titles':     return <TitleRacesPage />;
      case 'transfers':  return <TransfersPage />;
      case 'alerts':     return <AlertsPage />;
      case 'news':       return <NewsPage />;
      case 'chat':       return <ChatPage />;
      default:           return <OverviewPage shockActive={shockActive} />;
    }
  };

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
          <DashboardLayout
            activePage={activePage}
            onPageChange={setActivePage}
            onBackHome={handleBackHome}
            shockActive={shockActive}
            onSimulateShock={handleSimulateShock}
          >
            {renderPage()}
          </DashboardLayout>
        )}
      </Box>
    </ThemeProvider>
  );
}
