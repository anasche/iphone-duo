 "use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, RoundedBox } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

function Phone({ front = false, position, rotation, scale = 1 }: {
  front?: boolean; position: [number, number, number]; rotation: [number, number, number]; scale?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const material = new THREE.MeshPhysicalMaterial({
    color: front ? "#a69a8a" : "#7f7a73",
    metalness: 0.92,
    roughness: 0.23,
    clearcoat: 0.9,
    clearcoatRoughness: 0.15
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: front ? "#0b0c12" : "#171719",
    metalness: 0.22,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.08
  });
  const screen = new THREE.MeshPhysicalMaterial({
    color: "#151722",
    metalness: 0.08,
    roughness: 0.18,
    clearcoat: 1,
    emissive: new THREE.Color("#100e15"),
    emissiveIntensity: 0.5
  });

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 0.55 + (front ? 1 : 0)) * 0.055;
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {/* Titanium chassis */}
      <RoundedBox args={[1.48, 3.05, 0.16]} radius={0.18} smoothness={8} material={material} />
      {/* Front or rear glass panel */}
      <RoundedBox args={[1.385, 2.94, 0.035]} radius={0.145} smoothness={8} position={[0, 0, 0.096]} material={front ? screen : glass} />
      {front ? (
        <>
          {/* OLED gradient-like ribbon */}
          <mesh position={[0, -0.05, 0.118]} rotation={[0, 0, -0.18]}>
            <torusGeometry args={[0.57, 0.19, 18, 90, Math.PI * 1.65]} />
            <meshPhysicalMaterial color="#c6a48c" metalness={0.3} roughness={0.22} emissive="#8a5038" emissiveIntensity={0.18} />
          </mesh>
          <mesh position={[0, 0.04, 0.126]} rotation={[0, 0, 0.42]}>
            <torusGeometry args={[0.43, 0.16, 18, 90, Math.PI * 1.7]} />
            <meshPhysicalMaterial color="#4e6076" metalness={0.38} roughness={0.2} emissive="#263b59" emissiveIntensity={0.2} />
          </mesh>
          <RoundedBox args={[0.48, 0.075, 0.018]} radius={0.035} smoothness={6} position={[0, 1.33, 0.13]} material={new THREE.MeshBasicMaterial({ color: "#030304" })} />
        </>
      ) : (
        <>
          {/* Camera island */}
          <RoundedBox args={[0.82, 0.91, 0.09]} radius={0.13} smoothness={8} position={[-0.22, 0.94, 0.15]} material={new THREE.MeshPhysicalMaterial({ color: "#333236", metalness: 0.75, roughness: 0.25 })} />
          {[
            [-0.42, 1.18], [-0.04, 1.18], [-0.42, 0.78]
          ].map(([x, y], i) => (
            <group key={i} position={[x, y, 0.21]}>
              <mesh>
                <cylinderGeometry args={[0.14, 0.14, 0.035, 40]} />
                <meshPhysicalMaterial color="#a19a90" metalness={0.95} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.021, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.105, 40]} />
                <meshPhysicalMaterial color="#06080d" metalness={0.65} roughness={0.1} clearcoat={1} />
              </mesh>
              <mesh position={[0.025, 0.043, 0.02]}>
                <circleGeometry args={[0.025, 20]} />
                <meshBasicMaterial color="#6c91b8" />
              </mesh>
            </group>
          ))}
          <mesh position={[0.21, 0.78, 0.208]}>
            <circleGeometry args={[0.055, 32]} />
            <meshBasicMaterial color="#e8ddc9" />
          </mesh>
          <mesh position={[0, -0.23, 0.119]}>
            <circleGeometry args={[0.12, 40]} />
            <meshPhysicalMaterial color="#3b3937" metalness={0.8} roughness={0.3} />
          </mesh>
        </>
      )}
      {/* Side buttons */}
      <RoundedBox args={[0.035, 0.34, 0.055]} radius={0.015} smoothness={4} position={[0.752, 0.58, 0]} material={material} />
      <RoundedBox args={[0.035, 0.22, 0.055]} radius={0.015} smoothness={4} position={[-0.752, 0.78, 0]} material={material} />
      <RoundedBox args={[0.035, 0.18, 0.055]} radius={0.015} smoothness={4} position={[-0.752, 0.49, 0]} material={material} />
    </group>
  );
}

function SceneContents() {
  const rig = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!rig.current) return;
    const t = state.clock.elapsedTime;
    rig.current.rotation.y = Math.sin(t * 0.22) * 0.045;
  });
  return (
    <>
      <ambientLight intensity={0.75} />
      <spotLight position={[3, 6, 5]} intensity={100} angle={0.45} penumbra={1} color="#fff0df" />
      <spotLight position={[-5, 2, 1]} intensity={75} angle={0.5} penumbra={1} color="#b8c5df" />
      <pointLight position={[1, -3, 4]} intensity={20} color="#c49b77" />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <group ref={rig}>
          <Float speed={1.1} rotationIntensity={0.035} floatIntensity={0.25}>
            <Phone position={[-0.58, 0.03, 0]} rotation={[0.04, -0.32, -0.13]} scale={1.02} />
            <Phone front position={[0.58, -0.02, 0.25]} rotation={[0.02, 0.3, 0.12]} scale={1.02} />
          </Float>
        </group>
        <ContactShadows position={[0, -2.05, 0]} opacity={0.45} scale={7} blur={2.8} far={4} />
      </Suspense>
    </>
  );
}

export default function PhoneScene() {
  return (
    <div className="phone-canvas" aria-label="Interactive 3D render of two titanium smartphones">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 7.1], fov: 37 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
