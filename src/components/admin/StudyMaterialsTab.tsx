import React, { useState } from 'react';
import { StudyMaterial, MaterialCategory } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface StudyMaterialsTabProps {
  studyMaterials: StudyMaterial[];
  onRefreshData?: () => void;
}

export const StudyMaterialsTab: React.FC<StudyMaterialsTabProps> = ({
  studyMaterials = [],
  onRefreshData
}) => {
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [category, setCategory] = useState<MaterialCategory>('formula_sheet');
  const [subject, setSubject] = useState('Physics');
  const [classLevel, setClassLevel] = useState('Class 10');
  const [chapter, setChapter] = useState('Current Electricity');
  const [chapterBn, setChapterBn] = useState('চলতড়িৎ');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileSize, setFileSize] = useState('2.4 MB');
  const [pages, setPages] = useState('8');
  const [language, setLanguage] = useState<'bn' | 'en' | 'both'>('bn');

  const filteredMaterials = (studyMaterials || []).filter(m => {
    if (filterCategory !== 'all' && m.category !== filterCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (m.title || '').toLowerCase().includes(q);
      const matchTitleBn = (m.titleBn || '').toLowerCase().includes(q);
      const matchChapter = (m.chapter || '').toLowerCase().includes(q);
      if (!matchTitle && !matchTitleBn && !matchChapter) return false;
    }
    return true;
  });

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !downloadUrl) return;
    try {
      await api.addStudyMaterial({
        title,
        titleBn: titleBn || title,
        category,
        subject,
        classLevel,
        chapter,
        chapterBn: chapterBn || chapter,
        downloadUrl,
        fileSize,
        pages: parseInt(pages, 10) || 1,
        language
      });
      setShowAddModal(false);
      setTitle('');
      setTitleBn('');
      setDownloadUrl('');
      onRefreshData?.();
      alert(t('স্টাডি মেটেরিয়াল সফলভাবে সেন্ট্রাল ডেটাবেসে আপলোড হয়েছে!', 'Study material saved to Central DB!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm(t('এই স্টাডি মেটেরিয়ালটি মুছে ফেলতে চান?', 'Delete this study material?'))) return;
    try {
      await api.deleteStudyMaterial(id);
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CMS Control 07</span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 mt-0.5">
            {t('পিডিএফ স্টাডি মেটেরিয়ালস ও ফর্মুলা শিট পোর্টাল', 'Protected Study Materials Manager')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('হাতে লেখা রঙিন নোটস, ফর্মুলা বুকলেট, পিওয়াইকিউ ও ওয়ার্কশীট পিডিএফ আপলোড ও পরিচালনা করুন', 'Upload handwritten notes, formula sheets, PYQs, worksheets, and documents with role authorization rules')}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{t('নতুন পিডিএফ আপলোড করুন', 'Upload Study Material')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          {[
            { id: 'all', labelBn: 'সকল ফাইল', labelEn: 'All Files' },
            { id: 'formula_sheet', labelBn: 'ফর্মুলা শিট', labelEn: 'Formula Sheets' },
            { id: 'notes', labelBn: 'হ্যান্ডরিটেন নোটস', labelEn: 'Lecture Notes' },
            { id: 'pyq', labelBn: 'বিগত বছরের প্রশ্ন (PYQ)', labelEn: 'PYQs' },
            { id: 'worksheet', labelBn: 'ওয়ার্কশীট ও সমাধান', labelEn: 'Worksheets' },
            { id: 'revision', labelBn: 'লাস্ট মিনিট রিভিশন', labelEn: 'Revision' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-neutral-900 text-white font-extrabold shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:text-black'
              }`}
            >
              {t(cat.labelBn, cat.labelEn)}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('শিরোনাম বা অধ্যায় খুঁজুন...', 'Search title or chapter...')}
            className="pl-8 pr-3 py-1.5 rounded-xl border border-neutral-300 text-xs w-full sm:w-64 bg-white"
          />
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map(mat => (
          <div key={mat.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2.5 py-0.5 rounded-full">
                  {mat.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {mat.fileSize} • {mat.pages} pgs
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{mat.titleBn || mat.title}</h4>
                <p className="text-[11px] text-neutral-500 line-clamp-1">{mat.title}</p>
              </div>

              <div className="text-[11px] text-neutral-600 space-y-0.5">
                <p>{mat.subject} • {mat.classLevel}</p>
                <p className="text-neutral-400">{mat.chapterBn || mat.chapter}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <a
                href={mat.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-neutral-900 hover:text-[#FF9933] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>Download / Preview</span>
              </a>

              <button
                onClick={() => handleDeleteMaterial(mat.id)}
                className="text-neutral-400 hover:text-red-500 p-1 rounded-lg"
                title="Delete file"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-neutral-900">
              {t('নতুন পিডিএফ স্টাডি মেটেরিয়াল যুক্ত করুন', 'Upload Educational Resource')}
            </h3>

            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('শিরোনাম (বাংলা) *', 'Document Title (Bengali) *')}
                </label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={e => setTitleBn(e.target.value)}
                  placeholder="e.g. চলতড়িৎ সম্পূর্ণ রঙিন ফর্মুলা শিট ও নোটস"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('শিরোনাম (English) *', 'Document Title (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Current Electricity Full Color Formula Sheet"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ক্যাটাগরি *', 'Category')}
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                  >
                    <option value="formula_sheet">Formula Sheet</option>
                    <option value="notes">Handwritten Notes</option>
                    <option value="pyq">PYQs (Previous Years)</option>
                    <option value="worksheet">Practice Worksheet</option>
                    <option value="revision">Quick Revision</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ক্লাস স্তর', 'Class Level')}
                  </label>
                  <input
                    type="text"
                    value={classLevel}
                    onChange={e => setClassLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('অধ্যায়', 'Chapter')}
                  </label>
                  <input
                    type="text"
                    value={chapter}
                    onChange={e => setChapter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ফাইল সাইজ', 'File Size')}
                  </label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={e => setFileSize(e.target.value)}
                    placeholder="2.4 MB"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('ডাউনলোড / ক্লাউড স্টোরেজ লিঙ্ক *', 'Download URL / Cloud Storage Link *')}
                </label>
                <input
                  type="url"
                  required
                  value={downloadUrl}
                  onChange={e => setDownloadUrl(e.target.value)}
                  placeholder="https://.../notes.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
                >
                  {t('আপলোড ও প্রকাশ করুন', 'Upload & Publish')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
