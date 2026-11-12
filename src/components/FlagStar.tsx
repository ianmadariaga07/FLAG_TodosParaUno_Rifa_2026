import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import type { StarVariant } from '../types/raffle.types';

interface StarProps {
    readonly className?: string;
    readonly variant?: StarVariant;
    readonly size?: number;
    readonly spinDuration?: number;
    readonly spinReverse?: boolean;
}

const STAR_COLORS: Record<StarVariant, string> = {
    yellow: '#FEDE0D',
    pink: '#FF85E3',
    jaffa: '#EE7D31',
    blueberry: '#4187FB',
};

/** Estrella suelta oficial con rotación continua a diferentes velocidades */
export function FlagStar({
                             className = '',
                             variant = 'yellow',
                             size = 40,
                             spinDuration = 18,
                             spinReverse = false,
                         }: StarProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="376 39 106 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
            animate={{ rotate: spinReverse ? -360 : 360 }}
            transition={{
                duration: spinDuration,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            <path
                d="M414.425 136.75C408.877 141.827 400.074 136.838 401.579 129.47L405.621 109.67C406.293 106.375 404.768 103.021 401.842 101.363L384.26 91.4C377.717 87.6926 379.741 77.779 387.213 76.9327L407.294 74.6584C410.635 74.2799 413.353 71.7927 414.026 68.4977L418.068 48.697C419.572 41.329 429.626 40.1903 432.74 47.0352L441.108 65.4303C442.501 68.4915 445.706 70.3078 449.048 69.9293L469.129 67.655C476.601 66.8087 480.791 76.0186 475.243 81.0953L460.334 94.7384C457.853 97.0088 457.116 100.618 458.509 103.68L466.877 122.075C469.991 128.92 462.527 135.75 455.984 132.043L438.402 122.08C435.476 120.422 431.815 120.836 429.334 123.107L414.425 136.75Z"
                fill={STAR_COLORS[variant]}
            />
        </motion.svg>
    );
}

/** Título con animación de onda (Wave) al entrar en pantalla durante el scroll */
export function WaveHeading({
                                text,
                                className = '',
                            }: {
    readonly text: string;
    readonly className?: string;
}) {
    const words = text.split(' ');
    let charCounter = 0;

    return (
        <h2 className={`font-black tracking-tight leading-tight flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
            {words.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-flex whitespace-nowrap">
          {Array.from(word).map((char, charIdx) => {
              const delayIndex = charCounter++;
              return (
                  <motion.span
                      key={charIdx}
                      initial={{ opacity: 0, y: 28, rotate: -6, scale: 0.85 }}
                      whileInView={{
                          opacity: 1,
                          y: [28, -9, 0],
                          rotate: [-6, 2, 0],
                          scale: [0.85, 1.05, 1],
                      }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                          duration: 0.55,
                          delay: delayIndex * 0.028,
                          ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                  >
                      {char}
                  </motion.span>
              );
          })}
        </span>
            ))}
        </h2>
    );
}

/** Contador incremental animado de 0 al valor objetivo */
interface AnimatedCounterProps {
    readonly value: number;
    readonly prefix?: string;
    readonly suffix?: string;
    readonly duration?: number;
    readonly padZero?: number;
}

export function AnimatedCounter({
                                    value,
                                    prefix = '',
                                    suffix = '',
                                    duration = 1.6,
                                    padZero = 0,
                                }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: '-30px' });
    const [displayValue, setDisplayValue] = useState<number>(0);
    const prevValueRef = useRef<number>(0);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(prevValueRef.current, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(latest) {
                setDisplayValue(Math.round(Number(latest)));
            },
        });
        prevValueRef.current = value;
        return () => controls.stop();
    }, [isInView, value, duration]);

    const formatted =
        padZero > 0
            ? String(displayValue).padStart(padZero, '0')
            : displayValue.toLocaleString('es-MX');

    return (
        <span ref={ref}>
      {prefix}
            {formatted}
            {suffix}
    </span>
    );
}

/** Isotipo triangular oficial de la Fundación FLAG (flag-mark_3vnT.svg) */
export function FlagMarkLogo({
                                 className = 'h-8 w-auto',
                                 white = false,
                             }: {
    readonly className?: string;
    readonly white?: boolean;
}) {
    return (
        <svg
            viewBox="0 0 3213 2812"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Logo Fundación FLAG"
        >
            <path
                d="M1602.5 0L1776.2 303.3L1037.7 1597.4L2519 1599.8L2650.6 1829.5L2650.4 1901.2L520.8 1897.7Z"
                fill={white ? '#FFFFFF' : '#F7AD7C'}
                fillOpacity={white ? '0.73' : '1'}
            />
            <path
                d="M2158.7 2054.9L2159.3 2054.6L2586.4 2811.3L923.7 2811.3L923.7 2520.2L2076.2 2520.2L1983.3 2355.5L1476 2355.5L1656.7 2054.3L2158.7 2054.3L2158.7 2054.9Z"
                fill={white ? '#FFFFFF' : '#F7AD7C'}
                fillOpacity={white ? '0.73' : '1'}
            />
            <path
                d="M2606.6 1752.8L3195.6 2811.3L2850.9 2811.3L1942.1 1178.2L999.8 2811.3L652.1 2811.3L1937.1 584.1Z"
                fill={white ? '#FFFFFF' : '#F6904C'}
            />
        </svg>
    );
}

/** Logotipo blanco completo del Footer oficial de todosparauno.org (flag-logo-white_3vnT.svg) */
export function FlagFullWhiteLogo({ className = 'h-16 w-auto' }: { readonly className?: string }) {
    return (
        <div className={`inline-flex items-center gap-4 select-none ${className}`}>
            <FlagMarkLogo white className="h-12 sm:h-14 w-auto shrink-0" />
            <div className="h-12 sm:h-14 w-[2px] bg-white/90 rounded-full shrink-0" />
            <div className="font-serif font-bold text-base sm:text-lg leading-[1.18] text-white text-left">
                <span className="block">Fundación</span>
                <span className="block">Lorena Alejandra</span>
                <span className="block">Gallardo</span>
            </div>
        </div>
    );
}

/**
 * Logotipo Oficial "Todos para uno" con las coordenadas porcentuales y viewBox exactos
 * de todosparauno.org (top-[7%] left-[56.6%], top-[48%] left-[5.9%], top-[61.8%] left-[76.7%])
 */
export function TodosParaUnoLogo({
                                     className = 'w-full max-w-[440px] h-auto',
                                     darkText = false,
                                 }: {
    readonly className?: string;
    readonly darkText?: boolean;
}) {
    const fill = darkText ? '#000000' : '#FFFFFF';
    return (
        <div className={`relative inline-block select-none ${className}`}>
            {/* Estrella 1: Pegada entre la 'd' y la segunda 'o' de Todos */}
            <motion.svg
                viewBox="376 39 106 105"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute top-[7%] left-[56.6%] w-[16%] h-auto pointer-events-none"
            >
                <path
                    d="M414.425 136.75C408.877 141.827 400.074 136.838 401.579 129.47L405.621 109.67C406.293 106.375 404.768 103.021 401.842 101.363L384.26 91.4C377.717 87.6926 379.741 77.779 387.213 76.9327L407.294 74.6584C410.635 74.2799 413.353 71.7927 414.026 68.4977L418.068 48.697C419.572 41.329 429.626 40.1903 432.74 47.0352L441.108 65.4303C442.501 68.4915 445.706 70.3078 449.048 69.9293L469.129 67.655C476.601 66.8087 480.791 76.0186 475.243 81.0953L460.334 94.7384C457.853 97.0088 457.116 100.618 458.509 103.68L466.877 122.075C469.991 128.92 462.527 135.75 455.984 132.043L438.402 122.08C435.476 120.422 431.815 120.836 429.334 123.107L414.425 136.75Z"
                    fill={darkText ? '#4187FB' : '#FEDE0D'}
                />
            </motion.svg>

            {/* Estrella 2 (Rosa): Pegada a la 'p' de para */}
            <motion.svg
                viewBox="39 268 103 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute top-[48%] left-[5.9%] w-[15.5%] h-auto pointer-events-none"
            >
                <path
                    d="M48.0197 337.383C40.5078 337.732 36.938 328.265 42.8101 323.567L58.5908 310.942C61.2169 308.842 62.1915 305.289 61.005 302.142L53.8749 283.232C51.2217 276.196 59.1226 269.875 65.4049 274.008L82.288 285.115C85.0976 286.964 88.7778 286.793 91.4039 284.692L107.185 272.067C113.057 267.37 121.51 272.931 119.52 280.183L114.174 299.672C113.284 302.915 114.584 306.362 117.393 308.211L134.277 319.318C140.559 323.451 137.882 333.208 130.37 333.557L110.183 334.495C106.824 334.651 103.947 336.953 103.057 340.196L97.7107 359.685C95.7212 366.937 85.6141 367.407 82.9609 360.37L75.8308 341.461C74.6443 338.314 71.5664 336.289 68.207 336.445L48.0197 337.383Z"
                    fill="#FF85E3"
                />
            </motion.svg>

            {/* Estrella 3 (Naranja): Posicionada sobre la 'o' de uno */}
            <motion.svg
                viewBox="509 345 110 112"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
                className="absolute top-[61.8%] left-[76.7%] w-[16.6%] h-auto pointer-events-none"
            >
                <path
                    d="M516.09 379.084C511.455 372.455 518.01 363.768 525.656 366.406L546.204 373.497C549.624 374.678 553.414 373.522 555.593 370.634L568.686 353.283C573.559 346.827 583.846 350.377 583.7 358.465L583.305 380.198C583.239 383.815 585.51 387.062 588.929 388.242L609.477 395.333C617.123 397.972 616.926 408.853 609.189 411.213L588.397 417.553C584.937 418.609 584.937 421.772 582.485 425.388L582.09 447.122C581.944 455.209 571.534 458.383 566.899 451.755L554.444 433.94C552.371 430.976 548.625 429.683 545.165 430.738L524.374 437.079C516.637 439.438 510.401 430.519 515.273 424.063L528.367 406.712C530.546 403.825 530.618 399.863 528.545 396.898L516.09 379.084Z"
                    fill="#EE7D31"
                />
            </motion.svg>

            {/* Letras de Todos para uno */}
            <svg viewBox="0 0 664 558" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <path d="M369.741 109.795V250.553H330.209V229.032C327.695 228.616 328.768 229.613 328.223 230.86C321.49 246.348 312.016 252.746 293.595 252.73C251.303 252.73 243.27 198.188 255.733 169.206C267.527 141.802 310.364 135.504 325.955 162.243C327.52 164.935 327.66 168.441 330.191 170.253V109.795H369.723H369.741ZM304.511 174.573C284.648 177.814 283.47 217.216 301.013 224.661C334.111 238.72 340.105 168.757 304.511 174.573Z" fill={fill} />
                <path d="M244.348 198.969C244.348 229.43 218.14 254.142 185.815 254.142C153.489 254.142 127.281 229.447 127.281 198.969C127.281 168.491 153.489 143.796 185.815 143.796C218.14 143.796 244.348 168.491 244.348 198.969ZM198.154 176.318C192.265 171.166 181.086 171.05 174.723 175.587C162.366 184.395 162.63 219.991 179.522 224.927C203.638 231.973 207.47 204.835 204.517 188.948C203.796 185.043 201.265 179.027 198.154 176.318Z" fill={fill} />
                <path d="M497.563 199.003C497.563 229.465 471.354 254.159 439.029 254.159C406.704 254.159 380.496 229.465 380.496 199.003C380.496 168.542 406.704 143.847 439.029 143.847C471.354 143.847 497.563 168.542 497.563 199.003ZM438.836 172.214C420.221 172.464 418.569 192.007 419.782 205.451C420.837 217.067 426.795 226.49 440.488 225.742C457.328 224.828 459.542 206.132 458.505 193.802C457.556 182.634 452.336 172.031 438.854 172.214H438.836Z" fill={fill} />
                <path d="M141.35 144.561H100.499L99.1809 145.808V250.537H58.7877V145.808L57.4694 144.561H17.9375L16.6191 143.331V114.349L17.9375 113.103H140.031L141.35 114.349V144.561Z" fill={fill} />
                <path d="M600.763 180.175H566.504C568.93 165.252 538.099 166.166 542.089 178.762C543.073 181.887 548.417 183.316 551.388 184.064C568.684 188.401 597.283 187.421 604.032 207.313C609.112 222.286 603.153 238.339 588.406 245.95C562.215 259.478 502.733 254.476 505.018 216.602H540.595L541.755 217.998C539.505 234.633 570.74 232.008 566.135 218.231C563.446 210.154 539.312 208.642 531.173 206.449C519.133 203.208 506.758 196.81 505.106 183.814C502.663 164.52 511.645 153.137 531.173 148.135C558.085 141.238 602.099 146.19 600.763 180.192V180.175Z" fill={fill} />
                <path d="M93.0592 372.154L98.0825 358.694C108.446 338.915 137.808 333.334 155.571 346.249C177.084 361.878 187.478 409.622 169.767 431.253C157.05 446.783 132.306 451.346 116.185 439.059L106.309 429.437L119.743 487.514L81.6562 496.324L80.0909 495.406L48.9317 360.698L49.9352 359.187L86.7376 350.674L88.3029 351.591L93.0592 372.154ZM109.879 371.862C91.5517 379.598 99.134 419.788 119.15 421.537C154.307 424.629 142.342 358.161 109.879 371.862Z" fill={fill} />
                <path d="M475.355 344.907C472.813 345.068 474.082 345.798 473.832 347.135C470.764 363.742 462.975 372.111 445.024 376.246C403.786 385.785 383.683 334.522 389.313 303.403C395.142 271.199 438.776 257.353 459.558 285.501C460.369 286.592 459.549 287.805 461.905 286.834L456.868 265.057L494.526 256.346L517.851 357.183L480.192 365.894L475.342 344.927L475.355 344.907ZM438.032 297.661C419.346 305.326 427.084 343.928 445.912 347.248C481.403 353.503 471.254 284.04 438.032 297.661Z" fill={fill} />
                <path d="M267.373 393.015L262.914 406.806C253.565 424.575 225.247 430.222 208.3 420.291C186.473 407.515 175.123 366.559 183.864 343.898C193.201 319.684 228.831 308.986 248.017 328.053L254.123 335.732L249.18 314.36L250.183 312.849L286.558 304.435L309.882 405.272L272.223 413.982L267.373 393.015ZM230.923 345.567C211.55 353.46 219.293 392.47 238.723 395.276C274.021 400.381 262.911 332.539 230.923 345.567Z" fill={fill} />
                <path d="M335.341 293.169L341.123 318.167C343.428 317.992 342.593 317.503 342.671 315.967C343.021 309.37 342.323 302.999 346.421 296.849C348.205 294.185 354.945 288.617 358.011 287.908L372.139 284.64L378.671 312.877L359.422 317.329C357.041 317.88 352.495 320.842 350.769 322.742C348.801 324.92 346.103 331.821 346.676 334.298L360.391 393.589L322.304 402.399L320.739 401.482L298.163 303.883C298.104 303.624 299.009 302.391 298.552 301.661L335.354 293.149L335.341 293.169Z" fill={fill} />
                <path d="M310.986 537.27H272.333V513.256C268.449 514.336 268.325 520.934 266.339 524.573C251.838 551.063 203.324 540.311 203.042 509.434C203.552 486.866 199.263 458.731 202.005 436.629C202.164 435.416 202.111 434.502 203.376 433.771H241.151L242.469 435.017V499.596C242.469 499.945 244.789 505.396 245.229 506.094C249.728 513.273 262.806 513.871 267.798 506.908C269.363 504.714 271.454 497.917 271.454 495.458V435.017L272.773 433.771H309.668L310.986 435.017V537.27Z" fill={fill} />
                <path d="M433.096 537.269H393.564V476.412C393.564 476.03 392.527 470.928 392.299 470.147C389.416 459.96 377.147 455.274 368.938 463.134C367.374 464.63 364.579 470.463 364.579 472.274V536.023L363.26 537.269H325.047V433.77H362.382L363.7 435.016V458.614C367.163 455.008 367.338 450.006 370.362 445.436C387.289 419.794 433.096 432.739 433.096 463.168V537.269Z" fill={fill} />
                <path d="M559.764 485.702C559.764 516.164 533.556 540.875 501.231 540.875C468.905 540.875 442.697 516.18 442.697 485.702C442.697 455.224 468.905 430.529 501.231 430.529C533.556 430.529 559.764 455.224 559.764 485.702ZM500.527 458.847C475.356 459.728 476.499 506.276 494.973 511.66C519.423 518.806 522.745 490.837 519.845 474.967C518.21 465.976 510.652 458.481 500.527 458.847Z" fill={fill} />
            </svg>
        </div>
    );
}

/** Iconos SVG vectoriales oficiales para Redes Sociales */
export function SocialSvgIcon({
                                  network,
                                  className = 'w-5 h-5',
                              }: {
    readonly network: 'instagram' | 'facebook' | 'linkedin' | 'youtube';
    readonly className?: string;
}) {
    if (network === 'instagram') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
        );
    }
    if (network === 'facebook') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        );
    }
    if (network === 'linkedin') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
        </svg>
    );
}

/** Ilustración SVG personalizada con flotación suave para los 3 premios */
export function PrizeIllustration({ theme }: { readonly theme: 'mariachi' | 'alexa' | 'amazon' }) {
    if (theme === 'mariachi') {
        return (
            <motion.svg
                viewBox="0 0 220 160"
                fill="none"
                className="w-48 h-40 mx-auto drop-shadow-md"
                aria-hidden="true"
                animate={{ y: [0, -7, 0], rotate: [0, -1.5, 1.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <circle cx="38" cy="36" r="6" fill="#FEDE0D" />
                <path d="M44 36V16L58 20V28L44 24" stroke="#EE7D31" strokeWidth="3" strokeLinecap="round" />
                <circle cx="182" cy="30" r="5" fill="#FF85E3" />
                <path d="M187 30V12L199 15" stroke="#FF85E3" strokeWidth="3" strokeLinecap="round" />
                <path d="M72 86C76 48 92 32 110 32C128 32 144 48 148 86H72Z" fill="#1A2542" />
                <path d="M78 72C96 66 124 66 142 72" stroke="#FEDE0D" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
                <path d="M22 86C22 72 52 80 110 80C168 80 198 72 198 86C198 104 158 114 110 114C62 114 22 104 22 86Z" fill="#1A2542" stroke="#EE7D31" strokeWidth="4" />
                <path d="M36 90C68 98 152 98 184 90" stroke="#FEDE0D" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 6" />
                <path d="M55 134L145 118M145 118L172 104V132L145 118Z" stroke="#EE7D31" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
        );
    }
    if (theme === 'alexa') {
        return (
            <motion.svg
                viewBox="0 0 220 160"
                fill="none"
                className="w-48 h-40 mx-auto drop-shadow-md"
                aria-hidden="true"
                animate={{ y: [0, -7, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            >
                <circle cx="110" cy="85" r="64" stroke="#4187FB" strokeOpacity="0.25" strokeWidth="3" strokeDasharray="6 6" />
                <circle cx="110" cy="85" r="52" stroke="#4187FB" strokeOpacity="0.45" strokeWidth="3" />
                <circle cx="110" cy="85" r="40" fill="#1A2542" />
                <path d="M72 75C88 62 132 62 148 75" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="110" cy="118" rx="31" ry="7" fill="#38BDF8" />
                <ellipse cx="110" cy="118" rx="31" ry="7" stroke="#4187FB" strokeWidth="3" />
            </motion.svg>
        );
    }
    return (
        <motion.svg
            viewBox="0 0 220 160"
            fill="none"
            className="w-48 h-40 mx-auto drop-shadow-md"
            aria-hidden="true"
            animate={{ y: [0, -7, 0], rotate: [0, 1.5, -1.5, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
            <rect x="28" y="30" width="164" height="102" rx="18" fill="#1A2542" stroke="#FEDE0D" strokeWidth="3" />
            <rect x="44" y="46" width="46" height="24" rx="6" fill="#EE7D31" />
            <text x="67" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
                $500
            </text>
            <path d="M68 96C92 114 132 114 156 94" stroke="#FEDE0D" strokeWidth="5" strokeLinecap="round" />
            <path d="M148 92L158 93L154 103" stroke="#FEDE0D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="164" cy="54" r="10" fill="#4187FB" fillOpacity="0.35" />
        </motion.svg>
    );
}