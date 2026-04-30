import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import LiveTicker from './LiveTicker';
import type { PageId } from './Sidebar';
import type { ReactNode } from 'react';
import { C } from '../../colors';

interface Props {
  activePage: PageId;
  onPageChange: (id: PageId) => void;
  onBackHome?: () => void;
  shockActive: boolean;
  onSimulateShock: () => void;
  children: ReactNode;
}

export default function DashboardLayout({
  activePage,
  onPageChange,
  onBackHome,
  shockActive,
  onSimulateShock,
  children,
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        bgcolor: C.bg,
      }}
    >
      <Sidebar active={activePage} onSelect={onPageChange} onBackHome={onBackHome} />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0, minHeight: 0 }}>
        <TopHeader shockActive={shockActive} onSimulateShock={onSimulateShock} onBackHome={onBackHome} />
        <LiveTicker />

        {/* Page content */}
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
