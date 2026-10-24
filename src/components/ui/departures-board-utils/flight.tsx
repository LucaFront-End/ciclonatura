import React from "react";
import { MEXICO_CITIES } from "@/data/mexicoMapData";

export interface HubInfo {
  code: string;
  name: string;
  city: string;
  state: string;
  role: string;
  xy: [number, number];
  isMainHub?: boolean;
}

export const HUBS: Record<string, HubInfo> = {
  CVJ: {
    code: "CVJ",
    name: "Cuernavaca SMyT",
    city: "Cuernavaca",
    state: "Morelos",
    role: "Secretaría de Movilidad / Troquelado SEDENA",
    xy: [581.3, 467.3],
    isMainHub: true,
  },
  MEX: {
    code: "MEX",
    name: "Sede Notarial Tlalpan",
    city: "Ciudad de México",
    state: "CDMX",
    role: "Matriz Central & Bóveda de Seguridad",
    xy: [584.2, 452.0],
    isMainHub: true,
  },
  POL: {
    code: "POL",
    name: "Polanco V Sección",
    city: "CDMX Poniente",
    state: "CDMX",
    role: "Entrega en Mano a Domicilio VIP",
    xy: [582.4, 450.5],
  },
  STF: {
    code: "STF",
    name: "Santa Fe Corporativo",
    city: "CDMX Corporativo",
    state: "CDMX",
    role: "Custodia de Flotillas B2B",
    xy: [579.8, 453.2],
  },
  TLC: {
    code: "TLC",
    name: "Toluca Centro",
    city: "Toluca",
    state: "EdoMéx",
    role: "Ventanilla Movilidad EdoMéx",
    xy: [568.7, 456.5],
  },
  QRO: {
    code: "QRO",
    name: "Querétaro Corregidora",
    city: "Querétaro",
    state: "Querétaro",
    role: "Módulo Enlace Bajío",
    xy: [546.9, 417.0],
  },
  PUE: {
    code: "PUE",
    name: "Puebla Angelópolis",
    city: "Puebla",
    state: "Puebla",
    role: "Ventanilla Regional Angelópolis",
    xy: [611.7, 463.8],
  },
  GDL: {
    code: "GDL",
    name: "Guadalajara Providencia",
    city: "Guadalajara",
    state: "Jalisco",
    role: "Coordinación Occidente",
    xy: [459.0, 414.8],
  },
  MTY: {
    code: "MTY",
    name: "Monterrey San Pedro",
    city: "Monterrey",
    state: "Nuevo León",
    role: "Gestoría Norte & B2B",
    xy: [549.1, 262.8],
  },
  CUN: {
    code: "CUN",
    name: "Cancún Puerto Cancún",
    city: "Cancún",
    state: "Quintana Roo",
    role: "Bajas Foráneas Peninsular",
    xy: [948.8, 399.7],
  },
};

export function getAirportInfo(code: string): HubInfo | undefined {
  return HUBS[code.toUpperCase()];
}

/** Compute quadratic bezier control point for curved flight/courier route */
export function getRouteCurve(fromCode: string, toCode: string) {
  const p1 = HUBS[fromCode]?.xy ?? [500, 300];
  const p2 = HUBS[toCode]?.xy ?? [500, 300];

  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Perpendicular offset for arc lift
  const curvature = Math.max(15, Math.min(60, dist * 0.22));
  const midX = (p1[0] + p2[0]) / 2;
  const midY = (p1[1] + p2[1]) / 2 - curvature;

  const path = `M ${p1[0]} ${p1[1]} Q ${midX} ${midY} ${p2[0]} ${p2[1]}`;

  return { p1, p2, mid: [midX, midY] as [number, number], path, dist };
}

/** Compute position and tangent angle along quadratic bezier curve at progress t (0..1) */
export function getPointOnCurve(
  p1: [number, number],
  ctrl: [number, number],
  p2: [number, number],
  t: number
) {
  const clampT = Math.max(0, Math.min(1, t));
  const oneMinusT = 1 - clampT;

  const x =
    oneMinusT * oneMinusT * p1[0] +
    2 * oneMinusT * clampT * ctrl[0] +
    clampT * clampT * p2[0];

  const y =
    oneMinusT * oneMinusT * p1[1] +
    2 * oneMinusT * clampT * ctrl[1] +
    clampT * clampT * p2[1];

  // Derivative for tangent direction
  const dx = 2 * oneMinusT * (ctrl[0] - p1[0]) + 2 * clampT * (p2[0] - ctrl[0]);
  const dy = 2 * oneMinusT * (ctrl[1] - p1[1]) + 2 * clampT * (p2[1] - ctrl[1]);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return { x, y, angle };
}

