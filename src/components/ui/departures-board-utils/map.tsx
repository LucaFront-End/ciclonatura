import React, { useState } from "react";
import { MEXICO_STATES } from "@/data/mexicoMapData";
import { HUBS } from "./flight";
import { Compass, Maximize2, Minimize2, Radio, Layers, MapPin, ZoomIn } from "lucide-react";

export interface MapProps {
  theme?: "light" | "dark";
  center?: [number, number];
  zoom?: number;
  scrollZoom?: boolean;
  renderWorldCopies?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Map({
  theme = "light",
  className = "",
  children,
}: MapProps) {
  // Zoom mode: "corredor" (default, central commercial hub), "nacional" (whole country), or "megalopolis" (CDMX/Morelos zoom)
  const [zoomMode, setZoomMode] = useState<"corredor" | "nacional" | "megalopolis">("corredor");
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // ViewBox coordinates optimized for high magnification:
  // Corredor (Active Hubs: MTY, GDL, QRO, MEX, CVJ, PUE, TLC): 410 210 260 280
  // Nacional: 20 20 960 600
  // Megalopolis: 550 430 80 55
  let currentViewBox = "410 210 260 280";
  if (zoomMode === "nacional") {
    currentViewBox = "20 20 960 600";
  } else if (zoomMode === "megalopolis") {
    currentViewBox = "550 435 75 50";
  }

  const isDark = theme === "dark";

  return (
    <div
      className={`relative w-full h-full min-h-[500px] lg:min-h-[620px] overflow-hidden select-none transition-colors duration-300 ${
        isDark ? "bg-[#0b101b] text-slate-100" : "bg-gradient-to-b from-slate-100/90 via-slate-50 to-slate-100 text-slate-900"
      } ${className}`}
    >
      {/* Background Coordinate Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(#334155 1.2px, transparent 1.2px)"
            : "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Top-Left Telemetry Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-xs font-mono font-bold text-slate-800 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#84cc16] shadow-[0_0_8px_#AFF94F] animate-pulse" />
          <Radio size={13} className="text-slate-950" />
          <span className="font-heading font-black tracking-wide">RADAR MÉXICO</span>
        </div>

        {hoveredState && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 text-white text-xs font-mono font-bold shadow-md animate-fadeIn">
            <MapPin size={11} className="text-[#AFF94F]" />
            <span>ESTADO: <strong className="text-[#AFF94F]">{hoveredState.toUpperCase()}</strong></span>
          </div>
        )}
      </div>

      {/* Top-Right Zoom Controls Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 shadow-md">
        <button
          type="button"
          onClick={() => setZoomMode("corredor")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            zoomMode === "corredor"
              ? "bg-slate-950 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
          title="Zoom Corredor Centro-Norte (Operaciones Activas)"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F]" />
          <span>Corredor Centro</span>
        </button>

        <button
          type="button"
          onClick={() => setZoomMode("megalopolis")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            zoomMode === "megalopolis"
              ? "bg-slate-950 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
          title="Zoom Detallado CDMX • Morelos • EdoMéx"
        >
          <ZoomIn size={12} className={zoomMode === "megalopolis" ? "text-[#AFF94F]" : ""} />
          <span>Megalópolis</span>
        </button>

        <button
          type="button"
          onClick={() => setZoomMode("nacional")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            zoomMode === "nacional"
              ? "bg-slate-950 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
          title="Vista de toda la República Mexicana"
        >
          <Layers size={12} className={zoomMode === "nacional" ? "text-[#AFF94F]" : ""} />
          <span>Nacional</span>
        </button>
      </div>

      {/* Bottom Coordinates & Scale HUD */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-3 text-xs font-mono text-slate-600 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-sm">
        <span className="flex items-center gap-1 text-slate-900 font-bold">
          <Compass size={13} className="text-[#65a30d]" />
          19.4326° N, 99.1332° W
        </span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-500">
          Enfoque: <strong className="text-slate-800 font-mono">{zoomMode === "corredor" ? "Centro-Norte (1:1.5M)" : zoomMode === "megalopolis" ? "Metropolitano (1:350K)" : "República (1:5M)"}</strong>
        </span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-900 font-bold">
          Matriz Tlalpan CDMX
        </span>
      </div>

      {/* SVG Canvas Map */}
      <svg
        viewBox={currentViewBox}
        className="w-full h-full transition-all duration-700 ease-out"
        style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.04))" }}
      >
        <defs>
          {/* Subtle Ambient Radial Highlight on Central Hubs */}
          <radialGradient id="mexicoHubGlow" cx="58%" cy="70%" r="22%">
            <stop offset="0%" stopColor="#AFF94F" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#AFF94F" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#AFF94F" stopOpacity="0" />
          </radialGradient>

          {/* Card shadow filter for city badges */}
          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ambient Glow around CDMX/Morelos Hub */}
        <circle cx="583" cy="458" r="85" fill="url(#mexicoHubGlow)" pointerEvents="none" />

