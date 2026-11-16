import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SocialChannel } from '../../types';
import { OFFICIAL_SOCIAL_CHANNELS } from '../../data/mockData';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

// Custom recognizable brand icons for each platform
export const SocialPlatformIcon: React.FC<{
  platformId: string;
  className?: string;
  size?: number;
}> = ({ platformId, className = '', size = 24 }) => {
  switch (platformId) {
    case 'youtube':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect width="24" height="24" rx="6" fill="#FF0000" />
          <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect width="24" height="24" rx="6" fill="#1877F2" />
          <path
            d="M15.5 13.5H13V20H10V13.5H8V11H10V9.2C10 7.2 11.2 6 13.1 6C14 6 14.9 6.2 14.9 6.2V8.3H13.8C12.8 8.3 12.5 8.9 12.5 9.5V11H15.2L14.8 13.5H15.5Z"
            fill="white"
          />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <defs>
            <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FED373" />
              <stop offset="25%" stopColor="#F15245" />
              <stop offset="50%" stopColor="#D92E7F" />
              <stop offset="75%" stopColor="#9B36B7" />
              <stop offset="100%" stopColor="#515ECF" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="3.8" stroke="white" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.6" />
          <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
        </svg>
      );
    case 'telegram':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect width="24" height="24" rx="6" fill="#229ED9" />
          <path
            d="M5.5 11.8L17.2 7.2C17.7 7 18.2 7.4 18 7.9L16 17.5C15.8 18.1 15.2 18.3 14.7 18L11.8 15.8L10.4 17.1C10.2 17.3 10 17.4 9.8 17.4L10 13.9L16.2 8.3C16.5 8 16.1 7.8 15.8 8L8.1 12.8L5.3 11.9C4.7 11.7 4.7 11.1 5.5 10.8V11.8Z"
            fill="white"
          />
        </svg>
      );
    case 'whatsapp_channel':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect width="24" height="24" rx="6" fill="#25D366" />
          {/* WhatsApp speech bubble with broadcast bullhorn/channel spark */}
          <path
            d="M12 5C8.13 5 5 8.13 5 12C5 13.38 5.4 14.67 6.09 15.76L5.3 18.7L8.34 17.93C9.4 18.6 10.65 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5Z"
            fill="white"
          />
          <path
            d="M10.2 9.5C10 9 9.8 9 9.5 9C9.3 9 9 9 8.8 9.2C8.5 9.5 7.8 10.1 7.8 11.4C7.8 12.7 8.7 14 8.8 14.2C9 14.4 10.6 16.8 13.1 17.8C15.2 18.6 15.6 18.4 16 18.4C16.5 18.3 17.4 17.8 17.6 17.2C17.8 16.6 17.8 16.1 17.7 16C17.6 15.9 17.4 15.8 17.1 15.7C16.8 15.5 15.4 14.8 15.1 14.7C14.8 14.6 14.6 14.6 14.4 14.9C14.2 15.2 13.6 15.9 13.4 16.1C13.2 16.3 13.1 16.3 12.8 16.2C12.5 16 11.5 15.6 10.4 14.6C9.5 13.8 8.9 12.8 8.7 12.5C8.5 12.2 8.7 12.1 8.8 12C9 11.8 9.2 11.6 9.3 11.4C9.5 11.2 9.5 11.1 9.6 10.9C9.7 10.7 9.7 10.5 9.6 10.3C9.5 10.1 9 8.9 8.8 8.4"
            fill="#25D366"
          />
        </svg>
      );
    case 'whatsapp_group':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect width="24" height="24" rx="6" fill="#128C7E" />
          {/* Community Group Icon: Multiple speech bubbles / people symbol */}
          <path
            d="M8.5 11C9.6 11 10.5 10.1 10.5 9C10.5 7.9 9.6 7 8.5 7C7.4 7 6.5 7.9 6.5 9C6.5 10.1 7.4 11 8.5 11ZM15.5 11C16.6 11 17.5 10.1 17.5 9C17.5 7.9 16.6 7 15.5 7C14.4 7 13.5 7.9 13.5 9C13.5 10.1 14.4 11 15.5 11ZM8.5 12.5C6.8 12.5 3.5 13.4 3.5 15.1V16.5H13.5V15.1C13.5 13.4 10.2 12.5 8.5 12.5ZM15.5 12.5C15.2 12.5 14.8 12.5 14.4 12.6C15.3 13.3 15.9 14.1 15.9 15.1V16.5H20.5V15.1C20.5 13.4 17.2 12.5 15.5 12.5Z"
            fill="white"
          />
        </svg>
      );
    default:
      return null;
  }
};

