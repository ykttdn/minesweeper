import type { BoardParams } from "@/types/boardParams";
import type { Cell } from "@/types/cell";
import type { GameParams } from "@/types/gameParams";
import { countAdjacentMines } from "./countAdjacentMines";
import { getAdjacentCellsIndex } from "@/utils/GetAdjacentCellsIndex";

export const openCell = (
  row: number,
  column: number,
  boardParams: BoardParams,
  gameParams: GameParams,
  cells: Cell[][]
) => {
  let newCells: Cell[][] = [...cells];
  let newGameParams: GameParams = { ...gameParams };

  newCells[row][column].isOpened = true;

  if (newCells[row][column].isMineHiddenIn) {
    newGameParams.hasOpenedMinedCell = true;
    return { newCells, newGameParams };
  } else {
    newGameParams.safeCellNumber--;
  }

  const adjacentMinesNumber = countAdjacentMines(
    row,
    column,
    boardParams.rowSize,
    boardParams.columnSize,
    newCells
  );

  if (adjacentMinesNumber === 0) {
    const adjacentCells = getAdjacentCellsIndex(
      row,
      column,
      boardParams.rowSize,
      boardParams.columnSize
    );
    adjacentCells.forEach(([adjacentRow, adjacentColumn]) => {
      if (!newCells[adjacentRow][adjacentColumn].isOpened) {
        newCells[adjacentRow][adjacentColumn].isFlagged = false;
        ({ newCells, newGameParams } = openCell(
          adjacentRow,
          adjacentColumn,
          boardParams,
          newGameParams,
          newCells
        ));
      }
    });
  }

  return { newCells, newGameParams };
};
