import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { MAP_SIGNALS, type MapSignal, type LayerId } from '../data/mapSignals';
import TerminalHeader from './TerminalHeader';
import MapSidebar from './MapSidebar';
import FootballSignalMap from './FootballSignalMap';
import SignalDetailPanel from './SignalDetailPanel';
import RecentSignalsBar from './RecentSignalsBar';

interface Props {
  onBackHome: () => void;
}

export default function MapTerminal({ onBackHome }: Props) {
  const [activeLayer, setActiveLayer] = useState<LayerId>('all');
  const [selectedSignal, setSelectedSignal] = useState<MapSignal | null>(null);

  const filteredSignals = useMemo(() => {
    if (activeLayer === 'all') return MAP_SIGNALS;
    return MAP_SIGNALS.filter(s => s.type === activeLayer);
  }, [activeLayer]);

  function handleSelectSignal(s: MapSignal) {
    setSelectedSignal(prev => prev?.id === s.id ? null : s);
  }

  function handleClosePanel() {
    setSelectedSignal(null);
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: '#050d0a' }}>
      {/* Top header */}
      <TerminalHeader signalCount={2481} />

      {/* Main area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left sidebar */}
        <MapSidebar
          activeLayer={activeLayer}
          onLayerChange={layer => {
            setActiveLayer(layer);
            setSelectedSignal(null);
          }}
          onBackHome={onBackHome}
        />

        {/* Map */}
        <FootballSignalMap
          signals={filteredSignals}
          selectedSignal={selectedSignal}
          onSelectSignal={handleSelectSignal}
        />

        {/* Right detail panel */}
        {selectedSignal && (
          <SignalDetailPanel
            signal={selectedSignal}
            onClose={handleClosePanel}
          />
        )}
      </Box>

      {/* Bottom recent signals bar */}
      <RecentSignalsBar
        signals={filteredSignals}
        selectedSignal={selectedSignal}
        onSelect={handleSelectSignal}
      />
    </Box>
  );
}
