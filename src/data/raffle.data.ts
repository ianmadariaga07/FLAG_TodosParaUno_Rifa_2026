import type {
    PrizeItem,
    OrganizerMember,
    FaqItem,
    LegalSection,
    TicketPackOption,
} from '../types/raffle.types';

export const RAFFLE_CONFIG = Object.freeze({
    campaignName: '¡Todos para uno! 2026',
    campaignTitle: 'Todos para uno',
    teamName: 'Equipo Aragonenes',
    committeeName: 'Comité Aragonenes',
    facultyName: 'FES Aragón • UNAM',
    foundationName: 'Fundación Lorena Alejandra Gallardo IAP',
    ticketPrice: 100,
    totalTickets: 200,
    goalAmountMXN: 20000,
    scholarshipEconomicMXN: 100800,
    scholarshipMonthlyMXN: 4200,
    scholarshipAccompanimentMXN: 99200,
    drawDateISO: '2026-11-21T19:00:00-06:00',
    drawDateText: 'Sábado 21 de noviembre de 2026',
    googleFormUrl: 'https://forms.gle/R15qgPKe7bFXXG4p7',
    officialCampaignUrl: 'https://todosparauno.org/',
    officialFoundationUrl: 'https://fundacionflag.org/',
    aboutUrl: 'https://fundacionflag.org/quienes-somos/',
    talentUrl: 'https://fundacionflag.org/talento-flag/',
    newsUrl: 'https://fundacionflag.org/minutas',
    contactUrl: 'https://fundacionflag.org/contacto/',
    privacyUrl: 'https://fundacionflag.org/politica-privacidad/',
    socialLinks: {
        instagram: 'https://www.instagram.com/fundacionflag/',
        facebook: 'https://www.facebook.com/fundacionflag',
        linkedin: 'https://www.linkedin.com/company/fundacionflag/',
        youtube: 'https://www.youtube.com/@fundacionflag',
        email: 'mailto:contacto@fundacionflag.org',
    },
});

export const TICKET_PACK_OPTIONS: readonly TicketPackOption[] = Object.freeze([
    { count: 1, label: '1 Boleto', tag: '1 oportunidad en ruleta', star: 'jaffa' },
    { count: 2, label: '2 Boletos', tag: 'El más elegido', star: 'blueberry' },
    { count: 5, label: '5 Boletos', tag: 'Impulso solidario', star: 'yellow' },
    { count: 10, label: '10 Boletos', tag: '5% de los boletos', star: 'pink' },
]);

export const PRIZES_LIST: readonly PrizeItem[] = Object.freeze([
    {
        id: 'premio-mariachi',
        place: '1.er Lugar',
        badge: 'Premio Principal en Vivo',
        title: 'Una Hora de Mariachi',
        highlight: 'Música en vivo para celebrar en grande con tu familia o amigos',
        description:
            'Servicio continuo de 1 hora de mariachi en la Ciudad de México o Zona Oriente del Estado de México. El ganador elige la fecha de su evento agendando con un mínimo de 2 semanas de anticipación.',
        details: [
            'Cobertura en CDMX y Zona Oriente del Estado de México',
            'Preferencia de agenda de lunes a jueves (excluye días festivos oficiales)',
            'Transferible a un tercero o donable directamente a la Fundación FLAG',
        ],
        theme: 'mariachi',
    },
    {
        id: 'premio-alexa',
        place: '2.º Lugar',
        badge: 'Asistente Inteligente',
        title: 'Amazon Echo (Alexa)',
        highlight: 'Tecnología y música inteligente para tu espacio de estudio o casa',
        description:
            'Dispositivo inteligente de la familia Amazon Echo completamente nuevo en su empaque original. Las especificaciones del modelo se anunciarán durante la transmisión oficial del sorteo.',
        details: [
            'Dispositivo totalmente nuevo y sellado',
            'Entrega física en FES Aragón o punto céntrico de mutuo acuerdo en CDMX',
            'Transferible a un tercero o donable directamente a la Fundación FLAG',
        ],
        theme: 'alexa',
    },
    {
        id: 'premio-amazon',
        place: '3.er Lugar',
        badge: 'Saldo Digital o Físico',
        title: 'Tarjeta de Regalo Amazon $500',
        highlight: '$500.00 MXN para elegir lo que más te guste en Amazon México',
        description:
            'Tarjeta de regalo válida en la plataforma Amazon con valor nominal de $500.00 M.N., entregada en formato físico o mediante código digital al correo registrado.',
        details: [
            'Saldo íntegro de $500.00 MXN para cualquier producto en Amazon',
            'Envío digital inmediato al correo ganador o entrega física',
            'Transferible a un tercero o donable directamente a la Fundación FLAG',
        ],
        theme: 'amazon',
    },
]);

