'use server';
/**
 * @fileOverview Nayra AI Chatbot Flow - Specialized in Scam Recovery and Forensic Guidance.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const NayraChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('Conversation history for context.'),
  message: z.string().describe('The new user message.'),
});

export type NayraChatInput = z.infer<typeof NayraChatInputSchema>;

const NayraChatOutputSchema = z.object({
  reply: z.string().describe('The AI response text.'),
});

export type NayraChatOutput = z.infer<typeof NayraChatOutputSchema>;

export async function nayraChat(input: NayraChatInput): Promise<NayraChatOutput> {
  return nayraChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nayraChatPrompt',
  input: { schema: NayraChatInputSchema },
  output: { schema: NayraChatOutputSchema },
  system: `You are Nayra, the Sentinel AI Assistant. 
Tone: Professional, empathetic, and forensic.

GOAL: Guide users through the aftermath of a scam.

INSTRUCTIONS:
1. If a user reports being scammed or asks for help, be empathetic but professional.
2. Ask for critical details to provide better help: Which bank was involved? What was the approximate amount? When did this happen?
3. Provide specific recovery steps:
   - Call 1930 immediately (National Cyber Crime Helpline).
   - Block cards/accounts via the official bank app.
   - Report the incident at cybercrime.gov.in.
4. Once you know the bank, provide the relevant helpline:
   - SBI: 1800 1234
   - HDFC: 1800 202 6161
   - ICICI: 1800 1080
   - IDFC: 1800 419 4332
5. Keep responses informative but clear. Do not write extremely long paragraphs.
6. AVOID excessive bolding (**) and symbols. Keep the text clean.
7. NEVER ask for OTPs, CVVs, or full card numbers.`,
  prompt: `
  History:
  {{#each history}}
  {{role}}: {{{content}}}
  {{/each}}
  
  User: {{{message}}}
  Nayra:`,
});

const nayraChatFlow = ai.defineFlow(
  {
    name: 'nayraChatFlow',
    inputSchema: NayraChatInputSchema,
    outputSchema: NayraChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
