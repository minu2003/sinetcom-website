'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import contactUsImage from '../assets/contact.jpg';
import { colors } from './root';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const headlineContact = "Let's talk";
const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delayIndex) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + delayIndex * 0.025, duration: 0.25 },
  }),
};

export default function ContactUs() {
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    contactNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedPolicy) return;
    // TODO: wire to your backend or form service
    console.log('Submit', { ...formState, acceptedPolicy });
  };

  const contactInfo = [
    {
      label: 'Address',
      value: 'No 58, 42nd Ln, Colombo 00600, Sri Lanka',
      href: null,
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      value: 'support@sinetcomm.com',
      href: 'mailto:support@sinetcomm.com',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: '077 736 3363',
      href: 'tel:+94777363363',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: 'Business Hours',
      value: 'Mon – Fri: 9:00 AM – 6:00 PM',
      href: null,
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.951735559934!2d79.8614!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMzcuNiJOIDc5wrA1MSczMS4wIkU!5e0!3m2!1sen!2slk!4v1';
  const mapDirectionsUrl = 'https://www.google.com/maps/search/?api=1&query=No+58+42nd+Lane+Colombo+00600+Sri+Lanka';

  return (
    <div>
      {/* Hero: full-screen image with navbar overlay (like home) */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={contactUsImage}
            alt="Contact us"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        <div className="relative z-20 w-full max-w-4xl mx-auto text-center px-4 py-16 sm:py-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold uppercase tracking-widest rounded-full border-2 border-white/80 text-white"
          >
            Get in touch
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight overflow-hidden block">
            <span className="block">
              {headlineContact.split('').map((char, i) => (
                <motion.span
                  key={`contact-${i}`}
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
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Get in touch with our team—we&apos;re here to help with your cybersecurity and IT needs.
          </motion.p>
        </div>
      </section>

      {/* Form + Contact info + Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Form */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true, margin: '-50px' }}
            transition={fadeIn.transition}
            className="lg:col-span-7"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: colors.primary }}>
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formState.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:border-transparent transition-shadow"
                    style={{ '--tw-ring-color': colors.accent }}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formState.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:border-transparent transition-shadow"
                    style={{ '--tw-ring-color': colors.accent }}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:border-transparent transition-shadow"
                  style={{ '--tw-ring-color': colors.accent }}
                  placeholder="john@company.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:border-transparent transition-shadow"
                    style={{ '--tw-ring-color': colors.accent }}
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formState.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:border-transparent transition-shadow"
                    style={{ '--tw-ring-color': colors.accent }}
                    placeholder="Sri Lanka"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Contact number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formState.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:border-transparent transition-shadow"
                  style={{ '--tw-ring-color': colors.accent }}
                  placeholder="+94 77 123 4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-offset-0 focus:border-transparent transition-shadow resize-none"
                  style={{ '--tw-ring-color': colors.accent }}
                  placeholder="How can we help?"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={acceptedPolicy}
                  onChange={(e) => setAcceptedPolicy(e.target.checked)}
                  className="mt-1.5 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-offset-0"
                  style={{ accentColor: colors.primary }}
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  I accept the{' '}
                  <Link href="/privacy" className="font-medium underline hover:no-underline" style={{ color: colors.accent }}>
                    privacy &amp; cookie policy
                  </Link>
                  , which can be viewed here.
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!acceptedPolicy}
                  className="w-full sm:w-auto min-w-[180px] px-8 py-4 text-base font-semibold rounded-lg text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    backgroundColor: acceptedPolicy ? colors.primary : colors.primary,
                  }}
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact info cards */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...fadeIn.transition, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: colors.primary }}>
              Contact information
            </h2>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50/80 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-600" style={{ color: colors.primary }}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-900 font-medium hover:underline"
                        style={{ color: colors.primary }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map & directions */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                Map &amp; directions
              </h3>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ '--tw-ring-color': colors.accent }}
              >
                <div className="aspect-video w-full bg-gray-200 relative">
                  <iframe
                    title="Office location map"
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <span className="block py-3 px-4 text-sm font-medium text-center" style={{ color: colors.accent }}>
                  Open in Google Maps →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
