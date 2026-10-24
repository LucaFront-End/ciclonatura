import React from 'react';
import { FAQTabsCard } from '@/components/ui/faq-tabs-card';
import { 
  ShieldCheck, 
  HelpCircle, 
  FileCheck2, 
  Scale, 
  ArrowRight, 
  MessageCircle, 
  Clock, 
  CheckCircle2,
  Lock,
  PhoneCall
} from 'lucide-react';

export default function FAQSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="container max-w-7xl">
        
        {/* Top Header Row: Title on Left in 2 Lines, Excerpt + Button on Right in the same row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 sm:mb-16 pb-8 border-b border-slate-100">
          
          {/* Top Left: Badge & 2-Line Headline */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold uppercase tracking-wider font-heading mb-3 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <HelpCircle size={14} className="text-emerald-600" />
              <span>Certeza Jurídica & Transparencia</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.08]">
              Resolvemos tus dudas con <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                respaldo institucional.
              </span>
            </h2>
          </div>

          {/* Top Right: Excerpt Paragraph + Quick Action Button */}
          <div className="lg:col-span-6 flex flex-col justify-end space-y-4">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Emplacar o regularizar tu auto en México no debe ser un laberinto burocrático ni exponerte a coyotes. Respondemos con sustento legal, cotejo en REPUVE en tiempo real y factura deducible ante el SAT.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="https://wa.me/525547021799?text=Hola,%20quisiera%20consultar%20dudas%20sobre%20mi%20trámite%20vehicular"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs sm:text-sm shadow-md shadow-slate-950/15 transition-all group cursor-pointer"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>Hablar con un gestor</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock size={13} className="text-emerald-600" />
                <span>Respuesta en menos de 10 min</span>
              </div>
            </div>
          </div>

        </div>

        {/* Main Content Area Below: FAQs on Left (8 cols) + Contact / Security Card on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Left: Interactive FAQ Tabs Card */}
          <div className="lg:col-span-8">
            <FAQTabsCard 
              className="w-full shadow-xl shadow-slate-900/5 border-slate-200" 
              showFooter={false}
            />
          </div>

          {/* Right: Contact & Concierge Support Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-slate-900/5 select-none relative overflow-hidden">
              
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

              {/* Status Header */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-heading font-bold text-slate-900">
                    Mesa de Control Legal
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 uppercase">
                  En línea
                </span>
              </div>

              {/* Concierge Desk Profile */}
              <div className="flex items-center gap-3.5 py-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white flex items-center justify-center font-heading font-black text-sm shadow-sm shrink-0 border border-emerald-500/20">
                  CN
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5 truncate">
                    <span>Atención Vehicular Directa</span>
                    <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight truncate">
                    Gestores certificados CDMX & Morelos
                  </p>
                </div>
              </div>

              {/* 3 Core Trust Guarantees */}
              <div className="space-y-3 py-4 border-y border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                    <Scale size={14} />
                  </div>
                  <div>
                    <strong className="text-xs text-slate-900 block font-heading font-bold">
                      Auditoría previa sin costo
                    </strong>
                    <span className="text-[11px] text-slate-500 leading-snug block">
                      Cotejamos REPUVE y finanzas antes de cualquier anticipo.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <strong className="text-xs text-slate-900 block font-heading font-bold">
                      Valija foliada sellada
                    </strong>
                    <span className="text-[11px] text-slate-500 leading-snug block">
                      Entrega en mano con folio único y acuse firmado.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-lime-50 text-lime-800 flex items-center justify-center shrink-0 mt-0.5 border border-lime-200/80">
                    <FileCheck2 size={14} />
                  </div>
                  <div>
                    <strong className="text-xs text-slate-900 block font-heading font-bold">
                      Factura SAT deducible al 100%
                    </strong>
                    <span className="text-[11px] text-slate-500 leading-snug block">
                      CFDI oficial con desglose de derechos gubernamentales.
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Action WhatsApp CTA */}
              <div className="pt-4 space-y-2.5">
                <a
                  href="https://wa.me/525547021799?text=Hola,%20tengo%20un%20caso%20específico%20y%20quisiera%20asesoría%20vehicular%20con%20Ciclonatura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs sm:text-sm shadow-md shadow-slate-950/15 transition-all group cursor-pointer"
                >
                  <MessageCircle size={16} className="text-emerald-400" />
                  <span>Enviar mensaje por WhatsApp</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <Clock size={12} className="text-emerald-600" />
                  <span>Horario: Lun a Sáb · 9:00 a 19:00 hrs</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
