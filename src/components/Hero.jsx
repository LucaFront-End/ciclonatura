import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Layers,
  ChevronRight
} from 'lucide-react';
import HeroVisual from './HeroVisual';
import QuickSelector from './QuickSelector';

export default function Hero({ onOpenSiteMap }) {
  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Cyber-Grids and Radial Glows */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 58, 150, 0.25) 0%, rgba(3, 10, 22, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180, 247, 62, 0.12) 0%, rgba(3, 10, 22, 0) 70%)',
          filter: 'blur(90px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* Subtle modern dot-grid overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, transparent 80%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Left Column: Messaging & Conversion Engine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                background: 'rgba(180, 247, 62, 0.08)',
                border: '1px solid rgba(180, 247, 62, 0.25)',
                borderRadius: '9999px',
                marginBottom: '20px',
                backdropFilter: 'blur(8px)'
              }}
            >
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--accent-lime)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                Gestoría Vehicular de Próxima Generación
              </span>
            </motion.div>

            {/* Main H1 Headline */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '18px',
              color: '#ffffff'
            }}>
              Tu vehículo en regla,{' '}
              <span style={{
                color: 'var(--accent-lime)',
                textShadow: '0 0 30px rgba(180, 247, 62, 0.4)'
              }}>
                sin filas
              </span>{' '}
              ni riesgos en México.
            </h1>

            {/* Subtitle / Pitch */}
            <p style={{
              fontSize: '1.08rem',
              lineHeight: 1.65,
              color: 'var(--text-muted)',
              maxWidth: '560px',
              marginBottom: '24px'
            }}>
              Regularizamos tus placas, verificación y refrendo en <strong style={{ color: '#ffffff' }}>CDMX, Edomex y Morelos</strong>{' '}
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>80% más rápido</span>. Procesos 100% oficiales ante las autoridades, cero coyotes y seguimiento en tiempo real vía WhatsApp.
            </p>

            {/* CTAs Action Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/525548116379?text=Hola%20Ciclonatura,%20quiero%20iniciar%20mi%20trámite%20vehicular"
                target="_blank"
                rel="noreferrer"
                className="btn-primary shimmer-effect"
                style={{ fontSize: '1rem', padding: '14px 28px' }}
              >
                <span>Iniciar mi trámite</span>
                <ArrowRight size={18} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/525548116379?text=Hola%20Ciclonatura,%20deseo%20asesoría%20con%20un%20ejecutivo"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ fontSize: '0.96rem', padding: '14px 24px' }}
              >
                <MessageSquare size={17} color="#25d366" />
                <span>Contactar a un ejecutivo</span>
              </motion.a>

              {/* Quick site map trigger pill */}
              <button
                onClick={onOpenSiteMap}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}
              >
                <Layers size={14} />
                <span>Ver arquitectura del sitio</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Quick Interactive State / Procedure Selector */}
            <QuickSelector />

            {/* Trust Counters Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.07)'
            }}>
              {[
                { value: '+1,000', label: 'Trámites oficiales', highlight: false },
                { value: '80%', label: 'Más rápido', highlight: true },
                { value: '+180', label: 'Ciudades cubiertas', highlight: false },
                { value: '99%', label: 'Satisfacción', highlight: false }
              ].map((stat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: stat.highlight ? 'var(--accent-lime)' : '#ffffff'
                  }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '2px', lineHeight: 1.3 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: 3D Visual & Interactive Tracker Showcase */}
          <div style={{ position: 'relative' }}>
            <HeroVisual />
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
