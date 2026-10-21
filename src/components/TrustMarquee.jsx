import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Zap, 
  FileCheck 
} from 'lucide-react';

const MARQUEE_ITEMS = [
  { icon: Award, text: '+1,000 Trámites Concluidos con Éxito', highlight: true },
  { icon: Zap, text: '80% Más Rápido con Ciclonatura', highlight: false },
  { icon: ShieldCheck, text: '100% Legalidad y Validez Oficial', highlight: true },
  { icon: Clock, text: 'Sin Filas Ni Citas Complicadas', highlight: false },
  { icon: Building2, text: 'Atención Especial a Flotillas Empresariales', highlight: false },
  { icon: Sparkles, text: '99% Calificación de Satisfacción', highlight: true },
  { icon: FileCheck, text: 'Cero Riesgo de Fraude o Coyotes', highlight: false },
  { icon: CheckCircle2, text: 'Cobertura CDMX, Edomex y Morelos', highlight: true }
];

export default function TrustMarquee() {
  return (
    <div className="w-full overflow-hidden py-6 bg-white border-y border-slate-200/80 relative">
      {/* Side gradient fades for seamless infinite illusion */}
      <div className="absolute top-0 left-0 bottom-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 35
        }}
        className="flex whitespace-nowrap w-max items-center gap-6"
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                item.highlight 
                  ? 'bg-lime-50 border border-lime-200 text-lime-900 shadow-xs' 
                  : 'bg-slate-100/80 border border-slate-200/60 text-slate-700'
              }`}
            >
              <IconComponent 
                size={16} 
                className={item.highlight ? 'text-lime-600' : 'text-sky-600'} 
              />
              <span>{item.text}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
