'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from './root';

const DRAFT_KEY = 'support-ticket-draft';

// Categories (formerly Help Topics) – full list
const CATEGORIES = [
  'Sophos Central Email Gateway',
  'Sophos Central Encryption',
  'Sophos Central Endpoint (Cloud)',
  'Sophos Central General',
  'Sophos Central Mobile',
  'Sophos Cloud Optix',
  'Sophos Email (On-premises)',
  'Sophos Firewall',
  'Sophos Manage Threat Response (MTR)',
  'Sophos Phish Threat',
  'Sophos Secure Web Gateway',
  'Sophos SG UTM',
  'Storone Backup',
  'Storone Consolidation',
  'Storone Databases',
  'Storone Future Proof',
];

const CATEGORY_SUGGESTIONS = {
  'Sophos Central Email Gateway': 'Email gateway configuration or delivery issue',
  'Sophos Central Encryption': 'Encryption or policy issue',
  'Sophos Central Endpoint (Cloud)': 'Endpoint protection or cloud agent issue',
  'Sophos Central General': 'General Sophos Central product question',
  'Sophos Central Mobile': 'Mobile device management or security issue',
  'Sophos Cloud Optix': 'Cloud Optix configuration or visibility',
  'Sophos Email (On-premises)': 'On-premises email security issue',
  'Sophos Firewall': 'Firewall configuration or policy issue',
  'Sophos Manage Threat Response (MTR)': 'MTR or threat response inquiry',
  'Sophos Phish Threat': 'Phish Threat or simulation issue',
  'Sophos Secure Web Gateway': 'Secure web gateway or proxy issue',
  'Sophos SG UTM': 'SG UTM or unified threat management',
  'Storone Backup': 'Backup configuration or restore issue',
  'Storone Consolidation': 'Storage consolidation inquiry',
  'Storone Databases': 'Database storage or performance',
  'Storone Future Proof': 'Future Proof storage inquiry',
};

const initialForm = {
  email: '',
  fullName: '',
  phone: '',
  phoneExt: '',
  note: '',
  helpTopic: '',
  issueSummary: '',
  detailedDescription: '',
};

function validateEmail(email) {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? '' : 'Please enter a valid email address';
}

function validateRequired(value, fieldName) {
  const trimmed = (value || '').trim();
  return trimmed ? '' : `${fieldName} is required`;
}

