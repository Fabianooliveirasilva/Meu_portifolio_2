"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Holographic distorted sphere ─────────────────── */
function HolographicSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.18;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.28;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <Sphere args={[1.5, 100, 100]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.45}
            speed={2.5}
            roughness={0.05}
            metalness={0.9}
            wireframe={false}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

/* ── Orbiting ring ─────────────────────────────────── */
function OrbitRing({
  radius,
  color,
  speed,
  tilt,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 120]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

/* ── Floating particles around sphere ─────────────── */
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const positions = (() => {
    const arr = new Float32Array(600);
    for (let i = 0; i < 200; i++) {
      const theta = pseudoRandom(i + 1) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(i + 101) - 1);
      const r = 2.2 + pseudoRandom(i + 1001) * 1.5;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  })();

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#22d3ee"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Main 3D Scene ─────────────────────────────────── */
export default function HeroScene() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsLightMode(root.classList.contains("light"));

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      {/* Ambient and point lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={3} />
      <pointLight position={[-5, -5, -5]} color="#22d3ee" intensity={2} />
      <pointLight position={[0, 5, -5]} color="#a855f7" intensity={1.5} />

      {/* Star field */}
      {!isLightMode && (
        <Stars
          radius={80}
          depth={60}
          count={3000}
          factor={4}
          saturation={0.3}
          fade
          speed={0.5}
        />
      )}

      {/* Main holographic sphere */}
      <HolographicSphere />

      {/* Orbiting rings */}
      <OrbitRing radius={2.4} color="#22d3ee" speed={0.5} tilt={Math.PI / 4} />
      <OrbitRing radius={2.8} color="#a855f7" speed={-0.3} tilt={Math.PI / 6} />
      <OrbitRing radius={3.1} color="#f472b6" speed={0.2} tilt={Math.PI / 3} />

      {/* Floating particle cloud */}
      {!isLightMode && <FloatingParticles />}
    </Canvas>
  );
}
