import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Atom, Phone, Mail, MapPin, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { CompactFooterSocialIcons } from '../social/OfficialSocialChannels';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#111111] text-white border-t border-neutral-800">
      {/* Upper Newsletter / Consultation CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-neutral-800">
        <div className="bg-neutral-900/80 rounded-2xl p-6 sm:p-8 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold tracking-tight">
              {t(
                'ভৌতবিজ্ঞান ও পদার্থবিদ্যায় সেরা প্রস্তুতির জন্য যোগাযোগ করো',
                'Connect with PHYSICS FORWARD for Physics Mastery'
              )}
            </h3>
            <p className="text-neutral-400 text-sm">
              {t(
                'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ ও উচ্চমাধ্যমিকের নিয়মিত লাইভ ও অফলাইন সাপোর্ট।',
                'Dedicated academic guidance for West Bengal Board & Council students.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:8972263462"
              className="inline-flex items-center gap-2 bg-[#FF9933] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#ffaa55] transition-all shadow-md shadow-orange-500/10"
            >
              <Phone className="w-4 h-4" />
              <span>{t('কল করো: 8972263462', 'Call: 8972263462')}</span>
            </a>
            <a
              href="mailto:suman.acharya.980967@outlook.com"
              className="inline-flex items-center gap-2 bg-neutral-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-neutral-700 transition-all border border-neutral-700"
            >
              <Mail className="w-4 h-4 text-[#FF9933]" />
              <span>{t('ইমেল পাঠাও', 'Email Us')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF9933] flex items-center justify-center text-black">
                <Atom className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                PHYSICS <span className="text-[#FF9933]">FORWARD</span>
              </span>
            </div>
            <p className="text-sm font-semibold text-[#FF9933]">
              “Understand Physics. Move Forward.”
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {t(
                'বাংলা মাধ্যমের শিক্ষার্থীদের পদার্থবিজ্ঞানের ভিত্তি সুদৃঢ় করতে তৈরি একটি আধুনিক ও নির্ভরযোগ্য শিক্ষামূলক প্ল্যাটফর্ম। গাণিতিক দক্ষতা, লাইভ ক্লাস এবং অধ্যায়ভিত্তিক পরীক্ষার মাধ্যমে প্রস্তুতি।',
                'Concept-focused Physics learning for Bengali-medium students with live classes, recorded lessons, study materials, practice and online examinations.'
              )}
            </p>
            <div className="pt-2 text-xs text-neutral-500">
              <span className="inline-flex items-center gap-1.5 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF9933]" />
                {t('নিরাপদ ও স্বীকৃত শিক্ষণ পরিবেশ', 'Verified & Secure Learning Ecosystem')}
              </span>
            </div>
          </div>

          {/* Scalable Boards & Classes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t('শিক্ষা পর্ষদ ও শ্রেণী', 'Boards & Classes')}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="hover:text-[#FF9933] transition-colors cursor-pointer flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#FF9933]" />
                WBBSE - {t('পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (Class 9 - 10)', 'Madhyamik (Class 9 - 10)')}
              </li>
              <li className="hover:text-[#FF9933] transition-colors cursor-pointer flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#FF9933]" />
                WBCHSE - {t('উচ্চমাধ্যমিক বিজ্ঞান (Class 11 - 12)', 'Higher Secondary Science (11 - 12)')}
              </li>
              <li className="hover:text-[#FF9933] transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-400">
                <ArrowRight className="w-3 h-3 text-neutral-600" />
                CBSE & ICSE {t('(আসন্ন নতুন সেশন)', '(Upcoming New Sessions)')}
              </li>
              <li className="hover:text-[#FF9933] transition-colors cursor-pointer flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#FF9933]" />
                WBJEE / NEET {t('পদার্থবিজ্ঞান ফাউন্ডেশন', 'Physics Foundation')}
              </li>
            </ul>
          </div>

          {/* Academic Features & Subjects */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t('বিষয় ও ফিচারসমূহ', 'Subjects & Learning Features')}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="hover:text-[#FF9933] transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
                {t('পদার্থবিজ্ঞান / ভৌতবিজ্ঞান (মূল ফোকাস)', 'Physics / Physical Science (Primary Focus)')}
              </li>
              <li className="text-neutral-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                {t('গণিত ও রসায়ন (শীঘ্রই উপলব্ধ)', 'Mathematics & Chemistry (Upcoming)')}
              </li>
              <li className="hover:text-[#FF9933] transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
                {t('ফর্মুলা ব্যাঙ্ক ও ফিজিক্স ক্যালকুলেটর', 'Formula Bank & Physics Calculator')}
              </li>
              <li className="hover:text-[#FF9933] transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
                {t('টাইমড অনলাইন মক টেস্ট ও স্বয়ংক্রিয় রেজাল্ট', 'Timed Online Mock Tests & Instant Results')}
              </li>
              <li className="hover:text-[#FF9933] transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
                {t('বিগত ৫ বছরের বোর্ড প্রশ্ন সমাধান (PDF)', 'Last 5 Years Solved Board Papers (PDF)')}
              </li>
            </ul>
          </div>

          {/* Official Contact Info (Mandatory) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t('অফিসিয়াল যোগাযোগ', 'Official Contact Information')}
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Contai, Purba Medinipur</p>
                  <p className="text-neutral-400">West Bengal, India</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF9933] shrink-0" />
                <a href="tel:8972263462" className="hover:text-[#FF9933] font-medium text-white transition-colors">
                  8972263462
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF9933] shrink-0" />
                <a
                  href="mailto:suman.acharya.980967@outlook.com"
                  className="hover:text-[#FF9933] break-all text-neutral-300 transition-colors"
                >
                  suman.acharya.980967@outlook.com
                </a>
              </div>

              {/* Official Social Links in Contact column */}
              <div className="pt-2">
                <p className="text-[11px] font-bold text-neutral-400 mb-2">
                  {t('অফিসিয়াল চ্যানেলসমূহ', 'Official Channels')}:
                </p>
                <CompactFooterSocialIcons />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright, Social Media Links and Legal */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} PHYSICS FORWARD. All rights reserved.</p>

          {/* Compact Official Social Icon Row */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-400 hidden lg:inline">Official Handles:</span>
            <CompactFooterSocialIcons />
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <span className="hover:text-white cursor-pointer">{t('গোপনীয়তা নীতি', 'Privacy Policy')}</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">{t('শর্তাবলী', 'Terms & Conditions')}</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">{t('রিফান্ড নীতি', 'Refund Policy')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
