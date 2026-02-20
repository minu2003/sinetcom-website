'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from './root';
import blogHeroImage from '../assets/blog.jpg';

// Placeholder blogs – replace with real data or API
const INITIAL_BLOGS = [
  { id: 1, title: 'Next-Generation Cybersecurity: What You Need to Know in 2026', slug: 'next-gen-cybersecurity-2026', category: 'Cybersecurity', excerpt: 'Explore the latest trends in enterprise security and how Sophos solutions are evolving to protect modern businesses.', date: 'Feb 10, 2026', readTime: '5 min read' },
  { id: 2, title: 'Data Backup Best Practices for Enterprise', slug: 'data-backup-best-practices', category: 'Data Center', excerpt: 'Learn how StorONE and modern backup strategies help organizations achieve better resilience and cost optimization.', date: 'Feb 5, 2026', readTime: '4 min read' },
  { id: 3, title: 'Digital Transformation: People, Process, and Technology', slug: 'digital-transformation-guide', category: 'Industry', excerpt: 'How Sinetcom helps businesses align people, processes, and technology for successful digital transformation.', date: 'Jan 28, 2026', readTime: '6 min read' },
  { id: 4, title: 'Partner Enablement: Building Channel Success', slug: 'partner-enablement', category: 'Partner', excerpt: 'Insights on how we support our channel partners with training, tools, and go-to-market strategies.', date: 'Jan 20, 2026', readTime: '3 min read' },
  { id: 5, title: 'UPS Solutions for Critical Infrastructure', slug: 'ups-solutions-infrastructure', category: 'Infrastructure', excerpt: 'Huawei UPS and smart power solutions for data centers and mission-critical environments.', date: 'Jan 15, 2026', readTime: '5 min read' },
  { id: 6, title: 'Zero Trust Security: Beyond the Firewall', slug: 'zero-trust-security', category: 'Cybersecurity', excerpt: 'Why Zero Trust architecture is essential and how to implement it with Sophos technologies.', date: 'Jan 8, 2026', readTime: '7 min read' },
];

const CATEGORIES = ['All', 'Cybersecurity', 'Data Center', 'Industry', 'Partner', 'Infrastructure'];

function BlogCard({ blog, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col"
    >
      <Link href={`/blogs/${blog.slug}`} className="block flex-1 flex flex-col">
        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full text-white" style={{ backgroundColor: colors.primary }}>
            {blog.category}
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <time className="text-sm text-gray-500 mb-2">{blog.date} · {blog.readTime}</time>
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:underline decoration-2 underline-offset-4 line-clamp-2">
            {blog.title}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed line-clamp-2 mb-4 flex-1">
            {blog.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: colors.primary }}>
            Read more
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const filteredBlogs = INITIAL_BLOGS.filter((b) => {
    const matchCategory = category === 'All' || b.category === category;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <div className="pt-[var(--navbar-height,80px)]">
      {/* Hero — full-bleed image with overlay */}
      <section className="relative w-full min-h-[67vh] flex overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={blogHeroImage}
            alt="Sinetcom blog insights"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={95}
            placeholder="blur"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(39,71,148,0.25) 0%, rgba(39,71,148,0.12) 50%, rgba(39,71,148,0.06) 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
          
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.1] max-w-2xl"
          >
            Insights & <span style={{ color: colors.accent }}>Updates</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Stay informed with the latest on cybersecurity, data center solutions, and digital transformation from Sinetcom.
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="relative -mt-8 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-5">
            <div className="flex flex-1 max-w-md">
              <div className="flex items-center pl-4 pr-2 text-gray-400 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 rounded-r-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-0"
                style={{ '--tw-ring-color': colors.primary }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setCategory(cat); setCurrentPage(1); }}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${category === cat ? 'text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}`}
                  style={category === cat ? { backgroundColor: colors.primary } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <p className="text-sm text-gray-600">
              {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {paginatedBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedBlogs.map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} index={i} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-14">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-medium transition-colors ${currentPage === page ? 'text-white' : 'border border-gray-300 hover:bg-white'}`}
                      style={currentPage === page ? { backgroundColor: colors.primary } : {}}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-gray-500">No articles match your search.</div>
          )}
        </div>
      </section>
    </div>
  );
}
