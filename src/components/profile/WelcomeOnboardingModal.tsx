import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import { TapButton } from '../ui/TapButton';
import { sound } from '../../lib/sound';
import { triggerConfetti } from '../../lib/confetti';

interface WelcomeOnboardingModalProps {
  onComplete: (name: string, avatarId: string, avatarEmoji: string) => void;
}

export const WelcomeOnboardingModal: React.FC<WelcomeOnboardingModalProps> = ({
  onComplete,
}) => {
  const [nameInput, setNameInput] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('singa');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const avatars = [
    { id: 'singa', emoji: '🦁', label: 'Singa Cilik' },
    { id: 'burung_hantu', emoji: '🦉', label: 'Burung Hantu' },
    { id: 'kelinci', emoji: '🐰', label: 'Kelinci Lincah' },
    { id: 'kucing', emoji: '🐱', label: 'Kucing Cerdik' },
    { id: 'beruang', emoji: '🐻', label: 'Beruang Ramah' },
    { id: 'rubah', emoji: '🦊', label: 'Rubah Penjelajah' },
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = nameInput.trim();
    if (!trimmed) {
      setErrorMessage('Tuliskan nama panggilanmu dulu ya!');
      sound.playWrong();
      return;
    }

    if (trimmed.length < 2) {
      setErrorMessage('Nama panggilan minimal 2 huruf.');
      sound.playWrong();
      return;
    }

    const chosen = avatars.find((a) => a.id === selectedAvatar) || avatars[0];
    sound.playFanfare();
    triggerConfetti();
    onComplete(trimmed.slice(0, 20), chosen.id, chosen.emoji);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-700/80 p-6 sm:p-7 space-y-5 shadow-2xl relative my-8"
      >
        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center text-white shadow-md">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-black tracking-wider uppercase text-amber-600 dark:text-amber-400">
              Markas Detektif IPAS SD
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">
              Selamat Datang, Calon Detektif!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
              Kenalkan dirimu dulu yuk, agar lencana pulau dan sertifikat ujian nanti tercetak atas namamu sendiri!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Nama Panggilan Siswa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={nameInput}
              maxLength={20}
              onChange={(e) => {
                setNameInput(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Contoh: Aisyah, Budi, Farhan..."
              className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 font-bold text-sm text-slate-800 dark:text-white focus:outline-none transition-colors ${
                errorMessage
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-200 dark:border-slate-700 focus:border-sky-500'
              }`}
            />
            {errorMessage && (
              <p className="text-xs font-bold text-rose-500 animate-shake">
                {errorMessage}
              </p>
            )}
          </div>

          {/* Avatar Choices */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Pilih Karakter Detektifmu
            </label>
            <div className="grid grid-cols-3 gap-2">
              {avatars.map((av) => {
                const isSelected = selectedAvatar === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setSelectedAvatar(av.id);
                    }}
                    className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 scale-105 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-2xl">{av.emoji}</span>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight text-center">
                      {av.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Submit */}
          <div className="pt-2">
            <TapButton
              type="submit"
              variant="amber"
              size="lg"
              icon={<Sparkles className="w-4 h-4" />}
              className="w-full"
            >
              Mulai Petualangan Sekarang!
            </TapButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
