const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the positions and colors of the circles
const circlePositions = [
  { x: 50, y: 50 },
  { x: 50, y: 150 },
  { x: 50, y: 250 },
  { x: 50, y: 350 },
];
const circleColors = ["yellow", "blue", "red", "green"];

// Define the positions of the arrows
const arrowPositions = [
  { x: circlePositions[0].x + 500, y: circlePositions[0].y },
  { x: circlePositions[1].x + 500, y: circlePositions[1].y },
  { x: circlePositions[2].x + 500, y: circlePositions[2].y },
  { x: circlePositions[3].x + 500, y: circlePositions[3].y },
];

const arrowSpeed = 5;
let clickedCircleIndex = null;

// Function to draw the canvas
const bubbleCanvasDraw = () => {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw circles
  circlePositions.forEach((position, index) => {
    ctx.beginPath();
    ctx.arc(position.x, position.y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = circleColors[index];
    ctx.fill();
  });

  // Draw arrows
  arrowPositions.forEach((position) => {
    ctx.beginPath();
    ctx.moveTo(position.x - 20, position.y);
    ctx.lineTo(position.x - 76, position.y);
    ctx.lineTo(position.x - 70, position.y - 5);
    ctx.moveTo(position.x - 78, position.y);
    ctx.lineTo(position.x - 70, position.y + 5);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.stroke();
  });

  // Move arrows towards clicked circle and check for collision
  arrowPositions.forEach((position, index) => {
    if (clickedCircleIndex === index) {
      const targetX = circlePositions[clickedCircleIndex].x;
      const targetY = circlePositions[clickedCircleIndex].y;

      if (position.x > targetX) {
        position.x -= arrowSpeed;
      } else if (position.x < targetX) {
        position.x += arrowSpeed;
      }

      if (position.y > targetY) {
        position.y -= arrowSpeed;
      } else if (position.y < targetY) {
        position.y += arrowSpeed;
      }

      const distance = Math.sqrt(
        (position.x - targetX) ** 2 + (position.y - targetY) ** 2
      );
      if (distance <= 114) {
        // Change color of the circle when hit
        circleColors[clickedCircleIndex] = "gray";
        clickedCircleIndex = null; // Reset clickedCircleIndex
      }
    }
  });

  // Request next animation frame
  requestAnimationFrame(bubbleCanvasDraw);
};

// Event listener for canvas click
canvas.addEventListener("click", (event) => {
  if (clickedCircleIndex === null) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    for (let i = 0; i < circlePositions.length; i++) {
      const position = circlePositions[i];
      const distance = Math.sqrt(
        (clickX - position.x) ** 2 + (clickY - position.y) ** 2
      );

      if (distance <= 30) {
        clickedCircleIndex = i;
        break;
      }
    }
  }
});

// Reset button functionality
const originalCircleColors = ["yellow", "blue", "red", "green"];
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  // Reset circle colors
  circleColors.forEach((color, index) => {
    circleColors[index] = originalCircleColors[index];
  });

  clickedCircleIndex = null; // Reset clickedCircleIndex

  // Reset arrow positions
  arrowPositions.forEach((position, index) => {
    position.x = circlePositions[index].x + 500;
    position.y = circlePositions[index].y;
  });
});

// Start drawing the canvas
bubbleCanvasDraw();
