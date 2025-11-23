import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { dbService } from '../services/db';
import { UserIcon, ChartBarIcon, CalendarIcon, TrophyIcon, BrainIcon } from './Icons';

interface UserProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, isOpen, onClose, onLogout }) => {
  const [stats, setStats] = useState<{
    totalTopics: number;
    completedCount: number;
    percentage: number;
    averageScore: number;
    totalQuizzesTaken: number;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
       if (isOpen && user) {
          const userStats = await dbService.getUserStats(user.id);
          setStats(userStats);
       }
    };
    fetchStats();
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1e1e1e] border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors"
          >
            ✕
          </button>
          <div className="absolute -bottom-10 left-8 flex items-end gap-4">
            <div className="w-24 h-24 bg-[#f7df1e] rounded-2xl shadow-lg border-4 border-[#1e1e1e] flex items-center justify-center text-black">
               <UserIcon className="w-12 h-12" />
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-16 px-8 pb-8">
          {/* Account Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm font-medium uppercase tracking-wide">
                <ChartBarIcon className="w-4 h-4 text-blue-400" />
                Global Progress
              </div>
              <div className="text-3xl font-bold text-white">
                {stats?.percentage || 0}%
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                 <div 
                   className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                   style={{ width: `${stats?.percentage || 0}%` }}
                 />
              </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm font-medium uppercase tracking-wide">
                <TrophyIcon className="w-4 h-4 text-[#f7df1e]" />
                Topics Mastered
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{stats?.completedCount || 0}</span>
                <span className="text-sm text-slate-500">/ {stats?.totalTopics || 0}</span>
              </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm font-medium uppercase tracking-wide">
                <BrainIcon className="w-4 h-4 text-purple-400" />
                Avg. Quiz Score
              </div>
              <div className="text-3xl font-bold text-white">
                {stats?.averageScore || 0}%
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Across {stats?.totalQuizzesTaken || 0} quizzes
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                <div>
                  <div className="text-sm text-slate-300 font-medium">Email Address</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </div>
                <div className="mt-2 sm:mt-0 px-3 py-1 text-xs bg-slate-800 text-slate-400 rounded border border-slate-700">
                  Verified
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                <div>
                   <div className="text-sm text-slate-300 font-medium">Account Action</div>
                   <div className="text-sm text-slate-500">Sign out of your session</div>
                </div>
                <button 
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="mt-3 sm:mt-0 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 rounded-lg text-sm font-medium transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;