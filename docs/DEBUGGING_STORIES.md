# Debugging Stories: My 5-Day Learning Journey

## Introduction

During my 5 days building this 3D portfolio, I ran into many bugs and challenges. Coming from a backend background (Kafka, microservices, distributed systems), debugging 3D graphics was completely new to me. Here are the most interesting problems I faced and how I solved them.

## Story 1: The Invisible 3D Scene

**Day 1, Hour 3**

### Situation
I had just installed Three.js and React Three Fiber. I followed a tutorial to create my first 3D cube, but when I ran the app, I saw... nothing. Just a black screen. No errors in the console, no warnings, nothing.

### Task
I needed to figure out why my 3D scene wasn't rendering and get something - anything - to show up on screen.

### Action
1. **Checked the basics**: Opened browser dev tools, looked for errors. Nothing.
2. **Added console.logs**: Put logs in my Scene component to see if it was even rendering. It was!
3. **Inspected the DOM**: The canvas element was there, but it was 0px × 0px.
4. **Realized the problem**: I hadn't set a height on the canvas container!
5. **Fixed it**: Added `className="h-screen"` to the container div.

### Result
The cube appeared! I learned that 3D canvases need explicit dimensions. This seems obvious now, but as someone used to backend work where "rendering" means JSON responses, it wasn't intuitive.

**Lesson:** Always check element dimensions when working with canvas elements.

---

## Story 2: The Performance Disaster

**Day 2, Evening**

### Situation
I had added a particle system with 500 particles. It looked amazing on my MacBook Pro, but when I tested on my phone, it was a slideshow - maybe 5 fps. The page was basically unusable.

### Task
I needed to make the 3D scene perform well on mobile devices without sacrificing too much visual quality.

