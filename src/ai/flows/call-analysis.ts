'use server';
/**
 * @fileOverview A flow for analyzing audio recordings of calls to detect scams and fraud.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CallAnalysisInputSchema = z.object({
  audioBuffer: z.string().describe("A call recording as a data URI that must include a MIME type (e.g., audio/webm or audio/wav) and use Base64 encoding."),
});
export type CallAnalysisInput = z.infer<typeof CallAnalysisInputSchema>;

const CallAnalysisOutputSchema = z.object({
  isScam: z.boolean().describe('Whether the call recording indicates a scam or fraud.'),
  riskScore: z.number().min(0).max(100).describe('A risk score from 0 to 100 where 100 is high risk.'),
  transcript: z.string().describe('The transcribed text from the audio.'),
  explanation: z.string().describe('Detailed explanation of why this is flagged as a scam or safe.'),
  recommendedActions: z.string().describe('Actionable advice for the user.'),
});
export type CallAnalysisOutput = z.infer<typeof CallAnalysisOutputSchema>;

export async function analyzeCallRecording(input: CallAnalysisInput): Promise<CallAnalysisOutput> {
  return callAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'callAnalysisPrompt',
  input: {schema: CallAnalysisInputSchema},
  output: {schema: CallAnalysisOutputSchema},
  prompt: `You are an expert fraud investigator specializing in voice phishing (vishing) and telephone scams.

Analyze the following call recording audio:
1. Transcribe the dialogue accurately.
2. Evaluate the content for red flags:
   - Requests for sensitive data (KYC, card numbers, OTPs, SSN).
   - High-pressure tactics (threats of arrest, account closure).
   - Impersonation of trusted entities (Banks, Government, Tech Support).
   - Unsolicited "prizes" or investment opportunities.
3. Provide a risk score (0-100) and a clear verdict.

Audio: {{media url=audioBuffer}}`,
});

const callAnalysisFlow = ai.defineFlow(
  {
    name: 'callAnalysisFlow',
    inputSchema: CallAnalysisInputSchema,
    outputSchema: CallAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
