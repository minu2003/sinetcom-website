'use client';

import Link from 'next/link';
import Image from 'next/image';
import { colors } from './root';
import sophosLogo from '../assets/Sophos-logo.png';
import sophosCentralImage from '../assets/sophos-central-thumbnail.webp';
import sophosMdrImage from '../assets/solutions-image/sophos-mdr.png';
import sophosEndpointImage from '../assets/solutions-image/sophos-endpoint.png';
import sophosFirewallImage from '../assets/solutions-image/sophos-firewall.png';
import vulnerabilityManagementImage from '../assets/solutions-image/vulnerabiliry management.webp';
import EmergencyIncidentResponse from '../assets/solutions-image/emergency-incident-response.png';
import SophosEDR from '../assets/solutions-image/sophos-edr.webp';
import XDR from '../assets/solutions-image/sophos-xdr.webp';
import NDR from '../assets/solutions-image/sophos-ndr.webp';
import IRS from '../assets/solutions-image/sophos-incident-response-services.webp';
import NetworkSwitch from '../assets/solutions-image/sophos-netwok-switch.png';
import Wireless from '../assets/solutions-image/sophos-wireless.webp';
import ZTNA from '../assets/solutions-image/sophos-ztna.webp';
import Mobile from '../assets/solutions-image/sophos-mobile.webp';
import Server from '../assets/solutions-image/sophos-cloud-workload-protection.webp';
import Email from '../assets/solutions-image/sophos-email.webp';
import Phish from '../assets/solutions-image/sophos-phish-threat.webp';
import ITDR from '../assets/solutions-image/sophos-itdr.webp';
import Advisory from '../assets/solutions-image/sophos-advisory-services.webp';

const mainSolutions = [
  {
    id: 'mdr',
    title: 'Managed Detection and Response (MDR)',
    shortTitle: 'SOPHOS MDR',
    description: 'Sophos Managed Detection and Response (MDR) is a fully managed 24/7 cybersecurity service that detects, investigates and responds to advanced cyber threats that technology alone cannot stop. Delivered by a global team of threat experts, Sophos MDR integrates with your existing solutions to accelerate threat detection and response.',
    href: 'https://www.sophos.com/en-us/services/managed-detection-and-response?partner_name=Sinetcom%20(PVT)%20Ltd&partner_referral_id=98304-24917',
    image: sophosMdrImage,
  },
  {
    id: 'endpoint',
    title: 'Endpoint Protection - Next-Gen Antivirus',
    shortTitle: 'SOPHOS ENDPOINT',
    description: 'Stop breaches, ransomware, and data loss with adaptive, AI-powered endpoint security. Sophos Endpoint provides unmatched protection and control, blocking advanced cyberattacks before they can strike. With a prevention-first approach, it rapidly neutralizes threats to keep your endpoints and servers secure.',
    href: 'https://www.sophos.com/en-us/products/endpoint-security?partner_name=Sinetcom%20(PVT)%20Ltd&partner_referral_id=98304-24917',
    image: sophosEndpointImage,
  },
  {
    id: 'firewall',
    title: 'Next-Gen Firewall',
    shortTitle: 'SOPHOS FIREWALL',
    description: 'Sophos Firewall and the XGS Series appliances provide powerful performance and protection for your network as part of a tightly integrated network security platform all managed from the Sophos Central cloud.',
    href: 'https://www.sophos.com/en-us/products/next-gen-firewall?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: sophosFirewallImage,
  },
];

