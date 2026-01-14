/**
 * Minimalist Particle System - Subtle and Elegant
 * 
 * A refined particle system that creates ambient atmosphere without
 * overwhelming the design. Fewer particles, subtle movement, clean aesthetic.
 */
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import * as THREE from "three";

/**
 * Elegant particle system with minimal, sophisticated movement
 * 
 * Design approach:
 * - Fewer particles (quality over quantity)
 * - Subtle, slow movement (refined, not chaotic)
 * - Small, delicate particles (elegant dots)
 * - Soft opacity (ambient, not distracting)
 */
export function ParticleSystem() {
    const pointsRef = useRef<THREE.Points>(null);
    const isMobile = useIsMobile();

    /**
     * Generate particle positions - spread in clean 3D space
     * 
     * Particle count strategy:
     * - Desktop: 150 particles (was 300 - reduced for cleaner look)
     * - Mobile: 50 particles (minimal for performance)
     * 
     * Distribution: Random but constrained to a sphere around the camera
     * This creates depth without clutter.
     */
    const particleCount = isMobile ? 50 : 150;

    const positions = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Spherical distribution for natural, balanced look
            const radius = 8 + Math.random() * 6; // Between 8-14 units from center
            const theta = Math.random() * Math.PI * 2; // Horizontal angle
            const phi = Math.acos(2 * Math.random() - 1); // Vertical angle

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
            positions[i * 3 + 2] = radius * Math.cos(phi); // z
        }

        return positions;
    }, [particleCount]);

    /**
     * Subtle rotation animation - barely perceptible
     * 
     * The entire particle field rotates very slowly, creating
     * gentle movement that adds life without distraction.
     * 
     * Speed: 0.0002 = takes ~85 minutes for full rotation
     * This is intentionally glacial - creates ambient motion.
     */
    useFrame(() => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y += 0.0002;
        pointsRef.current.rotation.x += 0.0001;
    });

    return (
        <Points
            ref={pointsRef}
            positions={positions}
            stride={3}
            frustumCulled={false}
        >
            {/**
             * Point Material - Soft and Minimal
             * 
             * Properties chosen for elegance:
             * - size: 0.03 = tiny dots, delicate appearance
             * - color: white (#ffffff) = clean, neutral
             * - opacity: 0.4 = subtle presence, not dominant
             * - transparent: true = enables opacity
             * - sizeAttenuation: true = particles shrink with distance (depth cue)
             * - blending: AdditiveBlending = soft glow effect
             * 
             * Result: Barely visible dots that add atmosphere without
             * competing with content or hero object.
             */}
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.03}
                opacity={0.4}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </Points>
    );
}
