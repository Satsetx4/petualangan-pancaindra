import React, { useState } from 'react';
import { RotateCcw, Heart, Compass } from 'lucide-react';
import { sound } from '../../lib/sound';
import { AccessibleDialog } from '../ui/AccessibleDialog';

interface FooterProps {
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetData }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <>
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 px-4 text-center pb-24 sm:pb-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 font-display">
          <Compass className="w-4 h-4 text-sky-500 shrink-0" />
          <span>Petualangan Pancaindra</span>
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
              setShowResetConfirm(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 min-h-11 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 dark:bg-slate-800 dark:hover:bg-rose-950/40 dark:text-slate-300 dark:hover:text-rose-300 text-sm font-semibold cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai dari Awal (Reset Data)</span>
          </button>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1">
          <span>Dibuat dengan</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>untuk anak-anak Indonesia • &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
    {showResetConfirm && (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <AccessibleDialog labelledBy="footer-reset-title" onDismiss={() => setShowResetConfirm(false)} className="max-w-md w-full">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-800 p-6 space-y-4 shadow-2xl text-center">
            <h2 id="footer-reset-title" className="text-xl font-black text-slate-800 dark:text-slate-100">Reset semua data?</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300">Nama, bintang, dan progres belajar akan dihapus dari perangkat ini.</p>
            <div className="flex justify-center gap-2">
              <button type="button" onClick={() => setShowResetConfirm(false)} className="min-h-11 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-bold text-slate-800 dark:text-slate-100">Batal</button>
              <button type="button" onClick={() => { setShowResetConfirm(false); onResetData(); }} className="min-h-11 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white">Reset Data</button>
            </div>
          </div>
        </AccessibleDialog>
      </div>
    )}
    </>
  );
};
