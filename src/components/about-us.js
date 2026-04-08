'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { colors } from './root';
import debugImage from '@/app/assets/debug.jpg';
const headlineAbout = "Who We Are";
const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delayIndex) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + delayIndex * 0.025, duration: 0.25 },
  }),
};

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

const journeyMilestones = [
  {
    phase: '1989: The Foundation',
    title: 'The Birth of Debug',
    content:
      "In the early days of Colombo's IT revolution, Debug Computer Peripherals was established. We set the standard for quality, supporting the region’s growing demand for reliable enterprise hardware and peripherals.",
  },
  {
    phase: 'The Growth Era',
    title: 'The Debug Legacy',
    content:
      'As the industry matured, the Debug Group became a household name. We redefined the sale and servicing of high-quality IT products, establishing a reputation for integrity and operational excellence that remains our backbone today.',
  },
  {
    phase: '2007: The Specialized Force',
    title: 'The Birth of Sinetcom',
    content:
      'Recognizing the critical need for robust digital defense, Sinetcom was launched as a specialized subsidiary. Our mission was focused: to elevate the region’s cybersecurity and build unbreakable structural IT defenses for a connected world.',
  },
  {
    phase: 'Today: The Premier Tech Enabler',
    title: "Securing the Region's Future",
    content:
      'Sinetcom now stands as the premier Value-Added Distributor (VAD) for Sri Lanka and the Maldives. We proudly bridge the gap between global giants like Sophos and local businesses, securing the digital transformation of 100+ organizations daily.',
  },
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
    <div>
      {/* Hero: full-screen with new trend */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: colors.primary }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: colors.accent }} />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\' fill=\'%23274794\' fill-opacity=\'0.08\'/%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
        <div className="relative z-20 w-full max-w-4xl mx-auto text-center px-4 py-16 sm:py-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 mb-2 text-sm font-semibold uppercase tracking-widest rounded-full border-2 border-white/80 text-white"
          >
            About Sinetcom
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight overflow-hidden block">
            <span className="block">
              {headlineAbout.split('').map((char, i) => (
                <motion.span
                  key={`about-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal', color: i >= 7 ? colors.accent : 'inherit' }}
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
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            A leading value-added distributor and technology enabler, committed to tomorrow&apos;s innovative solutions and exceptional customer satisfaction.
          </motion.p>
        </div>
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
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-12 md:gap-16 pt-8 pb-8">
            {/* Vision Shield */}
            <motion.div
              ref={visionRef}
              initial={{ opacity: 0, y: 30 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex-1 w-full filter drop-shadow-xl hover:-translate-y-2 transition-transform duration-500"
            >
              <div
                className="group relative h-full w-full p-[1px] md:p-[2px]"
                style={{
                  background: `linear-gradient(150deg, ${colors.primary}40 0%, ${colors.primary}00 80%)`,
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)'
                }}
              >
                <div 
                  className="bg-white h-full w-full flex flex-col items-center text-center px-6 sm:px-8 py-16 md:px-10 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%)`,
                    clipPath: 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)'
                  }}
                >
                  {/* Subtle top glow inside the shield */}
                  <div className="absolute top-0 inset-x-0 h-40 opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ background: colors.primary }} />

                  <span 
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-6 flex items-center justify-center text-white font-bold relative z-10 transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg" 
                    style={{ background: colors.primary, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10">Our Vision</h2>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed relative z-10 max-w-sm mx-auto">
                    An organization with a vision for tomorrow&apos;s innovative solutions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission Shield */}
            <motion.div
              ref={visionRef}
              initial={{ opacity: 0, y: 30 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 w-full filter drop-shadow-xl hover:-translate-y-2 transition-transform duration-500"
            >
              <div
                className="group relative h-full w-full p-[1px] md:p-[2px]"
                style={{
                  background: `linear-gradient(150deg, ${colors.accent}40 0%, ${colors.accent}00 80%)`, 
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)'
                }}
              >
                <div 
                  className="bg-white h-full w-full flex flex-col items-center text-center px-6 sm:px-8 py-16 md:px-10 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%)`,
                    clipPath: 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)'
                  }}
                >
                  {/* Subtle top glow inside the shield */}
                  <div className="absolute top-0 inset-x-0 h-40 opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ background: colors.accent }} />

                  <span 
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-6 flex items-center justify-center text-white font-bold relative z-10 transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg" 
                    style={{ background: colors.accent, clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10">Our Mission</h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed relative z-10 italic max-w-sm mx-auto">
                    &ldquo;We are a professional organization, providing an exceptional standard of customer satisfaction through our commitment to maintain the highest level of quality, integrity and dedication in all products, services and solutions offered by us.&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey / Legacy Alternative Display */}
      <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={historyRef}
            initial={{ opacity: 0, y: 20 }}
            animate={historyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-3">
              The Journey: <span style={{ color: colors.primary }}>A Legacy of Digital Trust</span>
            </h2>
            <p className="text-lg md:text-xl font-semibold" style={{ color: colors.accent }}>
              37 Years of Innovation | 19 Years of Security Excellence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={historyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 mb-12"
          >
            <Image
              src={debugImage}
              alt="Sinetcom digital trust journey"
              width={1200}
              height={520}
              className="w-full h-[260px] md:h-[360px] object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {journeyMilestones.map((item, idx) => (
              <motion.article
                key={item.phase}
                initial={{ opacity: 0, y: 16 }}
                animate={historyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.1 * idx }}
                className="group relative rounded-2xl p-[1px] md:p-[1.5px] transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  background:
                    idx % 2 === 0
                      ? `linear-gradient(135deg, ${colors.primary}40 0%, ${colors.primary}10 55%, #ffffff 100%)`
                      : `linear-gradient(135deg, ${colors.accent}35 0%, ${colors.accent}10 55%, #ffffff 100%)`,
                }}
              >
                <div className="relative bg-white rounded-2xl p-6 md:p-8 h-full shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{
                      color: idx % 2 === 0 ? colors.primary : colors.accent,
                      backgroundColor: idx % 2 === 0 ? `${colors.primary}14` : `${colors.accent}14`,
                    }}
                  >
                    {item.phase}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">{item.content}</p>
                  <div
                    className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: idx % 2 === 0 ? colors.primary : colors.accent }}
                    aria-hidden
                  />
                </div>
              </motion.article>
            ))}
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
