import React from 'react';
import { Home, BookOpen, HelpCircle, Award, User } from 'lucide-react';
import { sound } from '../../lib/sound';

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  hideDuringQuizOrExam?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  hideDuringQuizOrExam = false,
}) => {
  if (hideDuringQuizOrExam) return null;

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'modules', label: '5 Modul', icon: BookOpen },
    { id: 'quiz_select', label: 'Latihan', icon: HelpCircle },
    { id: 'exam', label: 'Ujian', icon: Award },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 pb-safe sm:hidden">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16">
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
              <span className="text-[11px] leading-none">{item.label}</span>
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
