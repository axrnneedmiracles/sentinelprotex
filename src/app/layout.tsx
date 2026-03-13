import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import TargetCursor from '@/components/cursor/target-cursor';
import { AdminProvider } from '@/context/admin-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { CommunityProvider } from '@/context/community-context';
import { UIProvider } from '@/context/ui-context';
import Script from 'next/script';
import { BackgroundAnimation } from '@/components/background-animation';
import { Header } from '@/components/layout/header';
import { GlobalChatWrapper } from '@/components/chat/global-chat-wrapper';

export const metadata: Metadata = {
  title: 'Sentinel Scan',
  description: 'A sleek, futuristic link scanner app designed to detect and warn users about malicious messages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Script 
          type="module" 
          src="https://unpkg.com/@splinetool/viewer@1.12.61/build/spline-viewer.js" 
          strategy="afterInteractive"
        />
        <FirebaseClientProvider>
          <AdminProvider>
            <CommunityProvider>
              <UIProvider>
                <TargetCursor spinDuration={2} hideDefaultCursor={true} />
                <div className="min-h-screen w-full relative">
                  <BackgroundAnimation />
                  <div className="relative z-10 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow container mx-auto px-4 py-24 flex flex-col items-center justify-start gap-12">
                      {children}
                    </main>
                    <footer className="text-center p-4 text-muted-foreground text-sm">
                      POWERED BY AXRN. Stay Safe Online.
                    </footer>
                  </div>
                  <GlobalChatWrapper />
                </div>
                <Toaster />
              </UIProvider>
            </CommunityProvider>
          </AdminProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
