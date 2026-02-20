'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import sinetcomLogo from '../assets/sinetcom-logo.png';
import sinetcomLogoDark from '../assets/sinetcom-logo1.png';
import { colors } from './root';

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isContactPage = pathname === '/contact';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [huaweiOpen, setHuaweiOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const solutionsTimeoutRef = useRef(null);
  const huaweiTimeoutRef = useRef(null);

  // Handle solutions dropdown
  const handleSolutionsEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
      setHuaweiOpen(false);
    }, 200);
  };

  // Handle Huawei nested dropdown
  const handleHuaweiEnter = () => {
    if (huaweiTimeoutRef.current) clearTimeout(huaweiTimeoutRef.current);
    setHuaweiOpen(true);
  };

  const handleHuaweiLeave = () => {
    huaweiTimeoutRef.current = setTimeout(() => {
      setHuaweiOpen(false);
    }, 200);
  };

  // Close mobile menu when escape is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSolutionsOpen(false);
        setHuaweiOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Change navbar background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar background based on page and scroll state
  const getNavbarBackground = () => {
    if (isScrolled) {
      return 'bg-white'; // White when scrolled on any page
    }
    if (isHomePage || isContactPage) {
      return 'bg-transparent'; // Transparent on home and contact (hero image behind)
    }
    return ''; // Theme color on other pages (set via style)
  };

  const getNavbarStyle = () => {
    if (isScrolled) {
      return {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      };
    }
    if (isHomePage || isContactPage) {
      return {
        boxShadow: '0 2px 4px -1px rgba(255, 255, 255, 0.15)',
      };
    }
    // Other pages - theme color background
    return {
      backgroundColor: colors.primary,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    };
  };

  // Helper to determine text color based on page and scroll state
  const getTextColorClass = () => {
    if (isScrolled) {
      return 'text-black hover:bg-gray-100 hover:text-gray-800'; // Black when scrolled
    }
    // White text when transparent (home/contact) or primary background (other pages)
    return 'text-white hover:bg-white/20 hover:text-gray-200';
  };

  const getGroupTextColorClass = () => {
    if (isScrolled) {
      return 'text-black group-hover:bg-gray-100 group-hover:text-gray-800'; // Black when scrolled
    }
    return 'text-white group-hover:bg-white/20 group-hover:text-gray-200';
  };

  // Dropdown box style: match navbar state (transparent = dark glass, blue = primary glass, white = light)
  const getDropdownStyle = () => {
    if (isScrolled) {
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
      };
    }
    if (isHomePage || isContactPage) {
      return {
        backgroundColor: 'rgba(20, 27, 36, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
      };
    }
    // Blue navbar (other pages at top)
    return {
      backgroundColor: 'rgba(39, 71, 148, 0.95)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.15)',
    };
  };

  const getDropdownItemClass = () => {
    if (isScrolled) {
      return 'text-gray-900 hover:bg-gray-100';
    }
    return 'text-white hover:bg-white/10';
  };

  return (
    <nav 
      className={`w-full transition-all duration-300 ${getNavbarBackground()}`}
      style={getNavbarStyle()}
    >
      <div className="w-full px-4 sm:px-6 lg:px-9">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex-1 mt-3">
            <Link 
              href="/" 
              className="inline-flex items-center hover:opacity-80 transition-opacity duration-200"
              aria-label="Sinetcom Home"
            >
              <Image
                src={isScrolled ? sinetcomLogoDark : sinetcomLogo}
                alt="Sinetcom Logo"
                width={230}
                height={80}
                className="h-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1">
            {/* Home */}
            <Link
              href="/"
              className={`px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${getTextColorClass()}`}
              onMouseEnter={() => setSolutionsOpen(false)}
            >
              Home
            </Link>

            {/* Our Solutions Mega Menu */}
            <div
              className="relative group"
              onMouseEnter={handleSolutionsEnter}
              onMouseLeave={handleSolutionsLeave}
            >
              <button
                className={`px-3 py-2 text-base font-medium rounded-md transition-all duration-200 flex items-center gap-1 ${getGroupTextColorClass()}`}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                Our Solutions
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    solutionsOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {/* Mega Menu Dropdown */}
              {solutionsOpen && (
                <div 
                  className="absolute left-0 mt-2 w-80 rounded-lg py-4 px-4 animate-in fade-in slide-in-from-top-2 duration-200"
                  style={getDropdownStyle()}
                >
                  {/* Sophos Solutions */}
                  <Link
                    href="/sophos"
                    className={`w-full flex items-center gap-3 py-3 px-2 rounded-md transition-colors duration-150 ${getDropdownItemClass()}`}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-base font-medium">Sophos Solutions</span>
                  </Link>

                  {/* Storene Solutions */}
                  <Link
                    href="/solutions/storene"
                    className={`w-full flex items-center gap-3 py-3 px-2 rounded-md transition-colors duration-150 ${getDropdownItemClass()}`}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-base font-medium">Storene Solutions</span>
                  </Link>

                  {/* Huawei Solutions */}
                  <div 
                    className="relative"
                    onMouseEnter={handleHuaweiEnter}
                    onMouseLeave={handleHuaweiLeave}
                  >
                    <button
                      className={`w-full flex items-center justify-between py-3 px-2 rounded-md transition-colors duration-150 ${getDropdownItemClass()}`}
                      aria-expanded={huaweiOpen}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-base font-medium">Huawei Solutions</span>
                      </div>
                      <svg
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                          huaweiOpen ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Huawei Submenu */}
                    {huaweiOpen && (
                      <div 
                        className="absolute left-full top-0 ml-2 w-64 rounded-lg py-3 px-3 animate-in fade-in slide-in-from-left-2 duration-200"
                        style={getDropdownStyle()}
                      >
                        <Link
                          href="/solutions/huawei/ups"
                          className={`flex items-center gap-3 py-2 px-2 rounded-md transition-colors duration-150 ${getDropdownItemClass()}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-base">UPS Solutions</span>
                        </Link>
                        <Link
                          href="/solutions/huawei/smart-server-rack"
                          className={`flex items-center gap-3 py-2 px-2 rounded-md transition-colors duration-150 ${getDropdownItemClass()}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-base">Smart Server Rack Solutions</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* About Us */}
            <Link
              href="/about"
              className={`px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${getTextColorClass()}`}
              onClick={() => setSolutionsOpen(false)}
            >
              About Us
            </Link>

            {/* Events */}
            <Link
              href="/events"
              className={`px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${getTextColorClass()}`}
              onClick={() => setSolutionsOpen(false)}
            >
              Events
            </Link>

            {/* Blogs */}
            <Link
              href="/blogs"
              className={`px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${getTextColorClass()}`}
              onClick={() => setSolutionsOpen(false)}
            >
              Blogs
            </Link>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <Link
              href="/contact"
              className={`px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${getTextColorClass()}`}
              onClick={() => setSolutionsOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/support-ticket"
              className="px-4 py-2 text-base font-semibold rounded-md transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: isScrolled ? colors.primary : (!isHomePage && !isContactPage ? '#FFFFFF' : colors.primary),
                color: isScrolled ? '#FFFFFF' : (!isHomePage && !isContactPage ? colors.primary : '#FFFFFF'),
              }}
              onClick={() => setSolutionsOpen(false)}
            >
              Support Ticket
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${isScrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/20 hover:text-gray-200'}`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  mobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-in slide-in-from-top-2 duration-200 bg-white/95 backdrop-blur-md rounded-lg mt-2 mx-2 shadow-lg">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-150"
                style={{ color: colors.secondary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between"
                style={{ color: colors.secondary }}
              >
                Our Solutions
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    solutionsOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {/* Mobile Solutions Submenu */}
              {solutionsOpen && (
                <div className="pl-4 space-y-1 py-2 border-l-2 border-gray-200">
                  <Link
                    href="/solutions/sophos"
                    className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150"
                    style={{ color: colors.secondary }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSolutionsOpen(false);
                    }}
                  >
                    Sophos Solutions
                  </Link>

                  <Link
                    href="/solutions/storene"
                    className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150"
                    style={{ color: colors.secondary }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSolutionsOpen(false);
                    }}
                  >
                    Storene Solutions
                  </Link>
                  <button
                    onClick={() => setHuaweiOpen(!huaweiOpen)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between"
                    style={{ color: colors.secondary }}
                  >
                    Huawei Solutions
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        huaweiOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Mobile Huawei Submenu */}
                  {huaweiOpen && (
                    <div className="pl-4 space-y-1 py-2 border-l-2 border-gray-200">
                      <Link
                        href="/solutions/huawei/ups"
                        className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150"
                        style={{ color: colors.secondary }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setSolutionsOpen(false);
                          setHuaweiOpen(false);
                        }}
                      >
                        UPS Solutions
                      </Link>
                      <Link
                        href="/solutions/huawei/smart-server-rack"
                        className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150"
                        style={{ color: colors.secondary }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setSolutionsOpen(false);
                          setHuaweiOpen(false);
                        }}
                      >
                        Smart Server Rack Solutions
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-150"
                style={{ color: colors.secondary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>

              <Link
                href="/events"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-150"
                style={{ color: colors.secondary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>

              <Link
                href="/blogs"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-150"
                style={{ color: colors.secondary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>

              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-150"
                style={{ color: colors.secondary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              <Link
                href="/support-ticket"
                className="block px-3 py-2 rounded-md text-base font-semibold mt-2"
                style={{
                  backgroundColor: isScrolled ? colors.primary : (!isHomePage && !isContactPage ? '#FFFFFF' : colors.primary),
                  color: isScrolled ? '#FFFFFF' : (!isHomePage && !isContactPage ? colors.primary : '#FFFFFF'),
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Support Ticket
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>

    
  );
}
