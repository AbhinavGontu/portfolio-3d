/**
 * 3D Scene Component - WebGL Canvas Container
 *
 * This component establishes the Three.js rendering context for all 3D elements.
 * It handles critical performance optimizations, responsive behavior, and lighting setup.
 * 
 * Marked as "use client" because Three.js requires browser APIs (WebGL, canvas).
 */
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

interface SceneProps {
    children?: React.ReactNode;
}

/**
 * Main 3D scene container using React Three Fiber
 * 
 * This component creates a WebGL-powered 3D environment that sits as a fixed
 * background behind all page content, providing an immersive visual experience
 * without interfering with normal page scrolling and interaction.
 * 
 * Key architectural decisions:
 * - Fixed positioning (z-index: -1) keeps 3D content in background
 * - Adaptive DPR balances visual quality with performance across devices
 * - Three-point lighting creates professional, dimensional appearance
 * - Suspense boundaries prevent blocking of main content during asset loading
 */
export function Scene({ children }: SceneProps) {
    const isMobile = useIsMobile();

    return (
        <Canvas
            shadows
            /**
             * Device Pixel Ratio (DPR) Optimization
             * 
             * DPR determines render resolution - higher values = sharper but slower.
             * 
             * Mobile: [1, 1.5]
             * - Minimum 1x (standard resolution) for battery/performance
             * - Maximum 1.5x for moderate quality on capable devices
             * - Avoids expensive 2x rendering on phones with limited GPU
             * 
             * Desktop: [1, 2]
             * - Minimum 1x as fallback for older hardware
             * - Maximum 2x for Retina/4K displays where GPU can handle it
             * - Automatically adapts based on device capabilities
             * 
             * This adaptive approach maintains 60fps across devices while
             * maximizing visual quality when hardware permits.
             */
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            /**
             * Performance scaling configuration
             * 
             * If frame rate drops below target (60fps desktop, 30fps mobile),
             * React Three Fiber can automatically reduce render quality down
             * to 50% (min: 0.5) to maintain smooth animation.
             * 
             * This prevents choppy experiences on lower-end devices by
             * sacrificing some visual fidelity for consistent frame timing.
             */
            performance={{ min: 0.5 }}
            /**
             * Fixed positioning strategy
             * 
             * The canvas is positioned as a fixed background layer:
             * - position: fixed - doesn't scroll with page content
             * - top/left: 0 - covers entire viewport from top-left corner
             * - width/height: 100% - fills entire browser window
             * - zIndex: -1 - renders behind all HTML content
             * 
             * This creates the illusion of 3D content "behind" the page,
             * visible through transparent backgrounds of UI elements.
             */
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: -1,
            }}
        >
            {/**
             * Camera Configuration
             * 
             * position: [0, 0, 8] - Camera is 8 units back from origin on Z-axis
             *                       This provides good view distance for hero object
             * 
             * fov: Field of view angle
             * - Mobile: 65° - Wider angle fits more on small screens
             * - Desktop: 50° - Narrower angle for better perspective on large screens
             * 
             * makeDefault: Makes this the primary camera for the scene
             */}
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={isMobile ? 65 : 50} />

            {/**
             * Three-Point Lighting Setup
             * 
             * Professional 3D lighting uses three light sources for depth and dimension:
             * 
             * 1. Ambient Light (base illumination)
             *    - intensity: 0.3 (30% brightness)
             *    - Provides soft, non-directional fill to prevent pure black shadows
             *    - Ensures all surfaces are at least slightly visible
             * 
             * 2. Directional Light (key light - main light source)
             *    - position: [10, 10, 5] (upper-right, slightly forward)
             *    - intensity: 1.0 (100% brightness)
             *    - castShadow: true for realistic depth perception
             *    - Shadow quality: 1024x1024 (good balance of quality vs performance)
             *    - This is the "sun" of the scene, creating primary shadows
             * 
             * 3. Point Light (fill light - reduces harsh shadows)
             *    - position: [-10, -10, -5] (lower-left, behind)
             *    - intensity: 0.5 (50% brightness)
             *    - color: blue (#3b82f6) for cool-toned subtle fill
             *    - Softens shadows from the key light, adds visual interest
             * 
             * 4. Point Light (rim light - edge highlighting)
             *    - position: [0, 5, -10] (above, behind camera)
             *    - intensity: 0.3 (30% brightness)
             *    - color: magenta (#d946ef) for vibrant edge glow
             *    - Creates subtle outline on objects, separates them from background
             * 
             * This lighting arrangement creates professional, dimensional rendering
             * that's visually interesting without being overwhelming or distracting.
             */}
            <ambientLight intensity={0.3} />

            <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />

            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />

            <pointLight position={[0, 5, -10]} intensity={0.3} color="#d946ef" />

            {/**
             * Suspense Boundary for 3D Content
             * 
             * Wraps children in React Suspense to handle async loading of:
             * - 3D models (.glb/.gltf files)
             * - Textures (images for materials)
             * - Shaders (compiled GPU programs)
             * 
             * fallback={null} means no loading indicator - content seamlessly
             * appears when ready rather than showing a spinner that would
             * distract from the polished experience.
             */}
            <Suspense fallback={null}>{children}</Suspense>

            {/**
             * Camera Controls (Limited Interaction)
             * 
             * OrbitControls allows subtle camera movement, but we've restricted
             * most controls to prevent users from breaking the designed view:
             * 
             * - enableZoom: false - No zooming (maintains designed framing)
             * - enablePan: false - No panning (keeps camera centered)
             * - maxPolarAngle: π/2 - Locks vertical rotation to horizon
             * - minPolarAngle: π/2 - Prevents camera from going above/below
             * - autoRotate: false - No automatic rotation (reduces motion sickness)
             * 
             * This configuration maintains the portfolio's professional, controlled
             * aesthetic while still allowing users to orbit slightly if they click
             * and drag (adding subtle interactivity without chaos).
             */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
                autoRotate={false}
            />
        </Canvas>
    );
}
