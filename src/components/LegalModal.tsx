import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LEGAL_TERMS_SECTIONS, RAFFLE_CONFIG } from '../data/raffle.data';

interface LegalModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

export function LegalModal({ isOpen, onClose }: LegalModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1a2542]/80 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-tyc-title"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#f8f8f6] border border-slate-200 rounded-t-3xl sm:rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
                    >
                        <div className="px-6 py-4 bg-[#4187fb] text-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck className="text-[#fde85f] shrink-0" size={22} />
                                <div>
                                    <h3 id="modal-tyc-title" className="font-extrabold text-base sm:text-lg leading-tight">
                                        Términos y Condiciones — {RAFFLE_CONFIG.campaignName}
                                    </h3>
                                    <p className="text-xs text-white/90">
                                        Sorteo {RAFFLE_CONFIG.teamName} a beneficio de {RAFFLE_CONFIG.foundationName}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
                                aria-label="Cerrar términos y condiciones"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed text-justify">
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm">
                                El presente documento establece las bases legales que rigen la campaña de recaudación y sorteo denominado{' '}
                                <strong>“{RAFFLE_CONFIG.campaignName}”</strong>, organizado por el <strong>{RAFFLE_CONFIG.teamName}</strong> a
                                beneficio exclusivo de la <strong>{RAFFLE_CONFIG.foundationName}</strong>. La adquisición de uno o más boletos
                                implica la lectura, comprensión y aceptación total, absoluta e incondicional de los presentes Términos y
                                Condiciones por parte del participante.
                            </div>

                            {LEGAL_TERMS_SECTIONS.map((sec) => (
                                <section key={sec.numeral} className="space-y-2.5">
                                    <h4 className="font-extrabold text-[#ee7d31] text-sm sm:text-base tracking-wide uppercase flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ee7d31]/15 text-[#ee7d31] text-xs font-black">
                      {sec.numeral}
                    </span>
                                        {sec.title}
                                    </h4>
                                    <div className="space-y-2.5 pl-1 sm:pl-8">
                                        {sec.paragraphs.map((p, idx) => (
                                            <p key={idx} className="text-xs sm:text-sm text-slate-700">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-600 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 size={16} className="text-[#4187fb] shrink-0" />
                Sorteo transparente mediante ruleta virtual independiente
              </span>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#ee7d31] hover:bg-[#d96b22] text-white font-bold text-sm transition shadow-sm cursor-pointer"
                            >
                                Entendido y Cerrar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}