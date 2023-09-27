import { Canvas } from 'react-three-fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import FBXModel from '../components/FBXModel';
import GLTFModel from '../components/GLTFModel';
import CameraSetup from '../components/CameraSetup'; 
// import TeleportButton from '../components/TeleportButton'; 
import InputPrompt from '../components/InputPrompt/InputPrompt';
import dynamic from 'next/dynamic';

// Dynamically import the CharacterModel component with SSR disabled to solve for window not defined
const DynamicCharacterModel = dynamic(() => import('../components/FBXModelWithAnimations'), {
  ssr: false
});


export default function Home() {
  return (
    <div style={{ width: '99vw', height: '98vh' }}>
      <Canvas style={{ background: 'lightgray' }}>
        <CameraSetup />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* <FBXModel url="https://faced.io/teleported/teleported.fbx" /> */}
        {/* <FBXModel url="/Capoeira.fbx" />         */}
        <DynamicCharacterModel />
        <OrbitControls />
        {/* <Environment background={true} path="/assets/skybox/" files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']} /> */}
        <GLTFModel url="/scene.gltf" />
      </Canvas>
        <InputPrompt />
    </div>
  );
}


// GLTF Animation with React Three Fiber and Next.js
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import dynamic from 'next/dynamic';

// // Dynamically import the CharacterModel component with SSR disabled to solve for window not defined
// const DynamicCharacterModel = dynamic(() => import('../components/GLTFModelWithAnimations'), {
//   ssr: false
// });

// export default function Home() {
//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//         <Canvas style={{ background: 'lightgray' }} camera={{ position: [0, 1.5, 1.5], fov: 75 }}>
//             <OrbitControls enableDamping target={[0, 1, 0]} />
//             <DynamicCharacterModel />
//         </Canvas>
//     </div>    
//   );
// }


// FBX Animation with React Three Fiber and Next.js
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import dynamic from 'next/dynamic';

// // Dynamically import the CharacterModel component with SSR disabled to solve for window not defined
// const DynamicCharacterModel = dynamic(() => import('../components/FBXModelWithAnimations'), {
//   ssr: false
// });

// export default function Home() {
//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//         <Canvas style={{ background: 'lightgray' }} camera={{ position: [0, 5, 10], fov: 75 }}>
//             <OrbitControls enableDamping target={[0, 1, 0]} />
//             <pointLight position={[-2.5, 2.5, 2.5]} intensity={10}/>
//             <ambientLight intensity={0.5} />
//             <DynamicCharacterModel />
//         </Canvas>
//     </div>    
//   )
// }
