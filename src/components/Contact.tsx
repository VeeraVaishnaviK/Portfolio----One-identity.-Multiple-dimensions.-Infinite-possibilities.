import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Send, CheckCircle2, ArrowUp, FileDown, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './shared/SocialIcons';
import { VeeCharacter } from './VeeCharacter';
import profileData from '../data/profile.json';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(8, { message: 'Please write a message.' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact({ onPlayClick }: { onPlayClick: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    onPlayClick();
    setSubmitted(true);

    const subject = encodeURIComponent(`[VEE Studio Inquiry] From ${data.name}`);
    const body = encodeURIComponent(
      `Hello Vaishnavi,\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}\n`
    );
    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
    reset();
  };

  const scrollToTop = () => {
    onPlayClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1A1816]/70 border border-[#1B1F3B]/10 dark:border-white/10 text-xs font-mono text-[#E4645A] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DIRECT CONNECT PROTOCOL</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#1B1F3B] dark:text-[#F4EFE6] mb-4">
          Let&apos;s build something <span className="font-serif-italic font-normal text-[#E4645A]">together.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#5A5D73] dark:text-[#9B9AA8] font-mono">
          Open for engineering opportunities, AI research collaborations, and production consulting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#171821] border-2 border-[#1B1F3B]/10 dark:border-white/10 p-6 sm:p-10 shadow-xl">
          {submitted ? (
            <div className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#7FA283]/20 text-[#7FA283] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-2xl text-[#1B1F3B] dark:text-white mb-2">
                Thank you! Message Prepared.
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5D73] dark:text-[#9B9AA8] max-w-md leading-relaxed mb-6 font-mono">
                Your email client was triggered for {profileData.email}. If it didn&apos;t open automatically, write directly to <strong>{profileData.email}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] font-mono text-xs font-bold uppercase tracking-wider"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F5F1E3]/50 dark:bg-[#101116] border border-black/10 dark:border-white/10 text-sm text-[#1B1F3B] dark:text-white placeholder-[#9B9AA8] focus:outline-none focus:border-[#E4645A]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-500 font-mono">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] uppercase mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F5F1E3]/50 dark:bg-[#101116] border border-black/10 dark:border-white/10 text-sm text-[#1B1F3B] dark:text-white placeholder-[#9B9AA8] focus:outline-none focus:border-[#E4645A]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-500 font-mono">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] uppercase mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details regarding your project, opportunity, or research idea..."
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F5F1E3]/50 dark:bg-[#101116] border border-black/10 dark:border-white/10 text-sm text-[#1B1F3B] dark:text-white placeholder-[#9B9AA8] focus:outline-none focus:border-[#E4645A] resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-500 font-mono">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-[#1B1F3B] dark:bg-[#F4EFE6] text-[#F5F1E3] dark:text-[#0E0C0A] font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#E4645A]" />
                <span>Send via Mail Client</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: VEE Character Thumbs-Up / Greeting & Direct Links */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <VeeCharacter
              state={submitted ? 'celebrate' : 'talk'}
              speechText={submitted ? 'Thank you! Talk soon!' : 'Drop a line. I respond within 24h.'}
              onClick={onPlayClick}
              scale={0.9}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onPlayClick}
              className="p-3 rounded-full bg-white dark:bg-[#171821] border border-black/10 dark:border-white/10 text-[#1B1F3B] dark:text-white hover:text-[#E4645A] shadow-sm transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onPlayClick}
              className="p-3 rounded-full bg-white dark:bg-[#171821] border border-black/10 dark:border-white/10 text-[#1B1F3B] dark:text-white hover:text-[#2F4B8F] shadow-sm transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <a
              href={`mailto:${profileData.email}`}
              onClick={onPlayClick}
              className="p-3 rounded-full bg-white dark:bg-[#171821] border border-black/10 dark:border-white/10 text-[#1B1F3B] dark:text-white hover:text-[#7FA283] shadow-sm transition-colors"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            <a
              href={profileData.resumePath}
              download="Veera_Vaishnavi_K_Resume.pdf"
              onClick={onPlayClick}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-[#171821] border border-black/10 dark:border-white/10 text-xs font-mono font-bold text-[#1B1F3B] dark:text-white hover:text-[#C9A24B] shadow-sm transition-colors"
              title="Download Résumé"
            >
              <FileDown className="w-4 h-4 text-[#C9A24B]" />
              <span>Résumé</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Details & "VEE Closes the Door" Graphic */}
      <footer className="mt-24 pt-12 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#5A5D73] dark:text-[#9B9AA8] gap-4">
        <div>
          Designed &amp; built by <strong>VEE</strong> &bull; Chennai &bull; &copy; 2026
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[#7FA283] font-bold">
            All doors inspected &amp; ready
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-full border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-[#1B1F3B] dark:text-white" />
          </button>
        </div>
      </footer>
    </section>
  );
}

