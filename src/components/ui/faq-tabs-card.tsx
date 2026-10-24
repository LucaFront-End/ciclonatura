"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqTab {
  label: string;
  faqs: FaqItem[];
}

export interface FAQTabsCardProps {
  tabs?: FaqTab[];
  /** Index of the tab selected initially. */
  defaultTab?: number;
  /** Index of the FAQ expanded initially (-1 for none). */
  defaultOpenIndex?: number;
  footerLabel?: string;
  onFooterClick?: () => void;
  showFooter?: boolean;
  className?: string;
}

const CICLONATURA_FAQS: FaqTab[] = [
  {
    label: "Placas CDMX, Edomex & Morelos",
    faqs: [
      {
        question: "¿En qué entidades tramitan placas y trámites vehiculares?",
        answer:
          "Tramitamos altas, bajas, reemplacamiento y regularización de placas oficiales en Ciudad de México (CDMX), Estado de México (Edomex) y Morelos. Analizamos el valor de tu auto, tu residencia y tus necesidades operativas para recomendarte la opción fiscal y legalmente más favorable.",
      },
      {
        question: "¿Cómo elijo entre tramitar placas de CDMX, Edomex o Morelos?",
        answer:
          "Morelos es la alternativa más elegida para autos nuevos o con valor superior a $250,000 MXN porque exenta legalmente el 100% de tenencia anual de por vida. CDMX es la opción preferida para quienes buscan verificación local ordinaria y tarjeta inteligente chip capitalina. Edomex es indispensable para reemplacamiento y regularización de padrón mexiquense.",
      },
      {
        question: "¿Es 100% legal circular en CDMX o Edomex con placas de Morelos?",
        answer:
          "Sí, totalmente legal. El Artículo 11 de la Constitución Mexicana garantiza el libre tránsito de cualquier vehículo legalmente registrado en el país. Además, el trámite incluye alta vigente en el padrón vehicular de Morelos, engomado original con holograma oficial y validación ante la Secretaría de Movilidad.",
      },
      {
        question: "¿Cómo compruebo que las placas y engomados no son falsos?",
        answer:
          "Cada juego de láminas gestionado por Ciclonatura proviene de troquelado oficial de la SEDENA con microtexto de seguridad y código QR verificable ante la Secretaría de Hacienda y tesorería. Además, realizamos el cotejo en vivo en el portal del REPUVE antes de que firmes el acta de entrega.",
      },
      {
        question: "¿Entregan factura fiscal deducible ante el SAT?",
        answer:
          "Sí. Emitimos factura electrónica con CFDI deducible al 100%, desglosando los derechos gubernamentales pagados a tesorería y los honorarios de gestión corporativa. Ideal para personas físicas con actividad empresarial y flotillas corporativas.",
      },
    ],
  },
  {
    label: "Tiempos & Entrega",
    faqs: [
      {
        question: "¿Tengo que formarme o acudir a algún módulo gubernamental?",
        answer:
          "En lo absoluto. El servicio de Ciclonatura es de concierge 100% libre de filas: un mensajero corporativo acude a tu domicilio u oficina en CDMX o Edomex para recolectar tu expediente bajo acta de resguardo, y te entrega tus placas listas en mano.",
      },
      {
        question: "¿En cuánto tiempo entregan mis placas y tarjeta de circulación?",
        answer:
          "Los trámites ordinarios de alta y cambio de propietario toman de 48 a 72 horas hábiles una vez validada la documentación. También contamos con despacho express con entrega prioritaria de 24 a 48 horas.",
      },
      {
        question: "¿Cómo funciona la entrega con valija de seguridad a domicilio?",
        answer:
          "Tus documentos originales, tarjeta de circulación plastificada con chip, engomado y láminas metálicas viajan en una valija de seguridad sellada con folio único. El mensajero solo la abre en tu presencia una vez cotejada tu identificación.",
      },
      {
        question: "¿Pueden entregar en oficinas corporativas en Santa Fe o Polanco?",
        answer:
          "Sí, cubrimos todas las alcaldías de la CDMX y los principales municipios conurbados del Estado de México (Huixquilucan, Naucalpan, Atizapán, Tlalnepantla, Toluca), así como en Cuernavaca.",
      },
    ],
  },
  {
    label: "Adeudos & Documentos",
    faqs: [
      {
        question: "¿Qué sucede si mi auto arrastra tenencias o multas atrasadas?",
        answer:
          "Hacemos una auditoría fiscal previa sin costo en los portales de tesorería. Te entregamos el desglose exacto de los adeudos reales (sin recargos ocultos ni intermediarios) y gestionamos los pagos oficiales con su respectivo comprobante oficial.",
      },
      {
        question: "¿Qué documentos necesito enviar para cotizar mi trámite?",
        answer:
          "Para la auditoría inicial solo requieres fotografías legibles por WhatsApp de: factura de origen (o carta factura), identificación oficial vigente (INE o pasaporte), comprobante de domicilio reciente y tarjeta de circulación anterior o baja.",
      },
      {
        question: "¿Qué garantía tengo de que el trámite no se va a trabar?",
        answer:
          "Antes de recibir cualquier anticipo, revisamos la viabilidad jurídica en REPUVE y finanzas. Si detectamos algún reporte de robo, alteración de número de serie o inconsistencia legal, te alertamos de inmediato sin costo.",
      },
      {
        question: "¿Ayudan si perdí la factura original o la baja del dueño anterior?",
        answer:
          "Sí. Contamos con área jurídica especializada para rastrear antecedentes de baja ante dependencias estatales y gestionar copias certificadas o juicios de jurisdicción voluntaria de propiedad.",
      },
    ],
  },
];

