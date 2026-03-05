'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { colors } from './root';
import SophosSolutions from './sophos-solutions';

import snapshotsImg from '../assets/solution/snapshots.png';
import storageImg from '../assets/solution/storage.png';
import raidImg from '../assets/solution/Raid.png';


const CATEGORY_LABELS = {
  backup: 'Backup',
  ups: 'UPS',
  'smart-server-rack': 'Smart Server Rack',
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'backup', label: 'Backup' },
  { id: 'smart-server-rack', label: 'Smart Server Rack Solution' },
  { id: 'ups', label: 'UPS Solutions' },
];

const BACKUP_SOLUTIONS = [
  { id: 'better-snapshots', category: 'backup', title: 'Better Snapshots', description: 'Snapshot storage systems for data protection and capacity reduction. Efficient, space-saving snapshots that integrate with your backup strategy.', href: '/contact', image: snapshotsImg },
  { id: 'better-storage', category: 'backup', title: 'Better Storage', description: 'Storage management, upgrades, auto-tiering, and integration with enterprise storage platforms. Optimize capacity and performance across your infrastructure.', href: '/contact', image: storageImg },
  { id: 'better-raid', category: 'backup', title: 'Better Raid', description: 'Data protection from media failure with various RAID levels and efficient rebuilding. Reliable storage with minimal overhead.', href: '/contact', image: raidImg },
];

const UPS_SOLUTIONS = [
  { id: 'ups2000-g', category: 'ups', title: 'UPS2000-G Series (6-10kVA)', description: 'Online double conversion technology, high efficiency, compact design, and mobile app communication. Multiple model specifications for small to medium deployments.', href: '/contact', image: null },
  { id: 'fusionpower9000', category: 'ups', title: 'FusionPower9000', description: 'Integrated full-power UPS for data centers with high-density components, intelligent features, and enhanced security for critical infrastructure.', href: '/contact', image: null },
  { id: 'ups5000-a-30-120', category: 'ups', title: 'FusionPower Series UPS5000-A-(30-120KVA)', description: 'High-efficiency power supply with intelligent monitoring and compact design. Ideal for medium to large data center and facility applications.', href: '/contact', image: null },
  { id: 'ups5000-a-geb-800', category: 'ups', title: 'FusionPower Series UPS5000-A-GEB-(800KVA)', description: 'Efficient pure online dual conversion UPS with high power density and continuous power supply for enterprise and data center environments.', href: '/contact', image: null },
];

const SMART_SERVER_RACK_SOLUTIONS = [
  { id: 'fusionmodule6000', category: 'smart-server-rack', title: 'FusionModule6000 Integrated Cooling Solution', description: 'Integrated modular data center solution with high integration, power density, and smart control for rapid deployment and efficient operations.', href: '/contact', image: null },
  { id: 'fusionmodule800', category: 'smart-server-rack', title: 'FusionModule800', description: 'Modular data center with flexible deployment and smart management. Scalable design for growing IT and facility needs.', href: '/contact', image: null },
  { id: 'fusionmodule2000', category: 'smart-server-rack', title: 'FusionModule2000 Smart Modular Data Center', description: 'Smart modular data center solution for rapid deployment, high density, and intelligent monitoring. Built for reliability and ease of expansion.', href: '/contact', image: null },
];

const ALL_SOLUTIONS = [...BACKUP_SOLUTIONS, ...UPS_SOLUTIONS, ...SMART_SERVER_RACK_SOLUTIONS];

