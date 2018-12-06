import Paddle from "./paddle";
import InputHandler from "./input";
import Ball from "./ball";

import { level1, buildLevel } from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;

    this.gameObjects = [];
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.input = new InputHandler(this.paddle, this);
  }

  start() {
    const bricks = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle, ...bricks];
    console.log("siema");
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
    this.gameObjects.forEach(obj => obj.draw(ctx));
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textalign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textalign = "center";
      ctx.fillText(
        "Press SPACEBAR to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }
  update(deltaTime) {
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU
    )
      return;

    this.gameObjects.forEach(obj => obj.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      object => !object.markedForDeletion
    );
  }
}
