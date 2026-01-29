'use client';

import Link from 'next/link';
import Image from 'next/image';
import { colors } from './root';
import sophosLogo from '../assets/Sophos-logo.png';
import storoneLogo from '../assets/storone.png';
import huaweiLogo from '../assets/huawei.png';

export default function CoreSolutions() {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Delivery',
      subtitle: 'E-License',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      title: '99% positive',
      subtitle: 'feedback',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: '365 days',
      subtitle: 'Support',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Payment',
      subtitle: 'Secure Systems',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      title: 'Brands',
      subtitle: 'Only the best',
    },
  ];

  const solutions = [
    {
      name: 'Sophos',
      tagline: 'Cybersecurity evolved.',
      description: 'AUTHORIZED DISTRIBUTOR',
      logo: sophosLogo,
      href: '/solutions/sophos',
    },
    {
      name: 'StorONE',
      tagline: 'THINK RESULTS™',
      description: 'AUTHORIZED DISTRIBUTOR FOR BACKUP SOLUTIONS',
      logo: storoneLogo,
      href: '/solutions/storene',
    },
    {
      name: 'Huawei',
      tagline: '',
      description: 'AUTHORIZED PARTNER FOR HUAWEI',
      logo: huaweiLogo,
      href: '/solutions/huawei',
    },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-5xl md:text-5xl font-bold text-center mb-20 tracking-tight" style={{ color: colors.secondary }}>
          Core Solutions
        </h2>

        {/* Top Row - Feature Cards */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 mb-20 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-gray-200">
            {features.map((feature, index) => (
              <div
                key={index}
                className="px-8 py-10 flex flex-col items-center text-center hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="mb-5 transform group-hover:scale-110 transition-transform duration-200" style={{ color: colors.primary }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-opacity-80 transition-opacity" style={{ color: colors.secondary }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 flex flex-col justify-between min-h-[280px] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              style={{ backgroundColor: '#F8F8F8' }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Logo */}
                <div className="mb-8 flex items-center justify-center w-full">
                  <div className="relative w-full h-20 flex items-center justify-center">
                    <Image
                      src={solution.logo}
                      alt={`${solution.name} Logo`}
                      width={200}
                      height={80}
                      className="object-contain max-h-20 w-auto"
                      priority={index === 0}
                    />
                  </div>
                </div>
                
                {/* Description */}
                <div className="flex flex-col gap-1 mb-6 items-center">
                  {solution.description.split(' ').map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className="text-xs font-bold uppercase tracking-wider leading-tight"
                      style={{ color: colors.secondary }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Us Button */}
              <Link
                href={solution.href}
                className="flex items-center justify-center gap-3 group/btn mt-auto"
              >
                <span className="text-sm font-semibold transition-colors duration-200 group-hover/btn:text-opacity-70" style={{ color: colors.secondary }}>
                  Contact us
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover/btn:translate-x-2 group-hover/btn:scale-110"
                  style={{ backgroundColor: colors.primary }}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
