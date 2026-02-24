'use client';

import { useState } from 'react';
import { ChatBotDialog } from '../chat/chatbot-dialog';

export function ScamBot() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-center pointer-events-none">
        {/* Robot Container - Reduced size slightly as requested */}
        <div className="relative w-56 h-56 md:w-72 md:h-72 overflow-hidden pointer-events-auto flex items-center justify-center rounded-3xl group">
          {/* @ts-ignore */}
          <spline-viewer 
            url="https://prod.spline.design/rYPxO8ZKJCM6ipWR/scene.splinecode"
            className="w-full h-full"
            loading-anim-type="spinner-small-dark"
          ></spline-viewer>
          
          {/* ASK NAYRA Button - Positioned further right to completely cover the Spline watermark */}
          <button 
            onClick={() => setChatOpen(true)}
            className="absolute bottom-2 right-1 px-5 py-2 bg-primary text-primary-foreground text-sm font-black uppercase tracking-widest rounded-lg shadow-[0_0_25px_rgba(132,0,255,0.7)] border-2 border-white/20 hover:scale-105 active:scale-95 transition-all z-[100] cursor-target whitespace-nowrap backdrop-blur-md hover:bg-primary/90"
          >
            ASK NAYRA
          </button>
        </div>
      </div>

      <ChatBotDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
