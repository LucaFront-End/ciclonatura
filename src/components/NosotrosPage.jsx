import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Users, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Scale, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Sparkles,
  Lock,
  BadgeCheck,
  ChevronRight,
  ExternalLink,
  Shield,
  Calendar
} from 'lucide-react';
import Navbar from './Navbar';
import CinematicFooter from './ui/motion-footer';
import headquartersImg from '../assets/ciclonatura_headquarters.jpg';
import flotillaPatioImg from '../assets/services/flotilla_corporativa_patio.jpg';

// Lottie JSON icon animations
import shieldAnim from '../assets/lottie/shield.json';
import checkCircleAnim from '../assets/lottie/check-circle.json';
import lockAnim from '../assets/lottie/lock.json';
import checkmarkAnim from '../assets/lottie/checkmark.json';

import lottie from 'lottie-web/build/player/esm/lottie_svg.min.js';

// Direct Lottie Player with native SVG injection and cleanup
function LottiePlayer({ animationData, fallback: FallbackIcon, className = "w-12 h-12", fallbackClassName = "w-7 h-7 text-emerald-600" }) {
  const containerRef = useRef(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !animationData) return;

    let anim = null;
    const container = containerRef.current;
    container.innerHTML = "";

    try {
      if (lottie && typeof lottie.loadAnimation === "function") {
        anim = lottie.loadAnimation({
          container,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: JSON.parse(JSON.stringify(animationData)),
        });
      }
    } catch (e) {
      console.warn("Lottie error:", e);
      setLoadError(true);
    }

    return () => {
      if (anim && typeof anim.destroy === "function") {
        anim.destroy();
      }
    };
  }, [animationData]);

  if (loadError && FallbackIcon) {
    return <FallbackIcon className={fallbackClassName} />;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    />
  );
}

