'use client';

import { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { ChatBotDialog } from '../chat/chatbot-dialog';
import { Button } from '../ui/button';

export function ScamBot() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[90]">
        <Button 
          onClick={() => setChatOpen(true)}
          className="group relative h-10 px-3 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest rounded-xl shadow-[0_0_15px_rgba(132,0,255,0.3)] border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-target flex items-center gap-2"
        >
          <div className="relative">
            <Bot className="w-4 h-4 relative z-10" />
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping group-hover:animate-none opacity-50" />
          </div>
          <span className="text-[11px] sm:text-xs">ASK NAYRA</span>
          <Sparkles className="w-3 h-3 text-accent animate-pulse" />
          
          <div className="absolute -inset-1 bg-primary/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </div>

      <ChatBotDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
