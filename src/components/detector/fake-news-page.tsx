
'use client';

import { useState } from 'react';
import { Newspaper, ShieldAlert, ShieldCheck, Loader2, AlertTriangle, Search, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { scanNews } from '@/lib/news-actions';
import type { FakeNewsResult } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function FakeNewsPage() {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<FakeNewsResult | null>(null);
  const { toast } = useToast();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length < 20) {
        toast({ 
            variant: 'destructive', 
            title: 'Input Too Short', 
            description: 'Please provide at least a sentence of news content for forensic analysis.' 
        });
        return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
        const analysis = await scanNews(text);
        setResult(analysis);
    } catch (error) {
        toast({ variant: 'destructive', title: 'Analysis Failed', description: 'Could not process the news content.' });
    } finally {
        setAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-8 animate-in fade-in zoom-in-95">
        <Card className="bg-card/30 backdrop-blur-lg border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-primary-foreground">
                    <Newspaper className="text-primary w-8 h-8" />
                    AI Fake News Detector
                </CardTitle>
                <CardDescription>
                    Paste a news article, social media post, or suspicious claim. Our AI will forensicly fact-check it against trusted global datasets.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleScan} className="space-y-4">
                    <Textarea 
                        placeholder="Paste news content here... (e.g., 'NASA discovered a secret moon base...')"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[150px] bg-background/50 border-primary/30 focus-visible:ring-accent text-lg"
                        disabled={analyzing}
                    />
                    <Button type="submit" className="w-full h-14 text-lg font-bold cursor-target" disabled={analyzing || !text.trim()}>
                        {analyzing ? <Loader2 className="mr-2 animate-spin" /> : <Search className="mr-2" />}
                        {analyzing ? 'Verifying Sources...' : 'Verify Authenticity'}
                    </Button>
                </form>

                {analyzing && (
                    <div className="flex flex-col items-center justify-center p-8 space-y-4">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <p className="text-lg font-medium animate-pulse">Cross-Referencing Global Fact Repositories...</p>
                    </div>
                )}

                {result && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        <div className={`flex items-center justify-between p-6 rounded-xl border-2 transition-colors ${result.isFake ? 'bg-destructive/10 border-destructive/50' : 'bg-accent/10 border-accent/50'}`}>
                            <div className="flex items-center gap-4">
                                {result.isFake ? <ShieldAlert className="text-destructive w-12 h-12" /> : <ShieldCheck className="text-accent w-12 h-12" />}
                                <div>
                                    <h3 className={`text-2xl font-black uppercase tracking-tighter ${result.isFake ? 'text-destructive' : 'text-accent'}`}>
                                        {result.verdict}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Unreliability Score: {result.riskScore}/100</p>
                                </div>
                            </div>
                            <Badge variant={result.isFake ? 'destructive' : 'default'} className={`text-lg px-4 py-1 ${!result.isFake ? 'bg-accent' : ''}`}>
                                 {result.riskScore}%
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-bold">Misinformation Risk</span>
                                <span className="font-bold">{result.riskScore}%</span>
                            </div>
                            <Progress value={result.riskScore} className="h-3" />
                        </div>

                        <Card className="bg-background/40 border-primary/10">
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Info className="w-4 h-4 text-primary" />
                                    Forensic Reasoning
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {result.explanation}
                                </p>
                            </CardContent>
                        </Card>

                        <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg border border-primary/10">
                            <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
                            <p className="text-xs text-muted-foreground">
                                <strong>Disclaimer:</strong> This analysis is performed by AI and should be used as a supplementary tool. Always verify important news through multiple reputable journalistic organizations.
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
