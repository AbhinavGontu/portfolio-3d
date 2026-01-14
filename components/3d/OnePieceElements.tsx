/**
 * One Piece Themed 3D Elements
 * 
 * Adds anime-inspired graphics with pirate/nautical theme
 * - Straw Hat colors (red, yellow)
 * - Treasure chest geometry
 * - Compass rose
 * - Ocean wave particles
 */
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

export function OnePieceElements() {
    const treasureRef = useRef<Mesh>(null);
    const compassRef = useRef<Mesh>(null);
    const wheelRef = useRef<Mesh>(null);

    /**
     * Animate the One Piece themed elements
     * - Treasure chest bobs up and down
     * - Compass rotates slowly
     * - Ship wheel spins
     */
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        // Treasure chest - bobbing motion like floating on water
        if (treasureRef.current) {
            treasureRef.current.position.y = Math.sin(time * 0.5) * 0.3 + 1;
            treasureRef.current.rotation.y = time * 0.2;
        }

        // Compass - slow rotation
        if (compassRef.current) {
            compassRef.current.rotation.z = time * 0.3;
        }

        // Ship wheel - spinning
        if (wheelRef.current) {
            wheelRef.current.rotation.z = time * 0.4;
        }
    });

    return (
        <group>
            {/**
             * Treasure Chest
             * Golden chest with red accents (Straw Hat colors)
             * Positioned to the right
             */}
            <mesh ref={treasureRef} position={[4, 1, -2]}>
                <boxGeometry args={[0.6, 0.4, 0.4]} />
                <meshStandardMaterial
                    color="#FFD700"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#FF6B00"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/**
             * Compass Rose
             * Red and black (Luffy's colors)
             * Positioned to the left
             */}
            <mesh ref={compassRef} position={[-4, -1, -3]}>
                <torusGeometry args={[0.5, 0.1, 8, 4]} />
                <meshStandardMaterial
                    color="#DC143C"
                    metalness={0.6}
                    roughness={0.3}
                    emissive="#DC143C"
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/**
             * Ship Wheel
             * Classic pirate ship wheel
             * Positioned in the back
             */}
            <group ref={wheelRef} position={[0, 2, -5]}>
                {/* Center hub */}
                <mesh>
                    <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
                    <meshStandardMaterial
                        color="#8B4513"
                        roughness={0.8}
                    />
                </mesh>

                {/* Spokes */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.cos((i * Math.PI) / 4) * 0.3,
                            0,
                            Math.sin((i * Math.PI) / 4) * 0.3
                        ]}
                        rotation={[0, (i * Math.PI) / 4, 0]}
                    >
                        <boxGeometry args={[0.05, 0.05, 0.6]} />
                        <meshStandardMaterial color="#8B4513" />
                    </mesh>
                ))}

                {/* Outer ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.6, 0.05, 8, 32]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
            </group>

            {/**
             * Straw Hat Accent
             * Yellow torus representing Luffy's iconic hat
             */}
            <mesh position={[2, -2, -2]} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.4, 0.08, 16, 32]} />
                <meshStandardMaterial
                    color="#FFD700"
                    emissive="#FFD700"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/**
             * Pirate Flag Colors
             * Red sphere with black outline (Jolly Roger inspired)
             */}
            <mesh position={[-2, 2, -4]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial
                    color="#DC143C"
                    emissive="#DC143C"
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/**
             * Ocean Wave Effect
             * Blue-tinted particles suggesting ocean
             */}
            <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20, 32, 32]} />
                <meshStandardMaterial
                    color="#1E90FF"
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </mesh>
        </group>
    );
}
