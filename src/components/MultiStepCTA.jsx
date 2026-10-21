import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Clock, 
  Car, 
  Building2, 
  FileText, 
  Sparkles, 
  MessageCircle, 
  Repeat, 
  Lock, 
  ChevronRight, 
  Shield, 
  Zap, 
  MapPin,
  User,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';

// Dynamic safe confetti invoker
const triggerConfetti = async (options) => {
  try {
    const confettiModule = await import('canvas-confetti');
    const confetti = confettiModule.default || confettiModule;
    if (typeof confetti === 'function') {
      confetti(options);
    }
  } catch (err) {
    console.warn("Confetti bypassed:", err);
  }
};

// 100% Native Framer Motion Animated Icons
function AnimatedShieldIcon({ className = "w-5 h-5" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xs"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-emerald-600 relative z-10"
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <motion.path
          d="M9 12l2 2 4-4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.svg>
    </div>
  );
}

function AnimatedLockIcon({ className = "w-5 h-5" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-sky-500/20 blur-xs"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-sky-600 relative z-10"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <motion.path
          d="M7 11V7a5 5 0 0 1 10 0v4"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </motion.svg>
    </div>
  );
}

function AnimatedContactIcon({ className = "w-5 h-5" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xs"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-emerald-600 relative z-10"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </motion.svg>
    </div>
  );
}

function AnimatedCheckCircleIcon({ className = "w-12 h-12" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/20 blur-sm"
        animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-full h-full relative z-10"
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <circle cx="24" cy="24" r="20" className="stroke-emerald-500/25" strokeWidth="3" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          className="stroke-emerald-500"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.path
          d="M15 24.5L21.5 31L33 18"
          fill="none"
          className="stroke-emerald-600"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        />
      </motion.svg>
    </div>
  );
}

const SERVICES = [
  {
    id: 'morelos',
    title: 'Emplacamiento Morelos',
    badge: 'Ahorro Máximo',
    desc: 'Exenta legalmente la tenencia anual de lujo (ahorro hasta $45,000 MXN).',
    color: 'emerald',
    icon: ShieldCheck,
    tag: 'Art. 11 Constitucional'
  },
  {
    id: 'cambio-propietario',
    title: 'Cambio de Propietario',
    badge: 'Cero Riesgo',
    desc: 'Cotejo de endosos, REPUVE en vivo y emisión de tarjeta con chip a tu nombre.',
    color: 'sky',
    icon: FileText,
    tag: 'Sin multas previas'
  },
  {
    id: 'alta-baja',
    title: 'Altas, Bajas & Reposición',
    badge: '24 a 48 hrs',
    desc: 'Trámite express sin citas para autos nuevos de agencia o reposición por robo.',
    color: 'lime',
    icon: Zap,
    tag: 'SEMOVI & Edomex'
  },
  {
    id: 'tenencias',
    title: 'Auditoría de Tenencias',
    badge: 'Tesorería',
    desc: 'Cancelación de adeudos y multas fantasmas con línea de captura oficial.',
    color: 'teal',
    icon: Clock,
    tag: 'Desglose exacto'
  },
  {
    id: 'flotillas',
    title: 'Flotillas Corporativas',
    badge: 'SAT CFDI 4.0',
    desc: 'Gestoría integral para empresas y arrendadoras 100% deducible de impuestos.',
    color: 'indigo',
    icon: Building2,
    tag: 'Gestor VIP'
  }
];

const ENTITIES = [
  { id: 'cdmx', label: 'Ciudad de México', hint: 'CDMX' },
  { id: 'edomex', label: 'Estado de México', hint: 'Edomex' },
  { id: 'morelos', label: 'Morelos', hint: 'Cuernavaca' },
  { id: 'foraneo', label: 'Otro Estado', hint: 'Interior de la República' }
];

const VEHICLE_TYPES = [
  { id: 'sedan', label: 'Auto Particular / Sedán', icon: Car },
  { id: 'suv', label: 'Camioneta / SUV', icon: Car },
  { id: 'moto', label: 'Motocicleta', icon: Zap },
  { id: 'carga', label: 'Empresarial / Carga', icon: Building2 }
];

