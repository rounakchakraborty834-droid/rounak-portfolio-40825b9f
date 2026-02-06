import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Home, User, FolderOpen, Zap, Star, Download } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "#hero" },
  { icon: User, label: "About", href: "#about" },
  { icon: FolderOpen, label: "Projects", href: "#projects" },
  { icon: Zap, label: "Skills", href: "#skills" },
  { icon: Star, label: "Reviews", href: "#testimonials" },
  { icon: Download, label: "CV", href: "#contact" },
];

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Detect active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: visible ? 0 : 100,
        opacity: visible ? 1 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [visible]);

  const handleClick = (href: string) => {
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-3 py-2 rounded-full border border-border/40"
      style={{
        background: "hsl(var(--card) / 0.6)",
        backdropFilter: "blur(20px) saturate(180%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 hsl(var(--border) / 0.2)",
      }}
    >
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.slice(1);
          return (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-full transition-all duration-300 group ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 accent-gradient rounded-full opacity-90" />
              )}
              <Icon
                className={`w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-125 ${
                  isActive ? "text-primary-foreground" : ""
                }`}
              />
              <span
                className={`text-[10px] font-medium relative z-10 hidden sm:block ${
                  isActive ? "text-primary-foreground" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default FloatingNav;
