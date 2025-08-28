const canvas = document.getElementById("tv-static");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Generate random static frame
function drawStatic() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer = new Uint32Array(imageData.data.buffer);
  for (let i = 0; i < buffer.length; i++) {
    const rnd = Math.random();
    if (rnd < 0.2) buffer[i] = 0xffffffff;
    else if (rnd < 0.5) buffer[i] = 0x80ffffff;
    else buffer[i] = 0x00000000;
  }
  ctx.putImageData(imageData, 0, 0);
}

let staticInterval;
function startStatic() {
  canvas.style.opacity = "0.3"; // subtle
  staticInterval = setInterval(drawStatic, 30);
}

function stopStatic() {
  canvas.style.opacity = "0";
  clearInterval(staticInterval);
}

document.querySelector(".dont-press").addEventListener("click", () => {
  const body = document.body;
  const container = document.querySelector(".container");
  const profilePic = document.querySelector(".profile-pic");
  const tagline = document.querySelector("h5");
  const button = document.querySelector(".dont-press");

  startStatic();

  body.classList.add("glitch");

  // Short delay for glitch effect
  setTimeout(() => {
    body.classList.add("they-live-ready");
    profilePic.src = "assets/alien.png";
    stopStatic();
    body.classList.remove("glitch");
    tagline.textContent = "software engineer";
    button.style.opacity = "0";
    body.classList.add("they-live");
  }, 800);
});
