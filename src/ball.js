export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.image = document.querySelector("#img_ball");
    this.speed = {
      x: 4,
      y: 4
    };

    this.position = {
      x: 10,
      y: 10
    };

    this.size = 16;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // checking collision with side walls
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // checking collition with top and bottom
    if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // checking collision with paddle
    const bottomOfBall = this.position.y + this.size;
    const topOfPaddle = this.game.paddle.position.y;
    const leftSideOfPaddle = this.game.paddle.position.x;
    const rightSideOfPaddle =
      this.game.paddle.position.x + this.game.paddle.width;
    if (
      bottomOfBall >= topOfPaddle &&
      this.position.x >= leftSideOfPaddle &&
      this.position.x + this.size <= rightSideOfPaddle
    ) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
