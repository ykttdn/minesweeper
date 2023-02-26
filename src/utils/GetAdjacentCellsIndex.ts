export const getAdjacentCellsIndex = (row: number, column: number) => [
  [row - 1, column - 1],
  [row - 1, column],
  [row - 1, column + 1],
  [row, column - 1],
  [row, column + 1],
  [row + 1, column - 1],
  [row + 1, column],
  [row + 1, column + 1],
];
