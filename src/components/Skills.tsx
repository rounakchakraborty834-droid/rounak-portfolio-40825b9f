import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Database, Wrench, Zap, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend Development",
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Layers,
    title: "Frameworks & Libraries",
    skills: ["Next.js", "GSAP", "Three.js", "Spline", "React Query", "Redux"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    skills: ["Responsive Design", "Animation", "Figma", "User Experience", "Design Systems"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Database,
    title: "Backend & Database",
    skills: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Supabase"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Wrench,
    title: "Tools & Workflow",
    skills: ["Git", "GitHub", "VS Code", "npm", "Webpack", "Vite"],
    color: "from-yellow-500 to-amber-500"
  },
  {
    icon: Zap,
    title: "Performance & Optimization",
    skills: ["Web Vitals", "Code Splitting", "Lazy Loading", "SEO", "Accessibility"],
    color: "from-indigo-500 to-violet-500"
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

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

      const cards = skillsGridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: skillsGridRef.current,
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
      id="skills"
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, performant, and beautiful web applications
          </p>
        </div>

        <div
          ref={skillsGridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="professional-card p-6 rounded-xl group relative overflow-hidden tilt-card cursor-pointer hover:scale-105 transition-all duration-500"
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="space-y-4 relative z-10">
                  {/* Icon with gradient background and animations */}
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${category.color} p-3 mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl transition-all duration-500`}>
                    <Icon className="w-full h-full text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Category Title with gradient on hover */}
                  <h3 className="text-xl font-bold group-hover:text-gradient transition-all duration-300">
                    {category.title}
                  </h3>

                  {/* Skills List with stagger animation */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 bg-muted rounded-full text-foreground/70 hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300 cursor-default"
                        style={{ transitionDelay: `${idx * 30}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section with count-up animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center group cursor-default">
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Projects Completed</div>
          </div>
          <div className="text-center group cursor-default">
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">3+</div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Years Experience</div>
          </div>
          <div className="text-center group cursor-default">
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Technologies</div>
          </div>
          <div className="text-center group cursor-default">
            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
