//We started with looking at this example code,
// we have taken inspiration for the gravity of the bird
// and the movement for the bird from https://gist.github.com/straker/b96a4a68bd6d79cf75a833d98a2b654f
// We have found that some other parts are similar to it, such as the platform generation and collision,
// but they are not from the link above, which will be referred to as the "code from github".

let gameIsRunning = false;
let gameIsOver = false;
let groundIsVisible = true;
let birdGotHit = false;
let infoBoxIsDisplayed = false;
let stopSquirrelRespawn = false;
let canvas;
let score = 0;
let highScore = 0;

// Random platform X value generator
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Arrays
let platforms = [];

// Positions for the backgrounds
let groundY = 0;
let forestY1;
let forestY2;
let trunkY1;
let trunkY2;
let trunkY3;
// sound effect
let bounceSound;
let gameoverSound;

// Preload them pics, taught from https://p5js.org/reference/#/p5/loadImage
function preload() {
  leaf1 = loadImage("image/goodleaf1.png");
  leaf2 = loadImage("image/goodleaf2.png");
  leaf3 = loadImage("image/goodleaf3.png");
  leaf4 = loadImage("image/goodleaf4.png");
  leaf5 = loadImage("image/goodleaf5.png");
  playerImage = loadImage("image/benny.png");
  badSquirrel = loadImage("image/battleSquirrel.png");
  titleImage = loadImage("image/mainPageText1.png");
  startImage = loadImage("image/startText.png");
  infoText = loadImage("image/infoText.png");
  infoBox = loadImage("image/infoBox.png");
  gameOverText = loadImage("image/gameOver.png");
  restartText = loadImage("image/restart.png");
  treeImage = loadImage("image/treeBushes.png");
  treeCrop = loadImage("image/treeCrop.png");
  treeTrunk = loadImage("image/trunk.png");

  // Load the sound effects, taught from https://p5js.org/reference/#/p5/loadSound
  // These sounds is from freesound.org
  bounceSound = loadSound("sound/JumpSound.mp3");
  gameoverSound = loadSound("sound/GameOverSound.mp3");

  // Not these
  musicBackground = loadSound("sound/song.mp3");
  warCry = loadSound("sound/squirrelWarCry.mp3");
  bonk = loadSound("sound/bonk.mp3");

  // Load font, everything font-related is taught from https://p5js.org/reference/#/p5/loadFont
  pixelFont = loadFont("font/INVASION2000.TTF");
}

// Classes to make life better and please Garrit
class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 40;
    this.dx = 0;
    this.dy = 0;
    this.gravity = 0.1;
    this.bounceVelocity = -0.1;
    this.speed = 2;
  }

  draw(playerImage) {
    if (keyCode === LEFT_ARROW) {
      scale(-1, 1);
      image(playerImage, -this.x - this.width, this.y, this.width, this.height);
    } else if (keyCode === RIGHT_ARROW) {
      image(playerImage, this.x, this.y, this.width, this.height);
    } else {
      image(playerImage, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    this.dy += this.gravity; // This line is inspired by the code from github
    this.dy = Math.min(this.dy, 5);

    this.x += this.dx;
    this.y += this.dy;

    if (this.y + this.height >= height - 60 && groundIsVisible === true) {
      this.dy = this.bounceVelocity;
      if (gameIsRunning && !gameIsOver && bounceSound.isPlaying()) {
        bounceSound.stop();
      }
      if (gameIsRunning) {
        bounceSound.play(); // Play the bounce sound
      }
    }

    const collisionFix = 20;
    // Make it bounce
    for (let plat of platforms) {
      if (
        !birdGotHit &&
        this.x + this.width - collisionFix / 2 > plat.x &&
        this.x < plat.x + plat.width - collisionFix / 2 &&
        this.y + this.height >= plat.y + collisionFix &&
        this.y + this.height - this.dy < plat.y + collisionFix
      ) {
        this.y = plat.y + collisionFix - this.height;
        this.dy = this.bounceVelocity;
        if (gameIsRunning && !gameIsOver && bounceSound.isPlaying()) {
          bounceSound.stop();
        }
        if (gameIsRunning) {
          bounceSound.play(); // Play the bounce sound
        }
        if (!plat.scored) {
          score++; // Increase score when Benny landing on a new platform
          plat.scored = true; // Mark platform as scored
        }
      }
    }
    // Check for collision with a squirrel
    if (
      this.x + this.width > squirrel.x + 30 &&
      this.x < squirrel.x + squirrel.width - 30 &&
      this.y + this.height > squirrel.y &&
      this.y < squirrel.y + squirrel.height - 25
    ) {
      bonk.play();
      birdGotHit = true;
      squirrel.dy = squirrel.bounceVelocity;
      this.dy = 2;
    }

    // Check if bird has reached 1/2 of the screen height
    if (this.y < height / 2) {
      this.y = height / 2;
      movePlatformsDown();
      moveBackground();
      spawnNewPlatforms();
      speedFixSquirrel();
    }

    // Detect if player fell down
    if (this.y >= height + this.height) {
      gameIsOver = true;
      gameIsRunning = false;
      this.dy = 0;

      // Play game over sound
      gameoverSound.play();

      // Update high score "only update if score is higher than highscore"
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore); //save in localStorage
      }
    }
  }

  movement() {
    // This part is also inspired by the code from github
    if (keyCode === LEFT_ARROW) {
      this.dx = -this.speed;
    } else if (keyCode === RIGHT_ARROW) {
      this.dx = this.speed;
    } else {
      this.dx = 0;
    }
  }

  noMovement() {
    if (keyCode === LEFT_ARROW || RIGHT_ARROW) {
      bird.dx = 0;
    }
  }
}