/**
 * 1. WEBSITE SOCIAL MEDIA SECTION
 * Placed above the footer:
 * Heading: Stay Connected With PHYSICS FORWARD
 * Subtitle: Follow PHYSICS FORWARD for Physics lessons, announcements, study updates, educational content and community updates.
 * 6 attractive cards with platform icon, platform name, handle/name, description, clickable button.
 */
interface WebsiteSocialSectionProps {
  channels?: SocialChannel[];
  title?: string;
  subtitle?: string;
}

export const WebsiteSocialSection: React.FC<WebsiteSocialSectionProps> = ({
  channels = OFFICIAL_SOCIAL_CHANNELS,
  title,
  subtitle
}) => {
  const { t } = useLanguage();
  const activeChannels = channels.filter(c => c.enabled !== false);

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white border-t border-b border-neutral-800">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-orange-500/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-xs font-bold text-[#FF9933]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse"></span>
            {t('অফিসিয়াল কমিউনিটি ও নেটওয়ার্ক', 'Official Community & Channels')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {title || t('Stay Connected With PHYSICS FORWARD', 'Stay Connected With PHYSICS FORWARD')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            {subtitle ||
              t(
                'ফিজিক্স পাঠ, গুরুত্বপূর্ণ ঘোষণা, স্টাডি আপডেট, শিক্ষামূলক বিষয়বস্তু এবং কমিউনিটি আপডেটের জন্য PHYSICS FORWARD ফলো করো।',
                'Follow PHYSICS FORWARD for Physics lessons, announcements, study updates, educational content and community updates.'
              )}
          </p>
        </div>

        {/* 6 Attractive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {activeChannels.map(channel => (
            <div
              key={channel.id}
              className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/50 group relative overflow-hidden"
            >
              {/* Subtle top accent gradient */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: channel.accentColor }}
              ></div>

              <div className="space-y-4">
                {/* Header with Icon, Name & Handle */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 p-1.5 bg-neutral-800/80 rounded-2xl border border-neutral-700/60 group-hover:scale-105 transition-transform">
                    <SocialPlatformIcon platformId={channel.id} size={36} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-neutral-400">
                        {channel.platform}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug truncate">
                      {channel.name}
                    </h3>
                    <p className="text-xs font-mono text-[#FF9933] truncate mt-0.5">
                      {channel.handle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed min-h-[40px]">
                  {t(channel.descriptionBn, channel.description)}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md group-hover:shadow-lg text-white hover:brightness-110 active:scale-[0.98]"
                  style={{
                    backgroundColor: channel.accentColor === '#FF0000' ? '#E50914' : channel.accentColor
                  }}
                >
                  <span>{channel.buttonText}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Safe Community Note */}
        <div className="mt-10 pt-6 border-t border-neutral-800/80 text-center text-xs text-neutral-400 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {t('যাচাইকৃত অফিশিয়াল লিঙ্ক ও নিরাপদ চ্যানেল', '100% Verified Official Handles')}
          </span>
          <span>•</span>
          <span>{t('সরাসরি সুব্রত স্যার ও সুমন স্যারের অ্যাকাডেমিক গাইডেন্স', 'Academic mentorship by Suman Acharya & Subrata Acharya')}</span>
        </div>
      </div>
    </section>
  );
};

/**
 * 2. COMPACT WEBSITE FOOTER SOCIAL ICONS
 * Clean row for website footer:
 * YouTube | Facebook | Instagram | Telegram | WhatsApp Channel | WhatsApp Group
 */
export const CompactFooterSocialIcons: React.FC<{
  channels?: SocialChannel[];
  className?: string;
}> = ({ channels = OFFICIAL_SOCIAL_CHANNELS, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 sm:gap-3 ${className}`}>
      {channels.map(channel => (
        <a
          key={channel.id}
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${channel.name} (${channel.buttonText})`}
          className="group relative flex items-center justify-center w-8 h-8 rounded-xl bg-neutral-800/90 border border-neutral-700 hover:border-neutral-500 hover:scale-110 transition-all shadow-xs"
        >
          <SocialPlatformIcon platformId={channel.id} size={18} />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-[10px] font-bold py-0.5 px-2 rounded-md whitespace-nowrap z-30 shadow-md border border-neutral-700 pointer-events-none">
            {channel.platform}
          </span>
        </a>
      ))}
    </div>
  );
};

