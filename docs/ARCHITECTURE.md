# Architecture Documentation

## System Overview

This document provides a comprehensive overview of the 3D Portfolio Website architecture, including system design, component hierarchy, data flow, and deployment strategy.

---

## High-Level Architecture

```mermaid
graph TB
    subgraph "User Layer"
        Browser[Web Browser]
        Mobile[Mobile Device]
        Desktop[Desktop Device]
    end
    
    subgraph "Vercel Edge Network"
        CDN[Global CDN<br/>100+ Locations]
        Edge[Edge Functions]
        Static[Static Assets]
    end
    
    subgraph "Application Layer - Next.js 14"
        SSR[Server Components<br/>Static Generation]
        CSR[Client Components<br/>React Hydration]
        Router[App Router]
    end
    
    subgraph "Rendering Engines"
        R3F[React Three Fiber<br/>3D Scene Manager]
        Three[Three.js<br/>WebGL Renderer]
        Framer[Framer Motion<br/>2D Animations]
        GPU[GPU<br/>Hardware Acceleration]
    end
    
    subgraph "Data Layer"
        JSONData[Static JSON Files<br/>Projects & Experience]
        Assets[3D Assets<br/>Models & Textures]
    end
    
    Browser --> CDN
    Mobile --> CDN
    Desktop --> CDN
    
    CDN --> Edge
    CDN --> Static
    Edge --> Router
    
    Router --> SSR
    SSR --> CSR
    
    CSR --> R3F
    CSR --> Framer
    R3F --> Three
    Three --> GPU
    
    Router --> JSONData
    R3F --> Assets
    
    style Browser fill:#e1f5ff,stroke:#0284c7,stroke-width:2px
    style CDN fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style CSR fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style R3F fill:#fce7f3,stroke:#ec4899,stroke-width:2px
    style GPU fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
```

---

## Component Architecture

```mermaid
graph LR
    subgraph "Page Structure"
        Layout[RootLayout<br/>SEO & Shell]
        HomePage[HomePage<br/>Main Content]
    end
    
    subgraph "3D Components"
        Scene[Scene<br/>Canvas & Lighting]
        Hero[HeroObject<br/>Animated Centerpiece]
        Particles[ParticleSystem<br/>Background Effect]
        Floating[FloatingElements<br/>Ambient Objects]
    end
    
    subgraph "UI Components"
        Nav[Navigation<br/>Sticky Header]
        Card[ProjectCard<br/>Project Showcase]
        Timeline[Timeline<br/>Experience Display]
        Footer[Footer<br/>Links & Info]
    end
    
    subgraph "Hooks & Utils"
        ScrollHook[useScrollPosition]
        MediaHook[useMediaQuery]
        PerfHook[usePerformanceMonitor]
        Constants[Config Constants]
    end
    
    Layout --> Nav
    Layout --> HomePage
    Layout --> Footer
    
    HomePage --> Scene
    HomePage --> Card
    HomePage --> Timeline
    
    Scene --> Hero
    Scene --> Particles
    Scene --> Floating
    
    Scene --> PerfHook
    Scene --> MediaHook
    Card --> ScrollHook
    Scene --> Constants
    
    style Scene fill:#fbbf24,stroke:#f59e0b,stroke-width:3px
    style HomePage fill:#60a5fa,stroke:#3b82f6,stroke-width:3px
    style Nav fill:#34d399,stroke:#10b981,stroke-width:2px
    style PerfHook fill:#f472b6,stroke:#ec4899,stroke-width:2px
```