### Action
1. **Added FPS monitoring**: Created a simple hook to track frames per second
   \`\`\`typescript
   const fps = useRef(0);
   useFrame(() => {
     fps.current = 1 / delta;
   });
   \`\`\`

2. **Tested different particle counts**:
   - 500 particles: 5 fps on mobile ❌
   - 300 particles: 15 fps on mobile ❌
   - 150 particles: 30 fps on mobile ✅
   - 50 particles: 45 fps on mobile ✅

3. **Implemented adaptive rendering**:
   \`\`\`typescript
   const particleCount = isMobile ? 50 : 150;
   \`\`\`

4. **Added device pixel ratio optimization**:
   \`\`\`typescript
   dpr={[1, isMobile ? 1.5 : 2]}
   \`\`\`

### Result
Mobile performance improved dramatically. Desktop users still got the full experience with 150 particles, while mobile users got a lighter version with 50. FPS went from 5 → 30-45 on mobile.

**Lesson:** 3D graphics are expensive. Always test on the lowest-end device you're targeting.

---

## Story 3: The TypeScript Nightmare

**Day 2, Late Night**

### Situation
I was trying to access properties on a Three.js mesh object, but TypeScript kept throwing errors:
\`\`\`
Property 'rotation' does not exist on type 'Object3D'
\`\`\`

But I could see in the Three.js docs that meshes definitely have a rotation property!

### Task
Figure out why TypeScript wasn't recognizing valid Three.js properties and fix the type errors without using `any`.

### Action
1. **Read the error carefully**: TypeScript was treating my ref as `Object3D` instead of `Mesh`
2. **Checked my ref typing**:
   \`\`\`typescript
   const meshRef = useRef<THREE.Object3D>(null); // Wrong!
   \`\`\`
3. **Fixed the type**:
   \`\`\`typescript
   const meshRef = useRef<THREE.Mesh>(null); // Correct!
   \`\`\`
4. **Learned about the Three.js type hierarchy**:
   - Object3D is the base class
   - Mesh extends Object3D
   - Need to use the most specific type

### Result
All TypeScript errors disappeared. I learned to be more specific with Three.js types instead of using the base Object3D class.

**Lesson:** Use the most specific type available. Three.js has a deep class hierarchy.

---

## Story 4: The Coordinate Confusion

**Day 3, Morning**

### Situation
I was trying to position floating elements around my main 3D object. I set `position={[5, 0, 0]}` expecting it to appear to the right, but it appeared in a completely different place. I spent an hour moving things around randomly.

### Task
Understand the 3D coordinate system and position objects where I actually wanted them.

### Action
1. **Drew it on paper**: Sketched the X, Y, Z axes
   - X: left (-) to right (+)
   - Y: down (-) to up (+)
   - Z: back (-) to front (+)

2. **Added visual helpers**:
   \`\`\`typescript
   <axesHelper args={[5]} />
   <gridHelper args={[10, 10]} />
   \`\`\`

3. **Experimented systematically**:
   - Changed only X: object moved left/right ✓
   - Changed only Y: object moved up/down ✓
   - Changed only Z: object moved forward/back ✓

4. **Created a mental model**: Imagined standing in the scene, looking at the camera

### Result
I could now position objects intuitively. The axes helpers were crucial - I kept them during development and removed them later.

**Lesson:** Use visual debugging tools. Don't try to imagine 3D space in your head.

---

## Story 5: The Icon Size Catastrophe

**Day 4, Afternoon**

### Situation
On the contact page, my SVG icons (email, LinkedIn, GitHub) were rendering HUGE - like 500px × 500px. They were supposed to be small 20px icons. I had added Tailwind classes `w-5 h-5` but they weren't working.

### Task
Figure out why Tailwind sizing wasn't working on SVG elements and fix the icon sizes.

### Action
1. **Inspected the element**: The SVG had `w-5 h-5` classes but was still huge
2. **Checked computed styles**: The width/height weren't being applied
3. **Researched SVG sizing**: Learned that SVGs sometimes ignore CSS dimensions
4. **Tried different approaches**:
   - Inline styles: Didn't work
   - Parent container sizing: Didn't work
   - Explicit SVG attributes: Worked! ✓

5. **Added explicit dimensions**:
   \`\`\`typescript
   <svg className="w-5 h-5" width="20" height="20" viewBox="0 0 24 24">
   \`\`\`

### Result
Icons rendered at the correct size. I learned that SVG elements sometimes need both CSS classes AND explicit width/height attributes.

**Lesson:** SVGs are special. When CSS doesn't work, try explicit attributes.

---

## Story 6: The SSR Error

**Day 3, Evening**

### Situation
My app worked fine in development, but when I tried to build for production (`npm run build`), I got an error:
\`\`\`
ReferenceError: window is not defined
\`\`\`

This was confusing because I wasn't directly using `window` anywhere.

### Task
Figure out why the production build was failing and fix it without breaking the development experience.

### Action
1. **Understood the problem**: Next.js does server-side rendering (SSR), but Three.js needs the browser's `window` object
2. **Found the culprit**: My 3D components were being rendered on the server
3. **Researched solutions**: Found Next.js dynamic imports with `ssr: false`
4. **Implemented the fix**:
   \`\`\`typescript
   const Scene = dynamic(
     () => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })),
     { ssr: false }
   );
   \`\`\`

5. **Tested the build**: Success! ✓

### Result
Production build worked. The 3D scene only renders on the client side now, which is exactly what we want.

**Lesson:** When using browser-only libraries with Next.js, use dynamic imports with `ssr: false`.

---

## Common Patterns I Noticed

After solving these bugs, I noticed some patterns:

### 1. Visual Debugging is Key
- Use `console.log` for logic
- Use visual helpers (axes, grids) for 3D
- Use browser dev tools for CSS/DOM

### 2. Start Simple, Add Complexity
- Get one thing working first
- Add features incrementally
- Don't try to debug multiple issues at once

### 3. Read Error Messages Carefully
- TypeScript errors usually point to the exact problem
- Three.js warnings often suggest solutions
- Google the exact error message

### 4. Test Early and Often
- Test on mobile early
- Test the production build early
- Don't wait until the end

## Tools That Helped

1. **React DevTools** - Inspecting component state
2. **Three.js Inspector** - Chrome extension for 3D debugging
3. **Console.log** - Old reliable
4. **Browser Performance Tab** - Finding bottlenecks
5. **TypeScript** - Caught many bugs before runtime

## What I'd Do Differently

1. **Add debugging helpers earlier** - Would have saved hours
2. **Test on mobile from day 1** - Found issues too late
3. **Read Three.js docs more carefully** - Many answers were there
4. **Ask for help sooner** - Discord communities are helpful

## Conclusion

Debugging 3D graphics was very different from debugging backend systems. Instead of looking at logs and database queries, I was inspecting 3D coordinates and frame rates. But the fundamental approach was the same:

1. Reproduce the problem
2. Form a hypothesis
3. Test the hypothesis
4. Fix and verify

The biggest difference? Visual debugging tools are essential for 3D work. You can't just read logs - you need to see what's happening in 3D space.

---

*These stories are from my 5-day journey building this portfolio. Every bug taught me something new about 3D web graphics.*
