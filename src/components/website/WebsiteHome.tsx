import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Program, Course, Batch, LiveClass, AppSettings } from '../../types';
import { api } from '../../services/api';
import { WebsiteSocialSection } from '../social/OfficialSocialChannels';
import {
  Atom,
  ArrowRight,
  CheckCircle2,
  Play,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Users,
  Video,
  FileCheck,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
  ExternalLink,
  GraduationCap,
  Target,
  Flame,
  Compass,
  Layers,
  Stethoscope,
  X
} from 'lucide-react';

interface WebsiteHomeProps {
  programs: Program[];
  courses: Course[];
  batches: Batch[];
  liveClasses: LiveClass[];
  onSelectCourse: (course: Course) => void;
  onOpenAuth: () => void;
  onOpenMobileApp: () => void;
  onOpenTools: () => void;
}

export const WebsiteHome: React.FC<WebsiteHomeProps> = ({
  programs = [],
  courses = [],
  batches = [],
  liveClasses = [],
  onSelectCourse,
  onOpenAuth,
  onOpenMobileApp,
  onOpenTools
}) => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  // Dynamic CMS Settings State
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    api.getSettings().then(setSettings).catch(console.warn);
  }, []);

  // Active Program filter for courses
  const [selectedProgramId, setSelectedProgramId] = useState('all');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Program Exploration Modal State
  const [programModal, setProgramModal] = useState<Program | null>(null);

  const getProgramIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'graduationcap': return GraduationCap;
      case 'bookopen': return BookOpen;
      case 'layers': return Layers;
      case 'award': return Award;
      case 'stethoscope': return Stethoscope;
      case 'compass': return Compass;
      case 'sparkles': return Sparkles;
      case 'target': return Target;
      case 'atom': return Atom;
      default: return GraduationCap;
    }
  };

  // Filter active and unarchived programs sorted by display order (respecting displayOnWebsite)
  const activePrograms = (programs || [])
    .filter(p => p && p.active && !p.archived && p.displayOnWebsite !== false)
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  const filteredCourses = (courses || [])
    .filter(c => !c.archived && c.published !== false && c.displayOnWebsite !== false)
    .filter(c => {
      if (selectedProgramId === 'all') return true;
      return c.programId === selectedProgramId;
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  const getProgramCourses = (progId: string) =>
    (courses || [])
      .filter(c => c.programId === progId && !c.archived && c.published !== false && c.displayOnWebsite !== false)
      .sort((a, b) => (a.order || 999) - (b.order || 999));

  const handleProgramSelect = (prog: Program) => {
    const progCourses = getProgramCourses(prog.id);
    const openCourse = progCourses.find(c => c.enrollmentOpen !== false);
    if (openCourse) {
      onSelectCourse(openCourse);
    } else {
      setProgramModal(prog);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactMessage) return;
    setContactSubmitting(true);
    try {
      await api.submitEnquiry({
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
        subject: contactSubject || 'Admission Enquiry',
        message: contactMessage
      });
      setContactSuccess(true);
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setContactSubmitting(false);
    }
  };

  const faqs = [
    {
      qBn: 'ক্লাসগুলো কি সম্পূর্ণ বাংলা ভাষায় পরিচালিত হয়?',
      qEn: 'Are the classes conducted primarily in Bengali?',
      aBn: 'হ্যাঁ, প্রতিটি অধ্যায়ের বৈজ্ঞানিক ব্যাখ্যা, সমীকরণ এবং গাণিতিক সমস্যার সমাধান সম্পূর্ণ প্রাঞ্জল বাংলা ভাষায় বোঝানো হয়। সাথে সাথে উচ্চমাধ্যমিক ও প্রবেশিকা পরীক্ষার জন্য প্রয়োজনীয় ইংরেজি পারিভাষিক শব্দও (Technical Terms) শিখিয়ে দেওয়া হয়।',
      aEn: 'Yes, all scientific explanations and numericals are taught in crystal-clear Bengali, while familiarizing students with essential English technical terms for board & competitive exams.'
    },
    {
      qBn: 'লাইভ ক্লাস মিস হলে কি রেকর্ডিং দেখা যাবে?',
      qEn: 'Can I watch recorded lessons if I miss a live class?',
      aBn: 'অবশ্যই! প্রতিটি লাইভ ক্লাস শেষ হওয়ার কয়েক ঘণ্টার মধ্যেই ফুল এইচডি কোয়ালিটিতে অ্যাপ এবং ওয়েবসাইটে আপলোড হয়ে যায়। তুমি যতবার খুশি রিভিশন দিতে পারো।',
      aEn: 'Absolutely. Every live session is uploaded in Full HD to both the mobile app and website for unlimited revisions.'
    },
    {
      qBn: 'স্টাডি মেটেরিয়াল ও ফর্মুলা শিট কীভাবে পাবো?',
      qEn: 'How will I receive study materials and formula sheets?',
      aBn: 'এনরোল করার সাথে সাথে ড্যাশবোর্ডের "Study Materials" সেকশন থেকে অধ্যায়ভিত্তিক হ্যান্ডরিটেন নোট, ফর্মুলা শিট এবং বিগত ৫ বছরের বোর্ড সমাধান পিডিএফ ডাউনলোড ও প্রিন্ট করা যাবে।',
      aEn: 'Enrolled students can immediately download and print chapterwise handwritten notes, formula sheets, and past 5-year solved board papers.'
    },
    {
      qBn: 'ভবিষ্যতে গণিত বা অন্যান্য বিষয় কি যুক্ত হবে?',
      qEn: 'Will other subjects like Mathematics or Chemistry be added in future?',
      aBn: 'হ্যাঁ, ফিজিক্স ফরওয়ার্ডের আর্কিটেকচার এমনভাবে তৈরি যাতে আগামী শিক্ষাবর্ষে গণিত, রসায়ন এবং জীববিজ্ঞান অন্তর্ভুক্ত হবে।',
      aEn: 'Yes, our modular academic system is expanding into Mathematics, Chemistry, and Biology in the coming sessions.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-neutral-900 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-ping"></span>
                <span>{t('বাংলা মাধ্যমের জন্য বিশেষায়িত ফিজিক্স প্ল্যাটফর্ম', 'First-Class Bengali-Medium Physics Platform')}</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111]">
                  PHYSICS <span className="text-[#FF9933]">FORWARD</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-800">
                  {t('“পদার্থবিজ্ঞান বোঝো, এগিয়ে চলো।”', '“Understand Physics. Move Forward.”')}
                </h2>
              </div>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {t(
                  'বাংলা মাধ্যমের শিক্ষার্থীদের জন্য আধুনিক, ধারণানির্ভর শিক্ষণ ব্যবস্থা। ৭টি সুনির্দিষ্ট একাডেমিক প্রোগ্রাম—Class 9, Class 10, Class 11, Class 12, NEET, JEE Mains ও Foundation—এর মাধ্যমে লাইভ ক্লাস, রেকর্ডেড লেকচার ও টেস্ট সিরিজের সাহায্যে পদার্থবিদ্যায় নিশ্চিত সাফল্য।',
                  'Concept-focused Physics learning for Bengali-medium students with 7 comprehensive programs: Class 9, Class 10, Class 11, Class 12, NEET, JEE Mains, and Foundation.'
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#programs"
                  className="px-6 py-3.5 rounded-xl bg-[#FF9933] text-black font-extrabold text-sm hover:bg-[#ffaa55] transition-all shadow-md shadow-orange-500/20 flex items-center gap-2"
                >
                  <span>{t('আমাদের প্রোগ্রামসমূহ দেখুন', 'Explore Our Programs')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#courses"
                  className="px-6 py-3.5 rounded-xl bg-[#111111] text-white font-bold text-sm hover:bg-neutral-800 transition-all flex items-center gap-2"
                >
                  <span>{t('কোর্স ক্যাটালগ', 'Browse Courses')}</span>
                </a>

                {!isAuthenticated ? (
                  <button
                    onClick={onOpenAuth}
                    className="px-5 py-3.5 rounded-xl bg-white text-neutral-800 font-bold text-sm border border-neutral-300 hover:bg-neutral-50 transition-all"
                  >
                    {t('স্টুডেন্ট লগইন', 'Student Login')}
                  </button>
                ) : (
                  <button
                    onClick={onOpenTools}
                    className="px-5 py-3.5 rounded-xl bg-orange-50 text-neutral-900 font-bold text-sm border border-orange-200 hover:bg-orange-100 transition-all flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4 text-[#FF9933]" />
                    <span>{t('ফিজিক্স টুলস', 'Physics Tools')}</span>
                  </button>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('সহজ বাংলা ভাষায় গাণিতিক সমাধান', 'Native Bengali Explanations')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('সাপ্তাহিক অনলাইন মক টেস্ট', 'Weekly Online Mock Tests')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('মোবাইল ও ওয়েব দুই মাধ্যমেই ব্যবহারযোগ্য', 'Mobile App & Web Synced')}</span>
                </div>
              </div>
            </div>

            {/* Right Card / Live Stream Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xl relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    {t('আসন্ন লাইভ ক্লাস', 'Upcoming Live Session')}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded">
                    JEE Mains & Foundation
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden mb-4 border border-neutral-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80"
                    alt="Physics Live Lecture"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <p className="text-[11px] font-bold text-[#FF9933] uppercase">Kinematics & Problem-Solving</p>
                      <h4 className="text-sm font-bold">নততলে প্রক্ষেপকের গতি ও শর্টকাট টেকনিক</h4>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-600 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#FF9933]" />
                      <span>{t('আজ সন্ধ্যা ৭:০০ - ৮:৩০', 'Tonight 7:00 PM')}</span>
                    </span>
                    <span className="font-semibold text-neutral-800">Subrata Sir, M.Sc.</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#FF9933]" />
                      <span>{t('সময়কাল: ৯০ মিনিট', 'Duration: 90 Mins')}</span>
                    </span>
                    <span className="text-emerald-700 font-bold">{t('লাইভ ডাউট সলভ', 'Live Doubt Clearance')}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCourse(courses[0])}
                  className="w-full py-3 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all text-center block shadow-md shadow-orange-500/10"
                >
                  {t('ব্যাচের সম্পূর্ণ সিলেবাস ও ভর্তি হন', 'View Batch & Enroll Now')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-10 border border-neutral-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#FF9933]">১,৫০০+</p>
              <p className="text-xs text-neutral-400 mt-1">{t('বাংলা মাধ্যমের নিবন্ধিত শিক্ষার্থী', 'Enrolled Bengali Students')}</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">৯৮%</p>
              <p className="text-xs text-neutral-400 mt-1">{t('সাফল্যর হার ও কনসেপ্ট ক্লিয়ারিং', 'Success & Clarity Rate')}</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#FF9933]">১২০+</p>
              <p className="text-xs text-neutral-400 mt-1">{t('কনসেপ্ট ভিডিও ও ক্লাস রেকর্ডিং', 'Recorded Concept Lessons')}</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">৪.৯ ★</p>
              <p className="text-xs text-neutral-400 mt-1">{t('অভিভাবক ও শিক্ষার্থীর সন্তুষ্টি', 'Student & Parent Rating')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHOOSE YOUR PROGRAM (INITIAL 7 ACADEMIC COURSES/PROGRAMS) */}
      <section id="programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{t('একাডেমিক প্রোগ্রামসমূহ', 'Academic Programs')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111111]">
            {t('Choose Your Program', 'Choose Your Program')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {t(
              'ফিজিক্স ফরওয়ার্ডের অধীনে বর্তমানে সুনির্দিষ্ট ৭টি উচ্চমান সম্পন্ন ফিজিক্স পাঠক্রম চালু রয়েছে—Class 9, Class 10, Class 11, Class 12, NEET, JEE Mains ও Foundation। প্রতিটি প্রোগ্রামে রয়েছে অধ্যায়ভিত্তিক সিলেবাস, কনসেপ্ট ক্লাস, প্রবলেম-সলভিং ও নির্ভরযোগ্য টেস্ট সিরিজ।',
              'Choose from our seven specialized physics programs: Class 9, Class 10, Class 11, Class 12, NEET, JEE Mains, and Foundation with comprehensive concept classes, problem-solving, and regular tests.'
            )}
          </p>
        </div>

        {/* 7 Programs Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {activePrograms.map(prog => {
            const matchedCourses = getProgramCourses(prog.id);
            const hasOpenCourse = matchedCourses.some(c => c.enrollmentOpen !== false);
            const IconComp = getProgramIcon(prog.icon);

            return (
              <div
                key={prog.id}
                className="bg-white rounded-3xl border-2 border-neutral-200 hover:border-[#FF9933] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Visual Header with Image & Icon */}
                  <div className="relative h-44 overflow-hidden bg-neutral-900">
                    <img
                      src={prog.imageUrl || prog.bannerUrl || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80'}
                      alt={prog.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                      <IconComp className="w-3.5 h-3.5 text-[#FF9933]" />
                      <span>{prog.badge || prog.name}</span>
                    </div>

                    <div className="absolute top-3 right-3 text-xs font-black text-black bg-[#FF9933] px-2.5 py-0.5 rounded shadow-xs">
                      {prog.duration || '12 Months'}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-xl font-black leading-tight text-white group-hover:text-[#FF9933] transition-colors drop-shadow-sm">
                        {prog.name}
                      </h3>
                      <p className="text-xs font-semibold text-neutral-300 mt-0.5">
                        {prog.nameBn}
                      </p>
                    </div>
                  </div>

                  {/* Program Description & Hierarchy Path */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {prog.taglineBn || prog.descriptionBn || prog.description}
                    </p>

                    {/* Academic Hierarchy Flow Tag */}
                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-[10px] space-y-1">
                      <span className="font-bold text-[#FF9933] uppercase tracking-wider block text-[9px]">
                        {t('অ্যাকাডেমিক স্ট্রাকচার', 'Academic Hierarchy')}
                      </span>
                      <p className="font-mono text-neutral-700 truncate" title={prog.flowPath}>
                        {prog.flowPath || `${prog.name} → ${prog.subject || 'Physics'} → Courses → Chapters → Lessons → Tests`}
                      </p>
                    </div>

                    {/* Available Courses info */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
                      <span className="text-neutral-500 font-medium">
                        {t('উপলব্ধ কোর্স:', 'Available Courses:')}
                      </span>
                      <span className="font-bold text-neutral-900 bg-orange-50 text-[#FF9933] px-2 py-0.5 rounded-md text-[11px]">
                        {matchedCourses.length} {t('কোর্স', 'Course' + (matchedCourses.length === 1 ? '' : 's'))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action Footer */}
                <div className="p-5 pt-3 border-t border-neutral-100 bg-neutral-50/70 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-400 block font-medium">
                        {t('প্রোগ্রাম ফি', 'Program Fee')}
                      </span>
                      <span className="text-xl font-black text-[#111111]">
                        ₹{prog.basePrice}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {t('সম্পূর্ণ সেশন', 'Full Access')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleProgramSelect(prog)}
                      disabled={!hasOpenCourse && matchedCourses.length > 0}
                      className={`w-full py-2.5 px-3 font-black text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 text-center ${
                        !hasOpenCourse && matchedCourses.length > 0
                          ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                          : 'bg-[#FF9933] hover:bg-[#ffaa55] text-black'
                      }`}
                    >
                      <span>
                        {!hasOpenCourse && matchedCourses.length > 0
                          ? t('ভর্তি বন্ধ', 'Closed')
                          : t('এনরোল করো', 'Enroll Now')}
                      </span>
                      {(hasOpenCourse || matchedCourses.length === 0) && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setProgramModal(prog)}
                      className="w-full py-2.5 px-2 bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-xs rounded-xl border border-neutral-300 transition-all text-center flex items-center justify-center gap-1"
                    >
                      <span>{t('এক্সপ্লোর', 'Explore')}</span>
                      <ArrowRight className="w-3 h-3 text-neutral-500" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED COURSES CATALOGUE */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
              {t('কোর্স ক্যাটালগ', 'Academic Course Catalogue')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              {t('তোমার পছন্দের প্রোগ্রাম ও কোর্স নির্বাচন করো', 'Select Your Course & Batch')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {t('লাইভ ক্লাস, রেকর্ডেড লেকচার ও মক টেস্ট সিরিজ সহ সম্পূর্ণ পাঠক্রম', 'Complete Physics learning modules with live interactive & recorded archive')}
            </p>
          </div>

          {/* Program Filter Pills (No Board clutter!) */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedProgramId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedProgramId === 'all'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {t('সকল প্রোগ্রাম (All)', 'All Programs')}
            </button>
            {activePrograms.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProgramId(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedProgramId === p.id
                    ? 'bg-[#FF9933] text-black shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const parentProgram = programs.find(p => p.id === course.programId);
            const lessonCount =
              course.totalLessons ||
              (course.syllabus || []).reduce((acc, ch) => acc + (ch.lessons?.length || 0), 0);
            const isClosed = course.enrollmentOpen === false;
            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#FF9933]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.banner || course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#111111]/90 backdrop-blur-xs text-white text-[11px] font-black px-2.5 py-1 rounded-lg">
                      {parentProgram ? parentProgram.name : 'Physics Forward'}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#FF9933] text-black text-[11px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                      {course.duration}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500">
                      <span className="text-[#FF9933] uppercase">{course.subject || 'Physics'}</span>
                      <span>
                        {(course.syllabus || []).length} {t('অধ্যায়', 'Ch')} · {lessonCount} {t('লেকচার', 'Lessons')}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 line-clamp-2">
                      {course.titleBn || course.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {course.descriptionBn || course.description}
                    </p>
                    {course.facultyName && (
                      <p className="text-[11px] text-neutral-500 font-medium">
                        {t('শিক্ষক:', 'Faculty:')} <span className="text-neutral-800 font-semibold">{course.facultyName}</span>
                      </p>
                    )}

                    <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                      {course.featuresBn?.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-neutral-900">
                        {course.isFree || course.price === 0 ? t('বিনামূল্যে', 'FREE') : `₹${course.price}`}
                      </span>
                      {course.originalPrice > course.price && (
                        <span className="text-xs text-neutral-400 line-through">₹{course.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                      {t('সম্পূর্ণ সেশন ফি', 'Complete Session Fee')}
                    </span>
                  </div>

                  <button
                    onClick={() => !isClosed && onSelectCourse(course)}
                    disabled={isClosed}
                    className={`px-4 py-2 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs ${
                      isClosed
                        ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                        : 'bg-[#FF9933] text-black hover:bg-[#ffaa55]'
                    }`}
                  >
                    <span>{isClosed ? t('ভর্তি বন্ধ', 'Enrollment Closed') : t('এনরোল করো', 'Enroll Now')}</span>
                    {!isClosed && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHY CHOOSE PHYSICS FORWARD */}
      <section className="bg-neutral-100/70 py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
              {t('কেন ফিজিক্স ফরওয়ার্ড?', 'Why PHYSICS FORWARD?')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {t('বাংলা মাধ্যমের শিক্ষার্থীদের জন্য আদর্শ শিক্ষণ পদ্ধতি', 'Engineered for Bengali Medium Success')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              {t('মুখস্থ নয়, গভীরভাবে পদার্থবিজ্ঞানের নিয়ম ও যুক্তি অনুধাবন করো', 'Pure conceptual clarity instead of rote memorization')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF9933]">
                <Atom className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                {t('মাতৃভাষায় স্পষ্ট ধারণা', 'Native Bengali Explanations')}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t('জটিল সূত্র ও ফিজিক্সের নিয়মগুলোকে বাংলা উদাহরণ দিয়ে সহজভাবে বোঝানো হয় যাতে ভীতি দূর হয়।', 'Complex physical phenomena explained with relatable regional analogies to eliminate fear of science.')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                {t('ইন্টারঅ্যাক্টিভ লাইভ ও রেকর্ডেড', 'Live & Recorded Lectures')}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t('সরাসরি প্রশ্নোত্তরের লাইভ ক্লাস এবং পরবর্তীতে যতবার খুশি রিভিশনের জন্য আনলিমিটেড রেকর্ডিং ব্যাকআপ।', 'Live real-time query resolution and unlimited recorded review available 24x7.')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                {t('অনলাইন টাইমড মক টেস্ট', 'Online Timed Mock Tests')}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t('বোর্ড পরীক্ষার প্যাটার্নে পরীক্ষা, নেগেটিভ মার্কিং হিসাব এবং প্রতিটি প্রশ্নের বাংলা সমাধান ও ব্যাখ্যা।', 'Strict exam-condition tests with instant scoring, negative marks, and full Bengali explanations.')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                {t('ফর্মুলা ব্যাঙ্ক ও টুলস', 'Formula Bank & Calculators')}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t('অধ্যায়ভিত্তিক ফর্মুলা শিট, ফিজিক্স একক রূপান্তরকারী ও ক্যালকুলেটর সরাসরি অ্যাপে অন্তর্ভুক্ত।', 'Searchable formula library, unit converters, and educational calculators at your fingertips.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FACULTY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden border-4 border-[#FF9933]/20 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                  alt="Faculty Subrata Acharya"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mt-4">Subrata Acharya, M.Sc.</h3>
              <p className="text-xs font-semibold text-[#FF9933]">Lead Physics Educator & Founder</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">Contai, Purba Medinipur, West Bengal</p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
                {t('অভিজ্ঞ শিক্ষক দল', 'Expert Mentorship')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                {t('১৫+ বছরের শিক্ষকতার অভিজ্ঞতায় সমৃদ্ধ গাইডেন্স', '15+ Years of Dedicated Physics Mentorship')}
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {t(
                  '“পদার্থবিজ্ঞান কোনো মুখস্থ করার বিষয় নয়; এটি প্রকৃতির নিয়মকে বোঝার আনন্দ। কাঁথি ও মেদিনীপুরের শত শত শিক্ষার্থী বিগত বছরগুলোতে আমাদের ক্লাসের মাধ্যমে মাধ্যমিক ও উচ্চমাধ্যমিক পরীক্ষায় ৯৫%+ নম্বর অর্জন করেছে। প্রতিটি ছাত্রছাত্রীকে ব্যক্তিগত নজরদারিতে প্রস্তুত করাই আমাদের উদ্দেশ্য।”',
                  '“Physics is not meant to be memorized; it is the joy of discovering how nature operates. With systematic numerical practice and Bengali conceptual clarity, board excellence is naturally achieved.”'
                )}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs">
                  <p className="font-bold text-neutral-900">{t('অধ্যায়ভিত্তিক ডাউট সমাধান', 'Chapterwise Doubts')}</p>
                  <p className="text-neutral-500 text-[11px]">{t('হোয়াটসঅ্যাপ ও লাইভ ক্লাসে', 'Via WhatsApp & Live')}</p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs">
                  <p className="font-bold text-neutral-900">{t('গাণিতিক স্পেশাল ক্লাস', 'Numerical Masterclass')}</p>
                  <p className="text-neutral-500 text-[11px]">{t('শর্টকাট ও ট্রিকস সহ', 'With step shortcuts')}</p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs col-span-2 sm:col-span-1">
                  <p className="font-bold text-neutral-900">{t('বোর্ড কোয়ালিটি নোটস', 'Verified Notes')}</p>
                  <p className="text-neutral-500 text-[11px]">{t('বাংলা ভাষায় প্রিন্ট-রেডি', 'Bengali print ready')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
            {t('শিক্ষার্থী ও অভিভাবকদের মতামত', 'Student & Parent Testimonials')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {t('ফিজিক্স ফরওয়ার্ডের সাথে সাফল্যের গল্প', 'Real Stories of Progress')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {'★★★★★'}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed italic">
              {t(
                '“মাধ্যমিকের আগে চলতড়িৎ আর আলোর অঙ্ক নিয়ে খুব ভয় পেতাম। ফিজিক্স ফরওয়ার্ডের লাইভ ক্লাসে স্যার যেভাবে স্টেপ বাই স্টেপ সূত্র বুঝিয়ে দেন, তাতে আমার ভৌতবিজ্ঞানে ৯৪ নম্বর এসেছে।”',
                '“I used to struggle with electricity numericals. The live sessions simplified every equation, helping me score 94 in Madhyamik Physical Science.”'
              )}
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-neutral-900">Souvik Giri</p>
                <p className="text-neutral-400">Madhyamik Candidate (Purba Medinipur)</p>
              </div>
              <span className="text-emerald-700 font-bold">94/100</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {'★★★★★'}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed italic">
              {t(
                '“উচ্চমাধ্যমিকের ফিজিক্সে ক্যালকুলাস প্রয়োগ করে গতিসূত্র প্রতিষ্ঠা বুঝতে পারছিলাম না। এই প্ল্যাটফর্মের রেকর্ডেড ক্লাস বারবার দেখে আমার কনসেপ্ট একদম পরিষ্কার হয়ে গেছে।”',
                '“Calculus in Kinematics felt difficult initially. Re-watching the recorded classes gave me complete conceptual clarity.”'
              )}
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-neutral-900">Priyanka Maiti</p>
                <p className="text-neutral-400">Class 11 Science (Tamluk)</p>
              </div>
              <span className="text-emerald-700 font-bold">Top Ranker</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {'★★★★★'}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed italic">
              {t(
                '“অভিভাবক হিসেবে আমি খুব সন্তুষ্ট। নিয়মিত মক টেস্টের রেজাল্ট ও পারফরম্যান্স রিপোর্ট পাওয়া যায়। স্যারের সাথে সরাসরি ফোনে কথা বলা যায়।”',
                '“As a parent, I am deeply satisfied. Detailed mock test reports and direct teacher accessibility keep my son on track.”'
              )}
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-neutral-900">Debabrata Das (Guardian)</p>
                <p className="text-neutral-400">Contai Model School Parent</p>
              </div>
              <span className="text-emerald-700 font-bold">Verified Parent</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
            {t('সাধারণ জিজ্ঞাসা', 'Frequently Asked Questions')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {t('প্রয়োজনীয় তথ্যাবলী ও প্রশ্নোত্তর', 'Answers to Your Questions')}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-neutral-900"
              >
                <span>{t(item.qBn, item.qEn)}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-[#FF9933]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                  {t(item.aBn, item.aEn)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT & ADMISSION ENQUIRY SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Official Details */}
            <div className="lg:col-span-5 bg-neutral-900 text-white p-8 sm:p-10 space-y-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
                    PHYSICS FORWARD
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  {t('সরাসরি যোগাযোগ করুন', 'Contact Us Directly')}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {t(
                    'ভর্তি সংক্রান্ত কোনো প্রশ্ন বা তথ্য জানতে আমাদের সাথে যোগাযোগ করো। কাঁথি অফিসে এসে সরাসরি পরামর্শ নেওয়ার সুযোগ রয়েছে।',
                    'Reach out for admission guidance, syllabus counseling, or visit our Contai campus.'
                  )}
                </p>
              </div>

              {/* Official Contact Info */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF9933] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Contai, Purba Medinipur</p>
                    <p className="text-neutral-400">West Bengal, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#FF9933] shrink-0" />
                  <a href="tel:8972263462" className="hover:text-[#FF9933] font-bold text-white transition-colors">
                    8972263462
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#FF9933] shrink-0" />
                  <a
                    href="mailto:suman.acharya.980967@outlook.com"
                    className="hover:text-[#FF9933] text-neutral-300 break-all transition-colors"
                  >
                    suman.acharya.980967@outlook.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
                {t('অফিস সময়: সকাল ৯:০০ - রাত ৮:০০ (সোম - শনি)', 'Office Hours: 9:00 AM - 8:00 PM (Mon - Sat)')}
              </div>
            </div>

            {/* Right Contact / Enquiry Form */}
            <div className="lg:col-span-7 p-8 sm:p-10">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {t('ভর্তি ও কোর্সের তথ্য ফর্ম', 'Send Admission Enquiry')}
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                {t('ফর্ম পূরণ করো, আমাদের শিক্ষক বা প্রতিনিধি খুব শীঘ্রই যোগাযোগ করবেন।', 'Fill the form and our academic team will get in touch shortly.')}
              </p>

              {contactSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900">
                    {t('ধন্যবাদ! তোমার বার্তাটি গৃহীত হয়েছে।', 'Thank you! Your enquiry has been received.')}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {t('৮৯৭২২৬৩৪৬২ নম্বর থেকে আমাদের প্রতিনিধি তোমার সাথে শীঘ্রই যোগাযোগ করবেন।', 'Our representative will contact you on your phone shortly.')}
                  </p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="text-xs font-bold text-[#FF9933] underline"
                  >
                    {t('আরেকটি অনুসন্ধান জমা দিন', 'Submit another enquiry')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t('নাম *', 'Full Name *')}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        placeholder="Rahul Das"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t('ফোন নম্বর *', 'Phone Number *')}
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="8972263462"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t('ইমেল', 'Email (Optional)')}
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t('বিষয় / শ্রেণী', 'Subject / Class')}
                      </label>
                      <select
                        value={contactSubject}
                        onChange={e => setContactSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:border-[#FF9933]"
                      >
                        <option value="Class 10 Madhyamik Physics">Class 10 Madhyamik Physics</option>
                        <option value="Class 11 WBCHSE Physics">Class 11 WBCHSE Physics</option>
                        <option value="Class 12 HS Physics">Class 12 HS Physics</option>
                        <option value="WBJEE / NEET Foundation">WBJEE / NEET Foundation</option>
                        <option value="General Query">General Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {t('তোমার বার্তা বা জিজ্ঞাসা *', 'Your Message *')}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={e => setContactMessage(e.target.value)}
                      placeholder={t('ব্যাচ টাইমিং বা পরীক্ষার প্রস্তুতি সম্পর্কে জানতে চাই...', 'Tell us what you want to know about our batches...')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full py-3 bg-[#FF9933] text-black font-extrabold text-sm rounded-xl hover:bg-[#ffaa55] transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
                  >
                    {contactSubmitting ? t('পাঠানো হচ্ছে...', 'Sending...') : t('বার্তা জমা দিন', 'Submit Enquiry')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. OFFICIAL SOCIAL MEDIA & COMMUNITY SECTION */}
      <WebsiteSocialSection />

      {/* 9. DETAILED PROGRAM EXPLORER MODAL */}
      {programModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-neutral-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header Banner */}
            <div className="relative h-48 bg-neutral-900 shrink-0 overflow-hidden">
              <img
                src={programModal.bannerUrl || programModal.imageUrl || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80'}
                alt={programModal.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <button
                onClick={() => setProgramModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FF9933] text-black text-xs font-black uppercase">
                    {programModal.badge || programModal.name}
                  </span>
                  <span className="text-xs text-neutral-300 font-bold">
                    {programModal.duration || '12 Months'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {programModal.name}
                </h3>
                <p className="text-sm font-semibold text-neutral-300">
                  {programModal.nameBn}
                </p>
              </div>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  {t('প্রোগ্রামের বিবরণ', 'Program Overview')}
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {programModal.descriptionBn || programModal.description}
                </p>
              </div>

              {/* Academic Hierarchy Path */}
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#FF9933] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>{t('অ্যাকাডেমিক হায়ারার্কি ও পথচলা', 'Academic Hierarchy & Curriculum Flow')}</span>
                </div>
                <div className="font-mono text-xs font-bold text-neutral-800 bg-white p-3 rounded-xl border border-orange-200/60 leading-relaxed shadow-xs">
                  {programModal.flowPath || `${programModal.name} → Physics → Courses → Chapters → Lessons → Tests`}
                </div>
                <p className="text-[11px] text-neutral-500">
                  {t(
                    'প্রতিটি পাঠক্রম ধাপে ধাপে সুবিন্যস্ত—কনসেপ্ট থেকে শুরু করে অধ্যায়, টপিক, লাইভ লেকচার ও মূল্যায়ন টেস্ট পর্যন্ত।',
                    'Complete pedagogical path from foundational theory to chapter topics, live problem solving, and chapter assessments.'
                  )}
                </p>
              </div>

              {/* Eligibility */}
              {programModal.eligibility && (
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">
                    {t('যোগ্যতা ও উপযুক্ততা:', 'Eligibility:')}
                  </span>
                  <span className="font-bold text-neutral-900">
                    {programModal.eligibilityBn || programModal.eligibility}
                  </span>
                </div>
              )}

              {/* Available Courses & Syllabus Hierarchy inside this Program */}
              {(() => {
                const progCourses = getProgramCourses(programModal.id);
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        {t('এই প্রোগ্রামের উপলব্ধ কোর্স ও অধ্যায়সমূহ:', 'Available Courses & Chapters in this Program:')}
                      </h4>
                      <span className="text-[11px] font-bold text-[#FF9933]">
                        {progCourses.length} {t('কোর্স', 'Courses')}
                      </span>
                    </div>

                    {progCourses.length === 0 ? (
                      <div className="p-4 rounded-2xl bg-neutral-50 border border-dashed border-neutral-300 text-xs text-neutral-500 text-center">
                        {t('এই প্রোগ্রামের কোর্স ও সিলেবাস শীঘ্রই প্রকাশ করা হবে।', 'Courses & syllabus for this program will be published shortly.')}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {progCourses.map(c => {
                          const isClosed = c.enrollmentOpen === false;
                          return (
                            <div key={c.id} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-2.5">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <span className="text-[10px] font-bold uppercase text-[#FF9933]">
                                    {c.subject || 'Physics'} • {c.duration}
                                  </span>
                                  <h5 className="text-sm font-bold text-neutral-900">
                                    {c.titleBn || c.title}
                                  </h5>
                                  {c.facultyName && (
                                    <p className="text-[11px] text-neutral-500">
                                      {t('শিক্ষক:', 'Faculty:')} {c.facultyName}
                                    </p>
                                  )}
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm font-black text-neutral-900">
                                    {c.isFree || c.price === 0 ? t('বিনামূল্যে', 'FREE') : `₹${c.price}`}
                                  </p>
                                  <button
                                    disabled={isClosed}
                                    onClick={() => {
                                      setProgramModal(null);
                                      onSelectCourse(c);
                                    }}
                                    className={`mt-1 px-3 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                                      isClosed
                                        ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                                        : 'bg-[#FF9933] hover:bg-[#ffaa55] text-black'
                                    }`}
                                  >
                                    {isClosed ? t('ভর্তি বন্ধ', 'Closed') : t('এনরোল', 'Enroll')}
                                  </button>
                                </div>
                              </div>

                              {(c.syllabus || []).length > 0 && (
                                <div className="pt-2 border-t border-neutral-200/70 space-y-1.5">
                                  <p className="text-[10px] font-bold uppercase text-neutral-400">
                                    {t('পাঠ্যসূচী অধ্যায়সমূহ:', 'Chapters & Lessons:')}
                                  </p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {c.syllabus.map((ch, idx) => (
                                      <div key={ch.id} className="bg-white p-2 rounded-xl border border-neutral-200/80 text-[11px]">
                                        <span className="font-bold text-neutral-800 block truncate">
                                          {idx + 1}. {ch.titleBn || ch.title}
                                        </span>
                                        <span className="text-[10px] text-neutral-500">
                                          {(ch.lessons || []).length} {t('লেকচার', 'Lessons')}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Inclusions checklist */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  {t('প্রোগ্রামে যা যা অন্তর্ভুক্ত রয়েছে:', 'What is Included in this Program:')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(programModal.includedItemsBn && programModal.includedItemsBn.length > 0
                    ? programModal.includedItemsBn
                    : programModal.features || programModal.includedItems || []
                  ).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-neutral-500 block">
                  {t('প্রোগ্রাম ফি', 'Program Fee')}
                </span>
                <span className="text-2xl font-black text-neutral-900">
                  ₹{programModal.basePrice}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const progId = programModal.id;
                    setProgramModal(null);
                    setSelectedProgramId(progId);
                    const el = document.getElementById('courses');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-xs rounded-xl border border-neutral-300 transition-all"
                >
                  {t('সিলেবাস ও কোর্স দেখুন', 'View Courses')}
                </button>
                {(() => {
                  const openCourse = getProgramCourses(programModal.id).find(c => c.enrollmentOpen !== false);
                  return openCourse ? (
                    <button
                      onClick={() => {
                        setProgramModal(null);
                        onSelectCourse(openCourse);
                      }}
                      className="px-5 py-2.5 bg-[#FF9933] hover:bg-[#ffaa55] text-black font-black text-xs rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5"
                    >
                      <span>{t('এনরোল করো', 'Enroll Now')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : null;
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
