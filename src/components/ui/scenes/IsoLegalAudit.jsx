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

export default function IsoLegalAudit() {
  const time = useAnimationTime();
  
  // Calibrated scale s = 36 and viewBox 500x320 with ox = 250, oy = 175
  // Guarantees generous margins on all sides: NO CLIPPING, NO CUT-OFFS
  const iso = createIso({ ox: 250, oy: 175, s: 36 });

  // Floating document smooth levitation
  const docBob = Math.sin(time * 2.2) * 0.06;

  // Sweeping forensic laser oscillation across document (Y: -1.1 to 1.1)
  const laserSweep = Math.sin(time * 2.8) * 1.1;

  // REPUVE RFID antenna transmission ring expansion
  const rfidWave1 = ((time * 0.85) % 1) * 2.0 + 0.3;
  const rfidWave2 = (((time * 0.85) + 0.5) % 1) * 2.0 + 0.3;
  const waveOpac1 = Math.max(0, 1 - (rfidWave1 - 0.3) / 2.0);
  const waveOpac2 = Math.max(0, 1 - (rfidWave2 - 0.3) / 2.0);

  const elements = [];

  // --- 1. Base Security Verification Platform ---
  elements.push({
    k: -10,
    el: (
      <g key="pedestal">
        <polygon
          points={topFace(iso, -3.5, -2.4, 3.5, 2.4, -0.05)}
          fill="rgba(15,23,42,0.1)"
          filter="url(#iso-shadow)"
        />
        <IsoBlock
          iso={iso}
          x={-3.3}
          y={-2.2}
          z={0}
          w={6.6}
          d={4.4}
          h={0.28}
          color="#F1F5F9"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(148,163,184,0.3)"
          sw={0.8}
        />

        {/* Server Forensic Inset Floor with Cyan Security Matrix Grid */}
        <polygon
          points={topFace(iso, -3.0, -1.9, 3.0, 1.9, 0.29)}
          fill="#0B132B"
          stroke="#0284C7"
          strokeWidth="1.0"
        />

        {/* Tech Guideline Grid on Inset Floor */}
        <ellipse
          cx={iso.p(0, 0, 0.3)[0]}
          cy={iso.p(0, 0, 0.3)[1]}
          rx="90"
          ry="45"
          fill="none"
          stroke="#0284C7"
          strokeWidth="1.0"
          strokeDasharray="5 3"
          opacity="0.6"
        />
        <ellipse
          cx={iso.p(0, 0, 0.3)[0]}
          cy={iso.p(0, 0, 0.3)[1]}
          rx="55"
          ry="28"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="0.8"
          strokeDasharray="4 2"
          opacity="0.7"
        />
      </g>
    ),
  });

  // --- 2. Official REPUVE RFID Transponder Chip (Left Side) ---
  const rfidX = -1.6;
  const rfidY = 0.4;
  const rfidZ = 0.55 + Math.sin(time * 2.5 + 1) * 0.05;

  elements.push({
    k: rfidX + rfidY,
    el: (
      <g key="repuve-chip">
        {/* RFID Chip Shadow */}
        <polygon
          points={topFace(iso, rfidX - 0.6, rfidY - 0.75, rfidX + 0.6, rfidY + 0.75, 0.3)}
          fill="rgba(0,0,0,0.35)"
          filter="url(#iso-shadow)"
        />

        {/* Translucent Cyan Windshield Sticker Tag */}
        <IsoBlock
          iso={iso}
          x={rfidX - 0.55}
          y={rfidY - 0.7}
          z={rfidZ}
          w={1.1}
          d={1.4}
          h={0.06}
          color="#0284C7"
          top="#38BDF8"
          stroke="#00F0FF"
          sw={1.0}
          opacity={0.92}
        />

        {/* Copper Antenna Coils Pattern */}
        <polygon
          points={topFace(iso, rfidX - 0.42, rfidY - 0.55, rfidX + 0.42, rfidY + 0.55, rfidZ + 0.065)}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.2"
        />
        <polygon
          points={topFace(iso, rfidX - 0.28, rfidY - 0.35, rfidX + 0.28, rfidY + 0.35, rfidZ + 0.065)}
          fill="#0F172A"
          stroke="#F59E0B"
          strokeWidth="0.8"
        />

        {/* Pulsing RF Telemetry Wave Rings */}
        <ellipse
          cx={iso.p(rfidX, rfidY, rfidZ + 0.1)[0]}
          cy={iso.p(rfidX, rfidY, rfidZ + 0.1)[1]}
          rx={rfidWave1 * 22}
          ry={rfidWave1 * 11}
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.8"
          opacity={waveOpac1}
          filter="url(#iso-glow-cyan)"
        />
        <ellipse
          cx={iso.p(rfidX, rfidY, rfidZ + 0.1)[0]}
          cy={iso.p(rfidX, rfidY, rfidZ + 0.1)[1]}
          rx={rfidWave2 * 22}
          ry={rfidWave2 * 11}
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.8"
          opacity={waveOpac2}
          filter="url(#iso-glow-cyan)"
        />

        {/* Chip Label Tag */}
        <polygon
          points={topFace(iso, rfidX - 0.35, rfidY - 0.12, rfidX + 0.35, rfidY + 0.12, rfidZ + 0.07)}
          fill="#10B981"
        />
      </g>
    ),
  });

  // --- 3. Large High-Detail Official Vehicle Title Deed (Factura / Pedimento) ---
  const docX = 0.6;
  const docY = -0.2;
  const docZ = 0.7 + docBob;

  elements.push({
    k: docX + docY + 0.2,
    el: (
      <g key="legal-document">
        {/* Document Shadow */}
        <polygon
          points={topFace(iso, docX - 1.3, docY - 1.6, docX + 1.3, docY + 1.6, 0.3)}
          fill="rgba(0,0,0,0.38)"
          filter="url(#iso-shadow)"
        />

        {/* Heavy Security Paper Plaque */}
        <IsoBlock
          iso={iso}
          x={docX - 1.2}
          y={docY - 1.5}
          z={docZ}
          w={2.4}
          d={3.0}
          h={0.08}
          color="#FFFFFF"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(2,132,199,0.5)"
          sw={1.0}
        />

        {/* Navy Federal Header Banner */}
        <polygon
          points={topFace(iso, docX - 1.1, docY - 1.4, docX + 1.1, docY - 1.05, docZ + 0.085)}
          fill="#0F172A"
        />
        {/* Gold Trim Line */}
        <polygon
          points={topFace(iso, docX - 1.1, docY - 1.05, docX + 1.1, docY - 1.0, docZ + 0.086)}
          fill="#F59E0B"
        />

        {/* Holographic Rainbow Security Foil Strip (Reflects light) */}
        <polygon
          points={topFace(iso, docX + 0.8, docY - 1.38, docX + 1.0, docY + 1.38, docZ + 0.086)}
          fill="url(#iso-holo)"
          opacity="0.9"
        />

        {/* Simulated Document Legal Text Lines */}
        {[-0.8, -0.55, -0.3, -0.05, 0.2, 0.45, 0.7, 0.95].map((ly, i) => (
          <polygon
            key={i}
            points={topFace(
              iso,
              docX - 1.05,
              docY + ly - 0.035,
              docX + (i % 3 === 0 ? 0.3 : 0.65),
              docY + ly + 0.035,
              docZ + 0.085
            )}
            fill="#94A3B8"
            opacity="0.85"
          />
        ))}

        {/* VIN Barcode & QR DataMatrix Block */}
        <polygon
          points={topFace(iso, docX - 1.05, docY + 1.05, docX - 0.5, docY + 1.38, docZ + 0.086)}
          fill="#1E293B"
        />
        <polygon
          points={topFace(iso, docX - 0.4, docY + 1.15, docX + 0.3, docY + 1.3, docZ + 0.086)}
          fill="#64748B"
        />

        {/* Golden Embossed Official Security Seal */}
        <circle
          cx={iso.p(docX + 0.3, docY + 1.05, docZ + 0.09)[0]}
          cy={iso.p(docX + 0.3, docY + 1.05, docZ + 0.09)[1]}
          r="13"
          fill="url(#iso-gold)"
          stroke="#B45309"
          strokeWidth="1.4"
          filter="url(#iso-shadow)"
        />
        <circle
          cx={iso.p(docX + 0.3, docY + 1.05, docZ + 0.09)[0]}
          cy={iso.p(docX + 0.3, docY + 1.05, docZ + 0.09)[1]}
          r="7.5"
          fill="#10B981"
          stroke="#FFFFFF"
          strokeWidth="1.0"
        />

        {/* Sweeping Razor-Sharp Cyan Verification Laser */}
        <line
          x1={iso.p(docX - 1.15, docY + laserSweep, docZ + 0.1)[0]}
          y1={iso.p(docX - 1.15, docY + laserSweep, docZ + 0.1)[1]}
          x2={iso.p(docX + 1.15, docY + laserSweep, docZ + 0.1)[0]}
          y2={iso.p(docX + 1.15, docY + laserSweep, docZ + 0.1)[1]}
          stroke="#00F0FF"
          strokeWidth="3.0"
          filter="url(#iso-glow-cyan)"
        />

        {/* Sparkles following the Laser */}
        <circle
          cx={iso.p(docX - 0.3, docY + laserSweep, docZ + 0.12)[0]}
          cy={iso.p(docX - 0.3, docY + laserSweep, docZ + 0.12)[1]}
          r="2.5"
          fill="#FFFFFF"
          filter="url(#iso-glow-cyan)"
        />
        <circle
          cx={iso.p(docX + 0.4, docY + laserSweep, docZ + 0.12)[0]}
          cy={iso.p(docX + 0.4, docY + laserSweep, docZ + 0.12)[1]}
          r="2.5"
          fill="#FFFFFF"
          filter="url(#iso-glow-cyan)"
        />
      </g>
    ),
  });

  elements.sort((a, b) => a.k - b.k);

  // HUD Anchor atop document (well within viewBox 500x320)
  const [hudX, hudY] = iso.p(docX, docY, docZ + 1.3);

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
