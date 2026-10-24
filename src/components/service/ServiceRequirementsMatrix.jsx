import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Check, 
  AlertCircle,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function ServiceRequirementsMatrix({ service }) {
  if (!service || !service.requirements || service.requirements.length === 0) return null;

  const [activeTab, setActiveTab] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (tabIdx, itemIdx) => {
    const key = `${tabIdx}-${itemIdx}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const currentCategory = service.requirements[activeTab] || service.requirements[0];
  const totalItems = currentCategory.items.length;
  const completedCount = currentCategory.items.filter((_, i) => checkedItems[`${activeTab}-${i}`]).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);
  const isAllCompleted = completedCount === totalItems && totalItems > 0;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/70 border-b border-slate-200/80 relative overflow-hidden select-none">
      
      {/* Soft Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#AFF94F]/15 via-slate-100/40 to-lime-100/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-800 text-xs font-semibold font-heading mb-3 shadow-2xs backdrop-blur-sm">
            <FileText size={12} className="text-slate-900" />
            <span>Checklist & Auditoría Documental</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Requisitos Oficiales para{' '}
            <span className="text-slate-950 underline decoration-[#AFF94F] decoration-4 underline-offset-4">{service.shortName}</span>
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Verifica tus documentos antes de iniciar. Puedes enviar fotos legibles por WhatsApp para una pre-revisión gratuita en 15 minutos.
          </p>

          {/* ======================================================== */}
          {/* AESTHETIC MINIMALIST SEGMENTED TOGGLE (Framer Motion)    */}
          {/* ======================================================== */}
          <div className="flex justify-center mt-7">
            <div className="inline-flex p-1.5 bg-slate-100/90 backdrop-blur-md rounded-full border border-slate-200/90 shadow-inner shadow-slate-900/5 relative max-w-full overflow-x-auto no-scrollbar">
              {service.requirements.map((req, idx) => {
                const isActive = activeTab === idx;
                const reqCompleted = req.items.filter((_, i) => checkedItems[`${idx}-${i}`]).length;
                const isTabDone = reqCompleted === req.items.length && req.items.length > 0;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`relative px-4 sm:px-6 py-2 rounded-full text-xs font-heading font-bold transition-colors duration-200 z-10 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {/* Animated Sliding Pill Highlight */}
                    {isActive && (
                      <motion.div
                        layoutId="activeRequirementsTabPill"
                        className="absolute inset-0 bg-slate-950 rounded-full shadow-md shadow-slate-950/20 z-[-1]"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}

                    <span>{req.category}</span>

                    {/* Subtle Count Badge */}
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-all duration-200 font-bold ${
                        isActive
                          ? isTabDone 
                            ? 'bg-[#AFF94F] text-slate-950 shadow-2xs'
                            : 'bg-white/20 text-white'
                          : isTabDone
                            ? 'bg-[#AFF94F]/30 text-slate-950'
                            : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {isTabDone ? 'Listo ✓' : `${reqCompleted}/${req.items.length}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE CARD WITH SILKY TRANSITION ON TOGGLE        */}
        {/* ======================================================== */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-900/5 max-w-2xl mx-auto overflow-hidden">
          
          {/* Subtle Ambient Corner Accent */}
          <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#AFF94F]/10 rounded-full blur-2xl" />

          {/* Animated Card Body driven by Active Tab */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              
              {/* Category Header & Dynamic Progress */}
              <div className="mb-6 pb-5 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-slate-950" />
                      <h3 className="text-sm font-heading font-black text-slate-900 tracking-tight">
                        {currentCategory.category}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Marca los documentos que ya tienes listos para agilizar tu trámite:
                    </p>
                  </div>

                  {/* Dynamic Completion Badge */}
                  <div className="shrink-0">
                    <span 
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-all duration-300 ${
                        isAllCompleted
                          ? 'bg-[#AFF94F] text-slate-950 border-[#AFF94F] shadow-xs font-black'
                          : 'bg-[#AFF94F]/20 text-slate-950 border-[#AFF94F]/60'
                      }`}
                    >
                      {isAllCompleted ? (
                        <>
                          <CheckCircle2 size={13} className="text-slate-950" />
                          <span>Expediente Completo (100%)</span>
                        </>
                      ) : (
                        <span>{completedCount} de {totalItems} listos ({progressPercent}%)</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Animated Smooth Progress Track */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3.5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#AFF94F] to-[#8ee622] rounded-full shadow-[0_0_8px_rgba(175,249,79,0.5)]"
                    initial={false}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Checklist Items with Micro-Stagger */}
              <div className="space-y-2.5">
                {currentCategory.items.map((item, idx) => {
                  const isChecked = !!checkedItems[`${activeTab}-${idx}`];

                  return (
                    <motion.div
                      key={idx}
                      custom={idx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.035, duration: 0.2 }}
                      whileHover={{ scale: 1.005, x: 2 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => toggleCheck(activeTab, idx)}
                      className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isChecked
                          ? 'bg-[#AFF94F]/15 border-[#AFF94F]/60 shadow-2xs'
                          : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      {/* Checkbox Icon */}
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                          isChecked
                            ? 'bg-[#AFF94F] border-[#AFF94F] text-slate-950 shadow-2xs'
                            : 'bg-white border-slate-300 hover:border-[#AFF94F]'
                        }`}
                      >
                        <AnimatePresence>
                          {isChecked && (
                            <motion.div
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Check size={12} strokeWidth={3} className="text-slate-950" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Item Text */}
                      <div className="flex-1 text-xs sm:text-[13px] text-slate-800 leading-snug">
                        <span className={`transition-all duration-200 ${
                          isChecked ? 'line-through text-slate-400 font-normal' : 'font-medium'
                        }`}>
                          {item}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Anti-fraud Security Advice Alert */}
          <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Aviso de Seguridad Ciclonatura:</strong> Para iniciar el cotejo sólo requerimos fotografías o escaneos legibles vía WhatsApp o portal. 
              <strong> Nunca entregues documentos originales</strong> a personal que no cuente con identificación oficial y contrato foliado de nuestra sede en Calzada de Tlalpan.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
