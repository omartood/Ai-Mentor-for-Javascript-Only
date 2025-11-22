import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { CopyIcon, CheckIcon } from './Icons';

interface MessageBubbleProps {
  message: Message;
}

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger Prism highlight if available on window
    if ((window as any).Prism && codeRef.current) {
      (window as any).Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const cleanLang = (language || 'text').toLowerCase();

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-slate-700 bg-[#1e1e1e] shadow-lg group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-slate-700">
        <span className="text-xs font-medium text-slate-400 uppercase font-mono">
          {cleanLang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700 px-2 py-1 rounded"
          title="Copy code"
        >
          {isCopied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto relative">
        <pre className={`!m-0 !p-4 !bg-transparent text-sm font-mono leading-relaxed language-${cleanLang}`}>
          <code ref={codeRef} className={`language-${cleanLang}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Simple parser to detect code blocks ```lang ... ```
  const renderContent = (text: string) => {
    const parts = text.split(/```(\w+)?\n([\s\S]*?)```/g);
    
    // If no code blocks, parts is just length 1
    if (parts.length === 1) {
      return <p className="whitespace-pre-wrap leading-relaxed">{text}</p>;
    }

    const elements: React.ReactNode[] = [];
    let i = 0;
    while (i < parts.length) {
      const normalText = parts[i];
      if (normalText) {
        elements.push(
          <p key={`text-${i}`} className="whitespace-pre-wrap leading-relaxed mb-3">
            {normalText}
          </p>
        );
      }
      
      // Check for code block parts (lang, code)
      // split produces: [text, lang, code, text, lang, code...]
      if (i + 2 < parts.length) {
        const lang = parts[i + 1] || 'text';
        const code = parts[i + 2];
        
        elements.push(
          <CodeBlock key={`code-${i}`} language={lang} code={code} />
        );
        i += 3; // Jump past lang and code
      } else {
        i++;
      }
    }
    return elements;
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[95%] md:max-w-[85%] px-5 py-4 rounded-2xl shadow-md ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
        }`}
      >
        <div className="text-sm md:text-base">
          {renderContent(message.text)}
        </div>
        {message.isStreaming && (
          <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse align-middle"></span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;