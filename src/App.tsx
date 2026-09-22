import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SenseType, UserProgress, QuizQuestion, StudentProfile } from './types';
import { SENSES_MODULES } from './data/sensesData';
import {
  getRandomExamQuestions,
  getQuestionsForSense,
} from './data/questionsBank';
import {
  loadProgress,
  saveProgress,
  resetProgress,
  loadStoredTheme,
  saveStoredTheme,
} from './lib/storage';
import { sound } from './lib/sound';

// Components
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

export const App: React.FC = () => {
  // Safe LocalStorage state initialization
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedSenseId, setSelectedSenseId] = useState<SenseType>('mata');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Exam session state
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examTimeSpent, setExamTimeSpent] = useState<number>(0);

  // Sync theme with document element and sound controller on mount
  useEffect(() => {
    const initialTheme = loadStoredTheme();
    saveStoredTheme(initialTheme);
    sound.enabled = progress.soundEnabled;
  }, []);

  // Defensive save to LocalStorage whenever progress changes
  useEffect(() => {
    saveProgress(progress);
    sound.enabled = progress.soundEnabled;
  }, [progress]);

  // Handle Theme Toggle
  const handleToggleTheme = () => {
    const nextTheme = progress.theme === 'dark' ? 'light' : 'dark';
    saveStoredTheme(nextTheme);
    setProgress((prev) => ({
      ...prev,
      theme: nextTheme,
    }));
    sound.playPop();
  };

  // Handle Sound Toggle
  const handleToggleSound = () => {
    const nextSound = !progress.soundEnabled;
    sound.enabled = nextSound;
    setProgress((prev) => ({
      ...prev,
      soundEnabled: nextSound,
    }));
    if (nextSound) {
      sound.playPop();
    }
  };

  // Handle Updating Student Profile
  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProgress((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updated,
      },
    }));
  };

  // Handle Complete Lesson
  const handleCompleteLesson = (senseId: SenseType) => {
    if (!progress.completedLessons.includes(senseId)) {
      setProgress((prev) => ({
        ...prev,
        completedLessons: [...prev.completedLessons, senseId],
        stars: prev.stars + 1,
        xp: prev.xp + 15,
        badges: prev.badges.includes(`${senseId}_badge`)
          ? prev.badges
          : [...prev.badges, `${senseId}_badge`],
      }));
    }
  };

  // Handle Finishing Module Quiz
  const handleFinishQuiz = (scorePercent: number, starsEarned: number) => {
    setProgress((prev) => {
      const prevBest = prev.quizBestScores[selectedSenseId] || 0;
      const newBest = Math.max(prevBest, scorePercent);
      const updatedCompleted = prev.completedLessons.includes(selectedSenseId)
        ? prev.completedLessons
        : [...prev.completedLessons, selectedSenseId];

      return {
        ...prev,
        stars: prev.stars + starsEarned,
        xp: prev.xp + Math.round(scorePercent / 2),
        completedLessons: updatedCompleted,
        quizBestScores: {
          ...prev.quizBestScores,
          [selectedSenseId]: newBest,
        },
      };
    });
  };

  // Start Master Exam
  const handleStartExam = () => {
    sound.playPop();
    const randomized = getRandomExamQuestions();
    setExamQuestions(randomized);
    setExamAnswers({});
    setExamTimeSpent(0);
    setCurrentView('exam_arena');
  };

  // Finish Master Exam
  const handleFinishExam = (
    answers: Record<number, number>,
    timeSpentSeconds: number
  ) => {
    setExamAnswers(answers);
    setExamTimeSpent(timeSpentSeconds);

    // Calculate score
    let correct = 0;
    examQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correct += 1;
      }
    });

    const percent = Math.round((correct / examQuestions.length) * 100);
    const starsBonus = percent >= 85 ? 5 : percent >= 70 ? 3 : 2;

    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + starsBonus,
      xp: prev.xp + percent,
      level: prev.level + (percent >= 70 ? 1 : 0),
    }));

    setCurrentView('exam_result');
  };

  // Handle Reset Data
  const handleResetData = () => {
    const fresh = resetProgress();
    setProgress(fresh);
    saveStoredTheme('light');
    setCurrentView('home');
  };

  // Current Sense Module for Detail View
  const currentModule =
    SENSES_MODULES.find((m) => m.id === selectedSenseId) || SENSES_MODULES[0];

  // Title context for header wayfinding
  let titleContext = undefined;
  if (currentView === 'module_detail') titleContext = `Modul ${currentModule.name}`;
  if (currentView === 'quiz_play') titleContext = `Kuis ${currentModule.name}`;
  if (currentView === 'exam_arena') titleContext = 'Arena Ujian Master';
  if (currentView === 'exam_result') titleContext = 'Rapor Prestasi';

  const isExamOrQuizActive = currentView === 'exam_arena' || currentView === 'quiz_play';

  return (
    <div className="min-h-screen flex flex-col transition-colors selection:bg-sky-400 selection:text-white">
      {/* Universal Top Header */}
      <AppHeader
        progress={progress}
        currentView={currentView}
        titleContext={titleContext}
        onNavigateHome={() => setCurrentView('home')}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onToggleSound={handleToggleSound}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-5 pb-16">
        <AnimatePresence mode="wait">
          {/* VIEW: HOME DASHBOARD */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-7"
            >
              <HeroBanner
                progress={progress}
                onExploreModules={() => setCurrentView('modules_list')}
                onStartExam={handleStartExam}
              />

              <SenseIslandGrid
                progress={progress}
                onSelectSense={(senseId) => {
                  setSelectedSenseId(senseId);
                  setCurrentView('module_detail');
                }}
                onStartQuiz={(senseId) => {
                  setSelectedSenseId(senseId);
                  setCurrentView('quiz_play');
                }}
              />
            </motion.div>
          )}

          {/* VIEW: 5 MODULES LIST */}
          {currentView === 'modules_list' && (
            <motion.div
              key="modules_list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span>📚 Jelajahi 5 Pulau Keajaiban</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Pelajari anatomi lengkap, alur kerja saraf, fakta unik, dan tips dokter cilik.
                </p>
              </div>

              <SenseIslandGrid
                progress={progress}
                onSelectSense={(senseId) => {
                  setSelectedSenseId(senseId);
                  setCurrentView('module_detail');
                }}
                onStartQuiz={(senseId) => {
                  setSelectedSenseId(senseId);
                  setCurrentView('quiz_play');
                }}
              />
            </motion.div>
          )}

          {/* VIEW: MODULE DETAIL */}
          {currentView === 'module_detail' && (
            <motion.div
              key={`module_${selectedSenseId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <LessonViewer
                module={currentModule}
                isCompleted={progress.completedLessons.includes(selectedSenseId)}
                onBack={() => setCurrentView('home')}
                onCompleteLesson={() => handleCompleteLesson(selectedSenseId)}
                onStartQuiz={() => setCurrentView('quiz_play')}
              />
            </motion.div>
          )}

          {/* VIEW: QUIZ PLAY */}
          {currentView === 'quiz_play' && (
            <motion.div
              key={`quiz_${selectedSenseId}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <QuizPlayView
                senseId={selectedSenseId}
                organName={currentModule.name}
                heroEmoji={currentModule.heroEmoji}
                questions={getQuestionsForSense(selectedSenseId)}
                onFinishQuiz={handleFinishQuiz}
                onBack={() => setCurrentView('module_detail')}
              />
            </motion.div>
          )}

          {/* VIEW: EXAM ARENA */}
          {currentView === 'exam_arena' && (
            <motion.div
              key="exam_arena"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <ExamArenaView
                questions={examQuestions}
                onFinishExam={handleFinishExam}
                onExit={() => setCurrentView('home')}
              />
            </motion.div>
          )}

          {/* VIEW: EXAM RESULT / RAPOR */}
          {currentView === 'exam_result' && (
            <motion.div
              key="exam_result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <ReportCardModal
                profile={progress.profile}
                questions={examQuestions}
                userAnswers={examAnswers}
                timeSpentSeconds={examTimeSpent}
                onRetry={handleStartExam}
                onHome={() => setCurrentView('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Child-Friendly Footer */}
      {!isExamOrQuizActive && <Footer onResetData={handleResetData} />}

      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav
        currentTab={
          currentView === 'modules_list' || currentView === 'module_detail'
            ? 'modules'
            : currentView === 'quiz_play'
            ? 'quiz_select'
            : currentView === 'exam_arena' || currentView === 'exam_result'
            ? 'exam'
            : 'home'
        }
        hideDuringQuizOrExam={isExamOrQuizActive}
        onSelectTab={(tabId) => {
          if (tabId === 'home') setCurrentView('home');
          if (tabId === 'modules') setCurrentView('modules_list');
          if (tabId === 'quiz_select') {
            setSelectedSenseId('mata');
            setCurrentView('quiz_play');
          }
          if (tabId === 'exam') handleStartExam();
          if (tabId === 'profile') setIsProfileModalOpen(true);
        }}
      />

      {/* Student Profile Modal */}
      {isProfileModalOpen && (
        <StudentProfileModal
          progress={progress}
          onUpdateProfile={handleUpdateProfile}
          onResetProgress={handleResetData}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
