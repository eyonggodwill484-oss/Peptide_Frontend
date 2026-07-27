"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POINTS_PER_STRAND = 22;
const RADIUS = 1.1;
const HEIGHT = 6.4;
const TURNS = 2.4;
const RUNG_STEP = 3;

function buildStrandPoints(offset: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < POINTS_PER_STRAND; i++) {
    const t = i / (POINTS_PER_STRAND - 1);
    const angle = t * Math.PI * 2 * TURNS + offset;
    const y = t * HEIGHT - HEIGHT / 2;
    points.push(new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS));
  }
  return points;
}

function HelixStrand({ offset, color }: { offset: number; color: string }) {
  const points = useMemo(() => buildStrandPoints(offset), [offset]);
  return (
    <group>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.35} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function HelixRungs() {
  const strandA = useMemo(() => buildStrandPoints(0), []);
  const strandB = useMemo(() => buildStrandPoints(Math.PI), []);

  const rungs = useMemo(() => {
    const result: { position: THREE.Vector3; quaternion: THREE.Quaternion; length: number }[] = [];
    for (let i = 0; i < strandA.length; i += RUNG_STEP) {
      const from = strandA[i];
      const to = strandB[i];
      const direction = to.clone().sub(from);
      const length = direction.length();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.clone().normalize()
      );
      result.push({ position: from.clone().lerp(to, 0.5), quaternion, length });
    }
    return result;
  }, [strandA, strandB]);

  return (
    <group>
      {rungs.map((rung, i) => (
        <mesh key={i} position={rung.position} quaternion={rung.quaternion}>
          <cylinderGeometry args={[0.02, 0.02, rung.length, 8]} />
          <meshStandardMaterial color="#a7d8ff" transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function HelixGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <HelixStrand offset={0} color="#5eead4" />
      <HelixStrand offset={Math.PI} color="#a78bfa" />
      <HelixRungs />
    </group>
  );
}

/** Slowly rotating double-helix — mounted client-side only via the DnaHelix wrapper. */
export function DnaHelixScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 3]} intensity={1.4} color="#8fd7ff" />
      <pointLight position={[-3, -2, -2]} intensity={0.7} color="#c4b5fd" />
      <HelixGroup />
    </Canvas>
  );
}
