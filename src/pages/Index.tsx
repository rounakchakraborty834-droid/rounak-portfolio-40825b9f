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

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Smooth scroll behavior
      const handleSmoothScroll = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const id = target.getAttribute('href')?.slice(1);
          const element = document.getElementById(id || '');
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <main className="relative smooth-scroll">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Services />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Index;
