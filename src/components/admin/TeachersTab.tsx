import React, { useState, useEffect } from 'react';
import { User, Course, Batch, Program } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  BookOpen,
  Calendar,
  Phone,
  Mail,
  Shield,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';

interface TeachersTabProps {
  courses?: Course[];
  batches?: Batch[];
  programs?: Program[];
  onRefreshData?: () => void;
}

export const TeachersTab: React.FC<TeachersTabProps> = ({
  courses = [],
  batches = [],
  programs = [],
  onRefreshData
}) => {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<User | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('8972263462');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [bioBn, setBioBn] = useState('');
  const [subjectsString, setSubjectsString] = useState('Physics');
  const [teachingSchedule, setTeachingSchedule] = useState('');
  const [active, setActive] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const res = await api.getTeachers();
      setTeachers(res || []);
    } catch (err) {
      console.error('Failed to load teachers', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setName('');
    setEmail('');
    setPhone('8972263462');
    setQualification('M.Sc. in Physics');
    setExperience('10+ Years');
    setBio('');
    setBioBn('');
    setSubjectsString('Physics');
    setTeachingSchedule('Monday, Wednesday, Friday: 6:00 PM - 8:00 PM');
    setActive(true);
    setShowModal(true);
  };

  const handleOpenEdit = (teacher: User) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setEmail(teacher.email);
    setPhone(teacher.phone || '');
    setQualification(teacher.qualification || '');
    setExperience(teacher.experience || '');
    setBio(teacher.bio || '');
    setBioBn(teacher.bioBn || '');
    setSubjectsString((teacher.assignedSubjectNames || ['Physics']).join(', '));
    setTeachingSchedule(teacher.teachingSchedule || '');
    setActive(teacher.active);
    setShowModal(true);
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      const subjectArray = subjectsString.split(',').map(s => s.trim()).filter(Boolean);
      await api.saveTeacher({
        id: editingTeacher?.id,
        name,
        email: email || `teacher.${Date.now()}@physicsforward.in`,
        phone,
        qualification,
        experience,
        bio,
        bioBn,
        assignedSubjectNames: subjectArray,
        teachingSchedule,
        active,
        role: 'teacher'
      });
      setShowModal(false);
      loadTeachers();
      onRefreshData?.();
      showToast(t('শিক্ষক প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!', 'Faculty profile saved successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    try {
      await api.deleteTeacher(id);
      setConfirmDeleteId(null);
      showToast(t('শিক্ষক প্রোফাইল মুছে ফেলা হয়েছে।', 'Faculty profile deleted.'));
      loadTeachers();
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold shadow-xl border border-neutral-700 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
          <span>{toastMsg}</span>
        </div>
      )}
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CMS Control 10</span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 mt-0.5">
            {t('অনুষদ ও শিক্ষক পরিষদ (Faculty & Teacher Directory)', 'Teachers & Faculty Management')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('শিক্ষকদের প্রোফাইল, শিক্ষাগত যোগ্যতা, অভিজ্ঞতা, ক্লাস রুটিন ও পারমিশন নিয়ন্ত্রণ করুন', 'Manage faculty qualifications, teaching schedules, permissions, and assigned batches')}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{t('নতুন শিক্ষক প্রোফাইল যুক্ত করুন', 'Add Faculty Member')}</span>
        </button>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-[#FF9933] font-black text-lg flex items-center justify-center">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-neutral-900">{teacher.name}</h4>
                    <p className="text-xs font-semibold text-[#FF9933]">{teacher.qualification || 'Senior Faculty'}</p>
                    <p className="text-[10px] text-neutral-400">{teacher.experience || 'Experienced Educator'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(teacher)}
                    className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {teacher.id !== 'user-suman' && (
                    confirmDeleteId === teacher.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="px-2 py-0.5 bg-red-600 text-white font-bold text-[10px] rounded"
                        >
                          {t('নিশ্চিত?', 'Confirm?')}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-1.5 py-0.5 bg-neutral-200 text-neutral-700 text-[10px] rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(teacher.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )
                  )}
                </div>
              </div>

              {teacher.bioBn && (
                <p className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-100 leading-relaxed">
                  {teacher.bioBn}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{teacher.phone}</span>
                </div>
              </div>

              {teacher.teachingSchedule && (
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                  <Clock className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>{teacher.teachingSchedule}</span>
                </div>
              )}

              {/* Assigned Subjects */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(teacher.assignedSubjectNames || ['Physics']).map((sub, i) => (
                  <span key={i} className="px-2 py-0.5 bg-orange-50 text-[#FF9933] rounded-md font-bold text-[10px]">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-[11px]">
              <span className={`font-bold ${teacher.active ? 'text-emerald-700' : 'text-neutral-400'}`}>
                {teacher.active ? 'Active Educator' : 'Inactive'}
              </span>
              <span className="text-neutral-400 font-mono">Role: {teacher.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-neutral-900">
              {editingTeacher ? t('শিক্ষক তথ্য সম্পাদনা', 'Edit Faculty Profile') : t('নতুন শিক্ষক যুক্ত করুন', 'Add New Faculty Member')}
            </h3>

            <form onSubmit={handleSaveTeacher} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('শিক্ষকের পূর্ণ নাম *', 'Full Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Subrata Acharya, M.Sc."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('শিক্ষাগত যোগ্যতা *', 'Qualification *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={qualification}
                    onChange={e => setQualification(e.target.value)}
                    placeholder="M.Sc. in Physics (Gold Medalist)"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('অভিজ্ঞতা *', 'Experience *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    placeholder="25+ Years Experience"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('যোগাযোগ ফোন নম্বর', 'Contact Phone')}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ইমেল অ্যাড্রেস', 'Email Address')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="faculty@physicsforward.in"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('পাঠদানের বিষয়সমূহ (কমা দিয়ে পৃথক করুন)', 'Assigned Subjects (comma separated)')}
                </label>
                <input
                  type="text"
                  value={subjectsString}
                  onChange={e => setSubjectsString(e.target.value)}
                  placeholder="Physics, Physical Science, Mechanics"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('সাপ্তাহিক ক্লাসের সময়সূচী', 'Teaching Schedule Notes')}
                </label>
                <input
                  type="text"
                  value={teachingSchedule}
                  onChange={e => setTeachingSchedule(e.target.value)}
                  placeholder="Tuesday, Thursday, Saturday: 5:00 PM - 7:30 PM"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('শিক্ষকের সংক্ষিপ্ত পরিচিতি (বাংলা)', 'Faculty Bio (Bengali)')}
                </label>
                <textarea
                  rows={2}
                  value={bioBn}
                  onChange={e => setBioBn(e.target.value)}
                  placeholder="কাঁথি অঞ্চলের স্বনামধন্য পদার্থবিজ্ঞান শিক্ষক..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="teacherActive"
                  checked={active}
                  onChange={e => setActive(e.target.checked)}
                  className="rounded text-[#FF9933]"
                />
                <label htmlFor="teacherActive" className="text-xs font-bold text-neutral-800">
                  {t('সক্রিয় শিক্ষক হিসেবে সাইটে ও পোর্টালে দৃশ্যমান রাখুন', 'Active and visible across portals')}
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
                >
                  {t('সংরক্ষণ করুন', 'Save Faculty')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
