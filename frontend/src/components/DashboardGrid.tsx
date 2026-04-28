import Box from '@mui/material/Box';
import { C } from '../colors';
import ProbabilityIndexChart from './ProbabilityIndexChart';
import GlobalSignalMap from './GlobalSignalMap';
import FeaturedSituationPanel from './FeaturedSituationPanel';
import TopSignalsPanel from './TopSignalsPanel';
import EventImpactHeatMap from './EventImpactHeatMap';
import LiveMatchPanel from './LiveMatchPanel';
import GainersLosersPanel from './GainersLosersPanel';
import TransferVelocityPanel from './TransferVelocityPanel';
import SentimentPulsePanel from './SentimentPulsePanel';

interface Props {
  shockActive: boolean;
  activeFilter: string;
  featuredSignalId: string;
  onSignalSelect: (id: string) => void;
}

export default function DashboardGrid({ shockActive, activeFilter, featuredSignalId, onSignalSelect }: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        p: 1.25,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
        bgcolor: C.bg,
      }}
    >
      {/* Row 1: Chart + Map */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          gap: 1.25,
          height: 260,
          flexShrink: 0,
        }}
      >
        <ProbabilityIndexChart shockActive={shockActive} />
        <GlobalSignalMap />
      </Box>

      {/* Row 2: Featured + Signals + Gainers/Losers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 220px',
          gap: 1.25,
          height: 290,
          flexShrink: 0,
        }}
      >
        <FeaturedSituationPanel signalId={featuredSignalId} shockActive={shockActive} />
        <TopSignalsPanel
          activeFilter={activeFilter}
          onSelectSignal={onSignalSelect}
          selectedId={featuredSignalId}
        />
        <GainersLosersPanel shockActive={shockActive} />
      </Box>

      {/* Row 3: Heatmap + Live Match + Transfer + Sentiment */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 1.25,
          height: 240,
          flexShrink: 0,
        }}
      >
        <EventImpactHeatMap />
        <LiveMatchPanel />
        <TransferVelocityPanel />
        <SentimentPulsePanel />
      </Box>
    </Box>
  );
}
