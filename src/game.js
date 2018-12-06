import Paddle from "./paddle";
import InputHandler from "./input";
import Ball from "./ball";

import { level1, level2, buildLevel } from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;
    this.lives = 2;

    this.gameObjects = [];
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.input = new InputHandler(this.paddle, this);
    this.bricks = [];

    this.levels = [level1, level2];
    this.currentLevel = 0;
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;
    this.ball.reset();
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }
  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(ctx));
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }
  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }
    if (this.bricks.length === 0 && this.gamestate === GAMESTATE.NEWLEVEL) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }
    if (this.gamestate !== GAMESTATE.RUNNING) return;
    [...this.gameObjects, ...this.bricks].forEach(obj => obj.update(deltaTime));

    this.bricks = this.bricks.filter(object => !object.markedForDeletion);
  }
}
