"use client";

import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  Clock, 
  Layers,
  X,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import ModelCard3D, { ModelType } from "./model-card-3d";

export interface TunnelCardItem {
  id: string;
  modelType: ModelType;
  title: string;
  category: string;
  badge: string;
  delayTime: string;
  desc: string;
}

const ITEMS: TunnelCardItem[] = [
  {
    id: "car-white",
    modelType: "car-white",
    title: "Alta y Placas CDMX",
    category: "SEMOVI Oficial",
    badge: "24 a 48 hrs",
    delayTime: "Sin cita previa",
    desc: "Emisión y alta de placas oficiales para la Ciudad de México y Morelos con validación directa ante el sistema central."
  },
  {
    id: "gears",
    modelType: "gears",
    title: "Engranaje Legal y Cotejo",
    category: "Regularización",
    badge: "Garantizado",
    delayTime: "Mismo día",
    desc: "Revisión documental exhaustiva, cotejo de facturas de origen y regularización de expedientes vehiculares sin intermediarios."
  },
  {
    id: "shield",
    modelType: "shield",
    title: "Garantía Cero Fraudes",
    category: "Auditoría SEMOVI",
    badge: "Sin Coyotes",
    delayTime: "Contrato y factura",
    desc: "Todos nuestros trámites cuentan con contrato, recibo oficial, facturación fiscal deducible y oficina física en Tlalpan."
  },
  {
    id: "watch",
    modelType: "watch",
    title: "Servicio Express Inmediato",
    category: "Tiempo Récord",
    badge: "En 24h",
    delayTime: "24 a 48 hrs",
    desc: "Optimización de tiempos oficiales para que tu vehículo esté al día y circule de inmediato sin largas filas ni pérdidas de tiempo."
  },
  {
    id: "wheel",
    modelType: "wheel",
    title: "Verificación y Circulación",
    category: "Edomex & Morelos",
    badge: "Holograma 00",
    delayTime: "1 a 3 días",
    desc: "Gestión de hologramas de verificación ambiental, reemplacamiento, tenencias y refrendos para circular libremente."
  },
  {
    id: "car-lime",
    modelType: "car-lime",
    title: "Flotillas y Corporativos B2B",
    category: "Atención Masiva",
    badge: "100% Deducible",
    delayTime: "Atención prioritaria",
    desc: "Gestión vehicular masiva para flotillas de empresas, agencias automotrices y transportistas con facturación integral."
  },
];

interface TunnelCardData {
  item: TunnelCardItem;
  start: number;
  end: number;
  offsetXFactor: number;
  offsetYFactor: number;
  rotationZ: number;
  index: number;
}

// Staggered sequential appearance of 3D models across the scroll journey
const TUNNEL_CARDS: TunnelCardData[] = [
  {
    item: ITEMS[0], // car-white (Alta y Placas CDMX)
    start: 0.05,
    end: 0.32,
    offsetXFactor: 0.28,
    offsetYFactor: -0.04,
    rotationZ: 1.5,
    index: 0,
  },
  {
    item: ITEMS[1], // gears (Engranaje Legal y Cotejo)
    start: 0.18,
    end: 0.45,
    offsetXFactor: -0.28,
    offsetYFactor: 0.06,
    rotationZ: -1.5,
    index: 1,
  },
  {
    item: ITEMS[2], // shield (Garantía Cero Fraudes)
    start: 0.31,
    end: 0.58,
    offsetXFactor: 0.27,
    offsetYFactor: -0.03,
    rotationZ: 1.2,
    index: 2,
  },
  {
    item: ITEMS[3], // watch (Servicio Express)
    start: 0.44,
    end: 0.71,
    offsetXFactor: -0.27,
    offsetYFactor: 0.05,
    rotationZ: -1.2,
    index: 3,
  },
  {
    item: ITEMS[4], // wheel (Verificación y Circulación)
    start: 0.57,
    end: 0.84,
    offsetXFactor: 0.28,
    offsetYFactor: -0.04,
    rotationZ: 1.8,
    index: 4,
  },
  {
    item: ITEMS[5], // car-lime (Flotillas y Corporativos B2B)
    start: 0.70,
    end: 0.98,
    offsetXFactor: -0.28,
    offsetYFactor: 0.06,
    rotationZ: -1.8,
    index: 5,
  },
];

const SPRING_CONFIG = { stiffness: 65, damping: 26, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
  onSelect: (item: TunnelCardItem) => void;
}