export function FAQTabsCard({
  tabs: tabsProp = CICLONATURA_FAQS,
  defaultTab = 0,
  defaultOpenIndex = 0,
  footerLabel = "¿Tienes un caso especial? Escríbenos por WhatsApp",
  onFooterClick,
  showFooter = true,
  className,
}: FAQTabsCardProps) {
  const tabs = tabsProp.length > 0 ? tabsProp : CICLONATURA_FAQS;
  const clampedDefaultTab = Math.min(Math.max(defaultTab, 0), tabs.length - 1);

  const [activeTab, setActiveTab] = React.useState(clampedDefaultTab);
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpenIndex);

  const safeActiveTab = Math.min(Math.max(activeTab, 0), tabs.length - 1);
  const currentTab = tabs[safeActiveTab] ?? tabs[0];

  const handleDefaultFooterClick = () => {
    if (onFooterClick) {
      onFooterClick();
    } else {
      window.open(
        "https://wa.me/525547021799?text=Hola,%20tengo%20una%20duda%20específica%20sobre%20mi%20trámite%20vehicular",
        "_blank"
      );
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-3xl bg-white p-6 sm:p-7 font-sans",
        "border border-slate-200/90 shadow-xl shadow-slate-900/5 select-none",
        className,
      )}
    >
      {/* Tabs Switcher */}
      <div className="flex h-11 items-center rounded-2xl bg-slate-100/90 p-1 border border-slate-200/60">
        {tabs.map((tab, index) => {
          const active = index === safeActiveTab;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => {
                setActiveTab(index);
                setOpenIndex(defaultOpenIndex);
              }}
              className="relative h-9 flex-1 rounded-xl outline-none transition-all cursor-pointer"
            >
              {active ? (
                <motion.span
                  layoutId="faq-tab-pill-ciclo"
                  className="absolute inset-0 rounded-xl bg-white shadow-xs border border-slate-200/80"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 text-xs sm:text-sm font-heading font-bold leading-5 transition-colors duration-200 px-1 truncate block",
                  active
                    ? "text-slate-900 font-extrabold"
                    : "text-slate-500 hover:text-slate-800",
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Accordion List */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={safeActiveTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-4 flex-1 overflow-hidden rounded-2xl border border-slate-200/80 divide-y divide-slate-100 bg-white"
        >
          {currentTab.faqs.map((faq, index) => {
            const open = index === openIndex;
            return (
              <div
                key={faq.question}
                className={cn(
                  "transition-colors duration-200",
                  open ? "bg-slate-50/70" : "hover:bg-slate-50/40",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex min-h-[58px] w-full items-start justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer group"
                >
                  <span className="flex-1 text-xs sm:text-sm font-heading font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={cn(
                      "flex shrink-0 w-6 h-6 rounded-full items-center justify-center transition-colors",
                      open ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-5 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal border-t border-slate-100/80 pt-3">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Footer Button */}
      {showFooter && (
        <motion.button
          type="button"
          onClick={handleDefaultFooterClick}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", bounce: 0.25, duration: 0.3 }}
          className="mt-5 flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-heading font-bold text-slate-900 transition-colors hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 cursor-pointer shadow-2xs"
        >
          <MessageSquare size={16} className="text-emerald-600" />
          <span>{footerLabel}</span>
        </motion.button>
      )}
    </div>
  );
}

export default FAQTabsCard;
