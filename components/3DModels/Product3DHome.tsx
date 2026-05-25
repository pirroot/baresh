'use client';

import { Canvas } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  const { scene } = useGLTF('/models/faucet1.glb');
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
}

export default function Product3DHome() {
  return (
    <div className="h-[400] w-full cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <Model />

          <Environment preset="city" />
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={1}
          />

          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
