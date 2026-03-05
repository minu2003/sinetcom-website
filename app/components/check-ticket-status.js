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

export default function CheckTicketStatus() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(false);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const inputBase = 'w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200';
  const inputError = 'border-red-400 focus:ring-red-400/30';
  const inputOk = 'border-gray-200 focus:ring-gray-300 hover:border-gray-300';

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
              Currently, our support ticket status portal is under maintenance. <br />
              Please refer to your <strong>email notifications</strong> for the latest status updates.
            </p>
          </div>

          <div className="px-6 sm:px-8 py-8 bg-amber-50/50">
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-amber-900">Portal Transition In Progress</h3>
                <p className="mt-1 text-sm text-amber-800">
                  We are transitioning to a new ticketing system (osTicket) very soon. Once completed, you will be able to track your entire ticket history here natively online.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
