# My 5-Day Journey Building a 3D Portfolio

## Overview

I spent 5 days building this 3D portfolio website to learn WebGL and 3D graphics on the web. Coming from a backend/distributed systems background (working with Kafka, microservices, and high-scale platforms), I had zero experience with Three.js or 3D rendering. This document tells the story of how I built it, what I learned, and the challenges I faced.

## Why I Built This

After 3+ years of backend work, I wanted to expand my skills into frontend and learn something completely new. I chose 3D web graphics because:
- It's visually impressive for a portfolio
- It forced me out of my comfort zone
- I could apply performance optimization skills from my backend experience

## The 5-Day Timeline

### Day 1: Setup & First Struggles (8 hours)

**Morning: Project Setup**
- Set up Next.js 14 with TypeScript
- Installed Three.js and React Three Fiber
- Spent 2 hours just understanding the difference between Three.js and R3F

**Afternoon: First 3D Shape**
- Created my first rotating cube
- Struggled with the coordinate system (X, Y, Z axes were confusing!)
- Learned about cameras, scenes, and renderers

**Evening: Basic Layout**
- Built navigation component
- Added Tailwind CSS
- Created basic page structure

**What I Learned:**
- Three.js has a steep learning curve
- R3F makes it easier but still complex
- 3D coordinate systems are different from 2D CSS

### Day 2: Understanding 3D Graphics (10 hours)

**Morning: Lighting & Materials**
- Experimented with different light types
- Learned about MeshStandardMaterial vs MeshBasicMaterial
- Created the frosted glass effect (took 3 hours!)

**Afternoon: Particle System**
- Added background particles
- First version had 500 particles - way too slow!
- Learned about performance optimization

**Evening: Animation**
- Added rotation to the main object
- Implemented Framer Motion for page transitions
- Fixed several TypeScript errors

**Challenges:**
- Understanding how materials interact with lights
- Performance issues with too many particles
- TypeScript types for Three.js objects were confusing

### Day 3: Building Features (9 hours)

**Morning: Multi-Page Architecture**
- Created separate pages for Projects and Contact
- Implemented Next.js routing
- Added "Back to Home" navigation

**Afternoon: Project Cards**
- Built ProjectCard component
- Created projects.json data file
- Added hover animations

**Evening: Responsive Design**
- Made everything work on mobile
- Reduced particle count for mobile devices
- Fixed 3D scene sizing issues

**What Worked:**
- Using dynamic imports for 3D components (prevents SSR issues)
- Adaptive particle count based on device
- Framer Motion made animations easy

### Day 4: Polish & Optimization (8 hours)

**Morning: Performance Tuning**
- Reduced particles from 500 → 300 → 150 (final)
- Implemented adaptive DPR (device pixel ratio)
- Added FPS monitoring

**Afternoon: Visual Refinement**
- Changed from morphing cube to clean icosahedron
- Added wireframe floating elements
- Refined color scheme

**Evening: Contact Page**
- Built contact page with social links
- Fixed icon sizing issues (SVGs were huge!)
- Ensured consistent navigation

**Performance Wins:**
- 60fps on desktop, 30fps on mobile
- <2.3s load time
- ~290KB bundle size

### Day 5: Testing & Documentation (10 hours)

**Morning: Testing Setup**
- Configured Jest and React Testing Library
- Set up Playwright for E2E tests
- Wrote first component tests

**Afternoon: Writing Tests**
- Created 100+ test cases
- Unit tests for components and hooks
- E2E tests for user flows
- Accessibility tests

**Evening: Documentation**
- Wrote this document
- Created README
- Added code comments
- Took screenshots

**Final Tasks:**
- Deployed to Vercel
- Fixed last-minute bugs
- Committed everything to Git

## Technical Decisions

### Why Next.js?
- Easy deployment to Vercel
- Great for SEO (important for portfolios)
- Server-side rendering capabilities
- I already knew React basics

### Why Three.js + React Three Fiber?
- Three.js is industry standard
- R3F makes it work nicely with React
- Large community and good documentation
- Lots of examples to learn from

### Why Minimalist Design?
- Easier to build in 5 days
- Better performance
- Looks professional
- Doesn't distract from content

