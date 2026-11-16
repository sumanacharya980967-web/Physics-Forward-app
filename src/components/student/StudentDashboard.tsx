import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Program,
  Course,
  Batch,
  LiveClass,
  RecordedClass,
  StudyMaterial,
  Exam,
  ExamAttempt,
  Assignment,
  PaymentOrder
} from '../../types';
import { ExamPortal } from './ExamPortal';
import { VideoPlayerModal } from './VideoPlayerModal';
import { PhysicsTools } from './PhysicsTools';
import { api } from '../../services/api';
import { SocialPlatformIcon } from '../social/OfficialSocialChannels';
import { OFFICIAL_SOCIAL_CHANNELS } from '../../data/mockData';
import {
  User as UserIcon,
  BookOpen,
  Video,
  Play,
  Clock,
  Calendar,
  FileText,
  Award,
  CheckCircle2,
  Download,
  Upload,
  CreditCard,
  Settings,
  Bell,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Zap,
  HelpCircle,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Tag,
  GraduationCap,
  Layers
} from 'lucide-react';

interface StudentDashboardProps {
  programs: Program[];
  courses: Course[];
  batches: Batch[];
  liveClasses: LiveClass[];
  recordedClasses: RecordedClass[];
  studyMaterials: StudyMaterial[];
  exams: Exam[];
  assignments: Assignment[];
  orders: PaymentOrder[];
  onOpenCourse: (course: Course) => void;
  activeSection?: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  programs = [],
  courses = [],
  batches = [],
  liveClasses = [],
  recordedClasses = [],
  studyMaterials = [],
  exams = [],
  assignments = [],
  orders = [],
  onOpenCourse,
  activeSection = 'overview'
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [currentSection, setCurrentSection] = useState<string>(activeSection);

  // Active Exam state
  const [activeExam, setActiveExam] = useState<Exam | null>(null);

  // Active Video modal state
  const [activeVideo, setActiveVideo] = useState<RecordedClass | null>(null);

  // Material filter
  const [materialFilter, setMaterialFilter] = useState('all');

