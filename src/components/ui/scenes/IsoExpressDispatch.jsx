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

export default function IsoExpressDispatch() {
  const time = useAnimationTime();

  // Calibrated scale s = 38 with ox = 260, oy = 175
  const iso = createIso({ ox: 260, oy: 175, s: 38 });

  // 1. Conveyor Belt Transit Motion (Briefcase moves along X)
  const caseSlide = Math.sin(time * 2.0) * 0.35;

  // 2. Motorized Locking Clasp Snap (Cycles open/closed)
  const claspSnap = Math.abs(Math.sin(time * 2.5));
  const isLocked = claspSnap > 0.6;

  // 3. Expanding GPS Radar Signal Wave
  const radarWave = ((time * 0.9) % 1) * 2.6;
  const radarOpacity = Math.max(0, 1 - radarWave / 2.6);

  // 4. Barcode Scanner Laser oscillation
  const barcodeLaser = Math.sin(time * 3.6) * 0.8;

  const elements = [];

  // --- 1. Base Logistics Conveyor Foundation ---
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
        {/* Logistics Green Runway Floor */}
        <polygon
          points={topFace(iso, -3.2, -1.9, 3.2, 1.9, 0.33)}
          fill="#14532D"
          stroke="#84CC16"
          strokeWidth="1.0"
          strokeDasharray="4 2"
        />
        {/* Conveyor Belt Inset Track */}
        <polygon
          points={topFace(iso, -3.0, -1.2, 3.0, 1.2, 0.34)}
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="0.8"
        />
      </g>
    ),
  });

  // --- 2. Conveyor Motorized Rollers (Cylindrical visual simulation) ---
  [-2.2, -1.1, 0, 1.1, 2.2].forEach((rx, i) => {
    elements.push({
      k: -5 + i,
      el: (
        <polygon
          key={`roller-${i}`}
          points={topFace(iso, rx - 0.25, -1.1, rx + 0.25, 1.1, 0.35)}
          fill="#475569"
          stroke="#64748B"
          strokeWidth="0.5"
        />
      ),
    });
  });

  // --- 3. Heavy-Duty Sealed Notarial Briefcase (Moving on Conveyor) ---
  const bx = caseSlide;
  elements.push({
    k: 5,
    el: (
      <g key="security-briefcase">
        {/* Briefcase Lower Body */}
        <IsoBlock
          iso={iso}
          x={bx - 1.6}
          y={-1.0}
          z={0.38}
          w={3.2}
          d={2.0}
          h={1.0}
          color="#1E293B"
          top="#334155"
          left="#0F172A"
          right="#020617"
          stroke="#64748B"
          sw={0.8}
        />

        {/* 4 Reinforced Golden Aluminum Corner Protectors */}
        {[
          [bx - 1.6, -1.0],
          [bx + 1.3, -1.0],
          [bx - 1.6, 0.7],
          [bx + 1.3, 0.7],
        ].map(([cx, cy], i) => (
          <IsoBlock
            key={`corner-${i}`}
            iso={iso}
            x={cx}
            y={cy}
            z={1.0}
            w={0.3}
            d={0.3}
            h={0.38}
            color="#EAB308"
            top="#FEF08A"
            left="#CA8A04"
            right="#A16207"
            stroke="#713F12"
            sw={0.5}
          />
        ))}

        {/* Center Digital Electronic Lock Pad */}
        <IsoBlock
          iso={iso}
          x={bx - 0.35}
          y={1.02}
          z={0.65}
          w={0.7}
          d={0.12}
          h={0.4}
          color={isLocked ? "#84CC16" : "#EAB308"}
          top={isLocked ? "#BEF264" : "#FEF08A"}
          left={isLocked ? "#65A30D" : "#CA8A04"}
          right={isLocked ? "#4D7C0F" : "#A16207"}
          stroke="#0F172A"
          sw={0.5}
        />

        {/* Tamper-Evident Holographic Folio Ribbon across top seam */}
        <polygon
          points={topFace(iso, bx - 1.4, -0.3, bx + 1.4, 0.3, 1.39)}
          fill="#84CC16"
          stroke="#65A30D"
          strokeWidth="0.8"
        />
        <g transform={matrixTop(iso, bx - 1.25, -0.05, 1.4)}>
          <text
            x="0"
            y="0"
            fill="#0F172A"
            fontFamily="monospace"
            fontWeight="900"
            fontSize="4.8"
            letterSpacing="0.8"
          >
            FOLIO NOTARIAL #CN-88492
          </text>
        </g>
      </g>
    ),
  });

  // --- 4. Overhead Barcode Laser Scanner Bar ---
  elements.push({
    k: 15,
    el: (
      <g key="barcode-scanner">
        <IsoBlock
          iso={iso}
          x={-0.3}
          y={-1.4}
          z={2.1}
          w={0.6}
          d={2.8}
          h={0.25}
          color="#0F172A"
          top="#334155"
          left="#020617"
          right="#020617"
          stroke="#84CC16"
          sw={0.8}
        />
        {/* Red Barcode Laser Line */}
        <line
          x1={iso.p(barcodeLaser, -0.8, 1.41)[0]}
          y1={iso.p(barcodeLaser, -0.8, 1.41)[1]}
          x2={iso.p(barcodeLaser, 0.8, 1.41)[0]}
          y2={iso.p(barcodeLaser, 0.8, 1.41)[1]}
          stroke="#EF4444"
          strokeWidth="2.2"
          filter="url(#iso-shadow)"
        />
      </g>
    ),
  });

  // --- 5. GPS Dispatch Telemetry Radar & Live Countdown Display ---
  elements.push({
    k: 22,
    el: (
      <g key="gps-hud" transform={matrixLeft(iso, 2.0, -2.3, 1.9)}>
        <rect
          x="-4"
          y="-14"
          width="80"
          height="28"
          rx="5"
          fill="#0F172A"
          stroke="#84CC16"
          strokeWidth="1.2"
          filter="url(#iso-shadow)"
        />
        <text x="3" y="-5" fill="#BEF264" fontFamily="monospace" fontSize="5.0" fontWeight="bold">
          ⚡ DESPACHO 24H EXPRESS
        </text>
        <text x="3" y="2" fill="#84CC16" fontFamily="monospace" fontSize="5.5" fontWeight="900">
          EN RUTA A DOMICILIO
        </text>
        <text x="3" y="9" fill="#94A3B8" fontFamily="monospace" fontSize="4.2">
          ACUSE SELLADO EN MANO
        </text>
      </g>
    ),
  });

  // GPS Wave
  elements.push({
    k: 25,
    el: (
      <polygon
        key="radar-ring"
        points={topFace(
          iso,
          -radarWave * 0.9,
          -radarWave * 0.9,
          radarWave * 0.9,
          radarWave * 0.9,
          0.36
        )}
        fill="none"
        stroke="#84CC16"
        strokeWidth="1.5"
        opacity={radarOpacity}
      />
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
      </defs>
      {elements.map((item) => item.el)}
    </svg>
  );
}
