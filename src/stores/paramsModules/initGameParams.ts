import type { BoardParams } from "@/types/boardParams";
import type { GameParams } from "@/types/gameParams";

export const initGameParams = ({
  rowSize,
  columnSize,
  mineNumber,
}: BoardParams): GameParams => {
  return {
    hasGameStarted: false,
    hasOpenedAllSafeCells: false,
    hasOpenedMinedCell: false,
    remainingMineNumber: mineNumber,
    safeCellNumber: rowSize * columnSize - mineNumber,
  };
};
