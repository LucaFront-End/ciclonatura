"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useSpring,
    useMotionValueEvent,
    MotionValue,
} from "framer-motion";
import { 
    ArrowLeft, 
    ArrowRight, 
    MessageSquare, 
    Clock, 
    ShieldCheck, 
    Receipt, 
    MapPin, 
    Sparkles, 
    ChevronDown 
} from "lucide-react";

const DEFAULT_IMAGES = [
    { src: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80", alt: "Vehículo de lujo oficial" },
    { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", alt: "Placas y trámite vehicular" },
    { src: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80", alt: "Cotejo documental en CDMX" },
    { src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80", alt: "Certidumbre jurídica oficial" },
    { src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80", alt: "Inspección técnica oficial" },
    { src: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80", alt: "Emplacamiento legal Morelos" },
    { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80", alt: "Entrega express con folio SAT" },
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80", alt: "Sede corporativa Ciclonatura" },
];

const SPRING_CONFIG = { stiffness: 65, damping: 22, mass: 0.5 };

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

interface CurtainCardProps {
    item: { src: string; alt: string };
    index: number;
    total: number;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    isSpreadActive: boolean;
    stage: StageDimensions;
}

function CurtainCard({
    item,
    index,
    total,
    progress,
    pointer,
    isSpreadActive,
    stage,
}: CurtainCardProps) {
    const half = total / 2;
    const isLeft = index % 2 === 0;
    const wingIndex = Math.floor(index / 2); // 0 to 3
    const norm = wingIndex / (half - 1) - 0.5; // -0.5 to 0.5
    const sideMult = isLeft ? -1 : 1;

    // Responsive card dimensions scaled for full-width immersive hero
    const cardWidth = stage.isMobile ? 80 : 112;
    const cardHeight = stage.isMobile ? 110 : 152;

    // Wing coordinates spanning across the full viewport width
    const archCurve = Math.cos(norm * Math.PI) * (stage.width * 0.035);
    const targetX = sideMult * (stage.width * (stage.isMobile ? 0.35 : 0.37) + archCurve);
    const targetY = norm * (stage.height * 0.55);
    const targetRotate = sideMult * (norm * 18);

    const initialX = sideMult * (wingIndex * 6);
    const initialY = norm * 12;
    const initialRotate = sideMult * (wingIndex * 2.5);

    const translate = useTransform(
        [progress, pointer.x, pointer.y],
        ([p, px, py]: number[]) => {
            const easeP = 1 - Math.pow(1 - p, 3);

            const tx = initialX + (targetX - initialX) * easeP;
            const ty = initialY + (targetY - initialY) * easeP;

            const maxParallaxX = stage.isMobile ? 10 : 20;
            const maxParallaxY = stage.isMobile ? 8 : 16;

            const dx = tx + px * (isLeft ? -maxParallaxX : maxParallaxX) * easeP;
            const dy = ty + py * maxParallaxY * easeP;

            return `calc(-50% + ${dx}px) calc(-50% + ${dy}px)`;
        }
    );

    const rotate = useTransform(
        progress,
        [0, 0.45, 1],
        [initialRotate, isLeft ? -12 : 12, targetRotate]
    );

    const scale = useTransform(progress, [0, 0.5, 1], [1, 0.97, 0.93]);

    return (
        <motion.div
            className="absolute left-1/2 top-1/2 will-change-transform cursor-pointer select-none"
            style={{
                width: cardWidth,
                height: cardHeight,
                zIndex: isLeft ? index + 1 : total - index,
                translate,
                rotate,
                scale,
            }}
            whileHover={
                isSpreadActive
                    ? {
                        scale: 1.1,
                        zIndex: 60,
                        rotate: 0,
                        transition: SPRING_CONFIG,
                    }
                    : { scale: 0.98 }
            }
            whileTap={{ scale: 1.05, zIndex: 60 }}
        >
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/10 transition-shadow duration-300 hover:shadow-2xl hover:ring-emerald-500/50">
                <img
                    src={item.src}
                    alt={item.alt}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                />
            </div>
        </motion.div>
    );
}

export interface CurtainSplitHeroProps {
    images?: { src: string; alt: string }[];
    badge?: string;
    title?: string | React.ReactNode;
    subtitle?: string;
    description?: string;
    monograph?: string;
    statusTextClosed?: string;
    statusTextOpen?: string;
    onNavigateHome?: () => void;
    onSelectService?: (slug: string) => void;
    currentSlug?: string;
    allServices?: Array<{ id: string; slug: string; shortName: string }>;
    turnaround?: string;
    officialAuthority?: string;
    onCtaClick?: () => void;
}

export default function CurtainSplitHero({
    images = DEFAULT_IMAGES,
    badge = "Ciclonatura Oficial • Expediente Digital 2026",
    title = "Certidumbre\nVehicular.",
    description = "Gestoría vehicular de alta precisión con verificación SAT y cotejo en ventanilla oficial.",
    monograph = "Servicio Especializado",
    statusTextClosed = "Desliza abajo o haz clic para desplegar galería",
    statusTextOpen = "Desliza arriba o haz clic para cerrar cortina",
    onNavigateHome,
    onSelectService,
    currentSlug,
    allServices = [],
    turnaround = "48 a 72 hrs",
    officialAuthority = "Vía Oficial Autorizada",
    onCtaClick,
}: CurtainSplitHeroProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const [stage, setStage] = useState<StageDimensions>({
        width: 1200,
        height: 750,
        isMobile: false,
    });

    // Local smooth progress (0 = closed curtain in center, 1 = parted wings)
    const rawProgress = useMotionValue(0);
    const progress = useSpring(rawProgress, SPRING_CONFIG);

    const [isSpreadActive, setIsSpreadActive] = useState(false);
    useMotionValueEvent(progress, "change", (p) => setIsSpreadActive(p > 0.65));

    // Pointer parallax
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const pointerX = useSpring(rawX, SPRING_CONFIG);
    const pointerY = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        const el = stageRef.current;
        if (!el) return;

        const updateDimensions = () => {
            const rect = el.getBoundingClientRect();
            setStage({
                width: rect.width,
                height: rect.height,
                isMobile: rect.width < 768,
            });
        };

        updateDimensions();
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Local smooth wheel handling directly on the hero
    useEffect(() => {
        const el = stageRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            const current = rawProgress.get();
            const delta = e.deltaY * 0.0022;
            const next = Math.min(1, Math.max(0, current + delta));

            // Only capture wheel while transitioning between 0 and 1
            if ((e.deltaY > 0 && current < 0.98) || (e.deltaY < 0 && current > 0.02 && window.scrollY <= 10)) {
                e.preventDefault();
                rawProgress.set(next);
            }
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [rawProgress]);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
        rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const handlePointerLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    const toggleCurtain = (e: React.MouseEvent) => {
        // Prevent toggle if clicking on interactive buttons or links
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) return;
        rawProgress.set(rawProgress.get() > 0.5 ? 0 : 1);
    };

    const textY = useTransform(progress, [0.2, 0.85], [36, 0]);
    const textOpacity = useTransform(progress, [0.25, 0.8], [0, 1]);
    const lineScale = useTransform(progress, [0.3, 0.85], [0, 1]);

    const activeImages = images && images.length === 8 ? images : DEFAULT_IMAGES;

    const scrollToContent = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
    };

    return (
        <section 
            ref={stageRef}
            onClick={toggleCurtain}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative w-full min-h-[92vh] sm:min-h-[95vh] h-[92vh] sm:h-[95vh] overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-white text-slate-900 border-b border-slate-200/80 flex flex-col justify-between items-center select-none pt-24 sm:pt-28 pb-6 sm:pb-8 cursor-pointer"
        >
            {/* Subtle Minimal Dot Grid Background (Full-Width) */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_50%,transparent_100%)] opacity-35" />

            {/* Ambient Brand Lime Aura in the background */}
            <div className="pointer-events-none absolute w-[550px] h-[400px] bg-[#AFF94F]/18 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* ======================================================== */}
            {/* TOP BAR: Breadcrumb to Home & Service Selector Pills      */}
            {/* ======================================================== */}
            <div className="relative z-30 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto">
                {/* Back to Home Button */}
                {onNavigateHome && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigateHome();
                        }}
                        className="inline-flex items-center gap-2 text-xs font-heading font-bold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer group bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs"
                    >
                        <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform text-slate-500 group-hover:text-slate-900" />
                        <span>Volver al Inicio</span>
                    </button>
                )}

                {/* Service Quick Pills Switcher */}
                {allServices && allServices.length > 0 && onSelectService && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none bg-white/70 backdrop-blur-md p-1 rounded-full border border-slate-200/80 shadow-2xs">
                        {allServices.map(s => {
                            const isCurrent = s.slug === currentSlug;
                            return (
                                <button
                                    key={s.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectService(s.slug);
                                    }}
                                    className={`px-3 py-1 rounded-full text-[11px] font-heading font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                        isCurrent
                                            ? 'bg-slate-950 text-white shadow-xs'
                                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                                    }`}
                                >
                                    {s.shortName}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ======================================================== */}
            {/* CENTER EDITORIAL HEADLINE & ACTION BUTTONS               */}
            {/* ======================================================== */}
            <motion.div
                className="z-[25] flex flex-col items-center text-center px-4 max-w-md sm:max-w-xl my-auto pointer-events-none"
                style={{ y: textY, opacity: textOpacity }}
            >
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-slate-950 font-black bg-[#AFF94F]/25 border border-[#AFF94F]/80 px-3.5 py-1 rounded-full shadow-2xs">
                    {monograph}
                </span>

                <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] font-heading text-slate-950 whitespace-pre-line">
                    {title}
                </h1>

                <motion.div
                    style={{ scaleX: lineScale }}
                    className="my-3.5 sm:my-4 h-1 w-16 sm:w-20 bg-[#AFF94F] shadow-[0_0_12px_#AFF94F] origin-center rounded-full"
                />

                <p className="max-w-[42ch] text-xs sm:text-sm font-normal text-slate-600 leading-relaxed font-body">
                    {description}
                </p>

                {/* Direct Interactive Call-to-Actions */}
                <div className="flex items-center gap-3 mt-5 pointer-events-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onCtaClick) onCtaClick();
                        }}
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-[#AFF94F] text-white hover:text-slate-950 font-heading font-black text-xs shadow-md shadow-slate-950/20 hover:shadow-xl hover:shadow-[#AFF94F]/30 transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer border border-slate-800 hover:border-[#AFF94F]"
                    >
                        <MessageSquare size={13} className="text-[#AFF94F] group-hover:text-slate-950 transition-colors" />
                        <span>Cotizar por WhatsApp</span>
                        <ArrowRight size={13} className="text-white group-hover:text-slate-950 transition-colors" />
                    </button>

                    <button
                        onClick={scrollToContent}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-heading font-semibold text-xs border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                    >
                        <span>Ver Requisitos</span>
                        <ChevronDown size={13} className="text-slate-400" />
                    </button>
                </div>
            </motion.div>

            {/* ======================================================== */}
            {/* BILATERAL CURTAIN CARDS (Full-Width Stage)               */}
            {/* ======================================================== */}
            <div className="absolute inset-0 z-10 pointer-events-auto">
                {activeImages.map((item, i) => (
                    <CurtainCard
                        key={i}
                        item={item}
                        index={i}
                        total={activeImages.length}
                        progress={progress}
                        pointer={{ x: pointerX, y: pointerY }}
                        isSpreadActive={isSpreadActive}
                        stage={stage}
                    />
                ))}
            </div>

            {/* ======================================================== */}
            {/* BOTTOM BAR: Interactive Indicator & Trust Metrics         */}
            {/* ======================================================== */}
            <div className="relative z-30 w-full max-w-6xl px-4 sm:px-6 flex flex-col items-center gap-3 pointer-events-auto">
                {/* Curtain Status Pill Indicator */}
                <div className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 border border-slate-200 shadow-sm text-[10px] font-medium tracking-wide text-slate-700 font-heading">
                    <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                            isSpreadActive ? "bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] animate-pulse" : "bg-slate-400"
                        }`}
                    />
                    <span>{isSpreadActive ? statusTextOpen : statusTextClosed}</span>
                </div>

                {/* Bottom Trust Row */}
                <div className="w-full flex items-center justify-center gap-4 sm:gap-8 text-[11px] text-slate-600 flex-wrap pt-2 border-t border-slate-200/60 font-medium">
                    <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-slate-900 shrink-0" />
                        <span>Plazo: <strong>{turnaround}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Receipt size={13} className="text-slate-900 shrink-0" />
                        <span>Factura <strong>CFDI 4.0 SAT</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <ShieldCheck size={13} className="text-slate-900 shrink-0" />
                        <span>Garantía <strong>Legal Escrita</strong></span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-900 shrink-0" />
                        <span>Sede <strong>Calzada de Tlalpan CDMX</strong></span>
                    </div>
                </div>
            </div>

        </section>
    );
}
