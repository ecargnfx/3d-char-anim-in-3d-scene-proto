import { useFrame, useThree } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { AnimationMixer, Clock, Vector3 } from 'three';
import { GUI } from 'dat.gui';
import ArrowKeyNavigation from './ArrowKeyNavigation';

export default function FBXModelWithAnimations() {
  const baseModel = useFBX('/grace-teleported.fbx');
  console.log("Loaded baseModel:", baseModel);

  const walkAnim = useFBX('/grace-walk.fbx');
  console.log("Loaded walkAnim:", walkAnim);

  const kickAnim = useFBX('/grace-kick.fbx');
  console.log("Loaded kickAnim:", kickAnim);

  const danceAnim = useFBX('/grace-hiphop.fbx');
  console.log("Loaded danceAnim:", danceAnim);

  const comboAnim = useFBX('/grace-combo.fbx');
  console.log("Loaded comboAnim:", comboAnim);

  const [mixer] = useState(() => new AnimationMixer(baseModel));
  const animations = useRef<THREE.AnimationAction[]>([]);
  const [activeAction, setActiveAction] = useState(null);
  const clock = useRef(new Clock());

  if (animations.current.length === 0) {
    animations.current = [
      baseModel.animations[0] ? mixer.clipAction(baseModel.animations[0]) : null,
      mixer.clipAction(walkAnim.animations[0]),
      mixer.clipAction(kickAnim.animations[0]),
      mixer.clipAction(danceAnim.animations[0]),
      mixer.clipAction(comboAnim.animations[0]),
    ];
    console.log("Animations array:", animations.current);
  }

  useFrame(() => {
    mixer.update(clock.current.getDelta());
    console.log("Mixer updating...");
  });

  const setAction = (actionName) => {
    console.log("Setting action to:", actionName);

    const actionMap = {
      default: animations.current[0],
      walk: animations.current[1],
      kick: animations.current[2],
      dance: animations.current[3],
      combo: animations.current[4],
    };

    if (activeAction) {
      console.log("Stopping active action...");
      activeAction.stop();
    }

    const newAction = actionMap[actionName];
    if (newAction) {
      console.log("Playing animation:", actionName);
      newAction.reset();
      newAction.play();
      setActiveAction(newAction);
    } else {
      console.warn(`Action ${actionName} not found!`);
    }
  };

  useEffect(() => {
    const gui = new GUI();
    const animationsFolder = gui.addFolder('Animations');
    animationsFolder.open();

    animationsFolder.add({ default: () => setAction('default') }, 'default');
    animationsFolder.add({ walk: () => setAction('walk') }, 'walk');
    animationsFolder.add({ kick: () => setAction('kick') }, 'kick');
    animationsFolder.add({ dance: () => setAction('dance') }, 'dance');
    animationsFolder.add({ combo: () => setAction('combo') }, 'combo');

    return () => gui.destroy();
  }, [setAction]);

  const { camera } = useThree();
  const initialPosition = [0, -3.5, 5];
  const modelPosition = useRef(new Vector3(...initialPosition));

  const handleMove = (dx, dz) => {
    modelPosition.current.x += dx;
    modelPosition.current.z += dz;
    baseModel.position.set(modelPosition.current.x, modelPosition.current.y, modelPosition.current.z);
  };

//   useFrame(() => {
//     camera.lookAt(baseModel.position);
//   });

  return (
    <>
      <ArrowKeyNavigation onMove={handleMove} initialPosition={initialPosition} />
      <primitive object={baseModel} position={initialPosition} scale={[2, 2, 2]} />
    </>
  );  
}
