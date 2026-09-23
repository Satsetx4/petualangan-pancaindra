import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { QuizQuestion } from '../../types';
import { EXAM_DURATION_SECONDS, ExamArenaView } from './ExamArenaView';

const question: QuizQuestion = {
  id: 'exam-test',
  senseId: 'mata',
  type: 'single',
  question: 'Pilih jawaban terbaru.',
  options: ['Pilihan A', 'Pilihan B'],
  correctIndex: 1,
  explanation: 'Pilihan B.',
  funFactSnippet: '',
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

beforeEach(() => {
  vi.useFakeTimers();
});

describe('ExamArenaView timer and submission', () => {
  it('counts down and auto-submits the latest answer only once at zero', () => {
    const onFinishExam = vi.fn();
    render(<ExamArenaView questions={[question]} onFinishExam={onFinishExam} onExit={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Pilihan A' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pilihan B' }));
    expect(screen.getByText('15:00')).toBeTruthy();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('14:59')).toBeTruthy();

    act(() => { vi.advanceTimersByTime((EXAM_DURATION_SECONDS - 1) * 1000); });

    expect(onFinishExam).toHaveBeenCalledTimes(1);
    expect(onFinishExam).toHaveBeenCalledWith({ 0: 1 }, EXAM_DURATION_SECONDS);
  });

  it('uses the same one-time submission path for manual submission', () => {
    const onFinishExam = vi.fn();
    render(<ExamArenaView questions={[question]} onFinishExam={onFinishExam} onExit={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Pilihan B' }));
    fireEvent.click(screen.getByRole('button', { name: 'Kirim Ujian' }));
    fireEvent.click(screen.getByRole('button', { name: 'Ya, Kirim!' }));
    act(() => { vi.advanceTimersByTime(EXAM_DURATION_SECONDS * 1000); });

    expect(onFinishExam).toHaveBeenCalledTimes(1);
    expect(onFinishExam).toHaveBeenCalledWith({ 0: 1 }, 0);
  });

  it('asks before leaving an active exam and can resume the same answers', () => {
    const onExit = vi.fn();
    render(<ExamArenaView questions={[question]} onFinishExam={vi.fn()} onExit={onExit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Pilihan B' }));
    fireEvent.click(screen.getByRole('button', { name: 'Keluar' }));
    expect(screen.getByRole('dialog', { name: 'Keluar dari ujian?' })).toBeTruthy();
    expect(onExit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Lanjut Ujian' }));
    expect(screen.getByRole('button', { name: 'Pilihan B' }).getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Keluar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Keluar Ujian' }));
    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
