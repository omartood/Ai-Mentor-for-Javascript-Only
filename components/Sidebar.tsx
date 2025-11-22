import React from 'react';
import { CURRICULUM } from '../constants';
import { Topic, CurriculumModule } from '../types';
import { BookIcon, CheckCircleIcon, LockIcon } from './Icons';

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
          w-72 bg-slate-900 border-r border-slate-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col h-full
        `}
      >
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/20">
            <BookIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">JS Master</h1>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">AI Mentor</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
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

            return (
              <div key={module.id} className={isLocked ? 'opacity-50 grayscale' : ''}>
                <div className="flex items-center justify-between px-3 mb-2">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    {module.title}
                  </h3>
                  {isLocked && <LockIcon className="w-3 h-3 text-slate-500" />}
                </div>
                
                <div className="space-y-1 relative">
                  {isLocked && (
                    <div className="absolute inset-0 z-10 cursor-not-allowed" title="Complete previous module to unlock" />
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
                          w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                          flex items-center justify-between group
                          ${isActive 
                            ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }
                          ${isLocked ? 'cursor-not-allowed hover:bg-transparent hover:text-slate-400' : ''}
                        `}
                      >
                        <span className={`truncate ${isCompleted && !isActive ? 'text-slate-300' : ''}`}>
                          {topic.title}
                        </span>
                        {isCompleted && (
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
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