function SolutionCard({ item, index }) {
  const categoryLabel = CATEGORY_LABELS[item.category] || item.category;
  return (
    <motion.article
      layout
      exit={{ opacity: 0 }}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full"
    >
      <Link href={item.href} className="block flex-1 flex flex-col">
        <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {item.image ? (
            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-500" style={{ background: `linear-gradient(135deg, ${colors.primary}18 0%, ${colors.accent}12 50%, transparent 100%)` }} />
          )}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full text-white shadow-sm" style={{ backgroundColor: colors.primary }}>{categoryLabel}</span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:underline decoration-2 underline-offset-4 line-clamp-2">{item.title}</h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1 line-clamp-3 mb-4">{item.description}</p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold mt-auto" style={{ color: colors.accent }}>
            Read more
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function SolutionsPage() {
  const searchParams = useSearchParams();
  const filterFromUrl = searchParams.get('filter');
  const validFilter = ['all', 'backup', 'ups', 'smart-server-rack'].includes(filterFromUrl) ? filterFromUrl : 'all';
  const [activeFilter, setActiveFilter] = useState(validFilter);

  useEffect(() => {
    setActiveFilter(validFilter);
  }, [validFilter]);

  const filtered = activeFilter === 'all' ? ALL_SOLUTIONS : ALL_SOLUTIONS.filter((s) => s.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: () => ({ opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }),
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const heroSection = (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0d1a2d] via-[#132542] to-[#0d1a2d]">
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: colors.primary }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: colors.accent }} />
      </div>
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23274794' fill-opacity='0.12'/%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="inline-block px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-widest rounded-full border border-white/30 text-white/90">Solutions</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">All <span style={{ color: colors.accent }}>Solutions</span></motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-white/85 text-base md:text-lg max-w-2xl">Sophos cybersecurity, StorONE backup, and Huawei infrastructure in one place.</motion.p>
      </div>
    </section>
  );

  return (
    <div className="pt-[var(--navbar-height,80px)] min-h-screen bg-gray-50">
      {validFilter === 'all' && (
        <>
          {heroSection}
          <SophosSolutions />
          <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full text-white mb-4" style={{ backgroundColor: colors.primary }}>StorONE</span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Backup <span style={{ color: colors.primary }}>Solutions</span></h2>
                <p className="text-gray-600 max-w-2xl mb-8">Data protection, storage management, and RAID solutions for enterprise backup. Better Snapshots, Better Storage, and Better Raid.</p>
                <Link href="/solutions?filter=backup" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-95 hover:shadow-lg" style={{ backgroundColor: colors.primary }}>
                  View StorONE Solutions
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            </div>
          </section>
          <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-80 rounded-l-full opacity-30" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}15)` }} />
            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full text-white mb-4" style={{ backgroundColor: colors.accent }}>Huawei</span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Infrastructure <span style={{ color: colors.accent }}>Solutions</span></h2>
                <p className="text-gray-600 max-w-2xl mb-8">UPS and Smart Server Rack solutions for data centers and critical infrastructure. FusionPower, FusionModule, and modular data center solutions.</p>
                <Link href="/solutions?filter=ups" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-95 hover:shadow-lg" style={{ backgroundColor: colors.primary }}>
                  View Huawei Solutions
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {validFilter !== 'all' && (
        <>
          <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0d1a2d] via-[#132542] to-[#0d1a2d]">
            <div className="absolute inset-0 opacity-25">
              <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: colors.primary }} />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: colors.accent }} />
            </div>
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23274794' fill-opacity='0.12'/%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <Link href="/solutions" className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                All Solutions
              </Link>
              <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                {activeFilter === 'backup' ? 'StorONE Backup' : 'Huawei Infrastructure'}
              </motion.h1>
            </div>
          </section>
          <section className="relative z-10 -mt-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <nav className="flex flex-wrap gap-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-5" aria-label="Filter solutions">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${activeFilter === f.id ? 'text-white shadow-md' : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900'}`}
                    style={activeFilter === f.id ? { backgroundColor: colors.primary } : {}}
                  >
                    {f.label}
                  </button>
                ))}
              </nav>
            </div>
          </section>
          {(activeFilter === 'all' || activeFilter === 'backup') && (
            <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                  <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full text-white mb-4" style={{ backgroundColor: colors.primary }}>StorONE</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Backup <span style={{ color: colors.primary }}>Solutions</span></h2>
                  <p className="text-gray-600 max-w-2xl">Data protection, storage management, and RAID solutions for enterprise backup.</p>
                </div>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" variants={containerVariants} initial="hidden" animate="visible">
                  <AnimatePresence mode="popLayout">
                    {(activeFilter === 'all' ? BACKUP_SOLUTIONS : filtered).map((item, i) => (
                      <motion.div key={item.id} variants={itemVariants}><SolutionCard item={item} index={i} /></motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>
          )}
          {(activeFilter === 'ups' || activeFilter === 'smart-server-rack') && (
            <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-80 rounded-l-full opacity-30" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}15)` }} />
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-10">
                  <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full text-white mb-4" style={{ backgroundColor: colors.accent }}>Huawei</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Infrastructure <span style={{ color: colors.accent }}>Solutions</span></h2>
                  <p className="text-gray-600 max-w-2xl">UPS and Smart Server Rack solutions for data centers and critical infrastructure.</p>
                </div>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" variants={containerVariants} initial="hidden" animate="visible">
                  {filtered.map((item, i) => (
                    <motion.div key={item.id} variants={itemVariants}><SolutionCard item={item} index={i} /></motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )}
          {filtered.length === 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <p className="text-gray-500">No solutions match this filter.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
