import type { Cell } from "@/types/cell";
import type { GameParams } from "@/types/gameParams";

export const toggleFlag = (
  row: number,
  column: number,
  cells: Cell[][],
  gameParams: GameParams
) => {
  const newCells = [...cells];
  const newGameParams = { ...gameParams };

  if (newCells[row][column].isFlagged) {
    newCells[row][column].isFlagged = false;
    newGameParams.remainingMineNumber++;
  } else {
    newCells[row][column].isFlagged = true;
    newGameParams.remainingMineNumber--;
  }

  return { newCells, newGameParams };
};
