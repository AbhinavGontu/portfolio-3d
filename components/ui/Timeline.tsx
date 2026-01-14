"use client";

import { motion } from "framer-motion";

interface TimelineItem {
    company: string;
    position: string;
    period: string;
    location: string;
    highlights: string[];
}

interface TimelineProps {
    items: TimelineItem[];
}

/**
 * Vertical timeline component for work experience.
 */
export function Timeline({ items }: TimelineProps) {
    return (
        <div className="space-y-8">
            {items.map((item, index) => (
                <motion.div
                    key={item.company + index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-8 border-l-2 border-primary-500/30"
                >
                    {/* Timeline dot */}
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-500 shadow-lg shadow-primary-500/50" />

                    <div className="glass-effect rounded-xl p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold">{item.position}</h3>
                                <p className="text-primary-400 font-semibold">{item.company}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-foreground/70">{item.period}</p>
                                <p className="text-sm text-foreground/50">{item.location}</p>
                            </div>
                        </div>

                        <ul className="space-y-2">
                            {item.highlights.map((highlight, i) => (
                                <li key={i} className="text-foreground/80 text-sm flex items-start">
                                    <span className="text-primary-400 mr-2">•</span>
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
