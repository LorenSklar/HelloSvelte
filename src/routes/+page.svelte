<script>
  const colors = ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo'];
  let currentColorIndex = 0;
  let position = { x: 0, y: 0 };
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };

  function handleClick(event) {
    // Only change color if we're not dragging
    if (!isDragging) {
      currentColorIndex = (currentColorIndex + 1) % colors.length;
    }
  }

  function handleMouseDown(event) {
    isDragging = true;
    dragOffset = {
      x: event.clientX - position.x,
      y: event.clientY - position.y
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

  function handleMouseUp() {
    isDragging = false;
  }
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<main>
  <h1 
    style="color: {colors[currentColorIndex]}; 
           cursor: move;
           position: absolute;
           left: {position.x}px;
           top: {position.y}px;
           transform: translate(-50%, -50%);"
    on:click={handleClick}
    on:mousedown={handleMouseDown}
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
