import type { SenseType, StudentProfile, UserProgress } from '../types';

const STORAGE_KEY = 'petualangan_pancaindra_v1';
const THEME_KEY = 'petualangan_pancaindra_theme';
const SENSE_IDS: SenseType[] = ['mata', 'telinga', 'lidah', 'hidung', 'kulit'];

export const INITIAL_PROGRESS: UserProgress = {
  profile: { name: '', avatarId: 'singa', avatarEmoji: '🦁' },
  stars: 0,
  lessonCompleted: [],
  quizCompleted: [],
  quizBestScores: {},
  mastered: [],
  examCompleted: false,
  examBestScore: null,
  soundEnabled: true,
  theme: 'light',
  hasCompletedOnboarding: false,
};

const cloneInitialProgress = (): UserProgress => ({
  ...INITIAL_PROGRESS,
  profile: { ...INITIAL_PROGRESS.profile },
  lessonCompleted: [],
  quizCompleted: [],
  quizBestScores: {},
  mastered: [],
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isSenseId = (value: unknown): value is SenseType =>
  typeof value === 'string' && SENSE_IDS.includes(value as SenseType);

const validSenseIds = (value: unknown): SenseType[] =>
  Array.isArray(value) ? [...new Set(value.filter(isSenseId))] : [];

const readScores = (value: unknown): Partial<Record<SenseType, number>> => {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    SENSE_IDS.flatMap((senseId) => {
      const score = value[senseId];
      return typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 100
        ? [[senseId, Math.round(score)]]
        : [];
    }),
  );
};

const readProfile = (value: unknown): StudentProfile => {
  const profile = isRecord(value) ? value : {};
  return {
    name: typeof profile.name === 'string' ? profile.name.trim().slice(0, 20) : '',
    avatarId: typeof profile.avatarId === 'string' ? profile.avatarId : 'singa',
    avatarEmoji: typeof profile.avatarEmoji === 'string' ? profile.avatarEmoji : '🦁',
  };
};

export const loadProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneInitialProgress();

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return cloneInitialProgress();

    const legacyScores = readScores(parsed.quizBestScores);
    const hasCurrentLessonField = Array.isArray(parsed.lessonCompleted);
    const lessonCompleted = hasCurrentLessonField
      ? validSenseIds(parsed.lessonCompleted)
      : []; // Legacy completedLessons mixed lesson and quiz completion, so its meaning was ambiguous.
    const quizCompleted = Array.isArray(parsed.quizCompleted)
      ? validSenseIds(parsed.quizCompleted)
      : SENSE_IDS.filter((senseId) => Object.hasOwn(legacyScores, senseId));
    const quizBestScores = legacyScores;
    const mastered = SENSE_IDS.filter((senseId) => (quizBestScores[senseId] ?? 0) >= 80);
    const oldExamScores = Array.isArray(parsed.examHistory)
      ? parsed.examHistory.flatMap((entry) => {
          if (!isRecord(entry)) return [];
          const score = entry.percentage;
          return typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 100
            ? [Math.round(score)]
            : [];
        })
      : [];
    const examBestScore =
      typeof parsed.examBestScore === 'number' && Number.isFinite(parsed.examBestScore)
        ? Math.min(100, Math.max(0, Math.round(parsed.examBestScore)))
        : oldExamScores.length > 0
          ? Math.max(...oldExamScores)
          : null;

    return {
      profile: readProfile(parsed.profile),
      stars:
        typeof parsed.stars === 'number' && Number.isFinite(parsed.stars)
          ? Math.max(0, Math.floor(parsed.stars))
          : 0,
      lessonCompleted,
      quizCompleted: [...new Set([...quizCompleted, ...SENSE_IDS.filter((senseId) => Object.hasOwn(legacyScores, senseId))])],
      quizBestScores,
      mastered,
      examCompleted:
        Boolean(parsed.examCompleted) || oldExamScores.length > 0 || examBestScore !== null,
      examBestScore,
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      hasCompletedOnboarding:
        typeof parsed.hasCompletedOnboarding === 'boolean'
          ? parsed.hasCompletedOnboarding
          : Boolean(readProfile(parsed.profile).name),
    };
  } catch (error) {
    console.warn('Gagal membaca localStorage, menggunakan state default:', error);
    return cloneInitialProgress();
  }
};

export const saveProgress = (progress: UserProgress): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.warn('Gagal menyimpan ke localStorage:', error);
    return false;
  }
};

export const resetProgress = (): UserProgress => {
  for (const key of [STORAGE_KEY, THEME_KEY]) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Gagal mereset localStorage:', error);
    }
  }
  return cloneInitialProgress();
};

export const loadStoredTheme = (): 'light' | 'dark' => {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    return theme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

export const saveStoredTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.warn('Gagal menyimpan tema:', error);
  }

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
};
