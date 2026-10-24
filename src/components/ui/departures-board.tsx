"use client";

import React, { useState } from "react";
import { 
  TowerControl, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Check, 
  Copy, 
  MessageSquare,
  ArrowRight,
  Radio,
  FileCheck2,
  ExternalLink
} from "lucide-react";
import { Map } from "@/components/ui/departures-board-utils/map";
import RealMexicoMap from "@/components/ui/departures-board-utils/RealMexicoMap";
import {
  FlightRoute,
  FlightRoutes,
  FlightTracker,
  getAirportInfo,
  SingleWorldZoomLimit,
} from "@/components/ui/departures-board-utils/flight";

export const STATUSES = {
  "En Ruta": { label: "En Ruta", color: "#AFF94F", lineStyle: "solid" as const },
  "Troquelado": { label: "Troquelado", color: "#f59e0b", lineStyle: "dash" as const },
  "En Ventanilla": { label: "En Ventanilla", color: "#38bdf8", lineStyle: "dash" as const },
  "Custodia": { label: "Custodia", color: "#c084fc", lineStyle: "dash" as const },
  "Entregado": { label: "Entregado", color: "#34d399", lineStyle: "solid" as const },
} as const;

export type Status = keyof typeof STATUSES;

export interface BoardDispatch {
  number: string;
  from: string;
  to: string;
  departure: string;
  eta: string;
  status: Status;
  vehicle: string;
  service: string;
  courier: string;
  seal: string;
  progress?: number;
}

export const DISPATCHES: readonly BoardDispatch[] = [
  {
    number: "CN-849201",
    from: "CVJ",
    to: "POL",
    departure: "10:15",
    eta: "Hoy 16:45 hrs",
    status: "En Ruta",
    vehicle: "BMW M340i xDrive 2024",
    service: "Emplacamiento en Morelos Oficial (Cero Tenencia)",
    courier: "Lic. Javier Ramos • Unidad Express #04",
    seal: "PC-8891-OFICIAL",
    progress: 0.72,
  },
  {
    number: "CN-730194",
    from: "TLC",
    to: "MEX",
    departure: "11:30",
    eta: "Hoy 17:00 hrs",
    status: "En Ventanilla",
    vehicle: "Porsche Macan GTS 2022",
    service: "Cambio de Propietario Digital & Endosos SAT",
    courier: "Lic. Andrea Morales • Mesa Jurídica CDMX",
    seal: "PC-4102-SEMOVI",
  },
  {
    number: "CN-915420",
    from: "CVJ",
    to: "STF",
    departure: "12:45",
    eta: "Mañana 12:00 hrs",
    status: "Troquelado",
    vehicle: "Audi Q5 Sportback 2023",
    service: "Baja Foránea & Troquelado SEDENA Morelos",
    courier: "Gestor Titular Morelos #PC-7719",
    seal: "PC-7719-SEDENA",
    progress: 0.45,
  },
  {
    number: "CN-604812",
    from: "MEX",
    to: "TLC",
    departure: "09:00",
    eta: "Hoy 18:00 hrs",
    status: "En Ruta",
    vehicle: "12 Vans Mercedes-Benz Sprinter 2025",
    service: "Gestoría Flotillas B2B & Factura CFDI 4.0",
    courier: "Unidad Blindada Ciclonatura B2B #02",
    seal: "PC-0042-CORPORATE",
    progress: 0.88,
  },
  {
    number: "CN-451928",
    from: "MTY",
    to: "MEX",
    departure: "08:00",
    eta: "En 24 hrs hábiles",
    status: "Custodia",
    vehicle: "Ford Mustang Dark Horse 2024",
    service: "Custodia Valija Aérea Monterrey ➔ CDMX",
    courier: "Envío Vehicular Certificado #VAL-99",
    seal: "PC-9912-AEREO",
    progress: 0.35,
  },
  {
    number: "CN-328901",
    from: "QRO",
    to: "CVJ",
    departure: "13:10",
    eta: "Mañana 15:30 hrs",
    status: "En Ventanilla",
    vehicle: "Mercedes-Benz C300 Coupé",
    service: "Alta Morelos con Exención Permanente Tenencia",
    courier: "Mesa Técnica Bajío SMyT",
    seal: "PC-3310-BAJIO",
  },
  {
    number: "CN-204183",
    from: "PUE",
    to: "MEX",
    departure: "14:00",
    eta: "Hoy 19:30 hrs",
    status: "En Ruta",
    vehicle: "Land Rover Defender 110",
    service: "Reemplacamiento CDMX & Tarjeta RFID Inteligente",
    courier: "Mensajería Express Corredor Puebla-CDMX",
    seal: "PC-5520-PUEBLA",
    progress: 0.58,
  },
  {
    number: "CN-512049",
    from: "GDL",
    to: "MEX",
    departure: "07:30",
    eta: "Entregado con Éxito",
    status: "Entregado",
    vehicle: "Corvette Stingray 2023",
    service: "Auditoría Legal de Facturas & Láminas CDMX",
    courier: "Acuse en Mano y Factura CFDI 4.0 Entregada",
    seal: "PC-1102-FINAL",
    progress: 1.0,
  },
];

