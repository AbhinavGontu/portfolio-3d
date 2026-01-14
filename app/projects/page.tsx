"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { HeroObject } from "@/components/3d/HeroObject";
import { ParticleSystem } from "@/components/3d/ParticleSystem";
import { FloatingElements } from "@/components/3d/FloatingElements";
import projects from "@/lib/data/projects.json";

const Scene = dynamic(() => import("@/components/3d/Scene").then((mod) => ({ default: mod.Scene })), {
    ssr: false,
});

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

export default function ProjectsPage() {
    return (
        <main className="relative min-h-screen">
            {/* 3D Background Scene */}
            <Scene>
                <HeroObject />
                <ParticleSystem />
                <FloatingElements />
            </Scene>

            {/* Projects Section */}
            <section className="relative z-10 py-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Back to Home Link - Left aligned */}
                        <div className="mb-8">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary-400 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>

                        <motion.h1
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            <span className="gradient-text">Featured Projects</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            className="text-lg text-foreground/70 mb-16 max-w-2xl"
                        >
                            A collection of projects showcasing scalable architecture, distributed systems, and modern web development.
                        </motion.p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <ProjectCard
                                        title={project.title}
                                        description={project.description}
                                        tags={project.tags}
                                        image={project.image}
                                        link={project.link}
                                        github={project.github}
                                        metrics={project.metrics as unknown as { [key: string]: string }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
