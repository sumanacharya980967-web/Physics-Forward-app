import React, { useState } from 'react';
import { Program } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Layers,
  Plus,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Check,
  Search,
  BookOpen,
  DollarSign,
  Clock,
  Tag,
  ArrowUp,
  ArrowDown,
  Archive,
  Globe,
  Smartphone,
  GraduationCap,
  Award,
  Stethoscope,
  Compass,
  Sparkles,
  Atom,
  Image as ImageIcon
} from 'lucide-react';

interface ProgramsTabProps {
  programs: Program[];
  onRefreshData?: () => void;
}

export const ProgramsTab: React.FC<ProgramsTabProps> = ({
  programs = [],
  onRefreshData
}) => {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [code, setCode] = useState('');
  const [tagline, setTagline] = useState('');
  const [taglineBn, setTaglineBn] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [category, setCategory] = useState<'competitive' | 'foundation' | 'school' | 'other'>('competitive');
  const [subject, setSubject] = useState('Physics');
  const [badge, setBadge] = useState('');
  const [duration, setDuration] = useState('12 Months');
  const [basePrice, setBasePrice] = useState('2499');
  const [accentColor, setAccentColor] = useState('#FF9933');
  const [icon, setIcon] = useState('GraduationCap');
  const [imageUrl, setImageUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [flowPath, setFlowPath] = useState('');
  const [order, setOrder] = useState('1');
  const [eligibility, setEligibility] = useState('');
  const [eligibilityBn, setEligibilityBn] = useState('');
  const [displayOnWebsite, setDisplayOnWebsite] = useState(true);
  const [displayOnApp, setDisplayOnApp] = useState(true);
  const [active, setActive] = useState(true);
  const [archived, setArchived] = useState(false);
  const [includedFeatures, setIncludedFeatures] = useState(
    'Concept classes, Problem-solving classes, Live classes, Recorded lectures, Practice questions, Mock tests, PYQs, Performance tracking, Study materials'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const resetForm = () => {
    setEditingProgram(null);
    setName('');
    setNameBn('');
    setCode('');
    setTagline('');
    setTaglineBn('');
    setDescription('');
    setDescriptionBn('');
    setCategory('competitive');
    setSubject('Physics');
    setBadge('');
    setDuration('12 Months');
    setBasePrice('2499');
    setAccentColor('#FF9933');
    setIcon('GraduationCap');
    setImageUrl('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80');
    setBannerUrl('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80');
    setThumbnailUrl('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80');
    setFlowPath('');
    setOrder((programs.length + 1).toString());
    setEligibility('');
    setEligibilityBn('');
    setDisplayOnWebsite(true);
    setDisplayOnApp(true);
    setActive(true);
    setArchived(false);
    setIncludedFeatures(
      'Concept classes, Problem-solving classes, Live classes, Recorded lectures, Practice questions, Mock tests, PYQs, Performance tracking, Study materials'
    );
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (p: Program) => {
    setEditingProgram(p);
    setName(p.name);
    setNameBn(p.nameBn || p.name);
    setCode(p.code);
    setTagline(p.tagline || '');
    setTaglineBn(p.taglineBn || '');
    setDescription(p.description || '');
    setDescriptionBn(p.descriptionBn || '');
    setCategory(p.category || 'competitive');
    setSubject(p.subject || 'Physics');
    setBadge(p.badge || '');
    setDuration(p.duration || '12 Months');
    setBasePrice(p.basePrice?.toString() || '1999');
    setAccentColor(p.accentColor || '#FF9933');
    setIcon(p.icon || 'GraduationCap');
    setImageUrl(p.imageUrl || '');
    setBannerUrl(p.bannerUrl || '');
    setThumbnailUrl(p.thumbnailUrl || p.imageUrl || '');
    setFlowPath(p.flowPath || '');
    setOrder((p.order || 1).toString());
    setEligibility(p.eligibility || '');
    setEligibilityBn(p.eligibilityBn || '');
    setDisplayOnWebsite(p.displayOnWebsite !== false);
    setDisplayOnApp(p.displayOnApp !== false);
    setActive(p.active);
    setArchived(p.archived || false);
    setIncludedFeatures(
      p.features && p.features.length > 0
        ? p.features.join(', ')
        : (p.includedItems || []).join(', ')
    );
    setShowModal(true);
  };

  const handleToggleActive = async (p: Program) => {
    try {
      await api.toggleProgramActive(p.id);
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to toggle program status:', err);
    }
  };

  const handleArchiveToggle = async (p: Program) => {
    try {
      await api.archiveProgram(p.id);
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to archive/unarchive program:', err);
    }
  };

  const handleMoveOrder = async (p: Program, direction: 'up' | 'down') => {
    const sorted = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));
    const currIndex = sorted.findIndex(item => item.id === p.id);
    if (currIndex === -1) return;
    if (direction === 'up' && currIndex === 0) return;
    if (direction === 'down' && currIndex === sorted.length - 1) return;

    const targetIndex = direction === 'up' ? currIndex - 1 : currIndex + 1;
    const temp = sorted[currIndex];
    sorted[currIndex] = sorted[targetIndex];
    sorted[targetIndex] = temp;

    const orderedIds = sorted.map(item => item.id);
    try {
      await api.reorderPrograms(orderedIds);
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to reorder programs:', err);
    }
  };

  const handleDelete = async (p: Program) => {
    try {
      await api.deleteProgram(p.id);
      setConfirmDeleteId(null);
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to delete program:', err);
    }
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const featureList = includedFeatures
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const resolvedSubject = subject.trim() || 'Physics';
    const resolvedImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80';

    const programData: Partial<Program> = {
      id: editingProgram ? editingProgram.id : 'prog-' + (code ? code.toLowerCase() : Date.now()),
      code: code ? code.toLowerCase() : name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: name.trim(),
      nameBn: nameBn.trim() || name.trim(),
      tagline: tagline.trim(),
      taglineBn: taglineBn.trim() || tagline.trim(),
      description: description.trim(),
      descriptionBn: descriptionBn.trim() || description.trim(),
      subject: resolvedSubject,
      category,
      badge: badge.trim() || name.trim(),
      badgeBn: nameBn.trim() || name.trim(),
      duration: duration.trim(),
      basePrice: parseInt(basePrice, 10) || 1999,
      accentColor,
      icon,
      imageUrl: resolvedImage,
      bannerUrl: bannerUrl.trim() || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: thumbnailUrl.trim() || resolvedImage,
      order: parseInt(order, 10) || programs.length + 1,
      eligibility: eligibility.trim(),
      eligibilityBn: eligibilityBn.trim() || eligibility.trim(),
      displayOnWebsite,
      displayOnApp,
      active,
      archived,
      features: featureList,
      featuresBn: featureList,
      includedItems: featureList,
      includedItemsBn: featureList,
      flowPath: flowPath.trim() || `${name.trim()} → ${resolvedSubject} → Courses → Chapters → Lessons → Tests`
    };

    try {
      await api.saveProgram(programData);
      setShowModal(false);
      resetForm();
      showToast(t('প্রোগ্রাম সংরক্ষিত হয়েছে!', 'Program saved successfully!'));
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to save program:', err);
    }
  };

  const sortedPrograms = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));

  const filteredPrograms = sortedPrograms.filter(p => {
    let matchesStatus = true;
    if (filterStatus === 'active') matchesStatus = p.active && !p.archived;
    if (filterStatus === 'inactive') matchesStatus = !p.active && !p.archived;
    if (filterStatus === 'archived') matchesStatus = !!p.archived;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(q) ||
      (p.nameBn && p.nameBn.toLowerCase().includes(q)) ||
      p.code.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const activeCount = programs.filter(p => p.active && !p.archived).length;
  const inactiveCount = programs.filter(p => !p.active && !p.archived).length;
  const archivedCount = programs.filter(p => p.archived).length;

  const renderIconBadge = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'graduationcap': return <GraduationCap className="w-4 h-4 text-[#FF9933]" />;
      case 'bookopen': return <BookOpen className="w-4 h-4 text-[#FF9933]" />;
      case 'layers': return <Layers className="w-4 h-4 text-[#FF9933]" />;
      case 'award': return <Award className="w-4 h-4 text-[#FF9933]" />;
      case 'stethoscope': return <Stethoscope className="w-4 h-4 text-[#FF9933]" />;
      case 'compass': return <Compass className="w-4 h-4 text-[#FF9933]" />;
      case 'sparkles': return <Sparkles className="w-4 h-4 text-[#FF9933]" />;
      case 'atom': return <Atom className="w-4 h-4 text-[#FF9933]" />;
      default: return <GraduationCap className="w-4 h-4 text-[#FF9933]" />;
    }
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold shadow-xl border border-neutral-700 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
          <span>{toastMsg}</span>
        </div>
      )}
      {/* Top Banner & Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {t('মোট প্রোগ্রাম', 'Total Programs')}
            </p>
            <p className="text-2xl font-black text-neutral-900 mt-1">{programs.length}</p>
          </div>
          <div className="p-3 bg-neutral-100 rounded-xl text-neutral-700">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              {t('সক্রিয় প্রোগ্রাম', 'Active Programs')}
            </p>
            <p className="text-2xl font-black text-emerald-700 mt-1">{activeCount}</p>
            <span className="text-[10px] text-neutral-400">
              {t('ছাত্রছাত্রীদের কাছে দৃশ্যমান', 'Live on Website/App')}
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {t('নিষ্ক্রিয় / ড্রাফট', 'Inactive / Draft')}
            </p>
            <p className="text-2xl font-black text-neutral-600 mt-1">{inactiveCount}</p>
            <span className="text-[10px] text-neutral-400">
              {t('শিক্ষার্থীদের কাছে লুকানো', 'Hidden from Students')}
            </span>
          </div>
          <div className="p-3 bg-neutral-100 rounded-xl text-neutral-500">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              {t('আর্কাইভ করা', 'Archived')}
            </p>
            <p className="text-2xl font-black text-amber-700 mt-1">{archivedCount}</p>
            <span className="text-[10px] text-neutral-400">
              {t('সংরক্ষিত রেকর্ড', 'Archived Record')}
            </span>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Archive className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex bg-neutral-100 p-1 rounded-xl text-xs font-bold shrink-0">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'all'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t('সকল', 'All')} ({programs.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'active'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t('সক্রিয়', 'Active')} ({activeCount})
            </button>
            <button
              onClick={() => setFilterStatus('inactive')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'inactive'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t('নিষ্ক্রিয়', 'Inactive')} ({inactiveCount})
            </button>
            <button
              onClick={() => setFilterStatus('archived')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'archived'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t('আর্কাইভ', 'Archived')} ({archivedCount})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('প্রোগ্রাম খুঁজুন...', 'Search programs...')}
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#FF9933]"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{t('নতুন প্রোগ্রাম তৈরি', 'Add New Program')}</span>
          </button>
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPrograms.map((prog, idx) => (
          <div
            key={prog.id}
            className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs flex flex-col justify-between overflow-hidden ${
              prog.active && !prog.archived
                ? 'border-neutral-200 hover:border-[#FF9933]'
                : prog.archived
                ? 'border-amber-200 bg-amber-50/20 opacity-80'
                : 'border-neutral-200 opacity-70 bg-neutral-50/50'
            }`}
          >
            <div className="p-6 space-y-4">
              {/* Header Badges & Reorder Controls */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-neutral-100 flex items-center justify-center">
                    {renderIconBadge(prog.icon)}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
                    style={{
                      backgroundColor: `${prog.accentColor || '#FF9933'}20`,
                      color: prog.accentColor || '#FF9933'
                    }}
                  >
                    {prog.badge || prog.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                    {prog.code}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                    #{prog.order || idx + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-0.5 bg-neutral-100 p-0.5 rounded-lg">
                    <button
                      onClick={() => handleMoveOrder(prog, 'up')}
                      disabled={idx === 0}
                      className="p-1 text-neutral-600 hover:text-black hover:bg-white rounded disabled:opacity-30 transition-all"
                      title={t('উপরে সরান', 'Move Up')}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(prog, 'down')}
                      disabled={idx === filteredPrograms.length - 1}
                      className="p-1 text-neutral-600 hover:text-black hover:bg-white rounded disabled:opacity-30 transition-all"
                      title={t('নিচে সরান', 'Move Down')}
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      prog.archived
                        ? 'bg-amber-100 text-amber-800'
                        : prog.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {prog.archived ? (
                      <>
                        <Archive className="w-3.5 h-3.5" />
                        <span>{t('আর্কাইভ', 'Archived')}</span>
                      </>
                    ) : prog.active ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t('সক্রিয়', 'Active')}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{t('নিষ্ক্রিয়', 'Inactive')}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-black text-neutral-900 flex items-center gap-2">
                  <span>{prog.name}</span>
                  {prog.nameBn && prog.nameBn !== prog.name && (
                    <span className="text-sm font-semibold text-neutral-500">
                      ({prog.nameBn})
                    </span>
                  )}
                </h3>
                <p className="text-xs text-[#FF9933] font-semibold mt-0.5">
                  {prog.taglineBn || prog.tagline}
                </p>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                  {prog.descriptionBn || prog.description}
                </p>
              </div>

              {/* Academic Hierarchy Flow Path */}
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-[11px] space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF9933] block">
                  {t('হায়ারার্কি পথ:', 'Academic Hierarchy:')}
                </span>
                <p className="font-mono text-neutral-700 truncate" title={prog.flowPath}>
                  {prog.flowPath || `${prog.name} → Physics → Courses → Chapters → Lessons → Tests`}
                </p>
              </div>

              {/* Program Meta & Visibility Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 text-xs">
                <div className="flex items-center gap-1.5 text-neutral-600">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{prog.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-900 font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>₹{prog.basePrice}</span>
                </div>
              </div>

              {/* Visibility Channels */}
              <div className="flex items-center gap-3 pt-2 text-[11px] text-neutral-500">
                <span className="font-semibold text-neutral-400">{t('দৃশ্যমানতা:', 'Visible on:')}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${prog.displayOnWebsite !== false ? 'bg-blue-50 text-blue-700 font-bold' : 'bg-neutral-100 text-neutral-400 line-through'}`}>
                  <Globe className="w-3 h-3" />
                  <span>Website</span>
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${prog.displayOnApp !== false ? 'bg-purple-50 text-purple-700 font-bold' : 'bg-neutral-100 text-neutral-400 line-through'}`}>
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile App</span>
                </span>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(prog)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                    prog.active
                      ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {prog.active ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{t('নিষ্ক্রিয় করুন', 'Deactivate')}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('সক্রিয় করুন', 'Activate')}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleArchiveToggle(prog)}
                  className={`p-1.5 rounded-xl border transition-all ${
                    prog.archived
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100'
                  }`}
                  title={prog.archived ? t('আন-আর্কাইভ করুন', 'Unarchive') : t('আর্কাইভ করুন', 'Archive')}
                >
                  <Archive className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(prog)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 font-bold text-xs hover:bg-neutral-100 transition-all flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{t('সম্পাদনা', 'Edit')}</span>
                </button>
                {confirmDeleteId === prog.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(prog)}
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
                    onClick={() => setConfirmDeleteId(prog.id)}
                    className="p-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-all"
                    title={t('মুছুন', 'Delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Program Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-xl font-black text-neutral-900">
                {editingProgram
                  ? t('প্রোগ্রাম সম্পাদনা করুন', 'Edit Academic Program')
                  : t('নতুন একাডেমিক প্রোগ্রাম তৈরি করুন', 'Create New Academic Program')}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('প্রোগ্রামের নাম (English) *', 'Program Name (English) *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. JEE Mains, NEET, Foundation, Class 10"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('প্রোগ্রামের নাম (বাংলা)', 'Program Name (Bengali)')}
                  </label>
                  <input
                    type="text"
                    value={nameBn}
                    onChange={e => setNameBn(e.target.value)}
                    placeholder="যেমন: জেইই মেইনস, নিট, দশম শ্রেণী"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('প্রোগ্রাম কোড (ID)', 'Program Code / ID')}
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="e.g. jee-mains, class-10"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('ক্যাটাগরি', 'Category')}
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-semibold"
                  >
                    <option value="competitive">Competitive (JEE / NEET)</option>
                    <option value="foundation">Foundation</option>
                    <option value="school">School / Board</option>
                    <option value="other">Other / Future Category</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('প্রদর্শন ক্রম (Order)', 'Display Order')}
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={e => setOrder(e.target.value)}
                    placeholder="1, 2, 3..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('আইকন (Icon)', 'Program Icon')}
                  </label>
                  <select
                    value={icon}
                    onChange={e => setIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-semibold"
                  >
                    <option value="GraduationCap">GraduationCap (Academic / School)</option>
                    <option value="BookOpen">BookOpen (Board / Core)</option>
                    <option value="Layers">Layers (Class 11 / Higher Secondary)</option>
                    <option value="Award">Award (Class 12 / Rankers)</option>
                    <option value="Stethoscope">Stethoscope (NEET / Medical)</option>
                    <option value="Compass">Compass (JEE / Engineering)</option>
                    <option value="Sparkles">Sparkles (Foundation / Conceptual)</option>
                    <option value="Atom">Atom (Physics)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('ব্যাজ টেক্সট', 'Badge Label')}
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={e => setBadge(e.target.value)}
                    placeholder="e.g. JEE MAIN 2026, Madhyamik Core"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('ট্যাগলাইন (English)', 'Tagline (English)')}
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    placeholder="e.g. Targeted Physics mastery for JEE Main"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('ট্যাগলাইন (বাংলা)', 'Tagline (Bengali)')}
                  </label>
                  <input
                    type="text"
                    value={taglineBn}
                    onChange={e => setTaglineBn(e.target.value)}
                    placeholder="যেমন: জেইই মেইনের জন্য বিশেষ পদার্থবিজ্ঞান প্রস্তুতি"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('বিস্তারিত বিবরণ (Description)', 'Description')}
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Program overview and learning objectives..."
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              {/* Image, Thumbnail & Banner URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('ইমেজ URL (Card Image)', 'Card Image URL')}
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('থাম্বনেইল URL', 'Thumbnail URL')}
                  </label>
                  <input
                    type="url"
                    value={thumbnailUrl}
                    onChange={e => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('ব্যানার URL (Header Banner)', 'Banner URL')}
                  </label>
                  <input
                    type="url"
                    value={bannerUrl}
                    onChange={e => setBannerUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              {/* Primary Subject & Hierarchy Flow Path */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('মূল বিষয় (Subject)', 'Primary Subject')}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Physics, Physical Science, Mathematics"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('একাডেমিক হায়ারার্কি পথ (Flow Path)', 'Academic Hierarchy Flow Path')}
                  </label>
                  <input
                    type="text"
                    value={flowPath}
                    onChange={e => setFlowPath(e.target.value)}
                    placeholder="Program → Medium → Class → Subject → Course → Chapter → Topic → Lesson → Assessment"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              {/* Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('যোগ্যতা / কারা ভর্তি হতে পারে (English)', 'Eligibility (English)')}
                  </label>
                  <input
                    type="text"
                    value={eligibility}
                    onChange={e => setEligibility(e.target.value)}
                    placeholder="e.g. Students entering Class 10"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('যোগ্যতা (বাংলা)', 'Eligibility (Bengali)')}
                  </label>
                  <input
                    type="text"
                    value={eligibilityBn}
                    onChange={e => setEligibilityBn(e.target.value)}
                    placeholder="যেমন: দশম শ্রেণী ও মাধ্যমিক পরীক্ষার্থীদের জন্য"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('সময়কাল', 'Duration')}
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    placeholder="e.g. 12 Months"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('ফি / মূল্য (₹)', 'Base Fee (₹)')}
                  </label>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={e => setBasePrice(e.target.value)}
                    placeholder="1999"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t('থিম কালার', 'Theme Accent')}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={e => setAccentColor(e.target.value)}
                      className="w-9 h-9 p-0 border border-neutral-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={e => setAccentColor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t(
                    'অন্তর্ভুক্ত বৈশিষ্ট্য ও সিলেবাস উপাদান (কমা দিয়ে পৃথক করুন)',
                    'Included Syllabus & Features (comma-separated)'
                  )}
                </label>
                <textarea
                  rows={3}
                  value={includedFeatures}
                  onChange={e => setIncludedFeatures(e.target.value)}
                  placeholder="Concept classes, Problem-solving classes, Live classes, Recorded lectures, Mock tests, PYQs, Performance analysis, Study materials"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                />
              </div>

              {/* Visibility and Activation Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                <label className="flex items-center gap-2.5 text-xs font-bold text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={e => setActive(e.target.checked)}
                    className="w-4 h-4 text-[#FF9933] rounded accent-[#FF9933]"
                  />
                  <span>{t('সক্রিয় (Active)', 'Active')}</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs font-bold text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={displayOnWebsite}
                    onChange={e => setDisplayOnWebsite(e.target.checked)}
                    className="w-4 h-4 text-[#FF9933] rounded accent-[#FF9933]"
                  />
                  <span>{t('ওয়েবসাইটে দৃশ্যমান', 'Website')}</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs font-bold text-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={displayOnApp}
                    onChange={e => setDisplayOnApp(e.target.checked)}
                    className="w-4 h-4 text-[#FF9933] rounded accent-[#FF9933]"
                  />
                  <span>{t('মোবাইল অ্যাপে দৃশ্যমান', 'Mobile App')}</span>
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
                  {t('সংরক্ষণ ও সক্রিয় করুন', 'Save Program')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
