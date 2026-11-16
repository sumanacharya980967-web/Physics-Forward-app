import React, { useState, useEffect } from 'react';
import { Batch, Course, Program, User } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Calendar,
  Plus,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  Users,
  Video,
  Clock,
  BookOpen
} from 'lucide-react';

interface BatchesTabProps {
  batches: Batch[];
  courses: Course[];
  programs: Program[];
  onRefreshData?: () => void;
}

export const BatchesTab: React.FC<BatchesTabProps> = ({
  batches = [],
  courses = [],
  programs = [],
  onRefreshData
}) => {
  const { t } = useLanguage();
  const [selectedProgramFilter, setSelectedProgramFilter] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers, setTeachers] = useState<User[]>([]);

  // Modal & Feedback State
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    api.getTeachers()
      .then(data => {
        if (Array.isArray(data)) setTeachers(data);
      })
      .catch(() => {});
  }, []);

  // Form Fields
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [programId, setProgramId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [schedule, setSchedule] = useState('Mon, Wed, Fri 7:00 PM - 8:30 PM');
  const [scheduleBn, setScheduleBn] = useState('সোম, বুধ, শুক্র সন্ধ্যা ৭:০০ - ৮:৩০');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [capacity, setCapacity] = useState('60');
  const [teacherId, setTeacherId] = useState('');
  const [teacherName, setTeacherName] = useState('Subrata Acharya, M.Sc.');
  const [meetUrl, setMeetUrl] = useState('https://meet.google.com/pfd-live-room');
  const [status, setStatus] = useState<'upcoming' | 'ongoing' | 'completed'>('ongoing');

  const sortedPrograms = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));

  const getCoursesForProgram = (pid: string) => {
    const matched = courses.filter(c => c.programId === pid);
    return matched.length > 0 ? matched : courses;
  };

  const resetForm = () => {
    const defaultProgId = sortedPrograms[0]?.id || sortedPrograms[0]?.code || 'prog-class-9';
    const defaultCourses = getCoursesForProgram(defaultProgId);
    const defaultTeacher = teachers[0];

    setEditingBatch(null);
    setName('');
    setNameBn('');
    setProgramId(defaultProgId);
    setCourseId(defaultCourses[0]?.id || '');
    setSchedule('Mon, Wed, Fri 7:00 PM - 8:30 PM');
    setScheduleBn('সোম, বুধ, শুক্র সন্ধ্যা ৭:০০ - ৮:৩০');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('2026-12-31');
    setCapacity('60');
    setTeacherId(defaultTeacher?.id || '');
    setTeacherName(defaultTeacher?.name || 'Subrata Acharya, M.Sc.');
    setMeetUrl('https://meet.google.com/pfd-live-room');
    setStatus('ongoing');
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (b: Batch) => {
    const matchedTeacher = teachers.find(
      tch => tch.id === b.teacherId || tch.name === b.teacherName
    );
    setEditingBatch(b);
    setName(b.name);
    setNameBn(b.nameBn || b.name);
    setProgramId(b.programId || sortedPrograms[0]?.id || '');
    setCourseId(b.courseId || getCoursesForProgram(b.programId || '')[0]?.id || '');
    setSchedule(b.schedule);
    setScheduleBn(b.scheduleBn || b.schedule);
    setStartDate(b.startDate || new Date().toISOString().split('T')[0]);
    setEndDate(b.endDate || '2026-12-31');
    setCapacity(b.capacity.toString());
    setTeacherId(b.teacherId || matchedTeacher?.id || '');
    setTeacherName(b.teacherName || matchedTeacher?.name || '');
    setMeetUrl(b.meetUrl || 'https://meet.google.com/pfd-live-room');
    setStatus(b.status || 'ongoing');
    setShowModal(true);
  };

  const handleProgramChangeInModal = (newProgId: string) => {
    setProgramId(newProgId);
    const progCourses = courses.filter(c => c.programId === newProgId);
    if (progCourses.length > 0 && !progCourses.some(c => c.id === courseId)) {
      setCourseId(progCourses[0].id);
    }
  };

  const handleToggleStatus = async (b: Batch) => {
    try {
      await api.toggleBatchStatus(b.id);
      showToast(t('ব্যাচের স্ট্যাটাস আপডেট হয়েছে।', 'Batch status updated.'));
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to toggle batch status:', err);
    }
  };

  const handleDelete = async (b: Batch) => {
    try {
      await api.deleteBatch(b.id);
      setConfirmDeleteId(null);
      showToast(t('ব্যাচ মুছে ফেলা হয়েছে।', 'Batch deleted successfully.'));
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to delete batch:', err);
    }
  };

  const handleSaveBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const matchedProgram = programs.find(p => p.id === programId || p.code === programId);
    const matchedCourse = courses.find(c => c.id === courseId);
    const matchedTeacher = teachers.find(tch => tch.id === teacherId);

    const batchData: Partial<Batch> = {
      id: editingBatch ? editingBatch.id : 'batch-' + Date.now(),
      name: name.trim(),
      nameBn: nameBn.trim() || name.trim(),
      programId: programId || matchedProgram?.id,
      boardId: matchedCourse?.boardId || editingBatch?.boardId || 'board-wbbse',
      classId: matchedCourse?.classId || matchedProgram?.code?.toUpperCase() || 'PROGRAM',
      mediumId: matchedCourse?.mediumId || editingBatch?.mediumId || 'med-bn',
      courseId: courseId || matchedCourse?.id || editingBatch?.courseId || courses[0]?.id || 'course-1',
      teacherId: teacherId || matchedTeacher?.id || editingBatch?.teacherId,
      teacherName: matchedTeacher?.name || teacherName.trim() || 'Subrata Acharya, M.Sc.',
      startDate: startDate || editingBatch?.startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || editingBatch?.endDate || '2026-12-31',
      schedule: schedule.trim(),
      scheduleBn: scheduleBn.trim() || schedule.trim(),
      capacity: parseInt(capacity, 10) || 60,
      enrolledCount: editingBatch?.enrolledCount || 0,
      status,
      meetUrl: meetUrl.trim()
    };

    try {
      await api.saveBatch(batchData);
      setShowModal(false);
      resetForm();
      showToast(t('ব্যাচ সফলভাবে সংরক্ষিত হয়েছে!', 'Batch saved successfully!'));
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to save batch:', err);
    }
  };

  const filteredBatches = batches.filter(b => {
    const selectedProg = programs.find(p => p.id === selectedProgramFilter);
    const matchesProgram =
      selectedProgramFilter === 'all' ||
      b.programId === selectedProgramFilter ||
      (selectedProg && b.programId === selectedProg.code);

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'ongoing' && (b.status === 'ongoing' || b.status === 'upcoming')) ||
      (filterStatus === 'completed' && b.status === 'completed');

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      b.name.toLowerCase().includes(q) ||
      (b.nameBn && b.nameBn.toLowerCase().includes(q)) ||
      b.teacherName.toLowerCase().includes(q);

    return matchesProgram && matchesStatus && matchesSearch;
  });

  const getProgramBadge = (b: Batch) => {
    const prog = programs.find(p => p.id === b.programId || p.code === b.programId);
    return prog ? prog.name : (b.programId || 'PROGRAM');
  };

  const getCourseTitle = (cId?: string) => {
    const c = courses.find(item => item.id === cId);
    return c ? (c.titleBn || c.title) : null;
  };

  const modalCourses = getCoursesForProgram(programId);

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold shadow-xl border border-neutral-700 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Filter & Actions Bar */}
      <div className="space-y-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
        {/* Academic Program Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
            {t('প্রোগ্রাম:', 'Program:')}
          </span>
          <button
            onClick={() => setSelectedProgramFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedProgramFilter === 'all'
                ? 'bg-[#FF9933] text-black shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-black'
            }`}
          >
            {t('সকল ব্যাচ', 'All Batches')} ({batches.length})
          </button>
          {sortedPrograms.map(prog => (
            <button
              key={prog.id}
              onClick={() => setSelectedProgramFilter(prog.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedProgramFilter === prog.id
                  ? 'bg-[#FF9933] text-black shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black'
              }`}
            >
              {prog.name}
            </button>
          ))}
        </div>

        {/* Search, Status Filter & Add Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="flex bg-neutral-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-lg ${
                  filterStatus === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
                }`}
              >
                {t('সকল', 'All')}
              </button>
              <button
                onClick={() => setFilterStatus('ongoing')}
                className={`px-3 py-1 rounded-lg ${
                  filterStatus === 'ongoing' ? 'bg-emerald-600 text-white shadow-xs' : 'text-neutral-500'
                }`}
              >
                {t('সক্রিয় / রানিং', 'Ongoing (Active)')}
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-3 py-1 rounded-lg ${
                  filterStatus === 'completed' ? 'bg-neutral-800 text-white shadow-xs' : 'text-neutral-500'
                }`}
              >
                {t('সমাপ্ত / নিষ্ক্রিয়', 'Completed')}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('ব্যাচ বা শিক্ষক খুঁজুন...', 'Search batch or teacher...')}
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#FF9933]"
              />
            </div>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t('নতুন ব্যাচ তৈরি', 'Create Batch')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Batches Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBatches.map(b => {
          const isOngoing = b.status === 'ongoing';
          const linkedCourseTitle = getCourseTitle(b.courseId);
          return (
            <div
              key={b.id}
              className={`bg-white rounded-2xl p-5 border transition-all duration-200 shadow-xs flex flex-col justify-between ${
                isOngoing
                  ? 'border-neutral-200 hover:border-[#FF9933]'
                  : 'border-neutral-200 opacity-70 bg-neutral-50/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2.5 py-1 rounded-lg">
                    {getProgramBadge(b)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isOngoing ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {isOngoing ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{t('সক্রিয় / ক্লাস চলছে', 'Active / Ongoing')}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        <span>{t('সমাপ্ত / নিষ্ক্রিয়', 'Completed')}</span>
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-neutral-900 leading-snug">
                    {b.nameBn || b.name}
                  </h4>
                  {b.nameBn && b.nameBn !== b.name && (
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">{b.name}</p>
                  )}
                  {linkedCourseTitle && (
                    <p className="text-[11px] text-neutral-600 mt-1 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#FF9933] shrink-0" />
                      <span className="truncate font-medium">{linkedCourseTitle}</span>
                    </p>
                  )}
                  <p className="text-xs text-neutral-600 mt-1">
                    {t('শিক্ষক:', 'Faculty:')} <span className="font-semibold text-neutral-900">{b.teacherName}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{b.scheduleBn || b.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{b.enrolledCount} / {b.capacity} {t('শিক্ষার্থী', 'students')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                {b.meetUrl ? (
                  <a
                    href={b.meetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-orange-50 text-[#FF9933] font-bold text-xs hover:bg-orange-100 flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Meet Room</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-neutral-400 font-mono">{b.startDate}</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(b)}
                    className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      isOngoing
                        ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isOngoing ? t('নিষ্ক্রিয়', 'Deactivate') : t('সক্রিয় করুন', 'Activate')}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="p-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                    title={t('সম্পাদনা', 'Edit')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {confirmDeleteId === b.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(b)}
                        className="px-2 py-1 bg-red-600 text-white font-bold text-[10px] rounded-lg shadow-xs"
                      >
                        {t('নিশ্চিত?', 'Confirm?')}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-1.5 py-1 bg-neutral-200 text-neutral-700 text-[10px] rounded-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(b.id)}
                      className="p-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-all"
                      title={t('মুছুন', 'Delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Batch Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-xl font-black text-neutral-900">
                {editingBatch
                  ? t('ব্যাচ সম্পাদনা করুন', 'Edit Batch')
                  : t('নতুন ব্যাচ তৈরি করুন', 'Create New Batch')}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBatch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('প্রোগ্রাম নির্বাচন করুন *', 'Select Academic Program *')}
                  </label>
                  <select
                    value={programId}
                    onChange={e => handleProgramChangeInModal(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-semibold focus:outline-none focus:border-[#FF9933]"
                  >
                    {sortedPrograms.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} {p.nameBn ? `(${p.nameBn})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('কোর্স নির্বাচন করুন *', 'Assigned Course *')}
                  </label>
                  <select
                    value={courseId}
                    onChange={e => setCourseId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-semibold focus:outline-none focus:border-[#FF9933]"
                  >
                    {modalCourses.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.titleBn || c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('ব্যাচের নাম (English) *', 'Batch Name (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. JEE Mains 2026 Morning Fast-Track Batch"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('ব্যাচের নাম (বাংলা)', 'Batch Name (Bengali)')}
                </label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={e => setNameBn(e.target.value)}
                  placeholder="যেমন: জেইই মেইন মর্নিং স্পেশাল ব্যাচ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('সময়সূচী (English)', 'Schedule (English)')}
                  </label>
                  <input
                    type="text"
                    value={schedule}
                    onChange={e => setSchedule(e.target.value)}
                    placeholder="Mon, Wed, Fri 7:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('সময়সূচী (বাংলা)', 'Schedule (Bengali)')}
                  </label>
                  <input
                    type="text"
                    value={scheduleBn}
                    onChange={e => setScheduleBn(e.target.value)}
                    placeholder="সোম, বুধ, শুক্র সন্ধ্যা ৭:০০"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('শুরুর তারিখ', 'Start Date')}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('শেষের তারিখ', 'End Date')}
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('শিক্ষক নির্বাচন করুন', 'Faculty Teacher')}
                  </label>
                  {teachers.length > 0 ? (
                    <select
                      value={teacherId}
                      onChange={e => {
                        const selected = teachers.find(tch => tch.id === e.target.value);
                        setTeacherId(e.target.value);
                        if (selected) setTeacherName(selected.name);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-semibold"
                    >
                      <option value="">{t('কাস্টম / তালিকা থেকে বেছে নিন', '-- Select Faculty --')}</option>
                      {teachers.map(tch => (
                        <option key={tch.id} value={tch.id}>
                          {tch.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={teacherName}
                      onChange={e => setTeacherName(e.target.value)}
                      placeholder="Subrata Acharya, M.Sc."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('ধারণক্ষমতা (Capacity)', 'Student Capacity')}
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    placeholder="60"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('গুগল মিট রুম URL *', 'Google Meet Room URL *')}
                </label>
                <input
                  type="url"
                  required
                  value={meetUrl}
                  onChange={e => setMeetUrl(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <input
                  type="checkbox"
                  id="batch-active-check"
                  checked={status === 'ongoing'}
                  onChange={e => setStatus(e.target.checked ? 'ongoing' : 'completed')}
                  className="w-4 h-4 text-[#FF9933] rounded accent-[#FF9933]"
                />
                <label
                  htmlFor="batch-active-check"
                  className="text-xs font-bold text-neutral-800 cursor-pointer"
                >
                  {t(
                    'ব্যাচটি সক্রিয় / রানিং রাখুন (শিক্ষার্থীরা লাইভ ক্লাসে অংশ নিতে পারবে)',
                    'Batch is active / ongoing (Students can attend live classes)'
                  )}
                </label>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-sm"
                >
                  {t('সংরক্ষণ করুন', 'Save Batch')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

