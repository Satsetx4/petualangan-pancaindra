import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';
import { sound } from '../../lib/sound';

const TASTES = [
  {
    id: 'manis',
    name: 'Manis',
    emoji: '🍉',
    color: 'bg-rose-500 text-white',
    background: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-300 dark:border-rose-800',
    examples: 'Buah matang, madu, dan beberapa kue.',
  },
  {
    id: 'asin',
    name: 'Asin',
    emoji: '🧂',
    color: 'bg-amber-500 text-white',
    background: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-300 dark:border-amber-800',
    examples: 'Garam dan makanan yang dibumbui garam.',
  },
  {
    id: 'asam',
    name: 'Asam',
    emoji: '🍋',
    color: 'bg-emerald-500 text-white',
    background: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-300 dark:border-emerald-800',
    examples: 'Lemon, jeruk nipis, dan yogurt tawar.',
  },
  {
    id: 'pahit',
    name: 'Pahit',
    emoji: '☕',
    color: 'bg-indigo-500 text-white',
    background: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-indigo-300 dark:border-indigo-800',
    examples: 'Kopi tanpa gula dan beberapa sayuran seperti pare.',
  },
  {
    id: 'umami',
    name: 'Umami (gurih)',
    emoji: '🍄',
    color: 'bg-sky-600 text-white',
    background: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-sky-300 dark:border-sky-800',
    examples: 'Kaldu, jamur, tomat matang, dan keju.',
  },
] as const;

export const TasteMapWidget: React.FC = () => {
  const [selectedTasteId, setSelectedTasteId] = useState<string>('manis');
  const current = TASTES.find((taste) => taste.id === selectedTasteId) ?? TASTES[0];

  return (
    <section
      aria-labelledby="taste-widget-title"
      className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 space-y-5"
    >
      <div className="text-center space-y-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-sm font-bold">
          <Sparkles aria-hidden="true" className="w-4 h-4" />
          Lima Rasa Dasar
        </span>
        <h4 id="taste-widget-title" className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
          Mengenal 5 Rasa Dasar
        </h4>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pilih rasa untuk melihat contoh makanan. Kuncup pengecap di berbagai bagian lidah dapat mengenali berbagai rasa.
        </p>
      </div>

      <div role="group" aria-label="Pilih rasa dasar" className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {TASTES.map((taste) => {
          const isSelected = current.id === taste.id;
          return (
            <button
              key={taste.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                sound.playPop();
                setSelectedTasteId(taste.id);
              }}
              className={`p-3 rounded-2xl border-2 font-bold text-sm flex flex-col items-center gap-1 transition-all cursor-pointer select-none min-h-20 ${
                isSelected
                  ? `${taste.color} border-transparent shadow-md scale-[1.02]`
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <span aria-hidden="true" className="text-2xl">{taste.emoji}</span>
              <span>{taste.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          aria-live="polite"
          className={`rounded-2xl p-4 sm:p-5 border-2 ${current.background} ${current.border} space-y-2`}
        >
          <h5 className="font-black text-slate-800 dark:text-slate-100 text-base">
            {current.emoji} Rasa {current.name}
          </h5>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Contoh: {current.examples}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 flex items-start gap-3 text-sm">
        <div aria-hidden="true" className="p-1.5 rounded-xl bg-amber-500 text-white shrink-0">
          <Flame className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h6 className="font-bold text-amber-900 dark:text-amber-200">
            Pedas adalah sensasi, bukan rasa dasar
          </h6>
          <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
            Zat capsaicin pada cabai menimbulkan sensasi panas atau terbakar di mulut. Itu berbeda dari lima rasa dasar.
          </p>
        </div>
      </div>
    </section>
  );
};
