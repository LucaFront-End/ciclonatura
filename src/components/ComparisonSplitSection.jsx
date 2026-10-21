import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Shield,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Lock,
  XCircle
} from "lucide-react";

// Lottie JSON icon animations
import alertTriangleAnim from "../assets/lottie/alert-triangle.json";
import alertCircleAnim from "../assets/lottie/alert-circle.json";
import shieldOffAnim from "../assets/lottie/shield-off.json";
import shieldAnim from "../assets/lottie/shield.json";
import checkCircleAnim from "../assets/lottie/check-circle.json";
import checkmarkAnim from "../assets/lottie/checkmark.json";
import lockAnim from "../assets/lottie/lock.json";

import lottie from "lottie-web/build/player/esm/lottie_svg.min.js";

// Direct Lottie Player with native SVG injection and cleanup
function LottiePlayer({ animationData, fallback: FallbackIcon, className = "w-10 h-10", fallbackClassName = "w-6 h-6" }) {
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

const STAGES = [
  {
    id: 1,
    step: "01",
    label: "Primer Contacto",
    coyote: {
      lottie: alertTriangleAnim,
      fallbackIcon: AlertTriangle,
      tag: "Vía Informal / Coyote",
      title: "Cita a ciegas y anticipo en OXXO",
      desc: "Contacto por Facebook o WhatsApp anónimo. Solicitan depósitos sin comprobante ni garantía.",
      points: [
        "Sin oficina física ni domicilio verificable",
        "Depósito a cuenta personal sin contrato"
      ],
      verdict: "Alto riesgo de estafa y pérdida del dinero"
    },
    ciclonatura: {
      lottie: shieldAnim,
      fallbackIcon: ShieldCheck,
      tag: "Ciclonatura Oficial",
      title: "Despacho en Tlalpan y Contrato SAT",
      desc: "Atención presencial en oficinas de CDMX, contrato formal por escrito y factura deducible.",
      points: [
        "Oficinas físicas y razón social registrada",
        "Factura CFDI 4.0 antes de cualquier pago"
      ],
      verdict: "100% certeza jurídica y respaldo legal"
    }
  },
  {
    id: 2,
    step: "02",
    label: "Revisión de Papeles",
    coyote: {
      lottie: shieldOffAnim,
      fallbackIcon: ShieldAlert,
      tag: "Vía Informal / Coyote",
      title: "Facturas originales sin inventario",
      desc: "Se llevan tus documentos originales sin resguardo. Si se extravían, nadie se hace responsable.",
      points: [
        "Sin cotejo en fiscalía ni validación REPUVE",
        "Riesgo de extorsión o retención indebida"
      ],
      verdict: "Cero amparo legal ante pérdidas"
    },
    ciclonatura: {
      lottie: lockAnim,
      fallbackIcon: Lock,
      tag: "Ciclonatura Oficial",
      title: "Auditoría REPUVE y Custodia Notarial",
      desc: "Auditoría satelital de antecedentes penales, reporte de robo y valija de seguridad sellada.",
      points: [
        "Cotejo en vivo con SEMOVI, REPUVE y SAT",
        "Valija blindada y acuse de recibo foliado"
      ],
      verdict: "Custodia blindada de tu patrimonio"
    }
  },
  {
    id: 3,
    step: "03",
    label: "Placas y Legalidad",
    coyote: {
      lottie: alertCircleAnim,
      fallbackIcon: XCircle,
      tag: "Vía Informal / Coyote",
      title: "Láminas clonadas o permisos apócrifos",
      desc: "Entregan placas de Guerrero o troqueladas en talleres clandestinos. No aparecen en el sistema.",
      points: [
        "Inexistentes en el padrón oficial SEMOVI",
        "Riesgo de corralón ($8,500+ MXN) y delito penal"
      ],
      verdict: "Consecuencia: Multas graves o corralón"
    },
    ciclonatura: {
      lottie: checkCircleAnim,
      fallbackIcon: CheckCircle2,
      tag: "Ciclonatura Oficial",
      title: "Láminas Oficiales CDMX / Edomex",
      desc: "Placas 100% oficiales emitidas por ventanilla institucional con microtexto SEDENA y chip RFID.",
      points: [
        "Troquelado oficial y chip de verificación",
        "Holograma ambiental SEDEMA verificable"
      ],
      verdict: "Circulación legal en todo México"
    }
  },
  {
    id: 4,
    step: "04",
    label: "La Entrega",
    coyote: {
      lottie: alertTriangleAnim,
      fallbackIcon: AlertTriangle,
      tag: "Vía Informal / Coyote",
      title: "Bloqueo telefónico y cero garantía",
      desc: "Si el auto tiene multas o te detiene una patrulla, el coyote apaga el teléfono y desaparece.",
      points: [
        "Sin soporte ni respuesta tras la entrega",
        "El cliente asume todo el problema legal"
      ],
      verdict: "Resultado: Tiempo y dinero perdidos"
    },
    ciclonatura: {
      lottie: checkmarkAnim,
      fallbackIcon: CheckCircle2,
      tag: "Ciclonatura Oficial",
      title: "Entrega Express Personal a Domicilio",
      desc: "Nuestra unidad express entrega tus placas, tarjeta y holograma directamente en tu puerta en 24-48h.",
      points: [
        "Entrega en tu casa u oficina con acuse firmado",
        "Cotejo en vivo en el portal antes de pagar"
      ],
      verdict: "Trámite resuelto sin pisar oficinas"
    }
  }
];

export default function ComparisonSplitSection() {
  const containerRef = useRef(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Native Scroll Listener for 100% Bullet-Proof Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);

      // Determine active stage (0, 1, 2, 3)
      const stageIdx = Math.min(3, Math.max(0, Math.floor(progress * 4)));
      setActiveStageIndex(stageIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStage = (stageIdx) => {
    setActiveStageIndex(stageIdx);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;
    const targetScroll = containerTop + (stageIdx / 3.9) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const stage = STAGES[activeStageIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-white border-b border-slate-200/80 h-[300vh] sm:h-[320vh] select-none"
    >
      {/* Subtle Minimal Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Sticky Fullscreen Container */}
      <div 
        className="sticky top-0 h-screen w-full flex flex-col justify-between py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10"
        style={{ position: "sticky", top: 0 }}
      >
        
        {/* Minimalist Clean Header */}
        <div className="shrink-0 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold font-heading mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Comparativa Oficial • Trámites Vehiculares</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            El riesgo informal <span className="text-slate-400 font-normal">vs.</span>{" "}
            <span className="text-emerald-600">La certeza Ciclonatura</span>
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
            Descubre por qué miles de conductores evitan coyotes y eligen garantía legal por escrito.
          </p>

          {/* Minimal Step Indicator Tabs */}
          <div className="flex items-center justify-center gap-2 mt-3.5">
            {STAGES.map((s, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollToStage(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm scale-105"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-emerald-400" : "bg-slate-300"
                    }`}
                  />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Subtle Progress Bar */}
          <div className="w-48 mx-auto h-1 bg-slate-100 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-150 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* Minimalist Split Cards with Lottie Animations            */}
        {/* ======================================================== */}
        <div className="flex-1 my-2 sm:my-3 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 items-stretch relative z-10 md:max-h-[480px]">
          
          {/* Vertical VS Divider Laser in the Center */}
          <div className="hidden md:flex absolute inset-y-0 left-1/2 -translate-x-1/2 flex-col items-center justify-center pointer-events-none z-30">
            <div className="w-[1px] h-full bg-slate-200" />
            <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-black tracking-wider flex items-center justify-center shadow-sm">
              VS
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* LEFT CARD: El Coyote / Vía Informal (Minimal Danger)   */}
          {/* ------------------------------------------------------ */}
          <div className="bg-white border border-rose-200/90 rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow">
            
            <div>
              {/* Card Top: Lottie Animation + Category Pill */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center p-2 shrink-0 shadow-2xs">
                    <LottiePlayer
                      animationData={stage.coyote.lottie}
                      fallback={stage.coyote.fallbackIcon}
                      className="w-10 h-10"
                      fallbackClassName="w-6 h-6 text-rose-600"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">
                      {stage.coyote.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ETAPA {stage.step}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  ALTO RIESGO
                </span>
              </div>

              {/* Title & Description with Smooth Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id + "-coyote"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {stage.coyote.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {stage.coyote.desc}
                  </p>

                  {/* Clean Minimalist Key Points */}
                  <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
                    {stage.coyote.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                          <X size={11} strokeWidth={3} />
                        </div>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Outcome Pill */}
            <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Consecuencia:</span>
              <span className="font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                {stage.coyote.verdict}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* RIGHT CARD: Ciclonatura Oficial (Minimal Trust)        */}
          {/* ------------------------------------------------------ */}
          <div className="bg-white border-2 border-emerald-400/90 rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow">
            
            <div>
              {/* Card Top: Lottie Animation + Category Pill */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-2 shrink-0 shadow-2xs">
                    <LottiePlayer
                      animationData={stage.ciclonatura.lottie}
                      fallback={stage.ciclonatura.fallbackIcon}
                      className="w-10 h-10"
                      fallbackClassName="w-6 h-6 text-emerald-600"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      {stage.ciclonatura.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ETAPA {stage.step}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Check size={11} strokeWidth={3} className="text-emerald-600" />
                  100% GARANTIZADO
                </span>
              </div>

              {/* Title & Description with Smooth Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.id + "-ciclo"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {stage.ciclonatura.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {stage.ciclonatura.desc}
                  </p>

                  {/* Clean Minimalist Key Points */}
                  <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
                    {stage.ciclonatura.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="font-medium text-slate-800">{pt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Outcome Pill */}
            <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Garantía:</span>
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {stage.ciclonatura.verdict}
              </span>
            </div>
          </div>

        </div>

        {/* Minimal Footer CTA Bar */}
        <div className="shrink-0 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield size={14} className="text-emerald-600 shrink-0" />
            <span>
              Oficinas físicas en <strong>Calzada de Tlalpan CDMX</strong> · Factura CFDI deducible ante el SAT.
            </span>
          </div>

          <a
            href="https://wa.me/525548116379?text=Hola%20Ciclonatura,%20deseo%20cotizar%20mi%20trámite%20vehicular%20con%20contrato%20y%20garantía%20oficial"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-xs shadow-xs transition-transform hover:scale-102 active:scale-98 cursor-pointer"
          >
            <span>Cotizar trámite seguro</span>
            <ArrowRight size={13} className="text-emerald-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
