import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircleIcon, RefreshIcon } from './Icons';

interface QuizModalProps {
  title: string;
  questions: QuizQuestion[];
  onClose: () => void;
  onRetake: () => void;
  onPass?: (score: number) => void;
  isLoading: boolean;
}

const QuizModal: React.FC<QuizModalProps> = ({ title, questions, onClose, onRetake, onPass, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Effect to handle passing grade when showing results
  useEffect(() => {
    if (showResults && onPass) {
      const percentage = Math.round((score / questions.length) * 100);
      // Updated passing score to 50%
      if (percentage >= 50) {
        onPass(Math.round(percentage)); // Pass the percentage score
      }
    }
  }, [showResults, score, questions.length, onPass]);

  // If still loading the quiz data
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-300 font-medium">Generating Logic Quiz for {title}...</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
     return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl shadow-2xl max-w-md w-full text-center">
           <p className="text-red-400 mb-4">Failed to load quiz. Please try again.</p>
           <button onClick={onClose} className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600">Close</button>
        </div>
      </div>
     )
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  // Results View
  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    // Updated passing score check to 50%
    const isPass = percentage >= 50;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="p-8 text-center space-y-6">
            <div className={`mx-auto w-20 h-20 flex items-center justify-center rounded-full ${isPass ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
               {isPass ? <CheckCircleIcon className="w-10 h-10" /> : <span className="text-3xl font-bold">{percentage}%</span>}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isPass ? 'Topic Completed!' : 'Keep Practicing!'}
              </h2>
              <p className="text-slate-400">
                You scored <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{questions.length}</span>
              </p>
              {isPass ? (
                <p className="text-sm text-green-400 mt-2 font-medium">
                  You passed! This topic is now marked complete.
                </p>
              ) : (
                <p className="text-sm text-yellow-400 mt-2 font-medium">
                  You need 50% to pass and unlock progress.
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-center pt-4">
              <button 
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={onRetake}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
              >
                <RefreshIcon className="w-5 h-5" />
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
             <h2 className="text-xl font-bold text-white">Test Knowledge</h2>
             <p className="text-sm text-slate-400">{title}</p>
          </div>
          <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Question Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="text-lg md:text-xl text-slate-100 font-medium mb-6 leading-relaxed">
            {/* Use a simple Markdown parser or just whitespace-pre-wrap for code in questions */}
             {currentQuestion.question.split('```').map((part, i) => 
                i % 2 === 1 ? (
                  <pre key={i} className="bg-slate-950 p-3 rounded-lg text-sm font-mono my-2 overflow-x-auto border border-slate-800 text-blue-300">
                    {part}
                  </pre>
                ) : (
                  <span key={i}>{part}</span>
                )
             )}
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ";
              
              if (isAnswered) {
                if (idx === currentQuestion.correctAnswer) {
                  btnClass += "bg-green-900/30 border-green-500/50 text-green-100";
                } else if (idx === selectedOption) {
                  btnClass += "bg-red-900/30 border-red-500/50 text-red-100 opacity-70";
                } else {
                  btnClass += "bg-slate-800/50 border-slate-700 text-slate-500 opacity-50";
                }
              } else {
                if (idx === selectedOption) {
                  btnClass += "bg-blue-600/20 border-blue-500 text-blue-100 shadow-lg shadow-blue-900/20";
                } else {
                  btnClass += "bg-slate-800 hover:bg-slate-750 border-slate-700 hover:border-slate-600 text-slate-300";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  <div className="flex items-center gap-3">
                     <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border ${
                        isAnswered && idx === currentQuestion.correctAnswer ? 'border-green-400 text-green-400' : 'border-slate-600 text-slate-500'
                     }`}>
                       {String.fromCharCode(65 + idx)}
                     </span>
                     <span className="font-mono text-sm">{option}</span>
                  </div>
                  {isAnswered && idx === currentQuestion.correctAnswer && <CheckCircleIcon className="w-5 h-5 text-green-400" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl animate-in fade-in slide-in-from-bottom-2">
              <p className="text-sm text-blue-200">
                <span className="font-bold uppercase text-xs tracking-wider text-blue-400 block mb-1">Explanation</span>
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center rounded-b-2xl">
          <button 
             onClick={onClose}
             className="text-slate-500 hover:text-white text-sm font-medium px-4"
          >
            Exit Quiz
          </button>

          {isAnswered ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-lg shadow-blue-900/20 transition-all transform active:scale-95"
            >
              {currentIndex === questions.length - 1 ? "Finish" : "Next Question"}
            </button>
          ) : (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                selectedOption === null 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-white text-slate-900 hover:bg-gray-200 shadow-lg'
              }`}
            >
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;