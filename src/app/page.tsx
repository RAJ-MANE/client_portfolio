"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaAward, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaArrowRight,
  FaExternalLinkAlt
} from "react-icons/fa";
import { 
  FaJava, 
  FaDatabase, 
  FaEye, 
  FaBrain, 
  FaCode, 
  FaMicrochip 
} from "react-icons/fa";
import { 
  SiPython, 
  SiCplusplus, 
  SiC, 
  SiJavascript, 
  SiGnubash, 
  SiHtml5, 
  SiCss, 
  SiFlask, 
  SiTensorflow, 
  SiOpencv, 
  SiNumpy, 
  SiDocker, 
  SiGit, 
  SiMysql, 
  SiSqlite, 
  SiFigma, 
  SiGoogle 
} from "react-icons/si";
import CurtainLoader from "@/components/CurtainLoader";
import CircularTestimonials from "@/components/ui/circular-testimonials";
import { GripVertical, Menu, X } from "lucide-react";

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.4 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(15px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

// Fade in word-by-word animation
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-1.5 py-0.5">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.45,
              ease: [0.215, 0.61, 0.355, 1],
              delay: 0.01 * i,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}
// Infinite Marquee Row Component
interface MarqueeItem {
  name: string;
  icon: React.ReactNode;
}

function MarqueeRow({ items, direction = "left", speed = "25s" }: { items: MarqueeItem[]; direction?: "left" | "right"; speed?: string }) {
  const tripledItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className="w-full overflow-hidden py-3.5 flex relative mask-marquee">
      <div 
        className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        style={{ animationDuration: speed }}
      >
        {tripledItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-[#1a2220]/45 backdrop-blur-md border border-white/5 px-6 py-3.5 mx-2 rounded-2xl hover:border-[#C8B195]/30 hover:bg-[#1a2220]/75 hover:shadow-[0_0_25px_rgba(200,177,149,0.08)] transition-all duration-300 transform hover:scale-105 cursor-pointer select-none"
            data-cursor-text={`USE ${item.name.toUpperCase()}`}
          >
            <span className="text-xl text-[#C8B195] transition-colors duration-300">
              {item.icon}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FAF6EE]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Interactive Image Comparison Slider for projects
function ProjectImageSlider({ image1, image2, title }: { image1: string; image2: string; title: string }) {
  const [inset, setInset] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setInset(percentage);
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full h-full overflow-hidden rounded-xl select-none cursor-ew-resize"
      data-cursor-text="DRAG SLIDER"
      onMouseDown={(e) => {
        if (e.button === 0) {
          setIsDragging(true);
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          setInset(Math.max(0, Math.min(100, (x / rect.width) * 100)));
        }
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        if (e.touches.length > 0) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.touches[0].clientX - rect.left;
          setInset(Math.max(0, Math.min(100, (x / rect.width) * 100)));
        }
      }}
    >
      {/* Slider Split Line */}
      <div
        className="bg-[#C8B195]/40 h-full w-[2px] absolute z-20 top-0 -ml-[1px] select-none pointer-events-none"
        style={{
          left: inset + "%",
        }}
      >
        {/* Slider Button Handle */}
        <button
          className="bg-[#C8B195] text-[#121816] rounded hover:scale-110 active:scale-95 transition-all w-5.5 h-9 select-none -translate-y-1/2 absolute top-1/2 -ml-2.75 z-30 cursor-ew-resize flex justify-center items-center shadow-[0_0_15px_rgba(200,177,149,0.3)] border border-[#C8B195]/20"
          aria-label="Drag to compare"
          type="button"
        >
          <GripVertical className="h-3.5 w-3.5 select-none" />
        </button>
      </div>
      {/* Clipped Top Image */}
      <img
        src={image1}
        alt={`${title} - View A`}
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        className="absolute left-0 top-0 z-10 w-full h-full object-cover rounded-xl select-none pointer-events-none"
        style={{
          clipPath: "inset(0 0 0 " + inset + "%)",
        }}
      />
      {/* Base Bottom Image */}
      <img
        src={image2}
        alt={`${title} - View B`}
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        className="absolute left-0 top-0 w-full h-full object-cover rounded-xl select-none pointer-events-none"
      />
    </div>
  );
}

