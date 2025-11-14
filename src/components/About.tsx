import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "@/assets/profile.png";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "GSAP", icon: "✨" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: -100,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        skillsRef.current?.children || [],
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <img
                src={profileImage}
                alt="Milad - Web Developer"
                className="relative w-80 h-80 object-cover rounded-full border-4 border-primary/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500"
              />
            </div>
          </div>

          {/* Right: Bio & Skills */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold glow-text">
                About <span className="text-primary">Me</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate web developer specializing in creating
                stunning, high-performance websites and applications. With
                expertise in modern frameworks and a keen eye for design, I
                transform ideas into immersive digital experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My focus is on delivering clean code, smooth animations, and
                user-centric interfaces that leave a lasting impression.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Tech Stack
              </h3>
              <div ref={skillsRef} className="grid grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-card p-4 rounded-xl hover:glow-box hover:scale-105 transition-all duration-300 text-center group"
                  >
                    <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <p className="text-sm font-medium text-foreground/80">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
