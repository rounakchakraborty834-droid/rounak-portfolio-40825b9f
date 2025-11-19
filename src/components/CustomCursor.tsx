import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.classList.contains("cursor-pointer");

      setIsHovering(isInteractive);
    };

    // Smooth cursor animation
    const animate = () => {
      const ease = 0.15;
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }
      if (trailRef.current) {
        const trailEase = 0.08;
        const trailX = positionRef.current.x + (targetRef.current.x - positionRef.current.x) * trailEase;
        const trailY = positionRef.current.y + (targetRef.current.y - positionRef.current.y) * trailEase;
        trailRef.current.style.transform = `translate(${trailX}px, ${trailY}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      <div
        ref={trailRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300 ${
          isHovering ? "w-16 h-16" : "w-12 h-12"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-colors duration-300 ${
            isHovering ? "border-accent" : "border-primary"
          }`}
          style={{ opacity: 0.5 }}
        />
      </div>

      {/* Glow effect */}
      <div
        ref={cursorGlowRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-500 ${
          isHovering ? "w-24 h-24" : "w-16 h-16"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
          background: isHovering
            ? "radial-gradient(circle, hsl(var(--accent) / 0.4), transparent 70%)"
            : "radial-gradient(circle, hsl(var(--primary) / 0.3), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] transition-all duration-200 ${
          isHovering ? "w-4 h-4" : "w-3 h-3"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`w-full h-full rounded-full transition-colors duration-300 ${
            isHovering ? "bg-accent" : "bg-primary"
          }`}
          style={{
            boxShadow: isHovering
              ? "0 0 20px hsl(var(--accent) / 0.8), 0 0 40px hsl(var(--accent) / 0.4)"
              : "0 0 15px hsl(var(--primary) / 0.8), 0 0 30px hsl(var(--primary) / 0.4)",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
