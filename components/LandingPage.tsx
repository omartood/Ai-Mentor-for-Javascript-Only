import React from 'react';
import { BookIcon, CodeIcon, BrainIcon, ZapIcon, LayersIcon, ChevronRightIcon, StarIcon } from './Icons';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
              <BookIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">JS Master</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#reviews" className="hover:text-white transition-colors">Success Stories</a>
          </div>
          <button 
            onClick={onStart}
            className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors border border-slate-700"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-medium uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              AI Powered Mentor v2.0
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">JavaScript</span> from Start to Finish
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
              Ditch the static tutorials. Learn with an intelligent AI mentor that explains logic, reviews your code, and guides you from Variables to Asynchronous patterns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-xl shadow-blue-900/30 transition-all transform hover:scale-105 active:scale-95"
              >
                Start Learning Free
                <ChevronRightIcon className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-lg border border-slate-700 transition-all">
                View Curriculum
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-950 flex items-center justify-center text-xs text-white">
                     {String.fromCharCode(64+i)}
                   </div>
                ))}
              </div>
              <p>Joined by 10,000+ Developers</p>
            </div>
          </div>

          {/* Hero Graphic: Mock Code Editor */}
          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
             <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="ml-4 px-3 py-1 rounded-md bg-slate-900 text-xs text-slate-500 font-mono">async-mastery.js</div>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="text-slate-500">// 1. Fetch User Data</div>
                  <div className="text-purple-400">async function <span className="text-blue-400">fetchProfile</span><span className="text-slate-300">(id) {'{'}</span></div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-purple-400">try</span> {'{'}
                  </div>
                  <div className="pl-8 text-slate-300">
                    <span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> fetch(<span className="text-green-400">`/api/users/${'{id}'}`</span>);
                  </div>
                  <div className="pl-8 text-slate-300">
                    <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> res.json();
                  </div>
                  <div className="pl-8 text-slate-300">
                    console.<span className="text-yellow-400">log</span>(<span className="text-green-400">"Success:"</span>, data);
                  </div>
                  <div className="pl-4 text-slate-300">{'}'} <span className="text-purple-400">catch</span> (err) {'{'}</div>
                  <div className="pl-8 text-slate-300">console.<span className="text-red-400">error</span>(err);</div>
                  <div className="pl-4 text-slate-300">{'}'}</div>
                  <div className="text-slate-300">{'}'}</div>
                  <br />
                  <div className="text-slate-500">// AI Mentor: "Great use of async/await! Remember to handle 404s."</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why learn with JS Master?</h2>
            <p className="text-slate-400">We combine a rigorous structured curriculum with the flexibility of an AI tutor that never sleeps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Explanations</h3>
              <p className="text-slate-400 leading-relaxed">
                Don't just copy code. Ask "Why?" and get deep, contextual answers tailored to your current learning module.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all group">
               <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CodeIcon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Built-in Playground</h3>
              <p className="text-slate-400 leading-relaxed">
                Write, run, and debug JavaScript directly in the browser with a secure, sandboxed environment alongside your lessons.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-green-500/50 transition-all group">
               <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayersIcon className="w-6 h-6 text-green-400" />
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
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">96+</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">Topics Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">Free to use</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">AI Support</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">User Rating</div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to start coding?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Join thousands of developers mastering JavaScript the modern way.
            <br className="hidden md:block" /> No setup required. Just click start.
          </p>
          <button 
            onClick={onStart}
            className="px-10 py-5 rounded-full bg-white text-slate-900 hover:bg-blue-50 font-bold text-xl shadow-2xl transition-transform hover:scale-105"
          >
            Launch Application
          </button>
          <p className="mt-6 text-sm text-slate-500">No credit card required • Interactive Playground • Gemini AI Model</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-600 rounded shadow">
              <BookIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-200">JS Master</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} JS Master AI. Powered by Google Gemini.
          </div>
          <div className="flex gap-6 text-slate-500">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;