        {/* All 32 Mexican States */}
        <g id="mexico-states">
          {MEXICO_STATES.map((state) => {
            const isHovered = hoveredState === state.name;
            const isPrimary = state.isPrimary; // Morelos, CDMX, EdoMéx
            const isSecondary = state.isSecondary; // Querétaro, Puebla, Nuevo León, Jalisco

            return (
              <path
                key={state.id}
                d={state.path}
                onMouseEnter={() => setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
                className="transition-all duration-200 cursor-pointer"
                fill={
                  isHovered
                    ? "#e2e8f0"
                    : isPrimary
                      ? "#f4fce3" // Soft lime tint for primary operational hubs
                      : isSecondary
                        ? "#f8fafc"
                        : "#ffffff"
                }
                stroke={
                  isHovered
                    ? "#0f172a"
                    : isPrimary
                      ? "#84cc16" // Vibrant olive-lime border
                      : isSecondary
                        ? "#94a3b8"
                        : "#cbd5e1"
                }
                strokeWidth={
                  isHovered
                    ? 2.2
                    : isPrimary
                      ? 1.8
                      : isSecondary
                        ? 1.2
                        : 0.9
                }
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Injected Flight Routes and Moving Courier Trackers */}
        {children}

        {/* High-Contrast Interactive City Hubs */}
        <g id="mexico-hubs">
          {Object.values(HUBS).map((hub) => {
            const isMain = hub.isMainHub; // CDMX, Cuernavaca
            
            // Adjust label sizes according to zoom level
            const isMega = zoomMode === "megalopolis";
            const isCorr = zoomMode === "corredor";

            // Don't show distant hubs (CUN, GDL, MTY) if in megalopolis
            if (isMega && !["MEX", "CVJ", "POL", "STF", "TLC"].includes(hub.code)) {
              return null;
            }

            const nodeRadius = isMega ? 2.5 : isCorr ? 4.5 : 5.5;
            const badgeW = isMega ? 16 : isCorr ? 26 : 28;
            const badgeH = isMega ? 7 : isCorr ? 12 : 13;
            const fontSize = isMega ? 4 : isCorr ? 7.5 : 8.5;
            const yOffset = hub.code === "CVJ" ? 10 : -14;

            return (
              <g key={hub.code} className="transition-transform">
                {/* Pulsing Beacon for Main Hubs */}
                {isMain && (
                  <circle
                    cx={hub.xy[0]}
                    cy={hub.xy[1]}
                    r={isMega ? 6 : 14}
                    fill="none"
                    stroke="#84cc16"
                    strokeWidth={isMega ? 0.6 : 1.5}
                    opacity={0.65}
                    className="animate-ping origin-center"
                  />
                )}

                {/* Hub Outer Ring */}
                <circle
                  cx={hub.xy[0]}
                  cy={hub.xy[1]}
                  r={nodeRadius}
                  fill="#ffffff"
                  stroke={isMain ? "#0f172a" : "#475569"}
                  strokeWidth={isMega ? 0.8 : 1.8}
                />

                {/* Hub Inner Dot */}
                <circle
                  cx={hub.xy[0]}
                  cy={hub.xy[1]}
                  r={nodeRadius * 0.55}
                  fill={isMain ? "#AFF94F" : "#0f172a"}
                />

                {/* City Name Badge Card */}
                <g transform={`translate(${hub.xy[0] - badgeW / 2}, ${hub.xy[1] + yOffset})`} filter="url(#badgeShadow)">
                  <rect
                    width={badgeW}
                    height={badgeH}
                    rx={isMega ? 2 : 3.5}
                    fill={isMain ? "#0f172a" : "#ffffff"}
                    stroke={isMain ? "#AFF94F" : "#cbd5e1"}
                    strokeWidth={isMega ? 0.4 : 1}
                  />
                  <text
                    x={badgeW / 2}
                    y={badgeH / 2 + (isMega ? 1.2 : 2.5)}
                    textAnchor="middle"
                    fontSize={fontSize}
                    fontFamily="monospace"
                    fontWeight="900"
                    fill={isMain ? "#AFF94F" : "#0f172a"}
                    letterSpacing="0.04em"
                  >
                    {hub.code}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
