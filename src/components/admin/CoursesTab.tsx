import React, { useState, useEffect } from 'react';
import { Course, Program, Chapter, Lesson, User, Subject, Board, Medium, ClassLevel } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  BookOpen,
  Plus,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Search,
  Layers,
  Clock,
  ArrowUp,
  ArrowDown,
  Archive,
  Globe,
  Smartphone,
  UserCheck,
  ListOrdered,
  Play,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CoursesTabProps {
  courses: Course[];
  programs: Program[];
  onRefreshData?: () => void;
}

export const CoursesTab: React.FC<CoursesTabProps> = ({
  courses = [],
  programs = [],
  onRefreshData
}) => {
  const { t } = useLanguage();
  const [selectedProgramFilter, setSelectedProgramFilter] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic CMS Metadata (Teachers, Subjects, Boards, Mediums, Classes)
  const [teachers, setTeachers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [mediums, setMediums] = useState<Medium[]>([]);
  const [classLevels, setClassLevels] = useState<ClassLevel[]>([]);

  useEffect(() => {
    Promise.all([
      api.getTeachers().catch(() => []),
      api.getSubjects().catch(() => []),
      api.getBoards().catch(() => []),
      api.getMediums().catch(() => []),
      api.getClasses().catch(() => [])
    ]).then(([tData, sData, bData, mData, cData]) => {
      if (Array.isArray(tData)) setTeachers(tData);
      if (Array.isArray(sData)) setSubjects(sData);
      if (Array.isArray(bData)) setBoards(bData);
      if (Array.isArray(mData)) setMediums(mData);
      if (Array.isArray(cData)) setClassLevels(cData);
    });
  }, []);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalSection, setModalSection] = useState<'details' | 'syllabus'>('details');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Course Details Form Fields
  const [title, setTitle] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [programId, setProgramId] = useState('');
  const [subjectId, setSubjectId] = useState('sub-phy');
  const [subject, setSubject] = useState('Physics');
  const [boardId, setBoardId] = useState('board-wbbse');
  const [mediumId, setMediumId] = useState('med-bn');
  const [classId, setClassId] = useState('class-10');
  const [duration, setDuration] = useState('12 Months');
  const [price, setPrice] = useState('1499');
  const [originalPrice, setOriginalPrice] = useState('2999');
  const [discountPrice, setDiscountPrice] = useState('1999');
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [banner, setBanner] = useState('');
  const [assignedTeacherId, setAssignedTeacherId] = useState('user-teacher-subrata');
  const [facultyName, setFacultyName] = useState('Subrata Acharya, M.Sc.');
  const [order, setOrder] = useState('1');
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const [displayOnWebsite, setDisplayOnWebsite] = useState(true);
  const [displayOnApp, setDisplayOnApp] = useState(true);
  const [published, setPublished] = useState(true);
  const [archived, setArchived] = useState(false);

  // Syllabus (Chapters & Lessons) Editor State
  const [syllabus, setSyllabus] = useState<Chapter[]>([]);
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterTitleBn, setNewChapterTitleBn] = useState('');

  // New Lesson Draft per chapter
  const [lessonDraftTitle, setLessonDraftTitle] = useState('');
  const [lessonDraftTitleBn, setLessonDraftTitleBn] = useState('');
  const [lessonDraftDuration, setLessonDraftDuration] = useState('45 min');
  const [lessonDraftVideoUrl, setLessonDraftVideoUrl] = useState('');
  const [lessonDraftFreePreview, setLessonDraftFreePreview] = useState(false);
  const [lessonDraftHasNotes, setLessonDraftHasNotes] = useState(true);

  const resetForm = () => {
    setEditingCourse(null);
    setModalSection('details');
    setTitle('');
    setTitleBn('');
    setProgramId(programs[0]?.id || 'prog-class-9');
    setSubjectId(subjects[0]?.id || 'sub-phy');
    setSubject(subjects[0]?.name || 'Physics');
    setBoardId(boards[0]?.id || 'board-wbbse');
    setMediumId(mediums[0]?.id || 'med-bn');
    setClassId(classLevels[0]?.id || 'class-9');
    setDuration('12 Months');
    setPrice('1499');
    setOriginalPrice('2999');
    setDiscountPrice('1999');
    setIsFree(false);
    setDescription('');
    setDescriptionBn('');
    setThumbnail('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80');
    setBanner('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80');
    setAssignedTeacherId(teachers[0]?.id || 'user-teacher-subrata');
    setFacultyName(teachers[0]?.name || 'Subrata Acharya, M.Sc.');
    setOrder((courses.length + 1).toString());
    setEnrollmentOpen(true);
    setDisplayOnWebsite(true);
    setDisplayOnApp(true);
    setPublished(true);
    setArchived(false);
    setSyllabus([]);
    setExpandedChapterId(null);
    setNewChapterTitle('');
    setNewChapterTitleBn('');
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (c: Course, initialTab: 'details' | 'syllabus' = 'details') => {
    setEditingCourse(c);
    setModalSection(initialTab);
    setTitle(c.title);
    setTitleBn(c.titleBn || c.title);
    setProgramId(c.programId || programs[0]?.id || 'prog-class-9');
    setSubjectId(c.subjectId || 'sub-phy');
    setSubject(c.subject || subjects.find(s => s.id === c.subjectId)?.name || 'Physics');
    setBoardId(c.boardId || 'board-wbbse');
    setMediumId(c.mediumId || 'med-bn');
    setClassId(c.classId || 'class-10');
    setDuration(c.duration);
    setPrice(c.price.toString());
    setOriginalPrice(c.originalPrice?.toString() || (c.price * 2).toString());
    setDiscountPrice(c.discountPrice?.toString() || (c.price + 500).toString());
    setIsFree(Boolean(c.isFree));
    setDescription(c.description || '');
    setDescriptionBn(c.descriptionBn || '');
    setThumbnail(c.thumbnail || c.banner || '');
    setBanner(c.banner || '');
    setAssignedTeacherId(c.assignedTeacherId || 'user-teacher-subrata');
    setFacultyName(c.facultyName || 'Subrata Acharya, M.Sc.');
    setOrder((c.order || 1).toString());
    setEnrollmentOpen(c.enrollmentOpen !== false);
    setDisplayOnWebsite(c.displayOnWebsite !== false);
    setDisplayOnApp(c.displayOnApp !== false);
    setPublished(c.published !== false);
    setArchived(c.archived || false);
    const clonedSyllabus: Chapter[] = (c.syllabus || []).map(ch => ({
      ...ch,
      lessons: [...(ch.lessons || [])]
    }));
    setSyllabus(clonedSyllabus);
    setExpandedChapterId(clonedSyllabus[0]?.id || null);
    setNewChapterTitle('');
    setNewChapterTitleBn('');
    setShowModal(true);
  };

  const handleToggleStatus = async (c: Course) => {
    try {
      await api.toggleCourseStatus(c.id);
      onRefreshData?.();
      showToast(t('কোর্সের স্থিতি পরিবর্তিত হয়েছে', 'Course status updated'));
    } catch (err) {
      console.error('Failed to toggle course status:', err);
    }
  };

  const handleArchiveToggle = async (c: Course) => {
    try {
      await api.archiveCourse(c.id);
      onRefreshData?.();
      showToast(t('কোর্স আর্কাইভ স্থিতি আপডেট হয়েছে', 'Course archive updated'));
    } catch (err) {
      console.error('Failed to archive/unarchive course:', err);
    }
  };

  const handleMoveOrder = async (c: Course, direction: 'up' | 'down') => {
    const sorted = [...courses].sort((a, b) => (a.order || 999) - (b.order || 999));
    const currIndex = sorted.findIndex(item => item.id === c.id);
    if (currIndex === -1) return;
    if (direction === 'up' && currIndex === 0) return;
    if (direction === 'down' && currIndex === sorted.length - 1) return;

    const targetIndex = direction === 'up' ? currIndex - 1 : currIndex + 1;
    const temp = sorted[currIndex];
    sorted[currIndex] = sorted[targetIndex];
    sorted[targetIndex] = temp;

    const orderedIds = sorted.map(item => item.id);
    try {
      await api.reorderCourses(orderedIds);
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to reorder courses:', err);
    }
  };

  const handleDelete = async (c: Course) => {
    try {
      await api.deleteCourse(c.id);
      setConfirmDeleteId(null);
      onRefreshData?.();
      showToast(t('কোর্স মুছে ফেলা হয়েছে', 'Course deleted'));
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  // Chapter & Lesson management handlers
  const handleAddChapter = () => {
    if (!newChapterTitle.trim()) return;
    const newChap: Chapter = {
      id: 'chap-' + Date.now(),
      title: newChapterTitle.trim(),
      titleBn: newChapterTitleBn.trim() || newChapterTitle.trim(),
      order: syllabus.length + 1,
      lessons: []
    };
    setSyllabus([...syllabus, newChap]);
    setExpandedChapterId(newChap.id);
    setNewChapterTitle('');
    setNewChapterTitleBn('');
  };

  const handleDeleteChapter = (chapId: string) => {
    const updated = syllabus
      .filter(ch => ch.id !== chapId)
      .map((ch, idx) => ({ ...ch, order: idx + 1 }));
    setSyllabus(updated);
    if (expandedChapterId === chapId) {
      setExpandedChapterId(updated[0]?.id || null);
    }
  };

  const handleMoveChapter = (chapId: string, dir: 'up' | 'down') => {
    const idx = syllabus.findIndex(ch => ch.id === chapId);
    if (idx === -1) return;
    if (dir === 'up' && idx === 0) return;
    if (dir === 'down' && idx === syllabus.length - 1) return;
    const copy = [...syllabus];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    const tmp = copy[idx];
    copy[idx] = copy[target];
    copy[target] = tmp;
    setSyllabus(copy.map((ch, i) => ({ ...ch, order: i + 1 })));
  };

  const handleAddLesson = (chapId: string) => {
    if (!lessonDraftTitle.trim()) return;
    const newLesson: Lesson = {
      id: 'les-' + Date.now(),
      title: lessonDraftTitle.trim(),
      titleBn: lessonDraftTitleBn.trim() || lessonDraftTitle.trim(),
      duration: lessonDraftDuration.trim() || '45 min',
      videoUrl: lessonDraftVideoUrl.trim() || undefined,
      isFreePreview: lessonDraftFreePreview,
      hasNotes: lessonDraftHasNotes
    };
    setSyllabus(prev =>
      prev.map(ch =>
        ch.id === chapId ? { ...ch, lessons: [...ch.lessons, newLesson] } : ch
      )
    );
    setLessonDraftTitle('');
    setLessonDraftTitleBn('');
    setLessonDraftDuration('45 min');
    setLessonDraftVideoUrl('');
    setLessonDraftFreePreview(false);
    setLessonDraftHasNotes(true);
  };

  const handleDeleteLesson = (chapId: string, lessonId: string) => {
    setSyllabus(prev =>
      prev.map(ch =>
        ch.id === chapId
          ? { ...ch, lessons: ch.lessons.filter(l => l.id !== lessonId) }
          : ch
      )
    );
  };

  const handleToggleLessonPreview = (chapId: string, lessonId: string) => {
    setSyllabus(prev =>
      prev.map(ch =>
        ch.id === chapId
          ? {
              ...ch,
              lessons: ch.lessons.map(l =>
                l.id === lessonId ? { ...l, isFreePreview: !l.isFreePreview } : l
              )
            }
          : ch
      )
    );
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedProgram = programs.find(p => p.id === programId || p.code === programId);
    const matchedTeacher = teachers.find(tc => tc.id === assignedTeacherId);
    const totalLessonsCount = syllabus.reduce((acc, ch) => acc + ch.lessons.length, 0);

    const courseData: Partial<Course> = {
      id: editingCourse ? editingCourse.id : 'course-' + Date.now(),
      title: title.trim(),
      titleBn: titleBn.trim() || title.trim(),
      programId: programId || matchedProgram?.id,
      boardId: boardId || 'board-wbbse',
      classId: classId || matchedProgram?.code?.toUpperCase() || 'PROGRAM',
      mediumId: mediumId || 'med-bn',
      subjectId: subjectId || 'sub-phy',
      subject: subject.trim() || 'Physics',
      duration: duration.trim(),
      price: isFree ? 0 : parseInt(price, 10) || 1499,
      originalPrice: isFree ? 0 : parseInt(originalPrice, 10) || 2999,
      discountPrice: isFree ? 0 : parseInt(discountPrice, 10) || 1999,
      isFree,
      description: description.trim(),
      descriptionBn: descriptionBn.trim() || description.trim(),
      thumbnail: thumbnail.trim() || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80',
      banner: banner.trim() || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80',
      assignedTeacherId,
      facultyName: matchedTeacher?.name || facultyName || 'Subrata Acharya, M.Sc.',
      facultyDesignation: matchedTeacher?.qualification || (assignedTeacherId === 'user-suman' ? 'Lead Physics Faculty & Founder' : 'Senior Physics Faculty'),
      order: parseInt(order, 10) || courses.length + 1,
      enrollmentOpen,
      displayOnWebsite,
      displayOnApp,
      published,
      status: archived ? 'archived' : published ? 'published' : 'draft',
      archived,
      syllabus,
      rating: editingCourse?.rating || 5.0,
      totalLessons: totalLessonsCount || editingCourse?.totalLessons || 40,
      totalHours: editingCourse?.totalHours || 80
    };

    try {
      await api.saveCourse(courseData);
      setShowModal(false);
      resetForm();
      onRefreshData?.();
      showToast(t('কোর্স ও সিলেবাস সফলভাবে সংরক্ষিত হয়েছে!', 'Course & syllabus saved successfully!'));
    } catch (err) {
      console.error('Failed to save course:', err);
    }
  };

  const sortedCourses = [...courses].sort((a, b) => (a.order || 999) - (b.order || 999));

  const filteredCourses = sortedCourses.filter(c => {
    const matchesProgram =
      selectedProgramFilter === 'all' ||
      c.programId === selectedProgramFilter;

    const isPub = c.published !== false && !c.archived;
    let matchesStatus = true;
    if (filterStatus === 'published') matchesStatus = isPub;
    if (filterStatus === 'draft') matchesStatus = c.published === false && !c.archived;
    if (filterStatus === 'archived') matchesStatus = !!c.archived;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(q) ||
      (c.titleBn && c.titleBn.toLowerCase().includes(q));

    return matchesProgram && matchesStatus && matchesSearch;
  });

  const getProgramBadge = (c: Course) => {
    const prog = programs.find(p => p.id === c.programId || p.code === c.programId);
    if (prog) return prog.name;
    return 'PHYSICS';
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Actions Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
        {/* Dynamic Program Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
            {t('প্রোগ্রাম ফিল্টার:', 'Program:')}
          </span>
          <button
            onClick={() => setSelectedProgramFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedProgramFilter === 'all'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:text-black'
            }`}
          >
            {t('সকল প্রোগ্রাম (All)', 'All Programs')} ({courses.length})
          </button>
          {programs.map(prog => (
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
                onClick={() => setFilterStatus('published')}
                className={`px-3 py-1 rounded-lg ${
                  filterStatus === 'published' ? 'bg-emerald-600 text-white shadow-xs' : 'text-neutral-500'
                }`}
              >
                {t('প্রকাশিত', 'Published')}
              </button>
              <button
                onClick={() => setFilterStatus('draft')}
                className={`px-3 py-1 rounded-lg ${
                  filterStatus === 'draft' ? 'bg-neutral-800 text-white shadow-xs' : 'text-neutral-500'
                }`}
              >
                {t('ড্রাফট', 'Draft')}
              </button>
              <button
                onClick={() => setFilterStatus('archived')}
                className={`px-3 py-1 rounded-lg ${
                  filterStatus === 'archived' ? 'bg-amber-600 text-white shadow-xs' : 'text-neutral-500'
                }`}
              >
                {t('আর্কাইভ', 'Archived')}
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
                placeholder={t('কোর্স খুঁজুন...', 'Search courses...')}
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#FF9933]"
              />
            </div>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t('নতুন কোর্স তৈরি', 'Add New Course')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((c, idx) => {
          const isPub = c.published !== false && !c.archived;
          const chapterCount = c.syllabus?.length || 0;
          const lessonCount = (c.syllabus || []).reduce((acc, ch) => acc + (ch.lessons?.length || 0), 0);
          return (
            <div
              key={c.id}
              className={`bg-white rounded-2xl p-5 border transition-all duration-200 shadow-xs flex flex-col justify-between ${
                isPub
                  ? 'border-neutral-200 hover:border-[#FF9933]'
                  : c.archived
                  ? 'border-amber-200 bg-amber-50/20 opacity-80'
                  : 'border-neutral-200 opacity-70 bg-neutral-50/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2.5 py-1 rounded-lg">
                      {getProgramBadge(c)}
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {c.subject || 'Physics'}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                      #{c.order || idx + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Reorder Buttons */}
                    <div className="flex items-center gap-0.5 bg-neutral-100 p-0.5 rounded-lg">
                      <button
                        onClick={() => handleMoveOrder(c, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-neutral-600 hover:text-black hover:bg-white rounded disabled:opacity-30 transition-all"
                        title={t('উপরে সরান', 'Move Up')}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(c, 'down')}
                        disabled={idx === filteredCourses.length - 1}
                        className="p-1 text-neutral-600 hover:text-black hover:bg-white rounded disabled:opacity-30 transition-all"
                        title={t('নিচে সরান', 'Move Down')}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        c.archived
                          ? 'bg-amber-100 text-amber-800'
                          : isPub
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {c.archived ? (
                        <>
                          <Archive className="w-3 h-3" />
                          <span>{t('আর্কাইভ', 'Archived')}</span>
                        </>
                      ) : isPub ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t('প্রকাশিত', 'Published')}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>{t('ড্রাফট', 'Draft')}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-neutral-900 leading-snug">
                    {c.titleBn || c.title}
                  </h4>
                  {c.titleBn && c.titleBn !== c.title && (
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">{c.title}</p>
                  )}
                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2">{c.descriptionBn || c.description}</p>
                </div>

                {/* Teacher & Metadata info */}
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5 truncate">
                    <UserCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{c.facultyName || 'Subrata Acharya, M.Sc.'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{c.duration}</span>
                  </div>
                </div>

                {/* Syllabus & Visibility indicator */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${c.displayOnWebsite !== false ? 'bg-blue-50 text-blue-700 font-bold' : 'bg-neutral-100 text-neutral-400 line-through'}`}>
                      <Globe className="w-3 h-3" />
                      <span>Web</span>
                    </span>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${c.displayOnApp !== false ? 'bg-purple-50 text-purple-700 font-bold' : 'bg-neutral-100 text-neutral-400 line-through'}`}>
                      <Smartphone className="w-3 h-3" />
                      <span>App</span>
                    </span>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${c.enrollmentOpen !== false ? 'bg-emerald-50 text-emerald-700 font-bold' : 'bg-red-50 text-red-700'}`}>
                      {c.enrollmentOpen !== false ? t('ভর্তি চলছে', 'Enrollment Open') : t('ভর্তি বন্ধ', 'Closed')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(c, 'syllabus')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 hover:bg-orange-50 text-neutral-700 hover:text-[#FF9933] font-bold transition-colors"
                  >
                    <ListOrdered className="w-3 h-3" />
                    <span>{chapterCount} {t('অধ্যায়', 'Ch')} · {lessonCount} {t('পাঠ', 'Lessons')}</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-lg font-black text-neutral-900">
                    {c.isFree || c.price === 0 ? t('ফ্রি', 'FREE') : `₹${c.price}`}
                  </span>
                  {c.originalPrice > c.price && (
                    <span className="text-xs text-neutral-400 line-through ml-1.5">
                      ₹{c.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(c)}
                    className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      isPub
                        ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isPub ? t('নিষ্ক্রিয়', 'Disable') : t('সক্রিয় করুন', 'Enable')}
                  </button>

                  <button
                    onClick={() => handleArchiveToggle(c)}
                    className={`p-1.5 rounded-xl border transition-all ${
                      c.archived
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                    }`}
                    title={c.archived ? t('আন-আর্কাইভ করুন', 'Unarchive') : t('আর্কাইভ করুন', 'Archive')}
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOpenEdit(c, 'details')}
                    className="p-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                    title={t('সম্পাদনা', 'Edit Course')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {confirmDeleteId === c.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(c)}
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
                      onClick={() => setConfirmDeleteId(c.id)}
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

      {/* Course Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-xl font-black text-neutral-900">
                  {editingCourse ? t('কোর্স ও সিলেবাস সম্পাদনা', 'Edit Course & Syllabus') : t('নতুন কোর্স তৈরি করুন', 'Create New Course')}
                </h3>
                <p className="text-[11px] text-neutral-500">
                  {t('প্রোগ্রাম, বিষয়, শিক্ষক, মূল্য ও অধ্যায়-ভিত্তিক পাঠ পরিচালনা করুন', 'Configure program, subject, teacher, pricing, visibility, and chapters/lessons')}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Navigation Tabs */}
            <div className="flex gap-2 bg-neutral-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setModalSection('details')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  modalSection === 'details' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-black'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>{t('১. কোর্সের তথ্য, মূল্য ও দৃশ্যমানতা', '1. Course Details, Pricing & Visibility')}</span>
              </button>
              <button
                type="button"
                onClick={() => setModalSection('syllabus')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  modalSection === 'syllabus' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-black'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>{t(`২. অধ্যায় ও পাঠ (${syllabus.length} অধ্যায়)`, `2. Chapters & Lessons (${syllabus.length} Chapters)`)}</span>
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              {modalSection === 'details' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('কোর্সের নাম (English) *', 'Course Title (English) *')}
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g. Class 10 Madhyamik Physics Complete Batch"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('কোর্সের নাম (বাংলা)', 'Course Title (Bengali)')}
                      </label>
                      <input
                        type="text"
                        value={titleBn}
                        onChange={e => setTitleBn(e.target.value)}
                        placeholder="যেমন: মাধ্যমিক ভৌতবিজ্ঞান সম্পূর্ণ ব্যাচ ২০২৬"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>
                  </div>

                  {/* Hierarchy Assignment: Program, Subject, Teacher */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('সংযুক্ত প্রোগ্রাম *', 'Assign Program *')}
                      </label>
                      <select
                        value={programId}
                        onChange={e => setProgramId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-semibold"
                      >
                        {programs.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.nameBn})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('বিষয় নির্বাচন *', 'Assign Subject *')}
                      </label>
                      <select
                        value={subjectId}
                        onChange={e => {
                          setSubjectId(e.target.value);
                          const matchedSub = subjects.find(s => s.id === e.target.value);
                          if (matchedSub) setSubject(matchedSub.name);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-semibold"
                      >
                        {(subjects.length > 0 ? subjects : [{ id: 'sub-phy', name: 'Physics / Physical Science', code: 'PHY' } as Subject]).map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('শিক্ষক নির্বাচন *', 'Assign Teacher *')}
                      </label>
                      <select
                        value={assignedTeacherId}
                        onChange={e => {
                          setAssignedTeacherId(e.target.value);
                          const matchedT = teachers.find(tc => tc.id === e.target.value);
                          if (matchedT) setFacultyName(matchedT.name);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-semibold"
                      >
                        {(teachers.length > 0
                          ? teachers
                          : [
                              { id: 'user-teacher-subrata', name: 'Subrata Acharya, M.Sc. (Physics)' },
                              { id: 'user-suman', name: 'Suman Acharya' }
                            ]
                        ).map(tc => (
                          <option key={tc.id} value={tc.id}>
                            {tc.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Academic Mapping: Board, Medium, Class Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                        {t('বোর্ড', 'Board')}
                      </label>
                      <select
                        value={boardId}
                        onChange={e => setBoardId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                      >
                        {(boards.length > 0 ? boards : [{ id: 'board-wbbse', code: 'WBBSE', name: 'WBBSE' } as Board]).map(b => (
                          <option key={b.id} value={b.id}>{b.code}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                        {t('মাধ্যম', 'Medium')}
                      </label>
                      <select
                        value={mediumId}
                        onChange={e => setMediumId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                      >
                        {(mediums.length > 0 ? mediums : [{ id: 'med-bn', name: 'Bengali Medium' } as Medium]).map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                        {t('ক্লাস স্তর', 'Class Level')}
                      </label>
                      <select
                        value={classId}
                        onChange={e => setClassId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                      >
                        {(classLevels.length > 0 ? classLevels : [{ id: 'class-10', name: 'Class 10' } as ClassLevel]).map(cl => (
                          <option key={cl.id} value={cl.id}>{cl.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                        {t('প্রদর্শন ক্রম', 'Display Order')}
                      </label>
                      <input
                        type="number"
                        value={order}
                        onChange={e => setOrder(e.target.value)}
                        placeholder="1, 2, 3..."
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>
                  </div>

                  {/* Duration & Pricing */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('সময়কাল', 'Duration')}
                      </label>
                      <input
                        type="text"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        placeholder="e.g. 10 Months"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('বিক্রয় মূল্য (₹)', 'Selling Price (₹)')}
                      </label>
                      <input
                        type="number"
                        disabled={isFree}
                        value={isFree ? '0' : price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="1499"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933] disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('মূল মূল্য (₹)', 'Original Price (₹)')}
                      </label>
                      <input
                        type="number"
                        disabled={isFree}
                        value={isFree ? '0' : originalPrice}
                        onChange={e => setOriginalPrice(e.target.value)}
                        placeholder="2999"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933] disabled:opacity-50"
                      />
                    </div>

                    <div className="flex items-end pb-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-neutral-800 cursor-pointer bg-emerald-50 px-3 py-2.5 rounded-xl border border-emerald-200 w-full">
                        <input
                          type="checkbox"
                          checked={isFree}
                          onChange={e => setIsFree(e.target.checked)}
                          className="w-4 h-4 accent-emerald-600"
                        />
                        <span>{t('সম্পূর্ণ ফ্রি কোর্স', 'Free Course')}</span>
                      </label>
                    </div>
                  </div>

                  {/* Media URLs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('থাম্বনেইল URL', 'Thumbnail Image URL')}
                      </label>
                      <input
                        type="url"
                        value={thumbnail}
                        onChange={e => setThumbnail(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        {t('ব্যানার URL', 'Banner Image URL')}
                      </label>
                      <input
                        type="url"
                        value={banner}
                        onChange={e => setBanner(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF9933]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      {t('কোর্সের বিবরণ (English)', 'Description (English)')}
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Comprehensive course syllabus and key takeaways..."
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      {t('কোর্সের বিবরণ (বাংলা)', 'Description (Bengali)')}
                    </label>
                    <textarea
                      rows={2}
                      value={descriptionBn}
                      onChange={e => setDescriptionBn(e.target.value)}
                      placeholder="কোর্সের বিস্তারিত পাঠদান পরিকল্পনা..."
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                    />
                  </div>

                  {/* Visibility and Enrollment Settings */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                    <label className="flex items-center gap-2 text-xs font-bold text-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={published}
                        onChange={e => setPublished(e.target.checked)}
                        className="w-4 h-4 text-[#FF9933] rounded accent-[#FF9933]"
                      />
                      <span>{t('প্রকাশিত', 'Published')}</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={displayOnWebsite}
                        onChange={e => setDisplayOnWebsite(e.target.checked)}
                        className="w-4 h-4 text-[#FF9933] rounded accent-[#FF9933]"
                      />
                      <span>{t('ওয়েবসাইটে দৃশ্যমান', 'Website')}</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={displayOnApp}
                        onChange={e => setDisplayOnApp(e.target.checked)}
                        className="w-4 h-4 text-[#FF9933] rounded accent-[#FF9933]"
                      />
                      <span>{t('মোবাইলে দৃশ্যমান', 'App')}</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enrollmentOpen}
                        onChange={e => setEnrollmentOpen(e.target.checked)}
                        className="w-4 h-4 text-[#FF9933] rounded accent-[#FF9933]"
                      />
                      <span>{t('ভর্তি চালু', 'Enrollment Open')}</span>
                    </label>
                  </div>
                </>
              )}

              {/* SECTION 2: CHAPTERS & LESSONS MANAGER */}
              {modalSection === 'syllabus' && (
                <div className="space-y-4">
                  {/* Add New Chapter Bar */}
                  <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-black text-neutral-900">
                      <Sparkles className="w-4 h-4 text-[#FF9933]" />
                      <span>{t('নতুন অধ্যায় যুক্ত করুন (Add Chapter)', 'Add New Chapter to Syllabus')}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <input
                        type="text"
                        value={newChapterTitle}
                        onChange={e => setNewChapterTitle(e.target.value)}
                        placeholder="Chapter Title (English), e.g. Electrostatics"
                        className="sm:col-span-5 px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                      />
                      <input
                        type="text"
                        value={newChapterTitleBn}
                        onChange={e => setNewChapterTitleBn(e.target.value)}
                        placeholder="অধ্যায়ের নাম (বাংলা), যেমন: স্থিরতড়িৎ"
                        className="sm:col-span-5 px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddChapter}
                        className="sm:col-span-2 py-2 px-3 bg-[#FF9933] hover:bg-[#ffaa55] text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t('যুক্ত', 'Add')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Chapters Accordion List */}
                  {syllabus.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-neutral-300 rounded-2xl text-xs text-neutral-500">
                      {t('এখনো কোনো অধ্যায় যুক্ত হয়নি। উপরের ফর্ম থেকে প্রথম অধ্যায় যোগ করুন।', 'No chapters added yet. Use the form above to add your first chapter.')}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {syllabus.map((chap, cIdx) => {
                        const isExpanded = expandedChapterId === chap.id;
                        return (
                          <div key={chap.id} className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                            <div className="p-3.5 bg-neutral-50 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => setExpandedChapterId(isExpanded ? null : chap.id)}
                                className="flex items-center gap-2.5 text-left flex-1 min-w-0"
                              >
                                <span className="w-6 h-6 rounded-lg bg-[#111111] text-[#FF9933] text-[11px] font-black flex items-center justify-center shrink-0">
                                  {cIdx + 1}
                                </span>
                                <div className="min-w-0">
                                  <h5 className="text-xs font-bold text-neutral-900 truncate">
                                    {chap.titleBn || chap.title}
                                  </h5>
                                  <p className="text-[10px] text-neutral-500 truncate">
                                    {chap.title} · {chap.lessons.length} {t('টি পাঠ', 'lessons')}
                                  </p>
                                </div>
                              </button>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleMoveChapter(chap.id, 'up')}
                                  disabled={cIdx === 0}
                                  className="p-1 text-neutral-500 hover:text-black disabled:opacity-30"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveChapter(chap.id, 'down')}
                                  disabled={cIdx === syllabus.length - 1}
                                  className="p-1 text-neutral-500 hover:text-black disabled:opacity-30"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteChapter(chap.id)}
                                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setExpandedChapterId(isExpanded ? null : chap.id)}
                                  className="p-1 text-neutral-600"
                                >
                                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="p-3.5 space-y-3 border-t border-neutral-100">
                                {/* Existing Lessons */}
                                {chap.lessons.length > 0 && (
                                  <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-xl overflow-hidden">
                                    {chap.lessons.map((les, lIdx) => (
                                      <div key={les.id} className="p-2.5 bg-white flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                          <Play className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                                          <div className="min-w-0">
                                            <p className="font-bold text-neutral-800 truncate">
                                              {lIdx + 1}. {les.titleBn || les.title}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                                              <span>{les.duration}</span>
                                              {les.hasNotes && (
                                                <span className="inline-flex items-center gap-0.5 text-blue-600">
                                                  <FileText className="w-2.5 h-2.5" /> Notes
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 shrink-0">
                                          <button
                                            type="button"
                                            onClick={() => handleToggleLessonPreview(chap.id, les.id)}
                                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                              les.isFreePreview
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-neutral-100 text-neutral-500'
                                            }`}
                                          >
                                            {les.isFreePreview ? t('ফ্রি প্রিভিউ', 'Free Preview') : t('পেইড', 'Enrolled Only')}
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteLesson(chap.id, les.id)}
                                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Add Lesson Mini Form */}
                                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-2">
                                  <p className="text-[11px] font-bold text-neutral-700">
                                    {t('এই অধ্যায়ে নতুন পাঠ (Lesson) যোগ করুন', 'Add Lesson to this Chapter')}
                                  </p>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input
                                      type="text"
                                      value={lessonDraftTitle}
                                      onChange={e => setLessonDraftTitle(e.target.value)}
                                      placeholder="Lesson title (EN)"
                                      className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white"
                                    />
                                    <input
                                      type="text"
                                      value={lessonDraftTitleBn}
                                      onChange={e => setLessonDraftTitleBn(e.target.value)}
                                      placeholder="পাঠের নাম (বাংলা)"
                                      className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white"
                                    />
                                    <input
                                      type="text"
                                      value={lessonDraftDuration}
                                      onChange={e => setLessonDraftDuration(e.target.value)}
                                      placeholder="45 min"
                                      className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white"
                                    />
                                  </div>
                                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                                    <div className="flex items-center gap-3 text-[11px]">
                                      <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-neutral-700">
                                        <input
                                          type="checkbox"
                                          checked={lessonDraftFreePreview}
                                          onChange={e => setLessonDraftFreePreview(e.target.checked)}
                                          className="accent-[#FF9933]"
                                        />
                                        <span>{t('ফ্রি প্রিভিউ', 'Free Preview')}</span>
                                      </label>
                                      <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-neutral-700">
                                        <input
                                          type="checkbox"
                                          checked={lessonDraftHasNotes}
                                          onChange={e => setLessonDraftHasNotes(e.target.checked)}
                                          className="accent-[#FF9933]"
                                        />
                                        <span>{t('পিডিএফ নোটস', 'Has Notes')}</span>
                                      </label>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleAddLesson(chap.id)}
                                      className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white font-bold text-[11px] rounded-lg flex items-center gap-1"
                                    >
                                      <Plus className="w-3 h-3" />
                                      <span>{t('পাঠ যোগ করুন', 'Add Lesson')}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

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
                  {t('কোর্স ও সিলেবাস সংরক্ষণ করুন', 'Save Course & Syllabus')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
