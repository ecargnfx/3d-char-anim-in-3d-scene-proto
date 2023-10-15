import { useFrame, useThree } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { AnimationMixer, Clock, Vector3 } from 'three';
import ModelGUI from './ModelGUI';
import ArrowKeyNavigation from './ArrowKeyNavigation';

export default function FBXModelWithAnimations({ actionName }) {
  const baseModel = useFBX('/basic-T.fbx');
  const walkAnim = useFBX('/basic-walk.fbx');
  const kickAnim = useFBX('/basic-kick.fbx');
  const danceAnim = useFBX('/basic-dance.fbx');
  const crouchAnim = useFBX('/basic-crouch.fbx');

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
      mixer.clipAction(crouchAnim.animations[0]),
    ];
  }

  useFrame(() => {
    mixer.update(clock.current.getDelta());
  });

  const setAction = (actionName) => {
    const actionMap = {
      default: animations.current[0],
      walk: animations.current[1],
      kick: animations.current[2],
      dance: animations.current[3],
      crouch: animations.current[4],
    };

    if (activeAction) {
      activeAction.stop();
    }

    const newAction = actionMap[actionName];
    if (newAction) {
      newAction.reset();
      newAction.play();
      setActiveAction(newAction);
    } else {
      console.warn(`Action ${actionName} not found!`);
    }
  };

  const handleUserInputChange = (input: string) => {
    switch (input) {
      case 'walk':
        setAction('walk');
        break;
      case 'kick':
        setAction('kick');
        break;
      case 'dance':
        setAction('dance');
        break;
      case 'crouch':
        setAction('crouch');
        break;
      case 'stop':
        setAction('default');
        break;
      default:
        console.log(`Unknown input: ${input}`);
    }
  };

  const { camera } = useThree();
  const initialPosition = [0, -3.5, 5];
  const modelPosition = useRef(new Vector3(...initialPosition));

  const handleMove = (dx, dz) => {
    modelPosition.current.x += dx;
    modelPosition.current.z += dz;
    baseModel.position.set(modelPosition.current.x, modelPosition.current.y, modelPosition.current.z);
  };

    useEffect(() => {
        setAction(actionName);
    }, [actionName]);


  return (
    <>
        <ArrowKeyNavigation onMove={handleMove} initialPosition={initialPosition} />
        <ModelGUI setAction={setAction} />
        <primitive object={baseModel} position={initialPosition} rotation = {[0, 16, 0]} scale={[.08, .08, .08]} />
    </>
  );
}
