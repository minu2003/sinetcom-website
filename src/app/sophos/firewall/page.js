'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, Globe2, ScanFace, Lock, Blocks, Zap, Crosshair, Activity, Layers, CheckCircle2 } from 'lucide-react';
import { colors } from '@/components/root';

// Images
import heroImage from '@/app/assets/solutions-image/sophos-firewall.png';

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

export default function FirewallPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const features = [
    { icon: <ShieldCheck className="w-7 h-7" />, title: "Advanced Threat Protection", desc: "Blocks malware, ransomware, and zero-day attacks using AI" },
    { icon: <ScanFace className="w-7 h-7" />, title: "Deep Packet Inspection", desc: "Scans all network traffic for hidden threats" },
    { icon: <Zap className="w-7 h-7" />, title: "Automatic Threat Response", desc: "Detects and isolates compromised devices instantly" },
    { icon: <Globe2 className="w-7 h-7" />, title: "Secure Remote Access", desc: "Enable safe work-from-anywhere connectivity (SD-WAN & ZTNA)" },
    { icon: <Server className="w-7 h-7" />, title: "Cloud-Based Management", desc: "Control everything from a single centralized dashboard" },
  ];

  const keyCapabilities = [
    { icon: <Crosshair className="w-5 h-5" />, title: "AI & Machine Learning", desc: "Identifies unknown threats instantly" },
    { icon: <Lock className="w-5 h-5" />, title: "Encrypted Traffic Inspection", desc: "Eliminates hidden security blind spots" },
    { icon: <Layers className="w-5 h-5" />, title: "Web & App Control", desc: "Manage and secure user activity" },
    { icon: <Blocks className="w-5 h-5" />, title: "Integrated Ecosystem", desc: "Works with endpoint and MDR seamlessly" },
    { icon: <Activity className="w-5 h-5" />, title: "High-Performance Xstream", desc: "Delivers fast, secure performance" },
  ];

  const whyChoose = [
    "Stops threats before they enter your network",
    "Provides full visibility into users, apps, and traffic",
    "Simplifies security with an all-in-one platform",
    "Reduces response time from minutes to seconds"
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
                Next-Gen <span style={{ color: colors.primary }}>Firewall</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-gray-600 text-lg md:text-xl font-medium mb-4">
                Secure your network with advanced intelligent protection.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg">
                More than just a firewall, it provides complete network security, visibility, and control across your entire infrastructure—from on-premises to cloud environments.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  href="https://www.sophos.com/en-us/products/next-gen-firewall?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: colors.primary }}
                >
                  Explore Sophos NGFW
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
              <Image src={heroImage} alt="Sophos Next-Gen Firewall" fill className="object-contain relative z-10 hover:scale-105 transition-transform duration-700 drop-shadow-2xl" priority />
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

      {/* Key Capabilities Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: colors.accent }}>Deep Dive</motion.p>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900"
            >
              Key Capabilities
            </motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-16 h-1 mx-auto rounded-full mb-12" style={{ backgroundColor: colors.primary }} />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {keyCapabilities.map((cap, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}>
                  {cap.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{cap.title}</h4>
                <p className="text-sm text-gray-600 px-2">{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Why Choose */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col items-center text-center">
            <motion.p variants={fadeInUp} className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: colors.accent }}>The Advantage</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              Why Choose <span style={{ color: colors.primary }}>NGFW?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 mb-10 text-lg">
              Traditional firewalls are no longer enough. Sophos NGFW offers intelligent, automated protection that adapts to today’s complex and encrypted networks.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
              {whyChoose.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex items-center gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
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
