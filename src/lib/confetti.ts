// Lightweight Canvas Confetti Trigger
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#f43f5e', '#fbbf24', '#34d399', '#a855f7'],
        disableForReducedMotion: true,
      });
    }
  } catch (e) {
    console.log('Confetti effect bypassed:', e);
  }
};

export const triggerGrandCelebration = () => {
  try {
    if (typeof confetti === 'function') {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const interval: ReturnType<typeof setInterval> = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  } catch (e) {
    console.log('Grand confetti bypassed:', e);
  }
};

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
