import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RecordedClass } from '../../types';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  Bookmark,
  ChevronRight,
  Download
} from 'lucide-react';

interface VideoPlayerModalProps {
  recordedClass: RecordedClass;
  onClose: () => void;
  onMarkCompleted?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  recordedClass,
  onClose,
  onMarkCompleted
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'summary' | 'qna'>('notes');
  const [notesText, setNotesText] = useState('');

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
        if (videoRef.current.currentTime / videoRef.current.duration > 0.9) {
          setIsCompleted(true);
          onMarkCompleted?.();
        }
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-neutral-900 text-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col max-h-[95vh]">
        {/* Top bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
              {recordedClass.subject} • {recordedClass.chapterBn || recordedClass.chapter}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage + Side Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-y-auto">
          {/* Main Video View */}
          <div className="lg:col-span-2 bg-black flex flex-col justify-center relative group">
            <video
              ref={videoRef}
              src={recordedClass.videoUrl}
              poster={recordedClass.thumbnail}
              onTimeUpdate={handleTimeUpdate}
              className="w-full aspect-video object-cover bg-black"
              onClick={togglePlay}
            />

            {/* Custom Control Overlay */}
            <div className="p-3 bg-neutral-950/90 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-[#FF9933] text-black font-bold hover:bg-[#ffaa55]"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <div className="flex items-center gap-1.5 text-neutral-300 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration || recordedClass.durationMinutes * 60)}</span>
                </div>
              </div>

              {/* Speed controls */}
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 text-[11px]">{t('গতি:', 'Speed:')}</span>
                {[0.75, 1, 1.25, 1.5, 2].map(rate => (
                  <button
                    key={rate}
                    onClick={() => changeSpeed(rate)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      playbackRate === rate
                        ? 'bg-[#FF9933] text-black'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded text-neutral-400 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded text-neutral-400 hover:text-white"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Chapter Details & Note Taking */}
          <div className="p-5 bg-neutral-900 border-l border-neutral-800 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {recordedClass.titleBn || recordedClass.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {recordedClass.summaryBn}
              </p>

              {/* Sub-tabs */}
              <div className="flex border-b border-neutral-800 text-xs mb-3">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2 px-3 font-semibold ${
                    activeTab === 'notes' ? 'text-[#FF9933] border-b-2 border-[#FF9933]' : 'text-neutral-500'
                  }`}
                >
                  {t('নোটস ও ফাইল', 'Notes & PDF')}
                </button>
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`pb-2 px-3 font-semibold ${
                    activeTab === 'summary' ? 'text-[#FF9933] border-b-2 border-[#FF9933]' : 'text-neutral-500'
                  }`}
                >
                  {t('ব্যক্তিগত নোট লিখুন', 'My Notes')}
                </button>
              </div>

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#FF9933]" />
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {t('লেকচার হ্যান্ডআউট ও ফর্মুলা শিট', 'Lecture Handout (PDF)')}
                        </p>
                        <p className="text-[10px] text-neutral-400">PDF • 2.8 MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(t('পিডিএফ ডাউনলোড শুরু হয়েছে!', 'PDF Download started!'))}
                      className="p-1.5 rounded-lg bg-neutral-700 hover:bg-[#FF9933] hover:text-black transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="space-y-2">
                  <label className="text-[11px] text-neutral-400">
                    {t('ক্লাস চলাকালীন গুরুত্বপূর্ণ পয়েন্ট লিখে রাখো:', 'Write your notes during lecture:')}
                  </label>
                  <textarea
                    value={notesText}
                    onChange={e => setNotesText(e.target.value)}
                    placeholder={t('এখানে তোমার নোট লেখো...', 'Write notes here...')}
                    rows={5}
                    className="w-full p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              )}
            </div>

            {/* Mark as Completed Button */}
            <div className="pt-3 border-t border-neutral-800">
              <button
                onClick={() => {
                  setIsCompleted(true);
                  onMarkCompleted?.();
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FF9933] text-black hover:bg-[#ffaa55]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isCompleted
                    ? t('সম্পন্ন হিসেবে চিহ্নিত হয়েছে', 'Marked as Completed')
                    : t('লেকচার সম্পূর্ণ করো', 'Mark as Completed')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
