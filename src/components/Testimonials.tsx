import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Startup Founder",
    text: "Rounak delivered a world-class website that exceeded all expectations. His attention to detail and creative vision transformed our brand identity completely.",
    rating: 5,
    avatar: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director",
    text: "Working with Rounak was an absolute pleasure. He understood our vision instantly and built a stunning, high-performance site that boosted our conversions by 40%.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "David Chen",
    role: "Tech Lead, Finova",
    text: "The level of animation and polish in our web app is unmatched. Rounak's expertise in GSAP and modern frameworks is truly next-level.",
    rating: 5,
    avatar: "DC",
  },
  {
    name: "Sarah Williams",
    role: "Creative Director",
    text: "Exceptional talent with a keen eye for design. Rounak created an immersive digital experience that our clients absolutely love.",
    rating: 5,
    avatar: "SW",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

      const cards = carouselRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Client <span className="text-gradient">Reviews</span>
          </h2>
          <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </div>

        {/* Desktop: Grid, Mobile: Carousel */}
        <div
          ref={carouselRef}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-8 relative overflow-hidden transition-all duration-500 ${
                activeIndex === i ? "ring-2 ring-primary/50 scale-[1.02]" : ""
              }`}
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-foreground/80 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full accent-gradient flex items-center justify-center text-primary-foreground font-bold text-sm"
                  style={{
                    boxShadow:
                      "0 0 15px hsl(38 90% 67% / 0.3)",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 accent-gradient"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
