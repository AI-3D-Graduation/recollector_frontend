import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

interface ModelViewerProps {
  modelUrl: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

function LoadingSpinner() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full"
    >
      {/* 카메라 */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      
      {/* 조명 */}
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1}
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} />

      {/* 3D 모델 */}
      <Suspense fallback={<LoadingSpinner />}>
        <Center>
          <Model url={modelUrl} />
        </Center>
        
        {/* 환경 반사 */}
        <Environment preset="sunset" />
      </Suspense>

      {/* 마우스 컨트롤 */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        autoRotate={false}
      />
    </Canvas>
  );
}