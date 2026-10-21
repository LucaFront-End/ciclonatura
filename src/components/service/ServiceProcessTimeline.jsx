import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileSearch, 
  Building, 
  ShieldCheck, 
  PackageCheck, 
  FileCheck, 
  ShieldAlert, 
  UserCheck, 
  CreditCard,
  Shield,
  Clock,
  FileBadge,
  CheckCheck,
  Search,
  Percent,
  Barcode,
  CheckSquare,
  Building2,
  Receipt,
  ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  FileSearch,
  Building,
  ShieldCheck,
  PackageCheck,
  FileCheck,
  ShieldAlert,
  UserCheck,
  CreditCard,
  Shield,
  Clock,
  FileBadge,
  CheckCheck,
  Search,
  Percent,
  Barcode,
  CheckSquare,
  Building2,
  Receipt
};

export default function ServiceProcessTimeline({ service }) {
  if (!service || !service.processTimeline) return null;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-200/80 relative overflow-hidden select-none">
      {/* Background dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold font-heading mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Flujo Operativo Paso a Paso • Sin Intermediarios</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            ¿Cómo se ejecuta tu trámite de{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              {service.shortName}?
            </span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">
            Cada etapa cuenta con folio notarial y trazabilidad en tiempo real. Sabes exactamente dónde están tus documentos en cada minuto.
          </p>
        </div>

        {/* Vertical Chronological Process Timeline */}
        <div className="relative">
          {/* Central Connecting Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-slate-200" />
          <div className="md:hidden absolute left-5 top-4 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-slate-200" />

          <div className="space-y-10 sm:space-y-14">
            {service.processTimeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = ICON_MAP[item.icon] || ShieldCheck;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Card Content */}
                  <div className="w-full md:w-[45%] pl-14 md:pl-0">
                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-md shadow-slate-900/5 hover:border-emerald-400/80 hover:shadow-xl transition-all duration-300 group">
                      
                      {/* Top Meta Header */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                          {item.timeframe}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-heading">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-[13px] mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Central Node Indicator */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-500 shadow-md shadow-emerald-500/20 flex items-center justify-center text-emerald-700 font-heading font-black text-xs z-10 group-hover:scale-110 transition-transform">
                      <IconComponent size={18} className="text-emerald-600" />
                    </div>
                  </div>

                  {/* Empty Spacer on Opposite Side */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Turnaround Guarantee Pill */}
        <div className="mt-14 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white border border-slate-200/90 shadow-sm rounded-2xl sm:rounded-full px-5 py-2.5 text-xs text-slate-700 font-medium">
            <span className="flex items-center gap-1.5 font-bold text-slate-900 font-heading">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Plazo Contractual Garantizado:
            </span>
            <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {service.turnaround}
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-500 text-[11px]">
              Vía oficial {service.officialAuthority}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
