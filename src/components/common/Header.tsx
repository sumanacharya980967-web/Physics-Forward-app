import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Atom,
  Globe,
  ShieldCheck,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Menu,
  X,
  Smartphone,
  Zap,
  Phone,
  Mail,
  Video,
  Radio,
  FileText,
  HelpCircle,
  Clock
} from 'lucide-react';
import { UserRole } from '../../types';

export type AppView = 'website' | 'student_dashboard' | 'mobile_app' | 'teacher_panel' | 'admin_panel' | 'physics_tools';

interface HeaderProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  onOpenAuthModal: () => void;
  onOpenNotifications?: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onViewChange,
  onOpenAuthModal,
  unreadCount = 2
}) => {
  const { user, isAuthenticated, role, logout, switchRole } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);

  const roleLabels: Record<UserRole, { en: string; bn: string; color: string }> = {
    student: { en: 'Student', bn: 'শিক্ষার্থী', color: 'bg-emerald-100 text-emerald-800' },
    teacher: { en: 'Faculty/Teacher', bn: 'শিক্ষক', color: 'bg-blue-100 text-blue-800' },
    super_admin: { en: 'Super Admin', bn: 'সুপার অ্যাডমিন', color: 'bg-amber-100 text-amber-800' },
    admin: { en: 'Admin', bn: 'অ্যাডমিন', color: 'bg-amber-100 text-amber-800' },
    finance_admin: { en: 'Finance Admin', bn: 'অর্থ প্রশাসক', color: 'bg-purple-100 text-purple-800' }
  };

  const notifications = [
    {
      id: '1',
      titleBn: 'চলতড়িৎ লাইভ ক্লাস আজ সন্ধ্যা ৭:০০ টায়',
      titleEn: 'Live Class on Current Electricity tonight at 7:00 PM',
      timeBn: '১০ মিনিট আগে',
      timeEn: '10 mins ago',
      urgent: true
    },
    {
      id: '2',
      titleBn: 'নতুন অধ্যায়ভিত্তিক মক টেস্ট প্রকাশিত হয়েছে',
      titleEn: 'New Chapterwise Mock Test published: Optics',
      timeBn: '২ ঘণ্টা আগে',
      timeEn: '2 hrs ago',
      urgent: false
    }
  ];

  const handleNavClick = (view: AppView) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* 1. TOP ANNOUNCEMENT & HELPLINE BAR */}
      <div className="bg-[#111111] text-white py-1.5 px-3 sm:px-6 text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <span className="bg-[#FF9933] text-black font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shrink-0">
              {t('বিজ্ঞপ্তি', 'Notice')}
            </span>
            <p className="truncate text-neutral-200 text-[11px] sm:text-xs">
              {t(
                'পশ্চিমবঙ্গ মধ্যশিক্ষা ও উচ্চমাধ্যমিকের পদার্থবিজ্ঞান লাইভ ব্যাচ ২০২৬ শুরু হয়েছে!',
                'West Bengal Board & HS Physics Live Batches 2026 are now active!'
              )}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] sm:text-xs">
            <a
              href="tel:8972263462"
              className="text-[#FF9933] font-bold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>8972263462</span>
            </a>
            <span className="hidden md:inline text-neutral-600">|</span>
            <a
              href="mailto:suman.acharya.980967@outlook.com"
              className="hidden md:inline text-neutral-300 hover:text-[#FF9933] transition-colors"
            >
              suman.acharya.980967@outlook.com
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
          onClick={() => handleNavClick('website')}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#FF9933] to-[#ffaa55] flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 animate-[spin_12s_linear_infinite]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-base sm:text-lg lg:text-xl tracking-tight text-[#111111] whitespace-nowrap">
                PHYSICS <span className="text-[#FF9933]">FORWARD</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium text-neutral-500 hidden sm:block whitespace-nowrap">
              {t('পদার্থবিজ্ঞান বোঝো, এগিয়ে চলো।', 'Understand Physics. Move Forward.')}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links (Large & Medium Screens) */}
        <nav className="hidden lg:flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs font-semibold">
          <button
            onClick={() => handleNavClick('website')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'website'
                ? 'bg-white text-black shadow-xs font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{t('ওয়েবসাইট', 'Home')}</span>
          </button>

          <button
            onClick={() => handleNavClick('student_dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'student_dashboard'
                ? 'bg-white text-black shadow-xs font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{t('স্টুডেন্ট পোর্টাল', 'Student Portal')}</span>
          </button>

          <button
            onClick={() => handleNavClick('physics_tools')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'physics_tools'
                ? 'bg-white text-black shadow-xs font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{t('ফিজিক্স টুলস', 'Formula Tools')}</span>
          </button>

          <button
            onClick={() => handleNavClick('mobile_app')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'mobile_app'
                ? 'bg-white text-black shadow-xs font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{t('স্টুডেন্ট অ্যাপ', 'Student App')}</span>
          </button>

          <button
            onClick={() => {
              if (role === 'student') switchRole('teacher');
              handleNavClick('teacher_panel');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'teacher_panel'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-blue-300" />
            <span>{t('শিক্ষক প্যানেল', 'Teacher Panel')}</span>
          </button>

          <button
            onClick={() => {
              if (role === 'student') switchRole('super_admin');
              handleNavClick('admin_panel');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'admin_panel'
                ? 'bg-[#111111] text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{t('অ্যাডমিন', 'Admin')}</span>
          </button>
        </nav>

        {/* Right Tools: Language, Role Switcher, Notifications, Profile / Login */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Toggle */}
          <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200 text-xs font-semibold">
            <button
              onClick={() => setLanguage('bn')}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-all ${
                language === 'bn' ? 'bg-[#FF9933] text-black font-bold shadow-xs' : 'text-neutral-600 hover:text-black'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-all ${
                language === 'en' ? 'bg-[#FF9933] text-black font-bold shadow-xs' : 'text-neutral-600 hover:text-black'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Role Preview Switcher Badge (Desktop & Tablet) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors"
              title="Switch user role for testing"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  role === 'super_admin' ? 'bg-amber-500' : role === 'teacher' ? 'bg-blue-500' : 'bg-emerald-500'
                }`}
              ></span>
              <span className="hidden xl:inline text-neutral-500">{t('রোল:', 'Role:')}</span>
              <span className="font-bold text-neutral-800 capitalize text-xs">
                {t(roleLabels[role].bn, roleLabels[role].en)}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1.5 border-b border-neutral-100 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {t('টেস্টিং রোল নির্বাচন করুন', 'Switch Persona for Testing')}
                </div>
                <button
                  onClick={() => {
                    switchRole('student');
                    onViewChange('student_dashboard');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 ${
                    role === 'student' ? 'font-bold text-[#FF9933]' : 'text-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-semibold">Rahul Das</p>
                      <p className="text-[10px] text-neutral-400">Class 10 (Student Portal)</p>
                    </div>
                  </div>
                  {role === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933]" />}
                </button>

                <button
                  onClick={() => {
                    switchRole('teacher');
                    onViewChange('teacher_panel');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 ${
                    role === 'teacher' ? 'font-bold text-blue-600' : 'text-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-semibold">Subrata Acharya</p>
                      <p className="text-[10px] text-neutral-400">Physics Faculty (Teacher Panel)</p>
                    </div>
                  </div>
                  {role === 'teacher' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </button>

                <button
                  onClick={() => {
                    switchRole('super_admin');
                    onViewChange('admin_panel');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 ${
                    role === 'super_admin' ? 'font-bold text-amber-600' : 'text-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="font-semibold">Suman Acharya</p>
                      <p className="text-[10px] text-neutral-400">Super Admin (Founder)</p>
                    </div>
                  </div>
                  {role === 'super_admin' && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933]" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Button & Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationPopover(!showNotificationPopover)}
              className="relative p-2 rounded-lg text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF9933] rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotificationPopover && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 py-3 z-50 animate-in fade-in">
                <div className="px-4 pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-neutral-900">
                    {t('নোটিফিকেশন ও আপডেট', 'Notifications')}
                  </span>
                  <span className="text-[10px] bg-orange-100 text-[#FF9933] font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} {t('নতুন', 'New')}
                  </span>
                </div>
                <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className="p-3 hover:bg-neutral-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setShowNotificationPopover(false);
                        handleNavClick('student_dashboard');
                      }}
                    >
                      <p className="text-xs font-semibold text-neutral-800 leading-snug">
                        {t(n.titleBn, n.titleEn)}
                      </p>
                      <span className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF9933]" />
                        {t(n.timeBn, n.timeEn)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="px-3 pt-2 border-t border-neutral-100 text-center">
                  <button
                    onClick={() => {
                      setShowNotificationPopover(false);
                      handleNavClick('student_dashboard');
                    }}
                    className="text-[11px] font-bold text-[#FF9933] hover:underline"
                  >
                    {t('সকল নোটিশ ড্যাশবোর্ডে দেখুন', 'View All in Dashboard')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile or Login Button (Desktop / Tablet) */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-xl hover:bg-neutral-100 border border-neutral-200 transition-all"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-neutral-800 hidden md:inline max-w-[90px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400 hidden sm:block" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900">{user.name}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                    <span
                      className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-semibold ${
                        roleLabels[user.role].color
                      }`}
                    >
                      {t(roleLabels[user.role].bn, roleLabels[user.role].en)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      handleNavClick('student_dashboard');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 font-medium"
                  >
                    <GraduationCap className="w-4 h-4 text-[#FF9933]" />
                    {t('স্টুডেন্ট ড্যাশবোর্ড', 'Student Dashboard')}
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('admin_panel');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
                    {t('অ্যাডমিন কনসোল', 'Admin Console')}
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('physics_tools');
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-neutral-500" />
                    {t('ফিজিক্স টুলস ও ফর্মুলা', 'Formula Tools')}
                  </button>

                  <div className="border-t border-neutral-100 my-1"></div>

                  <button
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('লগ আউট', 'Sign Out')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="hidden sm:inline-flex items-center px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#FF9933] text-black font-bold text-xs hover:bg-[#ffaa55] transition-all shadow-xs"
            >
              {t('লগইন / রেজিস্টার', 'Login / Register')}
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-OUT / COLLAPSIBLE DRAWER (Phone Screens < 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* User Profile Card or Login CTA */}
            {isAuthenticated && user ? (
              <div className="p-3 bg-neutral-900 text-white rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-[#FF9933] text-black font-black flex items-center justify-center shrink-0 text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-xs truncate">{user.name}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{user.email}</p>
                    <span className="inline-block text-[9px] font-semibold text-emerald-400 mt-0.5">
                      {t(roleLabels[user.role].bn, roleLabels[user.role].en)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#FF9933] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <UserIcon className="w-4 h-4" />
                <span>{t('স্টুডেন্ট লগইন / নতুন রেজিস্ট্রেশন', 'Student Login / Register')}</span>
              </button>
            )}

            {/* Core Navigation Links */}
            <div className="space-y-1 text-xs font-bold">
              <button
                onClick={() => handleNavClick('website')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeView === 'website'
                    ? 'bg-[#FF9933] text-black font-extrabold shadow-xs'
                    : 'text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#FF9933]" />
                  <span>{t('ওয়েবসাইট হোম (Home & Courses)', 'Website Home')}</span>
                </div>
                <span className="text-[10px] text-neutral-400">Main Portal</span>
              </button>

              <button
                onClick={() => handleNavClick('student_dashboard')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeView === 'student_dashboard'
                    ? 'bg-[#FF9933] text-black font-extrabold shadow-xs'
                    : 'text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>{t('আমার স্টুডেন্ট ড্যাশবোর্ড', 'Student Dashboard')}</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Learning
                </span>
              </button>

              <button
                onClick={() => handleNavClick('physics_tools')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeView === 'physics_tools'
                    ? 'bg-[#FF9933] text-black font-extrabold shadow-xs'
                    : 'text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#FF9933]" />
                  <span>{t('ফিজিক্স টুলস ও ফর্মুলা ব্যাঙ্ক', 'Physics Tools & Formulas')}</span>
                </div>
                <span className="text-[10px] text-neutral-400">Calculators</span>
              </button>

              <button
                onClick={() => handleNavClick('mobile_app')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeView === 'mobile_app'
                    ? 'bg-[#FF9933] text-black font-extrabold shadow-xs'
                    : 'text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>{t('মোবাইল অ্যাপ ভিউ (Mobile App Simulator)', 'Mobile App Simulation')}</span>
                </div>
                <span className="text-[10px] text-neutral-400">iOS / Android</span>
              </button>

              <button
                onClick={() => handleNavClick('admin_panel')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeView === 'admin_panel'
                    ? 'bg-[#111111] text-white font-extrabold shadow-xs'
                    : 'text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
                  <span>{t('অ্যাডমিন কন্ট্রোল পোর্টাল', 'Admin Control Panel')}</span>
                </div>
                <span className="text-[10px] bg-neutral-200 px-2 py-0.5 rounded text-neutral-700">Admin</span>
              </button>
            </div>

            {/* Role Switcher Pills for Mobile Testing */}
            <div className="pt-2 border-t border-neutral-100 space-y-2">
              <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                {t('রোল নির্বাচন (Testing Persona):', 'Switch Testing Persona:')}
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <button
                  onClick={() => {
                    switchRole('student');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-bold ${
                    role === 'student'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                      : 'border-neutral-200 text-neutral-600'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => {
                    switchRole('teacher');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-bold ${
                    role === 'teacher'
                      ? 'bg-blue-50 border-blue-400 text-blue-800'
                      : 'border-neutral-200 text-neutral-600'
                  }`}
                >
                  Faculty
                </button>
                <button
                  onClick={() => {
                    switchRole('super_admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-bold ${
                    role === 'super_admin'
                      ? 'bg-amber-50 border-amber-400 text-amber-800'
                      : 'border-neutral-200 text-neutral-600'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Direct Helpline Contact Callout */}
            <div className="p-3.5 bg-orange-50/80 border border-orange-200 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-neutral-900">{t('সরাসরি হেল্পলাইন:', 'Helpline Assistance:')}</p>
                <p className="text-neutral-600 text-[11px]">Contai, Purba Medinipur</p>
              </div>
              <a
                href="tel:8972263462"
                className="px-3 py-1.5 bg-[#FF9933] text-black font-extrabold rounded-lg hover:bg-[#ffaa55] transition-all text-xs"
              >
                8972263462
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. MOBILE STICKY BOTTOM QUICK BAR (< md screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-2 py-1 flex items-center justify-around shadow-lg">
        <button
          onClick={() => handleNavClick('website')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeView === 'website' ? 'text-[#FF9933] font-bold' : 'text-neutral-500'
          }`}
        >
          <Globe className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('হোম', 'Home')}</span>
        </button>

        <a
          href="#courses"
          onClick={() => {
            if (activeView !== 'website') {
              handleNavClick('website');
            }
          }}
          className="flex flex-col items-center justify-center py-1 px-3 text-neutral-500 hover:text-black transition-all"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('কোর্স', 'Courses')}</span>
        </a>

        <button
          onClick={() => handleNavClick('student_dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeView === 'student_dashboard' ? 'text-[#FF9933] font-bold' : 'text-neutral-500'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('ড্যাশবোর্ড', 'Dashboard')}</span>
        </button>

        <button
          onClick={() => handleNavClick('physics_tools')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeView === 'physics_tools' ? 'text-[#FF9933] font-bold' : 'text-neutral-500'
          }`}
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('টুলস', 'Tools')}</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            mobileMenuOpen ? 'text-[#FF9933] font-bold' : 'text-neutral-500'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t('মেনু', 'Menu')}</span>
        </button>
      </div>
    </header>
  );
};
