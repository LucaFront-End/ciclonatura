"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Navigation, 
  Radio, 
  Layers,
  MapPin,
  CheckCircle2,
  Truck
} from "lucide-react";

// Real highway coordinates and checkpoints for Ciclonatura
const ROUTE_DATA = {
  "CN-849201": {
    name: "Cuernavaca (SMyT) ➔ Polanco (CDMX)",
    highway: "Autopista 95D México-Cuernavaca ➔ Periférico",
    distance: "88 km",
    duration: "1h 10m",
    speed: "64 km/h",
    currentLocation: "Periférico Sur / San Jerónimo",
    checkpoints: [
      { name: "SMyT Cuernavaca", coords: [18.9261, -99.2307], type: "start", label: "Origen" },
      { name: "Caseta Tlalpan (Km 23)", coords: [19.2680, -99.1670], type: "checkpoint", label: "Peaje" },
      { name: "Periférico Sur", coords: [19.3300, -99.2150], type: "courier", label: "En Tránsito" },
      { name: "Polanco V Secc.", coords: [19.4326, -99.1912], type: "end", label: "Destino" }
    ],
    path: [
      [18.9261, -99.2307],
      [18.9850, -99.2290],
      [19.0560, -99.2435], // Tres Marías
      [19.1450, -99.2100], // Parres
      [19.2250, -99.1820], // Topilejo
      [19.2680, -99.1670], // Caseta Tlalpan
      [19.2950, -99.1550], // Viaducto Tlalpan
      [19.3300, -99.2150], // Periférico Sur (Courier)
      [19.3700, -99.1900], // Mixcoac
      [19.4050, -99.1930], // Tacubaya
      [19.4326, -99.1912], // Polanco
    ]
  },
  "CN-730194": {
    name: "Toluca (Centro) ➔ Sede Tlalpan (CDMX)",
    highway: "Autopista México-Toluca 15D ➔ Insurgentes",
    distance: "64 km",
    duration: "55m",
    speed: "42 km/h",
    currentLocation: "Módulo SEMOVI Insurgentes",
    checkpoints: [
      { name: "Toluca Movilidad", coords: [19.2826, -99.6557], type: "start", label: "Origen" },
      { name: "Caseta La Marquesa", coords: [19.3100, -99.3700], type: "checkpoint", label: "Peaje" },
      { name: "SEMOVI Insurgentes", coords: [19.3734, -99.1765], type: "courier", label: "En Módulo" },
      { name: "Sede Notarial Tlalpan", coords: [19.3498, -99.1432], type: "end", label: "Destino" }
    ],
    path: [
      [19.2826, -99.6557],
      [19.2900, -99.5100],
      [19.3100, -99.3700],
      [19.3600, -99.2600],
      [19.3734, -99.1765],
      [19.3498, -99.1432]
    ]
  },
  "CN-604812": {
    name: "Sede Tlalpan (CDMX) ➔ Naucalpan (EdoMéx)",
    highway: "Viaducto ➔ Periférico Norte B2B",
    distance: "38 km",
    duration: "45m",
    speed: "50 km/h",
    currentLocation: "Periférico Norte / Toreo",
    checkpoints: [
      { name: "Bóveda Tlalpan", coords: [19.3498, -99.1432], type: "start", label: "Origen" },
      { name: "Viaducto / Patriotismo", coords: [19.3950, -99.1750], type: "checkpoint", label: "Ruta B2B" },
      { name: "Periférico Norte", coords: [19.4520, -99.2210], type: "courier", label: "En Tránsito" },
      { name: "Parque Industrial Naucalpan", coords: [19.4650, -99.2350], type: "end", label: "Destino" }
    ],
    path: [
      [19.3498, -99.1432],
      [19.3950, -99.1750],
      [19.4180, -99.1920],
      [19.4520, -99.2210],
      [19.4650, -99.2350]
    ]
  }
};

// Helper: compute segment lengths and total distance along coordinates
function getPathMetrics(path) {
  if (!path || path.length < 2) return { totalDist: 0, segments: [] };
  const segments = [];
  let totalDist = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const [lat1, lon1] = path[i];
    const [lat2, lon2] = path[i + 1];
    const dLat = (lat2 - lat1);
    const dLon = (lon2 - lon1) * Math.cos(((lat1 + lat2) * Math.PI) / 360);
    const dist = Math.hypot(dLat, dLon);
    segments.push({ dist, from: path[i], to: path[i + 1] });
    totalDist += dist;
  }
  return { totalDist, segments };
}

