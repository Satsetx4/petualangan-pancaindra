import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Printer,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  BarChart2,
} from 'lucide-react';
import type { QuizQuestion, SenseType, StudentProfile } from '../../types';
import { TapButton } from '../ui/TapButton';
import { sound } from '../../lib/sound';
import { calculateExamScore } from '../../lib/learning';
import { SITE_URL } from '../../lib/site';

interface ReportCardModalProps {
  profile: StudentProfile;
  questions: QuizQuestion[];
  userAnswers: Record<number, number>;
  timeSpentSeconds: number;
  starsEarned: number;
  onRetry: () => void;
  onHome: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  profile,
  questions,
  userAnswers,
  timeSpentSeconds,
  starsEarned,
  onRetry,
  onHome,
}) => {
  const [showReview, setShowReview] = useState<boolean>(false);

  const total = questions.length;
  const score = calculateExamScore(questions, userAnswers);
  const { correctCount, percentage, breakdown } = score;

  // Medal determination
  let medalEmoji = '🎖️';
  let medalName = 'Medali Peserta Petualang';
  let medalColor = 'from-slate-400 to-slate-600';
  let rankTitle = 'Detektif Pembelajar Cilik';

  if (percentage >= 85) {
    medalEmoji = '🥇';
    medalName = 'Medali Emas Kehormatan';
    medalColor = 'from-amber-400 to-yellow-500';
    rankTitle = 'Master Detektif Pancaindra';
  } else if (percentage >= 70) {
    medalEmoji = '🥈';
    medalName = 'Medali Perak Prestasi';
    medalColor = 'from-slate-300 to-slate-400';
    rankTitle = 'Detektif Hebat Pancaindra';
  } else if (percentage >= 50) {
    medalEmoji = '🥉';
    medalName = 'Medali Perunggu Usaha';
    medalColor = 'from-amber-600 to-amber-700';
    rankTitle = 'Detektif Rajin Pancaindra';
  }

  // Breakdown per sense
  const sensesList: SenseType[] = ['mata', 'telinga', 'lidah', 'hidung', 'kulit'];

  const formatMinutes = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m} menit ${s} detik`;
  };

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  const handleShareWhatsApp = () => {
    sound.playPop();
    const studentName = profile.name ? profile.name.trim() : 'Detektif Cilik';
    const text = `Halo Bapak/Ibu Guru dan Bunda! 🌟\n\nSaya *${studentName}* telah menyelesaikan *Ujian Master Pancaindra (IPAS SD)* di aplikasi *Petualangan Pancaindra*!\n\n📊 Hasil Ujian:\n• Nilai Akhir: *${percentage}/100* (${correctCount} dari ${total} soal benar)\n• Penghargaan: *${medalName}* (${rankTitle})\n• Waktu Pengerjaan: ${formatMinutes(timeSpentSeconds)}\n\nAyo coba belajar dan ikuti ujiannya di: ${SITE_URL}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Printable Certificate & Report Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border-4 border-amber-300 dark:border-amber-600 shadow-2xl space-y-6 text-center relative overflow-hidden"
      >
        {/* Certificate Watermark Header */}
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black tracking-widest uppercase">
            Rapor Prestasi Detektif Pancaindra
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 font-display">
            Hasil Ujian Master
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            Diberikan dengan bangga kepada:
          </p>
        </div>

        {/* Student Identification */}
        <div className="py-2 inline-flex items-center gap-3 px-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <span className="text-4xl">{profile.avatarEmoji}</span>
          <div className="text-left">
            <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-display">
              {profile.name || 'Peserta'}
            </h4>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400">
              Gelar: {rankTitle}
            </span>
          </div>
        </div>

        {/* Medal Emblem Display */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${medalColor} shadow-xl flex items-center justify-center text-5xl border-4 border-white dark:border-slate-800`}>
            {medalEmoji}
          </div>
          <div>
            <h5 className="text-lg font-black text-slate-800 dark:text-slate-100 font-display">
              {medalName}
            </h5>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Waktu Pengerjaan: {formatMinutes(timeSpentSeconds)}
            </p>
          </div>
        </div>

        {/* Big Score Counter */}
        <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Nilai Akhir
            </span>
            <span className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400 font-display">
              {percentage}
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Benar
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">
              {correctCount}/{total}
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Bintang
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500 font-display">
              ⭐ +{starsEarned}
            </span>
          </div>
        </div>

        {/* Breakdown per Sense */}
        <div className="text-left space-y-2.5 pt-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <BarChart2 className="w-4 h-4" />
            </span>
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 font-display">
              Rincian Nilai per Indra:
            </h5>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sensesList.map((sense) => {
              const item = breakdown[sense];
              if (!item || item.total === 0) return null;
              const ratio = Math.round((item.correct / item.total) * 100);

              const senseNames: Record<string, { label: string; icon: string }> = {
                mata: { label: 'Mata (Penglihat)', icon: '👁️' },
                telinga: { label: 'Telinga (Pendengar)', icon: '👂' },
                lidah: { label: 'Lidah (Pengecap)', icon: '👅' },
                hidung: { label: 'Hidung (Pencium)', icon: '👃' },
                kulit: { label: 'Kulit (Peraba)', icon: '✋' },
              };

              return (
                <div
                  key={sense}
                  className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>
                      {senseNames[sense].icon} {senseNames[sense].label}
                    </span>
                    <span>
                      {item.correct}/{item.total} ({ratio}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        ratio >= 66 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons (no-print) */}
        <div className="no-print pt-4 flex flex-wrap gap-2.5 justify-center">
          <TapButton
            variant="success"
            size="md"
            icon={<Share2 className="w-4 h-4" />}
            onClick={handleShareWhatsApp}
          >
            Kirim ke WhatsApp Guru/Ortu
          </TapButton>

          <TapButton
            variant="amber"
            size="md"
            icon={<Printer className="w-4 h-4" />}
            onClick={handlePrint}
          >
            Cetak Sertifikat
          </TapButton>

          <TapButton
            variant="secondary"
            size="md"
            icon={showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            onClick={() => {
              sound.playPop();
              setShowReview(!showReview);
            }}
          >
            {showReview ? 'Tutup Pembahasan' : 'Ulas Jawaban'}
          </TapButton>

          <TapButton
            variant="secondary"
            size="md"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={() => {
              sound.playPop();
              onRetry();
            }}
          >
            Ujian Lagi
          </TapButton>

          <TapButton
            variant="primary"
            size="md"
            icon={<Home className="w-4 h-4" />}
            onClick={() => {
              sound.playPop();
              onHome();
            }}
          >
            Beranda
          </TapButton>
        </div>
      </motion.div>

      {/* Question Review Section */}
      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="no-print space-y-4 pt-2"
          >
            <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span>📖 Ulasan Pembahasan Soal Ujian (1–{total})</span>
            </h4>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAns = userAnswers[idx];
                const isUserCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border-2 space-y-2.5 bg-white dark:bg-slate-900 ${
                      isUserCorrect
                        ? 'border-emerald-200 dark:border-emerald-800'
                        : 'border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                        Soal {idx + 1} • {q.senseId.toUpperCase()}
                      </span>
                      {isUserCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Benar</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-500 text-xs font-bold">
                          <XCircle className="w-4 h-4" />
                          <span>Belum Tepat</span>
                        </span>
                      )}
                    </div>

                    <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {q.question}
                    </h5>

                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700 dark:text-slate-300">Jawabanmu:</span>
                        <span
                          className={`font-bold ${
                            isUserCorrect ? 'text-emerald-600' : 'text-rose-500'
                          }`}
                        >
                          {userAns !== undefined ? q.options[userAns] : 'Tidak dijawab'}
                        </span>
                      </div>
                      {!isUserCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-700 dark:text-slate-300">Jawaban Benar:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {q.options[q.correctIndex]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      💡 <strong>Pembahasan:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
