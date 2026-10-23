import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  MapPin, 
  Car, 
  Truck, 
  Bike,
  Sparkles,
  Receipt,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Zap,
  Building,
  AlertCircle,
  RotateCcw
} from 'lucide-react';

// Dynamic safe confetti invoker
const triggerConfetti = async () => {
  try {
    const confettiModule = await import('canvas-confetti');
    const confetti = confettiModule.default || confettiModule;
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  } catch (err) {
    // Bypassed gracefully
  }
};

const VEHICLE_TYPES = [
  { id: 'auto', label: 'Auto Particular / Sedán', icon: Car, surcharge: 0, desc: 'Uso personal o familiar' },
  { id: 'suv', label: 'SUV / Camioneta', icon: Car, surcharge: 250, desc: 'Familiar o todo terreno' },
  { id: 'moto', label: 'Motocicleta', icon: Bike, surcharge: -400, desc: 'Cilindrada particular' },
  { id: 'comercial', label: 'Carga Comercial / Van', icon: Truck, surcharge: 500, desc: 'Placas mercantiles / utilitario' }
];

const DELIVERY_MODES = [
  { id: 'valija', label: 'Valija Foliada a Domicilio', fee: 180, desc: 'Mensajería propia en CDMX y Edomex con sello inviolable' },
  { id: 'sede', label: 'Recolección en Sede Notarial', fee: 0, desc: 'Entrega directa en nuestras oficinas de Calzada de Tlalpan' }
];

const SPEED_OPTIONS = [
  { id: 'standard', label: 'Entrega Estándar Oficial', fee: 0, time: '48 a 72 hrs', badge: 'Recomendado' },
  { id: 'express', label: 'Prioritario VIP Express', fee: 450, time: '24 a 36 hrs', badge: 'Máxima Urgencia' }
];

// Service baseline financial presets
const SERVICE_BASE_PRICES = {
  'emplacamiento-morelos': { gov: 2850, gestoria: 1950, savings: 'Ahorro de hasta $45,000 en tenencias anuales' },
  'cambio-de-propietario': { gov: 411, gestoria: 1450, savings: 'Evitas multas por omisión de hasta $3,500' },
  'alta-baja-placas': { gov: 542, gestoria: 1250, savings: 'Evitas corralón y grúas de hasta $6,500' },
  'regularizacion-tenencias': { gov: 0, gestoria: 950, savings: 'Ahorro de hasta 60% en prescripción de multas' },
  'flotillas-corporativas': { gov: 850, gestoria: 850, savings: 'Descuento de hasta 35% en volumen corporativo' }
};