export const ARAGONENES_MEMBERS: readonly OrganizerMember[] = Object.freeze([
    {
        id: 'benji',
        name: 'Benji',
        whatsappNumber: '5215588141295',
        defaultMessage: '¡Hola Benji! Vi la página de la rifa Todos para Uno y quiero adquirir boletos.',
    },
    {
        id: 'ian',
        name: 'Ian',
        whatsappNumber: '5212283542349',
        defaultMessage: '¡Hola Ian! Vi la página de la rifa Todos para Uno y quiero adquirir boletos.',
    },
    {
        id: 'marbe',
        name: 'Marbe',
        whatsappNumber: '5215626971289',
        defaultMessage: '¡Hola Marbe! Vi la página de la rifa Todos para Uno y quiero adquirir boletos.',
    },
    {
        id: 'magda',
        name: 'Magda',
        whatsappNumber: '5215552751626',
        defaultMessage: '¡Hola Magda! Vi la página de la rifa Todos para Uno y quiero adquirir boletos.',
    },
]);

export const RAFFLE_FAQS: readonly FaqItem[] = Object.freeze([
    {
        question: '¿Cómo forma parte esta rifa de la campaña oficial Todos para Uno?',
        answer:
            'Dentro de la campaña anual "¡Todos para uno!" de la Fundación Lorena Alejandra Gallardo (FLAG IAP), la comunidad se organiza en comités para reunir el fondo que becará a un nuevo estudiante universitario durante dos años. El comité "Aragonenes" impulsa esta rifa de 200 boletos para alcanzar nuestra meta de aportación a la fundación.',
    },
    {
        question: '¿Cómo adquiero mi boleto y cómo queda registrado?',
        answer:
            'Puedes contactar por WhatsApp a cualquiera de los 4 integrantes del comité Aragonenes para solicitar los datos de transferencia bancaria ($100 MXN por boleto) o comprar tu boleto físico en la FES Aragón. Después, subes tu comprobante en el formulario oficial de Google y recibes la confirmación en tu correo.',
    },
    {
        question: '¿Cómo se garantiza que el sorteo del 21 de noviembre sea transparente?',
        answer:
            'El sorteo se realizará en transmisión en vivo el sábado 21 de noviembre de 2026 utilizando una ruleta virtual aleatoria externa e independiente al comité organizador, de modo que los resultados son 100% automatizados y públicos.',
    },
    {
        question: '¿Qué pasa si gano un premio y quiero cederlo o donarlo a la causa?',
        answer:
            'Conforme al apartado V de nuestros Términos y Condiciones, cualquier ganador puede transferir su premio a otra persona o renunciar a él para donarlo directamente a la causa de recaudación de la Fundación FLAG mediante un escrito libre firmado adjuntando copia de su identificación oficial.',
    },
]);

