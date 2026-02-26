'use client';

import { useState } from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { ChatBotDialog } from '../chat/chatbot-dialog';
import { Button } from '../ui/button';

export function ScamBot() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[90] animate-in slide-in-from-bottom-10 fade-in duration-500">
        <Button 
          onClick={() => setChatOpen(true)}
          className="group relative h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(103,58,183,0.4)] border-2 border-white/10 transition-all hover:scale-105 active:scale-95 cursor-target flex items-center justify-center gap-3 overflow-hidden"
        >
          {/* Animated Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
          
          <Bot className="w-5 h-5" />
          <span className="text-sm">ASK NAYRA</span>
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          
          <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </div>

      <ChatBotDialog open={chatOpen} onClose={() => setChatOpen(false)} />

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}
