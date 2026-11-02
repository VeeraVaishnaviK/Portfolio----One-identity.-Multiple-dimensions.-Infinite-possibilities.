import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Mail, 
  Send, 
  FileDown, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../shared/SocialIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    setSubmittedData(data);
    
    // Construct properly encoded mailto URL
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${data.subject}`);
    const mailtoBody = encodeURIComponent(
      `Hello Veera Vaishnavi,\n\nMy Name: ${data.name}\nMy Email: ${data.email}\n\nMessage:\n${data.message}\n`
    );
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Open default mail client
    window.location.href = mailtoUrl;
    reset();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#2A2C38] mb-4">
            <Mail className="w-3.5 h-3.5 text-[#9275FF]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
              Section 09 • Direct Connect
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Have an idea?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9275FF] via-[#D9CEFF] to-[#C7A66A]">
              Let&apos;s build something meaningful.
            </span>
          </h2>
        </div>
        <p className="text-sm text-[#8E8E93] max-w-md mt-4 md:mt-0">
          Open to innovative engineering collaborations, AI research initiatives, and software engineering opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Handles & Resume Access */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#171821] border border-[#2A2C38] p-6 sm:p-8">
          <div>
            <h3 className="font-heading font-black text-xl text-white mb-2">
              Get in Touch
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed mb-6">
              Feel free to reach out via direct email, connect on LinkedIn, or inspect my open-source code on GitHub.
            </p>

            {/* Direct Email Card with One-Click Copy */}
            <div className="p-4 rounded-2xl bg-[#101116] border border-[#2A2C38] mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#9275FF]/20 flex items-center justify-center text-[#9275FF]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8E8E93] uppercase">Direct Email</div>
                  <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[190px] sm:max-w-xs">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-[#171821] hover:bg-white/5 border border-[#2A2C38] text-xs text-[#D9CEFF] transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Verified Social Channels */}
            <div className="space-y-2 mb-6">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#101116] border border-[#2A2C38] hover:border-[#3B82F6]/50 text-xs text-[#F5F1E9] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#3B82F6]" />
                  <span>LinkedIn Network Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-white" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#101116] border border-[#2A2C38] hover:border-[#9275FF]/50 text-xs text-[#F5F1E9] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#9275FF]" />
                  <span>GitHub Repositories & Contributions</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Download Resume Button */}
          <div className="pt-6 border-t border-[#2A2C38]">
            <a
              href={PERSONAL_INFO.resumePdfPath}
              download={PERSONAL_INFO.resumeDownloadName}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#9275FF] to-[#7B5BFA] text-white font-heading font-semibold text-xs sm:text-sm shadow-xl shadow-[#9275FF]/25 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 rounded-3xl bg-[#171821] border border-[#2A2C38] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#C7A66A] uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Send Direct Message</span>
          </div>

          {submittedData && (
            <div className="p-4 mb-6 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>Mail Client Launched:</strong> Your message has been prepared for {PERSONAL_INFO.email}. If your mail app didn't open automatically, please send directly to <u>{PERSONAL_INFO.email}</u>.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-[#8E8E93] mb-1.5 uppercase">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  {...register('name')}
                  className="w-full px-4 py-3 rounded-xl bg-[#101116] border border-[#2A2C38] text-sm text-white placeholder-[#686868] focus:outline-none focus:border-[#9275FF] transition-colors"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-[#8E8E93] mb-1.5 uppercase">
                  Your Email *
                </label>
                <input
                  type="email"
                  placeholder="alex@domain.com"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-xl bg-[#101116] border border-[#2A2C38] text-sm text-white placeholder-[#686868] focus:outline-none focus:border-[#9275FF] transition-colors"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-mono text-[#8E8E93] mb-1.5 uppercase">
                Subject *
              </label>
              <input
                type="text"
                placeholder="Collaboration, Research Inquiry, or Project"
                {...register('subject')}
                className="w-full px-4 py-3 rounded-xl bg-[#101116] border border-[#2A2C38] text-sm text-white placeholder-[#686868] focus:outline-none focus:border-[#9275FF] transition-colors"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-rose-400 font-mono">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-mono text-[#8E8E93] mb-1.5 uppercase">
                Message Content *
              </label>
              <textarea
                rows={4}
                placeholder="Share details regarding your idea, problem statement, or team requirements..."
                {...register('message')}
                className="w-full px-4 py-3 rounded-xl bg-[#101116] border border-[#2A2C38] text-sm text-white placeholder-[#686868] focus:outline-none focus:border-[#9275FF] transition-colors resize-none"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-rose-400 font-mono">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9275FF] to-[#7B5BFA] text-white font-heading font-semibold text-sm shadow-xl shadow-[#9275FF]/25 hover:shadow-[#9275FF]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>Send Message via Mail Client</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
