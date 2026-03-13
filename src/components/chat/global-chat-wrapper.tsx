'use client';

import { useUI } from '@/context/ui-context';
import { ChatBotDialog } from './chatbot-dialog';

export function GlobalChatWrapper() {
  const { chatOpen, setChatOpen } = useUI();
  
  return (
    <ChatBotDialog open={chatOpen} onClose={() => setChatOpen(false)} />
  );
}
