'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from './root';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al-Mansoori',
    role: 'CTO at TechCorp Solutions',
    company: 'TechCorp Solutions',
    quote: 'Sinetcom\'s cybersecurity solutions have been instrumental in protecting our enterprise infrastructure. Their expertise and support are unmatched.',
    rating: 5.0,
    avatar: 'AM',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'IT Director at Global Enterprises Ltd',
    company: 'Global Enterprises Ltd',
    quote: 'The data center and backup solutions provided by Sinetcom have transformed our operations. Reliable, secure, and always available when we need them.',
    rating: 4.5,
    avatar: 'SJ',
  },
  {
    id: 3,
    name: 'Mohammed Hassan',
    role: 'Security Manager at Digital Innovations Inc',
    company: 'Digital Innovations Inc',
    quote: 'Working with Sinetcom has been a game-changer. Their Sophos solutions and 365-day support give us peace of mind in our cybersecurity strategy.',
    rating: 5.0,
    avatar: 'MH',
  },
  {
    id: 4,
    name: 'Emily Chen',
    role: 'VP of Technology at SecureNet Systems',
    company: 'SecureNet Systems',
    quote: 'Sinetcom\'s value-added services and fast delivery have exceeded our expectations. They truly understand enterprise needs and deliver exceptional results.',
    rating: 5.0,
    avatar: 'EC',
  },
  {
    id: 5,
    name: 'David Williams',
    role: 'Infrastructure Lead at CloudFirst Technologies',
    company: 'CloudFirst Technologies',
    quote: 'Outstanding partnership with Sinetcom. Their digital transformation services and enterprise IT solutions have helped us modernize our infrastructure. Trusted partners indeed.',
    rating: 4.5,
    avatar: 'DW',
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: colors.primary }}>
            Our Trusted Clients
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Trusted by enterprise clients across industries for cybersecurity, data center, and digital transformation solutions.
          </p>
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
