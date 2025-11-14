import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background grid-bg"
    >
      <div className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold glow-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Rounak
        </h1>
        
        <div className="w-64 md:w-96 mx-auto space-y-3">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-gradient-to-r from-primary to-secondary glow-box"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Loading Experience</span>
            <span ref={percentRef} className="text-primary font-bold">0%</span>
          </div>
        </div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
};

export default Preloader;
