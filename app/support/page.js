import Link from 'next/link';
import { colors } from '../components/root';

export const metadata = {
  title: 'Support Center | Sinetcom',
  description: 'Open a support ticket or check the status of your existing ticket. Sinetcom support for Sophos and IT solutions.',
};

export default function SupportCenterHome() {
  return (
    <div className="pt-[var(--navbar-height,80px)] min-h-screen bg-gray-50/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ color: colors.primary }}>
            Support Center
          </h1>
          <p className="text-gray-500 mt-2 text-base sm:text-lg max-w-xl mx-auto">
            Get help with Sophos and IT solutions. Open a new ticket or check the status of an existing one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <Link
            href="/support/open"
            className="group block bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-colors duration-200" style={{ backgroundColor: `${colors.primary}18` }}>
              <svg className="w-7 h-7" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:opacity-90">Open a Ticket</h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Submit a new support request. We&apos;ll get back to you shortly.
            </p>
            <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold transition-all group-hover:gap-3" style={{ color: colors.accent }}>
              Get started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </Link>

          <Link
            href="/support/status"
            className="group block bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-colors duration-200" style={{ backgroundColor: `${colors.accent}18` }}>
              <svg className="w-7 h-7" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </span>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:opacity-90">Check Ticket Status</h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Look up an existing ticket by number and email.
            </p>
            <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold transition-all group-hover:gap-3" style={{ color: colors.accent }}>
              Check status
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </Link>
        </div>

        <p className="text-center text-gray-400 text-sm mt-10">
          Need general help? <a href="/contact" className="font-medium hover:underline" style={{ color: colors.accent }}>Contact us</a>.
        </p>
      </div>
    </div>
  );
}
