import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  FileText, 
  Car, 
  Calendar,
  Lock,
  ChevronRight,
  ExternalLink,
  Check
} from 'lucide-react';
import Navbar from './Navbar';
import CinematicFooter from './ui/motion-footer';
import headquartersImg from '../assets/ciclonatura_headquarters.jpg';
import valijaImg from '../assets/services/valija_seguridad_notarial.jpg';

// Safe confetti trigger
const triggerConfetti = async () => {
  try {
    const confettiModule = await import('canvas-confetti');
    const confetti = confettiModule.default || confettiModule;
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  } catch (err) {
    // Graceful fallback
  }
};

const SERVICE_OPTIONS = [
  'Emplacamiento en Morelos (Cero Tenencia)',
  'Cambio de Propietario Digital (SEMOVI / Edomex)',
  'Altas, Bajas & Reposición Urgente',
  'Auditoría de Tenencias & Adeudos Fiscales',
  'Gestoría de Flotillas Corporativas B2B',
  'Consulta General o Cotejo Documental'
];

export default function ContactPage({ onNavigateHome, onSelectService }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceInterest: SERVICE_OPTIONS[0],
    preferredContact: 'whatsapp',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [folio, setFolio] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Ingresa tu nombre completo';
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) errs.phone = 'Ingresa un WhatsApp válido a 10 dígitos';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newFolio = `CN-${Math.floor(100000 + Math.random() * 900000)}`;
    setFolio(newFolio);
    setSubmitted(true);
    triggerConfetti();

    // Prepare WhatsApp message URL
    const text = encodeURIComponent(
      `🏛️ *CONTACTO DIRECTO CICLONATURA*\n` +
      `*Folio:* #${newFolio}\n` +
      `*Nombre:* ${formData.fullName}\n` +
      `*WhatsApp:* ${formData.phone}\n` +
      (formData.email ? `*Correo:* ${formData.email}\n` : '') +
      `*Trámite:* ${formData.serviceInterest}\n` +
      `*Contacto preferido:* ${formData.preferredContact.toUpperCase()}\n` +
      (formData.message ? `*Mensaje:* ${formData.message}\n` : '') +
      `\nHola Ciclonatura, he registrado mi mensaje en la página de contacto. Solicito asesoría vehicular y tiempos de atención.`
    );

    // Open WhatsApp in new tab after tiny delay so user sees confirmation card
    setTimeout(() => {
      window.open(`https://wa.me/525547021799?text=${text}`, '_blank');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#AFF94F] selection:text-slate-950">
      
      {/* Light Mode Header Navigation */}
      <Navbar 
        onNavigateHome={onNavigateHome} 
        onSelectService={onSelectService} 
        onNavigateContact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <main className="flex-1 pt-28 sm:pt-36 pb-20 relative overflow-hidden">
        
        {/* Ambient Top Glows */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#AFF94F]/20 via-slate-100/60 to-lime-100/15 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <button 
              onClick={onNavigateHome}
              className="hover:text-slate-950 transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="font-semibold text-slate-900">Contacto Directo</span>
          </div>

          {/* Page Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AFF94F]/20 border border-[#AFF94F]/60 text-slate-950 text-xs font-heading font-black mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] animate-pulse" />
              <span>Mesa de Control & Atención Vehicular</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Comunícate con Gestores Certificados en{' '}
              <span className="text-slate-950 underline decoration-[#AFF94F] decoration-4 underline-offset-4">CDMX</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
              Sin coyotes ni intermediarios. Asesoría directa por abogados y gestores vehiculares con cotejo legal y factura fiscal SAT.
            </p>
          </div>

          {/* ======================================================== */}
          {/* 4 DIRECT VIP CONTACT CHANNELS (Grid)                     */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            
            {/* 1. WhatsApp Oficial */}
            <a
              href="https://wa.me/525547021799?text=Hola%20Ciclonatura,%20deseo%20asesoria%20vehicular%20para%20un%20tramite"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#AFF94F] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[#AFF94F]/20 text-slate-950 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#AFF94F] transition-all">
                  <MessageSquare size={20} />
                </div>
                <span className="text-[10px] font-mono font-black text-slate-950 bg-[#AFF94F] px-2 py-0.5 rounded border border-[#AFF94F]">
                  Respuesta en &lt;15 min
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-2.5">
                  WhatsApp Oficial
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Atención prioritaria y pre-revisión de fotos de tu factura o placas en vivo.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-950">
                <span>+52 55 4702 1799</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 2. Sede Central Tlalpan */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-400 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <Building2 size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Sede Central CDMX
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-2.5">
                  Calzada de Tlalpan
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Calz. de Tlalpan #1820, Col. Country Club, Coyoacán, CDMX.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                <span>Cita Previa en Sede</span>
                <MapPin size={13} />
              </div>
            </div>

            {/* 3. Conmutador Telefónico */}
            <a
              href="tel:+525547021799"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Línea Telefónica
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-2.5">
                  Conmutador Central
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Atención telefónica de lunes a sábado para seguimiento de expedientes.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
                <span>(55) 4702 1799</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 4. Correo Notarial y CFDI */}
            <a
              href="mailto:contacto@ciclonatura.com.mx"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#AFF94F] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[#AFF94F]/20 text-slate-950 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#AFF94F] transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-[10px] font-mono font-black text-slate-950 bg-[#AFF94F] px-2 py-0.5 rounded border border-[#AFF94F]">
                  B2B & Facturación
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 mt-2.5">
                  Mesa de Expedientes
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Envío de constancias fiscales, contratos de flotillas y facturas SAT.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-950">
                <span className="truncate">contacto@ciclonatura.com.mx</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </a>

          </div>

          {/* ======================================================== */}
          {/* MAIN DUAL COLUMN: INTERACTIVE FORM + HEADQUARTERS INFO   */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-900/5">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Envía tu Consulta o Agenda Cita
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Recibe asesoría directa y folio oficial en menos de 15 minutos.
                  </p>
                </div>
                <span className="font-mono text-xs font-black text-slate-950 bg-[#AFF94F] px-2.5 py-1 rounded-md border border-[#AFF94F]">
                  Folio Activo
                </span>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#AFF94F]/30 text-slate-950 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-slate-900">
                    ¡Mensaje Registrado con Éxito!
                  </h3>
                  <div className="inline-block bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-800">
                    Folio Oficial: #{folio}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Hemos abierto la ventana de WhatsApp oficial con tu mensaje estructurado. Si no se abrió automáticamente, haz clic abajo:
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://wa.me/525547021799"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#AFF94F] hover:bg-[#9ee83e] text-slate-950 font-heading font-black text-xs sm:text-sm shadow-lg shadow-[#AFF94F]/25 transition-all cursor-pointer"
                    >
                      <MessageSquare size={16} />
                      <span>Abrir Chat de WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Nombre y Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                        Nombre Completo *
                      </label>
                      <input 
                        type="text"
                        placeholder="Ej. Ing. Carlos Mendoza"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                          errors.fullName ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus:border-emerald-500'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                        WhatsApp (10 dígitos) *
                      </label>
                      <input 
                        type="tel"
                        placeholder="55 1234 5678"
                        maxLength={14}
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                          errors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus:border-emerald-500'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Correo y Trámite */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                        Correo Electrónico (Opcional)
                      </label>
                      <input 
                        type="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                        Trámite de Interés
                      </label>
                      <select 
                        value={formData.serviceInterest}
                        onChange={e => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 text-slate-800"
                      >
                        {SERVICE_OPTIONS.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Canal de Contacto Preferido */}
                  <div>
                    <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                      Canal de Respuesta Preferido
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                        { id: 'llamada', label: 'Llamada', icon: Phone },
                        { id: 'correo', label: 'Correo', icon: Mail }
                      ].map(ch => (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContact: ch.id })}
                          className={`py-2 px-3 rounded-xl border text-center text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            formData.preferredContact === ch.id
                              ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <ch.icon size={13} />
                          <span>{ch.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mensaje o Comentarios */}
                  <div>
                    <label className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider block mb-1.5">
                      Detalles de tu Vehículo o Trámite (Opcional)
                    </label>
                    <textarea 
                      rows={3}
                      placeholder="Ej. Deseo dar de alta placas de Morelos para un BMW 2024 factura original, o cotizar baja de placas de Edomex..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#AFF94F] hover:bg-[#9ee83e] text-slate-950 font-heading font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-[#AFF94F]/25 flex items-center justify-center gap-2 transition-all hover:scale-101 active:scale-99 cursor-pointer"
                    >
                      <Send size={15} />
                      <span>Enviar Consulta & Iniciar en WhatsApp</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
                    <Lock size={12} className="text-slate-900" />
                    <span>Tus datos están protegidos bajo secreto profesional y privacidad CFDI 4.0.</span>
                  </div>

                </form>
              )}

            </div>

            {/* Right Column: Headquarters, Maps & Working Hours */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Sede Card with Photo */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-900/5">
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                  <img 
                    src={headquartersImg} 
                    alt="Sede Central Ciclonatura Calzada de Tlalpan" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <span className="text-[10px] font-mono font-black bg-[#AFF94F] text-slate-950 px-2 py-0.5 rounded shadow-2xs">
                        Sede Central Propia
                      </span>
                      <h4 className="font-heading font-black text-base mt-1">
                        Calzada de Tlalpan 1820
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3 text-xs text-slate-700">
                    <MapPin size={16} className="text-slate-900 shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <strong>Dirección:</strong> Calz. de Tlalpan No. 1820, Col. Country Club, Coyoacán, C.P. 04220, Ciudad de México.
                      <div className="text-[11px] text-slate-400 mt-1">
                        A 3 minutos de Metro General Anaya • Estacionamiento privado
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-slate-700 pt-3 border-t border-slate-100">
                    <Clock size={16} className="text-slate-900 shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <strong>Horario de Atención:</strong>
                      <div className="text-slate-500 mt-0.5">
                        Lunes a Viernes: 9:00 a 19:00 hrs<br />
                        Sábados: 9:00 a 14:00 hrs
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-slate-700 pt-3 border-t border-slate-100">
                    <ShieldCheck size={16} className="text-slate-900 shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <strong>Custodia Segura:</strong>
                      <div className="text-slate-500 mt-0.5">
                        Bóveda de expedientes físicos y entrega en valijas selladas con precinto de seguridad numerado.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Maps Action */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white flex items-center justify-between shadow-xl">
                <div>
                  <div className="text-xs font-bold font-heading">¿Cómo llegar a nuestra sede?</div>
                  <div className="text-[11px] text-slate-400">Abre la ubicación en Google Maps</div>
                </div>
                <a
                  href="https://maps.google.com/?q=Calzada+de+Tlalpan+1820+Country+Club+Coyoacan+CDMX"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white text-slate-950 font-heading font-bold text-xs flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
                >
                  <span>Ver Mapa</span>
                  <ExternalLink size={12} />
                </a>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Unified Motion Footer */}
      <CinematicFooter />

    </div>
  );
}
