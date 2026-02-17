'use server';

import { analyzeCallRecording } from '@/ai/flows/call-analysis';
import type { CallAnalysisResult } from '@/lib/types';

export async function scanCall(audioDataUri: string): Promise<CallAnalysisResult> {
    const id = Math.random().toString(36).substring(7);
    const analyzedAt = new Date().toISOString();

    try {
        const aiResponse = await analyzeCallRecording({ audioBuffer: audioDataUri });
        
        return {
            id,
            audioUrl: audioDataUri,
            isScam: aiResponse.isScam,
            riskScore: aiResponse.riskScore,
            transcript: aiResponse.transcript,
            explanation: aiResponse.explanation,
            recommendedActions: aiResponse.recommendedActions,
            analyzedAt
        };
    } catch (error) {
        console.error("Call analysis failed:", error);
        return {
            id,
            audioUrl: audioDataUri,
            isScam: true,
            riskScore: 95,
            transcript: "Transcription failed due to system error.",
            explanation: "The system could not process the audio clearly. However, if the caller asked for personal codes, banking details, or used urgent language, assume it is a scam.",
            recommendedActions: "Hang up immediately. Do not share any information. Contact your bank through their official number if they were mentioned.",
            analyzedAt,
            error: "Neural analysis failed. Maximum caution advised."
        };
    }
}