// Helper: interpolate coordinates and calculate bearing in degrees
function getPointAtProgress(pathMetrics, progress) {
  const { totalDist, segments } = pathMetrics;
  if (!segments.length) return { coords: [19.25, -99.2], bearing: 0, segmentIndex: 0 };

  const targetDist = Math.max(0, Math.min(progress, 1)) * totalDist;
  let accumulated = 0;

  for (let i = 0; i < segments.length; i++) {
    const { dist, from, to } = segments[i];
    if (accumulated + dist >= targetDist || i === segments.length - 1) {
      const segT = dist === 0 ? 0 : Math.min(Math.max((targetDist - accumulated) / dist, 0), 1);
      const curLat = from[0] + (to[0] - from[0]) * segT;
      const curLon = from[1] + (to[1] - from[1]) * segT;

      // Calculate bearing (forward azimuth in degrees)
      const dLon = ((to[1] - from[1]) * Math.PI) / 180;
      const lat1Rad = (from[0] * Math.PI) / 180;
      const lat2Rad = (to[0] * Math.PI) / 180;
      const y = Math.sin(dLon) * Math.cos(lat2Rad);
      const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
      const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

      return { coords: [curLat, curLon], bearing, segmentIndex: i };
    }
    accumulated += dist;
  }

  return { coords: segments[segments.length - 1].to, bearing: 0, segmentIndex: segments.length - 1 };
}

