
'use server';
/**
 * @fileOverview A flow for detecting fake news and misinformation using forensic fact-checking.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FakeNewsInputSchema = z.object({
  newsText: z.string().describe("The news article text or claim to verify."),
});
export type FakeNewsInput = z.infer<typeof FakeNewsInputSchema>;

const FakeNewsOutputSchema = z.object({
  isFake: z.boolean().describe('Whether the news content is likely fake or misinformation.'),
  riskScore: z.number().min(0).max(100).describe('A risk score from 0 to 100 where 100 is highly unreliable.'),
  verdict: z.string().describe('A short, catchy verdict (e.g., "DEBUNKED", "UNVERIFIED", "AUTHENTIC").'),
  explanation: z.string().describe('Detailed explanation of why this content is flagged or verified, citing common patterns or known facts.'),
});
export type FakeNewsOutput = z.infer<typeof FakeNewsOutputSchema>;

export async function analyzeNewsContent(input: FakeNewsInput): Promise<FakeNewsOutput> {
  return fakeNewsAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fakeNewsAnalysisPrompt',
  input: {schema: FakeNewsInputSchema},
  output: {schema: FakeNewsOutputSchema},
  prompt: `You are an elite forensic fact-checker and misinformation analyst.

Analyze the provided news text or claim:
{{{newsText}}}

1. Cross-reference the core claims against your internal knowledge base of verified facts and known hoaxes.
2. Evaluate for linguistic red flags:
   - Sensationalist or inflammatory language (clickbait).
   - Lack of specific details (names, dates, verified locations).
   - Biased or heavily opinionated framing.
   - Logical fallacies or circular reasoning.
3. Provide a risk score (0-100) where 100 is a complete fabrication.
4. Give a clear verdict and a forensic explanation.

If the text is too short or ambiguous, provide a "Low Confidence" assessment but still explain why.`,
});

const fakeNewsAnalysisFlow = ai.defineFlow(
  {
    name: 'fakeNewsAnalysisFlow',
    inputSchema: FakeNewsInputSchema,
    outputSchema: FakeNewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
