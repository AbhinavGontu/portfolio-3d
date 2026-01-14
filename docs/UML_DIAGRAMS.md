# UML Diagrams - 3D Portfolio Website

Comprehensive visual documentation of the system architecture using UML diagrams.

---

## 1. Class Diagram - Component Architecture

```mermaid
classDiagram
    class App {
        +metadata: Metadata
        +children: ReactNode
        +render() RootLayout
    }
    
    class HomePage {
        -projects: Project[]
        -experience: Experience[]
        +render() JSX.Element
    }
    
    class Navigation {
        -isScrolled: boolean
        -mobileMenuOpen: boolean
        +handleScroll() void
        +toggleMenu() void
        +smoothScroll(target) void
        +render() JSX.Element
    }
    
    class Scene {
        -isMobile: boolean
        -children: ReactNode
        +render() Canvas
    }
    
    class HeroObject {
        -meshRef: RefObject~Mesh~
        -time: number
        +animate() void
        +render() Mesh
    }
    
    class ParticleSystem {
        -pointsRef: RefObject~Points~
        -particleCount: number
        -positions: Float32Array
        +generateParticles() Float32Array
        +animate() void
        +render() Points
    }
    
    class FloatingElements {
        -sphere1Ref: RefObject~Mesh~
        -sphere2Ref: RefObject~Mesh~
        -torusRef: RefObject~Mesh~
        +animate() void
        +render() Group
    }
    
    class ProjectCard {
        -title: string
        -description: string
        -tags: string[]
        -metrics: Object
        +render() JSX.Element
    }
    
    class Timeline {
        -items: Experience[]
        +render() JSX.Element
    }
    
    class Footer {
        +render() JSX.Element
    }
    
    class useScrollPosition {
        -scrollY: number
        -scrollProgress: number
        +listen() void
        +cleanup() void
        +return() Object
    }
    
    class useMediaQuery {
        -matches: boolean
        +checkMedia(query) boolean
        +return() boolean
    }
    
    class usePerformanceMonitor {
        -fps: number
        -shouldReduceQuality: boolean
        +measureFPS() number
        +return() Object
    }
    
    class useExperiment {
        -variant: string
        -userId: string
        +getVariant(experimentId) string
        +trackExposure() void
        +return() string
    }
    
    App --> HomePage
    HomePage --> Scene
    HomePage --> Navigation
    HomePage --> ProjectCard
    HomePage --> Timeline
    HomePage --> Footer
    
    Scene --> HeroObject
    Scene --> ParticleSystem
    Scene --> FloatingElements
    
    Scene ..> useMediaQuery : uses
    HeroObject ..> usePerformanceMonitor : uses
    ParticleSystem ..> useMediaQuery : uses
    ParticleSystem ..> usePerformanceMonitor : uses
    
    ProjectCard ..> useScrollPosition : uses
    Timeline ..> useScrollPosition : uses
    HomePage ..> useExperiment : uses
    
    style App fill:#667eea,stroke:#764ba2,stroke-width:3px,color:#fff
    style HomePage fill:#f093fb,stroke:#f5576c,stroke-width:3px,color:#fff
    style Scene fill:#4facfe,stroke:#00f2fe,stroke-width:3px,color:#fff
    style HeroObject fill:#43e97b,stroke:#38f9d7,stroke-width:3px,color:#000
    style ParticleSystem fill:#fa709a,stroke:#fee140,stroke-width:3px,color:#fff
    style Navigation fill:#30cfd0,stroke:#330867,stroke-width:3px,color:#fff
    style useScrollPosition fill:#a8edea,stroke:#fed6e3,stroke-width:2px,color:#000
    style useMediaQuery fill:#ff9a9e,stroke:#fecfef,stroke-width:2px,color:#000
    style usePerformanceMonitor fill:#ffecd2,stroke:#fcb69f,stroke-width:2px,color:#000
```

---

