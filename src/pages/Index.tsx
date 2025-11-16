import { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <main className="relative">
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
