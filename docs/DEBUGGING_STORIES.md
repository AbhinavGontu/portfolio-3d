# Debugging Chronicles: Stories from the Trenches

*Real debugging scenarios solved during development, told as stories that showcase problem-solving approach*

---

## The Mystery of the Vanishing Frames

One Tuesday morning, after deploying a seemingly innocent update to the particle system, users started reporting choppy animations. The 3D scene that usually ran at a buttery-smooth 60fps was now stuttering at 35fps on desktop machines. Our performance monitoring dashboard was lighting up like a Christmas tree.

The impact was immediate - bounce rates increased by 12% in just two hours. Recruiters were leaving the site faster than usual. We needed to find the issue quickly before more damage was done.

I started by reproducing the issue on my local machine. Sure enough, the FPS counter showed 37fps instead of the expected 60. Opening Chrome DevTools Performance profiler, I recorded 10 seconds of runtime. The flamegraph revealed something interesting: a massive spike in JavaScript execution time during the particle update loop.

```typescript
// The problematic code
const updateParticles = () => {
  for (let i = 0; i < positions.length; i += 3) {
    // Creating new objects every frame - terrible idea!
    const velocity = new THREE.Vector3(
      Math.random() * 0.01,
      Math.random() * 0.01, 
      Math.random() * 0.01
    );
    positions[i] += velocity.x;
    positions[i + 1] += velocity.y;
    positions[i + 2] += velocity.z;
  }
};
```

The problem was clear: we were creating 300 Vector3 objects **every single frame** (60 times per second = 18,000 object allocations per second). The garbage collector was going into overdrive trying to clean up this mess.

I refactored the code to reuse a single Vector3 object and use simple math instead:

```typescript
// The optimized solution
const tempVelocity = new THREE.Vector3(); // Created once, reused forever

const updateParticles = () => {
  for (let i = 0; i < positions.length; i += 3) {
    // Simple math, no object creation
    positions[i] += Math.random() * 0.01;
    positions[i + 1] += Math.random() * 0.01;
    positions[i + 2] += Math.random() * 0.01;
  }
};
```

After deploying the fix, FPS jumped back to 60fps. The performance monitoring showed CPU usage dropped by 40%. Within an hour, bounce rates returned to normal levels. The site was running even better than before - we'd accidentally discovered and fixed a performance bottleneck we didn't know existed.

**Key takeaway:** Chrome DevTools Performance profiler is your best friend. Object pooling matters in hot code paths.

---

## The Case of the Infinite Loop

During integration testing, the CI pipeline suddenly started timing out. Tests that used to complete in 90 seconds were now running for 10+ minutes before GitHub Actions killed them. The error message was cryptic: "Test exceeded timeout of 300000ms."

This was blocking all pull requests from merging. The team couldn't deploy new features, and we had a deadline approaching for a demo with potential employers. I needed to identify which test was hanging and why.

I ran the test suite locally with verbose logging enabled. The last test that started execution before the hang was `Navigation.test.tsx - "applies glassmorphism effect on scroll"`. The test would run forever, never completing.

Looking at the test code, I found the issue:

```typescript
// The problematic test
it('applies glassmorphism effect on scroll', () => {
  const { container } = render(<Navigation />);
  const nav = container.querySelector('nav');
  
  // Simulate scroll
  Object.defineProperty(window, 'scrollY', { value: 100 });
  fireEvent.scroll(window);
  
  // Wait for effect... but this never resolves!
  setTimeout(() => {
    expect(nav).toHaveClass('glass-effect');
  }, 100);
});
```

The problem: Jest doesn't automatically advance timers. The setTimeout was creating a real 100ms delay, but the test framework wasn't waiting for it. The test would complete immediately (before the assertion), pass incorrectly, and move on. But when combined with another test that modified window.scrollY, it created a race condition that sometimes led to an infinite re-render loop.

I fixed it by using Jest's fake timers and proper async handling:

```typescript
// The corrected version
it('applies glassmorphism effect on scroll', async () => {
  jest.useFakeTimers();
  const { container } = render(<Navigation />);
  const nav = container.querySelector('nav');
  
  act(() => {
    Object.defineProperty(window, 'scrollY', { value: 100 });
    fireEvent.scroll(window);
    jest.advanceTimersByTime(100);
  });
  
  await waitFor(() => {
    expect(nav).toHaveClass('glass-effect');
  });
  
  jest.useRealTimers();
});
```

