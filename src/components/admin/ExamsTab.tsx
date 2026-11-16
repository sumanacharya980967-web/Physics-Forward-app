import React, { useState } from 'react';
import { Exam, Question, QuestionType, Program, Course } from '../../types';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import {
  Award,
  Plus,
  Trash2,
  Edit2,
  Copy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  AlertCircle,
  Search,
  Check,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface ExamsTabProps {
  exams: Exam[];
  programs?: Program[];
  courses?: Course[];
  onRefreshData?: () => void;
}

export const ExamsTab: React.FC<ExamsTabProps> = ({
  exams = [],
  programs = [],
  courses = [],
  onRefreshData
}) => {
  const { t } = useLanguage();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(exams[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showExamModal, setShowExamModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  // New Exam Form
  const [examTitle, setExamTitle] = useState('');
  const [examTitleBn, setExamTitleBn] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [classLevel, setClassLevel] = useState('Class 10');
  const [board, setBoard] = useState('WBBSE / WBCHSE');
  const [durationMinutes, setDurationMinutes] = useState('30');
  const [totalMarks, setTotalMarks] = useState('25');
  const [negativeMarking, setNegativeMarking] = useState('0.25');

  // New Question Form
  const [qText, setQText] = useState('');
  const [qTextBn, setQTextBn] = useState('');
  const [qType, setQType] = useState<QuestionType>('mcq');
  const [qMarks, setQMarks] = useState('4');
  const [qDifficulty, setQDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [qTopic, setQTopic] = useState('Current Electricity');
  const [optA, setOptA] = useState('');
  const [optABn, setOptABn] = useState('');
  const [optB, setOptB] = useState('');
  const [optBBn, setOptBBn] = useState('');
  const [optC, setOptC] = useState('');
  const [optCBn, setOptCBn] = useState('');
  const [optD, setOptD] = useState('');
  const [optDBn, setOptDBn] = useState('');
  const [correctOpt, setCorrectOpt] = useState('opt-a');
  const [explanationBn, setExplanationBn] = useState('');

  const filteredExams = exams.filter(e => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (e.title || '').toLowerCase().includes(q) || (e.titleBn || '').toLowerCase().includes(q);
  });

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle) return;
    try {
      const marks = parseInt(totalMarks, 10) || 20;
      await api.saveExam({
        title: examTitle,
        titleBn: examTitleBn || examTitle,
        subject,
        classLevel,
        board,
        durationMinutes: parseInt(durationMinutes, 10) || 30,
        totalMarks: marks,
        passMarks: Math.round(marks * 0.4),
        negativeMarking: parseFloat(negativeMarking) || 0,
        status: 'active',
        questions: []
      });
      setShowExamModal(false);
      setExamTitle('');
      setExamTitleBn('');
      onRefreshData?.();
      alert(t('পরীক্ষা সফলভাবে তৈরি হয়েছে!', 'Exam created successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDuplicateExam = async (id: string) => {
    try {
      await api.duplicateExam(id);
      onRefreshData?.();
      alert(t('পরীক্ষা সফলভাবে ডুপ্লিকেট করা হয়েছে!', 'Exam duplicated successfully!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await api.toggleExamStatus(id);
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExam = async (id: string) => {
    if (!confirm(t('এই পরীক্ষাটি মুছে ফেলতে চান?', 'Delete this exam?'))) return;
    try {
      await api.deleteExam(id);
      if (selectedExam?.id === id) {
        setSelectedExam(null);
      }
      onRefreshData?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam || !qText) return;
    try {
      const newQuestion: Question = {
        id: 'q-' + Date.now() + '-' + Math.floor(Math.random() * 100),
        examId: selectedExam.id,
        questionText: qText,
        questionTextBn: qTextBn || qText,
        type: qType,
        marks: parseInt(qMarks, 10) || 4,
        topic: qTopic,
        difficulty: qDifficulty,
        options: [
          { id: 'opt-a', text: optA || 'Option A', textBn: optABn || optA || 'বিকল্প ক' },
          { id: 'opt-b', text: optB || 'Option B', textBn: optBBn || optB || 'বিকল্প খ' },
          { id: 'opt-c', text: optC || 'Option C', textBn: optCBn || optC || 'বিকল্প গ' },
          { id: 'opt-d', text: optD || 'Option D', textBn: optDBn || optD || 'বিকল্প ঘ' }
        ],
        correctOptionId: correctOpt,
        explanationBn: explanationBn || 'সূত্রের সাহায্যে গণনা করলে সঠিক উত্তর পাওয়া যায়।',
        explanationEn: 'Calculated using standard formula.'
      };

      const updatedQuestions = [...(selectedExam.questions || []), newQuestion];
      await api.saveExam({
        ...selectedExam,
        questions: updatedQuestions
      });

      setSelectedExam({
        ...selectedExam,
        questions: updatedQuestions
      });

      setShowQuestionModal(false);
      setQText('');
      setQTextBn('');
      setOptA('');
      setOptB('');
      setOptC('');
      setOptD('');
      setExplanationBn('');
      onRefreshData?.();
      alert(t('প্রশ্ন সফলভাবে যুক্ত হয়েছে!', 'Question added to exam!'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQuestion = async (qId: string) => {
    if (!selectedExam) return;
    try {
      const updatedQuestions = selectedExam.questions.filter(q => q.id !== qId);
      await api.saveExam({
        ...selectedExam,
        questions: updatedQuestions
      });
      setSelectedExam({
        ...selectedExam,
        questions: updatedQuestions
      });
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CMS Control 08</span>
          </div>
          <h3 className="text-lg font-black text-neutral-900 mt-0.5">
            {t('মক টেস্ট ও প্রশ্ন ব্যাংক কন্ট্রোল সেন্টার (Exam CMS)', 'Exams & Question Bank Control')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('পরীক্ষা তৈরি, ডুপ্লিকেট, প্রশ্নপত্র প্রণয়ন, নেগেটিভ মার্কিং ও সঠিক উত্তর ব্যাখ্যা নির্ধারণ করুন', 'Create exams, author question bank, configure negative marking and step-by-step solutions')}
          </p>
        </div>

        <button
          onClick={() => setShowExamModal(true)}
          className="px-4 py-2.5 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55] flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{t('নতুন পরীক্ষা তৈরি করুন', 'Create New Exam')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Exams Master List */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('পরীক্ষা খুঁজুন...', 'Search exams...')}
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
            />
          </div>

          <div className="space-y-2">
            {filteredExams.map(ex => {
              const isSelected = selectedExam?.id === ex.id;
              return (
                <div
                  key={ex.id}
                  onClick={() => setSelectedExam(ex)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-800 shadow-md'
                      : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ex.status === 'active'
                        ? isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                        : isSelected ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {ex.status.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {ex.durationMinutes} mins · {ex.totalMarks} marks
                    </span>
                  </div>

                  <h4 className="text-xs font-bold line-clamp-1">{ex.titleBn || ex.title}</h4>
                  <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {ex.questions?.length || 0} Questions • -{ex.negativeMarking} neg
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-neutral-200/20 text-[11px]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateExam(ex.id);
                      }}
                      className={`flex items-center gap-1 font-bold ${isSelected ? 'text-[#FF9933]' : 'text-[#FF9933]'}`}
                      title="Duplicate this exam"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Duplicate</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(ex.id);
                        }}
                        className={isSelected ? 'text-neutral-300' : 'text-neutral-500'}
                      >
                        {ex.status === 'active' ? 'Archive' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteExam(ex.id);
                        }}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Selected Exam Question Bank Manager */}
        <div className="lg:col-span-2 space-y-4">
          {selectedExam ? (
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#FF9933] uppercase">{selectedExam.subject} • {selectedExam.classLevel}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">Exam ID: {selectedExam.id}</span>
                  </div>
                  <h3 className="text-base font-black text-neutral-900 mt-1">
                    {selectedExam.titleBn || selectedExam.title}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {selectedExam.durationMinutes} Minutes • Total {selectedExam.totalMarks} Marks • Negative: -{selectedExam.negativeMarking} Marks
                  </p>
                </div>

                <button
                  onClick={() => setShowQuestionModal(true)}
                  className="px-4 py-2 bg-neutral-900 text-white font-extrabold text-xs rounded-xl hover:bg-black flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>{t('প্রশ্ন যুক্ত করুন', 'Add Question')}</span>
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Question Bank Items ({selectedExam.questions?.length || 0})
                </h4>

                {(!selectedExam.questions || selectedExam.questions.length === 0) ? (
                  <div className="p-8 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-300 text-xs text-neutral-500 space-y-2">
                    <HelpCircle className="w-6 h-6 text-neutral-400 mx-auto" />
                    <p>{t('এই পরীক্ষায় এখনও কোনো প্রশ্ন যুক্ত করা হয়নি।', 'No questions in this exam yet.')}</p>
                    <button
                      onClick={() => setShowQuestionModal(true)}
                      className="px-4 py-1.5 bg-[#FF9933] text-black font-bold text-xs rounded-lg inline-block"
                    >
                      {t('প্রথম প্রশ্নটি যোগ করুন', 'Add First Question')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedExam.questions.map((q, idx) => (
                      <div key={q.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-neutral-200 flex items-center justify-center font-bold text-[10px]">
                              Q{idx + 1}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                              {q.type} • {q.marks} Marks • {q.difficulty}
                            </span>
                          </div>

                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="text-neutral-400 hover:text-red-500 p-1"
                            title="Delete question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <p className="font-bold text-neutral-900">{q.questionTextBn || q.questionText}</p>
                          {q.questionTextBn && (
                            <p className="text-[11px] text-neutral-500 mt-0.5">{q.questionText}</p>
                          )}
                        </div>

                        {/* Options */}
                        {q.options && q.options.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map(opt => {
                              const isCorrect = opt.id === q.correctOptionId;
                              return (
                                <div
                                  key={opt.id}
                                  className={`p-2 rounded-lg border text-[11px] flex items-center justify-between ${
                                    isCorrect
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                                      : 'bg-white border-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  <span>{opt.textBn || opt.text}</span>
                                  {isCorrect && (
                                    <span className="text-[10px] text-emerald-600 font-extrabold uppercase">✓ Correct</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {q.explanationBn && (
                          <div className="p-2.5 bg-orange-50/60 border border-orange-100 rounded-lg text-[11px] text-neutral-700">
                            <span className="font-bold text-[#FF9933]">Solution Explanation: </span>
                            <span>{q.explanationBn}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500">
              {t('বাম পাশ থেকে একটি পরীক্ষা নির্বাচন করুন অথবা নতুন পরীক্ষা তৈরি করুন।', 'Select an exam from the left list or create a new one.')}
            </div>
          )}
        </div>
      </div>

      {/* New Exam Modal */}
      {showExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-neutral-900">
              {t('নতুন অনলাইন মক টেস্ট তৈরি করুন', 'Create New Mock Test')}
            </h3>

            <form onSubmit={handleCreateExam} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('পরীক্ষার নাম (বাংলা) *', 'Exam Title (Bengali) *')}
                </label>
                <input
                  type="text"
                  required
                  value={examTitleBn}
                  onChange={e => setExamTitleBn(e.target.value)}
                  placeholder="e.g. চলতড়িৎ ও কুলম্বের সূত্র অধ্যায়ভিত্তিক স্পেশাল টেস্ট"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('পরীক্ষার নাম (English) *', 'Exam Title (English) *')}
                </label>
                <input
                  type="text"
                  required
                  value={examTitle}
                  onChange={e => setExamTitle(e.target.value)}
                  placeholder="e.g. Current Electricity & Coulombs Law Weekly Test"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('সময়সীমা (মিনিট)', 'Duration (Minutes)')}
                  </label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('মোট নম্বর', 'Total Marks')}
                  </label>
                  <input
                    type="number"
                    value={totalMarks}
                    onChange={e => setTotalMarks(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('নেগেটিভ মার্কিং', 'Negative Marking')}
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={negativeMarking}
                    onChange={e => setNegativeMarking(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {t('ক্লাস স্তর', 'Class Level')}
                  </label>
                  <input
                    type="text"
                    value={classLevel}
                    onChange={e => setClassLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowExamModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
                >
                  {t('পরীক্ষা তৈরি করুন', 'Create Exam')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-neutral-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-neutral-900">
              {t('পরীক্ষায় নতুন প্রশ্ন যুক্ত করুন', 'Add Question to Exam')}
            </h3>

            <form onSubmit={handleAddQuestion} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('প্রশ্ন বিবরণ (বাংলা) *', 'Question Text (Bengali) *')}
                </label>
                <textarea
                  required
                  rows={2}
                  value={qTextBn}
                  onChange={e => setQTextBn(e.target.value)}
                  placeholder="e.g. ওহমের সূত্র অনুযায়ী রোধের মান নির্ণয় করো..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('প্রশ্ন বিবরণ (English) *', 'Question Text (English) *')}
                </label>
                <textarea
                  required
                  rows={2}
                  value={qText}
                  onChange={e => setQText(e.target.value)}
                  placeholder="e.g. Calculate the equivalent resistance across terminals A and B..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Marks</label>
                  <input
                    type="number"
                    value={qMarks}
                    onChange={e => setQMarks(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Difficulty</label>
                  <select
                    value={qDifficulty}
                    onChange={e => setQDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Correct Option</label>
                  <select
                    value={correctOpt}
                    onChange={e => setCorrectOpt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white font-bold"
                  >
                    <option value="opt-a">Option A</option>
                    <option value="opt-b">Option B</option>
                    <option value="opt-c">Option C</option>
                    <option value="opt-d">Option D</option>
                  </select>
                </div>
              </div>

              {/* 4 Options */}
              <div className="space-y-2 pt-1 border-t border-neutral-100">
                <span className="text-xs font-bold text-neutral-800">Options (A, B, C, D)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={optABn}
                    onChange={e => setOptABn(e.target.value)}
                    placeholder="Option A (বাংলা)"
                    className="px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={optBBn}
                    onChange={e => setOptBBn(e.target.value)}
                    placeholder="Option B (বাংলা)"
                    className="px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={optCBn}
                    onChange={e => setOptCBn(e.target.value)}
                    placeholder="Option C (বাংলা)"
                    className="px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={optDBn}
                    onChange={e => setOptDBn(e.target.value)}
                    placeholder="Option D (বাংলা)"
                    className="px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t('সমাধান ও ব্যাখ্যা (Explanation)', 'Solution Explanation')}
                </label>
                <textarea
                  rows={2}
                  value={explanationBn}
                  onChange={e => setExplanationBn(e.target.value)}
                  placeholder="ধাপ ১: সূত্র R = V/I প্রয়োগ করে সঠিক মান পাওয়া যায়..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF9933] text-black font-extrabold text-xs rounded-xl hover:bg-[#ffaa55]"
                >
                  {t('সংরক্ষণ করুন', 'Save Question')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
