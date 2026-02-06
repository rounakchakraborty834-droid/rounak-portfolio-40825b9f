import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = lettersRef.current?.children;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    // Letter-by-letter reveal
    if (letters) {
      tl.fromTo(
        letters,
        { opacity: 0, y: 40, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.7)",
        }
      );
    }

    // Progress bar
    tl.to(
      progressBarRef.current,
      {
        width: "100%",
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function () {
          const progress = Math.round(this.progress() * 100);
          if (percentRef.current) {
            percentRef.current.textContent = `${progress}%`;
          }
        },
      },
      "-=0.2"
    );
  }, [onComplete]);

  const name = "ROUNAK";

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background grid-bg"
    >
      <div className="text-center space-y-8">
        <div ref={lettersRef} className="flex justify-center gap-1">
          {name.split("").map((letter, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-bold glow-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block"
              style={{ perspective: "600px" }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="w-64 md:w-96 mx-auto space-y-3">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-0 accent-gradient"
              style={{
                boxShadow: "0 0 10px hsl(38 90% 67% / 0.5)",
              }}
            />
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Loading Experience</span>
            <span ref={percentRef} className="text-primary font-bold">
              0%
            </span>
          </div>
        </div>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
};

export default Preloader;
