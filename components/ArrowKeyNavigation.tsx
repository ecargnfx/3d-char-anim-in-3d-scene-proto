// components/ArrowKeyNavigation.tsx
import { useEffect, useState } from 'react';

export default function ArrowKeyNavigation({ onMove, initialPosition }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          onMove(0, 1);  // Move forward in Z axis
          break;
        case 'ArrowDown':
          onMove(0, -1); // Move backward in Z axis
          break;
        case 'ArrowLeft':
          onMove(-1, 0); // Move left in X axis
          break;
        case 'ArrowRight':
          onMove(1, 0);  // Move right in X axis
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onMove]);

  return null;
}
