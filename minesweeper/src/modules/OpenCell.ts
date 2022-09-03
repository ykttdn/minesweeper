import {
  COLUMN_SIZE_HARD,
  EXPLODED_CELL,
  OPENED_CELL,
  ROW_SIZE_HARD,
} from "./GameParameters";
import { initialize2DArray } from "./Initialize2DArray";

export const isMineHiddenIn = initialize2DArray(
  ROW_SIZE_HARD,
  COLUMN_SIZE_HARD,
  false
);

// 0 以上 val 未満の整数乱数を返す
const random = (val: number) => Math.floor(Math.random() * val);

export const initializeMines = (
  rowSize: number,
  columnSize: number,
  mineNumber: number,
  rowClickedFirst: number,
  columnClickedFirst: number
) => {
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      isMineHiddenIn[row][column] = false;
    }
  }

  for (let i = 0; i < mineNumber; i++) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const rowPickedRandomly = random(rowSize);
      const columnPickedRandomly = random(columnSize);
      if (
        !isMineHiddenIn[rowPickedRandomly][columnPickedRandomly] &&
        !(
          rowClickedFirst === rowPickedRandomly &&
          columnClickedFirst === columnPickedRandomly
        )
      ) {
        isMineHiddenIn[rowPickedRandomly][columnPickedRandomly] = true;
        break;
      }
    }
  }
};

export const openCell = (row: number, column: number) => {
  const cellTargeted = document.getElementById(`cell-${row}-${column}`);
  if (cellTargeted === null) {
    return;
  }
  if (isMineHiddenIn[row][column]) {
    cellTargeted.className = EXPLODED_CELL;
    console.log(`exploded (${row}, ${column})`);
    return;
  }

  cellTargeted.className = OPENED_CELL;
  console.log(`opened (${row}, ${column})`);
};
