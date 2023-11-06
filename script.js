const canvas = document.getElementById("dot-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 2000;
canvas.height = 2000;

let waveDirection = 45;
let animationFrame = 0;
let canvasRotation = 0;
const angles = [0, 90, 180, 270]; // Which of the rotation the canvas can have to fake that the wave comes from all directions

// Generate static dots
let dotsX = 25;
let dotsY = 25;
let lineX = 0;
let dotsTotal = dotsX * dotsY;
const dots = [];

// Create an array for the dots and assign the position.
for (let i = 0; i < dotsTotal; i++) {
  let lineY = Math.floor(i / dotsY); // Get the line Y number by figuring out how many times you can divide with dotsY

  lineX++;
  if (i % dotsX == 0) {
    lineX = 0;
  }

  const dot = {
    x: lineX * (canvas.width / dotsX) + 14,
    y: lineY * (canvas.height / dotsY) + 14,
    radius: 1.5,
    color: "#ffffff",
  };

  dots.push(dot);
}

// Function to draw them on the canvas
function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let direction = (waveDirection * Math.PI) / 180; // Convert to radians

  // Calculate the current position of the wave
  let wavePosition = ((animationFrame / 5) % (dotsY + 20000)) - 20;
  console.log(waveDirection, direction);

  dots.forEach((dot) => {
    // Adjust the dot size based on the wave position
    // The following 5 lines of code is made with ChatGPT from my own promts, it is a complex math calculation do get the posistion from the wave at an angle
    let distance = Math.abs(
      dot.y -
        Math.tan(direction) * dot.x -
        wavePosition * (canvas.height / dotsY)
    );

    let dotSize = 1.5 + Math.max(0, 5 - distance / 40);

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();
  });

  animationFrame++;
}

setInterval(() => {
  // The following 3 lines of code is made with ChatGPT from my own promts, Could write it myself, just didnt want to spend to much time on it.
  waveDirection =
    Math.random() < 0.5 ? Math.random() * 45 : 315 + Math.random() * 45;
  animationFrame = 0;

  const randomIndex = Math.floor(Math.random() * 4);
  const canvasRotation = angles[randomIndex];
  canvas.style.transform = `rotate(${canvasRotation}deg)`;
}, 11000); // Change this to reset the wave faster and with a new angle

// Animation loop
function animate() {
  drawDots();
  requestAnimationFrame(animate);
}

animate(); // Starting the bad boy up :)
