export type SenseType = 'mata' | 'telinga' | 'lidah' | 'hidung' | 'kulit';

export type TabType = 'anatomy' | 'flow' | 'facts' | 'care';

export interface AnatomyPart {
  name: string;
  function: string;
  detail?: string;
  badge?: string;
}

export interface FlowStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
  detailNote?: string;
}

export interface SenseModule {
  id: SenseType;
  name: string;
  latinName?: string;
  nickname: string;
  heroEmoji: string;
  badgeColor: string; // Tailwind color class helper
  themeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    cardBg: string;
    lightBg: string;
  };
  mainFunction: string;
  overviewText: string;
  anatomy: {
    outer: AnatomyPart[];
    inner: AnatomyPart[];
    layers?: AnatomyPart[]; // for skin: epidermis, dermis, hipodermis
  };
  flowSteps: FlowStep[];
  healthTips: {
    title: string;
    description: string;
    icon: string;
    rule?: string; // e.g. "Aturan 20-20-20" or "Aturan 60/60"
  }[];
  funFacts: {
    title: string;
    fact: string;
    isMythBuster?: boolean;
  }[];
}

export interface QuizQuestion {
  id: string;
  senseId: SenseType;
  type: 'single' | 'taste-zone' | 'organ-role' | 'true-false';
  question: string;
  hint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFactSnippet: string;
}

export interface StudentProfile {
  name: string;
  avatarId: string;
  avatarEmoji: string;
  title: string;
  joinedDate: string;
}

export interface ExamHistoryItem {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  timeSpentSeconds: number;
  medal: 'emas' | 'perak' | 'perunggu' | 'peserta';
  rankTitle: string;
}

export interface UserProgress {
  profile: StudentProfile;
  stars: number;
  xp: number;
  level: number;
  completedLessons: SenseType[];
  badges: string[]; // island badges e.g. ['mata_master', 'telinga_master']
  quizBestScores: Record<string, number>; // senseId -> percentage
  examHistory: ExamHistoryItem[];
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  hasCompletedOnboarding: boolean;
}
