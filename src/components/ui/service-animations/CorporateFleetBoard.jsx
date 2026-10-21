import React from 'react';
import { Building2, Truck, Car, FileCheck2, CheckCircle2 } from 'lucide-react';

export default function CorporateFleetBoard() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 select-none relative overflow-hidden">
      {/* Background Soft Purple / Indigo Glow */}
      <div className="absolute w-44 h-44 bg-indigo-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* 3D Fleet Management Card Container */}
      <div className="relative w-full max-w-[280px] aspect-[16/11] flex items-center justify-center transition-transform duration-500 hover:scale-[1.03]">
        
        {/* Soft Drop Shadow */}
        <div className="absolute -bottom-3 inset-x-6 h-4 bg-slate-900/10 rounded-full blur-md" />

        {/* Corporate Fleet Console */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-[2.5px] shadow-xl border border-indigo-500/40 overflow-hidden">
          
          <div className="relative w-full h-full rounded-[13px] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden">
            
            {/* Header: Corporate Fleet & CFDI 4.0 */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-400/30">
                  <Building2 size={12} />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-indigo-400 block leading-none">
                    PANEL FLOTILLAS
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400 leading-none">
                    CFDI 4.0 TIMBRADO
                  </span>
                </div>
              </div>

              {/* Deducible 100% Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[8px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% SAT</span>
              </div>
            </div>

            {/* Middle: 3 Fleet Vehicle Nodes connected to Fiscal Vault */}
            <div className="bg-slate-800/80 rounded-xl p-2 border border-slate-700/80 my-1 z-10">
              <div className="flex items-center justify-around py-1">
                {/* Vehicle 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-indigo-900/60 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-2xs">
                    <Truck size={13} />
                  </div>
                  <span className="text-[6.5px] font-mono text-slate-400 mt-1">VAN REPARTO</span>
                </div>

                {/* Connection line */}
                <div className="h-[1px] w-6 bg-gradient-to-r from-indigo-500 to-emerald-400 animate-pulse" />

                {/* Vehicle 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-emerald-900/60 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-2xs">
                    <Car size={13} />
                  </div>
                  <span className="text-[6.5px] font-mono text-slate-400 mt-1">SUV FLOTILLA</span>
                </div>

                {/* Connection line */}
                <div className="h-[1px] w-6 bg-gradient-to-r from-emerald-400 to-indigo-500 animate-pulse" />

                {/* Vehicle 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-indigo-900/60 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-2xs">
                    <Building2 size={13} />
                  </div>
                  <span className="text-[6.5px] font-mono text-slate-400 mt-1">EJECUTIVO</span>
                </div>
              </div>

              {/* Fiscal Timbrado UUID */}
              <div className="mt-1 pt-1 border-t border-slate-700/60 flex items-center justify-between text-[7px] font-mono text-slate-400">
                <span>TIMBRE SAT UUID:</span>
                <span className="text-emerald-400 font-bold truncate max-w-[120px]">
                  #4F9A-882C-E01B
                </span>
              </div>
            </div>

            {/* Bottom Bar: Corporate Manager Indicator */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[7.5px] font-mono text-slate-400 z-10">
              <span className="flex items-center gap-1 text-slate-300">
                <FileCheck2 size={10} className="text-indigo-400" />
                Valija corporativa sellada
              </span>
              <span className="text-emerald-400 font-bold">DEDUCIBLE AL 100%</span>
            </div>

          </div>

        </div>

        {/* Live Badge Floating Tag */}
        <div className="absolute -bottom-1 -right-1 bg-white text-slate-900 px-2.5 py-1 rounded-full text-[9px] font-heading font-extrabold flex items-center gap-1 shadow-lg border border-slate-200 z-20">
          <CheckCircle2 size={11} className="text-indigo-600" />
          <span>Gestor de Cuenta Asignado</span>
        </div>

      </div>
    </div>
  );
}
