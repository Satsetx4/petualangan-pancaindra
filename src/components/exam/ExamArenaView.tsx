import React, { useEffect, useRef, useState } from 'react';
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
import { AccessibleDialog } from '../ui/AccessibleDialog';
import { sound } from '../../lib/sound';

export const EXAM_DURATION_SECONDS = 15 * 60;

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [isPaused, setIsPaused] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const answersRef = useRef(answers);
  const timeLeftRef = useRef(timeLeft);
  const submittedRef = useRef(false);
  const onFinishExamRef = useRef(onFinishExam);
  const submitExamRef = useRef<() => void>(() => undefined);
  answersRef.current = answers;
  timeLeftRef.current = timeLeft;
  onFinishExamRef.current = onFinishExam;

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  const submitExam = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setIsSubmitted(true);
    sound.playFanfare();
    onFinishExamRef.current(
      answersRef.current,
      EXAM_DURATION_SECONDS - timeLeftRef.current,
    );
  };
  submitExamRef.current = submitExam;

  // The interval only updates the countdown. Submission observes timeLeft separately.
  useEffect(() => {
    if (isPaused || showSubmitConfirm || showExitConfirm || isSubmitted || timeLeft === 0) return;

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        const next = Math.max(0, previous - 1);
        timeLeftRef.current = next;
        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPaused, showSubmitConfirm, showExitConfirm, isSubmitted, timeLeft === 0]);

  useEffect(() => {
    if (timeLeft === 0 && !submittedRef.current) submitExamRef.current();
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const selectOption = (optionIndex: number) => {
    if (isSubmitted || !currentQuestion) return;
    sound.playPop();
    const nextAnswers = { ...answersRef.current, [currentIndex]: optionIndex };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
  };

  if (total === 0 || !currentQuestion) {
    return (
      <div className="max-w-xl mx-auto rounded-3xl p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Soal ujian belum tersedia</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">Silakan kembali dan coba lagi nanti.</p>
        <TapButton variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} onClick={onExit}>
          Kembali
        </TapButton>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-16">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-2 shadow-sm">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setShowExitConfirm(true);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm min-h-[44px] cursor-pointer"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
          <span>Keluar</span>
        </button>

        <div className="flex items-center gap-2">
          <div
            role="timer"
            aria-label={`Sisa waktu ${formatTime(timeLeft)}`}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border font-mono font-black text-sm ${
              timeLeft < 180
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-600'
                : 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 text-sky-700 dark:text-sky-300'
            }`}
          >
            <Clock aria-hidden="true" className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setIsPaused((paused) => !paused);
            }}
            className="w-11 h-11 rounded-2xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
            aria-label={isPaused ? 'Lanjutkan timer ujian' : 'Jeda timer ujian'}
          >
            {isPaused ? <Play aria-hidden="true" className="w-4 h-4 text-emerald-500" /> : <Pause aria-hidden="true" className="w-4 h-4" />}
          </button>
        </div>

        <TapButton
          variant="success"
          size="sm"
          icon={<Send aria-hidden="true" className="w-4 h-4" />}
          onClick={() => { sound.playPop(); setShowSubmitConfirm(true); }}
        >
          Kirim Ujian
        </TapButton>
      </div>

      {isPaused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-3xl bg-amber-500 text-white text-center space-y-3 shadow-lg"
        >
          <h4 className="text-xl font-black">⏸️ Ujian Sedang Dijeda</h4>
          <p className="text-sm text-white/90 max-w-md mx-auto">
            Klik tombol di bawah saat siap melanjutkan.
          </p>
          <TapButton
            variant="secondary"
            size="md"
            icon={<Play aria-hidden="true" className="w-4 h-4" />}
            onClick={() => setIsPaused(false)}
            className="text-slate-900"
          >
            Lanjutkan Ujian
          </TapButton>
        </motion.div>
      )}

      {!isPaused && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 space-y-3">
            <div className="flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
              <span>Nomor Soal Ujian ({answeredCount}/{total} Terjawab)</span>
              <span>Soal {currentIndex + 1}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;
                const isCurrent = index === currentIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Soal nomor ${index + 1}${isAnswered ? ', sudah dijawab' : ', belum dijawab'}`}
                    aria-current={isCurrent ? 'step' : undefined}
                    onClick={() => {
                      sound.playPop();
                      setCurrentIndex(index);
                    }}
                    className={`w-10 h-10 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-105 shadow-xs'
                        : isAnswered
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-sm font-black">
                Soal Nomor {currentIndex + 1}
              </span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 capitalize">
                Materi: {currentQuestion.senseId}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">
              {currentQuestion.question}
            </h4>

            <div className="space-y-2.5">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = answers[currentIndex] === optionIndex;
                return (
                  <button
                    key={`${currentQuestion.id}-${optionIndex}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectOption(optionIndex)}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex items-center justify-between gap-3 min-h-[52px] cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-100 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span aria-hidden="true" className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${isSelected ? 'bg-sky-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span>{option}</span>
                    </span>
                    {isSelected && <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-sky-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <TapButton
                variant="secondary"
                size="sm"
                disabled={currentIndex === 0}
                icon={<ArrowLeft aria-hidden="true" className="w-4 h-4" />}
                onClick={() => {
                  sound.playPop();
                  setCurrentIndex((index) => Math.max(0, index - 1));
                }}
              >
                Sebelumnya
              </TapButton>

              {currentIndex < total - 1 ? (
                <TapButton
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight aria-hidden="true" className="w-4 h-4" />}
                  onClick={() => {
                    sound.playPop();
                    setCurrentIndex((index) => Math.min(total - 1, index + 1));
                  }}
                >
                  Berikutnya
                </TapButton>
              ) : (
                <TapButton
                  variant="success"
                  size="sm"
                  icon={<Send aria-hidden="true" className="w-4 h-4" />}
                  onClick={() => { sound.playPop(); setShowSubmitConfirm(true); }}
                >
                  Selesai & Kirim
                </TapButton>
              )}
            </div>
          </div>
        </div>
      )}

      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <AccessibleDialog labelledBy="exam-submit-title" onDismiss={() => setShowSubmitConfirm(false)} className="max-w-md w-full">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-center">
              <div aria-hidden="true" className="w-16 h-16 mx-auto rounded-3xl bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-3xl">📝</div>
              <h4 id="exam-submit-title" className="text-xl font-black text-slate-800 dark:text-slate-100">
                Kirim Jawaban Ujian Sekarang?
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Kamu sudah menjawab <strong>{answeredCount}</strong> dari {total} soal.
                {answeredCount < total && (
                  <span className="text-rose-600 dark:text-rose-300 font-bold block mt-1">
                    Masih ada {total - answeredCount} soal yang belum dijawab.
                  </span>
                )}
              </p>
              <div className="flex gap-2.5 pt-2">
                <TapButton variant="secondary" size="md" onClick={() => setShowSubmitConfirm(false)} className="flex-1">
                  Periksa Lagi
                </TapButton>
                <TapButton
                  variant="success"
                  size="md"
                  icon={<CheckCircle2 aria-hidden="true" className="w-4 h-4" />}
                  onClick={submitExam}
                  className="flex-1"
                >
                  Ya, Kirim!
                </TapButton>
              </div>
            </div>
          </AccessibleDialog>
        </div>
      )}

      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <AccessibleDialog labelledBy="exam-exit-title" describedBy="exam-exit-description" onDismiss={() => setShowExitConfirm(false)} className="max-w-md w-full">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-center">
              <h4 id="exam-exit-title" className="text-xl font-black text-slate-800 dark:text-slate-100">Keluar dari ujian?</h4>
              <p id="exam-exit-description" className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Jawaban yang sudah dikerjakan pada sesi ini akan hilang.
              </p>
              <div className="flex gap-2.5 pt-2">
                <TapButton variant="secondary" size="md" onClick={() => setShowExitConfirm(false)} className="flex-1">
                  Lanjut Ujian
                </TapButton>
                <TapButton
                  variant="danger"
                  size="md"
                  icon={<ArrowLeft aria-hidden="true" className="w-4 h-4" />}
                  onClick={onExit}
                  className="flex-1"
                >
                  Keluar Ujian
                </TapButton>
              </div>
            </div>
          </AccessibleDialog>
        </div>
      )}
    </div>
  );
};
