
'use server';

import { analyzeNewsContent } from '@/ai/flows/fake-news-analysis';
import type { FakeNewsResult } from '@/lib/types';

export async function scanNews(text: string): Promise<FakeNewsResult> {
    const analyzedAt = new Date().toISOString();

    try {
        const aiResponse = await analyzeNewsContent({ newsText: text });
        
        return {
            text,
            isFake: aiResponse.isFake,
            riskScore: aiResponse.riskScore,
            verdict: aiResponse.verdict,
            explanation: aiResponse.explanation,
            analyzedAt
        };
    } catch (error) {
        console.error("News analysis failed:", error);
        return {
            text,
            isFake: true,
            riskScore: 80,
            verdict: "SYSTEM ERROR",
            explanation: "Could not complete forensic fact-check due to a system error. Please treat this news with extreme caution until verified by trusted sources.",
            analyzedAt,
            error: "Neural fact-check failed."
        };
    }
}
