import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Car, 
  HardHat, 
  Truck, 
  ShieldCheck, 
  FileSpreadsheet, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Percent, 
  FileCheck2,
  Sparkles,
  PhoneCall,
  Briefcase,
  ChevronRight,
  FileText,
  BadgeCheck,
  Lock,
  Layers,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import Navbar from './Navbar';
import CinematicFooter from './ui/motion-footer';
import flotillaPatioImg from '@/assets/services/flotilla_corporativa_patio.jpg';
import headquartersImg from '@/assets/ciclonatura_headquarters.jpg';

const FLEET_SEGMENTS = [
  {
    id: 'apps',
    label: 'Uber, DiDi & Plataformas',
    icon: Car,
    tag: 'Movilidad & Socios Choferes',
    title: 'Plataformas Digitales y Apps de Movilidad',
    headline: 'Tus unidades circulando sin perder un solo día de facturación.',
    description: 'Para dueños de flotillas y socios conductores de Uber, DiDi, Beat y taxis ejecutivos. Tramitamos altas prioritarias, constancias vehiculares, verificación ambiental holograma 00/0 y tarjetas de circulación con chip RFID que aprueban de inmediato la inspección de cualquier plataforma.',
    metrics: [
      { label: 'Tiempo de Alta', value: '24-48 hrs' },
      { label: 'Aprobación en App', value: '100% Garantizada' },
      { label: 'Unidades Inactivas', value: '0 días' }
    ],
    highlights: [
      'Emplacamiento exprés para unidades recién salidas de agencia',
      'Tarjeta con chip RFID y engomado holográfico verificable',
      'Facturación fiscal consolidada para socio o empresa arrendadora',
      'Asesoría en exención de tenencia en Morelos o radicación CDMX'
    ]
  },
  {
    id: 'constructoras',
    label: 'Constructoras & Maquinaria',
    icon: HardHat,
    tag: 'Pickups, Camiones & Utilitarios',
    title: 'Constructoras, Obra Civil e Infraestructura',
    headline: 'Láminas y regularización para flotillas de trabajo pesado.',
    description: 'Para constructoras, contratistas y firmas de infraestructura con camionetas de trabajo (F-150, Hilux, RAM, Silverado), plataformas, remolques y camiones utilitarios. Auditoría de números de serie troquelados, altas masivas y contratos formales para evitar contingencias en obras o retenes de tránsito y SCT.',
    metrics: [
      { label: 'Cotejo en Obra', value: 'Inspección Física' },
      { label: 'Deducción Fiscal', value: '100% SAT CFDI 4.0' },
      { label: 'Vehículos Pesados', value: 'Pickups & Cajas' }
    ],
    highlights: [
      'Alta y regularización de camionetas de obra y vehículos de carga',
      'Emplacamiento de remolques y cajas secas con certeza legal',
      'Cotejo de facturas de origen para evitar reportes en REPUVE',
      'Desglose exacto de derechos ante tesorería para contabilidad'
    ]
  },
  {
    id: 'corporativos',
    label: 'Empresas & PyMEs',
    icon: Building2,
    tag: 'Directivos & Fuerza de Ventas',
    title: 'Corporativos y Flotillas Comerciales',
    headline: 'Administración vehicular integral con ejecutivo de cuenta asignado.',
    description: 'Para directores de operaciones y compras con flotillas ejecutivas, autos de representantes de ventas y vehículos utilitarios. Centralizamos auditorías de tenencias, fotomultas, canjes periódicos y reemplacamiento masivo sin distraer a tu equipo de su actividad principal.',
    metrics: [
      { label: 'Reporte Consolidado', value: 'Digital en Excel/PDF' },
      { label: 'Entrega en Patio', value: 'Valija Foliada' },
      { label: 'Atención Corporativa', value: 'Ejecutivo Dedicado' }
    ],
    highlights: [
      'Auditoría masiva de tenencias y adeudos en CDMX, Edomex y Morelos',
      'Convenio corporativo con crédito y facturación mensual B2B',
      'Entrega directa en oficinas corporativas o patio de operaciones',
      'Gestor con acreditación oficial asignado a tu cuenta'
    ]
  },
  {
    id: 'arrendadoras',
    label: 'Arrendadoras & Logística',
    icon: Truck,
    tag: 'Leasing & Última Milla',
    title: 'Arrendadoras y Flotas de Logística',
    headline: 'Capacidad de respuesta por volumen y SLA formal por contrato.',
    description: 'Para empresas de leasing vehicular, arrendamiento puro y paqueterías de última milla. Gestionamos lotes de 20 a 200+ unidades simultáneamente con cartas responsivas, apego estricto a las normas de movilidad de la megalópolis y trazabilidad en tiempo real.',
    metrics: [
      { label: 'Capacidad por Lote', value: '200+ Unidades' },
      { label: 'Garantía Legal', value: 'SLA por Contrato' },
      { label: 'Mesa de Control', value: 'Monitoreo B2B' }
    ],
    highlights: [
      'Tramitación paralela en ventanillas de CDMX, Edomex y Morelos',
      'Acompañamiento a firmas de contratos de arrendamiento',
      'Custodia blindada de expedientes originales durante el proceso',
      'Cero retrasos en entregas de unidades a tus clientes finales'
    ]
  }
];

