"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { 
  Radio, 
  Layers, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw,
  Navigation,
  Compass,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Truck,
  Building,
  Flag
} from "lucide-react";
import { BoardDispatch } from "../departures-board";

// Realistic highway trajectories and waypoints for Ciclonatura Mexican operations
export interface RouteWaypoint {
  name: string;
  coords: [number, number]; // [lat, lng]
  time: string;
  desc: string;
  status: "done" | "active" | "pending";
}

export interface DetailedRoute {
  id: string;
  highway: string;
  distanceKm: number;
  estimatedMinutes: number;
  currentSpeed: string;
  currentLocationName: string;
  waypoints: RouteWaypoint[];
  pathCoords: [number, number][];
}

export const DETAILED_ROUTES: Record<string, DetailedRoute> = {
  "CN-849201": {
    id: "CN-849201",
    highway: "Autopista 95D Cuernavaca-México ➔ Periférico Sur ➔ Polanco",
    distanceKm: 88.5,
    estimatedMinutes: 65,
    currentSpeed: "64 km/h en tránsito",
    currentLocationName: "Periférico Poniente / Av. San Jerónimo",
    waypoints: [
      {
        name: "SMyT Cuernavaca (Ventanilla Oficial)",
        coords: [18.9261, -99.2307],
        time: "10:15 hrs",
        desc: "Ingreso de expediente y pago de derechos estatales sellado.",
        status: "done",
      },
      {
        name: "Taller Troquelado SEDENA Morelos",
        coords: [18.9410, -99.2180],
        time: "12:30 hrs",
        desc: "Láminas metálicas emitidas con holograma militar y tarjeta chip RFID.",
        status: "done",
      },
      {
        name: "Caseta de Cobro Tlalpan (Km 23)",
        coords: [19.2680, -99.1670],
        time: "14:45 hrs",
        desc: "Cruce de peaje en valija de seguridad notarial #PC-8891.",
        status: "done",
      },
      {
        name: "Periférico Sur / San Jerónimo",
        coords: [19.3300, -99.2150],
        time: "15:40 hrs (Ahora)",
        desc: "Unidad Express #04 en avance fluido rumbo a Polanco.",
        status: "active",
      },
      {
        name: "Destino: Polanco V Sección (Campos Elíseos)",
        coords: [19.4326, -99.1912],
        time: "16:45 hrs (ETA)",
        desc: "Entrega personal con acuse firmado y factura fiscal CFDI 4.0.",
        status: "pending",
      },
    ],
    pathCoords: [
      [18.9261, -99.2307],
      [18.9410, -99.2180],
      [18.9850, -99.2290],
      [19.0560, -99.2435], // Tres Marías
      [19.1450, -99.2100], // Parres
      [19.2250, -99.1820], // Topilejo
      [19.2680, -99.1670], // Caseta Tlalpan
      [19.2950, -99.1550], // Viaducto Tlalpan
      [19.3300, -99.2150], // Periférico Sur
      [19.3700, -99.1900], // Mixcoac
      [19.4050, -99.1930], // Tacubaya
      [19.4326, -99.1912], // Polanco
    ],
  },
  "CN-730194": {
    id: "CN-730194",
    highway: "Autopista México-Toluca 15D ➔ Santa Fe ➔ Sede Tlalpan",
    distanceKm: 64.2,
    estimatedMinutes: 52,
    currentSpeed: "35 km/h en módulo",
    currentLocationName: "Centro de Movilidad SEMOVI Insurgentes",
    waypoints: [
      {
        name: "Módulo Toluca Centro",
        coords: [19.2826, -99.6557],
        time: "11:30 hrs",
        desc: "Auditoría de secuencia de endosos mercantiles concluida.",
        status: "done",
      },
      {
        name: "Caseta La Marquesa (Km 35)",
        coords: [19.3100, -99.3700],
        time: "13:00 hrs",
        desc: "Traslado en valija de seguridad hacia CDMX.",
        status: "done",
      },
      {
        name: "Módulo Central SEMOVI Insurgentes",
        coords: [19.3734, -99.1765],
        time: "14:20 hrs (Ahora)",
        desc: "Plastificado y chip criptográfico a nombre del nuevo titular.",
        status: "active",
      },
      {
        name: "Sede Notarial Calzada de Tlalpan",
        coords: [19.3498, -99.1432],
        time: "17:00 hrs (ETA)",
        desc: "Ingreso en bóveda notarial y resguardo definitivo.",
        status: "pending",
      },
    ],
    pathCoords: [
      [19.2826, -99.6557],
      [19.2900, -99.5100],
      [19.3100, -99.3700],
      [19.3600, -99.2600],
      [19.3734, -99.1765],
      [19.3498, -99.1432],
    ],
  },
  "CN-915420": {
    id: "CN-915420",
    highway: "Autopista 95D ➔ Supervía Poniente ➔ Santa Fe Corporativo",
    distanceKm: 82.0,
    estimatedMinutes: 60,
    currentSpeed: "En taller de troquelado",
    currentLocationName: "Taller SEDENA Central Cuernavaca",
    waypoints: [
      {
        name: "Dictamen de Baja Padrón Foráneo",
        coords: [18.9261, -99.2307],
        time: "Ayer 11:00 hrs",
        desc: "Certificado de no adeudo vehicular emitido con sello digital.",
        status: "done",
      },
      {
        name: "Taller Central SEDENA Morelos",
        coords: [18.9350, -99.2250],
        time: "Hoy 12:45 hrs (Ahora)",
        desc: "Troquelado metálico bajo estricta norma de seguridad federal.",
        status: "active",
      },
      {
        name: "Supervía Poniente CDMX",
        coords: [19.3350, -99.2300],
        time: "Mañana 09:30 hrs",
        desc: "Ingreso directo a la zona poniente sin cruzar semáforos.",
        status: "pending",
      },
      {
        name: "Entrega: Santa Fe Corporativo",
        coords: [19.3650, -99.2650],
        time: "Mañana 12:00 hrs (ETA)",
        desc: "Recepción en mano con verificación física de la serie alfanumérica.",
        status: "pending",
      },
    ],
    pathCoords: [
      [18.9261, -99.2307],
      [18.9350, -99.2250],
      [19.0560, -99.2435],
      [19.2680, -99.1670],
      [19.3350, -99.2300],
      [19.3650, -99.2650],
    ],
  },
  "CN-604812": {
    id: "CN-604812",
    highway: "Sede Tlalpan ➔ Viaducto ➔ Periférico Norte ➔ Naucalpan",
    distanceKm: 38.0,
    estimatedMinutes: 45,
    currentSpeed: "52 km/h en ruta B2B",
    currentLocationName: "Periférico Norte / Toreo de Cuatro Caminos",
    waypoints: [
      {
        name: "Bóveda Sede Tlalpan CDMX",
        coords: [19.3498, -99.1432],
        time: "09:00 hrs",
        desc: "12 expedientes consolidados con precinto numerado #PC-0042.",
        status: "done",
      },
      {
        name: "Viaducto / Patriotismo",
        coords: [19.3950, -99.1750],
        time: "14:15 hrs",
        desc: "Tránsito en unidad blindada Ciclonatura B2B #02.",
        status: "done",
      },
      {
        name: "Periférico Norte / Toreo",
        coords: [19.4520, -99.2210],
        time: "15:45 hrs (Ahora)",
        desc: "A 15 minutos del parque industrial.",
        status: "active",
      },
      {
        name: "Patio Corporativo Naucalpan",
        coords: [19.4650, -99.2350],
        time: "18:00 hrs (ETA)",
        desc: "Firma de apoderado legal y entrega de 12 tarjetas y CFDI 4.0.",
        status: "pending",
      },
    ],
    pathCoords: [
      [19.3498, -99.1432],
      [19.3950, -99.1750],
      [19.4180, -99.1920],
      [19.4520, -99.2210],
      [19.4650, -99.2350],
    ],
  },
};

