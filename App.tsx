import React, { useState, useRef, useEffect } from 'react';
import { Chat } from "@google/genai";
import { createMentorChat, sendMessageStream, generateQuizForTopic } from './services/gemini';
import { authService } from './services/auth';
import { dbService } from './services/db';
import { Message, Topic, QuizQuestion, User } from './types';
import { CURRICULUM } from './constants';
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';
import CodeEditor from './components/CodeEditor';
import QuizModal from './components/QuizModal';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import VoiceTutor from './components/VoiceTutor';
import { SendIcon, MenuIcon, RefreshIcon, CodeIcon, AcademicCapIcon, CheckCircleIcon, CheckIcon, UserIcon, HeadphonesIcon } from './components/Icons';

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

const App: React.FC = () => {
  // App View State
  const [showLanding, setShowLanding] = useState(true);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login');
  const [authInitialized, setAuthInitialized] = useState(false);
  
  // Profile State
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // App State
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Progress State
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEditorMaximized, setIsEditorMaximized] = useState(false);
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);

  // Quiz State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  
  // Voice State
  const [isVoiceTutorOpen, setIsVoiceTutorOpen] = useState(false);

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

  // Check for existing session on load using Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (user) => {
      if (user) {
        setCurrentUser(user);
        setShowLanding(false);
        // Async fetch progress from Firestore
        try {
          const progress = await dbService.getUserProgress(user.id);
          setCompletedTopics(progress.completedTopicIds);
        } catch (err) {
          console.error("Failed to load progress", err);
        }
      } else {
        setCurrentUser(null);
        setShowLanding(true);
        setCompletedTopics([]);
      }
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  // Initialize Chat on App Start (Post-Login)
  useEffect(() => {
    // Only initialize if we are NOT on the landing page and have a user
    if (showLanding || !currentUser) return;

    if (!chatSession) {
      try {
        const chat = createMentorChat();
        setChatSession(chat);
        
        // Auto-start with the first topic if none selected
        if (!currentTopic && CURRICULUM.length > 0) {
           const firstModule = CURRICULUM[0];
           if (firstModule.subModules.length > 0 && firstModule.subModules[0].topics.length > 0) {
             const firstTopic = firstModule.subModules[0].topics[0];
             handleTopicSelect(firstTopic, chat);
           }
        }
      } catch (e) {
        console.error("Failed to init chat", e);
        addSystemMessage("Error: Could not connect to Gemini API. Please check your API Key.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLanding, currentUser]);

  const handleAuthSuccess = async (user: User) => {
    // Note: onAuthStateChange will handle state updates, but we can optimistically close modals here
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setShowLanding(true);
    setChatSession(null);
    setMessages([]);
    setCompletedTopics([]);
    setIsProfileOpen(false);
  };

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
    setMessages([]); // Clear visible history for the new topic visually
    setIsLoading(true);

    try {
      // Prompt the AI to start the lesson
      const prompt = `I am ready to learn about: "${topic.title}". Context: ${topic.promptContext}. Please introduce this topic and give me a simple example.`;
      
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
        const textChunk = chunk.text || ''; 
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
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const userMsgId = generateId();
    setMessages(prev => [...prev, {
      id: userMsgId,
      role: 'user',
      text: userText,
      timestamp: Date.now()
    }]);

    setIsLoading(true);

    try {
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
        const textChunk = chunk.text || ''; 
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
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleRestartTopic = () => {
    if (currentTopic) {
       handleTopicSelect(currentTopic);
    }
  };

  const toggleTopicCompletion = async (topicId: string) => {
    if (!currentUser) return;
    try {
      const progress = await dbService.toggleTopicComplete(currentUser.id, topicId);
      setCompletedTopics([...progress.completedTopicIds]);
    } catch (e) {
      console.error(e);
    }
  };

  // Quiz Handlers
  const handleOpenQuiz = async () => {
    if (!currentTopic) return;
    
    setIsQuizOpen(true);
    setIsQuizLoading(true);
    
    try {
      const questions = await generateQuizForTopic(currentTopic.title);
      setQuizQuestions(questions);
    } catch (e) {
      console.error(e);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizQuestions([]);
    handleOpenQuiz();
  };

  // Updated to accept score
  const handleQuizPass = async (score: number) => {
    if (currentTopic && currentUser) {
      // Save both completion AND score
      try {
        const progress = await dbService.saveQuizScore(currentUser.id, currentTopic.id, score);
        setCompletedTopics([...progress.completedTopicIds]);
      } catch (e) {
        console.error("Failed to save quiz score", e);
      }
    }
  };

  const isCurrentTopicCompleted = currentTopic ? completedTopics.includes(currentTopic.id) : false;

  if (!authInitialized) {
      return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Initializing App...</div>;
  }

  // Determine Editor Container Classes
  const getEditorContainerClass = () => {
    if (!isEditorOpen) return 'hidden';
    
    // Full Screen Mode: Covers everything, fixed position, high z-index
    if (isEditorFullScreen) {
      return 'fixed inset-0 z-[100] flex w-screen h-screen bg-[#1e1e1e] animate-in fade-in duration-300';
    }
    
    // Split View Maximize: Covers only the content area (chat), absolute position
    if (isEditorMaximized) {
      return 'absolute inset-0 z-20 flex w-full';
    }
    
    // Default Split View: Takes 70% width on desktop
    return 'absolute inset-0 md:relative md:flex md:w-[70%] z-20';
  };

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
        onSuccess={handleAuthSuccess}
      />

      <UserProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Voice Tutor Modal/Overlay */}
      <VoiceTutor 
        isOpen={isVoiceTutorOpen}
        onClose={() => setIsVoiceTutorOpen(false)}
      />

      {showLanding ? (
        <LandingPage 
          onLoginClick={() => {
            setAuthModalView('login');
            setIsAuthModalOpen(true);
          }}
          onRegisterClick={() => {
            setAuthModalView('register');
            setIsAuthModalOpen(true);
          }}
        />
      ) : (
        <div className="flex h-[100dvh] w-full bg-slate-950 overflow-hidden animate-in fade-in duration-500">
          
          {isQuizOpen && currentTopic && (
            <QuizModal 
              title={currentTopic.title}
              questions={quizQuestions}
              isLoading={isQuizLoading}
              onClose={() => setIsQuizOpen(false)}
              onRetake={handleRetakeQuiz}
              onPass={handleQuizPass}
            />
          )}

          <Sidebar 
            currentTopicId={currentTopic?.id || null}
            completedTopicIds={completedTopics}
            onSelectTopic={(t) => handleTopicSelect(t)}
            isOpen={isSidebarOpen}
            onCloseMobile={() => setIsSidebarOpen(false)}
          />

          <div className="flex-1 flex h-full relative w-full">
            
            {/* Chat Section */}
            <div className={`
              flex flex-col h-full transition-all duration-300 ease-in-out
              ${isEditorOpen 
                ? (isEditorMaximized ? 'hidden' : 'hidden md:flex md:w-[30%] border-r border-slate-800') 
                : 'w-full'}
            `}>
              
              {/* Header */}
              <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 md:hidden text-slate-400 hover:text-white"
                  >
                    <MenuIcon className="w-6 h-6" />
                  </button>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-white truncate">
                        {currentTopic?.title || 'Select a Topic'}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsProfileOpen(true)}
                        className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors group"
                      >
                         <div className="w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-[#f7df1e]">
                            <UserIcon className="w-3 h-3" />
                         </div>
                         <span className="text-slate-500 group-hover:text-slate-300">Logged in as</span>
                         <span className="text-[#f7df1e] font-medium">{currentUser?.name}</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Manual Completion Toggle */}
                  {currentTopic && (
                    <button
                      onClick={() => toggleTopicCompletion(currentTopic.id)}
                      title={isCurrentTopicCompleted ? "Mark as incomplete" : "Mark as complete"}
                      className={`
                        hidden sm:flex items-center justify-center p-2 rounded-full transition-colors
                        ${isCurrentTopicCompleted 
                          ? 'text-green-400 bg-green-900/20 hover:bg-green-900/30' 
                          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                        }
                      `}
                    >
                      {isCurrentTopicCompleted ? <CheckCircleIcon className="w-5 h-5" /> : <CheckIcon className="w-5 h-5" />}
                    </button>
                  )}

                  <button 
                    onClick={() => setIsVoiceTutorOpen(true)}
                    className="p-2 text-slate-400 hover:text-[#f7df1e] hover:bg-slate-800 rounded-full transition-colors hidden sm:block"
                    title="Start Voice Session"
                  >
                    <HeadphonesIcon className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={handleRestartTopic}
                    title="Restart Topic"
                    disabled={isLoading || !currentTopic}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors disabled:opacity-50 hidden sm:block"
                  >
                    <RefreshIcon className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleOpenQuiz}
                    disabled={isLoading || !currentTopic}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/30 transition-all"
                  >
                     <AcademicCapIcon className="w-4 h-4" />
                     <span className="hidden lg:inline">Test Knowledge</span>
                     <span className="lg:hidden">Quiz</span>
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
              <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0">
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
               ${getEditorContainerClass()}
               transition-all duration-300
            `}>
              <CodeEditor 
                onClose={() => setIsEditorOpen(false)} 
                isMaximized={isEditorMaximized}
                onToggleMaximize={() => setIsEditorMaximized(!isEditorMaximized)}
                isFullScreen={isEditorFullScreen}
                onToggleFullScreen={() => setIsEditorFullScreen(!isEditorFullScreen)}
                initialCode={currentTopic?.practiceCode}
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default App;