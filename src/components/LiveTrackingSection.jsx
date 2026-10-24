import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Check, 
  Copy, 
  MessageSquare, 
  FileCheck2, 
  ArrowRight,
  Lock,
  Sparkles,
  QrCode
} from 'lucide-react';
import MinimalistRouteMap from '@/components/ui/MinimalistRouteMap';

const TRACKING_DATA = {
  'CN-849201': {
    folio: 'CN-849201',
    client: 'Roberto Sánchez M.',
    vehicle: 'BMW M340i xDrive 2024',
    service: 'Emplacamiento en Morelos Oficial',
    badge: 'Cero Tenencia Anual',
    status: 'En Tránsito a Domicilio',
    statusColor: '#AFF94F',
    eta: 'Hoy a las 16:45 hrs',
    origin: 'SMyT Gobierno de Morelos (Cuernavaca)',
    destination: 'Polanco V Sección, Miguel Hidalgo, CDMX',
    courier: 'Lic. Javier Ramos • Unidad Express #04',
    seal: 'PC-8891-NOTARIAL',
    currentStep: 4,
    steps: [
      { id: 1, label: 'Auditoría REPUVE', sub: 'Factura y antecedentes limpios', done: true },
      { id: 2, label: 'Ingreso SMyT', sub: 'Derechos estatales pagados', done: true },
      { id: 3, label: 'Troquelado SEDENA', sub: 'Láminas y chip inteligente emitidos', done: true },
      { id: 4, label: 'En Ruta de Entrega', sub: 'Valija sellada en tránsito', active: true },
      { id: 5, label: 'Entrega & CFDI 4.0', sub: 'Acuse en mano firmado', pending: true }
    ]
  },
  'CN-730194': {
    folio: 'CN-730194',
    client: 'Dra. Mariana Lozano',
    vehicle: 'Porsche Macan GTS 2022',
    service: 'Cambio de Propietario Digital',
    badge: 'Endosos SAT Validados',
    status: 'Validación en Padrón SEMOVI',
    statusColor: '#38bdf8',
    eta: 'Mañana a las 11:30 hrs',
    origin: 'Módulo Central SEMOVI Insurgentes',
    destination: 'Col. Del Valle Sur, Benito Juárez, CDMX',
    courier: 'Lic. Andrea Morales • Mesa Jurídica CDMX',
    seal: 'PC-4102-SEMOVI',
    currentStep: 3,
    steps: [
      { id: 1, label: 'Auditoría Notarial', sub: 'Secuencia de facturas cotejada', done: true },
      { id: 2, label: 'Baja de Infracciones', sub: 'Historial de adeudos depurado', done: true },
      { id: 3, label: 'Emisión Tarjeta Chip', sub: 'Plastificado oficial a nuevo titular', active: true },
      { id: 4, label: 'Valija Notarial', sub: 'Embalaje de seguridad', pending: true },
      { id: 5, label: 'Entrega Notarial', sub: 'Recepción en sede o domicilio', pending: true }
    ]
  },
  'CN-604812': {
    folio: 'CN-604812',
    client: 'Grupo Finsa Logística S.A.',
    vehicle: 'Lote de 12 Vans Mercedes Sprinter 2025',
    service: 'Gestoría de Flotillas B2B & CFDI 4.0',
    badge: '12 Unidades Deducibles',
    status: 'Listo para Entrega en Patio',
    statusColor: '#AFF94F',
    eta: 'Hoy a las 18:00 hrs',
    origin: 'Sede Notarial Calzada de Tlalpan #1820',
    destination: 'Parque Industrial Naucalpan, EdoMéx',
    courier: 'Unidad Blindada Ciclonatura B2B #02',
    seal: 'PC-0042-CORPORATE',
    currentStep: 5,
    steps: [
      { id: 1, label: 'Cotejo VIN Masivo', sub: '12 unidades validadas ante SAT', done: true },
      { id: 2, label: 'Ingreso Corporativo', sub: 'Emisión en bloque sin filas', done: true },
      { id: 3, label: 'Troquelado Metálico', sub: '12 pares de láminas selladas', done: true },
      { id: 4, label: 'Cierre de Valija', sub: 'Precinto notarial numerado', done: true },
      { id: 5, label: 'Entrega a Apoderado', sub: 'Acuse y factura electrónica 100%', active: true }
    ]
  }
};

