import {
  COLUMN_SIZE_HARD,
  EXPLODED_CELL,
  FLAGGED_CELL,
  OPENED_CELL,
  ROW_SIZE_HARD,
  UNOPENED_CELL,
} from "./GameParameters";
import { initialize2DArray } from "./Initialize2DArray";
import { getAdjacentCellsIndex } from "./GetAdjacentCellsIndex";
import { checkIfCellIsInsideBoard } from "./CheckIfCellIsInsideBoard";

export const isMineHiddenIn = initialize2DArray(
  ROW_SIZE_HARD,
  COLUMN_SIZE_HARD,
  false
);
const isOpened = initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false);
const isFlagged = initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false);

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

export const initializeParameters = (rowSize: number, columnSize: number) => {
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      isOpened[row][column] = false;
      isFlagged[row][column] = false;
    }
  }
};

const openSafeCell = (row: number, column: number) => {
  const safeCell = document.getElementById(`cell-${row}-${column}`);
  if (safeCell === null) {
    return;
  }
  isOpened[row][column] = true;
  safeCell.className = OPENED_CELL;
  console.log(`opened (${row}, ${column})`);

  // safeCellCount--;
};

const seekAdjacentMines = (
  row: number,
  column: number,
  rowSize: number,
  columnSize: number
) => {
  let adjacentMinesNumber = 0;
  const adjacentCells = getAdjacentCellsIndex(row, column);
  for (const [adjacentRow, adjacentColumn] of adjacentCells) {
    if (
      checkIfCellIsInsideBoard(
        adjacentRow,
        adjacentColumn,
        rowSize,
        columnSize
      ) &&
      isMineHiddenIn[adjacentRow][adjacentColumn]
    ) {
      adjacentMinesNumber++;
    }
  }

  if (adjacentMinesNumber > 0) {
    const adjacentCell = document.getElementById(`cell-${row}-${column}`);
    if (adjacentCell === null) {
      return;
    }
    adjacentCell.textContent = `${adjacentMinesNumber}`;
    adjacentCell.classList.add(`cnt-${adjacentMinesNumber}`);
  }
  //  if (!hasOpenedMinedCell)
  else {
    for (const [adjacentRow, adjacentColumn] of adjacentCells) {
      if (
        checkIfCellIsInsideBoard(
          adjacentRow,
          adjacentColumn,
          rowSize,
          columnSize
        ) &&
        !isOpened[adjacentRow][adjacentColumn]
      ) {
        openSafeCell(adjacentRow, adjacentColumn);
        seekAdjacentMines(adjacentRow, adjacentColumn, rowSize, columnSize);
      }
    }
  }
};

export const toggleFlag = (row: number, column: number) => {
  const cellTargeted = document.getElementById(`cell-${row}-${column}`);
  if (cellTargeted === null) {
    return;
  }

  if (!isOpened[row][column]) {
    if (!isFlagged[row][column]) {
      isFlagged[row][column] = true;
      cellTargeted.className = FLAGGED_CELL;
    } else {
      isFlagged[row][column] = false;
      cellTargeted.className = UNOPENED_CELL;
    }
  }
};

export const touchCell = (
  row: number,
  column: number,
  rowSize: number,
  columnSize: number
) => {
  const cellTargeted = document.getElementById(`cell-${row}-${column}`);
  if (cellTargeted === null) {
    return;
  }

  if (isFlagged[row][column]) {
    return;
  }

  if (isMineHiddenIn[row][column]) {
    cellTargeted.className = EXPLODED_CELL;
    console.log(`exploded (${row}, ${column})`);
    return;
  }

  if (!isOpened[row][column]) {
    openSafeCell(row, column);
    seekAdjacentMines(row, column, rowSize, columnSize);
  }
};
