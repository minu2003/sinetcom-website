'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from './root';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Sibah',
    role: 'Chief Technical Officer, Maxcom Technologies - Maldives',
    company: 'Maxcom Technologies - Maldives',
    quote:
      'We at Maxcom Technologies would like to extend our heartfelt appreciation for the incredible partnership we\'ve shared over the past ten years. Your role as a distributor of Sophos products has been instrumental in our growth, and we sincerely value the consistent support and dedication you\'ve shown us throughout this journey. Your guidance, collaboration, and commitment have been key in helping us achieve Sophos Gold Partner status. Whether it\'s extending support during critical projects, facilitating new business opportunities, or simply being available when needed, Sinetcom has always delivered with professionalism and excellence. Thank you for being more than just a distributor - thank you for being a trusted partner. We look forward to continuing this strong relationship and achieving even greater milestones together in the years ahead.',
    rating: 5.0,
    avatar: 'AS',
  },
  {
    id: 2,
    name: 'W P I P K Pathirana',
    role: 'Network Administrator, National Institute of Business Management, Colombo 07',
    company: 'National Institute of Business Management',
    quote:
      'Dear Sinetcom team, I am writing to sincerely thank you for the excellent support and service you have provided over the past few years. As a customer using Sophos firewalls, your prompt responses and technical expertise have been invaluable to us. Every interaction, from initial setup guidance to ongoing technical support, has been handled professionally and with great care. It\'s clear that your team is committed to helping customers get the most out of their Sophos solutions. We truly appreciate your support and look forward to continuing this partnership.',
    rating: 5.0,
    avatar: 'WP',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for left-to-right, -1 for right-to-left
  const activeTestimonial = testimonials[activeIndex];

  // Auto-rotation effect - always goes left to right
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setDirection(1); // Set direction to left-to-right for auto-rotation
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const goToPrevious = () => {
    setIsAutoRotating(false);
    setDirection(-1); // Set direction to right-to-left
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setIsAutoRotating(false);
    setDirection(1); // Set direction to left-to-right
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToTestimonial = (index) => {
    setIsAutoRotating(false);
    // Determine direction based on index comparison
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Resume auto-rotation after user interaction
  useEffect(() => {
    if (!isAutoRotating) {
      const timer = setTimeout(() => {
        setIsAutoRotating(true);
      }, 10000); // Resume auto-rotation after 10 seconds of inactivity
      return () => clearTimeout(timer);
    }
  }, [isAutoRotating, activeIndex]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{ color: '#FBBF24' }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
            style={{ color: '#FBBF24' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}
        {Array.from({ length: 5 - Math.ceil(rating) }).map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
            style={{ color: '#FBBF24' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" 
            style={{ color: colors.primary }}
          >
            Our Trusted Clients
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto"
          >
            Trusted by enterprise clients across industries for cybersecurity, data center, and digital transformation solutions.
          </motion.p>
        </div>

        {/* Main Testimonial Card */}
        <div className="mb-8 md:mb-12 ">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTestimonial.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white rounded-xl shadow-xl p-6 md:p-8"
              style={{ boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.5)' }}
            >
              {/* User Info */}
              <div className="flex flex-col items-center gap-4 mb-4 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                  style={{ backgroundColor: '#8B5CF6' }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{activeTestimonial.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{activeTestimonial.role}</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="mb-4 flex justify-center">
                {renderStars(activeTestimonial.rating)}
              </div>

              {/* Testimonial Quote */}
              <p className="text-gray-700 text-base md:text-lg leading-relaxed italic text-center">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
            style={{ backgroundColor: colors.primary }}
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                  index === activeIndex
                    ? 'opacity-100'
                    : 'opacity-40 hover:opacity-60'
                }`}
                style={{
                  backgroundColor: index === activeIndex ? colors.primary : '#9CA3AF',
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
            style={{ backgroundColor: colors.primary }}
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
