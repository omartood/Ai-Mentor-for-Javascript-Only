
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { GamepadIcon, PlayIcon, HeartIcon, RefreshIcon, CheckCircleIcon, AlertTriangleIcon } from './Icons';
import { generatePuzzle } from '../services/gemini';

interface PuzzleGameModalProps {
  isOpen: boolean;
  topicTitle: string;
  onClose: () => void;
}

interface PuzzleData {
  title: string;
  instructions: string;
  initialCode: string;
  validationCheck: string;
}

const PuzzleGameModal: React.FC<PuzzleGameModalProps> = ({ isOpen, topicTitle, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [code, setCode] = useState('');
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (isOpen) {
      loadPuzzle();
    }
  }, [isOpen, topicTitle]);

  useEffect(() => {
    if (status === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && status === 'playing') {
      setStatus('lost');
    }
  }, [timeLeft, status]);

  const loadPuzzle = async () => {
    setLoading(true);
    setLives(3);
    setStatus('playing');
    setTimeLeft(300);
    setErrorMsg(null);
    try {
      const data = await generatePuzzle(topicTitle);
      setPuzzle(data);
      setCode(data.initialCode);
    } catch (e) {
      setErrorMsg("Failed to generate puzzle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    if (status !== 'playing' || !puzzle) return;
    setErrorMsg(null);

    try {
      // Security: Basic sandbox simulation.
      // We run the user's code, then the validation check provided by AI.
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      
      const wrappedCode = `
        ${code}
        
        // Validation Block
        ${puzzle.validationCheck}
      `;

      // Create a function that executes the combined code
      const runValidation = new AsyncFunction(wrappedCode);
      
      const result = await runValidation();
      
      if (result === true) {
        setStatus('won');
      } else {
        throw new Error("Validation check failed without specific error.");
      }

    } catch (err: any) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) setStatus('lost');
        return newLives;
      });
      setErrorMsg(err.toString());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-6xl h-[90vh] bg-[#1e1e1e] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar / Info */}
        <div className="md:w-1/3 bg-slate-900 border-r border-slate-800 flex flex-col">
          <div className="p-6 border-b border-slate-800 bg-[#1e1e1e]">
             <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-[#f7df1e]/20 rounded-lg">
                 <GamepadIcon className="w-6 h-6 text-[#f7df1e]" />
               </div>
               <div>
                 <h2 className="text-xl font-bold text-white uppercase tracking-wider">Debug Arena</h2>
                 <p className="text-xs text-slate-400">Fix the code to survive</p>
               </div>
             </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <div className="w-8 h-8 border-4 border-[#f7df1e] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 text-sm">Generating Puzzle...</p>
              </div>
            ) : puzzle ? (
              <div className="space-y-6">
                <div>
                   <h3 className="text-lg font-bold text-white mb-2">{puzzle.title}</h3>
                   <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-slate-300 leading-relaxed text-sm">
                     {puzzle.instructions}
                   </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-slate-800">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Time Left</div>
                    <div className={`text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Lives</div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <HeartIcon key={i} className={`w-6 h-6 ${i <= lives ? 'text-red-500' : 'text-slate-800'}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl animate-in fade-in slide-in-from-left-2">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangleIcon className="w-4 h-4 text-red-400" />
                      <span className="font-bold text-red-400 text-sm">Execution Failed</span>
                    </div>
                    <code className="text-xs text-red-200 block whitespace-pre-wrap font-mono">
                      {errorMsg}
                    </code>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-400">Failed to load puzzle.</div>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 border-t border-slate-800 bg-[#1e1e1e] space-y-3">
             <button
                onClick={handleRun}
                disabled={status !== 'playing' || loading}
                className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-lg shadow-lg shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <PlayIcon className="w-5 h-5" />
                Run Code
             </button>
             <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
             >
               Exit Arena
             </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-[#1e1e1e] relative">
           {status === 'won' && (
             <div className="absolute inset-0 z-20 bg-black/80 flex items-center justify-center backdrop-blur-sm animate-in fade-in">
                <div className="text-center">
                   <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-4 animate-bounce" />
                   <h2 className="text-4xl font-bold text-white mb-2">Success!</h2>
                   <p className="text-slate-400 mb-6">Bug fixed. You are a true master.</p>
                   <button onClick={onClose} className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-500">Continue</button>
                </div>
             </div>
           )}
           
           {status === 'lost' && (
             <div className="absolute inset-0 z-20 bg-black/90 flex items-center justify-center backdrop-blur-sm animate-in fade-in">
                <div className="text-center">
                   <div className="text-6xl mb-4">💀</div>
                   <h2 className="text-4xl font-bold text-white mb-2">Game Over</h2>
                   <p className="text-slate-400 mb-6">The bugs won this time.</p>
                   <button onClick={loadPuzzle} className="px-8 py-3 bg-[#f7df1e] text-black rounded-full font-bold hover:bg-[#e5ce1b] flex items-center gap-2 mx-auto">
                     <RefreshIcon className="w-5 h-5" /> Try Again
                   </button>
                </div>
             </div>
           )}

           <Editor
             height="100%"
             defaultLanguage="javascript"
             value={code}
             theme="vs-dark"
             onChange={(val) => setCode(val || '')}
             options={{
               fontSize: 16,
               minimap: { enabled: false },
               padding: { top: 24, bottom: 24 },
               scrollBeyondLastLine: false,
             }}
           />
        </div>

      </div>
    </div>
  );
};

export default PuzzleGameModal;
