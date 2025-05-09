<script>
  import { COLORS, MOVEMENT_SPEED, getInitialPosition } from '$lib/constants';
  import { onMount } from 'svelte';
  
  let currentColorIndex = 0;
  let position = { x: 0, y: 0 };
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let keys = new Set();
  let touchStartTime = 0;
  let touchStartPosition = { x: 0, y: 0 };

  onMount(() => {
    position = getInitialPosition();
  });

  function handleClick(event) {
    // Only change color if it's a quick tap/click without movement
    const now = Date.now();
    const timeDiff = now - touchStartTime;
    const distanceMoved = Math.sqrt(
      Math.pow(event.clientX - touchStartPosition.x, 2) +
      Math.pow(event.clientY - touchStartPosition.y, 2)
    );

    if (timeDiff < 200 && distanceMoved < 10 && !isDragging) {
      currentColorIndex = (currentColorIndex + 1) % COLORS.length;
    }
  }

  function handleMouseDown(event) {
    isDragging = true;
    touchStartTime = Date.now();
    touchStartPosition = { x: event.clientX, y: event.clientY };
    dragOffset = {
      x: event.clientX - position.x,
      y: event.clientY - position.y
    };
  }

  function handleTouchStart(event) {
    isDragging = true;
    touchStartTime = Date.now();
    const touch = event.touches[0];
    touchStartPosition = { x: touch.clientX, y: touch.clientY };
    dragOffset = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    };
  }

  function handleMouseMove(event) {
    if (isDragging) {
      position = {
        x: event.clientX - dragOffset.x,
        y: event.clientY - dragOffset.y
      };
    }
  }

  function handleTouchMove(event) {
    if (isDragging) {
      const touch = event.touches[0];
      position = {
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y
      };
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function handleKeyDown(event) {
    keys.add(event.key);
  }

  function handleKeyUp(event) {
    keys.delete(event.key);
  }

  function updatePosition() {
    if (isDragging) return;

    const newPosition = { ...position };
    
    if (keys.has('ArrowLeft')) newPosition.x -= MOVEMENT_SPEED;
    if (keys.has('ArrowRight')) newPosition.x += MOVEMENT_SPEED;
    if (keys.has('ArrowUp')) newPosition.y -= MOVEMENT_SPEED;
    if (keys.has('ArrowDown')) newPosition.y += MOVEMENT_SPEED;

    // Keep text within viewport bounds
    if (typeof window !== 'undefined') {
      newPosition.x = Math.max(0, Math.min(window.innerWidth, newPosition.x));
      newPosition.y = Math.max(0, Math.min(window.innerHeight, newPosition.y));
    }

    position = newPosition;
  }

  // Set up animation frame loop for smooth movement
  let animationFrameId;
  
  function animate() {
    updatePosition();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Start animation loop
  onMount(() => {
    animate();
  });

  // Clean up animation frame on component destroy
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  });
</script>

<svelte:window 
  on:mousemove={handleMouseMove} 
  on:mouseup={handleMouseUp}
  on:keydown={handleKeyDown}
  on:keyup={handleKeyUp}
/>

<main>
  <h1 
    style="color: {COLORS[currentColorIndex]}; 
           cursor: move;
           position: absolute;
           left: {position.x}px;
           top: {position.y}px;
           transform: translate(-50%, -50%);"
    on:click={handleClick}
    on:mousedown={handleMouseDown}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
  >
    hello
  </h1>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: white;
    overflow: hidden;
  }

  h1 {
    font-size: 3rem;
    user-select: none;
    touch-action: none;
  }
</style>
