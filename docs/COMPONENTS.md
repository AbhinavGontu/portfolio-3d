# Component Documentation

Complete API documentation for all components in the 3D Portfolio Website.

---

## 3D Components

### Scene

**Location**: `components/3d/Scene.tsx`

**Purpose**: Main 3D canvas wrapper that sets up the Three.js rendering context, lighting, and camera.

**Props**:
\`\`\`typescript
interface SceneProps {
  children?: React.ReactNode; // Other 3D components to render
}
\`\`\`

**Usage**:
\`\`\`tsx
import { Scene } from "@/components/3d/Scene";
import { HeroObject } from "@/components/3d/HeroObject";

<Scene>
  <HeroObject />
</Scene>
\`\`\`

**Features**:
- Adaptive DPR based on device
- Three-point lighting setup
- Performance monitoring
- OrbitControls for optional interaction

---

### HeroObject

**Location**: `components/3d/HeroObject.tsx`

**Purpose**: Main animated 3D object (centerpiece of the scene).

**Props**: None

**Features**:
- Distortion material for organic look
- Continuous rotation animation
- Floating effect using sine wave
- Inner glow sphere for depth

**Performance**: ~5-8ms per frame

---

### ParticleSystem

**Location**: `components/3d/ParticleSystem.tsx`

**Purpose**: Background particle effects for ambient atmosphere.

**Props**: None

**Features**:
- Adaptive particle count (mobile vs desktop)
- Spherical distribution
- Slow rotation animation
- Performance optimized with frustum culling

**Particle Count**:
- Desktop: 300 particles
- Mobile: 100 particles

**Performance**: ~2-3ms per frame

---

### FloatingElements

**Location**: `components/3d/FloatingElements.tsx`

**Purpose**: Ambient floating geometric shapes.

**Props**: None

**Features**:
- Independent animation loops
- PBR materials (metallic/rough)
- Positioned in scene depth for parallax

**Performance**: ~1-2ms per frame

---

## UI Components

### Navigation

**Location**: `components/ui/Navigation.tsx`

**Purpose**: Sticky navigation with glassmorphism and smooth scroll.

**Props**: None

**Features**:
- Glassmorphism on scroll
- Mobile hamburger menu
- Smooth scroll to sections
- Framer Motion animations

**Usage**:
\`\`\`tsx
import { Navigation } from "@/components/ui/Navigation";

<Navigation />
\`\`\`

---

### ProjectCard

**Location**: `components/ui/ProjectCard.tsx`

**Purpose**: Showcase individual projects with hover effects.

**Props**:
\`\`\`typescript
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
\`\`\`

**Usage**:
\`\`\`tsx
<ProjectCard
  title="Project Name"
  description="Description"
  tags={["React", "Next.js"]}
  image="/images/project.jpg"
  link="https://project.com"
  github="https://github.com/..."
  metrics={{ users: "10K+", performance: "Sub-200ms" }}
/>
\`\`\`

**Features**:
- Hover lift animation
- Glassmorphism card
- Performance metrics display
- Tag pills
- Scroll-triggered reveal

---

### Timeline

**Location**: `components/ui/Timeline.tsx`

**Purpose**: Vertical timeline for work experience.

**Props**:
\`\`\`typescript
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
\`\`\`

**Usage**:
\`\`\`tsx
<Timeline items={experience} />
\`\`\`

**Features**:
- Vertical timeline with dots
- Staggered reveal animations
- Glassmorphism cards
- Responsive layout

---

### Footer

**Location**: `components/ui/Footer.tsx`

**Purpose**: Site footer with links and info.

**Props**: None

**Features**:
- Social links
- Tech stack display
- Glassmorphism styling
- Copyright info

---

## Custom Hooks

### useScrollPosition

**Location**: `lib/hooks/useScrollPosition.ts`

**Purpose**: Track scroll position and progress.

**Returns**:
\`\`\`typescript
{
  scrollY: number;        // Current scroll position
  scrollProgress: number; // Progress 0-1
}
\`\`\`

**Usage**:
\`\`\`tsx
const { scrollY, scrollProgress } = useScrollPosition();

// Use for parallax effects
const yOffset = scrollY * 0.5;
\`\`\`

---

### useMediaQuery

**Location**: `lib/hooks/useMediaQuery.ts`

**Purpose**: Responsive design breakpoints.

**API**:
\`\`\`typescript
useMediaQuery(query: string): boolean
useIsMobile(): boolean
useIsTablet(): boolean
useIsDesktop(): boolean
\`\`\`

**Usage**:
\`\`\`tsx
const isMobile = useIsMobile();

{isMobile ? <MobileComponent /> : <DesktopComponent />}
\`\`\`

---

### usePerformanceMonitor

**Location**: `lib/hooks/usePerformanceMonitor.ts`

**Purpose**: Monitor FPS and trigger quality adjustments.

**Returns**:
\`\`\`typescript
{
  fps: number;
  shouldReduceQuality: boolean;
}
\`\`\`

**Usage**:
\`\`\`tsx
const { fps, shouldReduceQuality } = usePerformanceMonitor();

const particleCount = shouldReduceQuality ? 50 : 300;
\`\`\`

---

## Data Structures

### Projects Data

**Location**: `lib/data/projects.json`

**Schema**:
\`\`\`typescript
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
  featured: boolean;
  metrics?: {
    [key: string]: string;
  };
}
\`\`\`

**Example**:
\`\`\`json
{
  "id": "unique-id",
  "title": "Project Title",
  "description": "Brief description",
  "tags": ["React", "TypeScript"],
  "image": "/images/project.jpg",
  "link": "https://demo.com",
  "github": "https://github.com/...",
  "featured": true,
  "metrics": {
    "users": "10K+",
    "performance": "Sub-200ms"
  }
}
\`\`\`

---

### Experience Data

**Location**: `lib/data/experience.json`

**Schema**:
\`\`\`typescript
interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  highlights: string[];
}
\`\`\`

**Example**:
\`\`\`json
{
  "id": "unique-id",
  "company": "Company Name",
  "position": "Software Engineer",
  "location": "City, State",
  "period": "Jan 2023 – Present",
  "highlights": [
    "Achievement 1",
    "Achievement 2"
  ]
}
\`\`\`

---

## Configuration

### Site Config

**Location**: `lib/utils/constants.ts`

**API**:
\`\`\`typescript
export const SITE_CONFIG = {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  email: string;
  github: string;
  linkedin: string;
};
\`\`\`

### Performance Config

\`\`\`typescript
export const PERFORMANCE_CONFIG = {
  targetFPS: 60;
  mobileFPS: 30;
  lowPerformanceFPS: 24;
  particleCount: {
    desktop: 300;
    mobile: 100;
  };
};
\`\`\`

### Animation Config

\`\`\`typescript
export const ANIMATION_CONFIG = {
  pageTransitionDuration: 0.6;
  scrollRevealDuration: 0.8;
  hoverDuration: 0.3;
  easing: [0.6, -0.05, 0.01, 0.99];
};
\`\`\`

---

## Styling Utilities

### Tailwind Custom Classes

**Location**: `app/globals.css`

**Glass Effect**:
\`\`\`tsx
<div className="glass-effect">
  // Content
</div>
\`\`\`

CSS:
\`\`\`css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
\`\`\`

**Gradient Text**:
\`\`\`tsx
<h1 className="gradient-text">Hello</h1>
\`\`\`

CSS:
\`\`\`css
.gradient-text {
  background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
\`\`\`

---

## Best Practices

### 3D Component Guidelines

1. **Always dispose resources**:
   \`\`\`tsx
   useEffect(() => {
     return () => {
       geometry.dispose();
       material.dispose();
     };
   }, []);
   \`\`\`

2. **Use useMemo for expensive calculations**:
   \`\`\`tsx
   const particles = useMemo(() => {
     return generateParticles(count);
   }, [count]);
   \`\`\`

3. **Throttle useFrame callbacks**:
   \`\`\`tsx
   useFrame((state) => {
     if (state.clock.getElapsedTime() % 0.1 < 0.016) {
       // Update every 100ms
     }
   });
   \`\`\`

### UI Component Guidelines

1. **Use Framer Motion variants**:
   \`\`\`tsx
   const variants = {
     initial: { opacity: 0, y: 60 },
     animate: { opacity: 1, y: 0 },
   };
   
   <motion.div variants={variants} />
   \`\`\`

2. **Implement skeleton loading**:
   \`\`\`tsx
   {loading ? <Skeleton /> : <Content />}
   \`\`\`

3. **Add ARIA labels**:
   \`\`\`tsx
   <button aria-label="Close menu">✕</button>
   \`\`\`

---

**Last Updated**: January 2026  
**Version**: 1.0.0
