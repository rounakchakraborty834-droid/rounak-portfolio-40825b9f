import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".animate-item") || [],
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 px-6 relative overflow-hidden bg-muted/30"
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Download <span className="text-gradient">CV</span>
          </h2>
          <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            Get a comprehensive overview of my skills, experience, and projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-item">
            <div className="professional-card p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 accent-gradient rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">hello@rounak.dev</p>
                </div>
              </div>
            </div>

            <div className="professional-card p-6 rounded-xl">
              <h3 className="font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:hello@rounak.dev"
                  className="p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Download CV Section */}
          <div className="lg:col-span-2 animate-item">
            <div className="professional-card p-12 rounded-xl text-center space-y-8">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto accent-gradient rounded-2xl flex items-center justify-center animate-pulse-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-bold">My Resume</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Download my complete resume to learn more about my professional journey, technical skills, and project highlights.
                </p>
              </div>

              <Button
                size="lg"
                className="accent-gradient hover:scale-105 hover:shadow-neon transition-all duration-300 text-white font-bold text-lg px-12 py-6"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Resume.pdf';
                  link.download = 'Rounak_Resume.pdf';
                  link.click();
                  toast.success("Resume downloaded successfully!");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </Button>

              <p className="text-sm text-muted-foreground">
                PDF Format • Updated November 2024 • 2 Pages
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
