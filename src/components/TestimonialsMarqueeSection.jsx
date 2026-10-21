import React from 'react';
import { Star, ShieldCheck, CheckCircle2, ArrowRight, Quote, Sparkles, MessageCircle } from 'lucide-react';

const column1Reviews = [
  {
    id: 'rev-1',
    name: 'Arq. Rodrigo Echeverría',
    role: 'Audi Q5 2022 · Emplacamiento Morelos',
    location: 'Lomas de Chapultepec, CDMX',
    badge: 'Ahorro de Tenencia 100% Legal',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    avatarBg: 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white',
    initials: 'RE',
    time: 'Hace 2 días',
    content:
      'Compré mi camioneta nueva y en la agencia querían cobrarme el doble por tramitar placas de Morelos. Ciclonatura vino directo a mi despacho en Las Lomas, me entregaron láminas con engomado original y factura fiscal del SAT. Verifiqué el QR en el portal oficial y todo impecable.',
  },
  {
    id: 'rev-2',
    name: 'Lic. Mariana Valenzuela',
    role: 'Mazda CX-30 2021 · Cambio de Propietario',
    location: 'Colonia Del Valle, CDMX',
    badge: 'Cotejo Notarial Exitoso',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    avatarBg: 'bg-gradient-to-br from-sky-500 to-blue-700 text-white',
    initials: 'MV',
    time: 'Hace 5 días',
    content:
      'Tenía pavor de hacer el cambio de propietario porque el dueño anterior no encontraba la baja original. Los asesores rastrearon el historial vehicular en 24 horas y me entregaron la tarjeta de circulación con chip oficial. Cero estrés de ir a SEMOVI.',
  },
  {
    id: 'rev-3',
    name: 'Ing. Fernando Garza',
    role: 'Tesla Model 3 · Alta de Placas Ecológicas',
    location: 'Santa Fe, CDMX',
    badge: 'Exento de Verificación 00',
    badgeColor: 'bg-lime-50 text-lime-900 border-lime-200',
    avatarBg: 'bg-gradient-to-br from-lime-600 to-emerald-800 text-white',
    initials: 'FG',
    time: 'Hace 1 semana',
    content:
      'El trámite de auto eléctrico tiene sus mañas con los hologramas verdes. Ciclonatura lo resolvió en tiempo récord. Lo mejor fue poder rastrear cada paso del expediente por WhatsApp con fotos en vivo de la ventanilla gubernamental.',
  },
  {
    id: 'rev-4',
    name: 'Sofía Calderón R.',
    role: 'Seat Ibiza 2019 · Reposición de Tarjeta',
    location: 'Coyoacán, CDMX',
    badge: 'Entrega Express en Domicilio',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    avatarBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
    initials: 'SC',
    time: 'Hace 1 semana',
    content:
      'Perdí mi tarjeta de circulación y me urgía viajar en carretera el fin de semana. En 48 horas ya tenía la nueva tarjeta con chip en la puerta de mi casa con sello notarial. Honestos y transparentes con los costos desde el primer mensaje.',
  },
  {
    id: 'rev-5',
    name: 'Dr. Alejandro Morales',
    role: 'BMW M340i 2023 · Baja y Alta Morelos',
    location: 'Interlomas, Huixquilucan',
    badge: 'Auditoría REPUVE en Vivo',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    avatarBg: 'bg-gradient-to-br from-indigo-500 to-purple-700 text-white',
    initials: 'AM',
    time: 'Hace 2 semanas',
    content:
      'Casi caigo con un coyote de Facebook que me ofrecía placas en 3,000 pesos. Menos mal coticé con Ciclonatura: me mostraron la diferencia entre una placa troquelada legal de SEDENA y una pirata. No arriesguen su libertad ni su coche.',
  },
  {
    id: 'rev-6',
    name: 'Valeria Montes de Oca',
    role: 'Mini Cooper 2020 · Trámite Foráneo',
    location: 'Cuernavaca, Morelos',
    badge: 'Trámite Foráneo Seguro',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    avatarBg: 'bg-gradient-to-br from-teal-500 to-emerald-700 text-white',
    initials: 'VM',
    time: 'Hace 3 semanas',
    content:
      'Vivo en Morelos pero el coche tenía placas viejas de CDMX. Me ahorraron días enteros de filas y trámites burocráticos. La valija llegó con sello de seguridad intacto y comprobante de tesorería emitido a mi nombre.',
  },
];

