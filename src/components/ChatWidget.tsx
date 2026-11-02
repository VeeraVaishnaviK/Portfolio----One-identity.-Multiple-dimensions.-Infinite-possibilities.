import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import profileData from '../data/profile.json';

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

export function ChatWidget({ onPlayClick }: { onPlayClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hi! I'm VEE's AI assistant. Ask me anything about her architecture, Lin's InfoTech microservices, IEEE research, or hackathon wins!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedChips = [
    "What did she build at Lin's InfoTech?",
    "Show her IEEE research",
    "What hackathons did she win?",
    "Tell me about Apex Engineering"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;
    onPlayClick();

    const query = userText.trim().toLowerCase();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Grounded knowledge retrieval from verified data
    setTimeout(() => {
      let reply = "I can tell you about VEE's work as a Founding Software Engineer, her 62-route Apex Engineering platform, her IEEE Parkinson's paper, or her leadership at GDG SIMATS.";

      if (query.includes("lin's") || query.includes("infotech") || query.includes("architecture")) {
        reply = "At Lin's InfoTech (AI Solutions Startup, Dec 2024–Present), VEE architected a three-layer microservices application separating a Next.js client, Express REST API gateway, and isolated Python/FastAPI service. She integrated LangChain + Google Gemini API for streaming conversational responses and async document generation.";
      } else if (query.includes("research") || query.includes("ieee") || query.includes("parkinson")) {
        reply = "VEE published an IEEE Conference Paper in ICFTS 2025 (IEEE Xplore): 'Parkinson's disease screening from spiral hand sketches using MobileNet with KNN classification', achieving over 92% screening accuracy from digital pen trajectory micro-tremors.";
      } else if (query.includes("hackathon") || query.includes("award") || query.includes("prize")) {
        reply = "VEE won 1st Prize at a 12-Hour Hackathon for TutorMatch (tutor-student matching with real-time chat), 3rd Prize at a 24-Hour Hackathon for a fake-news classifier web app, the Best Poster Award at Tech Star Summit, and the Torch Bearer Award (2025) from SIMATS University for her 9.22 CGPA.";
      } else if (query.includes("apex") || query.includes("engineering.org")) {
        reply = "Apex Engineering (apexengineering.org.in) is a production B2B web platform with 62 statically generated routes served on Vercel's edge network, selective client-side React hydration, dynamic XML sitemaps, and a 20+ FAQ client-side filter.";
      } else if (query.includes("nexacro")) {
        reply = "Nexacro (nexacro.in) is an AI acrosome intactness analysis platform using computer vision to classify intact vs. damaged sperm cells from microscope imagery, built with Python, React, and Android Studio sharing a unified backend.";
      } else if (query.includes("skills") || query.includes("stack") || query.includes("tech")) {
        reply = "VEE specializes in Python, TypeScript, React, Next.js, Node.js, Express, FastAPI, MongoDB, MobileNet, KNN, LangChain, Google Gemini API, and Vercel edge deployment.";
      } else if (query.includes("contact") || query.includes("email") || query.includes("hire")) {
        reply = `You can email her directly at ${profileData.email} or connect on LinkedIn at ${profileData.linkedin}. Her resume is also available to download directly on the page!`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            onPlayClick();
            setIsOpen(!isOpen);
          }}
          className="group relative p-3.5 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          title="Ask VEE AI"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5 text-[#E4645A]" />}
          <span className="hidden sm:inline font-mono text-xs font-bold uppercase tracking-wider pr-1">
            {isOpen ? 'Close' : 'Ask VEE'}
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#E4645A] animate-ping" />
        </button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 rounded-3xl bg-white dark:bg-[#1A1816] border-2 border-[#1B1F3B]/15 dark:border-white/15 shadow-2xl flex flex-col overflow-hidden max-h-[500px]"
          >
            {/* Header */}
            <div className="p-4 bg-[#F5F1E3] dark:bg-[#101116] border-b border-black/10 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E4645A] text-white flex items-center justify-center font-bold text-xs">
                  V
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-[#1B1F3B] dark:text-white">
                    Ask VEE Assistant
                  </div>
                  <div className="text-[10px] font-mono text-[#7FA283] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7FA283]" />
                    Grounded on verified portfolio data
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-[#5A5D73] dark:text-[#9B9AA8] hover:text-black dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 min-h-[220px]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 text-xs ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-[#1B1F3B] dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      V
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#E4645A] text-white rounded-tr-none'
                        : 'bg-[#F5F1E3] dark:bg-[#101116] text-[#1B1F3B] dark:text-white rounded-tl-none border border-black/5 dark:border-white/5'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-[#5A5D73] dark:text-[#9B9AA8] font-mono pl-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E4645A] animate-pulse" />
                  <span>VEE is retrieving facts...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Chips */}
            <div className="px-3 py-2 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5 flex gap-1.5 overflow-x-auto pb-2">
              {suggestedChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-[#101116] border border-black/10 dark:border-white/10 text-[10px] font-mono text-[#5A5D73] dark:text-[#9B9AA8] hover:border-[#E4645A] whitespace-nowrap cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-black/10 dark:border-white/10 flex items-center gap-2 bg-white dark:bg-[#1A1816]"
            >
              <input
                type="text"
                placeholder="Ask about my projects, research..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#F5F1E3]/60 dark:bg-[#101116] border border-black/10 dark:border-white/10 text-xs text-[#1B1F3B] dark:text-white placeholder-[#9B9AA8] focus:outline-none focus:border-[#E4645A]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#1B1F3B] dark:bg-[#F4EFE6] text-white dark:text-black hover:opacity-90"
              >
                <Send className="w-3.5 h-3.5 text-[#E4645A]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