export default function MultiStepCTA() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedEntity, setSelectedEntity] = useState(ENTITIES[0]);
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_TYPES[0]);
  const [urgency, setUrgency] = useState('express'); // 'express' | 'standard'

  // User details state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  // Generate a realistic folio based on step entry
  const [folioNumber] = useState(() => `CN-${Math.floor(10000 + Math.random() * 90000)}`);

  const validateStep3 = () => {
    const errs = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Por favor ingresa tu nombre completo para el expediente.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Ingresa un número de WhatsApp a 10 dígitos (ej. 55 4702 1799).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      if (!validateStep3()) return;
    }

    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === 4) {
        // Trigger celebratory confetti burst on reaching final step
        triggerConfetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.65 },
          colors: ['#10b981', '#06b6d4', '#84cc16', '#3b82f6']
        });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = () => {
    triggerConfetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    const message = encodeURIComponent(
      `¡Hola Ciclonatura! Acabo de registrar mi trámite notarial con Folio ${folioNumber}:\n\n` +
      `👤 Titular: ${fullName}\n` +
      `📱 Teléfono / WhatsApp: ${phone}\n` +
      (email.trim() ? `✉️ Correo: ${email.trim()}\n` : '') +
      `📋 Trámite: ${selectedService.title}\n` +
      `📍 Entidad: ${selectedEntity.label}\n` +
      `🚗 Vehículo: ${selectedVehicle.label}\n` +
      `⚡ Modalidad: ${urgency === 'express' ? 'Entrega Express (24-48 hrs)' : 'Estándar (72 hrs)'}\n` +
      (notes.trim() ? `📝 Comentarios: ${notes.trim()}\n` : '') +
      `\n¿Podrían indicarme los documentos necesarios para dar inicio hoy mismo?`
    );

    window.open(`https://wa.me/525547021799?text=${message}`, '_blank');
  };

  return (
    <section id="cotizador" className="py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden select-none border-b border-slate-200/80">
      
      {/* Subtle tech background dot pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      {/* Luminous accent gradient blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-100/40 via-sky-100/30 to-lime-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-900 text-xs font-bold uppercase tracking-wider font-heading mb-3 shadow-2xs">
            <Sparkles size={13} className="text-emerald-600 animate-pulse" />
            <span>Despacho Notarial & Cotizador en Vivo</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Empieza tu trámite{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              en 60 segundos.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Configura tu gestión vehicular con asesoría notarial directa. Sin intermediarios, sin filas y con entrega de valija foliada en tu domicilio.
          </p>
        </div>

        {/* Multi-Step Interactive Card */}
        <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/5 p-6 sm:p-10 relative overflow-hidden">
          
          {/* 4-Step Stepper Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative mb-3">
              {[
                { num: 1, label: 'Servicio' },
                { num: 2, label: 'Vehículo' },
                { num: 3, label: 'Tus Datos' },
                { num: 4, label: 'Activación' }
              ].map((step) => {
                const isActive = currentStep === step.num;
                const isPassed = currentStep > step.num;
                return (
                  <div key={step.num} className="flex flex-col items-center relative z-10">
                    <button
                      onClick={() => isPassed && setCurrentStep(step.num)}
                      disabled={!isPassed && !isActive}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-heading font-black text-xs sm:text-sm transition-all duration-300 ${
                        isActive
                          ? 'bg-slate-950 text-white shadow-md shadow-slate-950/20 ring-4 ring-emerald-500/20'
                          : isPassed
                          ? 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isPassed ? <Check size={16} strokeWidth={3} /> : step.num}
                    </button>
                    <span className={`text-[11px] font-heading font-bold mt-1.5 transition-colors ${
                      isActive ? 'text-slate-900' : isPassed ? 'text-emerald-700' : 'text-slate-600'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}

              {/* Connecting background track */}
              <div className="absolute top-4 sm:top-5 left-6 right-6 h-1 bg-slate-100 -z-0 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-full"
                  initial={false}
                  animate={{
                    width: `${((currentStep - 1) / 3) * 100}%`
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>

          {/* Steps Viewports with Framer Motion Slide Animations */}
          <div className="min-h-[350px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Select Service */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-heading text-lg font-black text-slate-900">
                        Paso 1: Selecciona el trámite que necesitas
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Elige una de nuestras 5 soluciones notariales oficiales
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                      <AnimatedShieldIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {SERVICES.map((srv) => {
                      const isSelected = selectedService.id === srv.id;
                      const IconComponent = srv.icon;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedService(srv)}
                          className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left group ${
                            isSelected
                              ? 'bg-slate-950 text-white border-slate-950 shadow-lg shadow-slate-950/15'
                              : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-900'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-white/15 text-emerald-300' : 'bg-slate-100 text-slate-700'
                              }`}>
                                <IconComponent size={15} />
                              </div>
                              <span className="font-heading font-extrabold text-sm tracking-tight leading-snug">
                                {srv.title}
                              </span>
                            </div>

                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 font-mono ${
                              isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {srv.badge}
                            </span>
                          </div>

                          <p className={`text-xs leading-relaxed line-clamp-2 ${
                            isSelected ? 'text-slate-300' : 'text-slate-500'
                          }`}>
                            {srv.desc}
                          </p>

                          <div className="mt-3 pt-2 border-t flex items-center justify-between text-[11px] font-mono">
                            <span className={isSelected ? 'text-emerald-400' : 'text-slate-500'}>
                              {srv.tag}
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check size={10} strokeWidth={3} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Entity & Vehicle Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-heading text-lg font-black text-slate-900">
                        Paso 2: Entidad, Vehículo y Modalidad de Entrega
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Trámite seleccionado: <span className="font-bold text-slate-800">{selectedService.title}</span>
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                      <AnimatedLockIcon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Entity Selection */}
                  <div>
                    <label className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-700 block mb-2">
                      1. ¿En qué estado radica tu vehículo?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {ENTITIES.map((ent) => {
                        const isSelected = selectedEntity.id === ent.id;
                        return (
                          <button
                            key={ent.id}
                            type="button"
                            onClick={() => setSelectedEntity(ent)}
                            className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                              isSelected 
                                ? 'bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-950/10' 
                                : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <MapPin size={14} className={isSelected ? 'text-emerald-400' : 'text-slate-400'} />
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check size={8} strokeWidth={3} />}
                              </div>
                            </div>
                            <div className="font-heading font-bold text-xs leading-snug">
                              {ent.label}
                            </div>
                            <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                              {ent.hint}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vehicle Type Selection */}
                  <div>
                    <label className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-700 block mb-2">
                      2. Tipo de Vehículo
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {VEHICLE_TYPES.map((veh) => {
                        const isSelected = selectedVehicle.id === veh.id;
                        const VehIcon = veh.icon;
                        return (
                          <button
                            key={veh.id}
                            type="button"
                            onClick={() => setSelectedVehicle(veh)}
                            className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                              isSelected 
                                ? 'bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-950/10' 
                                : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <VehIcon size={14} className={isSelected ? 'text-sky-400' : 'text-slate-400'} />
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-sky-400 bg-sky-500 text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check size={8} strokeWidth={3} />}
                              </div>
                            </div>
                            <div className="font-heading font-bold text-xs leading-snug">
                              {veh.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Urgency / Dispatch Preference */}
                  <div>
                    <label className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-700 block mb-2">
                      3. Modalidad de Entrega
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setUrgency('express')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                          urgency === 'express'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            <Zap size={16} />
                          </div>
                          <div>
                            <div className="font-heading font-extrabold text-xs">
                              Entrega Express Prioritaria
                            </div>
                            <div className="text-[11px] text-emerald-800 font-medium">
                              Valija foliada en 24 a 48 hrs en tu domicilio
                            </div>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          urgency === 'express' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                        }`}>
                          {urgency === 'express' && <Check size={10} strokeWidth={3} />}
                        </div>
                      </div>

                      <div
                        onClick={() => setUrgency('standard')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                          urgency === 'standard'
                            ? 'bg-sky-50 border-sky-300 text-sky-950 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            <Clock size={16} />
                          </div>
                          <div>
                            <div className="font-heading font-extrabold text-xs">
                              Entrega Estándar
                            </div>
                            <div className="text-[11px] text-sky-800 font-medium">
                              Despacho regular en 72 hrs hábiles
                            </div>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          urgency === 'standard' ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
                        }`}>
                          {urgency === 'standard' && <Check size={10} strokeWidth={3} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: User Contact Information Form */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-heading text-lg font-black text-slate-900">
                        Paso 3: Datos del Titular para el Expediente
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Ingresa tus datos para generar tu folio notarial oficial y enviarte la cotización exacta
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                      <AnimatedContactIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <User size={13} className="text-emerald-600" />
                        <span>Nombre y Apellidos del Titular *</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: null }));
                        }}
                        placeholder="ej. Lic. Roberto Gómez Estrada"
                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
                          errors.fullName
                            ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                            : 'border-slate-200 bg-slate-50/70 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Phone size={13} className="text-emerald-600" />
                        <span>Número de WhatsApp Oficial *</span>
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3.5 flex items-center gap-1 text-xs font-bold text-slate-500 border-r border-slate-200 pr-2">
                          <span>🇲🇽</span>
                          <span>+52</span>
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                          }}
                          placeholder="55 4702 1799"
                          className={`w-full pl-20 pr-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
                            errors.phone
                              ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                              : 'border-slate-200 bg-slate-50/70 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                          }`}
                        />
                      </div>
                      {errors.phone ? (
                        <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          <span>{errors.phone}</span>
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-600 mt-1">
                          Te enviaremos los requisitos y estatus de trámite a este WhatsApp.
                        </p>
                      )}
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Mail size={13} className="text-emerald-600" />
                        <span>Correo Electrónico (Opcional)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="roberto@empresa.com"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium transition-all outline-none"
                      />
                      <p className="text-[10px] text-slate-600 mt-1">
                        Para envío de tu comprobante de trámite o CFDI 4.0.
                      </p>
                    </div>

                    {/* Notes / Comments */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <FileText size={13} className="text-emerald-600" />
                        <span>Comentarios o detalles especiales (Opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="ej. Auto nuevo de agencia, extravío de placa delantera, adeudos anteriores..."
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium transition-all outline-none"
                      />
                    </div>

                  </div>

                  {/* Privacy Seal Notice */}
                  <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 flex items-center gap-3 text-xs text-emerald-900 mt-3">
                    <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                    <span>
                      Tus datos se encuentran 100% protegidos bajo secreto profesional notarial y la Ley Federal de Protección de Datos Personales. Cero spam.
                    </span>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Summary, Verification & One-Click WhatsApp Handshake */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Verified Header with Animated Icon */}
                  <div className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 rounded-2xl p-5 sm:p-6 border border-emerald-200/90 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-200 shadow-md flex items-center justify-center shrink-0">
                        <AnimatedCheckCircleIcon className="w-12 h-12" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-mono">
                            Folio Oficial: {folioNumber}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full font-heading">
                            Pre-aprobado para Despacho
                          </span>
                        </div>
                        <h4 className="font-heading text-lg sm:text-xl font-black text-slate-900">
                          Resumen Notarial de tu Trámite
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Expediente registrado a nombre de <strong className="text-slate-900">{fullName}</strong>. Validez jurídica oficial garantizada.
                        </p>
                      </div>
                    </div>

                    {/* Receipt breakdown grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-emerald-100 text-left">
                      <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-600 font-heading font-bold uppercase block">Titular</span>
                        <span className="text-xs font-heading font-black text-slate-900 block truncate">
                          {fullName}
                        </span>
                      </div>

                      <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-600 font-heading font-bold uppercase block">WhatsApp</span>
                        <span className="text-xs font-heading font-black text-slate-900 block truncate">
                          +52 {phone}
                        </span>
                      </div>

                      <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-600 font-heading font-bold uppercase block">Trámite</span>
                        <span className="text-xs font-heading font-black text-slate-900 block truncate">
                          {selectedService.title}
                        </span>
                      </div>

                      <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-600 font-heading font-bold uppercase block">Tiempo estimado</span>
                        <span className="text-xs font-heading font-black text-emerald-700 block truncate">
                          {urgency === 'express' ? '24 - 48 hrs' : '72 hrs hábiles'}
                        </span>
                      </div>
                    </div>

                    {/* Additional meta row */}
                    <div className="grid grid-cols-2 gap-3 mt-2 text-left">
                      <div className="bg-white/60 p-2.5 rounded-xl border border-slate-200/60 text-xs">
                        <span className="text-[10px] text-slate-600 font-bold uppercase block">Ubicación & Tipo</span>
                        <span className="font-heading font-bold text-slate-800">
                          {selectedEntity.label} · {selectedVehicle.label}
                        </span>
                      </div>
                      <div className="bg-white/60 p-2.5 rounded-xl border border-slate-200/60 text-xs">
                        <span className="text-[10px] text-slate-600 font-bold uppercase block">Entrega</span>
                        <span className="font-heading font-bold text-slate-800">
                          {urgency === 'express' ? 'Valija Express a Domicilio' : 'Entrega Estándar'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700">
                      <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                      <span>Cotejo previo en REPUVE sin costo</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700">
                      <Lock size={16} className="text-sky-600 shrink-0" />
                      <span>Secreto notarial y protección de datos</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700">
                      <Building2 size={16} className="text-indigo-600 shrink-0" />
                      <span>Factura deducible SAT CFDI 4.0</span>
                    </div>
                  </div>

                  {/* Direct WhatsApp Action Callout */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-950 hover:bg-emerald-600 text-white font-heading font-extrabold text-sm sm:text-base shadow-xl shadow-slate-950/20 hover:shadow-2xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer border border-slate-800/80 hover:border-emerald-500"
                    >
                      <MessageCircle size={20} className="text-emerald-400 group-hover:text-white transition-colors" />
                      <span>Activar Trámite vía WhatsApp con Asesor Notarial</span>
                      <ArrowRight size={18} className="text-emerald-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-[11px] text-slate-600 mt-2 font-medium">
                      Atención inmediata a tu número {phone ? `(${phone})` : ''} · Respuesta en menos de 5 minutos
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Stepper Navigation Footer */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 text-xs font-heading font-bold transition-all cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Paso anterior</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Shield size={14} className="text-emerald-600" />
                <span className="font-heading font-medium">Gestoría Oficial Certificada</span>
              </div>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-emerald-600 text-white font-heading font-bold text-xs shadow-md shadow-slate-950/15 hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
              >
                <span>{currentStep === 3 ? 'Ver Resumen & Cotización' : 'Continuar'}</span>
                <ChevronRight size={14} className="text-emerald-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-heading font-bold transition-colors cursor-pointer"
              >
                <Repeat size={13} />
                <span>Modificar configuración</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
