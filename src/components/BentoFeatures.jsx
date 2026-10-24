import React from 'react';
import IsoMorelosPlate from './ui/scenes/IsoMorelosPlate';
import IsoOwnershipTransfer from './ui/scenes/IsoOwnershipTransfer';
import IsoExpressDispatch from './ui/scenes/IsoExpressDispatch';
import IsoTaxAudit from './ui/scenes/IsoTaxAudit';
import IsoCorporateFleet from './ui/scenes/IsoCorporateFleet';
import { 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2,
  BadgeCheck,
  Scale
} from 'lucide-react';

export default function BentoFeatures({ onSelectService }) {
  const handleServiceClick = (serviceName, serviceSlug) => (e) => {
    e.preventDefault();
    const slug = serviceSlug.replace('/servicios/', '');
    if (onSelectService) {
      onSelectService(slug);
    } else {
      window.history.pushState(null, '', serviceSlug);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200/80 relative overflow-hidden select-none">
      {/* Background Subtle Tech Matrix Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-8 sm:gap-12">
        
        {/* Prominent, Elegant Services Section Header */}
        <div className="text-center max-w-3xl mx-auto shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-900 text-xs font-bold uppercase tracking-wider font-heading mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Portafolio de Trámites Vehiculares Oficiales</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Nuestros Trámites{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Vehiculares.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed font-normal">
            Soluciones ágiles, legales y sin coyotes en CDMX, Morelos y Estado de México. Ahorra en tenencia, transfiere con certeza jurídica o gestiona tu flotilla con entrega a domicilio y factura SAT.
          </p>
        </div>

        {/* 5-Card Bento Grid Redistribution: 2 Cards Top (7/5), 3 Cards Bottom (4/4/4) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">

          {/* ======================================================== */}
          {/* SERVICE 1: Emplacamiento Morelos (Hero Service - Span 7) */}
          {/* ======================================================== */}
          <div className="md:col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative group min-h-[390px] sm:min-h-[410px]">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

            {/* Left Content Column */}
            <div className="w-full sm:w-[46%] flex flex-col justify-between h-full z-10 shrink-0">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-heading mb-2.5 shadow-2xs">
                  <BadgeCheck size={12} className="text-emerald-600" />
                  Alta Oficial · CDMX · Edomex · Morelos
                </span>

                <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                  Emplacamiento CDMX, Edomex & Morelos
                </h3>
                <p className="text-emerald-700 text-xs font-heading font-bold mt-0.5">
                  Alta y canje oficial según tu conveniencia fiscal y de circulación
                </p>

                <p className="text-slate-600 text-xs sm:text-[13px] mt-2 leading-relaxed">
                  Emplacamos tu auto en la entidad óptima para ti: exención de tenencia en Morelos para autos de alto valor, placas oficiales CDMX con tarjeta inteligente chip, o reemplacamiento del Estado de México. Láminas troqueladas bajo norma SEDENA y entrega a domicilio con factura SAT.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {["Placas CDMX", "Placas Morelos 0% Tenencia", "Placas Edomex", "Entrega a Domicilio"].map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                      <CheckCircle2 size={11} className="text-emerald-600" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Service Page Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-semibold">
                <span className="text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-mono text-[11px] font-bold shrink-0">
                  <Clock size={12} className="text-emerald-600" />
                  Entrega 48 a 72 hrs
                </span>
                <a
                  href="/servicios/emplacamiento-morelos"
                  onClick={handleServiceClick('Emplacamiento en Morelos', '/servicios/emplacamiento-morelos')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-950 hover:bg-emerald-600 text-white font-heading font-bold text-xs whitespace-nowrap shrink-0 shadow-md shadow-slate-950/20 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer border border-slate-800/80 hover:border-emerald-500"
                >
                  <span className="whitespace-nowrap">Ver detalles</span>
                  <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/20 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 shrink-0">
                    <ArrowRight size={12} className="text-emerald-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right Hyperrealistic 3D Isometric License Plate Scene */}
            <div className="w-full sm:w-[54%] h-64 sm:h-[300px] lg:h-[330px] rounded-2xl bg-gradient-to-b from-emerald-50/40 via-slate-50 to-emerald-50/20 border border-slate-100 flex items-center justify-center overflow-hidden">
              <IsoMorelosPlate />
            </div>
          </div>

          {/* ======================================================== */}
          {/* SERVICE 2: Cambio de Propietario (Top Right - Span 5)     */}
          {/* ======================================================== */}
          <div className="md:col-span-12 lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:border-sky-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group min-h-[350px]">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full font-heading shadow-2xs">
                <ShieldCheck size={12} className="text-sky-600" />
                Protección Jurídica Total
              </span>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                Sin Multas Heredadas
              </span>
            </div>

            <div className="mt-3">
              <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                Cambio de Propietario
              </h3>
              <p className="text-sky-700 text-xs font-heading font-bold mt-0.5">
                Cotejo ante SAT y tarjeta de circulación a tu nombre
              </p>
              <p className="text-slate-600 text-xs sm:text-[13px] mt-2 leading-relaxed">
                Blindaje legal absoluto al comprar o vender un auto seminuevo. Auditamos facturas de origen, verificamos REPUVE sin reporte de robo ni adeudos y emitimos tu tarjeta con chip oficial.
              </p>
            </div>

            {/* Hyperrealistic 3D Isometric Smart Card Scene */}
            <div className="w-full h-44 sm:h-[160px] rounded-2xl bg-gradient-to-b from-sky-50/40 via-slate-50 to-sky-50/20 border border-slate-100 flex items-center justify-center overflow-hidden my-3">
              <IsoOwnershipTransfer />
            </div>

            {/* Card Footer with Service Page Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-sky-800 bg-sky-50 border border-sky-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-mono text-[11px] font-bold">
                <Clock size={12} className="text-sky-600" />
                48 a 72 hrs
              </span>
              <a
                href="/servicios/cambio-de-propietario"
                onClick={handleServiceClick('Cambio de Propietario', '/servicios/cambio-de-propietario')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-950 hover:bg-sky-600 text-white font-heading font-bold text-xs shadow-md shadow-slate-950/20 hover:shadow-xl hover:shadow-sky-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer border border-slate-800/80 hover:border-sky-500"
              >
                <span>Ver detalles</span>
                <span className="w-4.5 h-4.5 rounded-full bg-sky-500/20 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                  <ArrowRight size={12} className="text-sky-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SERVICE 3: Altas, Bajas & Reposición (Bottom 1 - Span 4) */}
          {/* ======================================================== */}
          <div className="md:col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:border-lime-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group min-h-[380px]">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-lime-100/40 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between z-10 mb-2.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-lime-800 bg-lime-50 border border-lime-200 px-2.5 py-0.5 rounded-full font-heading shadow-2xs">
                  <Zap size={12} className="text-lime-600" />
                  SEMOVI & Edomex
                </span>
                <span className="text-[10px] font-bold text-lime-800 bg-lime-100 px-2 py-0.5 rounded-full">
                  Sin Citas Saturadas
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                Altas, Bajas & Reposición
              </h3>
              <p className="text-lime-800 text-xs font-heading font-bold mt-0.5">
                Trámites express para agencia, venta o robo
              </p>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Deshazte de responsabilidades legales al vender con una baja oficial inmediata, o emplaca tu auto nuevo y repón placas por extravío o robo sin perder un solo día en filas.
              </p>
            </div>

            {/* Hyperrealistic 3D Isometric Dispatch Briefcase Scene */}
            <div className="w-full h-40 rounded-2xl bg-gradient-to-b from-lime-50/40 via-slate-50 to-lime-50/20 border border-slate-100 flex items-center justify-center overflow-hidden my-3">
              <IsoExpressDispatch />
            </div>

            {/* Card Footer with Service Page Action */}
            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-lime-800 bg-lime-50 border border-lime-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-mono text-[11px] font-bold">
                <Clock size={12} className="text-lime-600" />
                24 a 48 hrs
              </span>
              <a
                href="/servicios/alta-baja-placas"
                onClick={handleServiceClick('Altas, Bajas y Reposición', '/servicios/alta-baja-placas')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 hover:bg-lime-700 text-white font-heading font-bold text-xs shadow-md shadow-slate-950/20 hover:shadow-xl hover:shadow-lime-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer border border-slate-800/80 hover:border-lime-500"
              >
                <span>Ver detalles</span>
                <span className="w-4.5 h-4.5 rounded-full bg-lime-500/20 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                  <ArrowRight size={11} className="text-lime-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SERVICE 4: Regularización de Tenencias & Adeudos (Span 4)  */}
          {/* ======================================================== */}
          <div className="md:col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group min-h-[380px]">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between z-10 mb-2.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-heading shadow-2xs">
                  <Scale size={12} className="text-emerald-600" />
                  Tesorería Oficial
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Cero Adeudos Fantasma
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                Regularización de Adeudos
              </h3>
              <p className="text-emerald-700 text-xs font-heading font-bold mt-0.5">
                Liquidación transparente y liberación para verificar
              </p>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Pon al corriente tu auto para circular y verificar sin riesgo de corralón. Diagnosticamos adeudos reales en el padrón de finanzas, cancelamos recargos improcedentes y pagamos con líneas oficiales.
              </p>
            </div>

            {/* Hyperrealistic 3D Isometric Tax Audit Scene */}
            <div className="w-full h-40 rounded-2xl bg-gradient-to-b from-emerald-50/40 via-slate-50 to-emerald-50/20 border border-slate-100 flex items-center justify-center overflow-hidden my-3">
              <IsoTaxAudit />
            </div>

            {/* Card Footer with Service Page Action */}
            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-mono text-[11px] font-bold">
                <Clock size={12} className="text-emerald-600" />
                Auditoría en 24h
              </span>
              <a
                href="/servicios/regularizacion-tenencias"
                onClick={handleServiceClick('Auditoría de Tenencias y Adeudos', '/servicios/regularizacion-tenencias')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 hover:bg-emerald-600 text-white font-heading font-bold text-xs shadow-md shadow-slate-950/20 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer border border-slate-800/80 hover:border-emerald-500"
              >
                <span>Ver detalles</span>
                <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/20 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                  <ArrowRight size={11} className="text-emerald-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SERVICE 5: Flotillas & Factura SAT CFDI (Span 4)          */}
          {/* ======================================================== */}
          <div className="md:col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group min-h-[380px]">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between z-10 mb-2.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full font-heading shadow-2xs">
                  <Building2 size={12} className="text-indigo-600" />
                  B2B & Empresas
                </span>
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                  CFDI 4.0 SAT
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                Flotillas Corporativas B2B
              </h3>
              <p className="text-indigo-700 text-xs font-heading font-bold mt-0.5">
                Facturación 100% deducible y gestión masiva en bloque
              </p>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Emplacamiento y regularización en bloque para empresas, arrendadoras y logística. Gestor corporativo dedicado, alta simultánea sin frenar tu operación y entrega de placas directamente en tu patio.
              </p>
            </div>

            {/* Hyperrealistic 3D Isometric Corporate Fleet Scene */}
            <div className="w-full h-40 rounded-2xl bg-gradient-to-b from-indigo-50/40 via-slate-50 to-indigo-50/20 border border-slate-100 flex items-center justify-center overflow-hidden my-3">
              <IsoCorporateFleet />
            </div>

            {/* Card Footer with Service Page Action */}
            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-indigo-800 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-mono text-[11px] font-bold">
                <Building2 size={12} className="text-indigo-600" />
                Gestor asignado
              </span>
              <a
                href="/servicios/flotillas-corporativas"
                onClick={handleServiceClick('Flotillas Corporativas', '/servicios/flotillas-corporativas')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-heading font-bold text-xs shadow-md shadow-slate-950/20 hover:shadow-xl hover:shadow-indigo-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer border border-slate-800/80 hover:border-indigo-500"
              >
                <span>Ver detalles</span>
                <span className="w-4.5 h-4.5 rounded-full bg-indigo-500/20 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                  <ArrowRight size={11} className="text-indigo-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
