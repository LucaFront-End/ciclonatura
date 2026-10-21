import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Car, 
  Building2, 
  Calculator, 
  HelpCircle, 
  ChevronRight
} from 'lucide-react';

const SECTIONS_ROADMAP = [
  {
    id: 1,
    name: '1. Navbar Flotante (Light Mode)',
    tag: 'Fase 1: Implementado',
    status: 'ready',
    icon: Sparkles,
    summary: 'Navegación minimalista en fondo claro con glassmorphism, indicador de asesores en WhatsApp y menú de trámites.',
    contentFromSite: 'Logo oficial Ciclonatura, enlaces a Trámites (CDMX, Edomex, Morelos), Flotillas, Cero Fraudes y CTA principal.',
    ideas: [
      'Indicador pulsante verde esmeralda "WhatsApp Activo"',
      'Menú desplegable suave con tiempos estimados',
      'Acceso rápido al mapa de ruta y cotización'
    ]
  },
  {
    id: 2,
    name: '2. Perspective Tunnel Hero 3D (21st.dev)',
    tag: 'Fase 1: Implementado (En Revisión)',
    status: 'ready',
    icon: Car,
    summary: 'Túnel espacial 3D inmersivo con scroll/rueda de mouse en fondo claro. Vuela a través de tarjetas con autos, placas y trámites oficiales.',
    contentFromSite: 'Tu Gestoría Vehicular segura y sin riesgos en México. En Ciclonatura regularizamos tus trámites vehiculares de forma rápida, segura y sin intermediarios.',
    ideas: [
      'Desplazamiento Z-space continuo con tarjetas de autos y papelería legal',
      'Control deslizador de avance del túnel 3D',
      'Modal interactivo al hacer clic en cualquier tarjeta del túnel con botón a WhatsApp',
      'Fondo claro minimalista con iluminación suave y matriz de puntos'
    ]
  },
  {
    id: 3,
    name: '3. Cinta de Confianza y Métricas (Marquee Ticker)',
    tag: 'Fase 1: Implementado',
    status: 'ready',
    icon: CheckCircle2,
    summary: 'Cinta infinita de autoridad para generar credibilidad inmediata.',
    contentFromSite: '+1000 Trámites completados | +180 Ciudades | +7 Años de experiencia | 99% Satisfacción | Procesos oficiales SEMOVI.',
    ideas: [
      'Marquee continuo sin pausas en fondo blanco',
      'Badges en verde lima y azul cielo institucional'
    ]
  },
  {
    id: 4,
    name: '4. Catálogo Interactivo de Trámites',
    tag: 'Fase 2: Próxima Sección',
    status: 'planned',
    icon: FileText,
    summary: 'Buscador y filtros inteligentes de trámites por estado y tipo de vehículo (autos, motos, flotillas).',
    contentFromSite: 'Alta de placas CDMX, Verificación EDOMEX, Reemplacamiento EDOMEX, Permiso Morelos (30 días), Cambio de propietario, Refrendo, Reposición de tarjeta.',
    ideas: [
      'Pestañas dinámicas con animación tipo sliding pill',
      'Fichas de trámites con badges de tiempo estimado (ej: 24-48 hrs, 5-12 días)',
      'Requisitos claros en acordeón desplegable'
    ]
  },
  {
    id: 5,
    name: '5. Matriz de Seguridad Anti-Fraude (Ciclonatura vs Coyotes)',
    tag: 'Fase 2: Clave para Conversión',
    status: 'planned',
    icon: ShieldCheck,
    summary: 'Comparativa interactiva y transparente que educa al usuario sobre cómo evitar estafas en trámites vehiculares.',
    contentFromSite: 'Artículo destacado: ¿Cómo identificar y evitar fraudes en trámites vehiculares? Desconfía de gestores exprés, perfiles falsos y pagos sin comprobante.',
    ideas: [
      'Tabla comparativa interactiva: Ciclonatura vs Gestores informales/Coyotes',
      'Sellos de verificación legal y advertencias de señales de fraude'
    ]
  },
  {
    id: 6,
    name: '6. Flotillas Empresariales & Soluciones B2B',
    tag: 'Fase 2',
    status: 'planned',
    icon: Building2,
    summary: 'Propuesta de valor para empresas, agencias automotrices, compañías de logística y conductores de apps.',
    contentFromSite: 'Empresas que confían en nuestra gestoría vehicular. Con Ciclonatura, las flotillas empresariales operan sin contratiempos.',
    ideas: [
      'Logos de marcas/flotillas en escala de grises con iluminación al hover',
      'Beneficios corporativos: facturación deducible, ejecutivo de cuenta asignado'
    ]
  },
  {
    id: 7,
    name: '7. ¿Cómo Funciona Ciclonatura? (Proceso en 4 Pasos)',
    tag: 'Fase 2',
    status: 'planned',
    icon: ArrowRight,
    summary: 'Explicación gráfica y secuencial del trámite para eliminar cualquier fricción mental del cliente.',
    contentFromSite: 'Paso a paso: Solicitud, validación de documentos oficiales, gestión directa ante secretarías y entrega de placas/tarjeta.',
    ideas: [
      'Línea de tiempo interactiva con scroll-triggered animations',
      'Demostración visual de fotos de placas selladas antes de la entrega final'
    ]
  },
  {
    id: 8,
    name: '8. Calculadora / Cotizador Interactivo de Costos',
    tag: 'Fase 2: Gran Imán de Clientes',
    status: 'planned',
    icon: Calculator,
    summary: 'Herramienta donde el usuario elige entidad, modelo de vehículo y trámite para recibir una estimación y enlace directo pre-llenado a WhatsApp.',
    contentFromSite: 'Regulariza tu vehículo 80% más rápido con Ciclonatura.',
    ideas: [
      'Sliders y selectores interactivos sin recargar página',
      'Cálculo de ahorro aproximado en multas y recargos'
    ]
  },
  {
    id: 9,
    name: '9. Blog de Seguridad y Guías Vehiculares (Wix Headless)',
    tag: 'Fase 3: Backend Headless',
    status: 'planned',
    icon: FileText,
    summary: 'Artículos de SEO y autoridad listos para conectarse con Wix Headless Blog en la etapa de backend.',
    contentFromSite: 'Documentos básicos para CDMX/Edomex/Morelos, Verificación vehicular 2026, Evitar fraudes.',
    ideas: [
      'Tarjetas de artículos modernas con tiempos de lectura',
      'Estructura modular para consumo vía API de Wix Headless Blog'
    ]
  },
  {
    id: 10,
    name: '10. FAQ & Footer Integral con Datos Oficiales',
    tag: 'Fase 3',
    status: 'planned',
    icon: HelpCircle,
    summary: 'Preguntas frecuentes desplegables, mapa de oficina en Tlalpan CDMX, contacto directo y sellos legales.',
    contentFromSite: 'Dirección: Hacienda de la Escalera 22, Tlalpan, CDMX | Tel: (55) 4811 6379 / (55) 4820 9043 | Email: info@ciclonatura.com.',
    ideas: [
      'Acordeón FAQ con respuestas a las dudas más comunes',
      'Footer tecnológico con enlaces ordenados y aviso de privacidad'
    ]
  }
];

