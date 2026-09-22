import type { UserProgress } from '../types';

const STORAGE_KEY = 'petualangan_pancaindra_v1';
const THEME_KEY = 'petualangan_pancaindra_theme';

export const INITIAL_PROGRESS: UserProgress = {
  profile: {
    name: 'Detektif Cilik',
    avatarId: 'singa',
    avatarEmoji: '🦁',
    title: 'Detektif Pemula',
    joinedDate: new Date().toISOString(),
  },
  stars: 0,
  xp: 0,
  level: 1,
  completedLessons: [],
  badges: [],
  quizBestScores: {},
  examHistory: [],
  soundEnabled: true,
  theme: 'light',
};

export const loadProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_PROGRESS };
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      profile: {
        ...INITIAL_PROGRESS.profile,
        ...(parsed.profile || {}),
      },
    };
  } catch (err) {
    console.warn('Gagal membaca localStorage, menggunakan state default:', err);
    return { ...INITIAL_PROGRESS };
  }
};

export const saveProgress = (progress: UserProgress): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (err) {
    console.warn('Gagal menyimpan ke localStorage:', err);
    return false;
  }
};

export const resetProgress = (): UserProgress => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Gagal mereset localStorage:', err);
  }
  return { ...INITIAL_PROGRESS };
};

export const loadStoredTheme = (): 'light' | 'dark' => {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'dark' || theme === 'light') {
      return theme;
    }
    // Default light mode for cheerful kids visual
    return 'light';
  } catch {
    return 'light';
  }
};

export const saveStoredTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (err) {
    console.warn('Gagal menyimpan tema:', err);
  }
};
