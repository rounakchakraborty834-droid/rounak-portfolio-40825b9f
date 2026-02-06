import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [show, setShow] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: show ? 1 : 0,
        opacity: show ? 1 : 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  }, [show]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full accent-gradient flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
      style={{
        boxShadow: "0 0 20px hsl(38 90% 67% / 0.4), 0 0 40px hsl(38 90% 67% / 0.15)",
        transform: "scale(0)",
        opacity: 0,
      }}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 text-primary-foreground group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};

export default BackToTop;
