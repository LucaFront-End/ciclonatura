import React, { useState, useRef, useEffect, useCallback } from "react";
import { MEXICO_STATES } from "@/data/mexicoMapData";
import { HUBS } from "./flight";
import { 
  Compass, 
  Radio, 
  Layers, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw,
  Hand
} from "lucide-react";

export interface MapProps {
  theme?: "light" | "dark";
  center?: [number, number];
  zoom?: number;
  scrollZoom?: boolean;
  renderWorldCopies?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Bounding box of Mexican Republic
const BASE_VIEW = {
  w: 940,
  h: 580,
  cx: 560,
  cy: 375,
};

export function Map({
  theme = "light",
  className = "",
  children,
}: MapProps) {
  // Zoom & Pan state
  // scale = 1.0 (Nacional), 1.6 (Centro default), up to 6.5 (Megalópolis)
  const [scale, setScale] = useState<number>(1.55);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: -10, y: 15 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchDistRef = useRef<number | null>(null);

  // Compute reactive SVG viewBox
  const viewW = BASE_VIEW.w / scale;
  const viewH = BASE_VIEW.h / scale;
  const viewX = BASE_VIEW.cx - viewW / 2 + pan.x;
  const viewY = BASE_VIEW.cy - viewH / 2 + pan.y;
  const currentViewBox = `${viewX} ${viewY} ${viewW} ${viewH}`;

  // Wheel zoom handler with cursor centering
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    setScale((prev) => {
      const next = Math.max(0.85, Math.min(6.5, prev * factor));
      return next;
    });
  }, []);

  // Attach non-passive wheel event to container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left-click
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    const svgEl = containerRef.current?.querySelector("svg");
    if (svgEl) {
      const rect = svgEl.getBoundingClientRect();
      const ratioX = viewW / rect.width;
      const ratioY = viewH / rect.height;
      setPan((prev) => ({
        x: prev.x - dx * ratioX,
        y: prev.y - dy * ratioY,
      }));
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Touch handlers for mobile pinch-to-zoom & pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchDistRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistRef.current = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const svgEl = containerRef.current?.querySelector("svg");
      if (svgEl) {
        const rect = svgEl.getBoundingClientRect();
        const ratioX = viewW / rect.width;
        const ratioY = viewH / rect.height;
        setPan((prev) => ({
          x: prev.x - dx * ratioX,
          y: prev.y - dy * ratioY,
        }));
      }
    } else if (e.touches.length === 2 && touchDistRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const factor = dist / touchDistRef.current;
      touchDistRef.current = dist;
      setScale((prev) => Math.max(0.85, Math.min(6.5, prev * factor)));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchDistRef.current = null;
  };

  // Preset camera views
  const handleSetPreset = (preset: "nacional" | "centro" | "megalopolis") => {
    if (preset === "nacional") {
      setScale(0.95);
      setPan({ x: -15, y: -5 });
    } else if (preset === "centro") {
      setScale(1.55);
      setPan({ x: -10, y: 15 });
    } else if (preset === "megalopolis") {
      setScale(4.2);
      setPan({ x: 28, y: 84 });
    }
  };

  // Zoom In / Out step
  const handleZoomIn = () => setScale((s) => Math.min(6.5, s * 1.25));
  const handleZoomOut = () => setScale((s) => Math.max(0.85, s / 1.25));
  const handleReset = () => {
    setScale(1.55);
    setPan({ x: -10, y: 15 });
  };

  const isDark = theme === "dark";
  const zoomPercent = Math.round(scale * 100);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-full min-h-[420px] lg:min-h-[520px] overflow-hidden select-none transition-colors duration-300 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${
        isDark ? "bg-[#0b101b] text-slate-100" : "bg-gradient-to-b from-slate-100/90 via-slate-50 to-slate-100 text-slate-900"
      } ${className}`}
    >
      {/* Background Coordinate Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(#334155 1.2px, transparent 1.2px)"
            : "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Top-Left Telemetry Badge */}
      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-xs font-mono font-bold text-slate-800 shadow-sm pointer-events-auto">
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

      {/* Top-Right Quick Presets Switcher */}
      <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-slate-200/90 shadow-md">
        <button
          type="button"
          onClick={() => handleSetPreset("centro")}
          className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
            scale > 1.2 && scale < 2.5
              ? "bg-slate-950 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
          title="Vista Centro-Norte (Operaciones Activas)"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F]" />
          <span>Centro</span>
        </button>

        <button
          type="button"
          onClick={() => handleSetPreset("megalopolis")}
          className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
            scale >= 2.5
              ? "bg-slate-950 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
          title="Zoom CDMX • Morelos • EdoMéx"
        >
          <ZoomIn size={12} className={scale >= 2.5 ? "text-[#AFF94F]" : ""} />
          <span>Megalópolis</span>
        </button>

        <button
          type="button"
          onClick={() => handleSetPreset("nacional")}
          className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
            scale <= 1.2
              ? "bg-slate-950 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
          }`}
          title="República Mexicana Completa"
        >
          <Layers size={12} className={scale <= 1.2 ? "text-[#AFF94F]" : ""} />
          <span>Nacional</span>
        </button>
      </div>

      {/* Floating Interactive Zoom Controls (+ / - / Reset) */}
      <div className="absolute right-3.5 bottom-14 z-20 flex flex-col items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-slate-200/90 shadow-lg">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Acercar mapa (+)"
          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ZoomIn size={15} />
        </button>

        <div className="px-1 py-0.5 text-[9px] font-mono font-bold text-slate-500 border-y border-slate-100 text-center w-full">
          {zoomPercent}%
        </div>

        <button
          type="button"
          onClick={handleZoomOut}
          title="Alejar mapa (-)"
          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ZoomOut size={15} />
        </button>

        <button
          type="button"
          onClick={handleReset}
          title="Reajustar mapa a escala original"
          className="w-8 h-8 rounded-xl hover:bg-[#AFF94F] text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer border-t border-slate-100"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Bottom Coordinates & Drag Help Strip */}
      <div className="absolute bottom-3 left-3.5 z-20 flex items-center gap-3 text-xs font-mono text-slate-600 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-sm pointer-events-none">
        <span className="flex items-center gap-1 text-slate-900 font-bold">
          <Compass size={13} className="text-[#65a30d]" />
          19.4326° N, 99.1332° W
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="hidden sm:inline text-slate-500">
          Arrastra para mover • Rueda para zoom
        </span>
      </div>

      {/* SVG Canvas Map */}
      <svg
        viewBox={currentViewBox}
        className="w-full h-full transition-[viewBox] duration-150 ease-out"
        style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.04))" }}
      >
        <defs>
          {/* Subtle Ambient Radial Highlight on Central Hubs */}
          <radialGradient id="mexicoHubGlow" cx="58%" cy="70%" r="22%">
            <stop offset="0%" stopColor="#AFF94F" stopOpacity="0.4" />
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
                className="transition-colors duration-150 cursor-pointer"
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

            // Dynamically scale badge according to current zoom scale
            const isMega = scale >= 3.0;
            const nodeRadius = isMega ? 3 : 5;
            const badgeW = isMega ? 18 : 26;
            const badgeH = isMega ? 8 : 12;
            const fontSize = isMega ? 4.5 : 7.5;
            const yOffset = hub.code === "CVJ" ? 10 : -14;

            return (
              <g key={hub.code} className="transition-transform pointer-events-none">
                {/* Pulsing Beacon for Main Hubs */}
                {isMain && (
                  <circle
                    cx={hub.xy[0]}
                    cy={hub.xy[1]}
                    r={isMega ? 8 : 15}
                    fill="none"
                    stroke="#84cc16"
                    strokeWidth={isMega ? 0.8 : 1.5}
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
                  strokeWidth={isMega ? 1 : 1.8}
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
                    rx={isMega ? 2 : 3}
                    fill={isMain ? "#0f172a" : "#ffffff"}
                    stroke={isMain ? "#AFF94F" : "#cbd5e1"}
                    strokeWidth={isMega ? 0.5 : 1}
                  />
                  <text
                    x={badgeW / 2}
                    y={badgeH / 2 + (isMega ? 1.5 : 2.5)}
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
