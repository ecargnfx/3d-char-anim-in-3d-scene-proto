import { Canvas } from 'react-three-fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import FBXModel from '../components/FBXModel';
import GLTFModel from '../components/GLTFModel';
import CameraSetup from '../components/CameraSetup'; 
import React, { useState, useRef } from 'react';
// import TeleportButton from '../components/TeleportButton'; 
import InputPrompt from '../components/InputPrompt/InputPrompt';
import dynamic from 'next/dynamic';

// Dynamically import the CharacterModel component with SSR disabled to solve for window not defined
const DynamicCharacterModel = dynamic(() => import('../components/FBXModelWithAnimations'), {
  ssr: false
});





export default function Home() {

    const [actionName, setActionName] = useState('default');
    const pointLightRef = useRef();
    const [gltfModelUrl, setGltfModelUrl] = useState("/wisp_forest.glb");


    const handleUserInputChange = (input) => {
        switch (input) {
        case 'walk':
            setActionName('walk');
            setGltfModelUrl("/neon_bedroom.glb");
            if (pointLightRef.current) {
                pointLightRef.current.color.set('#ff0000'); // red light for walk
                console.log("Light color set to:", pointLightRef.current.color.getHexString()); // Log the color change
            }
            break;
        case 'kick':
            setActionName('kick');
            setGltfModelUrl("/empty_old_garage_room.glb");
            if (pointLightRef.current) pointLightRef.current.color.set('#00ff00'); // green light for kick
            break;
        case 'dance':
            setActionName('dance');
            setGltfModelUrl("/empty_old_garage_room.glb");
            if (pointLightRef.current) pointLightRef.current.color.set('#0000ff'); // blue light for dance
            break;
        case 'combo':
            setActionName('combo');
            setGltfModelUrl("/empty_old_garage_room.glb");
            if (pointLightRef.current) pointLightRef.current.color.set('#ffff00'); // yellow light for combo
            break;
        case 'stop':
            setActionName('default');
            setGltfModelUrl("/empty_old_garage_room.glb");
            if (pointLightRef.current) pointLightRef.current.color.set('#ffffff'); // white light
            break;
        default:
            console.log(`Unknown input: ${input}`);
        }
    };

  return (
    <div style={{ width: '99vw', height: '98vh' }}>
      <Canvas style={{ background: 'black' }}>
        <CameraSetup />
        {/* <ambientLight /> */}
        {/* <pointLight ref={pointLightRef} position={[10, 10, 10]} /> */}
        <directionalLight 
            ref={pointLightRef} 
            position={[0, 10, 5]} 
            intensity={1} 
            color="#ff0000" // default color
        />

        <DynamicCharacterModel actionName={actionName} />
        <OrbitControls />
        {/* <Environment background={true} path="/assets/skybox/" files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']} /> */}
        <GLTFModel url={gltfModelUrl} />

      </Canvas>

      <InputPrompt onInputChange={handleUserInputChange} />
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
