import React, { useState, useRef, useEffect } from 'react';
import { Chat } from "@google/genai";
import { createMentorChat, sendMessageStream } from './services/gemini';
import { Message, Topic } from './types';
import { CURRICULUM } from './constants';
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';
import CodeEditor from './components/CodeEditor';
import { SendIcon, MenuIcon, RefreshIcon, CodeIcon } from './components/Icons';

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

const App: React.FC = () => {
  // State
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Chat on Mount
  useEffect(() => {
    try {
      const chat = createMentorChat();
      setChatSession(chat);
      
      // Auto-start with the first topic if none selected
      const firstTopic = CURRICULUM[0].topics[0];
      handleTopicSelect(firstTopic, chat);
    } catch (e) {
      console.error("Failed to init chat", e);
      addSystemMessage("Error: Could not connect to Gemini API. Please check your API Key.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSystemMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: generateId(),
      role: 'model',
      text: text,
      timestamp: Date.now()
    }]);
  };

  const handleTopicSelect = async (topic: Topic, activeChat: Chat | null = chatSession) => {
    if (!activeChat) return;
    
    setCurrentTopic(topic);
    setMessages([]); // Clear visible history for the new topic visually (optional, keeps context clean)
    setIsLoading(true);

    try {
      // Prompt the AI to start the lesson
      const prompt = `I am ready to learn about: "${topic.title}". Context: ${topic.promptContext}. Please introduce this topic and give me a simple example.`;
      
      // Add a placeholder message for streaming
      const msgId = generateId();
      setMessages([{
        id: msgId,
        role: 'model',
        text: '',
        isStreaming: true,
        timestamp: Date.now()
      }]);

      const stream = await sendMessageStream(activeChat, prompt);
      
      let fullText = '';
      for await (const chunk of stream) {
        const textChunk = chunk.text || ''; // Access .text property directly
        fullText += textChunk;
        
        setMessages(prev => {
          const newMsgs = [...prev];
          const lastMsg = newMsgs[newMsgs.length - 1];
          if (lastMsg.id === msgId) {
            lastMsg.text = fullText;
          }
          return newMsgs;
        });
      }

      // Finalize message
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        if (lastMsg.id === msgId) {
          lastMsg.isStreaming = false;
        }
        return newMsgs;
      });

    } catch (error) {
      console.error(error);
      addSystemMessage("Sorry, I encountered an error while fetching the lesson.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSession || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Add user message
    const userMsgId = generateId();
    setMessages(prev => [...prev, {
      id: userMsgId,
      role: 'user',
      text: userText,
      timestamp: Date.now()
    }]);

    setIsLoading(true);

    try {
      // Add placeholder for AI response
      const aiMsgId = generateId();
      setMessages(prev => [...prev, {
        id: aiMsgId,
        role: 'model',
        text: '',
        isStreaming: true,
        timestamp: Date.now()
      }]);

      const stream = await sendMessageStream(chatSession, userText);

      let fullText = '';
      for await (const chunk of stream) {
        const textChunk = chunk.text || ''; // Access .text property directly
        fullText += textChunk;
        
        setMessages(prev => {
          const newMsgs = [...prev];
          const lastMsg = newMsgs[newMsgs.length - 1];
          if (lastMsg.id === aiMsgId) {
            lastMsg.text = fullText;
          }
          return newMsgs;
        });
      }

      // Finalize
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        if (lastMsg.id === aiMsgId) {
          lastMsg.isStreaming = false;
        }
        return newMsgs;
      });

    } catch (error) {
      console.error(error);
      addSystemMessage("Sorry, something went wrong processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleRestartTopic = () => {
    if (currentTopic) {
       handleTopicSelect(currentTopic);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      
      <Sidebar 
        currentTopicId={currentTopic?.id || null}
        onSelectTopic={(t) => handleTopicSelect(t)}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area (Split) */}
      <div className="flex-1 flex h-full relative w-full">
        
        {/* Chat Section */}
        <div className={`
          flex flex-col h-full transition-all duration-300 ease-in-out
          ${isEditorOpen ? 'hidden md:flex md:w-1/2 lg:w-1/2 border-r border-slate-800' : 'w-full'}
        `}>
          
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 md:hidden text-slate-400 hover:text-white"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <div className="overflow-hidden">
                <h2 className="text-lg font-semibold text-white truncate">
                  {currentTopic?.title || 'Select a Topic'}
                </h2>
                <p className="text-xs text-slate-400 truncate">
                  {currentTopic?.description || 'Start your journey'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleRestartTopic}
                title="Restart Topic"
                disabled={isLoading || !currentTopic}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors disabled:opacity-50 hidden sm:block"
              >
                <RefreshIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsEditorOpen(!isEditorOpen)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                  ${isEditorOpen 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }
                `}
              >
                <CodeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{isEditorOpen ? 'Hide Code' : 'Practice Code'}</span>
                <span className="sm:hidden">{isEditorOpen ? 'Close' : 'Code'}</span>
              </button>
            </div>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-slate-950">
            <div className="max-w-3xl mx-auto">
              {messages.length === 0 && !isLoading && (
                <div className="text-center mt-20 text-slate-500">
                  <p>Select a topic from the sidebar to begin.</p>
                </div>
              )}
              
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-800 bg-slate-900">
            <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-slate-800 p-2 rounded-xl border border-slate-700 focus-within:border-blue-500/50 transition-colors shadow-lg">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question or type code..."
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm md:text-base p-2 max-h-48 min-h-[44px] resize-none focus:outline-none scrollbar-hide"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`
                  p-2.5 rounded-lg flex-shrink-0 mb-0.5 transition-all duration-200
                  ${!inputValue.trim() || isLoading 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
                  }
                `}
              >
                {isLoading ? (
                  <span className="block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <SendIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="max-w-3xl mx-auto mt-2 text-center">
               <p className="text-[10px] text-slate-500">
                 AI can make mistakes. Review generated code.
               </p>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className={`
          ${isEditorOpen ? 'absolute inset-0 md:relative md:flex md:w-1/2 lg:w-1/2 z-20' : 'hidden'}
          transition-all duration-300
        `}>
          <CodeEditor onCloseMobile={() => setIsEditorOpen(false)} />
        </div>

      </div>
    </div>
  );
};

export default App;