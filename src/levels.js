import Brick from "./brick";

export function buildLevel(game, level) {
  const bricks = [];
  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        const position = {
          x: brickIndex * 80,
          y: 20 + 24 * rowIndex
        };
        bricks.push(new Brick(game, position));
      }
    });
  });
  return bricks;
}
export const level1 = [
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export const level2 = [
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
];
