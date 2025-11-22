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

// Helper to parse inline styles: **bold**, `code`, *italic*
const parseInline = (text: string) => {
  // Split by regex matching markdown tokens
  // We capture the delimiters to identify the parts
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  
  return parts.map((part, index) => {
    // Inline Code
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="bg-slate-900/50 border border-slate-700 text-blue-200 px-1.5 py-0.5 rounded text-[0.9em] font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    // Bold
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Italic
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

// Helper to render a block of text with Markdown formatting (Headers, Lists, Paragraphs)
const renderMarkdownBlock = (blockText: string) => {
  const lines = blockText.split('\n');
  const elements: React.ReactNode[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold text-blue-100 mt-6 mb-2 first:mt-0">
          {parseInline(line.replace('### ', ''))}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-white mt-8 mb-4 first:mt-0 border-b border-slate-700 pb-2">
          {parseInline(line.replace('## ', ''))}
        </h2>
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4 first:mt-0">
          {parseInline(line.replace('# ', ''))}
        </h1>
      );
    } 
    // List Items (unordered)
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <div key={i} className="flex gap-3 ml-2 mb-1.5">
          <span className="text-blue-500 mt-1.5 text-[0.5em] opacity-75">●</span>
          <span className="leading-relaxed text-slate-300">{parseInline(trimmed.substring(2))}</span>
        </div>
      );
    }
    // List Items (ordered)
    else if (trimmed.match(/^\d+\.\s/)) {
      const match = trimmed.match(/^\d+\.\s/);
      const prefix = match ? match[0] : '';
      elements.push(
        <div key={i} className="flex gap-2 ml-2 mb-1.5">
           <span className="font-mono text-blue-400 font-medium min-w-[1.5rem]">{prefix}</span>
           <span className="leading-relaxed text-slate-300">{parseInline(trimmed.replace(prefix, ''))}</span>
        </div>
      );
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-blue-600 pl-4 py-1 my-4 bg-slate-800/30 text-slate-400 italic">
           {parseInline(trimmed.replace('> ', ''))}
        </blockquote>
      );
    }
    // Empty Lines
    else if (!trimmed) {
      elements.push(<div key={i} className="h-3" />);
    }
    // Regular Paragraphs
    else {
      elements.push(
        <p key={i} className="mb-2 leading-relaxed text-slate-200">
          {parseInline(line)}
        </p>
      );
    }
  }
  return elements;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const renderContent = (text: string) => {
    // Split by Code Blocks
    const parts = text.split(/```(\w+)?\n([\s\S]*?)```/g);
    
    const elements: React.ReactNode[] = [];
    let i = 0;
    while (i < parts.length) {
      const normalText = parts[i];
      if (normalText) {
        // Render Markdown for non-code parts
        elements.push(
          <div key={`text-${i}`}>
             {renderMarkdownBlock(normalText)}
          </div>
        );
      }
      
      // Check for code block parts (lang, code)
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
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            renderContent(message.text)
          )}
        </div>
        {message.isStreaming && (
          <div className="flex gap-1 mt-2">
             <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
             <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
             <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;