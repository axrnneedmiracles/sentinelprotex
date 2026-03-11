'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface SentinelMenuProps {
  items: MenuItem[];
}

export function SentinelMenu({ items }: SentinelMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        display: 'flex',
        ease: 'power2.out',
      });

      tl.fromTo(itemsRef.current, 
        { y: 30, opacity: 0, rotateX: -15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        display: 'none',
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="h-10 w-10 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-primary-foreground hover:bg-primary/30 transition-all z-[60] relative cursor-target"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-background/40 backdrop-blur-2xl z-[55] hidden flex-col items-center justify-center p-6 transition-all duration-500"
        onClick={handleToggle}
      >
        <div 
          ref={contentRef}
          className="w-full max-w-lg space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, index) => (
            <div
              key={item.label}
              ref={(el) => { if (el) itemsRef.current[index] = el; }}
              className="group"
            >
              <button
                onClick={() => {
                  item.onClick();
                  handleToggle();
                }}
                className="w-full text-left p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all flex items-center justify-between group cursor-target overflow-hidden relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative z-10">
                  <span className="text-xs font-black text-primary uppercase tracking-[0.2em] block mb-1 opacity-60">
                    0{index + 1}
                  </span>
                  <span className="text-2xl md:text-3xl font-light tracking-tight text-white/90 group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </div>
                
                <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-primary group-hover:translate-x-2 transition-all relative z-10" />
              </button>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 left-0 w-full text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            Sentinel Forensic Navigation
          </p>
        </div>
      </div>
    </>
  );
}
