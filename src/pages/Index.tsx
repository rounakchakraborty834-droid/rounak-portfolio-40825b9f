import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingNav from "@/components/FloatingNav";
import BackToTop from "@/components/BackToTop";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      gsap.config({ force3D: true });
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <ScrollProgress />
          <ParticleBackground />
          <FloatingNav />
          <BackToTop />
          <main className="relative smooth-scroll">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Testimonials />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
