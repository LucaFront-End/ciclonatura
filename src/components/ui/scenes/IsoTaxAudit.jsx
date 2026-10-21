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

export default function IsoTaxAudit() {
  const time = useAnimationTime();

  // Calibrated scale s = 38 with ox = 260, oy = 175
  const iso = createIso({ ox: 260, oy: 175, s: 38 });

  // 1. Motorized Receipt Print Feed (Sheet emerges from dispenser)
  const feedCycle = (Math.sin(time * 2.0) + 1) / 2;
  const receiptY = -0.2 + feedCycle * 0.5;

  // 2. Fiscal Audit Scanner Head traversing across fiscal bars
  const scannerHeadX = -2.2 + ((time * 1.5) % 4.2);

  // 3. Phantom Fine Strikethrough & Collapse animation
  const phantomPulse = (Math.sin(time * 3.5) + 1) / 2;

  // 4. Live Balance Countdown (cycles from $8,450 down to $0.00)
  const balanceCount = Math.max(
    0,
    Math.floor(8450 - ((time * 3800) % 9500))
  );

  const elements = [];

  // --- 1. Base Treasury Foundation ---
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
        {/* Treasury Circuit Inset Grid Floor */}
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

  // --- 2. 3D Fiscal Bar Graph (Tenencias por Año 2021-2025) ---
  const barHeights = [0.9, 1.4, 1.0, 1.7];
  barHeights.forEach((h, idx) => {
    const bx = -2.3 + idx * 1.1;
    elements.push({
      k: idx * 2,
      el: (
        <g key={`bar-${idx}`}>
          <IsoBlock
            iso={iso}
            x={bx}
            y={-1.6}
            z={0.33}
            w={0.7}
            d={0.7}
            h={h}
            color="#059669"
            top="#34D399"
            left="#10B981"
            right="#047857"
            stroke="#064E3B"
            sw={0.6}
          />
        </g>
      ),
    });
  });

  // Phantom Fine Block (Red Block Being Canceled)
  elements.push({
    k: 9,
    el: (
      <g key="phantom-block">
        <IsoBlock
          iso={iso}
          x={1.4}
          y={-1.6}
          z={0.33}
          w={0.8}
          d={0.8}
          h={0.85}
          color="#E11D48"
          top="#FB7185"
          left="#F43F5E"
          right="#BE123C"
          stroke="#881337"
          sw={0.6}
          opacity={0.4 + phantomPulse * 0.6}
        />
        {/* Cancellation Strike Badge */}
        <g transform={matrixLeft(iso, 1.4, -1.2, 1.5)}>
          <rect
            x="-2"
            y="-6"
            width="50"
            height="13"
            rx="3"
            fill="#0F172A"
            stroke="#F43F5E"
            strokeWidth="0.8"
          />
          <text
            x="2"
            y="2.5"
            fill="#FB7185"
            fontFamily="monospace"
            fontSize="5.2"
            fontWeight="bold"
            textDecoration="line-through"
          >
            -$3,850 MULTA
          </text>
        </g>
      </g>
    ),
  });

  // --- 3. Optical Audit Scanner Head traversing over the bars ---
  const [shx, shy] = iso.p(scannerHeadX, -1.25, 2.2);
  const [targetX, targetY] = iso.p(scannerHeadX, -1.25, 1.2);
  elements.push({
    k: 12,
    el: (
      <g key="audit-scanner-head">
        <circle cx={shx} cy={shy} r="5" fill="#0F172A" stroke="#10B981" strokeWidth="1.2" />
        <line
          x1={shx}
          y1={shy}
          x2={targetX}
          y2={targetY}
          stroke="#34D399"
          strokeWidth="2.0"
          strokeDasharray="2 2"
        />
      </g>
    ),
  });

  // --- 4. Motorized Bank Line-of-Capture Official Receipt Sheet ---
  elements.push({
    k: 16,
    el: (
      <g key="bank-receipt-sheet">
        {/* Dispenser Slot */}
        <IsoBlock
          iso={iso}
          x={-1.8}
          y={receiptY - 0.2}
          z={0.33}
          w={3.6}
          d={0.3}
          h={0.4}
          color="#334155"
          top="#475569"
          left="#1E293B"
          right="#0F172A"
          stroke="#64748B"
          sw={0.6}
        />

        {/* Paper Sheet Emerging */}
        <IsoBlock
          iso={iso}
          x={-1.6}
          y={receiptY}
          z={0.5}
          w={3.2}
          d={1.7}
          h={0.08}
          color="#FFFFFF"
          top="#FFFFFF"
          left="#F1F5F9"
          right="#E2E8F0"
          stroke="#94A3B8"
          sw={0.8}
        />

        {/* Receipt Text */}
        <g transform={matrixTop(iso, -1.4, receiptY + 0.25, 0.58)}>
          <text
            x="0"
            y="0"
            fill="#0F172A"
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="5.2"
            letterSpacing="0.6"
          >
            LÍNEA DE CAPTURA BANCARIA
          </text>
          <text x="0" y="7" fill="#64748B" fontFamily="monospace" fontSize="4.0">
            FOLIO: #TESORERIA-2026-CERT
          </text>
          <text
            x="0"
            y="14"
            fill="#059669"
            fontFamily="monospace"
            fontSize="6.2"
            fontWeight="900"
          >
            ADEUDO TOTAL: $0.00 MXN [PAGADO]
          </text>
        </g>
      </g>
    ),
  });

  // --- 5. Live Treasury Balance HUD Display (Counting Down to $0.00) ---
  elements.push({
    k: 24,
    el: (
      <g key="treasury-hud" transform={matrixLeft(iso, 2.0, -2.3, 1.8)}>
        <rect
          x="-4"
          y="-13"
          width="78"
          height="25"
          rx="5"
          fill="#0F172A"
          stroke="#10B981"
          strokeWidth="1.2"
          filter="url(#iso-shadow)"
        />
        <text x="3" y="-4" fill="#94A3B8" fontFamily="monospace" fontSize="4.6" fontWeight="bold">
          AUDITORÍA ADEUDO:
        </text>
        <text
          x="3"
          y="6"
          fill={balanceCount === 0 ? "#34D399" : "#FBBF24"}
          fontFamily="monospace"
          fontSize="8.0"
          fontWeight="900"
        >
          ${balanceCount.toLocaleString()} MXN
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