export default function Home() {
  const [showCurtains, setShowCurtains] = useState(true);
  const [curtainsFinished, setCurtainsFinished] = useState(false);
  const [fullscreenLoading, setFullscreenLoading] = useState<{ active: boolean; message: string } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRedirect = (e: React.MouseEvent<HTMLAnchorElement>, type: "demo" | "github", url: string) => {
    e.preventDefault();
    if (fullscreenLoading) return;
    
    setFullscreenLoading({
      active: true,
      message: type === "demo" ? "Connecting to Live Demo..." : "Opening GitHub Repository..."
    });
    
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setFullscreenLoading(null);
    }, 1200);
  };

  // Context-aware Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSpringX = useSpring(cursorX, { damping: 30, stiffness: 350 });
  const cursorSpringY = useSpring(cursorY, { damping: 30, stiffness: 350 });
  const [cursorText, setCursorText] = useState("");
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest("[data-cursor-text]");
      if (hoverEl) {
        setCursorText(hoverEl.getAttribute("data-cursor-text") || "");
        setCursorActive(true);
        hoverEl.classList.add("cursor-active-element");
      } else {
        setCursorActive(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest("[data-cursor-text]");
      if (hoverEl) {
        hoverEl.classList.remove("cursor-active-element");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Scroll Progress and Parallax Values
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  const backgroundRotation = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.18]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const heroTitleY1 = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const heroTitleY2 = useTransform(scrollYProgress, [0, 0.5], [0, 30]);



  const testimonials = [
    {
      quote:
        "Ananya brought exceptional depth to TEDxTCET as Co-Curator. Her capacity to refine complex ideas and structural narratives into highly engaging presentations significantly elevated our speaker standards.",
      name: "Ayush Shah",
      designation: "Lead Organizer, TEDxTCET",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    },
    {
      quote:
        "IMPROVYU, presented at the Model Forge 2025 competition, was a masterclass in applying computer vision and machine learning (OpenCV/MediaPipe) to solve a tangible human problem. Ananya's software craftsmanship is top-tier.",
      name: "Dr. Sandip Kumar",
      designation: "Lead AI Judge, Model Forge 2025",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    },
    {
      quote:
        "Her event coordination at CSI-TCET was marked by efficiency and high engagement. Ananya combines technical aptitude with structured management skills, making her a natural leader and developer.",
      name: "Pranav Patil",
      designation: "President, CSI-TCET",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const skillsRow1 = [
    { name: "Python", icon: <SiPython /> },
    { name: "Java", icon: <FaJava /> },
    { name: "C++", icon: <SiCplusplus /> },
    { name: "C", icon: <SiC /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "Bash", icon: <SiGnubash /> },
  ];

  const skillsRow2 = [
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss /> },
    { name: "Flask", icon: <SiFlask /> },
    { name: "TensorFlow", icon: <SiTensorflow /> },
    { name: "OpenCV", icon: <SiOpencv /> },
    { name: "MediaPipe", icon: <SiGoogle /> },
    { name: "NumPy", icon: <SiNumpy /> },
  ];

  const skillsRow3 = [
    { name: "Docker", icon: <SiDocker /> },
    { name: "Git", icon: <SiGit /> },
    { name: "SQL", icon: <FaDatabase /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "SQLite", icon: <SiSqlite /> },
    { name: "Figma", icon: <SiFigma /> },
  ];

  const skillsRow4 = [
    { name: "Computer Vision", icon: <FaEye /> },
    { name: "AI/ML", icon: <FaBrain /> },
    { name: "Web Development", icon: <FaCode /> },
    { name: "Embedded Systems", icon: <FaMicrochip /> },
  ];

  const projectsData = [
    {
      title: "IMPROVYU AI Interviewer",
      award: "Winner, Model Forge 2025 ML",
      description: "An advanced computer vision AI that conducts mock interviews. Leverages MediaPipe and OpenCV to evaluate facial postures, speech timing, and response structures in real-time.",
      tags: ["Python", "OpenCV", "MediaPipe", "AI/ML", "Flask"],
      image: "/improvyu.png",
      image1: "/improvyu.png",
      image2: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      liveLink: "https://improvyu.demo",
      githubLink: "https://github.com/ananyakalia14/improvyu"
    },
    {
      title: "Renewable Site Optimizer",
      award: "Winner, NEXUS Ideathon 2025",
      description: "A GIS and AI-powered web dashboard assessing topological and spatial suitability for wind and solar installations using OpenStreetMap algorithms.",
      tags: ["Flask", "OpenStreetMap", "TensorFlow", "NumPy", "Figma"],
      image: "/optimizer.png",
      image1: "/optimizer.png",
      image2: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      liveLink: "https://ai-sun-wind-planner.vercel.app",
      githubLink: "https://github.com/ananyakalia14/renewable-site-optimizer"
    },
    {
      title: "Fibonacci-Golden Ratio Research",
      award: "Winner, Best Paper MULTICON 2025",
      description: "A mathematical analysis paper assessing structural connections between Golden Ratio divisions and Fibonacci iterations, recognized for analytical insight.",
      tags: ["Python", "Analytical Modeling", "Research", "Fibonacci"],
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
      image1: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
      image2: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
      liveLink: "https://www.researchgate.net/publication/405140073_The_Golden_Link_Exploring_the_Fibonacci-_Golden_Ratio_Connection",
      githubLink: "https://github.com/ananyakalia14/fibonacci-golden-ratio"
    },
    {
      title: "C++ & Java Core Systems",
      award: "IIT Bombay FOSSEE Certification",
      description: "Intermediate and advanced implementations of Object-Oriented structures, custom memory allocations, and algorithms. Scoring a verified 92.50%.",
      tags: ["C++", "Java", "Data Structures", "OOP", "IIT Bombay"],
      image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=800&auto=format&fit=crop",
      image1: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=800&auto=format&fit=crop",
      image2: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      liveLink: "https://systems-oop.demo",
      githubLink: "https://github.com/ananyakalia14/core-systems-oop"
    }
  ];

  return (
    <div ref={pageRef} className="relative min-h-screen bg-[#121816] text-[#FAF6EE] select-none overflow-x-hidden">
      
      {/* Matte paper noise texture overlay */}
      <div className="noise-bg" />

      {/* Viewport vignette overlay for cinematic canvas */}
      <div className="cinematic-vignette" />

      {/* Context-Aware Custom Action Cursor */}
      <motion.div
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: cursorActive ? 1 : 0,
          scale: cursorActive ? 1 : 0.4,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden lg:flex items-center justify-center bg-[#C8B195] text-[#121816] text-[8px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-2xl border border-white/10"
      >
        <span className="flex items-center gap-1.5">
          {cursorText}
          {(cursorText.includes("VIEW") || cursorText.includes("GO") || cursorText.includes("VISIT")) && (
            <FaArrowRight className="text-[7px] transform -rotate-45" />
          )}
        </span>
      </motion.div>

      {/* Curtain Loader */}
      <CurtainLoader onComplete={() => setCurtainsFinished(true)} />

      {/* Ambient background glows (Faint drifting light blobs) */}
      <div className="glow-blob glow-gold top-[10%] left-[-10%] w-[600px] h-[600px] hidden md:block" />
      <div className="glow-blob glow-sage top-[28%] right-[-10%] w-[700px] h-[700px] hidden md:block" />
      <div className="glow-blob glow-sage top-[45%] left-[-15%] w-[650px] h-[650px] hidden md:block" />
      <div className="glow-blob glow-gold top-[62%] right-[-15%] w-[750px] h-[750px] hidden md:block" />
      <div className="glow-blob glow-cream top-[78%] left-[-10%] w-[600px] h-[600px] hidden md:block" />
      <div className="glow-blob glow-sage bottom-[2%] right-[-15%] w-[650px] h-[650px] hidden md:block" />

      {/* Main content layer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={curtainsFinished ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen flex flex-col"
      >
        {/* Giant watermarked logo - Top Right */}
        <motion.div 
          style={{ rotate: backgroundRotation }}
          className="absolute top-[10%] right-[-20%] w-[900px] h-[900px] opacity-[0.015] select-none pointer-events-none hidden xl:block"
        >
          <img src="/logo.jpg" alt="AK Logo" className="w-full h-full object-contain filter invert rounded-full" />
        </motion.div>

        {/* Giant watermarked logo - Skills Section (Right) */}
        <motion.div 
          style={{ rotate: backgroundRotation }}
          className="absolute top-[26%] right-[-25%] w-[800px] h-[800px] opacity-[0.012] select-none pointer-events-none hidden xl:block"
        >
          <img src="/logo.jpg" alt="AK Logo" className="w-full h-full object-contain filter invert rounded-full" />
        </motion.div>

        {/* Giant watermarked logo - Experience Section (Left) */}
        <motion.div 
          style={{ rotate: backgroundRotation }}
          className="absolute top-[38%] left-[-22%] w-[850px] h-[850px] opacity-[0.012] select-none pointer-events-none hidden xl:block"
        >
          <img src="/logo.jpg" alt="AK Logo" className="w-full h-full object-contain filter invert rounded-full" />
        </motion.div>

        {/* Giant watermarked logo - Testimonials Section (Left) */}
        <motion.div 
          style={{ rotate: backgroundRotation }}
          className="absolute top-[55%] left-[-25%] w-[850px] h-[850px] opacity-[0.01] select-none pointer-events-none hidden xl:block"
        >
          <img src="/logo.jpg" alt="AK Logo" className="w-full h-full object-contain filter invert rounded-full" />
        </motion.div>

        {/* Giant watermarked logo - Projects Section (Right) */}
        <motion.div 
          style={{ rotate: backgroundRotation }}
          className="absolute top-[68%] right-[-22%] w-[900px] h-[900px] opacity-[0.012] select-none pointer-events-none hidden xl:block"
        >
          <img src="/logo.jpg" alt="AK Logo" className="w-full h-full object-cover filter invert rounded-full opacity-[0.02]" />
        </motion.div>

        {/* Giant watermarked logo - Contact Section (Left) */}
        <motion.div 
          style={{ rotate: backgroundRotation }}
          className="absolute top-[88%] left-[-20%] w-[900px] h-[900px] opacity-[0.015] select-none pointer-events-none hidden xl:block"
        >
          <img src="/logo.jpg" alt="AK Logo" className="w-full h-full object-contain filter invert rounded-full" />
        </motion.div>

        {/* Navigation Header */}
        <header className="absolute top-0 left-0 z-40 w-full bg-transparent border-none">
          <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            {/* Header Logo */}
            <motion.a 
              href="#" 
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.02 }}
              data-cursor-text="HOME"
            >
              <div className="w-9 h-9 rounded-full border border-[#C8B195]/20 overflow-hidden p-0.5 bg-[#121816]">
                <img 
                  src="/logo.jpg" 
                  alt="AK" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="font-display text-sm font-bold tracking-widest text-[#C8B195] uppercase">
                Ananya<span className="text-[#8FA89B]">.</span>
              </span>
            </motion.a>

            <nav className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-[#FAF6EE]/60">
              <a href="#about" data-cursor-text="ABOUT" className="hover:text-[#C8B195] transition-colors">About</a>
              <a href="#skills" data-cursor-text="SKILLS" className="hover:text-[#C8B195] transition-colors">Skills</a>
              <a href="#experience" data-cursor-text="TIMELINE" className="hover:text-[#C8B195] transition-colors">Experience</a>
              <a href="#projects" data-cursor-text="PROJECTS" className="hover:text-[#C8B195] transition-colors">Projects</a>
              <a href="#testimonials" data-cursor-text="REVIEWS" className="hover:text-[#C8B195] transition-colors">Testimonials</a>
              <a href="#contact" data-cursor-text="LET'S TALK" className="hover:text-[#C8B195] transition-colors">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/ananyakalia14" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#FAF6EE]/60 hover:text-[#C8B195] text-base transition-colors"
                aria-label="GitHub"
                data-cursor-text="GITHUB"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/ananya-kalia-9609b3333?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#FAF6EE]/60 hover:text-[#C8B195] text-base transition-colors"
                aria-label="LinkedIn"
                data-cursor-text="LINKEDIN"
              >
                <FaLinkedin />
              </a>
              <a 
                href="#contact" 
                className="hidden sm:inline-block px-5 py-2 rounded-full border border-[#C8B195]/20 hover:bg-[#C8B195] hover:text-[#121816] text-[#C8B195] text-[9px] font-bold uppercase tracking-widest transition-all duration-300 bg-transparent"
                data-cursor-text="LET'S TALK"
              >
                Let&apos;s talk
              </a>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-[#FAF6EE]/80 hover:text-[#C8B195] text-xl p-1.5 focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-[#121816]/70 backdrop-blur-md md:hidden"
              />

              {/* Slide-out Menu Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                className="fixed top-0 right-0 bottom-0 w-[75vw] max-w-[280px] bg-[#1a2220] border-l border-white/5 z-50 p-6 md:hidden flex flex-col justify-between shadow-2xl"
              >
                <div className="flex flex-col gap-6">
                  {/* Menu Header with close button */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <span className="font-display text-[10px] font-bold tracking-widest text-[#C8B195] uppercase">
                      Navigation
                    </span>
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="text-[#FAF6EE]/80 hover:text-[#C8B195] p-1 transition-colors"
                      aria-label="Close Menu"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest text-[#FAF6EE]/70">
                    <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-[#C8B195] py-2 transition-colors border-b border-white/[0.02]">About</a>
                    <a href="#skills" onClick={() => setMenuOpen(false)} className="hover:text-[#C8B195] py-2 transition-colors border-b border-white/[0.02]">Skills</a>
                    <a href="#experience" onClick={() => setMenuOpen(false)} className="hover:text-[#C8B195] py-2 transition-colors border-b border-white/[0.02]">Experience</a>
                    <a href="#projects" onClick={() => setMenuOpen(false)} className="hover:text-[#C8B195] py-2 transition-colors border-b border-white/[0.02]">Projects</a>
                    <a href="#testimonials" onClick={() => setMenuOpen(false)} className="hover:text-[#C8B195] py-2 transition-colors border-b border-white/[0.02]">Testimonials</a>
                    <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-[#C8B195] py-2 transition-colors">Contact</a>
                  </nav>
                </div>

                {/* Footer actions in menu */}
                <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-3 rounded-full bg-[#C8B195] text-[#121816] text-[9px] font-bold uppercase tracking-widest transition-all duration-300 text-center hover:bg-[#FAF6EE]"
                  >
                    Let&apos;s talk
                  </a>
                  <div className="flex justify-center space-x-6 pt-2">
                    <a
                      href="https://github.com/ananyakalia14"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#FAF6EE]/60 hover:text-[#C8B195] text-base transition-colors"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ananya-kalia-9609b3333?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#FAF6EE]/60 hover:text-[#C8B195] text-base transition-colors"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-grow">

          {/* Hero Section */}
          <section id="hero" className="relative min-h-[calc(100vh-96px)] w-full flex flex-col justify-between px-6 pt-32 pb-12 md:py-20 z-10 overflow-hidden border-b border-white/5">
          
          {/* Right-aligned dramatic portrait backdrop with seamless blending and centering */}
          <motion.div 
            style={{ 
              scale: heroImageScale, 
              y: isMobile ? 0 : heroImageY,
            }}
            className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
          >
            <div className="relative w-full h-full">
              <img 
                src="/ananya_hero.jpg" 
                alt="Ananya Kalia - Software Developer & AI Engineer" 
                className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] h-full object-cover object-right md:object-center border-none outline-none opacity-10 md:opacity-100 transition-opacity duration-500" 
              />
              
              {/* Desktop Horizontal Gradient Overlay — custom precise multi-stop to prevent creases and borders */}
              <div 
                className="hidden md:block absolute inset-0 z-10" 
                style={{ 
                  background: 'linear-gradient(to right, #121816 0%, #121816 50%, rgba(18,24,22,0.9) 58%, rgba(18,24,22,0.3) 72%, transparent 90%)' 
                }} 
              />
              
              {/* Mobile Solid Dark Overlay wrapper for readability */}
              <div className="block md:hidden absolute inset-0 z-10 bg-[#121816]/85" />
              
              {/* Mobile Horizontal Gradient Overlay */}
              <div 
                className="block md:hidden absolute inset-0 z-10" 
                style={{ 
                  background: 'linear-gradient(to right, #121816 0%, #121816 30%, rgba(18,24,22,0.8) 60%, transparent 100%)' 
                }} 
              />
              
              {/* Vertical Gradient Overlay (Both Mobile & Desktop) — to blend top and bottom edges */}
              <div 
                className="absolute inset-0 z-20" 
                style={{ 
                  background: 'linear-gradient(to bottom, #121816 0%, rgba(18,24,22,0.3) 15%, transparent 30%, transparent 75%, #121816 100%)' 
                }} 
              />
            </div>
          </motion.div>

          {/* Mobile-Only Hero Layout Stack */}
          <div className="flex md:hidden w-full flex-col items-center justify-center text-center gap-6 relative z-10">
            {/* 1. Tag Pill */}
            <div className="w-full flex justify-center items-center pointer-events-none">
              <span className="text-[9px] font-bold tracking-widest text-[#C8B195] uppercase px-3.5 py-1.5 border border-[#C8B195]/20 rounded-full bg-[#121816]/80 backdrop-blur-md">
                CO-CURATOR • DEVELOPER
              </span>
            </div>

            {/* 2. H1 Typography */}
            <div className="w-full flex flex-col items-center justify-center text-center pointer-events-none">
              <h1 
                style={{ fontSize: 'clamp(3rem, 12vw, 5rem)' }}
                className="font-display font-black tracking-tighter uppercase leading-[0.9] select-none flex flex-col items-center"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8B195] via-[#FAF6EE] to-[#8FA89B] bg-[length:200%_auto] animate-gradient-text">
                  ANANYA
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8FA89B] via-[#FAF6EE] to-[#C8B195] -mt-1 bg-[length:200%_auto] animate-gradient-text">
                  KALIA
                </span>
              </h1>
            </div>

            {/* 3. Portrait Image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-[80vw] max-w-[320px] aspect-[3/4] mx-auto overflow-hidden pointer-events-none"
            >
              <img 
                src="/ananya_hero.jpg" 
                alt="Ananya Kalia" 
                className="w-full h-full object-cover"
              />
              {/* Vignette / Edge blend overlay for mobile hero image to blend it with background */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ 
                  background: 'radial-gradient(circle at center, transparent 35%, rgba(18,24,22,0.4) 65%, #121816 95%), linear-gradient(to bottom, transparent 60%, #121816 100%), linear-gradient(to top, transparent 80%, #121816 100%), linear-gradient(to right, #121816 0%, transparent 15%, transparent 85%, #121816 100%)' 
                }} 
              />
            </motion.div>

            {/* 4. Stats Card */}
            <div className="bg-[#1a2220]/95 border border-white/5 rounded-3xl p-6 shadow-2xl grid grid-cols-3 gap-4 w-full">
              <div className="text-center">
                <h3 className="text-xl font-bold font-display text-[#C8B195] tracking-tight">10.0</h3>
                <p className="text-[8px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold mt-1">B.E. CGPA</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold font-display text-[#8FA89B] tracking-tight">3+</h3>
                <p className="text-[8px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold mt-1">HACK WINS</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold font-display text-[#FAF6EE] tracking-tight">15+</h3>
                <p className="text-[8px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold mt-1">TECH STACKS</p>
              </div>
            </div>

            {/* 5. Design Statement Card */}
            <div className="w-full bg-[#1a2220]/40 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-center">
              <span className="text-[8px] font-bold text-[#8FA89B] uppercase tracking-widest">
                00 // DESIGN STATEMENT
              </span>
              <p className="text-xs text-[#FAF6EE]/80 leading-relaxed font-light font-sans">
                Aspiring software developer driven by curiosity and a desire to create real-world impact through technology. Experienced in building systems across web, computer vision, and machine learning domains.
              </p>
              
              {/* 6. CTA Buttons (stacked vertically) */}
              <div className="flex flex-col gap-4 pt-2 w-full">
                <a 
                  href="#projects" 
                  className="w-full min-h-[52px] flex items-center justify-center rounded-full bg-[#C8B195] text-[#121816] hover:bg-[#FAF6EE] hover:text-[#121816] text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-lg"
                >
                  View Projects
                </a>
                <a 
                  href="#contact" 
                  className="w-full min-h-[52px] flex items-center justify-center rounded-full border border-white/10 hover:border-[#C8B195] hover:text-[#C8B195] text-[#FAF6EE] text-[10px] font-bold uppercase tracking-widest transition-all duration-300 bg-[#1a2220]/20"
                >
                  Connect
                </a>
              </div>
            </div>
          </div>

          {/* Desktop-Only Hero Layout (Hidden on Mobile) */}
          <div className="hidden md:flex max-w-7xl mx-auto w-full flex-col justify-between gap-8 sm:gap-16 md:gap-20 min-h-[calc(100vh-176px)] md:h-full relative z-10">
            
            {/* Top Track: Tag */}
            <motion.div 
              style={{ y: isMobile ? 0 : heroTitleY1 }}
              className="w-full flex justify-start md:justify-end items-center pointer-events-none"
            >
              <span className="text-[9px] font-bold tracking-widest text-[#C8B195] uppercase px-3.5 py-1.5 border border-[#C8B195]/20 rounded-full bg-[#121816]/80 backdrop-blur-md">
                CO-CURATOR • DEVELOPER
              </span>
            </motion.div>

            {/* Middle Track: Bold display typography — anchored left and aligned cleanly with moving gradient flow */}
            <div className="w-full flex flex-col items-start justify-center text-left pointer-events-none">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display font-black tracking-tighter uppercase leading-[0.9] select-none flex flex-col items-start">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8B195] via-[#FAF6EE] to-[#8FA89B] bg-[length:200%_auto] animate-gradient-text">
                  ANANYA
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8FA89B] via-[#FAF6EE] to-[#C8B195] -mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4 bg-[length:200%_auto] animate-gradient-text">
                  KALIA
                </span>
              </h1>
            </div>

            {/* Bottom Track: Narrative & Stats */}
            <motion.div 
              style={{ y: isMobile ? 0 : heroTitleY2 }}
              className="w-full flex flex-col-reverse lg:flex-row justify-between items-stretch lg:items-end gap-6 sm:gap-8 pointer-events-auto"
            >
              {/* narrative overlay */}
              <div className="max-w-md bg-[#1a2220]/95 md:bg-[#1a2220]/75 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-4 text-left">
                <span className="text-[8px] font-bold text-[#8FA89B] uppercase tracking-widest">
                  00 // DESIGN STATEMENT
                </span>
                <p className="text-xs text-[#FAF6EE]/80 leading-relaxed font-light font-sans">
                  Aspiring software developer driven by curiosity and a desire to create real-world impact through technology. Experienced in building systems across web, computer vision, and machine learning domains.
                </p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href="#projects" 
                    className="px-4 sm:px-6 py-3 rounded-full bg-[#C8B195] text-[#121816] hover:bg-[#FAF6EE] hover:text-[#121816] text-[9px] font-bold uppercase tracking-widest transition-all duration-300 text-center shadow-lg"
                    data-cursor-text="EXPLORE PROJECTS"
                  >
                    View Projects
                  </a>
                  <a 
                    href="#contact" 
                    className="px-4 sm:px-6 py-3 rounded-full border border-white/10 hover:border-[#C8B195] hover:text-[#C8B195] text-[#FAF6EE] text-[9px] font-bold uppercase tracking-widest transition-all duration-300 text-center bg-[#1a2220]/20"
                    data-cursor-text="LET'S CONNECT"
                  >
                    Connect
                  </a>
                </div>
              </div>

              {/* stats display */}
              <div className="bg-[#1a2220]/95 md:bg-[#1a2220]/75 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-3 gap-6 sm:gap-10 min-w-[280px] w-full lg:w-auto">
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#C8B195] tracking-tight">10.0</h3>
                  <p className="text-[8px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold mt-1">B.E. CGPA</p>
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#8FA89B] tracking-tight">3+</h3>
                  <p className="text-[8px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold mt-1">HACK WINS</p>
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#FAF6EE] tracking-tight">15+</h3>
                  <p className="text-[8px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold mt-1">TECH STACKS</p>
                </div>
              </div>

            </motion.div>

          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 pt-16 pb-32 md:py-32 z-10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              <div className="lg:col-span-4 sticky top-28">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] mb-2 block">01 / PERSPECTIVE</span>
                <h2 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter text-[#FAF6EE]">
                  About <br />
                  <span className="text-[#8FA89B]">Myself.</span>
                </h2>
                <div className="w-12 h-1 bg-[#C8B195] mt-4 mb-8" />
                
                {/* Portrait Photo */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group mx-auto lg:mx-0">
                  <img 
                    src="/ananya_real.jpg" 
                    alt="Ananya Kalia Portrait" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121816]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195]/80">Mumbai, India</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 flex flex-col space-y-8">
                <WordReveal 
                  text="I build digital tools by combining mathematical analytics, software structures, and clean visual layouts."
                  className="text-2xl sm:text-3xl font-light text-[#FAF6EE]/90 leading-relaxed font-sans"
                />
                
                <div className="h-[1px] bg-white/10 my-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#FAF6EE]/60 text-sm leading-relaxed">
                  <div className="space-y-4">
                    <p>
                      My academic foundation at <span className="text-white font-medium">TCET</span> is paired with real-world project builds in Computer Vision, Web Application Dev, and Machine Learning systems.
                    </p>
                    <p>
                      Through public speaking curation as <span className="text-white font-medium">TEDxTCET Co-Curator</span> and orchestrating student technical challenges as <span className="text-white font-medium">CSI-TCET Coordinator</span>, I connect programmatic details with engaging, community-oriented solutions.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] mb-4">Academic Qualifications</h4>
                    
                    <div className="space-y-4 border-l border-[#C8B195]/20 pl-4 ml-1">
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-[#C8B195]" />
                        <h5 className="font-bold text-white text-xs uppercase tracking-wider">B.E. Computer Engineering</h5>
                        <p className="text-[11px] opacity-75">Thakur College of Engineering & Technology</p>
                        <p className="text-[11px] text-[#C8B195] font-semibold mt-0.5">CGPA: 10.0/10.0</p>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-[#8FA89B]" />
                        <h5 className="font-bold text-white text-xs uppercase tracking-wider">Science - HSC</h5>
                        <p className="text-[11px] opacity-75">Thakur Vidya Mandir Jr. College | May 2024</p>
                        <p className="text-[11px] text-[#8FA89B] font-semibold mt-0.5">Score: 82.33% | General Secretary</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-white/20" />
                        <h5 className="font-bold text-white text-xs uppercase tracking-wider">School - SSC</h5>
                        <p className="text-[11px] opacity-75">Thakur Vidya Mandir High School | May 2022</p>
                        <p className="text-[11px] text-[#FAF6EE]/50 mt-0.5">Score: 96%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Section (Redesigned as Tech Ecosystem Exchange) */}
        <section id="skills" className="px-6 py-32 z-10 relative overflow-hidden border-b border-white/5 finance-grid">
          
          {/* Faint candlestick chart lines in the background */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none select-none z-0" xmlns="http://www.w3.org/2000/svg">
            <line x1="15%" y1="10%" x2="15%" y2="90%" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="3 3" />
            <rect x="calc(15% - 6px)" y="30%" width="12" height="30%" fill="#8FA89B" opacity="0.6" />
            <line x1="15%" y1="20%" x2="15%" y2="30%" stroke="#FAF6EE" strokeWidth="1.5" />
            <line x1="15%" y1="60%" x2="15%" y2="75%" stroke="#FAF6EE" strokeWidth="1.5" />

            <line x1="38%" y1="5%" x2="38%" y2="95%" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="3 3" />
            <rect x="calc(38% - 6px)" y="20%" width="12" height="40%" fill="#C8B195" opacity="0.6" />
            <line x1="38%" y1="10%" x2="38%" y2="20%" stroke="#FAF6EE" strokeWidth="1.5" />
            <line x1="38%" y1="60%" x2="38%" y2="85%" stroke="#FAF6EE" strokeWidth="1.5" />

            <line x1="62%" y1="10%" x2="62%" y2="90%" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="3 3" />
            <rect x="calc(62% - 6px)" y="45%" width="12" height="30%" fill="#8FA89B" opacity="0.6" />
            <line x1="62%" y1="35%" x2="62%" y2="45%" stroke="#FAF6EE" strokeWidth="1.5" />
            <line x1="62%" y1="75%" x2="62%" y2="85%" stroke="#FAF6EE" strokeWidth="1.5" />

            <line x1="85%" y1="5%" x2="85%" y2="95%" stroke="#FAF6EE" strokeWidth="1" strokeDasharray="3 3" />
            <rect x="calc(85% - 6px)" y="25%" width="12" height="25%" fill="#C8B195" opacity="0.6" />
            <line x1="85%" y1="15%" x2="85%" y2="25%" stroke="#FAF6EE" strokeWidth="1.5" />
            <line x1="85%" y1="50%" x2="85%" y2="70%" stroke="#FAF6EE" strokeWidth="1.5" />
          </svg>

          {/* Floating Technology Logos in Background */}
          <motion.div 
            animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] left-[6%] text-[10rem] opacity-[0.02] text-[#C8B195] pointer-events-none select-none z-0 hidden lg:block"
          >
            <SiPython />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 22, 0], x: [0, -10, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[15%] right-[8%] text-[11rem] opacity-[0.02] text-[#8FA89B] pointer-events-none select-none z-0 hidden lg:block"
          >
            <SiDocker />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -25, 0], x: [0, -12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-[35%] right-[4%] text-[9rem] opacity-[0.015] text-[#FAF6EE] pointer-events-none select-none z-0 hidden lg:block"
          >
            <SiJavascript />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 16, 0], x: [0, 14, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
            className="absolute bottom-[10%] left-[10%] text-[10rem] opacity-[0.02] text-[#C8B195] pointer-events-none select-none z-0 hidden lg:block"
          >
            <SiTensorflow />
          </motion.div>

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Title Block */}
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] mb-2 block">02 / COMPETENCY</span>
              <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tighter text-[#FAF6EE]">
                TECH ECOSYSTEM
              </h2>
              <p className="text-xs text-[#FAF6EE]/60 uppercase tracking-widest font-bold mt-3">
                Technologies, Frameworks & Tools I Work With
              </p>
              <div className="w-12 h-[1px] bg-[#C8B195]/30 mx-auto mt-6" />
            </div>

            {/* Infinite Marquee Rows */}
            <div className="flex flex-col gap-6 py-6 border-y border-white/5 bg-[#121816]/20 backdrop-blur-sm rounded-3xl relative">
              
              {/* Overlay shadow borders to frame the exchange ticker */}
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#121816] to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#121816] to-transparent pointer-events-none z-10" />

              <MarqueeRow items={skillsRow1} direction="left" speed="28s" />
              <MarqueeRow items={skillsRow2} direction="right" speed="32s" />
              <MarqueeRow items={skillsRow3} direction="left" speed="26s" />
              <MarqueeRow items={skillsRow4} direction="right" speed="30s" />

            </div>

            {/* Footer exchange details */}
            <div className="flex justify-between items-center mt-8 px-6 text-[8px] sm:text-[9px] uppercase tracking-widest text-[#FAF6EE]/30 font-bold">
              <span>BOARD REF: AK-5x4</span>
              <span className="flex items-center gap-1.5 animate-pulse"><span className="w-1.5 h-1.5 rounded-full bg-[#8FA89B]" /> SYSTEM ONLINE • REALTIME RESPONSIVE</span>
              <span>MARKET FEED: active</span>
            </div>

          </div>
        </section>

        {/* Experience & Timeline */}
        <section id="experience" className="px-6 py-32 z-10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-4 sticky top-28">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] mb-2 block">03 / EXPERIENCE</span>
                <h2 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter text-[#FAF6EE]">
                  Timeline & <br />
                  <span className="text-[#8FA89B]">Credentials.</span>
                </h2>
                <div className="w-12 h-1 bg-[#C8B195] mt-4" />
                <p className="text-xs text-[#FAF6EE]/40 mt-6 leading-relaxed max-w-xs uppercase tracking-wider">
                  Academic projects, community leadership, and hackathon wins.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-12">
                
                <h3 className="text-base font-bold font-display uppercase tracking-widest text-[#C8B195] border-b border-white/5 pb-3 flex items-center gap-3">
                  <FaBriefcase className="text-xs text-[#8FA89B]" />
                  Leadership & Event Roles
                </h3>

                <div className="relative border-l border-white/10 pl-6 sm:pl-8 space-y-12 ml-1">
                  
                  <div className="relative">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#C8B195] border-4 border-[#121816] shadow-xl" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="text-base font-bold text-white uppercase tracking-wider">Co-Curator</h4>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold uppercase tracking-widest text-[#C8B195]">
                        July 2025 – Present
                      </span>
                    </div>
                    <h5 className="text-[#FAF6EE]/70 text-xs font-semibold uppercase tracking-wider mb-3">
                      TEDxTCET • Mumbai
                    </h5>
                    <ul className="list-disc list-outside ml-4 space-y-2 text-[#FAF6EE]/60 text-sm leading-relaxed">
                      <li>Curated and shortlisted speakers with impactful ideas aligned to TEDx themes, maintaining high content quality standards.</li>
                      <li>Collaborated on refining talk narratives and structuring presentations to enhance audience engagement and storytelling.</li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#8FA89B] border-4 border-[#121816] shadow-xl" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="text-base font-bold text-white uppercase tracking-wider">Event Coordinator</h4>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold uppercase tracking-widest text-[#8FA89B]">
                        July 2025 – Present
                      </span>
                    </div>
                    <h5 className="text-[#FAF6EE]/70 text-xs font-semibold uppercase tracking-wider mb-3">
                      CSI-TCET • Mumbai
                    </h5>
                    <ul className="list-disc list-outside ml-4 space-y-2 text-[#FAF6EE]/60 text-sm leading-relaxed">
                      <li>Successfully planned and executed technical and non-technical events for student members.</li>
                      <li>Contributed to ideation, promotion, and post-event follow-ups, ensuring high participation and engagement.</li>
                    </ul>
                  </div>

                </div>

                <h3 className="text-base font-bold font-display uppercase tracking-widest text-[#C8B195] border-b border-white/5 pt-10 pb-3 flex items-center gap-3">
                  <FaAward className="text-xs text-[#8FA89B]" />
                  Hackathons & Papers
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="glass-card rounded-3xl p-6 relative overflow-hidden group border border-white/5 hover:border-[#C8B195]/20 transition-all duration-300">
                    <span className="text-[9px] font-bold text-[#C8B195] uppercase tracking-widest bg-[#C8B195]/10 px-2.5 py-1 rounded-md">1st Place</span>
                    <h4 className="font-bold text-white mt-4 text-sm uppercase tracking-wide">Model Forge 2025</h4>
                    <p className="text-[10px] text-[#FAF6EE]/40 mb-2 uppercase tracking-widest font-medium">ML Hackathon</p>
                    <p className="text-xs text-[#FAF6EE]/60 leading-relaxed">
                      Presented <span className="text-white font-medium">IMPROVYU</span>, an AI model that conducts mock interviews to help users practice facial expressions, eye-contact, speech delivery, and questions.
                    </p>
                  </div>

                  <div className="glass-card rounded-3xl p-6 relative overflow-hidden group border border-white/5 hover:border-[#C8B195]/20 transition-all duration-300">
                    <span className="text-[9px] font-bold text-[#C8B195] uppercase tracking-widest bg-[#C8B195]/10 px-2.5 py-1 rounded-md">Winner</span>
                    <h4 className="font-bold text-white mt-4 text-sm uppercase tracking-wide">NEXUS AI Challenge</h4>
                    <p className="text-[10px] text-[#FAF6EE]/40 mb-2 uppercase tracking-widest font-medium">Ideathon 2025</p>
                    <p className="text-xs text-[#FAF6EE]/60 leading-relaxed">
                      Pitched <span className="text-white font-medium">Renewable Site Optimizer</span>, using OpenStreetMap APIs and geospatial AI to assess land suitability for wind/solar plants.
                    </p>
                  </div>

                  <div className="glass-card rounded-3xl p-6 relative overflow-hidden group border border-white/5 hover:border-[#C8B195]/20 transition-all duration-300">
                    <span className="text-[9px] font-bold text-[#C8B195] uppercase tracking-widest bg-[#C8B195]/10 px-2.5 py-1 rounded-md">Best Research Paper</span>
                    <h4 className="font-bold text-white mt-4 text-sm uppercase tracking-wide">MULTICON EWPCC 2025</h4>
                    <p className="text-[10px] text-[#FAF6EE]/40 mb-2 uppercase tracking-widest font-medium">Research Award</p>
                    <p className="text-xs text-[#FAF6EE]/60 leading-relaxed">
                      Recognized for mathematical analysis in paper: <span className="text-white italic">Exploring the Fibonacci–Golden Ratio Connection</span>, evaluating numerical patterns.
                    </p>
                  </div>

                  <div className="glass-card rounded-3xl p-6 relative overflow-hidden group border border-white/5 hover:border-[#C8B195]/20 transition-all duration-300">
                    <span className="text-[9px] font-bold text-[#8FA89B] uppercase tracking-widest bg-[#8FA89B]/10 px-2.5 py-1 rounded-md">IIT Bombay</span>
                    <h4 className="font-bold text-white mt-4 text-sm uppercase tracking-wide">Java Programming</h4>
                    <p className="text-[10px] text-[#FAF6EE]/40 mb-2 uppercase tracking-widest font-medium">FOSSEE Certification</p>
                    <p className="text-xs text-[#FAF6EE]/60 leading-relaxed">
                      Completed OOP, logic, and data structure structures. Certified with a score of <span className="text-white font-semibold">92.50%</span>.
                    </p>
                  </div>

                  <div className="glass-card rounded-3xl p-6 relative overflow-hidden group border border-white/5 hover:border-[#C8B195]/20 transition-all duration-300 col-span-1 md:col-span-2">
                    <span className="text-[9px] font-bold text-[#8FA89B] uppercase tracking-widest bg-[#8FA89B]/10 px-2.5 py-1 rounded-md">MongoDB Academy</span>
                    <h4 className="font-bold text-white mt-4 text-sm uppercase tracking-wide">Developer Certifications</h4>
                    <p className="text-[10px] text-[#FAF6EE]/40 mb-2 uppercase tracking-widest font-medium">Database Credentials</p>
                    <p className="text-xs text-[#FAF6EE]/60 leading-relaxed">
                      Completed professional certifications covering MongoDB Transactions, CRUD operations (Insert, Find, Replace, Delete), and Database Connectivity protocols, validating database skills.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Projects Vertical Scroll Section */}
        <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10 overflow-hidden">
          
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] mb-2 block">04 / WORKS</span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter text-[#FAF6EE]">
                Featured Projects
              </h2>
              <div className="w-12 h-1 bg-[#C8B195] mt-4" />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[#FAF6EE]/40 mt-4 md:mt-0 flex items-center gap-2">
              SCROLL TO EXPLORE WORKS <span className="animate-bounce">↓</span>
            </div>
          </div>

          <div className="flex flex-col gap-32 md:gap-48">
            {projectsData.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center w-full min-h-[50vh]`}
                >
                  {/* Info Panel Container */}
                  <motion.div 
                    className="w-full lg:w-1/2 flex flex-col justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-15%" }}
                    variants={{
                      hidden: { x: isEven ? -60 : 60, opacity: 0 },
                      visible: { 
                        x: 0, 
                        opacity: 1, 
                        transition: { 
                          duration: 0.8, 
                          ease: [0.16, 1, 0.3, 1],
                          staggerChildren: 0.1,
                          delayChildren: 0.1
                        } 
                      }
                    }}
                  >
                    {/* Award / Category Badge */}
                    <motion.div 
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                      className="mb-4"
                    >
                      <span className="text-[8px] sm:text-[9px] font-bold text-[#C8B195] uppercase tracking-widest bg-[#C8B195]/10 px-3 py-1 rounded border border-[#C8B195]/20 inline-block">
                        {project.award}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                      className="text-2xl sm:text-3xl font-bold font-display text-white uppercase mb-4 leading-tight tracking-tight hover:text-[#C8B195] transition-colors duration-300"
                    >
                      {project.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p 
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                      className="text-sm sm:text-base text-[#FAF6EE]/70 leading-relaxed font-light mb-6"
                    >
                      {project.description}
                    </motion.p>

                    {/* Live Demo & GitHub Buttons directly below description */}
                    <motion.div 
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                      className="flex flex-wrap gap-4 mb-8"
                    >
                      <a 
                        href={project.liveLink}
                        onClick={(e) => handleRedirect(e, "demo", project.liveLink)}
                        className="bg-[#C8B195] hover:bg-[#b09b82] text-[#121816] font-bold uppercase tracking-widest text-[9px] sm:text-[10px] px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-[#C8B195]/10"
                        data-cursor-text="VISIT DEMO"
                      >
                        <span>Live Demo</span>
                        <FaExternalLinkAlt className="text-[8px] sm:text-[9px]" />
                      </a>
                      <a 
                        href={project.githubLink}
                        onClick={(e) => handleRedirect(e, "github", project.githubLink)}
                        className="border border-white/10 hover:border-white/30 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-[1.03] shadow-lg"
                        data-cursor-text="VIEW REPO"
                      >
                        <FaGithub className="text-[12px] sm:text-[13px]" />
                        <span>GitHub</span>
                      </a>
                    </motion.div>

                    {/* Tags */}
                    <motion.div 
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                      className="flex flex-wrap gap-2 pt-6 border-t border-white/5"
                    >
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 rounded bg-white/5 text-[9px] sm:text-[10px] font-medium text-[#FAF6EE]/50 border border-white/5 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Image Mockup Container */}
                  <motion.div 
                    className="w-full lg:w-1/2 flex justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-15%" }}
                    variants={{
                      hidden: {
                        clipPath: isEven ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
                        scale: 1.05,
                        opacity: 0
                      },
                      visible: {
                        clipPath: "inset(0% 0% 0% 0%)",
                        scale: 1,
                        opacity: 1,
                        transition: {
                          duration: 0.9,
                          ease: [0.16, 1, 0.3, 1],
                          scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
                        }
                      }
                    }}
                  >
                    {/* Sleek Browser-Frame Mockup */}
                    <div 
                      className="w-full max-w-xl bg-[#17201d] rounded-2xl p-2.5 sm:p-3.5 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] hover:border-[#C8B195]/20 transition-colors duration-500 group"
                      data-cursor-text="PREVIEW SITE"
                    >
                      {/* Browser Top Bar */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 px-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#ff5f56] block opacity-60 group-hover:opacity-100 transition-opacity" />
                          <span className="w-2 h-2 rounded-full bg-[#ffbd2e] block opacity-60 group-hover:opacity-100 transition-opacity" />
                          <span className="w-2 h-2 rounded-full bg-[#27c93f] block opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="bg-black/30 border border-white/5 rounded px-4 py-0.5 text-[8px] font-mono text-white/30 tracking-wider truncate max-w-[150px] sm:max-w-[200px]">
                          {project.title.toLowerCase().replace(/\s+/g, '-')}.demo
                        </div>
                        <div className="w-10" />
                      </div>

                      {/* Website Screenshot Preview (Interactive Comparison Slider) */}
                      <ProjectImageSlider 
                        image1={project.image1} 
                        image2={project.image2} 
                        title={project.title} 
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="px-6 py-32 z-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] mb-2 block">05 / FEEDBACK</span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter text-[#FAF6EE]">
                Peer Endorsements
              </h2>
              <div className="w-12 h-1 bg-[#C8B195] mx-auto mt-4" />
            </div>

            <div className="w-full flex justify-center" data-cursor-text="DRAG REVIEW">
              <CircularTestimonials
                testimonials={testimonials}
                autoplay={true}
                colors={{
                  name: "#FAF6EE",
                  designation: "#C8B195",
                  testimony: "#FAF6EE/90",
                  arrowBackground: "#1a2220",
                  arrowForeground: "#C8B195",
                  arrowHoverBackground: "#C8B195",
                }}
                fontSizes={{
                  name: "22px",
                  designation: "13px",
                  quote: "16px",
                }}
              />
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-6 py-32 z-10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] mb-2 block">06 / CONNECT</span>
                  <h2 className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-tighter text-[#FAF6EE] leading-none mb-6">
                    Let&apos;s Create <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8B195] to-[#8FA89B]">Impact.</span>
                  </h2>
                  <p className="text-sm text-[#FAF6EE]/70 max-w-md leading-relaxed font-light mb-12">
                    Open for development and machine learning integration roles. Reach out and let&apos;s build together.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#1a2220] border border-white/5 flex items-center justify-center text-sm text-[#C8B195]">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold">Write me</p>
                      <a href="mailto:ananya.kalia@email.com" className="text-sm font-bold text-white hover:text-[#C8B195] transition-colors">
                        ananya.kalia@email.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#1a2220] border border-white/5 flex items-center justify-center text-sm text-[#8FA89B]">
                      <FaLinkedin />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold">Connect</p>
                      <a href="https://www.linkedin.com/in/ananya-kalia-9609b3333?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-[#C8B195] transition-colors">
                        linkedin.com/in/ananya-kalia-9609b3333
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#1a2220] border border-white/5 flex items-center justify-center text-sm text-[#C8B195]">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#FAF6EE]/40 uppercase tracking-widest font-bold">Base</p>
                      <p className="text-sm font-bold text-white uppercase tracking-wider">Mumbai, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form 
                  onSubmit={(e) => e.preventDefault()}
                  className="glass-card rounded-3xl p-8 sm:p-10 space-y-6 border border-white/5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[9px] font-bold uppercase tracking-widest text-[#FAF6EE]/60">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="John Doe" 
                        className="w-full bg-[#1a2220]/40 border border-white/5 rounded-2xl px-4 py-4 text-xs text-white focus:outline-none focus:border-[#C8B195] focus:ring-1 focus:ring-[#C8B195] transition-colors"
                        data-cursor-text="TYPE NAME"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[9px] font-bold uppercase tracking-widest text-[#FAF6EE]/60">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-[#1a2220]/40 border border-white/5 rounded-2xl px-4 py-4 text-xs text-white focus:outline-none focus:border-[#C8B195] focus:ring-1 focus:ring-[#C8B195] transition-colors"
                        data-cursor-text="TYPE EMAIL"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[9px] font-bold uppercase tracking-widest text-[#FAF6EE]/60">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder="Collaboration opportunity" 
                      className="w-full bg-[#1a2220]/40 border border-white/5 rounded-2xl px-4 py-4 text-xs text-white focus:outline-none focus:border-[#C8B195] focus:ring-1 focus:ring-[#C8B195] transition-colors"
                      data-cursor-text="TYPE SUBJECT"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[9px] font-bold uppercase tracking-widest text-[#FAF6EE]/60">Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      placeholder="Discuss details..." 
                      className="w-full bg-[#1a2220]/40 border border-white/5 rounded-2xl px-4 py-4 text-xs text-white focus:outline-none focus:border-[#C8B195] focus:ring-1 focus:ring-[#C8B195] transition-colors resize-none"
                      data-cursor-text="WRITE MESSAGE"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-2xl bg-[#C8B195] text-[#121816] hover:bg-[#FAF6EE] text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-xl border border-white/5 cursor-pointer animate-pulse"
                    data-cursor-text="SEND"
                  >
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

        </main>

        {/* Footer */}
        <footer className="mt-auto pt-20 pb-12 bg-[#1a2220]/30 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/5">
              
              {/* Brand Col */}
              <div className="md:col-span-2 space-y-4 text-left">
                <a href="#" className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 rounded-full border border-[#C8B195]/20 overflow-hidden p-0.5 bg-[#121816]">
                    <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="font-display text-sm font-bold tracking-widest text-[#C8B195] uppercase">
                    Ananya<span className="text-[#8FA89B]">.</span>
                  </span>
                </a>
                <p className="text-xs text-[#FAF6EE]/50 max-w-sm leading-relaxed font-light font-sans">
                  A curated creative space demonstrating analytical engineering structures, machine learning platforms, and high-fidelity interface logic.
                </p>
              </div>

              {/* Sitemap Links Col */}
              <div className="space-y-4 text-left">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195]">Navigation</h4>
                <ul className="space-y-2 text-[10px] uppercase font-bold tracking-wider text-[#FAF6EE]/50">
                  <li><a href="#about" className="hover:text-[#C8B195] transition-colors">About</a></li>
                  <li><a href="#skills" className="hover:text-[#C8B195] transition-colors">Skills</a></li>
                  <li><a href="#experience" className="hover:text-[#C8B195] transition-colors">Experience</a></li>
                  <li><a href="#projects" className="hover:text-[#C8B195] transition-colors">Projects</a></li>
                </ul>
              </div>

              {/* Socials & Profiles Col */}
              <div className="space-y-4 text-left">
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195]">Profiles</h4>
                <ul className="space-y-2 text-[10px] uppercase font-bold tracking-wider text-[#FAF6EE]/50">
                  <li>
                    <a 
                      href="https://github.com/ananyakalia14" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="hover:text-[#C8B195] transition-colors flex items-center gap-1.5"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.linkedin.com/in/ananya-kalia-9609b3333?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="hover:text-[#C8B195] transition-colors flex items-center gap-1.5"
                    >
                      <FaLinkedin /> LinkedIn
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Credits */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
              <p className="text-[9px] text-[#FAF6EE]/30 uppercase tracking-widest text-center sm:text-left">
                &copy; {new Date().getFullYear()} Ananya Kalia. All rights reserved.
              </p>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] hover:text-[#FAF6EE] flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent border-none outline-none"
                data-cursor-text="GO TO TOP"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </footer>

      </motion.div>

      {/* Fullscreen Redirect Transition Overlay */}
      <AnimatePresence>
        {fullscreenLoading?.active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#121816]/95 backdrop-blur-lg select-none"
          >
            {/* Pulsing circular container with the logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#C8B195]/30 p-1 bg-[#121816] shadow-2xl mb-8 flex items-center justify-center"
            >
              {/* Spinning/Pulsing glow ring around the logo */}
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#C8B195] animate-spin" style={{ animationDuration: '3s' }} />
              
              <img 
                src="/logo.jpg" 
                alt="AK Logo" 
                className="w-full h-full object-cover rounded-full" 
              />
            </motion.div>

            {/* Transition Message */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.2, duration: 0.4 }
              }}
              className="flex flex-col items-center gap-2"
            >
              <p className="font-display text-sm font-bold uppercase tracking-widest text-[#C8B195]">
                {fullscreenLoading.message}
              </p>
              <span className="text-[10px] text-[#FAF6EE]/40 uppercase tracking-wider font-sans">
                Please wait a moment
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
