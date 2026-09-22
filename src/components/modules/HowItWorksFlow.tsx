import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import type { FlowStep } from '../../types';
import { TapButton } from '../ui/TapButton';
import { sound } from '../../lib/sound';

interface HowItWorksFlowProps {
  steps: FlowStep[];
  organName: string;
}

export const HowItWorksFlow: React.FC<HowItWorksFlowProps> = ({ steps, organName }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const step = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (!isLast) {
      sound.playPop();
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      sound.playPop();
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    sound.playPop();
    setCurrentStepIndex(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Simulasi Interaktif
          </span>
          <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
            Alur Cara Kerja {organName}
          </h4>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 cursor-pointer"
          title="Ulangi dari Langkah 1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Step Numbers Indicators */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
        {steps.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;
          return (
            <button
              key={s.step}
              onClick={() => {
                sound.playPop();
                setCurrentStepIndex(idx);
              }}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm cursor-pointer shrink-0 transition-all ${
                isActive
                  ? 'bg-sky-500 text-white scale-110 shadow-md ring-4 ring-sky-100 dark:ring-sky-950'
                  : isPassed
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.step}
            </button>
          );
        })}
      </div>

      {/* Step Active Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="rounded-2xl p-5 bg-gradient-to-br from-sky-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-indigo-950/20 border-2 border-sky-200 dark:border-slate-700 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-xl bg-sky-500 text-white text-xs font-black">
              Langkah {step.step} dari {steps.length}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Alur
            </span>
          </div>

          <h5 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
            {step.title}
          </h5>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {step.description}
          </p>

          {isLast && (
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Hebat! Alur {organName} selesai diproses oleh otak dengan sangat cepat!
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <TapButton
          variant="secondary"
          size="sm"
          disabled={isFirst}
          icon={<ArrowLeft className="w-3.5 h-3.5" />}
          onClick={handlePrev}
        >
          Sebelumnya
        </TapButton>

        {isLast ? (
          <TapButton
            variant="success"
            size="sm"
            icon={<CheckCircle2 className="w-3.5 h-3.5" />}
            onClick={() => {
              sound.playCorrect();
            }}
          >
            Alur Lengkap!
          </TapButton>
        ) : (
          <TapButton
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={handleNext}
          >
            Langkah Selanjutnya
          </TapButton>
        )}
      </div>
    </div>
  );
};
