import Paddle from "./paddle";
import InputHandler from "./input";
import Ball from "./ball";
import Brick from "./brick";
import { level1, buildLevel } from "./levels";
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.input = new InputHandler(this.paddle);
    this.ball = new Ball(this);
    const bricks = buildLevel(this, level1);

    this.gameObjects = [this.ball, this.paddle, ...bricks];
  }

  draw(ctx) {
    this.gameObjects.forEach(obj => obj.draw(ctx));
  }
  update(deltaTime) {
    this.gameObjects.forEach(obj => obj.update(deltaTime));
  }
}
