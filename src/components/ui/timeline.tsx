// Built using Hyperiux Vault: https://vault.hyperiux.com
// Adapted for Ciclonatura with bullet-proof physics-lerp scroll tracking
"use client";

import React, {
  type CSSProperties,
  useRef,
  useEffect,
} from "react";
import defaultHqImg from "@/assets/ciclonatura_headquarters.jpg";

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

type Month = keyof typeof monthOrder;

export type JourneyItem = {
  id: string;
  year: string;
  month: Month;
  content: string;
  phase?: string;
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  scrollDuration?: number;
  topData?: JourneyItem[];
  bottomData?: JourneyItem[];
};

const defaultTopJourneyData: JourneyItem[] = [
  {
    id: "2018-march",
    year: "2018",
    month: "March",
    phase: "Fase 01 · Fundación",
    content: "Apertura del despacho físico en Calzada de Tlalpan con trámites vehiculares certificados.",
  },
  {
    id: "2021-july",
    year: "2021",
    month: "July",
    phase: "Fase 03 · Enlace Institucional",
    content: "Digitalización de expedientes y enlace institucional directo con ventanillas SEMOVI.",
  },
  {
    id: "2023-april",
    year: "2023",
    month: "April",
    phase: "Fase 05 · Auditoría REPUVE",
    content: "Auditoría REPUVE en vivo y valijas de custodia blindada para resguardo notarial.",
  },
  {
    id: "2026-may",
    year: "2026",
    month: "May",
    phase: "Fase 07 · Flotilla Express",
    content: "Flotilla express puerta a puerta con entrega de láminas SEDENA en 24 a 48 horas.",
  },
];

const defaultBottomJourneyData: JourneyItem[] = [
  {
    id: "2020-november",
    year: "2020",
    month: "November",
    phase: "Fase 02 · Cero Filas",
    content: "Protocolo Cero Filas: Gestión remota sin que el cliente pise dependencias de gobierno.",
  },
  {
    id: "2022-october",
    year: "2022",
    month: "October",
    phase: "Fase 04 · CFDI 4.0 SAT",
    content: "Incorporación de facturación fiscal CFDI 4.0 deducible ante el SAT para particulares y empresas.",
  },
  {
    id: "2025-september",
    year: "2025",
    month: "September",
    phase: "Fase 06 · Cobertura Interestatal",
    content: "Expansión interestatal CDMX-Edomex y administración de flotillas empresariales.",
  },
];

