import React, { useState } from 'react';
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
  Briefcase
} from 'lucide-react';
import flotillaPatioImg from '@/assets/services/flotilla_corporativa_patio.jpg';

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

export default function FlotillasSection({ onSelectService }) {
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
      `Hola Ciclonatura B2B, requiero cotización y asesoría para flotilla:\n` +
      `• Tipo de operación: ${activeSegment.label}\n` +
      `• Volumen aproximado: ${fleetSizeLabels[fleetSize]}\n` +
      `• Entidad de interés: ${stateLabels[statePreference]}\n` +
      `• Solicitud: Deseo atención con ejecutivo de cuenta asignado y factura deducible SAT.`
    );
    window.open(`https://wa.me/525547021799?text=${message}`, '_blank');
  };

  return (
    <section 
      id="flotillas" 
      className="py-20 sm:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden select-none border-b border-slate-800"
    >
      {/* Background Tech Hex Grid & Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="pointer-events-none absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-48 w-96 h-96 bg-[#AFF94F]/10 rounded-full blur-3xl" />

      <div className="container max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#AFF94F] text-xs font-bold uppercase tracking-wider font-heading mb-4 backdrop-blur-md">
            <Briefcase size={13} className="text-[#AFF94F]" />
            <span>Gestión Vehicular B2B • Flotillas Corporativas</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Soluciones a la Medida para Flotillas en{' '}
            <span className="bg-gradient-to-r from-[#AFF94F] via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              CDMX, Edomex y Morelos.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Desde socios conductores de Uber y DiDi hasta constructoras con maquinaria pesada y grandes corporativos. Cero unidades paradas, entrega en patio y 100% deducible ante el SAT.
          </p>
        </div>

        {/* Fleet Segment Interactive Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
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
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl mb-12 shadow-2xl">
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

        {/* Interactive Fleet Estimator Bar (Bespoke B2B Calculator) */}
        <div className="bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#AFF94F] uppercase tracking-wider block mb-1">
                Simulador Rápido B2B
              </span>
              <h4 className="font-heading text-xl sm:text-2xl font-black text-white">
                Calcula tiempos de atención para tu volumen vehicular
              </h4>
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
                Selecciona el tamaño de tu flotilla:
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

        {/* Bottom 4 B2B Institutional Guarantees */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { title: 'Contrato B2B con SLA', desc: 'Tiempos de entrega pactados por escrito' },
            { title: 'CFDI 4.0 100% Deducible', desc: 'Desglose exacto de derechos gubernamentales' },
            { title: 'Entrega en Patio Operativo', desc: 'Valijas foliadas sin que muevas un auto' },
            { title: 'Cotejo Previo REPUVE', desc: 'Auditoría sin costo para descartar anomalías' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-heading font-bold text-xs">
                <CheckCircle2 size={14} className="text-[#AFF94F]" />
                <span>{item.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
