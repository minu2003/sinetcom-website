import Link from 'next/link';
import Image from 'next/image';
import { colors } from './root';
import sophosLogo from '../assets/Sophos-logo.png';
import storoneLogo from '../assets/storone.png';
import huaweiLogo from '../assets/huawei.png';

export default function CoreSolutions() {

    const partners = [ 
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
        <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="core-solutions-heading">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-12 md:mb-16">
              <h2
                id="core-solutions-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
                style={{ color: colors.secondary }}
              >
                Core Solutions
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Authorized distributor and partner for leading technology brands.
              </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {partners.map((partner, index) => (
            <article
              key={partner.name}
              className="rounded-xl p-8 flex flex-col justify-between min-h-[270px] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              style={{ backgroundColor: '#F5F5F7' }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex items-center justify-center w-full">
                  <div className="relative w-full h-20 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      width={200}
                      height={80}
                      className="object-contain max-h-20 w-auto"
                      priority={index === 0}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 mb-6 items-center">
                  {partner.description.split(' ').map((word, wordIndex) => (
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
              <Link
                href={partner.href}
                className="flex items-center justify-center gap-3 group/btn mt-auto"
              >
                <span
                  className="text-sm font-semibold transition-colors duration-200 group-hover/btn:text-opacity-70"
                  style={{ color: colors.secondary }}
                >
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
            </article>
          ))}
            </div>
          </div>
        </section>
    );
}