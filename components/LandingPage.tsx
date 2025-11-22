import React from 'react';
import { BookIcon, CodeIcon, BrainIcon, ZapIcon, LayersIcon, ChevronRightIcon, StarIcon } from './Icons';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-50 selection:bg-[#f7df1e]/30 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#1e1e1e]/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#f7df1e] rounded-lg shadow-[0_0_15px_rgba(247,223,30,0.3)]">
              <span className="text-black font-bold font-mono text-lg leading-none tracking-tighter px-0.5">JS</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">JS Master</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-[#f7df1e] transition-colors">Features</a>
            <a href="#curriculum" className="hover:text-[#f7df1e] transition-colors">Curriculum</a>
            <a href="#reviews" className="hover:text-[#f7df1e] transition-colors">Success Stories</a>
          </div>
          <button 
            onClick={onStart}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/5"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 relative">
        {/* Yellow Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#f7df1e]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7df1e]/10 border border-[#f7df1e]/20 text-[#f7df1e] text-xs font-bold uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f7df1e]"></span>
              </span>
              AI Powered Mentor v2.0
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Master <span className="text-[#f7df1e] underline decoration-[#f7df1e]/30 decoration-4 underline-offset-4">JavaScript</span> from Start to Finish
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
              Ditch the static tutorials. Learn with an intelligent AI mentor that explains logic, reviews your code, and guides you from <code>console.log</code> to Asynchronous patterns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#f7df1e] hover:bg-[#e5ce1b] text-black font-bold text-lg shadow-[0_0_20px_rgba(247,223,30,0.4)] transition-all transform hover:scale-105 active:scale-95"
              >
                Start Learning Free
                <ChevronRightIcon className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-lg border border-white/10 transition-all">
                View Curriculum
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#1e1e1e] flex items-center justify-center text-xs text-white font-medium">
                     {String.fromCharCode(64+i)}
                   </div>
                ))}
              </div>
              <p><span className="text-white font-bold">10,000+</span> Developers Joined</p>
            </div>
          </div>

          {/* Hero Graphic: Mock Code Editor */}
          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
             <div className="absolute -inset-1 bg-gradient-to-br from-[#f7df1e] to-orange-500 rounded-2xl blur opacity-20"></div>
             <div className="relative bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className="ml-4 px-3 py-1 rounded-md bg-[#1e1e1e] text-xs text-slate-500 font-mono flex items-center gap-2">
                    <span className="text-[#f7df1e]">JS</span>
                    async-mastery.js
                  </div>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="text-slate-500 italic">// 1. Fetch User Data</div>
                  <div className="text-[#dcdcaa]">async function</div> <span className="text-[#dcdcaa]">fetchProfile</span><span className="text-[#ffd700]">(id)</span> <span className="text-white">{'{'}</span>
                  <div className="pl-4 text-white">
                    <span className="text-[#c586c0]">try</span> {'{'}
                  </div>
                  <div className="pl-8 text-white">
                    <span className="text-[#569cd6]">const</span> res = <span className="text-[#c586c0]">await</span> <span className="text-[#dcdcaa]">fetch</span>(<span className="text-[#ce9178]">`/api/users/${'{id}'}`</span>);
                  </div>
                  <div className="pl-8 text-white">
                    <span className="text-[#569cd6]">const</span> data = <span className="text-[#c586c0]">await</span> res.<span className="text-[#dcdcaa]">json</span>();
                  </div>
                  <div className="pl-8 text-white">
                    console.<span className="text-[#dcdcaa]">log</span>(<span className="text-[#ce9178]">"Success:"</span>, data);
                  </div>
                  <div className="pl-4 text-white">{'}'} <span className="text-[#c586c0]">catch</span> (err) {'{'}</div>
                  <div className="pl-8 text-white">console.<span className="text-[#dcdcaa]">error</span>(err);</div>
                  <div className="pl-4 text-white">{'}'}</div>
                  <div className="text-white">{'}'}</div>
                  <br />
                  <div className="p-3 rounded bg-[#f7df1e]/10 border-l-2 border-[#f7df1e] text-slate-300 text-xs mt-2">
                     <strong className="text-[#f7df1e]">AI Mentor:</strong> "Excellent! You handled the promise correctly. Just remember to check <code>res.ok</code> before parsing JSON."
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why learn with JS Master?</h2>
            <p className="text-slate-400">We combine a rigorous structured curriculum with the flexibility of an AI tutor that never sleeps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/5 hover:border-[#f7df1e]/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#f7df1e]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainIcon className="w-6 h-6 text-[#f7df1e]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Explanations</h3>
              <p className="text-slate-400 leading-relaxed">
                Don't just copy code. Ask "Why?" and get deep, contextual answers tailored to your current learning module.
              </p>
            </div>

            <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/5 hover:border-[#f7df1e]/50 transition-all group">
               <div className="w-12 h-12 rounded-xl bg-[#f7df1e]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CodeIcon className="w-6 h-6 text-[#f7df1e]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Built-in Playground</h3>
              <p className="text-slate-400 leading-relaxed">
                Write, run, and debug JavaScript directly in the browser with a secure, sandboxed environment alongside your lessons.
              </p>
            </div>

            <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/5 hover:border-[#f7df1e]/50 transition-all group">
               <div className="w-12 h-12 rounded-xl bg-[#f7df1e]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayersIcon className="w-6 h-6 text-[#f7df1e]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Structured 8-Module Path</h3>
              <p className="text-slate-400 leading-relaxed">
                Progress through locked modules. Master Foundations, DOM, OOP, and Async before moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">96+</div>
                <div className="text-sm text-[#f7df1e] uppercase tracking-wide font-bold">Topics Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-[#f7df1e] uppercase tracking-wide font-bold">Free to use</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-[#f7df1e] uppercase tracking-wide font-bold">AI Support</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-sm text-[#f7df1e] uppercase tracking-wide font-bold">User Rating</div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f7df1e]" style={{clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0% 100%)'}}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 py-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">Ready to start coding?</h2>
          <p className="text-xl text-black/80 font-medium mb-10 max-w-2xl mx-auto">
            Join thousands of developers mastering JavaScript the modern way.
            <br className="hidden md:block" /> No setup required. Just click start.
          </p>
          <button 
            onClick={onStart}
            className="px-10 py-5 rounded-full bg-black text-white hover:bg-slate-800 font-bold text-xl shadow-2xl transition-transform hover:scale-105"
          >
            Launch Application
          </button>
          <p className="mt-6 text-sm text-black/60 font-semibold">No credit card required • Interactive Playground • Gemini AI Model</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1e1e1e] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-[#f7df1e] rounded shadow">
              <span className="text-black font-bold font-mono text-xs px-0.5">JS</span>
            </div>
            <span className="font-bold text-slate-200">JS Master</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} JS Master AI. Powered by Google Gemini.
          </div>
          <div className="flex gap-6 text-slate-500">
             <a href="#" className="hover:text-[#f7df1e] transition-colors">Privacy</a>
             <a href="#" className="hover:text-[#f7df1e] transition-colors">Terms</a>
             <a href="#" className="hover:text-[#f7df1e] transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;