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

export default function IsoSecurityVault() {
  const time = useAnimationTime();
  
  // Calibrated scale s = 36 and viewBox 500x320 with ox = 250, oy = 175
  // Guarantees generous margins on all sides: NO CLIPPING, NO CUT-OFFS
  const iso = createIso({ ox: 250, oy: 175, s: 36 });

  // Rotating biometric safe steering wheel dial
  const dialAngle = time * 2.2;

  // Floating security shield smooth levitation
  const shieldBob = Math.sin(time * 2.5) * 0.06;

  // Biometric fingerprint laser sweep
  const bioLaser = Math.sin(time * 3.5) * 8;

  const elements = [];

  // --- 1. Base High-Security Foundation ---
  elements.push({
    k: -10,
    el: (
      <g key="pedestal">
        <polygon
          points={topFace(iso, -3.6, -2.4, 3.6, 2.4, -0.05)}
          fill="rgba(15,23,42,0.1)"
          filter="url(#iso-shadow)"
        />
        <IsoBlock
          iso={iso}
          x={-3.4}
          y={-2.2}
          z={0}
          w={6.8}
          d={4.4}
          h={0.28}
          color="#F1F5F9"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(148,163,184,0.3)"
          sw={0.8}
        />

        {/* Vault Floor Guidance Grid (Emerald Laser Inset) */}
        <polygon
          points={topFace(iso, -3.1, -1.9, 3.1, 1.9, 0.29)}
          fill="#064E3B"
          stroke="#10B981"
          strokeWidth="1.0"
        />

        {/* 4 Laser Perimeter Emitters at corners */}
        {[
          [-2.8, -1.6],
          [2.8, -1.6],
          [2.8, 1.6],
          [-2.8, 1.6],
        ].map(([nx, ny], i) => (
          <g key={`node-${i}`}>
            <IsoBlock
              iso={iso}
              x={nx - 0.18}
              y={ny - 0.18}
              z={0.29}
              w={0.36}
              d={0.36}
              h={0.55}
              color="#0F172A"
              top="#334155"
              left="#1E293B"
              right="#020617"
            />
            <circle
              cx={iso.p(nx, ny, 0.88)[0]}
              cy={iso.p(nx, ny, 0.88)[1]}
              r="4.0"
              fill="#10B981"
              filter="url(#iso-glow)"
            />
          </g>
        ))}

        {/* Laser Perimeter Beam Lines */}
        <line
          x1={iso.p(-2.8, -1.6, 0.8)[0]}
          y1={iso.p(-2.8, -1.6, 0.8)[1]}
          x2={iso.p(2.8, -1.6, 0.8)[0]}
          y2={iso.p(2.8, -1.6, 0.8)[1]}
          stroke="#10B981"
          strokeWidth="1.8"
          filter="url(#iso-glow)"
        />
        <line
          x1={iso.p(2.8, -1.6, 0.8)[0]}
          y1={iso.p(2.8, -1.6, 0.8)[1]}
          x2={iso.p(2.8, 1.6, 0.8)[0]}
          y2={iso.p(2.8, 1.6, 0.8)[1]}
          stroke="#10B981"
          strokeWidth="1.8"
          filter="url(#iso-glow)"
        />
      </g>
    ),
  });

  // --- 2. Bank Vault Safe (Center Left) ---
  const vaultX = -0.7;
  const vaultY = -0.3;
  const vaultZ = 0.29;

  elements.push({
    k: vaultX + vaultY - 0.1,
    el: (
      <g key="vault-body">
        {/* Main Vault Steel Safe Box */}
        <IsoBlock
          iso={iso}
          x={vaultX - 1.4}
          y={vaultY - 1.2}
          z={vaultZ}
          w={2.8}
          d={2.4}
          h={1.8}
          color="#1E293B"
          top="#334155"
          left="#0F172A"
          right="#020617"
          stroke="#475569"
          sw={1.0}
        />

        {/* Vault Door Inset Frame */}
        <polygon
          points={leftFace(iso, vaultY + 1.22, vaultX - 1.2, vaultX + 1.2, vaultZ + 0.16, vaultZ + 1.64)}
          fill="#0F172A"
          stroke="#10B981"
          strokeWidth="1.4"
        />

        {/* 3 Heavy Steel Locking Bolts Protruding from Door Frame */}
        {[0.45, 0.9, 1.35].map((bz, i) => (
          <IsoBlock
            key={`bolt-${i}`}
            iso={iso}
            x={vaultX + 1.2}
            y={vaultY + 1.15}
            z={vaultZ + bz}
            w={0.2}
            d={0.12}
            h={0.12}
            color="#E2E8F0"
            top="#FFFFFF"
            left="#CBD5E1"
            right="#94A3B8"
          />
        ))}

        {/* Biometric Wheel & Dial Mechanism on Front Door Face */}
        {(() => {
          const [cx, cy] = iso.p(vaultX - 0.2, vaultY + 1.23, vaultZ + 0.9);
          return (
            <g>
              {/* Outer Gear Ring */}
              <circle
                cx={cx}
                cy={cy}
                r="22"
                fill="#1E293B"
                stroke="#64748B"
                strokeWidth="2.8"
              />
              {/* Inner Glowing Laser Ring */}
              <circle
                cx={cx}
                cy={cy}
                r="16"
                fill="#0F172A"
                stroke="#10B981"
                strokeWidth="1.8"
                filter="url(#iso-glow)"
              />
              {/* 3 Heavy Titanium Spokes Rotating Continuously */}
              {[0, 120, 240].map((deg, i) => {
                const rad = dialAngle + (deg * Math.PI) / 180;
                return (
                  <line
                    key={`spoke-${i}`}
                    x1={cx}
                    y1={cy}
                    x2={cx + Math.cos(rad) * 14}
                    y2={cy + Math.sin(rad) * 14}
                    stroke="#CBD5E1"
                    strokeWidth="3.0"
                    strokeLinecap="round"
                  />
                );
              })}
              {/* 6 Peripheral Locking Pins */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                const rad = dialAngle + (deg * Math.PI) / 180;
                return (
                  <circle
                    key={`pin-${i}`}
                    cx={cx + Math.cos(rad) * 12}
                    cy={cy + Math.sin(rad) * 12}
                    r="2.0"
                    fill="#10B981"
                  />
                );
              })}
              {/* Center Chrome Hub */}
              <circle cx={cx} cy={cy} r="5" fill="#FFFFFF" stroke="#64748B" strokeWidth="0.8" />
            </g>
          );
        })()}

        {/* Biometric Thumbprint Terminal Beside Wheel */}
        {(() => {
          const [bx, by] = iso.p(vaultX + 0.7, vaultY + 1.23, vaultZ + 0.9);
          return (
            <g>
              <rect
                x={bx - 10}
                y={by - 15}
                width="20"
                height="30"
                rx="3.5"
                fill="#020617"
                stroke="#38BDF8"
                strokeWidth="1.0"
              />
              {/* Thumbprint Lines */}
              <ellipse
                cx={bx}
                cy={by}
                rx="5.5"
                ry="8"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="0.8"
                strokeDasharray="2 1"
              />
              {/* Active Cyan Scanning Line */}
              <line
                x1={bx - 8}
                y1={by + bioLaser}
                x2={bx + 8}
                y2={by + bioLaser}
                stroke="#00F0FF"
                strokeWidth="1.4"
                filter="url(#iso-glow)"
              />
            </g>
          );
        })()}
      </g>
    ),
  });

  // --- 3. Notarized Contract & SAT CFDI Documents (Foreground Right) ---
  const docX = 0.9;
  const docY = 0.6;
  const docZ = 0.32;

  elements.push({
    k: docX + docY,
    el: (
      <g key="notary-sat-docs">
        {/* Document Shadow */}
        <polygon
          points={topFace(iso, docX - 0.75, docY - 0.9, docX + 0.75, docY + 0.9, 0.3)}
          fill="rgba(0,0,0,0.3)"
          filter="url(#iso-shadow)"
        />

        {/* Notarized Legal Contract Plaque */}
        <IsoBlock
          iso={iso}
          x={docX - 0.65}
          y={docY - 0.8}
          z={docZ}
          w={1.3}
          d={1.6}
          h={0.07}
          color="#FFFFFF"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(16,185,129,0.5)"
          sw={0.8}
        />

        {/* Emerald Notary Header Strip */}
        <polygon
          points={topFace(iso, docX - 0.6, docY - 0.75, docX + 0.6, docY - 0.55, docZ + 0.075)}
          fill="#065F46"
        />

        {/* SAT CFDI 4.0 Seal Tag */}
        <polygon
          points={topFace(iso, docX - 0.55, docY + 0.35, docX + 0.1, docY + 0.7, docZ + 0.075)}
          fill="#0F172A"
        />

        {/* Golden Notary Wax Ribbon Seal */}
        <circle
          cx={iso.p(docX + 0.35, docY + 0.5, docZ + 0.09)[0]}
          cy={iso.p(docX + 0.35, docY + 0.5, docZ + 0.09)[1]}
          r="8.5"
          fill="url(#iso-gold)"
          stroke="#B45309"
          strokeWidth="1.2"
          filter="url(#iso-shadow)"
        />
      </g>
    ),
  });

  // --- 4. Floating 3D Emerald Protection Shield (Right, Elevated with Space) ---
  const shieldX = 1.0;
  const shieldY = -0.3;
  const shieldZ = 1.45 + shieldBob;

  elements.push({
    k: shieldX + shieldY + 0.6,
    el: (
      <g key="shield-badge">
        <ellipse
          cx={iso.p(shieldX, shieldY, 0.3)[0]}
          cy={iso.p(shieldX, shieldY, 0.3)[1]}
          rx="20"
          ry="10"
          fill="rgba(0,0,0,0.3)"
          filter="url(#iso-shadow)"
        />

        {/* Extruded Shield Hexagonal Prismatic Mesh */}
        <IsoBlock
          iso={iso}
          x={shieldX - 0.7}
          y={shieldY - 0.7}
          z={shieldZ}
          w={1.4}
          d={1.4}
          h={0.28}
          color="#065F46"
          top="#10B981"
          left="#047857"
          right="#064E3B"
          stroke="#34D399"
          sw={1.2}
        />

        {/* Raised Chrome Checkmark on Top Face */}
        {(() => {
          const [cx, cy] = iso.p(shieldX, shieldY, shieldZ + 0.29);
          return (
            <path
              d={`M ${cx - 10} ${cy} L ${cx - 3} ${cy + 8} L ${cx + 12} ${cy - 9}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#iso-glow)"
            />
          );
        })()}
      </g>
    ),
  });

  elements.sort((a, b) => a.k - b.k);

  // HUD Anchor atop safe (well within viewBox 500x320)
  const [hudX, hudY] = iso.p(vaultX, vaultY, vaultZ + 1.95);

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
