'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from './root';

const headlineLine1 = 'Secure Your Future';
const headlineLine2 = 'with Intelligent Defense.';

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delayIndex) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + delayIndex * 0.025, duration: 0.25 },
  }),
};

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] h-[100dvh] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Hero Content - centered with nav offset */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 w-full px-4 sm:px-8 lg:px-12 pt-4 sm:pt-12 lg:pt-14 pb-12 sm:pb-0">
        <div className="w-full max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-6 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest rounded-full border border-white/60 sm:border-2 border-white/80 text-white"
          >
            Authorized Sophos Distributor
          </motion.span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] sm:leading-tight tracking-tight block">
            <span className="block mb-1 sm:mb-0">
              {headlineLine1.split(' ').map((word, i) => (
                <span key={`l1w-${i}`} className="inline-block whitespace-nowrap mr-[0.2em] md:mr-[0.3em]">
                  {word.split('').map((char, j) => (
                    <motion.span
                      key={`l1c-${i}-${j}`}
                      custom={i * 5 + j} 
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
            <span className="block">
              {headlineLine2.split(' ').map((word, i) => (
                <span key={`l2w-${i}`} className="inline-block whitespace-nowrap mr-[0.2em] md:mr-[0.3em]">
                  {word.split('').map((char, j) => (
                    <motion.span
                      key={`l2c-${i}-${j}`}
                      custom={headlineLine1.length + i * 5 + j} 
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            Providing Sri Lanka and the Maldives with elite Sophos protection, from 24/7 Managed
            Detection to Next-Gen Firewalls, we bridge the gap between complex threats and
            seamless business continuity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link href="/sophos">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-lg border-2 border-white bg-transparent text-white hover:bg-white hover:text-gray-900 transition-colors duration-200 min-w-[160px] sm:min-w-[180px] text-center"
              >
                Expert Defense
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-lg border-2 border-transparent text-white transition-colors duration-200 min-w-[160px] sm:min-w-[180px] text-center hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                Contact Us
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
