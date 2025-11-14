import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current?.querySelectorAll(".form-field") || [],
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add send animation
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full animate-glow-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-accent rounded-full animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 glow-text">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Have a project in mind? Let's create something amazing together.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-3xl glow-box">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-field">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-background/50 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background/50 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-background/50 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="form-field">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-300 glow-box text-lg py-6"
              >
                Send Message
              </Button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="text-center text-muted-foreground mb-6">
              Or connect with me on
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:scale-110 hover:glow-box transition-all duration-300 group"
              >
                <Github className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:scale-110 hover:glow-box transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:scale-110 hover:glow-box transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
