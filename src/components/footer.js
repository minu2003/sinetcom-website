'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import sinetcomLogo from '@/app/assets/sinetcom-logo.png';
import { colors } from './root';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Events', href: '/events' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
    { name: 'Support Ticket', href: 'https://support.sinetcomm.com/upload/' },
  ];

  const solutions = [
    { name: 'Sophos Endpoint', href: '/sophos/endpoint' },
    { name: 'Sophos Firewall', href: '/sophos/firewall' },
    { name: 'Sophos MDR', href: '/sophos/mdr' },
  ];

  const socialMedia = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/sinetcom',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/sinetcom',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/sinetcom',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sinetcom',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@sinetcom',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#0B1120] bg-gradient-to-b from-gray-900 to-[#050810] text-gray-300 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-blue-500/10 blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:pr-10"
          >
            <Link href="/" className="inline-block mb-6 transition-transform duration-300 hover:opacity-90">
              <Image
                src={sinetcomLogo}
                alt="Sinetcom Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 pr-4">
              Trusted by enterprise clients for cybersecurity, data center, and digital transformation solutions.
            </p>
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="text-white font-semibold tracking-wider text-sm uppercase relative pb-3 mb-6 after:absolute after:-bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-blue-500 after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-block text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-white font-semibold tracking-wider text-sm uppercase relative pb-3 mb-6 after:absolute after:-bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-blue-500 after:rounded-full">
              Sophos Solutions
            </h3>
            <ul className="space-y-4">
              {solutions.map((solution) => (
                <li key={solution.name}>
                  <Link
                    href={solution.href}
                    className="inline-block text-sm text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h3 className="text-white font-semibold tracking-wider text-sm uppercase relative pb-3 mb-6 after:absolute after:-bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-blue-500 after:rounded-full">
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/20">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400 leading-relaxed pt-1">
                  No 58, 42nd Ln, Colombo 00600
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+971123456789" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  0777363363
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:info@sinetcom.com" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  support@sinetcomm.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Location Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h3 className="text-white font-semibold tracking-wider text-sm uppercase relative pb-3 mb-6 after:absolute after:-bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-blue-500 after:rounded-full">
              Location
            </h3>
            <div className="w-full h-48 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-xl shadow-black/50 group relative bg-gray-900 mt-5">
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              <iframe
                src="https://maps.google.com/maps?q=Sinetcom+(Pvt)+Ltd,+No+58,+42nd+Ln,+Colombo&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.3] filter transition-all duration-700 group-hover:grayscale-0 relative z-0"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-medium tracking-wide">
              © {currentYear} <span className="text-gray-400">Sinetcom</span>. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm text-gray-400 font-medium">
              <Link
                href="/privacy-policy"
                className="hover:text-white hover:underline underline-offset-4 decoration-white/30 transition-all duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-white hover:underline underline-offset-4 decoration-white/30 transition-all duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