---

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Vercel
    participant Next.js
    participant 3D Engine
    participant GPU
    
    User->>Browser: Navigate to portfolio
    Browser->>Vercel: HTTPS Request
    Vercel->>Next.js: Route /<br/>(SSR/SSG)
    
    Next.js->>Next.js: Generate HTML<br/>(Server Components)
    Next.js-->>Vercel: HTML + Metadata
    Vercel-->>Browser: Initial HTML<br/>(<1s)
    
    Browser->>Browser: Parse HTML
    Browser->>Vercel: Request JS bundles
    Vercel-->>Browser: Code chunks<br/>(code-split)
    
    Browser->>Next.js: Hydrate React
    Next.js->>3D Engine: Initialize R3F Canvas
    3D Engine->>GPU: Create WebGL Context
    GPU->>GPU: Compile Shaders
    
    loop 60fps Animation
        3D Engine->>GPU: Render Frame
        GPU->>3D Engine: Frame Buffer
        3D Engine->>Browser: Display
    end
    
    User->>Browser: Scroll Page
    Browser->>3D Engine: Scroll Event
    3D Engine->>GPU: Update Scene
    GPU-->>Browser: New Frame
    
    Note over Browser,GPU: Total Time to Interactive: <3.5s
    
    style Browser fill:#dbeafe,stroke:#3b82f6
    style 3D Engine fill:#fce7f3,stroke:#ec4899
    style GPU fill:#d1fae5,stroke:#10b981
```

---

## Performance Architecture

```mermaid
graph TD
    subgraph "Initial Load Strategy"
        HTML[SSR HTML Shell<br/>~10KB]
        Critical[Critical CSS<br/>Inline]
        MainJS[Main JS Bundle<br/>~50KB gzipped]
    end
    
    subgraph "Progressive Enhancement"
        Hydrate[React Hydration<br/>Interactive]
        Lazy3D[Lazy Load 3D<br/>Dynamic Import]
        StreamAssets[Stream 3D Assets<br/>Progressive Loading]
    end
    
    subgraph "Runtime Optimization"
        Monitor[FPS Monitor<br/>Real-time]
        Adaptive[Adaptive Quality<br/>Auto-adjust]
        LOD[Level of Detail<br/>Distance-based]
        RAF[RequestAnimationFrame<br/>Optimized Loop]
    end
    
    subgraph "Caching Layers"
        EdgeCache[Vercel Edge Cache<br/>Static Assets]
        BrowserCache[Browser Cache<br/>Long-term]
        GPUCache[GPU Texture Cache<br/>VRAM]
    end
    
    HTML --> Hydrate
    Critical --> Hydrate
    MainJS --> Hydrate
    
    Hydrate --> Lazy3D
    Lazy3D --> StreamAssets
    StreamAssets --> Monitor
    
    Monitor --> Adaptive
    Adaptive --> LOD
    LOD --> RAF
    
    HTML --> EdgeCache
    StreamAssets --> BrowserCache
    StreamAssets --> GPUCache
    
    style HTML fill:#bbf7d0,stroke:#16a34a,stroke-width:2px
    style Lazy3D fill:#fed7aa,stroke:#f59e0b,stroke-width:2px
    style Monitor fill:#fecaca,stroke:#ef4444,stroke-width:2px
    style EdgeCache fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
