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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ======================================================== */}
        {/* HEADER: CLEAN, MINIMAL, DIRECT                           */}
        {/* ======================================================== */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AFF94F]/20 border border-[#AFF94F]/60 text-slate-950 text-xs font-heading font-black mb-3">
            <span className="w-2 h-2 rounded-full bg-[#65a30d] shadow-[0_0_6px_#AFF94F] animate-pulse" />
            <span>Trazabilidad Notarial en Tiempo Real</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Rastrea tu Trámite Oficial
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
            Ingresa tu folio para conocer la etapa legal de tus documentos y la hora de entrega en mano.
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
        {/* MAIN HERO CARD: MINIMALIST & FLAWLESS                     */}
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
            <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/40">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
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
                  <span className="text-[10px] font-heading font-black uppercase tracking-wide text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
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

              {/* Status Pill Badge */}
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

            {/* Stepper: The 5 Clear Legal Stages */}
            <div className="p-6 sm:p-8 border-b border-slate-100">
              <span className="block text-[11px] font-heading font-black text-slate-400 uppercase tracking-wider mb-6">
                Progreso Oficial del Trámite
              </span>

              {/* Horizontal Stepper (Desktop) / Vertical (Mobile) */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {activeCase.steps.map((step, idx) => {
                  const isDone = step.done;
                  const isActive = step.active;

                  return (
                    <div 
                      key={step.id} 
                      className={`relative flex md:flex-col items-start gap-3 md:gap-2.5 p-3 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-[#AFF94F]/15 border-[#84cc16]/60 shadow-xs'
                          : isDone
                            ? 'bg-slate-50 border-slate-200/80 text-slate-700'
                            : 'bg-white border-slate-100 text-slate-400 opacity-60'
                      }`}
                    >
                      {/* Step Circle Node */}
                      <div className="shrink-0 flex items-center justify-center">
                        {isDone ? (
                          <div className="w-6 h-6 rounded-full bg-[#AFF94F] text-slate-950 flex items-center justify-center font-bold text-xs shadow-2xs">
                            <Check size={13} strokeWidth={3} />
                          </div>
                        ) : isActive ? (
                          <div className="w-6 h-6 rounded-full bg-slate-950 text-[#AFF94F] flex items-center justify-center font-bold text-xs relative">
                            <span className="w-2 h-2 rounded-full bg-[#AFF94F] animate-ping absolute" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-mono font-bold text-[10px]">
                            0{step.id}
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-heading font-black text-slate-900 leading-tight">
                          {step.label}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
                          {step.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3 Essential Data Cards (Minimal Bento) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white">
              
              {/* Custody */}
              <div className="p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                  <Truck size={15} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Custodia Asignada
                  </span>
                  <span className="block text-xs font-heading font-black text-slate-900 mt-0.5">
                    {activeCase.courier}
                  </span>
                </div>
              </div>

              {/* Destination */}
              <div className="p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                  <MapPin size={15} className="text-[#65a30d]" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Destino Registrado
                  </span>
                  <span className="block text-xs font-heading font-black text-slate-900 mt-0.5 truncate max-w-[200px]">
                    {activeCase.destination}
                  </span>
                </div>
              </div>

              {/* Security Seal */}
              <div className="p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#AFF94F]/20 flex items-center justify-center text-slate-950 shrink-0">
                  <ShieldCheck size={16} className="text-slate-950" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Precinto Notarial
                  </span>
                  <span className="block text-xs font-mono font-black text-slate-950 mt-0.5">
                    #{activeCase.seal}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Actions Strip */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 text-center sm:text-left">
                Documentación protegida con <strong>factura CFDI 4.0</strong> emitida directamente a tu RFC.
              </span>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-[#AFF94F] text-white hover:text-slate-950 text-xs font-heading font-black transition-all cursor-pointer shadow-sm hover:scale-102"
              >
                <MessageSquare size={14} />
                <span>Recibir Estatus en WhatsApp</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