## 2. Sequence Diagram - Page Load Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Browser
    participant Vercel CDN
    participant Next.js SSR
    participant React Hydration
    participant 3D Scene
    participant Performance Monitor
    participant Analytics
    
    User->>Browser: Navigate to portfolio
    Browser->>Vercel CDN: HTTPS Request
    
    rect rgb(200, 240, 255)
        Note over Vercel CDN,Next.js SSR: Server-Side Rendering Phase
        Vercel CDN->>Next.js SSR: Forward request
        Next.js SSR->>Next.js SSR: Generate HTML shell
        Next.js SSR->>Next.js SSR: Inject metadata & fonts
        Next.js SSR-->>Vercel CDN: HTML (500ms)
    end
    
    Vercel CDN-->>Browser: Initial HTML + CSS
    Browser->>Browser: Parse & display content (FCP)
    
    rect rgb(255, 245, 200)
        Note over Browser,React Hydration: Client-Side Hydration
        Browser->>Vercel CDN: Request JS bundles
        Vercel CDN-->>Browser: Code chunks (gzipped)
        Browser->>React Hydration: Execute React
        React Hydration->>React Hydration: Hydrate components
    end
    
    rect rgb(200, 255, 220)
        Note over React Hydration,3D Scene: 3D Initialization
        React Hydration->>3D Scene: Initialize Canvas
        3D Scene->>3D Scene: Create WebGL context
        3D Scene->>3D Scene: Compile shaders
        3D Scene->>3D Scene: Load HeroObject
        3D Scene->>3D Scene: Generate particles
        3D Scene-->>Browser: First frame (LCP)
    end
    
    Browser->>Performance Monitor: Start FPS tracking
    Performance Monitor->>Performance Monitor: Measure frame times
    
    alt FPS < 45
        Performance Monitor->>3D Scene: Reduce quality
        3D Scene->>3D Scene: Lower particle count
        3D Scene->>3D Scene: Reduce DPR
    else FPS >= 55
        Performance Monitor->>3D Scene: Maintain quality
    end
    
    Browser->>Analytics: Track page view
    Browser->>Analytics: Log performance metrics
    
    Note over User,Analytics: Total Time to Interactive: ~2.3s
    
    loop Every Frame (60fps)
        3D Scene->>Browser: Render frame
        Performance Monitor->>Performance Monitor: Update FPS
    end
    
    User->>Browser: Scroll page
    Browser->>3D Scene: Update camera position
    3D Scene->>Browser: New frame
```

---

## 3. Component Diagram - System Modules

```mermaid
graph TB
    subgraph "Presentation Layer"
        UI[UI Components<br/>Navigation, Cards, Timeline]
        Layout[Layout Components<br/>RootLayout, Footer]
    end
    
    subgraph "3D Rendering Layer"
        Scene[Scene Manager<br/>Canvas Setup]
        Objects[3D Objects<br/>Hero, Particles, Floating]
        Materials[Materials & Shaders<br/>MeshDistort, PBR]
    end
    
    subgraph "State Management"
        Hooks[Custom Hooks<br/>Scroll, Media, Performance]
        ABTest[A/B Testing<br/>Experiments, Variants]
    end
    
    subgraph "Data Layer"
        JSON[Static Data<br/>Projects, Experience]
        Config[Configuration<br/>Constants, Settings]
    end
    
    subgraph "Performance Layer"
        Monitor[Performance Monitor<br/>FPS, Memory]
        Optimizer[Adaptive Optimizer<br/>Quality Adjustment]
    end
    
    subgraph "Testing Layer"
        Unit[Unit Tests<br/>Jest, RTL]
        E2E[E2E Tests<br/>Playwright]
        Visual[Visual Tests<br/>Screenshots]
        A11y[Accessibility<br/>axe-core]
        Perf[Performance Tests<br/>Benchmarks]
    end
    
    UI --> Hooks
    UI --> JSON
    Layout --> UI
    
    Scene --> Objects
    Objects --> Materials
    Scene --> Hooks
    Objects --> Hooks
    
    Objects --> Monitor
    Monitor --> Optimizer
    Optimizer --> Objects
    
    UI --> ABTest
    
    JSON --> Config
    Hooks --> Config
    
    Unit -.-> UI
    Unit -.-> Hooks
    E2E -.-> Layout
    Visual -.-> UI
    Visual -.-> Scene
    A11y -.-> UI
    Perf -.-> Scene
    Perf -.-> Monitor
    
    style UI fill:#667eea,stroke:#764ba2,stroke-width:3px,color:#fff
    style Scene fill:#4facfe,stroke:#00f2fe,stroke-width:3px,color:#fff
    style Objects fill:#43e97b,stroke:#38f9d7,stroke-width:3px,color:#000
    style Monitor fill:#fa709a,stroke:#fee140,stroke-width:3px,color:#fff
    style Hooks fill:#a8edea,stroke:#fed6e3,stroke-width:2px,color:#000
    style Testing fill:#ffecd2,stroke:#fcb69f,stroke-width:2px,color:#000