const column2Reviews = [
  {
    id: 'rev-7',
    name: 'Gabriel Benítez',
    role: 'Toyota Hilux 2023 · Flotilla Empresarial (8 uds)',
    location: 'Naucalpan, Edo. de México',
    badge: 'Factura SAT Deducible',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    avatarBg: 'bg-gradient-to-br from-emerald-600 to-slate-800 text-white',
    initials: 'GB',
    time: 'Hace 4 días',
    content:
      'Administro 8 camionetas de reparto. Necesitábamos placas en tiempo récord para no frenar la logística del negocio. Nos emitieron factura con CFDI deducible y todos los comprobantes de pago de tesorería. Excelente servicio corporativo.',
  },
  {
    id: 'rev-8',
    name: 'Dra. Claudia Domínguez',
    role: 'Mercedes-Benz C200 2022 · Renovación Vigencia',
    location: 'San Jerónimo, CDMX',
    badge: 'Sin Módulos SEMOVI',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    avatarBg: 'bg-gradient-to-br from-purple-500 to-indigo-700 text-white',
    initials: 'CD',
    time: 'Hace 6 días',
    content:
      'Por mis guardias en el hospital no tengo ni una sola mañana libre para perderla formada en un módulo. El mensajero corporativo de Ciclonatura vino por mi expediente y me devolvió todo listo y cotejado. Vale cada centavo.',
  },
  {
    id: 'rev-9',
    name: 'Lic. Esteban Trejo',
    role: 'Golf GTI 2018 · Regularización de Tenencias',
    location: 'Roma Norte, CDMX',
    badge: 'Cero Multas Fantasma',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    avatarBg: 'bg-gradient-to-br from-blue-600 to-cyan-700 text-white',
    initials: 'ET',
    time: 'Hace 1 semana',
    content:
      'El coche arrastraba adeudos de tenencias de 2020 que ni el portal de finanzas explicaba bien. Hicieron el desglose exacto ante tesorería, pagaron sin recargos inventados y me dieron la línea de captura oficial sellada.',
  },
  {
    id: 'rev-10',
    name: 'Mónica Serrato',
    role: 'Kia Seltos 2022 · Emplacamiento Inicial',
    location: 'Satélite, Edo. de México',
    badge: 'Atención 100% Personalizada',
    badgeColor: 'bg-pink-50 text-pink-800 border-pink-200',
    avatarBg: 'bg-gradient-to-br from-rose-500 to-pink-700 text-white',
    initials: 'MS',
    time: 'Hace 2 semanas',
    content:
      'La atención por WhatsApp es de diez. No son bots ni respuestas automáticas genéricas: un gestor certificado revisa tus documentos antes de que transfieras un solo peso. Te da total seguridad desde el minuto uno.',
  },
  {
    id: 'rev-11',
    name: 'Alfonso Ríos',
    role: 'Ford Mustang GT 2021 · Placas Morelos Nuevas',
    location: 'Pedregal, CDMX',
    badge: 'Microtexto SEDENA Auténtico',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    avatarBg: 'bg-gradient-to-br from-amber-600 to-stone-800 text-white',
    initials: 'AR',
    time: 'Hace 3 semanas',
    content:
      'Verifiqué las placas con luz UV y el microtexto de la SEDENA coincide a la perfección con la norma oficial. Es de las pocas empresas serias que te ofrecen respaldo jurídico real en temas vehiculares en México.',
  },
  {
    id: 'rev-12',
    name: 'Patricia Obregón',
    role: 'Honda CR-V 2020 · Cambio de Entidad',
    location: 'Narvarte, CDMX',
    badge: 'Sin Salir de Casa',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    avatarBg: 'bg-gradient-to-br from-teal-600 to-emerald-900 text-white',
    initials: 'PO',
    time: 'Hace 1 mes',
    content:
      'Trámite impecable de principio a fin. En todo momento supe con quién estaba tratando. La entrega puntual y con acta de recepción firmada. Los recomiendo con los ojos cerrados a cualquier amigo o familiar.',
  },
];

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 select-none">
      {/* Top Card Bar: Rating + Time */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-[11px] font-medium text-slate-600">
          {review.time}
        </span>
      </div>

      {/* Review Content */}
      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
        «{review.content}»
      </p>

      {/* Verified Badge */}
      <div className="mb-3.5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide border ${review.badgeColor}`}
        >
          <CheckCircle2 size={12} className="shrink-0" />
          <span>{review.badge}</span>
        </span>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-black text-xs shrink-0 shadow-2xs ${review.avatarBg}`}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
            {review.name}
          </h4>
          <p className="text-[11px] text-slate-600 truncate font-medium">
            {review.role}
          </p>
          <p className="text-[10px] text-slate-600 truncate">
            {review.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsMarqueeSection() {
  // Duplicated arrays ensure perfectly smooth, seamless infinite vertical scrolling
  const col1 = [...column1Reviews, ...column1Reviews];
  const col2 = [...column2Reviews, ...column2Reviews];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Editorial Narrative & Proof */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pr-4 xl:pr-8">
            
            {/* Trust Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold uppercase tracking-wider font-heading mb-4 self-start shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Reseñas 100% Verificadas</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.08] mb-5">
              La certeza de no arriesgar tu auto ni{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                tu patrimonio.
              </span>
            </h2>

            {/* Narrative Excerpt */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Desde ejecutivos en Polanco y flotillas corporativas hasta conductores particulares que evitaron estafas de coyotes en redes sociales. Cada expediente en Ciclonatura cuenta con <strong className="text-slate-900 font-semibold">valija notarial, cotejo REPUVE en tiempo real y factura fiscal deducible</strong>.
            </p>

            {/* Proof Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/90 mb-6">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 mb-0.5">
                  <Star size={15} className="fill-amber-400 text-amber-400" />
                  <span className="font-heading font-black text-slate-900 text-lg">4.9</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  +850 opiniones en Google Maps
                </p>
              </div>

              <div className="text-center sm:text-left border-x border-slate-200 px-2 sm:px-3">
                <div className="font-heading font-black text-slate-900 text-lg mb-0.5">
                  100%
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  Láminas auténticas SEDENA
                </p>
              </div>

              <div className="text-center sm:text-left">
                <div className="font-heading font-black text-slate-900 text-lg mb-0.5">
                  +14,000
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  Gestiones sin filas ni citas
                </p>
              </div>
            </div>

            {/* Interactive CTA & Assurance Note */}
            <div className="space-y-3">
              <a
                href="https://wa.me/525547021799?text=Hola,%20quisiera%20cotizar%20un%20trámite%20vehicular%20con%20Ciclonatura"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-heading font-bold text-sm shadow-md shadow-slate-950/20 transition-all hover:gap-3 cursor-pointer group"
              >
                <MessageCircle size={17} className="text-emerald-400" />
                <span>Cotizar mi trámite por WhatsApp</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>

              <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                <Sparkles size={13} className="text-emerald-600 shrink-0" />
                <span>Pasa el cursor sobre cualquier reseña para pausar la lectura.</span>
              </div>
            </div>

          </div>

          {/* Right Column: 2 Vertical Marquees shifted rightward with zero grey frame and ultra-smooth feathered mask */}
          <div className="lg:col-span-7 lg:pl-8 xl:pl-16">
            <div
              className="relative h-[600px] sm:h-[660px] overflow-hidden marquee-group"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
              }}
            >
              
              {/* Top Eased Gradient Fade (No hard backdrop-blur cutoff line) */}
              <div
                className="absolute inset-x-0 top-0 h-36 sm:h-44 bg-gradient-to-b from-white via-white/90 via-white/50 to-transparent z-20 pointer-events-none"
                aria-hidden="true"
              />

              {/* Bottom Eased Gradient Fade (No hard backdrop-blur cutoff line) */}
              <div
                className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-white via-white/90 via-white/50 to-transparent z-20 pointer-events-none"
                aria-hidden="true"
              />

              {/* The 2 Vertical Running Tracks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 h-full px-1 py-1">
                
                {/* Column 1: Moves Smoothly Upwards */}
                <div className="flex flex-col gap-4 animate-marquee-vertical-up">
                  {col1.map((review, idx) => (
                    <ReviewCard key={`c1-${review.id}-${idx}`} review={review} />
                  ))}
                </div>

                {/* Column 2: Moves Smoothly Downwards (Opposite Direction) */}
                <div className="hidden sm:flex flex-col gap-4 animate-marquee-vertical-down">
                  {col2.map((review, idx) => (
                    <ReviewCard key={`c2-${review.id}-${idx}`} review={review} />
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