export default function FlotillasPage({ 
  onNavigateHome, 
  onSelectService, 
  onNavigateContact, 
  onNavigateNosotros, 
  onNavigateFlotillas 
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const activeSegment = FLEET_SEGMENTS[activeSegmentIndex];

  // Fleet Calculator State
  const [fleetSize, setFleetSize] = useState('11-30');
  const [statePreference, setStatePreference] = useState('morelos');

  const fleetSizeLabels = {
    '3-10': '3 a 10 unidades (Flota Ligera / Socios)',
    '11-30': '11 a 30 unidades (Flota Mediana)',
    '31-80': '31 a 80 unidades (Flotilla Empresarial)',
    '80+': 'Más de 80 unidades (Gran Corporativo)'
  };

  const stateLabels = {
    morelos: 'Morelos (100% Exento de Tenencia de por vida)',
    cdmx: 'CDMX (Placas de la Ciudad de México con Chip)',
    edomex: 'Edomex (Padrón del Estado de México)'
  };

  const getEstimatedTurnaround = () => {
    if (fleetSize === '3-10') return '48 a 72 hrs por bloque';
    if (fleetSize === '11-30') return '3 a 4 días hábiles escalonados';
    if (fleetSize === '31-80') return '5 a 7 días hábiles con entrega por patio';
    return 'Cronograma coordinado con ejecutivo asignado';
  };

  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `🏛️ *COTIZACIÓN DE FLOTILLAS CICLONATURA B2B*\n` +
      `• *Segmento:* ${activeSegment.label}\n` +
      `• *Volumen:* ${fleetSizeLabels[fleetSize]}\n` +
      `• *Entidad:* ${stateLabels[statePreference]}\n` +
      `• *Solicitud:* Deseo atención con ejecutivo de cuenta asignado, desglose fiscal SAT y propuesta de servicio.`
    );
    window.open(`https://wa.me/525547021799?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative flex flex-col font-sans selection:bg-[#AFF94F] selection:text-slate-950">
      
      {/* Floating Navbar */}
      <Navbar 
        onNavigateHome={onNavigateHome}
        onSelectService={onSelectService}
        onNavigateContact={onNavigateContact}
        onNavigateNosotros={onNavigateNosotros}
        onNavigateFlotillas={onNavigateFlotillas}
      />

      <main className="flex-1 relative z-10 bg-slate-50 shadow-2xl border-b border-slate-200/80 pt-24 sm:pt-28">
        
        {/* ========================================================== */}
        {/* 1. HERO INSTITUCIONAL DE FLOTILLAS B2B                     */}
        {/* ========================================================== */}
        <section className="relative py-16 sm:py-24 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
          
          <div className="container max-w-6xl relative z-10">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
              <button 
                onClick={onNavigateHome}
                className="hover:text-slate-950 transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <ChevronRight size={12} className="text-slate-400" />
              <span className="font-semibold text-slate-900">Flotillas Corporativas B2B</span>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider font-heading mb-4 shadow-2xs">
                <Briefcase size={14} className="text-emerald-600" />
                <span>Gestoría Vehicular B2B • Flotillas & Empresas</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Gestión Integral para Flotillas en{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                  CDMX, Edomex y Morelos.
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
                Optimizamos tiempos, eliminamos riesgos de coyotes y garantizamos deducción fiscal 100% ante el SAT para Uber, constructoras con maquinaria pesada, arrendadoras y empresas con operaciones en la megalópolis.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
                <button
                  onClick={handleWhatsAppQuote}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs sm:text-sm shadow-xl shadow-slate-950/15 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                >
                  <MessageCircle size={16} className="text-[#AFF94F]" />
                  <span>Hablar con Ejecutivo de Flotillas</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#simulador"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-heading font-bold text-xs sm:text-sm border border-slate-200/90 shadow-sm transition-all cursor-pointer"
                >
                  <span>Simulador de Flota</span>
                  <ChevronRight size={15} />
                </a>
              </div>

            </div>

            {/* Key Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-slate-200">
              {[
                { number: '24-48 hrs', label: 'Tiempos de Despacho', sub: 'Por lote escalonado' },
                { number: '100% SAT', label: 'Factura CFDI 4.0', sub: 'Desglose oficial de derechos' },
                { number: 'Valija Foliada', label: 'Entrega en Patio', sub: 'Sin mover tus unidades' },
                { number: 'SLA por Escrito', label: 'Garantía Contractual', sub: 'Cero contingencias legales' }
              ].map((m, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm text-center">
                  <div className="font-heading text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {m.number}
                  </div>
                  <div className="font-heading font-bold text-xs text-emerald-700 mt-1">
                    {m.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* 2. SELECTOR DE SEGMENTOS OPERATIVOS                        */}
        {/* ========================================================== */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-b border-slate-800">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
          
          <div className="container max-w-6xl relative z-10">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[11px] font-mono font-bold text-[#AFF94F] uppercase tracking-widest block mb-2">
                Soluciones por Industria
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-black text-white tracking-tight">
                Especialistas en Cada Tipo de Operación
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Selecciona tu segmento para conocer los beneficios y protocolos diseñados para tu flota.
              </p>
            </div>

            {/* Segment Selector Tabs */}
            <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              {FLEET_SEGMENTS.map((seg, idx) => {
                const Icon = seg.icon;
                const isActive = activeSegmentIndex === idx;
                return (
                  <button
                    key={seg.id}
                    onClick={() => setActiveSegmentIndex(idx)}
                    className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-[#AFF94F] text-slate-950 border-[#AFF94F] shadow-lg shadow-[#AFF94F]/20 scale-105'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-slate-950' : 'text-[#AFF94F]'} />
                    <span>{seg.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Segment Detail Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSegment.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Left Column: Context, Benefits & Highlights */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                        <Sparkles size={12} />
                        <span>{activeSegment.tag}</span>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl font-black text-white leading-snug">
                        {activeSegment.title}
                      </h3>
                      
                      <p className="text-[#AFF94F] text-xs sm:text-sm font-heading font-semibold mt-1">
                        {activeSegment.headline}
                      </p>

                      <p className="text-slate-300 text-xs sm:text-sm mt-3.5 leading-relaxed font-normal">
                        {activeSegment.description}
                      </p>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
                        {activeSegment.highlights.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 text-xs text-slate-200">
                            <CheckCircle2 size={14} className="text-[#AFF94F] shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10">
                      {activeSegment.metrics.map((m, idx) => (
                        <div key={idx} className="bg-slate-900/60 p-3 rounded-2xl border border-white/5">
                          <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-semibold">
                            {m.label}
                          </div>
                          <div className="text-sm sm:text-base font-heading font-black text-white mt-1">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Fleet Operational Imagery & Live Status Card */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-xl group">
                      <img 
                        src={flotillaPatioImg} 
                        alt="Patio de operaciones de flotillas vehiculares" 
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                        <span className="bg-emerald-500/90 text-slate-950 font-bold px-2.5 py-1 rounded-md text-[11px] font-heading flex items-center gap-1.5 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                          Mesa de Control B2B Activa
                        </span>
                        <span className="text-slate-300 font-mono text-[11px]">
                          CDMX · Edomex · Morelos
                        </span>
                      </div>
                    </div>

                    {/* Fast Service Badge */}
                    <div className="bg-gradient-to-r from-emerald-950/70 to-slate-900/80 p-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#AFF94F]/20 text-[#AFF94F] flex items-center justify-center shrink-0">
                          <FileSpreadsheet size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-heading font-bold text-white">¿Tienes más de 10 unidades?</div>
                          <div className="text-[11px] text-slate-400">Auditoría previa de fotomultas y tenencias sin costo</div>
                        </div>
                      </div>
                      <button
                        onClick={handleWhatsAppQuote}
                        className="px-3.5 py-2 rounded-xl bg-[#AFF94F] hover:bg-[#9de441] text-slate-950 text-xs font-heading font-black whitespace-nowrap transition-all shrink-0 cursor-pointer shadow-sm"
                      >
                        Cotizar Flota
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* 3. SIMULADOR RÁPIDO DE VOLUMEN (B2B CALCULATOR)           */}
        {/* ========================================================== */}
        <section id="simulador" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
          <div className="container max-w-6xl">
            
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
              
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#AFF94F] uppercase tracking-wider block mb-1">
                    Simulador Rápido B2B
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
                    Calcula tiempos y beneficios para tu volumen vehicular
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-heading">Entidad de trámite:</span>
                  {[
                    { id: 'morelos', label: 'Morelos (0% Tenencia)' },
                    { id: 'cdmx', label: 'CDMX Oficial' },
                    { id: 'edomex', label: 'Edomex' }
                  ].map(st => (
                    <button
                      key={st.id}
                      onClick={() => setStatePreference(st.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer border ${
                        statePreference === st.id
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                          : 'bg-white/5 text-slate-300 hover:text-white border-white/10'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector + Dynamic Result */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
                
                <div className="md:col-span-7">
                  <label className="text-xs text-slate-300 font-heading font-medium block mb-2.5">
                    Selecciona el volumen de tu flotilla:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: '3-10', label: '3 a 10', sub: 'Socios / PyME' },
                      { id: '11-30', label: '11 a 30', sub: 'Mediana' },
                      { id: '31-80', label: '31 a 80', sub: 'Empresarial' },
                      { id: '80+', label: '80+ unidades', sub: 'Corporativo' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setFleetSize(item.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          fleetSize === item.id
                            ? 'bg-[#AFF94F]/15 border-[#AFF94F] text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="font-heading font-black text-sm text-white">{item.label}</span>
                        <span className="text-[10px] text-slate-400 mt-1 font-mono">{item.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Results Box */}
                <div className="md:col-span-5 bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Tiempo Estimado de Entrega</div>
                    <div className="text-base sm:text-lg font-heading font-black text-[#AFF94F] mt-0.5">
                      {getEstimatedTurnaround()}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Incluye valija de seguridad sellada en patio y factura SAT CFDI 4.0 con desglose oficial.
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsAppQuote}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#AFF94F] to-emerald-400 hover:brightness-105 text-slate-950 font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <span>Solicitar Asesor de Flotilla en WhatsApp</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* 4. REQUISITOS B2B (PERSONA MORAL & FLOTILLAS)              */}
        {/* ========================================================== */}
        <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
          <div className="container max-w-6xl">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                Documentación B2B
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Requisitos para Apertura de Cuenta Corporativa
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                Trámite ágil con recepción digital y cotejo previo sin mover tus expedientes originales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Documentación de la Empresa */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-slate-900">
                      Documentos de la Persona Moral
                    </h4>
                    <span className="text-xs text-slate-500">Expediente único de la empresa</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  {[
                    'Constancia de Situación Fiscal (CSF) actualizada con código QR.',
                    'Acta constitutiva y poder legal del representante o apoderado.',
                    'Identificación oficial vigente del apoderado legal (INE o Pasaporte).',
                    'Comprobante de domicilio fiscal no mayor a 3 meses.',
                    'Contrato marco de servicios y convenio de confidencialidad.'
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Documentación por Unidad */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                    <Car size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-slate-900">
                      Documentos por Cada Unidad
                    </h4>
                    <span className="text-xs text-slate-500">Formato digital o físico para cotejo</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  {[
                    'Factura de origen o carta factura con copia de la original.',
                    'Tarjeta de circulación anterior o acuse de baja si aplica.',
                    'Matriz vehicular en Excel con número de serie (VIN) y placas actuales.',
                    'Comprobante de pago de últimas tenencias o refrendos.',
                    'Fotografías legibles de la placa VIN en chasis o parabrisas.'
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-sky-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* 5. PREGUNTAS FRECUENTES B2B                               */}
        {/* ========================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
          <div className="container max-w-4xl">
            
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                Dudas Corporativas
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Preguntas Frecuentes para Empresas
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: '¿Cómo funciona la deducción fiscal del 100% de los trámites?',
                  a: 'Emitimos factura electrónica CFDI 4.0 a nombre de tu razón social. Desglosamos transparentemente los derechos gubernamentales pagados a tesorería (exentos de IVA) y nuestros honorarios de gestión corporativa con su IVA correspondiente, haciéndolo 100% deducible para tu contabilidad.'
                },
                {
                  q: '¿Podemos tramitar placas de Morelos para toda nuestra flotilla?',
                  a: 'Sí, totalmente legal. El Artículo 11 constitucional ampara el libre tránsito en CDMX y Edomex. Además, Morelos exenta el 100% de la tenencia estatal anual, lo cual genera ahorros de decenas o cientos de miles de pesos al año para flotillas de alto valor comercial.'
                },
                {
                  q: '¿Tienen capacidad de recolectar y entregar directamente en nuestro patio operativo?',
                  a: 'Sí. Disponemos de mensajería corporativa propia con custodia blindada. Recolectamos expedientes bajo acta responsiva y entregamos las placas troqueladas SEDENA y tarjetas RFID en valijas selladas directamente en tus instalaciones.'
                },
                {
                  q: '¿Ofrecen crédito o convenios de pago para empresas?',
                  a: 'Para empresas y flotilleros con más de 10 unidades activas ofrecemos esquema de convenio corporativo, facturación quincenal o mensual consolidada y términos de crédito previa validación crediticia.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                  <h4 className="font-heading text-sm sm:text-base font-bold text-slate-900 flex items-start gap-2.5">
                    <HelpCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 pl-7 leading-relaxed font-normal">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Cinematic Curtain Reveal Footer */}
      <CinematicFooter />

    </div>
  );
}
