var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var gameOver = 0;
var addPoint = 0;
var score = 0;
var interval = 1000;
var playAgain = 1;
var y = 0;
var colorValue = 1;

function Ball() {
  this.x = c.width / 2;
  this.velocityX = 4;
  this.velocityY = 4;
  this.y = c.height / 2;
  this.angle = 0;
  this.show = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }
  this.update = function () {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  this.sideHitX = function () {
    this.velocityX *= -1;
  }
  this.sideHitY = function () {
    this.velocityY *= -1;
  }
  this.computerPaddleHit = function () {
    this.changeAngle();
    this.velocityX = Math.cos(this.angle + Math.PI) * this.velocityX;


    if ((this.changeAngle() + Math.PI) > Math.PI) {
      this.velocityY = Math.sin(this.angle + Math.PI) * this.velocityY;
      this.velocityY = 4 / this.velocityY * this.velocityY * -1;
    }
    else {
      this.velocityY = Math.sin(this.angle + Math.PI) * this.velocityY;

    }
    console.log(ball1.angle);
  }
  this.personPaddleHit = function () {
    this.changeAngle();
    this.velocityX = Math.cos(this.angle) * this.velocityX * -1;

    if (this.changeAngle() < 0) {
      this.velocityY = Math.sin(this.angle) * this.velocityY;
      this.velocityY = 4 / this.velocityY * this.velocityY * -1;
    }
    else {
      this.velocityY = Math.sin(this.angle) * this.velocityY;
      this.velocityY = 4 / this.velocityY * this.velocityY;
    }
    score++;
    console.log(ball1.angle);

  }
  this.orgin = function () {
    this.x = c.width / 2;
    this.velocityX = 4;
    this.velocityY = 4;
    this.y = c.height / 2;
  }
  this.changeAngle = function () {
    this.angle = (Math.random() * (Math.PI / 2)) - (Math.PI / 4)
  }
}

function Player() {
  this.y = 20;
  this.show = function () {

    if (y == 0) {
      colorValue = prompt("What color paddle do you want: 1 = white, 2 = blue, 3 = green, 4 = yellow")
      y++;
    }

    if (colorValue == 1) {
      ctx.fillStyle = "white";
      ctx.fillRect(20, this.y, 10, 130);
    }
    if (colorValue == 2) {
      ctx.fillStyle = "blue";
      ctx.fillRect(20, this.y, 10, 130);
    }
    if (colorValue == 3) {
      ctx.fillStyle = "green";
      ctx.fillRect(20, this.y, 10, 130);

    }
    if (colorValue == 4) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(20, this.y, 10, 130);

    }

  }
  this.up = function () {
    this.y += -20;
  }
  this.down = function () {
    this.y += 20;
  }
  this.orgin = function () {
    this.y = 20;
  }
  this.gameOver = function () {
    console.log("game over");
    playAgain = prompt("if you want to play again type 1, else type 0.")
    score = 0;
    if (playAgain == 1) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ball1.orgin();
      player1.orgin();
      computer1.orgin();
      ball1.show();
      player1.show();
      computer1.show();
      setTimeout(player1.start(), 3000);
      y = 0;
    }
    else {
      alert("Gamer Over, your score was " + score);

    }
  }
  this.start = function () {
    alert("The game is about to start, get ready")

  }
}

function Computer() {
  this.y = 20;
  this.orgin = function () {
    this.y = 20;
  }
  this.show = function () {
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width - 20, this.y - 65, 10, 130); //My AI built in. 
  }
  this.update = function () {
    this.y = ball1.y;
  }
}

function setup() {
  document.addEventListener("keydown", keyPush);

  ball1 = new Ball();
  ball1.show()
  player1 = new Player();
  player1.show();
  computer1 = new Computer();
  computer1.show();

  setTimeout(player1.start(), 3000);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas of all drawn elements.   

  ball1.update();
  ball1.show();

  player1.show();

  computer1.show();
  computer1.update();


  if (ball1.x > c.width)    //Right side
  {
    ball1.sideHitX();
  }

  if (ball1.x < 0) {
    ball1.sideHitX(); //left side
    player1.gameOver();
  }

  if (ball1.y > c.height)   //Bottom side
  {
    ball1.sideHitY();
  }

  if (ball1.y < 0)			//top side
  {
    ball1.sideHitY();
  }

  if (ball1.x + 5 >= canvas.width - 20) {
    if (ball1.y >= computer1.y && ball1.y <= (computer1.y + 130)) {
      ball1.computerPaddleHit(); //If it hits the computers paddle
    }
  }

  if (ball1.x - 5 <= 30) {
    if (ball1.y >= player1.y && ball1.y <= (player1.y + 130)) {
      ball1.personPaddleHit(); //If it hits the players paddle  
    }
  }
  var test = document.getElementById("test");
  test.innerHTML = "Your Score is " + score;
}

function keyPush(evt, rightKey) {
  switch (evt.keyCode) {
    case 38:
      console.log("up");
      player1.up();
      break;
    case 40:
      console.log("down");
      player1.down();
      break;
  }
}

setInterval(draw, interval / 30);			