// Fallback generator for other dispatches
function getOrCreateRoute(dispatch: BoardDispatch): DetailedRoute {
  if (DETAILED_ROUTES[dispatch.number]) {
    return DETAILED_ROUTES[dispatch.number];
  }

  // Generic realistic fallback connecting regional cities
  return {
    id: dispatch.number,
    highway: `Corredor Interurbano Federal ${dispatch.from} ➔ ${dispatch.to}`,
    distanceKm: 140.0,
    estimatedMinutes: 90,
    currentSpeed: "58 km/h en tránsito",
    currentLocationName: "Carretera Federal de Acceso Metropolitano",
    waypoints: [
      {
        name: `Mesa de Control Origen (${dispatch.from})`,
        coords: [19.3498, -99.1432],
        time: dispatch.departure + " hrs",
        desc: "Revisión documental y cotejo SAT.",
        status: "done",
      },
      {
        name: "Punto de Control & Custodia en Tránsito",
        coords: [19.3800, -99.1700],
        time: "En Curso",
        desc: "Custodia con precinto notarial activo.",
        status: "active",
      },
      {
        name: `Destino Registrado (${dispatch.to})`,
        coords: [19.4326, -99.1912],
        time: dispatch.eta,
        desc: "Recepción formal con acuse notarial firmado.",
        status: "pending",
      },
    ],
    pathCoords: [
      [19.3498, -99.1432],
      [19.3800, -99.1700],
      [19.4326, -99.1912],
    ],
  };
}

