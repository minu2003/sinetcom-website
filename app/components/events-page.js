'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from './root';

// Add event-hero.jpg to app/assets/event/ folder
import eventHeroImage from '../assets/event/event-hero.jpg';

// Type: All, Customer, Partner, Webinar
const TYPE_OPTIONS = {
  all: 'All',
  customer: 'Customer',
  partner: 'Partner',
  webinar: 'Webinar',
};

// Time: Upcoming (future), Past
const TIME_OPTIONS = {
  upcoming: 'Upcoming',
  past: 'Past',
};

// Placeholder events – replace with real data or API. Each has type + when (future/past)
const INITIAL_EVENTS = [
  { id: 1, title: 'Sinetcom Cyber Security Summit 2026', type: 'customer', when: 'future', dateStart: '05/10/2026', dateEnd: '06/10/2026', tag: 'FUTURE EVENT', slug: 'cyber-security-summit-2026' },
  { id: 2, title: 'Partner Enablement Workshop', type: 'partner', when: 'future', dateStart: '15/11/2026', dateEnd: '16/11/2026', tag: 'FUTURE EVENT', slug: 'partner-enablement-workshop' },
  { id: 3, title: 'Sophos Solutions Webinar Series', type: 'webinar', when: 'future', dateStart: '20/12/2026', dateEnd: '20/12/2026', tag: 'WEBINAR', slug: 'sophos-webinar-series' },
  { id: 4, title: 'StorONE Backup Best Practices', type: 'webinar', when: 'past', dateStart: '08/01/2026', dateEnd: '08/01/2026', tag: 'WEBINAR', slug: 'storone-backup-webinar' },
  { id: 5, title: 'Enterprise IT Roundtable', type: 'customer', when: 'past', dateStart: '22/02/2026', dateEnd: '22/02/2026', tag: 'PAST EVENT', slug: 'enterprise-it-roundtable' },
  { id: 6, title: 'Channel Partner Meetup', type: 'partner', when: 'future', dateStart: '14/03/2026', dateEnd: '15/03/2026', tag: 'FUTURE EVENT', slug: 'channel-partner-meetup' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Recent Events' },
  { value: 'upcoming', label: 'Upcoming First' },
  { value: 'title', label: 'Title A-Z' },
];

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative aspect-video bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold uppercase tracking-wide bg-white/90 text-gray-600 rounded">
          {event.tag}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {event.dateStart}{event.dateEnd !== event.dateStart ? ` - ${event.dateEnd}` : ''}
        </p>
        <div className="mt-auto flex items-center gap-2">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            Find out more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Share"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    upcoming: true,
    past: true,
  });
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const filteredEvents = INITIAL_EVENTS.filter((e) => {
    const matchType = filters.type === 'all' || e.type === filters.type;
    const matchTime =
      (e.when === 'future' && filters.upcoming) ||
      (e.when === 'past' && filters.past);
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchTime && matchSearch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'upcoming') return 0; // Add date logic if needed
    return 0;
  });

  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const setType = (value) => setFilters((prev) => ({ ...prev, type: value }));
  const toggleTime = (key) => setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="pt-[var(--navbar-height,80px)]">
      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex overflow-hidden" style={{ backgroundColor: colors.primary }}>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16 order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Join us at our Sinetcom Events and Webinars
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/90 text-base md:text-lg leading-relaxed mb-4"
            >
              Our in-person or virtual events and webinars will ignite inspiration, foster collaboration, and unlock limitless possibilities. Explore this page to find the event or webinar that is right for you, or catch up on content you may have missed.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-white/80 text-sm md:text-base"
            >
              We can&apos;t wait to see you at a Sinetcom event soon!
            </motion.p>
          </div>
          <div className="relative w-full lg:w-[45%] min-h-[280px] lg:min-h-full order-1 lg:order-2">
            <Image
              src={eventHeroImage}
              alt="Sinetcom events and webinars"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="relative -mt-8 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center pl-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input
              type="text"
              placeholder="Start typing to search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="button"
              className="px-6 py-4 font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              Go
            </button>
          </div>
        </div>
      </section>

      {/* Filters + Event grid */}
      <section className="w-full py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Type</h3>
                    <div className="space-y-2">
                      {['all', 'customer', 'partner', 'webinar'].map((key) => {
                        const count = key === 'all' ? INITIAL_EVENTS.length : INITIAL_EVENTS.filter((e) => e.type === key).length;
                        return (
                          <label key={key} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="type"
                              checked={filters.type === key}
                              onChange={() => setType(key)}
                              className="border-gray-300"
                              style={{ accentColor: colors.primary }}
                            />
                            <span className="text-sm text-gray-700">{TYPE_OPTIONS[key]}</span>
                            <span className="text-xs text-gray-400">({count})</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Time</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.upcoming}
                          onChange={() => toggleTime('upcoming')}
                          className="rounded border-gray-300"
                          style={{ accentColor: colors.primary }}
                        />
                        <span className="text-sm text-gray-700">{TIME_OPTIONS.upcoming}</span>
                        <span className="text-xs text-gray-400">
                          ({INITIAL_EVENTS.filter((e) => e.when === 'future').length})
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.past}
                          onChange={() => toggleTime('past')}
                          className="rounded border-gray-300"
                          style={{ accentColor: colors.primary }}
                        />
                        <span className="text-sm text-gray-700">{TIME_OPTIONS.past}</span>
                        <span className="text-xs text-gray-400">
                          ({INITIAL_EVENTS.filter((e) => e.when === 'past').length})
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Event listing */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <p className="text-sm text-gray-600">
                  {filteredEvents.length > 0
                    ? `${(currentPage - 1) * eventsPerPage + 1} - ${Math.min(currentPage * eventsPerPage, filteredEvents.length)} of ${filteredEvents.length} results`
                    : '0 results'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-offset-0 focus:border-transparent"
                    style={{ '--tw-ring-color': colors.primary }}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {paginatedEvents.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10">
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'text-white'
                              : 'border border-gray-300 hover:bg-gray-100'
                          }`}
                          style={currentPage === page ? { backgroundColor: colors.primary } : {}}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 text-gray-500">No events match your filters.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