export default function ServiceCostCalculator({ service }) {
  if (!service) return null;

  // Multi-step state: 1 (Config), 2 (Delivery & Extras), 3 (Client Data), 4 (Summary & Booking)
  const [step, setStep] = useState(1);
  const [folio] = useState(() => `CICLO-${Math.floor(100000 + Math.random() * 900000)}`);

  // Step 1: Configuration
  const [selectedVehicle, setSelectedVehicle] = useState('auto');
  const [selectedState, setSelectedState] = useState('morelos');
  const [vehicleOrigin, setVehicleOrigin] = useState('usado'); // 'nuevo' or 'usado'

  // Step 2: Modality & Extras
  const [selectedSpeed, setSelectedSpeed] = useState('standard');
  const [selectedDelivery, setSelectedDelivery] = useState('valija');
  const [needsBaja, setNeedsBaja] = useState(false);
  const [needsInvoice, setNeedsInvoice] = useState(false);

  // Step 3: Contact Data
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Calculation Engine
  const basePricing = SERVICE_BASE_PRICES[service.slug] || { gov: 1500, gestoria: 1500, savings: 'Garantía notarial 100%' };
  const vehicleObj = VEHICLE_TYPES.find(v => v.id === selectedVehicle) || VEHICLE_TYPES[0];
  const speedObj = SPEED_OPTIONS.find(s => s.id === selectedSpeed) || SPEED_OPTIONS[0];
  const deliveryObj = DELIVERY_MODES.find(d => d.id === selectedDelivery) || DELIVERY_MODES[0];

  const govRights = Math.max(0, basePricing.gov + (vehicleOrigin === 'nuevo' && service.slug === 'emplacamiento-morelos' ? 0 : 0));
  const gestoriaFee = basePricing.gestoria + vehicleObj.surcharge + speedObj.fee;
  const extrasFee = deliveryObj.fee + (needsBaja ? 550 : 0);
  const subtotal = govRights + gestoriaFee + extrasFee;
  const iva = needsInvoice ? Math.round(gestoriaFee * 0.16) : 0;
  const grandTotal = subtotal + iva;

  // Validation for Step 3
  const validateStep3 = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Ingresa tu nombre completo';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Ingresa un número de WhatsApp a 10 dígitos';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 3) {
      if (!validateStep3()) return;
      triggerConfetti();
    }
    setStep(prev => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setStep(1);
    setFormData({ fullName: '', phone: '', email: '', zipCode: '', notes: '' });
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `🏛️ *COTIZACIÓN OFICIAL CICLONATURA*\n` +
      `*Folio:* #${folio}\n` +
      `*Servicio:* ${service.name}\n` +
      `*Vehículo:* ${vehicleObj.label} (${vehicleOrigin === 'nuevo' ? 'Agencia Nuevo' : 'Placas anteriores'})\n` +
      `*Entidad:* ${selectedState.toUpperCase()}\n` +
      `*Modalidad:* ${speedObj.label} (${speedObj.time})\n` +
      `*Entrega:* ${deliveryObj.label}\n` +
      (needsBaja ? `*Extra:* Incluye trámite de Baja Foránea previa\n` : '') +
      (needsInvoice ? `*Factura:* Requiere CFDI 4.0\n` : '') +
      `---------------------------\n` +
      `*Inversión Total Estimada:* $${grandTotal.toLocaleString('es-MX')} MXN\n` +
      `---------------------------\n` +
      `*Solicitante:* ${formData.fullName || 'Cliente en línea'}\n` +
      `*WhatsApp:* ${formData.phone || 'No especificado'}\n` +
      (formData.zipCode ? `*C.P. / Zona:* ${formData.zipCode}\n` : '') +
      `\nHola Ciclonatura, he completado mi cotización inteligente en el portal. Deseo confirmar la disponibilidad y agendar la recepción de mis documentos.`
    );
    window.open(`https://wa.me/525547021799?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-200/80 relative overflow-hidden select-none">
      
      {/* Background Matrix Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-800 text-xs font-semibold font-heading mb-3 shadow-2xs backdrop-blur-sm">
            <Calculator size={13} className="text-slate-900" />
            <span>Cotizador Inteligente Interactivo</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Calcula tu Inversión en{' '}
            <span className="text-slate-950 underline decoration-[#AFF94F] decoration-4 underline-offset-4">{service.shortName}</span>
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Sin costos ocultos ni sorpresas. Configura tu trámite paso a paso con desglose oficial en vivo y folio notarial reservado.
          </p>

          {/* ======================================================== */}
          {/* STEP PROGRESS BAR & STEPPER HEADER                      */}
          {/* ======================================================== */}
          <div className="mt-8 max-w-xl mx-auto">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-3 px-2">
              {[
                { s: 1, label: 'Vehículo' },
                { s: 2, label: 'Modalidad' },
                { s: 3, label: 'Tus Datos' },
                { s: 4, label: 'Resumen' }
              ].map(item => {
                const isCurrent = step === item.s;
                const isPassed = step > item.s;
                return (
                  <div key={item.s} className="flex items-center gap-2">
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                        isCurrent 
                          ? 'bg-slate-950 text-white ring-4 ring-[#AFF94F]/40 scale-105 shadow-sm' 
                          : isPassed 
                            ? 'bg-[#AFF94F] text-slate-950 font-black shadow-2xs' 
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 size={14} className="text-slate-950" /> : `0${item.s}`}
                    </div>
                    <span className={`hidden sm:inline text-xs font-heading font-bold ${isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Continuous Progress Track */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] rounded-full"
                initial={false}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN DUAL COLUMN CALCULATOR CARD                         */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-4xl mx-auto">
          
          {/* LEFT COLUMN: Dynamic Multi-Step Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 min-h-[460px]">
            <div>
              {/* Folio Identifier & Step Subhead */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] animate-pulse" />
                  <span className="font-heading font-black text-slate-800">
                    Paso {step} de 4
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-mono">Folio Oficial:</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                    #{folio}
                  </span>
                </div>
              </div>

              {/* Step Content Switcher with Framer Motion */}
              <AnimatePresence mode="wait">
                
                {/* -------------------------------------------------- */}
                {/* STEP 1: VEHICLE & REGISTRATION CONFIG               */}
                {/* -------------------------------------------------- */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-2">
                        1. Tipo de Vehículo
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {VEHICLE_TYPES.map(vt => {
                          const isSelected = selectedVehicle === vt.id;
                          const IconComp = vt.icon;
                          return (
                            <button
                              key={vt.id}
                              type="button"
                              onClick={() => setSelectedVehicle(vt.id)}
                              className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-[#AFF94F]/40'
                                  : 'bg-slate-50/70 text-slate-700 border-slate-200/90 hover:bg-slate-100/70 hover:border-slate-300'
                              }`}
                            >
                              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isSelected ? 'bg-white/10 text-[#AFF94F]' : 'bg-white border border-slate-200 text-slate-600'}`}>
                                <IconComp size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold font-heading truncate">
                                  {vt.label}
                                </div>
                                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {vt.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Entidad de Tramitación */}
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-2">
                        2. Entidad o Jurisdicción Deseada
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'morelos', label: 'Morelos', badge: 'Exento Tenencia' },
                          { id: 'cdmx', label: 'CDMX', badge: 'Alta Capital' },
                          { id: 'edomex', label: 'EdoMex', badge: 'Padrón Estatal' }
                        ].map(st => {
                          const isSelected = selectedState === st.id;
                          return (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setSelectedState(st.id)}
                              className={`py-2.5 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#AFF94F] text-slate-950 font-black border-[#AFF94F] shadow-sm'
                                  : 'bg-slate-50/80 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                              }`}
                            >
                              <div className="text-xs font-heading font-bold">{st.label}</div>
                              <div className={`text-[9px] font-mono mt-0.5 ${isSelected ? 'text-slate-950 font-extrabold' : 'text-slate-400'}`}>
                                {st.badge}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Origen del Vehículo */}
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-2">
                        3. Estado del Vehículo
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'nuevo', label: 'Vehículo Nuevo de Agencia', desc: 'Factura o carta factura' },
                          { id: 'usado', label: 'Con Placas Anteriores / Usado', desc: 'Canje o cambio de entidad' }
                        ].map(orig => (
                          <button
                            key={orig.id}
                            type="button"
                            onClick={() => setVehicleOrigin(orig.id)}
                            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                              vehicleOrigin === orig.id
                                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                : 'bg-slate-50/80 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                            }`}
                          >
                            <div className="text-xs font-bold font-heading">{orig.label}</div>
                            <div className={`text-[10px] mt-0.5 ${vehicleOrigin === orig.id ? 'text-slate-400' : 'text-slate-500'}`}>
                              {orig.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 2: SPEED, DELIVERY & NOTARY EXTRAS             */}
                {/* -------------------------------------------------- */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-5"
                  >
                    {/* Urgencia y Tiempo de Entrega */}
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-2">
                        1. Tiempo de Entrega Deseado
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {SPEED_OPTIONS.map(spd => {
                          const isSelected = selectedSpeed === spd.id;
                          return (
                            <button
                              key={spd.id}
                              type="button"
                              onClick={() => setSelectedSpeed(spd.id)}
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-[#AFF94F]/40'
                                  : 'bg-slate-50/70 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold font-heading">{spd.label}</span>
                                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-[#AFF94F]/20 text-[#AFF94F]' : 'bg-slate-200 text-slate-600'}`}>
                                  {spd.badge}
                                </span>
                              </div>
                              <div className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-[#AFF94F]' : 'text-slate-950 font-bold'}`}>
                                {spd.time}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Método de Entrega */}
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-2">
                        2. Método de Recepción de Placas & Documentos
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {DELIVERY_MODES.map(dm => {
                          const isSelected = selectedDelivery === dm.id;
                          return (
                            <button
                              key={dm.id}
                              type="button"
                              onClick={() => setSelectedDelivery(dm.id)}
                              className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                  : 'bg-slate-50/70 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                              }`}
                            >
                              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isSelected ? 'bg-white/10 text-[#AFF94F]' : 'bg-white border border-slate-200 text-slate-600'}`}>
                                <MapPin size={16} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold font-heading">{dm.label}</span>
                                  <span className="text-[11px] font-mono font-bold text-[#AFF94F]">
                                    {dm.fee === 0 ? 'Sin Costo' : `+$${dm.fee} MXN`}
                                  </span>
                                </div>
                                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {dm.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Extras Opcionales */}
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-2">
                        3. Complementos Notariales
                      </label>
                      <div className="space-y-2">
                        <label 
                          onClick={() => setNeedsBaja(!needsBaja)}
                          className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                            needsBaja ? 'bg-[#AFF94F]/15 border-[#AFF94F]/60' : 'bg-slate-50/70 border-slate-200/90 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                            <input 
                              type="checkbox" 
                              checked={needsBaja} 
                              onChange={() => {}} 
                              className="accent-[#AFF94F] rounded cursor-pointer"
                            />
                            <span>Gestión de Baja Vehicular Foránea previa</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-950">+$550 MXN</span>
                        </label>

                        <label 
                          onClick={() => setNeedsInvoice(!needsInvoice)}
                          className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                            needsInvoice ? 'bg-[#AFF94F]/15 border-[#AFF94F]/60' : 'bg-slate-50/70 border-slate-200/90 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                            <input 
                              type="checkbox" 
                              checked={needsInvoice} 
                              onChange={() => {}} 
                              className="accent-[#AFF94F] rounded cursor-pointer"
                            />
                            <span>Requiero Factura Fiscal SAT CFDI 4.0</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">+16% IVA sobre gestoría</span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 3: CONTACT INFORMATION & DELIVERY LOGISTICS    */}
                {/* -------------------------------------------------- */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                        Nombre Completo del Titular *
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Ej. Roberto Sánchez Méndez"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                            formErrors.fullName ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus:border-emerald-500'
                          }`}
                        />
                      </div>
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                        WhatsApp / Teléfono de Contacto (10 dígitos) *
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="55 1234 5678"
                          maxLength={14}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                            formErrors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus:border-emerald-500'
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                          Código Postal / Zona (Opcional)
                        </label>
                        <div className="relative">
                          <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Ej. 03100, Del Valle"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                          Correo para Acuse (Opcional)
                        </label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            placeholder="tu@correo.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#AFF94F]/15 border border-[#AFF94F]/50 flex items-start gap-2.5 text-xs text-slate-950 font-medium">
                      <ShieldCheck size={16} className="text-slate-950 shrink-0 mt-0.5" />
                      <span>Tus datos están protegidos bajo estricto secreto notarial. Sólo los usamos para foliar tu cotización y verificar citas.</span>
                    </div>
                  </motion.div>
                )}

                {/* -------------------------------------------------- */}
                {/* STEP 4: SUMMARY & INSTANT WHATSAPP BOOKING          */}
                {/* -------------------------------------------------- */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-[#AFF94F]/20 border border-[#AFF94F]/70 text-slate-950 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={18} className="text-slate-950" />
                        <div>
                          <div className="text-xs font-heading font-black">¡Cotización Oficial Lista!</div>
                          <div className="text-[11px] text-slate-700">Folio reservado durante 24 horas</div>
                        </div>
                      </div>
                      <span className="font-mono font-black text-xs bg-white px-2.5 py-1 rounded-md border border-[#AFF94F]">
                        #{folio}
                      </span>
                    </div>

                    {/* Client & Service Recap Card */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Titular Solicitante:</span>
                        <span className="font-bold text-slate-900">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Teléfono WhatsApp:</span>
                        <span className="font-mono font-semibold text-slate-900">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Vehículo:</span>
                        <span className="font-semibold text-slate-900">{vehicleObj.label}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Jurisdicción:</span>
                        <span className="font-bold text-slate-950 uppercase">{selectedState}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Entrega y Plazo:</span>
                        <span className="font-semibold text-slate-900">{speedObj.time} • {deliveryObj.label}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 text-center">
                      Haz clic en el botón verde de la derecha para enviar tu acuse a nuestra mesa de control en WhatsApp.
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Wizard Navigation Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>Anterior</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 font-mono">Paso inicial</span>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-black text-white bg-slate-950 hover:bg-slate-800 shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer ml-auto"
                >
                  <span>{step === 3 ? 'Ver Resumen Final' : 'Siguiente Paso'}</span>
                  <ArrowRight size={13} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer ml-auto"
                >
                  <RotateCcw size={12} />
                  <span>Nueva Cotización</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Live Itemized Cost Breakdown & WhatsApp CTA */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#AFF94F]/20 border border-[#AFF94F]/40 text-[#AFF94F] text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
                <Sparkles size={11} />
                <span>Desglose en Tiempo Real</span>
              </div>

              <h4 className="font-heading text-lg font-bold text-slate-100 mb-1">
                {service.name}
              </h4>
              <p className="text-[11px] text-slate-400 mb-5">
                {service.tagline}
              </p>

              {/* Dynamic Itemized Breakdown */}
              <div className="space-y-2.5 text-xs border-b border-white/10 pb-5">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Derechos Gubernamentales:</span>
                  <span className="font-mono font-semibold text-white">
                    {govRights === 0 ? 'Liquidación al costo' : `$${govRights.toLocaleString('es-MX')} MXN`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Honorarios de Gestoría:</span>
                  <span className="font-mono font-semibold text-white">
                    ${gestoriaFee.toLocaleString('es-MX')} MXN
                  </span>
                </div>

                {extrasFee > 0 && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Envío & Complementos:</span>
                    <span className="font-mono font-semibold text-white">
                      +${extrasFee.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                )}

                {needsInvoice && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span>IVA (16% sobre honorarios):</span>
                    <span className="font-mono font-semibold text-white">
                      +${iva.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-300 pt-1">
                  <span>Plazo de Entrega Garantizado:</span>
                  <span className="font-mono font-bold text-[#AFF94F] flex items-center gap-1">
                    <Clock size={12} />
                    {speedObj.time}
                  </span>
                </div>
              </div>

              {/* Grand Total Indicator */}
              <div className="py-4">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between">
                  <span>Inversión Total Estimada:</span>
                  <span className="text-[10px] text-slate-950 font-black bg-[#AFF94F] px-2 py-0.5 rounded shadow-2xs">
                    Garantía SAT
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-heading text-white mt-1.5 tracking-tight">
                  ${grandTotal.toLocaleString('es-MX')}{' '}
                  <span className="text-sm font-normal text-slate-400">MXN</span>
                </div>
                <div className="text-[11px] text-[#AFF94F] font-bold mt-1">
                  {basePricing.savings}
                </div>
              </div>
            </div>

            {/* Fast-Track WhatsApp CTA */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[#AFF94F] hover:bg-[#9ee83e] text-slate-950 font-heading font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-[#AFF94F]/25 transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>{step === 4 ? 'Confirmar y Enviar por WhatsApp' : 'Cotizar Directo por WhatsApp'}</span>
                <ArrowRight size={14} />
              </button>

              <div className="text-center mt-3 text-[10px] text-slate-400">
                Respuesta inmediata en menos de 15 minutos • Lunes a Sábado
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
