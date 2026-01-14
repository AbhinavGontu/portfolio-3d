# Technology Decisions: Why I Chose What I Chose

## Introduction

When I started this 5-day project, I had to make a lot of technology choices. Coming from a backend background (Java, Spring Boot, Kafka), I was stepping into unfamiliar territory with 3D graphics and modern frontend frameworks. This document explains my decisions, what I considered, and what I learned.

## Core Framework: Next.js

### Why I Chose It
I picked Next.js 14 because:
1. **I knew React basics** - Didn't want to learn a completely new framework
2. **Easy deployment** - Vercel makes it one-click
3. **Good for portfolios** - SEO matters for personal sites
4. **Large community** - Easy to find help

### What I Considered
- **Vite + React**: Faster dev server, but harder deployment
- **Vanilla HTML/CSS/JS**: Too basic, wanted to learn something modern
- **Vue/Svelte**: Would have to learn new syntax

### Trade-offs
**Pros:**
- Great developer experience
- Built-in routing
- Image optimization
- Fast builds

**Cons:**
- Larger bundle size than Vite
- Some features I didn't need (API routes, etc.)
- Learning curve for App Router

### Would I Choose It Again?
Yes! Next.js was perfect for this project. The deployment experience alone made it worth it.

---

## 3D Library: Three.js + React Three Fiber

### Why I Chose It
**Three.js** because:
- Industry standard for 3D on the web
- Huge community
- Tons of examples
- Good documentation

**React Three Fiber** because:
- Makes Three.js work with React
- Component-based approach felt familiar
- Hooks for animations (useFrame)
- Less boilerplate than vanilla Three.js

### What I Considered
- **Babylon.js**: More game-focused, seemed overkill
- **Vanilla Three.js**: Too much boilerplate
- **A-Frame**: Too simple for what I wanted

### The Learning Curve
This was the hardest part. Three.js has a steep learning curve:
- Day 1: Completely lost
- Day 2: Starting to understand
- Day 3: Comfortable with basics
- Day 4-5: Could build what I imagined

### Trade-offs
**Pros:**
- Powerful and flexible
- React-friendly with R3F
- Great for learning 3D fundamentals
- Production-ready

**Cons:**
- Steep learning curve
- Large bundle size (~200KB)
- Performance optimization needed
- Complex TypeScript types

### Would I Choose It Again?
Probably yes, but I'd spend more time learning Three.js basics before jumping into R3F. Understanding the underlying library helps a lot.

---

## Animation: Framer Motion

### Why I Chose It
- **Simple API** - Easy to learn
- **Great docs** - Clear examples
- **React-first** - Built for React
- **Powerful** - Can do complex animations

### What I Considered
- **CSS animations**: Too limited
- **GSAP**: More powerful but harder to learn
- **React Spring**: Similar but less intuitive API

### How I Used It
- Page transitions
- Scroll-triggered reveals
- Hover effects
- Stagger animations

### Trade-offs
**Pros:**
- Declarative syntax
- TypeScript support
- Gesture support
- Layout animations

**Cons:**
- Adds ~40KB to bundle
- Some performance overhead
- Overkill for simple animations

### Would I Choose It Again?
Yes! Framer Motion made animations so much easier. The time saved was worth the bundle size.

---

## Styling: Tailwind CSS

### Why I Chose It
- **Fast development** - No context switching
- **Consistent design** - Utility classes enforce consistency
- **Small bundle** - Only includes used classes
- **I'd used it before** - Familiar from other projects

### What I Considered
- **CSS Modules**: More traditional, but slower
- **Styled Components**: Runtime overhead
- **Vanilla CSS**: Too much boilerplate

### Trade-offs
**Pros:**
- Very fast to prototype
- No naming conflicts
- Responsive utilities
- Dark mode support

**Cons:**
- HTML can look messy
- Learning curve for utilities
- Need to configure for custom colors

### Would I Choose It Again?
Absolutely! Tailwind let me move fast without worrying about CSS architecture.

---

## TypeScript

### Why I Chose It
- **Catch bugs early** - Type errors before runtime
- **Better IDE support** - Autocomplete is amazing
- **Self-documenting** - Types explain the code
- **Industry standard** - Good to know

### The Struggle
TypeScript was challenging with Three.js:
- Complex type hierarchies
- Generic types everywhere
- Sometimes had to use `as unknown as Type`
- Ref typing was confusing

### Trade-offs
**Pros:**
- Caught many bugs
- Great autocomplete
- Refactoring confidence
- Documentation through types

**Cons:**
- Slower initial development
- Some Three.js types were hard
- Build errors can be cryptic

