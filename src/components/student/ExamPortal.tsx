import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Exam, ExamAttempt, Question } from '../../types';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Bookmark,
  Send,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  BarChart3,
  Award,
  FileText
} from 'lucide-react';

interface ExamPortalProps {
  exam: Exam;
  onExit: () => void;
}

export const ExamPortal: React.FC<ExamPortalProps> = ({ exam, onExit }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptResult, setAttemptResult] = useState<ExamAttempt | null>(null);

  const currentQ: Question = exam.questions[currentIdx] || exam.questions[0];

  // Timer countdown
  useEffect(() => {
    if (attemptResult) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [attemptResult]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optId }));
  };

  const handleNumericalInput = (val: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleTrueFalse = (val: boolean) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const toggleReview = () => {
    setMarkedForReview(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleClearAnswer = () => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const answeredCount = Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] !== '').length;

  const handleSubmitExam = async () => {
    setShowSubmitModal(false);
    setIsSubmitting(true);
    try {
      const res = await api.submitExam({
        examId: exam.id,
        studentId: user?.id || 'user-student-rahul',
        studentName: user?.name || 'Rahul Das',
        answers
      });

      if (res.success && res.attempt) {
        setAttemptResult(res.attempt);
        if (res.attempt.passed) {
          try {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          } catch (e) {
            // ignore
          }
        }
      }
    } catch (err) {
      console.error('Exam submission error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If exam is completed, show comprehensive Result Screen
  if (attemptResult) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-md space-y-8 animate-in fade-in">
        {/* Header Banner */}
        <div className={`rounded-2xl p-6 text-center text-white ${attemptResult.passed ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-neutral-800 to-neutral-900'}`}>
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
            <Trophy className="w-8 h-8 text-[#FF9933]" />
          </div>
          <h2 className="text-2xl font-black">
            {attemptResult.passed
              ? t('অভিনন্দন! তুমি পরীক্ষায় উত্তীর্ণ হয়েছো 🎉', 'Congratulations! You Passed the Exam 🎉')
              : t('পরীক্ষার ফলাফল প্রকাশিত হয়েছে', 'Exam Scorecard Published')}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {exam.titleBn || exam.title} • {user?.name}
          </p>
        </div>

        {/* Score Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-center">
            <p className="text-xs text-neutral-500 font-semibold">{t('মোট প্রাপ্ত নম্বর', 'Your Score')}</p>
            <p className="text-2xl font-black text-neutral-900 mt-1">
              {attemptResult.score} <span className="text-xs text-neutral-500 font-normal">/ {attemptResult.totalMarks}</span>
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-center">
            <p className="text-xs text-neutral-500 font-semibold">{t('শতাংশ (Percentage)', 'Percentage')}</p>
            <p className="text-2xl font-black text-[#FF9933] mt-1">
              {attemptResult.percentage}%
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-semibold">{t('সঠিক উত্তর', 'Correct')}</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">
              {attemptResult.correctCount}
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-center">
            <p className="text-xs text-red-800 font-semibold">{t('ভুল উত্তর (নেগেটিভ)', 'Incorrect')}</p>
            <p className="text-2xl font-black text-red-700 mt-1">
              {attemptResult.incorrectCount}
            </p>
          </div>
        </div>

        {/* Topic Breakdown */}
        {attemptResult.topicPerformance && attemptResult.topicPerformance.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#FF9933]" />
              {t('অধ্যায় ও বিষয়ভিত্তিক মূল্যায়ন (Topic-wise Mastery)', 'Topic-wise Performance Analysis')}
            </h4>
            <div className="space-y-2">
              {attemptResult.topicPerformance.map((tp, idx) => {
                const pct = Math.round((tp.score / tp.total) * 100);
                return (
                  <div key={idx} className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{tp.topic}</span>
                      <span>{tp.score} / {tp.total} marks ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF9933] rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Solutions Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#FF9933]" />
            {t('প্রতিটি প্রশ্নের পুঙ্খানুপুঙ্খ বাংলা সমাধান ও ব্যাখ্যা', 'Detailed Question Solutions & Explanations')}
          </h4>

          <div className="space-y-4">
            {exam.questions.map((q, i) => {
              const userAns = attemptResult.answers[q.id];
              let isRight = false;
              if (q.type === 'mcq') isRight = userAns === q.correctOptionId;
              if (q.type === 'numerical') isRight = Math.abs(Number(userAns) - Number(q.numericalAnswer)) <= (q.tolerance || 0.1);
              if (q.type === 'true_false') isRight = userAns === q.trueFalseAnswer;

              return (
                <div key={q.id} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-500">প্রশ্ন {i + 1} ({q.marks} নম্বর)</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${isRight ? 'bg-emerald-100 text-emerald-800' : userAns ? 'bg-red-100 text-red-800' : 'bg-neutral-100 text-neutral-600'}`}>
                      {isRight ? t('সঠিক (+)', 'Correct') : userAns ? t('ভুল (-)', 'Incorrect') : t('উত্তর দাওনি', 'Unattempted')}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-neutral-900">
                    {q.questionTextBn || q.questionText}
                  </p>
                  <p className="text-xs text-neutral-500 italic">
                    {q.questionText}
                  </p>

                  {/* Options */}
                  {q.type === 'mcq' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
                      {q.options.map(opt => {
                        const isCorrectOpt = opt.id === q.correctOptionId;
                        const isChosen = userAns === opt.id;
                        return (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-lg text-xs border ${
                              isCorrectOpt
                                ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                                : isChosen
                                ? 'bg-red-50 border-red-300 text-red-900'
                                : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                            }`}
                          >
                            <span className="font-mono font-bold mr-1.5">{opt.id.toUpperCase()}:</span>
                            {opt.textBn || opt.text}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation Box */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-neutral-800 space-y-1">
                    <p className="font-bold text-amber-900 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-[#FF9933]" />
                      {t('সঠিক উত্তরের ব্যাখ্যা:', 'Explanation:')}
                    </p>
                    <p className="leading-relaxed">{q.explanationBn}</p>
                    <p className="text-neutral-500 text-[11px]">{q.explanationEn}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exit Button */}
        <div className="pt-4 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onExit}
            className="px-6 py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all"
          >
            {t('ড্যাশবোর্ডে ফিরে যান', 'Return to Student Dashboard')}
          </button>
        </div>
      </div>
    );
  }

  // Active Exam Interface
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-md overflow-hidden">
      {/* Top Header with Timer and Live Progress */}
      <div className="bg-neutral-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/20 px-2 py-0.5 rounded">
            {exam.subject} • {exam.classLevel}
          </span>
          <h3 className="text-base font-bold text-white mt-1">
            {exam.titleBn || exam.title}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-neutral-800 px-3.5 py-1.5 rounded-xl border border-neutral-700">
            <Clock className={`w-4 h-4 ${timeLeftSeconds < 300 ? 'text-red-400 animate-pulse' : 'text-[#FF9933]'}`} />
            <span className={`font-mono font-bold text-sm ${timeLeftSeconds < 300 ? 'text-red-400' : 'text-white'}`}>
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-sm"
          >
            {t('সাবমিট করো', 'Submit Test')}
          </button>
        </div>
      </div>

      {/* Main Layout: Question Area + Question Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[480px]">
        {/* Left: Question Box */}
        <div className="lg:col-span-3 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-neutral-100 pb-2">
              <span className="font-bold text-neutral-800">
                {t(`প্রশ্ন ${currentIdx + 1} / ${exam.questions.length}`, `Question ${currentIdx + 1} of ${exam.questions.length}`)}
              </span>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  +{currentQ.marks} {t('নম্বর', 'Marks')}
                </span>
                <span className="bg-red-50 text-red-800 font-semibold px-2 py-0.5 rounded">
                  -{exam.negativeMarking} {t('নেগেটিভ', 'Negative')}
                </span>
                <button
                  onClick={toggleReview}
                  className={`p-1.5 rounded-lg border transition-all ${
                    markedForReview[currentQ.id]
                      ? 'bg-purple-100 border-purple-300 text-purple-800 font-bold'
                      : 'border-neutral-200 text-neutral-500 hover:text-black'
                  }`}
                  title="Mark for review"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2 my-2">
              <p className="text-base font-bold text-neutral-900 leading-relaxed">
                {currentQ.questionTextBn}
              </p>
              <p className="text-xs text-neutral-500 italic">
                {currentQ.questionText}
              </p>
            </div>

            {/* Question Input Types */}
            {currentQ.type === 'mcq' && currentQ.options && (
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map(opt => {
                  const selected = answers[currentQ.id] === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selected
                          ? 'border-[#FF9933] bg-orange-50/40 text-neutral-900 shadow-xs'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                        selected ? 'border-[#FF9933] bg-[#FF9933] text-black' : 'border-neutral-300 text-neutral-500'
                      }`}>
                        {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        {opt.textBn || opt.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'numerical' && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-neutral-700">
                  {t('তোমার গাণিতিক উত্তরটি সংখ্যায় লিখো:', 'Enter your numerical answer:')}
                </label>
                <input
                  type="number"
                  step="any"
                  value={answers[currentQ.id] || ''}
                  onChange={e => handleNumericalInput(e.target.value)}
                  placeholder="e.g. 2 or 484"
                  className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-neutral-300 text-lg font-mono focus:outline-none focus:border-[#FF9933]"
                />
              </div>
            )}

            {currentQ.type === 'true_false' && (
              <div className="flex gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => handleTrueFalse(true)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                    answers[currentQ.id] === true
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {t('সত্য (True)', 'True')}
                </button>
                <button
                  type="button"
                  onClick={() => handleTrueFalse(false)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                    answers[currentQ.id] === false
                      ? 'bg-red-100 border-red-400 text-red-900'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {t('মিথ্যা (False)', 'False')}
                </button>
              </div>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-semibold hover:bg-neutral-50 disabled:opacity-40 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t('পূর্ববর্তী', 'Previous')}
              </button>

              <button
                disabled={currentIdx === exam.questions.length - 1}
                onClick={() => setCurrentIdx(prev => Math.min(exam.questions.length - 1, prev + 1))}
                className="px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-semibold hover:bg-neutral-50 disabled:opacity-40 flex items-center gap-1.5"
              >
                {t('পরবর্তী', 'Next')}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearAnswer}
                className="px-3 py-2 text-xs text-neutral-500 hover:text-neutral-900"
              >
                {t('উত্তর মুছুন', 'Clear Response')}
              </button>

              <button
                onClick={() => {
                  if (currentIdx < exam.questions.length - 1) {
                    setCurrentIdx(prev => prev + 1);
                  } else {
                    setShowSubmitModal(true);
                  }
                }}
                className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-all"
              >
                {currentIdx < exam.questions.length - 1 ? t('সংরক্ষণ ও পরবর্তী', 'Save & Next') : t('পরীক্ষা শেষ করো', 'Finish')}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Palette / Summary */}
        <div className="p-5 bg-neutral-50 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              {t('প্রশ্ন তালিকা (Question Palette)', 'Question Palette')}
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
                const isReviewed = markedForReview[q.id];
                const isCurrent = idx === currentIdx;

                let badgeClass = 'bg-white border-neutral-200 text-neutral-700';
                if (isAnswered) badgeClass = 'bg-emerald-600 text-white border-emerald-600';
                if (isReviewed) badgeClass = 'bg-purple-600 text-white border-purple-600';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold border transition-all flex items-center justify-center relative ${badgeClass} ${
                      isCurrent ? 'ring-2 ring-[#FF9933] ring-offset-2' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-neutral-200 space-y-2 text-[11px] text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <span>{t('উত্তর দেওয়া হয়েছে', 'Answered')} ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                <span>{t('পুনর্বিবেচনার জন্য চিহ্নিত', 'Marked for Review')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white border border-neutral-300"></span>
                <span>{t('উত্তর দেওয়া হয়নি', 'Not Answered')} ({exam.questions.length - answeredCount})</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-sm"
            >
              {t('পরীক্ষা সাবমিট করুন', 'Submit Test Now')}
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {t('তুমি কি পরীক্ষা সাবমিট করতে চাও?', 'Are you sure you want to submit?')}
                </h3>
                <p className="text-xs text-neutral-500">
                  {t('সাবমিট করার পর আর উত্তর পরিবর্তন করা যাবে না।', 'You cannot change answers once submitted.')}
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-3 text-xs space-y-1.5 border border-neutral-200">
              <div className="flex justify-between">
                <span>{t('মোট প্রশ্নের সংখ্যা:', 'Total Questions:')}</span>
                <span className="font-bold">{exam.questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>{t('উত্তর সম্পন্ন হয়েছে:', 'Answered:')}</span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>{t('উত্তর বাকি আছে:', 'Unanswered:')}</span>
                <span className="font-bold">{exam.questions.length - answeredCount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold hover:bg-neutral-50"
              >
                {t('ফিরে যাও', 'Go Back')}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-xl bg-[#FF9933] text-black text-xs font-bold hover:bg-[#ffaa55] shadow-sm"
              >
                {isSubmitting ? t('সাবমিট হচ্ছে...', 'Submitting...') : t('হ্যাঁ, সাবমিট করো', 'Yes, Submit Test')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
