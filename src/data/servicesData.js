import morelosPlateImg from '@/assets/services/morelos_plate_official.jpg';
import tarjetaChipImg from '@/assets/services/tarjeta_circulacion_chip.jpg';
import contratoNotarialImg from '@/assets/services/contrato_notarial_endoso.jpg';
import tesoreriaReceiptImg from '@/assets/services/tesoreria_linea_captura.jpg';
import valijaSeguraImg from '@/assets/services/valija_seguridad_notarial.jpg';
import flotillaPatioImg from '@/assets/services/flotilla_corporativa_patio.jpg';
import repuveScannerImg from '@/assets/services/inspeccion_repuve_oficial.jpg';
import troqueladoSedenaImg from '@/assets/services/troquelado_placas_sedena.jpg';

// =========================================================================
// CICLONATURA - MASTER SERVICES DATA REPOSITORY
// Complete specifications for the 5 official vehicular & notary services
// =========================================================================

export const SERVICES_DATA = {
  'emplacamiento-morelos': {
    id: 'emplacamiento-morelos',
    slug: 'emplacamiento-morelos',
    code: 'SRV-01',
    name: 'Emplacamiento en Morelos',
    shortName: 'Placas Morelos',
    category: 'Alta Oficial & Reemplacamiento',
    badge: '100% Exento de Tenencia • Troquelado SEDENA',
    tagline: 'Ahorro fiscal legítimo y placas troqueladas en 48–72 hrs',
    description: 'Gestión oficial de alta de láminas en el Estado de Morelos con entrega a domicilio en CDMX. Sin filas, con valija foliada, cotejo de autenticidad en portal oficial y factura SAT deducible.',
    turnaround: '48 a 72 hrs',
    officialAuthority: 'Secretaría de Movilidad y Transporte de Morelos (SMyT)',
    accentColor: '#059669',
    accentLight: 'rgba(5, 150, 105, 0.08)',
    accentBorder: 'rgba(5, 150, 105, 0.25)',
    heroMonograph: 'Monografía No. 01 • Morelos 2026',
    heroTitle: 'Emplacamiento\nMorelos Oficial.',
    heroSubtitle: 'La vía legal para autos particulares, deportivos y camionetas. Cero tenencia estatal con entrega notarial en mano.',
    heroImages: [
      { src: morelosPlateImg, alt: "Placa oficial de Morelos troquelada con sello holográfico" },
      { src: troqueladoSedenaImg, alt: "Troquelado de láminas metálicas bajo norma SEDENA" },
      { src: tarjetaChipImg, alt: "Tarjeta de circulación con chip RFID inteligente" },
      { src: valijaSeguraImg, alt: "Valija de seguridad foliada para entrega en CDMX" },
      { src: repuveScannerImg, alt: "Arco de verificación vehicular satelital REPUVE" },
      { src: tesoreriaReceiptImg, alt: "Línea de captura bancaria con exención oficial de tenencia" },
      { src: contratoNotarialImg, alt: "Cotejo notarial de factura y expediente vehicular" },
      { src: flotillaPatioImg, alt: "Patio de entrega y verificación en Calzada de Tlalpan" },
    ],

    // Unique Scroll-based Chronological Timeline
    processTimeline: [
      {
        step: '01',
        timeframe: 'Minuto 0 – 30',
        title: 'Recepción & Auditoría REPUVE / SAT',
        desc: 'Escaneo de tu factura de origen, cotejo contra bases de datos federales del REPUVE y validación de RFC para evitar homónimos o adeudos ocultos.',
        tag: 'Auditoría Digital 256-bit',
        icon: 'FileSearch'
      },
      {
        step: '02',
        timeframe: 'Día 1 (Mañana)',
        title: 'Ingreso en Ventanilla Gubernamental',
        desc: 'Nuestro gestor certificado ingresa tu expediente directamente en la SMyT con línea de captura bancaria oficial pagada y foliada ante Hacienda estatal.',
        tag: 'Gestor Notarial Titular',
        icon: 'Building'
      },
      {
        step: '03',
        timeframe: 'Día 2 (Mediodía)',
        title: 'Troquelado SEDENA & Tarjeta con Chip',
        desc: 'Emisión de láminas de aluminio de alta seguridad troqueladas bajo estándar militar SEDENA, con engomado alfanumérico y chip RFID en la tarjeta.',
        tag: 'Láminas Originales SEDENA',
        icon: 'ShieldCheck'
      },
      {
        step: '04',
        timeframe: 'Día 3 (Tarde)',
        title: 'Entrega en Valija Notarial Sellada',
        desc: 'Recibe tus láminas, tarjeta y comprobante de pago bancario en tu domicilio en CDMX/Edomex o recógelas en nuestra sede en Calzada de Tlalpan.',
        tag: 'Valija Foliada Puerta a Puerta',
        icon: 'PackageCheck'
      }
    ],

    // Scroll-based Sticky Text (Left) + Dynamic Image (Right)
    stickyFeatures: [
      {
        id: 'legalidad-fiscal',
        step: '01',
        title: 'Ahorro Legal sin Riesgos',
        subtitle: 'El régimen de Morelos elimina el impuesto sobre tenencia estatal para particulares y empresas.',
        desc: 'No es evasión: es una exención formal sustentada en la Ley de Ingresos del Estado de Morelos. Tramitamos tu alta con comprobante de domicilio verificado y cotejo notarial.',
        badge: 'Cero Tenencia Anual',
        metric: '100%',
        metricLabel: 'Certidumbre fiscal',
        points: [
          'Exención legal para vehículos de cualquier valor comercial',
          'Línea de captura oficial expedida por la Secretaría de Hacienda',
          'Comprobante bancario sellado entregado con tus láminas'
        ],
        imageUrl: tesoreriaReceiptImg,
        imageCaption: 'Línea de captura bancaria con exención oficial de tenencia'
      },
      {
        id: 'troquelado-sedena',
        step: '02',
        title: 'Troquelado Oficial SEDENA',
        subtitle: 'Láminas metálicas certificadas con sellos holográficos de seguridad.',
        desc: 'Rechaza placas de coyote hechas de cartón o lámina apócrifa. Nuestras placas cuentan con código bidimensional QR dinámico, remaches de seguridad y registro activo en el portal SMyT.',
        badge: 'Seguridad Militar',
        metric: 'QR Activo',
        metricLabel: 'Verificable en vivo',
        points: [
          'Holograma reflectivo de alta duración resistente a rayos UV',
          'Código QR escaneable ante cualquier retén policial federal',
          'Tarjeta de circulación con chip criptográfico inviolable'
        ],
        imageUrl: morelosPlateImg,
        imageCaption: 'Placas oficiales troqueladas con código QR y sello SEDENA'
      },
      {
        id: 'entrega-blindada',
        step: '03',
        title: 'Valija Notarial Foliada',
        subtitle: 'Seguridad máxima desde la ventanilla gubernamental hasta tus manos.',
        desc: 'Tus documentos viajan en valijas herméticas foliadas con sellos inviolables. Si el sello está alterado, no recibes el paquete. Garantía absoluta de privacidad y custodia documental.',
        badge: 'Custodia Notarial',
        metric: '48–72h',
        metricLabel: 'Plazo garantizado',
        points: [
          'Mensajero propio con gafete oficial y rastreo GPS',
          'Entrega personal con acuse de recibo y firma digital',
          'Factura electrónica CFDI 4.0 deducible ante el SAT'
        ],
        imageUrl: valijaSeguraImg,
        imageCaption: 'Valija de seguridad foliada con sellos inviolables'
      }
    ],

    // Requirements Matrix
    requirements: [
      {
        category: 'Persona Física',
        items: [
          'Factura de origen legible (o carta factura vigente con copia de factura)',
          'Identificación oficial vigente del titular (INE o Pasaporte)',
          'Comprobante de domicilio reciente (agua, luz o predial, no mayor a 3 meses)',
          'Comprobante de baja vehicular previa (en caso de cambio de entidad)'
        ]
      },
      {
        category: 'Persona Moral / Empresa',
        items: [
          'Acta constitutiva con inscripción en el Registro Público',
          'Poder notarial del representante legal e INE vigente',
          'Constancia de Situación Fiscal (CSF) emitida por el SAT no mayor a 30 días',
          'Factura electrónica XML y PDF a nombre de la empresa'
        ]
      }
    ],

    // Calculator presets
    pricing: {
      governmentRights: '$2,850 MXN',
      gestoriaFee: '$1,950 MXN',
      totalEstimated: '$4,800 MXN',
      savingsVsCoyote: 'Ahorro de hasta $45,000 MXN en tenencias y multas'
    }
  },

  'cambio-de-propietario': {
    id: 'cambio-de-propietario',
    slug: 'cambio-de-propietario',
    code: 'SRV-02',
    name: 'Cambio de Propietario Digital',
    shortName: 'Cambio de Propietario',
    category: 'Transmisión Notarial & Registro',
    badge: 'Cotejo de Endosos • Tarjeta con Chip Nuevo Titular',
    tagline: 'Compra o vende entre particulares con certeza jurídica absoluta',
    description: 'Actualiza la titularidad oficial de tu auto ante SEMOVI o Edomex. Auditamos la cadena ininterrumpida de facturas, cotejamos firmas en endoso, cancelamos multas del anterior dueño y emitimos tu tarjeta de circulación a tu nombre.',
    turnaround: '48 a 72 hrs',
    officialAuthority: 'Secretaría de Movilidad CDMX / Secretaría de Finanzas Edomex',
    accentColor: '#0284c7',
    accentLight: 'rgba(2, 132, 199, 0.08)',
    accentBorder: 'rgba(2, 132, 199, 0.25)',
    heroMonograph: 'Monografía No. 02 • Transmisión 2026',
    heroTitle: 'Cambio de\nPropietario Legal.',
    heroSubtitle: 'Blindaje jurídico total entre comprador y vendedor. Nueva tarjeta de circulación con chip y registro limpio en REPUVE.',
    heroImages: [
      { src: contratoNotarialImg, alt: "Contrato notarial de compraventa y endoso de factura con llaves" },
      { src: tarjetaChipImg, alt: "Tarjeta de circulación emitida a nombre del nuevo titular con chip RFID" },
      { src: repuveScannerImg, alt: "Auditoría en arco carretero REPUVE y cotejo federal" },
      { src: tesoreriaReceiptImg, alt: "Línea de captura bancaria con liquidación de adeudos y multas anteriores" },
      { src: valijaSeguraImg, alt: "Entrega notarial de expediente vehicular en valija foliada" },
      { src: morelosPlateImg, alt: "Placas oficiales registradas a nombre del nuevo propietario" },
      { src: flotillaPatioImg, alt: "Sede de verificación física y documental Ciclonatura" },
      { src: troqueladoSedenaImg, alt: "Validación de autenticidad de láminas troqueladas" },
    ],

    processTimeline: [
      {
        step: '01',
        timeframe: 'Minuto 0 – 45',
        title: 'Cotejo Notarial de Factura & Endosos',
        desc: 'Revisión exhaustiva de la secuencia ininterrumpida de endosos mercantiles. Verificamos que no existan firmas apócrifas o saltos de propietario.',
        tag: 'Auditoría Mercantil',
        icon: 'FileCheck'
      },
      {
        step: '02',
        timeframe: 'Día 1 (Tarde)',
        title: 'Depuración de Infracciones del Dueño Anterior',
        desc: 'Exigimos y validamos el estatus de no adeudo ante la Secretaría de Administración Tributaria. Te blindamos para que no pagues fotocívicas ajenas.',
        tag: 'Filtro Anti-Deudas',
        icon: 'ShieldAlert'
      },
      {
        step: '03',
        timeframe: 'Día 2 (Mañana)',
        title: 'Actualización en Padrón Vehicular SEMOVI',
        desc: 'Ingreso formal de tu expediente. Se destruye o cancela la tarjeta anterior y se da de alta al nuevo titular en el Registro Público Vehicular.',
        tag: 'Padrón Oficial Actualizado',
        icon: 'UserCheck'
      },
      {
        step: '04',
        timeframe: 'Día 3 (Mañana)',
        title: 'Entrega de Tarjeta con Chip Nuevo Titular',
        desc: 'Te entregamos tu nueva tarjeta de circulación plastificada con chip criptográfico y tu contrato de compraventa con sellos de cotejo notarial.',
        tag: 'Tarjeta Oficial en Mano',
        icon: 'CreditCard'
      }
    ],

    stickyFeatures: [
      {
        id: 'cadena-endosos',
        step: '01',
        title: 'Cadena de Endosos Blindada',
        subtitle: 'Garantía legal de que el vendedor tiene facultades plenas para transmitir la propiedad.',
        desc: 'Uno de los fraudes más comunes en autos usados es comprar a quien no puede endosar legalmente. Auditamos cada endoso mercantil para proteger tu patrimonio de demandas civiles o embargos.',
        badge: 'Cero Riesgo Jurídico',
        metric: '100%',
        metricLabel: 'Endosos validados',
        points: [
          'Validación de firmas autógrafas y cotejo con identificaciones',
          'Revisión en el Buró Vehicular Nacional y Registro de Garantías',
          'Contrato de compraventa redactado por abogados mercantiles'
        ],
        imageUrl: contratoNotarialImg,
        imageCaption: 'Revisión notarial minuciosa de cada endoso y contrato de compraventa'
      },
      {
        id: 'tarjeta-chip',
        step: '02',
        title: 'Nueva Tarjeta con Chip Oficial',
        subtitle: 'Tarjeta de circulación expedida directamente a tu nombre en la base de datos oficial.',
        desc: 'Tu nombre, RFC y domicilio registrados legalmente. El chip contiene tu folio único de circulación que responde de inmediato en arcos carreteros y retenes de tránsito.',
        badge: 'Chip Criptográfico',
        metric: 'SEMOVI',
        metricLabel: 'Registro en vivo',
        points: [
          'Impresión térmica original de la Secretaría de Movilidad',
          'Código QR que despliega tu vigencia en tiempo real',
          'Cancelación automática de cualquier responsabilidad del vendedor'
        ],
        imageUrl: tarjetaChipImg,
        imageCaption: 'Tarjeta de circulación oficial emitida con chip RFID criptográfico'
      },
      {
        id: 'deslinde-fiscal',
        step: '03',
        title: 'Deslinde Notarial de Responsabilidades',
        subtitle: 'Si vendiste, te protegemos de fotomultas y delitos cometidos por el comprador.',
        desc: 'Emitimos el aviso oficial de enajenación ante SEMOVI. A partir del minuto de ingreso, cualquier incidente vial o penal deja de estar vinculado a tu nombre de forma definitiva.',
        badge: 'Deslinde Inmediato',
        metric: '0 Multas',
        metricLabel: 'Heredadas',
        points: [
          'Aviso formal de venta con sello y folio de acuse oficial',
          'Protección civil y penal ante el Ministerio Público',
          'Comprobante fiscal deducible para tu contabilidad'
        ],
        imageUrl: valijaSeguraImg,
        imageCaption: 'Firma de deslinde notarial y custodia en valija sellada'
      }
    ],

    requirements: [
      {
        category: 'Comprador (Nuevo Titular)',
        items: [
          'Identificación oficial vigente (INE o Pasaporte)',
          'Comprobante de domicilio en CDMX o Edomex (no mayor a 90 días)',
          'Constancia de RFC / CURP actualizada',
          'Firma de contrato de prestación de servicios Ciclonatura'
        ]
      },
      {
        category: 'Del Vehículo y Vendedor',
        items: [
          'Factura de origen endosada o refacturación consecutiva',
          'Tarjeta de circulación anterior original (o reporte de extravío)',
          'Comprobante de pago de las últimas 5 tenencias o refrendos',
          'Copia de identificación oficial del último titular que endosa'
        ]
      }
    ],

    pricing: {
      governmentRights: '$411 MXN (CDMX)',
      gestoriaFee: '$1,450 MXN',
      totalEstimated: '$1,861 MXN',
      savingsVsCoyote: 'Evitas multas por omitir cambio de propietario de hasta $3,500 MXN'
    }
  },

  'alta-baja-placas': {
    id: 'alta-baja-placas',
    slug: 'alta-baja-placas',
    code: 'SRV-03',
    name: 'Altas, Bajas & Reposición Urgente',
    shortName: 'Altas y Bajas',
    category: 'Movimientos Registrales & Reposiciones',
    badge: 'Baja Foránea • Reposición por Robo / Extravío en 24h',
    tagline: 'Trámites ágiles sin citas saturadas en CDMX y Estado de México',
    description: 'Gestión prioritaria de alta inicial de agencia, baja general voluntaria para cambio de estado y reposición exprés de placas o tarjeta por robo o extravío con acta ministerial oficial.',
    turnaround: '24 a 48 hrs',
    officialAuthority: 'Módulos de Control Vehicular CDMX / Edomex',
    accentColor: '#10b981',
    accentLight: 'rgba(16, 185, 129, 0.08)',
    accentBorder: 'rgba(16, 185, 129, 0.25)',
    heroMonograph: 'Monografía No. 03 • Control Vehicular 2026',
    heroTitle: 'Altas, Bajas &\nReposición Express.',
    heroSubtitle: 'Recupera tu tranquilidad si perdiste una placa o necesitas dar de baja foránea sin viajar al estado de origen.',
    heroImages: [
      { src: valijaSeguraImg, alt: "Custodia de documentos y placas en valija diplomática de seguridad" },
      { src: troqueladoSedenaImg, alt: "Troquelado de láminas metálicas bajo norma SEDENA" },
      { src: morelosPlateImg, alt: "Juego nuevo de placas metálicas oficiales" },
      { src: repuveScannerImg, alt: "Inspección y certificación digital en arco de control vehicular" },
      { src: tarjetaChipImg, alt: "Reposición de tarjeta de circulación con chip criptográfico" },
      { src: tesoreriaReceiptImg, alt: "Constancia de baja vehicular sellada ante tesorería" },
      { src: contratoNotarialImg, alt: "Acta de hechos notarial por robo o extravío" },
      { src: flotillaPatioImg, alt: "Logística y entrega express en CDMX y Edomex" },
    ],

    processTimeline: [
      {
        step: '01',
        timeframe: 'Hora 0 – 2',
        title: 'Recepción de Reporte & Acta de Hechos',
        desc: 'Si sufriste robo o extravío de lámina, integramos tu acta de hechos digital ante la fiscalía correspondiente para protegerte contra clonación.',
        tag: 'Protección Inmediata',
        icon: 'Shield'
      },
      {
        step: '02',
        timeframe: 'Día 1 (Mañana)',
        title: 'Turno Preferente en Módulo Central',
        desc: 'Ingresamos la solicitud de baja foránea o reposición en el sistema de ventanilla preferente sin que tengas que madrugar ni hacer fila.',
        tag: 'Sin Cita Previa',
        icon: 'Clock'
      },
      {
        step: '03',
        timeframe: 'Día 1 (Tarde)',
        title: 'Emisión de Oficio de Baja o Duplicado',
        desc: 'El sistema emite el documento oficial con sello digital QR y folio de captura de la Secretaría de Finanzas.',
        tag: 'Acuse con QR',
        icon: 'FileBadge'
      },
      {
        step: '04',
        timeframe: 'Día 2',
        title: 'Entrega con Certificado de Trámite Concluido',
        desc: 'Te entregamos tu constancia oficial de baja o tu nuevo juego de láminas con comprobante para circular legalmente.',
        tag: 'Entrega Inmediata',
        icon: 'CheckCheck'
      }
    ],

    stickyFeatures: [
      {
        id: 'baja-foranea',
        step: '01',
        title: 'Bajas Foráneas sin Viajar',
        subtitle: 'Damos de baja tus placas de otros estados directamente desde CDMX.',
        desc: 'Si compraste un auto con placas de Querétaro, Jalisco, Guerrero o Edomex, no gastes en traslados ni casetas. Gestionamos la baja vehicular foránea directamente en las oficinas de enlace.',
        badge: 'Cobertura Nacional',
        metric: '32 Estados',
        metricLabel: 'Capacidad de gestión',
        points: [
          'Sin necesidad de trasladar el vehículo al estado de origen',
          'Recuperación de acuse oficial de baja para dar de alta en CDMX',
          'Devolución de láminas anteriores entregada con sello de desecho'
        ],
        imageUrl: valijaSeguraImg,
        imageCaption: 'Gestión coordinada con secretarías de finanzas de todo el país'
      },
      {
        id: 'reposicion-robo',
        step: '02',
        title: 'Reposición por Robo o Extravío',
        subtitle: 'Nuevas láminas oficiales en 24 a 48 horas sin multas de tránsito.',
        desc: 'Circular sin una o ambas placas en CDMX amerita corralón y multas de hasta $4,000 MXN. Te entregamos un permiso temporal o nuevas placas oficiales con acta ministerial vinculada.',
        badge: 'Cero Corralón',
        metric: '24–48h',
        metricLabel: 'Plazo express',
        points: [
          'Asesoría para tramitar el acta de denuncia ante el MP en línea',
          'Emisión de nuevo juego de placas troqueladas con engomado',
          'Actualización inmediata del padrón de control vehicular'
        ],
        imageUrl: troqueladoSedenaImg,
        imageCaption: 'Nuevo juego de láminas oficiales troqueladas entregado en mano'
      },
      {
        id: 'alta-agencia',
        step: '03',
        title: 'Alta Express de Autos de Agencia',
        subtitle: 'Saca tu auto de la concesionaria ya con placas puestas.',
        desc: '¿Compraste auto nuevo? No esperes 3 semanas a que la agencia tramite tus placas cobrándote el doble. Nosotros emplacamos tu auto nuevo en 48 horas con entrega en la misma agencia.',
        badge: 'Vehículo Nuevo',
        metric: '48h',
        metricLabel: 'Entrega en agencia',
        points: [
          'Coordinamos con tu asesor de ventas para montar las placas',
          'Ahorro de hasta el 50% en comparación con los costos de agencia',
          'Factura deducible a nombre de persona física o moral'
        ],
        imageUrl: morelosPlateImg,
        imageCaption: 'Emplacamiento directo de agencia con láminas oficiales'
      }
    ],

    requirements: [
      {
        category: 'Para Baja Vehicular',
        items: [
          'Juego de placas metálicas anteriores (o acta de extravío)',
          'Tarjeta de circulación original',
          'Identificación oficial del titular registrado',
          'Comprobante de no adeudo de tenencias e infracciones'
        ]
      },
      {
        category: 'Para Reposición por Robo',
        items: [
          'Acta de denuncia ante el Ministerio Público (o formato digital FGE)',
          'Factura de origen o carta factura con copia de factura',
          'Identificación oficial con fotografía vigente',
          'Placa restante (en caso de robo de una sola lámina)'
        ]
      }
    ],

    pricing: {
      governmentRights: '$542 MXN (Baja CDMX)',
      gestoriaFee: '$1,250 MXN',
      totalEstimated: '$1,792 MXN',
      savingsVsCoyote: 'Evitas corralón y multas de arrastre que superan los $6,500 MXN'
    }
  },

  'regularizacion-tenencias': {
    id: 'regularizacion-tenencias',
    slug: 'regularizacion-tenencias',
    code: 'SRV-04',
    name: 'Auditoría de Tenencias & Adeudos',
    shortName: 'Regularización Fiscal',
    category: 'Diagnóstico Tributario & Descuentos',
    badge: 'Tesorería Oficial • Cero Adeudos Fantasma',
    tagline: 'Desglose exacto de adeudos ante finanzas estatales y cancelación de multas',
    description: 'Diagnóstico fiscal integral de tu vehículo ante las tesorerías de CDMX, Edomex y Morelos. Desglosamos tenencias pendientes, aplicamos subsidios y descuentos por pronto pago vigentes y liquidamos directamente con líneas de captura oficiales bancarias.',
    turnaround: '24 a 48 hrs',
    officialAuthority: 'Secretaría de Finanzas CDMX / Finanzas Edomex / Hacienda Morelos',
    accentColor: '#059669',
    accentLight: 'rgba(5, 150, 105, 0.08)',
    accentBorder: 'rgba(5, 150, 105, 0.25)',
    heroMonograph: 'Monografía No. 04 • Tesorería 2026',
    heroTitle: 'Auditoría Fiscal\n& Adeudos Cero.',
    heroSubtitle: 'No pagues adeudos inventados por coyotes. Líneas de captura bancarias con sellos oficiales de tesorería y factura SAT.',
    heroImages: [
      { src: tesoreriaReceiptImg, alt: "Líneas de captura bancarias oficiales con sello de tesorería" },
      { src: repuveScannerImg, alt: "Auditoría vehicular y verificación de no adeudos" },
      { src: contratoNotarialImg, alt: "Dictamen fiscal vehicular y resolución de prescripción" },
      { src: tarjetaChipImg, alt: "Liberación de tarjeta de circulación en padrón estatal" },
      { src: valijaSeguraImg, alt: "Entrega de comprobantes fiscales sellados en valija segura" },
      { src: morelosPlateImg, alt: "Placas regularizadas al 100% ante finanzas" },
      { src: troqueladoSedenaImg, alt: "Validación de láminas sin adeudos pendientes" },
      { src: flotillaPatioImg, alt: "Vehículos habilitados para verificación vehicular sin bloqueos" },
    ],

    processTimeline: [
      {
        step: '01',
        timeframe: 'Minuto 0 – 30',
        title: 'Extracción de Historial Completo en Tesorería',
        desc: 'Consultamos las bases de datos de finanzas mediante API institucional. Obtenemos el histórico de tenencias, refrendos, fotocívicas y recargos.',
        tag: 'Corte a Nivel Central',
        icon: 'Search'
      },
      {
        step: '02',
        timeframe: 'Hora 2 – 4',
        title: 'Aplicación de Subsidios & Amnistías',
        desc: 'Si tu vehículo es elegible para subsidio del 100% de tenencia o programas de regularización de años anteriores, aplicamos el beneficio oficial.',
        tag: 'Ahorro Máximo Legal',
        icon: 'Percent'
      },
      {
        step: '03',
        timeframe: 'Día 1',
        title: 'Emisión de Líneas de Captura Bancarias',
        desc: 'Generamos las líneas de captura oficiales con sello digital. Puedes pagar tú mismo en ventanilla bancaria o nosotros lo realizamos por ti.',
        tag: 'Línea Bancaria SAT',
        icon: 'Barcode'
      },
      {
        step: '04',
        timeframe: 'Día 2',
        title: 'Expedición de Certificado de No Adeudo',
        desc: 'Validamos el reflejo del pago en el sistema estatal y te emitimos la constancia oficial que te permite verificar y circular sin restricciones.',
        tag: 'Certificado Blindado',
        icon: 'CheckSquare'
      }
    ],

    stickyFeatures: [
      {
        id: 'transparencia-total',
        step: '01',
        title: 'Transparencia Línea por Línea',
        subtitle: 'Ni un peso de más. Comprobantes bancarios directos del gobierno.',
        desc: 'Los coyotes suelen inventar multas fantasmas para inflar sus cobros. En Ciclonatura recibes el reporte oficial del portal de finanzas y el acuse bancario sellado de cada concepto liquidado.',
        badge: 'Cero Inflación',
        metric: '100%',
        metricLabel: 'Transparencia de costos',
        points: [
          'Desglose pormenorizado de tenencias, recargos y actualizaciones',
          'Comprobante con folio de autorización bancaria rastreable',
          'Garantía de que tu pago entra directamente a las arcas estatales'
        ],
        imageUrl: tesoreriaReceiptImg,
        imageCaption: 'Reporte oficial de tesorería y línea de captura bancaria con código de barras'
      },
      {
        id: 'cancelacion-multas',
        step: '02',
        title: 'Cancelación de Multas Improcedentes',
        subtitle: 'Defensa administrativa de fotocívicas prescritas o con placas duplicadas.',
        desc: 'Las multas de más de 5 años prescriben legalmente según el Código Fiscal. Realizamos el trámite de prescripción administrativa para borrar adeudos antiguos sin pagar recargos ilegales.',
        badge: 'Defensa Jurídica',
        metric: 'Hasta 60%',
        metricLabel: 'Ahorro en adeudos antiguos',
        points: [
          'Prescripción de adeudos fiscales con más de 5 años de antigüedad',
          'Eliminación de multas generadas por autos con placas clonadas',
          'Acreditación de verificación vehicular extemporánea justificada'
        ],
        imageUrl: contratoNotarialImg,
        imageCaption: 'Dictamen notarial de prescripción y amnistía fiscal'
      },
      {
        id: 'liberacion-verificacion',
        step: '03',
        title: 'Liberación Inmediata de Verificación',
        subtitle: 'Desbloqueo de tu vehículo en los centros de verificación ambiental (verificentros).',
        desc: 'Un adeudo de tenencia bloquea de forma inmediata tu cita de verificación. Al regularizarte con nosotros, forzamos el impacto en el sistema SEDEMA para que verifiques sin recargos.',
        badge: 'Desbloqueo Inmediato',
        metric: '24 hrs',
        metricLabel: 'Impacto en verificentro',
        points: [
          'Impacto en línea en el padrón de SEDEMA y Medio Ambiente Edomex',
          'Agendamiento de cita en el verificentro más cercano a tu domicilio',
          'Factura deducible de honorarios para tu declaración anual'
        ],
        imageUrl: repuveScannerImg,
        imageCaption: 'Inspección técnica y desbloqueo en el sistema oficial de verificación'
      }
    ],

    requirements: [
      {
        category: 'Para Diagnóstico Inmediato',
        items: [
          'Número de placa actual y número de serie (VIN)',
          'Entidad federativa de registro actual (CDMX, Edomex o Morelos)',
          'Copia de la última tarjeta de circulación o factura',
          'Datos fiscales si requieres factura electrónica CFDI'
        ]
      },
      {
        category: 'Para Prescripción de Multas',
        items: [
          'Historial de pagos de tenencias anteriores conservadas',
          'Copia de identificación oficial del titular registral',
          'Poder notarial simple para representación en ventanilla de finanzas'
        ]
      }
    ],

    pricing: {
      governmentRights: 'Variable según adeudo oficial',
      gestoriaFee: '$950 MXN (Diagnóstico & Liquidación)',
      totalEstimated: 'A cotizar según adeudo oficial',
      savingsVsCoyote: 'Ahorro de hasta $12,000 MXN en recargos prescritos'
    }
  },

  'flotillas-corporativas': {
    id: 'flotillas-corporativas',
    slug: 'flotillas-corporativas',
    code: 'SRV-05',
    name: 'Gestoría de Flotillas Corporativas',
    shortName: 'Flotillas Corporativas',
    category: 'Soluciones B2B & Arrendadoras',
    badge: 'Ejecutivo Dedicado • Facturación SAT CFDI 4.0 Deducible',
    tagline: 'Gestión vehicular masiva para empresas, arrendadoras y logística',
    description: 'Servicio B2B diseñado para directores de flota, despachos contables y empresas de logística. Altas masivas, bajas programadas, reemplacamiento de flotillas completas, valijas foliadas y factura deducible al 100%.',
    turnaround: 'SLA de 3 a 5 días hábiles',
    officialAuthority: 'Ventanilla Única Corporativa SEMOVI / SMyT',
    accentColor: '#4f46e5',
    accentLight: 'rgba(79, 70, 229, 0.08)',
    accentBorder: 'rgba(79, 70, 229, 0.25)',
    heroMonograph: 'Monografía No. 05 • Corporativo 2026',
    heroTitle: 'Flotillas B2B\n& Deducibilidad.',
    heroSubtitle: 'La infraestructura de gestoría más sólida de México para empresas con 5 a 500+ vehículos.',
    heroImages: [
      { src: flotillaPatioImg, alt: "Patio de flotillas comerciales e inspección digital de unidades" },
      { src: tesoreriaReceiptImg, alt: "Facturación CFDI 4.0 deducible ante el SAT y líneas bancarias" },
      { src: valijaSeguraImg, alt: "Entrega masiva en valijas de seguridad selladas para Cedis" },
      { src: troqueladoSedenaImg, alt: "Troquelado de láminas en bloque para parques vehiculares" },
      { src: tarjetaChipImg, alt: "Tarjetas de circulación corporativas con chip inteligente" },
      { src: repuveScannerImg, alt: "Arco de control y auditoría masiva de flotas" },
      { src: contratoNotarialImg, alt: "Convenio B2B y contrato de prestación corporativa" },
      { src: morelosPlateImg, alt: "Placas oficiales Morelos y CDMX para flotillas comerciales" },
    ],

    processTimeline: [
      {
        step: '01',
        timeframe: 'Día 1',
        title: 'Asignación de Key Account Manager & Matriz',
        desc: 'Un gestor de cuenta dedicado revisa la matriz de tu parque vehicular en Excel o ERP corporativo. Estandarizamos expedientes digitales de todas las unidades.',
        tag: 'KAM Asignado',
        icon: 'UserCheck'
      },
      {
        step: '02',
        timeframe: 'Día 2',
        title: 'Cita en Ventanilla Única Institucional',
        desc: 'Ingreso en bloque mediante convenios con cámaras empresariales y ventanillas especiales corporativas, evitando demoras de usuarios particulares.',
        tag: 'Ventanilla Institucional B2B',
        icon: 'Building2'
      },
      {
        step: '03',
        timeframe: 'Día 3 – 4',
        title: 'Troquelado Masivo & Sellado de Tarjetas',
        desc: 'Procesamiento en lote de láminas, tarjetas de circulación con chip y engomados. Auditoría de cada juego antes del embalaje.',
        tag: 'Control de Calidad 100%',
        icon: 'ShieldCheck'
      },
      {
        step: '04',
        timeframe: 'Día 5',
        title: 'Entrega en Cedis + Facturación CFDI 4.0',
        desc: 'Entrega directa en el patio o centro de distribución de tu empresa. Factura electrónica desglosada con complementos fiscales para deducibilidad del 100%.',
        tag: 'CFDI 4.0 Deducible',
        icon: 'Receipt'
      }
    ],

    stickyFeatures: [
      {
        id: 'deduccion-fiscal',
        step: '01',
        title: '100% Deducible ante el SAT',
        subtitle: 'Facturas electrónicas CFDI 4.0 con complemento de gastos a cuenta de terceros.',
        desc: 'Los gastos vehiculares de tu empresa deben ser perfectamente auditables. Emitimos facturas oficiales que desglosan con precisión los derechos estatales y los honorarios corporativos.',
        badge: 'Cumplimiento Fiscal',
        metric: '100%',
        metricLabel: 'Deducibilidad contable',
        points: [
          'Facturación electrónica con archivos XML y PDF validados ante el SAT',
          'Soporte con líneas de captura oficiales para auditorías internas',
          'Ahorro en tiempos de tu equipo de contabilidad y recursos humanos'
        ],
        imageUrl: tesoreriaReceiptImg,
        imageCaption: 'Facturación CFDI 4.0 y respaldo documental corporativo con líneas SAT'
      },
      {
        id: 'account-manager',
        step: '02',
        title: 'Key Account Manager Dedicado',
        subtitle: 'Un solo canal directo para coordinar toda tu operación vehicular.',
        desc: 'Olvídate de lidiar con múltiples gestores informales o secretarias de gobierno. Tu gestor asignado te reporta vía dashboard o WhatsApp corporativo con estatus en tiempo real.',
        badge: 'Atención VIP B2B',
        metric: '1 a 1',
        metricLabel: 'Gestor exclusivo',
        points: [
          'Reportes semanales de estatus de trámite y semáforo de vencimientos',
          'Recolección y entrega masiva de placas en los patios de tu empresa',
          'Línea de crédito comercial y convenios empresariales a plazo'
        ],
        imageUrl: flotillaPatioImg,
        imageCaption: 'Inspección de parque vehicular en patio y gestor asignado'
      },
      {
        id: 'cero-paros',
        step: '03',
        title: 'Flota Siempre Rodando',
        subtitle: 'Cero unidades detenidas en corralón por falta de documentación.',
        desc: 'Un camión o camioneta parada cuesta miles de pesos al día a tu empresa. Diseñamos un calendario preventivo de verificaciones, tenencias y reemplacamientos para evitar paros.',
        badge: 'SLA Garantizado',
        metric: '0 Días',
        metricLabel: 'Flota parada',
        points: [
          'Reemplacamiento nocturno o en fines de semana sin frenar operaciones',
          'Servicio de custodia de placas y entrega en valijas selladas',
          'Convenio corporativo con tarifas preferenciales por volumen'
        ],
        imageUrl: valijaSeguraImg,
        imageCaption: 'Entrega masiva en valijas foliadas a patio de operaciones'
      }
    ],

    requirements: [
      {
        category: 'Para Apertura de Cuenta Corporativa',
        items: [
          'Constancia de Situación Fiscal (CSF) de la Persona Moral',
          'Acta constitutiva y poder notarial del apoderado legal',
          'Comprobante de domicilio fiscal de la empresa',
          'Matriz vehicular en formato digital con números de serie y placas'
        ]
      },
      {
        category: 'Documentos por Unidad',
        items: [
          'Facturas de compra o contratos de arrendamiento financiero',
          'Póliza de seguro vigente de cada unidad',
          'Tarjetas de circulación actuales para canje o reposición'
        ]
      }
    ],

    pricing: {
      governmentRights: 'Tarifa oficial según estado y tipo de unidad',
      gestoriaFee: 'Tarifa preferencial por volumen (desde $850 MXN / unidad)',
      totalEstimated: 'Cotización personalizada en 2 horas',
      savingsVsCoyote: 'Ahorro de hasta un 35% en costos operativos de gestión vehicular'
    }
  }
};
