import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { COLUMN_SIZE_HARD, ROW_SIZE_HARD } from "@/utils/GameParameters";
import { random } from "@/utils/random";
import { getAdjacentCellsIndex } from "@/utils/GetAdjacentCellsIndex";
import { useParametersStore } from "./parameters";
import { init2dCellArray } from "@/utils/Init2dCellArray";
import type { Cell } from "@/types/cell";

export const useCellStore = defineStore("cell", () => {
  const parameters = useParametersStore();
  const { gameParams } = storeToRefs(parameters);

  const cells = ref(init2dCellArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD));

  const newCells = (
    oldCells: Cell[][],
    rowSize: number,
    columnSize: number
  ) => {
    const newCells = [...oldCells];
    for (let row = 0; row < rowSize; row++) {
      for (let column = 0; column < columnSize; column++) {
        newCells[row][column] = {
          isMineHiddenIn: false,
          isOpened: false,
          isFlagged: false,
        };
      }
    }
    return newCells;
  };

  const initializeMines = (
    rowSize: number,
    columnSize: number,
    mineNumber: number,
    rowClickedFirst: number,
    columnClickedFirst: number
  ) => {
    for (let i = 0; i < mineNumber; i++) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const rowPickedRandomly = random(rowSize);
        const columnPickedRandomly = random(columnSize);
        if (
          !cells.value[rowPickedRandomly][columnPickedRandomly]
            .isMineHiddenIn &&
          !(
            rowClickedFirst === rowPickedRandomly &&
            columnClickedFirst === columnPickedRandomly
          )
        ) {
          cells.value[rowPickedRandomly][columnPickedRandomly].isMineHiddenIn =
            true;
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
    const adjacentCells = getAdjacentCellsIndex(
      row,
      column,
      rowSize,
      columnSize
    );
    for (const [adjacentRow, adjacentColumn] of adjacentCells) {
      if (cells.value[adjacentRow][adjacentColumn].isMineHiddenIn) {
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
    cells.value[row][column].isOpened = true;

    if (cells.value[row][column].isMineHiddenIn) {
      gameParams.value.hasOpenedMinedCell = true;
    } else {
      gameParams.value.safeCellNumber--;
    }

    if (gameParams.value.hasOpenedMinedCell) {
      return;
    }

    const adjacentMinesNumber = countAdjacentMines(
      row,
      column,
      rowSize,
      columnSize
    );

    if (adjacentMinesNumber === 0) {
      const adjacentCells = getAdjacentCellsIndex(
        row,
        column,
        rowSize,
        columnSize
      );
      for (const [adjacentRow, adjacentColumn] of adjacentCells) {
        if (!cells.value[adjacentRow][adjacentColumn].isOpened) {
          cells.value[adjacentRow][adjacentColumn].isFlagged = false;
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
    const adjacentCells = getAdjacentCellsIndex(
      row,
      column,
      rowSize,
      columnSize
    );
    for (const [adjacentRow, adjacentColumn] of adjacentCells) {
      if (
        !cells.value[adjacentRow][adjacentColumn].isOpened &&
        !cells.value[adjacentRow][adjacentColumn].isFlagged
      ) {
        openCell(adjacentRow, adjacentColumn, rowSize, columnSize);
      }
    }
  };

  const toggleFlag = (row: number, column: number) => {
    if (cells.value[row][column].isFlagged) {
      cells.value[row][column].isFlagged = false;
      gameParams.value.remainingMineNumber++;
    } else {
      cells.value[row][column].isFlagged = true;
      gameParams.value.remainingMineNumber--;
    }
  };

  return {
    cells,
    countAdjacentMines,
    executeChording,
    initializeMines,
    newCells,
    openCell,
    toggleFlag,
  };
});