```

---

## 4. State Diagram - 3D Scene Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Initializing
    
    Initializing --> LoadingAssets: WebGL context created
    LoadingAssets --> Compiling: Assets loaded
    Compiling --> Rendering: Shaders compiled
    
    Rendering --> HighQuality: FPS >= 55
    Rendering --> MediumQuality: 45 <= FPS < 55
    Rendering --> LowQuality: FPS < 45
    
    HighQuality --> Rendering: Continue
    MediumQuality --> Rendering: Adjust
    LowQuality --> Rendering: Optimize
    
    HighQuality --> MediumQuality: FPS drops
    MediumQuality --> LowQuality: FPS drops further
    LowQuality --> MediumQuality: FPS improves
    MediumQuality --> HighQuality: FPS stable
    
    Rendering --> Paused: Tab hidden
    Paused --> Rendering: Tab visible
    
    Rendering --> Disposed: Component unmount
    Disposed --> [*]
    
    note right of HighQuality
        - Full particle count
        - DPR = 2.0
        - All effects enabled
        - Target: 60fps
    end note
    
    note right of MediumQuality
        - Reduced particles
        - DPR = 1.5
        - Some effects disabled
        - Target: 45fps
    end note
    
    note right of LowQuality
        - Minimal particles
        - DPR = 1.0
        - Effects off
        - Target: 30fps
    end note
```

---

## 5. Use Case Diagram - User Interactions

```mermaid
graph LR
    User((User<br/>Visitor))
    Recruiter((Recruiter))
    Developer((Developer))
    
    subgraph "Portfolio Interactions"
        ViewProjects[View Projects]
        ExploreTimeline[Explore Experience]
        Interact3D[Interact with 3D Scene]
        CheckMetrics[View Performance Metrics]
        ContactLinks[Access Contact Info]
    end
    
    subgraph "Admin Actions"
        UpdateContent[Update Project Data]
        RunTests[Execute Test Suite]
        DeployChanges[Deploy to Production]
        MonitorPerf[Monitor Performance]
    end
    
    User --> ViewProjects
    User --> ExploreTimeline
    User --> Interact3D
    User --> ContactLinks
    
    Recruiter --> ViewProjects
    Recruiter --> ExploreTimeline
    Recruiter --> CheckMetrics
    Recruiter --> ContactLinks
    
    Developer --> UpdateContent
    Developer --> RunTests
    Developer --> DeployChanges
    Developer --> MonitorPerf
    
    style User fill:#667eea,stroke:#764ba2,stroke-width:3px,color:#fff
    style Recruiter fill:#f093fb,stroke:#f5576c,stroke-width:3px,color:#fff
    style Developer fill:#4facfe,stroke:#00f2fe,stroke-width:3px,color:#fff
    style ViewProjects fill:#43e97b,stroke:#38f9d7,stroke-width:2px
    style Interact3D fill:#fa709a,stroke:#fee140,stroke-width:2px
```

---

## 6. Activity Diagram - User Journey

