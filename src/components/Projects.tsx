import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Email Platform",
    description: "3D interactive email service for developers with stunning visuals",
    tech: ["React", "Spline", "GSAP"],
  },
  {
    id: 2,
    title: "Gaming UI",
    description: "Next-level gaming interface with character stats and arena",
    tech: ["React", "Three.js", "TypeScript"],
  },
  {
    id: 3,
    title: "3D Portfolio",
    description: "Immersive portfolio with 3D elements and smooth animations",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 4,
    title: "Gaming Website",
    description: "Vibrant gaming platform with dynamic character showcase",
    tech: ["React", "GSAP", "Tailwind"],
  },
  {
    id: 5,
    title: "Animation Tools",
    description: "Portfolio showcasing advanced web animation techniques",
    tech: ["GSAP", "Locomotive", "React"],
  },
  {
    id: 6,
    title: "Developer Portfolio",
    description: "Professional portfolio with smooth scroll and animations",
    tech: ["React", "GSAP", "CSS"],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      const cards = scrollContainerRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: "top 80%",
            },
          }
        );
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 glow-text"
        >
          Featured <span className="text-primary">Projects</span>
        </h2>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-8 hide-scrollbar">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 min-w-max px-4"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass-card p-8 rounded-2xl w-[350px] md:w-[400px] hover:glow-box hover:scale-105 transition-all duration-500 group"
              >
                {/* Project Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold glow-box">
                    {project.id}
                  </div>
                  <Code2 className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground group-hover:glow-box transition-all duration-300"
                >
                  View Project
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
