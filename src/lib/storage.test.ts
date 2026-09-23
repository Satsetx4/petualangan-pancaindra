import { afterEach, describe, expect, it, vi } from 'vitest';
import { INITIAL_PROGRESS, loadProgress, loadStoredTheme, resetProgress, saveProgress, saveStoredTheme } from './storage';

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('progress persistence', () => {
  it('saves and reloads progress', () => {
    const progress = {
      ...INITIAL_PROGRESS,
      profile: { ...INITIAL_PROGRESS.profile, name: 'Nara' },
      lessonCompleted: ['mata' as const],
      quizCompleted: ['lidah' as const],
      quizBestScores: { lidah: 85 },
      mastered: ['lidah' as const],
      stars: 4,
      hasCompletedOnboarding: true,
    };

    expect(saveProgress(progress)).toBe(true);
    expect(loadProgress()).toMatchObject(progress);
  });

  it('migrates old data without treating old quiz completions as lessons', () => {
    localStorage.setItem('petualangan_pancaindra_v1', JSON.stringify({
      profile: { name: 'Nara', avatarEmoji: '🦁' },
      completedLessons: ['mata', 'lidah'],
      quizBestScores: { lidah: 85, invalid: 200 },
      stars: 9,
    }));

    expect(loadProgress()).toMatchObject({
      lessonCompleted: [],
      quizCompleted: ['lidah'],
      quizBestScores: { lidah: 85 },
      mastered: ['lidah'],
      stars: 9,
      hasCompletedOnboarding: true,
    });
  });

  it('handles malformed and incomplete stored data safely', () => {
    localStorage.setItem('petualangan_pancaindra_v1', '{broken');
    expect(loadProgress()).toMatchObject(INITIAL_PROGRESS);

    localStorage.setItem('petualangan_pancaindra_v1', JSON.stringify({
      profile: null,
      lessonCompleted: ['invalid'],
      quizBestScores: { mata: 'great' },
    }));
    expect(loadProgress()).toMatchObject({ lessonCompleted: [], quizBestScores: {}, profile: { name: '' } });
  });

  it('does not crash if localStorage access is blocked and reset clears saved values', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });
    expect(loadProgress()).toMatchObject(INITIAL_PROGRESS);
    getItemSpy.mockRestore();

    saveStoredTheme('dark');
    expect(loadStoredTheme()).toBe('dark');
    saveProgress({ ...INITIAL_PROGRESS, stars: 7 });
    resetProgress();
    expect(localStorage.getItem('petualangan_pancaindra_v1')).toBeNull();
    expect(localStorage.getItem('petualangan_pancaindra_theme')).toBeNull();
    expect(loadProgress().stars).toBe(0);
  });
});
