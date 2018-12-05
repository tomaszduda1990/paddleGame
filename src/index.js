import Paddle from "./paddle";
import InputHandler from "./input";
import Ball from "./ball";

const canvas = document.querySelector("#gameScreen");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

ctx.clearRect(0, 0, 800, 600);

const paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
const input = new InputHandler(paddle);
const ball = new Ball(GAME_WIDTH, GAME_HEIGHT);
paddle.draw(ctx);
let lastTime = 0;

const gameLoop = timestamp => {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  paddle.update(deltaTime);
  paddle.draw(ctx);

  ball.update(deltaTime);
  ball.draw(ctx);

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
