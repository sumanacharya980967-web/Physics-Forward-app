import React, { useState, useEffect } from 'react';
import { User, Course, Program, Batch } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  BookOpen,
  Calendar,
  Award,
  ShieldAlert,
  UserCheck,
  UserX,
  Edit2,
  Plus
} from 'lucide-react';

interface StudentsTabProps {
  courses?: Course[];
  programs?: Program[];
  batches?: Batch[];
  onRefreshData?: () => void;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
  courses = [],
  programs = [],
  batches = [],
  onRefreshData
}) => {
  const { t } = useLanguage();
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  // Enrollment Modal
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState(courses[0]?.id || '');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await api.getStudents();
      setStudents(res || []);
      if (res && res.length > 0 && !selectedStudent) {
        setSelectedStudent(res[0]);
      }
    } catch (err) {
      console.error('Failed to load students', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (studentId: string, currentStatus: boolean) => {
    try {
      await api.updateStudent(studentId, { active: !currentStatus });
      setStudents(prev =>
        prev.map(s => (s.id === studentId ? { ...s, active: !currentStatus } : s))
      );
      if (selectedStudent?.id === studentId) {
        setSelectedStudent(prev => prev ? { ...prev, active: !currentStatus } : null);
      }
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnrollCourse = async () => {
    if (!selectedStudent || !courseToEnroll) return;
    try {
      const updated = await api.enrollStudent(selectedStudent.id, { courseId: courseToEnroll });
      setStudents(prev => prev.map(s => (s.id === selectedStudent.id ? updated : s)));
      setSelectedStudent(updated);
      setShowEnrollModal(false);
      onRefreshData?.();
      alert(t('শিক্ষার্থী সফলভাবে কোর্সে এনরোল হয়েছে!', 'Student enrolled successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = students.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (s.name || '').toLowerCase().includes(q) ||
      (s.phone || '').includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      (s.school || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CMS Control 09</span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 mt-0.5">
            {t('শিক্ষার্থী ও অ্যাডমিশন পোর্টাল (Student Manager)', 'Student Database & Enrollment Hub')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('শিক্ষার্থীদের প্রোফাইল, কোর্স এক্সেস, ক্লাসে উপস্থিতি হার, মক টেস্ট পারফরম্যান্স ও স্ট্যাটাস নিয়ন্ত্রণ করুন', 'Manage student profiles, enrollments, attendance metrics, exam attempts, and access control')}
          </p>
        </div>

        <div className="text-xs font-mono font-bold bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-xl">
          Total Registered: {students.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Students List with Search */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('নাম, ফোন বা স্কুল দিয়ে খুঁজুন...', 'Search name, phone, school...')}
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
            />
          </div>

          <div className="space-y-2">
            {filteredStudents.map(student => {
              const isSelected = selectedStudent?.id === student.id;
              return (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-800 shadow-md'
                      : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{student.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      student.active
                        ? isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {student.active ? 'ACTIVE' : 'SUSPENDED'}
                    </span>
                  </div>

                  <p className={`text-[11px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {student.school || 'School'} • {student.city || 'Contai'}
                  </p>
                  <p className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                    Phone: {student.phone}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Detailed Student Profile & Actions */}
        <div className="lg:col-span-2 space-y-4">
          {selectedStudent ? (
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF9933] text-black font-black text-lg flex items-center justify-center">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-neutral-900">{selectedStudent.name}</h3>
                    <p className="text-xs text-neutral-500">
                      ID: {selectedStudent.id} · Registered: {selectedStudent.createdAt.split('T')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(selectedStudent.id, selectedStudent.active)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                      selectedStudent.active
                        ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {selectedStudent.active ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    <span>{selectedStudent.active ? 'Block Student' : 'Activate Access'}</span>
                  </button>

                  <button
                    onClick={() => setShowEnrollModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-[#FF9933] text-black hover:bg-[#ffaa55] font-extrabold text-xs flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Enroll in Course</span>
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-neutral-500">Live Attendance</span>
                  <p className="text-xl font-black text-neutral-900 mt-0.5">{selectedStudent.attendanceRate || 92}%</p>
                </div>
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-neutral-500">Mock Tests Taken</span>
                  <p className="text-xl font-black text-neutral-900 mt-0.5">{selectedStudent.examAttemptsCount || 10}</p>
                </div>
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-neutral-500">Enrolled Courses</span>
                  <p className="text-xl font-black text-emerald-700 mt-0.5">{selectedStudent.enrolledCourseIds?.length || 1}</p>
                </div>
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-neutral-400 font-semibold">Contact Email:</span>
                  <p className="font-bold text-neutral-800">{selectedStudent.email}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-neutral-400 font-semibold">Phone Number:</span>
                  <p className="font-bold text-neutral-800 font-mono">{selectedStudent.phone}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-neutral-400 font-semibold">School & Location:</span>
                  <p className="font-bold text-neutral-800">{selectedStudent.school || 'N/A'}, {selectedStudent.city || 'Contai'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-neutral-400 font-semibold">Assigned Batch:</span>
                  <p className="font-bold text-neutral-800">{selectedStudent.currentBatchName || 'Madhyamik 2026 Batch'}</p>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Enrolled Courses & Active Syllabi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.enrolledCourseIds && selectedStudent.enrolledCourseIds.length > 0 ? (
                    selectedStudent.enrolledCourseIds.map(cId => {
                      const c = courses.find(course => course.id === cId);
                      return (
                        <span
                          key={cId}
                          className="px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800"
                        >
                          {c ? (c.titleBn || c.title) : cId}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-xs text-neutral-400">No courses assigned yet.</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
              {t('তালিকা থেকে একজন শিক্ষার্থী নির্বাচন করুন।', 'Select a student from the list.')}
            </div>
          )}
        </div>
      </div>

      {/* Enroll Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-neutral-900">
              {t(`কোর্সে এনরোল করুন: ${selectedStudent?.name}`, `Enroll Course for ${selectedStudent?.name}`)}
            </h3>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-700">Select Course</label>
              <select
                value={courseToEnroll}
                onChange={e => setCourseToEnroll(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.titleBn || c.title} (₹{c.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEnrollModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEnrollCourse}
                className="px-5 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
