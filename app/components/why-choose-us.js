'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { colors } from './root';

export const advantages = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast & Reliable Delivery',
    description: 'E-License delivery for instant access to cybersecurity and enterprise IT solutions with secure implementation.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    title: '99% Positive Feedback',
    description: 'Trusted by enterprise clients for cybersecurity solutions, data center infrastructure, and digital transformation services.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: '365-Day Support',
    description: 'Round-the-clock technical support for Sophos firewalls, StorONE backup solutions, and enterprise IT infrastructure.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secure Systems',
    description: 'Enterprise-grade cybersecurity solutions and secure payment systems ensuring compliance and data protection.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    title: 'Trusted Partners',
    description: 'Authorized distributor for Sophos cybersecurity, StorONE data backup, and Huawei enterprise solutions.',
  },
];

/** Why Choose Us section (dark band) for use in WeAreSinetcom. Self-contained with scroll animation. */
export default function WhyChooseUsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: false });
  const [entryDirection, setEntryDirection] = useState('down');
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef('down');
  const prevInViewRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = typeof window !== 'undefined' ? window.scrollY : 0;
      scrollDirectionRef.current = current >= lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = current;
    };
    if (typeof window !== 'undefined') lastScrollYRef.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isInView && !prevInViewRef.current) {
      setEntryDirection(scrollDirectionRef.current);
    }
    prevInViewRef.current = isInView;
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-14 md:py-18 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#0a1628' }}
      aria-label="Why choose us"
    >
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: colors.primary }} />
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: colors.primary }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 md:mb-8 text-white">
          Why Choose Us
        </h2>
        <p className="text-center text-gray-300 text-lg md:text-xl mb-12 md:mb-16 max-w-2xl mx-auto">
          Trusted expertise, reliable delivery, and industry-leading partnership.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {advantages.map((item, index) => (
            <motion.div
              key={`${index}-${entryDirection}`}
              initial={{
                opacity: 0,
                y: entryDirection === 'down' ? 48 : -48,
              }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: 0,
                      y: entryDirection === 'down' ? 48 : -48,
                    }
              }
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            >
              <div className="mb-4" style={{ color: colors.primary }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

