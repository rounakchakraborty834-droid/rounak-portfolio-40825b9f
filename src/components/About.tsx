import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "@/assets/profile.png";
import { Code2, Palette, Zap, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML5 & CSS3", icon: Code2, color: "text-orange-600" },
  { name: "JavaScript & TypeScript", icon: Zap, color: "text-yellow-600" },
  { name: "React & Next.js", icon: Sparkles, color: "text-blue-600" },
  { name: "UI/UX Design", icon: Palette, color: "text-purple-600" },
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
          x: -60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
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
          x: 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
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
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
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
      className="py-24 px-6 relative overflow-hidden bg-muted/30"
    >
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute -inset-4 accent-gradient rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl" />
              <img
                src={profileImage}
                alt="Rounak - Web Developer"
                className="relative w-80 h-80 object-cover rounded-full border-4 border-card shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right: Bio & Skills */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                About <span className="text-gradient">Me</span>
              </h2>
              <div className="w-20 h-1 accent-gradient rounded-full" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate web developer with a keen eye for design and a commitment to delivering 
                exceptional digital experiences. With expertise in modern web technologies and frameworks, 
                I transform complex ideas into elegant, user-friendly solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My approach combines technical excellence with creative innovation, ensuring every project 
                not only meets but exceeds expectations. I specialize in building responsive, performant 
                applications that users love.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Core Expertise</h3>
              <div ref={skillsRef} className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="professional-card p-4 rounded-xl group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${skill.color} p-2 bg-muted rounded-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">{skill.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
