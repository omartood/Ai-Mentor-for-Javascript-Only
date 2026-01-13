
import React, { useState, useEffect, useRef } from 'react';
import Editor, { OnMount, loader } from '@monaco-editor/react';
import { PlayIcon, TrashIcon, MaximizeIcon, MinimizeIcon, RefreshIcon, EnterFullScreenIcon, ExitFullScreenIcon } from './Icons';

// Configure Monaco Editor loader to use a specific CDN path safely.
// We wrap this in a try-catch to prevent the entire app from crashing if the loader fails.
try {
  if (loader) {
    // Use jsdelivr for stable Monaco assets loading
    loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.46.0/min/vs' } });
  }
} catch (e) {
  console.error("Failed to configure Monaco loader:", e);
}

interface LogEntry {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: number;
}

interface CodeEditorProps {
  onClose?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
  initialCode?: string;
}

const DEFAULT_CODE = `// Welcome to the JS Sandbox!
// Type code below and click "Run" to see the output.

const greeting = "Hello, World!";
console.log(greeting);

// Try some math
const radius = 5;
const area = Math.PI * radius * radius;
console.log("Area:", area.toFixed(2));

// Async example
setTimeout(() => {
  console.log("Async operation finished!");
}, 1000);
`;

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  onClose, 
  isMaximized = false, 
  onToggleMaximize,
  isFullScreen = false,
  onToggleFullScreen,
  initialCode 
}) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<any>(null);

  // Update code when initialCode prop changes
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setLogs([]); 
    }
  }, [initialCode]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor settings for a cleaner look
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: "'Fira Code', monospace",
      padding: { top: 16, bottom: 16 },
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorBlinking: "smooth",
      wordWrap: "on",
      automaticLayout: true,
    });
  };

  const handleReset = () => {
    setCode(initialCode || DEFAULT_CODE);
    setLogs([]);
  };

  const addLog = (type: 'log' | 'error' | 'warn' | 'info', args: any[]) => {
    const content = args.map(arg => {
      if (arg === undefined) return 'undefined';
      if (arg === null) return 'null';
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');

    setLogs(prev => [...prev, {
      type,
      content,
      timestamp: Date.now()
    }]);
  };

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]); // Clear logs on start
    
    const mockConsole = {
      log: (...args: any[]) => addLog('log', args),
      error: (...args: any[]) => addLog('error', args),
      warn: (...args: any[]) => addLog('warn', args),
      info: (...args: any[]) => addLog('info', args),
      clear: () => setLogs([])
    };

    try {
      // Use AsyncFunction to allow top-level await
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      // Pass 'console' to shadow the global console
      const currentCode = editorRef.current ? editorRef.current.getValue() : code;
      
      const runScript = new AsyncFunction('console', currentCode);
      
      const result = await runScript(mockConsole);
      
      // If the script returns a value (e.g. `return 5;`), log it like a REPL
      if (result !== undefined) {
        addLog('info', ['< ' + result]);
      }
    } catch (err: any) {
      addLog('error', [err.toString()]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClearConsole = () => setLogs([]);
  
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-slate-800 shadow-2xl w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#252526] border-b border-slate-700 shrink-0 gap-2">
        
        {/* Title (Hidden on small mobile) */}
        <div className="flex items-center gap-2 hidden sm:flex">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">JS Playground</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 ml-auto w-full sm:w-auto justify-end">
           
           {/* Tools Group */}
           <div className="flex items-center bg-slate-800/50 rounded-lg p-0.5 border border-slate-700/50 mr-1 md:mr-2">
             <button 
               onClick={handleReset}
               className="p-1.5 text-slate-400 hover:text-white transition-colors rounded hover:bg-slate-700"
               title="Reset Code"
             >
               <RefreshIcon className="w-3.5 h-3.5" />
             </button>
             
             {/* Split View Toggle (Desktop Only) */}
             {onToggleMaximize && !isFullScreen && (
               <button 
                 onClick={onToggleMaximize}
                 className="p-1.5 text-slate-400 hover:text-white hidden md:block transition-colors rounded hover:bg-slate-700"
                 title={isMaximized ? "Restore Split" : "Expand Split"}
               >
                 {isMaximized ? <MinimizeIcon className="w-3.5 h-3.5" /> : <MaximizeIcon className="w-3.5 h-3.5" />}
               </button>
             )}

             {/* Full Screen Toggle */}
             {onToggleFullScreen && (
               <button 
                 onClick={onToggleFullScreen}
                 className="p-1.5 text-slate-400 hover:text-white transition-colors rounded hover:bg-slate-700"
                 title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
               >
                 {isFullScreen ? <ExitFullScreenIcon className="w-3.5 h-3.5" /> : <EnterFullScreenIcon className="w-3.5 h-3.5" />}
               </button>
             )}
           </div>

           {/* Action Buttons */}
           <button 
            onClick={handleRun}
            disabled={isRunning}
            className={`
              flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded text-xs font-bold transition-all shadow-lg 
              ${isRunning 
                ? 'bg-slate-600 text-slate-300 cursor-wait' 
                : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20 active:scale-95'
              }
            `}
          >
            {isRunning ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <PlayIcon className="w-3 h-3" />
            )}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          
           {onClose && !isFullScreen && (
            <button 
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-xs font-medium transition-colors border border-slate-700"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Editor Area using Monaco */}
      <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          loading={
            <div className="flex items-center justify-center h-full text-slate-500 gap-2">
              <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading Editor...</span>
            </div>
          }
        />
      </div>

      {/* Console Output */}
      <div className="h-44 bg-[#0d0d0d] border-t border-slate-700 flex flex-col shrink-0">
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#1a1a1a] border-b border-slate-800">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Console Output</span>
          <button 
            onClick={handleClearConsole}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
            title="Clear Console"
          >
            <TrashIcon className="w-3 h-3" />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
          {logs.length === 0 ? (
            <span className="text-slate-700 italic select-none block text-center mt-8 opacity-50">
              Click "Run" to execute your code
            </span>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className={`
                font-medium break-all whitespace-pre-wrap border-b border-slate-900 pb-1
                ${log.type === 'error' ? 'text-red-400 bg-red-900/10 -mx-4 px-4 py-1' : ''}
                ${log.type === 'warn' ? 'text-yellow-400 bg-yellow-900/10 -mx-4 px-4 py-1' : ''}
                ${log.type === 'info' ? 'text-blue-400 italic' : ''}
                ${log.type === 'log' ? 'text-slate-300' : ''}
              `}>
                {log.type !== 'log' && (
                  <span className="uppercase text-[9px] opacity-70 mr-2 border px-1 rounded border-current">
                    {log.type}
                  </span>
                )}
                <span className="opacity-40 mr-2 font-light text-[10px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                {log.content}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
