import React, { useState, useEffect } from 'react';
import { AppSettings, WebsiteCmsConfig } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Globe,
  Save,
  CheckCircle2,
  RefreshCw,
  Layout,
  HelpCircle,
  MessageSquare,
  Shield,
  Eye,
  Sparkles,
  Search,
  Type
} from 'lucide-react';

export const WebsiteCmsTab: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // CMS Form Fields
  const [heroHeadline, setHeroHeadline] = useState('');
  const [heroHeadlineBn, setHeroHeadlineBn] = useState('');
  const [heroSubheadline, setHeroSubheadline] = useState('');
  const [heroSubheadlineBn, setHeroSubheadlineBn] = useState('');
  const [heroBadge, setHeroBadge] = useState('');
  const [heroBadgeBn, setHeroBadgeBn] = useState('');
  const [heroBannerImage, setHeroBannerImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');

  // Contact info
  const [contactPhone, setContactPhone] = useState('8972263462');
  const [contactEmail, setContactEmail] = useState('suman.acharya.980967@outlook.com');
  const [contactAddress, setContactAddress] = useState('Contai, Purba Medinipur, West Bengal, India');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const s = await api.getSettings();
      if (s) {
        setContactPhone(s.contactPhone || '8972263462');
        setContactEmail(s.contactEmail || 'suman.acharya.980967@outlook.com');
        setContactAddress(s.contactAddress || 'Contai, Purba Medinipur, West Bengal, India');

        if (s.websiteCms) {
          setHeroHeadline(s.websiteCms.heroHeadline || '');
          setHeroHeadlineBn(s.websiteCms.heroHeadlineBn || '');
          setHeroSubheadline(s.websiteCms.heroSubheadline || '');
          setHeroSubheadlineBn(s.websiteCms.heroSubheadlineBn || '');
          setHeroBadge(s.websiteCms.heroBadge || '');
          setHeroBadgeBn(s.websiteCms.heroBadgeBn || '');
          setHeroBannerImage(s.websiteCms.heroBannerImage || '');
          setSeoTitle(s.websiteCms.seoTitle || '');
          setMetaDescription(s.websiteCms.metaDescription || '');
          setOgImageUrl(s.websiteCms.ogImageUrl || '');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      const currentSettings = await api.getSettings();
      const updatedCms: WebsiteCmsConfig = {
        ...(currentSettings.websiteCms || { whyChooseUs: [], testimonials: [], faqs: [] }),
        heroHeadline,
        heroHeadlineBn,
        heroSubheadline,
        heroSubheadlineBn,
        heroBadge,
        heroBadgeBn,
        heroBannerImage,
        seoTitle,
        metaDescription,
        ogImageUrl
      };

      await api.updateSettings({
        contactPhone,
        contactEmail,
        contactAddress,
        websiteCms: updatedCms
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert(t('ওয়েবসাইট সিএমএস সংরক্ষণ ব্যর্থ হয়েছে!', 'Failed to save website CMS!'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-neutral-500">
        <RefreshCw className="w-6 h-6 animate-spin text-[#FF9933] mb-2" />
        <span className="text-xs font-bold">{t('ওয়েবসাইট সিএমএস লোড হচ্ছে...', 'Loading Website CMS...')}</span>
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CMS Control 11</span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 mt-0.5">
            {t('ওয়েবসাইট কন্টেন্ট ম্যানেজমেন্ট সিস্টেম (Website CMS)', 'Website CMS & Landing Page Manager')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('কোড পরিবর্তন না করেই হোমপেজ ব্যানার, হেডলাইন, বিবরণ, যোগাযোগ ও এসইও মেটাডাটা সরাসরি সম্পাদনা করুন', 'Edit homepage hero, promotional banners, Why Choose Us, FAQs, contact details, and SEO metadata without code changes')}
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('ওয়েবসাইট সফলভাবে আপডেট হয়েছে!', 'Website CMS updated!')}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section Card */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Layout className="w-4 h-4 text-[#FF9933]" />
              <span>{t('হোমপেজ হিরো সেকশন ও হেডলাইন', 'Homepage Hero Section')}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('হিরো ব্যাজ (English)', 'Hero Badge Tag (English)')}
                </label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={e => setHeroBadge(e.target.value)}
                  placeholder="Admissions Open for Session 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('হিরো ব্যাজ (বাংলা)', 'Hero Badge Tag (Bengali)')}
                </label>
                <input
                  type="text"
                  value={heroBadgeBn}
                  onChange={e => setHeroBadgeBn(e.target.value)}
                  placeholder="ভর্তি চলছে — সেশন ২০২৬"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('প্রধান হেডলাইন (বাংলা) *', 'Main Headline (Bengali) *')}
              </label>
              <input
                type="text"
                required
                value={heroHeadlineBn}
                onChange={e => setHeroHeadlineBn(e.target.value)}
                placeholder="পদার্থবিজ্ঞানের গভীর উপলব্ধি ও বোর্ড-জয়ী সাফল্যের দিশা"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('প্রধান হেডলাইন (English) *', 'Main Headline (English) *')}
              </label>
              <input
                type="text"
                required
                value={heroHeadline}
                onChange={e => setHeroHeadline(e.target.value)}
                placeholder="Master Physics with Clarity, Logic & Deep Understanding"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('সাব-হেডলাইন বিবরণ (বাংলা)', 'Subheadline Description (Bengali)')}
              </label>
              <textarea
                rows={2}
                value={heroSubheadlineBn}
                onChange={e => setHeroSubheadlineBn(e.target.value)}
                placeholder="কনসেপ্ট ক্লাস, অ্যাডভান্সড প্রবলেম সলভিং..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('সাব-হেডলাইন বিবরণ (English)', 'Subheadline Description (English)')}
              </label>
              <textarea
                rows={2}
                value={heroSubheadline}
                onChange={e => setHeroSubheadline(e.target.value)}
                placeholder="Empowering students from Class 9 to JEE & NEET..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('হিরো ব্যানার ইমেজ URL', 'Hero Banner Image URL')}
              </label>
              <input
                type="url"
                value={heroBannerImage}
                onChange={e => setHeroBannerImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono"
              />
            </div>
          </div>

          {/* Contact Details on Website */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <MessageSquare className="w-4 h-4 text-[#FF9933]" />
              <span>{t('অফিসিয়াল যোগাযোগ ও হেডকোয়ার্টার ঠিকানা', 'Official Contact & Contai Address')}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('যোগাযোগ ফোন নম্বর *', 'Official Phone Number *')}
                </label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  placeholder="8972263462"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('অফিসিয়াল ইমেল *', 'Official Email Address *')}
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  placeholder="suman.acharya.980967@outlook.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('প্রতিষ্ঠানের ঠিকানা (Address) *', 'Official Academy Address *')}
              </label>
              <input
                type="text"
                required
                value={contactAddress}
                onChange={e => setContactAddress(e.target.value)}
                placeholder="Contai, Purba Medinipur, West Bengal, India"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
              />
            </div>
          </div>

          {/* SEO & Open Graph Meta Tags */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Globe className="w-4 h-4 text-[#FF9933]" />
              <span>{t('এসইও ও সোশ্যাল কার্ড মেটাডাটা (SEO & Social Cards)', 'SEO & Social Share Cards')}</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('এসইও মেটা টাইটেল (SEO Title)', 'SEO Meta Title')}
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={e => setSeoTitle(e.target.value)}
                placeholder="PHYSICS FORWARD — Best Physics Learning Platform for Class 9, 10, 11, 12, JEE & NEET"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('এসইও বিবরণ (Meta Description)', 'Meta Description')}
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={e => setMetaDescription(e.target.value)}
                placeholder="Join PHYSICS FORWARD by Suman Acharya & Subrata Acharya in Contai..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('ওপেন গ্রাফ সোশ্যাল প্রিভিউ ইমেজ (OG Image URL)', 'Open Graph Social Preview Image')}
              </label>
              <input
                type="url"
                value={ogImageUrl}
                onChange={e => setOgImageUrl(e.target.value)}
                placeholder="https://.../preview.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono"
              />
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
              <span>{t('ওয়েবসাইট সিএমএস সংরক্ষণ করুন', 'Publish Website Changes')}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Instant Live Preview */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4 sticky top-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>Website Hero Preview</span>
            </h4>

            <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-2.5">
              {heroBadgeBn && (
                <span className="inline-block bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/30 px-2 py-0.5 rounded text-[10px] font-bold">
                  {heroBadgeBn}
                </span>
              )}
              <h3 className="text-sm font-black leading-tight text-white">
                {heroHeadlineBn || 'পদার্থবিজ্ঞানের গভীর উপলব্ধি ও বোর্ড-জয়ী সাফল্যের দিশা'}
              </h3>
              <p className="text-[11px] text-neutral-300 line-clamp-3">
                {heroSubheadlineBn || 'কনসেপ্ট ক্লাস, অ্যাডভান্সড প্রবলেম সলভিং...'}
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#FF9933] text-black font-bold text-[10px] rounded-lg">
                  Explore Courses
                </span>
                <span className="px-3 py-1 bg-neutral-800 text-white font-bold text-[10px] rounded-lg">
                  Free Tools
                </span>
              </div>
            </div>

            {/* Google Search Result Preview */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1 text-xs">
              <span className="text-[10px] font-mono text-neutral-400">Google Search Snippet</span>
              <p className="text-blue-700 font-medium text-xs line-clamp-1">{seoTitle || 'PHYSICS FORWARD — Best Physics Learning Platform'}</p>
              <p className="text-emerald-700 text-[10px]">https://physicsforward.in</p>
              <p className="text-neutral-500 text-[11px] line-clamp-2">
                {metaDescription || 'Join PHYSICS FORWARD by Suman Acharya & Subrata Acharya in Contai, West Bengal.'}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