export default function Timeline({
  title = "Nuestra Trayectoria",
  periodLabel = "2018 — 2026",
  textColor = "#0f172a",
  mutedTextColor = "#64748b",
  activeColor = "#AFF94F",
  backgroundColor = "#ffffff",
  imageUrl = defaultHqImg,
  imageAlt = "Sede corporativa Ciclonatura y unidades express en CDMX",
  topData = defaultTopJourneyData,
  bottomData = defaultBottomJourneyData,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  const allJourneyItems: JourneyItem[] = [
    ...topData,
    ...bottomData,
  ].sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    return monthOrder[a.month] - monthOrder[b.month];
  });

  // Bullet-Proof Physics Lerp Scroll Engine (Smooth, weighted inertia, 100% immune to trigger offsets)
  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      targetProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
    };

    const updatePhysics = () => {
      // 0.075 lerp factor gives that luxurious, weighted, tactile Apple-like glide
      currentProgress += (targetProgress - currentProgress) * 0.075;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      const isMobile = window.innerWidth < 600;
      const maxSlide = isMobile ? -58 : -64;
      const maxProgressWidth = isMobile ? 70 : 96;

      // 1. Move slider horizontally
      if (wholeSliderRef.current) {
        wholeSliderRef.current.style.transform = `translateX(${currentProgress * maxSlide}%)`;
      }

      // 2. Expand green progress line
      const progressPercent = currentProgress * maxProgressWidth;
      if (lineRef.current) {
        lineRef.current.style.width = `${progressPercent}%`;
      }

      // 3. Move glowing traveling indicator dot along the tip
      if (dotRef.current) {
        dotRef.current.style.left = `${progressPercent}%`;
      }

      // 4. Reveal milestones as the traveling dot reaches them
      const totalItems = allJourneyItems.length;
      allJourneyItems.forEach((item, index) => {
        const threshold = (index + 0.3) / totalItems;
        const isPast = currentProgress >= threshold * 0.85;

        const stem = document.querySelector(`.jl-${item.id}`) as HTMLElement | null;
        const dot = document.querySelector(`.jd-${item.id}`) as HTMLElement | null;
        const titleEl = document.querySelector(`.title-${item.id}`) as HTMLElement | null;
        const descEl = document.querySelector(`.description-${item.id}`) as HTMLElement | null;
        const badgeEl = document.querySelector(`.badge-${item.id}`) as HTMLElement | null;

        if (stem) {
          stem.style.transform = isPast ? "scaleY(1)" : "scaleY(0)";
          stem.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        }
        if (dot) {
          dot.style.transform = isPast ? "scale(1)" : "scale(0)";
          dot.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }
        if (badgeEl) {
          badgeEl.style.opacity = isPast ? "1" : "0";
          badgeEl.style.transform = isPast ? "translateY(0)" : "translateY(8px)";
          badgeEl.style.transition = "opacity 0.35s ease-out, transform 0.35s ease-out";
        }
        if (titleEl) {
          titleEl.style.opacity = isPast ? "1" : "0";
          titleEl.style.transform = isPast ? "translateY(0)" : "translateY(14px)";
          titleEl.style.transition = "opacity 0.4s ease-out 0.04s, transform 0.4s ease-out 0.04s";
        }
        if (descEl) {
          descEl.style.opacity = isPast ? "1" : "0";
          descEl.style.transform = isPast ? "translateY(0)" : "translateY(10px)";
          descEl.style.transition = "opacity 0.4s ease-out 0.08s, transform 0.4s ease-out 0.08s";
        }
      });

      // 5. Subtle background tint transition (pure light theme: white -> soft oyster/slate -> white)
      if (sectionRef.current) {
        if (currentProgress > 0.04 && currentProgress < 0.94) {
          sectionRef.current.style.backgroundColor = "#f8faf9";
        } else {
          sectionRef.current.style.backgroundColor = "#ffffff";
        }
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [allJourneyItems.length]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[260vh] max-[600px]:h-[380vh] w-full relative select-none transition-colors duration-700 bg-white"
      style={sectionStyle}
    >
      {/* Sticky Fullscreen Experience Container */}
      <div 
        className="h-screen w-full sticky top-0 flex flex-col justify-center overflow-hidden"
        style={{ position: "sticky", top: 0 }}
      >
        
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[32vw] w-[240vw] items-center gap-[4vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[800vw] max-[600px]:px-[7vw] will-change-transform"
        >
          {/* Leading Media Card with Bespoke Generated Image */}
          <div className="h-full w-[28vw] overflow-hidden rounded-2xl max-[600px]:h-[65vw] max-[600px]:w-[85vw] shadow-lg border border-slate-200/90 bg-white p-2 shrink-0">
            <div className="w-full h-full rounded-xl overflow-hidden relative group">
              <img
                src={imageUrl}
                alt={imageAlt}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-white text-xs font-heading font-black tracking-wider uppercase bg-emerald-700/90 backdrop-blur-md px-2.5 py-1 rounded-md self-start mb-1.5 shadow-sm">
                  Sede Central · Calzada de Tlalpan
                </span>
                <span className="text-slate-200 text-[11px] font-medium leading-snug">
                  Operaciones oficiales, cotejo notarial y entrega express en CDMX.
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Track & Milestones */}
          <div className="relative h-full w-full">
            
            {/* The Horizontal Line Track with Perfectly Synchronized Traveling Dot */}
            <div className="w-full absolute left-0 top-[49%] -translate-y-1/2 flex items-center h-fit z-20 pointer-events-none">
              
              {/* Left start anchor dot */}
              <div
                className="h-3 w-3 max-[600px]:h-4 max-[600px]:w-4 rounded-full z-10 shrink-0 border-2 border-white shadow-sm"
                style={activeStyle}
              />

              {/* Base background track line (light gray) */}
              <div className="relative w-full h-[4px] bg-slate-200/90 rounded-full overflow-visible">
                
                {/* Active green fill line (dynamically expands) */}
                <div
                  ref={lineRef}
                  className="journey-line absolute left-0 top-0 h-full rounded-full will-change-[width]"
                  style={{ width: "0%", backgroundColor: activeColor }}
                />

                {/* Independent Glowing Traveling Dot (Tracks the tip of the line across the journey) */}
                <div
                  ref={dotRef}
                  className="journey-dot-tracker absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 flex items-center justify-center will-change-[left]"
                  style={{ left: "0%" }}
                >
                  {/* Outer pulsating ring */}
                  <span
                    className="absolute w-7 h-7 rounded-full opacity-40 animate-ping"
                    style={activeStyle}
                  />
                  {/* Soft emerald glow aura */}
                  <span
                    className="absolute w-5 h-5 rounded-full opacity-60 blur-[2px]"
                    style={activeStyle}
                  />
                  {/* Solid crisp center core dot */}
                  <span
                    className="relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-md shadow-emerald-950/40"
                    style={activeStyle}
                  />
                </div>

              </div>

              {/* Right end anchor dot */}
              <div
                className="h-3 w-3 max-[600px]:h-4 max-[600px]:w-4 rounded-full z-10 shrink-0 border-2 border-white shadow-sm ml-[-2px]"
                style={activeStyle}
              />
            </div>

            {/* Top Milestones Section */}
            <div className="flex h-1/2 w-full items-center justify-start gap-[1.5vw]">
              
              {/* Styled Track Display Title */}
              <div className="h-full w-[20%] pt-[1vw] max-[600px]:h-fit max-[600px]:pt-[3vw]">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#AFF94F]/20 border border-[#AFF94F]/60 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-950 mb-2 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F] shadow-[0_0_6px_#AFF94F] animate-pulse" />
                  <span>Capítulos 01–07</span>
                </div>
                
                <h2 className="w-[95%] font-heading font-black text-[2.7vw] leading-[0.98] text-slate-900 max-[600px]:text-[8.5vw] tracking-tight">
                  Evolución <br />
                  <span className="text-slate-950 underline decoration-[#AFF94F] decoration-4">
                    Oficial
                  </span>
                </h2>
              </div>

              <div className="w-full flex h-full gap-x-[15vw] max-[600px]:gap-x-[40vw]">
                {topData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[28vw] px-[2vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[6vw]"
                  >
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full pointer-events-none">
                      <div
                        className={`size-[1.1vw] max-[600px]:size-[2.6vw] translate-x-[-50%] relative aspect-square rounded-full jd-${item.id} border-2 border-white shadow-sm z-10 scale-0`}
                        style={activeStyle}
                      />
                      <div
                        className={`h-[94%] w-[2px] origin-bottom rounded-full jl-${item.id} scale-y-0`}
                        style={activeStyle}
                      />
                    </div>

                    <div className="mt-[-0.8vw] space-y-[0.45vw] max-[600px]:mt-[-2vw]">
                      {item.phase && (
                        <div
                          className={`badge-${item.id} inline-flex items-center px-2 py-0.5 rounded bg-[#AFF94F]/25 text-slate-950 border border-[#AFF94F]/70 text-[10px] font-mono font-bold tracking-wider opacity-0`}
                        >
                          {item.phase}
                        </div>
                      )}
                      <h4
                        className={`title-${item.id} font-heading font-black text-[2.5vw] leading-none text-slate-900 max-[600px]:text-[6.4vw] tracking-tight opacity-0`}
                      >
                        {item.year}
                      </h4>
                      <p
                        className={`description-${item.id} w-[95%] text-[1.25vw] leading-[1.28] text-slate-600 font-medium max-[600px]:w-[90%] max-[600px]:text-[4.5vw] opacity-0`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Milestones Section */}
            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[28%] pt-[1vw] max-[600px]:pt-[3vw] max-[600px]:w-[30%] h-full">
                <div className="inline-flex items-center gap-2 bg-[#AFF94F]/20 border border-[#AFF94F]/60 px-3.5 py-1.5 rounded-full shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F] shadow-[0_0_6px_#AFF94F] animate-pulse" />
                  <span className="font-mono text-[1.1vw] font-black tracking-wider leading-none text-slate-950 max-[600px]:text-[3.8vw]">
                    {periodLabel}
                  </span>
                </div>
              </div>

              <div className="w-full flex h-full gap-x-[18vw] ml-[5vw] max-[600px]:gap-x-[40vw] max-[600px]:ml-[7vw]">
                {bottomData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[25vw] px-[2vw] max-[600px]:w-[70vw] max-[600px]:px-[6vw]"
                  >
                    <div className="w-full absolute left-0 bottom-[-1%] h-full pointer-events-none">
                      <div
                        className={`h-[94%] origin-top w-[2px] rounded-full max-[600px]:h-full jl-${item.id} scale-y-0`}
                        style={activeStyle}
                      />
                      <div
                        className={`size-[1.1vw] max-[600px]:size-[2.6vw] translate-x-[-50%] relative w-auto aspect-square rounded-full jd-${item.id} border-2 border-white shadow-sm z-10 scale-0`}
                        style={activeStyle}
                      />
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[0.45vw]">
                      {item.phase && (
                        <div
                          className={`badge-${item.id} inline-flex items-center px-2 py-0.5 rounded bg-[#AFF94F]/25 text-slate-950 border border-[#AFF94F]/70 text-[10px] font-mono font-bold tracking-wider self-start opacity-0`}
                        >
                          {item.phase}
                        </div>
                      )}
                      <h4
                        className={`title-${item.id} font-heading font-black text-[2.5vw] leading-none text-slate-900 max-[600px]:text-[6.4vw] tracking-tight opacity-0`}
                      >
                        {item.year}
                      </h4>
                      <p
                        className={`description-${item.id} w-[95%] text-[1.25vw] leading-[1.28] text-slate-600 font-medium max-[600px]:w-[90%] max-[600px]:text-[4.5vw] opacity-0`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
