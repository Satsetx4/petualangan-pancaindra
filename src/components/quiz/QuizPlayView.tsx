import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import type { QuizQuestion, SenseType } from '../../types';
import { TapButton } from '../ui/TapButton';
import { sound } from '../../lib/sound';
import { triggerConfetti, triggerGrandCelebration } from '../../lib/confetti';

interface QuizPlayViewProps {
  senseId: SenseType;
  organName: string;
  heroEmoji: string;
  questions: QuizQuestion[];
  onFinishQuiz: (scorePercent: number, starsEarned: number) => void;
  onBack: () => void;
}

export const QuizPlayView: React.FC<QuizPlayViewProps> = ({
  senseId: _senseId,
  organName,
  heroEmoji,
  questions,
  onFinishQuiz,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const question = questions[currentIndex];
  const total = questions.length;
  const isCorrect = selectedOption === question?.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === question.correctIndex) {
      sound.playCorrect();
      triggerConfetti();
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished
      const finalCorrect = isCorrect ? correctCount : correctCount;
      const scorePercent = Math.round((finalCorrect / total) * 100);
      const stars = scorePercent >= 80 ? 2 : scorePercent >= 40 ? 1 : 0;

      setIsFinished(true);
      sound.playFanfare();
      triggerGrandCelebration();
      onFinishQuiz(scorePercent, stars);
    }
  };

  const handleRetry = () => {
    sound.playPop();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  // Final summary screen for quiz
  if (isFinished) {
    const finalScore = Math.round((correctCount / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6"
      >
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-4xl shadow-inner border border-amber-300">
          🏆
        </div>

        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Kuis {organName} Selesai!
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
            {finalScore >= 80
              ? 'Luar Biasa, Detektif Hebat!'
              : finalScore >= 60
              ? 'Bagus Sekali, Terus Berlatih!'
              : 'Semangat, Coba Lagi Yuk!'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Kamu berhasil menjawab <strong>{correctCount}</strong> dari {total} soal dengan tepat.
          </p>
        </div>

        {/* Score & Stars Box */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center justify-around">
          <div>
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">
              Nilai Akhir
            </span>
            <span className="text-3xl font-black text-amber-800 dark:text-amber-400">
              {finalScore}%
            </span>
          </div>
          <div className="h-10 w-px bg-amber-200 dark:bg-amber-800" />
          <div>
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">
              Bonus Bintang
            </span>
            <span className="text-2xl font-black text-amber-800 dark:text-amber-400 flex items-center gap-1 justify-center">
              ⭐ {finalScore >= 80 ? '+2' : finalScore >= 40 ? '+1' : '+0'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 justify-center pt-2">
          <TapButton
            variant="secondary"
            size="md"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={handleRetry}
          >
            Ulangi Kuis
          </TapButton>
          <TapButton
            variant="primary"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={onBack}
          >
            Kembali ke Modul
          </TapButton>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-12">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playPop();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs min-h-[44px] cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar Kuis</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xl">{heroEmoji}</span>
          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300">
            Kuis {organName}
          </span>
        </div>
      </div>

      {/* Progress meter */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Soal {currentIndex + 1} dari {total}</span>
          <span>{Math.round(((currentIndex + 1) / total) * 100)}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6"
        >
          <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">
            {question.question}
          </h4>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {question.options.map((option, idx) => {
              const isChosen = selectedOption === idx;
              const isTargetCorrect = idx === question.correctIndex;

              let btnStyle =
                'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700';

              if (isAnswered) {
                if (isTargetCorrect) {
                  btnStyle =
                    'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-black shadow-xs';
                } else if (isChosen && !isTargetCorrect) {
                  btnStyle =
                    'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800 dark:text-rose-200 font-bold';
                } else {
                  btnStyle =
                    'bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 min-h-[52px] cursor-pointer select-none ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isAnswered && isTargetCorrect
                          ? 'bg-emerald-500 text-white'
                          : isAnswered && isChosen
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>

                  {isAnswered && isTargetCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isAnswered && isChosen && !isTargetCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Guiding Feedback Drawer */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`rounded-2xl p-4 sm:p-5 border-2 space-y-2 ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                  : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{isCorrect ? '🎉' : '💡'}</span>
                <h5 className="font-black text-sm">
                  {isCorrect ? 'Jawabanmu Tepat Sekali!' : 'Yuk, Simak Pembahasannya!'}
                </h5>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed">
                {question.explanation}
              </p>

              {question.funFactSnippet && (
                <div className="pt-1.5 border-t border-current/10 text-xs italic opacity-90">
                  ✨ <strong>Wawasan Seru:</strong> {question.funFactSnippet}
                </div>
              )}
            </motion.div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <TapButton
                variant={isCorrect ? 'success' : 'amber'}
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={handleNext}
              >
                {currentIndex < total - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}
              </TapButton>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
