import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ticket,
  ExternalLink,
  MessageCircle,
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  Check,
  ArrowUpRight,
  Calendar,
  Clock,
} from 'lucide-react';
import {
  RAFFLE_CONFIG,
  TICKET_PACK_OPTIONS,
  PRIZES_LIST,
  ARAGONENES_MEMBERS,
  RAFFLE_FAQS,
} from './data/raffle.data';
import { getSafeExternalUrl, buildSafeWhatsAppUrl } from './utils/security.utils';
import {
  FlagStar,
  WaveHeading,
  AnimatedCounter,
  FlagMarkLogo,
  FlagFullWhiteLogo,
  TodosParaUnoLogo,
  SocialSvgIcon,
  PrizeIllustration,
} from './components/FlagStar';
import { LegalModal } from './components/LegalModal';

interface TimeLeft {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const now = new Date().getTime();
  const target = new Date(targetIso).getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const NAV_ITEMS = [
  { id: 'la-rifa', label: 'Proyecto' },
  { id: 'la-beca', label: 'Beca' },
  { id: 'premios', label: 'Premios' },
  { id: 'comite', label: 'Comité' },
  { id: 'faqs', label: 'FAQs' },
] as const;

export default function App() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedPrizeIndex, setSelectedPrizeIndex] = useState<number>(0);
  const [selectedTicketPack, setSelectedTicketPack] = useState<number>(2);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
      calculateTimeLeft(RAFFLE_CONFIG.drawDateISO)
  );

  // El Header se mantiene azul durante toda la sección azul (#la-rifa) y cambia a blanco exactamente al entrar a la sección blanca (#la-beca)
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('la-rifa');
      const headerHeight = 68;
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsScrolledPastHero(rect.bottom <= headerHeight);
      } else {
        setIsScrolledPastHero(window.scrollY > 560);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Reloj regresivo en tiempo real hacia el 21 de noviembre de 2026
  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(RAFFLE_CONFIG.drawDateISO));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const safeFormUrl = getSafeExternalUrl(RAFFLE_CONFIG.googleFormUrl);
  const safeOfficialCampaignUrl = getSafeExternalUrl(RAFFLE_CONFIG.officialCampaignUrl);
  const safeFoundationUrl = getSafeExternalUrl(RAFFLE_CONFIG.officialFoundationUrl);

  return (
      <div id="inicio" className="min-h-screen flex flex-col bg-[#f8f8f6] text-slate-900 font-sans selection:bg-[#ee7d31] selection:text-white overflow-x-clip">
        {/* HEADER FIJO CON TRANSICIÓN EXACTA AL SALIR DE LA SECCIÓN AZUL */}
        <header
            className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
                isScrolledPastHero
                    ? 'bg-white/95 backdrop-blur-md border-slate-200/90 text-slate-800 shadow-xs'
                    : 'bg-[#4187fb] border-white/20 text-white'
            }`}
        >
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 h-16 sm:h-[4.25rem] flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 lg:gap-9">
              <button
                  type="button"
                  onClick={() => scrollToSection('inicio')}
                  className="flex items-center gap-3 group cursor-pointer shrink-0"
                  aria-label="Ir al inicio"
              >
                <FlagMarkLogo
                    white={!isScrolledPastHero}
                    className="h-8 sm:h-9 w-auto transition-transform group-hover:scale-105"
                />
                <span
                    className={`font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors whitespace-nowrap ${
                        isScrolledPastHero
                            ? 'text-[#4187fb] bg-[#e3edfe]'
                            : 'text-white bg-white/20'
                    }`}
                >
                Aragonenes
              </span>
              </button>

              <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`transition cursor-pointer whitespace-nowrap ${
                            isScrolledPastHero
                                ? 'text-slate-700 hover:text-[#4187fb]'
                                : 'text-white/95 hover:text-white'
                        }`}
                    >
                      {item.label}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => setIsLegalOpen(true)}
                    className={`transition cursor-pointer whitespace-nowrap ${
                        isScrolledPastHero
                            ? 'text-slate-700 hover:text-[#4187fb]'
                            : 'text-white/95 hover:text-white'
                    }`}
                >
                  Bases legales
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <a
                  href={safeOfficialCampaignUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden xl:inline-flex items-center gap-1 text-xs font-bold transition whitespace-nowrap ${
                      isScrolledPastHero
                          ? 'text-slate-500 hover:text-[#4187fb]'
                          : 'text-white/90 hover:text-[#fde85f]'
                  }`}
              >
                <span>todosparauno.org</span>
                <ArrowUpRight size={14} />
              </a>

              <div
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-colors whitespace-nowrap ${
                      isScrolledPastHero
                          ? 'text-slate-700 bg-slate-100'
                          : 'text-white bg-white/15 border border-white/25'
                  }`}
              >
                <Clock size={14} className={isScrolledPastHero ? 'text-[#ee7d31]' : 'text-[#fde85f]'} />
                <span>
                Sorteo en{' '}
                  <strong className={isScrolledPastHero ? 'text-[#4187fb]' : 'text-[#fde85f]'}>
                  {timeLeft.days} días
                </strong>
              </span>
              </div>

              <a
                  href={safeFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ee7d31] hover:bg-[#d96b22] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-full shadow-sm hover:shadow transition active:scale-95 whitespace-nowrap"
              >
                Apartar boleto
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* HERO SECTION — Ocupa todo el ancho visual con max-w-[1440px] como en todosparauno.org */}
          <section id="la-rifa" className="bg-[#4187fb] text-white relative overflow-hidden py-12 sm:py-20 lg:py-24 px-5 sm:px-10 lg:px-16 scroll-mt-16">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
              {/* Columna Izquierda (6 columnas amplias) */}
              <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-6 space-y-6"
              >
                <div className="inline-flex flex-wrap items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold">
                  <FlagStar variant="yellow" size={16} spinDuration={12} />
                  <span>Extensión del {RAFFLE_CONFIG.committeeName} (FES Aragón)</span>
                  <span className="opacity-50">•</span>
                  <a
                      href={safeFoundationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#fde85f] hover:underline inline-flex items-center gap-0.5"
                  >
                    Fundación FLAG IAP <ArrowUpRight size={14} />
                  </a>
                </div>

                {/* Logo Oficial con estrellas en sus coordenadas originales */}
                <TodosParaUnoLogo className="w-full max-w-[330px] sm:max-w-[440px] lg:max-w-[480px] h-auto -ml-2 block" />

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-snug max-w-xl">
                  Una carrera universitaria se sostiene entre todos.{' '}
                  <strong className="font-extrabold text-[#fde85f] block mt-1.5">
                    Rifa con Causa — Comité Aragonenes
                  </strong>
                </h1>

                <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-2xl">
                  La Fundación Lorena Alejandra Gallardo (FLAG) es una Institución de Asistencia Privada que desde 1984
                  acompaña a jóvenes universitarios con apoyo económico, formación y comunidad para promover la
                  permanencia universitaria. Como parte de la campaña oficial en{' '}
                  <a
                      href={safeOfficialCampaignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-extrabold text-[#fde85f] hover:text-white"
                  >
                    todosparauno.org
                  </a>
                  , sumamos esta rifa de <strong>200 boletos</strong> para lograr la beca de una persona más.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                      href={safeFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#ee7d31] hover:bg-[#d96b22] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg transition transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    <Ticket size={20} />
                    <span>Registrar mi boleto ($100 MXN)</span>
                  </a>
                  <button
                      type="button"
                      onClick={() => scrollToSection('comite')}
                      className="bg-white text-[#4187fb] hover:bg-[#e3edfe] font-bold text-sm sm:text-base px-7 py-4 rounded-full shadow-sm transition cursor-pointer"
                  >
                    Contactar por WhatsApp
                  </button>
                </div>
              </motion.div>

              {/* Columna Derecha (6 columnas amplias) */}
              <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="lg:col-span-6"
              >
                <div className="relative bg-white text-slate-900 rounded-[2rem] p-7 sm:p-10 lg:p-11 shadow-2xl border-4 border-white/40 space-y-6">
                  <FlagStar
                      variant="yellow"
                      size={52}
                      spinDuration={15}
                      className="absolute -top-6 -right-4"
                  />
                  <FlagStar
                      variant="pink"
                      size={40}
                      spinDuration={23}
                      spinReverse
                      className="absolute -bottom-5 -left-4"
                  />

                  <div className="flex items-center justify-between border-b border-slate-200 pb-5 gap-3">
                    <div className="flex items-center gap-3.5">
                      <FlagMarkLogo className="h-10 w-auto shrink-0" />
                      <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#ee7d31] block">
                        Sorteo Oficial con Causa
                      </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                          Boleto Solidario Aragonenes
                        </h2>
                      </div>
                    </div>
                    <div className="bg-[#e3edfe] text-[#4187fb] px-4 py-2.5 rounded-2xl text-right shrink-0">
                      <span className="text-[10px] font-bold uppercase block">Aportación</span>
                      <span className="text-xl sm:text-2xl font-extrabold">
                      <AnimatedCounter value={RAFFLE_CONFIG.ticketPrice} prefix="$" suffix=" MXN" />
                    </span>
                    </div>
                  </div>

                  {/* CONTADOR REGRESIVO EN VIVO */}
                  <div className="bg-[#f8f8f6] rounded-2xl p-5 border border-slate-200/80 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold text-slate-600">
                    <span className="flex items-center gap-1.5 text-[#4187fb]">
                      <Calendar size={16} />
                      Sorteo: 21 de noviembre de 2026
                    </span>
                      <span className="text-[#ee7d31] uppercase tracking-wider">Tiempo restante</span>
                    </div>

                    <div className="grid grid-cols-4 gap-3 text-center">
                      <div className="bg-white rounded-xl py-3 px-2 border border-slate-200 shadow-2xs">
                      <span className="text-2xl sm:text-4xl font-extrabold text-[#4187fb] block leading-none">
                        <AnimatedCounter value={timeLeft.days} duration={1.2} />
                      </span>
                        <span className="text-[11px] font-bold uppercase text-slate-500 mt-1.5 block">Días</span>
                      </div>
                      <div className="bg-white rounded-xl py-3 px-2 border border-slate-200 shadow-2xs">
                      <span className="text-2xl sm:text-4xl font-extrabold text-[#4187fb] block leading-none">
                        <AnimatedCounter value={timeLeft.hours} padZero={2} duration={1.2} />
                      </span>
                        <span className="text-[11px] font-bold uppercase text-slate-500 mt-1.5 block">Horas</span>
                      </div>
                      <div className="bg-white rounded-xl py-3 px-2 border border-slate-200 shadow-2xs">
                      <span className="text-2xl sm:text-4xl font-extrabold text-[#4187fb] block leading-none">
                        <AnimatedCounter value={timeLeft.minutes} padZero={2} duration={1.2} />
                      </span>
                        <span className="text-[11px] font-bold uppercase text-slate-500 mt-1.5 block">Min</span>
                      </div>
                      <div className="bg-white rounded-xl py-3 px-2 border border-slate-200 shadow-2xs">
                      <span className="text-2xl sm:text-4xl font-extrabold text-[#ee7d31] block leading-none">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                        <span className="text-[11px] font-bold uppercase text-slate-500 mt-1.5 block">Seg</span>
                      </div>
                    </div>
                  </div>

                  {/* Cifras clave animadas */}
                  <div className="grid grid-cols-3 gap-3.5 text-center">
                    <div className="p-3.5 rounded-2xl bg-[#e3edfe]/60">
                    <span className="text-lg sm:text-2xl font-extrabold text-[#4187fb] block">
                      <AnimatedCounter value={RAFFLE_CONFIG.totalTickets} />
                    </span>
                      <span className="text-xs font-semibold text-slate-600">Boletos totales</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#fdf2ea]">
                    <span className="text-lg sm:text-2xl font-extrabold text-[#ee7d31] block">
                      <AnimatedCounter value={RAFFLE_CONFIG.goalAmountMXN} prefix="$" />
                    </span>
                      <span className="text-xs font-semibold text-slate-600">Meta de emisión</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#e3edfe]/60">
                    <span className="text-lg sm:text-2xl font-extrabold text-[#4187fb] block">
                      <AnimatedCounter value={3} suffix=" Premios" />
                    </span>
                      <span className="text-xs font-semibold text-slate-600">Ruleta en vivo</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">
                    Selección por ruleta virtual aleatoria independiente
                  </span>
                    <button
                        type="button"
                        onClick={() => setIsLegalOpen(true)}
                        className="font-extrabold text-[#4187fb] hover:underline cursor-pointer"
                    >
                      Leer bases legales →
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SECCIÓN LA BECA Y SIMULADOR — Ancho max-w-[1440px] */}
          <section id="la-beca" className="bg-white py-16 sm:py-24 px-5 sm:px-10 lg:px-16 border-b border-slate-200 scroll-mt-16">
            <div className="max-w-[1440px] mx-auto space-y-14">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#4187fb] tracking-tight leading-tight max-w-3xl">
                  No es sólo una beca, son dos años de desarrollo.
                </h2>
                <p className="text-lg sm:text-xl font-bold text-slate-900 pt-1">
                  ¿Qué recibe cada persona becada y cómo suma nuestra rifa?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tarjeta Azul Pastel (#e3edfe) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#e3edfe] rounded-3xl p-8 sm:p-11 flex flex-col justify-between space-y-8"
                >
                  <div className="space-y-4">
                    <div className="text-4xl sm:text-6xl font-extrabold text-[#4187fb] tracking-tight">
                      <AnimatedCounter value={RAFFLE_CONFIG.scholarshipEconomicMXN} prefix="$" />
                    </div>
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                      Una beca de manutención mensual de{' '}
                      <strong>
                        <AnimatedCounter value={RAFFLE_CONFIG.scholarshipMonthlyMXN} prefix="$" /> durante dos años
                      </strong>
                      , que les permite enfocarse en sus estudios y amplía el acceso a oportunidades de desarrollo académico.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <Calendar size={32} className="text-[#4187fb] shrink-0" />
                    <div>
                      <div className="grid grid-cols-12 gap-2 max-w-sm">
                        {Array.from({ length: 24 }).map((_, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.03 }}
                                className="w-3.5 h-3.5 rounded-full bg-[#4187fb] inline-block"
                            />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-2 block">
                      <AnimatedCounter value={24} /> meses de apoyo económico continuo
                    </span>
                    </div>
                  </div>
                </motion.div>

                {/* Tarjeta Naranja Pastel (#fdf2ea) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#fdf2ea] rounded-3xl p-8 sm:p-11 flex flex-col justify-between space-y-8"
                >
                  <div className="space-y-4">
                    <div className="text-4xl sm:text-6xl font-extrabold text-[#ee7d31] tracking-tight">
                      <AnimatedCounter value={RAFFLE_CONFIG.scholarshipAccompanimentMXN} prefix="$" />
                    </div>
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                      El acompañamiento, la formación y la operación del programa.
                    </p>
                  </div>

                  <ul className="space-y-3.5 text-sm sm:text-base font-bold text-slate-800">
                    <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#ee7d31] text-white flex items-center justify-center shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </span>
                      <span>Acompañamiento para impulsar su desarrollo personal.</span>
                    </li>
                    <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#ee7d31] text-white flex items-center justify-center shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </span>
                      <span>Sesiones grupales de formación en habilidades.</span>
                    </li>
                    <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#ee7d31] text-white flex items-center justify-center shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </span>
                      <span>Una comunidad de pares que se convierte en una red propia.</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Simulador Interactivo de Boletos */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#f8f8f6] rounded-3xl p-7 sm:p-11 border border-slate-200/90"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#ee7d31]">
                    Meta de emisión Aragonenes: <AnimatedCounter value={200} /> boletos (<AnimatedCounter value={20000} prefix="$" suffix=" MXN" />)
                  </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                      ¡Haz posible una beca más!
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      Elige cuántos boletos deseas apartar para calcular tu aportación y oportunidades en el sorteo:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                      {TICKET_PACK_OPTIONS.map((pack, idx) => {
                        const active = selectedTicketPack === pack.count;
                        return (
                            <button
                                key={pack.count}
                                type="button"
                                onClick={() => setSelectedTicketPack(pack.count)}
                                className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition cursor-pointer ${
                                    active
                                        ? 'bg-[#e3edfe]/60 border-[#4187fb] shadow-sm'
                                        : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <FlagStar
                                    variant={pack.star}
                                    size={18}
                                    spinDuration={14 + idx * 4}
                                    spinReverse={idx % 2 === 1}
                                />
                                <span className="font-extrabold text-sm sm:text-base text-slate-900">{pack.label}</span>
                              </div>
                              <span className="text-xl sm:text-2xl font-extrabold text-[#4187fb] block mt-1.5">
                            <AnimatedCounter
                                value={pack.count * RAFFLE_CONFIG.ticketPrice}
                                prefix="$"
                            />{' '}
                                <span className="text-xs">MXN</span>
                          </span>
                              <span className="text-xs text-slate-500 font-medium block mt-1">{pack.tag}</span>
                            </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-md space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                      <span className="text-xs font-bold uppercase text-slate-500">Tu aportación seleccionada</span>
                      <span className="text-xs font-extrabold text-[#4187fb] bg-[#e3edfe] px-3 py-1 rounded-full">
                      {selectedTicketPack} {selectedTicketPack === 1 ? 'boleto' : 'boletos'}
                    </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm sm:text-base font-semibold text-slate-600">Total a aportar:</span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      <AnimatedCounter
                          value={selectedTicketPack * RAFFLE_CONFIG.ticketPrice}
                          prefix="$"
                          suffix=" MXN"
                          duration={0.6}
                      />
                    </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Participas con <strong>{selectedTicketPack} {selectedTicketPack === 1 ? 'folio' : 'folios'}</strong> en la
                      ruleta virtual del 21 de noviembre por la Hora de Mariachi, el Amazon Echo (Alexa) y la Tarjeta Amazon de $500.
                    </p>
                    <a
                        href={safeFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 px-6 rounded-full bg-[#ee7d31] hover:bg-[#d96b22] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition"
                    >
                      <Ticket size={19} />
                      <span>Registrar {selectedTicketPack} {selectedTicketPack === 1 ? 'boleto' : 'boletos'}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* PREMIOS — Con Animación en Onda (WaveHeading) + Animaciones de Scroll Dinámicas */}
          <section id="premios" className="py-16 sm:py-24 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto scroll-mt-16">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl space-y-3 mb-12"
            >
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#ee7d31] block">
              Sorteo 21 de noviembre de 2026
            </span>
              <WaveHeading
                  text="Conoce los 3 premios del sorteo."
                  className="text-3xl sm:text-5xl lg:text-6xl text-[#4187fb]"
              />
              <p className="text-base sm:text-lg text-slate-600 pt-1">
                Selecciona cada lugar para conocer sus detalles. Todos los premios pueden ser transferidos a un tercero o donados directamente a la Fundación FLAG.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Tarjetas Selectoras con entrada escalonada al hacer scroll */}
              <div className="lg:col-span-5 space-y-4">
                {PRIZES_LIST.map((prize, idx) => {
                  const isSelected = selectedPrizeIndex === idx;
                  return (
                      <motion.button
                          key={prize.id}
                          type="button"
                          onClick={() => setSelectedPrizeIndex(idx)}
                          initial={{ opacity: 0, x: -28, y: 16 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.45, delay: idx * 0.12 }}
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.99 }}
                          className={`w-full text-left p-6 sm:p-7 rounded-3xl transition-colors cursor-pointer border-2 flex items-start justify-between gap-4 ${
                              isSelected
                                  ? 'bg-white border-[#4187fb] shadow-lg'
                                  : 'bg-white/75 hover:bg-white border-transparent hover:border-slate-200'
                          }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <FlagStar
                                variant={idx === 0 ? 'jaffa' : idx === 1 ? 'blueberry' : 'pink'}
                                size={20}
                                spinDuration={13 + idx * 5}
                                spinReverse={idx === 1}
                            />
                            <span className="text-xs font-extrabold uppercase tracking-wider text-[#ee7d31]">
                          {prize.place} • {prize.badge}
                        </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                            {prize.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600">
                            {prize.highlight}
                          </p>
                        </div>
                        <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 mt-1 transition-colors ${
                                isSelected ? 'bg-[#4187fb] text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                        >
                      0{idx + 1}
                    </span>
                      </motion.button>
                  );
                })}
              </div>

              {/* Tarjeta Principal del Premio Activo con animación de entrada por scroll + transición */}
              <motion.div
                  initial={{ opacity: 0, x: 28, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="lg:col-span-7"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                      key={PRIZES_LIST[selectedPrizeIndex].id}
                      initial={{ opacity: 0, y: 14, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -14, scale: 0.98 }}
                      transition={{ duration: 0.28 }}
                      className="bg-white rounded-[2rem] p-8 sm:p-12 border border-slate-200 shadow-xl relative overflow-hidden"
                  >
                    <FlagStar
                        variant={selectedPrizeIndex === 0 ? 'yellow' : selectedPrizeIndex === 1 ? 'blueberry' : 'pink'}
                        size={36}
                        spinDuration={16}
                        className="absolute top-6 right-6 opacity-80"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-5 bg-[#e3edfe]/60 rounded-3xl p-7 flex flex-col items-center justify-center">
                        <PrizeIllustration theme={PRIZES_LIST[selectedPrizeIndex].theme} />
                        <span className="mt-3 text-xs font-extrabold uppercase tracking-wider text-[#4187fb] bg-white px-3.5 py-1 rounded-full shadow-2xs">
                        {PRIZES_LIST[selectedPrizeIndex].place}
                      </span>
                      </div>

                      <div className="md:col-span-7 space-y-4">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#ee7d31]">
                        {PRIZES_LIST[selectedPrizeIndex].badge}
                      </span>
                        <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                          {PRIZES_LIST[selectedPrizeIndex].title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                          {PRIZES_LIST[selectedPrizeIndex].description}
                        </p>

                        <ul className="space-y-2.5 pt-2">
                          {PRIZES_LIST[selectedPrizeIndex].details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                            <span className="w-5 h-5 rounded-full bg-[#ee7d31] text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={12} strokeWidth={3} />
                            </span>
                                <span>{detail}</span>
                              </li>
                          ))}
                        </ul>

                        <div className="pt-4 flex flex-wrap items-center gap-4">
                          <a
                              href={safeFormUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#ee7d31] hover:bg-[#d96b22] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-sm transition"
                          >
                            Participar por este premio
                          </a>
                          <button
                              type="button"
                              onClick={() => setIsLegalOpen(true)}
                              className="text-xs sm:text-sm font-bold text-[#4187fb] hover:underline cursor-pointer px-2 py-2"
                          >
                            Ver cláusula legal →
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* COMITÉ ORGANIZADOR ARAGONENES — Ancho max-w-[1440px] */}
          <section id="comite" className="bg-[#4187fb] text-white py-16 sm:py-24 px-5 sm:px-10 lg:px-16 scroll-mt-16">
            <div className="max-w-[1440px] mx-auto space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-[#fde85f] text-xs sm:text-sm font-extrabold uppercase tracking-widest">
                    <Sparkles size={16} />
                    <span>Atención directa • FES Aragón</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    Comité Organizador Aragonenes.
                  </h2>
                  <p className="text-base sm:text-lg text-white/95">
                    ¿Prefieres comprar tu boleto físico en la FES Aragón o pedir los datos de transferencia por mensaje? Escríbele por WhatsApp a cualquiera de nosotros o sube tu comprobante al formulario:
                  </p>
                </div>

                <a
                    href={safeFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ee7d31] hover:bg-[#d96b22] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg transition shrink-0 inline-flex items-center gap-2 self-start md:self-auto"
                >
                  <span>Formulario de Registro (Google Forms)</span>
                  <ExternalLink size={17} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ARAGONENES_MEMBERS.map((member, index) => {
                  const safeWaUrl = buildSafeWhatsAppUrl(member.whatsappNumber, member.defaultMessage);
                  return (
                      <motion.a
                          key={member.id}
                          href={safeWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 }}
                          className="bg-white text-slate-900 rounded-3xl p-7 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col justify-between group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-13 h-13 rounded-2xl bg-[#e3edfe] text-[#4187fb] font-extrabold text-xl flex items-center justify-center">
                            {member.name.charAt(0)}
                          </div>
                          <FlagStar
                              variant={index % 2 === 0 ? 'yellow' : 'pink'}
                              size={30}
                              spinDuration={14 + index * 4}
                              spinReverse={index % 2 === 1}
                          />
                        </div>

                        <div className="my-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        Equipo Aragonenes
                      </span>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                            {member.name}
                          </h3>
                        </div>

                        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#4187fb] group-hover:text-[#ee7d31] transition">
                      <span className="inline-flex items-center gap-1.5">
                        <MessageCircle size={17} />
                        Enviar WhatsApp
                      </span>
                          <ArrowUpRight size={17} />
                        </div>
                      </motion.a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* PREGUNTAS FRECUENTES */}
          <section id="faqs" className="bg-white py-16 sm:py-24 px-5 sm:px-10 lg:px-16 scroll-mt-16">
            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-slate-950 tracking-tight">
                Preguntas frecuentes
              </h2>

              <div className="divide-y divide-slate-200 border-y border-slate-200">
                {RAFFLE_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                      <div key={idx} className="py-5 sm:py-6">
                        <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between gap-4 text-left font-bold text-base sm:text-lg text-slate-900 hover:text-[#4187fb] transition cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <span className="text-[#4187fb] shrink-0">
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                      </span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                              <motion.p
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="text-sm sm:text-base text-slate-600 leading-relaxed pt-3 overflow-hidden"
                              >
                                {faq.answer}
                              </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                  );
                })}
              </div>

              <div className="text-center pt-2">
                <button
                    type="button"
                    onClick={() => setIsLegalOpen(true)}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-[#4187fb] hover:underline cursor-pointer"
                >
                  <ShieldCheck size={19} className="text-[#ee7d31]" />
                  <span>Abrir documento íntegro de Términos y Condiciones Oficiales</span>
                </button>
              </div>
            </div>
          </section>

          {/* PRE-FOOTER AMARILLO OFICIAL (#fde85f) DE TODOSPARAUNO.ORG */}
          <section className="bg-[#fde85f] text-slate-950 py-16 sm:py-24 px-5 sm:px-10 lg:px-16">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
              <TodosParaUnoLogo darkText className="w-60 sm:w-72 h-auto shrink-0" />

              <div className="space-y-5 text-center md:text-left max-w-md">
                <p className="text-2xl sm:text-3xl font-normal leading-snug text-slate-950">
                  Cada quien pone una parte. Entre todos hacemos posible el camino.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a
                      href={safeFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#4187fb] hover:bg-blue-600 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-md transition"
                  >
                    Suma tu parte
                  </a>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                  ¡Sorteo: 21 de noviembre!
                </span>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER ESTILO OFICIAL TODOSPARAUNO.ORG (#4187fb) CON LINKS CORREGIDOS Y SIN DATOS FISCALES */}
        <footer className="bg-[#4187fb] text-white py-14 sm:py-16 px-5 sm:px-10 lg:px-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
            {/* Columna 1: Logo Blanco Oficial */}
            <div className="lg:col-span-5 space-y-5">
              <a
                  href={safeFoundationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-90 transition"
              >
                <FlagFullWhiteLogo />
              </a>
              <p className="text-xs sm:text-sm text-white/90 max-w-sm leading-relaxed">
                Campaña oficial{' '}
                <a
                    href={safeOfficialCampaignUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold hover:text-[#fde85f]"
                >
                  Todos para Uno 2026
                </a>{' '}
                • Rifa con causa organizada por el <strong>{RAFFLE_CONFIG.committeeName}</strong> ({RAFFLE_CONFIG.facultyName}).
              </p>

              <div className="flex items-center gap-3 pt-1">
                <a
                    href={getSafeExternalUrl(RAFFLE_CONFIG.socialLinks.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram oficial Fundación FLAG"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white hover:text-[#4187fb] flex items-center justify-center transition"
                >
                  <SocialSvgIcon network="instagram" className="w-5 h-5" />
                </a>
                <a
                    href={getSafeExternalUrl(RAFFLE_CONFIG.socialLinks.facebook)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook oficial Fundación FLAG"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white hover:text-[#4187fb] flex items-center justify-center transition"
                >
                  <SocialSvgIcon network="facebook" className="w-5 h-5" />
                </a>
                <a
                    href={getSafeExternalUrl(RAFFLE_CONFIG.socialLinks.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn oficial Fundación FLAG"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white hover:text-[#4187fb] flex items-center justify-center transition"
                >
                  <SocialSvgIcon network="linkedin" className="w-5 h-5" />
                </a>
                <a
                    href={getSafeExternalUrl(RAFFLE_CONFIG.socialLinks.youtube)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube oficial Fundación FLAG"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white hover:text-[#4187fb] flex items-center justify-center transition"
                >
                  <SocialSvgIcon network="youtube" className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Columna 2: Enlaces Institucionales */}
            <div className="lg:col-span-2 space-y-3 text-sm font-medium">
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.aboutUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                Quiénes somos
              </a>
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.talentUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                Talento FLAG
              </a>
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.newsUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                Novedades
              </a>
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.contactUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                Contacto
              </a>
            </div>

            {/* Columna 3: Medios Oficiales */}
            <div className="lg:col-span-3 space-y-3 text-sm font-medium">
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.socialLinks.email)}
                  className="block text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                contacto@fundacionflag.org
              </a>
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.socialLinks.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                <SocialSvgIcon network="instagram" className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.socialLinks.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                <SocialSvgIcon network="linkedin" className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.socialLinks.facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                <SocialSvgIcon network="facebook" className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>

            {/* Columna 4: Aviso de privacidad y Bases de la Rifa */}
            <div className="lg:col-span-2 space-y-3 text-sm font-medium">
              <a
                  href={getSafeExternalUrl(RAFFLE_CONFIG.privacyUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/95 hover:text-[#fde85f] hover:underline transition"
              >
                Aviso de privacidad
              </a>
              <button
                  type="button"
                  onClick={() => setIsLegalOpen(true)}
                  className="block text-left text-[#fde85f] font-bold hover:underline cursor-pointer transition"
              >
                Bases legales rifa
              </button>
            </div>
          </div>
        </footer>

        <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
      </div>
  );
}