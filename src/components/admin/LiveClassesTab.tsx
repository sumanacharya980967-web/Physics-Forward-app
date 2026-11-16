import React, { useState } from 'react';
import { LiveClass, RecordedClass, Batch, Course } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Video,
  Play,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Clock,
  ExternalLink,
  Users,
  CheckCircle2,
  Search,
  Radio,
  FileText
} from 'lucide-react';

interface LiveClassesTabProps {
  liveClasses: LiveClass[];
  recordedClasses: RecordedClass[];
  batches: Batch[];
  courses: Course[];
  onRefreshData?: () => void;
}

export const LiveClassesTab: React.FC<LiveClassesTabProps> = ({
  liveClasses = [],
  recordedClasses = [],
  batches = [],
  courses = [],
  onRefreshData
}) => {
  const { t } = useLanguage();
  const [sectionMode, setSectionMode] = useState<'live' | 'recorded'>('live');

  // New Live Class Modal Form
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [liveTitle, setLiveTitle] = useState('');
  const [liveTitleBn, setLiveTitleBn] = useState('');
  const [teacherName, setTeacherName] = useState('Subrata Acharya, M.Sc.');
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');
  const [chapter, setChapter] = useState('Current Electricity');
  const [chapterBn, setChapterBn] = useState('চলতড়িৎ');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduledTime, setScheduledTime] = useState('19:00');
  const [durationMinutes, setDurationMinutes] = useState('90');
  const [provider, setProvider] = useState<'google_meet' | 'zoom' | 'youtube_live'>('google_meet');
  const [meetUrl, setMeetUrl] = useState('https://meet.google.com/pfd-physics-lecture');

  // New Recorded Video Modal Form
  const [showRecModal, setShowRecModal] = useState(false);
  const [recTitle, setRecTitle] = useState('');
  const [recTitleBn, setRecTitleBn] = useState('');
  const [recChapter, setRecChapter] = useState('Optics');
  const [recChapterBn, setRecChapterBn] = useState('আলো');
  const [recVideoUrl, setRecVideoUrl] = useState('');
  const [recThumbnail, setRecThumbnail] = useState('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80');
  const [recDuration, setRecDuration] = useState('60');

  const handleScheduleLive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTitle || !meetUrl) return;
    try {
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}:00Z`).toISOString();
      await api.createLiveClass({
        title: liveTitle,
        titleBn: liveTitleBn || liveTitle,
        teacherName,
        batchId: selectedBatchId || batches[0]?.id || 'batch-c10-2026',
        subject: 'Physics',
        chapter,
        chapterBn: chapterBn || chapter,
        scheduledAt: scheduledDateTime,
        durationMinutes: parseInt(durationMinutes, 10) || 90,
        meetUrl,
        status: 'upcoming'
      });
      setShowLiveModal(false);
      setLiveTitle('');
      setLiveTitleBn('');
      onRefreshData?.();
      alert(t('লাইভ ক্লাস সফলভাবে শিডিউল করা হয়েছে!', 'Live class scheduled successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLive = async (id: string) => {
    if (!confirm(t('এই লাইভ ক্লাসটি ডিলিট করতে চান?', 'Delete this live class?'))) return;
    try {
      await api.deleteLiveClass(id);
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRecorded = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recTitle || !recVideoUrl) return;
    try {
      await api.addRecordedClass({
        title: recTitle,
        titleBn: recTitleBn || recTitle,
        subject: 'Physics',
        chapter: recChapter,
        chapterBn: recChapterBn || recChapter,
        durationMinutes: parseInt(recDuration, 10) || 60,
        videoUrl: recVideoUrl,
        thumbnail: recThumbnail,
        views: 1,
        notesAvailable: true,
        summaryBn: 'সম্পূর্ণ অধ্যায়ের গভীর কনসেপ্ট আলোচনা ও গাণিতিক সমস্যা সমাধান।'
      });
      setShowRecModal(false);
      setRecTitle('');
      setRecTitleBn('');
      setRecVideoUrl('');
      onRefreshData?.();
      alert(t('ভিডিও লেকচার লাইব্রেরিতে যুক্ত হয়েছে!', 'Recorded class added to library!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRecorded = async (id: string) => {
    if (!confirm(t('এই রেকর্ডেড ক্লাসটি মুছে ফেলতে চান?', 'Delete this recorded video?'))) return;
    try {
      await api.deleteRecordedClass(id);
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
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CMS Control 06</span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 mt-0.5">
            {t('লাইভ ও রেকর্ডেড ক্লাস ম্যানেজমেন্ট', 'Live & Recorded Classes Manager')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('গুগল মিট / জুম লিঙ্ক শিডিউল করুন, ভিডিও লেকচার যুক্ত করুন এবং শিক্ষার্থীদের নোটিফিকেশন পাঠান', 'Schedule live classes with Google Meet/Zoom, upload recordings, and notify students')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {sectionMode === 'live' ? (
            <button
              onClick={() => setShowLiveModal(true)}
              className="px-4 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t('নতুন লাইভ ক্লাস শিডিউল', 'Schedule Live Class')}</span>
            </button>
          ) : (
            <button
              onClick={() => setShowRecModal(true)}
              className="px-4 py-2 bg-neutral-900 text-white font-extrabold text-xs rounded-xl hover:bg-black flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#FF9933]" />
              <span>{t('ভিডিও লেকচার আপলোড', 'Add Recorded Lecture')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-2 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setSectionMode('live')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            sectionMode === 'live'
              ? 'bg-[#FF9933] text-black shadow-xs font-black'
              : 'bg-neutral-100 text-neutral-600 hover:text-black'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>{t('আসন্ন লাইভ ক্লাসসমূহ', 'Live Sessions')} ({liveClasses.length})</span>
        </button>
        <button
          onClick={() => setSectionMode('recorded')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            sectionMode === 'recorded'
              ? 'bg-neutral-900 text-white shadow-xs font-black'
              : 'bg-neutral-100 text-neutral-600 hover:text-black'
          }`}
        >
          <Play className="w-4 h-4 text-[#FF9933]" />
          <span>{t('রেকর্ডেড ভিডিও লাইব্রেরি', 'Recorded Lectures Library')} ({recordedClasses.length})</span>
        </button>
      </div>

      {/* LIVE CLASSES LIST */}
      {sectionMode === 'live' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveClasses.map(lc => {
            const batch = batches.find(b => b.id === lc.batchId);
            return (
              <div key={lc.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2.5 py-0.5 rounded-full">
                      {lc.chapterBn || lc.chapter}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${lc.status === 'live' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-neutral-100 text-neutral-600'}`}>
                      {lc.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-900">{lc.titleBn || lc.title}</h4>
                  <p className="text-xs text-neutral-500">{lc.title}</p>

                  <div className="text-xs text-neutral-600 space-y-1 pt-1">
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{lc.teacherName} {batch ? `• ${batch.name}` : ''}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{new Date(lc.scheduledAt).toLocaleString()} • {lc.durationMinutes} mins</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <a
                    href={lc.meetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-900 text-white hover:bg-black font-bold text-xs flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#FF9933]" />
                    <span>Launch Provider Link</span>
                  </a>

                  <button
                    onClick={() => handleDeleteLive(lc.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-50"
                    title="Delete session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RECORDED CLASSES LIST */}
      {sectionMode === 'recorded' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recordedClasses.map(rc => (
            <div key={rc.id} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="relative aspect-video bg-neutral-900">
                <img
                  src={rc.thumbnail || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80'}
                  alt={rc.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center text-black">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {rc.durationMinutes} mins
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#FF9933] uppercase">{rc.chapterBn || rc.chapter}</span>
                  <h4 className="text-xs font-bold text-neutral-900 line-clamp-2 mt-0.5">{rc.titleBn || rc.title}</h4>
                  <p className="text-[11px] text-neutral-500 line-clamp-1">{rc.title}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                  <span className="text-neutral-400 text-[11px]">{rc.views || 0} views</span>
                  <button
                    onClick={() => handleDeleteRecorded(rc.id)}
                    className="text-neutral-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Live Modal */}
      {showLiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-neutral-900">
              {t('নতুন লাইভ ফিজিক্স ক্লাস শিডিউল করুন', 'Schedule Live Physics Lecture')}
            </h3>

            <form onSubmit={handleScheduleLive} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('লেকচার টপিক / অধ্যায় শিরোনাম (বাংলা) *', 'Topic Title (Bengali) *')}
                </label>
                <input
                  type="text"
                  required
                  value={liveTitleBn}
                  onChange={e => setLiveTitleBn(e.target.value)}
                  placeholder="e.g. চলতড়িৎ: সমান্তরাল ও শ্রেণি সমবায়ের বিশেষ গাণিতিক বিশ্লেষণ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('লেকচার শিরোনাম (English) *', 'Topic Title (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={liveTitle}
                  onChange={e => setLiveTitle(e.target.value)}
                  placeholder="e.g. Current Electricity: Resistor Combinations and Advanced Numericals"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('শিক্ষক *', 'Faculty / Teacher')}
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={e => setTeacherName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ব্যাচ নির্বাচন *', 'Target Batch')}
                  </label>
                  <select
                    value={selectedBatchId}
                    onChange={e => setSelectedBatchId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('তারিখ *', 'Date')}
                  </label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('সময় *', 'Start Time')}
                  </label>
                  <input
                    type="time"
                    required
                    value={scheduledTime}
                    onChange={e => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('সময়কাল (মিনিট)', 'Duration')}
                  </label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('প্রোভাইডার *', 'Live Provider')}
                  </label>
                  <select
                    value={provider}
                    onChange={e => setProvider(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                  >
                    <option value="google_meet">Google Meet</option>
                    <option value="zoom">Zoom Video</option>
                    <option value="youtube_live">YouTube Live</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('মিটিং / রুম লিঙ্ক *', 'Meeting Link *')}
                  </label>
                  <input
                    type="url"
                    required
                    value={meetUrl}
                    onChange={e => setMeetUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowLiveModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
                >
                  {t('শিডিউল ও নোটিফাই করুন', 'Schedule & Broadcast')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Recorded Video Modal */}
      {showRecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-neutral-900">
              {t('নতুন রেকর্ডেড ক্লাস যুক্ত করুন', 'Add Recorded Lecture Video')}
            </h3>

            <form onSubmit={handleAddRecorded} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('ভিডিও শিরোনাম (বাংলা) *', 'Title (Bengali) *')}
                </label>
                <input
                  type="text"
                  required
                  value={recTitleBn}
                  onChange={e => setRecTitleBn(e.target.value)}
                  placeholder="e.g. আলোর প্রতিফলন ও দর্পণের সমীকরণ সম্পূর্ণ লেকচার"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('ভিডিও শিরোনাম (English) *', 'Title (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={recTitle}
                  onChange={e => setRecTitle(e.target.value)}
                  placeholder="e.g. Reflection of Light and Mirror Formula Deep Dive"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('অধ্যায়', 'Chapter')}
                  </label>
                  <input
                    type="text"
                    value={recChapter}
                    onChange={e => setRecChapter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('সময়কাল (মিনিট)', 'Duration (Mins)')}
                  </label>
                  <input
                    type="number"
                    value={recDuration}
                    onChange={e => setRecDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('ভিডিও URL (YouTube Embed / MP4 / Vimeo) *', 'Video Stream URL *')}
                </label>
                <input
                  type="url"
                  required
                  value={recVideoUrl}
                  onChange={e => setRecVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('থাম্বনেইল ইমেজ URL', 'Thumbnail Image URL')}
                </label>
                <input
                  type="url"
                  value={recThumbnail}
                  onChange={e => setRecThumbnail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRecModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
                >
                  {t('সংরক্ষণ করুন', 'Save Video')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
