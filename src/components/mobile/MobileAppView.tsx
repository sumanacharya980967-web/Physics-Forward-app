import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Program,
  Course,
  Batch,
  LiveClass,
  RecordedClass,
  Exam,
  StudentDoubt
} from '../../types';
import { api } from '../../services/api';
import { MobileSocialConnect } from '../social/OfficialSocialChannels';
import {
  Home,
  BookOpen,
  Video,
  Award,
  Menu,
  Bell,
  Play,
  Clock,
  Wifi,
  Battery,
  ChevronLeft,
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  MessageSquare,
  Send,
  Radio,
  FileText,
  Layers,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

interface MobileAppViewProps {
  programs?: Program[];
  courses: Course[];
  batches: Batch[];
  liveClasses: LiveClass[];
  recordedClasses: RecordedClass[];
  exams: Exam[];
  onSelectCourse: (course: Course) => void;
  onOpenExam: (exam: Exam) => void;
  onOpenVideo: (video: RecordedClass) => void;
  onExitMobile: () => void;
}

export const MobileAppView: React.FC<MobileAppViewProps> = ({
  programs = [],
  courses = [],
  batches = [],
  liveClasses = [],
  recordedClasses = [],
  exams = [],
  onSelectCourse,
  onOpenExam,
  onOpenVideo,
  onExitMobile
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [mobileTab, setMobileTab] = useState<'home' | 'batches' | 'live' | 'exams' | 'doubts' | 'more'>('home');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('all');

  // Doubts state
  const [doubts, setDoubts] = useState<StudentDoubt[]>([]);
  const [doubtText, setDoubtText] = useState('');
  const [doubtChapter, setDoubtChapter] = useState('Current Electricity');
  const [isSubmittingDoubt, setIsSubmittingDoubt] = useState(false);
  const [doubtToast, setDoubtToast] = useState(false);

  const loadDoubts = async () => {
    try {
      const data = await api.getDoubts();
      setDoubts(data);
    } catch (e) {
      console.warn('Doubts load warning', e);
    }
  };

  useEffect(() => {
    loadDoubts();
    const interval = setInterval(loadDoubts, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSendDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    setIsSubmittingDoubt(true);
    try {
      const res = await api.submitDoubt({
        studentId: user?.id || 'user-student-rahul',
        studentName: user?.name || 'Rahul Das',
        studentPhone: user?.phone || '8972263462',
        chapter: doubtChapter,
        subject: 'Physics',
        questionText: doubtText
      });
      if (res.doubts) {
        setDoubts(res.doubts);
      }
      setDoubtText('');
      setDoubtToast(true);
      setTimeout(() => setDoubtToast(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingDoubt(false);
    }
  };

  const nextLive = liveClasses[0];

  const activePrograms = (programs || [])
    .filter(p => p && p.active && !p.archived && p.displayOnApp !== false)
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  const appCourses = (courses || [])
    .filter(c => !c.archived && c.published !== false && c.displayOnApp !== false)
    .filter(c => {
      if (selectedProgramId === 'all') return true;
      return c.programId === selectedProgramId;
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  const selectedProgramObj = activePrograms.find(p => p.id === selectedProgramId);

  return (
    <div className="flex flex-col items-center justify-center p-0 sm:p-6 bg-neutral-900 min-h-screen">
      {/* Top Controls Bar */}
      <div className="w-full max-w-sm px-4 py-2 sm:p-0 sm:mb-3 flex items-center justify-between text-white text-xs bg-black/60 sm:bg-transparent">
        <button
          onClick={onExitMobile}
          className="flex items-center gap-1 text-[#FF9933] font-bold hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('ওয়েব ভিউতে ফিরে যাও', 'Return to Website')}</span>
        </button>
        <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          Central API Connected
        </span>
      </div>

      {/* Phone Frame Device Container */}
      <div className="w-full sm:max-w-[390px] h-screen sm:h-[800px] bg-black sm:rounded-[44px] p-0 sm:p-3 sm:shadow-2xl sm:border-4 sm:border-neutral-700 relative flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker Notch (Desktop frame only) */}
        <div className="hidden sm:flex absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-neutral-900 rounded-full z-30 items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-800"></div>
        </div>

        {/* Status Bar */}
        <div className="h-7 w-full pt-1 px-4 sm:px-5 flex items-center justify-between text-[11px] font-bold text-white z-20 shrink-0 bg-black">
          <span>৭:০০ PM</span>
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="text-[9px] text-emerald-400 font-normal">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Screen Content Viewport */}
        <div className="flex-1 bg-neutral-50 rounded-none sm:rounded-[32px] overflow-y-auto flex flex-col justify-between text-neutral-900 relative">
          {/* Mobile App Header */}
          <div className="p-3.5 bg-white border-b border-neutral-200 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF9933] to-amber-500 text-black font-extrabold flex items-center justify-center text-sm shadow-sm">
                P
              </div>
              <div>
                <h4 className="font-extrabold text-xs leading-none">PHYSICS FORWARD</h4>
                <p className="text-[10px] text-neutral-500">{user?.name || 'Rahul Das'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                Cloud Sync
              </span>
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-1.5 rounded-full bg-neutral-100 text-neutral-600 relative hover:bg-neutral-200 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1"></span>
              </button>
            </div>
          </div>

          {/* Notification Dropdown Overlay */}
          {notificationOpen && (
            <div className="absolute top-14 left-3 right-3 bg-neutral-900 text-white p-3.5 rounded-2xl shadow-xl z-30 text-xs space-y-2 border border-neutral-700 animate-in fade-in">
              <div className="flex justify-between font-bold text-[11px] text-[#FF9933]">
                <span>পুশ নোটিফিকেশন (Push Alerts)</span>
                <button onClick={() => setNotificationOpen(false)}>✕</button>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <p className="text-neutral-200">
                  📢 <strong className="text-white">লাইভ ক্লাস:</strong> {nextLive ? nextLive.titleBn : 'চলতড়িৎ স্পেশাল ক্লাস'}
                </p>
                <p className="text-neutral-400 text-[10px]">
                  সেন্ট্রাল ডেটাবেস থেকে রিয়েল-টাইমে পাঠানো হয়েছে।
                </p>
              </div>
            </div>
          )}

          {/* Tab Views */}
          <div className="p-3.5 space-y-3.5 flex-1">
            {/* 1. HOME TAB */}
            {mobileTab === 'home' && (
              <div className="space-y-3.5">
                {/* Live Banner */}
                {nextLive && (
                  <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-black text-white p-3.5 rounded-2xl shadow-sm space-y-2 border border-neutral-800">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-red-800/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        লাইভ সেশন (Live)
                      </span>
                      <span className="text-[10px] text-neutral-400">{nextLive.durationMinutes} mins</span>
                    </div>
                    <h4 className="text-xs font-bold leading-tight">
                      {nextLive.titleBn || nextLive.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400">শিক্ষক: {nextLive.teacherName}</p>
                    <a
                      href={nextLive.meetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full py-2 bg-[#FF9933] hover:bg-[#ffaa55] text-black font-extrabold text-[11px] rounded-xl text-center shadow-xs transition-colors"
                    >
                      গুগল মিটে যোগ দিন (Join Meet)
                    </a>
                  </div>
                )}

                {/* Continue Learning */}
                {recordedClasses.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-neutral-800">পড়া চালিয়ে যাও (Recordings)</span>
                      <span className="text-[10px] text-[#FF9933] font-bold">ভিডিও লাইব্রেরি</span>
                    </div>
                    <div
                      onClick={() => onOpenVideo(recordedClasses[0])}
                      className="bg-white p-2.5 rounded-2xl border border-neutral-200 flex items-center gap-3 cursor-pointer shadow-xs hover:border-[#FF9933] transition-all"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 bg-black">
                        <img src={recordedClasses[0].thumbnail} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>
                      <div className="overflow-hidden flex-1">
                        <h5 className="text-xs font-bold truncate">{recordedClasses[0].titleBn}</h5>
                        <p className="text-[10px] text-neutral-500">{recordedClasses[0].chapterBn}</p>
                        <div className="w-24 h-1 bg-neutral-200 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-[#FF9933] w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Direct Doubts Quick Ask Card */}
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-2xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#FF9933]" />
                      পদার্থবিজ্ঞান ডাউট আছে?
                    </span>
                    <button
                      onClick={() => setMobileTab('doubts')}
                      className="text-[10px] text-[#FF9933] font-extrabold hover:underline"
                    >
                      প্রশ্ন করো →
                    </button>
                  </div>
                  <p className="text-[10px] text-neutral-600">
                    সরাসরি সুব্রত স্যার বা সুমন স্যারের কাছে প্রশ্ন পাঠাও এবং উত্তর পাও।
                  </p>
                </div>

                {/* Choose Your Program Carousel (Initial 7 Programs) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#FF9933]" />
                      <span>{t('প্রোগ্রাম নির্বাচন করো', 'Choose Your Program')}</span>
                    </span>
                    <span className="text-[10px] text-neutral-400 font-bold">
                      {activePrograms.length} {t('প্রোগ্রাম', 'Programs')}
                    </span>
                  </div>

                  {/* Horizontal Scrollable Program Cards */}
                  <div className="flex gap-2.5 overflow-x-auto pb-1.5 -mx-1 px-1 scrollbar-none">
                    {activePrograms.map(p => {
                      const isSelected = selectedProgramId === p.id;
                      const pCourses = courses.filter(c => c.programId === p.id && !c.archived && c.published !== false && c.displayOnApp !== false);
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedProgramId(isSelected ? 'all' : p.id)}
                          className={`min-w-[170px] max-w-[170px] p-2.5 rounded-2xl border transition-all cursor-pointer shrink-0 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]'
                              : 'bg-white text-neutral-900 border-neutral-200 hover:border-[#FF9933]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                              <span className={`px-1.5 py-0.5 rounded ${isSelected ? 'bg-[#FF9933] text-black font-extrabold' : 'bg-orange-50 text-[#FF9933]'}`}>
                                {p.badge || p.name}
                              </span>
                              <span className="text-neutral-400">{p.duration}</span>
                            </div>

                            <h5 className="text-xs font-black truncate">{p.name}</h5>
                            <p className={`text-[10px] truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                              {p.nameBn}
                            </p>
                          </div>

                          <div className="mt-2 pt-2 border-t border-neutral-200/40 flex items-center justify-between">
                            <div>
                              <span className="text-[9px] block text-neutral-400">ফি</span>
                              <span className={`text-xs font-black ${isSelected ? 'text-[#FF9933]' : 'text-neutral-900'}`}>
                                ₹{p.basePrice}
                              </span>
                            </div>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'}`}>
                              {pCourses.length} {t('কোর্স', 'Course')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Program Flow Path Indicator */}
                  {selectedProgramObj && (
                    <div className="p-2 rounded-xl bg-orange-50/80 border border-orange-200/60 text-[10px] space-y-0.5">
                      <span className="font-bold text-[#FF9933] uppercase text-[9px] block">
                        {t('অ্যাকাডেমিক হায়ারার্কি', 'Academic Hierarchy')}
                      </span>
                      <p className="font-mono text-neutral-800 truncate" title={selectedProgramObj.flowPath}>
                        {selectedProgramObj.flowPath || `${selectedProgramObj.name} → ${selectedProgramObj.subject || 'Physics'} → Courses → Chapters → Lessons → Tests`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Filtered Courses Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-800">
                      {selectedProgramObj
                        ? `${selectedProgramObj.name} কোর্সসমূহ (${appCourses.length})`
                        : `জনপ্রিয় কোর্সসমূহ (${appCourses.length})`}
                    </span>
                    {selectedProgramId !== 'all' && (
                      <button
                        onClick={() => setSelectedProgramId('all')}
                        className="text-[10px] text-[#FF9933] font-bold hover:underline"
                      >
                        {t('সকল দেখুন', 'Show All')}
                      </button>
                    )}
                  </div>

                  {appCourses.length === 0 ? (
                    <div className="bg-white p-4 rounded-2xl border border-dashed border-neutral-300 text-center text-xs text-neutral-500">
                      {t('এই প্রোগ্রামে বর্তমানে কোনো কোর্স নেই।', 'No courses available for this program.')}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {appCourses.map(c => {
                        const isClosed = c.enrollmentOpen === false;
                        const lessonCount =
                          c.totalLessons ||
                          (c.syllabus || []).reduce((acc, ch) => acc + (ch.lessons?.length || 0), 0);
                        return (
                          <div
                            key={c.id}
                            onClick={() => !isClosed && onSelectCourse(c)}
                            className={`bg-white p-2.5 rounded-2xl border border-neutral-200 flex items-center justify-between transition-all shadow-xs ${
                              isClosed ? 'opacity-75' : 'cursor-pointer hover:border-[#FF9933]'
                            }`}
                          >
                            <div className="overflow-hidden max-w-[200px] space-y-0.5">
                              <span className="text-[9px] font-bold text-[#FF9933] uppercase block truncate">
                                {c.subject || 'Physics'} • {c.facultyName || 'Subrata Acharya, M.Sc.'}
                              </span>
                              <p className="text-xs font-bold text-neutral-900 truncate leading-snug">
                                {c.titleBn || c.title}
                              </p>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-black text-neutral-900">
                                  {c.isFree || c.price === 0 ? t('বিনামূল্যে', 'FREE') : `₹${c.price}`}
                                </span>
                                {c.originalPrice > c.price && (
                                  <span className="text-[10px] text-neutral-400 line-through">₹{c.originalPrice}</span>
                                )}
                                <span className="text-[9px] text-neutral-500">
                                  • {(c.syllabus || []).length} Ch · {lessonCount} L
                                </span>
                              </div>
                            </div>
                            <button
                              disabled={isClosed}
                              onClick={e => {
                                e.stopPropagation();
                                if (!isClosed) onSelectCourse(c);
                              }}
                              className={`text-[10px] px-3 py-1.5 rounded-xl shadow-xs shrink-0 font-black ${
                                isClosed
                                  ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                                  : 'bg-[#FF9933] hover:bg-[#ffaa55] text-black'
                              }`}
                            >
                              {isClosed ? t('বন্ধ', 'Closed') : 'এনরোল'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Connect With Us Compact Section */}
                <MobileSocialConnect mode="compact" />
              </div>
            )}

            {/* 2. BATCHES TAB */}
            {mobileTab === 'batches' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-800">আমার ব্যাচসমূহ ({batches.length})</h4>
                {batches.map(b => (
                  <div key={b.id} className="bg-white p-3 rounded-2xl border border-neutral-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{b.nameBn || b.name}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-neutral-500 text-[11px]">{b.scheduleBn || b.schedule}</p>
                    <p className="text-[10px] text-[#FF9933] font-bold">শিক্ষক: {b.teacherName}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 3. LIVE TAB */}
            {mobileTab === 'live' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-800">লাইভ ক্লাস সূচি ({liveClasses.length})</h4>
                {liveClasses.map(l => (
                  <div key={l.id} className="bg-white p-3 rounded-2xl border border-neutral-200 space-y-2 text-xs">
                    <span className="text-[10px] font-bold text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded">
                      {l.chapterBn || l.chapter}
                    </span>
                    <h5 className="font-bold text-neutral-900">{l.titleBn || l.title}</h5>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span>Faculty: {l.teacherName}</span>
                      <span>{l.durationMinutes} mins</span>
                    </div>
                    <a
                      href={l.meetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block py-1.5 bg-[#FF9933] text-black font-bold text-center rounded-xl text-[11px]"
                    >
                      মিটে যোগ দাও (Join)
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* 4. EXAMS TAB */}
            {mobileTab === 'exams' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-800">অনলাইন মক টেস্ট ({exams.length})</h4>
                {exams.map(e => (
                  <div key={e.id} className="bg-white p-3 rounded-2xl border border-neutral-200 space-y-2 text-xs">
                    <p className="font-bold text-neutral-900">{e.titleBn || e.title}</p>
                    <div className="flex justify-between text-[11px] text-neutral-500">
                      <span>{e.durationMinutes} মিনিট</span>
                      <span>{e.totalMarks} নম্বর</span>
                    </div>
                    <button
                      onClick={() => onOpenExam(e)}
                      className="w-full py-1.5 bg-neutral-900 hover:bg-black text-white font-bold rounded-xl text-[11px] transition-colors"
                    >
                      পরীক্ষা শুরু করো (Start Test)
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 5. DOUBTS TAB (MUTUAL REAL-TIME ECOSYSTEM CONNECTION) */}
            {mobileTab === 'doubts' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-800">প্রশ্ন ও সমাধান ডেস্ক</h4>
                  <span className="text-[10px] text-neutral-400">{doubts.length} Doubts</span>
                </div>

                {doubtToast && (
                  <div className="p-2 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-xl">
                    ✓ প্রশ্ন জমা হয়েছে! শিক্ষক পোর্টালে সরাসরি পৌঁছে গেছে।
                  </div>
                )}

                {/* Ask Doubt Form */}
                <form onSubmit={handleSendDoubt} className="bg-white p-3 rounded-2xl border border-neutral-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px] text-neutral-800">নতুন প্রশ্ন জিজ্ঞাসা করো:</span>
                    <input
                      type="text"
                      placeholder="Chapter"
                      value={doubtChapter}
                      onChange={e => setDoubtChapter(e.target.value)}
                      className="text-[10px] p-1 border rounded-lg w-28"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={doubtText}
                    onChange={e => setDoubtText(e.target.value)}
                    placeholder="পদার্থবিজ্ঞানের যে কোনো প্রশ্ন বা অঙ্কের সমস্যা লিখুন..."
                    className="w-full p-2 text-xs rounded-xl border border-neutral-300 focus:outline-hidden focus:border-[#FF9933]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingDoubt}
                    className="w-full py-1.5 bg-[#FF9933] text-black font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>{isSubmittingDoubt ? 'পাঠানো হচ্ছে...' : 'শিক্ষককে প্রশ্ন পাঠাও'}</span>
                  </button>
                </form>

                {/* Existing Doubts List */}
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {doubts.map(d => (
                    <div key={d.id} className="bg-white p-2.5 rounded-2xl border border-neutral-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-[#FF9933] bg-orange-50 px-1.5 py-0.5 rounded">
                          {d.chapter}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${d.status === 'answered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {d.status === 'answered' ? '✓ উত্তর এসেছে' : '● অপেক্ষমাণ'}
                        </span>
                      </div>
                      <p className="font-medium text-neutral-800 text-[11px]">"{d.questionText}"</p>
                      {d.teacherReply && (
                        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] text-emerald-950">
                          <p className="font-bold">শিক্ষকের উত্তর ({d.teacherName}):</p>
                          <p className="mt-0.5">{d.teacherReply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. MORE TAB */}
            {mobileTab === 'more' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-neutral-200 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-neutral-900">PHYSICS FORWARD হেল্পলাইন</p>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      অফিসিয়াল সাপোর্ট
                    </span>
                  </div>
                  <p className="text-neutral-500 text-[11px]">কাঁথি, পূর্ব মেদিনীপুর, পশ্চিমবঙ্গ, ভারত</p>
                  <a href="tel:8972263462" className="block p-2 rounded-xl bg-orange-50 text-[#FF9933] font-bold text-center">
                    📞 8972263462
                  </a>
                  <a href="mailto:suman.acharya.980967@outlook.com" className="block p-2 rounded-xl bg-neutral-50 text-neutral-700 font-semibold text-center text-[11px]">
                    ✉️ suman.acharya.980967@outlook.com
                  </a>
                  <div className="p-2 bg-neutral-100 rounded-xl text-[11px] text-neutral-600">
                    <p><strong>Central Node:</strong> Connected</p>
                    <p><strong>Mutual Sync:</strong> Active</p>
                  </div>
                </div>

                {/* Full Connect With Us Official Channels */}
                <MobileSocialConnect mode="full" />
              </div>
            )}
          </div>

          {/* Bottom App Navigation Bar */}
          <div className="bg-white border-t border-neutral-200 px-2 py-1.5 flex items-center justify-around text-neutral-500 shrink-0">
            <button
              onClick={() => setMobileTab('home')}
              className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${mobileTab === 'home' ? 'text-[#FF9933]' : ''}`}
            >
              <Home className="w-4 h-4" />
              <span>হোম</span>
            </button>
            <button
              onClick={() => setMobileTab('batches')}
              className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${mobileTab === 'batches' ? 'text-[#FF9933]' : ''}`}
            >
              <BookOpen className="w-4 h-4" />
              <span>ব্যাচ</span>
            </button>
            <button
              onClick={() => setMobileTab('live')}
              className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${mobileTab === 'live' ? 'text-[#FF9933]' : ''}`}
            >
              <Video className="w-4 h-4" />
              <span>লাইভ</span>
            </button>
            <button
              onClick={() => setMobileTab('exams')}
              className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${mobileTab === 'exams' ? 'text-[#FF9933]' : ''}`}
            >
              <Award className="w-4 h-4" />
              <span>পরীক্ষা</span>
            </button>
            <button
              onClick={() => setMobileTab('doubts')}
              className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${mobileTab === 'doubts' ? 'text-[#FF9933]' : ''}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>ডাউট</span>
            </button>
            <button
              onClick={() => setMobileTab('more')}
              className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${mobileTab === 'more' ? 'text-[#FF9933]' : ''}`}
            >
              <Menu className="w-4 h-4" />
              <span>মেনু</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