```

---

## File Organization

```
portfolio-3d/
│
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout, SEO metadata
│   ├── page.tsx                  # Home page with all sections
│   ├── globals.css               # Tailwind + custom styles
│   └── favicon.ico               # Site icon
│
├── components/
│   ├── 3d/                       # React Three Fiber components
│   │   ├── Scene.tsx             # Canvas wrapper, lighting setup
│   │   ├── HeroObject.tsx        # Main animated 3D object
│   │   ├── ParticleSystem.tsx    # Background particle effects
│   │   └── FloatingElements.tsx  # Ambient floating objects
│   │
│   ├── ui/                       # User interface components
│   │   ├── Navigation.tsx        # Sticky nav with glassmorphism
│   │   ├── ProjectCard.tsx       # Project showcase cards
│   │   ├── Timeline.tsx          # Experience timeline
│   │   └── Footer.tsx            # Site footer
│   │
│   └── animations/               # Animation wrappers (future)
│
├── lib/
│   ├── hooks/                    # Custom React hooks
│   │   ├── useScrollPosition.ts  # Track scroll for parallax
│   │   ├── useMediaQuery.ts      # Responsive breakpoints
│   │   └── usePerformanceMonitor.ts  # FPS tracking
│   │
│   ├── utils/                    # Utility functions
│   │   ├── constants.ts          # App-wide constants
│   │   └── three-helpers.ts      # Three.js utilities (future)
│   │
│   └── data/                     # Content as data
│       ├── projects.json         # Project metadata
│       ├── experience.json       # Work history
│       └── skills.json           # Skills taxonomy (future)
│
├── public/                       # Static assets
│   ├── models/                   # 3D model files (.glb, .gltf)
│   ├── textures/                 # Texture images
│   └── images/                   # Project screenshots
│
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md           # This file
│   ├── COMPONENTS.md             # Component API docs
│   ├── PERFORMANCE.md            # Performance guide
│   └── WORKFLOWS.md              # Development workflows
│
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── README.md                     # Project overview
```

---

## Technology Stack Justification

### Why Next.js 14?
- ✅ Built-in SSR/SSG for SEO
- ✅ Image optimization
- ✅ Zero-config deployment to Vercel
- ✅ App Router for modern patterns
- ✅ Automatic code splitting

### Why React Three Fiber?
- ✅ Declarative 3D in React
- ✅ Hooks-based API
- ✅ Automatic memory management
- ✅ Performance optimizations
- ✅ Large ecosystem (drei, postprocessing)

### Why Framer Motion?
- ✅ Best-in-class animation library
- ✅ Spring physics
- ✅ Gesture support
- ✅ Layout animations
- ✅ Optimized for performance

### Why Tailwind CSS?
- ✅ Utility-first approach
- ✅ Rapid prototyping
- ✅ Tree-shaking (small bundle)
- ✅ Consistent design system
- ✅ Mobile-first responsive

---

## Deployment Architecture

```mermaid
graph LR
    subgraph "Development"
        Dev[Local Development<br/>npm run dev]
        Commit[Git Commit<br/>Feature Branch]
    end
    
    subgraph "GitHub Repository"
        Push[Push to GitHub]
        PR[Pull Request]
        Main[Main Branch]
    end
    
    subgraph "Vercel CI/CD"
        Build[Build Process<br/>Next.js Compiler]
        Test[Lint & Type Check]
        Preview[Preview Deployment<br/>unique-url.vercel.app]
        Prod[Production Build<br/>portfolio.vercel.app]
    end
    
    subgraph "Global Distribution"
        Edge[Edge Network<br/>100+ Locations]
        DNS[Custom Domain<br/>yourname.dev]
        SSL[Automatic HTTPS<br/>SSL Certificate]
    end
    
    Dev --> Commit
    Commit --> Push
    Push --> PR
    PR --> Build
    Build --> Test
    Test -->|Pass| Preview
    PR -->|Merge| Main
    Main --> Build
    Build -->|Success| Prod
    Prod --> Edge
    Edge --> DNS
    Edge --> SSL
    
    style Build fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style Prod fill:#bbf7d0,stroke:#16a34a,stroke-width:2px
    style Edge fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
```

---

## Security & Best Practices

### Security Measures
1. **HTTPS Enforced** - Automatic SSL via Vercel
2. **Security Headers** - CSP, X-Frame-Options, etc.
3. **XSS Protection** - React escaping
4. **Input Sanitization** - Form validation
5. **No Sensitive Data** - Static site, no secrets

### Performance Best Practices
1. **Code Splitting** - Dynamic imports for heavy components
2. **Image Optimization** - Next/Image with WebP
3. **Lazy Loading** - Below-fold content
4. **Adaptive Quality** - FPS-based rendering adjustments
5. **CDN Caching** - Static assets cached globally

### Accessibility
1. **Semantic HTML** - Proper heading hierarchy
2. **ARIA Labels** - For 3D scene context
3. **Keyboard Navigation** - Tab-accessible
4. **Color Contrast** - WCAG AA compliant
5. **Reduced Motion** - Respects user preference

---

## Future Enhancements

### Phase 2 Features
- [ ] CMS integration (Sanity/Contentful)
- [ ] Blog with MDX support
- [ ] Advanced 3D models (GLTF imports)
- [ ] VR mode (WebXR)
- [ ] Dark/Light theme toggle
- [ ] i18n support (multiple languages)
- [ ] Analytics dashboard
- [ ] A/B testing framework

### Performance Targets
- Lighthouse Score: 95+ (all categories)
- LCP: <1.5s
- FID: <50ms
- CLS: <0.05

---

**Last Updated**: January 2026  
**Version**: 1.0.0
