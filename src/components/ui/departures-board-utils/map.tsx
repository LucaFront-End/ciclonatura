import React, { useState } from "react";
import { MEXICO_STATES } from "@/data/mexicoMapData";
import { HUBS } from "./flight";
import { Compass, Maximize2, Minimize2, Radio, Layers } from "lucide-react";

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
  theme = "dark",
  className = "",
  children,
}: MapProps) {
  // Zoom mode: "national" (full Mexico) or "central" (CDMX-Morelos-EdoMéx Corridor)
  const [zoomMode, setZoomMode] = useState<"national" | "central">("national");
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Viewbox coordinates:
  // National: 0 0 1000 650
  // Central corridor: 510 390 140 105
  const currentViewBox = zoomMode === "national" ? "0 0 1000 650" : "515 400 130 95";

  const isDark = theme === "dark";

  return (
    <div
      className={`relative w-full h-full min-h-[380px] overflow-hidden select-none ${
        isDark ? "bg-[#0b101b] text-slate-100" : "bg-slate-100 text-slate-800"
      } ${className}`}
    >
      {/* Background Subtle Coordinate Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(#334155 1px, transparent 1px)"
            : "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Map Control HUD Overlay */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F] animate-pulse" />
          <Radio size={11} className="text-[#AFF94F]" />
          <span>RADAR MÉXICO</span>
        </div>

        {hoveredState && (
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#AFF94F] text-slate-950 text-[10px] font-mono font-black shadow-md">
            <span>ESTADO: {hoveredState.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Map View Switcher: Nacional vs Megalópolis */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
        <button
          type="button"
          onClick={() => setZoomMode("national")}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
            zoomMode === "national"
              ? "bg-[#AFF94F] text-slate-950 shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
          title="Vista Nacional de México"
        >
          <Layers size={11} />
          <span>Nacional</span>
        </button>

        <button
          type="button"
          onClick={() => setZoomMode("central")}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
            zoomMode === "central"
              ? "bg-[#AFF94F] text-slate-950 shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
          title="Zoom Corredor CDMX • Morelos • EdoMéx"
        >
          <Maximize2 size={11} />
          <span>Megalópolis</span>
        </button>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-3 text-[10px] font-mono text-slate-400 bg-slate-950/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
        <span className="flex items-center gap-1 text-[#AFF94F]">
          <Compass size={11} />
          19.4326° N, 99.1332° W
        </span>
        <span>•</span>
        <span>Escala: {zoomMode === "national" ? "1:5,000,000" : "1:750,000"}</span>
        <span>•</span>
        <span className="text-slate-200">Sede Calzada de Tlalpan</span>
      </div>

      {/* Interactive SVG Canvas */}
      <svg
        viewBox={currentViewBox}
        className="w-full h-full transition-all duration-700 ease-out"
        style={{ filter: isDark ? "drop-shadow(0 0 20px rgba(0,0,0,0.5))" : undefined }}
      >
        <defs>
          {/* Radial glow around CDMX / Morelos hub */}
          <radialGradient id="hubGlow" cx="58% " cy="70%" r="20%">
            <stop offset="0%" stopColor="#AFF94F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#AFF94F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow around Hubs */}
        <circle cx="583" cy="458" r="90" fill="url(#hubGlow)" pointerEvents="none" />

        {/* All 32 Mexican States */}
        <g id="mexico-states">
          {MEXICO_STATES.map((state) => {
            const isHovered = hoveredState === state.name;
            const isPrimary = state.isPrimary; // CDMX, Morelos, EdoMéx
            const isSecondary = state.isSecondary; // Querétaro, Puebla, NL, Jalisco

            return (
              <path
                key={state.id}
                d={state.path}
                onMouseEnter={() => setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
                className="transition-colors duration-200 cursor-pointer"
                fill={
                  isHovered
                    ? isDark ? "#1e293b" : "#cbd5e1"
                    : isPrimary
                      ? isDark ? "#15232d" : "#e2e8f0"
                      : isSecondary
                        ? isDark ? "#101926" : "#f1f5f9"
                        : isDark ? "#0d131f" : "#f8fafc"
                }
                stroke={
                  isHovered
                    ? "#AFF94F"
                    : isPrimary
                      ? "#AFF94F"
                      : isDark ? "#1e293b" : "#cbd5e1"
                }
                strokeWidth={isHovered ? 1.4 : isPrimary ? 1.0 : 0.6}
                strokeOpacity={isPrimary ? 0.8 : 0.6}
              />
            );
          })}
        </g>

        {/* Major Hub Markers */}
        <g id="mexico-hubs">
          {Object.values(HUBS).map((hub) => {
            const isMain = hub.isMainHub;
            return (
              <g key={hub.code} className="transition-transform hover:scale-110">
                {/* Ping wave for main hubs */}
                {isMain && (
                  <circle
                    cx={hub.xy[0]}
                    cy={hub.xy[1]}
                    r={6}
                    fill="none"
                    stroke="#AFF94F"
                    strokeWidth={0.8}
                    opacity={0.6}
                    className="animate-ping origin-center"
                  />
                )}
                
                {/* Node dot */}
                <circle
                  cx={hub.xy[0]}
                  cy={hub.xy[1]}
                  r={isMain ? 3.5 : 2.5}
                  fill={isMain ? "#AFF94F" : isDark ? "#94a3b8" : "#475569"}
                  stroke={isDark ? "#0f172a" : "#ffffff"}
                  strokeWidth={1}
                />

                {/* City Label (visible in central view or for main hubs) */}
                {(zoomMode === "central" || isMain || hub.code === "MTY" || hub.code === "GDL" || hub.code === "CUN") && (
                  <text
                    x={hub.xy[0] + 5}
                    y={hub.xy[1] + (hub.code === "CVJ" ? 6 : -3)}
                    fontSize={zoomMode === "central" ? 3.5 : 8}
                    fill={isMain ? "#AFF94F" : isDark ? "#94a3b8" : "#475569"}
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="0.05em"
                  >
                    {hub.code}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Injected Flight Routes and Trackers */}
        {children}
      </svg>
    </div>
  );
}