## What I Learned

### Technical Skills
1. **3D Graphics Fundamentals**
   - Scenes, cameras, and renderers
   - Lighting (ambient, directional, point lights)
   - Materials and geometries
   - Animation loops

2. **Performance Optimization**
   - Particle count matters a lot
   - Device pixel ratio affects performance
   - Dynamic imports prevent SSR issues
   - FPS monitoring is crucial

3. **React Three Fiber**
   - How to use Three.js in React
   - Component-based 3D scenes
   - Hooks like useFrame and useThree
   - Performance best practices

### Soft Skills
1. **Learning New Technologies**
   - Don't be afraid to start from zero
   - Documentation is your friend
   - Examples teach better than theory
   - Break complex problems into small steps

2. **Time Management**
   - Set daily goals
   - Don't get stuck on perfection
   - Know when to move on
   - Leave time for testing

## Challenges & Solutions

### Challenge 1: 3D Coordinate System
**Problem:** Coming from 2D CSS, the 3D coordinate system was confusing.

**Solution:** 
- Drew diagrams on paper
- Used console.log to see object positions
- Experimented with small changes
- Eventually it clicked!

### Challenge 2: Performance Issues
**Problem:** Initial version was laggy, especially on mobile.

**Solution:**
- Reduced particle count dramatically
- Implemented adaptive DPR
- Used simpler geometries
- Added FPS monitoring to track improvements

### Challenge 3: TypeScript Errors
**Problem:** Three.js types were complex and confusing.

**Solution:**
- Read type definitions carefully
- Used `as unknown as Type` when necessary
- Asked for help in Discord communities
- Learned proper typing patterns

### Challenge 4: Responsive 3D
**Problem:** 3D scene didn't resize properly on mobile.

**Solution:**
- Used window resize listeners
- Adjusted camera aspect ratio
- Made particle count adaptive
- Tested on real devices

## Code I'm Proud Of

### Frosted Glass Material
\`\`\`typescript
<meshPhysicalMaterial
  color="#4a9eff"
  transparent
  opacity={0.6}
  transmission={0.9}
  roughness={0.1}
  metalness={0.1}
  clearcoat={1}
  clearcoatRoughness={0.1}
/>
\`\`\`

This took hours to get right, but the effect is beautiful!

### Adaptive Particle Count
\`\`\`typescript
const particleCount = isMobile ? 50 : 150;
\`\`\`

Simple but effective - keeps mobile performant.

## Mistakes I Made

1. **Started with too many features** - Should have built MVP first
2. **Didn't test on mobile early** - Found performance issues late
3. **Overcomplicated the 3D scene** - Minimalist is better
4. **Ignored TypeScript errors** - Came back to bite me later

## What I'd Do Differently

1. **Start simpler** - Build basic version first, add complexity later
2. **Test mobile from day 1** - Performance matters
3. **Learn Three.js basics first** - Don't jump straight to R3F
4. **Use a design system** - Would save time on styling

## Future Improvements

1. **Add more projects** - Currently only showing 3
2. **Blog section** - Share what I learned
3. **Dark mode toggle** - Currently always dark
4. **Project detail pages** - More info about each project
5. **Better mobile optimization** - Could be even faster

## Resources That Helped

1. **Three.js Journey** - Best course for learning Three.js
2. **React Three Fiber Docs** - Clear examples
3. **Bruno Simon's Portfolio** - Inspiration
4. **Stack Overflow** - Saved me countless times
5. **Discord Communities** - Helpful people

## Conclusion

Building this portfolio in 5 days was challenging but rewarding. I went from zero 3D knowledge to deploying a working portfolio with smooth animations and good performance.

**Key Takeaways:**
- You can learn new technologies quickly with focus
- Performance matters, especially for 3D
- Start simple, add complexity gradually
- Documentation and testing are worth the time

**Stats:**
- 5 days of work
- 45 hours total
- 52 files created
- 100+ tests written
- 1 deployed portfolio ✨

Would I do it again? Absolutely! Next time I'll build something even more ambitious.

---

*Built by Abhinav Gontu | Jan 2026*
