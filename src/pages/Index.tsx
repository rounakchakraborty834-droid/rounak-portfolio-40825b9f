import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Smooth scroll behavior with transitions
      const handleSmoothScroll = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const id = target.getAttribute('href')?.slice(1);
          const element = document.getElementById(id || '');
          
          // Trigger page transition
          setIsTransitioning(true);
          setTimeout(() => {
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 400);
        }
      };

      document.addEventListener('click', handleSmoothScroll);
      
      // Enhanced scroll animations
      gsap.config({ force3D: true });
      
      return () => {
        document.removeEventListener('click', handleSmoothScroll);
      };
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <ParticleBackground />
          <CustomCursor />
          <PageTransition isTransitioning={isTransitioning} />
          <main className="relative smooth-scroll">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Services />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
