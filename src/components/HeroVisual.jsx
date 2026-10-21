import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  Car, 
  FileCheck, 
  ArrowUpRight,
  RefreshCw,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import heroCarImg from '../assets/hero_car.png';

export default function HeroVisual() {
  const [activeStepIndex, setActiveStepIndex] = useState(2);

  // 3D Mouse Parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-200, 200], [6, -6]);
  const rotateY = useTransform(springX, [-200, 200], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const trackerSteps = [
    { title: 'Recepción y cotejo', desc: 'Validación de factura y datos en SEMOVI', time: '10:15 AM' },
    { title: 'Ingreso a ventanilla estatal', desc: 'Gestor asignado en módulo oficial', time: '01:30 PM' },
    { title: 'Emisión de placas y tarjeta', desc: 'Documentos oficiales emitidos', time: '04:45 PM' },
    { title: 'Entrega segura en mano', desc: 'Placas listas con comprobante fiscal', time: 'Mañana 11:00 AM' }
  ];

  const handleStepClick = (index) => {
    setActiveStepIndex(index);
    if (index === 3) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#b4f73e', '#38bdf8', '#ffffff']
      });
    }
  };

  const advanceStep = (e) => {
    e.stopPropagation();
    const next = (activeStepIndex + 1) % trackerSteps.length;
    setActiveStepIndex(next);
    if (next === 3) {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#b4f73e', '#38bdf8', '#ffffff']
      });
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '620px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px'
      }}
    >
      
      {/* Dynamic Ambient Background Glows */}
      <div 
        style={{
          position: 'absolute',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180, 247, 62, 0.22) 0%, rgba(0, 58, 150, 0.35) 60%, transparent 80%)',
          filter: 'blur(70px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '520px',
          height: '190px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
          filter: 'blur(55px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Main 3D Tilting Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Subtle glowing platform ring */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          width: '85%',
          height: '65px',
          background: 'radial-gradient(ellipse at center, rgba(180,247,62,0.35) 0%, rgba(56,189,248,0.15) 40%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 1,
          filter: 'blur(14px)'
        }} />

        {/* Hero Vehicle Image with continuous smooth float */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '540px'
          }}
        >
          <img
            src={heroCarImg}
            alt="Ciclonatura Vehicular Service"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.65))',
              userSelect: 'none'
            }}
          />
        </motion.div>

        {/* Floating Card 1: Official Success Badge (Top Right) */}
        <motion.div
          animate={{
            y: [0, -9, 0],
            rotate: [0, 1.2, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          whileHover={{ scale: 1.05 }}
          style={{
            position: 'absolute',
            top: '4%',
            right: '-10px',
            zIndex: 4,
            background: 'rgba(8, 17, 36, 0.88)',
            border: '1px solid rgba(180, 247, 62, 0.35)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '12px 16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(180, 247, 62, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '240px',
            cursor: 'default'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(180, 247, 62, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Sparkles size={20} color="var(--accent-lime)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Placas CDMX</span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(180,247,62,0.2)', color: 'var(--accent-lime)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                48h
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Trámite 100% oficial verificado
            </div>
          </div>
        </motion.div>

        {/* Floating Card 2: Anti-Fraud Guarantee Badge (Top Left) */}
        <motion.div
          animate={{
            y: [0, 9, 0],
            rotate: [0, -1.2, 0]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
          whileHover={{ scale: 1.05 }}
          style={{
            position: 'absolute',
            top: '22%',
            left: '-15px',
            zIndex: 4,
            background: 'rgba(6, 13, 31, 0.88)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '12px 14px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'default'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ShieldCheck size={20} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
              Cero Fraudes
            </div>
            <div style={{ fontSize: '0.70rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              Sin coyotes ni pagos sin factura
            </div>
          </div>
        </motion.div>

        {/* Floating Interactive Live WhatsApp Status Tracker (Bottom Center) */}
        <motion.div
          animate={{
            y: [0, -7, 0]
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{
            position: 'relative',
            marginTop: '-25px',
            zIndex: 5,
            width: '92%',
            maxWidth: '450px',
            background: 'rgba(10, 20, 42, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            borderRadius: '20px',
            padding: '18px 22px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Header of Tracker */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'rgba(37, 211, 102, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquare size={15} color="#25d366" />
              </div>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>
                Seguimiento en Vivo por WhatsApp
              </span>
            </div>
            
            <button
              onClick={advanceStep}
              title="Haz clic para simular el siguiente avance del trámite"
              style={{
                background: 'rgba(37, 211, 102, 0.12)',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                color: '#25d366',
                borderRadius: '9999px',
                padding: '3px 10px',
                fontSize: '0.70rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.12)'}
            >
              <RefreshCw size={10} />
              <span>Simular avance</span>
            </button>
          </div>

          {/* Interactive Steps List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {trackerSteps.map((step, idx) => {
              const isPast = idx < activeStepIndex;
              const isCurrent = idx === activeStepIndex;
              const isFuture = idx > activeStepIndex;

              return (
                <div 
                  key={idx} 
                  onClick={() => handleStepClick(idx)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    background: isCurrent ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isPast || isCurrent 
                      ? 'rgba(180, 247, 62, 0.2)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: isPast || isCurrent 
                      ? '1.5px solid var(--accent-lime)' 
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    flexShrink: 0
                  }}>
                    {isPast ? (
                      <CheckCircle2 size={13} color="var(--accent-lime)" />
                    ) : isCurrent ? (
                      <div className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                    ) : (
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-dim)' }} />
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    fontSize: '0.80rem'
                  }}>
                    <div>
                      <div style={{
                        color: isCurrent ? '#ffffff' : isPast ? 'var(--text-muted)' : 'var(--text-dim)',
                        fontWeight: isCurrent ? 700 : 500
                      }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '1px' }}>
                        {step.desc}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span style={{
                        fontSize: '0.66rem',
                        color: isCurrent ? 'var(--accent-lime)' : 'var(--text-dim)',
                        fontWeight: isCurrent ? 700 : 400
                      }}>
                        {isCurrent ? '● En proceso' : isPast ? '✓ Listo' : step.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micro Footer inside tracker */}
          <div style={{
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: 'var(--text-dim)'
          }}>
            <span>Gestor asignado: <strong>Lic. Carlos M.</strong></span>
            <span style={{ color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <Award size={12} /> Validez oficial garantizada
            </span>
          </div>
        </motion.div>

      </motion.div>

    </div>
  );
}
