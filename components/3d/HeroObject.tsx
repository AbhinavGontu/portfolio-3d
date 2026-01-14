/**
 * Minimalist Geometric Object - Clean and Sophisticated
 * 
 * A refined, elegant 3D object that emphasizes simplicity and modern design.
 * Uses subtle animations and premium materials for a professional aesthetic.
 */
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

/**
 * Clean, minimalist hero object with sophisticated materials
 * 
 * Design philosophy:
 * - Simple geometric form (icosahedron - clean, mathematical shape)
 * - Subtle rotation (professional, not distracting)
 * - Premium glass-like material (elegant, modern)
 * - Minimal animation (refined movement)
 */
export function HeroObject() {
    const meshRef = useRef<Mesh>(null);

    /**
     * Subtle animation loop - minimal and elegant
     * 
     * Single slow rotation on Y-axis creates gentle, hypnotic motion
     * that feels premium and intentional rather than busy or distracting.
     * 
     * Rotation speed: 0.001 = completes rotation every ~100 seconds  
     * This is slow enough to be barely perceptible but adds life to the scene.
     */
    useFrame(() => {
        if (!meshRef.current) return;

        // Subtle continuous rotation - elegant and minimal
        meshRef.current.rotation.y += 0.001;
        meshRef.current.rotation.x += 0.0005;
    });

    return (
        <group>
            {/**
             * Main Geometric Shape - Icosahedron
             * 
             * Icosahedron chosen for its:
             * - Clean, mathematical aesthetic
             * - Balanced, symmetrical form
             * - Professional appearance
             * - Recognizable silhouette
             * 
             * args: [radius, detail level]
             * - radius: 1.5 = moderately sized, not overwhelming
             * - detail: 1 = smooth but not overly complex (performance)
             */}
            <mesh ref={meshRef} castShadow receiveShadow>
                <icosahedronGeometry args={[1.5, 1]} />

                {/**
                 * Glass-like Material - Premium and Sophisticated
                 * 
                 * This material creates a frosted glass appearance that feels
                 * premium and modern, similar to Apple's design language.
                 * 
                 * Properties:
                 * - color: Soft blue-white (#e0f2fe) - clean, tech-forward
                 * - metalness: 0.1 - mostly non-metallic (glass-like)
                 * - roughness: 0.2 - slightly rough (frosted glass effect)
                 * - transmission: 0.9 - highly transparent (glass property)
                 * - thickness: 0.5 - subtle volume to glass
                 * - transparent: true - enables see-through effect
                 * - opacity: 0.6 - 40% opaque (frosted appearance)
                 * 
                 * The result: A sophisticated frosted glass object that
                 * catches light beautifully and feels premium.
                 */}
                <meshPhysicalMaterial
                    color="#e0f2fe"
                    metalness={0.1}
                    roughness={0.2}
                    transmission={0.9}
                    thickness={0.5}
                    transparent={true}
                    opacity={0.6}
                />
            </mesh>

            {/**
             * Inner Core - Subtle Accent
             * 
             * A smaller sphere inside adds depth and visual interest
             * without compromising the minimalist aesthetic.
             * 
             * Properties:
             * - scale: 0.3 = much smaller than main object
             * - emissive glow: Soft cyan (#0ea5e9) adds color accent
             * - Low intensity: Subtle, not overwhelming
             */}
            <mesh scale={0.3}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#0ea5e9"
                    emissive="#0ea5e9"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </group>
    );
}
