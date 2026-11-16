import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Lock, Mail, Phone, User as UserIcon, Building, MapPin, Calendar, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'student',
  initialMode = 'login'
}) => {
  const { login, register, switchRole } = useAuth();
  const { t } = useLanguage();
  const [tab, setTab] = useState<'login' | 'register'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sync tab when initialMode or isOpen changes
  React.useEffect(() => {
    if (isOpen) {
      setTab(initialMode);
      setError('');
    }
  }, [isOpen, initialMode]);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('rahul.das@physicsforward.in');
  const [loginPassword, setLoginPassword] = useState('physics123');

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regBoard, setRegBoard] = useState('board-wbbse');
  const [regClass, setRegClass] = useState('class-10');
  const [regMedium, setRegMedium] = useState('med-bn');
  const [regSchool, setRegSchool] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regDob, setRegDob] = useState('');
  const [regPassword, setRegPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await login(loginIdentifier);
      if (ok) {
        onClose();
      } else {
        setError(t('লগইন ব্যর্থ হয়েছে। ফোন নম্বর বা ইমেল চেক করুন।', 'Login failed. Please check credentials.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regName || !regPhone) {
      setError(t('নাম এবং ফোন নম্বর প্রদান করা আবশ্যক।', 'Name and Phone number are required.'));
      return;
    }
    setLoading(true);
    try {
      const ok = await register({
        name: regName,
        phone: regPhone,
        email: regEmail,
        boardId: regBoard,
        classId: regClass,
        mediumId: regMedium,
        school: regSchool,
        city: regCity,
        dob: regDob
      });
      if (ok) {
        onClose();
      } else {
        setError(t('রেজিস্ট্রেশন সম্পূর্ণ করা সম্ভব হয়নি।', 'Registration failed. Try again.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-neutral-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933]">PHYSICS FORWARD</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            {tab === 'login' ? t('স্টুডেন্ট / অ্যাডমিন লগইন', 'Student & Portal Login') : t('নতুন শিক্ষার্থী রেজিস্ট্রেশন', 'New Student Registration')}
          </h2>
          <p className="text-neutral-400 text-xs mt-0.5">
            {t('পদার্থবিজ্ঞান বোঝো, এগিয়ে চলো।', 'Understand Physics. Move Forward.')}
          </p>
        </div>

        {/* Quick Demo Login Bar */}
        <div className="bg-amber-50/70 border-b border-amber-200/60 px-4 sm:px-6 py-2.5 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
            <span className="font-semibold text-neutral-700 flex items-center gap-1 text-[11px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
              {t('১-ক্লিকে টেস্টিং লগইন:', '1-Click Demo Login:')}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="px-2 sm:px-2.5 py-1 rounded bg-white text-[11px] sm:text-xs font-bold text-emerald-800 border border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                {t('শিক্ষার্থী', 'Student')}
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('teacher')}
                className="px-2 sm:px-2.5 py-1 rounded bg-white text-[11px] sm:text-xs font-bold text-blue-800 border border-blue-300 hover:bg-blue-50 transition-colors"
              >
                {t('শিক্ষক', 'Teacher')}
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('super_admin')}
                className="px-2 sm:px-2.5 py-1 rounded bg-white text-[11px] sm:text-xs font-bold text-amber-900 border border-amber-400 hover:bg-amber-100 transition-colors"
              >
                {t('সুপার অ্যাডমিন', 'Admin')}
              </button>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-neutral-200 shrink-0">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-2.5 sm:py-3 text-center text-xs font-bold transition-all ${
              tab === 'login'
                ? 'text-[#FF9933] border-b-2 border-[#FF9933] bg-orange-50/20'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            {t('লগইন করুন', 'Login')}
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-2.5 sm:py-3 text-center text-xs font-bold transition-all ${
              tab === 'register'
                ? 'text-[#FF9933] border-b-2 border-[#FF9933] bg-orange-50/20'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            {t('নতুন অ্যাকাউন্ট তৈরি', 'Register Account')}
          </button>
        </div>

        {error && (
          <div className="m-4 mb-0 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl shrink-0">
            {error}
          </div>
        )}

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('মোবাইল নম্বর অথবা ইমেল', 'Mobile Number or Email')}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={e => setLoginIdentifier(e.target.value)}
                    placeholder="8972263462 or student@physicsforward.in"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-neutral-700">
                    {t('পাসওয়ার্ড', 'Password')}
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert(t('পাসওয়ার্ড রিসেট ওটিপি আপনার রেজিস্টার্ড নম্বরে পাঠানো হবে।', 'Password reset OTP will be sent to registered mobile.')); }} className="text-xs text-[#FF9933] hover:underline">
                    {t('পাসওয়ার্ড ভুলে গেছেন?', 'Forgot Password?')}
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#FF9933] text-black font-bold text-sm rounded-xl hover:bg-[#ffaa55] transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
              >
                {loading ? t('যাচাই করা হচ্ছে...', 'Verifying...') : t('লগইন সম্পূর্ণ করুন', 'Login to Account')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('শিক্ষার্থীর পুরো নাম *', 'Full Name *')}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Rahul Das"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('মোবাইল নম্বর *', 'Mobile Number *')}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="8972263462"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ইমেল (ঐচ্ছিক)', 'Email (Optional)')}
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('শিক্ষা পর্ষদ', 'Board')}
                  </label>
                  <select
                    value={regBoard}
                    onChange={e => setRegBoard(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF9933]"
                  >
                    <option value="board-wbbse">WBBSE (মধ্যশিক্ষা)</option>
                    <option value="board-wbchse">WBCHSE (উচ্চমাধ্যমিক)</option>
                    <option value="board-cbse">CBSE</option>
                    <option value="board-icse">ICSE/ISC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('শ্রেণী', 'Class')}
                  </label>
                  <select
                    value={regClass}
                    onChange={e => setRegClass(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF9933]"
                  >
                    <option value="class-9">Class 9</option>
                    <option value="class-10">Class 10 (মাধ্যমিক)</option>
                    <option value="class-11">Class 11 (উচ্চমাধ্যমিক)</option>
                    <option value="class-12">Class 12 (উচ্চমাধ্যমিক)</option>
                    <option value="class-wbjee">WBJEE / NEET</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('মাধ্যম', 'Medium')}
                  </label>
                  <select
                    value={regMedium}
                    onChange={e => setRegMedium(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF9933]"
                  >
                    <option value="med-bn">বাংলা মাধ্যম (Bengali)</option>
                    <option value="med-en">English Medium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('বিদ্যালয়ের নাম', 'School Name')}
                  </label>
                  <input
                    type="text"
                    value={regSchool}
                    onChange={e => setRegSchool(e.target.value)}
                    placeholder="e.g. Contai High School"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('শহর / জেলা', 'City / District')}
                  </label>
                  <input
                    type="text"
                    value={regCity}
                    onChange={e => setRegCity(e.target.value)}
                    placeholder="e.g. Contai, Purba Medinipur"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-[#FF9933] text-black font-bold text-sm rounded-xl hover:bg-[#ffaa55] transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
              >
                {loading ? t('নিবন্ধন করা হচ্ছে...', 'Registering...') : t('অ্যাকাউন্ট তৈরি সম্পন্ন করুন', 'Complete Registration')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
