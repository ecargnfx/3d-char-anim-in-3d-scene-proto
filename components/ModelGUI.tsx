import { useEffect } from 'react';
import { GUI } from 'dat.gui';

interface ModelGUIProps {
  setAction: (actionName: string) => void;
}

const ModelGUI: React.FC<ModelGUIProps> = ({ setAction }) => {
  useEffect(() => {
    const gui = new GUI();
    const animationsFolder = gui.addFolder('Animations');
    animationsFolder.open();

    animationsFolder.add({ default: () => setAction('default') }, 'default');
    animationsFolder.add({ walk: () => setAction('walk') }, 'walk');
    animationsFolder.add({ kick: () => setAction('kick') }, 'kick');
    animationsFolder.add({ dance: () => setAction('dance') }, 'dance');
    animationsFolder.add({ crouch: () => setAction('crouch') }, 'crouch');

    return () => gui.destroy();
  }, [setAction]);

  return null; // This component doesn't render anything in the DOM
};

export default ModelGUI;
