import React, { useState, useEffect } from 'react';
import { AppSettings } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  Save,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sliders,
  Palette,
  Image,
  Globe,
  Smartphone,
  Shield,
  Type
} from 'lucide-react';

export const BrandIdentityTab: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [brandName, setBrandName] = useState('PHYSICS FORWARD');
  const [tagline, setTagline] = useState('Understand Physics. Move Forward.');
  const [taglineBn, setTaglineBn] = useState('পদার্থবিজ্ঞান বোঝো, এগিয়ে চলো।');
  const [primaryColor, setPrimaryColor] = useState('#FF9933');
  const [secondaryColor, setSecondaryColor] = useState('#111111');
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light');
  const [brandLogo, setBrandLogo] = useState('');
  const [brandFavicon, setBrandFavicon] = useState('');
  const [appIconUrl, setAppIconUrl] = useState('');
  const [splashScreenUrl, setSplashScreenUrl] = useState('');
  const [footerBranding, setFooterBranding] = useState('PHYSICS FORWARD — Complete Academic & Competitive Physics Platform');
  const [copyrightText, setCopyrightText] = useState('© 2026 PHYSICS FORWARD. All Rights Reserved.');
  const [copyrightTextBn, setCopyrightTextBn] = useState('© ২০২৬ ফিজিক্স ফরওয়ার্ড। সর্বস্বত্ব সংরক্ষিত।');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settings = await api.getSettings();
      if (settings) {
        setBrandName(settings.brandName || 'PHYSICS FORWARD');
        setTagline(settings.tagline || 'Understand Physics. Move Forward.');
        setTaglineBn(settings.taglineBn || 'পদার্থবিজ্ঞান বোঝো, এগিয়ে চলো।');
        setPrimaryColor(settings.primaryColor || '#FF9933');
        setSecondaryColor(settings.secondaryColor || '#111111');
        setThemeMode(settings.themeMode || 'light');
        setBrandLogo(settings.brandLogo || '');
        setBrandFavicon(settings.brandFavicon || '');
        setAppIconUrl(settings.appIconUrl || '');
        setSplashScreenUrl(settings.splashScreenUrl || '');
        setFooterBranding(settings.footerBranding || 'PHYSICS FORWARD — Complete Academic & Competitive Physics Platform');
        setCopyrightText(settings.copyrightText || '© 2026 PHYSICS FORWARD. All Rights Reserved.');
        setCopyrightTextBn(settings.copyrightTextBn || '© ২০২৬ ফিজিক্স ফরওয়ার্ড। সর্বস্বত্ব সংরক্ষিত।');
      }
    } catch (err) {
      console.error('Failed to load brand settings', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await api.updateSettings({
        brandName,
        tagline,
        taglineBn,
        primaryColor,
        secondaryColor,
        themeMode,
        brandLogo,
        brandFavicon,
        appIconUrl,
        splashScreenUrl,
        footerBranding,
        copyrightText,
        copyrightTextBn
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to update brand identity', err);
      alert(t('ব্র্যান্ড সেটিংস সংরক্ষণ ব্যর্থ হয়েছে!', 'Failed to save brand settings!'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-neutral-500">
        <RefreshCw className="w-6 h-6 animate-spin text-[#FF9933] mb-2" />
        <span className="text-xs font-bold">{t('ব্র্যান্ড সেটিংস লোড হচ্ছে...', 'Loading Brand Identity...')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CMS Control 01</span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 mt-0.5">
            {t('ব্র্যান্ড ও প্ল্যাটফর্ম আইডেন্টিটি ম্যানেজমেন্ট', 'Brand & Platform Identity')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('ওয়েবসাইট, মোবাইল অ্যাপ ও স্টুডেন্ট পোর্টালে ব্যবহৃত নাম, লোগো, রঙ ও কপিরাইট নিয়ন্ত্রণ করুন', 'Configure logo, tagline, palette, theme mode, and footer copyright without code changes')}
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('সেন্ট্রাল ডেটাবেসে সফলভাবে সংরক্ষিত!', 'Saved to Central DB!')}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Core Names & Tagline */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Type className="w-4 h-4 text-[#FF9933]" />
              <span>{t('প্ল্যাটফর্ম নাম ও ট্যাগলাইন', 'Platform Name & Slogans')}</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('অফিসিয়াল ব্র্যান্ড / অ্যাপ নাম *', 'Official Brand / App Name *')}
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                placeholder="PHYSICS FORWARD"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold focus:outline-none focus:border-[#FF9933]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('ট্যাগলাইন (English)', 'Tagline (English)')}
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="Understand Physics. Move Forward."
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
                  placeholder="পদার্থবিজ্ঞান বোঝো, এগিয়ে চলো।"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#FF9933]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Colors & Theme */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Palette className="w-4 h-4 text-[#FF9933]" />
              <span>{t('ব্র্যান্ড কালার ও থিম সেটিংস', 'Colors & Theme Setting')}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('প্রাইমারি জাফরান কালার (Saffron)', 'Primary Brand Color')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('সেকেন্ডারি / টেক্সট কালার', 'Secondary / Dark Color')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={e => setSecondaryColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={e => setSecondaryColor(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('ডিফল্ট থিম মোড', 'Default Theme Mode')}
                </label>
                <select
                  value={themeMode}
                  onChange={e => setThemeMode(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                >
                  <option value="light">Light Theme (Clean White + Saffron)</option>
                  <option value="dark">Dark Theme (Deep Slate)</option>
                  <option value="system">System Preference</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 3: Graphic Assets & URLs */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Image className="w-4 h-4 text-[#FF9933]" />
              <span>{t('লোগো, ফেভিকন ও স্প্ল্যাশ অ্যাসেটস', 'Logo, Favicon & App Assets')}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('লোগো ইমেজ লিঙ্ক (Logo Image URL)', 'Logo Image URL')}
                </label>
                <input
                  type="url"
                  value={brandLogo}
                  onChange={e => setBrandLogo(e.target.value)}
                  placeholder="https://.../logo.png (SVG / PNG)"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                />
                <p className="text-[10px] text-neutral-400 mt-1">
                  {t('খালি রাখলে স্বয়ংক্রিয় প্রফেশনাল ভেক্টর ব্র্যান্ড আইকন ব্যবহৃত হবে', 'Leave empty to use official vector branding')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('ওয়েবসাইট ফেভিকন (Favicon URL)', 'Website Favicon URL')}
                </label>
                <input
                  type="url"
                  value={brandFavicon}
                  onChange={e => setBrandFavicon(e.target.value)}
                  placeholder="https://.../favicon.ico"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('মোবাইল অ্যাপ আইকন (Mobile App Icon URL)', 'Mobile App Icon URL')}
                </label>
                <input
                  type="url"
                  value={appIconUrl}
                  onChange={e => setAppIconUrl(e.target.value)}
                  placeholder="https://.../app-icon-512.png"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('মোবাইল স্প্ল্যাশ স্ক্রীন ব্যানার (Splash Asset)', 'Mobile Splash Asset URL')}
                </label>
                <input
                  type="url"
                  value={splashScreenUrl}
                  onChange={e => setSplashScreenUrl(e.target.value)}
                  placeholder="https://.../splash.png"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Footer & Copyright Branding */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Globe className="w-4 h-4 text-[#FF9933]" />
              <span>{t('ফুটার ব্র্যান্ডিং ও সর্বস্বত্ব বার্তা', 'Footer & Copyright Text')}</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t('ফুটার ব্র্যান্ড বিবরণ (Footer Tagline)', 'Footer Branding Summary')}
              </label>
              <input
                type="text"
                value={footerBranding}
                onChange={e => setFooterBranding(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('কপিরাইট টেক্সট (English)', 'Copyright Notice (English)')}
                </label>
                <input
                  type="text"
                  value={copyrightText}
                  onChange={e => setCopyrightText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('কপিরাইট টেক্সট (বাংলা)', 'Copyright Notice (Bengali)')}
                </label>
                <input
                  type="text"
                  value={copyrightTextBn}
                  onChange={e => setCopyrightTextBn(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs"
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
              {t('রিসেট', 'Reset Changes')}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] transition-all shadow-sm flex items-center gap-2"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{t('সেন্ট্রাল ডেটাবেসে সংরক্ষণ করুন', 'Save Brand Identity')}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Live Brand Preview Card */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4 sticky top-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>{t('লাইভ প্রিভিউ (Live Preview)', 'Live Preview Mockup')}</span>
            </h4>

            {/* Header Preview */}
            <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-900 text-white space-y-2">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Website Top Navigation</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-black text-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  PF
                </div>
                <div>
                  <h5 className="text-xs font-black text-white leading-none">{brandName}</h5>
                  <p className="text-[9px] text-[#FF9933] mt-0.5">{tagline}</p>
                </div>
              </div>
            </div>

            {/* Mobile App Bar Preview */}
            <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Mobile App Header</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-black text-[10px]"
                    style={{ backgroundColor: primaryColor }}
                  >
                    PF
                  </div>
                  <span className="text-xs font-extrabold text-neutral-900">{brandName}</span>
                </div>
                <span className="text-[10px] font-bold text-neutral-500">{themeMode}</span>
              </div>
            </div>

            {/* Footer Preview */}
            <div className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-2">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Footer Copyright</span>
              <p className="text-[11px] font-semibold text-neutral-800">{footerBranding}</p>
              <p className="text-[10px] text-neutral-500">{copyrightText}</p>
            </div>

            <div className="p-3 bg-orange-50 border border-orange-100 rounded-xl text-neutral-700 text-[11px] space-y-1">
              <p className="font-bold text-[#FF9933]">{t('স্বয়ংক্রিয় বাস্তবায়ন', 'Zero-Code Instant Sync')}</p>
              <p className="text-neutral-600">
                {t('এখানে সংরক্ষিত সকল পরিবর্তন ওয়েবসাইট হেডার, মোবাইল অ্যাপ এবং স্টুডেন্ট ড্যাশবোর্ডে সাথে সাথে কার্যকর হয়।', 'Changes saved here immediately update the website headers, mobile app, and student portals.')}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
