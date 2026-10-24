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
    seal: 'PC-8891-OFICIAL',
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
      { id: 1, label: 'Auditoría Legal', sub: 'Secuencia de facturas cotejada', done: true },
      { id: 2, label: 'Baja de Infracciones', sub: 'Historial de adeudos depurado', done: true },
      { id: 3, label: 'Emisión Tarjeta Chip', sub: 'Plastificado oficial a nuevo titular', active: true },
      { id: 4, label: 'Valija de Seguridad', sub: 'Embalaje protegido', pending: true },
      { id: 5, label: 'Entrega en Mano', sub: 'Recepción en sede o domicilio', pending: true }
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
    origin: 'Sede Central Calzada de Tlalpan #1820',
    destination: 'Parque Industrial Naucalpan, EdoMéx',
    courier: 'Unidad Blindada Ciclonatura B2B #02',
    seal: 'PC-0042-CORPORATE',
    currentStep: 5,
    steps: [
      { id: 1, label: 'Cotejo VIN Masivo', sub: '12 unidades validadas ante SAT', done: true },
      { id: 2, label: 'Ingreso Corporativo', sub: 'Emisión en bloque sin filas', done: true },
      { id: 3, label: 'Troquelado Metálico', sub: '12 pares de láminas selladas', done: true },
      { id: 4, label: 'Cierre de Valija', sub: 'Precinto oficial numerado', done: true },
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
      `Hola Ciclonatura, deseo recibir copia digital del acuse oficial y reporte de mi trámite #${activeCase.folio}.`
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ======================================================== */}
        {/* HEADER: CLEAN, QUIET, ESSENTIAL                          */}
        {/* ======================================================== */}
        <div className="text-center max-w-lg mx-auto mb-8 sm:mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Rastreo en Tiempo Real
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
            Monitoreo satelital y estatus de entrega de tu trámite vehicular.
          </p>

          {/* Minimal Folio Selector Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-5">
            {Object.keys(TRACKING_DATA).map((key) => {
              const isSelected = selectedFolio === key;
              const item = TRACKING_DATA[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedFolio(key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-slate-950 text-white font-bold shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#AFF94F]' : 'bg-slate-300'}`} />
                  <span>#{key}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({item.badge.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN HERO CARD: MINIMALIST BENTO                         */}
        {/* ======================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.folio}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 overflow-hidden"
          >
            {/* Top Bar: Vehicle, Folio & Status */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-black text-slate-950 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                  #{activeCase.folio}
                </span>
                <h3 className="font-heading font-black text-base sm:text-lg text-slate-900">
                  {activeCase.vehicle}
                </h3>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AFF94F] text-slate-950 font-heading font-black text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                  <span>{activeCase.status}</span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {activeCase.eta}
                </span>
              </div>
            </div>

            {/* Split Body: Clean Vertical Timeline + Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
              {/* LEFT COLUMN: Clean Airy Timeline (Cols 5) */}
              <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-6">
                
                {/* 5-Step Vertical Timeline */}
                <div>
                  <span className="block text-[10px] font-heading font-black text-slate-400 uppercase tracking-wider mb-4">
                    Etapas Oficiales
                  </span>

                  <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    {activeCase.steps.map((step) => {
                      const isDone = step.done;
                      const isActive = step.active;

                      return (
                        <div key={step.id} className="relative flex items-center justify-between text-xs">
                          {/* Dot / Check indicator */}
                          <div className={`absolute -left-5 w-4 h-4 rounded-full flex items-center justify-center ${
                            isDone 
                              ? 'bg-[#AFF94F] text-slate-950' 
                              : isActive 
                                ? 'bg-slate-950 text-[#AFF94F] ring-4 ring-[#AFF94F]/30' 
                                : 'bg-slate-200 text-white'
                          }`}>
                            {isDone ? (
                              <Check size={9} strokeWidth={3} />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            )}
                          </div>

                          {/* Label */}
                          <div className="min-w-0 pr-2">
                            <span className={`font-heading ${isActive ? 'font-black text-slate-950' : isDone ? 'font-bold text-slate-700' : 'text-slate-400 font-medium'}`}>
                              {step.label}
                            </span>
                          </div>

                          {/* Small tag for active */}
                          {isActive && (
                            <span className="shrink-0 px-1.5 py-0.2 rounded bg-[#AFF94F] text-slate-950 text-[9px] font-mono font-black">
                              ACTIVO
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Logistics Metadata & CTA */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Custodia</span>
                      <strong className="text-slate-900 font-medium truncate max-w-[200px]">{activeCase.courier}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Destino</span>
                      <strong className="text-slate-900 font-medium truncate max-w-[200px]">{activeCase.destination}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-[#AFF94F] text-white hover:text-slate-950 text-xs font-heading font-black transition-all cursor-pointer shadow-xs"
                  >
                    <MessageSquare size={13} />
                    <span>Consultar Estatus en WhatsApp</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: Pure Minimalist Map (Cols 7) */}
              <div className="lg:col-span-7 p-2 sm:p-3 bg-slate-50/30 flex flex-col justify-between">
                <div className="w-full h-full min-h-[380px] lg:min-h-[440px]">
                  <MinimalistRouteMap folio={activeCase.folio} />
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