export default function SiteMapModal({ isOpen, onClose }) {
  const [selectedSection, setSelectedSection] = useState(SECTIONS_ROADMAP[1]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Mapa de Secciones y Roadmap de Rediseño
                </h3>
                <p className="text-xs text-slate-500">
                  Arquitectura integral planificada para Ciclonatura (Home + Wix Headless)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] flex-1 overflow-hidden">
            {/* Left list */}
            <div className="border-r border-slate-100 overflow-y-auto p-4 flex flex-col gap-2 bg-slate-50/50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                10 Secciones de la Landing
              </div>
              {SECTIONS_ROADMAP.map((sec) => {
                const isSelected = selectedSection.id === sec.id;
                const Icon = sec.icon;
                return (
                  <div
                    key={sec.id}
                    onClick={() => setSelectedSection(sec)}
                    className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                      isSelected 
                        ? 'bg-white border border-lime-400 shadow-md shadow-lime-500/10' 
                        : 'bg-white/60 border border-slate-200/60 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-lime-100 text-lime-800' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 leading-tight">
                          {sec.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {sec.tag}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-400" />
                  </div>
                );
              })}
            </div>

            {/* Right details */}
            <div className="p-6 overflow-y-auto flex flex-col gap-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-lime-100 text-lime-800 border border-lime-200">
                  {selectedSection.tag}
                </span>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mt-2">
                  {selectedSection.name}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {selectedSection.summary}
                </p>
              </div>

              {/* Data from original site */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-lime-700 mb-1">
                  Información Extraída del Sitio Actual
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedSection.contentFromSite}
                </p>
              </div>

              {/* Ideas */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-3">
                  💡 Ideas Innovadoras para Esta Sección
                </div>
                <div className="flex flex-col gap-2">
                  {selectedSection.ideas.map((idea, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700"
                    >
                      <div className="w-5 h-5 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>{idea}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 px-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/80">
            <span className="text-xs text-slate-400">
              Enfoque: Perfeccionar el Hero 3D antes de avanzar al catálogo.
            </span>
            <button
              onClick={onClose}
              className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs py-2 px-5 rounded-full transition-all"
            >
              Cerrar y Ver el Hero 3D
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
