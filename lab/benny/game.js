/* Benny the Bird: early playable build (April 2024), made with Alfred Bergström.
   The platform generation, physics and collision logic are the original prototype.
   Added for the portfolio: a fixed 60 fps timestep, score, game over / restart and touch controls. */

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const overlay = document.getElementById("overlay");
const overlayTitle = overlay.querySelector("h2");
const overlayText = overlay.querySelector("p");

// width and height of each platform and where platforms start
const platformWidth = 80;
const platformHeight = 60;
const platformStart = canvas.height - 50;

// player physics
const gravity = 0.03;
const drag = 0.3;
const bounceVelocity = -3;

const playerImage = new Image();
playerImage.src = "img/greenbird.png";
const platformImage = new Image();
platformImage.src = "img/leaf.png";

let minPlatformSpace, maxPlatformSpace, platforms, doodle, playerDir, keydown, height, state;
let best = 0;
try {
  best = Number(localStorage.getItem("benny-best")) || 0;
} catch {}
bestEl.textContent = best;

// get a random number between the min (inclusive) and max (exclusive)
function random(min, max) {
  return Math.random() * (max - min) + min;
}

function reset() {
  minPlatformSpace = 15;
  maxPlatformSpace = 20;
  platforms = [{ x: canvas.width / 2 - platformWidth / 2, y: platformStart }];

  // fill the initial screen with platforms; the first few avoid the centre so
  // Benny bounces in place until the player starts moving
  let y = platformStart;
  while (y > 0) {
    y -= platformHeight + random(minPlatformSpace, maxPlatformSpace);
    let x;
    do {
      x = random(25, canvas.width - 25 - platformWidth);
    } while (
      y > canvas.height / 2 &&
      x > canvas.width / 2 - platformWidth * 1.5 &&
      x < canvas.width / 2 + platformWidth / 2
    );
    platforms.push({ x, y });
  }

  doodle = { width: 50, height: 40, x: canvas.width / 2 - 20, y: platformStart - 60, dx: 0, dy: 0 };
  playerDir = 0;
  keydown = false;
  height = 0;
  scoreEl.textContent = 0;
}

function step() {
  doodle.dy += gravity;

  // once Benny reaches the middle, move the world down instead of Benny up
  if (doodle.y < canvas.height / 2 && doodle.dy < 0) {
    platforms.forEach((platform) => (platform.y += -doodle.dy));
    height += -doodle.dy;

    while (platforms.length && platforms[platforms.length - 1].y > 0) {
      platforms.push({
        x: random(25, canvas.width - 25 - platformWidth),
        y: platforms[platforms.length - 1].y - (platformHeight + random(minPlatformSpace, maxPlatformSpace)),
      });
      // leaves spread out as you climb
      minPlatformSpace += 0.5;
      maxPlatformSpace = Math.min(maxPlatformSpace + 0.5, canvas.height / 2);
    }
  } else {
    doodle.y += doodle.dy;
  }

  // only apply drag to horizontal movement if no key is held
  if (!keydown) {
    if (playerDir < 0) {
      doodle.dx += drag;
      if (doodle.dx > 0) {
        doodle.dx = 0;
        playerDir = 0;
      }
    } else if (playerDir > 0) {
      doodle.dx -= drag;
      if (doodle.dx < 0) {
        doodle.dx = 0;
        playerDir = 0;
      }
    }
  }

  doodle.x += doodle.dx;

  // wrap around the screen
  if (doodle.x + doodle.width < 0) doodle.x = canvas.width;
  else if (doodle.x > canvas.width) doodle.x = -doodle.width;

  platforms.forEach((platform) => {
    if (
      doodle.dy > 0 &&
      doodle.y + doodle.height >= platform.y &&
      doodle.y <= platform.y + platformHeight &&
      doodle.x + doodle.width >= platform.x &&
      doodle.x <= platform.x + platformWidth
    ) {
      doodle.y = platform.y - doodle.height;
      doodle.dy = bounceVelocity;
    }
  });

  platforms = platforms.filter((platform) => platform.y < canvas.height);

  const score = Math.floor(height / 10);
  scoreEl.textContent = score;

  if (doodle.y > canvas.height) gameOver(score);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  platforms.forEach((p) => context.drawImage(platformImage, p.x, p.y, platformWidth, platformHeight));
  context.drawImage(playerImage, doodle.x, doodle.y, doodle.width, doodle.height);
}

function gameOver(score) {
  state = "over";
  if (score > best) {
    best = score;
    bestEl.textContent = best;
    try {
      localStorage.setItem("benny-best", String(best));
    } catch {}
  }
  overlayTitle.textContent = "Benny fell.";
  overlayText.textContent = `You climbed ${score} m. Press Space or tap to try again.`;
  overlay.hidden = false;
}

function start() {
  reset();
  state = "playing";
  overlay.hidden = true;
}

// fixed 60 fps timestep, so the game plays the same on 120 Hz screens
const STEP = 1000 / 60;
let last = performance.now();
let acc = 0;
function loop(now) {
  requestAnimationFrame(loop);
  acc = Math.min(acc + (now - last), 250);
  last = now;
  while (acc >= STEP) {
    if (state === "playing") step();
    acc -= STEP;
  }
  draw();
}

function move(dir) {
  keydown = true;
  playerDir = dir;
  doodle.dx = dir;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (state !== "playing") start();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    move(-1);
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    move(1);
  }
});
document.addEventListener("keyup", () => (keydown = false));

// touch: hold the left or right half of the game to steer
canvas.addEventListener("pointerdown", (e) => {
  if (state !== "playing") return start();
  const r = canvas.getBoundingClientRect();
  move(e.clientX - r.left < r.width / 2 ? -1 : 1);
});
overlay.addEventListener("pointerdown", () => start());
["pointerup", "pointercancel", "pointerleave"].forEach((t) => canvas.addEventListener(t, () => (keydown = false)));

reset();
state = "ready";
requestAnimationFrame(loop);
