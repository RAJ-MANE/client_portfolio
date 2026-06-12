"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CurtainLoader({ onComplete }: { onComplete: () => void }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [phase, setPhase] = useState<"initial" | "glow" | "split" | "done">("initial");

  useEffect(() => {
    // Stage 1: Reveal logo with soft glow (800ms)
    const t1 = setTimeout(() => {
      setPhase("glow");
    }, 800);

    // Stage 2: Curtains slide, logo zooms & dissolves (2400ms)
    const t2 = setTimeout(() => {
      setPhase("split");
    }, 2400);

    // Stage 3: Animation complete (3800ms)
    const t3 = setTimeout(() => {
      setPhase("done");
      setIsAnimating(false);
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (!isAnimating) return null;

  // Curtain Panel Variants (Split horizontally)
  const leftCurtainVariants = {
    initial: { x: "0%" },
    glow: { x: "0%" },
    split: { 
      x: "-100%",
      transition: { duration: 1.4, ease: [0.86, 0, 0.07, 1] as const } 
    }
  };

  const rightCurtainVariants = {
    initial: { x: "0%" },
    glow: { x: "0%" },
    split: { 
      x: "100%",
      transition: { duration: 1.4, ease: [0.86, 0, 0.07, 1] as const } 
    }
  };

  // Seam glowing light line (centered)
  const lineVariants = {
    initial: { scaleY: 0, opacity: 0 },
    glow: { 
      scaleY: 1, 
      opacity: 0.8, 
      boxShadow: "0 0 40px #C8B195, 0 0 80px #8FA89B",
      transition: { duration: 1.0, ease: "easeInOut" as const } 
    },
    split: { 
      opacity: 0, 
      scaleY: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const } 
    }
  };

  // Whole Monogram Logo Animation (Uncut, Zooms through center)
  const logoVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.85, 
      rotate: -10,
      boxShadow: "0 0 0px rgba(200, 177, 149, 0)" 
    },
    glow: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      boxShadow: "0 0 40px rgba(200, 177, 149, 0.25)",
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] as const } 
    },
    split: { 
      opacity: 0,
      scale: 1.5,
      rotate: 15,
      transition: { duration: 1.2, ease: [0.86, 0, 0.07, 1] as const } 
    }
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-50 overflow-hidden flex pointer-events-auto select-none bg-[#121816]">
          
          {/* Left Curtain Panel */}
          <motion.div
            variants={leftCurtainVariants}
            initial="initial"
            animate={phase}
            className="w-1/2 h-full relative overflow-hidden"
            style={{
              background: "linear-gradient(to right, #090c0b 0%, #17201d 85%, #121816 100%)",
            }}
          >
            {/* Fine vertical fold lines for texture */}
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
          </motion.div>

          {/* Glowing Split Light Seam */}
          <motion.div
            variants={lineVariants}
            initial="initial"
            animate={phase}
            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#C8B195] z-50 origin-center -translate-x-1/2 pointer-events-none"
          />

          {/* Whole Central Logo (Renders above both curtains, does not cut) */}
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate={phase}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-[#C8B195]/40 overflow-hidden flex items-center justify-center p-2 bg-[#121816] shadow-2xl relative"
            >
              {/* Outer rotating accent ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#C8B195]/20 animate-[spin_20s_linear_infinite]" />
              
              <img 
                src="/logo.jpg" 
                alt="AK Monogram Logo" 
                className="w-full h-full object-cover rounded-full pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Right Curtain Panel */}
          <motion.div
            variants={rightCurtainVariants}
            initial="initial"
            animate={phase}
            className="w-1/2 h-full relative overflow-hidden"
            style={{
              background: "linear-gradient(to left, #090c0b 0%, #17201d 85%, #121816 100%)",
            }}
          >
            {/* Fine vertical fold lines for texture */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
          </motion.div>
          
        </div>
      )}
    </AnimatePresence>
  );
}
