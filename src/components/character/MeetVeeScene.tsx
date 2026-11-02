import { useState, useEffect } from 'react';
import { VeeCharacterCanvas } from './VeeCharacterCanvas';
import { VeeFallback } from './VeeFallback';
import { VeeSpeechBox } from './VeeSpeechBox';

interface MeetVeeSceneProps {
  onContinue: () => void;
  onSkip: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlayTypeClick: () => void;
  onPlayClick: () => void;
}

export function MeetVeeScene({
  onContinue,
  onSkip,
  soundEnabled,
  onToggleSound,
  onPlayTypeClick,
  onPlayClick,
}: MeetVeeSceneProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  return (
    <div id="meet-vee" className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Scene Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171821] border border-[#9275FF]/30 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#9275FF] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#D9CEFF]">
            Scene 02 • Meet Your Interactive Guide
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
          Meet VEE<span className="text-[#9275FF]">.</span>
        </h2>
      </div>

      {/* Balanced Two-Column Stage Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 3D Character Canvas or Vector Fallback */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          {/* Stage floor spotlight aura */}
          <div className="absolute -bottom-8 w-72 h-16 bg-[#9275FF]/20 rounded-full blur-2xl pointer-events-none" />

          {hasWebGL ? (
            <VeeCharacterCanvas isSpeaking={isSpeaking} />
          ) : (
            <VeeFallback isSpeaking={isSpeaking} />
          )}
        </div>

        {/* Right Column: Speech Panel */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <VeeSpeechBox
            onContinue={onContinue}
            onSkip={onSkip}
            onSpeechStateChange={setIsSpeaking}
            soundEnabled={soundEnabled}
            onToggleSound={onToggleSound}
            onPlayTypeClick={onPlayTypeClick}
            onPlayClick={onPlayClick}
          />
        </div>
      </div>
    </div>
  );
}
