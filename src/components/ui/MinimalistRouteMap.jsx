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

export default function MinimalistRouteMap({ folio = "CN-849201" }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(10);

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

  // Update Route and Markers when selected folio changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup || !activeRoute) return;

    layerGroup.clearLayers();

    // 1. Draw Double-Layer Route Line
    // Glow underline (Lime)
    const glowLine = L.polyline(activeRoute.path, {
      color: "#AFF94F",
      weight: 6,
      opacity: 0.85,
      lineCap: "round",
      lineJoin: "round",
    });

    // Solid core line (Dark obsidian)
    const coreLine = L.polyline(activeRoute.path, {
      color: "#0f172a",
      weight: 3,
      opacity: 0.95,
      lineCap: "round",
      lineJoin: "round",
    });

    glowLine.addTo(layerGroup);
    coreLine.addTo(layerGroup);

    // 2. Add Clean Minimalist Markers
    activeRoute.checkpoints.forEach((cp) => {
      let iconHtml = "";

      if (cp.type === "start") {
        iconHtml = `
          <div class="relative group cursor-pointer" style="transform: translate(-50%, -50%);">
            <div class="bg-white text-slate-900 border-2 border-slate-900 px-2 py-0.5 rounded-full shadow-md font-mono text-[10px] font-black whitespace-nowrap flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
              <span>${cp.name}</span>
            </div>
          </div>
        `;
      } else if (cp.type === "end") {
        iconHtml = `
          <div class="relative group cursor-pointer" style="transform: translate(-50%, -50%);">
            <div class="bg-[#AFF94F] text-slate-950 border-2 border-slate-950 px-2.5 py-0.5 rounded-full shadow-md font-mono text-[10px] font-black whitespace-nowrap flex items-center gap-1">
              <span>📍 ${cp.name}</span>
            </div>
          </div>
        `;
      } else if (cp.type === "courier") {
        iconHtml = `
          <div class="relative cursor-pointer" style="transform: translate(-50%, -50%);">
            <div class="absolute -inset-2 rounded-full bg-[#AFF94F] animate-ping opacity-75"></div>
            <div class="relative bg-slate-950 text-[#AFF94F] border-2 border-[#AFF94F] px-2.5 py-1 rounded-full shadow-lg font-mono text-[11px] font-black whitespace-nowrap flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#AFF94F] animate-pulse"></span>
              <span>🚚 En Tránsito</span>
            </div>
          </div>
        `;
      } else {
        iconHtml = `
          <div class="relative group cursor-pointer" style="transform: translate(-50%, -50%);">
            <div class="w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-800 shadow-xs"></div>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-slate-900 text-white text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              ${cp.name}
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

    // 3. Smooth Camera Fly-To bounds of path
    const bounds = L.latLngBounds(activeRoute.path);
    map.flyToBounds(bounds, {
      padding: [45, 45],
      duration: 0.9,
      maxZoom: 13,
    });
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
      
      {/* Grayscale CSS Filter Rule injected for OpenStreetMap tiles */}
      <style>{`
        .minimalist-osm-tiles {
          filter: grayscale(100%) contrast(85%) brightness(105%) !important;
        }
        .leaflet-container {
          background: #f8fafc !important;
          font-family: inherit;
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
