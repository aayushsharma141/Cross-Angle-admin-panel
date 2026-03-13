'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Search, HelpCircle, ArrowRight, Save, Settings, ChevronRight } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/lib/firestore-utils';
import { ErrorBoundary } from '@/components/error-boundary';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'text';
  options: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

function DiscoveryContent() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<QuizQuestion>>({ options: [] });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, 'discovery_questions'),
      (snapshot) => {
        const fetchedQuestions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as QuizQuestion[];
        // Sort by order
        fetchedQuestions.sort((a, b) => a.order - b.order);
        setQuestions(fetchedQuestions);
      },
      (error) => {
        // Ignore error if collection doesn't exist yet
        console.warn("Discovery questions fetch error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    try {
      if (!currentQuestion.question) {
        alert("Question text is required");
        return;
      }

      const questionData = {
        question: currentQuestion.question,
        type: currentQuestion.type || 'single',
        options: currentQuestion.options || [],
        order: currentQuestion.order || questions.length + 1,
        isActive: currentQuestion.isActive ?? true,
        updatedAt: new Date().toISOString()
      };

      if (currentQuestion.id) {
        await updateDoc(doc(db, 'discovery_questions', currentQuestion.id), questionData);
      } else {
        await addDoc(collection(db, 'discovery_questions'), {
          ...questionData,
          createdAt: new Date().toISOString()
        });
      }
      setIsEditing(false);
      setCurrentQuestion({ options: [] });
    } catch (error) {
      handleFirestoreError(error, currentQuestion.id ? OperationType.UPDATE : OperationType.CREATE, 'discovery_questions');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteDoc(doc(db, 'discovery_questions', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `discovery_questions/${id}`);
      }
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return <span className="inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] bg-emerald-500/15 text-emerald-400">Active</span>;
    }
    return <span className="inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] bg-slate-500/10 text-slate-400/60">Inactive</span>;
  };

  const TypeBadge = ({ type }: { type: string }) => {
    const M: Record<string, [string, string]> = {
      single: ["bg-blue-500/15 text-blue-400", "Single Choice"],
      multiple: ["bg-purple-500/15 text-purple-400", "Multiple Choice"],
      text: ["bg-amber-500/15 text-amber-400", "Text Input"]
    };
    const [c, l] = M[type] || ["bg-slate-500/10 text-slate-400/60", type];
    return <span className={`inline-flex items-center px-[9px] py-[2px] rounded-full text-[11px] font-semibold tracking-[0.03em] ${c}`}>{l}</span>;
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...(currentQuestion.options || []), '']
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions.splice(index, 1);
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[1080px]">
      <div className="flex items-center gap-1.5 text-[12px] text-slate-400/40 mb-[18px]">
        <span>Admin</span>
        <ChevronRight size={11} />
        <span className="text-slate-200/60">Discovery Engine</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-[20px]">
        <div>
          <h1 className="font-[family-name:--font-syne] text-[24px] font-extrabold text-[#e2e8f0] tracking-[-0.02em]">Discovery Engine</h1>
          <p className="text-[13px] text-slate-400/45 mt-[3px]">Build and manage the interactive style quiz for clients.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentQuestion({ type: 'single', options: [], isActive: true, order: questions.length + 1 });
            setIsEditing(true);
          }}
          className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all flex items-center gap-1.5"
        >
          <Plus size={13} />Add Question
        </button>
      </div>

      {isEditing ? (
        <div className="bg-[#161628]/92 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#e2e8f0]">
              {currentQuestion.id ? 'Edit Question' : 'Create New Question'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all">
              Cancel
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Question Text *</label>
              <input
                value={currentQuestion.question || ''}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                placeholder="e.g., What is your primary design style?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Question Type</label>
                <select
                  value={currentQuestion.type || 'single'}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value as QuizQuestion['type'] })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all appearance-none"
                >
                  <option value="single" className="bg-[#1a1a2e]">Single Choice</option>
                  <option value="multiple" className="bg-[#1a1a2e]">Multiple Choice</option>
                  <option value="text" className="bg-[#1a1a2e]">Text Input</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45 mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={currentQuestion.order || 1}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, order: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                  min="1"
                />
              </div>
              <div className="flex items-center mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentQuestion.isActive ?? true}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, isActive: e.target.checked })}
                    className="w-4 h-4 text-purple-600 bg-white/5 border-white/10 rounded focus:ring-purple-500"
                  />
                  <span className="text-[13px] text-slate-200">Active (Visible to clients)</span>
                </label>
              </div>
            </div>

            {currentQuestion.type !== 'text' && (
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-slate-400/45">Answer Options *</label>
                  <button
                    onClick={addOption}
                    className="text-purple-400 hover:text-purple-300 text-[12px] font-medium flex items-center gap-1 transition-colors"
                  >
                    <Plus size={12} /> Add Option
                  </button>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-medium text-slate-400 flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="flex-1">
                        <input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
                        />
                      </div>
                      <button
                        onClick={() => removeOption(index)}
                        className="p-2 text-slate-400/50 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {(!currentQuestion.options || currentQuestion.options.length === 0) && (
                    <div className="text-center py-6 border-2 border-dashed border-white/10 rounded-xl text-slate-400/50 text-[13px]">
                      No options added. Click &quot;+ Add Option&quot; to create choices.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={handleSave} className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none rounded-[9px] px-[18px] py-[9px] text-[13px] font-semibold cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all">
              Save Question
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#161628]/92 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400/50" />
              <input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-[13px] text-slate-200 outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
            <button className="bg-transparent text-slate-400/70 border border-white/10 rounded-lg px-3 py-2 text-[12px] font-medium hover:bg-white/5 hover:text-slate-200 hover:border-white/20 transition-all flex items-center gap-1.5">
              <Settings size={14} />
              Quiz Settings
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider w-16">Order</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400/60 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => (
                    <tr key={q.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[12px] font-medium text-slate-300">
                          {q.order}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-slate-200 text-[13px]">{q.question}</div>
                            {q.type !== 'text' && (
                              <div className="text-[11px] text-slate-400/60 mt-1">
                                {q.options?.length || 0} options available
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <TypeBadge type={q.type} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge isActive={q.isActive} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setCurrentQuestion(q);
                              setIsEditing(true);
                            }}
                            className="p-1.5 text-slate-400/50 hover:text-purple-400 transition-colors rounded-md hover:bg-purple-500/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(q.id)}
                            className="p-1.5 text-slate-400/50 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[13px] text-slate-400/50">
                      No questions found. Create your first quiz question to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DiscoveryPage() {
  return (
    <ErrorBoundary>
      <DiscoveryContent />
    </ErrorBoundary>
  );
}
