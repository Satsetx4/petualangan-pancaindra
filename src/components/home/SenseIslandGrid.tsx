import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import { SENSES_MODULES } from '../../data/sensesData';
import type { SenseType, UserProgress } from '../../types';
import { TapButton } from '../ui/TapButton';
import { sound } from '../../lib/sound';

interface SenseIslandGridProps {
  progress: UserProgress;
  onSelectSense: (senseId: SenseType) => void;
  onStartQuiz: (senseId: SenseType) => void;
}

export const SenseIslandGrid: React.FC<SenseIslandGridProps> = ({
  progress,
  onSelectSense,
  onStartQuiz,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>🏝️ 5 Pulau Keajaiban Tubuh</span>
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            Pilih pulau untuk mempelajari anatomi, alur kerja, dan ikuti kuis serunya!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SENSES_MODULES.map((sense, idx) => {
          const isCompleted = progress.completedLessons.includes(sense.id);
          const bestScore = progress.quizBestScores[sense.id];

          return (
            <motion.div
              key={sense.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-3xl border-2 p-5 transition-all shadow-sm hover:shadow-md bg-gradient-to-br ${sense.themeColor.bg} ${sense.themeColor.border} relative overflow-hidden`}
            >
              {/* Completed island badge tag */}
              {isCompleted && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selesai</span>
                </div>
              )}

              <div className="space-y-3">
                {/* Header emoji and names */}
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-md flex items-center justify-center text-3xl shrink-0 border border-slate-100 dark:border-slate-800">
                    {sense.heroEmoji}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Pulau {sense.nickname}
                    </span>
                    <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">
                      {sense.name}
                    </h4>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 italic">
                      {sense.latinName}
                    </p>
                  </div>
                </div>

                {/* Main description */}
                <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {sense.mainFunction}
                </p>

                {/* Score badge if played */}
                {bestScore !== undefined && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Skor Kuis Terbaik: {bestScore}%</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <TapButton
                    variant="primary"
                    size="sm"
                    icon={<BookOpen className="w-3.5 h-3.5" />}
                    onClick={() => {
                      sound.playPop();
                      onSelectSense(sense.id);
                    }}
                    className="w-full"
                  >
                    Buka Modul
                  </TapButton>
                  <TapButton
                    variant="secondary"
                    size="sm"
                    icon={<HelpCircle className="w-3.5 h-3.5 text-sky-500" />}
                    onClick={() => {
                      sound.playPop();
                      onStartQuiz(sense.id);
                    }}
                    className="w-full"
                  >
                    Kuis Bab
                  </TapButton>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
