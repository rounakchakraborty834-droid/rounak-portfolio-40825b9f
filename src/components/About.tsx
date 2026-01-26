import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileMain from "@/assets/profile.png";
import profileProfessional from "@/assets/profile-professional.png";
import { Code2, Palette, Zap, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML5 & CSS3", icon: Code2, color: "text-primary" },
  { name: "JavaScript & TypeScript", icon: Zap, color: "text-accent" },
  { name: "React & Next.js", icon: Sparkles, color: "text-primary" },
  { name: "UI/UX Design", icon: Palette, color: "text-accent" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
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

      // Auto-rotating 360 animation
      gsap.to(imageContainerRef.current, {
        rotateY: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
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
          {/* Left: Profile Image with Auto-Rotating 360° Animation */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div 
              className="relative group"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
            >
              {/* Glowing ring effect */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-2xl animate-pulse" />
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-xl" />
              
              <div 
                ref={imageContainerRef}
                className="relative w-72 h-72 md:w-80 md:h-80"
                style={{ 
                  transformStyle: "preserve-3d",
                  transition: isFlipped ? "transform 0.7s ease-in-out" : "none",
                  transform: isFlipped ? "rotateY(180deg)" : undefined
                }}
              >
                {/* Front - Main Profile Image */}
                <div 
                  className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/40 shadow-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={profileMain}
                    alt="Rounak - Profile"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  {/* Overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10" />
                </div>
                
                {/* Back - Professional Image */}
                <div 
                  className="absolute inset-0 rounded-full overflow-hidden border-4 border-accent/40 shadow-2xl"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <img
                    src={profileProfessional}
                    alt="Rounak - Professional"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-primary/10" />
                </div>
              </div>
              
              {/* Floating particles around image */}
              <div className="absolute -inset-8 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
                    style={{
                      top: `${15 + Math.sin(i * 60 * Math.PI / 180) * 45}%`,
                      left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 50}%`,
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.6
                    }}
                  />
                ))}
              </div>
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
