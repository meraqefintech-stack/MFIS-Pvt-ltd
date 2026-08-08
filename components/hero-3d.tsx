'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial 
          color="#b87333" 
          envMapIntensity={2} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-40">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
