import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.3
    });

    tl.fromTo(headlineRef.current, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }).fromTo(subtitleRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4").fromTo(ctaRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3").fromTo(splineRef.current, {
      opacity: 0,
      scale: 0.95
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
        {/* Left: Text Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            Available for Freelance
          </div>
          
          <h1 ref={headlineRef} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="text-gradient">Rounak</span>
          </h1>
          
          <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground/70">
            Web Developer
          </p>

          <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Crafting exceptional digital experiences through innovative design and cutting-edge technology. 
            Specialized in modern web development with a focus on performance and user experience.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="group relative overflow-hidden accent-gradient hover:opacity-90 transition-opacity px-8 py-6 text-lg shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get In Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 px-8 py-6 text-lg hover:bg-primary/5"
            >
              View Projects
            </Button>
          </div>
        </div>

        {/* Right: Spline 3D */}
        <div ref={splineRef} className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-xl">
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
