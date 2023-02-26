import { ref } from "vue";
import { defineStore } from "pinia";
import { initialize2DArray } from "@/utils/Initialize2DArray";
import { COLUMN_SIZE_HARD, ROW_SIZE_HARD } from "@/utils/GameParameters";
import { random } from "@/utils/random";
import { getAdjacentCellsIndex } from "@/utils/GetAdjacentCellsIndex";
import { isCellInsideBoard } from "@/utils/IsCellInsideBoard";

export const useCellStore = defineStore("cell", () => {
  const isMineHiddenIn = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );
  const isOpened = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );
  const isFlagged = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );

  const initializeCells = (rowSize: number, columnSize: number) => {
    for (let row = 0; row < rowSize; row++) {
      for (let column = 0; column < columnSize; column++) {
        isOpened.value[row][column] = false;
        isFlagged.value[row][column] = false;
      }
    }
  };

  const initializeMines = (
    rowSize: number,
    columnSize: number,
    mineNumber: number,
    rowClickedFirst: number,
    columnClickedFirst: number
  ) => {
    for (let row = 0; row < rowSize; row++) {
      for (let column = 0; column < columnSize; column++) {
        isMineHiddenIn.value[row][column] = false;
      }
    }

    for (let i = 0; i < mineNumber; i++) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const rowPickedRandomly = random(rowSize);
        const columnPickedRandomly = random(columnSize);
        if (
          !isMineHiddenIn.value[rowPickedRandomly][columnPickedRandomly] &&
          !(
            rowClickedFirst === rowPickedRandomly &&
            columnClickedFirst === columnPickedRandomly
          )
        ) {
          isMineHiddenIn.value[rowPickedRandomly][columnPickedRandomly] = true;
          break;
        }
      }
    }
  };

  const countAdjacentMines = (
    row: number,
    column: number,
    rowSize: number,
    columnSize: number
  ): number => {
    let adjacentMinesNumber = 0;
    const adjacentCells = getAdjacentCellsIndex(row, column);
    for (const [adjacentRow, adjacentColumn] of adjacentCells) {
      if (
        isCellInsideBoard(adjacentRow, adjacentColumn, rowSize, columnSize) &&
        isMineHiddenIn.value[adjacentRow][adjacentColumn]
      ) {
        adjacentMinesNumber++;
      }
    }

    return adjacentMinesNumber;
  };

  const openCell = (
    row: number,
    column: number,
    rowSize: number,
    columnSize: number
  ) => {
    isOpened.value[row][column] = true;

    const adjacentMinesNumber = countAdjacentMines(
      row,
      column,
      rowSize,
      columnSize
    );

    if (adjacentMinesNumber === 0) {
      const adjacentCells = getAdjacentCellsIndex(row, column);
      for (const [adjacentRow, adjacentColumn] of adjacentCells) {
        if (
          isCellInsideBoard(adjacentRow, adjacentColumn, rowSize, columnSize) &&
          !isOpened.value[adjacentRow][adjacentColumn]
        ) {
          openCell(adjacentRow, adjacentColumn, rowSize, columnSize);
        }
      }
    }
  };

  const executeChording = (
    row: number,
    column: number,
    rowSize: number,
    columnSize: number
  ) => {
    const adjacentCells = getAdjacentCellsIndex(row, column);
    for (const [adjacentRow, adjacentColumn] of adjacentCells) {
      if (
        isCellInsideBoard(adjacentRow, adjacentColumn, rowSize, columnSize) &&
        !isOpened.value[adjacentRow][adjacentColumn] &&
        !isFlagged.value[adjacentRow][adjacentColumn]
      ) {
        openCell(adjacentRow, adjacentColumn, rowSize, columnSize);
      }
    }
  };

  const toggleFlag = (row: number, column: number) => {
    isFlagged.value[row][column] = !isFlagged.value[row][column];
  };

  return {
    countAdjacentMines,
    executeChording,
    initializeCells,
    initializeMines,
    isFlagged,
    isMineHiddenIn,
    isOpened,
    openCell,
    toggleFlag,
  };
});