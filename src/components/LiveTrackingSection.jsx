import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  MessageSquare, 
  FileCheck2, 
  AlertCircle,
  Building,
  Navigation,
  Compass,
  Cpu,
  RefreshCw,
  Lock
} from 'lucide-react';

const TRACKING_CASES = {
  'CN-849201': {
    folio: 'CN-849201',
    client: 'Roberto Sánchez M.',
    zone: 'Polanco V Secc., Miguel Hidalgo, CDMX',
    vehicle: 'BMW M340i xDrive 2024',
    plateTarget: 'Morelos Particular',
    service: 'Emplacamiento en Morelos Oficial',
    badge: 'Cero Tenencia • SEDENA',
    status: 'En Ruta de Entrega Directa',
    statusBadge: 'En Tránsito Prioritario',
    statusColor: '#AFF94F',
    eta: 'Hoy a las 16:45 hrs',
    progress: 82,
    courierName: 'Lic. Javier Ramos • Unidad Express #04',
    courierPhone: '+52 55 4702 1799',
    securitySeal: 'PC-8891-NOTARIAL',
    satInvoice: 'UUID: 4A8F-9921-E102-SAT',
    coords: { lat: '19.4326° N', lng: '99.1912° W', place: 'Calz. Mariano Escobedo / Campos Elíseos' },
    activeStepIndex: 3,
    steps: [
      {
        id: 1,
        title: 'Recepción & Auditoría REPUVE',
        desc: 'Factura origen cotejada contra bases de datos federales. Expediente limpio sin reporte de robo ni adeudos.',
        timestamp: 'Hoy • 08:30 hrs',
        authority: 'SAT / REPUVE Federal',
        completed: true
      },
      {
        id: 2,
        title: 'Ingreso en Ventanilla Gubernamental',
        desc: 'Expediente formal ingresado ante la Secretaría de Movilidad. Pago de derechos estatales sellado.',
        timestamp: 'Hoy • 10:45 hrs',
        authority: 'SMyT Gobierno de Morelos',
        completed: true
      },
      {
        id: 3,
        title: 'Troquelado SEDENA & Chip RFID',
        desc: 'Emisión de láminas de aluminio de alta seguridad bajo norma militar SEDENA con tarjeta de circulación inteligente.',
        timestamp: 'Hoy • 13:15 hrs',
        authority: 'Taller Oficial de Troquelado',
        completed: true
      },
      {
        id: 4,
        title: 'Valija Notarial en Ruta a Domicilio',
        desc: 'Expediente cerrado con precinto inviolable #PC-8891. Mensajero en tránsito directo a Polanco.',
        timestamp: 'Hoy • 15:10 hrs (En Curso)',
        authority: 'Custodia Ciclonatura CDMX',
        completed: false,
        active: true
      },
      {
        id: 5,
        title: 'Entrega Personal & Factura CFDI 4.0',
        desc: 'Recepción en mano con acuse notarial firmado y factura fiscal deducible entregada en portal y WhatsApp.',
        timestamp: 'Estimado 16:45 hrs',
        authority: 'Entrega en Mano',
        completed: false
      }
    ]
  },
  'CN-730194': {
    folio: 'CN-730194',
    client: 'Dra. Mariana Lozano',
    zone: 'Col. Del Valle Sur, Benito Juárez, CDMX',
    vehicle: 'Porsche Macan GTS 2022',
    plateTarget: 'CDMX Particular',
    service: 'Cambio de Propietario Digital',
    badge: 'Cotejo de Endosos SAT',
    status: 'Validación en Padrón SEMOVI',
    statusBadge: 'Cotejo Notarial',
    statusColor: '#38bdf8',
    eta: 'Mañana a las 11:30 hrs',
    progress: 60,
    courierName: 'Lic. Andrea Morales • Mesa Jurídica CDMX',
    courierPhone: '+52 55 4702 1799',
    securitySeal: 'PC-4102-SEMOVI',
    satInvoice: 'UUID: B19C-5582-F884-SAT',
    coords: { lat: '19.3734° N', lng: '99.1765° W', place: 'Módulo Central SEMOVI Insurgentes' },
    activeStepIndex: 2,
    steps: [
      {
        id: 1,
        title: 'Auditoría Notarial de Facturas & Endosos',
        desc: 'Secuencia ininterrumpida de facturas mercantiles revisada con lupa jurídica para blindaje de compraventa.',
        timestamp: 'Ayer • 16:20 hrs',
        authority: 'Notaría Pública Asociada',
        completed: true
      },
      {
        id: 2,
        title: 'Depuración de Infracciones & Fotocívicas',
        desc: 'Cancelación formal de infracciones pendientes del titular anterior ante la Tesorería de CDMX.',
        timestamp: 'Hoy • 09:40 hrs',
        authority: 'Finanzas CDMX',
        completed: true
      },
      {
        id: 3,
        title: 'Emisión de Nueva Tarjeta con Chip',
        desc: 'Plastificado oficial de la tarjeta de circulación con código criptográfico a nombre de la nueva propietaria.',
        timestamp: 'Hoy • 14:00 hrs (En Curso)',
        authority: 'Módulo Central SEMOVI',
        completed: false,
        active: true
      },
      {
        id: 4,
        title: 'Embalaje en Valija Notarial',
        desc: 'Sellado de tarjeta, dictamen de autenticidad y copia certificada de endosos en sobre de seguridad.',
        timestamp: 'Programado 18:00 hrs',
        authority: 'Bóveda Ciclonatura Tlalpan',
        completed: false
      },
      {
        id: 5,
        title: 'Entrega en Sede Notarial Calzada de Tlalpan',
        desc: 'Recolección en sala VIP o envío express con seguro de custodia hasta tu domicilio.',
        timestamp: 'Mañana • 11:30 hrs',
        authority: 'Recepción Notarial',
        completed: false
      }
    ]
  },
  'CN-915420': {
    folio: 'CN-915420',
    client: 'Ing. Alejandro Valenzuela',
    zone: 'Bosques de Santa Fe, Cuajimalpa, CDMX',
    vehicle: 'Audi Q5 Sportback 2023',
    plateTarget: 'Morelos 2026',
    service: 'Baja Foránea & Alta Inmediata',
    badge: 'Baja Foránea Sellada',
    status: 'Troquelado SEDENA en Cuernavaca',
    statusBadge: 'Troquelado en Taller',
    statusColor: '#fbbf24',
    eta: 'En 36 hrs hábiles',
    progress: 42,
    courierName: 'Lic. Carlos Beltrán • Gestor Titular Morelos',
    courierPhone: '+52 55 4702 1799',
    securitySeal: 'PC-7719-SEDENA',
    satInvoice: 'UUID: 99EF-2019-A331-SAT',
    coords: { lat: '18.9261° N', lng: '99.2307° W', place: 'SMyT Morelos Delegación Central' },
    activeStepIndex: 2,
    steps: [
      {
        id: 1,
        title: 'Dictamen de Baja en Estado Anterior',
        desc: 'Certificado oficial de no adeudo vehicular y entrega de constancia de baja foránea sin adeudos.',
        timestamp: 'Ayer • 11:00 hrs',
        authority: 'Padrón Vehicular de Origen',
        completed: true
      },
      {
        id: 2,
        title: 'Ingreso al Padrón de Morelos',
        desc: 'Asignación de nueva serie alfanumérica registrada con exención permanente del impuesto sobre tenencia.',
        timestamp: 'Hoy • 11:15 hrs',
        authority: 'SMyT Morelos',
        completed: true
      },
      {
        id: 3,
        title: 'Troquelado Metálico de Láminas',
        desc: 'Prensado de aluminio con relieves oficiales, holograma estatal y engomado alfanumérico.',
        timestamp: 'Hoy • 14:30 hrs (En Curso)',
        authority: 'Taller Central SEDENA',
        completed: false,
        active: true
      },
      {
        id: 4,
        title: 'Traslado Interurbano a CDMX en Valija',
        desc: 'Custodia en valija foliada desde Cuernavaca hacia la sede central de Calzada de Tlalpan.',
        timestamp: 'Mañana • 09:00 hrs',
        authority: 'Transporte Blindado Propio',
        completed: false
      },
      {
        id: 5,
        title: 'Entrega Final en Santa Fe',
        desc: 'Entrega en residencia corporativa con verificación física del código alfanumérico.',
        timestamp: 'Jueves • 12:00 hrs',
        authority: 'Entrega Verificada',
        completed: false
      }
    ]
  },
  'CN-604812': {
    folio: 'CN-604812',
    client: 'Grupo Finsa Logística S.A. de C.V.',
    zone: 'Parque Industrial Naucalpan, EdoMex',
    vehicle: 'Lote de 12 Vans Mercedes-Benz Sprinter 2025',
    plateTarget: 'Flotilla Carga Federal',
    service: 'Gestoría de Flotillas B2B & CFDI 4.0',
    badge: '12 Unidades • B2B deducible',
    status: 'Expediente Consolidado & Precinto',
    statusBadge: 'Listo para Entrega',
    statusColor: '#AFF94F',
    eta: 'Hoy a las 18:00 hrs',
    progress: 95,
    courierName: 'Mesa de Cuentas Clave Corporativas B2B',
    courierPhone: '+52 55 4702 1799',
    securitySeal: 'PC-0042-CORPORATE',
    satInvoice: 'UUID: FFE2-8810-0912-SAT',
    coords: { lat: '19.3498° N', lng: '99.1432° W', place: 'Sede Notarial Calzada de Tlalpan #1820' },
    activeStepIndex: 4,
    steps: [
      {
        id: 1,
        title: 'Auditoría de Matriz de Facturas XML',
        desc: 'Cotejo masivo de números de serie (VIN) de las 12 unidades contra padrón del SAT y REPUVE.',
        timestamp: 'Lunes • 09:00 hrs',
        authority: 'Mesa Técnica B2B SAT',
        completed: true
      },
      {
        id: 2,
        title: 'Ingreso en Bloque con Línea Corporativa',
        desc: 'Convenio interinstitucional para emisión expedita de 12 juegos de placas mercantiles.',
        timestamp: 'Ayer • 10:30 hrs',
        authority: 'Dirección General de Movilidad',
        completed: true
      },
      {
        id: 3,
        title: 'Troquelado & Tarjetas Inteligentes RFID',
        desc: '12 pares de láminas metálicas selladas con engomados y tarjetas con chip chip-set corporativo.',
        timestamp: 'Ayer • 17:00 hrs',
        authority: 'Almacén Central Oficial',
        completed: true
      },
      {
        id: 4,
        title: 'Cierre de Valija de Máxima Seguridad',
        desc: '12 expedientes agrupados en valija de lona reforzada con precinto notarial numerado #PC-0042.',
        timestamp: 'Hoy • 12:00 hrs',
        authority: 'Auditoría Jurídica Ciclonatura',
        completed: true
      },
      {
        id: 5,
        title: 'Entrega en Patio Corporativo & CFDI 4.0',
        desc: 'Entrega formal al apoderado legal con factura electrónica deducible al 100% para su empresa.',
        timestamp: 'Hoy • 18:00 hrs (En Camino)',
        authority: 'Recepción Apoderado Legal',
        completed: false,
        active: true
      }
    ]
  }
};

