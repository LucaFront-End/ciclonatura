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
              <div class="bg-white text-slate-900 border border-slate-900 px-2 py-0.5 rounded-full shadow-sm font-mono text-[10px] font-bold whitespace-nowrap flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span>${cp.name.split(' ')[0]}</span>
              </div>
            </div>
          `;
        } else if (cp.type === "end") {
          iconHtml = `
            <div class="relative cursor-pointer select-none" style="transform: translate(-50%, -50%);">
              <div class="bg-[#AFF94F] text-slate-950 border border-slate-950 px-2 py-0.5 rounded-full shadow-sm font-mono text-[10px] font-bold whitespace-nowrap flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                <span>${cp.name.split(' ')[0]}</span>
              </div>
            </div>
          `;
        }

        if (iconHtml) {
          const marker = L.marker(cp.coords, {
            icon: L.divIcon({
              className: "custom-leaflet-marker",
              html: iconHtml,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            }),
          });
          marker.addTo(layerGroup);
        }
      });

    // 3. Dedicated Minimalist Animated Vehicle ("El Camioncito")
    const pathMetrics = getPathMetrics(activeRoute.path);
    let progress = 0.45;
    let isPaused = false;

    const initialPoint = getPointAtProgress(pathMetrics, progress);

    // Pure Minimalist Delivery Transporter with Headlights and Soft Sonar Halo
    const courierIconHtml = `
      <div class="relative w-[48px] h-[48px] flex items-center justify-center select-none" style="pointer-events: auto;">
        
        {/* Soft Sonar Pulse */}
        <div class="absolute w-8 h-8 rounded-full bg-[#AFF94F]/30 animate-ping pointer-events-none" style="animation-duration: 2.5s;"></div>
        
        {/* Rotating Vehicle & Headlight Core */}
        <div id="courier-heading-wrapper" class="relative w-6 h-10 flex items-center justify-center pointer-events-none" style="transform: rotate(${Math.round(initialPoint.bearing)}deg); transform-origin: center center; transition: transform 0.12s linear;">
          
          {/* Subtle Headlight Cone */}
          <div class="absolute bottom-[16px] left-1/2 -translate-x-1/2 w-8 h-12 pointer-events-none"
               style="background: linear-gradient(to top, rgba(175, 249, 79, 0.4) 0%, transparent 100%); clip-path: polygon(30% 100%, 70% 100%, 100% 0%, 0% 0%); filter: blur(1px);">
          </div>

          {/* Clean Vector Vehicle Silhouette */}
          <div class="relative z-10 w-4.5 h-7.5 bg-slate-950 rounded-sm border border-[#AFF94F] shadow-md flex flex-col items-center justify-between p-0.5">
            <div class="w-full flex justify-between px-0.5 -mt-0.5">
              <span class="w-0.5 h-0.5 rounded-full bg-white"></span>
              <span class="w-0.5 h-0.5 rounded-full bg-white"></span>
            </div>
            <div class="w-3 h-1.5 bg-[#AFF94F] rounded-t-xs opacity-90"></div>
            <div class="w-full flex justify-between px-0.5">
              <span class="w-0.5 h-0.5 bg-red-500 rounded-xs"></span>
              <span class="w-0.5 h-0.5 bg-red-500 rounded-xs"></span>
            </div>
          </div>

        </div>

      </div>
    `;

    const courierMarker = L.marker(initialPoint.coords, {
      icon: L.divIcon({
        className: "custom-leaflet-courier",
        html: courierIconHtml,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
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
        // Cruising speed
        const deltaProgress = deltaTime / 24000;
        progress += deltaProgress;

        if (progress >= 0.98) {
          progress = 0.98;
          isPaused = true;
          pauseTimeoutRef.current = setTimeout(() => {
            progress = 0.05;
            isPaused = false;
          }, 1800);
        }

        const point = getPointAtProgress(pathMetrics, progress);
        courierMarker.setLatLng(point.coords);

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
      padding: [35, 35],
      duration: 0.8,
      maxZoom: 13,
    });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [activeRoute]);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 select-none">
      
      {/* Grayscale CSS Filter Rule injected for OpenStreetMap tiles */}
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

      {/* Pure, Clean Leaflet Map DOM Element (No overlay clutter) */}
      <div ref={mapContainerRef} className="w-full h-full" />

    </div>
  );
}
