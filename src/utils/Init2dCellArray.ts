import type { Cell } from "@/types/cell";

export const init2dCellArray = (
  rowSize: number,
  columnSize: number
): Cell[][] => {
  const initialCell: Cell = {
    isMineHiddenIn: false,
    isOpened: false,
    isFlagged: false,
  };

  return JSON.parse(
    JSON.stringify(
      new Array(rowSize).fill(new Array(columnSize).fill(initialCell))
    )
  );
};