export const LEGAL_TERMS_SECTIONS: readonly LegalSection[] = Object.freeze([
    {
        numeral: 'I',
        title: 'ALCANCE Y MECÁNICA DEL SORTEO',
        paragraphs: [
            'La emisión de esta campaña está estrictamente limitada a un boletaje máximo de 200 unidades. El valor de aportación individual se fija en $100.00 (cien pesos 00/100 M.N.) por boleto. El sorteo oficial se llevará a cabo el día 21 de noviembre de 2026, quedando el comité organizador facultado para transmitir el evento en vivo a través de los medios digitales o redes sociales oficiales del comité organizador para garantizar la total transparencia del proceso.',
            'La selección de los números ganadores se realizará mediante un sistema de ruleta virtual aleatoria de carácter externo e independiente al comité organizador, ejecutada en tiempo real durante la transmisión oficial. En virtud de la naturaleza algorítmica y automatizada de dicha herramienta digital, el comité organizador no tiene injerencia, control ni posibilidad de manipulación alguna sobre los resultados que arroje la plataforma, siendo el fallo de la ruleta virtual definitivo e inapelable.',
            'Para tener derecho a la reclamación y entrega de cualquier premio, el participante que resulte ganador deberá acreditar su identidad presentando obligatoriamente una identificación oficial con fotografía (INE, pasaporte o credencial escolar vigente) que coincida con el nombre registrado en la compra, así como exhibir el comprobante físico o digital de su boleto ganador. En el supuesto de que el ganador sea menor de edad, el premio únicamente podrá ser reclamado y entregado con la comparecencia y firma de su padre, madre o tutor legal, quien deberá presentar su respectiva identificación oficial.',
        ],
    },
    {
        numeral: 'II',
        title: 'PREMIO DE PRIMER LUGAR (Servicio de Mariachi)',
        paragraphs: [
            'El premio de primer lugar consiste única y exclusivamente en la prestación de un (1) servicio de mariachi continuo con una duración de una hora. En el supuesto de que el ganador o sus invitados deseen prolongar la duración del evento, el costo derivado del tiempo adicional o de las canciones extras correrá de manera íntegra y exclusiva por cuenta del ganador, quedando dicha extensión sujeta a la disponibilidad del grupo musical. El equipo organizador no asumirá costos por horas extras, propinas o viáticos adicionales.',
            'La validez y ejecución de este premio está restringida geográficamente a la Ciudad de México y la Zona Oriente del Estado de México. El grupo de mariachi y el comité organizador podrán evaluar previamente la viabilidad logística y de seguridad de la ubicación propuesta. En caso de que el domicilio represente un riesgo logístico o se encuentre fuera de cobertura, el ganador deberá proponer un punto de encuentro alternativo viable y seguro.',
            'El ganador está obligado a agendar y notificar la fecha, hora y ubicación exacta de su evento con un periodo mínimo de dos (2) semanas de anticipación. Se otorgará marcada preferencia de agenda a los eventos programados de lunes a jueves. Quedan estrictamente excluidos los días festivos, feriados oficiales y fechas de alta demanda: 10 de mayo, 15 y 16 de septiembre, 20 de noviembre, así como 12, 24, 25 y 31 de diciembre.',
        ],
    },
    {
        numeral: 'III',
        title: 'PREMIO DE SEGUNDO LUGAR (Dispositivo Inteligente Alexa)',
        paragraphs: [
            'El ganador del segundo lugar será acreedor a un (1) dispositivo inteligente de la familia Amazon Echo (comercialmente conocido como Alexa). La generación, versión, color y modelo específico del dispositivo quedarán sujetos a la disponibilidad comercial y a la disposición exclusiva del comité organizador, siendo anunciadas sus especificaciones definitivas durante la transmisión oficial del sorteo.',
            'La entrega de este artículo se realizará única y exclusivamente de manera física, dentro de las instalaciones de la Facultad de Estudios Superiores Aragón (FES Aragón) o en un punto de encuentro seguro, céntrico y de mutuo acuerdo dentro de la Ciudad de México o Zona Metropolitana. El equipo organizador transfiere el dispositivo totalmente nuevo y en su estado original de empaque, deslindándose de garantías de fábrica posteriores.',
        ],
    },
    {
        numeral: 'IV',
        title: 'PREMIO DE TERCER LUGAR (Tarjeta de Regalo Amazon)',
        paragraphs: [
            'El premio correspondiente al tercer lugar consiste en una (1) Tarjeta de Regalo válida para la plataforma Amazon, con un valor nominal de $500.00 (quinientos pesos 00/100 M.N.). A discreción del comité organizador, la entrega podrá realizarse de forma física o mediante la transmisión digital del código de canje al correo electrónico o medio de contacto registrado por el ganador.',
        ],
    },
    {
        numeral: 'V',
        title: 'NOTIFICACIÓN, RECLAMACIÓN, TRANSFERENCIA O DONACIÓN',
        paragraphs: [
            'El titular del boleto ganador dispondrá de un plazo improrrogable de tres (3) días naturales para acusar recibo y confirmar la aceptación expresa de su premio. En caso de omisión de respuesta, el premio será declarado oficialmente desierto por abandono, facultando al comité organizador para realizar una dinámica de reasignación.',
            'Los premios otorgados no son reembolsables, no son fraccionables y carecen de equivalencia para su canje por dinero en efectivo para el participante. No obstante, los premios podrán ser transferibles a un tercero o, en su defecto, el ganador podrá renunciar al premio para donarlo íntegra y directamente en beneficio de la causa de recaudación de la Fundación FLAG. Para que cualquiera de estas dos modalidades surta efectos, el titular del boleto ganador deberá manifestarlo dentro del plazo de reclamación mediante un escrito libre firmado de manera autógrafa en el que especifique expresamente su decisión, adjuntando obligatoriamente copia legible de su identificación oficial vigente (INE, pasaporte o credencial escolar) y, en su caso, la del tercero receptor.',
            'Los datos personales proporcionados serán tratados exclusivamente para fines relacionados con la administración de la campaña, registro de boletos, comunicación con participantes y entrega de premios.',
        ],
    },
]);