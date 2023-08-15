import type { Cell } from "@/types/cell";

export const newCells = (
  oldCells: Cell[][],
  rowSize: number,
  columnSize: number
) => {
  const newCells = [...oldCells];
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      newCells[row][column] = {
        isMineHiddenIn: false,
        isOpened: false,
        isFlagged: false,
      };
    }
  }
  return newCells;
};