export default function RealMexicoMap({
  selectedDispatch,
}: {
  selectedDispatch: BoardDispatch | null;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const [activeWaypointIndex, setActiveWaypointIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(10);

  const currentRoute = selectedDispatch
    ? getOrCreateRoute(selectedDispatch)
    : DETAILED_ROUTES["CN-849201"];

  // Initialize Leaflet Map with CartoDB Positron tiles
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // CartoDB Positron Tile Layer (Ultra Clean, Luxury Minimalist Light Map)
    const map = L.map(mapContainerRef.current, {
      center: [19.25, -99.2], // Center around CDMX - Morelos corridor
      zoom: 10,
      zoomControl: false, // We render custom styled zoom buttons
      attributionControl: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        subdomains: "abcd",
      }
    ).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    map.on("zoomend", () => {
      setZoomLevel(map.getZoom());
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Route Layers, Markers & Waypoints when selected dispatch changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup || !currentRoute) return;

    layerGroup.clearLayers();

    const { pathCoords, waypoints } = currentRoute;

    // 1. Draw Highway Route Polylines
    // Glow underline (brand lime)
    const glowLine = L.polyline(pathCoords, {
      color: "#AFF94F",
      weight: 7,
      opacity: 0.75,
      lineCap: "round",
      lineJoin: "round",
    });

    // Dark solid core highway line
    const coreLine = L.polyline(pathCoords, {
      color: "#0f172a",
      weight: 3.5,
      opacity: 0.9,
      lineCap: "round",
      lineJoin: "round",
    });

    glowLine.addTo(layerGroup);
    coreLine.addTo(layerGroup);

    // 2. Add Waypoint Markers
    waypoints.forEach((wp, index) => {
      const isStart = index === 0;
      const isEnd = index === waypoints.length - 1;
      const isActive = wp.status === "active";

      const iconHtml = `
        <div class="relative group cursor-pointer" style="transform: translate(-50%, -50%);">
          ${
            isActive
              ? `<div class="absolute -inset-2 rounded-full bg-[#AFF94F] animate-ping opacity-60"></div>`
              : ""
          }
          <div class="relative flex items-center justify-center rounded-xl shadow-lg border-2 ${
            isActive
              ? "bg-slate-950 text-white border-[#AFF94F] w-8 h-8 scale-110"
              : isStart
                ? "bg-white text-slate-950 border-slate-900 w-7 h-7"
                : isEnd
                  ? "bg-[#AFF94F] text-slate-950 border-slate-950 w-7 h-7 font-black"
                  : "bg-white text-slate-700 border-slate-300 w-6 h-6 text-xs"
          }">
            ${
              isStart
                ? `<span style="font-weight:900; font-size:11px;">A</span>`
                : isEnd
                  ? `<span style="font-weight:900; font-size:11px;">B</span>`
                  : isActive
                    ? `<span style="font-size:14px;">🚚</span>`
                    : `<span style="font-weight:700; font-size:10px;">0${index + 1}</span>`
            }
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-0.5 rounded-full bg-slate-950 text-white text-[10px] font-mono font-bold whitespace-nowrap shadow-md border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            ${wp.name}
          </div>
        </div>
      `;

      const marker = L.marker(wp.coords, {
        icon: L.divIcon({
          className: "custom-wp-pin",
          html: iconHtml,
          iconSize: [28, 28],
        }),
      });

      marker.on("click", () => {
        setActiveWaypointIndex(index);
        map.flyTo(wp.coords, Math.max(map.getZoom(), 13), { duration: 0.9 });
      });

      marker.addTo(layerGroup);
    });

    // 3. Smooth Camera Fly-To fit bounds of active route
    const bounds = L.latLngBounds(pathCoords);
    map.flyToBounds(bounds, {
      padding: [60, 60],
      duration: 1.1,
      maxZoom: 14,
    });
  }, [currentRoute]);

  // Camera Presets
  const flyToPreset = (preset: "republica" | "centro" | "cdmx-morelos" | "fit") => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (preset === "republica") {
      map.flyTo([23.6345, -102.5528], 5, { duration: 1.2 });
    } else if (preset === "centro") {
      map.flyTo([19.8, -99.4], 7, { duration: 1.1 });
    } else if (preset === "cdmx-morelos") {
      map.flyTo([19.18, -99.18], 10, { duration: 1.0 });
    } else if (preset === "fit" && currentRoute) {
      const bounds = L.latLngBounds(currentRoute.pathCoords);
      map.flyToBounds(bounds, { padding: [60, 60], duration: 1.0 });
    }
  };

  const handleZoom = (dir: "in" | "out") => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (dir === "in") map.zoomIn();
    else map.zoomOut();
  };

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] flex flex-col bg-slate-100 select-none overflow-hidden">
      
      {/* -------------------------------------------------------- */}
      {/* MAP FLOATING CONTROLS: TOP BAR                           */}
      {/* -------------------------------------------------------- */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-xs font-mono font-bold text-slate-800 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#84cc16] shadow-[0_0_8px_#AFF94F] animate-pulse" />
          <Radio size={13} className="text-slate-950" />
          <span className="font-heading font-black tracking-wide">TELEMETRÍA SATELITAL MÉXICO</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 text-white text-xs font-mono font-bold shadow-md">
          <Navigation size={12} className="text-[#AFF94F]" />
          <span>{currentRoute.highway}</span>
        </div>
      </div>

      {/* TOP RIGHT PRESETS */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 shadow-md">
        <button
          type="button"
          onClick={() => flyToPreset("fit")}
          className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-[#AFF94F] text-slate-950 shadow-xs cursor-pointer hover:bg-[#9ee83e] transition-colors"
          title="Centrar en el recorrido activo"
        >
          Enfoque Ruta
        </button>

        <button
          type="button"
          onClick={() => flyToPreset("cdmx-morelos")}
          className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Zoom CDMX - Morelos"
        >
          CDMX - Morelos
        </button>

        <button
          type="button"
          onClick={() => flyToPreset("centro")}
          className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Corredor Centro-Bajío"
        >
          Corredor
        </button>

        <button
          type="button"
          onClick={() => flyToPreset("republica")}
          className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
          title="Ver toda la República Mexicana"
        >
          <Layers size={12} />
          <span>República</span>
        </button>
      </div>

      {/* FLOATING ZOOM BUTTONS (+ / -) */}
      <div className="absolute right-3 bottom-24 z-[1000] flex flex-col items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-slate-200/90 shadow-lg">
        <button
          type="button"
          onClick={() => handleZoom("in")}
          title="Acercar mapa (+)"
          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ZoomIn size={15} />
        </button>

        <div className="px-1 py-0.5 text-[9px] font-mono font-bold text-slate-500 border-y border-slate-100 text-center w-full">
          Z{zoomLevel}
        </div>

        <button
          type="button"
          onClick={() => handleZoom("out")}
          title="Alejar mapa (-)"
          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ZoomOut size={15} />
        </button>

        <button
          type="button"
          onClick={() => flyToPreset("fit")}
          title="Reajustar a la ruta"
          className="w-8 h-8 rounded-xl hover:bg-[#AFF94F] text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer border-t border-slate-100"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* -------------------------------------------------------- */}
      {/* LEAFLET MAP CONTAINER                                    */}
      {/* -------------------------------------------------------- */}
      <div ref={mapContainerRef} className="flex-1 w-full h-full min-h-[360px]" />

      {/* -------------------------------------------------------- */}
      {/* INTERACTIVE WAYPOINTS RECORRIDO ACCORDION / STRIP        */}
      {/* -------------------------------------------------------- */}
      <div className="relative z-[1000] bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4">
        
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-heading font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Flag size={13} className="text-[#65a30d]" />
              <span>Puntos de Control & Recorrido Real:</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-[#AFF94F]/30 text-slate-950 px-2 py-0.5 rounded border border-[#AFF94F]/70">
              {currentRoute.distanceKm} km • {currentRoute.estimatedMinutes} min
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-600">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
            <span>📍 {currentRoute.currentLocationName}</span>
            <span className="text-slate-300">•</span>
            <strong className="text-slate-900">{currentRoute.currentSpeed}</strong>
          </div>
        </div>

        {/* Horizontal Waypoint Pills / Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {currentRoute.waypoints.map((wp, idx) => {
            const isDone = wp.status === "done";
            const isActive = wp.status === "active";
            const isCurrent = activeWaypointIndex === idx;

            return (
              <button
                key={`${currentRoute.id}-wp-${idx}`}
                type="button"
                onClick={() => {
                  setActiveWaypointIndex(idx);
                  const map = mapInstanceRef.current;
                  if (map) {
                    map.flyTo(wp.coords, Math.max(map.getZoom(), 13), { duration: 0.9 });
                  }
                }}
                className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                  isCurrent
                    ? "bg-[#AFF94F]/25 border-[#84cc16] shadow-xs ring-2 ring-[#AFF94F]/40"
                    : isActive
                      ? "bg-slate-950 text-white border-slate-950"
                      : isDone
                        ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        : "bg-white border-slate-200 text-slate-400 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={`font-bold ${isActive ? "text-[#AFF94F]" : "text-slate-500"}`}>
                    0{idx + 1} • {wp.time}
                  </span>
                  {isDone && <CheckCircle2 size={11} className="text-emerald-600" />}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F] animate-ping" />}
                </div>

                <div className={`text-xs font-heading font-black truncate ${isActive ? "text-white" : "text-slate-900"}`}>
                  {wp.name}
                </div>

                <div className={`text-[10px] truncate mt-0.5 ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                  {wp.desc}
                </div>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
