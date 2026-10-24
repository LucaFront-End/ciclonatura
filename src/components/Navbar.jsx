import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Menu, 
  X,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ onNavigateHome, onSelectService, onNavigateContact, onNavigateNosotros }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tramitesDropdown, setTramitesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    }
  };

  const handleDropdownItemClick = (slug) => (e) => {
    e.preventDefault();
    setTramitesDropdown(false);
    setMobileMenuOpen(false);
    if (onSelectService) {
      onSelectService(slug);
    } else {
      window.history.pushState(null, '', `/servicios/${slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      window.history.pushState(null, '', '/contacto');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleNosotrosClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateNosotros) {
      onNavigateNosotros();
    } else {
      window.history.pushState(null, '', '/nosotros');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const serviceNavItems = [
    { label: 'Emplacamiento CDMX, Edomex & Morelos', slug: 'emplacamiento-morelos', time: '48-72 hrs' },
    { label: 'Cambio de Propietario', slug: 'cambio-de-propietario', time: 'Cotejo' },
    { label: 'Altas, Bajas & Reposición', slug: 'alta-baja-placas', time: '24-48 hrs' },
    { label: 'Auditoría de Tenencias', slug: 'regularizacion-tenencias', time: 'Tesorería' },
    { label: 'Flotillas Corporativas', slug: 'flotillas-corporativas', time: 'B2B CFDI' }
  ];

  return (
    <motion.header 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm' 
          : 'py-5 bg-white/60 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="container flex items-center justify-between">
        
        {/* Brand Logo scaled x2 via CSS transform without expanding navbar vertical height */}
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="relative flex items-center justify-start text-decoration-none cursor-pointer h-10 w-28 sm:w-36 overflow-visible"
        >
          <img 
            src={logoImg} 
            alt="Ciclonatura Logo" 
            className="h-10 w-auto object-contain drop-shadow-sm pointer-events-auto transition-transform hover:scale-210"
            style={{ transform: 'scale(2)', transformOrigin: 'left center' }}
          />
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 border border-slate-200/80 rounded-full px-3 py-1.5 backdrop-blur-md shadow-sm">
          
          {/* Trámites Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setTramitesDropdown(true)}
            onMouseLeave={() => setTramitesDropdown(false)}
          >
            <button
              className="text-slate-700 hover:text-slate-950 font-heading font-medium text-sm px-3.5 py-1.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Trámites</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${tramitesDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {tramitesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-80 p-3 mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-xl backdrop-blur-xl z-50"
                >
                  <div className="text-[11px] uppercase tracking-wider text-slate-950 font-black px-3 py-1.5 font-heading">
                    5 Servicios Oficiales
                  </div>
                  {serviceNavItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={`/servicios/${item.slug}`}
                      onClick={handleDropdownItemClick(item.slug)}
                      className="flex items-center justify-between p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors text-sm cursor-pointer"
                    >
                      <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                      <span className="text-[10px] text-slate-950 bg-[#AFF94F] px-2 py-0.5 rounded-md font-mono font-bold border border-[#AFF94F] shadow-2xs">
                        {item.time}
                      </span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a 
            href="/#cobertura" 
            className="text-slate-700 hover:text-slate-950 font-heading font-medium text-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
          >
            <MapPin size={14} className="text-sky-600" />
            <span>Ciudades</span>
          </a>

          <button 
            type="button"
            onClick={handleNosotrosClick}
            className="text-slate-700 hover:text-slate-950 font-heading font-medium text-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Nosotros</span>
          </button>

          <button 
            type="button"
            onClick={handleContactClick}
            className="text-slate-700 hover:text-slate-950 font-heading font-medium text-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Contacto</span>
          </button>
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-3">
          
          {/* WhatsApp Pill */}
          <a
            href="https://wa.me/525547021799?text=Hola%20Ciclonatura,%20deseo%20cotizar%20un%20trámite%20vehicular"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#AFF94F]/20 hover:bg-[#AFF94F]/35 border border-[#AFF94F]/70 px-3.5 py-1.5 rounded-full text-slate-950 text-xs font-black transition-colors shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#AFF94F] shadow-[0_0_8px_#AFF94F] animate-pulse" />
            <span>WhatsApp Activo</span>
          </a>

          {/* Primary CTA */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/525547021799?text=Hola%20Ciclonatura,%20quiero%20iniciar%20mi%20trámite%20vehicular"
            target="_blank"
            rel="noreferrer"
            className="bg-slate-950 hover:bg-[#AFF94F] text-white hover:text-slate-950 font-heading font-black text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-slate-950/15 flex items-center gap-2 transition-all border border-slate-800 hover:border-[#AFF94F]"
          >
            <span>Iniciar Trámite</span>
            <ArrowRight size={14} />
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-3 shadow-lg"
          >
            <a 
              href="/#tramites" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 font-semibold text-base py-1"
            >
              Trámites Principales
            </a>
            <a 
              href="/#cobertura" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 font-semibold text-base py-1"
            >
              Ciudades (CDMX, Edomex, Morelos)
            </a>
            <button 
              type="button"
              onClick={handleNosotrosClick}
              className="text-slate-800 font-semibold text-base py-1 text-left cursor-pointer"
            >
              Nosotros (Quiénes Somos)
            </button>
            <button 
              type="button"
              onClick={handleContactClick}
              className="text-slate-800 font-semibold text-base py-1 text-left cursor-pointer"
            >
              Contacto Directo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
