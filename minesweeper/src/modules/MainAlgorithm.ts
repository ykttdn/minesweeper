import {
  COLUMN_SIZE_EASY,
  COLUMN_SIZE_HARD,
  EXPLODED_CELL,
  FACE_FAILURE,
  FACE_NORMAL,
  FACE_SUCCESS,
  FLAGGED_CELL,
  MINED_CELL,
  MINE_NUMBER_EASY,
  OPENED_CELL,
  ROW_SIZE_EASY,
  ROW_SIZE_HARD,
  UNOPENED_CELL,
  WRONGLY_FLAGGED_CELL,
} from "./GameParameters";
import { initialize2DArray } from "./Initialize2DArray";
import { getAdjacentCellsIndex } from "./GetAdjacentCellsIndex";
import { checkIfCellIsInsideBoard } from "./CheckIfCellIsInsideBoard";
import { advanceTimer } from "./AdvanceTimer";
import { changeResetButtonFace } from "./ChangeResetButtonFace";

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
let hasOpenedAllSafeCells = false;
let interval = 0;
let safeCellNumber = ROW_SIZE_EASY * COLUMN_SIZE_EASY - MINE_NUMBER_EASY;
export let isFlagModeOn = false;

export const toggleFlagMode = () => {
  const switchButton = document.getElementsByClassName("switch")[0];
  isFlagModeOn = switchButton.classList.toggle("switch--on");
};

export const initializeParameters = (
  rowSize: number,
  columnSize: number,
  mineNumber: number
) => {
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      isOpened[row][column] = false;
      isFlagged[row][column] = false;
    }
  }
  hasOpenedMinedCell = false;
  hasOpenedAllSafeCells = false;
  clearInterval(interval);
  interval = 0;
  safeCellNumber = rowSize * columnSize - mineNumber;
  changeResetButtonFace(FACE_NORMAL);
};

const openSafeCell = (row: number, column: number) => {
  const safeCell = document.getElementById(`cell-${row}-${column}`);
  if (safeCell === null) {
    return;
  }
  isOpened[row][column] = true;
  safeCell.className = OPENED_CELL;
  safeCellNumber--;
  console.log(`opened (${row}, ${column}) ${safeCellNumber}`);
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
  if (hasOpenedMinedCell || hasOpenedAllSafeCells) {
    return;
  }

  if (interval === 0) {
    interval = setInterval(advanceTimer, 1000, interval);
  }

  const cellTargeted = document.getElementById(`cell-${row}-${column}`);
  if (cellTargeted === null) {
    return;
  }

  const remainsCounter = document.getElementsByClassName("remains")[0];
  const sRemainingMines = remainsCounter.textContent;
  if (sRemainingMines === null) {
    return;
  }
  let remainingMines = parseInt(sRemainingMines.replace(/ /g, ""), 10);
  if (isNaN(remainingMines)) {
    return;
  }

  if (!isOpened[row][column]) {
    if (!isFlagged[row][column]) {
      isFlagged[row][column] = true;
      cellTargeted.className = FLAGGED_CELL;
      remainingMines--;
    } else {
      isFlagged[row][column] = false;
      cellTargeted.className = UNOPENED_CELL;
      remainingMines++;
    }

    if (remainingMines <= -100) {
      remainsCounter.textContent = "-99";
    } else if (remainingMines <= -10) {
      remainsCounter.textContent = `${remainingMines}`;
    } else if (remainingMines <= -1) {
      remainsCounter.textContent = `- ${-remainingMines}`;
    } else if (remainingMines <= 9) {
      remainsCounter.textContent = `00${remainingMines}`;
    } else if (remainingMines <= 99) {
      remainsCounter.textContent = `0${remainingMines}`;
    } else if (remainingMines <= 999) {
      remainsCounter.textContent = `${remainingMines}`;
    } else {
      remainsCounter.textContent = "999";
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
  if (hasOpenedMinedCell || hasOpenedAllSafeCells) {
    return;
  }

  if (interval === 0) {
    interval = setInterval(advanceTimer, 1000, interval);
  }

  const cellTargeted = document.getElementById(`cell-${row}-${column}`);
  if (cellTargeted === null) {
    return;
  }

  if (isFlagModeOn && !isOpened[row][column]) {
    toggleFlag(row, column);
    return;
  }

  if (isFlagged[row][column]) {
    return;
  }

  if (isMineHiddenIn[row][column]) {
    hasOpenedMinedCell = true;
    isOpened[row][column] = true;
    clearInterval(interval);
    cellTargeted.className = EXPLODED_CELL;
    console.log(`exploded (${row}, ${column})`);
  } else if (isOpened[row][column]) {
    executeChording(row, column, rowSize, columnSize);
  } else {
    openSafeCell(row, column);
    seekAdjacentMines(row, column, rowSize, columnSize);
  }

  if (safeCellNumber === 0) {
    hasOpenedAllSafeCells = true;
  }

  if (hasOpenedMinedCell || hasOpenedAllSafeCells) {
    clearInterval(interval);

    if (hasOpenedMinedCell) {
      changeResetButtonFace(FACE_FAILURE);
      for (let row = 0; row < rowSize; row++) {
        for (let column = 0; column < columnSize; column++) {
          if (
            !isOpened[row][column] &&
            isMineHiddenIn[row][column] &&
            !isFlagged[row][column]
          ) {
            const minedCell = document.getElementById(`cell-${row}-${column}`);
            if (minedCell === null) {
              continue;
            }
            minedCell.className = MINED_CELL;
          } else if (
            !isOpened[row][column] &&
            !isMineHiddenIn[row][column] &&
            isFlagged[row][column]
          ) {
            const wronglyFlaggedCell = document.getElementById(
              `cell-${row}-${column}`
            );
            if (wronglyFlaggedCell === null) {
              continue;
            }
            wronglyFlaggedCell.className = WRONGLY_FLAGGED_CELL;
          }
        }
      }
    } else {
      changeResetButtonFace(FACE_SUCCESS);
      for (let row = 0; row < rowSize; row++) {
        for (let column = 0; column < columnSize; column++) {
          if (isMineHiddenIn[row][column] && !isFlagged[row][column]) {
            const minedUnflaggedCell = document.getElementById(
              `cell-${row}-${column}`
            );
            if (minedUnflaggedCell === null) {
              return;
            }
            minedUnflaggedCell.className = FLAGGED_CELL;
          }
        }
      }
      const remainsCounter = document.getElementsByClassName("remains")[0];
      remainsCounter.textContent = "000";
    }
  }
};