### Would I Choose It Again?
Yes, but I'd be more comfortable with `any` during prototyping. Strict typing slowed me down initially.

---

## Testing: Jest + Playwright

### Why I Chose Them
**Jest** for unit tests:
- Standard for React
- Easy to set up
- Good mocking support

**Playwright** for E2E:
- Cross-browser testing
- Modern API
- Visual regression testing
- Better than Cypress for my needs

### What I Tested
- Component rendering
- User interactions
- 3D scene loading
- Responsive behavior
- Accessibility

### Trade-offs
**Pros:**
- Confidence in changes
- Caught regressions
- Documentation through tests

**Cons:**
- Time investment (Day 5)
- Maintenance overhead
- Some tests were flaky

### Would I Choose It Again?
Yes, but I'd write tests as I go instead of all at the end.

---

## Deployment: Vercel

### Why I Chose It
- **Free tier** - Perfect for portfolios
- **One-click deploy** - Connect GitHub, done
- **Edge network** - Fast globally
- **Built for Next.js** - Optimized experience

### What I Considered
- **Netlify**: Similar but less Next.js-focused
- **GitHub Pages**: Free but no SSR
- **AWS**: Overkill and expensive

### Trade-offs
**Pros:**
- Incredibly easy
- Automatic deployments
- Preview deployments for PRs
- Great performance

**Cons:**
- Vendor lock-in
- Limited customization
- Free tier limits (probably fine)

### Would I Choose It Again?
100% yes. The deployment experience is unmatched.

---

## What I Didn't Use (And Why)

### Docker/Kubernetes
**Why not:** Overkill for a static portfolio. No backend to containerize.

### State Management (Redux, Zustand)
**Why not:** Project was simple enough for React's built-in state.

### GraphQL
**Why not:** No complex data fetching. Static JSON files were enough.

### CSS-in-JS (Styled Components, Emotion)
**Why not:** Tailwind was faster and lighter.

### Monorepo Tools (Turborepo, Nx)
**Why not:** Single project, no need for monorepo complexity.

---

## Lessons Learned

### 1. Start Simple
I initially wanted to add:
- Blog with MDX
- CMS integration
- Complex animations
- Multiple 3D scenes

I'm glad I didn't. The simple version was already challenging enough.

### 2. Choose Familiar Tools When Possible
Using Next.js (familiar) let me focus on learning Three.js (unfamiliar). If I'd chosen Vue + Babylon.js, I'd have been overwhelmed.

### 3. Community Matters
Three.js has a huge community. When I got stuck, I could always find examples or ask for help.

### 4. Performance is a Feature
I spent a lot of time on performance (adaptive particles, DPR optimization). It was worth it - the site feels fast.

### 5. TypeScript is Worth It
Even though it slowed me down initially, TypeScript caught so many bugs. I'd use it again.

---

## Future Improvements

If I had more time, I'd add:

### Short Term (1-2 days)
1. **Project detail pages** - More info about each project
2. **Blog section** - Share what I learned
3. **Better mobile optimization** - Could be even faster

### Medium Term (1 week)
1. **Dark mode toggle** - Currently always dark
2. **More 3D scenes** - Different shapes for each page
3. **Animations** - More interactive elements

### Long Term (1 month)
1. **CMS integration** - Easier content updates
2. **Analytics** - Track visitors
3. **A/B testing** - Optimize conversion

---

## Tech Stack Summary

| Category | Choice | Why |
|----------|--------|-----|
| Framework | Next.js 14 | Easy deployment, SEO, familiar |
| 3D Library | Three.js + R3F | Industry standard, React-friendly |
| Animation | Framer Motion | Simple API, powerful |
| Styling | Tailwind CSS | Fast development, consistent |
| Language | TypeScript | Type safety, better DX |
| Testing | Jest + Playwright | Standard tools, good coverage |
| Deployment | Vercel | One-click, optimized for Next.js |

---

## Conclusion

My technology choices were driven by three factors:
1. **Learning goals** - Wanted to learn 3D graphics
2. **Time constraints** - Only had 5 days
3. **Familiarity** - Used familiar tools where possible

The stack worked well. I built a working portfolio in 5 days, learned a ton about 3D graphics, and ended up with something I'm proud of.

**Would I change anything?**
- Maybe spend more time learning Three.js basics first
- Write tests as I go instead of at the end
- Start with even simpler 3D graphics

**What worked great?**
- Next.js + Vercel deployment
- Framer Motion for animations
- Tailwind for rapid styling
- TypeScript for catching bugs

---

*These decisions were made during my 5-day journey building this portfolio. Your mileage may vary!*
