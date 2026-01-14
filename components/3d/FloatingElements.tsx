/**
 * Minimalist Floating Elements - Clean Accent Geometry
 * 
 * Simple geometric shapes that add visual interest without clutter.
 * Refined, subtle animations that complement the minimalist design.
 */
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

/**
 * Clean floating geometric elements
 * 
 * Design strategy:
 * - Only 2 elements (was 3 - reduced for cleaner composition)
 * - Simple shapes (torus, octahedron)
 * - Slow, graceful movement
 * - Transparent, wireframe aesthetic
 */
export function FloatingElements() {
    const torus1Ref = useRef<Mesh>(null);
    const octahedronRef = useRef<Mesh>(null);

    /**
     * Elegant, slow animation loops
     * 
     * Each element has its own gentle orbit pattern.
     * Movements are slow and predictable - refined, not chaotic.
     */
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        // Torus: Slow horizontal orbit
        if (torus1Ref.current) {
            torus1Ref.current.position.x = Math.cos(time * 0.15) * 4;
            torus1Ref.current.position.z = Math.sin(time * 0.15) * 4;
            torus1Ref.current.rotation.x = time * 0.1;
            torus1Ref.current.rotation.y = time * 0.05;
        }

        // Octahedron: Slow vertical figure-eight
        if (octahedronRef.current) {
            octahedronRef.current.position.x = Math.sin(time * 0.2) * 3;
            octahedronRef.current.position.y = Math.sin(time * 0.3) * 2;
            octahedronRef.current.rotation.x = time * 0.08;
            octahedronRef.current.rotation.z = time * 0.12;
        }
    });

    return (
        <group>
            {/**
             * Torus - Wireframe Ghost
             * 
             * A thin torus ring that floats elegantly.
             * Wireframe mode creates a sophisticated, technical aesthetic.
             * 
             * Geometry: Torus (donut shape)
             * - radius: 0.5 (main ring size)
             * - tube: 0.15 (thickness of ring)
             * - segments: clean geometry
             * 
             * Material: Wireframe for modern, technical look
             * - color: Soft cyan (#0ea5e9)
             * - opacity: 0.2 (very subtle)
             * - wireframe: true (shows geometric structure)
             */}
            <mesh ref={torus1Ref} position={[-4, 2, -3]}>
                <torusGeometry args={[0.5, 0.15, 16, 32]} />
                <meshBasicMaterial
                    color="#0ea5e9"
                    transparent
                    opacity={0.2}
                    wireframe
                />
            </mesh>

            {/**
             * Octahedron - Diamond Shape
             * 
             * A rotating octahedron (8-sided polyhedron) adds geometric interest.
             * Subtle and elegant, complements the main hero object.
             * 
             * Geometry: Octahedron (diamond/gem shape)
             * - radius: 0.4 (modest size)
             * 
             * Material: Glass-like with soft glow
             * - color: Soft blue (#3b82f6)
             * - opacity: 0.15 (barely visible)
             * - emissive glow: Subtle accent
             */}
            <mesh ref={octahedronRef} position={[3, -2, -4]}>
                <octahedronGeometry args={[0.4]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    transparent
                    opacity={0.15}
                    emissive="#3b82f6"
                    emissiveIntensity={0.1}
                />
            </mesh>
        </group>
    );
}
