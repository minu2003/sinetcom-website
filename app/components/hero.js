'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from './root';

const headlineLine1 = 'Next Generation';
const headlineLine2 = 'Cybersecurity Starts Here';

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
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Hero Content - centered on video */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 w-full px-6 sm:px-8 lg:px-12">
        <div className="w-full max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-4 py-2 mb-6 text-sm font-semibold uppercase tracking-widest rounded-full border-2 border-white/80 text-white"
        >
          Authorized Sophos Distributor
        </motion.span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight overflow-hidden block">
          <span className="block">
            {headlineLine1.split('').map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {headlineLine2.split('').map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                custom={headlineLine1.length + i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Sophos firewalls, endpoint protection, and enterprise IT solutions
          designed to secure, monitor, and protect modern businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/solutions/sophos">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-4 text-base font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors duration-200 min-w-[180px] text-center"
            >
              View Solutions
            </motion.span>
          </Link>
          <Link href="/contact">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-4 text-base font-semibold rounded-lg border-2 border-transparent text-white transition-colors duration-200 min-w-[180px] text-center"
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
