import React, { useEffect } from 'react';
import CurtainSplitHero from '@/components/ui/curtain-split-hero';
import ServiceProcessTimeline from './service/ServiceProcessTimeline';
import ServiceStickyScroll from './service/ServiceStickyScroll';
import ServiceRequirementsMatrix from './service/ServiceRequirementsMatrix';
import ServiceCostCalculator from './service/ServiceCostCalculator';
import CinematicFooter from '@/components/ui/motion-footer';
import Navbar from './Navbar';
import { SERVICES_DATA } from '@/data/servicesData';
import { ArrowRight } from 'lucide-react';

export default function ServicePage({ serviceSlug, onNavigateHome, onSelectService, onNavigateContact, onNavigateNosotros }) {
  const service = SERVICES_DATA[serviceSlug] || SERVICES_DATA['emplacamiento-morelos'];

  // Scroll to top whenever service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceSlug]);

  const allServicesList = Object.values(SERVICES_DATA);

  const handleWhatsAppCTA = () => {
    const text = encodeURIComponent(
      `Hola Ciclonatura, deseo cotizar y agendar el trámite de ${service.name}. Deseo asesoría directa y tiempos de entrega oficial.`
    );
    window.open(`https://wa.me/525547021799?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative flex flex-col font-sans selection:bg-[#AFF94F] selection:text-slate-950">
      
      {/* Light Mode Floating Navigation Bar */}
      <Navbar 
        onNavigateHome={onNavigateHome} 
        onSelectService={onSelectService} 
        onNavigateContact={onNavigateContact} 
        onNavigateNosotros={onNavigateNosotros}
      />

      <main className="flex-1 relative z-10 bg-slate-50 shadow-2xl border-b border-slate-200/80">
        
        {/* ========================================================== */}
        {/* 1. FULL-WIDTH, IMMERSIVE HERO WITH BILATERAL CURTAIN SPLIT */}
        {/* ========================================================== */}
        <CurtainSplitHero
          images={service.heroImages}
          monograph={service.heroMonograph}
          title={service.heroTitle}
          description={service.heroSubtitle}
          badge={service.badge}
          onNavigateHome={onNavigateHome}
          onSelectService={onSelectService}
          currentSlug={service.slug}
          allServices={allServicesList}
          turnaround={service.turnaround}
          officialAuthority={service.officialAuthority}
          onCtaClick={handleWhatsAppCTA}
        />

        {/* ========================================================== */}
        {/* 2. SCROLL-BASED OPERATIONAL PROCESS TIMELINE               */}
        {/* ========================================================== */}
        <ServiceProcessTimeline service={service} />

        {/* ========================================================== */}
        {/* 3. SCROLL-BASED STICKY TEXT (LEFT) + DYNAMIC IMAGE (RIGHT) */}
        {/* ========================================================== */}
        <ServiceStickyScroll service={service} />

        {/* ========================================================== */}
        {/* 4. INTERACTIVE REQUIREMENTS & DOCUMENTATION MATRIX         */}
        {/* ========================================================== */}
        <ServiceRequirementsMatrix service={service} />

        {/* ========================================================== */}
        {/* 5. LIVE COST CALCULATOR & FAST-TRACK WHATSAPP BOOKING      */}
        {/* ========================================================== */}
        <ServiceCostCalculator service={service} />

        {/* ========================================================== */}
        {/* 6. RELATED SERVICES CATALOG SWITCHER                      */}
        {/* ========================================================== */}
        <section className="py-16 sm:py-20 bg-slate-100/70 border-b border-slate-200/80 select-none">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                Catálogo de Trámites Vehiculares
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Explora Otros Servicios Oficiales
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allServicesList
                .filter(s => s.slug !== service.slug)
                .map(item => (
                  <div
                    key={item.id}
                    onClick={() => onSelectService(item.slug)}
                    className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#AFF94F] transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-black text-slate-950 bg-[#AFF94F]/30 px-2 py-0.5 rounded border border-[#AFF94F]/70 inline-block mb-2">
                        {item.code}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-slate-900 group-hover:text-black transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">
                        {item.tagline}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-900 group-hover:text-black font-heading font-black">
                      <span className="group-hover:underline decoration-[#AFF94F] decoration-2">Ver servicio</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-slate-900" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

      </main>

      {/* Cinematic Curtain Reveal Motion Footer */}
      <CinematicFooter />

    </div>
  );
}
