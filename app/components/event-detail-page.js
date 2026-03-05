'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { INITIAL_EVENTS } from './events-page';
import { colors } from './root';
import Link from 'next/link';
import Image from 'next/image';
import eventHeroImage from '../assets/event/event-hero.jpg';

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;

    const event = INITIAL_EVENTS.find((e) => e.slug === slug);

    if (!event) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center pt-[var(--navbar-height,80px)]">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Event not found</h1>
                <button
                    onClick={() => router.push('/events')}
                    className="px-6 py-2 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                >
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="pt-[var(--navbar-height,80px)] bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="w-full relative overflow-hidden flex flex-col lg:flex-row min-h-[50vh]">
                {/* Left side: Text with blue background */}
                <div
                    className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16 order-2 lg:order-1"
                    style={{ backgroundColor: colors.primary }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-xl mx-auto lg:mx-0 lg:ml-auto w-full"
                    >
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-semibold tracking-wide uppercase rounded-full mb-4">
                            {event.tag}
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                            {event.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-medium">
                            {event.dateStart} {event.dateEnd !== event.dateStart ? ` - ${event.dateEnd}` : ''}
                        </p>
                    </motion.div>
                </div>

                {/* Right side: Image Place */}
                <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-full order-1 lg:order-2 bg-gray-200">
                    {event.image ? (
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-400 m-8 rounded-xl bg-gray-100">
                            <span className="text-gray-500 font-semibold text-lg">Event Image Placeholder</span>
                        </div>
                    )}
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8"
                >
                    <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Event</h2>
                        <p>
                            Join us for the {event.title}, an exclusive {event.type} event designed to help you navigate the evolving landscape of cybersecurity and IT infrastructure. This session will provide deep insights, practical strategies, and networking opportunities with industry experts.
                        </p>
                        <p>
                            Whether you are an IT professional looking to strengthen your organization's defenses or a business leader aiming to understand the strategic impact of security solutions, this event has something for everyone. Expect insightful keynote presentations, interactive workshops, and real-world case studies detailing how modern solutions are transforming operations across industries.
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Key Takeaways</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Understand the latest trends and challenges in cybersecurity.</li>
                            <li>Learn how Sinetcom's tailored solutions can solve complex IT problems.</li>
                            <li>Network with peers, industry leaders, and solution architects.</li>
                            <li>Get hands-on experience and actionable insights to take back to your team.</li>
                        </ul>
                    </div>
                </motion.div>

                {/* Action Bottom */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-gray-200">
                    <Link
                        href="/events"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to All Events
                    </Link>

                    {event.when === 'future' && (
                        <button
                            type="button"
                            className="px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Register Now
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
}
