import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Sparkles, Globe, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Rocket,
    title: "Web Application Development",
    description: "Custom web applications built with modern technologies, optimized for performance and scalability. From MVPs to enterprise solutions.",
    features: ["React & Next.js", "Responsive Design", "API Integration", "Performance Optimization"],
    gradient: "from-blue-500 via-cyan-500 to-teal-500"
  },
  {
    icon: Sparkles,
    title: "UI/UX Design & Development",
    description: "Beautiful, intuitive interfaces that enhance user experience and drive engagement. Pixel-perfect implementations with attention to detail.",
    features: ["Modern Design Systems", "Interactive Animations", "Mobile-First Approach", "Accessibility Standards"],
    gradient: "from-purple-500 via-pink-500 to-rose-500"
  },
  {
    icon: Globe,
    title: "E-Commerce Solutions",
    description: "Complete e-commerce platforms with seamless checkout experiences, payment integration, and inventory management systems.",
    features: ["Shopping Cart Systems", "Payment Gateways", "Product Management", "Order Tracking"],
    gradient: "from-orange-500 via-amber-500 to-yellow-500"
  },
  {
    icon: Shield,
    title: "Enterprise Solutions",
    description: "Scalable enterprise applications with robust architecture, security best practices, and seamless integration capabilities.",
    features: ["Scalable Architecture", "Security Implementation", "Cloud Integration", "System Optimization"],
    gradient: "from-emerald-500 via-green-500 to-lime-500"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Enhance your existing applications with performance audits, code optimization, and best practices implementation.",
    features: ["Speed Optimization", "SEO Enhancement", "Code Refactoring", "Bundle Size Reduction"],
    gradient: "from-indigo-500 via-violet-500 to-purple-500"
  },
  {
    icon: Users,
    title: "Consulting & Training",
    description: "Expert guidance on technology choices, architecture decisions, and team training for modern web development practices.",
    features: ["Technical Consulting", "Code Reviews", "Team Training", "Best Practices"],
    gradient: "from-pink-500 via-rose-500 to-red-500"
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      const cards = servicesGridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: servicesGridRef.current,
              start: "top 80%",
            },
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div className="container mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Services & <span className="text-gradient">Solutions</span>
          </h2>
          <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive web development services tailored to your business needs, from startups to enterprise-level solutions
          </p>
        </div>

        <div
          ref={servicesGridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="professional-card p-6 rounded-xl group hover:scale-105 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon with animated gradient */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-4 mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 pt-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-xs flex items-center text-foreground/70"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 group-hover:scale-150 transition-transform" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className="professional-card p-8 md:p-12 rounded-2xl text-center glow-box"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Something <span className="text-gradient">Amazing?</span>
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a solution that exceeds your expectations. 
            From concept to deployment, I'll be with you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="accent-gradient hover:opacity-90 transition-opacity text-base px-8"
              onClick={scrollToContact}
            >
              Start a Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
              onClick={scrollToContact}
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">99%</div>
            <div className="text-sm text-muted-foreground">On-Time Delivery</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">5★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
