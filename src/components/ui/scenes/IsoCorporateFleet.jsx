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

export default function IsoCorporateFleet() {
  const time = useAnimationTime();

  // Calibrated scale s = 38 with ox = 260, oy = 175
  const iso = createIso({ ox: 260, oy: 175, s: 38 });

  // 1. Data Packet Flow across vehicles to CFDI Vault (Animated pulse positions)
  const packet1 = (time * 1.8) % 1;
  const packet2 = (time * 1.8 + 0.33) % 1;
  const packet3 = (time * 1.8 + 0.66) % 1;

  // 2. Turntable rotation indicator
  const rotPulse = (Math.sin(time * 3.5) + 1) / 2;

  // 3. Timbrado UUID cycle
  const uuidChars = ["4F9A", "882C", "E01B", "99FD"];
  const currentUuid = uuidChars[Math.floor((time * 0.8) % uuidChars.length)];

  const elements = [];

  // --- 1. Base Corporate Command Foundation ---
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
        {/* Indigo Corporate Network Floor */}
        <polygon
          points={topFace(iso, -3.2, -1.9, 3.2, 1.9, 0.33)}
          fill="#1E1B4B"
          stroke="#6366F1"
          strokeWidth="1.0"
          strokeDasharray="4 2"
        />
      </g>
    ),
  });

  // --- 2. 3 Vehicle Platforms with Rotating Telemetry Rings ---

  // Unit 01: Delivery Van (Left)
  elements.push({
    k: 2,
    el: (
      <g key="fleet-van">
        {/* Raised Platform */}
        <IsoBlock
          iso={iso}
          x={-2.6}
          y={-1.5}
          z={0.33}
          w={1.3}
          d={1.7}
          h={0.7}
          color="#312E81"
          top="#4338CA"
          left="#1E1B4B"
          right="#1E1B4B"
          stroke="#6366F1"
          sw={0.6}
        />
        {/* Van Cabin Upper Block */}
        <IsoBlock
          iso={iso}
          x={-2.4}
          y={-1.3}
          z={1.03}
          w={1.0}
          d={1.3}
          h={0.5}
          color="#E0E7FF"
          top="#FFFFFF"
          left="#C7D2FE"
          right="#A5B4FC"
          stroke="#4338CA"
          sw={0.5}
        />
        {/* Telemetry Ring */}
        <polygon
          points={topFace(iso, -2.7, -1.6, -1.2, 0.3, 0.34)}
          fill="none"
          stroke="#818CF8"
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />
      </g>
    ),
  });

  // Unit 02: Executive SUV (Center-Back)
  elements.push({
    k: 4,
    el: (
      <g key="fleet-suv">
        {/* Raised Platform */}
        <IsoBlock
          iso={iso}
          x={-0.65}
          y={-1.8}
          z={0.33}
          w={1.4}
          d={1.6}
          h={0.7}
          color="#064E3B"
          top="#059669"
          left="#022C22"
          right="#022C22"
          stroke="#10B981"
          sw={0.6}
        />
        {/* SUV Roof Upper Block */}
        <IsoBlock
          iso={iso}
          x={-0.5}
          y={-1.6}
          z={1.03}
          w={1.1}
          d={1.2}
          h={0.48}
          color="#D1FAE5"
          top="#FFFFFF"
          left="#A7F3D0"
          right="#6EE7B7"
          stroke="#059669"
          sw={0.5}
        />
        {/* Telemetry Ring */}
        <polygon
          points={topFace(iso, -0.75, -1.9, 0.85, -0.1, 0.34)}
          fill="none"
          stroke="#34D399"
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />
      </g>
    ),
  });

  // Unit 03: Corporate Sedan (Right)
  elements.push({
    k: 6,
    el: (
      <g key="fleet-sedan">
        {/* Raised Platform */}
        <IsoBlock
          iso={iso}
          x={1.4}
          y={-1.5}
          z={0.33}
          w={1.3}
          d={1.6}
          h={0.6}
          color="#312E81"
          top="#4338CA"
          left="#1E1B4B"
          right="#1E1B4B"
          stroke="#6366F1"
          sw={0.6}
        />
        {/* Sedan Cabin Upper Block */}
        <IsoBlock
          iso={iso}
          x={1.55}
          y={-1.35}
          z={0.93}
          w={1.0}
          d={1.2}
          h={0.38}
          color="#E0E7FF"
          top="#FFFFFF"
          left="#C7D2FE"
          right="#A5B4FC"
          stroke="#4338CA"
          sw={0.5}
        />
        {/* Telemetry Ring */}
        <polygon
          points={topFace(iso, 1.3, -1.6, 2.8, 0.2, 0.34)}
          fill="none"
          stroke="#818CF8"
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />
      </g>
    ),
  });

  // --- 3. Flowing Data Fiber Lines with Moving Photons to Central CFDI Vault ---
  const linePoints = [
    { from: [-1.9, -0.6, 0.7], to: [-0.6, 0.2, 0.8], t: packet1 },
    { from: [0.0, -0.9, 0.7], to: [0.0, 0.2, 0.8], t: packet2 },
    { from: [2.0, -0.6, 0.6], to: [0.6, 0.2, 0.8], t: packet3 },
  ];

  linePoints.forEach((lp, i) => {
    const [p1x, p1y] = iso.p(...lp.from);
    const [p2x, p2y] = iso.p(...lp.to);
    const px = p1x + (p2x - p1x) * lp.t;
    const py = p1y + (p2y - p1y) * lp.t;

    elements.push({
      k: 10 + i,
      el: (
        <g key={`fiber-line-${i}`}>
          <line
            x1={p1x}
            y1={p1y}
            x2={p2x}
            y2={p2y}
            stroke="#818CF8"
            strokeWidth="1.6"
            strokeDasharray="3 2"
            opacity="0.6"
          />
          {/* Moving Photon Packet */}
          <circle cx={px} cy={py} r="3.5" fill="#34D399" filter="url(#iso-shadow)" />
        </g>
      ),
    });
  });

  // --- 4. Central SAT CFDI 4.0 Digital Tax Invoice Vault ---
  elements.push({
    k: 16,
    el: (
      <g key="cfdi-vault-slab">
        <IsoBlock
          iso={iso}
          x={-1.5}
          y={0.2}
          z={0.33}
          w={3.0}
          d={1.8}
          h={0.25}
          color="#1E1B4B"
          top="#312E81"
          left="#0F172A"
          right="#0F172A"
          stroke="#818CF8"
          sw={0.8}
        />

        {/* Top Face Inset */}
        <polygon
          points={topFace(iso, -1.4, 0.3, 1.4, 1.9, 0.59)}
          fill="#1E1B4B"
          stroke="#6366F1"
          strokeWidth="0.8"
        />

        {/* CFDI Text */}
        <g transform={matrixTop(iso, -1.2, 0.55, 0.6)}>
          <text
            x="0"
            y="0"
            fill="#818CF8"
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="5.2"
            letterSpacing="0.8"
          >
            FACTURA SAT CFDI 4.0
          </text>
          <text x="0" y="7" fill="#C7D2FE" fontFamily="monospace" fontSize="4.2">
            TIMBRE UUID: #{currentUuid}-2026-SAT
          </text>
          <text
            x="0"
            y="14"
            fill="#34D399"
            fontFamily="monospace"
            fontSize="5.8"
            fontWeight="900"
          >
            ✓ 100% DEDUCIBLE SAT
          </text>
        </g>
      </g>
    ),
  });

  // --- 5. Corporate Account Manager HUD Tag ---
  elements.push({
    k: 24,
    el: (
      <g key="corp-hud" transform={matrixLeft(iso, 2.0, -2.3, 1.8)}>
        <rect
          x="-4"
          y="-13"
          width="82"
          height="26"
          rx="5"
          fill="#0F172A"
          stroke="#818CF8"
          strokeWidth="1.2"
          filter="url(#iso-shadow)"
        />
        <text x="3" y="-4" fill="#818CF8" fontFamily="monospace" fontSize="4.6" fontWeight="bold">
          GESTOR ASIGNADO B2B:
        </text>
        <text x="3" y="4" fill="#34D399" fontFamily="monospace" fontSize="5.5" fontWeight="900">
          ✓ FLOTILLA PROTEGIDA
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
      </defs>
      {elements.map((item) => item.el)}
    </svg>
  );
}
