
import React from 'react';
import { CURRICULUM } from '../constants';
import { CodeIcon, BrainIcon, LayersIcon, ChevronRightIcon, StarIcon, CheckCircleIcon, UserIcon } from './Icons';

interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onRegisterClick }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <button onClick={() => scrollToSection('features')} className="hover:text-[#f7df1e] transition-colors">Features</button>
            <button onClick={() => scrollToSection('curriculum')} className="hover:text-[#f7df1e] transition-colors">Curriculum</button>
            <button onClick={() => scrollToSection('creator')} className="hover:text-[#f7df1e] transition-colors">Team</button>
            <button onClick={() => scrollToSection('reviews')} className="hover:text-[#f7df1e] transition-colors">Success Stories</button>
          </div>
          <button 
            onClick={onLoginClick}
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
                onClick={onRegisterClick}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#f7df1e] hover:bg-[#e5ce1b] text-black font-bold text-lg shadow-[0_0_20px_rgba(247,223,30,0.4)] transition-all transform hover:scale-105 active:scale-95"
              >
                Start Learning Free
                <ChevronRightIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('curriculum')}
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-lg border border-white/10 transition-all"
              >
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
              <h3 className="text-xl font-bold text-white mb-3">Structured Path</h3>
              <p className="text-slate-400 leading-relaxed">
                Progress through locked modules. Master Foundations, DOM, OOP, and Async before moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview Section */}
      <section id="curriculum" className="py-24 bg-[#1e1e1e] relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#f7df1e] font-bold tracking-wider uppercase text-sm">Course Roadmap</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">Comprehensive Curriculum</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our 20-module path takes you deeper than any other course. Here is a sneak peek at what you will master.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRICULUM.slice(0, 6).map((module, idx) => {
               // Flatten topics for preview
               const allTopics = module.subModules.flatMap(s => s.topics);
               const totalTopics = allTopics.length;
               const previewTopics = allTopics.slice(0, 3);

               return (
                <div key={module.id} className="bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-500">Module {idx + 1}</span>
                    {idx === 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 uppercase">Unlocked</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-400 uppercase">Locked</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{module.title.split(': ')[1]}</h3>
                  <ul className="space-y-2">
                    {previewTopics.map(topic => (
                      <li key={topic.id} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#f7df1e]" />
                        <span className="truncate">{topic.title.split('. ')[1]}</span>
                      </li>
                    ))}
                    {totalTopics > 3 && (
                       <li className="text-xs text-slate-500 italic pl-3.5">+ {totalTopics - 3} more lessons</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 text-white font-medium border-b border-[#f7df1e] pb-0.5 hover:text-[#f7df1e] transition-colors"
            >
              View Full Syllabus inside App <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Team / Creator Section */}
      <section id="creator" className="py-24 bg-white/5 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Meet the Team</h2>
            <p className="text-slate-400">Passionate engineers dedicated to democratizing software education.</p>
          </div>
           <div className="flex justify-center">
             <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-white/5 max-w-md w-full hover:border-[#f7df1e]/30 transition-all group hover:-translate-y-1">
                {/* Profile Image - Points to local file in public folder */}
                <div className="w-32 h-32 rounded-full bg-slate-800 mx-auto mb-6 border-4 border-[#f7df1e] flex items-center justify-center overflow-hidden shadow-lg shadow-yellow-500/20 relative group-hover:scale-105 transition-transform duration-300">
                   <img 
                     src="/omar.png" 
                     alt="Omar Tood" 
                     className="w-full h-full object-cover" 
                   />
                   <div className="absolute inset-0 bg-[#f7df1e]/10 group-hover:bg-transparent transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-1">Omar Tood</h3>
                <p className="text-[#f7df1e] text-sm font-bold uppercase tracking-wide mb-6">Lead AI Engineer</p>
                <p className="text-slate-400 leading-relaxed mb-6">
                   Full-stack developer with a passion for Artificial Intelligence. Built JS Master to bridge the gap between static documentation and interactive mentorship, helping thousands master the language of the web.
                </p>
                <div className="flex justify-center gap-4 border-t border-white/5 pt-6">
                   <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium">Twitter</a>
                   <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium">GitHub</a>
                   <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium">LinkedIn</a>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="reviews" className="py-24 bg-[#1e1e1e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Success Stories</h2>
            <p className="text-slate-400">Join a community of developers who changed their careers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5 relative">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <React.Fragment key={i}>
                    <StarIcon className="w-4 h-4 text-[#f7df1e]" />
                  </React.Fragment>
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "I struggled with Closures and Promises for months. JS Master's AI explained it with an analogy that finally made it click. The practice mode is a game changer."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Sarah Jenkins</div>
                  <div className="text-slate-500 text-xs">Frontend Dev @ TechCorp</div>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5 relative">
               <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <React.Fragment key={i}>
                    <StarIcon className="w-4 h-4 text-[#f7df1e]" />
                  </React.Fragment>
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "The curriculum is actually comprehensive. It doesn't skip the hard stuff like the Event Loop or Security. I feel much more confident in interviews now."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f7df1e] to-orange-500 flex items-center justify-center text-black font-bold">
                  M
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Marcus Chen</div>
                  <div className="text-slate-500 text-xs">Full Stack Engineer</div>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5 relative">
               <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <React.Fragment key={i}>
                    <StarIcon className="w-4 h-4 text-[#f7df1e]" />
                  </React.Fragment>
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "I love that I can ask the AI specifically about the code I just wrote in the playground. It's like having a senior engineer sitting next to me 24/7."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Alex Rodriguez</div>
                  <div className="text-slate-500 text-xs">Freelance Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-20 border-b border-white/10">
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
            onClick={onRegisterClick}
            className="px-10 py-5 rounded-full bg-black text-white hover:bg-slate-800 font-bold text-xl shadow-2xl transition-transform hover:scale-105"
          >
            Launch Application
          </button>
          <p className="mt-6 text-sm text-black/60 font-semibold">No credit card required • Interactive Playground • Gemini AI Model</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1e1e1e] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
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
          
          {/* Creator Attribution */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
              Designed & Built with <span className="text-red-500">❤</span> by 
              <span className="text-white font-medium flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-[#f7df1e]" />
                Omar Tood
              </span>
              <span className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-slate-400">AI Engineer</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
