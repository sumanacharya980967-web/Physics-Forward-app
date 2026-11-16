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
  PaymentOrder,
  Announcement,
  ContactEnquiry,
  Coupon
} from '../../types';
import { api } from '../../services/api';
import { BrandIdentityTab } from './BrandIdentityTab';
import { ProgramsTab } from './ProgramsTab';
import { AcademicStructureTab } from './AcademicStructureTab';
import { CoursesTab } from './CoursesTab';
import { BatchesTab } from './BatchesTab';
import { LiveClassesTab } from './LiveClassesTab';
import { StudyMaterialsTab } from './StudyMaterialsTab';
import { ExamsTab } from './ExamsTab';
import { StudentsTab } from './StudentsTab';
import { TeachersTab } from './TeachersTab';
import { WebsiteCmsTab } from './WebsiteCmsTab';
import { MobileCmsTab } from './MobileCmsTab';
import { SocialSettingsTab } from './SocialSettingsTab';
import {
  Users,
  BookOpen,
  Calendar,
  Video,
  Play,
  FileText,
  Award,
  Bell,
  CreditCard,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  Tag,
  MessageSquare,
  Sparkles,
  DollarSign,
  Palette,
  Layers,
  FolderTree,
  Radio,
  Globe,
  Smartphone,
  Share2,
  GraduationCap
} from 'lucide-react';

interface AdminPanelProps {
  programs: Program[];
  courses: Course[];
  batches: Batch[];
  liveClasses: LiveClass[];
  recordedClasses: RecordedClass[];
  studyMaterials: StudyMaterial[];
  exams: Exam[];
  orders: PaymentOrder[];
  announcements: Announcement[];
  enquiries: ContactEnquiry[];
  coupons: Coupon[];
  onRefreshData?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  programs = [],
  courses = [],
  batches = [],
  liveClasses = [],
  recordedClasses = [],
  studyMaterials = [],
  exams = [],
  orders = [],
  announcements = [],
  enquiries = [],
  coupons = [],
  onRefreshData
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'brand_identity'
    | 'programs'
    | 'academic_structure'
    | 'courses'
    | 'batches'
    | 'live_classes'
    | 'study_materials'
    | 'exams'
    | 'students'
    | 'teachers'
    | 'website_cms'
    | 'mobile_cms'
    | 'social_settings'
    | 'announcements'
    | 'enquiries'
    | 'coupons'
  >('overview');

