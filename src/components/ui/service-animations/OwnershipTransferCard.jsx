import React from 'react';
import { ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

export default function OwnershipTransferCard() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 select-none relative overflow-hidden">
      {/* Background Soft Sky Glow */}
      <div className="absolute w-44 h-44 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* 3D Smart Card Container */}
      <div className="relative w-full max-w-[320px] aspect-[16/10] flex items-center justify-center transition-transform duration-500 hover:scale-[1.03]">
        
        {/* Soft Shadow */}
        <div className="absolute -bottom-3 inset-x-6 h-4 bg-slate-900/10 rounded-full blur-md" />

        {/* The Official Tarjeta de Circulación Plastificada */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-[2.5px] shadow-xl border border-sky-400/40 overflow-hidden">
          
          {/* Card Surface */}
          <div className="relative w-full h-full rounded-[13px] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden">
            
            {/* Fine Geometric Security Guilloche Background Pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Continuous Laser Scanning Line Sweeping Vertically */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-[laser-sweep_2.8s_ease-in-out_infinite] z-20 pointer-events-none" />

            {/* Top Bar: Official Credential Header & Smart Chip */}
            <div className="flex items-start justify-between z-10">
              <div className="flex items-center gap-2">
                {/* Gold Smart Microchip Simulation */}
                <div className="w-8 h-6 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-[1.5px] shadow-sm border border-amber-300 relative overflow-hidden">
                  <div className="w-full h-full border border-amber-800/40 rounded-[3px] flex items-center justify-center">
                    <div className="w-full h-[1px] bg-amber-900/40" />
                    <div className="h-full w-[1px] bg-amber-900/40 absolute" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-black text-sky-300 tracking-wider uppercase">
                    TARJETA DE CIRCULACIÓN
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400">
                    SISTEMA INTELIGENTE CON CHIP
                  </span>
                </div>
              </div>

              {/* Verified Hologram Tag */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[8px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>REPUVE OK</span>
              </div>
            </div>

            {/* Middle Data Fields (Simulating Ownership Update) */}
            <div className="space-y-1.5 py-1 z-10">
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 border-b border-slate-800 pb-1">
                <span>ESTATUS TITULAR:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  PROPIETARIO ACTUALIZADO
                </span>
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 border-b border-slate-800 pb-1">
                <span>FOLIO REPUVE:</span>
                <span className="text-sky-300 font-bold">#MX-994820-2026</span>
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
                <span>AUDITORÍA LEGAL:</span>
                <span className="text-slate-200 font-medium">ENDOSO NOTARIAL VÁLIDO</span>
              </div>
            </div>

            {/* Bottom Bar: Security Ribbon */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 z-10">
              <div className="flex items-center gap-1 text-[7.5px] font-mono text-slate-400">
                <ShieldCheck size={11} className="text-sky-400" />
                <span>SIN REPORTE DE ROBO</span>
              </div>
              <span className="text-[8px] font-mono text-emerald-400 font-extrabold tracking-wider">
                VIGENCIA: 2026 — 2029
              </span>
            </div>

          </div>

        </div>

        {/* Live Badge Floating Tag */}
        <div className="absolute -bottom-1 -left-1 bg-white text-slate-900 px-2.5 py-1 rounded-full text-[9.5px] font-heading font-extrabold flex items-center gap-1.5 shadow-lg border border-slate-200 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span>Cadena de Endosos Cotejada</span>
        </div>

      </div>
    </div>
  );
}
