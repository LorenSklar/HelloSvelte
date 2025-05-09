export const COLORS = ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo'];
export const MOVEMENT_SPEED = 5; // pixels per frame

export function getInitialPosition() {
  if (typeof window !== 'undefined') {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }
  return { x: 0, y: 0 };
} 