export default function LiveTrackingSection() {
  const [selectedFolio, setSelectedFolio] = useState('CN-849201');
  const [searchInput, setSearchInput] = useState('');
  const [copied, setCopied] = useState(false);

  const activeCase = TRACKING_DATA[selectedFolio] || TRACKING_DATA['CN-849201'];

  const handleCopyFolio = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (TRACKING_DATA[clean]) {
      setSelectedFolio(clean);
    } else {
      setSelectedFolio('CN-849201');
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `🏛️ *CONSULTA DE SEGUIMIENTO EN VIVO*\n` +
      `*Folio:* #${activeCase.folio}\n` +
      `*Vehículo:* ${activeCase.vehicle}\n` +
      `*Trámite:* ${activeCase.service}\n` +
      `*Estatus Actual:* ${activeCase.status}\n` +
      `*ETA:* ${activeCase.eta}\n\n` +
      `Hola Ciclonatura, deseo recibir copia digital del acuse notarial y reporte de mi trámite #${activeCase.folio}.`
    );
    window.open(`https://wa.me/525547021799?text=${text}`, '_blank');
  };

  return (
    <section 
      id="rastreo"
      className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-slate-200/80 relative select-none overflow-hidden"
    >
      {/* Background Soft Lime Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#AFF94F]/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ======================================================== */}
        {/* HEADER: CLEAN, MINIMAL, DIRECT                           */}
        {/* ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AFF94F]/20 border border-[#AFF94F]/60 text-slate-950 text-xs font-heading font-black mb-3">
            <span className="w-2 h-2 rounded-full bg-[#65a30d] shadow-[0_0_6px_#AFF94F] animate-pulse" />
            <span>Trazabilidad Notarial en Tiempo Real</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Rastrea tu Trámite Oficial
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Consulta en vivo la ubicación de tu valija, la etapa legal ante SMyT / SEMOVI y la hora estimada de entrega en mano.
          </p>

          {/* Minimalist Search Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xs">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={15} />
              </div>
              <input
                type="text"
                placeholder="Ingresa tu folio (ej. CN-849201)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 rounded-full border border-slate-200 bg-white text-xs sm:text-sm font-mono font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#AFF94F] focus:ring-2 focus:ring-[#AFF94F]/30"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 rounded-full bg-slate-950 hover:bg-[#AFF94F] text-white hover:text-slate-950 text-xs font-heading font-black transition-all cursor-pointer"
              >
                Consultar
              </button>
            </form>

            {/* Quick Preset Folio Chips */}
            <div className="flex items-center justify-center gap-2 flex-wrap mt-3">
              <span className="text-[11px] font-mono text-slate-400">Ejemplos en vivo:</span>
              {Object.keys(TRACKING_DATA).map((key) => {
                const isSelected = selectedFolio === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedFolio(key)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-950 text-white font-bold ring-2 ring-[#AFF94F]/60'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#AFF94F]' : 'bg-slate-300'}`} />
                    <span>#{key}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN HERO CARD: 2-COLUMN BENTO WITH MINIMALIST MAP       */}
        {/* ======================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.folio}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            {/* Top Bar: Vehicle, Folio & Status */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
              
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-black text-slate-950 bg-white border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    #{activeCase.folio}
                    <button
                      type="button"
                      onClick={() => handleCopyFolio(activeCase.folio)}
                      title="Copiar folio"
                      className="text-slate-400 hover:text-slate-950 ml-0.5 cursor-pointer"
                    >
                      {copied ? <Check size={11} className="text-[#65a30d]" /> : <Copy size={11} />}
                    </button>
                  </span>
                  <span className="text-[10px] font-heading font-black uppercase tracking-wide text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {activeCase.badge}
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 leading-tight">
                  {activeCase.vehicle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeCase.service} • <strong className="text-slate-700 font-medium">{activeCase.client}</strong>
                </p>
              </div>

              {/* Status Pill Badge & ETA */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AFF94F] text-slate-950 font-heading font-black text-xs shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                  <span>{activeCase.status}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 mt-0.5">
                  ETA: <strong className="text-slate-900">{activeCase.eta}</strong>
                </span>
              </div>

            </div>

            {/* Split 2-Column Body: Left Legal Stepper + Right Minimalist Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
              {/* LEFT COLUMN: Legal Stepper & Logistics Details (Cols 5) */}
              <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-white space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-heading font-black text-slate-400 uppercase tracking-wider">
                      Etapas Jurídicas Oficiales
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      Paso {activeCase.currentStep} de 5
                    </span>
                  </div>

                  {/* Vertical Minimalist Stepper */}
                  <div className="space-y-2.5">
                    {activeCase.steps.map((step) => {
                      const isDone = step.done;
                      const isActive = step.active;

                      return (
                        <div 
                          key={step.id} 
                          className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all ${
                            isActive
                              ? 'bg-[#AFF94F]/15 border-[#84cc16]/50 shadow-xs'
                              : isDone
                                ? 'bg-slate-50/80 border-slate-100 text-slate-700'
                                : 'bg-white border-slate-100 text-slate-400 opacity-60'
                          }`}
                        >
                          {/* Step Node */}
                          <div className="shrink-0 mt-0.5">
                            {isDone ? (
                              <div className="w-5 h-5 rounded-full bg-[#AFF94F] text-slate-950 flex items-center justify-center font-bold text-[10px] shadow-2xs">
                                <Check size={11} strokeWidth={3} />
                              </div>
                            ) : isActive ? (
                              <div className="w-5 h-5 rounded-full bg-slate-950 text-[#AFF94F] flex items-center justify-center relative">
                                <span className="w-2 h-2 rounded-full bg-[#AFF94F] animate-ping absolute" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F]" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-mono font-bold text-[9px]">
                                0{step.id}
                              </div>
                            )}
                          </div>

                          {/* Step Text */}
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-heading font-black text-slate-900 leading-tight">
                              {step.label}
                            </div>
                            <div className="text-[10px] text-slate-500 leading-snug mt-0.5">
                              {step.sub}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3 Essential Data Points */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Truck size={13} className="text-slate-700" />
                      <span>Custodia</span>
                    </span>
                    <span className="font-heading font-black text-slate-900 text-right truncate max-w-[190px]">
                      {activeCase.courier}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#65a30d]" />
                      <span>Destino</span>
                    </span>
                    <span className="font-heading font-black text-slate-900 text-right truncate max-w-[190px]">
                      {activeCase.destination}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-[#AFF94F]/15 p-2.5 rounded-xl border border-[#AFF94F]/40">
                    <span className="text-slate-950 font-bold flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-slate-950" />
                      <span>Precinto</span>
                    </span>
                    <span className="font-mono font-black text-slate-950">
                      #{activeCase.seal}
                    </span>
                  </div>

                  {/* WhatsApp Quick Action Button */}
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-[#AFF94F] text-white hover:text-slate-950 text-xs font-heading font-black transition-all cursor-pointer shadow-xs hover:scale-[1.01]"
                  >
                    <MessageSquare size={13} />
                    <span>Recibir Reporte Notarial en WhatsApp</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Minimalist Route Map of Mexico (Cols 7) */}
              <div className="lg:col-span-7 p-3 sm:p-4 bg-slate-50/40 flex flex-col justify-between">
                <div className="w-full h-full min-h-[420px] lg:min-h-[500px]">
                  <MinimalistRouteMap folio={activeCase.folio} />
                </div>
              </div>

            </div>

            {/* Bottom Security Strip */}
            <div className="p-4 bg-slate-50/90 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 text-center sm:text-left text-[11px]">
                🛡️ Trámite respaldado con <strong>factura CFDI 4.0 deducible</strong> y garantía de cero tenencia oficial.
              </span>
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#65a30d]" />
                  <span>GPS Satelital Activo</span>
                </span>
                <span>•</span>
                <span>Precinto Inviolable</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
