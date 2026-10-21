import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const CITIES_DATA = {
  cdmx: {
    name: 'Ciudad de México',
    short: 'CDMX',
    accentColor: '#0284c7',
    procedures: [
      { id: 'alta', name: 'Alta de Placas', time: '24-48 hrs', badge: 'Sin Cita Previa' },
      { id: 'baja', name: 'Baja Vehicular', time: '48 hrs', badge: 'Rápido' },
      { id: 'refrendo', name: 'Refrendo y Tenencia', time: 'Mismo día', badge: 'Digital' },
      { id: 'tarjeta', name: 'Reposición de Tarjeta', time: '2-3 días', badge: 'Oficial' }
    ],
    highlight: 'Trámites directos ante SEMOVI sin filas ni intermediarios irregulares.'
  },
  edomex: {
    name: 'Estado de México',
    short: 'EDOMEX',
    accentColor: '#65a30d',
    procedures: [
      { id: 'reemplacamiento', name: 'Reemplacamiento 2026', time: '3-5 días', badge: 'Obligatorio' },
      { id: 'verificacion', name: 'Verificación Vehicular', time: 'Sin multas', badge: 'Garantizado' },
      { id: 'cambio', name: 'Cambio de Propietario', time: '3-4 días', badge: 'Seguro' },
      { id: 'adeudos', name: 'Regularización de Adeudos', time: 'Express', badge: 'Ahorro' }
    ],
    highlight: 'Regularización oficial ante la Secretaría de Finanzas del Estado de México.'
  },
  morelos: {
    name: 'Estado de Morelos',
    short: 'MORELOS',
    accentColor: '#d97706',
    procedures: [
      { id: 'permiso', name: 'Permiso para Circular 30 días', time: 'Mismo día', badge: '100% Válido' },
      { id: 'placas_mor', name: 'Emplacamiento Foráneo', time: '3-6 días', badge: 'Sin Tenencia' },
      { id: 'refrendo_mor', name: 'Refrendo Anual', time: '24 hrs', badge: 'Fácil' },
      { id: 'tarjeta_mor', name: 'Reposición Tarjeta Circulación', time: '48 hrs', badge: 'Oficial' }
    ],
    highlight: 'Ahorra en impuestos de tenencia con emplacamiento y permisos oficiales de Morelos.'
  }
};

export default function QuickSelector() {
  const [activeCity, setActiveCity] = useState('cdmx');
  const [selectedProc, setSelectedProc] = useState(CITIES_DATA.cdmx.procedures[0]);

  const currentCityData = CITIES_DATA[activeCity];

  const handleCityChange = (cityKey) => {
    setActiveCity(cityKey);
    setSelectedProc(CITIES_DATA[cityKey].procedures[0]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl shadow-slate-900/5 relative overflow-hidden">
      {/* Background glow accent */}
      <div 
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-15 blur-2xl pointer-events-none transition-all duration-500"
        style={{ backgroundColor: currentCityData.accentColor }}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-lime-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-heading">
            Cotizador Rápido por Entidad
          </span>
        </div>
        <span className="text-xs font-semibold text-lime-700 flex items-center gap-1.5 bg-lime-50 px-2.5 py-1 rounded-full border border-lime-200">
          <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
          Ventanilla Abierta
        </span>
      </div>

      {/* City Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-2xl mb-4">
        {Object.entries(CITIES_DATA).map(([key, data]) => {
          const isActive = activeCity === key;
          return (
            <button
              key={key}
              onClick={() => handleCityChange(key)}
              className={`relative py-2 px-3 rounded-xl font-heading text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isActive ? 'text-slate-950' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCityTabLight"
                  className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                <MapPin size={13} className={isActive ? 'text-lime-600' : 'text-slate-400'} />
                {data.short}
              </span>
            </button>
          );
        })}
      </div>

      {/* Procedures Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {currentCityData.procedures.map((proc) => {
          const isSelected = selectedProc?.id === proc.id;
          return (
            <motion.div
              key={proc.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedProc(proc)}
              className={`cursor-pointer p-3 rounded-2xl border transition-all flex flex-col gap-1 ${
                isSelected 
                  ? 'bg-lime-50/70 border-lime-500/80 shadow-xs' 
                  : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {proc.name}
                </span>
                {isSelected && <CheckCircle2 size={15} className="text-lime-600" />}
              </div>
              
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock size={11} /> {proc.time}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  {proc.badge}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck size={14} className="text-lime-600" />
          <span>Gestión directa 100% legal con comprobante</span>
        </div>

        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#84cc16', '#0284c7', '#0f172a']
            });
          }}
          href={`https://wa.me/525548116379?text=Hola%20Ciclonatura,%20quiero%20cotizar%20${encodeURIComponent(selectedProc?.name || 'trámite')}%20en%20${encodeURIComponent(currentCityData.name)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white py-2.5 px-5 rounded-full shadow-md shadow-slate-950/15 transition-all"
        >
          <span>Cotizar {selectedProc?.name}</span>
          <ArrowRight size={14} />
        </motion.a>
      </div>
    </div>
  );
}
