export const SITE_CONFIG = {
    name: "Abhinav Gontu",
    title: "Software Engineer | Full Stack Developer",
    description:
        "Building high-scale distributed platforms with React, Next.js, TypeScript, and cloud architecture.",
    url: "https://your-domain.vercel.app",
    author: "Abhinav Gontu",
    email: "abhinavgontu@gmail.com",
    github: "https://github.com/abhinavgontu",
    linkedin: "https://linkedin.com/in/abhinavgontu",
} as const;

export const PERFORMANCE_CONFIG = {
    targetFPS: 60,
    mobileFPS: 30,
    lowPerformanceFPS: 24,
    particleCount: {
        desktop: 300,
        mobile: 100,
    },
} as const;

export const ANIMATION_CONFIG = {
    pageTransitionDuration: 0.6,
    scrollRevealDuration: 0.8,
    hoverDuration: 0.3,
    easing: [0.6, -0.05, 0.01, 0.99] as const,
} as const;