  // Question Bank filter
  const [qbTopic, setQbTopic] = useState('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Student's Enrolled Programs filtering
  const enrolledProgramIds = user?.enrolledProgramIds && user.enrolledProgramIds.length > 0
    ? user.enrolledProgramIds
    : ['prog-jee-mains', 'prog-foundation'];

  const enrolledPrograms = (programs || [])
    .filter(p => p && !p.archived && p.active && enrolledProgramIds.includes(p.id))
    .sort((a, b) => (a.order || 999) - (b.order || 999));
  const [selectedDashboardProgram, setSelectedDashboardProgram] = useState<string>('all');

  // Toast & Receipt Modal state (replaces window.alert)
  const [dashboardToast, setDashboardToast] = useState<string | null>(null);
  const [receiptOrder, setReceiptOrder] = useState<PaymentOrder | null>(null);

  const showToast = (msg: string) => {
    setDashboardToast(msg);
    setTimeout(() => setDashboardToast(null), 3000);
  };

  // Filter content strictly by enrolled programs/courses
  const enrolledBatches = (batches || []).filter(b =>
    b && enrolledProgramIds.includes(b.programId || '') &&
    (selectedDashboardProgram === 'all' || b.programId === selectedDashboardProgram)
  );

  const enrolledCourses = (courses || []).filter(c =>
    c && !c.archived && c.published !== false &&
    (enrolledProgramIds.includes(c.programId || '') || (user?.enrolledCourseIds || []).includes(c.id)) &&
    (selectedDashboardProgram === 'all' || c.programId === selectedDashboardProgram)
  );

  const enrolledLiveClasses = (liveClasses || []).filter(l =>
    l && enrolledProgramIds.includes(l.programId || '') &&
    (selectedDashboardProgram === 'all' || l.programId === selectedDashboardProgram)
  );

  const enrolledRecordings = (recordedClasses || []).filter(r =>
    r && enrolledProgramIds.includes(r.programId || '') &&
    (selectedDashboardProgram === 'all' || r.programId === selectedDashboardProgram)
  );

  const enrolledExams = (exams || []).filter(e =>
    e && enrolledProgramIds.includes(e.programId || '') &&
    (selectedDashboardProgram === 'all' || e.programId === selectedDashboardProgram)
  );

  const enrolledMaterials = (studyMaterials || []).filter(m =>
    m && enrolledProgramIds.includes(m.programId || '') &&
    (selectedDashboardProgram === 'all' || m.programId === selectedDashboardProgram)
  );

  // Assignment upload modal state
  const [uploadModalAsg, setUploadModalAsg] = useState<Assignment | null>(null);
  const [uploadNote, setUploadNote] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Profile edit state
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editSchool, setEditSchool] = useState(user?.school || '');
  const [editCity, setEditCity] = useState(user?.city || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  const currentBatch = batches[0];
  const nextLive = liveClasses.find(l => l.status === 'upcoming') || liveClasses[0];

  const handleApplyCoupon = async () => {
    if (!couponInput) return;
    try {
      const res = await api.validateCoupon(couponInput);
      if (res.valid) {
        setCouponMessage(t(`কুপন প্রয়োগ করা হয়েছে! ${res.coupon.discountPercent}% ছাড়`, `Coupon applied! ${res.coupon.discountPercent}% off`));
      } else {
        setCouponMessage(t('কুপনটি সঠিক নয়।', 'Invalid coupon code.'));
      }
    } catch (e) {
      setCouponMessage(t('ত্রুটি হয়েছে।', 'Error checking coupon.'));
    }
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadModalAsg) return;
    try {
      await api.submitAssignment({
        assignmentId: uploadModalAsg.id,
        studentId: user?.id || 'user-student-rahul',
        studentName: user?.name || 'Rahul Das',
        notes: uploadNote,
        fileName: 'Rahul_Physics_HW_Solution.pdf'
      });
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadModalAsg(null);
        setUploadSuccess(false);
        setUploadNote('');
      }, 1800);
    } catch (err) {
      console.error(err);
    }
  };

  // If user is actively taking an exam
  if (activeExam) {
    return <ExamPortal exam={activeExam} onExit={() => setActiveExam(null)} />;
  }

  const navItems = [
    { id: 'overview', labelBn: 'ড্যাশবোর্ড ওভারভিউ', labelEn: 'Overview', icon: BookOpen },
    { id: 'batches', labelBn: 'আমার ব্যাচ ও কোর্স', labelEn: 'My Batches & Courses', icon: Award },
    { id: 'live', labelBn: 'লাইভ ক্লাসসমূহ', labelEn: 'Live Classes', icon: Video },
    { id: 'recorded', labelBn: 'রেকর্ডেড লেকচার', labelEn: 'Recorded Classes', icon: Play },
    { id: 'materials', labelBn: 'স্টাডি মেটেরিয়ালস ও নোটস', labelEn: 'Study Materials', icon: FileText },
    { id: 'exams', labelBn: 'অনলাইন মক টেস্ট', labelEn: 'Online Exams', icon: CheckCircle2 },
    { id: 'assignments', labelBn: 'হোমওয়ার্ক ও অ্যাসাইনমেন্ট', labelEn: 'Assignments', icon: Upload },
    { id: 'qbank', labelBn: 'অধ্যায়ভিত্তিক প্রশ্নব্যাঙ্ক', labelEn: 'Question Bank', icon: HelpCircle },
    { id: 'tools', labelBn: 'ফিজিক্স টুলস ও ফর্মুলা', labelEn: 'Physics Tools', icon: Zap },
    { id: 'payments', labelBn: 'পেমেন্ট ও রসিদ', labelEn: 'Payments & Receipts', icon: CreditCard },
    { id: 'profile', labelBn: 'প্রোফাইল ও সেটিংস', labelEn: 'Profile & Settings', icon: Settings }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Navigation */}
      <aside className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200 p-4 shadow-xs space-y-4">
        {/* Student Mini Card */}
        <div className="p-3.5 bg-neutral-900 text-white rounded-xl flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FF9933] text-black font-extrabold text-lg flex items-center justify-center shrink-0">
            {user?.name.charAt(0) || 'R'}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-bold text-xs sm:text-sm truncate">{user?.name}</h4>
            <p className="text-[11px] text-neutral-400 truncate">ID: {user?.id.slice(-6).toUpperCase()}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {enrolledPrograms.map(p => (
                <span
                  key={p.id}
                  className="inline-block text-[10px] bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/40 px-1.5 py-0.2 rounded font-black uppercase"
                >
                  {p.badge || p.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#FF9933] text-black shadow-xs font-extrabold'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-neutral-500'}`} />
                  <span>{t(item.labelBn, item.labelEn)}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </nav>

        {/* Official Helpline Helpbox */}
        <div className="p-3 bg-orange-50/70 border border-orange-200/60 rounded-xl text-xs space-y-1">
          <p className="font-bold text-neutral-900 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF9933]" />
            {t('শিক্ষার্থী হেল্পলাইন:', 'Student Helpline:')}
          </p>
          <p className="text-neutral-600 text-[11px]">
            {t('কোনো সমস্যা হলে ফোন করো:', 'Direct Teacher Assistance:')}
          </p>
          <a href="tel:8972263462" className="block font-bold text-[#111111] hover:text-[#FF9933] text-xs">
            📞 8972263462
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:col-span-9 space-y-6">
        {/* 1. OVERVIEW SECTION */}
        {currentSection === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
              <div className="relative z-10 max-w-xl space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/20 px-2.5 py-0.5 rounded-full">
                  {t('সেশন ২০২৬ • নিয়মিত ব্যাচ', 'Session 2026 • Active Batch')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black">
                  {t(`স্বাগতম, ${user?.name}!`, `Welcome back, ${user?.name}!`)}
                </h2>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {t(
                    'আজকের লাইভ ক্লাস: চলতড়িৎ রোধের সমবায় সংক্রান্ত গাণিতিক সমস্যা। রাত ৮:০০ এর পূর্বে রিভিশন সম্পন্ন করো।',
                    'Next live class tonight at 7:00 PM. Review previous lesson notes before class begins.'
                  )}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setCurrentSection('live')}
                    className="px-4 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>{t('লাইভ ক্লাসে যোগ দাও', 'Join Live Class')}</span>
                  </button>
                  <button
                    onClick={() => setCurrentSection('exams')}
                    className="px-4 py-2 bg-neutral-800 text-white font-bold text-xs rounded-xl hover:bg-neutral-700 transition-all flex items-center gap-1.5 border border-neutral-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933]" />
                    <span>{t('মক টেস্ট শুরু করো', 'Start Mock Test')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <p className="text-xs text-neutral-500 font-semibold">{t('উপস্থিতির হার', 'Attendance')}</p>
                <p className="text-2xl font-black text-neutral-900 mt-1">৯৬%</p>
                <span className="text-[10px] text-emerald-600 font-bold">{t('নিয়মিত উপস্থিতি', 'Consistent')}</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <p className="text-xs text-neutral-500 font-semibold">{t('সিলেবাস সম্পন্ন', 'Syllabus Done')}</p>
                <p className="text-2xl font-black text-[#FF9933] mt-1">৭২%</p>
                <span className="text-[10px] text-neutral-400">{t('৪টি অধ্যায় শেষ', '4 Chapters Finished')}</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <p className="text-xs text-neutral-500 font-semibold">{t('মক টেস্ট স্কোর', 'Avg Test Score')}</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">৮৮%</p>
                <span className="text-[10px] text-emerald-600 font-bold">{t('গ্রেড: AA', 'Grade: AA')}</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <p className="text-xs text-neutral-500 font-semibold">{t('ডাউনলোডকৃত নোটস', 'Notes Saved')}</p>
                <p className="text-2xl font-black text-neutral-900 mt-1">১৪ টি</p>
                <span className="text-[10px] text-neutral-400">{t('পিডিএফ কপি', 'PDF Copies')}</span>
              </div>
            </div>

            {/* MY ENROLLED PROGRAMS (Strictly showing only student's enrolled programs) */}
            <div className="bg-white rounded-3xl border-2 border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#FF9933]" />
                    <h3 className="text-lg font-black text-neutral-900">
                      {t('আমার নিবন্ধিত প্রোগ্রামসমূহ', 'My Enrolled Academic Programs')}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {t(
                      'ড্যাশবোর্ডে শুধুমাত্র তোমার সক্রিয়ভাবে নিবন্ধিত প্রোগ্রামগুলির পাঠক্রম প্রদর্শিত হচ্ছে।',
                      'Showing exclusively the academic programs in which you are currently enrolled.'
                    )}
                  </p>
                </div>

                {/* Program Filter Switcher */}
                {enrolledPrograms.length > 1 && (
                  <div className="flex flex-wrap items-center gap-1.5 bg-neutral-100 p-1 rounded-xl">
                    <button
                      onClick={() => setSelectedDashboardProgram('all')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        selectedDashboardProgram === 'all'
                          ? 'bg-white text-black shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      {t('সকল নিবন্ধিত বিষয়', 'All Enrolled')}
                    </button>
                    {enrolledPrograms.map(prog => (
                      <button
                        key={prog.id}
                        onClick={() => setSelectedDashboardProgram(prog.id)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          selectedDashboardProgram === prog.id
                            ? 'bg-[#FF9933] text-black shadow-xs'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        {prog.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Enrolled Program Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledPrograms.map(prog => {
                  const progBatches = (batches || []).filter(b => b && b.programId === prog.id);
                  const progCourses = (courses || []).filter(c => c && c.programId === prog.id);
                  return (
                    <div
                      key={prog.id}
                      className="border border-neutral-200 rounded-2xl p-4 bg-gradient-to-br from-neutral-50/50 to-white hover:border-[#FF9933]/60 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                          {t('নিবন্ধিত ও সক্রিয়', 'Enrolled & Active')}
                        </span>
                        <span className="text-xs font-bold text-neutral-400">
                          {prog.duration}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-neutral-900">
                          {prog.name} ({prog.nameBn})
                        </h4>
                        <p className="text-xs text-neutral-600 mt-0.5 line-clamp-2">
                          {prog.taglineBn || prog.descriptionBn || prog.description}
                        </p>
                      </div>

                      {/* Associated Active Batch Details */}
                      {progBatches.length > 0 && (
                        <div className="bg-white p-2.5 rounded-xl border border-neutral-200 text-xs space-y-1">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase">
                            {t('বর্তমান ব্যাচ:', 'Enrolled Batch:')}
                          </span>
                          <p className="font-bold text-neutral-900">
                            {progBatches[0].nameBn} • {progBatches[0].scheduleBn}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            {t('শিক্ষক:', 'Faculty:')} {progBatches[0].teacherName}
                          </p>
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-neutral-600">
                          <span>{t('সিলেবাস অগ্রগতি', 'Syllabus Progress')}</span>
                          <span className="text-[#FF9933]">75%</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FF9933] rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setCurrentSection('batches')}
                          className="flex-1 py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all text-center"
                        >
                          {t('ব্যাচ রুটিন', 'Batch Routine')}
                        </button>
                        <button
                          onClick={() => setCurrentSection('live')}
                          className="flex-1 py-1.5 px-3 bg-[#FF9933] hover:bg-[#ffaa55] text-black font-bold text-xs rounded-xl transition-all text-center"
                        >
                          {t('লাইভ ক্লাস', 'Live Classes')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue Watching + Upcoming Class Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Continue Watching */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-[#FF9933]" />
                    {t('পড়া চালিয়ে যাও (Continue Learning)', 'Continue Learning')}
                  </span>
                  <span className="text-[11px] text-[#FF9933] font-bold">46% Complete</span>
                </div>

                <div
                  onClick={() => setActiveVideo(recordedClasses[0])}
                  className="group relative rounded-xl overflow-hidden cursor-pointer border border-neutral-200"
                >
                  <img
                    src={recordedClasses[0].thumbnail}
                    alt="Current Video"
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#FF9933] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-1.5 bg-neutral-700">
                    <div className="h-full bg-[#FF9933]" style={{ width: '46%' }}></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {recordedClasses[0].titleBn}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {recordedClasses[0].chapterBn} • {recordedClasses[0].durationMinutes} {t('মিনিট', 'Mins')}
                  </p>
                </div>
              </div>

              {/* Upcoming Live Class */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-red-500" />
                      {t('পরবর্তী লাইভ ক্লাস', 'Next Live Class')}
                    </span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      {t('আজ সন্ধ্যা', 'Tonight')}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-900">
                    {nextLive.titleBn || nextLive.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    {t('শিক্ষক:', 'Faculty:')} {nextLive.teacherName}
                  </p>

                  <div className="bg-neutral-50 rounded-xl p-3 my-3 border border-neutral-100 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">{t('সময়:', 'Time:')}</span>
                      <span className="font-bold text-neutral-800">সন্ধ্যা ৭:০০ - ৮:৩০</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">{t('অধ্যায়:', 'Chapter:')}</span>
                      <span className="font-semibold text-neutral-800">{nextLive.chapterBn}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={nextLive.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all text-center block shadow-sm"
                >
                  {t('গুগল মিটে ক্লাসে যোগ দিন', 'Join via Google Meet')}
                </a>
              </div>
            </div>

            {/* Official Student Support & Community Channels Card */}
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-black text-white p-5 rounded-3xl border border-neutral-800 shadow-md space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF9933]/20 border border-[#FF9933]/40 flex items-center justify-center text-[#FF9933] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {t('অফিসিয়াল ফিজিক্স ফরওয়ার্ড কমিউনিটি ও ডাউট সমাধান চ্যানেল', 'Official Community & Doubt Groups')}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {t('হোয়াটসঅ্যাপ গ্রুপ ও টেলিগ্রামে সরাসরি সুব্রত স্যার ও সুমন স্যারের সাথে যুক্ত থাকো', 'Join verified doubt groups, YouTube lectures & WhatsApp broadcast')}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2.5 py-1 rounded-full self-start sm:self-auto">
                  6 Official Channels
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
                {OFFICIAL_SOCIAL_CHANNELS.map(ch => (
                  <a
                    key={ch.id}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-2xl bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700 hover:border-neutral-600 transition-all flex flex-col items-center text-center group"
                  >
                    <SocialPlatformIcon platformId={ch.id} size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-white mt-1.5 truncate w-full">
                      {ch.platform}
                    </span>
                    <span className="text-[9px] text-[#FF9933] font-mono truncate w-full">
                      {ch.buttonText.split(' ')[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. MY BATCHES & COURSES */}
        {currentSection === 'batches' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {t('আমার বর্তমান ব্যাচ ও শিক্ষাক্রম', 'My Enrolled Batches')}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t('শুধুমাত্র তোমার সক্রিয়ভাবে নিবন্ধিত প্রোগ্রামের ব্যাচসমূহ', 'Exclusively batches matching your enrolled programs')}
                </p>
              </div>

              {enrolledPrograms.length > 1 && (
                <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl">
                  <button
                    onClick={() => setSelectedDashboardProgram('all')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedDashboardProgram === 'all'
                        ? 'bg-white text-black shadow-xs'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    {t('সকল', 'All')}
                  </button>
                  {enrolledPrograms.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedDashboardProgram(p.id)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        selectedDashboardProgram === p.id
                          ? 'bg-[#FF9933] text-black shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {enrolledBatches.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center text-neutral-500 text-xs">
                {t('কোনো ব্যাচ পাওয়া যায়নি।', 'No active batch found for the selected filter.')}
              </div>
            ) : (
              <div className="space-y-5">
                {enrolledBatches.map(batch => (
                  <div key={batch.id} className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                            Active Batch
                          </span>
                          <span className="text-[10px] font-bold uppercase text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                            {programs.find(p => p.id === batch.programId || p.code === batch.programId)?.name || 'Program'}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-neutral-900 mt-1">
                          {batch.nameBn}
                        </h4>
                        <p className="text-xs text-neutral-500">
                          {t('প্রধান শিক্ষক:', 'Lead Teacher:')} {batch.teacherName}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-semibold text-neutral-500">{t('সময়সূচী:', 'Schedule:')}</p>
                        <p className="text-xs font-bold text-neutral-900">{batch.scheduleBn}</p>
                      </div>
                    </div>

                    {/* Course Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{t('কোর্স অগ্রগতি', 'Course Progress')}</span>
                        <span className="text-[#FF9933] font-bold">72%</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF9933] rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-neutral-50 text-xs border border-neutral-200">
                        <span className="text-neutral-400">{t('মোট শিক্ষার্থী', 'Batch Capacity')}</span>
                        <p className="text-base font-bold text-neutral-900 mt-0.5">{batch.enrolledCount} / {batch.capacity}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-neutral-50 text-xs border border-neutral-200">
                        <span className="text-neutral-400">{t('মেয়াদকাল', 'Batch Tenure')}</span>
                        <p className="text-base font-bold text-neutral-900 mt-0.5">সেশন ২০২৫ - ২০২৬</p>
                      </div>
                      <div className="p-3 rounded-xl bg-neutral-50 text-xs border border-neutral-200">
                        <span className="text-neutral-400">{t('সাপ্তাহিক ক্লাস', 'Weekly Frequency')}</span>
                        <p className="text-base font-bold text-neutral-900 mt-0.5">৩ দিন (নিয়মিত লাইভ)</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. LIVE CLASSES */}
        {currentSection === 'live' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">
                {t('লাইভ ক্লাস সূচী ও সংযোগ', 'Live Classes & Schedule')}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('তোমার নিবন্ধিত প্রোগ্রামের লাইভ ক্লাসসমূহ', 'Live interactive sessions for your enrolled programs')}
              </p>
            </div>

            <div className="space-y-4">
              {enrolledLiveClasses.map(lc => (
                <div
                  key={lc.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lc.status === 'upcoming' ? 'bg-orange-100 text-orange-900' : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {lc.status === 'upcoming' ? t('আসন্ন ক্লাস', 'Upcoming') : t('সম্পন্ন', 'Completed')}
                      </span>
                      <span className="text-xs font-semibold text-neutral-500">{lc.chapterBn}</span>
                    </div>

                    <h4 className="text-base font-bold text-neutral-900">
                      {lc.titleBn || lc.title}
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FF9933]" />
                        {lc.durationMinutes} {t('মিনিট', 'Minutes')}
                      </span>
                      <span>•</span>
                      <span>{lc.teacherName}</span>
                    </div>
                  </div>

                  <div>
                    {lc.status === 'upcoming' ? (
                      <a
                        href={lc.meetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Video className="w-4 h-4" />
                        <span>{t('লাইভ ক্লাসে যোগ দিন', 'Join Live Session')}</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => setActiveVideo(enrolledRecordings[0] || recordedClasses[0])}
                        className="px-4 py-2 bg-neutral-100 text-neutral-800 font-bold text-xs rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{t('রেকর্ডিং দেখুন', 'Watch Recording')}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. RECORDED CLASSES */}
        {currentSection === 'recorded' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">
                {t('রেকর্ডেড লেকচার লাইব্রেরি', 'Recorded Class Archive')}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('তোমার নিবন্ধিত পাঠক্রমের সকল রেকর্ডেড ক্লাস', 'Recorded video lessons for your enrolled programs')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {enrolledRecordings.map(rec => (
                <div
                  key={rec.id}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:border-[#FF9933]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setActiveVideo(rec)}
                      className="relative h-44 overflow-hidden cursor-pointer group"
                    >
                      <img
                        src={rec.thumbnail}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-[#FF9933] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[11px] px-2 py-0.5 rounded">
                        {rec.durationMinutes} min
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded">
                        {rec.chapterBn}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 line-clamp-2">
                        {rec.titleBn || rec.title}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                        {rec.summaryBn}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between text-xs border-t border-neutral-100 pt-3">
                    <span className="text-neutral-400">{rec.views} {t('বার দেখা হয়েছে', 'views')}</span>
                    <button
                      onClick={() => setActiveVideo(rec)}
                      className="text-xs font-bold text-[#FF9933] hover:underline flex items-center gap-1"
                    >
                      <span>{t('প্লেয়ার খুলুন', 'Play Video')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. STUDY MATERIALS */}
        {currentSection === 'materials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {t('স্টাডি মেটেরিয়ালস ও পিডিএফ হ্যান্ডআউট', 'Study Materials & Solved Papers')}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t('বাংলা নোটস, ফর্মুলা শিট এবং বিগত বছরের বোর্ড সমাধান', 'Handwritten notes, formula sheets, and solved papers')}
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex gap-1.5 overflow-x-auto text-xs">
                {['all', 'notes', 'formula_sheet', 'pyq'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setMaterialFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      materialFilter === cat
                        ? 'bg-[#FF9933] text-black shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:text-black'
                    }`}
                  >
                    {cat === 'all'
                      ? t('সকল মেটেরিয়াল', 'All')
                      : cat === 'notes'
                      ? t('নোটস', 'Notes')
                      : cat === 'formula_sheet'
                      ? t('ফর্মুলা শিট', 'Formulas')
                      : t('বিগত প্রশ্ন (PYQ)', 'PYQ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledMaterials
                .filter(m => materialFilter === 'all' || m.category === materialFilter)
                .map(mat => (
                  <div
                    key={mat.id}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:border-[#FF9933]/50 transition-all flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded">
                        {mat.classLevel} • {mat.chapterBn}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900">
                        {mat.titleBn || mat.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-neutral-400">
                        <span>{mat.fileSize}</span>
                        <span>•</span>
                        <span>{mat.pages} {t('পৃষ্ঠা', 'pages')}</span>
                        <span>•</span>
                        <span>{mat.downloadCount} {t('ডাউনলোড', 'downloads')}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast(t(`${mat.titleBn || mat.title} ডাউনলোড শুরু হয়েছে!`, `Downloading ${mat.title}...`))}
                      className="p-2.5 rounded-xl bg-neutral-100 hover:bg-[#FF9933] hover:text-black transition-all shrink-0 text-neutral-700"
                      title="Download PDF"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 6. ONLINE EXAMS */}
        {currentSection === 'exams' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">
                {t('অনলাইন মক টেস্ট ও পরীক্ষা ব্যবস্থা', 'Online Examination System')}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('টাইমড পরীক্ষা, নেগেটিভ মার্কিং এবং বিস্তারিত বাংলা সমাধান', 'Timed tests with auto-grading, negative marking, and Bengali answer explanations')}
              </p>
            </div>

            <div className="space-y-4">
              {enrolledExams.map(ex => (
                <div
                  key={ex.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {t('সক্রিয় পরীক্ষা', 'Active Exam')}
                      </span>
                      <span className="text-xs font-semibold text-neutral-500">{ex.subject} • {ex.classLevel}</span>
                    </div>

                    <h4 className="text-lg font-bold text-neutral-900">
                      {ex.titleBn || ex.title}
                    </h4>

                    <div className="flex flex-wrap gap-4 text-xs text-neutral-600 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FF9933]" />
                        {ex.durationMinutes} {t('মিনিট সময়', 'Minutes Duration')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#FF9933]" />
                        {ex.totalMarks} {t('মোট নম্বর', 'Total Marks')}
                      </span>
                      <span className="flex items-center gap-1 text-red-600">
                        {t(`নেগেটিভ: -${ex.negativeMarking}`, `Negative: -${ex.negativeMarking}`)}
                      </span>
                      <span className="flex items-center gap-1">
                        {ex.questions.length} {t('টি প্রশ্ন', 'Questions')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveExam(ex)}
                    className="px-6 py-3 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-md shadow-orange-500/20 shrink-0"
                  >
                    {t('পরীক্ষা শুরু করো', 'Start Examination Now')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. ASSIGNMENTS */}
        {currentSection === 'assignments' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">
                {t('সাপ্তাহিক হোমওয়ার্ক ও অ্যাসাইনমেন্ট', 'Assignments & Homework')}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('খাতায় অঙ্ক কষে ছবি বা পিডিএফ আপলোড করো, শিক্ষক মূল্যায়ন করবেন', 'Submit written problem sets for teacher evaluation and marks')}
              </p>
            </div>

            <div className="space-y-4">
              {assignments.map(asg => (
                <div
                  key={asg.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        {t('জমা দেওয়ার শেষ সময় বাকি', 'Open for Submission')}
                      </span>
                      <span className="text-xs text-neutral-500">{asg.subject}</span>
                    </div>

                    <h4 className="text-base font-bold text-neutral-900">
                      {asg.titleBn || asg.title}
                    </h4>

                    <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">
                      {asg.descriptionBn || asg.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-neutral-500 pt-1">
                      <span>{t('মোট মান:', 'Total Marks:')} {asg.totalMarks}</span>
                      <span>•</span>
                      <span>{t('শেষ তারিখ: ১৫ এপ্রিল ২০২৬', 'Deadline: April 15, 2026')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setUploadModalAsg(asg)}
                    className="px-5 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-black transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Upload className="w-4 h-4 text-[#FF9933]" />
                    <span>{t('উত্তর আপলোড করো', 'Upload Solution')}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Assignment Submission Modal */}
            {uploadModalAsg && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl space-y-4">
                  <h3 className="text-base font-bold text-neutral-900">
                    {t('অ্যাসাইনমেন্ট জমা দিন', 'Submit Assignment Solution')}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {uploadModalAsg.titleBn || uploadModalAsg.title}
                  </p>

                  {uploadSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{t('সফলভাবে জমা দেওয়া হয়েছে! শিক্ষক মূল্যায়ন করবেন।', 'Successfully submitted! Teacher will review soon.')}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                      <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center space-y-2 hover:border-[#FF9933] cursor-pointer bg-neutral-50">
                        <Upload className="w-8 h-8 text-neutral-400 mx-auto" />
                        <p className="text-xs font-semibold text-neutral-700">
                          {t('পিডিএফ বা ছবি ড্র্যাগ করো অথবা সিলেক্ট করো', 'Select PDF or Photos of your notebook')}
                        </p>
                        <p className="text-[10px] text-neutral-400">PDF, JPG, PNG (Max 15MB)</p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          {t('শিক্ষকের জন্য কোনো মন্তব্য (ঐচ্ছিক):', 'Notes for Teacher (Optional):')}
                        </label>
                        <textarea
                          rows={2}
                          value={uploadNote}
                          onChange={e => setUploadNote(e.target.value)}
                          placeholder={t('৩ নম্বর অঙ্কটিতে একটু সন্দেহ ছিল...', 'Any specific doubt or step remarks...')}
                          className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setUploadModalAsg(null)}
                          className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                        >
                          {t('বাতিল', 'Cancel')}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55]"
                        >
                          {t('জমা করো', 'Submit Now')}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 8. QUESTION BANK */}
        {currentSection === 'qbank' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {t('অধ্যায়ভিত্তিক প্রশ্নব্যাঙ্ক ও উত্তর', 'Chapterwise Question Bank')}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t('বোর্ড পরীক্ষার সম্ভাব্য প্রশ্ন ও মডেল উত্তরের সংগ্রহ', 'Practice board pattern questions with hidden hints & Bengali solutions')}
                </p>
              </div>

              <select
                value={qbTopic}
                onChange={e => setQbTopic(e.target.value)}
                className="px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF9933]"
              >
                <option value="all">{t('সকল অধ্যায় (All Chapters)', 'All Chapters')}</option>
                <option value="Current Electricity">{t('চলতড়িৎ', 'Current Electricity')}</option>
                <option value="Optics">{t('আলোকবিজ্ঞান', 'Optics')}</option>
                <option value="Gas Laws">{t('গ্যাসের আচরণ', 'Gas Laws')}</option>
              </select>
            </div>

            <div className="space-y-4">
              {exams[0].questions.map((q, idx) => {
                const isRevealed = revealedAnswers[q.id];
                return (
                  <div key={q.id} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-500">{t(`প্রশ্ন ${idx + 1}`, `Question ${idx + 1}`)} • {q.topic}</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        {q.marks} {t('নম্বর', 'Marks')}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-neutral-900 leading-relaxed">
                      {q.questionTextBn}
                    </p>

                    <div className="pt-1 flex items-center justify-between">
                      <button
                        onClick={() => setRevealedAnswers(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="text-xs font-bold text-[#FF9933] hover:underline flex items-center gap-1"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{isRevealed ? t('উত্তর গোপন করো', 'Hide Solution') : t('সঠিক উত্তর ও সমাধান দেখুন', 'Show Solution & Answer')}</span>
                      </button>
                    </div>

                    {isRevealed && (
                      <div className="bg-orange-50/60 border border-orange-200/80 rounded-xl p-4 text-xs space-y-1.5 animate-in fade-in">
                        <p className="font-bold text-neutral-900">
                          {t('ব্যাখ্যা ও নির্ভুল উত্তর:', 'Detailed Explanation:')}
                        </p>
                        <p className="text-neutral-800 leading-relaxed">{q.explanationBn}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 9. PHYSICS TOOLS */}
        {currentSection === 'tools' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">
                {t('ফিজিক্স টুলস, ফর্মুলা ব্যাঙ্ক ও ক্যালকুলেটর', 'Physics Formula Bank & Calculators')}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('সূত্র সন্ধান, একক রূপান্তর ও গাণিতিক সমীকরণের স্বয়ংক্রিয় সমাধান', 'Interactive formulas, unit conversion, and physics equation solvers')}
              </p>
            </div>

            <PhysicsTools />
          </div>
        )}

        {/* 10. PAYMENTS & INVOICES */}
        {currentSection === 'payments' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">
                {t('পেমেন্ট হিস্ট্রি ও ইনভয়েস রসিদ', 'Transaction History & Receipts')}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('তোমার সমস্ত কোর্স ফি ও লেনদেনের বিস্তারিত বিবরণ', 'Complete order records and download official GST receipt')}
              </p>
            </div>

            {/* Coupon Code Redemption */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#FF9933]" />
                {t('ডিসকাউন্ট কুপন রিডিম করুন', 'Redeem Discount Coupon')}
              </h4>
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder="e.g. FORWARD50 or BENGALIPHYSICS"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 text-xs uppercase font-mono focus:outline-none focus:border-[#FF9933]"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55]"
                >
                  {t('প্রয়োগ করো', 'Apply')}
                </button>
              </div>
              {couponMessage && (
                <p className="text-xs font-semibold text-emerald-700">{couponMessage}</p>
              )}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-neutral-100 font-bold text-xs text-neutral-800">
                {t('সাম্প্রতিক লেনদেনসমূহ (Orders)', 'Recent Orders')}
              </div>
              <div className="divide-y divide-neutral-100">
                {orders.map(ord => (
                  <div key={ord.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900">{ord.courseTitle}</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-neutral-500 font-mono text-[11px]">
                        Txn ID: {ord.transactionId} • {ord.paymentMethod} • {ord.createdAt.split('T')[0]}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-base font-black text-neutral-900">₹{ord.amount}</span>
                        {ord.discountAmount > 0 && (
                          <p className="text-[10px] text-emerald-600 font-bold">Saved ₹{ord.discountAmount}</p>
                        )}
                      </div>

                      <button
                        onClick={() => setReceiptOrder(ord)}
                        className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-bold hover:bg-neutral-50 flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t('রসিদ (Receipt)', 'Receipt')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 11. PROFILE & SETTINGS */}
        {currentSection === 'profile' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900">
                {t('শিক্ষার্থী প্রোফাইল ও অ্যাকাউন্ট সেটিংস', 'Student Profile & Settings')}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('তোমার ব্যক্তিগত তথ্য ও যোগাযোগ নম্বর হালনাগাদ করো', 'Manage your registered contact & academic details')}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-6">
              {profileSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('প্রোফাইল সফলভাবে আপডেট করা হয়েছে!', 'Profile updated successfully!')}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('শিক্ষার্থীর পুরো নাম', 'Full Name')}
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('মোবাইল নম্বর', 'Registered Phone')}
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('বিদ্যালয়ের নাম', 'School Name')}
                  </label>
                  <input
                    type="text"
                    value={editSchool}
                    onChange={e => setEditSchool(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('শহর / জেলা', 'City / District')}
                  </label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={e => setEditCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex justify-end">
                <button
                  onClick={() => {
                    setProfileSaved(true);
                    setTimeout(() => setProfileSaved(false), 3000);
                  }}
                  className="px-6 py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-sm"
                >
                  {t('পরিবর্তন সংরক্ষণ করুন', 'Save Profile Changes')}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Video Player Modal */}
      {activeVideo && (
        <VideoPlayerModal
          recordedClass={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Invoice Receipt Modal */}
      {receiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#FF9933]">PHYSICS FORWARD</p>
                <h4 className="text-base font-black text-neutral-900">
                  {t('অফিসিয়াল পেমেন্ট রসিদ', 'Official Fee Receipt')}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                {receiptOrder.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('ইনভয়েস নং:', 'Invoice No:')}</span>
                <span className="font-mono font-bold text-neutral-900">{receiptOrder.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('শিক্ষার্থী:', 'Student:')}</span>
                <span className="font-bold text-neutral-900">{receiptOrder.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('কোর্স:', 'Course:')}</span>
                <span className="font-bold text-neutral-900 text-right max-w-[220px]">{receiptOrder.courseTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('ট্রানজ্যাকশন আইডি:', 'Transaction ID:')}</span>
                <span className="font-mono text-neutral-800">{receiptOrder.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('তারিখ:', 'Date:')}</span>
                <span className="text-neutral-800">{receiptOrder.createdAt.split('T')[0]}</span>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex justify-between items-center">
                <span className="font-bold text-neutral-700">{t('মোট প্রদত্ত অর্থ:', 'Amount Paid:')}</span>
                <span className="text-lg font-black text-emerald-700">₹{receiptOrder.amount}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 text-[11px] text-neutral-500">
              Contai, Purba Medinipur, West Bengal • Contact: 8972263462
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-bold hover:bg-neutral-50"
              >
                {t('প্রিন্ট করুন', 'Print')}
              </button>
              <button
                onClick={() => setReceiptOrder(null)}
                className="px-5 py-2 rounded-xl bg-[#FF9933] text-black text-xs font-extrabold hover:bg-[#ffaa55]"
              >
                {t('বন্ধ করুন', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Non-blocking Floating Toast */}
      {dashboardToast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold shadow-xl border border-neutral-700 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
          <span>{dashboardToast}</span>
        </div>
      )}
    </div>
  );
};