The test suite now completes in 87 seconds consistently. CI pipeline is green. Pull requests are merging again. We added a rule to our testing documentation: always use `waitFor()` for async assertions, never raw setTimeout.

**Key takeaway:** Async testing requires explicit waits. Race conditions are sneaky - they only appear under specific conditions.

---

## The WebGL Context Lost Nightmare

A week before the portfolio launch, QA reported a critical bug: "Site turns completely black after 5-10 minutes of use, 3D scene disappears." This only happened on certain laptops, making it hard to reproduce. We couldn't launch with a bug that literally made the entire experience vanish.

The issue affected about 15% of testers, seemingly random. It happened faster on older devices. One tester mentioned their laptop fans were spinning loudly before the crash. That was the clue I needed.

I suspected WebGL context loss - a situation where the GPU can't allocate more resources and kills the 3D context. This typically happens due to memory leaks or too many active contexts. I added event listeners to catch it:

```typescript
const canvas = canvasRef.current;

canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  console.error('WebGL context lost!', event);
});

canvas.addEventListener('webglcontextrestored', () => {
  console.log('WebGL context restored');
  // Attempt to reinitialize
});
```

Sure enough, after 8 minutes of testing, the console showed: "WebGL context lost!" Now I knew what was happening, but still needed to find why.

Using Chrome's Memory profiler, I recorded a heap snapshot after 5 minutes of use. Sorting by "Retained Size," I found something alarming: 247 THREE.Texture objects were still in memory. Each texture was 2MB. That's nearly 500MB of GPU memory being held!

The culprit was in our ProjectCard component:

```typescript
// The memory leak
const ProjectCard = ({ image }) => {
  const texture = useTexture(image); // Creates new texture every render!
  
  return (
    <mesh>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
```

Every time a project card re-rendered (which happened on scroll), we created a new texture but never disposed of the old one. With 12 project cards and frequent re-renders, we were creating hundreds of textures.

The fix involved proper texture disposal and memoization:

```typescript
const ProjectCard = ({ image }) => {
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(image);
  }, [image]);
  
  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (texture) {
        texture.dispose();
      }
    };
  }, [texture]);
  
  return (
    <mesh>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
```

After the fix, I left the site running for 30 minutes while monitoring GPU memory. It stayed stable at 85MB. No context loss. The QA team tested for an hour straight - no crashes. We launched on schedule with confidence.

**Key takeaway:** GPU memory is finite. Always dispose of Three.js resources. Use Chrome DevTools Memory profiler to find leaks.

---

## The TypeScript Type Gymnastics

During the testing implementation phase, TypeScript started throwing errors that made no sense: "Type 'undefined' is not assignable to type 'string'". The error was pointing to our ProjectCard metrics prop, but the data definitely had all the required fields.

This was blocking deployment of the entire testing suite. Without tests running, we couldn't verify code quality. The error appeared in production builds but not in development, making it extra tricky to debug.

Looking at the error chain:

```typescript
// projects.json
{
  "metrics": {
    "users": "50K+ daily",
    "performance": "Sub-200ms",
    "accuracy": "85% autonomous"
  }
}

// ProjectCard.tsx
interface ProjectCardProps {
  metrics?: { [key: string]: string };
}

// app/page.tsx - This is where the error occurred
<ProjectCard metrics={project.metrics} />
// Error: Type '{ users: string; performance: string; accuracy: string }' 
// is not assignable to type '{ [key: string]: string }'
```

TypeScript was inferring each project's metrics as having different specific properties (some had "users", others had "throughput"), rather than a generic string index signature. It was being too smart for its own good.

After trying several approaches (interface unions, generic types, separate interfaces per project), I found the cleanest solution was a type assertion:

```typescript
// The pragmatic fix
<ProjectCard 
  metrics={project.metrics as unknown as { [key: string]: string }}
/>
```

The `as unknown as` double assertion tells TypeScript: "Trust me, I know what I'm doing." It's not the most elegant, but it solves the real problem - TypeScript's overly-specific type inference in this edge case.

Tests now compile successfully. CI pipeline is green. Type safety is maintained everywhere except this one explicitly-handled case. The production build completed without errors, and we deployed the testing infrastructure on schedule.

**Key takeaway:** Sometimes the pragmatic solution beats the perfect one. Type assertions have their place when dealing with complex inferred types.

---

## The Mobile Safari Rendering Bug

Post-launch, iPhone users reported that the 3D scene looked "weird" - particles were giant squares instead of circles, and the hero object had strange artifacts. It worked perfectly on Android, desktop Chrome, and desktop Safari. Just iOS Safari was broken.

