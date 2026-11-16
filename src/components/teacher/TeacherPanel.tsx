import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  LiveClass,
  RecordedClass,
  StudyMaterial,
  Exam,
  ExamAttempt,
  Assignment,
  AssignmentSubmission,
  Batch,
  Course,
  StudentDoubt
} from '../../types';
import { api } from '../../services/api';
import { SocialPlatformIcon } from '../social/OfficialSocialChannels';
import { OFFICIAL_SOCIAL_CHANNELS } from '../../data/mockData';
import {
  Video,
  Radio,
  FileText,
  Award,
  MessageSquare,
  Users,
  Plus,
  Play,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  BookOpen,
  Calendar,
  Send,
  AlertCircle,
  HelpCircle,
  Check,
  TrendingUp,
  Trash2,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface TeacherPanelProps {
  courses: Course[];
  batches: Batch[];
  liveClasses: LiveClass[];
  recordedClasses: RecordedClass[];
  studyMaterials: StudyMaterial[];
  exams: Exam[];
  onRefreshData?: () => void;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  courses = [],
  batches = [],
  liveClasses = [],
  recordedClasses = [],
  studyMaterials = [],
  exams = [],
  onRefreshData
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    'live_classes' | 'recordings' | 'analytics' | 'assignments' | 'doubts' | 'materials' | 'rosters'
  >('live_classes');

  // Submissions, Attempts & Doubts state
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [doubts, setDoubts] = useState<StudentDoubt[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Forms State
  // 1. Live Class Form
  const [liveTitle, setLiveTitle] = useState('');
  const [liveChapter, setLiveChapter] = useState('Current Electricity');
  const [liveBatchId, setLiveBatchId] = useState(batches[0]?.id || '');
  const [liveScheduledAt, setLiveScheduledAt] = useState('');
  const [liveDuration, setLiveDuration] = useState('90');
  const [liveMeetUrl, setLiveMeetUrl] = useState('https://meet.google.com/pfd-live-room');
  const [showLiveModal, setShowLiveModal] = useState(false);

  // 2. Recorded Lecture Form
  const [recTitle, setRecTitle] = useState('');
  const [recChapter, setRecChapter] = useState('Current Electricity');
  const [recCourseId, setRecCourseId] = useState(courses[0]?.id || '');
  const [recDuration, setRecDuration] = useState('45');
  const [recVideoUrl, setRecVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [recSummary, setRecSummary] = useState('');
  const [showRecModal, setShowRecModal] = useState(false);

  // 3. Material Form
  const [matTitle, setMatTitle] = useState('');
  const [matChapter, setMatChapter] = useState('Current Electricity');
  const [matCategory, setMatCategory] = useState<'notes' | 'formula_sheet' | 'pyq' | 'worksheet'>('formula_sheet');
  const [matFileSize, setMatFileSize] = useState('3.8 MB');
  const [showMatModal, setShowMatModal] = useState(false);

  // 4. Doubt Reply State
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // 5. Assignment Grading State
  const [gradingMarksMap, setGradingMarksMap] = useState<Record<string, string>>({});
  const [gradingFeedbackMap, setGradingFeedbackMap] = useState<Record<string, string>>({});

  // Fetch attempts, submissions and doubts from central API
  const loadTeacherData = async () => {
    try {
      const [attemptsData, subsData, doubtsData] = await Promise.all([
        api.getAllExamAttempts().catch(() => []),
        api.getAssignmentSubmissions().catch(() => []),
        api.getDoubts().catch(() => [])
      ]);
      setExamAttempts(attemptsData);
      setSubmissions(subsData);
      setDoubts(doubtsData);
    } catch (err) {
      console.warn('Teacher data load warning', err);
    }
  };

  useEffect(() => {
    loadTeacherData();
    const interval = setInterval(loadTeacherData, 8000);
    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // Schedule Live Class
  const handleScheduleLiveClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTitle.trim()) return;
    setIsSubmitting(true);
    try {
      const newClass: Partial<LiveClass> = {
        title: liveTitle,
        titleBn: liveTitle,
        teacherName: user?.name || 'Subrata Acharya (Physics Faculty)',
        subject: 'Physics',
        chapter: liveChapter,
        chapterBn: liveChapter,
        batchId: liveBatchId || batches[0]?.id || 'batch-madhyamik-2026',
        scheduledAt: liveScheduledAt || new Date(Date.now() + 3600000 * 2).toISOString(),
        durationMinutes: parseInt(liveDuration) || 90,
        meetUrl: liveMeetUrl,
        status: 'upcoming'
      };
      await api.createLiveClass(newClass);
      triggerToast(t('লাইভ ক্লাস সফলভাবে নির্ধারিত ও স্টুডেন্টদের জানানো হয়েছে!', 'Live class scheduled and broadcast to students!'));
      setLiveTitle('');
      setShowLiveModal(false);
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload Recorded Lecture
  const handleUploadRecording = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recTitle.trim()) return;
    setIsSubmitting(true);
    try {
      const newRec: Partial<RecordedClass> = {
        title: recTitle,
        titleBn: recTitle,
        subject: 'Physics',
        chapter: recChapter,
        chapterBn: recChapter,
        courseId: recCourseId || courses[0]?.id,
        durationMinutes: parseInt(recDuration) || 45,
        videoUrl: recVideoUrl,
        thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
        views: 1,
        notesAvailable: true,
        summaryBn: recSummary || `${recChapter} অধ্যায়ের সম্পূর্ণ বিষদ আলোচনা ও গাণিতিক উদাহরণ।`
      };
      await api.addRecordedClass(newRec);
      triggerToast(t('লেকচার ভিডিও সফলভাবে সেন্ট্রাল লাইব্রেরিতে আপলোড হয়েছে!', 'Lecture video uploaded to central library!'));
      setRecTitle('');
      setRecSummary('');
      setShowRecModal(false);
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload Study Material
  const handleUploadMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;
    setIsSubmitting(true);
    try {
      const newMat: Partial<StudyMaterial> = {
        title: matTitle,
        titleBn: matTitle,
        category: matCategory,
        subject: 'Physics',
        chapter: matChapter,
        chapterBn: matChapter,
        classLevel: 'Class 10 / 11 / 12',
        language: 'both',
        fileSize: matFileSize,
        downloadUrl: '#',
        pages: 12
      };
      await api.addStudyMaterial(newMat);
      triggerToast(t('স্টাডি মেটেরিয়াল যুক্ত হয়েছে!', 'Study material added!'));
      setMatTitle('');
      setShowMatModal(false);
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Answer Student Doubt
  const handleReplyDoubt = async (doubtId: string) => {
    const text = replyTextMap[doubtId];
    if (!text || !text.trim()) return;
    try {
      const res = await api.replyDoubt(doubtId, text, user?.name || 'Subrata Acharya');
      if (res.doubts) {
        setDoubts(res.doubts);
      }
      setReplyTextMap(prev => ({ ...prev, [doubtId]: '' }));
      triggerToast(t('প্রশ্নের উত্তর সরাসরি স্টুডেন্টের অ্যাকাউন্টে পাঠানো হয়েছে!', 'Doubt answer delivered to student portal & app!'));
    } catch (err) {
      console.error(err);
    }
  };

  // Grade Assignment Submission
  const handleGradeSubmission = async (submId: string, maxMarks: number) => {
    const marksStr = gradingMarksMap[submId];
    const feedback = gradingFeedbackMap[submId] || 'Good effort. Keep practicing physics numericals.';
    if (!marksStr) return;
    const marks = Number(marksStr);
    try {
      const res = await api.gradeAssignment({
        submissionId: submId,
        marksAwarded: marks,
        feedback
      });
      if (res.submissions) {
        setSubmissions(res.submissions);
      }
      triggerToast(t('অ্যাসাইনমেন্ট গ্রেডিং সম্পন্ন হয়েছে!', 'Assignment successfully graded!'));
    } catch (err) {
      console.error(err);
    }
  };

  const pendingDoubtsCount = doubts.filter(d => d.status === 'pending').length;
  const pendingSubmissionsCount = submissions.filter(s => s.status === 'submitted').length;
  const avgExamScore = examAttempts.length > 0
    ? Math.round(examAttempts.reduce((acc, a) => acc + a.percentage, 0) / examAttempts.length)
    : 84;

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/40 animate-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            ✓
          </div>
          <div>
            <p className="text-xs font-bold text-white">{successToast}</p>
            <p className="text-[10px] text-emerald-400">Synced to Central Database • Visible across Website & App</p>
          </div>
        </div>
      )}

      {/* Faculty Profile & Central Connected Node Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-black text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF9933] to-amber-500 text-black flex items-center justify-center font-black text-2xl shadow-lg shadow-orange-500/30">
              SA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#FF9933]/20 border border-[#FF9933]/40 text-[#FF9933] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                  Physics Faculty Portal
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Central DB Live
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mt-1">
                {user?.name || 'Subrata Acharya'}
              </h2>
              <p className="text-xs text-neutral-400">
                Senior Physics Faculty • Contai & WBCHSE / WBBSE Expert • Courses Assigned: {courses.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={() => {
                loadTeacherData();
                onRefreshData?.();
                triggerToast(t('সেন্ট্রাল ডেটা রিফ্রেশ করা হয়েছে!', 'Central ecosystem synced!'));
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('সিঙ্ক রিফ্রেশ', 'Sync Now')}</span>
            </button>
            <button
              onClick={() => setShowLiveModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF9933] hover:bg-[#ffaa55] text-black text-xs font-bold shadow-lg shadow-orange-500/20 transition-all"
            >
              <Radio className="w-4 h-4" />
              <span>{t('লাইভ ক্লাস তৈরি করো', 'Schedule Live Class')}</span>
            </button>
          </div>
        </div>

        {/* Real-time KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-neutral-800 text-neutral-300">
          <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-700/50">
            <p className="text-[11px] text-neutral-400">Scheduled Live Classes</p>
            <p className="text-xl font-black text-white mt-0.5">{liveClasses.length}</p>
          </div>
          <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-700/50">
            <p className="text-[11px] text-neutral-400">Student Doubts</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xl font-black text-white">{doubts.length}</p>
              {pendingDoubtsCount > 0 && (
                <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold">
                  {pendingDoubtsCount} Pending
                </span>
              )}
            </div>
          </div>
          <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-700/50">
            <p className="text-[11px] text-neutral-400">Exam Attempts Evaluated</p>
            <p className="text-xl font-black text-white mt-0.5">{examAttempts.length}</p>
          </div>
          <div className="bg-neutral-800/50 p-3 rounded-2xl border border-neutral-700/50">
            <p className="text-[11px] text-neutral-400">Avg Batch Exam Score</p>
            <p className="text-xl font-black text-emerald-400 mt-0.5">{avgExamScore}%</p>
          </div>
        </div>
      </div>

      {/* Official Student Community & Doubt Channels Strip */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF9933] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">
              {t('অফিসিয়াল স্টুডেন্ট কমিউনিটি ও ডাউট সমাধান চ্যানেল', 'Official Student Communities & Channels')}
            </h4>
            <p className="text-[11px] text-neutral-500">
              {t('ছাত্রছাত্রীদের ডাউট ক্লিয়ারিং গ্রুপ, নোটিশ চ্যানেল ও লেকচার প্ল্যাটফর্মসমূহ', 'Direct student doubt groups, announcement broadcasts & video lectures')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {OFFICIAL_SOCIAL_CHANNELS.map(ch => (
            <a
              key={ch.id}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${ch.name} - ${ch.buttonText}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 transition-all text-neutral-800 shadow-2xs"
            >
              <SocialPlatformIcon platformId={ch.id} size={16} />
              <span>{ch.platform}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          ))}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none bg-white p-1.5 rounded-2xl border border-neutral-200">
        <button
          onClick={() => setActiveTab('live_classes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'live_classes'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-[#FF9933]" />
          <span>{t('লাইভ ক্লাস স্টুডিও', 'Live Classes')} ({liveClasses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('doubts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'doubts'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#FF9933]" />
          <span>{t('স্টুডেন্ট ডাউট ডেস্ক', 'Doubt Desk')}</span>
          {pendingDoubtsCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingDoubtsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'analytics'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-[#FF9933]" />
          <span>{t('পরীক্ষার ফলাফল ও অ্যানালিটিক্স', 'Exam Results')} ({examAttempts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'assignments'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-[#FF9933]" />
          <span>{t('অ্যাসাইনমেন্ট খাতা দেখা', 'Grading Desk')}</span>
          {pendingSubmissionsCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] flex items-center justify-center font-bold">
              {pendingSubmissionsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('recordings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'recordings'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-[#FF9933]" />
          <span>{t('লেকচার ভিডিও লাইব্রেরি', 'Lecture Videos')} ({recordedClasses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'materials'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#FF9933]" />
          <span>{t('নোটস ও ফর্মুলা শিট', 'Materials')} ({studyMaterials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rosters')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'rosters'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#FF9933]" />
          <span>{t('ব্যাচ রোস্টার', 'Batch Rosters')} ({batches.length})</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. LIVE CLASSES STUDIO */}
      {activeTab === 'live_classes' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-neutral-200">
            <div>
              <h3 className="font-black text-lg text-neutral-900">
                {t('লাইভ ক্লাস শিডিউলার ও নিয়ন্ত্রণ', 'Live Class Studio & Broadcast')}
              </h3>
              <p className="text-xs text-neutral-500">
                {t(
                  'এখানে নির্ধারিত লাইভ ক্লাস সঙ্গে সঙ্গে স্টুডেন্ট অ্যাপ ও ওয়েবসাইটে পৌঁছে যাবে এবং নোটিফিকেশন যাবে।',
                  'Classes scheduled here immediately appear on Student Website & Mobile App, and trigger student push notifications.'
                )}
              </p>
            </div>
            <button
              onClick={() => setShowLiveModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold hover:bg-black transition-colors"
            >
              <Plus className="w-4 h-4 text-[#FF9933]" />
              <span>{t('নতুন ক্লাস নির্ধারণ করো', 'Schedule Class')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveClasses.map(lc => (
              <div
                key={lc.id}
                className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-neutral-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded-md">
                      {lc.subject} • {lc.chapter}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      {lc.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-black text-base text-neutral-900 mt-2">
                    {lc.titleBn || lc.title}
                  </h4>
                  <div className="mt-3 space-y-1.5 text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{new Date(lc.scheduledAt).toLocaleString()} ({lc.durationMinutes} mins)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Faculty: {lc.teacherName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <a
                    href={lc.meetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF9933] text-black text-xs font-bold hover:bg-[#ffaa55] transition-all"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>{t('ক্লাস চালু করো (Host)', 'Start / Join Meeting')}</span>
                  </a>

                  <button
                    onClick={async () => {
                      if (confirm('Cancel and delete this live class?')) {
                        await api.deleteLiveClass(lc.id);
                        onRefreshData?.();
                      }
                    }}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Cancel class"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. STUDENT DOUBTS DESK */}
      {activeTab === 'doubts' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-neutral-200">
            <h3 className="font-black text-lg text-neutral-900">
              {t('স্টুডেন্ট ডাউট ও প্রশ্ন সমাধান ডেস্ক', 'Student Physics Doubts Desk')}
            </h3>
            <p className="text-xs text-neutral-500">
              {t(
                'শিক্ষার্থীরা মোবাইল অ্যাপ বা ওয়েবসাইট থেকে যে প্রশ্ন পাঠিয়েছে, এখানে উত্তর দিলে তা সাথে সাথে তাদের অ্যাকাউন্টে পৌঁছে যাবে।',
                'Questions asked by students from Mobile App or Website. Replies here are instantly synced to their student dashboard.'
              )}
            </p>
          </div>

          <div className="space-y-4">
            {doubts.map(d => (
              <div
                key={d.id}
                className={`bg-white p-5 sm:p-6 rounded-3xl border transition-all ${
                  d.status === 'pending' ? 'border-amber-300 shadow-sm' : 'border-neutral-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900">{d.studentName}</span>
                    <span className="text-[11px] text-neutral-400">({d.studentPhone || 'Student'})</span>
                    <span className="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                      {d.chapter}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        d.status === 'answered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}
                    >
                      {d.status === 'answered' ? '✓ Answered' : '● Needs Reply'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="py-4">
                  <p className="text-sm font-semibold text-neutral-800 leading-relaxed">
                    "{d.questionText}"
                  </p>
                </div>

                {d.teacherReply ? (
                  <div className="bg-emerald-50/60 border border-emerald-200/60 p-4 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('শিক্ষকের সমাধান (Sent to Student)', 'Faculty Explanation (Delivered)')}</span>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed">{d.teacherReply}</p>
                    <p className="text-[10px] text-neutral-400 mt-2">
                      Replied by {d.teacherName} • {d.repliedAt ? new Date(d.repliedAt).toLocaleString() : 'Recently'}
                    </p>
                  </div>
                ) : (
                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-bold text-neutral-700">
                      {t('তোমার পদার্থবিজ্ঞান সমাধান বা ব্যাখ্যা লিখুন:', 'Write Physics Explanation / Derivation:')}
                    </label>
                    <textarea
                      rows={3}
                      value={replyTextMap[d.id] || ''}
                      onChange={e =>
                        setReplyTextMap(prev => ({ ...prev, [d.id]: e.target.value }))
                      }
                      placeholder={t('সূত্র, যুক্তি ও ধাপসমূহ বিস্তারিত লিখুন...', 'Explain formula, steps, and reasoning clearly...')}
                      className="w-full text-xs p-3 rounded-2xl border border-neutral-300 focus:outline-hidden focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleReplyDoubt(d.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-bold transition-colors"
                      >
                        <Send className="w-3.5 h-3.5 text-[#FF9933]" />
                        <span>{t('উত্তর পাঠাও (Send to Student)', 'Publish Answer & Notify')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. EXAM PERFORMANCE & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-black text-lg text-neutral-900">
                {t('পরীক্ষার ফলাফল ও স্টুডেন্ট পারফরম্যান্স ট্র্যাক', 'Student Exam Submissions & Analytics')}
              </h3>
              <p className="text-xs text-neutral-500">
                {t(
                  'স্টুডেন্ট মোবাইল অ্যাপ বা ওয়েবসাইট থেকে যে মক টেস্ট জমা দেয়, সেন্ট্রাল ব্যাকএন্ড মূল্যায়নের পর এখানে বিস্তারিত দেখা যায়।',
                  'Live exam submissions evaluated by backend. Monitor scores, passing rates and topic breakdown.'
                )}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Exam Title</th>
                    <th className="px-4 py-3">Score / Total</th>
                    <th className="px-4 py-3">Percentage</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Accuracy (Correct/Wrong)</th>
                    <th className="px-4 py-3">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {examAttempts.map(att => (
                    <tr key={att.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-neutral-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#FF9933]/20 text-[#FF9933] flex items-center justify-center text-xs font-black">
                          {att.studentName.charAt(0)}
                        </div>
                        <span>{att.studentName}</span>
                      </td>
                      <td className="px-4 py-3.5 text-neutral-700 max-w-xs truncate">
                        {att.examTitle}
                      </td>
                      <td className="px-4 py-3.5 font-black text-neutral-900">
                        {att.score} / {att.totalMarks}
                      </td>
                      <td className="px-4 py-3.5 font-bold">
                        <span
                          className={`${
                            att.percentage >= 80
                              ? 'text-emerald-600'
                              : att.percentage >= 50
                              ? 'text-amber-600'
                              : 'text-red-600'
                          }`}
                        >
                          {att.percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            att.passed
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {att.passed ? 'PASSED' : 'NEEDS REVISION'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-neutral-600">
                        <span className="text-emerald-600 font-bold">{att.correctCount}✓</span> /{' '}
                        <span className="text-red-500 font-bold">{att.incorrectCount}✗</span>
                      </td>
                      <td className="px-4 py-3.5 text-neutral-400 text-[11px]">
                        {new Date(att.submittedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. ASSIGNMENT GRADING DESK */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-neutral-200">
            <h3 className="font-black text-lg text-neutral-900">
              {t('অ্যাসাইনমেন্ট ও খাতা মূল্যায়ন ডেস্ক', 'Assignment Submissions & Grading')}
            </h3>
            <p className="text-xs text-neutral-500">
              {t('শিক্ষার্থীদের পাঠানো অ্যাসাইনমেন্টের সমাধান দেখুন ও নম্বর এবং ফিডব্যাক প্রদান করুন।', 'Review homework solutions submitted by students, award marks and send personalized feedback.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submissions.map(sub => (
              <div
                key={sub.id}
                className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-xs text-neutral-700">
                      {sub.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{sub.studentName}</h4>
                      <p className="text-[10px] text-neutral-400">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sub.status === 'graded'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {sub.status === 'graded' ? `Graded (${sub.marksAwarded} Marks)` : 'Pending Grading'}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-neutral-800">{sub.assignmentTitle}</p>
                  <p className="text-xs text-neutral-500 mt-1 italic">"{sub.notes || 'Solution PDF attached'}"</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[#FF9933] font-bold">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{sub.fileName}</span>
                  </div>
                </div>

                {sub.status === 'graded' ? (
                  <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-200 text-xs">
                    <p className="font-bold text-neutral-900">Marks: {sub.marksAwarded}</p>
                    <p className="text-neutral-600 mt-0.5 text-[11px]">Feedback: {sub.feedback}</p>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-neutral-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-600">Marks Awarded</label>
                        <input
                          type="number"
                          placeholder="e.g. 18"
                          value={gradingMarksMap[sub.id] || ''}
                          onChange={e =>
                            setGradingMarksMap(prev => ({ ...prev, [sub.id]: e.target.value }))
                          }
                          className="w-full text-xs p-2 rounded-xl border border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-600">Teacher Remarks</label>
                        <input
                          type="text"
                          placeholder="Well done / step mistake..."
                          value={gradingFeedbackMap[sub.id] || ''}
                          onChange={e =>
                            setGradingFeedbackMap(prev => ({ ...prev, [sub.id]: e.target.value }))
                          }
                          className="w-full text-xs p-2 rounded-xl border border-neutral-300"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleGradeSubmission(sub.id, 20)}
                      className="w-full py-2 rounded-xl bg-[#111111] text-white text-xs font-bold hover:bg-black transition-colors"
                    >
                      {t('মূল্যায়ন সংরক্ষণ করুন (Save Grade)', 'Submit Grade to Student')}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. RECORDED LECTURES */}
      {activeTab === 'recordings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-neutral-200">
            <div>
              <h3 className="font-black text-lg text-neutral-900">
                {t('লেকচার ভিডিও লাইব্রেরি আপলোড ও পরিচালনা', 'Lecture Video Management')}
              </h3>
              <p className="text-xs text-neutral-500">
                {t('আপলোড করা ক্লাস রেকর্ডিং সরাসরি মোবাইল অ্যাপ ও স্টুডেন্ট পোর্টালে যুক্ত হয়।', 'Videos uploaded here are immediately playable on the Student Mobile App and Website.')}
              </p>
            </div>
            <button
              onClick={() => setShowRecModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold hover:bg-black transition-colors"
            >
              <Plus className="w-4 h-4 text-[#FF9933]" />
              <span>{t('নতুন ভিডিও যুক্ত করো', 'Upload Recording')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recordedClasses.map(rc => (
              <div
                key={rc.id}
                className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-neutral-900">
                  <img
                    src={rc.thumbnail}
                    alt={rc.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#FF9933] text-black flex items-center justify-center font-bold shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {rc.durationMinutes} mins
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded-md">
                      {rc.chapter}
                    </span>
                    <h4 className="font-bold text-sm text-neutral-900 mt-1 line-clamp-2">
                      {rc.titleBn || rc.title}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {rc.summaryBn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <span className="text-neutral-400 text-[11px]">{rc.views} Views</span>
                    <button
                      onClick={async () => {
                        if (confirm('Delete this recording?')) {
                          await api.deleteRecordedClass(rc.id);
                          onRefreshData?.();
                        }
                      }}
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. STUDY MATERIALS */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-neutral-200">
            <div>
              <h3 className="font-black text-lg text-neutral-900">
                {t('নোটস, ফর্মুলা শিট ও হ্যান্ডআউট আপলোড', 'Study Notes & Formula Sheets')}
              </h3>
              <p className="text-xs text-neutral-500">
                {t('এখানে আপলোড করা পিডিএফ সমস্ত শিক্ষার্থী ডাউনলোড করতে পারবে।', 'PDFs published here are available for direct download in Student Website and Mobile App.')}
              </p>
            </div>
            <button
              onClick={() => setShowMatModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold hover:bg-black transition-colors"
            >
              <Plus className="w-4 h-4 text-[#FF9933]" />
              <span>{t('নতুন মেটেরিয়াল আপলোড', 'Upload Material')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyMaterials.map(mat => (
              <div
                key={mat.id}
                className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF9933] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {mat.category} • {mat.chapter}
                    </span>
                    <h4 className="font-bold text-sm text-neutral-900">{mat.titleBn || mat.title}</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">{mat.fileSize} • {mat.downloadCount} Downloads</p>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    if (confirm('Delete material?')) {
                      await api.deleteStudyMaterial(mat.id);
                      onRefreshData?.();
                    }
                  }}
                  className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. BATCH ROSTERS */}
      {activeTab === 'rosters' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-neutral-200">
            <h3 className="font-black text-lg text-neutral-900">
              {t('আমার দায়িত্বপ্রাপ্ত ব্যাচ ও শিক্ষার্থী তালিকা', 'Assigned Batches & Student Directory')}
            </h3>
            <p className="text-xs text-neutral-500">
              {t('সেন্ট্রাল ডেটাবেস থেকে রিয়েল-টাইমে নাম নথিভুক্ত শিক্ষার্থীদের তালিকা।', 'Real-time enrollment directory synced from central database.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {batches.map(b => (
              <div
                key={b.id}
                className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2.5 py-0.5 rounded-full">
                    {b.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-neutral-900">
                    {b.enrolledCount} / {b.capacity} Students Enrolled
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-base text-neutral-900">{b.nameBn || b.name}</h4>
                  <p className="text-xs text-neutral-500 mt-1">{b.scheduleBn || b.schedule}</p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>Assigned Faculty: {b.teacherName}</span>
                  <span className="font-mono text-[11px] text-emerald-600 font-semibold">Active Roster</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: SCHEDULE LIVE CLASS */}
      {showLiveModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-black text-base text-neutral-900">
                {t('নতুন লাইভ ক্লাস নির্ধারণ করুন', 'Schedule New Live Class')}
              </h3>
              <button
                onClick={() => setShowLiveModal(false)}
                className="text-neutral-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleLiveClass} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700">Class Title (বাংলা বা English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. চলতড়িৎ ও রোধের সমবায় স্পেশাল লাইভ ক্লাস"
                  value={liveTitle}
                  onChange={e => setLiveTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-[#FF9933]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700">Chapter / Topic</label>
                  <input
                    type="text"
                    required
                    value={liveChapter}
                    onChange={e => setLiveChapter(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={liveDuration}
                    onChange={e => setLiveDuration(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700">Assigned Batch</label>
                <select
                  value={liveBatchId}
                  onChange={e => setLiveBatchId(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-[#FF9933]"
                >
                  {batches.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.enrolledCount} Students)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-neutral-700">Google Meet / Zoom URL</label>
                <input
                  type="url"
                  required
                  value={liveMeetUrl}
                  onChange={e => setLiveMeetUrl(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-[#FF9933]"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px]">
                ⚡ Clicking "Schedule & Broadcast" will immediately push this session to the Central Database, appear in the Student Mobile App & Website, and send student notifications.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLiveModal(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#FF9933] text-black font-bold hover:bg-[#ffaa55]"
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule & Broadcast'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: UPLOAD RECORDING */}
      {showRecModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-black text-base text-neutral-900">
                {t('নতুন ক্লাস রেকর্ডিং আপলোড করুন', 'Upload Recorded Lecture')}
              </h3>
              <button
                onClick={() => setShowRecModal(false)}
                className="text-neutral-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadRecording} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700">Lecture Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ওহমের সূত্র ও তুল্য রোধ নির্ণয় - পার্ট ১"
                  value={recTitle}
                  onChange={e => setRecTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700">Chapter</label>
                  <input
                    type="text"
                    required
                    value={recChapter}
                    onChange={e => setRecChapter(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={recDuration}
                    onChange={e => setRecDuration(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700">Video Stream URL</label>
                <input
                  type="url"
                  required
                  value={recVideoUrl}
                  onChange={e => setRecVideoUrl(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700">Lecture Summary & Notes</label>
                <textarea
                  rows={2}
                  value={recSummary}
                  onChange={e => setRecSummary(e.target.value)}
                  placeholder="Summary of topics covered..."
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRecModal(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#111111] text-white font-bold hover:bg-black"
                >
                  {isSubmitting ? 'Uploading...' : 'Publish Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: UPLOAD MATERIAL */}
      {showMatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-black text-base text-neutral-900">
                {t('স্টাডি মেটেরিয়াল বা ফর্মুলা শিট যোগ করুন', 'Add Study Material')}
              </h3>
              <button
                onClick={() => setShowMatModal(false)}
                className="text-neutral-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadMaterial} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700">Material Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. চলতড়িৎ হ্যান্ডরিটেন ফর্মুলা শিট ও বিগত ৫ বছরের প্রশ্নোত্তর"
                  value={matTitle}
                  onChange={e => setMatTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700">Chapter</label>
                  <input
                    type="text"
                    required
                    value={matChapter}
                    onChange={e => setMatChapter(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700">Category</label>
                  <select
                    value={matCategory}
                    onChange={e => setMatCategory(e.target.value as any)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-neutral-300"
                  >
                    <option value="formula_sheet">Formula Sheet</option>
                    <option value="notes">Class Notes</option>
                    <option value="pyq">PYQ Solutions</option>
                    <option value="worksheet">Practice Worksheet</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMatModal(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#FF9933] text-black font-bold hover:bg-[#ffaa55]"
                >
                  {isSubmitting ? 'Uploading...' : 'Upload PDF'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
