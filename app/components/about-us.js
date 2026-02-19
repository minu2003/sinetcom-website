'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { colors } from './root';
import debugImage from '../assets/debug.jpg';

// Order matches reference: row1 MD, GM, SM; row2 HoS, CAM, SC. Add `name` when available.
const leadership = [
  { role: 'Managing Director' },
  { role: 'General Manager' },
  { role: 'Senior Manager' },
  { role: 'Head of Sales' },
  { role: 'Channel Account Manager' },
  { role: 'Sales Consultant' },
];

// Placeholder achievements – replace with real award images and titles
const achievements = [
  { year: '2024', title: 'Excellence in Distribution', description: 'Award for outstanding channel performance' },
  { year: '2023', title: 'Partner of the Year', description: 'Recognized for exceptional partnership' },
  { year: '2023', title: 'Best Value-Added Distributor', description: 'Excellence in value-added services' },
  { year: '2022', title: 'Growth Champion', description: 'Rapid growth and market expansion' },
  { year: '2022', title: 'Customer Excellence', description: 'Superior customer satisfaction' },
  { year: '2021', title: 'Innovation Leader', description: 'Leading innovative solutions delivery' },
];

function useFadeIn(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15, once: true, ...options });
  return [ref, isInView];
}

export default function AboutUs() {
  const [heroRef, heroInView] = useFadeIn();
  const [visionRef, visionInView] = useFadeIn();
  const [historyRef, historyInView] = useFadeIn();
  const [leadRef, leadInView] = useFadeIn();
  const [awardsRef, awardsInView] = useFadeIn();

  return (
    <div className="pt-[var(--navbar-height,80px)]">
      {/* Hero: Why We Are */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: colors.primary }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: colors.accent }} />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\' fill=\'%23274794\' fill-opacity=\'0.08\'/%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 32 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 py-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold uppercase tracking-widest rounded-full border border-white/40 text-white/90"
          >
            About Sinetcom
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Why We <span style={{ color: colors.accent }}>Are</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A leading value-added distributor and technology enabler, committed to tomorrow&apos;s innovative solutions and exceptional customer satisfaction.
          </p>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 rounded-r-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6' cy='6' r='2' fill='%23274794' fill-opacity='0.14'/%3E%3C/svg%3E")`,
            backgroundColor: 'transparent',
          }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 rounded-l-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6' cy='6' r='2' fill='%23274794' fill-opacity='0.14'/%3E%3C/svg%3E")`,
            backgroundColor: 'transparent',
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
              ref={visionRef}
              initial={{ opacity: 0, x: -24 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: colors.primary }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed pl-0 md:pl-0">
                An organization with a vision for tomorrow&apos;s innovative solutions.
              </p>
            </motion.div>
            <motion.div
              ref={visionRef}
              initial={{ opacity: 0, x: 24 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group pt-8 mt-8 border-t border-gray-300 md:pt-0 md:mt-0 md:border-t-0 md:border-l md:pl-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: colors.accent }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                &ldquo;We are a professional organization, providing an exceptional standard of customer satisfaction through our commitment to maintain the highest level of quality, integrity and dedication in all products, services and solutions offered by us.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History with Debug image */}
      <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              ref={historyRef}
              initial={{ opacity: 0, x: -24 }}
              animate={historyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <Image
                  src={debugImage}
                  alt="Debug Computer Peripherals - Sinetcom heritage"
                  width={640}
                  height={480}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl opacity-20 blur-xl" style={{ background: colors.primary }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={historyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Our <span style={{ color: colors.primary }}>History</span>
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                In 1989, Colombo&apos;s rapidly progressing IT industry saw the birth of an organisation aptly named <strong className="text-gray-900">Debug Computer Peripherals</strong>. This new organization was committed to supporting the growing demand for computer peripherals of reputed quality.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Since then Debug has played a major role in helping to shape the role of responsible distribution of high quality IT products by introducing a new standard in the sale and servicing of such items.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            ref={leadRef}
            initial={{ opacity: 0, y: 20 }}
            animate={leadInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center"
          >
            Leadership <span style={{ color: colors.primary }}>Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={leadInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 text-center max-w-2xl mx-auto mb-14"
          >
            The people driving quality, integrity, and innovation at Sinetcom.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {leadership.map((person, i) => (
              <motion.div
                key={person.role}
                initial={{ opacity: 0, y: 24 }}
                animate={leadInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gray-200 flex items-center justify-center mb-5 flex-shrink-0">
                  <svg className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{person.role}</h3>
                <p className="text-sm text-gray-500">{person.name ?? person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sinetcom Achievements / Awards */}
      <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl" style={{ background: colors.accent }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl" style={{ background: colors.primary }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            ref={awardsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={awardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
          >
            Sinetcom <span style={{ color: colors.accent }}>Achievements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={awardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-center max-w-2xl mx-auto mb-14"
          >
            Recognized repeatedly for excellence in distribution, partnership, and customer satisfaction.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {achievements.map((award, i) => (
              <motion.div
                key={`${award.year}-${award.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={awardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="aspect-video bg-white/10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-sm font-semibold" style={{ color: colors.accent }}>{award.year}</span>
                  <h3 className="text-lg font-bold text-white mt-1">{award.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
