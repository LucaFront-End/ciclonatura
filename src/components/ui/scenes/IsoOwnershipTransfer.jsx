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

export default function IsoOwnershipTransfer() {
  const time = useAnimationTime();

  // Calibrated scale s = 38 with ox = 260, oy = 175
  const iso = createIso({ ox: 260, oy: 175, s: 38 });

  // 1. Motorized Card Sliding in and out of scanner bay
  const cardSlide = Math.sin(time * 1.8) * 0.45;

  // 2. High-speed forensic laser scanner oscillating across card (X: -1.6 to 1.6)
  const laserX = Math.sin(time * 3.4) * 1.6;

  // 3. Stamping Arm Mechanical Downstroke
  const stampPhase = Math.sin(time * 2.2);
  const isStamping = stampPhase > 0.65;
  const stampZ = isStamping ? 0.65 : 1.5 - stampPhase * 0.3;

  // 4. Digital data telemetry pulse
  const dataPulse = (Math.sin(time * 4.5) + 1) / 2;

  const elements = [];

  // --- 1. Base Security Forensic Platform ---
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
        {/* Sky-Blue Optical Reader Bed Grid */}
        <polygon
          points={topFace(iso, -3.2, -1.9, 3.2, 1.9, 0.33)}
          fill="#082F49"
          stroke="#0284C7"
          strokeWidth="1.0"
          strokeDasharray="4 2"
        />
      </g>
    ),
  });

  // --- 2. Motorized Conveyor Guides & Rollers ---
  [-1.4, 1.4].forEach((gy, i) => {
    elements.push({
      k: -5 + i,
      el: (
        <IsoBlock
          key={`guide-${i}`}
          iso={iso}
          x={-2.8}
          y={gy}
          z={0.33}
          w={5.6}
          d={0.3}
          h={0.25}
          color="#334155"
          top="#64748B"
          left="#1E293B"
          right="#0F172A"
          stroke="#0284C7"
          sw={0.6}
        />
      ),
    });
  });

  // --- 3. The Official Tarjeta de Circulación con Chip Inteligente ---
  const cx = cardSlide;
  elements.push({
    k: 5,
    el: (
      <g key="smart-card">
        {/* Card 3D Body */}
        <IsoBlock
          iso={iso}
          x={cx - 1.8}
          y={-1.1}
          z={0.35}
          w={3.6}
          d={2.2}
          h={0.12}
          color="#0F172A"
          top="#1E293B"
          left="#0F172A"
          right="#020617"
          stroke="#38BDF8"
          sw={0.8}
        />

        {/* Card Face Inset */}
        <polygon
          points={topFace(iso, cx - 1.7, -1.0, cx + 1.7, 1.0, 0.48)}
          fill="#0F172A"
          stroke="#0284C7"
          strokeWidth="0.8"
        />

        {/* Header Text */}
        <g transform={matrixTop(iso, cx - 1.5, -0.75, 0.49)}>
          <text
            x="0"
            y="0"
            fill="#38BDF8"
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="5.2"
            letterSpacing="0.8"
          >
            TARJETA DE CIRCULACIÓN CON CHIP
          </text>
        </g>

        {/* Smart Gold Microchip */}
        <polygon
          points={topFace(iso, cx - 1.5, -0.3, cx - 0.9, 0.3, 0.49)}
          fill="#F59E0B"
          stroke="#FEF08A"
          strokeWidth="0.8"
        />

        {/* Data Fields */}
        <g transform={matrixTop(iso, cx - 0.7, -0.25, 0.49)}>
          <text x="0" y="0" fill="#94A3B8" fontFamily="monospace" fontSize="4.0">
            TITULAR: PROPIETARIO VALIDADO
          </text>
          <text x="0" y="7" fill="#38BDF8" fontFamily="monospace" fontSize="4.0">
            REPUVE: #MX-2026-ACTIVO
          </text>
          <text x="0" y="14" fill="#34D399" fontFamily="monospace" fontSize="4.4" fontWeight="bold">
            ✓ ENDOSO NOTARIAL COTEJADO
          </text>
        </g>
      </g>
    ),
  });

  // --- 4. Scanning Optical Laser Bridge & Moving Laser Line ---
  elements.push({
    k: 12,
    el: (
      <g key="laser-scanner">
        {/* Overhead Laser Scanner Carriage */}
        <IsoBlock
          iso={iso}
          x={laserX - 0.15}
          y={-1.5}
          z={1.8}
          w={0.3}
          d={3.0}
          h={0.25}
          color="#0284C7"
          top="#38BDF8"
          left="#0369A1"
          right="#075985"
          stroke="#BAE6FD"
          sw={0.6}
        />

        {/* Downward Laser Beam Sheet */}
        <polygon
          points={[
            iso.p(laserX, -1.3, 1.8).join(","),
            iso.p(laserX, 1.3, 1.8).join(","),
            iso.p(laserX, 1.3, 0.49).join(","),
            iso.p(laserX, -1.3, 0.49).join(","),
          ].join(" ")}
          fill="rgba(56,189,248,0.25)"
          stroke="#38BDF8"
          strokeWidth="1.8"
          filter="url(#iso-laser-glow)"
        />
        {/* Laser Impact Line on Card */}
        <line
          x1={iso.p(laserX, -1.1, 0.5)[0]}
          y1={iso.p(laserX, -1.1, 0.5)[1]}
          x2={iso.p(laserX, 1.1, 0.5)[0]}
          y2={iso.p(laserX, 1.1, 0.5)[1]}
          stroke="#34D399"
          strokeWidth="3.0"
          strokeLinecap="round"
        />
      </g>
    ),
  });

  // --- 5. Automatic Notarial Embossing Stamp (Right Side) ---
  elements.push({
    k: 15,
    el: (
      <g key="notarial-stamp">
        {/* Stamp Body Column */}
        <IsoBlock
          iso={iso}
          x={1.7}
          y={-1.5}
          z={stampZ}
          w={1.1}
          d={1.1}
          h={1.3}
          color="#0284C7"
          top="#38BDF8"
          left="#0369A1"
          right="#075985"
          stroke="#BAE6FD"
          sw={0.6}
        />
        {/* Stamp Round Head Flange */}
        <IsoBlock
          iso={iso}
          x={1.55}
          y={-1.65}
          z={stampZ}
          w={1.4}
          d={1.4}
          h={0.2}
          color="#F0F9FF"
          top="#FFFFFF"
          left="#BAE6FD"
          right="#7DD3FC"
          stroke="#0284C7"
          sw={0.6}
        />
        {/* Stamped Seal On Base when down */}
        {isStamping && (
          <circle
            cx={iso.p(2.25, -0.95, 0.35)[0]}
            cy={iso.p(2.25, -0.95, 0.35)[1]}
            r="12"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        )}
      </g>
    ),
  });

  // --- 6. Live Holographic Audit HUD Screen (Floating Terminal) ---
  elements.push({
    k: 25,
    el: (
      <g key="hud-audit-terminal" transform={matrixLeft(iso, 2.0, -2.4, 1.9)}>
        <rect
          x="-4"
          y="-14"
          width="82"
          height="28"
          rx="5"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="1.2"
          filter="url(#iso-shadow)"
        />
        <text x="3" y="-5" fill="#38BDF8" fontFamily="monospace" fontSize="4.8" fontWeight="bold">
          REPUVE: EN VIVO
        </text>
        <text x="3" y="2" fill="#34D399" fontFamily="monospace" fontSize="5.5" fontWeight="900">
          ✓ SIN REPORTE DE ROBO
        </text>
        <text x="3" y="9" fill="#94A3B8" fontFamily="monospace" fontSize="4.2">
          FOLIO: #MX-2026-VAL
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
        <filter id="iso-laser-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.0" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {elements.map((item) => item.el)}
    </svg>
  );
}
