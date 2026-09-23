import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import type { AppTab, AppView, SenseType, UserProgress, QuizQuestion, StudentProfile } from './types';
import { SENSES_MODULES } from './data/sensesData';
import { getRandomExamQuestions, getQuestionsForSense, hasExamQuestionSet } from './data/questionsBank';
import { completeLesson, calculateExamScore, recordExamResult, recordQuizResult } from './lib/learning';
import { loadProgress, saveProgress, resetProgress, loadStoredTheme, saveStoredTheme } from './lib/storage';
import { sound } from './lib/sound';
import { AppHeader } from './components/layout/AppHeader';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { SenseIslandGrid } from './components/home/SenseIslandGrid';
import { LessonViewer } from './components/modules/LessonViewer';
import { QuizPlayView } from './components/quiz/QuizPlayView';
import { ExamArenaView } from './components/exam/ExamArenaView';
import { ReportCardModal } from './components/exam/ReportCardModal';
import { StudentProfileModal } from './components/profile/StudentProfileModal';
import { WelcomeOnboardingModal } from './components/profile/WelcomeOnboardingModal';
import { TapButton } from './components/ui/TapButton';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [currentView, setCurrentView] = useState<AppView>(() =>
    window.location.pathname === '/' ? 'home' : 'not_found',
  );
  const [selectedSenseId, setSelectedSenseId] = useState<SenseType>('mata');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examTimeSpent, setExamTimeSpent] = useState(0);
  const [examRewardStars, setExamRewardStars] = useState(0);

  useEffect(() => {
    const initialTheme = loadStoredTheme();
    saveStoredTheme(initialTheme);
    sound.enabled = progress.soundEnabled;
    setProgress((previous) => ({ ...previous, theme: initialTheme }));
  }, []);

  useEffect(() => {
    saveProgress(progress);
    sound.enabled = progress.soundEnabled;
  }, [progress]);

  const handleToggleTheme = () => {
    const nextTheme = progress.theme === 'dark' ? 'light' : 'dark';
    saveStoredTheme(nextTheme);
    setProgress((previous) => ({ ...previous, theme: nextTheme }));
    sound.playPop();
  };

  const handleToggleSound = () => {
    const nextSound = !progress.soundEnabled;
    sound.enabled = nextSound;
    setProgress((previous) => ({ ...previous, soundEnabled: nextSound }));
    if (nextSound) sound.playPop();
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProgress((previous) => ({ ...previous, profile: { ...previous.profile, ...updated } }));
  };

  const handleCompleteLesson = (senseId: SenseType) => {
    setProgress((previous) => completeLesson(previous, senseId));
  };

  const handleFinishQuiz = (scorePercent: number): number => {
    const result = recordQuizResult(progress, selectedSenseId, scorePercent);
    setProgress(result.progress);
    return result.starsEarned;
  };

  const handleOpenExamIntro = () => {
    setCurrentView('exam_intro');
  };

  const handleBeginExam = () => {
    const randomizedQuestions = getRandomExamQuestions();
    if (randomizedQuestions.length !== 15) return;
    sound.playPop();
    setExamQuestions(randomizedQuestions);
    setExamAnswers({});
    setExamTimeSpent(0);
    setExamRewardStars(0);
    setCurrentView('exam');
  };

  const handleFinishExam = (answers: Record<number, number>, timeSpentSeconds: number) => {
    const result = calculateExamScore(examQuestions, answers);
    const reward = recordExamResult(progress, result.percentage);
    setProgress(reward.progress);
    setExamRewardStars(reward.starsEarned);
    setExamAnswers(answers);
    setExamTimeSpent(timeSpentSeconds);
    setCurrentView('exam_result');
  };

  const handleExitExam = () => {
    setExamQuestions([]);
    setExamAnswers({});
    setCurrentView('exam_intro');
  };

  const handleResetData = () => {
    const freshProgress = resetProgress();
    setProgress(freshProgress);
    saveStoredTheme('light');
    setIsProfileModalOpen(false);
    setCurrentView('home');
  };

  const handleCompleteOnboarding = (name: string, avatarId: string, avatarEmoji: string) => {
    setProgress((previous) => ({
      ...previous,
      profile: { ...previous.profile, name, avatarId, avatarEmoji },
      hasCompletedOnboarding: true,
    }));
  };

  const handleSmartBack = () => {
    if (currentView === 'quiz') setCurrentView('module');
    else if (currentView === 'module') setCurrentView('modules');
    else if (currentView === 'modules' || currentView === 'exam_intro' || currentView === 'exam_result') {
      setCurrentView('home');
    }
  };

  const currentModule = SENSES_MODULES.find((module) => module.id === selectedSenseId) ?? SENSES_MODULES[0];
  const titleContext =
    currentView === 'module' ? `Modul ${currentModule.name}` :
      currentView === 'quiz' ? `Kuis ${currentModule.name}` :
        currentView === 'exam' || currentView === 'exam_intro' ? 'Arena Ujian Master' :
          currentView === 'exam_result' ? 'Rapor Prestasi' : undefined;
  const isQuizOrExamActive = currentView === 'quiz' || currentView === 'exam';
  const hideNavigation = isQuizOrExamActive || currentView === 'not_found';
  const currentTab: AppTab =
    currentView === 'modules' || currentView === 'module' ? 'modules' :
      currentView === 'exam_intro' || currentView === 'exam' || currentView === 'exam_result' ? 'exam' :
        'home';

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col transition-colors selection:bg-sky-400 selection:text-white">
        <AppHeader
          progress={progress}
          currentView={currentView}
          showProfileButton={currentView !== 'exam'}
          titleContext={titleContext}
          onNavigateBack={handleSmartBack}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onToggleSound={handleToggleSound}
          onToggleTheme={handleToggleTheme}
        />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-5 pb-16">
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-7">
                <HeroBanner progress={progress} onExploreModules={() => setCurrentView('modules')} onStartExam={handleOpenExamIntro} />
                <SenseIslandGrid
                  progress={progress}
                  onSelectSense={(senseId) => { setSelectedSenseId(senseId); setCurrentView('module'); }}
                  onStartQuiz={(senseId) => { setSelectedSenseId(senseId); setCurrentView('quiz'); }}
                />
              </motion.div>
            )}

            {currentView === 'modules' && (
              <motion.div key="modules" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">📚 Jelajahi 5 Pulau Keajaiban</h2>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Pelajari anatomi, cara kerja, fakta unik, dan tips merawat pancaindra.</p>
                </div>
                <SenseIslandGrid
                  progress={progress}
                  onSelectSense={(senseId) => { setSelectedSenseId(senseId); setCurrentView('module'); }}
                  onStartQuiz={(senseId) => { setSelectedSenseId(senseId); setCurrentView('quiz'); }}
                />
              </motion.div>
            )}

            {currentView === 'module' && (
              <motion.div key={`module_${selectedSenseId}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <LessonViewer
                  module={currentModule}
                  isCompleted={progress.lessonCompleted.includes(selectedSenseId)}
                  onCompleteLesson={() => handleCompleteLesson(selectedSenseId)}
                  onStartQuiz={() => setCurrentView('quiz')}
                />
              </motion.div>
            )}

            {currentView === 'quiz' && (
              <motion.div key={`quiz_${selectedSenseId}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <QuizPlayView
                  organName={currentModule.name}
                  heroEmoji={currentModule.heroEmoji}
                  questions={getQuestionsForSense(selectedSenseId)}
                  onFinishQuiz={handleFinishQuiz}
                  onBack={() => setCurrentView('module')}
                />
              </motion.div>
            )}

            {currentView === 'exam_intro' && (
              <motion.section
                key="exam_intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                aria-labelledby="exam-intro-title"
                className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-700 p-6 sm:p-8 shadow-xl space-y-6 text-center"
              >
                <div aria-hidden="true" className="text-5xl">🏆</div>
                <div className="space-y-2">
                  <h2 id="exam-intro-title" className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">Arena Ujian Master</h2>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">Pastikan kamu sudah siap sebelum memulai.</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                  <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/40 p-4"><strong className="block text-xl">15</strong> soal</div>
                  <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-4"><strong className="block text-xl">5</strong> materi</div>
                  <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-4"><strong className="block text-xl">15</strong> menit</div>
                </div>
                {progress.examCompleted && progress.examBestScore !== null && (
                  <p className="text-sm text-slate-700 dark:text-slate-300">Nilai terbaikmu sejauh ini: <strong>{progress.examBestScore}/100</strong></p>
                )}
                {!hasExamQuestionSet() && <p role="status" className="text-sm text-rose-700 dark:text-rose-300">Soal ujian belum tersedia lengkap.</p>}
                <TapButton variant="amber" size="lg" onClick={handleBeginExam} disabled={!hasExamQuestionSet()} className="w-full sm:w-auto">
                  Mulai Ujian
                </TapButton>
              </motion.section>
            )}

            {currentView === 'exam' && (
              <motion.div key="exam" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <ExamArenaView questions={examQuestions} onFinishExam={handleFinishExam} onExit={handleExitExam} />
              </motion.div>
            )}

            {currentView === 'exam_result' && (
              <motion.div key="exam_result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <ReportCardModal
                  profile={progress.profile}
                  questions={examQuestions}
                  userAnswers={examAnswers}
                  timeSpentSeconds={examTimeSpent}
                  starsEarned={examRewardStars}
                  onRetry={handleOpenExamIntro}
                  onHome={() => setCurrentView('home')}
                />
              </motion.div>
            )}

            {currentView === 'not_found' && (
              <motion.section
                key="not_found"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                aria-labelledby="not-found-title"
                className="max-w-xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-slate-800 p-8 text-center space-y-4 shadow-lg"
              >
                <p className="text-sm font-black uppercase tracking-wider text-sky-700 dark:text-sky-300">Halaman tidak ditemukan</p>
                <h2 id="not-found-title" className="text-5xl font-black text-slate-800 dark:text-slate-100">404</h2>
                <p className="text-sm text-slate-700 dark:text-slate-300">Halaman ini belum tersedia. Kembali ke beranda untuk melanjutkan petualangan.</p>
                <a href="/" className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                  Kembali ke Beranda
                </a>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {!hideNavigation && <Footer onResetData={handleResetData} />}

        <MobileBottomNav
          currentTab={currentTab}
          hideDuringQuizOrExam={hideNavigation}
          onSelectTab={(tab) => {
            if (tab === 'home') setCurrentView('home');
            if (tab === 'modules') setCurrentView('modules');
            if (tab === 'exam') handleOpenExamIntro();
            if (tab === 'profile') setIsProfileModalOpen(true);
          }}
        />

        {isProfileModalOpen && (
          <StudentProfileModal
            progress={progress}
            onUpdateProfile={handleUpdateProfile}
            onResetProgress={handleResetData}
            onClose={() => setIsProfileModalOpen(false)}
          />
        )}

        {!progress.hasCompletedOnboarding && <WelcomeOnboardingModal onComplete={handleCompleteOnboarding} />}
      </div>
    </MotionConfig>
  );
};

export default App;
