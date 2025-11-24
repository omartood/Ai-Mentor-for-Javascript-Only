import React, { useState, useEffect, useRef } from 'react';
import { connectLiveSession } from '../services/gemini';
import { MicIcon, StopCircleIcon, UserIcon, BrainIcon } from './Icons';

interface VoiceTutorProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceTutor: React.FC<VoiceTutorProps> = ({ isOpen, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionCleanup, setSessionCleanup] = useState<{ close: () => Promise<void> } | null>(null);
  
  // Audio Playback Refs
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Visualizer Refs
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      startSession();
    } else {
      stopSession();
    }
    // Cleanup on unmount
    return () => {
      stopSession();
    };
  }, [isOpen]);

  const startSession = async () => {
    setIsConnecting(true);
    
    // Initialize Output Context
    outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    nextStartTimeRef.current = 0;

    const cleanup = await connectLiveSession(
      (audioBuffer) => {
        playAudio(audioBuffer);
      },
      () => {
        // On Close Callback
        setIsConnected(false);
        setIsConnecting(false);
      }
    );

    if (cleanup) {
      setSessionCleanup(cleanup);
      setIsConnected(true);
      setIsConnecting(false);
      startVisualizer();
    } else {
      setIsConnecting(false); // Failed to connect
    }
  };

  const stopSession = async () => {
    if (sessionCleanup) {
      await sessionCleanup.close();
      setSessionCleanup(null);
    }
    
    // Stop all playing audio
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsConnected(false);
    setIsConnecting(false);
  };

  const playAudio = (audioBuffer: AudioBuffer) => {
    if (!outputAudioContextRef.current) return;
    
    const ctx = outputAudioContextRef.current;
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    
    // Schedule
    const currentTime = ctx.currentTime;
    // If next start time is in the past, reset it to now (gapless logic)
    if (nextStartTimeRef.current < currentTime) {
      nextStartTimeRef.current = currentTime;
    }
    
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
    
    sourcesRef.current.add(source);
    source.onended = () => {
      sourcesRef.current.delete(source);
    };
  };

  const startVisualizer = () => {
    const canvas = visualizerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    
    const draw = () => {
      if (!isConnected) return; // Stop if disconnected

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Simulate a pulsing effect based on time (since we don't have direct analyzer access easily in this setup without more plumbing)
      // In a real app, we'd connect an AnalyserNode to the input/output contexts.
      time += 0.05;
      
      // Outer Glow
      const radius = 60 + Math.sin(time) * 5;
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5);
      gradient.addColorStop(0, 'rgba(247, 223, 30, 0.2)');
      gradient.addColorStop(1, 'rgba(247, 223, 30, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Inner Circle (AI Core)
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1e1e';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f7df1e';
      ctx.stroke();

      // Brain Icon centered
      // We can't draw the SVG component easily on canvas, so we draw a simple representation or just rely on the DOM overlay.
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    draw();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8 text-center">
        
        {/* Status Text */}
        <div className="mb-8">
           <h2 className="text-2xl font-bold text-white mb-2">Voice Tutor</h2>
           <p className="text-slate-400 text-sm">
             {isConnecting ? "Connecting to JS Sensei..." : "Discussing JavaScript Logic"}
           </p>
        </div>

        {/* Visualizer Container */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
          <canvas 
            ref={visualizerRef} 
            width={300} 
            height={300} 
            className="absolute inset-0 w-full h-full"
          />
          
          {/* Central Avatar */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-slate-900 border border-[#f7df1e] flex items-center justify-center shadow-[0_0_30px_rgba(247,223,30,0.3)]">
             <BrainIcon className={`w-12 h-12 text-[#f7df1e] ${isConnected ? 'animate-pulse' : ''}`} />
          </div>
          
          {/* Connection Rings */}
          {isConnecting && (
            <div className="absolute inset-0 rounded-full border border-[#f7df1e]/30 animate-ping" />
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-6 items-center">
          <button 
             onClick={onClose}
             className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/50 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all text-red-500">
              <StopCircleIcon className="w-8 h-8" />
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-red-400">End Session</span>
          </button>
        </div>

        <p className="mt-12 text-xs text-slate-600 max-w-xs">
          Tip: Speak clearly. The AI is listening for JavaScript related questions.
        </p>
      </div>
    </div>
  );
};

export default VoiceTutor;