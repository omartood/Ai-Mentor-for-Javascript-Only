import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, TrashIcon, MaximizeIcon, MinimizeIcon, RefreshIcon } from './Icons';

interface LogEntry {
  type: 'log' | 'error' | 'warn';
  content: string;
  timestamp: number;
}

interface CodeEditorProps {
  onClose?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  initialCode?: string;
}

const DEFAULT_CODE = `// Welcome to the JS Sandbox!
// Try writing some code here and click Run.

const greeting = "Hello, World!";
console.log(greeting);

// Example: Loop
for (let i = 1; i <= 3; i++) {
  console.log("Count: " + i);
}

// Example: Async
setTimeout(() => {
  console.log("Async hello after 1s!");
}, 1000);
`;

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  onClose, 
  isMaximized = false, 
  onToggleMaximize,
  initialCode 
}) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // Refs for scroll syncing
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // Update code when initialCode prop changes
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setLogs([]); 
    }
  }, [initialCode]);

  // Handle Syntax Highlighting (Prism)
  useEffect(() => {
    if ((window as any).Prism && preRef.current) {
      (window as any).Prism.highlightElement(preRef.current.querySelector('code'));
    }
  }, [code]);

  const handleReset = () => {
    setCode(initialCode || DEFAULT_CODE);
    setLogs([]);
  };

  const addLog = (type: 'log' | 'error' | 'warn', args: any[]) => {
    const content = args.map(arg => {
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
    setLogs([]); // Clear logs on start
    
    const mockConsole = {
      log: (...args: any[]) => addLog('log', args),
      error: (...args: any[]) => addLog('error', args),
      warn: (...args: any[]) => addLog('warn', args)
    };

    try {
      // Use AsyncFunction to allow top-level await
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      // Pass 'console' to shadow the global console
      const runScript = new AsyncFunction('console', code);
      
      await runScript(mockConsole);
    } catch (err: any) {
      addLog('error', [err.toString()]);
    }
  };

  const handleClearConsole = () => setLogs([]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      
      const newCode = value.substring(0, start) + '  ' + value.substring(end);
      setCode(newCode);
      
      // Move cursor
      setTimeout(() => {
          if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
          }
      }, 0);
    }
  };

  // Sync scrolling between textarea and pre
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleContainerClick = () => {
    textareaRef.current?.focus();
  };

  // Shared styles to ensure perfect alignment between the textarea (caret) and pre (highlighting)
  const editorStyle: React.CSSProperties = {
    fontFamily: '"Fira Code", monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    whiteSpace: 'pre',
    padding: '1rem',
    margin: 0,
    border: 0,
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-slate-800 shadow-2xl w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Playground</span>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={handleReset}
             className="p-1.5 text-slate-400 hover:text-white transition-colors"
             title="Reset Code"
           >
             <RefreshIcon className="w-4 h-4" />
           </button>
           
           {onToggleMaximize && (
             <button 
               onClick={onToggleMaximize}
               className="p-1.5 text-slate-400 hover:text-white hidden md:block"
               title={isMaximized ? "Minimize" : "Maximize"}
             >
               {isMaximized ? <MinimizeIcon className="w-4 h-4" /> : <MaximizeIcon className="w-4 h-4" />}
             </button>
           )}
           <button 
            onClick={handleRun}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-medium transition-colors shadow-lg shadow-green-900/20"
          >
            <PlayIcon className="w-3 h-3" />
            Run
          </button>
           {onClose && (
            <button 
              onClick={onClose}
              className="ml-2 px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded text-xs transition-colors"
            >
              Hide Code
            </button>
          )}
        </div>
      </div>

      {/* Editor Area with Syntax Highlighting Overlay */}
      <div 
        className="flex-1 relative overflow-hidden group bg-[#1e1e1e] cursor-text" 
        onClick={handleContainerClick}
      >
        {/* Layer 1: Syntax Highlighting (Background) - Hidden on Mobile for stability */}
        <pre 
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden text-left text-slate-300 hidden md:block"
          style={editorStyle}
        >
          <code className="language-javascript">
            {code}
            {/* Add a trailing newline to ensure the last line renders correctly if empty */}
            {'\n'}
          </code>
        </pre>

        {/* Layer 2: Editing (Foreground) */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          // On mobile, text is white (visible). On desktop, transparent (uses pre layer).
          className="absolute inset-0 w-full h-full bg-transparent text-white md:text-transparent caret-white resize-none focus:outline-none z-10 selection:bg-blue-500/30 overflow-auto"
          style={editorStyle}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
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
            <span className="text-slate-700 italic select-none">// Output will appear here...</span>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className={`
                font-medium break-all whitespace-pre-wrap border-b border-slate-900 pb-1
                ${log.type === 'error' ? 'text-red-400 bg-red-900/10 -mx-4 px-4 py-1' : ''}
                ${log.type === 'warn' ? 'text-yellow-400 bg-yellow-900/10 -mx-4 px-4 py-1' : ''}
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