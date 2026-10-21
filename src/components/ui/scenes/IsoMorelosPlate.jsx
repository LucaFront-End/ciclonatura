import React from "react";
import {
  createIso,
  IsoBlock,
  IsoDefs,
  useAnimationTime,
  leftFace,
  rightFace,
  topFace,
  matrixTop,
  matrixLeft,
  matrixRight,
} from "../iso-engine";

export default function IsoMorelosPlate() {
  const time = useAnimationTime();

  // Calibrated scale s = 38 with ox = 260, oy = 175
  const iso = createIso({ ox: 260, oy: 175, s: 38 });

  // 1. Hydraulic Stamping Press Kinematics (Impact cycle)
  const pressCycle = (Math.sin(time * 2.2) + 1) / 2; // 0 to 1
  const ramZ = 1.35 + Math.pow(pressCycle, 3) * 0.9; // Ram moves up and down
  const isImpact = ramZ < 1.45;

  // 2. Robotic Laser Engraving Arm Motion
  const laserX = Math.sin(time * 3.2) * 1.7;
  const laserY = Math.cos(time * 2.6) * 0.7;

  // 3. Shimmer wave across metallic plate
  const shimmer = (Math.sin(time * 2.8) + 1) / 2;

  // 4. Live Counter (ticks up to $42,500)
  const savingsAmount = Math.floor(35000 + ((time * 8000) % 7500));

  const elements = [];

  // --- 1. Base Industrial Press Bed Platform ---
  elements.push({
    k: -10,
    el: (
      <g key="pedestal">
        <polygon
          points={topFace(iso, -3.7, -2.4, 3.7, 2.4, -0.05)}
          fill="rgba(15,23,42,0.1)"
          filter="url(#iso-shadow)"
        />
        <IsoBlock
          iso={iso}
          x={-3.5}
          y={-2.2}
          z={0}
          w={7.0}
          d={4.4}
          h={0.32}
          color="#E2E8F0"
          top="#FFFFFF"
          left="#CBD5E1"
          right="#94A3B8"
          stroke="#64748B"
          sw={0.8}
        />
        {/* Precision Stamping Inset Grid Floor */}
        <polygon
          points={topFace(iso, -3.2, -1.9, 3.2, 1.9, 0.33)}
          fill="#064E3B"
          stroke="#10B981"
          strokeWidth="1.0"
          strokeDasharray="4 2"
        />
      </g>
    ),
  });

  // --- 2. Heavy Dual Hydraulic Support Columns (Back Left & Back Right) ---
  [
    [-3.1, -1.8],
    [2.3, -1.8],
  ].forEach(([cx, cy], i) => {
    elements.push({
      k: -2 + i,
      el: (
        <g key={`column-${i}`}>
          <IsoBlock
            iso={iso}
            x={cx}
            y={cy}
            z={0.33}
            w={0.8}
            d={0.8}
            h={2.6}
            color="#334155"
            top="#475569"
            left="#1E293B"
            right="#0F172A"
            stroke="#64748B"
            sw={0.8}
          />
          {/* Hydraulic Chrome Piston Rod Inside */}
          <IsoBlock
            iso={iso}
            x={cx + 0.15}
            y={cy + 0.15}
            z={ramZ}
            w={0.5}
            d={0.5}
            h={1.2}
            color="#94A3B8"
            top="#F1F5F9"
            left="#E2E8F0"
            right="#CBD5E1"
            stroke="#475569"
            sw={0.5}
          />
        </g>
      ),
    });
  });

  // --- 3. The Metal License Plate on Bed ---
  elements.push({
    k: 5,
    el: (
      <g key="metallic-plate">
        {/* Plate 3D Base Slab */}
        <IsoBlock
          iso={iso}
          x={-2.4}
          y={-1.1}
          z={0.33}
          w={4.8}
          d={2.2}
          h={0.16}
          color="#E2E8F0"
          top="#FFFFFF"
          left="#CBD5E1"
          right="#94A3B8"
          stroke="#475569"
          sw={1.0}
        />

        {/* Embossed Inner Plate Border (Top Face Inset) */}
        <polygon
          points={topFace(iso, -2.25, -0.95, 2.25, 0.95, 0.5)}
          fill="#F8FAFC"
          stroke="#0F172A"
          strokeWidth="1.4"
        />

        {/* Top Header Text: MORELOS · ANFITRIÓN DEL MUNDO */}
        <g transform={matrixTop(iso, -1.9, -0.65, 0.51)}>
          <text
            x="0"
            y="0"
            fill="#065F46"
            fontFamily="Outfit, sans-serif"
            fontWeight="900"
            fontSize="6"
            letterSpacing="1.2"
          >
            MORELOS · 2026
          </text>
        </g>

        {/* Center Embossed Characters: RAX-420-E with real depth */}
        <g transform={matrixTop(iso, -1.9, 0.15, 0.51)}>
          <text
            x="0"
            y="0"
            fill="#0F172A"
            fontFamily="monospace"
            fontWeight="900"
            fontSize="10.5"
            letterSpacing="2.8"
            style={{
              textShadow: "1px 1px 0px #CBD5E1, -0.5px -0.5px 0px #FFFFFF",
            }}
          >
            RAX·420·E
          </text>
        </g>

        {/* Bottom Slogan Text */}
        <g transform={matrixTop(iso, -1.8, 0.7, 0.51)}>
          <text
            x="0"
            y="0"
            fill="#64748B"
            fontFamily="sans-serif"
            fontWeight="700"
            fontSize="4.0"
            letterSpacing="0.8"
          >
            ANFITRIÓN DEL MUNDO · SEDENA
          </text>
        </g>

        {/* 4 Aluminum Fastener Bolts */}
        {[
          [-2.15, -0.85],
          [2.15, -0.85],
          [-2.15, 0.85],
          [2.15, 0.85],
        ].map(([sx, sy], idx) => {
          const [px, py] = iso.p(sx, sy, 0.51);
          return (
            <circle
              key={`bolt-${idx}`}
              cx={px}
              cy={py}
              r="2.5"
              fill="#94A3B8"
              stroke="#334155"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Holographic Security Foil Shimmer */}
        <g transform={matrixTop(iso, 1.45, -0.45, 0.52)}>
          <circle
            cx="0"
            cy="0"
            r="7"
            fill="url(#holo-morelos)"
            stroke="#10B981"
            strokeWidth="0.8"
            opacity={0.8 + shimmer * 0.2}
          />
        </g>

        {/* Impact Compression Sparks on Stamping Hit */}
        {isImpact && (
          <g key="impact-flash">
            <polygon
              points={topFace(iso, -2.5, -1.2, 2.5, 1.2, 0.52)}
              fill="none"
              stroke="#34D399"
              strokeWidth="2.5"
              filter="url(#iso-impact-glow)"
            />
          </g>
        )}
      </g>
    ),
  });

  // --- 4. Overhead Hydraulic Stamping Die (Moves Up and Down) ---
  elements.push({
    k: 12,
    el: (
      <g key="hydraulic-ram">
        <IsoBlock
          iso={iso}
          x={-2.2}
          y={-1.0}
          z={ramZ}
          w={4.4}
          d={2.0}
          h={0.6}
          color="#475569"
          top="#64748B"
          left="#334155"
          right="#1E293B"
          stroke="#94A3B8"
          sw={0.8}
        />
        {/* Overhead Stamping Head Crossbeam */}
        <IsoBlock
          iso={iso}
          x={-2.6}
          y={-1.4}
          z={ramZ + 0.6}
          w={5.2}
          d={2.8}
          h={0.4}
          color="#1E293B"
          top="#334155"
          left="#0F172A"
          right="#020617"
          stroke="#475569"
          sw={0.8}
        />
      </g>
    ),
  });

  // --- 5. Robotic Laser Engraving Beam (Actively Engraving SEDENA Security QR) ---
  const [lx, ly] = iso.p(laserX, laserY, 0.51);
  const [lhx, lhy] = iso.p(laserX, laserY, 2.6);
  elements.push({
    k: 20,
    el: (
      <g key="laser-arm">
        {/* Laser Emitter Carriage on Gantry */}
        <circle cx={lhx} cy={lhy} r="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
        {/* Laser Beam */}
        <line
          x1={lhx}
          y1={lhy}
          x2={lx}
          y2={ly}
          stroke="#38BDF8"
          strokeWidth="2.2"
          filter="url(#iso-impact-glow)"
          opacity="0.9"
        />
        {/* Laser Impact Spark Point */}
        <circle cx={lx} cy={ly} r="3.5" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx={lx} cy={ly} r="7" fill="none" stroke="#34D399" strokeWidth="0.8" opacity="0.75" />
      </g>
    ),
  });

  // --- 6. Live Digital Treasury Meter (Floating HUD Display) ---
  elements.push({
    k: 25,
    el: (
      <g key="hud-meter" transform={matrixLeft(iso, 2.2, -2.4, 1.8)}>
        <rect
          x="-4"
          y="-12"
          width="74"
          height="22"
          rx="5"
          fill="#0F172A"
          stroke="#10B981"
          strokeWidth="1.2"
          filter="url(#iso-shadow)"
        />
        <text
          x="3"
          y="-3"
          fill="#94A3B8"
          fontFamily="monospace"
          fontSize="4.8"
          fontWeight="bold"
        >
          AHORRO TENENCIA:
        </text>
        <text
          x="3"
          y="6.5"
          fill="#34D399"
          fontFamily="monospace"
          fontSize="8.5"
          fontWeight="900"
        >
          ${savingsAmount.toLocaleString()} MXN
        </text>
      </g>
    ),
  });

  elements.sort((a, b) => a.k - b.k);

  return (
    <svg
      viewBox="0 0 520 340"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        <IsoDefs />
        <linearGradient id="holo-morelos" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="30%" stopColor="#38BDF8" />
          <stop offset="65%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <filter id="iso-impact-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {elements.map((item) => item.el)}
    </svg>
  );
}
