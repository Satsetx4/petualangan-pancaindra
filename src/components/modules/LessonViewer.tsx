import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Eye,
  Activity,
  HeartPulse,
  Lightbulb,
} from 'lucide-react';
import type { SenseModule, TabType } from '../../types';
import { BadgePill } from '../ui/BadgePill';
import { TapButton } from '../ui/TapButton';
import { HowItWorksFlow } from './HowItWorksFlow';
import { TasteMapWidget } from './TasteMapWidget';
import { sound } from '../../lib/sound';

interface LessonViewerProps {
  module: SenseModule;
  isCompleted: boolean;
  onCompleteLesson: () => void;
  onStartQuiz: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  module,
  isCompleted,
  onCompleteLesson,
  onStartQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('anatomy');

  const tabs = [
    { id: 'anatomy' as TabType, label: 'Anatomi', icon: Eye },
    { id: 'flow' as TabType, label: 'Alur Kerja', icon: Activity },
    { id: 'facts' as TabType, label: 'Fakta Unik', icon: Lightbulb },
    { id: 'care' as TabType, label: 'Rawat Organ', icon: HeartPulse },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Module Navigation & Title Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl border-2 p-5 sm:p-7 bg-gradient-to-br ${module.themeColor.bg} ${module.themeColor.border} space-y-4 shadow-sm`}
      >
        <div className="flex items-center justify-end">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Modul Telah Dipelajari</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-400 text-slate-900 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Belum Selesai</span>
            </span>
          )}
        </div>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white dark:bg-slate-900 shadow-md flex items-center justify-center text-4xl sm:text-5xl shrink-0 border border-slate-200/60 dark:border-slate-800">
            {module.heroEmoji}
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Pulau {module.nickname}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight">
              {module.name}{' '}
              <span className="text-sm font-semibold italic text-slate-700 dark:text-slate-300">
                ({module.latinName})
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
              {module.mainFunction}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-white/50 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {module.overviewText}
        </div>
      </motion.div>

      {/* Tabs Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id);
              }}
              className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer select-none min-h-[48px] ${
                isActive
                  ? 'bg-sky-500 text-white border-sky-600 shadow-md scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Anatomi Organ */}
      {activeTab === 'anatomy' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Bagian Luar */}
          {module.anatomy.outer && module.anatomy.outer.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-500" />
                <h4 className="text-base font-black text-slate-800 dark:text-slate-100">
                  Bagian Luar {module.name}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {module.anatomy.outer.map((part, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800/80 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                        {part.name}
                      </span>
                      {part.badge && (
                        <BadgePill size="sm" colorClass="bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200">
                          {part.badge}
                        </BadgePill>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {part.function}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bagian Dalam */}
          {module.anatomy.inner && module.anatomy.inner.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                <h4 className="text-base font-black text-slate-800 dark:text-slate-100">
                  Bagian Dalam {module.name}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {module.anatomy.inner.map((part, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800/80 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                        {part.name}
                      </span>
                      {part.badge && (
                        <BadgePill size="sm" colorClass="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200">
                          {part.badge}
                        </BadgePill>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {part.function}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Tab 2: Alur Kerja & Simulasi */}
      {activeTab === 'flow' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Interactive Tongue Map for Lidah */}
          {module.id === 'lidah' && <TasteMapWidget />}

          {/* Step-by-Step Flow Simulation */}
          <HowItWorksFlow steps={module.flowSteps} organName={module.name} />
        </motion.div>
      )}

      {/* Tab 3: Fakta Unik */}
      {activeTab === 'facts' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {module.funFacts.map((fact, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-3xl border-2 space-y-2.5 ${
                  fact.isMythBuster
                    ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
                    : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {fact.isMythBuster ? '🔥' : '💡'}
                  </span>
                  <h5 className="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                    {fact.title}
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {fact.fact}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab 4: Rawat Organ (Tips Dokter Cilik) */}
      {activeTab === 'care' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-medium">
            🌟 <strong>Misi Dokter Cilik:</strong> Terapkan panduan di bawah ini setiap hari agar {module.name} selalu sehat dan berfungsi dengan prima!
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {module.healthTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800/80 shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                    {idx + 1}. {tip.title}
                  </h5>
                  {tip.rule && (
                    <BadgePill size="sm" colorClass="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200">
                      {tip.rule}
                    </BadgePill>
                  )}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-16 sm:bottom-4 z-30 p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg flex flex-wrap items-center justify-between gap-2.5">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Sudah selesai mempelajari materi ini?
        </div>
        <div className="flex items-center gap-2">
          {!isCompleted && (
            <TapButton
              variant="secondary"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
              onClick={() => {
                sound.playStar();
                onCompleteLesson();
              }}
            >
              Tandai Selesai (+⭐)
            </TapButton>
          )}
          <TapButton
            variant="amber"
            size="sm"
            icon={<HelpCircle className="w-3.5 h-3.5" />}
            onClick={() => {
              sound.playPop();
              onStartQuiz();
            }}
          >
            Ikuti Kuis Pulau
          </TapButton>
        </div>
      </div>
    </div>
  );
};
