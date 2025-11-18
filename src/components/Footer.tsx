import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-12 px-6 border-t border-border overflow-hidden bg-card"
    >
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Contact
            </button>
            <a
              href="/auth"
              className="text-muted-foreground/50 hover:text-primary transition-colors duration-300 font-medium text-sm"
            >
              Admin
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-end">
              © 2025{" "}
              <span className="font-bold text-foreground">ROUNAK</span>
              <span className="text-muted-foreground/50">·</span>
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> 
            </p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Powered by React, GSAP & Modern Web Technologies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;