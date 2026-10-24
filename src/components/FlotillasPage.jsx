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
  ChevronDown,
  FileText,
  BadgeCheck,
  Lock,
  Layers,
  HelpCircle,
  MessageCircle,
  User,
  Mail,
  Phone,
  RotateCcw,
  Send,
  Check
} from 'lucide-react';
import Navbar from './Navbar';
import CinematicFooter from './ui/motion-footer';
import flotillaPatioImg from '@/assets/services/flotilla_corporativa_patio.jpg';
import headquartersImg from '@/assets/ciclonatura_headquarters.jpg';

// Safe confetti trigger
const triggerConfetti = async () => {
  try {
    const confettiModule = await import('canvas-confetti');
    const confetti = confettiModule.default || confettiModule;
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  } catch (err) {
    // Graceful fallback
  }
};

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

// Interactive Corporate FAQs
const B2B_FAQS = [
  {
    id: 'cfdi',
    category: 'Fiscalidad SAT',
    question: '¿Cómo funciona la deducción fiscal del 100% de los trámites ante el SAT?',
    answer: 'Emitimos factura electrónica CFDI 4.0 a nombre de tu razón social. Desglosamos transparentemente los derechos gubernamentales pagados a tesorería (exentos de IVA) y nuestros honorarios de gestión corporativa con su IVA correspondiente, permitiendo deducir la operación al 100% como gasto operativo formal sin contingencias fiscales.',
    highlights: ['CFDI 4.0 con desglose oficial', 'Comprobantes bancarios de tesorería adjuntos', 'Totalmente deducible para Persona Moral']
  },
  {
    id: 'morelos',
    category: 'Legalidad & Tenencia',
    question: '¿Es legal emplacar en Morelos toda la flotilla de una empresa con sede en CDMX o Edomex?',
    answer: 'Sí, es 100% legal. El Artículo 11 de la Constitución Mexicana garantiza el libre tránsito de cualquier vehículo registrado formalmente en la República. Morelos mantiene subsidio del 100% en tenencia anual estatal de por vida, lo que representa ahorros acumulados de hasta $45,000 MXN por unidad cada año para flotillas de autos nuevos o utilitarios.',
    highlights: ['Amparo bajo Art. 11 Constitucional', 'Cero tenencia de por vida', 'Libre circulación con verificación holograma 0/00']
  },
  {
    id: 'patio',
    category: 'Logística & Custodia',
    question: '¿Cómo funciona la entrega con valija de seguridad directamente en patio operativo?',
    answer: 'Disponemos de mensajería corporativa propia con custodia blindada. Recolectamos expedientes originales bajo acta responsiva foliada y entregamos las placas troqueladas bajo norma SEDENA, engomados y tarjetas RFID en valijas selladas con precinto numerado directamente en tus oficinas corporativas o patio de operaciones.',
    highlights: ['Custodia con folio de seguridad', 'Entrega en mano sin mover tus autos', 'Acta de entrega firmada por ambas partes']
  },
  {
    id: 'credito',
    category: 'Convenios & Crédito',
    question: '¿Ofrecen esquemas de crédito o convenios de facturación mensual para empresas?',
    answer: 'Para empresas y flotilleros con más de 10 unidades activas contamos con esquemas de convenio marco corporativo. Ofrecemos facturación consolidada mensual o quincenal, términos de crédito comercial (15 a 30 días) previa aprobación de expediente fiscal, y ejecutivo de cuenta asignado como punto único de contacto.',
    highlights: ['Convenio marco con SLA por escrito', 'Facturación mensual consolidada', 'Línea de crédito comercial B2B']
  },
  {
    id: 'repuve',
    category: 'Auditoría Preventiva',
    question: '¿Qué sucede si alguna unidad de la flotilla tiene reporte o adeudos en REPUVE?',
    answer: 'Antes de ingresar cualquier trámite o solicitar anticipos, nuestro equipo jurídico realiza un cotejo digital sin costo en las bases de datos del REPUVE, plataformas de tesorería y padrones vehiculares. Si detectamos alguna inconsistencia de serie, reporte o adeudo oculto, emitimos un reporte preventivo inmediato para proteger el patrimonio de la empresa.',
    highlights: ['Cotejo preventivo sin costo', 'Detección oportuna de homónimos o adeudos', 'Protección patrimonial garantizada']
  },
  {
    id: 'pesados',
    category: 'Carga & Maquinaria',
    question: '¿Pueden gestionar vehículos pesados, camionetas de carga, remolques y maquinaria de obra?',
    answer: 'Sí. Contamos con gestores acreditados para el emplacamiento y regularización de camionetas de trabajo (F-150, Hilux, RAM, Silverado), plataformas, remolques, cajas secas y camiones de obra. Verificamos números de serie en chasis/motor y gestionamos permisos de carga ante las autoridades competentes.',
    highlights: ['Trámites para pickups y remolques', 'Inspección de series troqueladas', 'Cumplimiento normativo para obra y carretera']
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

  // =========================================================================
  // MULTI-STEP B2B FLEET SIMULATOR STATE (LIGHT & MINIMALIST)
  // =========================================================================
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState('apps');
  const [fleetVolume, setFleetVolume] = useState('11-30');
  const [stateTarget, setStateTarget] = useState('morelos');
  const [serviceFocus, setServiceFocus] = useState('alta');

  // Contact Capture Form State
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    vehicleTypes: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [quoteFolio, setQuoteFolio] = useState('');
  const [copied, setCopied] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(prev => (prev === index ? -1 : index));
  };

  const fleetVolumeLabels = {
    '3-10': '3 a 10 unidades (Flota Ligera / Socios)',
    '11-30': '11 a 30 unidades (Flota Mediana)',
    '31-80': '31 a 80 unidades (Flotilla Empresarial)',
    '80+': 'Más de 80 unidades (Gran Corporativo)'
  };

  const stateLabels = {
    morelos: 'Morelos (100% Exento de Tenencia de por vida)',
    cdmx: 'CDMX (Placas de la Ciudad de México con Chip RFID)',
    edomex: 'Edomex (Padrón del Estado de México)'
  };

  const industryLabels = {
    apps: 'Uber, DiDi & Apps de Movilidad',
    constructoras: 'Constructoras, Obra Civil & Maquinaria',
    corporativos: 'Corporativos & Fuerza de Ventas',
    arrendadoras: 'Arrendadoras, Leasing & Logística'
  };

  const serviceFocusLabels = {
    alta: 'Emplacamiento y Altas Nuevas',
    auditoria: 'Auditoría Fiscal de Tenencias & Multas',
    integral: 'Gestión Integral (Altas + Verificación + B2B)'
  };

  const getEstimatedTurnaround = () => {
    if (fleetVolume === '3-10') return '48 a 72 hrs hábiles';
    if (fleetVolume === '11-30') return '3 a 4 días hábiles escalonados';
    if (fleetVolume === '31-80') return '5 a 7 días hábiles con entrega por patio';
    return 'Cronograma B2B coordinado con ejecutivo asignado';
  };

  // Validate step 3 contact form
  const validateStep3 = () => {
    const errs = {};
    if (!formData.companyName.trim()) errs.companyName = 'Ingresa el nombre o razón social de la empresa';
    if (!formData.contactName.trim()) errs.contactName = 'Ingresa el nombre del responsable o contacto';
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) errs.phone = 'Ingresa un WhatsApp o teléfono válido (10 dígitos)';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Ingresa un correo corporativo válido';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) {
        const generatedFolio = `CN-B2B-${Math.floor(100000 + Math.random() * 900000)}`;
        setQuoteFolio(generatedFolio);
        setCurrentStep(4);
        triggerConfetti();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleResetSimulator = () => {
    setCurrentStep(1);
    setFormData({
      companyName: '',
      contactName: '',
      phone: '',
      email: '',
      vehicleTypes: '',
      notes: ''
    });
    setFormErrors({});
    setQuoteFolio('');
  };

  const handleWhatsAppFromSummary = () => {
    const message = encodeURIComponent(
      `🏛️ *SOLICITUD DE COTIZACIÓN FLOTILLAS CICLONATURA B2B*\n` +
      `*Folio:* #${quoteFolio}\n` +
      `*Empresa:* ${formData.companyName}\n` +
      `*Contacto:* ${formData.contactName}\n` +
      `*WhatsApp:* ${formData.phone}\n` +
      `*Correo:* ${formData.email}\n` +
      `*Industria:* ${industryLabels[selectedIndustry]}\n` +
      `*Volumen:* ${fleetVolumeLabels[fleetVolume]}\n` +
      `*Entidad:* ${stateLabels[stateTarget]}\n` +
      `*Servicio:* ${serviceFocusLabels[serviceFocus]}\n` +
      `*Tipo de Unidades:* ${formData.vehicleTypes || 'No especificado'}\n` +
      `*Notas:* ${formData.notes || 'Ninguna'}\n\n` +
      `Deseo atención con ejecutivo corporativo y propuesta formal con factura deducible SAT.`
    );
    window.open(`https://wa.me/525547021799?text=${message}`, '_blank');
  };

  const handleCopyFolio = () => {
    if (quoteFolio) {
      navigator.clipboard?.writeText(quoteFolio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
                <a
                  href="#simulador"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs sm:text-sm shadow-xl shadow-slate-950/15 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                >
                  <Sparkles size={16} className="text-[#AFF94F]" />
                  <span>Iniciar Simulador Rápido B2B</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={() => {
                    const text = encodeURIComponent('Hola Ciclonatura, requiero asesoría para la flotilla de mi empresa.');
                    window.open(`https://wa.me/525547021799?text=${text}`, '_blank');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-heading font-bold text-xs sm:text-sm border border-slate-200/90 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle size={15} className="text-emerald-600" />
                  <span>Hablar con Ejecutivo Directo</span>
                </button>
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

                    {/* Fast Action Badge */}
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
                      <a
                        href="#simulador"
                        className="px-3.5 py-2 rounded-xl bg-[#AFF94F] hover:bg-[#9de441] text-slate-950 text-xs font-heading font-black whitespace-nowrap transition-all shrink-0 cursor-pointer shadow-sm"
                      >
                        Cotizar Flota
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* 3. SIMULADOR RÁPIDO B2B MULTIPASOS (FONDO CLARO & MINIMAL)  */}
        {/* ========================================================== */}
        <section id="simulador" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80 relative">
          <div className="container max-w-5xl">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider font-heading mb-3 shadow-2xs">
                <Sparkles size={13} className="text-emerald-600" />
                <span>Simulador B2B Multipasos • Cotización Inmediata</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Simula tu Trámite de Flotilla en 3 Pasos
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 font-normal">
                Configura tu industria, volumen vehicular y recibe una propuesta con tiempos de entrega y desglose fiscal ante el SAT.
              </p>
            </div>

            {/* Main Multi-Step Box: Clean Light Minimalist Container */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-10 relative overflow-hidden">
              
              {/* Stepper Progress Bar */}
              <div className="mb-8 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  {[
                    { stepNum: 1, label: 'Industria' },
                    { stepNum: 2, label: 'Volumen & Estado' },
                    { stepNum: 3, label: 'Datos Empresa' },
                    { stepNum: 4, label: 'Resumen B2B' }
                  ].map(s => {
                    const isDone = currentStep > s.stepNum;
                    const isCurrent = currentStep === s.stepNum;
                    return (
                      <div key={s.stepNum} className="flex flex-col items-center gap-1.5 flex-1 relative">
                        <div 
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-heading font-black transition-all ${
                            isDone 
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : isCurrent
                              ? 'bg-slate-950 text-white ring-4 ring-emerald-500/20 shadow-md scale-105'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isDone ? <Check size={14} /> : s.stepNum}
                        </div>
                        <span className={`text-[11px] font-heading font-bold ${isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step Content with AnimatePresence */}
              <AnimatePresence mode="wait">
                
                {/* -------------------------------------------------- */}
                {/* PASO 1: SELECCIÓN DE INDUSTRIA                     */}
                {/* -------------------------------------------------- */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6">
                      <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                        Paso 1 de 3
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                        ¿Qué tipo de flotilla u operación vehicular manejas?
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        Selecciona la categoría que mejor describa a tu parque vehicular.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                      {[
                        {
                          id: 'apps',
                          icon: Car,
                          title: 'Uber, DiDi & Apps de Movilidad',
                          desc: 'Altas exprés, tarjeta chip RFID para inspección en plataforma y verificación 00/0.'
                        },
                        {
                          id: 'constructoras',
                          icon: HardHat,
                          title: 'Constructoras & Maquinaria',
                          desc: 'Pickups de trabajo pesado (Hilux, RAM, F-150), remolques, cajas secas y cotejo en obra.'
                        },
                        {
                          id: 'corporativos',
                          icon: Building2,
                          title: 'Corporativos & Fuerza de Ventas',
                          desc: 'Flotillas ejecutivas, autos comerciales, reporte consolidado en Excel y entrega en patio.'
                        },
                        {
                          id: 'arrendadoras',
                          icon: Truck,
                          title: 'Arrendadoras & Logística',
                          desc: 'Leasing vehicular, paqueterías, cartas responsivas y convenios con SLA garantizado.'
                        }
                      ].map(item => {
                        const Icon = item.icon;
                        const isSelected = selectedIndustry === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedIndustry(item.id)}
                            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                              isSelected
                                ? 'bg-emerald-50/60 border-emerald-600 shadow-sm'
                                : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                            }`}
                          >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              <Icon size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-heading font-black text-sm text-slate-900">
                                  {item.title}
                                </h4>
                                {isSelected && (
                                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                    <Check size={12} />
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-500 text-xs mt-1 leading-snug">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-end pt-4 border-t border-slate-100">
                      <button
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        <span>Siguiente: Volumen y Entidad</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* -------------------------------------------------- */}
                {/* PASO 2: VOLUMEN Y ENTIDAD                          */}
                {/* -------------------------------------------------- */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6">
                      <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                        Paso 2 de 3
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                        Volumen de Unidades y Jurisdicción de Interés
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        Define la cantidad de autos y la entidad donde te gustaría emplacar o regularizar.
                      </p>
                    </div>

                    {/* Fleet Size Selector */}
                    <div className="mb-6">
                      <label className="text-xs font-heading font-bold text-slate-700 block mb-2.5">
                        1. ¿Cuántas unidades integran tu solicitud?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { id: '3-10', label: '3 a 10', desc: 'Flota Ligera / Socios' },
                          { id: '11-30', label: '11 a 30', desc: 'Flota Mediana' },
                          { id: '31-80', label: '31 a 80', desc: 'Empresarial' },
                          { id: '80+', label: '80+ unidades', desc: 'Gran Corporativo' }
                        ].map(vol => (
                          <button
                            key={vol.id}
                            type="button"
                            onClick={() => setFleetVolume(vol.id)}
                            className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                              fleetVolume === vol.id
                                ? 'bg-emerald-50/70 border-emerald-600 shadow-sm'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="font-heading font-black text-base text-slate-900 block">
                              {vol.label}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                              {vol.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* State Jurisdiction Selector */}
                    <div className="mb-6">
                      <label className="text-xs font-heading font-bold text-slate-700 block mb-2.5">
                        2. Entidad federativa preferida:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          {
                            id: 'morelos',
                            title: 'Morelos',
                            badge: '0% Tenencia de por vida',
                            desc: 'Máximo ahorro fiscal para unidades comerciales o de alto valor.'
                          },
                          {
                            id: 'cdmx',
                            title: 'Ciudad de México',
                            badge: 'Padrón SEMOVI con Chip',
                            desc: 'Circulación prioritaria y verificación ordinaria en la capital.'
                          },
                          {
                            id: 'edomex',
                            title: 'Estado de México',
                            badge: 'Padrón Mexiquense',
                            desc: 'Reemplacamiento y regularización oficial de placas estatales.'
                          }
                        ].map(st => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => setStateTarget(st.id)}
                            className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                              stateTarget === st.id
                                ? 'bg-emerald-50/70 border-emerald-600 shadow-sm'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-heading font-black text-sm text-slate-900">
                                {st.title}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                                {st.badge}
                              </span>
                            </div>
                            <p className="text-slate-500 text-xs mt-1.5 leading-snug">
                              {st.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Service Focus */}
                    <div className="mb-8">
                      <label className="text-xs font-heading font-bold text-slate-700 block mb-2.5">
                        3. Tipo de requerimiento principal:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'alta', label: 'Altas & Emplacamiento Inicial' },
                          { id: 'auditoria', label: 'Auditoría Fiscal & Regularización' },
                          { id: 'integral', label: 'Gestión Integral B2B (Todo Incluido)' }
                        ].map(srv => (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setServiceFocus(srv.id)}
                            className={`py-2.5 px-3.5 rounded-xl border text-xs font-heading font-bold transition-all cursor-pointer text-center ${
                              serviceFocus === srv.id
                                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {srv.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        onClick={handlePrevStep}
                        className="px-4 py-2 text-xs font-heading font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        ← Volver a Industria
                      </button>

                      <button
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        <span>Siguiente: Datos de la Empresa</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* -------------------------------------------------- */}
                {/* PASO 3: CAPTURA DE DATOS DE LA EMPRESA             */}
                {/* -------------------------------------------------- */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6">
                      <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                        Paso 3 de 3
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                        Datos de la Empresa o Representante
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        Ingresa los datos para asignar a tu ejecutivo de cuenta B2B y emitir tu cotización formal.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      
                      {/* Razón Social */}
                      <div>
                        <label className="text-xs font-heading font-bold text-slate-700 block mb-1.5">
                          Razón Social o Nombre de Empresa *
                        </label>
                        <div className="relative">
                          <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Ej. Constructora del Centro S.A. de C.V."
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white text-slate-900 focus:outline-none transition-colors ${
                              formErrors.companyName ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                            }`}
                          />
                        </div>
                        {formErrors.companyName && (
                          <span className="text-[11px] text-red-500 mt-1 block">{formErrors.companyName}</span>
                        )}
                      </div>

                      {/* Nombre del Responsable */}
                      <div>
                        <label className="text-xs font-heading font-bold text-slate-700 block mb-1.5">
                          Nombre del Contacto o Apoderado *
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Ej. Lic. Fernando Treviño"
                            value={formData.contactName}
                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white text-slate-900 focus:outline-none transition-colors ${
                              formErrors.contactName ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                            }`}
                          />
                        </div>
                        {formErrors.contactName && (
                          <span className="text-[11px] text-red-500 mt-1 block">{formErrors.contactName}</span>
                        )}
                      </div>

                      {/* WhatsApp / Teléfono */}
                      <div>
                        <label className="text-xs font-heading font-bold text-slate-700 block mb-1.5">
                          WhatsApp o Teléfono Celular (10 dígitos) *
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            placeholder="55 1234 5678"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white text-slate-900 focus:outline-none transition-colors ${
                              formErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                            }`}
                          />
                        </div>
                        {formErrors.phone && (
                          <span className="text-[11px] text-red-500 mt-1 block">{formErrors.phone}</span>
                        )}
                      </div>

                      {/* Correo Corporativo */}
                      <div>
                        <label className="text-xs font-heading font-bold text-slate-700 block mb-1.5">
                          Correo Electrónico Corporativo *
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            placeholder="contacto@empresa.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white text-slate-900 focus:outline-none transition-colors ${
                              formErrors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                            }`}
                          />
                        </div>
                        {formErrors.email && (
                          <span className="text-[11px] text-red-500 mt-1 block">{formErrors.email}</span>
                        )}
                      </div>

                    </div>

                    {/* Optional Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div>
                        <label className="text-xs font-heading font-bold text-slate-700 block mb-1.5">
                          Modelos o Tipo de Unidades (Opcional)
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. 10 Pickups Hilux 2024 y 5 Vans Sprinter"
                          value={formData.vehicleTypes}
                          onChange={(e) => setFormData({ ...formData, vehicleTypes: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-heading font-bold text-slate-700 block mb-1.5">
                          Notas o Requerimientos Particulares
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Entrega requerida en patio de Toluca"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        onClick={handlePrevStep}
                        className="px-4 py-2 text-xs font-heading font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        ← Volver a Volumen
                      </button>

                      <button
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                      >
                        <span>Generar Cotización y Resumen</span>
                        <CheckCircle2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* -------------------------------------------------- */}
                {/* PASO 4: RESUMEN Y FOLIO B2B CONFIRMADO             */}
                {/* -------------------------------------------------- */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center max-w-xl mx-auto mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
                        <BadgeCheck size={28} />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                        Cotización B2B Generada con Éxito
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 mt-3">
                        ¡Expediente de Flotilla Registrado!
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        Tu solicitud ha sido asignada a la Mesa de Control Corporativa de Ciclonatura.
                      </p>
                    </div>

                    {/* Recapitulative Summary Card */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 mb-8 max-w-2xl mx-auto">
                      
                      {/* Folio Row */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                            Folio de Atención B2B
                          </span>
                          <span className="font-mono text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                            #{quoteFolio}
                          </span>
                        </div>
                        <button
                          onClick={handleCopyFolio}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copied ? <Check size={13} className="text-emerald-600" /> : <Layers size={13} />}
                          <span>{copied ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>

                      {/* Key Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                        <div>
                          <span className="text-slate-400 font-mono block text-[10px] uppercase">Empresa</span>
                          <strong className="text-slate-900 font-heading block mt-0.5">{formData.companyName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block text-[10px] uppercase">Responsable</span>
                          <strong className="text-slate-900 font-heading block mt-0.5">{formData.contactName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block text-[10px] uppercase">Volumen</span>
                          <strong className="text-slate-900 font-heading block mt-0.5">{fleetVolumeLabels[fleetVolume]}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block text-[10px] uppercase">Entidad Preferida</span>
                          <strong className="text-slate-900 font-heading block mt-0.5">{stateTarget.toUpperCase()}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block text-[10px] uppercase">SLA Estimado</span>
                          <strong className="text-emerald-700 font-heading block mt-0.5">{getEstimatedTurnaround()}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 font-mono block text-[10px] uppercase">Facturación</span>
                          <strong className="text-slate-900 font-heading block mt-0.5">CFDI 4.0 SAT 100%</strong>
                        </div>
                      </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
                      <button
                        onClick={handleWhatsAppFromSummary}
                        className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-slate-950/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <MessageCircle size={16} className="text-[#AFF94F]" />
                        <span>Enviar a Ejecutivo en WhatsApp</span>
                        <ArrowRight size={14} />
                      </button>

                      <button
                        onClick={handleResetSimulator}
                        className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-heading font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        <span>Calcular otra flotilla</span>
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* 4. REQUISITOS B2B (PERSONA MORAL & FLOTILLAS)              */}
        {/* ========================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
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
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
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
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
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
        {/* 5. PREGUNTAS FRECUENTES B2B (ACORDEÓN INTERACTIVO & EFECTOS) */}
        {/* ========================================================== */}
        <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
          <div className="container max-w-4xl">
            
            <div className="text-center max-w-xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                <HelpCircle size={13} className="text-emerald-700" />
                <span>Mesa de Control & Dudas Corporativas</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Preguntas Frecuentes de Flotillas
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2">
                Respuestas con sustento jurídico y fiscal para directores de operaciones y compras.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
              {B2B_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-emerald-500/50 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                        : 'bg-white/80 border-slate-200/90 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {/* Clickable Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                          isOpen ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
                            {faq.category}
                          </span>
                          <h4 className="font-heading text-sm sm:text-base font-bold text-slate-900 leading-snug">
                            {faq.question}
                          </h4>
                        </div>
                      </div>

                      {/* Rotating Chevron */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    {/* Expandable Accordion Body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`faq-content-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100">
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                              {faq.answer}
                            </p>

                            {/* Bullet Highlights */}
                            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100">
                              {faq.highlights.map((h, i) => (
                                <span 
                                  key={i} 
                                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-900 bg-emerald-50/80 border border-emerald-200/80 px-2.5 py-1 rounded-lg"
                                >
                                  <CheckCircle2 size={12} className="text-emerald-600" />
                                  <span>{h}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom Support Callout */}
            <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shrink-0">
                  <PhoneCall size={18} className="text-[#AFF94F]" />
                </div>
                <div>
                  <div className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                    ¿Requieres un convenio marco para más de 50 vehículos?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Atención personalizada con la Dirección de Operaciones Corporativas.
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const text = encodeURIComponent('Hola Ciclonatura, deseo consultar términos para un convenio marco de flotillas corporativas (+50 unidades).');
                  window.open(`https://wa.me/525547021799?text=${text}`, '_blank');
                }}
                className="px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-heading font-bold whitespace-nowrap transition-colors cursor-pointer"
              >
                Hablar con Dirección B2B
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Cinematic Curtain Reveal Footer */}
      <CinematicFooter />

    </div>
  );
}
