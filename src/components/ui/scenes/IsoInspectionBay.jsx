import React from "react";
import {
  createIso,
  IsoBlock,
  IsoDefs,
  useAnimationTime,
  leftFace,
  rightFace,
  topFace,
} from "../iso-engine";

export default function IsoInspectionBay() {
  const time = useAnimationTime();
  
  // Calibrated scale s = 36 and viewBox 500x320 with ox = 250, oy = 175
  // Guarantees generous margins on all sides: NO CLIPPING, NO CUT-OFFS
  const iso = createIso({ ox: 250, oy: 175, s: 36 });

  // Laser scanner sweep oscillation across car (X: -1.8 to 1.8)
  const sweep = Math.sin(time * 2.2) * 1.8;

  // Dyno roller rotation angle
  const rollerAngle = (time * 16) % (Math.PI * 2);

  // Status cycle (Scan vs Verified)
  const isApproved = Math.sin(time * 0.9) > -0.2;
  const statusColor = isApproved ? "#10B981" : "#F59E0B";
  const statusLabel = isApproved ? "APROBADO · HOLOGRAMA 00" : "ESCANEANDO EMISIONES...";

  // Car suspension micro-bobbing on dyno rollers
  const carBob = Math.sin(time * 18) * 0.012;

  const carX = -0.1;
  const carY = -0.1;
  const carZ = 0.36 + carBob;

  const elements = [];

  // --- 1. Base Inspection Floor Platform ---
  elements.push({
    k: -10,
    el: (
      <g key="platform">
        {/* Soft Floor Shadow */}
        <polygon
          points={topFace(iso, -3.8, -2.6, 3.8, 2.6, -0.05)}
          fill="rgba(15,23,42,0.1)"
          filter="url(#iso-shadow)"
        />
        {/* Main Foundation Slab */}
        <IsoBlock
          iso={iso}
          x={-3.6}
          y={-2.4}
          z={0}
          w={7.2}
          d={4.8}
          h={0.28}
          color="#F1F5F9"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(148,163,184,0.3)"
          sw={0.8}
        />

        {/* Vehicle Inspection Lane (Dark Epoxy Asphalt) */}
        <polygon
          points={topFace(iso, -3.4, -1.3, 3.4, 1.3, 0.29)}
          fill="#1E293B"
          stroke="rgba(51,65,85,0.6)"
          strokeWidth="0.8"
        />

        {/* Safety Hazard Yellow Borders */}
        <polygon
          points={topFace(iso, -3.4, -1.3, 3.4, -1.15, 0.3)}
          fill="#FACC15"
          opacity="0.9"
        />
        <polygon
          points={topFace(iso, -3.4, 1.15, 3.4, 1.3, 0.3)}
          fill="#FACC15"
          opacity="0.9"
        />

        {/* Center Guide Line Dashes */}
        {[-2.4, -1.2, 0, 1.2, 2.4].map((dx, i) => (
          <polygon
            key={i}
            points={topFace(iso, dx - 0.35, -0.05, dx + 0.35, 0.05, 0.3)}
            fill="#FFFFFF"
            opacity="0.85"
          />
        ))}

        {/* Dyno Roller Pits (Front & Rear) */}
        <polygon
          points={topFace(iso, -1.7, -1.0, -0.7, 1.0, 0.295)}
          fill="#0B0F17"
          stroke="#334155"
          strokeWidth="0.6"
        />
        <polygon
          points={topFace(iso, 0.7, -1.0, 1.7, 1.0, 0.295)}
          fill="#0B0F17"
          stroke="#334155"
          strokeWidth="0.6"
        />
      </g>
    ),
  });

  // --- 2. Dyno Rollers (High Detail Spinning Cylinders) ---
  [-1.4, -1.0, 1.0, 1.4].forEach((rx, idx) => {
    elements.push({
      k: rx - 0.5,
      el: (
        <g key={`roller-${idx}`}>
          <IsoBlock
            iso={iso}
            x={rx - 0.1}
            y={-0.95}
            z={0.24}
            w={0.2}
            d={1.9}
            h={0.14}
            color="#334155"
            top="#475569"
            left="#1E293B"
            right="#0F172A"
          />
          {/* Animated Knurled Roller Spin Highlight */}
          <line
            x1={iso.p(rx, -0.95, 0.32 + Math.sin(rollerAngle) * 0.04)[0]}
            y1={iso.p(rx, -0.95, 0.32 + Math.sin(rollerAngle) * 0.04)[1]}
            x2={iso.p(rx, 0.95, 0.32 + Math.sin(rollerAngle) * 0.04)[0]}
            y2={iso.p(rx, 0.95, 0.32 + Math.sin(rollerAngle) * 0.04)[1]}
            stroke="#94A3B8"
            strokeWidth="1.6"
            opacity="0.9"
          />
        </g>
      ),
    });
  });

  // --- 3. Diagnostics Station Kiosk (Background Left) ---
  elements.push({
    k: -2.8,
    el: (
      <g key="diag-terminal">
        {/* Kiosk Pillar */}
        <IsoBlock
          iso={iso}
          x={-2.8}
          y={-1.9}
          z={0.28}
          w={0.6}
          d={0.4}
          h={1.4}
          color="#1E293B"
          top="#334155"
          left="#0F172A"
          right="#020617"
        />
        {/* Kiosk Monitor */}
        <IsoBlock
          iso={iso}
          x={-2.9}
          y={-1.95}
          z={1.68}
          w={0.8}
          d={0.5}
          h={0.6}
          color="#0F172A"
          top="#1E293B"
          left="#0284C7"
          right="#020617"
          stroke="#38BDF8"
          sw={0.8}
        />
        {/* Glowing Screen Face */}
        <polygon
          points={leftFace(iso, -1.45, -2.85, -2.15, 1.72, 2.22)}
          fill="#0B132B"
          stroke="#00F0FF"
          strokeWidth="0.8"
        />
        <circle
          cx={iso.p(-2.5, -1.44, 2.05)[0]}
          cy={iso.p(-2.5, -1.44, 2.05)[1]}
          r="2.5"
          fill="#10B981"
          filter="url(#iso-glow)"
        />
      </g>
    ),
  });

  // --- 4. Large Realistic Sports Sedan ---
  const carK = carX + carY;
  elements.push({
    k: carK,
    el: (
      <g key="car">
        {/* Car Cast Shadow */}
        <polygon
          points={topFace(iso, carX - 1.9, carY - 0.9, carX + 1.9, carY + 0.9, 0.295)}
          fill="rgba(0,0,0,0.45)"
          filter="url(#iso-shadow)"
        />

        {/* 4 Wheels positioned exactly on dyno rollers */}
        {[
          [carX - 1.2, carY - 0.78],
          [carX + 1.2, carY - 0.78],
          [carX - 1.2, carY + 0.78],
          [carX + 1.2, carY + 0.78],
        ].map(([wx, wy], i) => (
          <g key={`wheel-${i}`}>
            <IsoBlock
              iso={iso}
              x={wx - 0.26}
              y={wy - 0.12}
              z={carZ - 0.16}
              w={0.52}
              d={0.24}
              h={0.52}
              color="#0F172A"
              top="#1E293B"
              left="#020617"
              right="#0F172A"
            />
            {/* Red Brake Caliper */}
            <circle
              cx={iso.p(wx - 0.08, wy + 0.13, carZ + 0.1)[0]}
              cy={iso.p(wx - 0.08, wy + 0.13, carZ + 0.1)[1]}
              r="2.8"
              fill="#EF4444"
            />
            {/* Silver Rim */}
            <circle
              cx={iso.p(wx, wy + 0.13, carZ + 0.08)[0]}
              cy={iso.p(wx, wy + 0.13, carZ + 0.08)[1]}
              r="4.0"
              fill="#CBD5E1"
              stroke="#64748B"
              strokeWidth="0.8"
            />
            {/* Lime Center Nut */}
            <circle
              cx={iso.p(wx, wy + 0.13, carZ + 0.08)[0]}
              cy={iso.p(wx, wy + 0.13, carZ + 0.08)[1]}
              r="1.8"
              fill="#84CC16"
            />
          </g>
        ))}

        {/* Carbon Front Splitter */}
        <IsoBlock
          iso={iso}
          x={carX + 1.75}
          y={carY - 0.68}
          z={carZ + 0.05}
          w={0.2}
          d={1.36}
          h={0.08}
          color="#0F172A"
        />

        {/* Flexible Exhaust Emissions Probe Tube */}
        <line
          x1={iso.p(carX - 1.85, carY - 0.35, carZ + 0.08)[0]}
          y1={iso.p(carX - 1.85, carY - 0.35, carZ + 0.08)[1]}
          x2={iso.p(-2.5, -1.6, 0.32)[0]}
          y2={iso.p(-2.5, -1.6, 0.32)[1]}
          stroke="#475569"
          strokeWidth="3.0"
          strokeDasharray="4 2"
        />

        {/* Main Lower Chassis Body (Pearl White Clearcoat) */}
        <IsoBlock
          iso={iso}
          x={carX - 1.8}
          y={carY - 0.74}
          z={carZ + 0.08}
          w={3.6}
          d={1.48}
          h={0.48}
          color="#F8FAFC"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(100,116,139,0.3)"
          sw={0.8}
        />

        {/* Side Skirt Neon Lime Accent */}
        <polygon
          points={leftFace(iso, carY + 0.745, carX - 1.6, carX + 1.6, carZ + 0.1, carZ + 0.17)}
          fill="#84CC16"
        />

        {/* Front Radiator Grille */}
        <polygon
          points={rightFace(iso, carX + 1.805, carY - 0.42, carY + 0.42, carZ + 0.15, carZ + 0.34)}
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="0.8"
        />

        {/* Side Rearview Mirrors */}
        <IsoBlock
          iso={iso}
          x={carX + 0.5}
          y={carY - 0.84}
          z={carZ + 0.58}
          w={0.16}
          d={0.14}
          h={0.12}
          color="#0F172A"
        />
        <IsoBlock
          iso={iso}
          x={carX + 0.5}
          y={carY + 0.7}
          z={carZ + 0.58}
          w={0.16}
          d={0.14}
          h={0.12}
          color="#0F172A"
        />

        {/* Upper Cabin Greenhouse / Roof */}
        <IsoBlock
          iso={iso}
          x={carX - 0.9}
          y={carY - 0.64}
          z={carZ + 0.56}
          w={1.9}
          d={1.28}
          h={0.44}
          color="#F1F5F9"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(100,116,139,0.3)"
          sw={0.8}
        />

        {/* Raked Front Windshield Glass */}
        <polygon
          points={iso.pts([
            [carX + 1.05, carY - 0.62, carZ + 0.56],
            [carX + 1.05, carY + 0.62, carZ + 0.56],
            [carX + 0.65, carY + 0.62, carZ + 0.98],
            [carX + 0.65, carY - 0.62, carZ + 0.98],
          ])}
          fill="url(#iso-windshield)"
          stroke="#38BDF8"
          strokeWidth="1.0"
        />

        {/* Rear Windshield Glass */}
        <polygon
          points={iso.pts([
            [carX - 0.9, carY - 0.62, carZ + 0.98],
            [carX - 0.9, carY + 0.62, carZ + 0.98],
            [carX - 1.3, carY + 0.62, carZ + 0.56],
            [carX - 1.3, carY - 0.62, carZ + 0.56],
          ])}
          fill="url(#iso-windshield)"
          stroke="#38BDF8"
          strokeWidth="1.0"
        />

        {/* Side Passenger Windows */}
        <polygon
          points={leftFace(iso, carY + 0.645, carX - 0.8, carX + 0.6, carZ + 0.6, carZ + 0.94)}
          fill="url(#iso-windshield)"
          stroke="#0284C7"
          strokeWidth="0.8"
        />

        {/* Dual LED Projector Headlights (Neon Cyan Glow) */}
        <polygon
          points={rightFace(iso, carX + 1.805, carY - 0.64, carY - 0.36, carZ + 0.3, carZ + 0.44)}
          fill="#38BDF8"
          filter="url(#iso-glow-cyan)"
        />
        <polygon
          points={rightFace(iso, carX + 1.805, carY + 0.36, carY + 0.64, carZ + 0.3, carZ + 0.44)}
          fill="#38BDF8"
          filter="url(#iso-glow-cyan)"
        />

        {/* Volumetric Headlight Light Beams */}
        <polygon
          points={iso.pts([
            [carX + 1.82, carY - 0.55, 0.3],
            [carX + 3.4, carY - 1.1, 0.3],
            [carX + 3.4, carY + 1.1, 0.3],
            [carX + 1.82, carY + 0.55, 0.3],
          ])}
          fill="url(#iso-cyan-fan)"
          opacity="0.4"
        />

        {/* Active Laser Scan Highlight Line ON Car Body (Synched with Sweep) */}
        {sweep >= carX - 1.8 && sweep <= carX + 1.8 && (
          <g>
            {/* Top Roof / Hood laser line */}
            <line
              x1={iso.p(sweep, carY - 0.6, carZ + (sweep > carX - 0.9 && sweep < carX + 0.65 ? 1.0 : 0.58))[0]}
              y1={iso.p(sweep, carY - 0.6, carZ + (sweep > carX - 0.9 && sweep < carX + 0.65 ? 1.0 : 0.58))[1]}
              x2={iso.p(sweep, carY + 0.6, carZ + (sweep > carX - 0.9 && sweep < carX + 0.65 ? 1.0 : 0.58))[0]}
              y2={iso.p(sweep, carY + 0.6, carZ + (sweep > carX - 0.9 && sweep < carX + 0.65 ? 1.0 : 0.58))[1]}
              stroke="#A3E635"
              strokeWidth="2.8"
              filter="url(#iso-glow)"
            />
          </g>
        )}
      </g>
    ),
  });

  // --- 5. Stationary Inspection Gantry with Sweeping Volumetric Laser ---
  // To avoid cutting through the car or sorting errors, the arch is positioned elegantly
  // as the official bay frame with vertical laser sweeps
  elements.push({
    k: 3.5, // Front gantry frame (drawn after car)
    el: (
      <g key="laser-gantry">
        {/* Left Column */}
        <IsoBlock
          iso={iso}
          x={-2.2}
          y={1.4}
          z={0.28}
          w={0.3}
          d={0.3}
          h={1.9}
          color="#0F172A"
          top="#334155"
          left="#1E293B"
          right="#020617"
        />
        {/* Right Column */}
        <IsoBlock
          iso={iso}
          x={2.0}
          y={1.4}
          z={0.28}
          w={0.3}
          d={0.3}
          h={1.9}
          color="#0F172A"
          top="#334155"
          left="#1E293B"
          right="#020617"
        />
        {/* Top Connecting Rail */}
        <IsoBlock
          iso={iso}
          x={-2.2}
          y={1.4}
          z={2.18}
          w={4.5}
          d={0.3}
          h={0.22}
          color="#0F172A"
          top="#334155"
          left="#1E293B"
          right="#020617"
        />
        {/* Glowing Green Gantry Status Strip */}
        <line
          x1={iso.p(-2.0, 1.41, 2.25)[0]}
          y1={iso.p(-2.0, 1.41, 2.25)[1]}
          x2={iso.p(2.1, 1.41, 2.25)[0]}
          y2={iso.p(2.1, 1.41, 2.25)[1]}
          stroke="#84CC16"
          strokeWidth="2.5"
          filter="url(#iso-glow)"
        />

        {/* Sweeping Laser Plane projecting down from rail */}
        <polygon
          points={iso.pts([
            [sweep - 0.2, -1.3, 2.2],
            [sweep + 0.2, 1.3, 2.2],
            [sweep + 0.2, 1.3, 0.3],
            [sweep - 0.2, -1.3, 0.3],
          ])}
          fill="url(#iso-laser-fan)"
          opacity="0.65"
        />

        {/* Ground Laser Beam Highlight */}
        <line
          x1={iso.p(sweep, -1.3, 0.31)[0]}
          y1={iso.p(sweep, -1.3, 0.31)[1]}
          x2={iso.p(sweep, 1.3, 0.31)[0]}
          y2={iso.p(sweep, 1.3, 0.31)[1]}
          stroke="#A3E635"
          strokeWidth="2.6"
          filter="url(#iso-glow)"
        />
      </g>
    ),
  });

  elements.sort((a, b) => a.k - b.k);

  // HUD Anchor atop car (well within viewBox 500x320)
  const [tagX, tagY] = iso.p(carX, carY, carZ + 1.25);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 500 320"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <IsoDefs />
        {elements.map((item) => item.el)}
      </svg>
    </div>
  );
}