export default function MinimalistRouteMap({ folio = "CN-849201" }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const animationRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [liveLocation, setLiveLocation] = useState("");

  const activeRoute = ROUTE_DATA[folio] || ROUTE_DATA["CN-849201"];

  // Initialize Map with 100% Free OpenStreetMap & Clean Grayscale Monochrome Filter
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [19.25, -99.2],
      zoom: 10,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
    });

    // Completely Open & Free Tiles (NO API KEY REQUIRED)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      subdomains: ["a", "b", "c"],
      className: "minimalist-osm-tiles",
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    map.on("zoomend", () => {
      setZoomLevel(map.getZoom());
    });

    // Invalidate size to ensure clean tile rendering inside rounded cards
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    // Auto-resize whenever the container changes size
    let resizeObserver = null;
    if (window.ResizeObserver && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Route, Markers, and Driving Animation when selected folio changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup || !activeRoute) return;

    // Stop any existing animation
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

    layerGroup.clearLayers();
    setLiveLocation(activeRoute.currentLocation);

    // 1. Double-Layer Route Line + Animated Neon Dash Layer
    // Layer A: Soft Lime Underlay Glow
    const glowLine = L.polyline(activeRoute.path, {
      color: "#AFF94F",
      weight: 6,
      opacity: 0.85,
      lineCap: "round",
      lineJoin: "round",
    });

    // Layer B: Obsidian Core Line
    const coreLine = L.polyline(activeRoute.path, {
      color: "#0f172a",
      weight: 3.5,
      opacity: 0.95,
      lineCap: "round",
      lineJoin: "round",
    });

    // Layer C: Dynamic Flow Dash Animation
    const dashLine = L.polyline(activeRoute.path, {
      color: "#AFF94F",
      weight: 2,
      opacity: 0.9,
      dashArray: "6, 14",
      className: "animated-highway-dash",
      lineCap: "round",
    });

    glowLine.addTo(layerGroup);
    coreLine.addTo(layerGroup);
    dashLine.addTo(layerGroup);

    // 2. Static Checkpoints (Origin, Peajes, and Destination)
    activeRoute.checkpoints
      .filter((cp) => cp.type !== "courier") // The courier is handled by the animated live vehicle
      .forEach((cp) => {
        let iconHtml = "";

        if (cp.type === "start") {
          iconHtml = `
            <div class="relative cursor-pointer select-none" style="transform: translate(-50%, -50%);">
              <div class="bg-white text-slate-900 border-2 border-slate-900 px-2.5 py-1 rounded-full shadow-lg font-mono text-[10px] font-black whitespace-nowrap flex items-center gap-1.5 transition-transform hover:scale-105">
                <span class="w-2 h-2 rounded-full bg-slate-900"></span>
                <span>🏛️ ${cp.name}</span>
                <span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider">(${cp.label})</span>
              </div>
            </div>
          `;
        } else if (cp.type === "end") {
          iconHtml = `
            <div class="relative cursor-pointer select-none" style="transform: translate(-50%, -50%);">
              <div class="bg-[#AFF94F] text-slate-950 border-2 border-slate-950 px-2.5 py-1 rounded-full shadow-xl font-mono text-[10px] font-black whitespace-nowrap flex items-center gap-1.5 transition-transform hover:scale-105">
                <span>📍 ${cp.name}</span>
                <span class="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse"></span>
              </div>
            </div>
          `;
        } else {
          iconHtml = `
            <div class="relative group cursor-pointer select-none" style="transform: translate(-50%, -50%);">
              <div class="bg-white/95 backdrop-blur-md text-slate-800 border border-slate-300 px-2 py-0.5 rounded-full shadow-md font-mono text-[9px] font-bold whitespace-nowrap flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>💳 ${cp.name}</span>
              </div>
            </div>
          `;
        }

        const marker = L.marker(cp.coords, {
          icon: L.divIcon({
            className: "custom-leaflet-marker",
            html: iconHtml,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        });

        marker.addTo(layerGroup);
      });

    // 3. Dedicated Live Animated Courier Vehicle ("El Camioncito")
    const pathMetrics = getPathMetrics(activeRoute.path);
    let progress = 0.45; // Starts in active transit along the highway
    let isPaused = false;

    const initialPoint = getPointAtProgress(pathMetrics, progress);

    // Custom High-End Delivery Transporter SVG Icon with Headlight Projection & Sonar Radar
    const courierIconHtml = `
      <div class="courier-vehicle-wrapper relative w-[60px] h-[60px] flex items-center justify-center select-none" style="pointer-events: auto;">
        
        <!-- Expanding Sonar Radar Wave 1 -->
        <div class="absolute w-10 h-10 rounded-full bg-[#AFF94F]/35 animate-ping pointer-events-none" style="animation-duration: 2.2s;"></div>
        
        <!-- Expanding Sonar Radar Wave 2 -->
        <div class="absolute w-12 h-12 rounded-full border border-[#AFF94F]/50 animate-pulse pointer-events-none"></div>

        <!-- Rotating Vehicle Core (Follows road heading angle) -->
        <div id="courier-heading-wrapper" class="relative w-8 h-12 flex items-center justify-center pointer-events-none" style="transform: rotate(${Math.round(initialPoint.bearing)}deg); transform-origin: center center; transition: transform 0.12s linear;">
          
          <!-- Forward Headlight Cones (Shines ahead along the highway) -->
          <div class="absolute bottom-[22px] left-1/2 -translate-x-1/2 w-12 h-16 pointer-events-none"
               style="background: linear-gradient(to top, rgba(175, 249, 79, 0.45) 0%, rgba(175, 249, 79, 0.15) 60%, transparent 100%); clip-path: polygon(30% 100%, 70% 100%, 100% 0%, 0% 0%); filter: blur(1.5px);">
          </div>

          <!-- Executive Courier Transporter Body -->
          <div class="relative z-10 w-6 h-10 bg-slate-950 rounded-md border-2 border-[#AFF94F] shadow-[0_0_14px_rgba(175,249,79,0.7)] flex flex-col items-center justify-between p-0.5">
            
            <!-- Windshield & Dual Projector Headlights -->
            <div class="w-full flex flex-col items-center">
              <div class="w-full flex justify-between px-0.5 -mt-0.5">
                <span class="w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#AFF94F]"></span>
                <span class="w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#AFF94F]"></span>
              </div>
              <div class="w-4 h-2 bg-[#AFF94F] rounded-t-xs mt-0.5 opacity-90"></div>
            </div>

            <!-- Central Sat-Link Beacon -->
            <div class="w-2.5 h-1 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <span class="w-1 h-1 rounded-full bg-[#AFF94F] animate-pulse"></span>
            </div>

            <!-- Rear LED Taillights -->
            <div class="w-full flex justify-between px-0.5 mb-0.5">
              <span class="w-1 h-0.5 rounded-xs bg-red-500 shadow-[0_0_4px_#ef4444]"></span>
              <span class="w-1 h-0.5 rounded-xs bg-red-500 shadow-[0_0_4px_#ef4444]"></span>
            </div>

          </div>
        </div>

        <!-- Telemetry Badge (Stays horizontal, centered, and fully readable) -->
        <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-30">
          <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/95 backdrop-blur-md border border-[#AFF94F]/70 text-[9px] font-mono text-white shadow-xl">
            <span class="w-1.5 h-1.5 rounded-full bg-[#AFF94F] animate-pulse"></span>
            <span class="font-black text-[#AFF94F]">UNIDAD EN RUTA</span>
            <span class="text-slate-400">•</span>
            <span class="text-white font-bold">${activeRoute.speed}</span>
          </div>
        </div>

      </div>
    `;

    const courierMarker = L.marker(initialPoint.coords, {
      icon: L.divIcon({
        className: "custom-leaflet-courier",
        html: courierIconHtml,
        iconSize: [60, 60],
        iconAnchor: [30, 30],
      }),
      zIndexOffset: 1000,
    });

    courierMarker.addTo(layerGroup);

    // 4. Smooth 60fps RequestAnimationFrame Driving Loop along Highway
    let lastTime = null;

    const animateVehicle = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      if (!isPaused && pathMetrics.totalDist > 0) {
        // Cruising speed: ~22 seconds for entire highway trip
        const deltaProgress = deltaTime / 22000;
        progress += deltaProgress;

        if (progress >= 0.98) {
          progress = 0.98;
          isPaused = true;
          // Arrived at destination: pause briefly, then restart patrolling smoothly
          pauseTimeoutRef.current = setTimeout(() => {
            progress = 0.05;
            isPaused = false;
          }, 1800);
        }

        const point = getPointAtProgress(pathMetrics, progress);
        courierMarker.setLatLng(point.coords);

        // Update rotation to follow road curve
        const headingEl = document.getElementById("courier-heading-wrapper");
        if (headingEl) {
          headingEl.style.transform = `rotate(${Math.round(point.bearing)}deg)`;
        }
      }

      animationRef.current = requestAnimationFrame(animateVehicle);
    };

    animationRef.current = requestAnimationFrame(animateVehicle);

    // 5. Smooth Camera Fly-To bounds of path
    const bounds = L.latLngBounds(activeRoute.path);
    map.flyToBounds(bounds, {
      padding: [45, 45],
      duration: 0.9,
      maxZoom: 13,
    });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [activeRoute]);

  // Zoom controls
  const handleZoom = (dir) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (dir === "in") map.zoomIn();
    else map.zoomOut();
  };

  const handleFit = () => {
    const map = mapInstanceRef.current;
    if (!map || !activeRoute) return;
    const bounds = L.latLngBounds(activeRoute.path);
    map.flyToBounds(bounds, { padding: [45, 45], duration: 0.8 });
  };

  const handleCountryView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([23.6345, -102.5528], 5, { duration: 1.0 });
  };

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 select-none shadow-inner">
      
      {/* Grayscale CSS Filter Rule injected for OpenStreetMap tiles & Highway Animation */}
      <style>{`
        .minimalist-osm-tiles {
          filter: grayscale(100%) contrast(85%) brightness(105%) !important;
        }
        .leaflet-container {
          background: #f8fafc !important;
          font-family: inherit;
        }
        .custom-leaflet-courier {
          background: transparent !important;
          border: none !important;
        }
        .animated-highway-dash {
          animation: highwayDash 1.4s linear infinite;
        }
        @keyframes highwayDash {
          from {
            stroke-dashoffset: 40;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* Top Floating Telemetry Strip */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-mono font-bold text-slate-800 shadow-sm pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#65a30d] shadow-[0_0_6px_#AFF94F] animate-pulse" />
          <Radio size={12} className="text-slate-900" />
          <span>GPS EN VIVO</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 text-white text-xs font-mono font-bold shadow-sm pointer-events-auto">
          <Navigation size={11} className="text-[#AFF94F]" />
          <span>{activeRoute.highway}</span>
        </div>
      </div>

      {/* Top Right Camera Presets */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-slate-200 shadow-sm">
        <button
          type="button"
          onClick={handleFit}
          className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-[#AFF94F] text-slate-950 shadow-2xs hover:bg-[#9ee83e] transition-colors cursor-pointer"
          title="Centrar en el recorrido activo"
        >
          Enfoque Ruta
        </button>

        <button
          type="button"
          onClick={handleCountryView}
          className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
          title="Ver toda la República Mexicana"
        >
          <Layers size={11} />
          <span>México</span>
        </button>
      </div>

      {/* Floating Zoom Buttons (+ / - / Reset) */}
      <div className="absolute right-3 bottom-14 z-[1000] flex flex-col items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-slate-200 shadow-md">
        <button
          type="button"
          onClick={() => handleZoom("in")}
          title="Acercar (+)"
          className="w-7 h-7 rounded-xl bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ZoomIn size={14} />
        </button>

        <div className="px-1 py-0.5 text-[9px] font-mono font-bold text-slate-400 border-y border-slate-100 text-center w-full">
          Z{zoomLevel}
        </div>

        <button
          type="button"
          onClick={() => handleZoom("out")}
          title="Alejar (-)"
          className="w-7 h-7 rounded-xl bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ZoomOut size={14} />
        </button>

        <button
          type="button"
          onClick={handleFit}
          title="Reajustar a la ruta"
          className="w-7 h-7 rounded-xl hover:bg-[#AFF94F] text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer border-t border-slate-100"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {/* Leaflet Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Bottom Route Summary Banner */}
      <div className="absolute bottom-3 left-3 z-[1000] flex items-center gap-2 text-xs font-mono text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#65a30d]" />
        <span>📍 {activeRoute.currentLocation}</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-900 font-bold">{activeRoute.distance}</span>
        <span className="text-slate-300">•</span>
        <span className="text-[#65a30d] font-bold">{activeRoute.speed}</span>
      </div>

    </div>
  );
}