// Additional Solutions - Ready for 15 solutions
// Structure: { id, title, description, href, image }
const additionalSolutions = [
  {
    id: '1',
    title: 'Vulnerability Management',
    description: 'Sophos Managed Risk — powered by Tenable — is a managed service that identifies high-priority cybersecurity exposures in your environment, so action can be taken to prevent attacks before they disrupt your business.',
    href: 'https://www.sophos.com/en-us/products/managed-risk',
    image: vulnerabilityManagementImage
  },
  {
    id: '2',
    title: 'Emergency Incident Response',
    description: 'Sophos provides fast assistance, identifying and neutralizing active threats against your organization. Whether it’s an infection, compromise, or unauthorized access attempt to circumvent your security controls, our 24/7 incident responders have seen and stopped it all.',
    href: 'https://www.sophos.com/en-gb/products/incident-response-services',
    image: EmergencyIncidentResponse
  },
  {
    id: '3',
    title: 'Endpoint Detection and Response (EDR)',
    description: 'Sophos EDR is a complete endpoint protection, detection, and response solution designed for security analysts and IT administrators. Protect your endpoints and servers from advanced, human-led attacks, whether they are in the office, remote, or in the cloud.',
    href: 'https://www.sophos.com/en-us/products/endpoint-security/edr?partner_referral_id=98304-24917&partner_name=Sinetcom%20(PVT)%20Ltd',
    image: SophosEDR
  },
  {
    id: '4',
    title: 'Extended Detection and Response (XDR)',
    description: 'Sophos XDR provides powerful tools and threat intelligence that enable you to detect, investigate, and respond to sophisticated multi-stage, multi-vector attacks across your entire IT ecosystem, delivered through Sophos’ adaptive AI-native, open platform.',
    href: 'https://www.sophos.com/en-us/products/extended-detection-and-response?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: XDR
  },
  {
    id: '5',
    title: 'Network Detection and Response (NDR)',
    description: 'Sophos NDR is available for both Sophos MDR and XDR to detect malicious network activity deep inside the network that endpoints and firewalls can\'t see. NDR analyzes traffic deep inside the network to identify suspicious traffic patterns including activity originating from unknown or unmanaged devices, rogue assets, new zero-day C2 servers, and unusual data movement.',
    href: 'https://www.sophos.com/en-us/products/network-detection-and-response?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: NDR
  },
  {
    id: '6',
    title: 'Incident Response Services Retainer',
    description: 'An annual subscription that ensures you have an elite team of experts on standby to get your organization back to normal operations quickly in the event of a breach. Discounted pricing on IR services means you don’t have to worry about hidden costs.',
    href: 'https://www.sophos.com/en-us/products/incident-response-services/incident-response-services-retainer?partner_name=Sinetcom%20(PVT)%20Ltd&partner_referral_id=98304-24917',
    image: IRS
  },
  {
    id: '7',
    title: 'Network Switches',
    description: 'Sophos offers a range of cloud-managed, network access layer switches to connect, power, and control device access at the LAN edge. Manage an individual switch or a stack of switches in Sophos Central alongside all your other Sophos security solutions.',
    href: 'https://www.sophos.com/en-us/products/sophos-switch?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: NetworkSwitch
  },
  {
    id: '8',
    title: 'Wireless Access Points',
    description: 'Sophos Wireless provides an effective way to manage and secure your wireless networks using our AP6 Series Wi-Fi 6/6E access points. Sophos Central management allows integration with other solutions to isolate potentially compromised clients.',
    href: 'https://www.sophos.com/en-us/products/secure-wifi?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: Wireless
  },
  {
    id: '9',
    title: 'Zero Trust Network Access (ZTNA)',
    description: 'Sophos ZTNA is a Sophos Central cloud-delivered, cloud-managed product to easily and transparently secure important business applications with granular controls, solving the challenges with remote access VPN solutions.',
    href: 'https://www.sophos.com/en-us/products/zero-trust-network-access?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: ZTNA
  },
  {
    id: '10',
    title: 'Mobile Security',
    description: 'Sophos Mobile is a secure unified endpoint management (UEM) solution that integrates natively with leading next-gen endpoint security. Sophos Mobile supports management of Windows 10, macOS, iOS, and Android devices.',
    href: 'https://www.sophos.com/en-us/products/mobile-control?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: Mobile
  },
  {
    id: '11',
    title: 'Server Protection',
    description: 'Secure your cloud, on-premises, and virtual servers from the latest cybersecurity threats with Sophos Intercept X and its comprehensive, defense in depth approach to server security. The powerful defensive techniques and visibility capabilities in Intercept X offers organizations the very best protection against the latest threats.',
    href: 'https://www.sophos.com/en-us/products/server-security?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: Server
  },
  {
    id: '12',
    title: 'Email and Phishing Protection',
    description: 'Sophos Email is an MDR-optimized email security solution that stops phishing, BEC, and malware attacks. It combines natural language processing (NLP) -based detection, sender authentication, URL protection, and sandboxing with security awareness training to secure inboxes and strengthen user resilience.',
    href: 'https://www.sophos.com/en-us/products/sophos-email?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: Email
  },
  {
    id: '13',
    title: 'Security Awareness and Training',
    description: 'Sophos Phish Threat is a phishing simulation and security awareness training platform. It delivers realistic, targeted training and comprehensive reporting to help organizations strengthen the weakest link in their cyber defense – their end users.',
    href: 'https://www.sophos.com/en-us/products/phish-threat?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: Phish
  },
  {
    id: '14',
    title: 'Identity Threat Detection and Response (ITDR)',
    description: 'Sophos ITDR helps you detect and respond to threats that evade traditional identity security controls, strengthen your organization’s security posture, monitor the dark web for compromised credentials, and identify anomalous user activity.',
    href: 'https://www.sophos.com/en-us/products/identity-threat-detection-and-response?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: ITDR
  },
  {
    id: '15',
    title: 'Advisory Services',
    description: 'Test your cyber defenses with Sophos Advisory Services. Our security experts identify weaknesses and strengthen your resilience through proactive testing and assessments that emulate real-world tactics, techniques, and procedures (TTPs) used by threat actors.',
    href: 'https://www.sophos.com/en-us/products/advisory-services?partner_referral_id=98304-24917&partner_name=Sinetcom+(PVT)+Ltd',
    image: Advisory
  }
];

