import React, { useState } from 'react';
import { authService } from '../services/auth';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  initialView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialView = 'login' }) => {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let user: User;
      if (view === 'register') {
        if (!name) throw new Error("Name is required");
        user = await authService.register(name, email, password);
      } else {
        user = await authService.login(email, password);
      }
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1e1e1e] border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col items-center">
           <div className="p-2 bg-[#f7df1e] rounded-lg mb-4 shadow-lg shadow-yellow-500/20">
            <span className="text-black font-bold font-mono text-xl px-1">JS</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {view === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {view === 'login' ? 'Login to continue learning' : 'Join JS Master to track your progress'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded bg-red-900/30 border border-red-500/50 text-red-200 text-sm">
              {error}
            </div>
          )}

          {view === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f7df1e]"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f7df1e]"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f7df1e]"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 mt-2 bg-[#f7df1e] hover:bg-[#e5ce1b] text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (view === 'login' ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800 text-center text-sm text-slate-400">
          {view === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => {
              setView(view === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-[#f7df1e] font-semibold hover:underline"
          >
            {view === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
