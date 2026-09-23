import React from 'react';
import { Home, BookOpen, Award, User } from 'lucide-react';
import { sound } from '../../lib/sound';
import type { AppTab } from '../../types';

interface MobileBottomNavProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  hideDuringQuizOrExam?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  hideDuringQuizOrExam = false,
}) => {
  if (hideDuringQuizOrExam) return null;

  const navItems: { id: AppTab; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'modules', label: 'Modul', icon: BookOpen },
    { id: 'exam', label: 'Ujian', icon: Award },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav aria-label="Navigasi utama" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 pb-safe sm:hidden">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop();
                onSelectTab(item.id);
              }}
              className={`flex flex-col items-center justify-center gap-1 min-h-[44px] cursor-pointer transition-colors relative ${
                isActive
                  ? 'text-sky-600 dark:text-sky-400 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-sky-100 dark:bg-sky-950/60 scale-110'
                    : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs leading-none">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-6 h-1 rounded-full bg-sky-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
