"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==================== Data ====================

interface Milestone {
  title: string;
  org: string;
  location: string;
  date: string;
  logo: string;
  accentColor: string;
  description: string;
  isActive?: boolean;
}

const milestones: Milestone[] = [
  {
    title: "General Secretary",
    org: "Thakur Vidya Mandir",
    location: "Mumbai",
    date: "July 2022 – May 2024",
    logo: "/TVM.svg",
    accentColor: "#8FA89B",
    description:
      "Led administrative operations and coordinated student council activities across departments, fostering community engagement and academic excellence.",
  },
  {
    title: "Speaker Correspondence & Curation",
    org: "TEDxTCET",
    location: "Mumbai",
    date: "July 2025 – Feb 2026",
    logo: "/TEDX.svg",
    accentColor: "#C8B195",
    description:
      "Managed speaker outreach and correspondence, screening proposals and aligning narratives with TEDx themes to ensure high-impact talk selections.",
  },
  {
    title: "Event Coordinator",
    org: "CSI-TCET",
    location: "Mumbai",
    date: "June 2025 – June 2026",
    logo: "/TCET CSI.svg",
    accentColor: "#8FA89B",
    description:
      "Successfully planned and executed technical and non-technical events for student members. Contributed to ideation, promotion, and post-event follow-ups.",
  },
  {
    title: "Co-Curator",
    org: "TEDxTCET",
    location: "Mumbai",
    date: "Feb 2026 – Present",
    logo: "/TEDX.svg",
    accentColor: "#C8B195",
    isActive: true,
    description:
      "Curated and shortlisted speakers with impactful ideas aligned to TEDx themes, maintaining high content quality standards and refining talk narratives.",
  },
];

// ==================== SVG Path ====================
// Hand-drawn squiggly S-curve.
// The path passes through center (X=100) at Y = 125, 375, 625, 875
// and weaves left/right between milestones.
const SQUIGGLY_PATH = [
  "M 100,0",
  "C 100,40 100,90 100,125",
  "C 100,160 132,210 145,265",
  "C 158,320 112,365 100,375",
  "C 88,385 58,435 46,500",
  "C 34,565 88,618 100,625",
  "C 112,632 148,695 152,748",
  "C 156,800 112,860 100,875",
  "C 88,890 100,955 100,1000",
].join(" ");

// ==================== Component ====================

