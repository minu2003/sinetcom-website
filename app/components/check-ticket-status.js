'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from './root';

function validateEmail(email) {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? '' : 'Please enter a valid email address';
}

function validateRequired(value, fieldName) {
  const trimmed = (value || '').trim();
  return trimmed ? '' : `${fieldName} is required`;
}

// Mock ticket data for demo (in real app this would come from API)
function mockFetchTicket(ticketNumber, email) {
  const normalized = (ticketNumber || '').trim().toUpperCase();
  const hasValidFormat = /^ST-\d+-[A-Z0-9]+$/.test(normalized) || normalized.length >= 6;
  if (!hasValidFormat) return null;
  return {
    id: normalized || 'ST-DEMO-ABC123',
    status: 'In Progress',
    subject: 'Sophos Central Email Gateway – configuration inquiry',
    createdAt: '2026-02-18T10:30:00Z',
    updatedAt: '2026-02-19T14:00:00Z',
    priority: 'Medium',
    helpTopic: 'Sophos Central Email Gateway',
    lastReply: 'Our team is reviewing your request. We will update you within 24 hours.',
  };
}

export default function CheckTicketStatus() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleBlur = (name) => {
    setTouched((p) => ({ ...p, [name]: true }));
    if (name === 'ticketNumber') setErrors((p) => ({ ...p, ticketNumber: validateRequired(ticketNumber, 'Ticket number') }));
    if (name === 'email') setErrors((p) => ({ ...p, email: validateEmail(email) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errTicket = validateRequired(ticketNumber, 'Ticket number');
    const errEmail = validateEmail(email);
    const next = { ticketNumber: errTicket, email: errEmail };
    setErrors(next);
    setTouched({ ticketNumber: true, email: true });
    if (errTicket || errEmail) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);
    setTimeout(() => {
      const data = mockFetchTicket(ticketNumber, email);
      setLoading(false);
      if (data) {
        setResult(data);
        setNotFound(false);
      } else {
        setResult(null);
        setNotFound(true);
      }
    }, 600);
  };

  const inputBase = 'w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200';
  const inputError = 'border-red-400 focus:ring-red-400/30';
  const inputOk = 'border-gray-200 focus:ring-gray-300 hover:border-gray-300';

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    } catch (_) {
      return iso;
    }
  };

  return (
    <div className="pt-[var(--navbar-height,80px)] min-h-screen bg-gray-50/80">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="mb-6">
          <Link href="/support" className="text-sm font-medium hover:underline flex items-center gap-1.5" style={{ color: colors.accent }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Support Center
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="px-6 sm:px-8 py-8 border-b border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ color: colors.primary }}>
              Check Ticket Status
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Enter your ticket number and email to view status and updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700 mb-1.5">Ticket Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                </span>
                <input
                  id="ticketNumber"
                  type="text"
                  value={ticketNumber}
                  onChange={(e) => { setTicketNumber(e.target.value); if (errors.ticketNumber) setErrors((p) => ({ ...p, ticketNumber: '' })); }}
                  onBlur={() => handleBlur('ticketNumber')}
                  placeholder="e.g. ST-1739123456789-A1B2C3"
                  className={`${inputBase} ${touched.ticketNumber && errors.ticketNumber ? inputError : inputOk}`}
                  style={{ '--tw-ring-color': touched.ticketNumber && errors.ticketNumber ? undefined : colors.primary }}
                />
              </div>
              {touched.ticketNumber && errors.ticketNumber && <p className="text-red-500 text-sm mt-1">{errors.ticketNumber}</p>}
            </div>

            <div>
              <label htmlFor="statusEmail" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <input
                  id="statusEmail"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: '' })); }}
                  onBlur={() => handleBlur('email')}
                  placeholder="you@company.com"
                  className={`${inputBase} ${touched.email && errors.email ? inputError : inputOk}`}
                  style={{ '--tw-ring-color': touched.email && errors.email ? undefined : colors.primary }}
                />
              </div>
              {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: colors.primary }}
            >
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-center text-gray-500">
              <span className="inline-block w-6 h-6 border-2 border-gray-300 border-t-current rounded-full animate-spin" aria-hidden />
              <p className="mt-2 text-sm">Fetching ticket details...</p>
            </motion.div>
          )}

          {!loading && notFound && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center"
            >
              <p className="font-medium text-amber-800">Ticket not found</p>
              <p className="text-sm text-amber-700 mt-1">Please check the ticket number and email address. For demo, use a ticket ID like <code className="bg-amber-100 px-1 rounded">ST-1234567890-ABC123</code>.</p>
            </motion.div>
          )}

          {!loading && result && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
            >
              <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono font-semibold text-gray-900" style={{ color: colors.primary }}>{result.id}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : result.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {result.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{result.helpTopic}</p>
              </div>
              <dl className="px-6 sm:px-8 py-5 space-y-4">
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</dt>
                  <dd className="text-gray-900 mt-0.5">{result.subject}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</dt>
                  <dd className="text-gray-900 mt-0.5">{result.priority}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Created</dt>
                  <dd className="text-gray-700 mt-0.5">{formatDate(result.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last update</dt>
                  <dd className="text-gray-700 mt-0.5">{formatDate(result.updatedAt)}</dd>
                </div>
                {result.lastReply && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Latest reply</dt>
                    <dd className="text-gray-700 mt-0.5">{result.lastReply}</dd>
                  </div>
                )}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
