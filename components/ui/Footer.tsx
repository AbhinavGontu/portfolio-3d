"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/utils/constants";

/**
 * Site footer with links and copyright information.
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 mt-20">
            <div className="container mx-auto px-6">
                <div className="glass-effect rounded-2xl p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Brand */}
                        <div>
                            <h3 className="text-2xl font-bold gradient-text mb-4">
                                {SITE_CONFIG.name}
                            </h3>
                            <p className="text-foreground/70 mb-4">{SITE_CONFIG.title}</p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href={SITE_CONFIG.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground/70 hover:text-primary-400 transition-colors"
                                    >
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={SITE_CONFIG.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground/70 hover:text-primary-400 transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`mailto:${SITE_CONFIG.email}`}
                                        className="text-foreground/70 hover:text-primary-400 transition-colors"
                                    >
                                        Email
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-semibold mb-4">Built With</h4>
                            <p className="text-foreground/70 text-sm">
                                Next.js · React · Three.js · Framer Motion · Tailwind CSS
                            </p>
                            <p className="text-foreground/50 text-sm mt-2">
                                Deployed on Vercel Edge Network
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-foreground/10 mt-8 pt-8 text-center text-foreground/50 text-sm">
                        © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
