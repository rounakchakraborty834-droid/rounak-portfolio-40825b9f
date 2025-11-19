import { useEffect, useState } from "react";

interface PageTransitionProps {
  isTransitioning: boolean;
}

const PageTransition = ({ isTransitioning }: PageTransitionProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none">
      {/* Animated overlay bars */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-full w-1/5"
          style={{
            left: `${i * 20}%`,
            animation: `slideDown 0.8s cubic-bezier(0.85, 0, 0.15, 1) forwards`,
            animationDelay: `${i * 0.05}s`,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: i % 2 === 0
                ? "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)"
                : "linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.8) 100%)",
            }}
          />
        </div>
      ))}

      {/* Center logo/text animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="text-6xl font-bold text-gradient"
          style={{
            animation: "scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both",
          }}
        >
          R
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
