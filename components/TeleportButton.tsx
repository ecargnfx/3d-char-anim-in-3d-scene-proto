import { Html } from "@react-three/drei";

const TeleportButton = () => (
  <Html position="relative" center>
    <div style={{ position: 'absolute', top: '10px', left: '-10%', transform: 'translateX(50%)' }}>
      <button style={{ padding: '10px', background: 'blue', color: 'white' }}>
        Teleport
      </button>
    </div>
  </Html>
);

export default TeleportButton;