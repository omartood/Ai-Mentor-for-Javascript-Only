import React, { useState } from 'react';
import { PlayIcon, TrashIcon } from './Icons';

interface LogEntry {
  type: 'log' | 'error' | 'warn';
  content: string;
  timestamp: number;
}

const DEFAULT_CODE = `// Welcome to the JS Sandbox!
// Try writing some code here and click Run.

const greeting = "Hello, World!";
console.log(greeting);

// Example: Loop
for (let i = 1; i <= 3; i++) {
  console.log("Count: " + i);
}
`;

const CodeEditor: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const handleRun = () => {
    setLogs([]); // Clear previous logs
    const newLogs: LogEntry[] = [];

    // Mock Console
    const mockConsole = {
      log: (...args: any[]) => {
        newLogs.push({ 
            type: 'log', 
            content: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '), 
            timestamp: Date.now() 
        });
      },
      error: (...args: any[]) => {
        newLogs.push({ 
            type: 'error', 
            content: args.map(String).join(' '), 
            timestamp: Date.now() 
        });
      },
      warn: (...args: any[]) => {
        newLogs.push({ 
            type: 'warn', 
            content: args.map(String).join(' '), 
            timestamp: Date.now() 
        });
      }
    };

    try {
      // Create a function from the code string
      // We pass 'console' as an argument to shadow the global console
      // eslint-disable-next-line no-new-func
      const runScript = new Function('console', code);
      runScript(mockConsole);
    } catch (err: any) {
      newLogs.push({ 
          type: 'error', 
          content: err.toString(), 
          timestamp: Date.now() 
      });
    }

    setLogs(newLogs);
  };

  const handleClearConsole = () => setLogs([]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      
      setCode(value.substring(0, start) + '  ' + value.substring(end));
      
      // Need to wait for render to update cursor position, simplified here
      setTimeout(() => {
          if (e.target instanceof HTMLTextAreaElement) {
              e.target.selectionStart = e.target.selectionEnd = start + 2;
          }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-slate-800 shadow-2xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Playground</span>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={handleRun}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-medium transition-colors"
          >
            <PlayIcon className="w-3 h-3" />
            Run
          </button>
           {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="md:hidden px-3 py-1.5 text-slate-400 hover:text-white text-xs"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 bg-[#1e1e1e] text-slate-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
          placeholder="// Write JavaScript here..."
        />
      </div>

      {/* Console Output */}
      <div className="h-1/3 min-h-[150px] bg-[#0d0d0d] border-t border-slate-700 flex flex-col">
        <div className="flex items-center justify-between px-4 py-1 bg-[#1a1a1a] border-b border-slate-800">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Console</span>
          <button 
            onClick={handleClearConsole}
            className="p-1 text-slate-500 hover:text-slate-300"
            title="Clear Console"
          >
            <TrashIcon className="w-3 h-3" />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1">
          {logs.length === 0 ? (
            <span className="text-slate-600 italic">// Output will appear here</span>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className={`
                ${log.type === 'error' ? 'text-red-400' : ''}
                ${log.type === 'warn' ? 'text-yellow-400' : ''}
                ${log.type === 'log' ? 'text-slate-300' : ''}
                break-all whitespace-pre-wrap border-b border-slate-800/50 pb-1 mb-1
              `}>
                <span className="opacity-50 mr-2">
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