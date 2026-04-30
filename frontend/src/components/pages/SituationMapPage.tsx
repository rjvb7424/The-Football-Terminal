import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { C } from '../../colors';
import { SITUATION_POINTS, pointColor, type SituationPoint } from '../../data/situationMap';
import PageHeader from '../shared/PageHeader';

function markerIcon(point: SituationPoint) {
  const color = pointColor(point);
  const sign = point.impact > 0 ? '+' : '';

  return L.divIcon({
    className: 'situation-marker',
    html: `
      <div class="situation-marker__pulse" style="border-color:${color}; background:${color}18"></div>
      <div class="situation-marker__core" style="background:${color}; color:#050807">${sign}${point.impact}</div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -18],
  });
}

function popupHtml(point: SituationPoint) {
  const color = pointColor(point);
  const sign = point.impact > 0 ? '+' : '';

  return `
    <div class="situation-popup">
      <div class="situation-popup__meta" style="color:${color}">${point.type.toUpperCase()} · ${point.minutesAgo}M AGO</div>
      <div class="situation-popup__title">${point.event}</div>
      <div class="situation-popup__club">${point.club} · ${point.city}</div>
      <div class="situation-popup__impact" style="color:${color}">${sign}${point.impact}pp impact</div>
    </div>
  `;
}

export default function SituationMapPage() {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [selectedId, setSelectedId] = useState(SITUATION_POINTS[0].id);
  const selected = SITUATION_POINTS.find(point => point.id === selectedId) ?? SITUATION_POINTS[0];

  useEffect(() => {
    if (!mapElement.current || mapRef.current) return;

    const map = L.map(mapElement.current, {
      center: [49.4, 7.5],
      zoom: 4,
      minZoom: 3,
      maxZoom: 9,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    SITUATION_POINTS.forEach(point => {
      const marker = L.marker([point.lat, point.lng], { icon: markerIcon(point), riseOnHover: true })
        .addTo(map)
        .bindPopup(popupHtml(point), {
          closeButton: false,
          className: 'situation-popup-shell',
          maxWidth: 260,
        });

      marker.on('click', () => setSelectedId(point.id));
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const focusPoint = (point: SituationPoint) => {
    setSelectedId(point.id);
    mapRef.current?.flyTo([point.lat, point.lng], 6, { duration: 0.75 });
  };

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader
        title="Situation Map"
        subtitle="Where the football world is moving right now. Europe is in focus by default; zoom out for the wider picture."
        right={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, px: 1.15, py: 0.55, border: `1px solid rgba(84,214,111,0.22)`, borderRadius: '999px', bgcolor: 'rgba(84,214,111,0.055)' }}>
            <Box component="span" className="live-dot" />
            <Typography sx={{ fontSize: '0.62rem', color: C.positive, fontFamily: 'monospace', fontWeight: 850 }}>
              LIVE MAP
            </Typography>
          </Box>
        }
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1fr 340px' }, gap: 3.5 }}>
        <Box
          sx={{
            height: { xs: 520, md: 650 },
            border: `1px solid rgba(46,230,200,0.16)`,
            borderRadius: '14px',
            overflow: 'hidden',
            bgcolor: C.surface,
            position: 'relative',
            boxShadow: '0 24px 80px rgba(0,0,0,0.24)',
          }}
        >
          <Box ref={mapElement} sx={{ position: 'absolute', inset: 0 }} />
          <Box
            sx={{
              position: 'absolute',
              left: 18,
              top: 18,
              px: 1.25,
              py: 0.8,
              bgcolor: 'rgba(5,8,7,0.78)',
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none',
            }}
          >
            <Typography sx={{ fontSize: '0.62rem', color: C.accent, fontFamily: 'monospace', fontWeight: 850, letterSpacing: '0.08em' }}>
              EUROPE SIGNAL VIEW
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '12px', p: 2.4 }}>
            <Typography sx={{ fontSize: '0.68rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.08em', mb: 1.4 }}>
              SELECTED SIGNAL
            </Typography>
            <Typography sx={{ fontSize: '1.18rem', color: C.text1, fontWeight: 830, lineHeight: 1.2, mb: 0.7 }}>
              {selected.event}
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color: C.text2, mb: 1.8 }}>
              {selected.club} · {selected.city}
            </Typography>
            <Typography sx={{ fontSize: '1.45rem', color: pointColor(selected), fontFamily: 'monospace', fontWeight: 850 }}>
              {selected.impact > 0 ? '+' : ''}{selected.impact}pp
            </Typography>
          </Box>

          {SITUATION_POINTS.map(point => (
            <Box
              key={point.id}
              component="button"
              onClick={() => focusPoint(point)}
              sx={{
                width: '100%',
                px: 1.6,
                py: 1.25,
                border: `1px solid ${point.id === selected.id ? 'rgba(46,230,200,0.3)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '9px',
                bgcolor: point.id === selected.id ? 'rgba(46,230,200,0.07)' : C.surface,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 1.25,
                '&:hover': { borderColor: 'rgba(46,230,200,0.22)' },
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.78rem', color: C.text1, fontWeight: 760, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {point.event}
                </Typography>
                <Typography sx={{ fontSize: '0.66rem', color: C.text3, mt: 0.25 }}>
                  {point.city} · {point.minutesAgo}m
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.78rem', color: pointColor(point), fontFamily: 'monospace', fontWeight: 850 }}>
                {point.impact > 0 ? '+' : ''}{point.impact}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
