export const getAdjacentCellsIndex = (
  row: number,
  column: number,
  rowSize: number,
  columnSize: number
): number[][] => {
  return [
    [row - 1, column - 1],
    [row - 1, column],
    [row - 1, column + 1],
    [row, column - 1],
    [row, column + 1],
    [row + 1, column - 1],
    [row + 1, column],
    [row + 1, column + 1],
  ].filter(([r, c]) => 0 <= r && r < rowSize && 0 <= c && c < columnSize);
};
