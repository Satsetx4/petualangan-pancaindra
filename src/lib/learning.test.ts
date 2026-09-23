import { describe, expect, it } from 'vitest';
import { getRandomExamQuestions, QUESTIONS_BANK } from '../data/questionsBank';
import type { QuizQuestion, SenseType } from '../types';
import {
  calculateExamScore,
  calculateQuizScore,
  completeLesson,
  recordExamResult,
  recordQuizResult,
  shuffleArray,
  shuffleQuestionOptions,
} from './learning';
import { INITIAL_PROGRESS } from './storage';

const sampleQuestion: QuizQuestion = {
  id: 'sample',
  senseId: 'lidah',
  type: 'single',
  question: 'Rasa?',
  options: ['Manis', 'Asin', 'Asam', 'Umami'],
  correctIndex: 2,
  explanation: 'Asam.',
  funFactSnippet: '',
};

describe('shuffle helpers', () => {
  it('shuffles options while preserving the correct answer', () => {
    const result = shuffleQuestionOptions(sampleQuestion, () => 0);

    expect(result.options).toHaveLength(sampleQuestion.options.length);
    expect([...result.options].sort()).toEqual([...sampleQuestion.options].sort());
    expect(result.options[result.correctIndex]).toBe(sampleQuestion.options[sampleQuestion.correctIndex]);
    expect(result.explanation).toBe(sampleQuestion.explanation);
  });

  it('uses Fisher-Yates without losing items', () => {
    expect(shuffleArray([1, 2, 3, 4], () => 0)).toEqual([2, 3, 4, 1]);
  });

  it('builds 15 exam questions with shuffled answers and three questions per sense', () => {
    const exam = getRandomExamQuestions(() => 0.5);
    const counts = new Map<SenseType, number>();

    exam.forEach((question) => {
      counts.set(question.senseId, (counts.get(question.senseId) ?? 0) + 1);
      const original = QUESTIONS_BANK.find((item) => item.id === question.id);
      expect(original).toBeDefined();
      expect(question.options[question.correctIndex]).toBe(original?.options[original.correctIndex]);
    });

    expect(exam).toHaveLength(15);
    expect([...counts.values()]).toEqual([3, 3, 3, 3, 3]);
  });
});

describe('score calculations', () => {
  it('calculates quiz percentage and safely handles an empty list', () => {
    expect(calculateQuizScore(3, 5)).toBe(60);
    expect(calculateQuizScore(0, 0)).toBe(0);
  });

  it('calculates exam score and a per-sense breakdown', () => {
    const questions = [
      { ...sampleQuestion, id: 'a', senseId: 'lidah' as const, correctIndex: 1 },
      { ...sampleQuestion, id: 'b', senseId: 'mata' as const, correctIndex: 0 },
      { ...sampleQuestion, id: 'c', senseId: 'lidah' as const, correctIndex: 2 },
    ];
    const score = calculateExamScore(questions, { 0: 1, 1: 3, 2: 2 });

    expect(score).toMatchObject({ correctCount: 2, total: 3, percentage: 67 });
    expect(score.breakdown.lidah).toEqual({ correct: 2, total: 2 });
    expect(score.breakdown.mata).toEqual({ correct: 0, total: 1 });
  });
});

describe('progress and rewards', () => {
  it('rewards first lesson completion once and keeps lesson completion separate from quiz', () => {
    const first = completeLesson(INITIAL_PROGRESS, 'mata');
    const repeated = completeLesson(first, 'mata');

    expect(first.stars).toBe(1);
    expect(first.lessonCompleted).toEqual(['mata']);
    expect(first.quizCompleted).toEqual([]);
    expect(repeated).toBe(first);
  });

  it('rewards first quiz completion and score tier improvements, but not repeats', () => {
    const first = recordQuizResult(INITIAL_PROGRESS, 'lidah', 40);
    const repeated = recordQuizResult(first.progress, 'lidah', 40);
    const improved = recordQuizResult(repeated.progress, 'lidah', 80);
    const masteredImprovement = recordQuizResult(improved.progress, 'lidah', 100);

    expect(first.starsEarned).toBe(1);
    expect(first.progress.lessonCompleted).toEqual([]);
    expect(first.progress.quizCompleted).toEqual(['lidah']);
    expect(repeated.starsEarned).toBe(0);
    expect(improved.starsEarned).toBe(2);
    expect(improved.progress.mastered).toEqual(['lidah']);
    expect(masteredImprovement.starsEarned).toBe(1);
    expect(recordQuizResult(masteredImprovement.progress, 'lidah', 100).starsEarned).toBe(0);
  });

  it('caps exam rewards at first completion and improved score tiers', () => {
    const first = recordExamResult(INITIAL_PROGRESS, 80);
    const repeated = recordExamResult(first.progress, 80);
    const improved = recordExamResult(repeated.progress, 90);

    expect(first.starsEarned).toBe(2);
    expect(repeated.starsEarned).toBe(0);
    expect(improved.starsEarned).toBe(1);
    expect(recordExamResult(improved.progress, 90).starsEarned).toBe(0);
  });
});
