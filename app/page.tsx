/**
 * Homepage Component - Main Portfolio Landing Page
 * 
 * This file orchestrates the entire portfolio experience, combining:
 * - 3D graphics (Three.js via React Three Fiber)
 * - Smooth animations (Framer Motion)
 * - Dynamic content (JSON data sources)
 * - Responsive design (Tailwind utility classes)
 * 
 * Marked as "use client" because it contains interactive elements and
 * client-side state management (animations, 3D rendering).
 */
"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Timeline } from "@/components/ui/Timeline";
import { HeroObject } from "@/components/3d/HeroObject";
import { ParticleSystem } from "@/components/3d/ParticleSystem";
import { FloatingElements } from "@/components/3d/FloatingElements";
import { OnePieceElements } from "@/components/3d/OnePieceElements";
import projects from "@/lib/data/projects.json";
import experience from "@/lib/data/experience.json";

/**
 * Dynamic import strategy for 3D Scene component
 * 
 * Why we disable SSR (ssr: false):
 * - Three.js requires browser APIs (WebGL, canvas) that don't exist in Node.js
 * - Attempting to render 3D content server-side would crash the build process
 * - The Scene component uses window, document, and navigator APIs
 * 
 * Performance impact:
 * - Scene code (~60KB) is only downloaded when needed, not in initial bundle
 * - This keeps the initial JavaScript bundle small for faster First Contentful Paint
 * - Users on slow connections get text content quickly, 3D scene loads progressively
 * 
 * The .then() transform extracts the named export 'Scene' and makes it the
 * default export for this dynamic import, maintaining clean import syntax.
 */
const Scene = dynamic(() => import("@/components/3d/Scene").then((mod) => ({ default: mod.Scene })), {
  ssr: false,
});

/**
 * Animation variant configuration for fade-in-up effect
 * 
 * This reusable animation pattern is applied to multiple elements throughout
 * the page for consistent motion design.
 * 
 * initial: Starting state (invisible, 60px below final position)
 * - opacity: 0 makes element invisible
 * - y: 60 moves element down by 60 pixels
 * 
 * animate: End state (fully visible, at natural position)
 * - opacity: 1 makes element fully visible
 * - y: 0 returns element to its natural position
 * 
 * transition: How the animation progresses
 * - duration: 0.6 seconds (600ms) for smooth but snappy motion
 * - ease: Custom cubic-bezier curve [0.6, -0.05, 0.01, 0.99]
 *   This creates a "snap" effect - starts fast, slight bounce, settles smoothly
 *   The negative value creates anticipation, making animation feel more natural
 * 
 * This animation pattern is derived from Google's Material Design motion guidelines
 * and Apple's Human Interface Guidelines for satisfying, predictable animations.
 */
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

export default function Home() {
  return (
    <main className="relative">
      {/* 3D Background Scene */}
      <Scene>
        <HeroObject />
        <ParticleSystem />
        <FloatingElements />
        <OnePieceElements />
      </Scene>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm <span className="gradient-text">Abhinav Gontu</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto"
            >
              Building high-scale distributed platforms with React, Next.js, TypeScript, and cloud architecture.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 justify-center">
              <Link
                href="/projects"
                className="min-w-[200px] px-12 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors shadow-lg hover:shadow-xl text-center"
                style={{ borderRadius: '16px' }}
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="min-w-[200px] px-12 py-4 glass-effect hover:bg-white/10 font-semibold transition-all shadow-lg hover:shadow-xl text-center"
                style={{ borderRadius: '16px' }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
