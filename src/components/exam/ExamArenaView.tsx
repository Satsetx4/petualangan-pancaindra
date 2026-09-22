import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Pause,
  Play,
  CheckCircle2,
  Send,
} from 'lucide-react';
import type { QuizQuestion } from '../../types';
import { TapButton } from '../ui/TapButton';
import { sound } from '../../lib/sound';

interface ExamArenaViewProps {
  questions: QuizQuestion[];
  onFinishExam: (answers: Record<number, number>, timeSpent: number) => void;
  onExit: () => void;
}

export const ExamArenaView: React.FC<ExamArenaViewProps> = ({
  questions,
  onFinishExam,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  // Timer countdown
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    sound.playPop();
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleSubmitExam = () => {
    sound.playFanfare();
    const timeSpent = 15 * 60 - timeLeft;
    onFinishExam(answers, timeSpent);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-16">
      {/* Header Bar: Pause/Play, Timer, Exit */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-2 shadow-sm">
        <button
          onClick={() => {
            sound.playPop();
            onExit();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs min-h-[44px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar</span>
        </button>

        {/* Timer Box */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl border font-mono font-black text-sm ${
              timeLeft < 180
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-600'
                : 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 text-sky-700 dark:text-sky-300'
            }`}
          >
            <Clock className="w-4 h-4 animate-pulse" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setIsPaused(!isPaused);
            }}
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
            title={isPaused ? 'Lanjutkan Timer' : 'Jeda Timer'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-500" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        {/* Submit Button */}
        <TapButton
          variant="success"
          size="sm"
          icon={<Send className="w-3.5 h-3.5" />}
          onClick={() => setShowSubmitConfirm(true)}
        >
          Kirim Ujian
        </TapButton>
      </div>

      {/* Paused Overlay Alert */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-3xl bg-amber-500 text-white text-center space-y-3 shadow-lg"
        >
          <h4 className="text-xl font-black">⏸️ Ujian Sedang Dijeda</h4>
          <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto">
            Waktu istirahat sejenak! Tarik napas atau minum air dulu. Klik tombol di bawah saat siap melanjutkan.
          </p>
          <TapButton
            variant="secondary"
            size="md"
            icon={<Play className="w-4 h-4" />}
            onClick={() => setIsPaused(false)}
            className="text-slate-900"
          >
            Lanjutkan Ujian
          </TapButton>
        </motion.div>
      )}

      {/* Main Question Arena */}
      {!isPaused && (
        <div className="space-y-5">
          {/* Question Navigator Grid */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Nomor Soal Ujian ({answeredCount}/{total} Terjawab)</span>
              <span>Soal {currentIndex + 1}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playPop();
                      setCurrentIndex(idx);
                    }}
                    className={`w-8 h-8 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-110 shadow-xs'
                        : isAnswered
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Body */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-black">
                Soal Nomor {currentIndex + 1}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 capitalize">
                Materi: {currentQuestion.senseId}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">
              {currentQuestion.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = answers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 min-h-[52px] cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-100 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                          isSelected
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation Next/Prev */}
            <div className="flex items-center justify-between pt-2">
              <TapButton
                variant="secondary"
                size="sm"
                disabled={currentIndex === 0}
                icon={<ArrowLeft className="w-3.5 h-3.5" />}
                onClick={() => {
                  sound.playPop();
                  setCurrentIndex((prev) => prev - 1);
                }}
              >
                Sebelumnya
              </TapButton>

              {currentIndex < total - 1 ? (
                <TapButton
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => {
                    sound.playPop();
                    setCurrentIndex((prev) => prev + 1);
                  }}
                >
                  Berikutnya
                </TapButton>
              ) : (
                <TapButton
                  variant="success"
                  size="sm"
                  icon={<Send className="w-3.5 h-3.5" />}
                  onClick={() => setShowSubmitConfirm(true)}
                >
                  Selesai & Kirim
                </TapButton>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Before Submit */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-3xl bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-3xl">
              📝
            </div>
            <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">
              Kirim Jawaban Ujian Sekarang?
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Kamu sudah menjawab <strong>{answeredCount}</strong> dari {total} soal.
              {answeredCount < total && (
                <span className="text-rose-500 font-bold block mt-1">
                  Masih ada {total - answeredCount} soal yang belum dijawab lho!
                </span>
              )}
            </p>

            <div className="flex gap-2.5 pt-2">
              <TapButton
                variant="secondary"
                size="md"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1"
              >
                Periksa Lagi
              </TapButton>
              <TapButton
                variant="success"
                size="md"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={handleSubmitExam}
                className="flex-1"
              >
                Ya, Kirim!
              </TapButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