export default function SupportTicketForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [files, setFiles] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const textareaRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const { helpTopic, issueSummary, ...rest } = parsed;
        setForm((prev) => ({ ...prev, ...rest }));
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      } catch (_) {}
    }, 500);
    return () => clearTimeout(timer);
  }, [form]);

  const adjustTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 280)}px`;
  }, []);

  useEffect(() => {
    adjustTextarea();
  }, [form.detailedDescription, adjustTextarea]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setTouched((p) => ({ ...p, helpTopic: true }));
        if (!form.helpTopic) setErrors((p) => ({ ...p, helpTopic: 'Category is required' }));
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [form.helpTopic]);

  const filteredCategories = CATEGORIES.filter((c) =>
    c.toLowerCase().includes((dropdownSearch || '').toLowerCase())
  );

  const updateForm = (name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'helpTopic' && CATEGORY_SUGGESTIONS[value]) {
        next.issueSummary = CATEGORY_SUGGESTIONS[value];
      }
      return next;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (name === 'email') setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
    if (name === 'fullName') setErrors((prev) => ({ ...prev, fullName: validateRequired(form.fullName, 'Full name') }));
    if (name === 'issueSummary') setErrors((prev) => ({ ...prev, issueSummary: validateRequired(form.issueSummary, 'Issue summary') }));
    if (name === 'detailedDescription') setErrors((prev) => ({ ...prev, detailedDescription: validateRequired(form.detailedDescription, 'Detailed description') }));
  };

  const runValidation = () => {
    const next = {
      email: validateEmail(form.email),
      fullName: validateRequired(form.fullName, 'Full name'),
      helpTopic: validateRequired(form.helpTopic, 'Category'),
      issueSummary: validateRequired(form.issueSummary, 'Issue summary'),
      detailedDescription: validateRequired(form.detailedDescription, 'Detailed description'),
    };
    setErrors(next);
    setTouched({ email: true, fullName: true, helpTopic: true, issueSummary: true, detailedDescription: true });
    return !Object.values(next).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!runValidation()) return;
    const id = `ST-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setTicketId(id);
    setSubmitted(true);
    setShowModal(true);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (_) {}
  };

  const handleCancel = () => {
    if (typeof window !== 'undefined') window.history.back();
  };

  const handleFileSelect = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files || [])]);
  };

  const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const inputBase = 'w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200';
  const inputError = 'border-red-400 focus:ring-red-400/30';
  const inputOk = 'border-gray-200 focus:ring-gray-300 hover:border-gray-300';

  return (
    <div className="pt-[var(--navbar-height,80px)] min-h-screen bg-gray-50/80">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
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
          className="bg-white rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-visible"
        >
          <div className="px-6 sm:px-8 py-8 border-b border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ color: colors.primary }}>
              Open a Ticket
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Submit a ticket and we&apos;ll get back to you shortly.</p>
            <p className="text-gray-400 text-xs mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Draft saved automatically
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span style={{ color: colors.primary }}>1.</span> Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="you@company.com"
                      className={`${inputBase} ${touched.email && errors.email ? inputError : inputOk}`}
                      style={{ '--tw-ring-color': touched.email && errors.email ? undefined : colors.primary }}
                    />
                  </div>
                  {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </span>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={(e) => updateForm('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="John Doe"
                      className={`${inputBase} ${touched.fullName && errors.fullName ? inputError : inputOk}`}
                      style={{ '--tw-ring-color': touched.fullName && errors.fullName ? undefined : colors.primary }}
                    />
                  </div>
                  {touched.fullName && errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </span>
                      <input id="phone" type="tel" name="phone" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="+1 234 567 8900" className={`${inputBase} ${inputOk}`} style={{ '--tw-ring-color': colors.primary }} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phoneExt" className="block text-sm font-medium text-gray-700 mb-1.5">Extension</label>
                    <input id="phoneExt" type="text" name="phoneExt" value={form.phoneExt} onChange={(e) => updateForm('phoneExt', e.target.value)} placeholder="Optional" className={`${inputBase} ${inputOk}`} style={{ '--tw-ring-color': colors.primary }} />
                  </div>
                </div>
                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1.5">Optional Note</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-gray-400" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                    </span>
                    <input id="note" type="text" name="note" value={form.note} onChange={(e) => updateForm('note', e.target.value)} placeholder="Any additional contact preferences" className={`${inputBase} ${inputOk}`} style={{ '--tw-ring-color': colors.primary }} />
                  </div>
                </div>
              </div>
            </section>

            <section className="relative z-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span style={{ color: colors.primary }}>2.</span> Category <span className="text-red-500">*</span>
              </h2>
              <div className="relative" ref={dropdownRef}>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" aria-hidden>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  </span>
                  <input
                    type="text"
                    value={dropdownOpen ? dropdownSearch : form.helpTopic}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (dropdownOpen) setDropdownSearch(v);
                      else { setDropdownSearch(v); setDropdownOpen(true); updateForm('helpTopic', ''); }
                    }}
                    onFocus={() => { setDropdownOpen(true); setDropdownSearch(''); }}
                    placeholder="— Select a Category —"
                    className={`${inputBase} cursor-pointer ${touched.helpTopic && errors.helpTopic ? inputError : inputOk}`}
                    style={{ '--tw-ring-color': touched.helpTopic && errors.helpTopic ? undefined : colors.primary }}
                    readOnly={!dropdownOpen}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => { setDropdownOpen((o) => !o); if (!dropdownOpen) setDropdownSearch(''); }}
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-expanded={dropdownOpen}
                    aria-label="Toggle category list"
                  >
                    <svg className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      onMouseDown={(e) => e.preventDefault()}
                      className="absolute left-0 right-0 mt-1 py-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-auto"
                    >
                      {filteredCategories.length ? filteredCategories.map((category) => (
                        <li key={category}>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              updateForm('helpTopic', category);
                              setDropdownSearch('');
                              setDropdownOpen(false);
                              setTouched((p) => ({ ...p, helpTopic: true }));
                              setErrors((p) => ({ ...p, helpTopic: '' }));
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-900 text-sm"
                          >
                            {category}
                          </button>
                        </li>
                      )) : (
                        <li className="px-4 py-3 text-gray-500 text-sm">No matching category</li>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
                {touched.helpTopic && errors.helpTopic && <p className="text-red-500 text-sm mt-1">{errors.helpTopic}</p>}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span style={{ color: colors.primary }}>3.</span> Ticket Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="issueSummary" className="block text-sm font-medium text-gray-700 mb-1.5">Issue Summary <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </span>
                    <input
                      id="issueSummary"
                      type="text"
                      name="issueSummary"
                      value={form.issueSummary}
                      onChange={(e) => updateForm('issueSummary', e.target.value)}
                      onBlur={() => handleBlur('issueSummary')}
                      placeholder="Brief summary of the issue"
                      className={`${inputBase} ${touched.issueSummary && errors.issueSummary ? inputError : inputOk}`}
                      style={{ '--tw-ring-color': touched.issueSummary && errors.issueSummary ? undefined : colors.primary }}
                    />
                  </div>
                  {touched.issueSummary && errors.issueSummary && <p className="text-red-500 text-sm mt-1">{errors.issueSummary}</p>}
                </div>
                <div>
                  <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700 mb-1.5">Detailed Description <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-gray-400" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </span>
                    <textarea
                      ref={textareaRef}
                      id="detailedDescription"
                      name="detailedDescription"
                      value={form.detailedDescription}
                      onChange={(e) => updateForm('detailedDescription', e.target.value)}
                      onBlur={() => handleBlur('detailedDescription')}
                      placeholder="Describe the issue in detail..."
                      rows={4}
                      className={`${inputBase} min-h-[120px] max-h-[280px] resize-none ${touched.detailedDescription && errors.detailedDescription ? inputError : inputOk}`}
                      style={{ '--tw-ring-color': touched.detailedDescription && errors.detailedDescription ? undefined : colors.primary }}
                    />
                  </div>
                  {touched.detailedDescription && errors.detailedDescription && <p className="text-red-500 text-sm mt-1">{errors.detailedDescription}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Attachments (optional)</label>
                  <div
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); setFiles((p) => [...p, ...Array.from(e.dataTransfer.files || [])]); }}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 ${isDragging ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'}`}
                  >
                    <input type="file" id="file-upload" multiple onChange={handleFileSelect} className="hidden" />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <span className="text-gray-500"><svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg></span>
                      <span className="text-sm font-medium text-gray-600">Drag & drop files or <span className="underline" style={{ color: colors.primary }}>browse</span></span>
                    </label>
                  </div>
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((file, i) => (
                        <li key={i} className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
                          <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                          <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                          <button type="button" onClick={() => removeFile(i)} className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-red-600 transition-colors" aria-label="Remove file">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4">
              <button type="button" onClick={handleCancel} className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 shadow-sm">
                Cancel
              </button>
              <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2" style={{ backgroundColor: colors.primary }}>
                Submit Ticket
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: `${colors.primary}20` }}>
                <svg className="w-7 h-7" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Ticket Submitted</h3>
              <p className="text-gray-500 mt-2">We&apos;ll get back to you soon.</p>
              <p className="mt-4 font-mono text-lg font-semibold tracking-wide" style={{ color: colors.primary }}>{ticketId}</p>
              <p className="text-xs text-gray-400 mt-1">Save this ID for reference</p>
              <div className="mt-6 flex gap-3 justify-center">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">Close</button>
                <Link href="/support" className="px-4 py-2 rounded-xl font-semibold text-white transition-colors" style={{ backgroundColor: colors.primary }}>Back to Support Center</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
