const canvas = document.getElementById("tv-static");
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Generate random static frame (gradual, subtle)
function drawStatic() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer = new Uint32Array(imageData.data.buffer);
  for (let i = 0; i < buffer.length; i++) {
    const rnd = Math.random();
    if (rnd < 0.2) buffer[i] = 0xffffffff;       // bright pixel
    else if (rnd < 0.5) buffer[i] = 0x80ffffff;  // semi-transparent
    else buffer[i] = 0x00000000;                 // mostly black
  }
  ctx.putImageData(imageData, 0, 0);
}

let staticInterval;
function startStatic() {
  canvas.style.opacity = "0.3"; // subtle
  staticInterval = setInterval(drawStatic, 30); // ~30fps
}

function stopStatic() {
  canvas.style.opacity = "0"; // fade out
  clearInterval(staticInterval);
}

document.querySelector(".dont-press").addEventListener("click", () => {
  const body = document.body;
  const container = document.querySelector(".container");
  const profilePic = document.querySelector(".profile-pic");
  const tagline = document.querySelector("h5");
  const button = document.querySelector(".dont-press");

  // Start TV static
  startStatic();

  // Add glitch effect
  body.classList.add("glitch");

  // Short delay for glitch effect
  setTimeout(() => {
    // Pre-style everything for They Live BEFORE swapping picture
    body.classList.add("they-live-ready");

    // Swap profile picture
    profilePic.src = "assets/alien.png";

    // Stop static immediately
    stopStatic();

    // Remove glitch effect
    body.classList.remove("glitch");

    // Update tagline
    tagline.textContent = "software engineer";

    // Fade out button smoothly
    button.style.opacity = "0";

    // Apply final theme
    body.classList.add("they-live");
  }, 800);
});
