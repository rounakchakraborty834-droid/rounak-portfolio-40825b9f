import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.3
    });

    // Enhanced entrance animations
    tl.fromTo(badgeRef.current, {
      opacity: 0,
      scale: 0,
      y: -20
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }).fromTo(headlineRef.current?.children || [], {
      opacity: 0,
      y: 60,
      rotationX: -90
    }, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.3").fromTo(subtitleRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.5").fromTo(ctaRef.current?.children || [], {
      opacity: 0,
      y: 30,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)"
    }, "-=0.4").fromTo(splineRef.current, {
      opacity: 0,
      scale: 0.8,
      rotationY: -15
    }, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8");

    // Floating animation for badge
    gsap.to(badgeRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Parallax mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
      
      gsap.to(splineRef.current, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
        {/* Left: Text Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4 hover:scale-110 hover:bg-primary/20 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            Available for Freelance
          </div>
          
          <h1 ref={headlineRef} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="inline-block">Hi,</span>{" "}
            <span className="inline-block">I'm</span>{" "}
            <span className="text-gradient inline-block hover:scale-110 transition-transform duration-300 cursor-default">Rounak</span>
          </h1>
          
          <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground/70 animate-fade-in">
            <span className="inline-block hover:text-primary transition-colors">Web</span>{" "}
            <span className="inline-block hover:text-accent transition-colors">Developer</span>
          </p>

          <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Crafting exceptional digital experiences through innovative design and cutting-edge technology. 
            Specialized in modern web development with a focus on performance and user experience.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="group relative overflow-hidden accent-gradient hover:scale-105 hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg shadow-lg magnetic-button"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get In Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 px-8 py-6 text-lg hover:bg-primary/10 hover:scale-105 hover:border-primary transition-all duration-300 magnetic-button"
            >
              View Projects
            </Button>
          </div>
        </div>

        {/* Right: Spline 3D with enhanced effects */}
        <div ref={splineRef} className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/50 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <iframe 
            src="https://my.spline.design/genkubgreetingrobot-Wgc99sBpfyGgYHCt6AWyhysh/" 
            frameBorder="0" 
            className="w-full h-full border-0" 
            title="3D Robot Animation" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
