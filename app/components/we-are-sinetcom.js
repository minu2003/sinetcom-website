'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from './root';
import WhyChooseUsSection from './why-choose-us';

const solutions = [
  {
    id: 'cyber',
    title: 'Cyber Security',
    icon: (
      <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description: 'Sophos firewalls, endpoint protection, and enterprise security solutions to secure, monitor, and protect modern businesses. We deliver next-generation cybersecurity as an authorized distributor.',
  },
  {
    id: 'datacenter',
    title: 'Data Center & Backup',
    icon: (
      <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: 'StorONE and enterprise storage and backup solutions. We help organizations achieve better cost optimization, data resilience, and agile infrastructure for the digital era.',
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    icon: (
      <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: 'From advanced infrastructure to cloud and AI-driven solutions, we provide the technology and expertise businesses need to stay ahead. People, processes, and management working together for enterprise security and digital transformation.',
  },
  {
    id: 'value',
    title: 'Value Added Services',
    icon: (
      <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    description: 'Fast delivery, secure systems, and dedicated support. We offer E-License, 365-day support, and only the best brands—backed by deep industry expertise and specialized training for our channel partners.',
  },
];

function DotGrid() {
  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden>
      <div className="grid grid-cols-5 gap-1.5 opacity-30">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
        ))}
      </div>
    </div>
  );
}

function NetworkPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]" aria-hidden>
      <svg className="absolute bottom-0 right-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={80 + col * 70}
              cy={220 - row * 50}
              r="4"
              fill={colors.primary}
            />
          ))
        )}
        <path
          d="M80 220 L150 170 L220 220 L290 170 L360 220"
          stroke={colors.primary}
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />
        <path
          d="M80 170 L150 120 L220 170"
          stroke={colors.primary}
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function WeAreSinetcom() {
  const [openId, setOpenId] = useState(null);

  return (
    <>
      {/* Part 1: We Are Sinetcom - Intro (light, centered) */}
      <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <DotGrid />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-gray-900">We Are </span>
            <span style={{ color: colors.primary }}>Sinetcom</span>
          </h2>
          <p className="text-lg md:text-xl font-medium mb-6" style={{ color: colors.primary }}>
            A leading value-added distributor & technology enabler
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Sinetcom, a subsidiary of Debug Group, specializes in providing innovative technology products and services. As an authorized Sophos distributor and partner for leading brands, we deliver next-generation cybersecurity, enterprise IT, and digital solutions to secure and empower modern businesses.
          </p>
        </div>
      </section>

      <WhyChooseUsSection/>

      {/* Part 3: Solutions We Offer (two-column, accordion) */}
      <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <NetworkPattern />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 md:mb-16 tracking-tight">
            Solutions We Offer
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                With our team of experienced experts, we share industry knowledge with enterprise customers. We offer best practices and assess how people, processes, and management can work together to drive enterprise security and digital transformation.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Our strengths lie in Cyber Security, Data Center & Backup, and Digital Transformation. We specialize in delivering top-tier solutions—from Sophos and StorONE to Huawei—with fast delivery, secure systems, and 365-day support.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {solutions.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full flex items-center gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xl focus-visible:ring-[#00205B]"
                      aria-expanded={isOpen}
                    >
                      <span style={{ color: colors.primary }}>{item.icon}</span>
                      <span className="flex-1 font-semibold text-gray-900">{item.title}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0">
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-12">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
