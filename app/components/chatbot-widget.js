'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    role: 'assistant',
    text: "Welcome back! I'm Sinetcom Chatbot, an AI Chat Assistant from Sophos. Anything specific you'd like to know about our managed detection and response services?",
    ts: 'Today',
  },
  {
    id: 'm2',
    role: 'assistant',
    text: "Saw that you're interested in defeating cyberattacks with Sophos cybersecurity as a service. I'm available if you have questions or need anything clarified!",
    ts: 'Today',
  },
];

const QUICK_ACTIONS = [
  { id: 'book', label: 'Book a Meeting', type: 'link', href: '/contact', target: false },
  { id: 'support', label: 'Technical Support', type: 'link', href: '/support', target: false },
  { id: 'sales', label: 'Chat with a Sales Rep', type: 'link', href: '/contact', target: false },
];

function MessageBubble({ message }) {
  const isAssistant = message.role === 'assistant';

  if (isAssistant) {
    return (
      <div className="text-[15px] leading-[1.5] text-[#333333] mb-5 font-sans">
        {message.text}
      </div>
    );
  }

  return (
    <div className="flex justify-end mb-5">
      <div className="max-w-[85%] rounded-[18px] rounded-br-[4px] px-4 py-2.5 text-[15px] bg-[#3b3bfa] text-white font-sans shadow-sm">
        {message.text}
      </div>
    </div>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, messages.length, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput('');
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text, ts: 'now' },
    ]);

    try {
      const response = await fetch('https://minuri.app.n8n.cloud/webhook/f43ec7bb-d6a7-4ccd-93b8-9431b4680656/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We send the current message, and optionally the chat history (messages)
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId: 'user-session-' + Date.now(), // Simple session ID for context if needed
          chatInput: text
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json().catch(() => ({}));

      // Determine the bot response text based on common n8n webhook output formats
      let botResponseText = 'Thanks — please wait while we process your request.';

      if (data && data.output) {
        botResponseText = data.output;
      } else if (data && data.text) {
        botResponseText = data.text;
      } else if (data && data.message) {
        botResponseText = data.message;
      } else if (Array.isArray(data) && data[0] && data[0].output) {
        botResponseText = data[0].output;
      } else if (Array.isArray(data) && data[0] && data[0].text) {
        botResponseText = data[0].text;
      } else if (typeof data === 'string' && data) {
        botResponseText = data;
      } else {
        // Fallback if we can't parse the structure but request was successful
        console.log("Webhook response:", data);
        botResponseText = 'Thank you for your message. Our team will get back to you shortly.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: botResponseText,
          ts: 'now',
        },
      ]);
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: 'Sorry, I am having trouble connecting to the server at the moment. Please try again later.',
          ts: 'now',
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative group w-[340px] sm:w-[380px] max-w-[calc(100vw-2.5rem)]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-[13px] -left-[38px] w-8 h-8 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center bg-[#3b3bfa] text-white opacity-0 group-hover:opacity-100 transition-all z-[80] hover:bg-[#2e2edb] hover:scale-105 focus:opacity-100"
              aria-label="Close chat"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="rounded-[12px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#e5e7eb] bg-white flex flex-col font-sans w-full h-[550px]">
              {/* Header */}
              <div className="pt-6 px-5 relative bg-white">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] leading-none mb-0.5">✨</span>
                    <div className="text-[17px] font-semibold text-[#666666]">Sinetcom Chatbot</div>
                  </div>
                  <div className="text-[14px] text-[#888888] mt-0.5 ml-7">AI Chat Assistant</div>
                </div>
              </div>

              {/* Messages */}
              <div ref={listRef} className="px-5 pt-6 pb-2 bg-white max-h-[380px] overflow-y-auto overflow-x-hidden hide-scrollbar flex-1">
                {(messages.length > 2 ? messages.slice(2) : messages).map((m) => (
                  <MessageBubble key={m.id} message={m} />
                ))}

                {sending && (
                  <div className="flex mb-5">
                    <div className="bg-[#f0f2f5] rounded-[18px] rounded-bl-[4px] px-[15px] py-[13px] flex items-center justify-center gap-[5px] shadow-sm">
                      <motion.div className="w-2 h-2 rounded-full bg-[#8b93a0]" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }} />
                      <motion.div className="w-2 h-2 rounded-full bg-[#8b93a0]" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
                      <motion.div className="w-2 h-2 rounded-full bg-[#8b93a0]" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
                    </div>
                  </div>
                )}

                {/* Quick actions (show if no user messages sent yet) */}
                {messages.length === 2 && (
                  <div className="flex flex-wrap gap-[7px] mt-1 mb-3">
                    {QUICK_ACTIONS.map((a) =>
                      a.type === 'link' ? (
                        <Link
                          key={a.id}
                          href={a.href}
                          className="px-[14px] py-[6px] text-[14px] leading-tight font-normal rounded-full border border-[#3b3bfa] text-[#3b3bfa] bg-white hover:bg-[#f0f0ff] transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {a.label}
                        </Link>
                      ) : null
                    )}
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="px-5 pb-5 bg-white">
                <div className="flex items-center gap-2 rounded-xl border border-[#d1d5db] focus-within:border-[#3b3bfa] px-4 py-[11px] transition-colors shadow-sm">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Ask a question"
                    className="flex-1 w-full min-w-0 bg-transparent outline-none text-[15px] text-[#333] placeholder:text-[#888]"
                  />
                  <button
                    type="button"
                    onClick={send}
                    className="text-[#3b3bfa] shrink-0 disabled:opacity-40 disabled:cursor-not-allowed mx-1 transition-opacity hover:opacity-80"
                    disabled={!input.trim() || sending}
                    aria-label="Send"
                  >
                    <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-[#f3f4f6] bg-white">
                <div className="text-[12px] leading-[1.5] text-[#888888]">
                  By chatting, you agree that Sophos and our providers may use AI technology to respond to, monitor, record and use this chat per the <a href="https://www.sophos.com/en-us/legal/sophos-group-privacy-notice" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#555555]">Sophos Group Privacy Notice</a>.
                </div>
              </div>

              {/* Optional close button overlaid at top right, although not in the exact screenshot, often needed. Let's rely on standard logic but hide the close button since the screenshot has a clean top right corner without it. Wait, the screenshot doesn't have a close button at the top right, it just has text. So we'll skip it to match UI perfectly. */}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="launcher"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            type="button"
            onClick={() => setOpen(true)}
            className="w-14 h-14 rounded-2xl shadow-xl border border-black/10 inline-flex items-center justify-center hover:shadow-2xl transition-shadow bg-[#3b3bfa]"
            aria-label="Open chat"
          >
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2c5.52 0 10 3.94 10 8.8 0 4.86-4.48 8.8-10 8.8-1.08 0-2.12-.12-3.1-.35-1.11.7-3.27 1.81-5.74 1.78a.56.56 0 0 1-.5-.33.64.64 0 0 1 .06-.58c.94-1.39 1.21-2.93 1.3-3.66C3.47 16.1 2 13.6 2 10.8 2 5.94 6.48 2 12 2Z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