export default function SophosSolutions() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full md:py-5 px-4 sm:px-6 lg:px-8 bg-white mt-30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src={sophosLogo}
              alt="Sophos Logo"
              width={180}
              height={60}
              className="h-14 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: colors.primary }}>
            Sophos
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Sophos defends more than 600,000 organizations and more than 100 million users globally from active adversaries, ransomware, phishing, malware, and more.
          </p>
          <Link
            href="https://www.sophos.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
            style={{ backgroundColor: colors.primary }}
          >
            Learn More
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Better Cybersecurity Outcomes - Main 3 Solutions */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Better Cybersecurity Outcomes
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Continue reading for more on the Sophos product portfolio, and find the solution that best suits your business requirements:
            </p>
          </header>

          {/* Main 3 Solution Cards - Modern Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {mainSolutions.map((solution, index) => (
              <Link
                key={solution.id}
                href={solution.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block cursor-pointer"
              >
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 hover:border-gray-200 relative">
                  {/* Image Section */}
                  <div className="relative w-full h-48 md:h-52 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {solution.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                        />
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 leading-tight group-hover:text-opacity-80 transition-colors">
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1 mb-6 line-clamp-4">
                      {solution.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center justify-end mt-auto">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-[-45deg] group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-300 ease-out"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Additional Solutions Section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-xl md:text-2xl font-bold mb-10 text-center" style={{ color: colors.primary }}>
              Additional Solutions
            </h3>
            
            {/* 2-Column Grid for Additional Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {additionalSolutions.map((solution, index) => (
                <Link
                  key={solution.id || index}
                  href={solution.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <article className="bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 flex items-start gap-4">
                    {/* Image Thumbnail */}
                    <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                      {solution.image ? (
                        <Image
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
                          <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">S</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg md:text-xl font-bold mb-2 text-gray-900 group-hover:text-opacity-80 transition-colors leading-tight">
                        {solution.title}
                      </h4>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                        {solution.description}
                      </p>
                      
                      {/* Learn More Link */}
                      <div className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300 ease-out group-hover:gap-3" style={{ color: colors.accent }}>
                        <span className="relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">Learn More</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sophos Central - One Vendor One View */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-tight" style={{ color: colors.primary }}>
              One vendor. One view.
            </h2>
            <p className="text-gray-600 text-lg md:text-xl">
              Manage all your Sophos products in one place.
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Branding & Content */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                <Image
                  src={sophosLogo}
                  alt="Sophos"
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
                <span className="w-px h-10 bg-gray-300" aria-hidden="true" />
                <span className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: colors.accent }}>
                  CENTRAL
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg">
                Sophos Central is the open AI-native platform that delivers unrivalled protection for customers and enhances the power of defenders. Controlling all your Sophos solutions through a unified management console. Real-time information sharing between products and automated incident response makes cybersecurity easy.
              </p>
              <Link
                href="https://www.sophos.com/products/sophos-central"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                }}
              >
                Learn More
                <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            {/* Right Column - Image */}
            <div className="relative aspect-[4/3] lg:aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={sophosCentralImage}
                alt="Sophos Central - Unified management console"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