export function SingleWorldZoomLimit() {
  return null;
}

export function FlightRoute({
  from,
  to,
  color = "#AFF94F",
  width = 2,
  lineStyle = "solid",
  showAirports = true,
}: {
  from: string;
  to: string;
  color?: string;
  width?: number;
  lineStyle?: "solid" | "dash";
  showAirports?: boolean;
}) {
  const route = getRouteCurve(from, to);
  const strokeDash = lineStyle === "dash" ? "4,4" : undefined;

  return (
    <g className="transition-all duration-300">
      {/* Route Path */}
      <path
        d={route.path}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeDasharray={strokeDash}
        strokeLinecap="round"
        style={{
          filter: color === "#AFF94F" ? "drop-shadow(0 0 6px rgba(175, 249, 79, 0.7))" : undefined,
        }}
      />

      {showAirports && (
        <>
          {/* Origin Hub */}
          <circle cx={route.p1[0]} cy={route.p1[1]} r={3.5} fill="#ffffff" stroke={color} strokeWidth={1.5} />
          {/* Destination Hub */}
          <circle cx={route.p2[0]} cy={route.p2[1]} r={3.5} fill={color} stroke="#ffffff" strokeWidth={1.5} />
        </>
      )}
    </g>
  );
}

export function FlightRoutes({
  routes,
  color = "#94a3b8",
  width = 1.2,
  opacity = 0.35,
}: {
  routes: Array<{ from: string; to: string }>;
  color?: string;
  width?: number;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {routes.map((r, i) => {
        const { path } = getRouteCurve(r.from, r.to);
        return (
          <path
            key={`${r.from}-${r.to}-${i}`}
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={width}
            strokeDasharray="3,3"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

export function FlightTracker({
  from,
  to,
  progress = 0,
  completedColor = "#AFF94F",
  remainingColor = "#64748b",
  children,
}: {
  from: string;
  to: string;
  progress: number;
  completedColor?: string;
  remainingColor?: string;
  children?: React.ReactNode;
}) {
  const route = getRouteCurve(from, to);
  const currentPos = getPointOnCurve(route.p1, route.mid, route.p2, progress);

  return (
    <g className="transition-all duration-300">
      {/* Background Track */}
      <path
        d={route.path}
        fill="none"
        stroke={remainingColor}
        strokeWidth={1.5}
        strokeDasharray="3,3"
        opacity={0.4}
      />

      {/* Origin Point */}
      <circle cx={route.p1[0]} cy={route.p1[1]} r={4} fill="#ffffff" stroke={completedColor} strokeWidth={2} />
      {/* Destination Point with beacon */}
      <circle cx={route.p2[0]} cy={route.p2[1]} r={4} fill={completedColor} stroke="#0f172a" strokeWidth={2} />
      <circle
        cx={route.p2[0]}
        cy={route.p2[1]}
        r={9}
        fill="none"
        stroke={completedColor}
        strokeWidth={1}
        opacity={0.6}
        className="animate-ping origin-center"
      />

      {/* Moving Courier / Transit Vehicle Pin */}
      <g transform={`translate(${currentPos.x}, ${currentPos.y})`}>
        {/* Glow Halo */}
        <circle r={12} fill={completedColor} opacity={0.25} className="animate-pulse" />
        
        {/* Center Marker */}
        <circle r={6} fill={completedColor} stroke="#0f172a" strokeWidth={2} />
        <circle r={2} fill="#0f172a" />

        {/* Floating Tooltip Label */}
        {children && (
          <foreignObject x={-45} y={-32} width={90} height={26} className="overflow-visible pointer-events-none">
            <div className="bg-slate-950/90 text-white px-2 py-0.5 rounded-full border border-[#AFF94F]/60 text-[10px] font-mono font-bold shadow-md shadow-black/40 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F] animate-pulse" />
              <span>{children}</span>
            </div>
          </foreignObject>
        )}
      </g>
    </g>
  );
}
