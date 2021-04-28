var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ben, benImage, ground, groundImage;
var benSound;
var coin, coinImage, coinGroup;
var kevinImage, kevinGroup, kevin1;
var benlogoImage, benlogo;
var score;
var invisibleground;
var reset, resetImage;

function preload() {
  groundImage = loadImage("background.jpg");
  score = 0;
  benImage = loadImage("bigchill.png");
  kevinImage = loadImage("kevin.png");
  benSound = loadSound("benintro.mp3");
  coinImage = loadImage("coin.png");
  benlogoImage = loadImage("logo.png");
  resetImage = loadImage("reset.png");

}

function setup() {
  createCanvas(600, 600);
  // creating background i.e. castle
  ground = createSprite(300, 300, 600, 600);
  ground.velocityX = -2.5;
  ground.addImage("moving", groundImage);
  ground.x = ground.width / 2;
  ground.scale = 1.0;

  score = 0;

  //creating Mr.Potter
  ben = createSprite(100, 500, 10, 10);
  ben.addImage("flying", benImage);
  ben.scale = 0.2;

  //creating "Hogwarts Flag"
  benlogo = createSprite(500, 60, 20, 20);
  benlogo.addImage("shown", benlogoImage);
  benlogo.scale = 0.5;

  restart = createSprite(300, 300, 20, 20);
  restart.addImage("clicking", resetImage)
  restart.scale = 0.5;

  invisibleground = createSprite(300, 510, width, 20);
  invisibleground.visible = false;
  //creating groups 
  kevinGroup = createGroup();
  coinGroup = createGroup();
}

function draw() {
  background(0);

  if (gameState === PLAY) {
    restart.visible = false;
    benlogo.visible = false;
    ground.visible = true;
    ben.visible = true;

    score = score + Math.round(getFrameRate() / 100000000)

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    ben.collide(invisibleground);

    //Mr. Potter should jump when space bar is pressed 
    if (keyDown("space") && ben.y >= 100) {
      ben.velocityY = -12;
    }

    // adding gravity
    ben.velocityY = ben.velocityY + 0.8

    benlogo.visible = false;

    kevin();
    coin();

    if (coinGroup.isTouching(ben)) {
      coinGroup.destroyEach();
      score = score + 50;
      benSound.play();
    }
    if (kevinGroup.isTouching(ben)) {
      gameState = END;
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    ben.velocityY = 0;

    kevinGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    coinGroup.setVelocityXEach(0);
    kevinGroup.setVelocityXEach(0);
    kevinGroup.destroyEach();
    coinGroup.destroyEach();
    background("red");

    ground.visible = false;
    ben.visible = false;
    benlogo.visible = true;

    restart.visible = true;

    stroke("purple");

    textSize(25);
    fill("yellow");
    text("Click on the reset button below", 150, 150);
    text("to get another chance to play!!!", 150, 500);

    if (mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
  fill("yellow")
  textSize(30)
  text("Score: " + score, 200, 50);
  score = score + Math.round(frameCount / 100000000);

}

function kevin() {
  if (frameCount % 250 === 0) {
    kevin1 = createSprite(600, 545, 20, 20);
    kevin1.addImage("attacking", kevinImage);
    kevin1.velocityX = -5;
    kevin1.scale = 0.14;
    kevin1.setLifetime = 300;
    kevinGroup.add(kevin1);

  }
}

function coin() {
  if (frameCount % 200 === 0) {
    position = Math.round(random(1, 2, 3, 4, 5, 6))
    var coin1 = createSprite(600, 300, 20, 20);
    coin1.scale = 2;
    coin1.addImage(coinImage);
    var rand = Math.round(random(1, 6));

    coin1.velocityX = -2.5;
    coin1.lifetime = 300;
    coinGroup.add(coin1);
  }
}

function reset() {
  gameState = PLAY;
  ground.velocityX = -2.5;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  kevinGroup.destroyEach();
  coinGroup.destroyEach();
  score = 0;
  reset.visible = false;
  benlogo.visible = false;
}