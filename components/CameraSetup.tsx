import { useThree } from "@react-three/fiber";
import { useEffect } from 'react';

const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 11; // Adjust this value to set how far out on the z-axis you'd like the camera
    camera.position.y = -2; // Adjust this value to set how high you'd like the camera to be
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};

export default CameraSetup;
