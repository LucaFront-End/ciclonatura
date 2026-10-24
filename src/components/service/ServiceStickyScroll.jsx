import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';

export default function ServiceStickyScroll({ service }) {
  if (!service || !service.stickyFeatures || service.stickyFeatures.length === 0) return null;

  const features = service.stickyFeatures;
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);

      const count = features.length;
      const step = Math.min(count - 1, Math.floor(progress * count));
      setActiveIndex(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [features.length]);

  const activeFeature = features[activeIndex] || features[0];

  return (
    <section 
      ref={containerRef}
      className="relative bg-white border-b border-slate-200/80 min-h-[240vh] sm:min-h-[260vh] select-none"
    >
      {/* Subtle Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Sticky Fullscreen Experience Container */}
      <div 
        className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10"
        style={{ position: 'sticky', top: 0 }}
      >
        
        {/* Minimal Header with Live Progress Line */}
        <div className="shrink-0 flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] animate-pulse" />
            <span className="text-xs font-heading font-black text-slate-900 tracking-tight">
              Pilares de Seguridad • {service.shortName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-bold text-slate-500">
              Garantía {activeIndex + 1} de {features.length}
            </span>
            {/* Smooth Progress Track */}
            <div className="w-24 sm:w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#AFF94F] transition-all duration-150 ease-out rounded-full shadow-[0_0_8px_rgba(175,249,79,0.5)]"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN DUAL COLUMN STICKY SCROLL DISPLAY                   */}
        {/* ======================================================== */}
        <div className="flex-1 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
          
          {/* ------------------------------------------------------ */}
          {/* LEFT COLUMN: Pure Dynamic Editorial Text & Metrics     */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Step Milestones Indicator (No Tabs - Pure Visual Progress Tracker) */}
            <div className="flex items-center gap-3 mb-4">
              {features.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div key={item.id} className="flex items-center gap-2">
                    <div 
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-slate-950 text-white scale-105 shadow-sm'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#AFF94F] shadow-[0_0_6px_#AFF94F]' : 'bg-slate-300'}`} />
                      <span>0{idx + 1}</span>
                    </div>
                    {idx < features.length - 1 && (
                      <div className={`w-4 h-0.5 transition-colors duration-300 ${activeIndex > idx ? 'bg-[#AFF94F]' : 'bg-slate-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dynamic Card Content with Smooth Fade Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5"
              >
                {/* Meta Category & Metric */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AFF94F]/25 border border-[#AFF94F]/80 text-slate-950 text-xs font-black font-heading shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                    {activeFeature.badge}
                  </span>

                  <div className="text-right">
                    <span className="font-heading font-black text-lg text-slate-950 block leading-none">
                      {activeFeature.metric}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {activeFeature.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight">
                  {activeFeature.title}
                </h3>

                <p className="text-slate-800 font-heading text-xs font-bold mt-1">
                  {activeFeature.subtitle}
                </p>

                <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                  {activeFeature.desc}
                </p>

                {/* Points Checklist */}
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                  {activeFeature.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-[#AFF94F] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="leading-snug font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* ------------------------------------------------------ */}
          {/* RIGHT COLUMN: Dynamic Full-Bleed Photograph             */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[460px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-200/90 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id + "-image"}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <img
                    src={activeFeature.imageUrl}
                    alt={activeFeature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay for Editorial Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6" />

                  {/* Bottom Image Caption Pill */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/60 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#AFF94F] shadow-[0_0_6px_#AFF94F] animate-ping" />
                      <span className="text-xs font-heading font-bold text-slate-900 line-clamp-1">
                        {activeFeature.imageCaption}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-950 font-black bg-[#AFF94F] px-2.5 py-0.5 rounded border border-[#AFF94F] shrink-0 shadow-2xs">
                      Cotejo en Vivo
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Minimal Scroll Instruction Indicator */}
        <div className="shrink-0 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-slate-900" />
            <span>Garantía oficial por escrito y factura SAT CFDI en cada etapa.</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-400">
            <span>Desplaza hacia abajo para avanzar</span>
            <ChevronDown size={13} className="animate-bounce text-slate-900" />
          </div>
        </div>

      </div>
    </section>
  );
}
