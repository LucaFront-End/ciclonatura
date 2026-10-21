import React from 'react';
import { Scale, CheckCircle2, TrendingDown, FileText } from 'lucide-react';

export default function TaxAuditTerminal() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 select-none relative overflow-hidden">
      {/* Background Soft Emerald Glow */}
      <div className="absolute w-44 h-44 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* 3D Fiscal Terminal Screen */}
      <div className="relative w-full max-w-[280px] aspect-[16/11] flex items-center justify-center transition-transform duration-500 hover:scale-[1.03]">
        
        {/* Soft Drop Shadow */}
        <div className="absolute -bottom-3 inset-x-6 h-4 bg-slate-900/10 rounded-full blur-md" />

        {/* The Digital Treasury Console */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-[2.5px] shadow-xl border border-emerald-500/40 overflow-hidden">
          
          <div className="relative w-full h-full rounded-[13px] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden">
            
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
                  <Scale size={12} />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 block leading-none">
                    AUDITORÍA FISCAL
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400 leading-none">
                    TESORERÍA CDMX / EDO
                  </span>
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[8px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SIN FANTASMAS</span>
              </div>
            </div>

            {/* Middle: Scanned Adeudo Rows with Cancellation */}
            <div className="bg-slate-800/80 rounded-xl p-2 border border-slate-700/80 my-1 z-10 space-y-1">
              <div className="flex items-center justify-between text-[7.5px] font-mono border-b border-slate-700/60 pb-1">
                <span className="text-slate-400">TENENCIAS 2021-2025:</span>
                <span className="text-slate-200 font-bold">$1,240 DERECHOS</span>
              </div>

              {/* Struck-through Phantom Fine */}
              <div className="flex items-center justify-between text-[7.5px] font-mono border-b border-slate-700/60 pb-1">
                <span className="text-rose-400 line-through">MULTA FANTASMA:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                  <TrendingDown size={9} /> CANCELADA (-$3,450)
                </span>
              </div>

              {/* Final Real Balance */}
              <div className="flex items-center justify-between text-[8px] font-mono pt-0.5">
                <span className="text-slate-300 font-bold">LÍNEA DE CAPTURA:</span>
                <span className="text-emerald-400 font-black">PAGADA $0.00</span>
              </div>
            </div>

            {/* Bottom Bar: Barcode & Certified Stamp */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 z-10">
              <div className="flex items-center gap-1">
                <div className="flex gap-[1.5px] h-3 items-center">
                  {[2, 1, 3, 1, 2, 4, 1, 2, 3].map((w, i) => (
                    <span
                      key={i}
                      className="bg-slate-500 h-full"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <span className="text-[7px] font-mono text-slate-400">SELLADO</span>
              </div>
              <span className="text-[7.5px] font-mono font-bold text-emerald-400 flex items-center gap-0.5">
                <CheckCircle2 size={9} /> VALIDACIÓN SAT
              </span>
            </div>

          </div>

        </div>

        {/* Live Savings Floating Tag */}
        <div className="absolute -bottom-1 -left-1 bg-white text-slate-900 px-2.5 py-1 rounded-full text-[9px] font-heading font-extrabold flex items-center gap-1 shadow-lg border border-slate-200 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Ahorro en Recargos Improcedentes</span>
        </div>

      </div>
    </div>
  );
}
