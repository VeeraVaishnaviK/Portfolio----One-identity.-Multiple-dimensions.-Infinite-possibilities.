import { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, ArrowRight, FastForward, Sparkles } from 'lucide-react';
import { VEE_DIALOGUE } from '../../data/portfolioData';

interface VeeSpeechBoxProps {
  onContinue: () => void;
  onSkip: () => void;
  onSpeechStateChange: (isSpeaking: boolean) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlayTypeClick: () => void;
  onPlayClick: () => void;
}

export function VeeSpeechBox({
  onContinue,
  onSkip,
  onSpeechStateChange,
  soundEnabled,
  onToggleSound,
  onPlayTypeClick,
  onPlayClick,
}: VeeSpeechBoxProps) {
  const fullText = VEE_DIALOGUE.text;
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);
    onSpeechStateChange(true);

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        if (index % 3 === 0) {
          onPlayTypeClick();
        }
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        onSpeechStateChange(false);
      }
    }, 28);

    return () => {
      clearInterval(timer);
      onSpeechStateChange(false);
    };
  }, [fullText, onPlayTypeClick, onSpeechStateChange]);

  const handleReplay = () => {
    onPlayClick();
    setDisplayedText('');
    setIsTyping(true);
    onSpeechStateChange(true);

    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        if (index % 3 === 0) {
          onPlayTypeClick();
        }
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        onSpeechStateChange(false);
      }
    }, 28);
  };

  const handleInstantReveal = () => {
    onPlayClick();
    setDisplayedText(fullText);
    setIsTyping(false);
    onSpeechStateChange(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      {/* Guide Identity Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#9275FF]/20 border border-[#9275FF]/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#9275FF]" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm tracking-wide text-white">
              {VEE_DIALOGUE.characterName}
            </h3>
            <p className="text-[11px] text-[#8E8E93]">{VEE_DIALOGUE.role}</p>
          </div>
        </div>

        {/* Audio control */}
        <button
          onClick={() => {
            onPlayClick();
            onToggleSound();
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all ${
            soundEnabled
              ? 'bg-[#9275FF]/20 border-[#9275FF] text-[#D9CEFF]'
              : 'bg-[#171821] border-[#2A2C38] text-[#8E8E93] hover:text-white'
          }`}
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
        </button>
      </div>

      {/* Modern Speech Panel Card */}
      <div className="relative rounded-2xl bg-[#171821]/90 border border-[#9275FF]/25 p-5 sm:p-6 backdrop-blur-xl shadow-2xl shadow-[#9275FF]/10">
        {/* Subtle accent corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#9275FF]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Dialogue Stream */}
        <p className="text-sm sm:text-base text-[#F5F1E9] leading-relaxed font-sans min-h-[96px]">
          {displayedText}
          {isTyping && (
            <span className="inline-block w-2 h-4 ml-1 bg-[#9275FF] animate-pulse align-middle" />
          )}
        </p>

        {/* Interactive Action Bar */}
        <div className="mt-6 pt-4 border-t border-[#2A2C38] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReplay}
              disabled={isTyping}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#101116] border border-[#2A2C38] text-xs text-[#8E8E93] hover:text-white disabled:opacity-40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>

            {isTyping && (
              <button
                onClick={handleInstantReveal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#101116] border border-[#2A2C38] text-xs text-[#8E8E93] hover:text-white transition-colors"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Show All</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onPlayClick();
                onSkip();
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs text-[#8E8E93] hover:text-white transition-colors"
            >
              Skip
            </button>

            <button
              onClick={() => {
                onPlayClick();
                onContinue();
              }}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9275FF] to-[#7B5BFA] text-white text-xs font-semibold shadow-md shadow-[#9275FF]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
