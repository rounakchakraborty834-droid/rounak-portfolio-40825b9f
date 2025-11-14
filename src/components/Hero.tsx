import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.5
    });
    tl.fromTo(headlineRef.current, {
      opacity: 0,
      y: 60,
      filter: "blur(10px)"
    }, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out"
    }).fromTo(subtitleRef.current, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6").fromTo(ctaRef.current, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.4").fromTo(splineRef.current, {
      opacity: 0,
      x: 100
    }, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=1");
  }, []);
  return <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Floating background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{
        animationDelay: "2s"
      }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-glow-pulse" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text Content */}
        <div className="space-y-8 text-center lg:text-left">
          <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="glow-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Rounak</span>
            <br />
            <span className="text-foreground/80 text-4xl md:text-5xl lg:text-6xl">
              Web Developer
            </span>
          </h1>

          <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Crafting digital experiences that inspire and engage through
            innovative design and cutting-edge technology.
          </p>

          <div ref={ctaRef}>
            <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:scale-105 transition-transform duration-300 glow-box px-8 py-6 text-lg">
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>

        {/* Right: Spline 3D */}
        <div ref={splineRef} className="relative h-[700px] lg:h-screen lg:-mr-12">
          <iframe src="https://my.spline.design/orb-m5KSbPJiTDXdujpgjzBsnq9S/" className="w-full h-full border-0 rounded-3xl" title="3D Orb Animation" />
        </div>
      </div>
    </section>;
};
export default Hero;