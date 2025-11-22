import React from 'react';
import { CURRICULUM } from '../constants';
import { Topic, CurriculumModule } from '../types';
import { BookIcon, CheckCircleIcon } from './Icons';

interface SidebarProps {
  currentTopicId: string | null;
  onSelectTopic: (topic: Topic) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTopicId, onSelectTopic, isOpen, onCloseMobile }) => {
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
          {CURRICULUM.map((module: CurriculumModule) => (
            <div key={module.id}>
              <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                {module.title}
              </h3>
              <div className="space-y-1">
                {module.topics.map((topic) => {
                  const isActive = currentTopicId === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        onSelectTopic(topic);
                        onCloseMobile();
                      }}
                      className={`
                        w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                        flex items-center justify-between group
                        ${isActive 
                          ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }
                      `}
                    >
                      <span className="truncate">{topic.title}</span>
                      {isActive && <CheckCircleIcon className="w-4 h-4 text-blue-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
