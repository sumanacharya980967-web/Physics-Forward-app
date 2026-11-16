import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PhysicsFormula } from '../../types';
import { INITIAL_FORMULAS } from '../../data/mockData';
import {
  Calculator,
  Search,
  BookOpen,
  ArrowRightLeft,
  Sparkles,
  Zap,
  RotateCcw,
  Check,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export const PhysicsTools: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'formulas' | 'calculator' | 'converter' | 'concepts'>('formulas');

  // Formula Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');

  // Physics Calculator State
  const [calcType, setCalcType] = useState<'kinematics' | 'ohms' | 'lens' | 'energy'>('ohms');
  // Ohm's law inputs
  const [calcV, setCalcV] = useState('');
  const [calcI, setCalcI] = useState('2');
  const [calcR, setCalcR] = useState('10');
  const [ohmsResult, setOhmsResult] = useState<{ v: number; p: number } | null>({ v: 20, p: 40 });

  // Kinematics inputs
  const [kinU, setKinU] = useState('0');
  const [kinA, setKinA] = useState('9.8');
  const [kinT, setKinT] = useState('3');
  const [kinResult, setKinResult] = useState<{ v: number; s: number } | null>({ v: 29.4, s: 44.1 });

  // Lens formula inputs
  const [lensU, setLensU] = useState('-30');
  const [lensF, setLensF] = useState('20');
  const [lensResult, setLensResult] = useState<{ v: number; m: number; p: number } | null>({ v: 60, m: -2, p: 5 });

  // Unit Converter State
  const [unitType, setUnitType] = useState<'force' | 'energy' | 'pressure' | 'power' | 'magnetic' | 'viscosity'>('force');
  const [fromValue, setFromValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState('newton');
  const [toUnit, setToUnit] = useState('dyne');

  const chapters = ['all', 'Current Electricity', 'Optics', 'Behavior of Gases', 'Kinematics'];

  const filteredFormulas = INITIAL_FORMULAS.filter(f => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.titleBn.includes(searchQuery) ||
      f.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChapter = selectedChapter === 'all' || f.chapter === selectedChapter;
    return matchesSearch && matchesChapter;
  });

  const handleComputeOhms = () => {
    const i = parseFloat(calcI) || 0;
    const r = parseFloat(calcR) || 0;
    const v = i * r;
    const p = v * i;
    setOhmsResult({ v: Math.round(v * 100) / 100, p: Math.round(p * 100) / 100 });
  };

  const handleComputeKinematics = () => {
    const u = parseFloat(kinU) || 0;
    const a = parseFloat(kinA) || 0;
    const t = parseFloat(kinT) || 0;
    const v = u + a * t;
    const s = u * t + 0.5 * a * t * t;
    setKinResult({ v: Math.round(v * 100) / 100, s: Math.round(s * 100) / 100 });
  };

  const handleComputeLens = () => {
    const u = parseFloat(lensU) || 0;
    const f = parseFloat(lensF) || 0;
    if (u === 0 || f === 0) return;
    // 1/v = 1/f + 1/u => v = (f * u) / (u + f)
    const v = (f * u) / (u + f);
    const m = v / u;
    const p = 100 / f; // Dioptres (if f in cm)
    setLensResult({ v: Math.round(v * 100) / 100, m: Math.round(m * 100) / 100, p: Math.round(p * 100) / 100 });
  };

  const computeUnitConversion = (): number => {
    const val = Number(fromValue) || 0;
    if (unitType === 'force') {
      let inNewtons = val;
      if (fromUnit === 'dyne') inNewtons = val * 1e-5;
      if (fromUnit === 'kgf') inNewtons = val * 9.80665;

      if (toUnit === 'newton') return inNewtons;
      if (toUnit === 'dyne') return inNewtons * 1e5;
      if (toUnit === 'kgf') return inNewtons / 9.80665;
    } else if (unitType === 'energy') {
      let inJoules = val;
      if (fromUnit === 'erg') inJoules = val * 1e-7;
      if (fromUnit === 'calorie') inJoules = val * 4.184;
      if (fromUnit === 'ev') inJoules = val * 1.60218e-19;
      if (fromUnit === 'kwh') inJoules = val * 3.6e6;

      if (toUnit === 'joule') return inJoules;
      if (toUnit === 'erg') return inJoules * 1e7;
      if (toUnit === 'calorie') return inJoules / 4.184;
      if (toUnit === 'ev') return inJoules / 1.60218e-19;
      if (toUnit === 'kwh') return inJoules / 3.6e6;
    } else if (unitType === 'pressure') {
      let inPa = val;
      if (fromUnit === 'barye') inPa = val * 0.1; // 1 dyne/cm² = 0.1 Pa
      if (fromUnit === 'atm') inPa = val * 101325;
      if (fromUnit === 'bar') inPa = val * 100000;
      if (fromUnit === 'torr') inPa = val * 133.322;

      if (toUnit === 'pa') return inPa;
      if (toUnit === 'barye') return inPa * 10;
      if (toUnit === 'atm') return inPa / 101325;
      if (toUnit === 'bar') return inPa / 100000;
      if (toUnit === 'torr') return inPa / 133.322;
    } else if (unitType === 'power') {
      let inWatts = val;
      if (fromUnit === 'hp') inWatts = val * 746;
      if (fromUnit === 'kw') inWatts = val * 1000;
      if (fromUnit === 'erg_s') inWatts = val * 1e-7;

      if (toUnit === 'watt') return inWatts;
      if (toUnit === 'hp') return inWatts / 746;
      if (toUnit === 'kw') return inWatts / 1000;
      if (toUnit === 'erg_s') return inWatts * 1e7;
    } else if (unitType === 'magnetic') {
      let inTesla = val;
      if (fromUnit === 'gauss') inTesla = val * 1e-4;
      if (fromUnit === 'microtesla') inTesla = val * 1e-6;

      if (toUnit === 'tesla') return inTesla;
      if (toUnit === 'gauss') return inTesla * 1e4;
      if (toUnit === 'microtesla') return inTesla * 1e6;
    } else if (unitType === 'viscosity') {
      let inPaS = val;
      if (fromUnit === 'poise') inPaS = val * 0.1;
      if (fromUnit === 'centipoise') inPaS = val * 0.001;

      if (toUnit === 'pa_s') return inPaS;
      if (toUnit === 'poise') return inPaS * 10;
      if (toUnit === 'centipoise') return inPaS * 1000;
    }
    return val;
  };

  return (
    <div className="space-y-6">
      {/* Sub-nav Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'formulas' ? 'bg-[#FF9933] text-black shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:text-black'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          {t('ফর্মুলা ব্যাঙ্ক (Formula Bank)', 'Formula Bank')}
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'calculator' ? 'bg-[#FF9933] text-black shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:text-black'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          {t('ফিজিক্স ক্যালকুলেটর (Physics Calculator)', 'Physics Calculator')}
        </button>

        <button
          onClick={() => setActiveTab('converter')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'converter' ? 'bg-[#FF9933] text-black shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:text-black'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          {t('একক রূপান্তরকারী (Unit Converter)', 'Unit Converter')}
        </button>

        <button
          onClick={() => setActiveTab('concepts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'concepts' ? 'bg-[#FF9933] text-black shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:text-black'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          {t('কনসেপ্ট লাইব্রেরি ও রিভিশন', 'Concept Library & Revision')}
        </button>
      </div>

      {/* Tab 1: FORMULA BANK */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('সূত্র বা অধ্যায়ের নাম লিখে অনুসন্ধান করো...', 'Search by formula, topic, or keyword...')}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
              />
            </div>
            <select
              value={selectedChapter}
              onChange={e => setSelectedChapter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-[#FF9933]"
            >
              <option value="all">{t('সকল অধ্যায় (All Chapters)', 'All Chapters')}</option>
              <option value="Current Electricity">{t('চলতড়িৎ (Current Electricity)', 'Current Electricity')}</option>
              <option value="Optics">{t('আলোকবিজ্ঞান (Optics)', 'Optics')}</option>
              <option value="Behavior of Gases">{t('গ্যাসের আচরণ (Gas Laws)', 'Behavior of Gases')}</option>
              <option value="Kinematics">{t('গতিবিদ্যা (Kinematics)', 'Kinematics')}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFormulas.map(f => (
              <div
                key={f.id}
                className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs hover:border-[#FF9933]/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#FF9933] bg-orange-50 px-2.5 py-0.5 rounded-full">
                    {t(f.chapterBn, f.chapter)}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">ID: {f.id}</span>
                </div>
                <h4 className="text-base font-bold text-neutral-900 mb-1">
                  {t(f.titleBn, f.title)}
                </h4>
                <div className="bg-neutral-900 text-white rounded-xl p-3 my-3 text-center font-mono text-lg tracking-wide border border-neutral-800">
                  {f.formula}
                </div>
                <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                  {t(f.descriptionBn, f.description)}
                </p>

                <div className="border-t border-neutral-100 pt-3">
                  <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                    {t('রাশি ও এস.আই এককসমূহ (Variables & SI Units):', 'Variables & SI Units:')}
                  </p>
                  <div className="space-y-1">
                    {f.variables.map((v, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded">
                          {v.symbol}
                        </span>
                        <span className="text-neutral-600 truncate max-w-[200px]">
                          {t(v.meaningBn, v.meaning)}
                        </span>
                        <span className="text-neutral-400 text-[11px] font-mono">{v.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: PHYSICS CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-6">
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
            <button
              onClick={() => setCalcType('ohms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                calcType === 'ohms' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {t("ওহমের সূত্র (Ohm's Law: V = IR)", "Ohm's Law: V = IR")}
            </button>
            <button
              onClick={() => setCalcType('kinematics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                calcType === 'kinematics' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {t('সমত্বরণে গতি (Kinematics: v=u+at)', 'Kinematics: v=u+at')}
            </button>
            <button
              onClick={() => setCalcType('lens')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                calcType === 'lens' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {t('লেন্সের সূত্র ও ক্ষমতা (Lens Formula: 1/v - 1/u = 1/f)', 'Lens Formula & Power')}
            </button>
          </div>

          {calcType === 'ohms' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-900">
                  {t('প্রদত্ত মান লিখুন (Input Parameters)', 'Input Parameters')}
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('তড়িৎ প্রবাহমাত্রা I (Current in Amperes)', 'Electric Current I (Amperes)')}
                  </label>
                  <input
                    type="number"
                    value={calcI}
                    onChange={e => setCalcI(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('রোধ R (Resistance in Ohms Ω)', 'Resistance R (Ohms Ω)')}
                  </label>
                  <input
                    type="number"
                    value={calcR}
                    onChange={e => setCalcR(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <button
                  onClick={handleComputeOhms}
                  className="w-full py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all"
                >
                  {t('গণনা সম্পন্ন করুন (Calculate V & Power)', 'Calculate V & Power')}
                </button>
              </div>

              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  {t('ফলাফল (Calculation Output)', 'Calculation Output')}
                </h4>
                {ohmsResult && (
                  <div className="space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                      <p className="text-xs text-neutral-500">{t('বিভব প্রভেদ (Voltage V = I × R)', 'Potential Difference (V = I × R)')}</p>
                      <p className="text-2xl font-bold font-mono text-neutral-900">{ohmsResult.v} Volt (V)</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                      <p className="text-xs text-neutral-500">{t('ব্যয়িত ক্ষমতা (Power P = V × I)', 'Consumed Power (P = V × I)')}</p>
                      <p className="text-2xl font-bold font-mono text-[#FF9933]">{ohmsResult.p} Watt (W)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {calcType === 'kinematics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-900">
                  {t('গতিবিদ্যার মান লিখুন', 'Kinematics Inputs')}
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('প্রাথমিক বেগ u (Initial Velocity m/s)', 'Initial Velocity u (m/s)')}
                  </label>
                  <input
                    type="number"
                    value={kinU}
                    onChange={e => setKinU(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ত্বরণ a (Acceleration m/s²)', 'Acceleration a (m/s²)')}
                  </label>
                  <input
                    type="number"
                    value={kinA}
                    onChange={e => setKinA(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('সময় t (Time in seconds)', 'Time t (seconds)')}
                  </label>
                  <input
                    type="number"
                    value={kinT}
                    onChange={e => setKinT(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <button
                  onClick={handleComputeKinematics}
                  className="w-full py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all"
                >
                  {t('বেগ ও দূরত্ব নির্ণয় করো', 'Calculate Final Velocity & Distance')}
                </button>
              </div>

              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  {t('ফলাফল (Calculation Output)', 'Calculation Output')}
                </h4>
                {kinResult && (
                  <div className="space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                      <p className="text-xs text-neutral-500">{t('অন্তিম বেগ (v = u + at)', 'Final Velocity (v = u + at)')}</p>
                      <p className="text-2xl font-bold font-mono text-neutral-900">{kinResult.v} m/s</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                      <p className="text-xs text-neutral-500">{t('অতিক্রান্ত দূরত্ব (s = ut + ½at²)', 'Displacement (s = ut + ½at²)')}</p>
                      <p className="text-2xl font-bold font-mono text-[#FF9933]">{kinResult.s} meters</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {calcType === 'lens' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-neutral-900">
                  {t('লেন্সের দূরত্ব (চিহ্ন নিয়ম সহ সেন্টিমিটারে)', 'Lens Parameters (in cm)')}
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('বস্তুর দূরত্ব u (Object Distance cm, e.g. -30)', 'Object Distance u (cm, e.g. -30)')}
                  </label>
                  <input
                    type="number"
                    value={lensU}
                    onChange={e => setLensU(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ফোকাস দূরত্ব f (Focal Length cm, + for Convex)', 'Focal Length f (cm, + for Convex)')}
                  </label>
                  <input
                    type="number"
                    value={lensF}
                    onChange={e => setLensF(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
                <button
                  onClick={handleComputeLens}
                  className="w-full py-2.5 bg-[#FF9933] text-black font-bold text-xs rounded-xl hover:bg-[#ffaa55] transition-all"
                >
                  {t('প্রতিবিম্বের অবস্থান ও ক্ষমতা নির্ণয়', 'Calculate Image Distance & Power')}
                </button>
              </div>

              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  {t('ফলাফল (Calculation Output)', 'Calculation Output')}
                </h4>
                {lensResult && (
                  <div className="space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                      <p className="text-xs text-neutral-500">{t('প্রতিবিম্বের দূরত্ব v (Image Distance)', 'Image Distance v')}</p>
                      <p className="text-2xl font-bold font-mono text-neutral-900">{lensResult.v} cm</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-neutral-200">
                      <p className="text-xs text-neutral-500">{t('লেন্সের ক্ষমতা P (Lens Power = 100/f)', 'Lens Power P')}</p>
                      <p className="text-2xl font-bold font-mono text-[#FF9933]">{lensResult.p} Dioptre (D)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: UNIT CONVERTER */}
      {activeTab === 'converter' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-6">
            <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
              <button
                onClick={() => { setUnitType('force'); setFromUnit('newton'); setToUnit('dyne'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${unitType === 'force' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600 hover:text-black'}`}
              >
                {t('বল (Force: N, dyne, kgf)', 'Force (N, dyne, kgf)')}
              </button>
              <button
                onClick={() => { setUnitType('energy'); setFromUnit('joule'); setToUnit('erg'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${unitType === 'energy' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600 hover:text-black'}`}
              >
                {t('শক্তি (Energy: J, erg, cal, eV, kWh)', 'Energy (J, erg, cal, eV, kWh)')}
              </button>
              <button
                onClick={() => { setUnitType('pressure'); setFromUnit('atm'); setToUnit('pa'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${unitType === 'pressure' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600 hover:text-black'}`}
              >
                {t('চাপ (Pressure: Pa, dyne/cm², atm, torr)', 'Pressure (Pa, dyne/cm², atm, torr)')}
              </button>
              <button
                onClick={() => { setUnitType('power'); setFromUnit('hp'); setToUnit('watt'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${unitType === 'power' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600 hover:text-black'}`}
              >
                {t('ক্ষমতা (Power: W, HP, kW, erg/s)', 'Power (W, HP, kW, erg/s)')}
              </button>
              <button
                onClick={() => { setUnitType('magnetic'); setFromUnit('tesla'); setToUnit('gauss'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${unitType === 'magnetic' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600 hover:text-black'}`}
              >
                {t('চৌম্বক ক্ষেত্র (Magnetic: Tesla, Gauss)', 'Magnetic (Tesla, Gauss)')}
              </button>
              <button
                onClick={() => { setUnitType('viscosity'); setFromUnit('pa_s'); setToUnit('poise'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${unitType === 'viscosity' ? 'bg-[#FF9933] text-black' : 'bg-neutral-100 text-neutral-600 hover:text-black'}`}
              >
                {t('সান্দ্রতাঙ্ক (Viscosity: Pa·s, Poise)', 'Viscosity (Pa·s, Poise)')}
              </button>
            </div>

            {/* Quick Conversion Presets */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                {t('দ্রুত নির্বাচন (Quick Presets):', 'Quick Presets:')}
              </span>
              <button
                onClick={() => { setUnitType('force'); setFromValue(1); setFromUnit('newton'); setToUnit('dyne'); }}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono transition-colors"
              >
                1 N → Dyne (10⁵)
              </button>
              <button
                onClick={() => { setUnitType('energy'); setFromValue(1); setFromUnit('joule'); setToUnit('erg'); }}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono transition-colors"
              >
                1 J → Erg (10⁷)
              </button>
              <button
                onClick={() => { setUnitType('pressure'); setFromValue(1); setFromUnit('atm'); setToUnit('pa'); }}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono transition-colors"
              >
                1 atm → Pa
              </button>
              <button
                onClick={() => { setUnitType('magnetic'); setFromValue(1); setFromUnit('tesla'); setToUnit('gauss'); }}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono transition-colors"
              >
                1 Tesla → Gauss (10⁴)
              </button>
              <button
                onClick={() => { setUnitType('viscosity'); setFromValue(1); setFromUnit('pa_s'); setToUnit('poise'); }}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono transition-colors"
              >
                1 Pa·s → Poise (10)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-end">
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('মান প্রদান করো', 'Value to Convert')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={fromValue}
                    onChange={e => setFromValue(parseFloat(e.target.value) || 0)}
                    className="w-1/2 px-3 py-2.5 rounded-xl border border-neutral-300 text-base font-mono focus:outline-none focus:border-[#FF9933]"
                  />
                  <select
                    value={fromUnit}
                    onChange={e => setFromUnit(e.target.value)}
                    className="w-1/2 px-3 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:border-[#FF9933]"
                  >
                    {unitType === 'force' && (
                      <>
                        <option value="newton">Newton (N) [SI]</option>
                        <option value="dyne">Dyne [CGS]</option>
                        <option value="kgf">Kilogram-force (kgf)</option>
                      </>
                    )}
                    {unitType === 'energy' && (
                      <>
                        <option value="joule">Joule (J) [SI]</option>
                        <option value="erg">Erg [CGS]</option>
                        <option value="calorie">Calorie (cal)</option>
                        <option value="ev">Electron-volt (eV)</option>
                        <option value="kwh">Kilowatt-hour (kWh)</option>
                      </>
                    )}
                    {unitType === 'pressure' && (
                      <>
                        <option value="pa">Pascal (N/m²) [SI]</option>
                        <option value="barye">Barye / dyne/cm² [CGS]</option>
                        <option value="atm">Atmosphere (atm)</option>
                        <option value="bar">Bar</option>
                        <option value="torr">Torr (mm of Hg)</option>
                      </>
                    )}
                    {unitType === 'power' && (
                      <>
                        <option value="watt">Watt (W) [SI]</option>
                        <option value="hp">Horsepower (HP)</option>
                        <option value="kw">Kilowatt (kW)</option>
                        <option value="erg_s">Erg/sec [CGS]</option>
                      </>
                    )}
                    {unitType === 'magnetic' && (
                      <>
                        <option value="tesla">Tesla (T) [SI]</option>
                        <option value="gauss">Gauss (G) [CGS]</option>
                        <option value="microtesla">Microtesla (µT)</option>
                      </>
                    )}
                    {unitType === 'viscosity' && (
                      <>
                        <option value="pa_s">Pa·s (Poiseuille) [SI]</option>
                        <option value="poise">Poise (P) [CGS]</option>
                        <option value="centipoise">Centipoise (cP)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="md:col-span-1 flex justify-center pb-1">
                <button
                  type="button"
                  title="Swap units"
                  onClick={() => {
                    const temp = fromUnit;
                    setFromUnit(toUnit);
                    setToUnit(temp);
                  }}
                  className="p-2.5 rounded-xl border border-neutral-300 hover:border-[#FF9933] hover:bg-neutral-50 transition-colors"
                >
                  <ArrowRightLeft className="w-4 h-4 text-neutral-700" />
                </button>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('কোন এককে রূপান্তরিত হবে', 'To Unit')}
                </label>
                <select
                  value={toUnit}
                  onChange={e => setToUnit(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white focus:outline-none focus:border-[#FF9933]"
                >
                  {unitType === 'force' && (
                    <>
                      <option value="dyne">Dyne [CGS]</option>
                      <option value="newton">Newton (N) [SI]</option>
                      <option value="kgf">Kilogram-force (kgf)</option>
                    </>
                  )}
                  {unitType === 'energy' && (
                    <>
                      <option value="erg">Erg [CGS]</option>
                      <option value="joule">Joule (J) [SI]</option>
                      <option value="calorie">Calorie (cal)</option>
                      <option value="ev">Electron-volt (eV)</option>
                      <option value="kwh">Kilowatt-hour (kWh)</option>
                    </>
                  )}
                  {unitType === 'pressure' && (
                    <>
                      <option value="pa">Pascal (N/m²) [SI]</option>
                      <option value="barye">Barye / dyne/cm² [CGS]</option>
                      <option value="atm">Atmosphere (atm)</option>
                      <option value="bar">Bar</option>
                      <option value="torr">Torr (mm of Hg)</option>
                    </>
                  )}
                  {unitType === 'power' && (
                    <>
                      <option value="watt">Watt (W) [SI]</option>
                      <option value="hp">Horsepower (HP)</option>
                      <option value="kw">Kilowatt (kW)</option>
                      <option value="erg_s">Erg/sec [CGS]</option>
                    </>
                  )}
                  {unitType === 'magnetic' && (
                    <>
                      <option value="gauss">Gauss (G) [CGS]</option>
                      <option value="tesla">Tesla (T) [SI]</option>
                      <option value="microtesla">Microtesla (µT)</option>
                    </>
                  )}
                  {unitType === 'viscosity' && (
                    <>
                      <option value="poise">Poise (P) [CGS]</option>
                      <option value="pa_s">Pa·s (Poiseuille) [SI]</option>
                      <option value="centipoise">Centipoise (cP)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="bg-neutral-900 text-white rounded-xl p-5 text-center shadow-inner">
              <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wider">
                {t('রূপান্তরিত মান (Converted Result)', 'Converted Result')}
              </p>
              <p className="text-3xl font-extrabold font-mono text-[#FF9933]">
                {computeUnitConversion().toLocaleString(undefined, { maximumSignificantDigits: 7 })} <span className="text-xl text-neutral-300 uppercase">{toUnit}</span>
              </p>
              <p className="text-xs text-neutral-400 mt-2 font-mono">
                {fromValue} {fromUnit} = {computeUnitConversion().toExponential(4)} {toUnit}
              </p>
            </div>
          </div>

          {/* CGS to SI Key Equivalents Reference Card */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm">
            <h4 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF9933]" />
              {t('CGS ও SI এককের গুরুত্বপূর্ণ সম্পর্ক (CGS ↔ SI Physics Cheat Sheet)', 'CGS ↔ SI Key Equivalents Cheat Sheet')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-[11px] font-bold text-[#FF9933] uppercase">বল (Force)</span>
                <p className="text-sm font-bold text-neutral-900 font-mono mt-1">1 N = 10⁵ dyne</p>
                <p className="text-xs text-neutral-500 mt-0.5">1 dyne = 10⁻⁵ N | 1 kgf = 9.806 N</p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-[11px] font-bold text-[#FF9933] uppercase">শক্তি ও কার্য (Energy)</span>
                <p className="text-sm font-bold text-neutral-900 font-mono mt-1">1 Joule = 10⁷ erg</p>
                <p className="text-xs text-neutral-500 mt-0.5">1 cal = 4.184 J | 1 eV = 1.602×10⁻¹⁹ J</p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-[11px] font-bold text-[#FF9933] uppercase">চাপ (Pressure)</span>
                <p className="text-sm font-bold text-neutral-900 font-mono mt-1">1 Pa = 10 dyne/cm²</p>
                <p className="text-xs text-neutral-500 mt-0.5">1 atm = 1.013×10⁵ Pa = 760 torr</p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-[11px] font-bold text-[#FF9933] uppercase">ক্ষমতা (Power)</span>
                <p className="text-sm font-bold text-neutral-900 font-mono mt-1">1 Watt = 10⁷ erg/s</p>
                <p className="text-xs text-neutral-500 mt-0.5">1 Horsepower (HP) = 746 Watt</p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-[11px] font-bold text-[#FF9933] uppercase">চৌম্বক ক্ষেত্র (Magnetic Field)</span>
                <p className="text-sm font-bold text-neutral-900 font-mono mt-1">1 Tesla = 10⁴ Gauss</p>
                <p className="text-xs text-neutral-500 mt-0.5">1 Gauss = 10⁻⁴ Tesla = 100 µT</p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-[11px] font-bold text-[#FF9933] uppercase">সান্দ্রতাঙ্ক (Viscosity)</span>
                <p className="text-sm font-bold text-neutral-900 font-mono mt-1">1 Pa·s = 10 Poise</p>
                <p className="text-xs text-neutral-500 mt-0.5">1 Poise = 0.1 Pa·s = 100 centipoise (cP)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: CONCEPT LIBRARY */}
      {activeTab === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              চলতড়িৎ (Current Electricity)
            </span>
            <h4 className="text-base font-bold text-neutral-900">
              {t('রোধের ওপর তাপমাত্রার প্রভাব', 'Effect of Temperature on Resistance')}
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t(
                'বিশুদ্ধ ধাতব পরিবাহীর তাপমাত্রা বৃদ্ধি করলে মুক্ত ইলেকট্রনগুলির সাথে ধাতব পরমাণুগুলির সংঘর্ষের হার বৃদ্ধি পায়, ফলে রোধ বৃদ্ধি পায়। তবে অর্ধপরিবাহী (যেমন সিলিকন, জার্মেনিয়াম) ক্ষেত্রে তাপমাত্রা বাড়লে রোধ হ্রাস পায়।',
                'In pure metallic conductors, increasing temperature increases the rate of collision of free electrons with lattice ions, thereby increasing resistance. In semiconductors, resistance decreases with temperature.'
              )}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              আলোকবিজ্ঞান (Optics)
            </span>
            <h4 className="text-base font-bold text-neutral-900">
              {t('মরুভূমির মরীচিকা ও অভ্যন্তরীণ পূর্ণ প্রতিফলন', 'Mirage and Total Internal Reflection')}
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t(
                'মরুভূমির বালুকা রাশি তীব্র রোদে উত্তপ্ত হয়ে লাগোয়া বাতাসের স্তরকে লঘু করে দেয়। উপর থেকে নিচে নামার সময় আলো ঘন থেকে লঘু মাধ্যমে প্রতিসৃত হয়। আপতন কোণ সংকট কোণ অপেক্ষা বড় হলে অভ্যন্তরীণ পূর্ণ প্রতিফলন ঘটে এবং পথিকের কাছে জলের ভ্রম তৈরি হয়।',
                'Hot desert sand warms the bottom atmospheric layer making it optically rarer. Light traveling downward bends away from the normal until angle of incidence exceeds critical angle, undergoing total internal reflection.'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
