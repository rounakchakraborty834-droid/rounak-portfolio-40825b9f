import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "eCOM SITE",
    description: "Modern e-commerce platform with advanced 3D product visualization and seamless checkout experience",
    tech: ["React", "Spline", "GSAP"],
    link: "https://github.com/rounakchakraborty834-droid/woo-commerce-site",
    category: "E-Commerce"
  },
  {
    id: 2,
    title: "Gaming UI",
    description: "Next-generation gaming interface featuring character stats, leaderboards, and immersive arena views",
    tech: ["React", "Three.js", "TypeScript"],
    link: "https://supermariomodi.com/",
    category: "Gaming"
  },
  {
    id: 3,
    title: "PixelSYNC Weather App",
    description: "Real-time weather application with dynamic backgrounds, detailed forecasts, and location-based weather data",
    tech: ["JavaScript", "Weather API", "CSS"],
    link: "https://rounakchakraborty834-droid.github.io/PixelSync-Weather/",
    category: "Web App"
  },
  {
    id: 4,
    title: "Gaming Website",
    description: "Dynamic gaming platform with vibrant character showcases and engaging user interactions",
    tech: ["React", "GSAP", "Tailwind"],
    category: "Gaming"
  },
  {
    id: 5,
    title: "AstaTask",
    description: "Modern task management application with intuitive interface and productivity features",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://rounakchakraborty834-droid.github.io/AstraTask-To-do-List/",
    category: "Productivity"
  },
  {
    id: 6,
    title: "PantryPlus",
    description: "Recipe finder application that helps you discover delicious recipes based on available ingredients",
    tech: ["React", "GSAP", "CSS"],
    link: "https://rounakchakraborty834-droid.github.io/PantryPlus/",
    category: "Web App"
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split text effect
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Enhanced card animations with 3D effect
      const cards = projectsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              rotationX: -30,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
          
          // Hover animation
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -15,
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out"
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing expertise in modern web development
          </p>
        </div>

        <div
          ref={projectsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="professional-card p-6 rounded-xl group relative overflow-hidden tilt-card cursor-pointer"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
              
              <div className="space-y-4 relative z-10">
                {/* Category Badge with animation */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    {project.category}
                  </span>
                  <span className="text-3xl font-bold text-muted-foreground/20 group-hover:text-primary/30 transition-colors">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Project Title with hover effect */}
                <h3 className="text-2xl font-bold group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed min-h-[60px] group-hover:text-foreground transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tech Stack with stagger animation */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-muted rounded-full text-foreground/70 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 hover:scale-110"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons with enhanced hover */}
                <div className="flex gap-3 pt-2">
                  {project.link && (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 accent-gradient hover:scale-105 hover:shadow-xl transition-all duration-300 group/btn"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      View Project
                    </Button>
                  )}
                  {!project.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