export default function LiveTrackingSection() {
  const [selectedFolio, setSelectedFolio] = useState('CN-849201');
  const [searchInput, setSearchInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [lastPingTime, setLastPingTime] = useState('hace 8 seg');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeCase = TRACKING_CASES[selectedFolio] || TRACKING_CASES['CN-849201'];

  // Simulate periodic real-time telemetry ping
  useEffect(() => {
    const timer = setInterval(() => {
      const seconds = Math.floor(Math.random() * 15) + 3;
      setLastPingTime(`hace ${seconds} seg`);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyFolio = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (TRACKING_CASES[clean]) {
      setSelectedFolio(clean);
    } else {
      // Default to first case if unknown, but friendly fallback
      setSelectedFolio('CN-849201');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastPingTime('sincronizando...');
    setTimeout(() => {
      setIsRefreshing(false);
      setLastPingTime('hace 1 seg');
    }, 650);
  };

  const handleWhatsAppAlert = () => {
    const text = encodeURIComponent(
      `🏛️ *CONSULTA DE RASTREO EN VIVO*\n` +
      `*Folio:* #${activeCase.folio}\n` +
      `*Titular:* ${activeCase.client}\n` +
      `*Vehículo:* ${activeCase.vehicle}\n` +
      `*Trámite:* ${activeCase.service}\n` +
      `*Estatus:* ${activeCase.status}\n` +
      `\nHola Ciclonatura, deseo recibir el reporte detallado y acuse de mi trámite #${activeCase.folio} en este chat.`
    );
    window.open(`https://wa.me/525547021799?text=${text}`, '_blank');
  };

  return (
    <section 
      id="rastreo"
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200/80 relative overflow-hidden select-none"
    >
      {/* Soft Ambient Radial Lime Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-[#AFF94F]/10 via-slate-100/30 to-lime-100/10 rounded-full blur-3xl -z-10" />

      {/* Subtle Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AFF94F]/20 border border-[#AFF94F]/60 text-slate-950 text-xs font-heading font-black mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] animate-pulse" />
            <Radio size={13} className="text-slate-950" />
            <span>Mesa de Control & Telemetría en Tiempo Real</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Rastreo Satelital de{' '}
            <span className="text-slate-950 underline decoration-[#AFF94F] decoration-4 underline-offset-4">
              Trámites Oficiales
            </span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">
            Sin coyotes ni incertidumbre. Conoce segundo a segundo en qué etapa legal está tu vehículo, quién custodia tus documentos y la hora exacta de entrega.
          </p>

          {/* Quick Interactive Search & Folio Switcher */}
          <div className="mt-7 max-w-md mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={15} />
              </div>
              <input
                type="text"
                placeholder="Ingresa tu folio (ej. CN-849201)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 rounded-full border border-slate-200 bg-white/90 backdrop-blur-md text-xs sm:text-sm font-mono font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#AFF94F] focus:ring-2 focus:ring-[#AFF94F]/30 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 rounded-full bg-slate-950 hover:bg-[#AFF94F] text-white hover:text-slate-950 text-xs font-heading font-black transition-all cursor-pointer shadow-xs"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Preset Demo Pills Switcher */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mt-4">
            <span className="text-[11px] font-mono font-bold text-slate-400 mr-1">
              Trámites en Vivo:
            </span>
            {Object.keys(TRACKING_CASES).map((folioKey) => {
              const item = TRACKING_CASES[folioKey];
              const isSelected = selectedFolio === folioKey;
              return (
                <button
                  key={folioKey}
                  type="button"
                  onClick={() => setSelectedFolio(folioKey)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-950 text-white font-bold shadow-sm scale-102 ring-2 ring-[#AFF94F]/50'
                      : 'bg-white/80 hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#AFF94F] animate-pulse' : 'bg-slate-300'}`} />
                  <span>#{folioKey}</span>
                  <span className="hidden sm:inline text-[9px] opacity-75 font-sans">• {item.plateTarget}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN CONSOLE CARD (BENTO HIGH-TECH NOTARIAL PANEL)       */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/5 overflow-hidden">
          
          {/* ------------------------------------------------------ */}
          {/* PANEL TOP BAR: Status, Folio, Live Satellite Connection */}
          {/* ------------------------------------------------------ */}
          <div className="bg-slate-950 text-white p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              {/* Folio Badge */}
              <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl">
                <span className="text-[11px] font-mono text-slate-400">Folio:</span>
                <span className="font-mono font-black text-sm text-[#AFF94F]">
                  #{activeCase.folio}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyFolio(activeCase.folio)}
                  title="Copiar folio"
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer ml-0.5"
                >
                  {copied ? <Check size={13} className="text-[#AFF94F]" /> : <Copy size={13} />}
                </button>
              </div>

              <div>
                <h3 className="font-heading font-black text-base sm:text-lg text-white leading-tight">
                  {activeCase.vehicle}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{activeCase.service}</span>
                  <span>•</span>
                  <span className="text-slate-300 font-medium">{activeCase.client}</span>
                </div>
              </div>
            </div>

            {/* Live Telemetry Ping & Refresh Button */}
            <div className="flex items-center gap-3 self-end md:self-center">
              <div className="flex items-center gap-2 bg-emerald-500/15 border border-[#AFF94F]/40 px-3 py-1 rounded-full text-xs">
                <span className="w-2 h-2 rounded-full bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] animate-ping" />
                <span className="font-mono text-[11px] font-bold text-[#AFF94F]">
                  GPS Satelital Activo
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  ({lastPingTime})
                </span>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                title="Actualizar telemetría"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
              >
                <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#AFF94F]' : ''} />
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* PANEL BODY: 2-COLUMN SPLIT (Timeline Left + Radar Right)*/}
          {/* ------------------------------------------------------ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* LEFT COLUMN (7 COLS): Chronological Milestones Stepper */}
            <div className="lg:col-span-7 p-6 sm:p-8">
              
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider">
                    Secuencia de Seguridad
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-[#AFF94F]/25 text-slate-950 px-2 py-0.5 rounded border border-[#AFF94F]/60">
                    Etapa {activeCase.activeStepIndex + 1} de {activeCase.steps.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {activeCase.progress}% Completado
                  </span>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${activeCase.progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* Milestones Vertical List */}
              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-3 before:w-0.5 before:bg-slate-200">
                <AnimatePresence mode="wait">
                  {activeCase.steps.map((step, idx) => {
                    const isDone = step.completed;
                    const isActive = step.active;

                    return (
                      <motion.div
                        key={`${activeCase.folio}-step-${step.id}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.2 }}
                        className="relative flex items-start gap-4 pl-1"
                      >
                        {/* Status Node Circle */}
                        <div className="relative z-10 shrink-0">
                          {isDone ? (
                            <div className="w-7 h-7 rounded-full bg-[#AFF94F] text-slate-950 flex items-center justify-center shadow-xs border-2 border-white">
                              <Check size={14} strokeWidth={3} />
                            </div>
                          ) : isActive ? (
                            <div className="relative w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center border-2 border-[#AFF94F] shadow-md shadow-[#AFF94F]/30">
                              <span className="w-2 h-2 rounded-full bg-[#AFF94F] animate-ping absolute" />
                              <span className="w-2 h-2 rounded-full bg-[#AFF94F]" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 border-2 border-white flex items-center justify-center text-xs font-mono font-bold">
                              0{step.id}
                            </div>
                          )}
                        </div>

                        {/* Step Description Card */}
                        <div className={`flex-1 rounded-2xl p-3.5 sm:p-4 border transition-all ${
                          isActive
                            ? 'bg-[#AFF94F]/10 border-[#AFF94F]/60 shadow-xs'
                            : isDone
                              ? 'bg-slate-50/70 border-slate-200/80'
                              : 'bg-white border-slate-100 opacity-60'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-heading font-black text-slate-900">
                              {step.title}
                            </span>
                            <span className={`text-[10px] font-mono ${isActive ? 'text-slate-950 font-black' : 'text-slate-400 font-medium'}`}>
                              {step.timestamp}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            {step.desc}
                          </p>

                          <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400">
                              Autoridad: <strong className="text-slate-700">{step.authority}</strong>
                            </span>
                            {isDone && (
                              <span className="text-emerald-700 font-bold flex items-center gap-1">
                                Sello Digital Valido ✓
                              </span>
                            )}
                            {isActive && (
                              <span className="text-slate-950 font-black bg-[#AFF94F] px-2 py-0.5 rounded shadow-2xs">
                                En Ejecución Ahora
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

            </div>

            {/* RIGHT COLUMN (5 COLS): Live Radar Map Simulation & Security Hologram */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
              
              <div>
                {/* Visual Route Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#AFF94F] font-bold flex items-center gap-1.5">
                    <Navigation size={12} />
                    <span>Monitoreo de Ruta GPS</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                    Precinto: #{activeCase.securitySeal}
                  </span>
                </div>

                {/* Simulated Radar Map Display Container */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-inner flex flex-col justify-between p-4 mb-4">
                  
                  {/* Subtle Grid Lines & Concentric Radar Rings */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(175,249,79,0.15)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#AFF94F]/10 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-[#AFF94F]/20 pointer-events-none" />
                  
                  {/* Rotating Radar Sweep Line */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-28 h-28 origin-top-left border-l border-[#AFF94F]/40 bg-gradient-to-br from-[#AFF94F]/15 to-transparent pointer-events-none animate-spin"
                    style={{ animationDuration: '6s' }}
                  />

                  {/* Top Map Coordinates */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-[#AFF94F]">
                      <Compass size={11} />
                      {activeCase.coords.lat}, {activeCase.coords.lng}
                    </span>
                    <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-white/10">
                      ETA: {activeCase.eta}
                    </span>
                  </div>

                  {/* Center Route Simulation Icons */}
                  <div className="relative z-10 flex items-center justify-between px-3 my-auto">
                    {/* Origin Node */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-slate-300">
                        <Building size={14} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 mt-1">Sede Tlalpan</span>
                    </div>

                    {/* Connecting Pulsing Path */}
                    <div className="flex-1 mx-3 relative flex items-center">
                      <div className="w-full h-0.5 bg-slate-800" />
                      <div 
                        className="absolute h-0.5 bg-[#AFF94F] shadow-[0_0_8px_#AFF94F]"
                        style={{ width: `${activeCase.progress}%` }}
                      />
                      {/* Active Courier Moving Pin */}
                      <div 
                        className="absolute -translate-x-1/2 flex items-center justify-center"
                        style={{ left: `${activeCase.progress}%` }}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#AFF94F] text-slate-950 flex items-center justify-center shadow-md shadow-[#AFF94F]/40 animate-pulse">
                          <Truck size={12} />
                        </div>
                      </div>
                    </div>

                    {/* Destination Node */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-slate-300">
                        <MapPin size={14} className="text-[#AFF94F]" />
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 mt-1">Destino</span>
                    </div>
                  </div>

                  {/* Bottom Map Status Strip */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono pt-1 border-t border-white/10">
                    <span className="text-slate-300 truncate max-w-[200px]">
                      📍 {activeCase.coords.place}
                    </span>
                    <span className="text-[#AFF94F] font-bold">
                      {activeCase.statusBadge}
                    </span>
                  </div>
                </div>

                {/* Telemetry Details Matrix */}
                <div className="space-y-2.5 text-xs bg-white/5 rounded-2xl p-4 border border-white/10 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Custodia / Gestor:</span>
                    <span className="font-medium text-slate-100 truncate max-w-[170px]">
                      {activeCase.courierName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Destino Registrado:</span>
                    <span className="font-medium text-slate-100 truncate max-w-[170px]">
                      {activeCase.zone}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Garantía Notarial:</span>
                    <span className="font-mono text-[#AFF94F] font-bold">
                      Activa 100% (CFDI 4.0)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Sello Digital SAT:</span>
                    <span className="font-mono text-[10px] text-slate-300">
                      {activeCase.satInvoice}
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom WhatsApp Alerts Direct Button */}
              <div className="pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleWhatsAppAlert}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#AFF94F] hover:bg-[#9ee83e] text-slate-950 font-heading font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-[#AFF94F]/20 transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <MessageSquare size={15} />
                  <span>Recibir Alertas de este Trámite en WhatsApp</span>
                  <ArrowRight size={13} />
                </button>

                <div className="text-center mt-2.5 text-[10px] font-mono text-slate-400">
                  Respuesta de mesa de control en menos de 10 minutos
                </div>
              </div>

            </div>

          </div>

          {/* ------------------------------------------------------ */}
          {/* PANEL FOOTER: Trust Badges & Guarantee Slogan         */}
          {/* ------------------------------------------------------ */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-slate-950 shrink-0" />
              <span>
                Todos los trámites cuentan con <strong>precinto foliado notarial</strong> y <strong>factura CFDI 4.0</strong> emitida directamente a tu RFC.
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 shrink-0">
              <span className="flex items-center gap-1">
                <Lock size={12} className="text-slate-950" />
                Cifrado 256-bit
              </span>
              <span>•</span>
              <span className="text-slate-900 font-bold">
                Sede Calzada de Tlalpan CDMX
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
