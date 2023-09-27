import React from 'react';
import { useGLTF } from "@react-three/drei";

const GLTFModel = ({ url, position = [0, 8, -20], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
    const { scene } = useGLTF(url);

    return (
        <primitive 
            object={scene} 
            position={position} 
            scale={scale} 
            rotation={rotation}
        />
    );
};

export default GLTFModel;
