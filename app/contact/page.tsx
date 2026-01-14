"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { HeroObject } from "@/components/3d/HeroObject";
import { ParticleSystem } from "@/components/3d/ParticleSystem";
import { FloatingElements } from "@/components/3d/FloatingElements";

const Scene = dynamic(() => import("@/components/3d/Scene").then((mod) => ({ default: mod.Scene })), {
    ssr: false,
});

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

export default function ContactPage() {
    return (
        <main className="relative min-h-screen">
            {/* 3D Background Scene */}
            <Scene>
                <HeroObject />
                <ParticleSystem />
                <FloatingElements />
            </Scene>

            {/* Contact Section */}
            <section className="relative z-10 py-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto"
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

                        <div className="text-center">
                            <motion.h1
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                className="text-4xl md:text-6xl font-bold mb-6"
                            >
                                <span className="gradient-text">Let's Connect</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                className="text-lg text-foreground/70 mb-12"
                            >
                                I'm always interested in hearing about new opportunities and projects.
                                Feel free to reach out through any of the channels below!
                            </motion.p>

                            <motion.div
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                className="flex flex-col gap-4 max-w-md mx-auto"
                            >
                                <a
                                    href="mailto:abhinavgontu@gmail.com"
                                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-full text-white font-semibold transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Email Me</span>
                                </a>

                                <a
                                    href="https://linkedin.com/in/abhinavgontu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 glass-effect hover:bg-white/10 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    <span>LinkedIn</span>
                                </a>

                                <a
                                    href="https://github.com/abhinavgontu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 glass-effect hover:bg-white/10 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                className="pt-8 border-t border-white/10 mt-12"
                            >
                                <p className="text-foreground/50 text-sm">
                                    Available for full-time opportunities and freelance projects
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
