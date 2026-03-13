'use client';

import { ShieldCheck, Zap, Download, Puzzle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';
import SplitText from '@/components/ui/split-text';

const features = [
  {
    icon: <ShieldCheck className="text-accent" />,
    title: 'Instant Block',
    description: 'Automatically stops you from visiting known malicious or phishing domains.',
  },
  {
    icon: <Zap className="text-primary" />,
    title: 'Real-time Analysis',
    description: 'Scans every link you hover over using our lightweight neural engine.',
  },
  {
    icon: <Puzzle className="text-purple-400" />,
    title: 'One-Click Community',
    description: 'Easily report scams you find directly to the Sentinel community hub.',
  },
];

export function ExtensionPage() {
  const { toast } = useToast();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/webextension/sentinelguard.zip';
    link.setAttribute('download', 'sentinelguard.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Started",
      description: "The Sentinel Scan extension package (sentinelguard.zip) is downloading.",
    });
  };

  return (
    <div className="w-full max-w-4xl space-y-12 animate-in fade-in zoom-in-95">
      <div className="flex flex-col items-center text-center space-y-8 py-12">
        <Badge className="bg-accent/20 text-accent border-accent/20 px-4 py-1 text-sm">
          V1.2.0 NOW LIVE
        </Badge>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-primary-foreground leading-tight">
            <SplitText 
              text="PROTECTION THAT" 
              textAlign="center"
              delay={40}
              className="block"
            />
            <SplitText 
              text="FOLLOWS YOU." 
              textAlign="center"
              delay={40}
              className="text-primary block"
            />
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Stop checking links manually. Our Chrome extension brings the power of Sentinel Scan directly to your browser, scanning for threats in real-time as you browse.
          </p>
        </div>
        
        <div className="pt-4">
          <Button 
            size="lg" 
            onClick={handleDownload}
            className="group relative h-20 px-12 text-2xl font-black rounded-2xl overflow-hidden cursor-target transition-all hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(103,58,183,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <Download className="mr-4 h-8 w-8" />
            DOWNLOAD NOW
            
            <div className="absolute -inset-1 bg-primary/30 rounded-2xl blur opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" />
          </Button>
          <p className="text-xs text-muted-foreground mt-4 font-mono uppercase tracking-widest opacity-60">
            Available for Chrome, Brave & Edge
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-card/30 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                {feature.icon}
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
