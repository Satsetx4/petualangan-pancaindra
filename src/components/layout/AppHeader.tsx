import React from 'react';
import { ArrowLeft, Moon, Sun, Volume2, VolumeX, Star, Compass } from 'lucide-react';
import type { UserProgress } from '../../types';
import { sound } from '../../lib/sound';

interface AppHeaderProps {
  progress: UserProgress;
  currentView: string;
  onNavigateHome: () => void;
  onNavigateBack?: () => void;
  onOpenProfile: () => void;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  titleContext?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  progress,
  currentView,
  onNavigateHome,
  onNavigateBack,
  onOpenProfile,
  onToggleSound,
  onToggleTheme,
  titleContext,
}) => {
  const handleBack = () => {
    sound.playPop();
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      onNavigateHome();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand or Back Button */}
        <div className="flex items-center gap-2">
          {currentView !== 'home' ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm min-h-[44px] min-w-[44px] cursor-pointer transition-colors shadow-sm"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-5 h-5 text-sky-500" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
          ) : (
            <div
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-800 dark:text-white leading-tight font-display">
                  Pancaindra
                </h1>
                <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400 tracking-wide uppercase">
                  Detektif 5 Indra
                </p>
              </div>
            </div>
          )}

          {/* Subpage Title Context */}
          {titleContext && currentView !== 'home' && (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                {titleContext}
              </span>
            </div>
          )}
        </div>

        {/* Right: Profile, Stars, Sound, Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 shrink-0" />
            <span className="text-xs font-black text-amber-900 dark:text-amber-300">
              {progress.stars}
            </span>
          </div>

          {/* Profile Chip Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenProfile();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 min-h-[40px] cursor-pointer transition-colors shadow-xs"
            title="Buka Profil Siswa"
          >
            <span className="text-lg">{progress.profile.avatarEmoji}</span>
            <span className="text-xs font-bold max-w-[80px] truncate hidden xs:inline">
              {progress.profile.name}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors shadow-xs"
            title={progress.soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            aria-label="Toggle Sound"
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer transition-colors shadow-xs"
            title={progress.theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
            aria-label="Toggle Theme"
          >
            {progress.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
