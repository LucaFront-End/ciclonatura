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

export default function IsoExpressRoute() {
  const time = useAnimationTime();
  
  // Calibrated scale s = 36 and viewBox 500x320 with ox = 250, oy = 175
  // Guarantees generous margins on all sides: NO CLIPPING, NO CUT-OFFS
  const iso = createIso({ ox: 250, oy: 175, s: 36 });

  // Van suspension micro-bobbing while driving
  const vanBob = Math.sin(time * 16) * 0.012;

  // Expanding GPS delivery waypoint radar rings
  const radar1 = ((time * 0.9) % 1) * 2.4 + 0.3;
  const radar2 = (((time * 0.9) + 0.5) % 1) * 2.4 + 0.3;
  const opac1 = Math.max(0, 1 - (radar1 - 0.3) / 2.4);
  const opac2 = Math.max(0, 1 - (radar2 - 0.3) / 2.4);

  // Delivered official package levitation bobbing
  const pkgBob = Math.sin(time * 2.6) * 0.06;

  // Wheel rotation highlight angle
  const wheelAngle = (time * 18) % (Math.PI * 2);

  // Animated road dash offset
  const dashOffset = (time * 2.5) % 1.5;

  const vanX = -0.55;
  const vanY = -0.25;
  const vanZ = 0.36 + vanBob;

  const elements = [];

  // --- 1. Base Logistics Waypoint Platform ---
  elements.push({
    k: -10,
    el: (
      <g key="pedestal">
        {/* Soft Floor Shadow */}
        <polygon
          points={topFace(iso, -3.5, -2.4, 3.5, 2.4, -0.05)}
          fill="rgba(15,23,42,0.1)"
          filter="url(#iso-shadow)"
        />
        {/* Foundation Slab */}
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

        {/* Central Dark Asphalt Express Delivery Lane */}
        <polygon
          points={topFace(iso, -3.0, -1.8, 3.0, 1.8, 0.29)}
          fill="#1E293B"
          stroke="rgba(51,65,85,0.6)"
          strokeWidth="0.8"
        />

        {/* Outer Lime Shoulder Lines */}
        <polygon
          points={topFace(iso, -3.0, -1.8, 3.0, -1.68, 0.3)}
          fill="#84CC16"
          opacity="0.85"
        />
        <polygon
          points={topFace(iso, -3.0, 1.68, 3.0, 1.8, 0.3)}
          fill="#84CC16"
          opacity="0.85"
        />

        {/* Animated Highway Lane Dashes (Continuous motion effect) */}
        {[-2.5, -1.0, 0.5, 2.0].map((dx, i) => {
          const actualX = dx - dashOffset;
          if (actualX < -2.8 || actualX > 2.8) return null;
          return (
            <polygon
              key={`dash-${i}`}
              points={topFace(iso, actualX - 0.35, -0.04, actualX + 0.35, 0.04, 0.3)}
              fill="#FFFFFF"
              opacity="0.9"
            />
          );
        })}

        {/* Regional Network Nodes (Edomex & Morelos in Background) */}
        {[
          [-2.2, -1.2, "EDOMEX"],
          [-1.8, 1.2, "MORELOS"],
        ].map(([wx, wy, name], i) => (
          <g key={`hub-${i}`}>
            <circle
              cx={iso.p(wx, wy, 0.31)[0]}
              cy={iso.p(wx, wy, 0.31)[1]}
              r="4"
              fill="#38BDF8"
              filter="url(#iso-glow-cyan)"
            />
            <line
              x1={iso.p(wx, wy, 0.31)[0]}
              y1={iso.p(wx, wy, 0.31)[1]}
              x2={iso.p(0.8, 0.7, 0.31)[0]}
              y2={iso.p(0.8, 0.7, 0.31)[1]}
              stroke="#0284C7"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          </g>
        ))}
      </g>
    ),
  });

  // --- 2. Destination Waypoint (Delivery Drop-Off Zone at Right) ---
  const destX = 1.7;
  const destY = 0.5;

  elements.push({
    k: destX + destY - 0.5,
    el: (
      <g key="delivery-destination">
        {/* Pulsing Concentric Radar Rings at Destination */}
        <ellipse
          cx={iso.p(destX, destY, 0.3)[0]}
          cy={iso.p(destX, destY, 0.3)[1]}
          rx={radar1 * 34}
          ry={radar1 * 17}
          fill="none"
          stroke="#84CC16"
          strokeWidth="2.0"
          opacity={opac1}
          filter="url(#iso-glow)"
        />
        <ellipse
          cx={iso.p(destX, destY, 0.3)[0]}
          cy={iso.p(destX, destY, 0.3)[1]}
          rx={radar2 * 34}
          ry={radar2 * 17}
          fill="none"
          stroke="#84CC16"
          strokeWidth="2.0"
          opacity={opac2}
          filter="url(#iso-glow)"
        />

        {/* Drop-off Target Zone Marker Pad */}
        <polygon
          points={topFace(iso, destX - 0.65, destY - 0.65, destX + 0.65, destY + 0.65, 0.3)}
          fill="#064E3B"
          stroke="#10B981"
          strokeWidth="1.2"
        />

        {/* Destination Pin Marker */}
        <circle
          cx={iso.p(destX, destY, 0.32)[0]}
          cy={iso.p(destX, destY, 0.32)[1]}
          r="5"
          fill="#10B981"
          filter="url(#iso-glow)"
        />
      </g>
    ),
  });

  // --- 3. Delivered Official Documents & License Plate Package ---
  const pkgX = destX;
  const pkgY = destY;
  const pkgZ = 0.65 + pkgBob;

  elements.push({
    k: pkgX + pkgY + 0.4,
    el: (
      <g key="delivery-package">
        {/* Package Shadow */}
        <polygon
          points={topFace(iso, pkgX - 0.65, pkgY - 0.65, pkgX + 0.65, pkgY + 0.65, 0.3)}
          fill="rgba(0,0,0,0.35)"
          filter="url(#iso-shadow)"
        />

        {/* Armored Custody Parcel Box */}
        <IsoBlock
          iso={iso}
          x={pkgX - 0.55}
          y={pkgY - 0.55}
          z={pkgZ}
          w={1.1}
          d={1.1}
          h={0.4}
          color="#0F172A"
          top="#1E293B"
          left="#020617"
          right="#0F172A"
          stroke="#84CC16"
          sw={1.0}
        />

        {/* Official CDMX Metallic License Plate Floating Atop Box */}
        <IsoBlock
          iso={iso}
          x={pkgX - 0.5}
          y={pkgY - 0.75}
          z={pkgZ + 0.45}
          w={1.0}
          d={1.5}
          h={0.06}
          color="#FFFFFF"
          top="#FFFFFF"
          left="#CBD5E1"
          right="#94A3B8"
          stroke="#64748B"
          sw={0.8}
        />

        {/* Green CDMX Header on Plate */}
        <polygon
          points={topFace(iso, pkgX - 0.45, pkgY - 0.7, pkgX + 0.45, pkgY - 0.5, pkgZ + 0.515)}
          fill="#059669"
        />

        {/* Alphanumeric Serial Simulation */}
        <polygon
          points={topFace(iso, pkgX - 0.35, pkgY - 0.35, pkgX + 0.35, pkgY + 0.35, pkgZ + 0.515)}
          fill="#0F172A"
        />

        {/* SEDEMA Hologram 00 Tag */}
        <circle
          cx={iso.p(pkgX + 0.3, pkgY + 0.45, pkgZ + 0.52)[0]}
          cy={iso.p(pkgX + 0.3, pkgY + 0.45, pkgZ + 0.52)[1]}
          r="4.5"
          fill="url(#iso-holo)"
          filter="url(#iso-glow)"
        />

        {/* Holographic Verification Checkmark floating above package */}
        {(() => {
          const [cx, cy] = iso.p(pkgX, pkgY, pkgZ + 0.95);
          return (
            <g>
              <circle cx={cx} cy={cy} r="10" fill="#10B981" filter="url(#iso-glow)" />
              <path
                d={`M ${cx - 5} ${cy} L ${cx - 1.5} ${cy + 3.5} L ${cx + 5} ${cy - 4}`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })()}
      </g>
    ),
  });

  // --- 4. The Express Delivery Van (Camioneta de Reparto Ciclonatura) ---
  const vanK = vanX + vanY;
  elements.push({
    k: vanK,
    el: (
      <g key="delivery-van">
        {/* Van Floor Shadow */}
        <polygon
          points={topFace(iso, vanX - 1.8, vanY - 0.8, vanX + 1.8, vanY + 0.8, 0.295)}
          fill="rgba(0,0,0,0.45)"
          filter="url(#iso-shadow)"
        />

        {/* 4 Wheels */}
        {[
          [vanX - 1.0, vanY - 0.7],
          [vanX + 1.0, vanY - 0.7],
          [vanX - 1.0, vanY + 0.7],
          [vanX + 1.0, vanY + 0.7],
        ].map(([wx, wy], i) => (
          <g key={`wheel-${i}`}>
            <IsoBlock
              iso={iso}
              x={wx - 0.26}
              y={wy - 0.12}
              z={vanZ - 0.16}
              w={0.52}
              d={0.24}
              h={0.52}
              color="#0F172A"
              top="#1E293B"
              left="#020617"
              right="#0F172A"
            />
            {/* Silver Hub with Lime Nut */}
            <circle
              cx={iso.p(wx, wy + 0.13, vanZ + 0.08)[0]}
              cy={iso.p(wx, wy + 0.13, vanZ + 0.08)[1]}
              r="4.0"
              fill="#CBD5E1"
              stroke="#64748B"
              strokeWidth="0.8"
            />
            <circle
              cx={iso.p(wx, wy + 0.13, vanZ + 0.08)[0]}
              cy={iso.p(wx, wy + 0.13, vanZ + 0.08)[1]}
              r="1.8"
              fill="#84CC16"
            />
            {/* Spinning Tire Highlight Notch */}
            <circle
              cx={iso.p(wx + Math.cos(wheelAngle) * 0.12, wy + 0.13, vanZ + 0.08 + Math.sin(wheelAngle) * 0.12)[0]}
              cy={iso.p(wx + Math.cos(wheelAngle) * 0.12, wy + 0.13, vanZ + 0.08 + Math.sin(wheelAngle) * 0.12)[1]}
              r="1.0"
              fill="#FFFFFF"
            />
          </g>
        ))}

        {/* Lower Van Chassis (Dark Carbon Undercarriage) */}
        <IsoBlock
          iso={iso}
          x={vanX - 1.65}
          y={vanY - 0.68}
          z={vanZ + 0.08}
          w={3.3}
          d={1.36}
          h={0.24}
          color="#0F172A"
          top="#1E293B"
          left="#020617"
          right="#0F172A"
        />

        {/* Main Van Cargo Body (Rear High-Roof Delivery Box) */}
        <IsoBlock
          iso={iso}
          x={vanX - 1.6}
          y={vanY - 0.65}
          z={vanZ + 0.3}
          w={2.2}
          d={1.3}
          h={1.25}
          color="#F8FAFC"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(100,116,139,0.3)"
          sw={0.8}
        />

        {/* Ciclonatura Eco-Green Livery Stripe on Side of Van */}
        <polygon
          points={leftFace(iso, vanY + 0.655, vanX - 1.55, vanX + 0.55, vanZ + 0.5, vanZ + 0.72)}
          fill="#84CC16"
        />
        {/* Speed Line Accent */}
        <polygon
          points={leftFace(iso, vanY + 0.655, vanX - 1.55, vanX + 0.35, vanZ + 0.76, vanZ + 0.82)}
          fill="#059669"
        />

        {/* Front Cab (Driver Cabin Section) */}
        <IsoBlock
          iso={iso}
          x={vanX + 0.6}
          y={vanY - 0.65}
          z={vanZ + 0.3}
          w={0.95}
          d={1.3}
          h={0.85}
          color="#F8FAFC"
          top="#FFFFFF"
          left="#E2E8F0"
          right="#CBD5E1"
          stroke="rgba(100,116,139,0.3)"
          sw={0.8}
        />

        {/* Sloping Aerodynamic Windshield */}
        <polygon
          points={iso.pts([
            [vanX + 1.55, vanY - 0.6, vanZ + 0.45],
            [vanX + 1.55, vanY + 0.6, vanZ + 0.45],
            [vanX + 1.05, vanY + 0.6, vanZ + 1.12],
            [vanX + 1.05, vanY - 0.6, vanZ + 1.12],
          ])}
          fill="url(#iso-windshield)"
          stroke="#38BDF8"
          strokeWidth="0.8"
        />

        {/* Driver Side Window */}
        <polygon
          points={leftFace(iso, vanY + 0.655, vanX + 0.65, vanX + 1.05, vanZ + 0.58, vanZ + 1.05)}
          fill="url(#iso-windshield)"
          stroke="#0284C7"
          strokeWidth="0.8"
        />

        {/* Side Rearview Mirror */}
        <IsoBlock
          iso={iso}
          x={vanX + 1.0}
          y={vanY + 0.68}
          z={vanZ + 0.65}
          w={0.16}
          d={0.12}
          h={0.14}
          color="#0F172A"
        />

        {/* Front Grille and Bumper */}
        <polygon
          points={rightFace(iso, vanX + 1.555, vanY - 0.45, vanY + 0.45, vanZ + 0.16, vanZ + 0.38)}
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="0.6"
        />

        {/* Projector LED Headlights */}
        <polygon
          points={rightFace(iso, vanX + 1.555, vanY - 0.6, vanY - 0.36, vanZ + 0.32, vanZ + 0.46)}
          fill="#38BDF8"
          filter="url(#iso-glow-cyan)"
        />
        <polygon
          points={rightFace(iso, vanX + 1.555, vanY + 0.36, vanY + 0.6, vanZ + 0.32, vanZ + 0.46)}
          fill="#38BDF8"
          filter="url(#iso-glow-cyan)"
        />

        {/* Headlight Beams Illuminating the Delivery Path */}
        <polygon
          points={iso.pts([
            [vanX + 1.58, vanY - 0.55, 0.3],
            [destX + 0.4, destY - 0.9, 0.3],
            [destX + 0.4, destY + 0.9, 0.3],
            [vanX + 1.58, vanY + 0.55, 0.3],
          ])}
          fill="url(#iso-cyan-fan)"
          opacity="0.4"
        />

        {/* Rear Delivery Cargo Doors Outline */}
        <line
          x1={iso.p(vanX - 1.605, vanY, vanZ + 0.32)[0]}
          y1={iso.p(vanX - 1.605, vanY, vanZ + 0.32)[1]}
          x2={iso.p(vanX - 1.605, vanY, vanZ + 1.52)[0]}
          y2={iso.p(vanX - 1.605, vanY, vanZ + 1.52)[1]}
          stroke="#94A3B8"
          strokeWidth="1.0"
        />
      </g>
    ),
  });

  elements.sort((a, b) => a.k - b.k);

  // HUD Anchor atop van (well within viewBox 500x320)
  const [hudX, hudY] = iso.p(vanX, vanY, vanZ + 1.75);

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