/**
 * 3. MOBILE APP: CONNECT WITH US
 * Compact section suitable for the Mobile App home screen or menu.
 */
export const MobileSocialConnect: React.FC<{
  channels?: SocialChannel[];
  mode?: 'compact' | 'full';
}> = ({ channels = OFFICIAL_SOCIAL_CHANNELS, mode = 'compact' }) => {
  const { t } = useLanguage();
  const activeChannels = channels.filter(c => c.enabled !== false);

  if (mode === 'compact') {
    return (
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]"></span>
            <h4 className="text-xs font-extrabold text-neutral-900 tracking-tight">
              {t('আমাদের সাথে যুক্ত হও', 'Connect With Us')}
            </h4>
          </div>
          <span className="text-[10px] text-neutral-400 font-medium">Official Links</span>
        </div>

        <p className="text-[11px] text-neutral-500 leading-tight">
          {t(
            'ভিডিও লেকচার, ডাউট গ্রুপ ও স্টাডি মেটেরিয়াল পেতে অফিসিয়াল চ্যানেলে যুক্ত হও:',
            'Join official channels for video lessons, doubt community & study notes:'
          )}
        </p>

        {/* 6 Grid Icons with click-out */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {activeChannels.map(channel => (
            <a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-50 hover:bg-orange-50 border border-neutral-200/80 hover:border-orange-300 transition-all text-center group"
            >
              <SocialPlatformIcon platformId={channel.id} size={22} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold text-neutral-800 mt-1.5 leading-tight truncate w-full">
                {channel.platform}
              </span>
              <span className="text-[8px] text-neutral-500 truncate w-full">
                {channel.buttonText.split(' ')[0]}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Full detailed mode for Menu / About / More tab in Mobile App
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-neutral-900 to-black text-white p-4 rounded-3xl space-y-2 border border-neutral-800 shadow-md">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/20 px-2 py-0.5 rounded-full inline-block">
          Official Community Channels
        </span>
        <h3 className="text-sm font-extrabold text-white">
          {t('Connect With Us — PHYSICS FORWARD', 'Connect With Us — PHYSICS FORWARD')}
        </h3>
        <p className="text-[11px] text-neutral-300 leading-relaxed">
          {t(
            'অনলাইন ক্লাস, পদার্থবিজ্ঞানের ফর্মুলা নোটস এবং ডাউট সমাধানের জন্য আমাদের অফিসিয়াল প্ল্যাটফর্মসমূহে যুক্ত থাকুন।',
            'Connect across our verified platforms for video lessons, instant notices, physics notes, and peer discussions.'
          )}
        </p>
      </div>

      <div className="space-y-2.5">
        {activeChannels.map(channel => (
          <div
            key={channel.id}
            className="bg-white p-3 rounded-2xl border border-neutral-200 flex items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <SocialPlatformIcon platformId={channel.id} size={30} className="shrink-0" />
              <div className="overflow-hidden">
                <p className="font-bold text-xs text-neutral-900 truncate">{channel.name}</p>
                <p className="text-[10px] text-neutral-500 font-mono truncate">{channel.handle}</p>
              </div>
            </div>

            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold text-white shadow-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-1"
              style={{
                backgroundColor: channel.accentColor === '#FF0000' ? '#E50914' : channel.accentColor
              }}
            >
              <span>{channel.buttonText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
