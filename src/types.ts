export type SenseType = 'mata' | 'telinga' | 'lidah' | 'hidung' | 'kulit';

export type AppView =
  | 'home'
  | 'modules'
  | 'module'
  | 'quiz'
  | 'exam_intro'
  | 'exam'
  | 'exam_result'
  | 'not_found';

export type AppTab = 'home' | 'modules' | 'exam' | 'profile';

export type TabType = 'anatomy' | 'flow' | 'facts' | 'care';

export interface AnatomyPart {
  name: string;
  function: string;
  badge?: string;
}

export interface FlowStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export interface SenseModule {
  id: SenseType;
  name: string;
  latinName?: string;
  nickname: string;
  heroEmoji: string;
  themeColor: {
    bg: string;
    border: string;
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
  type: 'single' | 'organ-role' | 'true-false';
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
}

export interface UserProgress {
  profile: StudentProfile;
  stars: number;
  lessonCompleted: SenseType[];
  quizCompleted: SenseType[];
  quizBestScores: Partial<Record<SenseType, number>>;
  mastered: SenseType[];
  examCompleted: boolean;
  examBestScore: number | null;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  hasCompletedOnboarding: boolean;
}
