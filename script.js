let theme = localStorage.getItem("theme");
let html = document.querySelector("html");

if (!theme) {
  theme = "dark";
}

html.setAttribute("data-theme", theme);
localStorage.setItem("theme", theme);

function themeToggle() {
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }

  localStorage.setItem("theme", theme);
  html.setAttribute("data-theme", theme);
}

//--------------------------Contact Dots-----------------------------
const canvas = document.getElementById("dot-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 2000;
canvas.height = 2000;

let waveDirection = 45;
let animationFrame = 0;
let canvasRotation = 0;
const angles = [0, 90, 180, 270]; // Which of the rotation the canvas can have to fake that the wave comes from all directions

// Generate static dots
let dotsX = 22;
let dotsY = 22;
let dotRadius = 3;
let lineX = 0;
let dotsTotal = dotsX * dotsY;
const dots = [];

// Create an array for the dots and assign the position.
for (let i = 0; i < dotsTotal; i++) {
  let lineY = Math.floor(i / dotsY); // Get the line Y number by figuring out how many times you can divide with dotsY

  lineX++;
  if (i % dotsX === 0) {
    lineX = 0;
  }

  const dot = {
    x: lineX * (canvas.width / (dotsX + 1)) + canvas.width / (dotsX + 1),
    y: lineY * (canvas.height / (dotsY + 1)) + canvas.height / (dotsY + 1),
    radius: dotRadius,
    color: "#ffffff",
  };

  dots.push(dot);
}

// Function to draw them on the canvas
function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let direction = (waveDirection * Math.PI) / 180; // Convert to radians

  // The following line of code is made with assistance from ChatGPT and is calculating the position of the wave based on how many frames have passed
  let wavePosition = ((animationFrame / 7) % (dotsY + 20000)) - 20;

  dots.forEach((dot) => {
    // Adjust the dot size based on the wave position
    // The following 4 lines of code is made with ChatGPT from my own promts, it is a complex math calculation do get the posistion from the wave at an angle
    let distance = Math.abs(
      dot.y -
        Math.tan(direction) * dot.x -
        wavePosition * (canvas.height / dotsY)
    );

    dot.radius = dotRadius + Math.max(0, 13.37 - distance / 40);

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();
  });

  animationFrame++;
}

setInterval(() => {
  let running = false;
  // Using dots.every to save performance, instead of forEach which isnt breakable every is on return false
  dots.every((dot) => {
    if (dot.radius != dotRadius) {
      running = true;
      return false;
    }
    return true;
  });

  if (running === false) {
    // The following 2 lines of code is made with ChatGPT from my own promts, Could write it myself, just didnt want to spend to much time on it.
    waveDirection =
      Math.random() < 0.5 ? Math.random() * 45 : 315 + Math.random() * 45;

    animationFrame = 0;
    const randomIndex = Math.floor(Math.random() * 4);
    const canvasRotation = angles[randomIndex];
    canvas.style.transform = `rotate(${canvasRotation}deg)`;
  }
}, 3000); // Change this to reset the wave faster and with a new angle

// Animation loop
function animate() {
  drawDots();
  requestAnimationFrame(animate);
}

animate(); // Starting the bad boy up :)
//----------------------------------END :)-------------------------------
