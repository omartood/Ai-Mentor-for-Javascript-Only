import React, { useState, useEffect } from 'react';
import { CURRICULUM } from '../constants';
import { Topic, CurriculumModule } from '../types';
import { BookIcon, CheckCircleIcon, LockIcon, ChevronRightIcon } from './Icons';

interface SidebarProps {
  currentTopicId: string | null;
  completedTopicIds: string[];
  onSelectTopic: (topic: Topic) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentTopicId, 
  completedTopicIds, 
  onSelectTopic, 
  isOpen, 
  onCloseMobile 
}) => {
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>([]);

  // Auto-expand the module containing the current topic
  useEffect(() => {
    if (currentTopicId) {
      const activeModule = CURRICULUM.find(m => m.topics.some(t => t.id === currentTopicId));
      if (activeModule) {
        setExpandedModuleIds(prev => {
          // Ensure we don't duplicate IDs
          const newSet = new Set(prev);
          newSet.add(activeModule.id);
          return Array.from(newSet);
        });
      }
    } else if (CURRICULUM.length > 0 && expandedModuleIds.length === 0) {
      // Default to expanding the first module on load if nothing is selected
      setExpandedModuleIds([CURRICULUM[0].id]);
    }
  }, [currentTopicId, expandedModuleIds.length]);

  const toggleModule = (moduleId: string) => {
    setExpandedModuleIds(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed md:relative inset-y-0 left-0 z-30
          w-72 bg-[#1e1e1e] border-r border-slate-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col h-full
        `}
      >
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <div className="p-2 bg-[#f7df1e] rounded-lg shadow-lg shadow-yellow-500/20">
            <span className="text-black font-bold font-mono text-lg leading-none tracking-tighter px-0.5">JS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">JS Master</h1>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">AI Mentor</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          {CURRICULUM.map((module: CurriculumModule, index: number) => {
            // Logic: Module is locked if the PREVIOUS module is not fully completed.
            // The first module (index 0) is always unlocked.
            let isLocked = false;
            if (index > 0) {
              const prevModule = CURRICULUM[index - 1];
              const isPrevModuleComplete = prevModule.topics.every(t => completedTopicIds.includes(t.id));
              if (!isPrevModuleComplete) {
                isLocked = true;
              }
            }

            const isExpanded = expandedModuleIds.includes(module.id);

            return (
              <div key={module.id} className={isLocked ? 'opacity-80' : ''}>
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between px-3 mb-2 group focus:outline-none select-none"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRightIcon className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    <h3 className={`text-xs font-bold uppercase tracking-widest transition-colors text-left ${isLocked ? 'text-slate-600' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {module.title}
                    </h3>
                  </div>
                  {isLocked && <LockIcon className="w-3.5 h-3.5 text-slate-600" />}
                </button>
                
                {/* Collapsible Content */}
                <div 
                  className={`
                    space-y-1 relative overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  {isLocked && (
                    <div className="absolute inset-0 z-10 cursor-not-allowed bg-black/5" title="Complete previous module to unlock" />
                  )}
                  
                  {module.topics.map((topic) => {
                    const isActive = currentTopicId === topic.id;
                    const isCompleted = completedTopicIds.includes(topic.id);
                    
                    return (
                      <button
                        key={topic.id}
                        disabled={isLocked}
                        onClick={() => {
                          if (!isLocked) {
                            onSelectTopic(topic);
                            onCloseMobile();
                          }
                        }}
                        className={`
                          w-full text-left px-3 py-2.5 pl-9 rounded-lg text-sm transition-all duration-200
                          flex items-center justify-between group border border-transparent
                          ${isActive 
                            ? 'bg-[#f7df1e]/10 text-[#f7df1e] border-[#f7df1e]/20' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }
                          ${isLocked ? 'cursor-not-allowed hover:bg-transparent hover:text-slate-500' : ''}
                        `}
                      >
                        <span className={`truncate ${isCompleted && !isActive ? 'text-slate-500' : ''}`}>
                          {topic.title}
                        </span>
                        {isCompleted && (
                          <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 text-center">
              Powered by Google Gemini
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;