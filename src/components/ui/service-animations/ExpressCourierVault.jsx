import React from 'react';
import { Lock, Clock, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ExpressCourierVault() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 select-none relative overflow-hidden">
      {/* Background Soft Lime Glow */}
      <div className="absolute w-44 h-44 bg-lime-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* 3D Dispatch Case Container */}
      <div className="relative w-full max-w-[280px] aspect-[16/11] flex items-center justify-center transition-transform duration-500 hover:scale-[1.03]">
        
        {/* Soft Drop Shadow */}
        <div className="absolute -bottom-3 inset-x-6 h-4 bg-slate-900/10 rounded-full blur-md" />

        {/* Sealed Notarial Delivery Case */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-[2.5px] shadow-xl border border-lime-500/40 overflow-hidden">
          
          <div className="relative w-full h-full rounded-[13px] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden">
            
            {/* Radar Circular Pulse in background */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border border-lime-500/20 animate-ping pointer-events-none" />
            <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full border border-lime-500/30 pointer-events-none" />

            {/* Header: Valija Foliada & Seal Status */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-lime-500/20 text-lime-400 flex items-center justify-center border border-lime-400/30">
                  <Lock size={12} />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-lime-400 block leading-none">
                    VALIJA SELLADA
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400 leading-none">
                    FOLIO #CN-88492
                  </span>
                </div>
              </div>

              {/* Express Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-lime-500/20 border border-lime-400/40 text-lime-300 text-[8px] font-mono font-bold">
                <Clock size={9} className="animate-spin text-lime-400" />
                <span>24-48H</span>
              </div>
            </div>

            {/* Middle: Live Dispatch Route Step */}
            <div className="bg-slate-800/80 rounded-xl p-2 border border-slate-700/80 my-1 z-10 space-y-1.5">
              <div className="flex items-center justify-between text-[8px] font-mono">
                <span className="text-slate-400">ESTADO:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  REPOSICIÓN CONCLUIDA
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-lime-500 to-emerald-400 h-full w-[85%] rounded-full animate-pulse" />
              </div>

              <div className="flex items-center justify-between text-[7px] font-mono text-slate-400">
                <span>Ventanilla Oficial</span>
                <span className="text-lime-300 font-bold flex items-center gap-0.5">
                  <Navigation size={8} /> En ruta a domicilio
                </span>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[7.5px] font-mono text-slate-400 z-10">
              <span className="flex items-center gap-1">
                <ShieldCheck size={10} className="text-lime-400" />
                Acuse de entrega oficial
              </span>
              <span className="text-slate-300 font-bold">CDMX / Edomex</span>
            </div>

          </div>

        </div>

        {/* Live Badge */}
        <div className="absolute -bottom-1 -right-1 bg-white text-slate-900 px-2.5 py-1 rounded-full text-[9px] font-heading font-extrabold flex items-center gap-1 shadow-lg border border-slate-200 z-20">
          <CheckCircle2 size={11} className="text-lime-600" />
          <span>Entrega en Mano</span>
        </div>

      </div>
    </div>
  );
}
