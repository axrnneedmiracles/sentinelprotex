'use client';

import { useState } from 'react';
import { ChatBotDialog } from '../chat/chatbot-dialog';

export function ScamBot() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[90] group flex flex-col items-center pointer-events-none">
        {/* Floating Label - Positioned higher above the robot */}
        <div 
          onClick={() => setChatOpen(true)}
          className="mb-4 px-4 py-1.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 cursor-pointer pointer-events-auto border border-white/20 hover:scale-105 z-10"
        >
          Need Help?
        </div>

        {/* Spline 3D Viewer Container */}
        <div className="relative w-40 h-40 md:w-64 md:h-64 overflow-visible pointer-events-auto flex items-center justify-center">
          {/* @ts-ignore */}
          <spline-viewer 
            url="https://prod.spline.design/QnT-ySBgwfivAi4p/scene.splinecode"
            className="w-full h-full"
            loading-anim-type="spinner-small-dark"
          ></spline-viewer>
        </div>
      </div>

      <ChatBotDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
