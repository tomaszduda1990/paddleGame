export function detectCollision(ball, gameObject) {
  const bottomOfBall = ball.position.y + ball.size;
  const topOfBall = ball.position.y;

  const topOfGameObject = gameObject.position.y;
  const leftOfGameObject = gameObject.position.x;
  const rightOfGameObject = gameObject.position.x + gameObject.width;
  const bottomOfGameObject = gameObject.position.y + gameObject.height;

  if (
    bottomOfBall >= topOfGameObject &&
    topOfBall <= bottomOfGameObject &&
    ball.position.x >= leftOfGameObject &&
    ball.position.x + ball.size <= rightOfGameObject
  ) {
    return true;
  } else {
    return false;
  }
}