export default function SquigglyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ========== Desktop (≥ 768px) ==========
      mm.add("(min-width: 768px)", () => {
        const path = pathRef.current;
        const glowPath = glowPathRef.current;

        if (path) {
          const len = path.getTotalLength();

          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          if (glowPath) {
            gsap.set(glowPath, { strokeDasharray: len, strokeDashoffset: len });
          }

          // Scrub-draw path on scroll
          const targets = [path, glowPath].filter(Boolean);
          gsap.to(targets, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 1.5,
            },
          });
        }

        // Cards slide in from alternating sides
        cardRefs.current.forEach((ref, i) => {
          if (!ref) return;
          const isEven = i % 2 === 0;
          gsap.set(ref, { opacity: 0, x: isEven ? -60 : 60 });
          gsap.to(ref, {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Logos pop in
        logoRefs.current.forEach((ref) => {
          if (!ref) return;
          gsap.set(ref, { scale: 0.6, opacity: 0 });
          gsap.to(ref, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: ref,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Dots pop in
        dotRefs.current.forEach((ref) => {
          if (!ref) return;
          gsap.set(ref, { scale: 0, opacity: 0 });
          gsap.to(ref, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: ref,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      // ========== Mobile (< 768px) ==========
      mm.add("(max-width: 767px)", () => {
        // Draw mobile line via scaleY
        if (mobileLineRef.current) {
          gsap.set(mobileLineRef.current, { scaleY: 0, transformOrigin: "top" });
          gsap.to(mobileLineRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 30%",
              scrub: 1.5,
            },
          });
        }

        // Cards slide up
        cardRefs.current.forEach((ref) => {
          if (!ref) return;
          gsap.set(ref, { opacity: 0, y: 30 });
          gsap.to(ref, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Dots pop in
        dotRefs.current.forEach((ref) => {
          if (!ref) return;
          gsap.set(ref, { scale: 0, opacity: 0 });
          gsap.to(ref, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: ref,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper function to render card to keep layout code DRY
  const renderCard = (m: Milestone, isEven: boolean, cardRef?: React.Ref<HTMLDivElement>) => (
    <div
      ref={cardRef}
      className={`
        group relative max-w-lg w-full md:h-full
        bg-[#1a2220]/50 backdrop-blur-md
        rounded-3xl p-6 md:p-8
        border border-white/[0.04] hover:border-[#C8B195]/15
        transition-all duration-500
        hover:bg-[#1a2220]/70
        hover:shadow-xl hover:shadow-black/10
        flex flex-col justify-center
      `}
    >
      <div className="flex flex-col gap-4 items-start w-full">
        {/* Mobile Logo inside card */}
        <div className="flex-shrink-0 md:hidden">
          <div className="w-16 h-16 rounded-2xl bg-white/95 p-3 flex items-center justify-center overflow-hidden shadow-lg shadow-black/20">
            <img src={m.logo} alt={`${m.org} logo`} className="w-full h-full object-contain" />
          </div>
        </div>
        {/* Text Content */}
        <div
          className={`flex-1 flex flex-col items-start text-left w-full ${
            isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"
          }`}
        >
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] md:text-xs font-semibold uppercase tracking-wider mb-2.5"
            style={{
              backgroundColor: `${m.accentColor}15`,
              color: m.accentColor,
            }}
          >
            {m.date}
          </span>
          <h4 className="text-base md:text-lg lg:text-xl font-bold font-display text-white uppercase tracking-wider mb-1.5 group-hover:text-[#C8B195] transition-colors duration-300">
            {m.title}
          </h4>
          <p className="text-[10px] md:text-xs text-[#FAF6EE]/50 uppercase tracking-widest font-semibold mb-3">
            {m.org} • {m.location}
          </p>
          <p className="text-xs md:text-sm text-[#FAF6EE]/60 leading-relaxed font-sans">
            {m.description}
          </p>
          {m.isActive && (
            <div className={`mt-3 flex ${isEven ? "md:justify-end" : "md:justify-start"}`}>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8FA89B]/10 text-[8px] font-bold uppercase tracking-widest text-[#8FA89B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA89B] animate-pulse" />
                Current Role
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Helper function to render logo desktop to keep layout code DRY
  const renderLogoDesktop = (m: Milestone, idx: number, logoRef?: React.Ref<HTMLDivElement>) => (
    <div
      ref={logoRef}
      className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/95 p-3.5 flex items-center justify-center overflow-hidden shadow-lg shadow-black/25 hover:shadow-[0_0_35px_rgba(200,177,149,0.25)] hover:scale-110 hover:rotate-3 transition-all duration-500 border border-white/5 animate-float-slow cursor-pointer"
      style={{
        animationDelay: `${idx * 0.4}s`,
      }}
    >
      <img src={m.logo} alt={`${m.org} logo`} className="w-full h-full object-contain" />
    </div>
  );

  return (
    <div ref={containerRef}>
      {/* ───── Section Header ───── */}
      <div className="flex flex-col items-center text-center w-full mb-16 md:mb-20">
        <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8B195] mb-2 block">
          03 / EXPERIENCE
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter text-[#FAF6EE] text-center">
          Timeline &amp; <span className="text-[#8FA89B]">Credentials.</span>
        </h2>
        <div className="w-12 h-1 bg-[#C8B195] mt-4 mx-auto" />
        <p className="text-xs text-[#FAF6EE]/40 mt-6 leading-relaxed max-w-md uppercase tracking-wider mx-auto">
          Community leadership, event curation, and technical coordination.
        </p>
      </div>

      {/* ───── Timeline Container ───── */}
      <div ref={timelineRef} className="relative max-w-5xl mx-auto">
        {/* Desktop SVG squiggly path (centered, constrained width) */}
        <svg
          className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-full pointer-events-none z-0"
          viewBox="0 0 200 1000"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {/* Glow layer */}
          <path
            ref={glowPathRef}
            d={SQUIGGLY_PATH}
            stroke="#C8B195"
            strokeWidth="8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.12"
            fill="none"
          />
          {/* Main stroke */}
          <path
            ref={pathRef}
            d={SQUIGGLY_PATH}
            stroke="#C8B195"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>

        {/* Mobile vertical line */}
        <div
          ref={mobileLineRef}
          className="md:hidden absolute left-[31px] top-0 bottom-0 w-[2px] z-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(200,177,149,0.35) 10%, rgba(200,177,149,0.35) 90%, transparent 100%)",
          }}
        />

        {/* ───── Milestone Rows (Grid alignment on desktop for perfect vertical dot centering) ───── */}
        <div className="relative z-10 flex flex-col md:grid md:grid-rows-4 md:h-[1040px]">
          {milestones.map((m, i) => {
            const isEven = i % 2 === 0;

            return (
              <div
                key={i}
                className="flex items-center py-5 md:py-0 md:h-[260px] md:flex-row"
              >
                {/* ── Left Column ── */}
                <div
                  className={`
                    flex-1 md:flex-initial md:w-[calc(50%-32px)] md:h-full
                    order-2 md:order-1
                    pl-2 md:pl-0 flex md:justify-end justify-start md:items-center
                  `}
                >
                  {isEven ? (
                    <>
                      {/* Desktop Logo (Left side) - Hidden on mobile, visible on desktop */}
                      <div className="hidden md:flex w-full md:justify-end md:items-center">
                        {renderLogoDesktop(m, i, (el) => { logoRefs.current[i] = el; })}
                      </div>

                      {/* Mobile Card - Visible on mobile, hidden on desktop */}
                      <div className="flex md:hidden w-full">
                        {renderCard(m, isEven, (el) => { cardRefs.current[i] = el; })}
                      </div>
                    </>
                  ) : (
                    /* Odd Card - Always visible (on Left for desktop) */
                    renderCard(m, isEven, (el) => { cardRefs.current[i] = el; })
                  )}
                </div>

                {/* ── Dot ── */}
                <div className="flex-shrink-0 w-16 flex justify-center order-first md:order-2 z-10">
                  <div
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white/10 flex items-center justify-center bg-[#121816] relative shadow-lg shadow-black/50"
                  >
                    <div
                      className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                      style={{
                        backgroundColor: m.accentColor,
                        boxShadow: `0 0 12px ${m.accentColor}, 0 0 24px ${m.accentColor}60`,
                      }}
                    />
                    {m.isActive && (
                      <span
                        className="absolute -inset-1.5 rounded-full animate-ping"
                        style={{
                          backgroundColor: m.accentColor,
                          opacity: 0.25,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* ── Right Column (Desktop only) ── */}
                <div
                  className="hidden md:flex md:w-[calc(50%-32px)] md:h-full md:order-3 justify-start md:items-center"
                >
                  {isEven ? (
                    /* Even Card - Desktop only (on Right) */
                    renderCard(m, isEven, (el) => { cardRefs.current[i] = el; })
                  ) : (
                    /* Desktop Logo (Right side) - Desktop only */
                    renderLogoDesktop(m, i, (el) => { logoRefs.current[i] = el; })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
