import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { WebsiteHome } from './components/website/WebsiteHome';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import { TeacherPanel } from './components/teacher/TeacherPanel';
import { PhysicsTools } from './components/student/PhysicsTools';
import { ExamPortal } from './components/student/ExamPortal';
import { VideoPlayerModal } from './components/student/VideoPlayerModal';
import { EnrollmentModal } from './components/checkout/EnrollmentModal';
import { MobileAppView } from './components/mobile/MobileAppView';
import { api } from './services/api';
import {
  Program,
  Course,
  Batch,
  LiveClass,
  RecordedClass,
  StudyMaterial,
  Exam,
  Assignment,
  PaymentOrder,
  Announcement,
  ContactEnquiry,
  Coupon
} from './types';
import {
  INITIAL_PROGRAMS,
  INITIAL_COURSES,
  INITIAL_BATCHES,
  INITIAL_LIVE_CLASSES,
  INITIAL_RECORDED_CLASSES,
  INITIAL_STUDY_MATERIALS,
  INITIAL_EXAMS,
  INITIAL_ASSIGNMENTS,
  INITIAL_ORDERS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ENQUIRIES,
  INITIAL_COUPONS
} from './data/mockData';
import {
  Bell,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  Radio,
  RefreshCw,
  Sparkles,
  Database,
  CheckCircle2
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { user, isAuthenticated, switchRole } = useAuth();
  const { t } = useLanguage();

  // Primary Interconnected Views
  const [activeView, setActiveView] = useState<
    'website' | 'student_dashboard' | 'mobile_app' | 'teacher_panel' | 'admin_panel' | 'physics_tools'
  >('website');

  // Modals & Active Overlays
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [activeVideo, setActiveVideo] = useState<RecordedClass | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());

  // Platform Central Database State
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_LIVE_CLASSES);
  const [recordedClasses, setRecordedClasses] = useState<RecordedClass[]>(INITIAL_RECORDED_CLASSES);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [orders, setOrders] = useState<PaymentOrder[]>(INITIAL_ORDERS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(INITIAL_ENQUIRIES);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  // Fetch from Central API on mount and on poll
  const loadData = async () => {
    try {
      const [
        programsData,
        coursesData,
        batchesData,
        liveData,
        recordedData,
        materialsData,
        examsData,
        ordersData,
        announcementsData,
        enquiriesData
      ] = await Promise.all([
        api.getPrograms(true).catch(() => INITIAL_PROGRAMS),
        api.getCourses(true).catch(() => INITIAL_COURSES),
        api.getBatches().catch(() => INITIAL_BATCHES),
        api.getLiveClasses().catch(() => INITIAL_LIVE_CLASSES),
        api.getRecordedClasses().catch(() => INITIAL_RECORDED_CLASSES),
        api.getStudyMaterials().catch(() => INITIAL_STUDY_MATERIALS),
        api.getExams().catch(() => INITIAL_EXAMS),
        api.getOrders().catch(() => INITIAL_ORDERS),
        api.getAnnouncements().catch(() => INITIAL_ANNOUNCEMENTS),
        api.getEnquiries().catch(() => INITIAL_ENQUIRIES)
      ]);

      if (Array.isArray(programsData)) setPrograms(programsData);
      if (Array.isArray(coursesData)) setCourses(coursesData);
      if (Array.isArray(batchesData)) setBatches(batchesData);
      if (Array.isArray(liveData)) setLiveClasses(liveData);
      if (Array.isArray(recordedData)) setRecordedClasses(recordedData);
      if (Array.isArray(materialsData)) setStudyMaterials(materialsData);
      if (Array.isArray(examsData)) setExams(examsData);
      if (Array.isArray(ordersData)) setOrders(ordersData);
      if (Array.isArray(announcementsData)) setAnnouncements(announcementsData);
      if (Array.isArray(enquiriesData)) setEnquiries(enquiriesData);
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (e) {
      console.warn('Fallback to initial mock data', e);
    }
  };

  useEffect(() => {
    loadData();
    // Continuous ecosystem heartbeat poll every 7 seconds
    const interval = setInterval(loadData, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleEnrollSuccess = (order: PaymentOrder) => {
    setOrders(prev => [order, ...prev]);
    setSelectedCourseForEnroll(null);
    setActiveView('student_dashboard');
  };

  // If Mobile Simulation view is active, render mobile container
  if (activeView === 'mobile_app') {
    return (
      <MobileAppView
        programs={programs}
        courses={courses}
        batches={batches}
        liveClasses={liveClasses}
        recordedClasses={recordedClasses}
        exams={exams}
        onSelectCourse={c => {
          setSelectedCourseForEnroll(c);
        }}
        onOpenExam={e => setActiveExam(e)}
        onOpenVideo={v => setActiveVideo(v)}
        onExitMobile={() => setActiveView('website')}
      />
    );
  }

  // Active full screen exam mode
  if (activeExam) {
    return (
      <div className="min-h-screen bg-neutral-100 p-4 sm:p-8 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <ExamPortal exam={activeExam} onExit={() => setActiveExam(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFB] text-[#111111] font-sans selection:bg-[#FF9933]/30 overflow-x-hidden">
      {/* Main Navigation Header */}
      <Header
        activeView={activeView}
        onViewChange={v => {
          if (v === 'admin_panel' && user?.role === 'student') {
            switchRole('super_admin');
          } else if (v === 'teacher_panel' && user?.role === 'student') {
            switchRole('teacher');
          }
          setActiveView(v);
        }}
        onOpenAuthModal={() => handleOpenAuth('login')}
      />

      {/* Real-time Central Ecosystem Interconnection Ribbon */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-white text-xs px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Central Database Connected
            </span>
            <span className="text-[11px] text-neutral-300">
              1 Central Backend (REST API /api/*) Mutual Sync Across All 4 Portals:
            </span>
          </div>

          {/* Quick 4-Portal Interactive Switcher Nodes */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            <button
              onClick={() => setActiveView('website')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                activeView === 'website'
                  ? 'bg-[#FF9933] text-black shadow-xs font-black'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>Student Website</span>
            </button>

            <span className="text-neutral-600">↕</span>

            <button
              onClick={() => setActiveView('mobile_app')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                activeView === 'mobile_app'
                  ? 'bg-[#FF9933] text-black shadow-xs font-black'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Student Mobile App</span>
            </button>

            <span className="text-neutral-600">↕</span>

            <button
              onClick={() => {
                if (user?.role === 'student') switchRole('teacher');
                setActiveView('teacher_panel');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                activeView === 'teacher_panel'
                  ? 'bg-blue-500 text-white shadow-xs font-black'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Radio className="w-3 h-3 text-blue-300" />
              <span>Teacher Panel</span>
            </button>

            <span className="text-neutral-600">↕</span>

            <button
              onClick={() => {
                if (user?.role === 'student') switchRole('super_admin');
                setActiveView('admin_panel');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                activeView === 'admin_panel'
                  ? 'bg-amber-500 text-black shadow-xs font-black'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin App</span>
            </button>

            <button
              onClick={() => {
                loadData();
              }}
              title="Poll latest from /api"
              className="p-1 rounded-md bg-neutral-800 text-neutral-400 hover:text-emerald-400 ml-1"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Page Body with Mobile Bottom Bar Clearance */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-20 md:pb-8 overflow-x-hidden">
        {activeView === 'website' && (
          <WebsiteHome
            programs={programs}
            courses={courses}
            batches={batches}
            liveClasses={liveClasses}
            onSelectCourse={c => {
              if (!isAuthenticated) {
                handleOpenAuth('register');
              } else {
                setSelectedCourseForEnroll(c);
              }
            }}
            onOpenAuth={() => handleOpenAuth('login')}
            onOpenMobileApp={() => setActiveView('mobile_app')}
            onOpenTools={() => setActiveView('physics_tools')}
          />
        )}

        {activeView === 'student_dashboard' && (
          <StudentDashboard
            programs={programs}
            courses={courses}
            batches={batches}
            liveClasses={liveClasses}
            recordedClasses={recordedClasses}
            studyMaterials={studyMaterials}
            exams={exams}
            assignments={assignments}
            orders={orders}
            onOpenCourse={c => setSelectedCourseForEnroll(c)}
          />
        )}

        {activeView === 'teacher_panel' && (
          <TeacherPanel
            courses={courses}
            batches={batches}
            liveClasses={liveClasses}
            recordedClasses={recordedClasses}
            studyMaterials={studyMaterials}
            exams={exams}
            onRefreshData={loadData}
          />
        )}

        {activeView === 'admin_panel' && (
          <AdminPanel
            programs={programs}
            courses={courses}
            batches={batches}
            liveClasses={liveClasses}
            recordedClasses={recordedClasses}
            studyMaterials={studyMaterials}
            exams={exams}
            orders={orders}
            announcements={announcements}
            enquiries={enquiries}
            coupons={coupons}
            onRefreshData={loadData}
          />
        )}

        {activeView === 'physics_tools' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2.5 py-0.5 rounded-full">
                Interactive Physics Toolkit
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
                {t('পদার্থবিজ্ঞান সূত্র ব্যাঙ্ক, ক্যালকুলেটর ও একক রূপান্তরকারী', 'Physics Formula Bank & Solver Suite')}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                {t('মাধ্যমিক ও উচ্চমাধ্যমিকের সমস্ত অধ্যায়ের গাণিতিক সূত্র, এসআই একক এবং সমীকরণ সমাধান', 'Search formulas, calculate kinematics & lens equations, convert CGS to SI units instantly')}
              </p>
            </div>

            <PhysicsTools />
          </div>
        )}
      </main>

      {/* Main Website Footer */}
      <Footer />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Course Enrollment & Checkout Modal */}
      {selectedCourseForEnroll && (
        <EnrollmentModal
          course={selectedCourseForEnroll}
          onClose={() => setSelectedCourseForEnroll(null)}
          onSuccess={handleEnrollSuccess}
        />
      )}

      {/* Video Player Modal */}
      {activeVideo && (
        <VideoPlayerModal
          recordedClass={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
