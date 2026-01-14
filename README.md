# 3D Portfolio Website

A **high-performance, minimalist 3D portfolio website** built with Next.js, React Three Fiber, and Framer Motion. Features clean geometric 3D graphics, separate pages for projects and contact, and comprehensive testing infrastructure.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎨 **Minimalist 3D Graphics** - Clean frosted glass icosahedron with subtle particles
- ⚡ **Performance Optimized** - 90+ Lighthouse score, <2.3s load time, 60fps rendering
- 📱 **Fully Responsive** - Adaptive rendering for mobile, tablet, and desktop
- 🎭 **Smooth Animations** - Page transitions and scroll-triggered reveals
- 🔍 **SEO Optimized** - Complete meta tags and semantic HTML
- ♿ **Accessible** - WCAG 2.1 AA compliant with comprehensive testing
- 🧪 **Fully Tested** - 100+ tests including unit, E2E, visual regression, and accessibility
- 🌐 **Multi-Page Architecture** - Separate routes for Projects and Contact
- 🎯 **Clean Design** - No experience section, focus on projects and skills

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-3d.git
cd portfolio-3d

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with concurrent features
- **TypeScript 5** - Type-safe development

### 3D Graphics
- **Three.js** - WebGL 3D library
- **React Three Fiber (R3F)** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions

### Animation & UI
- **Framer Motion** - Production-ready animation library
- **Tailwind CSS** - Utility-first CSS framework

### Testing
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Playwright** - E2E and visual regression testing
- **@axe-core/playwright** - Accessibility testing

### Deployment
- **Vercel** - Edge network deployment
- **GitHub Actions** - CI/CD pipeline

## 📂 Project Structure

