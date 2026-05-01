import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type MapSignal } from '../data/mapSignals';
import SignalDot from './SignalDot';
import { C } from '../colors';

interface Props {
  signals: MapSignal[];
  selectedSignal: MapSignal | null;
  onSelectSignal: (s: MapSignal) => void;
}

// Simplified equirectangular world map (viewBox 0 0 1000 500)
// x = (lng + 180) / 360 * 1000, y = (90 - lat) / 180 * 500
function WorldMap() {
  return (
    <svg
      viewBox="0 0 1000 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ocean fill */}
      <rect width="1000" height="500" fill="#060d0b" />

      {/* Graticule lines (subtle grid) */}
      {[-60, -30, 0, 30, 60].map(lat => {
        const y = (90 - lat) / 180 * 500;
        return <line key={lat} x1="0" y1={y} x2="1000" y2={y} stroke="#0f2a20" strokeWidth="0.5" />;
      })}
      {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map(lng => {
        const x = (lng + 180) / 360 * 1000;
        return <line key={lng} x1={x} y1="0" x2={x} y2="500" stroke="#0f2a20" strokeWidth="0.5" />;
      })}

      {/* North America */}
      <path
        d="M 50,60 L 80,40 L 130,35 L 170,30 L 210,40 L 240,55 L 255,75 L 260,100 L 255,130 L 245,155 L 240,175 L 230,195 L 225,215 L 215,225 L 205,240 L 195,250 L 185,255 L 175,260 L 160,255 L 145,245 L 130,230 L 115,210 L 100,190 L 80,170 L 65,145 L 55,120 L 48,95 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Alaska */}
      <path
        d="M 50,60 L 30,55 L 15,65 L 10,80 L 25,85 L 45,80 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Mexico / Central America */}
      <path
        d="M 205,240 L 215,250 L 218,265 L 210,275 L 200,270 L 193,260 L 195,250 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* Greenland */}
      <path
        d="M 255,25 L 280,18 L 305,22 L 315,38 L 310,55 L 290,65 L 268,60 L 250,45 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* South America */}
      <path
        d="M 215,255 L 235,245 L 255,248 L 270,258 L 285,275 L 300,305 L 310,335 L 315,365 L 308,395 L 295,420 L 275,445 L 255,455 L 235,448 L 218,430 L 208,405 L 205,375 L 205,345 L 205,310 L 208,280 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* Western Europe */}
      <path
        d="M 448,148 L 458,130 L 470,125 L 485,128 L 498,135 L 510,130 L 522,128 L 535,132 L 545,142 L 548,155 L 542,168 L 530,178 L 515,185 L 500,188 L 488,192 L 475,195 L 462,190 L 452,180 L 445,168 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Iberian Peninsula */}
      <path
        d="M 448,168 L 440,175 L 435,188 L 438,200 L 448,205 L 460,200 L 468,190 L 465,178 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Britain + Ireland */}
      <path
        d="M 455,125 L 462,118 L 472,115 L 480,120 L 478,132 L 468,137 L 458,133 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      <path
        d="M 447,128 L 450,122 L 456,120 L 455,130 L 448,132 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Scandinavia */}
      <path
        d="M 495,100 L 510,85 L 528,80 L 540,85 L 545,100 L 538,118 L 522,128 L 510,130 L 498,135 L 492,120 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Italy */}
      <path
        d="M 500,175 L 510,170 L 520,172 L 525,182 L 520,195 L 512,205 L 505,200 L 498,190 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Eastern Europe / Balkans */}
      <path
        d="M 545,142 L 558,138 L 572,140 L 580,150 L 578,165 L 565,175 L 548,175 L 538,168 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* Africa */}
      <path
        d="M 460,205 L 480,198 L 505,195 L 528,198 L 548,205 L 565,215 L 578,230 L 588,250 L 595,278 L 598,308 L 595,338 L 585,365 L 568,390 L 545,410 L 518,422 L 492,420 L 468,408 L 450,388 L 438,362 L 432,332 L 432,302 L 435,272 L 440,248 L 445,228 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Madagascar */}
      <path
        d="M 588,345 L 595,338 L 600,350 L 598,365 L 590,368 L 584,358 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* Middle East */}
      <path
        d="M 578,165 L 598,158 L 618,160 L 632,170 L 638,185 L 630,200 L 615,210 L 598,212 L 580,205 L 570,192 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Arabian Peninsula */}
      <path
        d="M 598,212 L 615,210 L 632,215 L 645,230 L 648,252 L 638,268 L 618,272 L 600,262 L 590,245 L 588,228 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* Russia / Central Asia */}
      <path
        d="M 548,75 L 580,55 L 630,45 L 690,40 L 748,42 L 800,50 L 840,60 L 860,75 L 855,95 L 835,108 L 805,115 L 770,118 L 735,115 L 700,112 L 660,110 L 625,108 L 590,110 L 560,115 L 545,108 L 542,92 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Kazakhstan / Siberia extension */}
      <path
        d="M 620,108 L 650,115 L 680,118 L 700,130 L 695,148 L 675,158 L 652,155 L 632,145 L 618,132 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* India */}
      <path
        d="M 665,178 L 685,172 L 700,175 L 710,190 L 715,210 L 710,235 L 698,255 L 682,262 L 668,255 L 658,238 L 655,215 L 658,195 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* China / East Asia */}
      <path
        d="M 700,112 L 740,108 L 780,110 L 810,118 L 825,132 L 820,152 L 805,168 L 782,178 L 755,182 L 730,178 L 710,168 L 698,152 L 695,135 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Korean Peninsula + Japan */}
      <path
        d="M 825,132 L 840,128 L 852,135 L 850,148 L 838,155 L 825,150 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      <path
        d="M 858,125 L 865,118 L 872,122 L 875,135 L 870,145 L 860,140 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* Southeast Asia */}
      <path
        d="M 755,182 L 782,178 L 800,185 L 812,200 L 808,218 L 790,228 L 770,225 L 752,212 L 748,198 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* Indochina */}
      <path
        d="M 770,225 L 790,228 L 802,242 L 798,258 L 782,262 L 768,252 L 762,238 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* Australia */}
      <path
        d="M 775,315 L 810,308 L 848,312 L 878,325 L 900,345 L 905,372 L 895,398 L 872,415 L 840,422 L 805,418 L 775,400 L 755,378 L 748,352 L 752,328 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />
      {/* New Zealand */}
      <path
        d="M 918,388 L 925,380 L 930,390 L 925,400 L 916,396 Z"
        fill="#0d2318" stroke="#1a3d2a" strokeWidth="0.8"
      />

      {/* Equator line */}
      <line x1="0" y1="250" x2="1000" y2="250" stroke="#0e2d1e" strokeWidth="1" strokeDasharray="4,8" />
    </svg>
  );
}

export default function FootballSignalMap({ signals, selectedSignal, onSelectSignal }: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        bgcolor: '#050d0a',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 50% 60%, rgba(14,40,28,0.6) 0%, #050d0a 70%)
        `,
      }}
    >
      {/* SVG world map */}
      <WorldMap />

      {/* Vignette overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(5,13,10,0.7) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Signal dots */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 3 }}>
        {signals.map(s => (
          <SignalDot
            key={s.id}
            signal={s}
            selected={selectedSignal?.id === s.id}
            onClick={onSelectSignal}
          />
        ))}
      </Box>

      {/* Corner label */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 14,
          left: 16,
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: C.accent, boxShadow: `0 0 8px ${C.accent}` }} />
        <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em' }}>
          LIVE — {signals.length} SIGNALS ACTIVE
        </Typography>
      </Box>
    </Box>
  );
}