export default function NosotrosPage({ onNavigateHome, onSelectService, onNavigateContact, onNavigateNosotros, onNavigateFlotillas }) {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      'Hola Ciclonatura, deseo contactar con la Dirección de Operaciones o un Asesor Senior para conocer más sobre sus servicios institucionales.'
    );
    window.open(`https://wa.me/525547021799?text=${text}`, '_blank');
  };

  const handleViewServices = () => {
    if (onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById('servicios');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.location.href = '/#servicios';
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
        {/* 1. HERO INSTITUCIONAL: PROPÓSITO & ORIGEN                  */}
        {/* ========================================================== */}
        <section className="relative py-16 sm:py-24 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
          
          <div className="container max-w-6xl relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider font-heading mb-4 shadow-2xs">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Ciclonatura Institucional • Desde CDMX para la Megalópolis</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                La Gestoría Vehicular que Redefinió la{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                  Certeza Legal en México.
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
                Nacimos con una convicción clara: erradicar el riesgo de los coyotes y la opacidad burocrática. Con sede física en Calzada de Tlalpan y gestión directa en CDMX, Morelos y Estado de México, brindamos garantía legal por escrito, factura deducible ante el SAT y custodia blindada de documentos.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
                <button
                  onClick={handleWhatsAppContact}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs sm:text-sm shadow-xl shadow-slate-950/15 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                >
                  <MessageCircle size={16} className="text-[#AFF94F]" />
                  <span>Hablar con un Asesor Senior</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleViewServices}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-heading font-bold text-xs sm:text-sm border border-slate-200/90 shadow-sm transition-all cursor-pointer"
                >
                  <span>Ver Catálogo de Trámites</span>
                  <ChevronRight size={15} />
                </button>
              </div>

            </div>

            {/* Key Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-slate-200">
              {[
                { number: '+14,500', label: 'Trámites Vehiculares Exitosos', sub: 'Sin un solo reporte adverso' },
                { number: '3 Estados', label: 'Cobertura Directa', sub: 'CDMX, Edomex y Morelos' },
                { number: '0 Coyotes', label: 'Trámite 100% Institucional', sub: 'Ventanillas oficiales y SEDENA' },
                { number: '100% SAT', label: 'Facturación Deducible', sub: 'CFDI 4.0 con desglose' }
              ].map((m, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm text-center">
                  <div className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
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
        {/* 2. SEDE FÍSICA & ATENCIÓN PRESENCIAL (MINIMALISTA)         */}
        {/* ========================================================== */}
        <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Clean Architectural Photo */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-200/50 bg-slate-100 group">
                  <img 
                    src={headquartersImg} 
                    alt="Sede Central de Ciclonatura en Calzada de Tlalpan CDMX" 
                    className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Clean, integrated frosted glass info pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#AFF94F] animate-pulse shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-heading font-black text-white truncate">
                          Calzada de Tlalpan #2144
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono truncate">
                          Sede Central Operativa · Corredor Sur, CDMX
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#AFF94F] bg-[#AFF94F]/10 px-2.5 py-1 rounded-md border border-[#AFF94F]/30 shrink-0 hidden sm:inline-block">
                      Atención con Cita
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Minimalist Typography & Micro-cards */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-medium mb-4">
                  <MapPin size={12} className="text-emerald-700" />
                  <span>Presencia Física Registrada</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.18]">
                  Oficinas Reales. <br className="hidden sm:block" />
                  <span className="text-emerald-800">Certeza Jurídica Inquebrantable.</span>
                </h2>

                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-normal">
                  A diferencia de intermediarios anónimos en redes sociales o gestores de banqueta, operamos desde una sede corporativa registrada en el sur de la Ciudad de México. Cuentas bancarias empresariales, contratos formales y puertas abiertas para cotejar tu expediente antes de solicitar un solo anticipo.
                </p>

                {/* 3 Minimalist Guarantee Stat Cards */}
                <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 text-center">
                    <div className="text-slate-900 font-heading font-black text-xs sm:text-sm">Razón Social</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">Empresa formal</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 text-center">
                    <div className="text-slate-900 font-heading font-black text-xs sm:text-sm">Cotejo Físico</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">Atención en sala</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70 text-center">
                    <div className="text-slate-900 font-heading font-black text-xs sm:text-sm">CFDI 4.0</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">SAT 100%</div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleWhatsAppContact}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-black text-slate-950 bg-[#AFF94F] hover:bg-[#9de441] px-5 py-3 rounded-full transition-all shadow-md shadow-[#AFF94F]/20 cursor-pointer"
                  >
                    <Calendar size={14} />
                    <span>Agendar Cita en Sede Central</span>
                    <ArrowRight size={14} />
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Lunes a Sábado · 9:00 a 19:00 hrs
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 3. TIMELINE BASADO EN SCROLL & CARDS CON LOTTIES           */}
        {/* ========================================================== */}
        <section className="py-20 sm:py-32 bg-slate-50/70 border-b border-slate-200/80 relative overflow-hidden">
          <div className="container max-w-5xl relative z-10">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 text-slate-700 text-[11px] font-mono font-semibold mb-3 shadow-sm">
                <Sparkles size={12} className="text-emerald-600" />
                <span className="uppercase tracking-wider">Principios Operativos</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                El Estándar que Exige tu Patrimonio
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                Cada procedimiento vehicular avanza a través de una línea de custodia blindada con 4 garantías inquebrantables.
              </p>
            </div>

            {/* Scroll Timeline Container */}
            <div ref={timelineRef} className="relative max-w-4xl mx-auto">
              
              {/* Background Guide Line */}
              <div className="absolute left-6 sm:left-8 md:left-10 top-8 bottom-8 w-1 bg-slate-200 rounded-full" />
              
              {/* Animated Progress Line based on Scroll */}
              <motion.div 
                style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
                className="absolute left-6 sm:left-8 md:left-10 top-8 bottom-8 w-1 bg-gradient-to-b from-emerald-500 via-teal-500 to-[#AFF94F] rounded-full z-0 shadow-sm shadow-emerald-500/30"
              />

              {/* Timeline Steps / Cards */}
              <div className="space-y-8 sm:space-y-12">
                {[
                  {
                    step: '01',
                    phase: 'Fase 01 · Legalidad Directa',
                    tag: 'Cero Coyotes',
                    title: 'Cero Coyotes, Cero Atajos Ilegales',
                    desc: 'Cada juego de placas, tarjeta con chip y trámite vehicular ingresa formalmente en las ventanillas de SEMOVI CDMX, SMyT Morelos o Movilidad Edomex. Nunca compramos láminas de dudosa procedencia ni utilizamos intermediarios sin acreditar.',
                    lottie: shieldAnim,
                    fallbackIcon: Shield,
                    badges: ['Ventanillas Oficiales SEMOVI / SMyT', 'CDMX · Edomex · Morelos', '100% Auditable']
                  },
                  {
                    step: '02',
                    phase: 'Fase 02 · Filtro Técnico',
                    tag: 'Auditoría Previa',
                    title: 'Auditoría Preventiva sin Costo',
                    desc: 'Antes de solicitar un solo anticipo, cotejamos tu factura en bases de datos federales del REPUVE y tesorerías estatales. Si detectamos anomalías, reporte de adeudo oculto o inconsistencias de serie, te alertamos de inmediato sin costo.',
                    lottie: checkCircleAnim,
                    fallbackIcon: CheckCircle2,
                    badges: ['Cruce Federal REPUVE', 'Validación de Adeudos', 'Alerta Inmediata Gratuita']
                  },
                  {
                    step: '03',
                    phase: 'Fase 03 · Custodia Blindada',
                    tag: 'Valija Foliada',
                    title: 'Trazabilidad con Valija Sellada',
                    desc: 'Tus documentos originales y placas troqueladas bajo norma SEDENA viajan en valijas de seguridad con precinto foliado único. El mensajero solo abre el precinto en tu presencia contra firma de acuse de entrega.',
                    lottie: lockAnim,
                    fallbackIcon: Lock,
                    badges: ['Precinto Foliado Inviolable', 'Apertura Presencial', 'Norma Oficial SEDENA']
                  },
                  {
                    step: '04',
                    phase: 'Fase 04 · Cumplimiento Fiscal',
                    tag: 'SAT CFDI 4.0',
                    title: 'Facturación SAT CFDI 4.0 al 100%',
                    desc: 'Emitimos factura fiscal desglosando los derechos gubernamentales pagados a tesorería y nuestros honorarios de gestión. 100% deducible para personas físicas con actividad empresarial y personas morales.',
                    lottie: checkmarkAnim,
                    fallbackIcon: Award,
                    badges: ['Desglose Oficial Derechos', '100% Deducible Fiscal', 'CFDI 4.0 con XML/PDF']
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 sm:gap-8">
                    
                    {/* Glowing Timeline Node */}
                    <div className="relative z-10 flex-shrink-0 mt-3 sm:mt-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-slate-200/90 shadow-md flex flex-col items-center justify-center transition-all duration-300 hover:border-emerald-500 hover:shadow-emerald-500/10">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase leading-none">Paso</span>
                        <span className="font-mono font-black text-sm sm:text-lg text-slate-900 leading-none mt-0.5">{item.step}</span>
                      </div>
                    </div>

                    {/* Timeline Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-200/90 transition-all duration-300 group"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                        
                        {/* Lottie Visual Container */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 border border-emerald-100/80 shadow-inner flex items-center justify-center shrink-0 p-3 group-hover:scale-105 transition-transform duration-300">
                          <LottiePlayer 
                            animationData={item.lottie} 
                            fallback={item.fallbackIcon}
                            className="w-14 h-14 sm:w-16 sm:h-16"
                          />
                        </div>

                        {/* Card Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                              {item.phase}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {item.tag}
                            </span>
                          </div>

                          <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 leading-snug">
                            {item.title}
                          </h3>

                          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                            {item.desc}
                          </p>

                          {/* Chips */}
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                            {item.badges.map((b, bIdx) => (
                              <span 
                                key={bIdx} 
                                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-700 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-lg"
                              >
                                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                                <span>{b}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.div>

                  </div>
                ))}
              </div>

              {/* Bottom Assurance Badge */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2.5 text-xs font-mono text-slate-600 bg-white px-5 py-2.5 rounded-full border border-slate-200/90 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Protocolo de custodia 100% auditable y monitoreado</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* 4. MESA DE CONTROL & ESPECIALISTAS                         */}
        {/* ========================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
          <div className="container max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                Estructura Organizacional
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Mesa de Control & Equipo Multidisciplinario
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                Detrás de cada trámite hay un equipo especializado cuidando cada aspecto de tu trámite.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  role: 'Gestores Vehiculares Certificados',
                  focus: 'CDMX · Edomex · Morelos',
                  desc: 'Acreditados ante dependencias de movilidad con más de una década de experiencia en ventanillas oficiales.'
                },
                {
                  role: 'Auditoría Jurídico-Documental',
                  focus: 'REPUVE & Facturación SAT',
                  desc: 'Abogados especialistas en derecho administrativo, cotejo de cartas factura y regularización de endosos.'
                },
                {
                  role: 'Coordinación B2B de Flotillas',
                  focus: 'Empresas, Uber & Constructoras',
                  desc: 'Ejecutivos dedicados para gestión de lotes masivos, entregas en patio corporativo y acuerdos con SLA formal.'
                },
                {
                  role: 'Custodia & Mensajería Corporativa',
                  focus: 'Valija Foliada Puerta a Puerta',
                  desc: 'Personal propio de mensajería verificado para traslado de láminas troqueladas y expedientes sensibles.'
                }
              ].map((team, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded inline-block mb-3">
                      {team.focus}
                    </span>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {team.role}
                    </h4>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                      {team.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5. MANIFIESTO INSTITUCIONAL (SOLO LA FRASE EN FONDO BLANCO) */}
        {/* ========================================================== */}
        <section className="py-24 sm:py-36 lg:py-44 bg-white border-t border-slate-200/80">
          <div className="container max-w-4xl mx-auto px-6 text-center">
            <blockquote className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.25]">
              «En México, poner un auto en regla nunca debió ser un acto de fe en una banqueta.
              <span className="block mt-3 text-emerald-800">
                Nacimos para transformar la incertidumbre en la certeza jurídica inquebrantable de estar al 100% ante la ley.»
              </span>
            </blockquote>
          </div>
        </section>

      </main>

      {/* Cinematic Curtain Reveal Footer */}
      <CinematicFooter />

    </div>
  );
}