\`\`\`
portfolio-3d/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Home page (hero only)
│   ├── projects/
│   │   └── page.tsx           # Projects page
│   ├── contact/
│   │   └── page.tsx           # Contact page
│   └── globals.css            # Global styles
│
├── components/
│   ├── 3d/                    # Three.js components
│   │   ├── Scene.tsx          # Main canvas wrapper
│   │   ├── HeroObject.tsx     # Frosted glass icosahedron
│   │   ├── ParticleSystem.tsx # Minimalist particles (150 count)
│   │   └── FloatingElements.tsx # Wireframe accents
│   │
│   └── ui/                    # UI components
│       ├── Navigation.tsx     # Sticky nav with routing
│       ├── ProjectCard.tsx    # Project showcase
│       └── Timeline.tsx       # (Not currently used)
│
├── lib/
│   ├── hooks/                 # Custom React hooks
│   │   ├── useScrollPosition.ts
│   │   ├── useMediaQuery.ts
│   │   └── usePerformanceMonitor.ts
│   │
│   ├── utils/                 # Utility functions
│   │   └── constants.ts
│   │
│   ├── data/                  # Content data
│   │   └── projects.json      # 2 personal projects
│   │
│   └── ab-testing/            # A/B testing framework
│       ├── experiments.ts
│       └── useExperiment.tsx
│
├── __tests__/                 # Test suites
│   ├── unit/                  # Component & hook tests
│   ├── integration/           # Integration tests
│   ├── e2e/                   # End-to-end tests
│   ├── visual/                # Visual regression tests
│   ├── accessibility/         # WCAG compliance tests
│   ├── performance/           # 3D rendering performance
│   └── snapshots/             # Snapshot tests
│
├── public/                    # Static assets
│   └── images/                # Project images
│
└── docs/                      # Documentation
    ├── ARCHITECTURE.md        # System architecture
    ├── COMPONENTS.md          # Component API docs
    ├── PERFORMANCE.md         # Performance guide
    ├── PERFORMANCE_STORY.md   # Narrative performance docs
    ├── WORKFLOWS.md           # User flows
    ├── UML_DIAGRAMS.md        # 7 Mermaid diagrams
    ├── TESTING.md             # Testing strategy
    ├── SPECIALIZED_TESTING.md # Advanced testing
    ├── DEBUGGING_STORIES.md   # STAR debugging stories
    └── TECH_DECISIONS.md      # Tech stack rationale
\`\`\`

## 🎯 Performance Metrics

**Lighthouse Scores (Target):**
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Core Web Vitals:**
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <2.3s
- Cumulative Layout Shift: <0.1
- 3D Rendering: 60fps (desktop), 30fps (mobile)

**Bundle Size:**
- Total: ~290KB gzipped
- JavaScript: ~210KB
- CSS: ~15KB

## 📝 Development Commands

\`\`\`bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run all tests
npm run test:all

# Unit tests
npm test

# E2E tests
npm run test:e2e

# Visual regression tests
npm run test:visual

# Accessibility tests
npm run test:a11y

# Lint code
npm run lint

# Format code with Prettier
npm run format
\`\`\`

## 🎨 Customization

### Update Personal Information

Edit `lib/utils/constants.ts`:

\`\`\`typescript
export const SITE_CONFIG = {
  name: "Your Name",
  title: "Software Engineer | Full Stack Developer",
  description: "Your description",
  email: "your@email.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};
\`\`\`

### Add Projects

Edit `lib/data/projects.json`:

\`\`\`json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Project description",
  "tags": ["Java", "Spring Boot", "Kafka"],
  "image": "/images/project.jpg",
  "link": "#",
  "github": "#",
  "featured": true,
  "metrics": {
    "throughput": "50K+ req/sec",
    "scalability": "5x load spikes"
  }
}
\`\`\`

### Modify 3D Scene

Edit components in `components/3d/`:
- `HeroObject.tsx` - Frosted glass icosahedron
- `ParticleSystem.tsx` - Minimalist particles (150 desktop, 50 mobile)
- `FloatingElements.tsx` - Wireframe torus and octahedron
- `Scene.tsx` - Lighting, camera, and canvas config

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Deploy automatically

\`\`\`bash
# Or use Vercel CLI
npm i -g vercel
vercel
\`\`\`

### Environment Variables

No environment variables required for basic deployment.

## 📊 Performance Optimization

### Implemented Optimizations

✅ **Code Splitting** - Dynamic imports for 3D components  
✅ **Adaptive DPR** - Device pixel ratio optimization (1-1.5 mobile, 1-2 desktop)  
✅ **Lazy Loading** - 3D scene loads after initial page render  
✅ **Particle Reduction** - 150 particles (was 300) for cleaner aesthetic  
✅ **Minimalist Design** - Frosted glass material, simple geometry  
✅ **Tree Shaking** - Unused code eliminated  
✅ **CDN Caching** - Static assets cached globally  

See [PERFORMANCE.md](./docs/PERFORMANCE.md) for detailed guide.

## 🏗️ Architecture

### Page Structure

- **Home (`/`)** - Hero section with 3D background and CTAs
- **Projects (`/projects`)** - Grid of personal projects
- **Contact (`/contact`)** - Email, LinkedIn, GitHub links

### Design Philosophy

- **Minimalist 3D** - Clean geometric shapes, subtle animations
- **No Experience Section** - Focus on projects and skills
- **Separate Pages** - Better organization and navigation
- **Consistent Navigation** - Fixed header, back buttons on sub-pages

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed diagrams.

## 🧪 Testing Strategy

**100+ Test Cases:**
- Unit tests for components and hooks
- Integration tests for page rendering
- E2E tests with Playwright (cross-browser)
- Visual regression testing
- Accessibility testing (WCAG 2.1 AA)
- 3D rendering performance tests
- Snapshot tests

**CI/CD:**
- GitHub Actions workflow
- Automated testing on push/PR
- Build verification
- Lighthouse CI integration

See [TESTING.md](./docs/TESTING.md) and [SPECIALIZED_TESTING.md](./docs/SPECIALIZED_TESTING.md).

## 🧪 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - Amazing 3D React library
- [Framer Motion](https://www.framer.com/motion/) - Best-in-class animations
- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform

## 📧 Contact

- **Email**: abhinavgontu@gmail.com
- **LinkedIn**: [linkedin.com/in/abhinavgontu](https://linkedin.com/in/abhinavgontu)
- **GitHub**: [github.com/abhinavgontu](https://github.com/abhinavgontu)

---

**Built with ❤️ using Next.js, Three.js, and Framer Motion**
