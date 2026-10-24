"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { 
  ShieldCheck, 
  ArrowUp, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  FileText, 
  Car, 
  Building2, 
  CheckCircle2, 
  Phone 
} from "lucide-react";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES FOR CICLONATURA
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Rich luxury midnight aesthetic with emerald aurora */
  --footer-bg: #090e17;
  --footer-fg: #f8fafc;
  --footer-accent: #10b981;
  --footer-accent-cyan: #06b6d4;
  --footer-muted: #94a3b8;
  --footer-border: rgba(255, 255, 255, 0.08);

  --pill-bg-1: rgba(255, 255, 255, 0.04);
  --pill-bg-2: rgba(255, 255, 255, 0.01);
  --pill-shadow: rgba(0, 0, 0, 0.4);
  --pill-highlight: rgba(255, 255, 255, 0.12);
  --pill-inset-shadow: rgba(0, 0, 0, 0.6);
  --pill-border: rgba(255, 255, 255, 0.1);
  
  --pill-bg-1-hover: rgba(16, 185, 129, 0.12);
  --pill-bg-2-hover: rgba(6, 182, 212, 0.05);
  --pill-border-hover: rgba(16, 185, 129, 0.4);
  --pill-shadow-hover: rgba(16, 185, 129, 0.2);
  --pill-highlight-hover: rgba(255, 255, 255, 0.25);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.95; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 50px 50px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Theme-adaptive Aurora Glow with Ciclonatura Emerald */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(16, 185, 129, 0.22) 0%, 
    rgba(6, 182, 212, 0.14) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #ffffff;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 21vw;
  line-height: 0.75;
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(16, 185, 129, 0.25));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (GSAP Elastic Physics)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer select-none", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. CICLONATURA MARQUEE TICKER ITEMS
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Validez Oficial SEMOVI</span> <span className="text-emerald-400">✦</span>
    <span>Placas CDMX, Edomex & Morelos</span> <span className="text-sky-400">✦</span>
    <span>Sin Filas Ni Coyotes</span> <span className="text-emerald-400">✦</span>
    <span>Facturación SAT CFDI 4.0</span> <span className="text-sky-400">✦</span>
    <span>Entrega Directa en Valija Foliada</span> <span className="text-emerald-400">✦</span>
    <span>Auditoría REPUVE en Vivo</span> <span className="text-sky-400">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER FOR CICLONATURA
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Parallax animation for giant background text
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: "12vh", scale: 0.85, opacity: 0 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // Staggered Content Reveal
      if (headingRef.current && linksRef.current) {
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 50%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("¡Hola Ciclonatura! Me gustaría recibir asesoría personalizada para iniciar mi trámite vehicular.");
    window.open(`https://wa.me/525547021799?text=${msg}`, "_blank");
  };

  const scrollToCotizador = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("cotizador");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen min-h-[640px] md:min-h-[720px] w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex h-screen min-h-[640px] md:min-h-[720px] w-full flex-col justify-between overflow-hidden bg-[#090e17] text-slate-100 cinematic-footer-wrapper select-none">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text: CICLONATURA */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            CICLONATURA
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-8 sm:top-12 left-0 w-full overflow-hidden border-y border-white/10 bg-[#090e17]/80 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.25em] text-slate-400 uppercase font-heading">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 mt-16 sm:mt-20 w-full max-w-5xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gestoría Vehicular Digital de Próxima Generación</span>
            </div>

            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black footer-text-glow font-heading tracking-tight mb-4 sm:mb-6"
            >
              ¿Listo para regularizar?
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed">
              Trámites vehiculares oficiales en CDMX, Morelos y Edomex. Valija de seguridad sellada en tu puerta, exención de tenencia y asesoría sin intermediarios.
            </p>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              
              {/* Primary Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 w-full">
                <MagneticButton 
                  as="button" 
                  onClick={handleWhatsApp}
                  className="footer-glass-pill px-7 sm:px-9 py-4 rounded-full text-white font-heading font-extrabold text-sm sm:text-base flex items-center gap-3 group border-emerald-500/30 hover:border-emerald-400"
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 text-emerald-400 group-hover:text-white flex items-center justify-center transition-colors">
                    <MessageCircle size={17} />
                  </span>
                  <span>Hablar con un Gestor Vehicular</span>
                </MagneticButton>
                
                <MagneticButton 
                  as="a" 
                  href="#cotizador"
                  onClick={scrollToCotizador}
                  className="footer-glass-pill px-7 sm:px-9 py-4 rounded-full text-slate-200 hover:text-white font-heading font-extrabold text-sm sm:text-base flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 text-sky-400 group-hover:text-white flex items-center justify-center transition-colors">
                    <Sparkles size={17} />
                  </span>
                  <span>Iniciar Cotización en Línea</span>
                </MagneticButton>
              </div>

              {/* Secondary Service Quick Links */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-2 max-w-3xl">
                {[
                  { label: "Placas CDMX, Edomex & Morelos", href: "/servicios/emplacamiento-morelos" },
                  { label: "Cambio de Propietario", href: "/servicios/cambio-de-propietario" },
                  { label: "Altas & Bajas", href: "/servicios/alta-baja-placas" },
                  { label: "Auditoría de Tenencias", href: "/servicios/regularizacion-tenencias" },
                  { label: "Flotillas B2B", href: "/#flotillas" },
                  { label: "Nosotros", href: "/nosotros" },
                  { label: "Contacto Directo", href: "/contacto" }
                ].map((item, idx) => (
                  <MagneticButton 
                    key={idx}
                    as="a" 
                    href={item.href} 
                    className="footer-glass-pill px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-slate-400 hover:text-white font-medium text-xs font-heading"
                  >
                    {item.label}
                  </MagneticButton>
                ))}
              </div>

            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-6 sm:pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-white/5 pt-5">
            
            {/* Copyright & Official Notice */}
            <div className="text-slate-500 text-[10px] sm:text-xs font-semibold tracking-wider uppercase order-2 md:order-1 font-mono text-center md:text-left">
              © {new Date().getFullYear()} CICLONATURA · Trámites 100% Legales y Verificables
            </div>

            {/* "Certificación Oficial" Badge */}
            <div className="footer-glass-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider font-heading">
                Gestoría Oficial
              </span>
              <span className="animate-footer-heartbeat text-xs text-emerald-400">✦</span>
              <span className="text-white font-extrabold text-xs font-heading">CDMX, Morelos & Edomex</span>
            </div>

            {/* Back to top magnetic button */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              title="Volver al inicio"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full footer-glass-pill flex items-center justify-center text-slate-400 hover:text-white group order-3 border-white/10"
            >
              <ArrowUp size={18} className="transform group-hover:-translate-y-1 transition-transform duration-300 text-emerald-400 group-hover:text-white" />
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
