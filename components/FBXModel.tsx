import React, { useEffect, useRef } from 'react';
import { useFBX } from '@react-three/drei';
import { Group } from 'three';

interface FBXModelProps {
  url: string;
}

const FBXModel: React.FC<FBXModelProps> = ({ url }) => {
  const fbx: Group = useFBX(url);
  const fbxRef = useRef<Group>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (fbxRef.current) {
        switch (event.key) {
          case 'ArrowUp':
            fbxRef.current.position.y += 0.1; // Adjust for speed
            break;
          case 'ArrowDown':
            fbxRef.current.position.y -= 0.1;
            break;
          case 'ArrowLeft':
            fbxRef.current.position.x -= 0.1;
            break;
          case 'ArrowRight':
            fbxRef.current.position.x += 0.1;
            break;
          case 'PageUp':
            fbxRef.current.position.z += 0.1;
            break;
          case 'PageDown':
            fbxRef.current.position.z -= 0.1;
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (fbx) {
    console.log("FBX loaded:", fbx);
  } else {
    console.log("Loading FBX...");
  }

  return <primitive ref={fbxRef} object={fbx} position={[0, -6, 5]} scale={[3, 3, 3]} />;
}

export default FBXModel;
