'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, Fingerprint, ScanEye, Cpu, Network, CheckCircle2 } from 'lucide-react';
import { colors } from '@/components/root';

// Images
import heroImage from '@/app/assets/solutions-image/sophos-endpoint.png';

function NetworkPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] z-0" aria-hidden>
      <svg className="absolute w-full h-full" viewBox="0 0 400 300" fill="none">
        {[0, 1, 2, 3, 4, 5, 6].map((row) =>
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
            <circle key={`${row}-${col}`} cx={40 + col * 60} cy={40 + row * 60} r="3" fill={colors.primary} />
          ))
        )}
      </svg>
    </div>
  );
}

export default function EndpointPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const features = [
    { icon: <Cpu className="w-7 h-7" />, title: "AI-Powered Threat Prevention", desc: "Blocks known and unknown attacks automatically" },
    { icon: <ShieldAlert className="w-7 h-7" />, title: "Ransomware Protection", desc: "Detects and reverses malicious encryption" },
    { icon: <ScanEye className="w-7 h-7" />, title: "Real-Time Detection & Response", desc: "Investigate and respond to threats quickly (EDR/XDR)" },
    { icon: <Network className="w-7 h-7" />, title: "Web & Application Control", desc: "Prevent access to harmful websites and risky apps" },
    { icon: <Fingerprint className="w-7 h-7" />, title: "Centralized Management", desc: "Control all devices from a single cloud dashboard" },
  ];

  const whyChoose = [
    "Stops threats before they spread",
    "Reduces workload on IT teams",
    "Protects users both on and off the network"
  ];

  return (
    <div className="w-full bg-white relative">
      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-32 pb-24 overflow-hidden">
        <NetworkPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden" animate="visible" variants={staggerContainer}
              className="flex flex-col items-start"
            >
              <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ backgroundColor: `${colors.accent}15`, color: colors.primary }}>
                AUTHORIZED DISTRIBUTOR
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
                Endpoint <span style={{ color: colors.primary }}>Security</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-gray-600 text-lg md:text-xl font-medium mb-4">
                Protect every device in your organization with AI-powered protection.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg">
                From laptops to servers, Sophos Endpoint stops cyber threats before they impact your systems using advanced AI, behavioral analysis, and real-time threat intelligence.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  href="https://www.sophos.com/en-us/products/endpoint-security?partner_name=Sinetcom%20(PVT)%20Ltd&partner_referral_id=98304-24917"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: colors.primary }}
                >
                  Explore Sophos Endpoint
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] lg:aspect-square max-h-[500px] w-full flex items-center justify-center lg:justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-white/10 rounded-full blur-3xl" />
              <Image src={heroImage} alt="Sophos Endpoint Security" fill className="object-contain relative z-10 hover:scale-105 transition-transform duration-700 drop-shadow-2xl" priority />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: colors.secondary }}
            >
              What You Get
            </motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.accent }} />
          </div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.article
                key={idx} variants={fadeInUp}
                className="rounded-2xl p-8 flex flex-col justify-start min-h-[240px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                style={{ backgroundColor: '#F5F5F7' }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm" style={{ backgroundColor: 'white', color: colors.accent }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-opacity-80 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col items-center text-center">
            <motion.p variants={fadeInUp} className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: colors.accent }}>The Advantage</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              Why Choose <span style={{ color: colors.primary }}>Endpoint?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 mb-10 text-lg">
              Modern cyber threats target everyday devices like laptops and mobile phones. Sophos Endpoint uses a prevention-first approach to stop attacks early—reducing incidents and minimizing damage.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
              {whyChoose.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: colors.accent }} />
                  <span className="text-gray-800 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