class Squirrel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 90;
    this.dx = 0;
    this.dy = 0;
    this.gravity = 0;
    this.bounceVelocity = -3;
    this.maxSpawnPoint = -2000;
    this.minSpawnPoint = -1900;
  }

  draw(badSquirrel) {
    image(badSquirrel, this.x, this.y, this.width, this.height);
  }

  update() {
    this.dy += this.gravity;
    this.dy = Math.min(this.dy, 5);

    this.x += this.dx;
    this.y += this.dy;

    if (this.y >= 900 && !stopSquirrelRespawn) {
      this.y = getRandomNumber(this.minSpawnPoint, this.maxSpawnPoint);
      this.x = getRandomNumber(60, width - this.width - 60);

      if (this.minSpawnPoint < -50) {
        this.minSpawnPoint += 100;
        this.maxSpawnPoint += 100;
      }
    }

    if (!groundIsVisible) {
      this.gravity = 0.3;
    }

    if (this.y >= -5 && this.y <= 5) {
      warCry.play();
    }
  }
}

function setup() {
  createCanvas(400, 820);
  noSmooth(); // Tip from Garrit to get sharper background
  spawnManyPlatforms();
  bird = new Bird(width / 2 - 25, height - 100);
  squirrel = new Squirrel(getRandomNumber(20, width - 20), -3000);
  trunkY1 = 135;
  trunkY2 = -485;
  trunkY3 = -1105;
  forestY1 = -20;
  forestY2 = -840;

  // Retrieve high score from local storage
  highScore = parseInt(localStorage.getItem("highScore")) || 0; // parseInt taught from https://www.w3schools.com/jsref_parseint.asp
}

function draw() {
  background(250, 250, 250);

  if (!gameIsRunning && !infoBoxIsDisplayed && gameIsOver === false) {
    drawBackground();
    drawPlatforms();
    displayTitle();
    displayStartText();
    displayInfoText();
    bird.update();
    bird.draw(playerImage);
  } else if (!gameIsRunning && infoBoxIsDisplayed && gameIsOver === false) {
    drawBackground();
    drawPlatforms();
    displayInfoBox();
    bird.update();
    bird.draw(playerImage);
  } else if (gameIsOver) {
    drawBackground();
    drawPlatforms();
    displayScore();
    displayHighScore();
    displayGameOverText();
    stopSquirrelRespawn = true;
    squirrel.update();
    squirrel.draw(badSquirrel);
  } else {
    drawBackground();
    drawPlatforms();
    displayScore();
    displayHighScore();
    squirrel.update();
    squirrel.draw(badSquirrel);
    bird.update();
    bird.draw(playerImage);
  }
}

// Function for starting and reseting game
function keyPressed() {
  if (key === " " && !gameIsRunning) {
    push();
    musicBackground.play();
    musicBackground.setVolume(0.2);
    pop();
    gameIsRunning = true;
    bird.bounceVelocity = -4.5;
  } else if (key === "i" && !gameIsRunning) {
    infoBoxIsDisplayed = !infoBoxIsDisplayed;
  }

  if (key === "r" && gameIsOver === true) {
    musicBackground.stop();
    resetGame();
    gameIsOver = false;
    gameIsRunning = false;
    birdGotHit = false;
  }
  bird.movement();
}

function keyReleased() {
  bird.noMovement();
}

// Functions displaying texts and stuff
function displayTitle() {
  image(titleImage, 0, 100, width, height / 5);
}

function displayStartText() {
  image(startImage, 0, 245, width, height / 10);
}

function displayInfoText() {
  image(infoText, 75, 300, width / 1.5, height / 15);
}

function displayInfoBox() {
  image(infoBox, 0, 180, width, height / 2.7);
}

