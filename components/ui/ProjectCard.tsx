"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    github: string;
    metrics?: {
        [key: string]: string;
    };
}

/**
 * Animated project card with hover effects and performance metrics.
 */
export function ProjectCard({ title, description, tags, image, link, github, metrics }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10 }}
            className="glass-effect rounded-2xl overflow-hidden group cursor-pointer"
        >
            {/* Project Image */}
            <div className="relative h-48 bg-gradient-to-br from-primary-500 to-accent-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center text-white/60 text-6xl font-bold">
                    {title[0]}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2">{description}</p>

                {/* Metrics */}
                {metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {Object.entries(metrics).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="text-sm">
                                <div className="text-foreground/50 capitalize">{key}</div>
                                <div className="font-semibold text-primary-400">{value}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                    <a
                        href={link}
                        className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        View Project →
                    </a>
                    <a
                        href={github}
                        className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
