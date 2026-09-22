import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';
import { sound } from '../../lib/sound';

interface TasteZone {
  id: string;
  name: string;
  locationText: string;
  color: string;
  bgLight: string;
  borderClass: string;
  examples: string[];
  description: string;
  emoji: string;
}

export const TasteMapWidget: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('manis');

  const zones: Record<string, TasteZone> = {
    manis: {
      id: 'manis',
      name: 'Rasa Manis',
      locationText: 'Ujung Depan Lidah',
      color: 'bg-rose-500 text-white',
      bgLight: 'bg-rose-50 dark:bg-rose-950/30',
      borderClass: 'border-rose-300 dark:border-rose-800',
      emoji: '🍉',
      examples: ['Semangka manis', 'Permen buah', 'Madu lezat', 'Kue bolu'],
      description:
        'Ujung lidah adalah area paling peka mendeteksi rasa manis dari gula alami maupun pemanis makanan.',
    },
    asin: {
      id: 'asin',
      name: 'Rasa Asin',
      locationText: 'Sisi Samping Depan Lidah',
      color: 'bg-amber-500 text-white',
      bgLight: 'bg-amber-50 dark:bg-amber-950/30',
      borderClass: 'border-amber-300 dark:border-amber-800',
      emoji: '🧀',
      examples: ['Keju gurih', 'Ikan asin kering', 'Keripik kentang', 'Garam dapur'],
      description:
        'Samping depan lidah sangat sensitif mengenali mineral garam natrium yang dibutuhkan tubuh dalam batas wajar.',
    },
    asam: {
      id: 'asam',
      name: 'Rasa Asam',
      locationText: 'Sisi Samping Belakang Lidah',
      color: 'bg-emerald-500 text-white',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
      borderClass: 'border-emerald-300 dark:border-emerald-800',
      emoji: '🍋',
      examples: ['Buah lemon segar', 'Jeruk nipis', 'Cuka makan', 'Asam jawa'],
      description:
        'Sisi samping belakang lidah langsung merangsang kelenjar liur ketika mendeteksi asam buah alami.',
    },
    pahit: {
      id: 'pahit',
      name: 'Rasa Pahit',
      locationText: 'Pangkal Belakang Lidah',
      color: 'bg-indigo-500 text-white',
      bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
      borderClass: 'border-indigo-300 dark:border-indigo-800',
      emoji: '☕',
      examples: ['Kopi hitam tanpa gula', 'Sayur pare', 'Obat tablet', 'Jamu tradisional'],
      description:
        'Pangkal lidah sangat peka rasa pahit sebagai alarm pertahanan alami tubuh terhadap racun di alam.',
    },
  };

  const current = zones[selectedZone];

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 space-y-5">
      <div className="text-center space-y-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Peta Interaktif Rasa Lidah
        </span>
        <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
          Sentuh Bagian Lidah untuk Mengetahui Kepekaan Rasa!
        </h4>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          Lidah memiliki zona yang lebih dominan dalam merasakan cita rasa tertentu.
        </p>
      </div>

      {/* Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.values(zones).map((z) => {
          const isSelected = selectedZone === z.id;
          return (
            <button
              key={z.id}
              onClick={() => {
                sound.playPop();
                setSelectedZone(z.id);
              }}
              className={`p-2.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1 transition-all cursor-pointer select-none ${
                isSelected
                  ? `${z.color} border-transparent shadow-md scale-102`
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">{z.emoji}</span>
              <span>{z.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`rounded-2xl p-4 sm:p-5 border-2 ${current.bgLight} ${current.borderClass} space-y-3`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{current.emoji}</span>
              <div>
                <h5 className="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                  {current.name}
                </h5>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  📍 Lokasi Paling Peka: {current.locationText}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 text-[11px] font-bold shadow-xs">
              Zona Sensitif
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {current.description}
          </p>

          <div className="pt-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Contoh Makanan & Minuman:
            </span>
            <div className="flex flex-wrap gap-2">
              {current.examples.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scientific Myth Buster Callout */}
      <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3.5 flex items-start gap-3 text-xs">
        <div className="p-1.5 rounded-xl bg-amber-500 text-white shrink-0">
          <Flame className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h6 className="font-bold text-amber-900 dark:text-amber-200">
            Fakta Ilmiah: Mengapa Pedas Bukan Termasuk Rasa?
          </h6>
          <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
            Pedas bukan rasa primer! Sensasi pedas berasal dari zat capsaicin pada cabai yang merangsang reseptor panas dan nyeri di lidah, lalu mengirim sinyal "panas terbakar" ke otak kita.
          </p>
        </div>
      </div>
    </div>
  );
};