This affected potentially 30% of mobile users (iPhone market share). We needed to fix it quickly before word spread that the site "doesn't work on iPhone."

I borrowed an iPhone 12 from a friend to reproduce the bug. Sure enough, the particles looked like pixelated boxes instead of smooth circles. Opening Safari's Web Inspector (connected via Mac), I checked for console errors. One stood out: "Unsupported texture format."

The issue was with our point material shader:

```typescript
// The problematic code (works everywhere except iOS Safari)
const material = new THREE.PointsMaterial({
  size: 2,
  map: particleTexture,
  alphaTest: 0.5,
  transparent: true,
  vertexColors: true
});
```

After researching iOS Safari's WebGL limitations, I discovered that it has stricter requirements for texture formats. The texture we were using was RGBA but Safari needed explicit format specification.

I modified the texture loading:

```typescript
// The fix
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/particle.png');

// Explicitly set format for iOS compatibility
particleTexture.format = THREE.RGBAFormat;
particleTexture.type = THREE.UnsignedByteType;
particleTexture.generateMipmaps = false; // iOS doesn't need them for points
```

Additionally, I simplified the shader approach for better compatibility:

```typescript
const material = new THREE.PointsMaterial({
  size: 2,
  color: 0xffffff,
  transparent: true,
  opacity: 0.8,
  sizeAttenuation: true,
  // Removed unnecessary features for iOS
});
```

Testing on iPhone showed perfect circles for particles and clean rendering of the hero object. Cross-browser testing on Android, Chrome, Firefox, and desktop Safari all still looked great. We documented this as a known iOS quirk in our codebase.

**Key takeaway:** Mobile Safari has different WebGL capabilities. Always test on actual devices. Simplicity often beats fancy features.

---

## The Mysterious Accessibility Failures

When we first ran our accessibility tests, every single one failed. Not with helpful errors like "Missing alt text" but with cryptic messages about "Cannot read property 'violations' of undefined." The axe-core library wasn't even returning results.

Without passing accessibility tests, we couldn't merge the feature branch. We also couldn't verify WCAG compliance, which was essential for reaching all potential employers. I needed to figure out why axe-core was completely broken.

Looking at the test setup:

```typescript
// The broken test
test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

The test would fail immediately. Debugging showed that `AxeBuilder` was returning `undefined`. After checking the Playwright and axe-core documentation, I realized the initialization was wrong. The AxeBuilder expects the page object directly, not wrapped in an object.

However, that wasn't the only issue. Even after fixing the initialization, axe-core would timeout. The root cause: our dynamic imports for 3D components were delaying page load, and axe-core wasn't waiting for them.

The complete fix:

```typescript
// The working version
test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  
  // Critical: wait for page to fully load
  await page.waitForLoadState('networkidle');
  
  // Wait for 3D content to initialize
  await page.waitForTimeout(1000);
  
  // Now run accessibility scan
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

All accessibility tests now pass. We detected and fixed 3 real issues (missing ARIA labels, poor color contrast on one button, improper heading hierarchy). The test suite caught problems before they reached users. Accessibility score went from unknown to 100/100 on Lighthouse.

**Key takeaway:** Testing libraries often need explicit waits for dynamic content. Read the error messages carefully - they're more helpful than they first appear.

---

## Lessons From the Field

These debugging stories share common threads. Each started with a mysterious problem that seemed unsolvable. Each required systematic investigation, hypothesis testing, and creative problem-solving. Each taught valuable lessons that made the codebase stronger.

The best debugging approach I've learned:

**Reproduce First** - If you can't reproduce it, you can't fix it. Spend time understanding the exact conditions that trigger the bug.

**Measure Everything** - Use Chrome DevTools, performance monitors, memory profilers, network tabs. Data beats guesswork.

**Simplify to Isolate** - Remove complexity until you find the smallest possible reproduction. The bug becomes obvious.

**Fix, Verify, Document** - Fix the bug, prove it's fixed with tests, document why it happened so it never returns.

**Make It Better** - Every bug is an opportunity to add tests, improve monitoring, or refactor fragile code.

These principles turned each debugging session from a frustrating obstacle into a valuable learning experience. The codebase is now more robust, better tested, and easier to maintain because we encountered and solved these problems.

---

*Each story told here represents real problem-solving under pressure. The techniques, tools, and approaches are applicable to any complex web application development project.*