const FILTERS = ["Todos", ...Object.keys(STATUSES)] as readonly string[];

export default function DeparturesBoard() {
  const [filter, setFilter] = useState<string>("Todos");
  const [selected, setSelected] = useState<string | null>("CN-849201");
  const [copied, setCopied] = useState(false);

  const visibleDispatches = DISPATCHES.filter(
    (dispatch) => filter === "Todos" || dispatch.status === filter
  );

  const selectedDispatch =
    visibleDispatches.find((d) => d.number === selected) ??
    DISPATCHES.find((d) => d.number === selected) ??
    visibleDispatches[0] ??
    null;

  const contextRoutes = visibleDispatches.filter(
    (d) => d.number !== selectedDispatch?.number
  );

  const handleCopy = (folio: string) => {
    navigator.clipboard?.writeText(folio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = (item: BoardDispatch) => {
    const text = encodeURIComponent(
      `🏛️ *TORRE DE CONTROL CICLONATURA MÉXICO*\n` +
      `*Folio:* #${item.number}\n` +
      `*Vehículo:* ${item.vehicle}\n` +
      `*Ruta:* ${item.from} → ${item.to}\n` +
      `*Estatus:* ${item.status}\n` +
      `*ETA:* ${item.eta}\n` +
      `\nHola, solicito el estatus legal y copia del acuse oficial de mi trámite #${item.number}.`
    );
    window.open(`https://wa.me/525547021799?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col w-full rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/5 overflow-hidden font-sans">
      
      {/* ======================================================== */}
      {/* MAIN BENTO GRID: SIDEBAR BOARD (LEFT) + MEXICO MAP (RIGHT)*/}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 min-h-[500px] lg:min-h-[560px] w-full min-w-0 lg:grid-cols-[380px_1fr]">
        
        {/* ASIDE: DISPATCHES BOARD */}
        <aside className="flex min-h-0 flex-col border-b border-slate-200/90 lg:border-r lg:border-b-0 bg-white">
          
          {/* Board Title Header */}
          <div className="border-b border-slate-200/90 bg-slate-950 px-5 py-3 text-white flex items-center justify-between">
            <p className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-slate-300">
              <TowerControl size={14} className="text-[#AFF94F]" aria-hidden="true" />
              <span>TORRE DE CONTROL • MÉXICO</span>
            </p>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#AFF94F] bg-[#AFF94F]/15 border border-[#AFF94F]/40 px-2.5 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#AFF94F] animate-ping" />
              <span>EN VIVO</span>
            </span>
          </div>

          {/* Filter Pills */}
          <div
            role="group"
            aria-label="Filter by status"
            className="flex flex-wrap gap-1.5 border-b border-slate-100 p-2.5 bg-slate-50/70"
          >
            {FILTERS.map((status) => {
              const isSelected = filter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  aria-pressed={isSelected}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-mono font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-xs"
                      : "border-slate-200 bg-white text-slate-600 hover:text-slate-950 hover:border-slate-300"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {/* Dispatches List Scrollable */}
          <ul
            aria-label="Ciclonatura departure board"
            className="max-h-72 min-h-0 flex-1 overflow-y-auto p-2 lg:max-h-[380px] divide-y divide-slate-100"
          >
            {visibleDispatches.map((dispatch) => {
              const isActive = selectedDispatch?.number === dispatch.number;
              const toHub = getAirportInfo(dispatch.to);
              const statusConf = STATUSES[dispatch.status];

              return (
                <li key={dispatch.number} className="py-1">
                  <button
                    type="button"
                    onClick={() => setSelected(dispatch.number)}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#AFF94F]/20 border border-[#84cc16]/70 shadow-xs"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    {/* Departure Clock Time */}
                    <div className="shrink-0 text-center">
                      <span className="block font-mono text-[11px] font-bold text-slate-900">
                        {dispatch.departure}
                      </span>
                      <span className="block text-[9px] font-mono text-slate-400">
                        SALIDA
                      </span>
                    </div>

                    {/* Middle Info: Folio & Destination */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs font-black tracking-tight ${
                            isActive ? "text-slate-950" : "text-slate-900"
                          }`}
                        >
                          #{dispatch.number}
                        </span>
                        <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 text-slate-700 truncate max-w-[120px]">
                          {dispatch.from} → {dispatch.to}
                        </span>
                      </div>
                      
                      <span className="block truncate text-xs text-slate-800 font-semibold mt-0.5">
                        {dispatch.vehicle}
                      </span>
                      
                      <span className="block truncate text-[10px] text-slate-500 font-sans">
                        {dispatch.service}
                      </span>
                    </div>

                    {/* Right Status Dot */}
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: statusConf.color,
                            boxShadow: isActive ? `0 0 6px ${statusConf.color}` : undefined,
                          }}
                        />
                        <span className="font-mono text-[10px] font-bold text-slate-700">
                          {dispatch.status.toUpperCase()}
                        </span>
                      </span>
                      {dispatch.progress !== undefined && (
                        <span className="text-[9px] font-mono text-slate-400">
                          {Math.round(dispatch.progress * 100)}%
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}

            {visibleDispatches.length === 0 ? (
              <li className="px-3 py-8 text-center text-xs font-mono text-slate-500">
                Sin despachos activos en estatus &ldquo;{filter}&rdquo;.
              </li>
            ) : null}
          </ul>

          {/* Footer Counter */}
          <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-2.5 font-mono text-[10px] text-slate-500 flex items-center justify-between">
            <span>{visibleDispatches.length} DE {DISPATCHES.length} DESPACHOS EN RUTA</span>
            <span className="text-slate-700 font-bold">MÉXICO REPUVE / SMyT</span>
          </div>
        </aside>

        {/* MAP PANEL (RIGHT) WITH REAL LEAFLET CARTOGRAPHY & REAL HIGHWAYS */}
        <div className="relative min-h-[460px] lg:min-h-[580px] flex flex-col bg-slate-100 border-t lg:border-t-0 border-slate-200 overflow-hidden">
          <RealMexicoMap selectedDispatch={selectedDispatch} />

          {/* Telemetry Detail Strip at bottom of map in Light Mode */}
          {selectedDispatch && (
            <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 sm:p-5 text-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                  <Truck size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-slate-950">
                      #{selectedDispatch.number}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedDispatch.number)}
                      title="Copiar folio"
                      className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      {copied ? <Check size={13} className="text-[#65a30d]" /> : <Copy size={13} />}
                    </button>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#AFF94F]/30 text-slate-950 font-bold border border-[#AFF94F]/70">
                      Precinto: #{selectedDispatch.seal}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    <strong className="text-slate-900">{selectedDispatch.vehicle}</strong> • <span>{selectedDispatch.courier}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right hidden md:block">
                  <span className="block text-[10px] font-mono text-slate-400 font-bold">ETA ESTIMADA:</span>
                  <span className="block text-xs font-mono font-black text-slate-950">
                    {selectedDispatch.eta}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsApp(selectedDispatch)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-[#AFF94F] text-white hover:text-slate-950 text-xs font-heading font-black transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare size={13} />
                  <span>Reporte WhatsApp</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
