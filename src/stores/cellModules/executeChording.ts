import type { BoardParams } from "@/types/boardParams";
import type { Cell } from "@/types/cell";
import type { GameParams } from "@/types/gameParams";
import { getAdjacentCellsIndex } from "@/utils/GetAdjacentCellsIndex";
import { openCell } from "./openCell";

export const executeChording = (
  row: number,
  column: number,
  boardParams: BoardParams,
  gameParams: GameParams,
  cells: Cell[][]
) => {
  let newCells = [...cells];
  let newGameParams = { ...gameParams };

  const adjacentCells = getAdjacentCellsIndex(
    row,
    column,
    boardParams.rowSize,
    boardParams.columnSize
  );
  adjacentCells.forEach(([adjacentRow, adjacentColumn]) => {
    if (
      !newCells[adjacentRow][adjacentColumn].isOpened &&
      !newCells[adjacentRow][adjacentColumn].isFlagged
    ) {
      ({ newCells: newCells, newGameParams: newGameParams } = openCell(
        adjacentRow,
        adjacentColumn,
        boardParams,
        newGameParams,
        newCells
      ));
    }
  });

  return { newCells, newGameParams };
};
