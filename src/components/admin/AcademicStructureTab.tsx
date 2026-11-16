import React, { useState, useEffect } from 'react';
import { Board, Medium, ClassLevel, Subject } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  BookOpen,
  Globe,
  GraduationCap,
  Atom,
  ArrowRight,
  Filter,
  Check,
  Search,
  Sparkles,
  ChevronRight,
  FolderTree
} from 'lucide-react';

export const AcademicStructureTab: React.FC = () => {
  const { t } = useLanguage();
  const [subTab, setSubTab] = useState<'boards' | 'mediums' | 'classes' | 'subjects' | 'chapters' | 'levels'>('boards');

  // Data states
  const [boards, setBoards] = useState<Board[]>([]);
  const [mediums, setMediums] = useState<Medium[]>([]);
  const [classes, setClasses] = useState<ClassLevel[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  // New Board modal/form
  const [boardCode, setBoardCode] = useState('');
  const [boardName, setBoardName] = useState('');
  const [boardNameBn, setBoardNameBn] = useState('');
  const [boardDesc, setBoardDesc] = useState('');

  // New Medium form
  const [medCode, setMedCode] = useState('');
  const [medName, setMedName] = useState('');
  const [medNameBn, setMedNameBn] = useState('');

  // New Class form
  const [clsCode, setClsCode] = useState('');
  const [clsName, setClsName] = useState('');
  const [clsNameBn, setClsNameBn] = useState('');
  const [clsBoardId, setClsBoardId] = useState('');

  // New Subject form
  const [subCode, setSubCode] = useState('');
  const [subName, setSubName] = useState('');
  const [subNameBn, setSubNameBn] = useState('');
  const [subDesc, setSubDesc] = useState('');

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [b, m, c, s] = await Promise.all([
        api.getBoards(),
        api.getMediums(),
        api.getClasses(),
        api.getSubjects()
      ]);
      setBoards(b || []);
      setMediums(m || []);
      setClasses(c || []);
      setSubjects(s || []);
      if (b && b.length > 0 && !clsBoardId) {
        setClsBoardId(b[0].id);
      }
    } catch (err) {
      console.error('Failed to load academic data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardCode || !boardName) return;
    try {
      const res = await api.addBoard({
        code: boardCode.toUpperCase(),
        name: boardName,
        nameBn: boardNameBn || boardName,
        description: boardDesc
      });
      setBoards(res);
      setBoardCode('');
      setBoardName('');
      setBoardNameBn('');
      setBoardDesc('');
      showToast(t('বোর্ড সফলভাবে যুক্ত হয়েছে!', 'Board added successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBoard = async (id: string) => {
    try {
      const res = await api.deleteBoard(id);
      setBoards(res);
      setConfirmDeleteId(null);
      showToast(t('বোর্ড মুছে ফেলা হয়েছে।', 'Board deleted.'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMedium = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medCode || !medName) return;
    try {
      const res = await api.addMedium({
        code: medCode.toUpperCase(),
        name: medName,
        nameBn: medNameBn || medName
      });
      setMediums(res);
      setMedCode('');
      setMedName('');
      setMedNameBn('');
      showToast(t('মাধ্যম সফলভাবে যুক্ত হয়েছে!', 'Medium added successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMedium = async (id: string) => {
    try {
      const res = await api.deleteMedium(id);
      setMediums(res);
      setConfirmDeleteId(null);
      showToast(t('মাধ্যম মুছে ফেলা হয়েছে।', 'Medium deleted.'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clsName || !clsBoardId) return;
    try {
      const res = await api.addClass({
        code: clsCode || clsName.replace(/\D/g, '') || '10',
        name: clsName,
        nameBn: clsNameBn || clsName,
        boardId: clsBoardId
      });
      setClasses(res);
      setClsCode('');
      setClsName('');
      setClsNameBn('');
      showToast(t('ক্লাস স্তর সফলভাবে যুক্ত হয়েছে!', 'Class level added successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClass = async (id: string) => {
    try {
      const res = await api.deleteClass(id);
      setClasses(res);
      setConfirmDeleteId(null);
      showToast(t('ক্লাস স্তর মুছে ফেলা হয়েছে।', 'Class level deleted.'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName || !subCode) return;
    try {
      const res = await api.addSubject({
        code: subCode.toUpperCase(),
        name: subName,
        nameBn: subNameBn || subName,
        description: subDesc,
        descriptionBn: subDesc,
        icon: 'BookOpen'
      });
      setSubjects(res);
      setSubCode('');
      setSubName('');
      setSubNameBn('');
      setSubDesc('');
      showToast(t('বিষয় সফলভাবে যুক্ত হয়েছে!', 'Subject added successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      const res = await api.deleteSubject(id);
      setSubjects(res);
      setConfirmDeleteId(null);
      showToast(t('বিষয় মুছে ফেলা হয়েছে।', 'Subject deleted.'));
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
      {/* Dynamic Academic Hierarchy Strip */}
      <div className="bg-neutral-900 text-white p-5 rounded-2xl border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#FF9933]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#FF9933]">
              Dynamic Academic Hierarchy Engine
            </span>
          </div>
          <span className="text-[10px] text-neutral-400">Section 03 CMS Control</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-bold py-1">
          <span className="bg-orange-500/20 text-[#FF9933] border border-orange-500/30 px-2.5 py-1 rounded-lg shrink-0">
            Program / Board
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-lg shrink-0">Medium</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-lg shrink-0">Class</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-lg shrink-0">Subject</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-lg shrink-0">Course</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-lg shrink-0">Chapter</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-lg shrink-0">Topic</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded-lg shrink-0">Lesson</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg shrink-0">
            Assessment
          </span>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex gap-2 border-b border-neutral-200 pb-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'boards', labelBn: 'শিক্ষা বোর্ডসমূহ (Boards)', labelEn: 'Boards', icon: Globe },
          { id: 'mediums', labelBn: 'ভাষা মাধ্যম (Mediums)', labelEn: 'Mediums', icon: Layers },
          { id: 'classes', labelBn: 'ক্লাস স্তর (Classes)', labelEn: 'Classes', icon: GraduationCap },
          { id: 'subjects', labelBn: 'বিষয়সমূহ (Subjects)', labelEn: 'Subjects', icon: Atom },
          { id: 'chapters', labelBn: 'অধ্যায় ও সিলেবাস নোড', labelEn: 'Chapters & Topics', icon: BookOpen },
          { id: 'levels', labelBn: 'কঠিনতা ও প্রশ্ন ক্যাটাগরি', labelEn: 'Difficulty & Categories', icon: Filter }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                subTab === item.id
                  ? 'bg-neutral-900 text-white font-extrabold shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>{t(item.labelBn, item.labelEn)}</span>
            </button>
          );
        })}
      </div>

      {/* 1. BOARDS MANAGER */}
      {subTab === 'boards' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#FF9933]" />
              <span>{t('নতুন বোর্ড যুক্ত করুন', 'Add New Educational Board')}</span>
            </h4>
            <form onSubmit={handleAddBoard} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বোর্ড কোড (e.g. CBSE, WBBSE) *', 'Board Code *')}
                </label>
                <input
                  type="text"
                  required
                  value={boardCode}
                  onChange={e => setBoardCode(e.target.value)}
                  placeholder="e.g. CBSE"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বোর্ডের পুরো নাম (English) *', 'Full Board Name (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={boardName}
                  onChange={e => setBoardName(e.target.value)}
                  placeholder="e.g. Central Board of Secondary Education"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বোর্ডের নাম (বাংলা)', 'Board Name (Bengali)')}
                </label>
                <input
                  type="text"
                  value={boardNameBn}
                  onChange={e => setBoardNameBn(e.target.value)}
                  placeholder="e.g. সিবিএসই বোর্ড"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বিবরণ', 'Description')}
                </label>
                <textarea
                  rows={2}
                  value={boardDesc}
                  onChange={e => setBoardDesc(e.target.value)}
                  placeholder="Curriculum details..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
              >
                {t('বোর্ড সংরক্ষণ করুন', 'Create Board')}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center justify-between">
              <span>{t('বর্তমান শিক্ষা বোর্ডসমূহ', 'Active Educational Boards')} ({boards.length})</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {boards.map(b => (
                <div key={b.id} className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-black text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded">
                        {b.code}
                      </span>
                      {confirmDeleteId === b.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeleteBoard(b.id)}
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
                          onClick={() => setConfirmDeleteId(b.id)}
                          className="text-neutral-400 hover:text-red-500 p-1"
                          title="Delete board"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-neutral-900">{b.name}</h5>
                    <p className="text-[11px] text-neutral-500">{b.nameBn}</p>
                    {b.description && (
                      <p className="text-[10px] text-neutral-400 mt-1">{b.description}</p>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MEDIUMS MANAGER */}
      {subTab === 'mediums' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#FF9933]" />
              <span>{t('নতুন মাধ্যম যুক্ত করুন', 'Add Medium')}</span>
            </h4>
            <form onSubmit={handleAddMedium} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('মাধ্যম কোড (e.g. BN, EN) *', 'Medium Code *')}
                </label>
                <input
                  type="text"
                  required
                  value={medCode}
                  onChange={e => setMedCode(e.target.value)}
                  placeholder="e.g. BN"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('মাধ্যমের নাম (English) *', 'Medium Name (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={medName}
                  onChange={e => setMedName(e.target.value)}
                  placeholder="Bengali Medium"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('মাধ্যমের নাম (বাংলা)', 'Medium Name (Bengali)')}
                </label>
                <input
                  type="text"
                  value={medNameBn}
                  onChange={e => setMedNameBn(e.target.value)}
                  placeholder="বাংলা মাধ্যম"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
              >
                {t('মাধ্যম যুক্ত করুন', 'Add Medium')}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-neutral-900">
              {t('সক্রিয় ভাষা মাধ্যমসমূহ', 'Configured Mediums')} ({mediums.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mediums.map(m => (
                <div key={m.id} className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#FF9933]">{m.code}</span>
                    <h5 className="text-xs font-bold text-neutral-900 mt-0.5">{m.name}</h5>
                    <p className="text-[11px] text-neutral-500">{m.nameBn}</p>
                  </div>
                  {confirmDeleteId === m.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteMedium(m.id)}
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
                      onClick={() => setConfirmDeleteId(m.id)}
                      className="text-neutral-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. CLASSES MANAGER */}
      {subTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#FF9933]" />
              <span>{t('নতুন ক্লাস স্তর যুক্ত করুন', 'Add Class Level')}</span>
            </h4>
            <form onSubmit={handleAddClass} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('শিক্ষা বোর্ড নির্বাচন করুন *', 'Select Board *')}
                </label>
                <select
                  value={clsBoardId}
                  onChange={e => setClsBoardId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                >
                  {boards.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.code} — {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('ক্লাসের নাম (English) *', 'Class Name (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={clsName}
                  onChange={e => setClsName(e.target.value)}
                  placeholder="Class 10 (Madhyamik)"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('ক্লাসের নাম (বাংলা)', 'Class Name (Bengali)')}
                </label>
                <input
                  type="text"
                  value={clsNameBn}
                  onChange={e => setClsNameBn(e.target.value)}
                  placeholder="দশম শ্রেণী (মাধ্যমিক)"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
              >
                {t('ক্লাস সংরক্ষণ করুন', 'Save Class Level')}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-neutral-900">
              {t('সকল ক্লাস স্তরসমূহ', 'Configured Classes')} ({classes.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {classes.map(c => {
                const b = boards.find(b => b.id === c.boardId);
                return (
                  <div key={c.id} className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        {b?.code || 'BOARD'}
                      </span>
                      <h5 className="text-xs font-bold text-neutral-900 mt-1">{c.name}</h5>
                      <p className="text-[11px] text-neutral-500">{c.nameBn}</p>
                    </div>
                    {confirmDeleteId === c.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteClass(c.id)}
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
                        onClick={() => setConfirmDeleteId(c.id)}
                        className="text-neutral-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. SUBJECTS MANAGER */}
      {subTab === 'subjects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#FF9933]" />
              <span>{t('নতুন বিষয় যুক্ত করুন', 'Add Academic Subject')}</span>
            </h4>
            <form onSubmit={handleAddSubject} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বিষয় কোড (e.g. PHY, MATH) *', 'Subject Code *')}
                </label>
                <input
                  type="text"
                  required
                  value={subCode}
                  onChange={e => setSubCode(e.target.value)}
                  placeholder="e.g. PHY"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বিষয়ের নাম (English) *', 'Subject Name (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={subName}
                  onChange={e => setSubName(e.target.value)}
                  placeholder="Physics / Physical Science"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বিষয়ের নাম (বাংলা)', 'Subject Name (Bengali)')}
                </label>
                <input
                  type="text"
                  value={subNameBn}
                  onChange={e => setSubNameBn(e.target.value)}
                  placeholder="পদার্থবিজ্ঞান / ভৌতবিজ্ঞান"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('বিবরণ ও কভার করা অধ্যায়', 'Description')}
                </label>
                <textarea
                  rows={2}
                  value={subDesc}
                  onChange={e => setSubDesc(e.target.value)}
                  placeholder="Mechanics, Optics, Electrodynamics..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
              >
                {t('বিষয় সংরক্ষণ করুন', 'Create Subject')}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-neutral-900">
              {t('বিদ্যমান বিষয়সমূহ', 'Configured Subjects')} ({subjects.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subjects.map(s => (
                <div key={s.id} className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded">
                      {s.code}
                    </span>
                    {confirmDeleteId === s.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteSubject(s.id)}
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
                        onClick={() => setConfirmDeleteId(s.id)}
                        className="text-neutral-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900">{s.name}</h5>
                    <p className="text-[11px] text-neutral-500">{s.nameBn}</p>
                    {s.description && (
                      <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2">{s.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. CHAPTERS & TOPICS */}
      {subTab === 'chapters' && (
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-neutral-900">
            {t('পাঠ্যসূচী অধ্যায় ও সিলেবাস নোড ম্যানেজমেন্ট', 'Curriculum Chapters & Syllabus Nodes')}
          </h4>
          <p className="text-xs text-neutral-500">
            {t('পদার্থবিজ্ঞানের মূল অধ্যায়সমূহ প্রতিটি কোর্সে স্বয়ংক্রিয়ভাবে মডিউল, টপিক ও লেকচারে বিভক্ত থাকে।', 'Chapters connect to Courses, each holding Topics, Lessons, and Assessments.')}
          </p>

          <div className="divide-y divide-neutral-100 text-xs">
            {[
              { id: 'ch-1', title: 'Current Electricity (চলতড়িৎ)', topics: '8 Topics · 12 Lessons · 2 Quizzes', level: 'Class 10 & 12', subject: 'Physics' },
              { id: 'ch-2', title: 'Optics & Light (আলোকবিজ্ঞান)', topics: '10 Topics · 15 Lessons · 3 Quizzes', level: 'Class 10 & 12', subject: 'Physics' },
              { id: 'ch-3', title: 'Behavior of Gases (গ্যাসের আচরণ)', topics: '5 Topics · 8 Lessons · 1 Quiz', level: 'Class 10', subject: 'Physical Science' },
              { id: 'ch-4', title: 'Kinematics & Vectors (গতিবিদ্যা ও ভেক্টর)', topics: '12 Topics · 18 Lessons · 4 Tests', level: 'Class 11 & JEE', subject: 'Physics' },
              { id: 'ch-5', title: 'Newton Laws & Mechanics (বল ও গতি)', topics: '14 Topics · 20 Lessons · 5 Tests', level: 'Class 9 & 11', subject: 'Physics' }
            ].map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-neutral-900">{item.title}</h5>
                  <p className="text-[11px] text-neutral-500">{item.topics} • {item.level} • {item.subject}</p>
                </div>
                <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-lg">
                  Configured Node
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. DIFFICULTY & CATEGORIES */}
      {subTab === 'levels' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3 text-xs">
            <h4 className="text-sm font-bold text-neutral-900">Difficulty Levels</h4>
            <div className="space-y-2">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-700">Easy (সহজ)</span>
                  <p className="text-[11px] text-neutral-500">Formula recall & direct definitions</p>
                </div>
                <span className="font-mono text-[10px]">1-2 Marks</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-700">Medium (মধ্যম)</span>
                  <p className="text-[11px] text-neutral-500">Multi-step numerical problem solving</p>
                </div>
                <span className="font-mono text-[10px]">3-4 Marks</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-red-700">Hard (কঠিন)</span>
                  <p className="text-[11px] text-neutral-500">JEE Advanced & Olympiad analytical logic</p>
                </div>
                <span className="font-mono text-[10px]">4-5 Marks</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3 text-xs">
            <h4 className="text-sm font-bold text-neutral-900">Question Types & Evaluation</h4>
            <div className="space-y-2">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900">Multiple Choice (MCQ)</span>
                <p className="text-[11px] text-neutral-500">4 options, single correct, optional negative marking</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900">Numerical Value</span>
                <p className="text-[11px] text-neutral-500">Integer/decimal input with configurable error tolerance</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900">True / False</span>
                <p className="text-[11px] text-neutral-500">Conceptual assertions with complete step-by-step reasoning</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
