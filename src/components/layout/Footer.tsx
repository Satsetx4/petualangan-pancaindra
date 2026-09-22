import React from 'react';
import { RotateCcw, Heart } from 'lucide-react';
import { sound } from '../../lib/sound';

interface FooterProps {
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetData }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 px-4 text-center pb-24 sm:pb-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
          <span>🔍 Petualangan Pancaindra</span>
          <span>•</span>
          <span>IPAS SD Kelas 4–6</span>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          Materi bersumber dari Catatan IPAS Pancaindra. Menjaga dan merawat 5 indra adalah bentuk rasa syukur atas anugerah luar biasa tubuh kita!
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
          <button
            onClick={() => {
              sound.playPop();
              onResetData();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950/40 dark:text-slate-400 dark:hover:text-rose-300 font-semibold cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai dari Awal (Reset Data)</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1">
          <span>Dibuat dengan</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>untuk anak-anak Indonesia • &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
