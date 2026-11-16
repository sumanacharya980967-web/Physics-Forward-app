import React, { useState, useEffect } from 'react';
import { AppSettings, MobileCmsConfig, Course, Program } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Smartphone,
  Save,
  CheckCircle2,
  RefreshCw,
  Plus,
  Trash2,
  Sliders,
  Image,
  Bell,
  HelpCircle,
  Eye,
  Check,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface MobileCmsTabProps {
  courses?: Course[];
  programs?: Program[];
}

export const MobileCmsTab: React.FC<MobileCmsTabProps> = ({
  courses = [],
  programs = []
}) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Mobile CMS State
  const [announcementsTicker, setAnnouncementsTicker] = useState('');
  const [announcementsTickerBn, setAnnouncementsTickerBn] = useState('');
  const [supportPhone, setSupportPhone] = useState('8972263462');
  const [supportWhatsapp, setSupportWhatsapp] = useState('https://chat.whatsapp.com/HQiA0zocDAuL4GjFrLD7oh?mode=hqrt2');

  const [sections, setSections] = useState([
    { id: 'sec-hero', name: 'Hero Carousel Banners', enabled: true, order: 1 },
    { id: 'sec-programs', name: 'Academic Programs Grid (JEE, NEET, Foundation)', enabled: true, order: 2 },
    { id: 'sec-live', name: 'Upcoming Live Physics Classes', enabled: true, order: 3 },
    { id: 'sec-tools', name: 'Physics Formula Tools & Solvers', enabled: true, order: 4 },
    { id: 'sec-social', name: 'Official Connect With Us Community', enabled: true, order: 5 }
  ]);

  const [banners, setBanners] = useState([
    {
      id: 'mb-1',
      title: 'Madhyamik 2026 Target Batch',
      titleBn: 'মাধ্যমিক ২০২৬ স্পেশাল টার্গেট ব্যাচ',
      subtitle: '100% Concept clarity & 10 years question solutions',
      imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
      linkUrl: '/courses/course-10-madhyamik',
      active: true
    },
    {
      id: 'mb-2',
      title: 'JEE Mains & WBJEE Numerical Booster',
      titleBn: 'জেইই ও ডব্লিউবিজেইই নিউমেরিক্যাল বুস্টার',
      subtitle: 'Advanced problem tricks and weekly timed tests',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      linkUrl: '/courses/course-jee-mains',
      active: true
    }
  ]);

  // New Banner Form
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerTitleBn, setNewBannerTitleBn] = useState('');
  const [newBannerSubtitle, setNewBannerSubtitle] = useState('');
  const [newBannerImage, setNewBannerImage] = useState('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const s = await api.getSettings();
      if (s?.mobileCms) {
        setAnnouncementsTicker(s.mobileCms.announcementsTicker || '');
        setAnnouncementsTickerBn(s.mobileCms.announcementsTickerBn || '');
        setSupportPhone(s.mobileCms.supportPhone || '8972263462');
        setSupportWhatsapp(s.mobileCms.supportWhatsapp || 'https://chat.whatsapp.com/HQiA0zocDAuL4GjFrLD7oh?mode=hqrt2');
        if (s.mobileCms.sections && s.mobileCms.sections.length > 0) {
          setSections(s.mobileCms.sections);
        }
        if (s.mobileCms.banners && s.mobileCms.banners.length > 0) {
          setBanners(s.mobileCms.banners);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSection = (secId: string) => {
    setSections(prev =>
      prev.map(s => (s.id === secId ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleDeleteBanner = (bId: string) => {
    setBanners(prev => prev.filter(b => b.id !== bId));
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerTitle) return;
    const newB = {
      id: 'mb-' + Date.now(),
      title: newBannerTitle,
      titleBn: newBannerTitleBn || newBannerTitle,
      subtitle: newBannerSubtitle,
      imageUrl: newBannerImage,
      linkUrl: '/courses',
      active: true
    };
    setBanners(prev => [newB, ...prev]);
    setShowBannerModal(false);
    setNewBannerTitle('');
    setNewBannerTitleBn('');
    setNewBannerSubtitle('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      const updatedMobileCms: MobileCmsConfig = {
        banners,
        announcementsTicker,
        announcementsTickerBn,
        sections,
        supportPhone,
        supportWhatsapp
      };

      await api.updateSettings({
        mobileCms: updatedMobileCms
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert(t('মোবাইল সিএমএস সংরক্ষণ ব্যর্থ হয়েছে!', 'Failed to save mobile app CMS!'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-neutral-500">
        <RefreshCw className="w-6 h-6 animate-spin text-[#FF9933] mb-2" />
        <span className="text-xs font-bold">{t('মোবাইল সিএমএস লোড হচ্ছে...', 'Loading Mobile CMS...')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CMS Control 12</span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 mt-0.5">
            {t('মোবাইল অ্যাপ কন্টেন্ট ও লেআউট ম্যানেজার (Mobile App CMS)', 'Mobile App CMS & Sections Control')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('মোবাইল অ্যাপের হোমস্ক্রিন ব্যানার, ঘোষণা টিকার, সেকশন দৃশ্যমানতা ও হেল্পলাইন সরাসরি সেন্ট্রাল ব্যাকএন্ড থেকে নিয়ন্ত্রণ করুন', 'Configure mobile carousel banners, announcement ticker, section visibility, and student support channels')}
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('মোবাইল অ্যাপ সফলভাবে আপডেট হয়েছে!', 'Mobile App CMS updated!')}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Configs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Visibility Toggles */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Sliders className="w-4 h-4 text-[#FF9933]" />
              <span>{t('মোবাইল হোমস্ক্রিন সেকশন ভিজিবিলিটি', 'Home-Screen Sections Visibility')}</span>
            </h4>

            <div className="divide-y divide-neutral-100 text-xs">
              {sections.map(sec => (
                <div key={sec.id} className="py-3 flex items-center justify-between">
                  <span className="font-bold text-neutral-800">{sec.name}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleSection(sec.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold transition-all ${
                      sec.enabled
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <span>{sec.enabled ? 'Enabled' : 'Disabled'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Promotional Banner Carousel */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Image className="w-4 h-4 text-[#FF9933]" />
                <span>{t('মোবাইল ক্যারোজেল ব্যানার (Carousel Banners)', 'Mobile Carousel Banners')} ({banners.length})</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowBannerModal(true)}
                className="px-3 py-1 rounded-lg bg-[#FF9933] text-black font-extrabold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {banners.map(b => (
                <div key={b.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
                  <div className="aspect-video bg-neutral-200 rounded-lg overflow-hidden">
                    <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-900 line-clamp-1">{b.titleBn || b.title}</h5>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">{b.subtitle}</p>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => handleDeleteBanner(b.id)}
                      className="text-neutral-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast Ticker & Support Channels */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Bell className="w-4 h-4 text-[#FF9933]" />
              <span>{t('ঘোষণা টিকার ও স্টুডেন্ট হেল্পলাইন', 'Announcement Ticker & Helpline')}</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('টপ স্ক্রলিং ঘোষণা টিকার (বাংলা)', 'Top Announcement Ticker (Bengali)')}
              </label>
              <input
                type="text"
                value={announcementsTickerBn}
                onChange={e => setAnnouncementsTickerBn(e.target.value)}
                placeholder="e.g. আজ সন্ধ্যা ৭:০০ টায় চলতড়িৎ লাইভ ক্লাস অনুষ্ঠিত হবে..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('স্টুডেন্ট সাপোর্ট হেল্পলাইন ফোন *', 'Student Support Phone *')}
                </label>
                <input
                  type="text"
                  required
                  value={supportPhone}
                  onChange={e => setSupportPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('জরুরী সাপোর্ট হোয়াটসঅ্যাপ লিঙ্ক *', 'Emergency WhatsApp Link *')}
                </label>
                <input
                  type="url"
                  required
                  value={supportWhatsapp}
                  onChange={e => setSupportWhatsapp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={loadSettings}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-sm flex items-center gap-2"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{t('মোবাইল কনফিগ সংরক্ষণ করুন', 'Publish Mobile CMS')}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Mobile App Mockup Preview */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4 sticky top-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>Mobile Simulation Preview</span>
            </h4>

            {/* Simulated Phone Shell */}
            <div className="w-full max-w-[280px] mx-auto rounded-3xl border-4 border-neutral-800 bg-neutral-100 overflow-hidden shadow-xl p-3 space-y-3">
              {/* App Bar */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-black text-neutral-900">PHYSICS FORWARD</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              {/* Ticker */}
              {announcementsTickerBn && (
                <div className="bg-[#FF9933]/15 text-neutral-800 text-[10px] font-bold p-1.5 rounded-lg truncate">
                  📢 {announcementsTickerBn}
                </div>
              )}

              {/* Banner Carousel Card */}
              {banners[0] && (
                <div className="rounded-xl overflow-hidden shadow-xs relative aspect-[16/9]">
                  <img src={banners[0].imageUrl} alt="banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-bold">{banners[0].titleBn}</span>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                <div className="p-2 bg-white rounded-xl border border-neutral-200">
                  🔴 Live Classes
                </div>
                <div className="p-2 bg-white rounded-xl border border-neutral-200">
                  📐 Formula Suite
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Add Banner Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-neutral-900">
              {t('নতুন মোবাইল ব্যানার যুক্ত করুন', 'Add Mobile Carousel Banner')}
            </h3>

            <form onSubmit={handleAddBanner} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Title (Bengali) *</label>
                <input
                  type="text"
                  required
                  value={newBannerTitleBn}
                  onChange={e => setNewBannerTitleBn(e.target.value)}
                  placeholder="e.g. মাধ্যমিক ২০২৬ বিশেষ টেস্ট সিরিজ"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newBannerTitle}
                  onChange={e => setNewBannerTitle(e.target.value)}
                  placeholder="e.g. Madhyamik 2026 Special Test Series"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={newBannerSubtitle}
                  onChange={e => setNewBannerSubtitle(e.target.value)}
                  placeholder="100% Concept clarity"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newBannerImage}
                  onChange={e => setNewBannerImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBannerModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
