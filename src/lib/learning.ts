import type { QuizQuestion, SenseType, UserProgress } from '../types';

export const SENSE_IDS: SenseType[] = ['mata', 'telinga', 'lidah', 'hidung', 'kulit'];

export const shuffleArray = <T>(items: readonly T[], random: () => number = Math.random): T[] => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

export const shuffleQuestionOptions = (
  question: QuizQuestion,
  random: () => number = Math.random,
): QuizQuestion => {
  const choices = question.options.map((option, index) => ({
    option,
    isCorrect: index === question.correctIndex,
  }));
  const shuffledChoices = shuffleArray(choices, random);
  return {
    ...question,
    options: shuffledChoices.map(({ option }) => option),
    correctIndex: shuffledChoices.findIndex(({ isCorrect }) => isCorrect),
  };
};

export const calculateQuizScore = (correctCount: number, total: number): number =>
  total > 0 ? Math.round((correctCount / total) * 100) : 0;

export interface ExamScore {
  correctCount: number;
  total: number;
  percentage: number;
  breakdown: Record<SenseType, { correct: number; total: number }>;
}

export const calculateExamScore = (
  questions: QuizQuestion[],
  answers: Record<number, number>,
): ExamScore => {
  const breakdown = Object.fromEntries(
    SENSE_IDS.map((senseId) => [senseId, { correct: 0, total: 0 }]),
  ) as Record<SenseType, { correct: number; total: number }>;
  let correctCount = 0;

  questions.forEach((question, index) => {
    const senseResult = breakdown[question.senseId];
    if (senseResult) {
      senseResult.total += 1;
      if (answers[index] === question.correctIndex) senseResult.correct += 1;
    }
    if (answers[index] === question.correctIndex) correctCount += 1;
  });

  return {
    correctCount,
    total: questions.length,
    percentage: calculateQuizScore(correctCount, questions.length),
    breakdown,
  };
};

const scoreTier = (score: number, thresholds: number[]): number =>
  thresholds.filter((threshold) => score >= threshold).length;

const improvedTierRewards = (previous: number, next: number, thresholds: number[]): number =>
  Math.max(0, scoreTier(next, thresholds) - scoreTier(previous, thresholds));

export const completeLesson = (progress: UserProgress, senseId: SenseType): UserProgress => {
  if (progress.lessonCompleted.includes(senseId)) return progress;
  return {
    ...progress,
    stars: progress.stars + 1,
    lessonCompleted: [...progress.lessonCompleted, senseId],
  };
};

export const recordQuizResult = (
  progress: UserProgress,
  senseId: SenseType,
  score: number,
): { progress: UserProgress; starsEarned: number } => {
  const previousBest = progress.quizBestScores[senseId] ?? 0;
  const isFirstCompletion = !progress.quizCompleted.includes(senseId);
  const newBest = Math.max(previousBest, Math.min(100, Math.max(0, Math.round(score))));
  const starsEarned =
    (isFirstCompletion ? 1 : 0) +
    improvedTierRewards(previousBest, newBest, [50, 80, 100]);
  const mastered = newBest >= 80;

  return {
    starsEarned,
    progress: {
      ...progress,
      stars: progress.stars + starsEarned,
      quizCompleted: isFirstCompletion
        ? [...progress.quizCompleted, senseId]
        : progress.quizCompleted,
      quizBestScores: { ...progress.quizBestScores, [senseId]: newBest },
      mastered: mastered
        ? progress.mastered.includes(senseId)
          ? progress.mastered
          : [...progress.mastered, senseId]
        : progress.mastered,
    },
  };
};

export const recordExamResult = (
  progress: UserProgress,
  score: number,
): { progress: UserProgress; starsEarned: number } => {
  const previousBest = progress.examBestScore ?? 0;
  const scoreClamped = Math.min(100, Math.max(0, Math.round(score)));
  const isFirstCompletion = !progress.examCompleted;
  const starsEarned =
    (isFirstCompletion ? 1 : 0) + improvedTierRewards(previousBest, scoreClamped, [70, 85, 100]);

  return {
    starsEarned,
    progress: {
      ...progress,
      stars: progress.stars + starsEarned,
      examCompleted: true,
      examBestScore: Math.max(previousBest, scoreClamped),
    },
  };
};
