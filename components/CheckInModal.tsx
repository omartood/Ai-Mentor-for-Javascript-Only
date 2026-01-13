import React, { useState } from 'react';
import { LightbulbIcon, CheckCircleIcon } from './Icons';
import { evaluateReflection } from '../services/gemini';

interface CheckInModalProps {
  isOpen: boolean;
  topicTitle: string;
  onClose: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, topicTitle, onClose }) => {
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!reflection.trim()) return;
    setIsSubmitting(true);
    try {
      const result = await evaluateReflection(topicTitle, reflection);
      setFeedback(result);
    } catch (e) {
      setFeedback("Great reflection! Keep moving forward.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    setReflection('');
    setFeedback(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-[#1e1e1e] border border-[#f7df1e]/30 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f7df1e]/20 flex items-center justify-center shrink-0">
             <LightbulbIcon className="w-6 h-6 text-[#f7df1e]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Knowledge Checkpoint</h2>
            <p className="text-sm text-slate-400">You're making great progress! Let's reflect.</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!feedback ? (
            <>
              <div>
                <p className="text-slate-300 text-lg leading-relaxed mb-2">
                  In your own words, briefly explain the core concept of:
                </p>
                <p className="text-[#f7df1e] font-bold text-xl font-mono border-l-4 border-[#f7df1e] pl-4 py-1 bg-[#f7df1e]/5 rounded-r">
                  {topicTitle}
                </p>
              </div>

              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="I learned that..."
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-[#f7df1e] transition-colors resize-none placeholder-slate-600"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!reflection.trim() || isSubmitting}
                  className="px-6 py-3 rounded-full bg-[#f7df1e] text-black font-bold hover:bg-[#e5ce1b] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(247,223,30,0.3)] hover:shadow-[0_0_25px_rgba(247,223,30,0.5)] transform active:scale-95"
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit Reflection'}
                </button>
              </div>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl mb-6">
                 <CheckCircleIcon className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                 <div>
                   <h3 className="font-bold text-green-400 mb-1">Mentor Feedback</h3>
                   <p className="text-slate-200 leading-relaxed">{feedback}</p>
                 </div>
               </div>
               
               <button
                  onClick={handleContinue}
                  className="w-full py-4 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  Continue Learning
                </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CheckInModal;