  // Announcement Form State
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3500);
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;
    try {
      await api.createAnnouncement({
        title: newNoticeTitle,
        titleBn: newNoticeTitle,
        message: newNoticeContent,
        messageBn: newNoticeContent,
        type: 'announcement',
        target: 'all'
      });
      setNewNoticeTitle('');
      setNewNoticeContent('');
      onRefreshData?.();
      showToast(t('নোটিশ সফলভাবে প্রচার করা হয়েছে!', 'Notice broadcasted successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.amount, 0);

  const tabsConfig = [
    { id: 'overview', labelBn: 'ড্যাশবোর্ড ওভারভিউ', labelEn: 'Overview', icon: Sparkles, sectionNumber: '00' },
    { id: 'brand_identity', labelBn: '১. ব্র্যান্ড ও প্ল্যাটফর্ম', labelEn: '1. Brand & Identity', icon: Palette, sectionNumber: '01' },
    { id: 'programs', labelBn: '২. একাডেমিক প্রোগ্রাম', labelEn: '2. Programs', icon: Layers, sectionNumber: '02' },
    { id: 'academic_structure', labelBn: '৩. অ্যাকাডেমিক স্ট্রাকচার', labelEn: '3. Academic Structure', icon: FolderTree, sectionNumber: '03' },
    { id: 'courses', labelBn: '৪. কোর্স ও সিলেবাস', labelEn: '4. Courses & Syllabus', icon: BookOpen, sectionNumber: '04' },
    { id: 'batches', labelBn: '৫. ব্যাচসমূহ', labelEn: '5. Batches', icon: Calendar, sectionNumber: '05' },
    { id: 'live_classes', labelBn: '৬. লাইভ ও রেকর্ডেড ক্লাস', labelEn: '6. Live & Recordings', icon: Video, sectionNumber: '06' },
    { id: 'study_materials', labelBn: '৭. স্টাডি মেটেরিয়াল', labelEn: '7. Study Materials', icon: FileText, sectionNumber: '07' },
    { id: 'exams', labelBn: '৮. পরীক্ষা ও প্রশ্ন ব্যাংক', labelEn: '8. Exams & Question Bank', icon: Award, sectionNumber: '08' },
    { id: 'students', labelBn: '৯. শিক্ষার্থী পরিষদ', labelEn: '9. Students', icon: Users, sectionNumber: '09' },
    { id: 'teachers', labelBn: '১০. শিক্ষক পরিষদ', labelEn: '10. Teachers', icon: GraduationCap, sectionNumber: '10' },
    { id: 'website_cms', labelBn: '১১. ওয়েবসাইট CMS', labelEn: '11. Website CMS', icon: Globe, sectionNumber: '11' },
    { id: 'mobile_cms', labelBn: '১২. মোবাইল অ্যাপ কন্টেন্ট', labelEn: '12. Mobile CMS', icon: Smartphone, sectionNumber: '12' },
    { id: 'social_settings', labelBn: '১৩. সোশ্যাল ও কমিউনিটি', labelEn: '13. Social Media', icon: Share2, sectionNumber: '13' },
    { id: 'announcements', labelBn: 'বিজ্ঞপ্তি প্রচার', labelEn: 'Announcements', icon: Bell, sectionNumber: '+' },
    { id: 'enquiries', labelBn: 'ভর্তি জিজ্ঞাসা (CRM)', labelEn: 'Enquiries', icon: MessageSquare, sectionNumber: '+' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Admin Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933]">
              {user?.role === 'super_admin' ? 'Super Administrator Console' : 'Faculty / Teacher Control Hub'}
            </span>
            <span className="text-[10px] text-neutral-400">· 13 Official CMS Modules Active</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            {t('ফিজিক্স ফরওয়ার্ড সেন্ট্রাল অ্যাডমিন কন্ট্রোল সেন্টার', 'PHYSICS FORWARD Central Platform CMS')}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {t(`লগইন আছেন: ${user?.name} (${user?.email}) · সেন্ট্রাল রেস্ট এপিআই সিঙ্ক`, `Logged in as: ${user?.name} (${user?.email}) · Mutual Central API Sync`)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('live_classes')}
            className="px-4 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Radio className="w-3.5 h-3.5 text-black" />
            <span>{t('লাইভ সেশন রুম', 'Live Room Hub')}</span>
          </button>
        </div>
      </div>

      {/* Admin 13-Module Comprehensive CMS Navigation Tabs */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-neutral-200 pb-3 text-xs font-bold scrollbar-thin">
        {tabsConfig.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#FF9933] text-black font-black shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200/70'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t(tab.labelBn, tab.labelEn)}</span>
            </button>
          );
        })}
      </div>

      {/* 0. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="text-xs font-bold">{t('মোট শিক্ষার্থী', 'Total Students')}</span>
                <Users className="w-4 h-4 text-[#FF9933]" />
              </div>
              <p className="text-2xl font-black text-neutral-900">১,৫৪০ জন</p>
              <span className="text-[10px] text-emerald-600 font-bold">+১৮% এই মাসে</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="text-xs font-bold">{t('সক্রিয় ব্যাচ', 'Active Batches')}</span>
                <BookOpen className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-black text-neutral-900">{batches.length} টি</p>
              <span className="text-[10px] text-neutral-400">Class 9, 10, 11, 12</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="text-xs font-bold">{t('মোট সংগ্রহ (Revenue)', 'Total Revenue')}</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-700">₹{totalRevenue.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-600 font-bold">সকল কোর্স একত্রিত</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="text-xs font-bold">{t('নতুন ভর্তি জিজ্ঞাসা', 'Admission Leads')}</span>
                <MessageSquare className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-black text-neutral-900">{enquiries.length} টি</p>
              <span className="text-[10px] text-amber-600 font-bold">কল করা আবশ্যক</span>
            </div>
          </div>

          {/* Quick Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-neutral-900 flex items-center justify-between">
                <span>{t('সাম্প্রতিক এনরোলমেন্ট ও পেমেন্ট', 'Recent Course Enrollments')}</span>
                <span className="text-xs text-[#FF9933] font-normal">{orders.length} orders</span>
              </h4>
              <div className="divide-y divide-neutral-100">
                {orders.slice(0, 4).map(ord => (
                  <div key={ord.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-neutral-900">{ord.studentName}</p>
                      <p className="text-neutral-500 text-[11px]">{ord.courseTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-neutral-900">₹{ord.amount}</p>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase">{ord.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Admission Enquiries */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-neutral-900 flex items-center justify-between">
                <span>{t('ওয়েবসাইট থেকে আসা ভর্তি জিজ্ঞাসা', 'Contact Form Enquiries')}</span>
                <span className="text-xs text-neutral-500 font-normal">{enquiries.length} leads</span>
              </h4>
              <div className="divide-y divide-neutral-100">
                {enquiries.slice(0, 4).map(enq => (
                  <div key={enq.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-neutral-900">{enq.name}</p>
                      <p className="text-neutral-500 text-[11px]">{enq.subject} • {enq.phone}</p>
                    </div>
                    <a
                      href={`tel:${enq.phone}`}
                      className="px-2.5 py-1 rounded-lg bg-orange-50 text-[#FF9933] font-bold text-[11px] hover:bg-orange-100"
                    >
                      Call Lead
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. BRAND & IDENTITY TAB */}
      {activeTab === 'brand_identity' && <BrandIdentityTab />}

      {/* 2. PROGRAMS TAB */}
      {activeTab === 'programs' && (
        <ProgramsTab programs={programs} onRefreshData={onRefreshData} />
      )}

      {/* 3. ACADEMIC STRUCTURE TAB */}
      {activeTab === 'academic_structure' && <AcademicStructureTab />}

      {/* 4. COURSES TAB */}
      {activeTab === 'courses' && (
        <CoursesTab courses={courses} programs={programs} onRefreshData={onRefreshData} />
      )}

      {/* 5. BATCHES TAB */}
      {activeTab === 'batches' && (
        <BatchesTab batches={batches} courses={courses} programs={programs} onRefreshData={onRefreshData} />
      )}

      {/* 6. LIVE & RECORDED CLASSES TAB */}
      {activeTab === 'live_classes' && (
        <LiveClassesTab
          liveClasses={liveClasses}
          recordedClasses={recordedClasses}
          batches={batches}
          courses={courses}
          onRefreshData={onRefreshData}
        />
      )}

      {/* 7. STUDY MATERIALS TAB */}
      {activeTab === 'study_materials' && (
        <StudyMaterialsTab studyMaterials={studyMaterials} onRefreshData={onRefreshData} />
      )}

      {/* 8. EXAMS TAB */}
      {activeTab === 'exams' && (
        <ExamsTab exams={exams} programs={programs} courses={courses} onRefreshData={onRefreshData} />
      )}

      {/* 9. STUDENTS TAB */}
      {activeTab === 'students' && (
        <StudentsTab courses={courses} programs={programs} batches={batches} onRefreshData={onRefreshData} />
      )}

      {/* 10. TEACHERS TAB */}
      {activeTab === 'teachers' && (
        <TeachersTab courses={courses} batches={batches} programs={programs} onRefreshData={onRefreshData} />
      )}

      {/* 11. WEBSITE CMS TAB */}
      {activeTab === 'website_cms' && <WebsiteCmsTab />}

      {/* 12. MOBILE CMS TAB */}
      {activeTab === 'mobile_cms' && (
        <MobileCmsTab courses={courses} programs={programs} />
      )}

      {/* 13. SOCIAL SETTINGS TAB */}
      {activeTab === 'social_settings' && <SocialSettingsTab />}

      {/* ANNOUNCEMENTS TAB */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900">
              {t('নতুন নোটিশ প্রচার করুন (Broadcast Announcement)', 'Broadcast New Announcement')}
            </h3>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বিজ্ঞপ্তির শিরোনাম *', 'Title *')}
                </label>
                <input
                  type="text"
                  required
                  value={newNoticeTitle}
                  onChange={e => setNewNoticeTitle(e.target.value)}
                  placeholder="e.g. আগামীকাল সকাল ১০টায় অতিরিক্ত ডাউট ক্লাস অনুষ্ঠিত হবে"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বিজ্ঞপ্তির বিস্তারিত বিবরণ *', 'Notice Content *')}
                </label>
                <textarea
                  required
                  rows={3}
                  value={newNoticeContent}
                  onChange={e => setNewNoticeContent(e.target.value)}
                  placeholder="সকল শিক্ষার্থীকে নির্দিষ্ট সময়ে গুগল মিট রুমে উপস্থিত থাকার নির্দেশ দেওয়া হচ্ছে..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-sm"
              >
                {t('নোটিশ প্রকাশ করুন', 'Publish Announcement')}
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-neutral-900">{t('বর্তমান নোটিশসমূহ', 'Active Notices')}</h4>
            {announcements.map(a => (
              <div key={a.id} className="bg-white p-4 rounded-xl border border-neutral-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">{a.titleBn || a.title}</span>
                  <span className="text-[10px] text-neutral-400">{a.createdAt.split('T')[0]}</span>
                </div>
                <p className="text-neutral-600">{a.messageBn || a.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ENQUIRIES CRM TAB */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs space-y-2">
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900">
              {t('ভর্তি সংক্রান্ত অনুসন্ধানসমূহ (Student Admission Leads)', 'Admission Leads CRM')}
            </h3>
            <span className="text-xs text-neutral-400">{enquiries.length} total entries</span>
          </div>

          <div className="divide-y divide-neutral-100">
            {enquiries.map(enq => (
              <div key={enq.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900">{enq.name}</span>
                    <span className="text-neutral-500 font-mono">({enq.phone})</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-neutral-700 font-semibold">{enq.subject}</p>
                  <p className="text-neutral-500">{enq.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${enq.phone}`}
                    className="px-3 py-1.5 rounded-xl bg-[#FF9933] text-black font-bold hover:bg-[#ffaa55]"
                  >
                    Call Now
                  </a>
                  <button
                    onClick={() => showToast(`Marked ${enq.name} as contacted.`)}
                    className="px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50"
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Admin Toast Feedback */}
      {adminToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
          <span>{adminToast}</span>
        </div>
      )}
    </div>
  );
};
