import {
  COLUMN_SIZE_HARD,
  EXPLODED_CELL,
  FLAGGED_CELL,
  OPENED_CELL,
  ROW_SIZE_HARD,
  UNOPENED_CELL,
  WRONGLY_FLAGGED_CELL,
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

let hasOpenedMinedCell = false;

export const initializeParameters = (rowSize: number, columnSize: number) => {
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      isOpened[row][column] = false;
      isFlagged[row][column] = false;
    }
  }
  hasOpenedMinedCell = false;
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
    const targetedCell = document.getElementById(`cell-${row}-${column}`);
    if (targetedCell === null) {
      return;
    }
    targetedCell.textContent = `${adjacentMinesNumber}`;
    targetedCell.classList.add(`cnt-${adjacentMinesNumber}`);
  } else if (!hasOpenedMinedCell) {
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

const executeChording = (
  row: number,
  column: number,
  rowSize: number,
  columnSize: number
) => {
  const clickedCell = document.getElementById(`cell-${row}-${column}`);
  if (clickedCell === null) {
    return;
  }

  const sMineCount = clickedCell.textContent;
  if (
    sMineCount === null ||
    sMineCount === "" ||
    sMineCount < "1" ||
    sMineCount > "8"
  ) {
    return;
  }
  const mineCount = parseInt(sMineCount, 10);

  let adjacentFlagNumber = 0;
  const adjacentCells = getAdjacentCellsIndex(row, column);
  for (const [adjacentRow, adjacentColumn] of adjacentCells) {
    if (
      checkIfCellIsInsideBoard(
        adjacentRow,
        adjacentColumn,
        rowSize,
        columnSize
      ) &&
      isFlagged[adjacentRow][adjacentColumn]
    ) {
      adjacentFlagNumber++;
    }
  }

  if (mineCount === adjacentFlagNumber) {
    let canExecuteChording = true;
    for (const [adjacentRow, adjacentColumn] of adjacentCells) {
      if (
        checkIfCellIsInsideBoard(
          adjacentRow,
          adjacentColumn,
          rowSize,
          columnSize
        ) &&
        isFlagged[adjacentRow][adjacentColumn] &&
        !isMineHiddenIn[adjacentRow][adjacentColumn]
      ) {
        canExecuteChording = false;
      }
    }
    console.log(canExecuteChording ? "chording" : "error");

    if (canExecuteChording) {
      for (const [adjacentRow, adjacentColumn] of adjacentCells) {
        if (
          checkIfCellIsInsideBoard(
            adjacentRow,
            adjacentColumn,
            rowSize,
            columnSize
          ) &&
          !isOpened[adjacentRow][adjacentColumn] &&
          !isFlagged[adjacentRow][adjacentColumn]
        ) {
          openSafeCell(adjacentRow, adjacentColumn);
          seekAdjacentMines(adjacentRow, adjacentColumn, rowSize, columnSize);
        }
      }
    } else {
      hasOpenedMinedCell = true;
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
          const adjacentCell = document.getElementById(
            `cell-${adjacentRow}-${adjacentColumn}`
          );
          if (adjacentCell === null) {
            continue;
          }
          if (
            isFlagged[adjacentRow][adjacentColumn] &&
            !isMineHiddenIn[adjacentRow][adjacentColumn]
          ) {
            adjacentCell.className = WRONGLY_FLAGGED_CELL;
          } else if (
            !isFlagged[adjacentRow][adjacentColumn] &&
            isMineHiddenIn[adjacentRow][adjacentColumn]
          ) {
            adjacentCell.className = EXPLODED_CELL;
          } else if (!isFlagged[adjacentRow][adjacentColumn]) {
            openSafeCell(adjacentRow, adjacentColumn);
            seekAdjacentMines(adjacentRow, adjacentColumn, rowSize, columnSize);
          }
        }
      }
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

  if (isOpened[row][column]) {
    executeChording(row, column, rowSize, columnSize);
  } else {
    openSafeCell(row, column);
    seekAdjacentMines(row, column, rowSize, columnSize);
  }
};
