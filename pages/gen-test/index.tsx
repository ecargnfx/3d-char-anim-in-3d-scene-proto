import { Canvas } from 'react-three-fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import FBXModel from '@/components/FBXModel';
import GLTFModel from '@/components/GLTFModel';
import CameraSetup from '@/components/CameraSetup'; 
import React, { useState, useRef } from 'react';
// import TeleportButton from '../components/TeleportButton'; 
import InputPrompt from '@/components/InputPrompt/InputPrompt';
import dynamic from 'next/dynamic';

// Dynamically import the CharacterModel component with SSR disabled to solve for window not defined
const DynamicCharacterModel = dynamic(() => import('@/components/FBXModelWithAnimations'), {
  ssr: false
});





export default function Home() {

    const [actionName, setActionName] = useState('default');
    const pointLightRef = useRef();
    const [gltfModelUrl, setGltfModelUrl] = useState("/backrooms_long_hall.glb");
    const [audioSrc, setAudioSrc] = useState('/audio/lobby.mp3');
    const [audioInstance, setAudioInstance] = useState(null);


  const [inputValue, setInputValue] = useState("");


    const API_URL = "http://localhost:8000";

    const handleSubmit = () => {
        // Call your function with the contents of the input
        yourFunction(inputValue);
      };
      
      const yourFunction = (inputContent: string) => {
        // Do something with inputContent
        console.log("User input:", inputContent);
        getGPTSetup(inputContent);
      };
      
      function getGPTSetup(inputText: string) {
        // make a post request to the server with the input from the user
        // the server will return the shader
        // setLoadingResponse(true);
        fetch(`${API_URL}/gen-setup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sentence: inputText }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("this is the JSON");
            console.log(data);
            changeTheStuff(data);
          });
      }
      

    
function changeTheStuff(data: any) {
    const action = data.action;

    const audioMap = {

        'romantic': '/audio/romantic.mp3',
        'kung_fu': '/audio/kung_fu.mp3',
        'hiphop': '/audio/HipHop.mp3',
        'dungeon': '/audio/dungeon.mp3',
        'lobby': '/audio/lobby.mp3'
    }

    const audio = audioMap[data.music];

    const gltfMap = {
        'neon_bedroom': '/neon_bedroom.glb',
        'empty_old_garage': '/empty_old_garage_room.glb',
        'castle_dungeon': '/castle_dungeon.glb',
        'scifi_tron': '/scifi_tron_studio.glb',
        'backrooms_long_hall': '/backrooms_long_hall.glb'
    }

    const gltf = gltfMap[data.environment];

    const color = data.lighting;

    console.log(`action: ${action}`);
    console.log(`audio: ${audio}`);
    console.log(`gltf: ${gltf}`);
    console.log(`color: ${color}`);


    setActionName(action);
    setGltfModelUrl(gltf);

    setAudioSrc(audio);
        playAudio(audio);

if (pointLightRef.current) {
                pointLightRef.current.color.set(color); // red light for walk
                console.log("Light color set to:", pointLightRef.current.color.getHexString()); // Log the color change
            }

}


    const handleUserInputChange = (input) => {
        let newAudioSrc = '/audio/default.mp3';

        switch (input) {
        case 'walk':
            setActionName('walk');
            newAudioSrc = '/audio/romantic.mp3';
            setGltfModelUrl("/neon_bedroom.glb");
            if (pointLightRef.current) {
                pointLightRef.current.color.set('#ff0000'); // red light for walk
                console.log("Light color set to:", pointLightRef.current.color.getHexString()); // Log the color change
            }
            break;
        case 'kick':
            setActionName('kick');
            newAudioSrc = '/audio/kung_fu.mp3';
            setGltfModelUrl("/empty_old_garage_room.glb");
            if (pointLightRef.current) pointLightRef.current.color.set('#00ff00'); // green light for kick
            break;
        case 'dance':
            setActionName('dance');
            newAudioSrc = '/audio/HipHop.mp3';
            setGltfModelUrl("/scifi_tron_studio.glb");
            if (pointLightRef.current) pointLightRef.current.color.set('#0000ff'); // blue light for dance
            break;
        case 'combo':
            setActionName('crouch');
            newAudioSrc = '/audio/dungeon.mp3';
            setGltfModelUrl("/castle_dungeon.glb");
            if (pointLightRef.current) pointLightRef.current.color.set('#ffff00'); // yellow light for combo
            break;
        case 'stop':
            setActionName('default');
            newAudioSrc = '/audio/lobby.mp3';
            setGltfModelUrl("/backrooms_long_hall.glb");
            if (pointLightRef.current) pointLightRef.current.color.set('#ffffff'); // white light
            break;
        default:
            console.log(`Unknown input: ${input}`);
        }

        setAudioSrc(newAudioSrc);
        playAudio(newAudioSrc);

    };

    const playAudio = (src) => {
        // Stop the current audio if it's playing
        if (audioInstance) {
            audioInstance.pause();
            audioInstance.currentTime = 0;
        }
    
        const audio = new Audio(src);
        audio.play();
    
        // Update the audio instance in the state
        setAudioInstance(audio);
    };
    
    
  return (
    <div style={{ width: '99vw', height: '98vh' }}>
      <Canvas style={{ background: 'black' }}>
        <CameraSetup />
        <ambientLight />
        {/* <pointLight ref={pointLightRef} position={[10, 10, 10]} /> */}
        <directionalLight 
            ref={pointLightRef} 
            position={[0, 10, 5]} 
            intensity={1} 
            color="#ffffff" // default color
        />

        <DynamicCharacterModel actionName={actionName} />
        <OrbitControls />
        {/* <Environment background={true} path="/assets/skybox/" files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']} /> */}
        <GLTFModel url={gltfModelUrl} />

      </Canvas>

      <InputPrompt 
      onInputChange={setInputValue} 
      />
      <button onClick={handleSubmit}>Submit</button>
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