function TunnelCard({ card, progress, pointer, total, stage, onSelect }: TunnelCardProps) {
  // Clamped local progress [0, 1] strictly inside [card.start, card.end]
  const localProgress = useTransform(progress, [card.start, card.end], [0, 1], { clamp: true });

  const farZ = stage.isMobile ? -1100 : -1400;
  const nearZ = stage.isMobile ? 260 : 380;
  const z = useTransform(localProgress, [0, 0.5, 1], [farZ, 60, nearZ]);

  // Model scale starts smaller in distance, reaches full scale at focal distance
  const scale = useTransform(localProgress, [0, 0.5, 1], [0.35, 1.05, 1.3]);

  // Strictly invisible before start and after end
  const opacity = useTransform(localProgress, [0, 0.18, 0.75, 0.98], [0, 1, 1, 0]);

  // Floating informative label visible when model is in focal zone
  const labelOpacity = useTransform(localProgress, [0.18, 0.32, 0.72, 0.86], [0, 1, 1, 0]);
  const labelY = useTransform(localProgress, [0.18, 0.32, 0.72, 0.86], [12, 0, 0, -8]);

  const modelWidth = stage.isMobile
    ? Math.max(180, Math.min(240, stage.width * 0.46))
    : Math.max(260, Math.min(340, stage.width * 0.23));

  const baseX = stage.isMobile 
    ? (card.offsetXFactor > 0 ? stage.width * 0.2 : -stage.width * 0.2)
    : card.offsetXFactor * stage.width;
  const baseY = card.offsetYFactor * stage.height;
  const panStrength = stage.isMobile ? 18 : 36;

  const transform = useTransform(
    [z, scale, pointer.x, pointer.y],
    ([currZ, currScale, px, py]: number[]) => {
      const offsetX = baseX - px * panStrength;
      const offsetY = baseY - py * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) scale(${currScale}) rotateZ(${card.rotationZ}deg)`;
    }
  );

  return (
    <motion.div
      style={{
        width: modelWidth,
        height: modelWidth,
        transform,
        opacity,
        zIndex: card.index + 10,
      }}
      onClick={() => onSelect(card.item)}
      className="pointer-events-auto absolute left-1/2 top-1/2 will-change-transform select-none cursor-pointer flex flex-col items-center justify-center group"
    >
      {/* 3D MODEL FLOATING IN SPACE - ROTATES STRICTLY VIA SCROLL WITH NO AUTO-SPIN */}
      <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
        <ModelCard3D type={card.item.modelType} progress={localProgress} />

        {/* Luminous aura on hover */}
        <div className="absolute inset-0 rounded-full bg-[#AFF94F]/0 group-hover:bg-[#AFF94F]/25 blur-2xl transition-all duration-500 pointer-events-none -z-10" />
      </div>

      {/* Floating Informative Label */}
      <motion.div 
        style={{ opacity: labelOpacity, y: labelY }}
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-center pointer-events-auto whitespace-nowrap"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/95 backdrop-blur-md text-white shadow-xl shadow-slate-950/20 border border-slate-700/50 group-hover:border-[#AFF94F] transition-colors">
          <span className="w-2 h-2 rounded-full bg-[#AFF94F] animate-pulse shadow-[0_0_8px_#AFF94F]" />
          <span className="text-xs font-heading font-bold tracking-tight">
            {card.item.title}
          </span>
          <span className="text-[10px] font-semibold text-[#AFF94F] border-l border-white/20 pl-2">
            {card.item.badge}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PerspectiveTunnelHero({ onOpenSiteMap }: { onOpenSiteMap?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  const [selectedModalCard, setSelectedModalCard] = useState<TunnelCardItem | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Motion value for progress along the tunnel: STARTS AT 0.0 SO HERO IS CLEAN AND MODELS APPEAR ON SCROLL
  const rawProgress = useMotionValue(0.0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 70,
    damping: 28,
    restDelta: 0.0001,
  });

  // Wheel handling: allow natural scroll when at tunnel boundary
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const current = rawProgress.get();
      const delta = e.deltaY * 0.00065;

      if (delta > 0 && current >= 0.98) {
        return; // Allow page to scroll down
      }
      if (delta < 0 && current <= 0.01) {
        return; // Allow page to scroll up
      }

      e.preventDefault();
      const next = Math.min(1, Math.max(0, current + delta));
      rawProgress.set(next);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [rawProgress]);

  // Touch swipe support for mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      touchStartY = touchY;
      const current = rawProgress.get();
      const next = Math.min(1, Math.max(0, current + diff * 0.0015));
      rawProgress.set(next);
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [rawProgress]);

  const pointer = useCameraParallax(!reduce);

  // Dynamic transforms: Opacity softens organically while 3D models fly past, and returns to 100% solid at the end
  const titleOpacity = useTransform(smoothProgress, [0, 0.25, 0.55, 0.85, 1], [1, 0.45, 0.35, 0.65, 1]);
  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.96, 1]);
  const scrollPromptOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  const handleCardSelect = (item: TunnelCardItem) => {
    setSelectedModalCard(item);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#AFF94F", "#0284c7", "#0f172a"]
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[92vh] h-[92vh] w-full max-w-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 select-none flex items-center justify-center pt-16"
      style={{
        perspective: stage.isMobile ? "900px" : "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Light Theme Background: Elegant Dot Matrix & Soft Ambient Light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_50%,transparent_100%)] opacity-70" />
      <div className="pointer-events-none absolute top-10 right-10 w-[450px] height-[450px] bg-[#AFF94F]/20 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-[400px] height-[400px] bg-sky-100/40 rounded-full blur-3xl -z-10" />

      {/* Spatial 3D Guide Rings */}
      <div className="pointer-events-none absolute h-[50vmin] w-[50vmin] rounded-full border border-[#AFF94F]/30" />
      <div className="pointer-events-none absolute h-[80vmin] w-[80vmin] rounded-full border border-dashed border-slate-300/80" />

      {/* Central Anchor Typography (Ciclonatura Value Proposition) - Softens mid-flight, ends 100% solid */}
      <motion.div
        style={{ opacity: titleOpacity, scale: titleScale }}
        className="pointer-events-none z-10 flex flex-col items-center text-center px-6 max-w-2xl"
      >
        {/* Live Authority Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-slate-200 shadow-xs backdrop-blur-md mb-5 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#AFF94F] animate-pulse shadow-[0_0_8px_#AFF94F]" />
          <span className="text-xs font-bold tracking-wider uppercase text-slate-800 font-heading">
            Gestoría Vehicular Digital • CDMX, Edomex & Morelos
          </span>
        </div>

        {/* Main H1 Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-900 font-heading">
          TU VEHÍCULO EN REGLA,{" "}
          <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
            SIN FILAS.
          </span>
        </h1>

        <p className="mt-4 max-w-[48ch] text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          Regularizamos placas, verificación y refrendos <strong className="text-slate-900">80% más rápido</strong> con modelos y trámites oficiales ante las autoridades. Cero coyotes y seguimiento en tiempo real.
        </p>

        {/* CTA Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto">
          <a
            href="https://wa.me/525547021799?text=Hola%20Ciclonatura,%20quiero%20iniciar%20mi%20trámite%20vehicular"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg shadow-slate-950/15 border border-[#AFF94F]/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Iniciar mi trámite</span>
            <ArrowRight size={17} className="text-[#AFF94F]" />
          </a>

          <a
            href="https://wa.me/525547021799?text=Hola%20Ciclonatura,%20deseo%20asesoría%20con%20un%20ejecutivo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-heading font-semibold text-sm sm:text-base px-5 py-3.5 rounded-full border border-slate-200 shadow-xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <ShieldCheck size={17} className="text-emerald-600" />
            <span>Hablar con un gestor</span>
          </a>
        </div>
      </motion.div>

      {/* Sleek Minimal Scroll Hint (Fades out cleanly as soon as user begins scrolling) */}
      <motion.div
        style={{ opacity: scrollPromptOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-slate-200/90 shadow-sm backdrop-blur-md text-slate-600 text-xs font-heading font-medium"
      >
        <div className="w-3.5 h-5 rounded-full border border-slate-400 flex items-start justify-center p-0.5">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-lime-600"
          />
        </div>
        <span>Haz scroll para explorar los servicios</span>
        <ChevronDown size={14} className="text-lime-600 animate-bounce" />
      </motion.div>

      {/* 3D Z-Space Tunnel of Ciclonatura Floating 3D Models */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {TUNNEL_CARDS.map((card, i) => (
          <TunnelCard
            key={i}
            card={card}
            progress={smoothProgress}
            pointer={pointer}
            total={TUNNEL_CARDS.length}
            stage={stage}
            onSelect={handleCardSelect}
          />
        ))}
      </div>

      {/* Detail Modal when user clicks any 3D Floating Object */}
      <AnimatePresence>
        {selectedModalCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-lime-800 bg-lime-100 px-3 py-1 rounded-full font-heading">
                  {selectedModalCard.category}
                </span>
                <button
                  onClick={() => setSelectedModalCard(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* 3D Preview in modal - borderless floating */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/50 border border-slate-100 flex items-center justify-center">
                <ModelCard3D type={selectedModalCard.modelType} />
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  {selectedModalCard.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                  <Clock size={13} className="text-lime-600" />
                  Tiempo estimado: <strong>{selectedModalCard.delayTime}</strong>
                </p>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {selectedModalCard.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`https://wa.me/525548116379?text=Hola%20Ciclonatura,%20quiero%20cotizar%20${encodeURIComponent(selectedModalCard.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Cotizar por WhatsApp</span>
                  <ExternalLink size={13} />
                </a>
                <button
                  onClick={() => setSelectedModalCard(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
