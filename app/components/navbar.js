'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import sinetcomLogo from '../assets/sinetcom-logo.png';
import { colors } from './root';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [sophosOpen, setSophosOpen] = useState(false);
  const [huaweiOpen, setHuaweiOpen] = useState(false);
  const solutionsTimeoutRef = useRef(null);
  const sophosTimeoutRef = useRef(null);
  const huaweiTimeoutRef = useRef(null);

  // Handle solutions dropdown
  const handleSolutionsEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
      setSophosOpen(false);
      setHuaweiOpen(false);
    }, 200);
  };

  // Handle Sophos nested dropdown
  const handleSophosEnter = () => {
    if (sophosTimeoutRef.current) clearTimeout(sophosTimeoutRef.current);
    setSophosOpen(true);
  };

  const handleSophosLeave = () => {
    sophosTimeoutRef.current = setTimeout(() => {
      setSophosOpen(false);
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
        setSophosOpen(false);
        setHuaweiOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <nav 
      className="w-full bg-transparent "
      style={{
        boxShadow: '0 4px 6px -1px rgba(255, 255, 255, 0.3)', // white bottom shadow
      }}
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
                src={sinetcomLogo}
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
              className="px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 hover:bg-white/20 text-white hover:text-gray-200"
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
                className="px-3 py-2 text-base font-medium rounded-md transition-all duration-200 flex items-center gap-1 group-hover:bg-white/20 text-white hover:text-gray-200"
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
                  style={{
                    backgroundColor: 'rgba(20, 27, 36, 0.85)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {/* Sophos Solutions */}
                  <div 
                    className="relative"
                    onMouseEnter={handleSophosEnter}
                    onMouseLeave={handleSophosLeave}
                  >
                    <button
                      className="w-full flex items-center justify-between py-3 px-2 rounded-md hover:bg-white/10 transition-colors duration-150 text-white"
                      aria-expanded={sophosOpen}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-base font-medium">Sophos Solutions</span>
                      </div>
                      <svg
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                          sophosOpen ? 'rotate-90' : ''
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

                    {/* Sophos Submenu */}
                    {sophosOpen && (
                      <div 
                        className="absolute left-full top-0 ml-2 w-64 rounded-lg py-3 px-3 animate-in fade-in slide-in-from-left-2 duration-200"
                        style={{
                          backgroundColor: 'rgba(20, 27, 36, 0.85)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        <Link
                          href="/solutions/sophos/endpoint"
                          className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-white/10 transition-colors duration-150 text-white"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-base">Sophos Endpoint</span>
                        </Link>
                        <Link
                          href="/solutions/sophos/firewall"
                          className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-white/10 transition-colors duration-150 text-white"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-base">Sophos Firewall</span>
                        </Link>
                        <Link
                          href="/solutions/sophos/mdr"
                          className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-white/10 transition-colors duration-150 text-white"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-base">Sophos MDR</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Storene Solutions */}
                  <Link
                    href="/solutions/storene"
                    className="w-full flex items-center gap-3 py-3 px-2 rounded-md hover:bg-white/10 transition-colors duration-150 text-white"
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
                      className="w-full flex items-center justify-between py-3 px-2 rounded-md hover:bg-white/10 transition-colors duration-150 text-white"
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
                        style={{
                          backgroundColor: 'rgba(20, 27, 36, 0.85)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        <Link
                          href="/solutions/huawei/ups"
                          className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-white/10 transition-colors duration-150 text-white"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-base">UPS Solutions</span>
                        </Link>
                        <Link
                          href="/solutions/huawei/smart-server-rack"
                          className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-white/10 transition-colors duration-150 text-white"
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
              className="px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 hover:bg-white/20 text-white hover:text-gray-200"
              onClick={() => setSolutionsOpen(false)}
            >
              About Us
            </Link>

            {/* Events */}
            <Link
              href="/events"
              className="px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 hover:bg-white/20 text-white hover:text-gray-200"
              onClick={() => setSolutionsOpen(false)}
            >
              Events
            </Link>

            {/* Blogs */}
            <Link
              href="/blogs"
              className="px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 hover:bg-white/20 text-white hover:text-gray-200"
              onClick={() => setSolutionsOpen(false)}
            >
              Blogs
            </Link>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <Link
              href="/contact"
              className="px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 hover:bg-white/20 text-white hover:text-gray-200"
              onClick={() => setSolutionsOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/support-ticket"
              className="px-4 py-2 text-base font-semibold rounded-md transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: colors.primary,
                color: '#FFFFFF',
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
              className="inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 hover:bg-white/20 text-white"
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
                  <button
                    onClick={() => setSophosOpen(!sophosOpen)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between"
                    style={{ color: colors.secondary }}
                  >
                    Sophos Solutions
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        sophosOpen ? 'rotate-180' : ''
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

                  {/* Mobile Sophos Submenu */}
                  {sophosOpen && (
                    <div className="pl-4 space-y-1 py-2 border-l-2 border-gray-200">
                      <Link
                        href="/solutions/sophos/endpoint"
                        className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150"
                        style={{ color: colors.secondary }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setSolutionsOpen(false);
                          setSophosOpen(false);
                        }}
                      >
                        Sophos Endpoint
                      </Link>
                      <Link
                        href="/solutions/sophos/firewall"
                        className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150"
                        style={{ color: colors.secondary }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setSolutionsOpen(false);
                          setSophosOpen(false);
                        }}
                      >
                        Sophos Firewall
                      </Link>
                      <Link
                        href="/solutions/sophos/mdr"
                        className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors duration-150"
                        style={{ color: colors.secondary }}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setSolutionsOpen(false);
                          setSophosOpen(false);
                        }}
                      >
                        Sophos MDR
                      </Link>
                    </div>
                  )}

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
                  backgroundColor: colors.primary,
                  color: '#FFFFFF',
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
