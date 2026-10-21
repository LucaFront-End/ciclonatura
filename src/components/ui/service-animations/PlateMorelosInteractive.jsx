import React from 'react';

export default function PlateMorelosInteractive() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 select-none relative overflow-hidden">
      {/* Background Soft Atmospheric Emerald Glow */}
      <div className="absolute w-44 h-44 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* 3D Floating Metallic Plate Container */}
      <div className="relative w-full max-w-[340px] aspect-[16/9] flex items-center justify-center transition-transform duration-500 hover:scale-[1.03]">
        
        {/* Drop Shadow Simulation */}
        <div className="absolute -bottom-3 inset-x-8 h-4 bg-slate-900/10 rounded-full blur-md" />

        {/* The Authentic Metallic Embossed License Plate */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-slate-100 via-white to-slate-200 p-[3px] shadow-xl border border-slate-300/80 overflow-hidden">
          
          {/* Inner Plate Bevel & Border Rim */}
          <div className="relative w-full h-full rounded-[13px] bg-gradient-to-br from-white via-slate-50 to-slate-100 border-[2.5px] border-slate-700/80 flex flex-col justify-between p-2.5 sm:p-3 overflow-hidden shadow-inner">
            
            {/* Holographic Iridescent Light Sweep across the metal */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent pointer-events-none -translate-x-full animate-[plate-shine_3.5s_infinite]"
              style={{
                background: 'linear-gradient(105deg, transparent 20%, rgba(16, 185, 129, 0.25) 45%, rgba(56, 189, 248, 0.25) 55%, transparent 80%)'
              }}
            />

            {/* Corner Mounting Aluminum Screws */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-slate-300 via-slate-100 to-slate-500 border border-slate-400 shadow-2xs flex items-center justify-center">
              <div className="w-1.5 h-[1px] bg-slate-600 rotate-45" />
            </div>
            <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-slate-300 via-slate-100 to-slate-500 border border-slate-400 shadow-2xs flex items-center justify-center">
              <div className="w-1.5 h-[1px] bg-slate-600 -rotate-45" />
            </div>
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-slate-300 via-slate-100 to-slate-500 border border-slate-400 shadow-2xs flex items-center justify-center">
              <div className="w-1.5 h-[1px] bg-slate-600 -rotate-12" />
            </div>
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-slate-300 via-slate-100 to-slate-500 border border-slate-400 shadow-2xs flex items-center justify-center">
              <div className="w-1.5 h-[1px] bg-slate-600 rotate-30" />
            </div>

            {/* Top Plate Header Bar: Entity & Slogan */}
            <div className="flex items-center justify-between px-3 z-10">
              <span className="text-[9px] sm:text-[10px] font-mono font-black tracking-widest text-slate-700 uppercase">
                MÉXICO
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] sm:text-[11px] font-heading font-black tracking-widest uppercase text-emerald-800">
                  MORELOS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-sans font-bold tracking-tight text-slate-500 uppercase">
                ANFITRIÓN DEL MUNDO
              </span>
            </div>

            {/* Center: Authentic Troquelado Embossed Numbers with Real Metallic Bevel */}
            <div className="my-auto flex items-center justify-center gap-1 sm:gap-2 z-10">
              {['R', 'A', 'X', '·', '4', '2', '0', '·', 'E'].map((char, idx) => (
                <span
                  key={idx}
                  className={`font-mono font-black text-2xl sm:text-3xl text-slate-900 tracking-wider inline-block ${
                    char === '·' ? 'text-emerald-700 text-lg opacity-80' : ''
                  }`}
                  style={{
                    textShadow:
                      '1px 1px 0px #ffffff, 2px 2px 2px rgba(15,23,42,0.45), -0.5px -0.5px 0px rgba(0,0,0,0.3)',
                    filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.15))',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Bottom Plate Strip: Authentic QR, SEDENA Microtext & Validity Hologram */}
            <div className="flex items-center justify-between px-2 pt-1 border-t border-slate-200/90 z-10">
              {/* Official QR Code Simulation */}
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-slate-900 p-0.5 flex flex-col justify-between shadow-2xs">
                  <div className="flex justify-between">
                    <span className="w-1.5 h-1.5 bg-white rounded-[1px]" />
                    <span className="w-1.5 h-1.5 bg-white rounded-[1px]" />
                  </div>
                  <div className="flex justify-between">
                    <span className="w-1.5 h-1.5 bg-white rounded-[1px]" />
                    <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-mono font-bold text-slate-600 uppercase tracking-tighter">
                    VERIFICABLE QR
                  </span>
                  <span className="text-[6.5px] font-mono text-emerald-700 font-extrabold tracking-tight">
                    PADRÓN ACTIVO
                  </span>
                </div>
              </div>

              {/* SEDENA Security Troquel Ring */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="w-1 h-1 rounded-full bg-emerald-600" />
                <span className="text-[7.5px] font-mono font-bold text-emerald-800 tracking-wider uppercase">
                  TROQUELADO SEDENA
                </span>
              </div>

              {/* Holographic Seal Badge */}
              <div className="relative px-2 py-0.5 rounded bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-400 text-slate-950 text-[7.5px] font-mono font-black tracking-tight shadow-2xs">
                HOLOGRAMA 2026
              </div>
            </div>

          </div>

        </div>

        {/* Live Savings Float Indicator Badge */}
        <div className="absolute -top-1.5 -right-1 bg-slate-950 text-white px-2.5 py-1 rounded-full text-[10px] font-heading font-extrabold flex items-center gap-1.5 shadow-lg border border-slate-700 z-20 animate-bounce">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Ahorro: $42,500 MXN</span>
        </div>

      </div>
    </div>
  );
}
