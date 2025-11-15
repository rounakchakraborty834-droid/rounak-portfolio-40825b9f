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
    title: "3D Portfolio",
    description: "Interactive portfolio showcase with stunning 3D elements and smooth scroll animations",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Portfolio"
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
    title: "Developer Portfolio",
    description: "Professional portfolio website featuring smooth scroll interactions and modern design patterns",
    tech: ["React", "GSAP", "CSS"],
    category: "Portfolio"
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
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

      const cards = projectsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: projectsRef.current,
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
              className="professional-card p-6 rounded-xl group"
            >
              <div className="space-y-4">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {project.category}
                  </span>
                  <span className="text-3xl font-bold text-muted-foreground/20">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed min-h-[60px]">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-muted rounded-full text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {project.link && (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 accent-gradient hover:opacity-90"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
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
