import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Award } from 'lucide-react';
import type { UserProgress } from '../../types';
import { TapButton } from '../ui/TapButton';
import { sound } from '../../lib/sound';

interface HeroBannerProps {
  progress: UserProgress;
  onExploreModules: () => void;
  onStartExam: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  progress,
  onExploreModules,
  onStartExam,
}) => {
  const completedCount = progress.lessonCompleted.length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-teal-950 text-white p-5 sm:p-7 shadow-xl border-2 border-amber-400/20"
    >
      {/* Background playful glowing elements */}
      <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white border border-white/20">
            <span>{progress.profile.avatarEmoji}</span>
            <span>{progress.profile.name ? `Detektif ${progress.profile.name}` : 'Detektif Pancaindra'}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{progress.stars} Bintang</span>
          </span>
        </div>

        {/* Title and Tagline */}
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight flex items-center gap-2 flex-wrap">
            <span>Pecahkan Misteri 5 Keajaiban Tubuh!</span>
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
            Selamat datang di Markas Detektif Pancaindra. Selesaikan 5 modul dan raih penghargaan di Arena Ujian Master!
          </p>
        </div>

        {/* Progress Bar (Living Bar) */}
        <div className="bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-white/90">
            <span>Misi Penjelajahan Pulau</span>
            <span>
              {completedCount}/5 Selesai ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber-300 to-emerald-400 rounded-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-1 flex flex-wrap gap-2.5">
          <TapButton
            variant="amber"
            size="md"
            icon={<Compass className="w-4 h-4" />}
            onClick={() => { sound.playPop(); onExploreModules(); }}
          >
            Jelajahi 5 Pulau
          </TapButton>
          <TapButton
            variant="secondary"
            size="md"
            icon={<Award className="w-4 h-4 text-amber-500" />}
            onClick={() => { sound.playPop(); onStartExam(); }}
            className="text-slate-800 dark:text-slate-100"
          >
            Arena Ujian Master
          </TapButton>
        </div>
      </div>
    </motion.div>
  );
};
