import React, { useState, useEffect } from "react";

// Standard 30-degree isometric projection constants
const COS30 = Math.cos(Math.PI / 6); // ~0.866025
const SIN30 = 0.5;

/**
 * Creates an Isometric Coordinate Projection Engine
 * @param {Object} options
 * @param {number} options.ox Origin X (pixels in SVG viewBox)
 * @param {number} options.oy Origin Y (pixels in SVG viewBox)
 * @param {number} options.s  Scale factor (pixels per isometric unit)
 */
export function createIso({ ox = 280, oy = 120, s = 20 } = {}) {
  const p = (x, y, z = 0) => [
    ox + (x - y) * COS30 * s,
    oy + (x + y) * SIN30 * s - z * s,
  ];

  const pts = (points) =>
    points
      .map(([x, y, z = 0]) => {
        const [sx, sy] = p(x, y, z);
        return `${sx.toFixed(1)},${sy.toFixed(1)}`;
      })
      .join(" ");

  return { p, pts, s, ox, oy };
}

// Helpers to generate isometric polygon coordinate strings
export const leftFace = (iso, y, x1, x2, z1, z2) =>
  iso.pts([[x1, y, z1], [x2, y, z1], [x2, y, z2], [x1, y, z2]]);

export const rightFace = (iso, x, y1, y2, z1, z2) =>
  iso.pts([[x, y1, z1], [x, y2, z1], [x, y2, z2], [x, y1, z2]]);

export const topFace = (iso, x1, y1, x2, y2, z = 0) =>
  iso.pts([[x1, y1, z], [x2, y1, z], [x2, y2, z], [x1, y2, z]]);

// Helper for matrix skew transforms to paint text or circles flat on isometric planes
export const matrixLeft = (iso, x, y, z) => {
  const [sx, sy] = iso.p(x, y, z);
  return `matrix(${COS30},${SIN30},0,1,${sx},${sy})`;
};

export const matrixRight = (iso, x, y, z) => {
  const [sx, sy] = iso.p(x, y, z);
  return `matrix(${COS30},${-SIN30},0,1,${sx},${sy})`;
};

export const matrixTop = (iso, x, y, z) => {
  const [sx, sy] = iso.p(x, y, z);
  return `matrix(${COS30},${SIN30},${-COS30},${SIN30},${sx},${sy})`;
};

// Shading helper for directional lighting simulation
export function shadeColor(color, percent) {
  if (!color || color[0] !== "#" || (color.length !== 7 && color.length !== 4)) {
    return color;
  }
  let hex = color.slice(1);
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const num = parseInt(hex, 16);
  const amt = Math.round(2.55 * percent * 100);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

// Basic Isometric 3D Box component
export function IsoBlock({
  iso,
  x,
  y,
  z = 0,
  w,
  d,
  h,
  color = "#E2E8F0",
  top,
  left,
  right,
  stroke = "rgba(15,23,42,0.12)",
  opacity = 1,
  sw = 0.6,
}) {
  const topColor = top || shadeColor(color, 0.22);
  const leftColor = left || shadeColor(color, 0.04);
  const rightColor = right || shadeColor(color, -0.15);

  return (
    <g opacity={opacity}>
      {/* Left Face */}
      <polygon
        points={leftFace(iso, y + d, x, x + w, z, z + h)}
        fill={leftColor}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      {/* Right Face */}
      <polygon
        points={rightFace(iso, x + w, y, y + d, z, z + h)}
        fill={rightColor}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      {/* Top Face */}
      <polygon
        points={topFace(iso, x, y, x + w, y + d, z + h)}
        fill={topColor}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </g>
  );
}

// Continuous 60fps Loop Animation Hook
export function useAnimationTime() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animId;
    let start = performance.now();

    const tick = (now) => {
      setTime((now - start) / 1000);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return time;
}

// Common SVG Filters and Gradients for Isometric Scenes
export function IsoDefs() {
  return (
    <defs>
      {/* High-intensity Hologram Laser Glow */}
      <filter id="iso-glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Intense Cyan Laser Glow */}
      <filter id="iso-glow-cyan" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3.0" result="blur" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0.9  0 0 1 0 1  0 0 0 1 0" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Wide Soft Ambient Shadow */}
      <filter id="iso-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" />
      </filter>

      {/* Glassmorphic Reflection Gradient */}
      <linearGradient id="iso-glass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="35%" stopColor="#BAE6FD" stopOpacity="0.45" />
        <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.35" />
      </linearGradient>

      {/* Clear Windshield Glass with Deep Reflections */}
      <linearGradient id="iso-windshield" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.9" />
        <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.5" />
        <stop offset="85%" stopColor="#0369A1" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#082F49" stopOpacity="0.9" />
      </linearGradient>

      {/* Laser Scanner Fan Gradient (Lime) */}
      <linearGradient id="iso-laser-fan" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#84CC16" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#84CC16" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#84CC16" stopOpacity="0.02" />
      </linearGradient>

      {/* Laser Scanner Fan Gradient (Cyan) */}
      <linearGradient id="iso-cyan-fan" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#0284C7" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.02" />
      </linearGradient>

      {/* Metallic Chrome Gradient */}
      <linearGradient id="iso-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="25%" stopColor="#CBD5E1" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="75%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>

      {/* Official Holographic Rainbow Foil (for REPUVE and Legal Seal) */}
      <linearGradient id="iso-holo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.9" />
        <stop offset="20%" stopColor="#FB923C" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#FACC15" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#4ADE80" stopOpacity="0.9" />
        <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
      </linearGradient>

      {/* Official Gold Security Seal */}
      <linearGradient id="iso-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="30%" stopColor="#D97706" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="85%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>

      {/* SEDEMA Official Emerald Hologram Badge */}
      <linearGradient id="iso-sedema-green" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="45%" stopColor="#059669" />
        <stop offset="80%" stopColor="#047857" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>

      {/* Car Pearl White Metallic Clearcoat */}
      <linearGradient id="iso-car-paint" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>

      {/* Technical Floor Grid Pattern */}
      <pattern id="iso-grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(148, 163, 184, 0.22)" strokeWidth="0.8" />
      </pattern>
    </defs>
  );
}