function displayScore() {
  stroke(0);
  strokeWeight(3);
  fill(130, 255, 40); // text color
  textSize(34);
  text("Score: " + score, 130, 800); // Display the score
}
function displayHighScore() {
  stroke(0);
  strokeWeight(3);
  fill(130, 255, 40); // text color
  textFont(pixelFont);
  textSize(20);
  text("High Score: " + highScore, 20, 20); // Display the high score
}

function displayGameOverText() {
  image(gameOverText, 0, 250, width, height / 7.5);
  image(restartText, 0, 330, width, height / 10);
}

// Spawn squirrels
function spawnSquirrel() {
  if (gameIsRunning) {
    squirrel = new Squirrel(getRandomNumber(20, width - 20), 100);
  }
}

// Initialize platforms upon setup
function spawnManyPlatforms() {
  let initialY = 700;
  while (initialY > -40) {
    let newX = getRandomNumber(72, 268);
    platforms.push({
      x: newX,
      y: initialY,
      width: 60,
      height: 40,
      scored: false,
    });
    initialY -= getRandomNumber(60, 80);
  }
}

// Create new platforms while game is running
function spawnNewPlatforms() {
  // Set y-coordinate of the first platform
  let maxY = platforms[0].y;
  // Loop through the platforms array to find the highest platform taught from https://www.techiedelight.com/find-min-max-element-array-javascript/
  for (let i = 1; i < platforms.length; i++) {
    if (platforms[i].y < maxY) {
      maxY = platforms[i].y;
    }
  }

  let initialY = maxY - getRandomNumber(60, 80);
  let newX = getRandomNumber(72, 268);
  // Add the new platform to the platforms array
  platforms.push({
    x: newX,
    y: initialY,
    width: 60,
    height: 40,
    scored: false,
  });
}

// Sync the squirrels speed when moving stuff down
function speedFixSquirrel() {
  squirrel.y += 3;
}

function movePlatformsDown() {
  groundIsVisible = false;
  // Move each platform down
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].y += 3;
  }

  // Filter out platforms that are no longer visible
  let newPlatforms = [];
  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i].y < height) {
      newPlatforms.push(platforms[i]);
    }
  }
  platforms = newPlatforms;
}

// Function for moving the trees down
function moveBackground() {
  let treeSpeed = 3;
  let forestSpeed = 2;

  groundY += treeSpeed;
  forestY1 += forestSpeed;
  forestY2 += forestSpeed;
  trunkY1 += treeSpeed;
  trunkY2 += treeSpeed;
  trunkY3 += treeSpeed;

  // Reset background height
  if (forestY1 >= height) {
    forestY1 = -820;
  }

  if (forestY2 >= height) {
    forestY2 = -820;
  }
  // Reset trunk height
  if (trunkY1 >= height) {
    trunkY1 = -1035;
  }
  if (trunkY2 >= height) {
    trunkY2 = -1035;
  }
  if (trunkY3 >= height) {
    trunkY3 = -1035;
  }
}

function drawBackground() {
  image(treeCrop, 0, forestY1, width, height);
  image(treeCrop, 0, forestY2, width, height);
  image(treeTrunk, 53, trunkY1, width / 1.32, height / 1.32);
  image(treeTrunk, 53, trunkY2, width / 1.32, height / 1.32);
  image(treeTrunk, 53, trunkY3, width / 1.32, height / 1.32);
  image(treeImage, 0, groundY, width, height);
}

// Draw leaves along platforms, with correct image
function drawPlatforms() {
  for (let plat of platforms) {
    if (plat.x >= 72 && plat.x <= 111) {
      image(leaf1, plat.x, plat.y, plat.width, plat.height);
    }
    if (plat.x >= 112 && plat.x <= 151) {
      image(leaf2, plat.x, plat.y, plat.width, plat.height);
    }
    if (plat.x >= 152 && plat.x <= 191) {
      image(leaf3, plat.x, plat.y, plat.width, plat.height);
    }
    if (plat.x >= 192 && plat.x <= 231) {
      image(leaf4, plat.x, plat.y, plat.width, plat.height);
    }
    if (plat.x >= 232 && plat.x <= 268) {
      image(leaf5, plat.x, plat.y, plat.width, plat.height);
    }
  }
}

function resetGame() {
  score = 0;
  bird = new Bird(width / 2 - 25, height - 100);
  squirrel = new Squirrel(getRandomNumber(20, width - 20), -3000);
  groundIsVisible = true;
  platforms = [];
  spawnManyPlatforms();
  groundY = 0;
  trunkY1 = 135;
  trunkY2 = -485;
  trunkY3 = -1105;
  forestY1 = -20;
  forestY2 = -840;
  gameIsRunning = false;
  gameIsOver = false;
  infoBoxIsDisplayed = false;
  stopSquirrelRespawn = false;
}
