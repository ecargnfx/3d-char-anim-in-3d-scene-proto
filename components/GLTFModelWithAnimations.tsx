import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GUI } from 'dat.gui';
import { useFrame } from '@react-three/fiber';

export default function GLTFModelWithAnimations() {
  const { scene: defaultModel, animations: defaultAnimations } = useGLTF('/vanguard.glb');
  const { scene: sambaModel, animations: sambaAnimations } = useGLTF('/vanguard@samba.glb');
  const { scene: bellydanceModel, animations: bellydanceAnimations } = useGLTF('/vanguard@bellydance.glb');
  const { scene: goofyrunningModel, animations: goofyrunningAnimations } = useGLTF('/vanguard@goofyrunning.glb');

  const mixer = new THREE.AnimationMixer(defaultModel);
  const defaultAction = mixer.clipAction(defaultAnimations[0]);
  const sambaAction = mixer.clipAction(sambaAnimations[0]);
  const bellydanceAction = mixer.clipAction(bellydanceAnimations[0]);
  const goofyrunningAction = mixer.clipAction(goofyrunningAnimations[0]);

  const actions = [defaultAction, sambaAction, bellydanceAction, goofyrunningAction];

  const setAction = (action) => {
    actions.forEach((act) => act.stop());
    action.play();
  };

  useFrame((state, delta) => mixer.update(delta));

  // GUI setup
  const animations = {
    default: () => setAction(defaultAction),
    samba: () => setAction(sambaAction),
    bellydance: () => setAction(bellydanceAction),
    goofyrunning: () => setAction(goofyrunningAction),
  };

  const gui = new GUI();
  const animationsFolder = gui.addFolder('Animations');
  animationsFolder.open();
  Object.keys(animations).forEach((name) => {
    animationsFolder.add(animations, name);
  });

  return (
    <>
      <primitive object={defaultModel} />
      <pointLight position={[2.5, 2.5, 2.5]} intensity={50} />
    </>
  );
}
