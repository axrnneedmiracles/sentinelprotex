'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ScanForm } from '@/components/scan/scan-form';
import { ScanResultDisplay } from '@/components/scan/scan-result';
import { scanMessage } from '@/lib/actions';
import type { ScanResult } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import MagicBento from '@/components/ui/magic-bento';
import { incrementScanCount, incrementVisitorCount } from '@/lib/firebase-actions';
import { useUI } from '@/context/ui-context';
import { useRouter } from 'next/navigation';

type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';

export default function Home() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const { setChatOpen } = useUI();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    incrementVisitorCount();
  }, []);

  const handleScan = async (text: string) => {
    if (!text.trim()) return;

    setStatus('scanning');
    setResult(null);

    const scanResult = await scanMessage(text);
    
    if (scanResult.error) {
      toast({
        variant: 'destructive',
        title: 'Scan Error',
        description: scanResult.error,
      });
      setStatus('error');
    } else {
      setResult(scanResult);
      setStatus('success');
      incrementScanCount();
    }
  };
  
  const handleWarnCommunity = () => {
    if (result && result.isMalicious) {
      router.push(`/community?url=${encodeURIComponent(result.url)}`);
    }
  };

  return (
    <>
      {status === 'idle' ? (
        <>
          <div className="relative w-full max-w-3xl text-center space-y-2">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  src="/logo.gif"
                  alt="Background Logo"
                  width={150}
                  height={150}
                  unoptimized
                  className="opacity-10"
                />
              </div>
              <h2 className="relative text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent py-2 bg-[length:200%_auto] animate-background-pan" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--accent) / 0.5)' }}>SENTINEL SCAN</h2>
              <p className="relative text-lg md:text-xl text-muted-foreground">
                  GRAVEYARD OF SCAMMERS
              </p>
          </div>
          <ScanForm onScan={handleScan} loading={status === 'scanning'} />
        </>
      ) : (
         <ScanForm onScan={handleScan} loading={status === 'scanning'} />
      )}

      <ScanResultDisplay 
        result={result} 
        status={status} 
        onWarnCommunity={handleWarnCommunity} 
        onOpenChat={() => setChatOpen(true)} 
      />

      {status === 'idle' && <MagicBento />}
    </>
  );
}
