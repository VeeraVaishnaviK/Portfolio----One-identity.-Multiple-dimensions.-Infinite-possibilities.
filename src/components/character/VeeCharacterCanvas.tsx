import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VeeModelProps {
  isSpeaking: boolean;
}

function VeeStylizedAvatar({ isSpeaking }: VeeModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  // Blink state tracking
  const blinkState = useRef({
    nextBlinkTime: 2.0,
    isBlinking: false,
    blinkProgress: 0,
  });

  // Materials with elegant finishes matching the photo
  const materials = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({
        color: '#c99175',
        roughness: 0.65,
        metalness: 0.05,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: '#140f0d',
        roughness: 0.8,
        metalness: 0.1,
      }),
      shirt: new THREE.MeshStandardMaterial({
        color: '#b64b56', // Rose coral matching the photo's collared shirt
        roughness: 0.7,
        metalness: 0.05,
      }),
      glassesFrame: new THREE.MeshStandardMaterial({
        color: '#d4af37', // Gold metallic frame
        metalness: 0.85,
        roughness: 0.25,
      }),
      glassesLens: new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 0.9,
        opacity: 0.35,
        transparent: true,
        roughness: 0.1,
        ior: 1.5,
      }),
      eyeWhite: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.2,
      }),
      pupil: new THREE.MeshBasicMaterial({
        color: '#1a110d',
      }),
      lips: new THREE.MeshStandardMaterial({
        color: '#aa4d52',
        roughness: 0.5,
      }),
      goldPendant: new THREE.MeshStandardMaterial({
        color: '#C7A66A',
        metalness: 0.9,
        roughness: 0.2,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // Subtle breathing motion for entire avatar
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.8) * 0.04 - 0.2;
    }

    // Head tracks mouse pointer gently with natural damping
    if (headRef.current) {
      const targetRotY = pointer.x * 0.35;
      const targetRotX = -pointer.y * 0.2;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.08);
    }

    // Random natural blinking cycle
    const bs = blinkState.current;
    if (time > bs.nextBlinkTime && !bs.isBlinking) {
      bs.isBlinking = true;
      bs.blinkProgress = 0;
      bs.nextBlinkTime = time + 2.5 + Math.random() * 3.5;
    }

    if (bs.isBlinking) {
      bs.blinkProgress += delta * 12;
      const scaleY = Math.max(0.1, Math.abs(Math.cos(bs.blinkProgress * Math.PI)));
      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.scale.y = scaleY;
        rightEyeRef.current.scale.y = scaleY;
      }
      if (bs.blinkProgress >= 1) {
        bs.isBlinking = false;
        if (leftEyeRef.current && rightEyeRef.current) {
          leftEyeRef.current.scale.y = 1;
          rightEyeRef.current.scale.y = 1;
        }
      }
    }

    // Dialogue-synchronized mouth animation
    if (mouthRef.current) {
      if (isSpeaking) {
        // Natural speech syllable rhythm
        const speakFactor = Math.sin(time * 14) * 0.5 + Math.sin(time * 22) * 0.3 + 0.8;
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, Math.max(0.4, speakFactor * 1.6), 0.25);
        mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, 1 + Math.sin(time * 10) * 0.2, 0.2);
      } else {
        // Soft welcoming smile in idle
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, 0.5, 0.1);
        mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, 1.15, 0.1);
      }
    }

    // Welcoming hand gesture animation
    if (rightArmRef.current) {
      const gesture = isSpeaking ? Math.sin(time * 2.2) * 0.08 : 0;
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.4 + gesture, 0.05);
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.35, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.25, 1.25, 1.25]}>
      {/* Torso & Collared Rose Shirt */}
      <mesh position={[0, -1.0, 0]} material={materials.shirt}>
        <cylinderGeometry args={[0.55, 0.65, 0.95, 32]} />
      </mesh>

      {/* Collar Left & Right */}
      <mesh position={[-0.18, -0.52, 0.26]} rotation={[0.2, 0.3, -0.4]} material={materials.shirt}>
        <boxGeometry args={[0.25, 0.12, 0.06]} />
      </mesh>
      <mesh position={[0.18, -0.52, 0.26]} rotation={[0.2, -0.3, 0.4]} material={materials.shirt}>
        <boxGeometry args={[0.25, 0.12, 0.06]} />
      </mesh>

      {/* Neck & Gold Pendant Necklace */}
      <mesh position={[0, -0.45, 0]} material={materials.skin}>
        <cylinderGeometry args={[0.18, 0.22, 0.35, 24]} />
      </mesh>
      <mesh position={[0, -0.55, 0.19]} rotation={[0, 0, 0]} material={materials.goldPendant}>
        <torusGeometry args={[0.16, 0.012, 12, 32]} />
      </mesh>
      <mesh position={[0, -0.66, 0.23]} material={materials.goldPendant}>
        <sphereGeometry args={[0.035, 16, 16]} />
      </mesh>

      {/* Left Arm & Gentle Hand */}
      <group ref={leftArmRef} position={[-0.6, -0.7, 0]}>
        <mesh position={[-0.15, -0.4, 0]} material={materials.shirt}>
          <capsuleGeometry args={[0.12, 0.6, 16, 16]} />
        </mesh>
        <mesh position={[-0.2, -0.8, 0.05]} material={materials.skin}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>

      {/* Right Arm & Welcoming Hand Gesture */}
      <group ref={rightArmRef} position={[0.6, -0.7, 0]}>
        <mesh position={[0.15, -0.4, 0.05]} material={materials.shirt}>
          <capsuleGeometry args={[0.12, 0.6, 16, 16]} />
        </mesh>
        <mesh position={[0.22, -0.75, 0.15]} material={materials.skin}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>

      {/* Head Group (Tracks pointer) */}
      <group ref={headRef} position={[0, 0, 0]}>
        {/* Face / Cranium */}
        <mesh position={[0, 0, 0]} material={materials.skin}>
          <sphereGeometry args={[0.42, 32, 32]} />
        </mesh>

        {/* Back and Crown Hair Volume */}
        <mesh position={[0, 0.12, -0.06]} material={materials.hair}>
          <sphereGeometry args={[0.46, 32, 32]} />
        </mesh>

        {/* Long Dark Flowing Hair Framing Left and Right */}
        <mesh position={[-0.38, -0.35, -0.02]} rotation={[0, 0, 0.15]} material={materials.hair}>
          <capsuleGeometry args={[0.16, 0.95, 16, 16]} />
        </mesh>
        <mesh position={[0.38, -0.35, -0.02]} rotation={[0, 0, -0.15]} material={materials.hair}>
          <capsuleGeometry args={[0.16, 0.95, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.38, -0.22]} material={materials.hair}>
          <capsuleGeometry args={[0.26, 0.9, 16, 16]} />
        </mesh>

        {/* Hair Front Side Strands / Bangs */}
        <mesh position={[-0.24, 0.24, 0.35]} rotation={[0.2, 0.3, -0.4]} material={materials.hair}>
          <boxGeometry args={[0.22, 0.16, 0.1]} />
        </mesh>
        <mesh position={[0.24, 0.24, 0.35]} rotation={[0.2, -0.3, 0.4]} material={materials.hair}>
          <boxGeometry args={[0.22, 0.16, 0.1]} />
        </mesh>

        {/* Eyes (Left & Right) */}
        <group position={[-0.15, 0.05, 0.36]} ref={leftEyeRef}>
          <mesh material={materials.eyeWhite}>
            <sphereGeometry args={[0.07, 16, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.045]} material={materials.pupil}>
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>
          {/* Catchlight sparkle */}
          <mesh position={[0.02, 0.02, 0.075]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        <group position={[0.15, 0.05, 0.36]} ref={rightEyeRef}>
          <mesh material={materials.eyeWhite}>
            <sphereGeometry args={[0.07, 16, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.045]} material={materials.pupil}>
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>
          <mesh position={[0.02, 0.02, 0.075]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Eyebrows */}
        <mesh position={[-0.15, 0.15, 0.37]} rotation={[0, 0, 0.08]} material={materials.hair}>
          <boxGeometry args={[0.13, 0.024, 0.04]} />
        </mesh>
        <mesh position={[0.15, 0.15, 0.37]} rotation={[0, 0, -0.08]} material={materials.hair}>
          <boxGeometry args={[0.13, 0.024, 0.04]} />
        </mesh>

        {/* Stylish Thin Gold-Frame Glasses (Mirroring Photograph) */}
        <group position={[0, 0.05, 0.42]}>
          {/* Left Rim */}
          <mesh position={[-0.15, 0, 0]} material={materials.glassesFrame}>
            <torusGeometry args={[0.09, 0.01, 16, 32]} />
          </mesh>
          {/* Left Lens */}
          <mesh position={[-0.15, 0, 0]} material={materials.glassesLens}>
            <circleGeometry args={[0.085, 24]} />
          </mesh>

          {/* Right Rim */}
          <mesh position={[0.15, 0, 0]} material={materials.glassesFrame}>
            <torusGeometry args={[0.09, 0.01, 16, 32]} />
          </mesh>
          {/* Right Lens */}
          <mesh position={[0.15, 0, 0]} material={materials.glassesLens}>
            <circleGeometry args={[0.085, 24]} />
          </mesh>

          {/* Bridge */}
          <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.glassesFrame}>
            <cylinderGeometry args={[0.008, 0.008, 0.08, 12]} />
          </mesh>

          {/* Temples (Arms going back) */}
          <mesh position={[-0.24, 0.01, -0.16]} rotation={[Math.PI / 2, 0.2, 0]} material={materials.glassesFrame}>
            <cylinderGeometry args={[0.006, 0.006, 0.34, 8]} />
          </mesh>
          <mesh position={[0.24, 0.01, -0.16]} rotation={[Math.PI / 2, -0.2, 0]} material={materials.glassesFrame}>
            <cylinderGeometry args={[0.006, 0.006, 0.34, 8]} />
          </mesh>
        </group>

        {/* Subtle Nose */}
        <mesh position={[0, -0.04, 0.41]} rotation={[-0.1, 0, 0]} material={materials.skin}>
          <coneGeometry args={[0.04, 0.08, 12]} />
        </mesh>

        {/* Animated Mouth (Lips + Talking Morph) */}
        <mesh ref={mouthRef} position={[0, -0.16, 0.38]} rotation={[0, 0, Math.PI / 2]} material={materials.lips}>
          <capsuleGeometry args={[0.025, 0.08, 12, 12]} />
        </mesh>
      </group>
    </group>
  );
}

export function VeeCharacterCanvas({ isSpeaking }: { isSpeaking: boolean }) {
  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[460px] relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Atmospheric Three-Point Lighting */}
        <ambientLight intensity={1.1} />
        {/* Warm key light */}
        <directionalLight position={[2, 3, 3]} intensity={1.5} color="#fff6e8" />
        {/* Violet rim light matching website accent */}
        <directionalLight position={[-3, 2, -1]} intensity={2.2} color="#9275FF" />
        {/* Soft gold bottom fill */}
        <pointLight position={[0, -2, 2]} intensity={0.8} color="#C7A66A" />

        <VeeStylizedAvatar isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}
