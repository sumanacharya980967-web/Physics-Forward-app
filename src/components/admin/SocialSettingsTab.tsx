import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SocialChannel, AppSettings } from '../../types';
import { OFFICIAL_SOCIAL_CHANNELS } from '../../data/mockData';
import { api } from '../../services/api';
import { SocialPlatformIcon } from '../social/OfficialSocialChannels';
import {
  ExternalLink,
  CheckCircle2,
  Save,
  RotateCcw,
  Check,
  Eye,
  EyeOff,
  Link as LinkIcon,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const SocialSettingsTab: React.FC = () => {
  const { t } = useLanguage();
  const [channels, setChannels] = useState<SocialChannel[]>(OFFICIAL_SOCIAL_CHANNELS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editButtonText, setEditButtonText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await api.getSettings();
        if (settings.socialChannels && settings.socialChannels.length > 0) {
          setChannels(settings.socialChannels);
        }
      } catch (err) {
        console.error('Error fetching social settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleToggleChannel = async (channelId: string) => {
    const updated = channels.map(c => {
      if (c.id === channelId) {
        return { ...c, enabled: !c.enabled };
      }
      return c;
    });
    setChannels(updated);

    const targetChannel = updated.find(c => c.id === channelId);
    if (targetChannel) {
      try {
        await api.updateSocialChannel({
          id: targetChannel.id,
          enabled: targetChannel.enabled
        });
        showSuccessMessage();
      } catch (e) {
        console.error('Failed to toggle channel', e);
      }
    }
  };

  const startEditing = (channel: SocialChannel) => {
    setEditingId(channel.id);
    setEditUrl(channel.url);
    setEditButtonText(channel.buttonText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditUrl('');
    setEditButtonText('');
  };

  const handleSaveChannel = async (channelId: string) => {
    if (!editUrl.trim()) return;
    setIsSaving(true);
    try {
      const updated = channels.map(c => {
        if (c.id === channelId) {
          return {
            ...c,
            url: editUrl.trim(),
            buttonText: editButtonText.trim() || c.buttonText
          };
        }
        return c;
      });
      setChannels(updated);

      await api.updateSocialChannel({
        id: channelId,
        url: editUrl.trim(),
        buttonText: editButtonText.trim()
      });

      setEditingId(null);
      showSuccessMessage();
    } catch (err) {
      console.error('Error saving channel:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToOfficial = async () => {
    if (window.confirm('Reset all social and community links to official PHYSICS FORWARD defaults?')) {
      setIsSaving(true);
      try {
        setChannels(OFFICIAL_SOCIAL_CHANNELS);
        await api.updateSettings({
          socialChannels: OFFICIAL_SOCIAL_CHANNELS,
          socialLinks: {
            youtube: 'https://www.youtube.com/@sumanacharya_physicsforward',
            facebook: 'https://www.facebook.com/physicsforward',
            instagram: 'https://www.instagram.com/physicsforward?igsh=dGN3MGFja3Jva2M0',
            telegram: 'https://t.me/sumanacharya_physicsforward',
            whatsappChannel: 'https://whatsapp.com/channel/0029VbCCCCTGehELHL83HU3K',
            whatsappGroup: 'https://chat.whatsapp.com/HQiA0zocDAuL4GjFrLD7oh?mode=hqrt2',
            whatsapp: 'https://chat.whatsapp.com/HQiA0zocDAuL4GjFrLD7oh?mode=hqrt2'
          }
        });
        showSuccessMessage();
      } catch (err) {
        console.error('Failed to reset', err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const showSuccessMessage = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Central Real-Time Sync
            </span>
          </div>
          <h3 className="text-xl font-black text-neutral-900 mt-1">
            {t('অফিসিয়াল সোশ্যাল মিডিয়া ও কমিউনিটি হ্যান্ডেল সেটিংস', 'Official Social Media & Community Channels')}
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            {t(
              'ওয়েবসাইট, মোবাইল অ্যাপ এবং টিচার পোর্টালে প্রদর্শিত অফিশিয়াল ইউটিউব, ফেসবুক, ইনস্টাগ্রাম, টেলিগ্রাম ও হোয়াটসঅ্যাপের লিঙ্ক এবং ভিজিবিলিটি ম্যানেজ করুন।',
              'Manage official YouTube, Facebook, Instagram, Telegram, and WhatsApp Channel/Group links and toggle their live visibility.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleResetToOfficial}
            disabled={isSaving}
            className="px-3.5 py-2 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('অফিসিয়াল ডিফল্টে ফিরুন', 'Reset to Defaults')}</span>
          </button>
        </div>
      </div>

      {/* Success notification toast */}
      {savedSuccess && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t('সোশ্যাল চ্যানেল সেটিংস সেন্ট্রাল ডেটাবেসে সংরক্ষিত হয়েছে!', 'Social channel settings saved to central database successfully!')}</span>
        </div>
      )}

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {channels.map(channel => {
          const isEditing = editingId === channel.id;

          return (
            <div
              key={channel.id}
              className={`bg-white rounded-3xl border transition-all p-5 flex flex-col justify-between ${
                channel.enabled
                  ? 'border-neutral-200 shadow-xs'
                  : 'border-neutral-200 bg-neutral-50/60 opacity-75'
              }`}
            >
              <div className="space-y-4">
                {/* Header: Icon, Name & Toggle */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 p-1 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <SocialPlatformIcon platformId={channel.id} size={36} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-neutral-900">
                          {channel.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933]" />
                      </div>
                      <p className="text-xs font-mono text-[#FF9933]">
                        {channel.handle}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Visibility Switch */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleChannel(channel.id)}
                      title={channel.enabled ? 'Click to disable' : 'Click to enable'}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        channel.enabled
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-neutral-200 text-neutral-600 border border-neutral-300'
                      }`}
                    >
                      {channel.enabled ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-neutral-500" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Edit Form or Display Info */}
                {isEditing ? (
                  <div className="space-y-3 pt-2 border-t border-neutral-100">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                        {t('অফিসিয়াল URL (Open Link)', 'Official URL')}
                      </label>
                      <input
                        type="url"
                        value={editUrl}
                        onChange={e => setEditUrl(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-neutral-300 focus:outline-none focus:border-[#FF9933]"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                        {t('বাটন লেবেল (Button Text)', 'Button Text')}
                      </label>
                      <input
                        type="text"
                        value={editButtonText}
                        onChange={e => setEditButtonText(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-[#FF9933]"
                        placeholder="Visit Channel"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                      >
                        {t('বাতিল', 'Cancel')}
                      </button>
                      <button
                        onClick={() => handleSaveChannel(channel.id)}
                        disabled={isSaving}
                        className="px-4 py-1.5 rounded-xl bg-[#FF9933] text-black text-xs font-extrabold hover:bg-[#ffaa55] flex items-center gap-1 shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isSaving ? 'সংরক্ষণ...' : t('সংরক্ষণ করুন', 'Save')}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {channel.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono bg-neutral-50 p-2 rounded-xl truncate border border-neutral-200/60">
                      <LinkIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{channel.url}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions: Preview Button & Edit Button */}
              {!isEditing && (
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3 mt-4">
                  <button
                    onClick={() => startEditing(channel)}
                    className="text-xs font-bold text-neutral-700 hover:text-black hover:underline"
                  >
                    {t('সম্পাদনা (Edit Link)', 'Edit Link')}
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1 hover:brightness-110 shadow-xs"
                      style={{
                        backgroundColor: channel.accentColor === '#FF0000' ? '#E50914' : channel.accentColor
                      }}
                    >
                      <span>{channel.buttonText}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Guidelines Box */}
      <div className="bg-neutral-900 text-neutral-300 p-6 rounded-3xl text-xs space-y-2 border border-neutral-800">
        <div className="flex items-center gap-2 text-[#FF9933] font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Social Handle Protocol</span>
        </div>
        <p className="leading-relaxed">
          Only official PHYSICS FORWARD accounts managed by Suman Acharya are allowed. Do not invent alternative handles or personal social URLs. The official verified accounts are:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-neutral-400">
          <li>• YouTube: @sumanacharya_physicsforward</li>
          <li>• Facebook: /physicsforward</li>
          <li>• Instagram: @physicsforward</li>
          <li>• Telegram: @sumanacharya_physicsforward</li>
          <li>• WhatsApp Channel: PHYSICS FORWARD Broadcast</li>
          <li>• WhatsApp Group: PHYSICS FORWARD Community</li>
        </ul>
      </div>
    </div>
  );
};