```mermaid
flowchart TD
    Start([User Lands on Site]) --> LoadPage[Page Loads<br/>SSR HTML]
    LoadPage --> ViewHero{3D Scene<br/>Loaded?}
    
    ViewHero -->|Yes| Interact[Interact with 3D Hero]
    ViewHero -->|Loading| Fallback[Show Fallback]
    
    Fallback --> Interact
    
    Interact --> Scroll{User<br/>Scrolls?}
    
    Scroll -->|Yes| Parallax[Trigger Parallax Effects]
    Scroll -->|No| Wait[Wait for Interaction]
    
    Parallax --> ViewProjects[Projects Section Visible]
    ViewProjects --> HoverCard{Hover on<br/>Project Card?}
    
    HoverCard -->|Yes| ShowDetails[Show Hover Animation]
    HoverCard -->|No| Continue[Continue Scrolling]
    
    ShowDetails --> ClickProject{Click<br/>Project?}
    Continue --> ViewTimeline[View Experience Timeline]
    
    ClickProject -->|Yes| OpenProject[Open Project Link]
    ClickProject -->|No| Continue
    
    ViewTimeline --> ScrollFooter[Scroll to Footer]
    ScrollFooter --> ClickContact{Click<br/>Contact?}
    
    ClickContact -->|Email| OpenEmail[Open Email Client]
    ClickContact -->|LinkedIn| OpenLinkedIn[Open LinkedIn]
    ClickContact -->|GitHub| OpenGitHub[Open GitHub]
    
    OpenEmail --> End([Exit Site])
    OpenLinkedIn --> End
    OpenGitHub --> End
    OpenProject --> End
    Wait --> Scroll
    
    style Start fill:#667eea,stroke:#764ba2,stroke-width:3px,color:#fff
    style Interact fill:#43e97b,stroke:#38f9d7,stroke-width:2px
    style ViewProjects fill:#4facfe,stroke:#00f2fe,stroke-width:2px
    style End fill:#fa709a,stroke:#fee140,stroke-width:3px,color:#fff
```

---

## 7. Deployment Diagram - Infrastructure

```mermaid
graph TB
    subgraph "Developer Machine"
        Dev[Local Development<br/>npm run dev]
        Git[Git Repository<br/>Version Control]
    end
    
    subgraph "GitHub"
        Repo[Repository<br/>Main Branch]
        Actions[GitHub Actions<br/>CI/CD Pipeline]
    end
    
    subgraph "CI/CD Pipeline"
        Tests[Test Jobs<br/>Unit, E2E, Visual]
        Build[Build Job<br/>next build]
        Lighthouse[Lighthouse CI<br/>Performance]
    end
    
    subgraph "Vercel Platform"
        Preview[Preview Deployment<br/>pr-*.vercel.app]
        Prod[Production<br/>yourname.vercel.app]
    end
    
    subgraph "Vercel Edge Network"
        CDN[Global CDN<br/>100+ Locations]
        Edge[Edge Functions<br/>Serverless]
        Static[Static Assets<br/>Cached]
    end
    
    subgraph "End Users"
        Desktop[Desktop Users]
        Mobile[Mobile Users]
        Global[Global visitors]
    end
    
    Dev --> Git
    Git --> Repo
    Repo --> Actions
    
    Actions --> Tests
    Actions --> Build
    Actions --> Lighthouse
    
    Tests -->|Pass| Preview
    Build -->|Success| Preview
    
    Preview -->|Merge PR| Prod
    
    Prod --> CDN
    CDN --> Edge
    CDN --> Static
    
    CDN --> Desktop
    CDN --> Mobile
    CDN --> Global
    
    style Dev fill:#667eea,stroke:#764ba2,stroke-width:2px
    style Actions fill:#43e97b,stroke:#38f9d7,stroke-width:3px
    style Tests fill:#ffecd2,stroke:#fcb69f,stroke-width:2px
    style Prod fill:#fa709a,stroke:#fee140,stroke-width:3px,color:#fff
    style CDN fill:#4facfe,stroke:#00f2fe,stroke-width:3px,color:#fff
```

---

## Diagram Legend

### Color Scheme

- 🟣 **Purple Gradient** - Main application layers
- 🔵 **Blue Gradient** - 3D rendering components
- 🟢 **Green Gradient** - Performance & optimization
- 🔴 **Pink/Red Gradient** - Critical paths
- 🟡 **Yellow/Orange** - Testing & QA

### Arrow Types

- **Solid arrows** (→) - Direct dependencies
- **Dashed arrows** (-->) - Uses/References
- **Dotted arrows** (...>) - Tests/Validates

---

**Last Updated**: January 2026  
**Diagram Count**: 7 comprehensive UML diagrams
