import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function FooterSimple() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-10 text-slate-600 text-sm">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Ciclonatura" className="h-9 w-auto" />
            <span className="text-slate-500 text-xs sm:text-sm">
              Gestoría vehicular digital de próxima generación en CDMX, Edomex y Morelos.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-slate-800 font-medium">
              <Phone size={14} className="text-lime-600" />
              <span>(55) 4811 6379</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-800 font-medium">
              <Mail size={14} className="text-sky-600" />
              <span>info@ciclonatura.com</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin size={14} className="text-slate-400" />
              <span>Tlalpan, Ciudad de México</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-5 gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} CICLONATURA. Todos los derechos reservados. Trámites 100% oficiales y verificables.
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.ciclonatura.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-slate-600"
            >
              Sitio Original (Wix)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
