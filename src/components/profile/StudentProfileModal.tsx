import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, RotateCcw, Check } from 'lucide-react';
import type { UserProgress, StudentProfile } from '../../types';
import { TapButton } from '../ui/TapButton';
import { sound } from '../../lib/sound';

interface StudentProfileModalProps {
  progress: UserProgress;
  onUpdateProfile: (profile: Partial<StudentProfile>) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  progress,
  onUpdateProfile,
  onResetProgress,
  onClose,
}) => {
  const [nameInput, setNameInput] = useState<string>(progress.profile.name);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(progress.profile.avatarId);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const avatars = [
    { id: 'singa', emoji: '🦁', label: 'Singa Cilik' },
    { id: 'burung_hantu', emoji: '🦉', label: 'Burung Hantu' },
    { id: 'kelinci', emoji: '🐰', label: 'Kelinci Lincah' },
    { id: 'kucing', emoji: '🐱', label: 'Kucing Penjelajah' },
    { id: 'beruang', emoji: '🐻', label: 'Beruang Ramah' },
    { id: 'rubah', emoji: '🦊', label: 'Rubah Cerdik' },
  ];

  const handleSave = () => {
    sound.playPop();
    const cleanName = nameInput.trim() || 'Detektif Cilik';
    const chosen = avatars.find((a) => a.id === selectedAvatar) || avatars[0];

    onUpdateProfile({
      name: cleanName.slice(0, 20),
      avatarId: chosen.id,
      avatarEmoji: chosen.emoji,
    });
    onClose();
  };

  const islandBadges = [
    { id: 'mata', name: 'Mata Elang', emoji: '👁️', color: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' },
    { id: 'telinga', name: 'Telinga Emas', emoji: '👂', color: 'border-sky-400 bg-sky-50 dark:bg-sky-950/40' },
    { id: 'lidah', name: 'Lidah Maestro', emoji: '👅', color: 'border-rose-400 bg-rose-50 dark:bg-rose-950/40' },
    { id: 'hidung', name: 'Hidung Pelacak', emoji: '👃', color: 'border-amber-400 bg-amber-50 dark:bg-amber-950/40' },
    { id: 'kulit', name: 'Perisai Kulit', emoji: '✋', color: 'border-violet-400 bg-violet-50 dark:bg-violet-950/40' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-2xl relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>👤 Profil Detektif Cilik</span>
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            Atur nama dan pilih avatar karakter detektif favoritmu!
          </p>
        </div>

        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Nama Panggilan Siswa
          </label>
          <input
            type="text"
            value={nameInput}
            maxLength={20}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Masukkan nama panggilan..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Avatar Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Pilih Avatar Karakter
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {avatars.map((av) => {
              const isSelected = selectedAvatar === av.id;
              return (
                <button
                  key={av.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedAvatar(av.id);
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 scale-105 shadow-sm'
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

        {/* Badges Collection Cabinet */}
        <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Lemari 5 Lencana Pulau</span>
            <span className="text-sky-600 dark:text-sky-400">
              {progress.completedLessons.length}/5 Terkumpul
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {islandBadges.map((badge) => {
              const isEarned = progress.completedLessons.includes(badge.id as any);
              return (
                <div
                  key={badge.id}
                  className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 text-center transition-all ${
                    isEarned
                      ? badge.color
                      : 'border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 opacity-40 grayscale'
                  }`}
                  title={isEarned ? `Lencana ${badge.name} (Terkumpul)` : `Lencana ${badge.name} (Belum)`}
                >
                  <span className="text-xl">{badge.emoji}</span>
                  <span className="text-[9px] font-bold truncate w-full">
                    {badge.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Save Button */}
        <div className="pt-2 flex gap-2">
          <TapButton
            variant="primary"
            size="md"
            icon={<Check className="w-4 h-4" />}
            onClick={handleSave}
            className="w-full"
          >
            Simpan Perubahan
          </TapButton>
        </div>

        {/* Safety Reset Data Section */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-xs text-rose-500 hover:text-rose-700 dark:text-rose-400 font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data & Mulai dari Awal</span>
            </button>
          ) : (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 space-y-2 text-xs">
              <p className="font-bold text-rose-700 dark:text-rose-300">
                Yakin ingin mengosongkan seluruh bintang dan progres belajar?
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    sound.playPop();
                    onResetProgress();
                    setShowResetConfirm(false);
                    onClose();
                  }}
                  className="px-3 py-1 rounded-xl bg-rose-500 text-white font-bold"
                >
                  Ya, Reset Bersih
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
