'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { colors } from './root';

import iconFastReliable from '@/app/assets/icons/Fast and Reliable.png';
import iconFeedback from '@/app/assets/icons/Feedback.png';
import icon365Days from '@/app/assets/icons/365 Days.png';
import iconSecureSystem from '@/app/assets/icons/Secure System.png';
import iconTrustedPartner from '@/app/assets/icons/Trusted Partner.png';

export const advantages = [
  {
    icon: iconFastReliable,
    title: 'Instant Digital Activation',
    description: 'Minimize downtime with rapid E-License delivery, ensuring your enterprise is protected the moment your solution is finalized.',
  },
  {
    icon: iconFeedback,
    title: '99% Client Satisfaction',
    description: 'Trusted by the region’s largest enterprises to lead their digital transformation with precision and world-class cybersecurity.',
  },
  {
    icon: icon365Days,
    title: '365-Day Expert Response',
    description: 'Security never sleeps, and neither do we. Get round-the-clock technical support for your critical Sophos firewalls and enterprise IT infrastructure.',
  },
  {
    icon: iconSecureSystem,
    title: 'Enterprise-Grade Compliance',
    description: 'Enterprise-grade cybersecurity solutions and secure payment systems ensuring compliance and data protection.',
  },
  {
    icon: iconTrustedPartner,
    title: 'Authorized Sophos Distributor',
    description: 'As an elite regional gateway, we provide direct access to the world’s most advanced Sophos cybersecurity ecosystem and technical training.',
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
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 md:mb-8 text-white"
        >
          Why Choose Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-300 text-lg md:text-xl mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          Nearly 20 Years of securing the digital landscape for the Sri Lanka and Maldives.
        </motion.p>
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
              className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.25)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4 item">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center ring-1 ring-black/5"

                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={45}
                    height={39}
                    className="object-contain"
                  />
                </div>
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

