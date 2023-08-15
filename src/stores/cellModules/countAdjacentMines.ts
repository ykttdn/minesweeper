import type { Cell } from "@/types/cell";
import { getAdjacentCellsIndex } from "@/utils/GetAdjacentCellsIndex";

export const countAdjacentMines = (
  row: number,
  column: number,
  rowSize: number,
  columnSize: number,
  cells: Cell[][]
): number => {
  let adjacentMinesNumber = 0;
  const adjacentCells = getAdjacentCellsIndex(row, column, rowSize, columnSize);
  adjacentCells.forEach(([adjacentRow, adjacentColumn]) => {
    if (cells[adjacentRow][adjacentColumn].isMineHiddenIn) {
      adjacentMinesNumber++;
    }
  });

  return adjacentMinesNumber;
};
