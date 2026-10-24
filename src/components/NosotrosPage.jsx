import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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
  ExternalLink
} from 'lucide-react';
import Navbar from './Navbar';
import CinematicFooter from './ui/motion-footer';
import headquartersImg from '../assets/ciclonatura_headquarters.jpg';
import flotillaPatioImg from '../assets/services/flotilla_corporativa_patio.jpg';

export default function NosotrosPage({ onNavigateHome, onSelectService, onNavigateContact, onNavigateNosotros, onNavigateFlotillas }) {
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
        {/* 2. SEDE FÍSICA & TRANSPARENCIA TOTAL                      */}
        {/* ========================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Image of HQ */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group">
                  <img 
                    src={headquartersImg} 
                    alt="Sede Central de Ciclonatura en Calzada de Tlalpan CDMX" 
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="bg-[#AFF94F] text-slate-950 text-[10px] font-mono font-black px-2.5 py-1 rounded-md uppercase tracking-wider inline-block mb-2">
                      Sede Central CDMX
                    </span>
                    <h4 className="font-heading text-lg font-bold">
                      Calzada de Tlalpan #2144, Ciudad de México
                    </h4>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Oficinas corporativas propias y recepción para cotejo de expedientes.
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 hidden sm:flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#AFF94F]/20 text-[#AFF94F] flex items-center justify-center">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-heading">Atención con Cita Previa</div>
                    <div className="text-[10px] text-slate-400">Lunes a Sábado de 9:00 a 19:00 hrs</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Transparency */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
                  <MapPin size={12} className="text-red-500" />
                  <span>Ubicación Estratégica en el Corredor Sur</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  Oficinas Reales. Personas Reales. Certeza Jurídica Inquebrantable.
                </h2>

                <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-normal">
                  A diferencia de los intermediarios anónimos de redes sociales o los tramitadores de banqueta que desaparecen con tus documentos, en Ciclonatura operamos desde una sede corporativa registrada, con razón social visible y cuentas bancarias empresariales.
                </p>

                <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-normal">
                  Nuestros clientes particulares y directores de flotilla son siempre bienvenidos a nuestras oficinas para entregar sus carpetas, revisar estados de cuenta o simplemente tomar un café mientras nuestros gestores auditan su expediente ante el REPUVE.
                </p>

                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    <span>Razón social mexicana formal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    <span>Contratos por escrito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    <span>CFDI 4.0 con validez SAT</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 3. LOS 4 PILARES INQUEBRANTABLES DE NUESTRO SERVICIO        */}
        {/* ========================================================== */}
        <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
          <div className="container max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                Nuestros Principios Operativos
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                El Estándar que Exige tu Patrimonio
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                Cada procedimiento vehicular está blindado bajo cuatro garantías fundamentales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Scale,
                  title: '1. Cero Coyotes, Cero Atajos Ilegales',
                  desc: 'Cada juego de placas, tarjeta con chip y trámite vehicular ingresa formalmente en las ventanillas de SEMOVI CDMX, SMyT Morelos o Movilidad Edomex. Nunca compramos láminas de dudosa procedencia ni utilizamos intermediarios sin acreditar.'
                },
                {
                  icon: FileText,
                  title: '2. Auditoría Preventiva sin Costo',
                  desc: 'Antes de solicitar un solo anticipo, cotejamos tu factura en bases de datos federales del REPUVE y tesorerías estatales. Si detectamos anomalías, reporte de adeudo oculto o inconsistencias de serie, te alertamos de inmediato sin costo.'
                },
                {
                  icon: Lock,
                  title: '3. Trazabilidad con Valija Sellada',
                  desc: 'Tus documentos originales y placas troqueladas bajo norma SEDENA viajan en valijas de seguridad con precinto foliado único. El mensajero solo abre el precinto en tu presencia contra firma de acuse de entrega.'
                },
                {
                  icon: Award,
                  title: '4. Facturación SAT CFDI 4.0 al 100%',
                  desc: 'Emitimos factura fiscal desglosando los derechos gubernamentales pagados a tesorería y nuestros honorarios de gestión. 100% deducible para personas físicas con actividad empresarial y personas morales.'
                }
              ].map((pilar, idx) => {
                const Icon = pilar.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center mb-4">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 mb-2">
                        {pilar.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {pilar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
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
        {/* 5. NUESTRO MANIFIESTO INSTITUCIONAL                       */}
        {/* ========================================================== */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          
          <div className="container max-w-4xl relative z-10 text-center">
            <span className="text-[11px] font-mono font-bold text-[#AFF94F] uppercase tracking-widest block mb-4">
              Manifiesto Ciclonatura
            </span>

            <blockquote className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed text-slate-100">
              «En México, el trámite vehicular se asoció históricamente con la incertidumbre de la banqueta y el temor a documentos apócrifos. Ciclonatura nació para romper ese paradigma: profesionalizar la gestión, blindar la seguridad jurídica y garantizar que cada conductor circule con la tranquilidad inquebrantable de estar al 100% ante la ley.»
            </blockquote>

            <div className="mt-8 flex flex-col items-center">
              <div className="w-12 h-1 bg-[#AFF94F] rounded-full mb-3" />
              <div className="font-heading font-black text-white text-base">Dirección General & Mesa de Control</div>
              <div className="text-xs text-slate-400 font-mono">Ciclonatura México · Calzada de Tlalpan #2144, CDMX</div>
            </div>

            <div className="pt-10 mt-10 border-t border-white/10 flex flex-wrap justify-center gap-4">
              <button
                onClick={handleWhatsAppContact}
                className="px-6 py-3.5 rounded-full bg-[#AFF94F] hover:bg-[#9de441] text-slate-950 font-heading font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-[#AFF94F]/20 transition-all cursor-pointer"
              >
                <Phone size={15} />
                <span>Agendar Consulta o Visita a Sede Tlalpan</span>
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
