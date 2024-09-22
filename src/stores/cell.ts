import { defineStore } from "pinia";
import { ref } from "vue";

import type { BoardParams } from "@/types/boardParams";
import type { Cell } from "@/types/cell";
import type { GameParams } from "@/types/gameParams";
import { COLUMN_SIZE_HARD, ROW_SIZE_HARD } from "@/utils/GameParameters";
import { getAdjacentCellsIndex } from "@/utils/GetAdjacentCellsIndex";
import { init2dCellArray } from "@/utils/Init2dCellArray";
import { random } from "@/utils/random";

export const useCellStore = defineStore("cell", () => {
  const cells = ref(init2dCellArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD));

  const initializeCells = (rowSize: number, columnSize: number): void => {
    cells.value = init2dCellArray(rowSize, columnSize);
  };

  const initializeMines = (
    { rowSize, columnSize, mineNumber }: BoardParams,
    rowClickedFirst: number,
    columnClickedFirst: number,
    cells: Cell[][]
  ): Cell[][] => {
    const newCells = [...cells];

    for (let i = 0; i < mineNumber; i++) {
      while (true) {
        const rowPickedRandomly = random(rowSize);
        const columnPickedRandomly = random(columnSize);
        if (
          !newCells[rowPickedRandomly][columnPickedRandomly].isMineHiddenIn &&
          !(rowClickedFirst === rowPickedRandomly && columnClickedFirst === columnPickedRandomly)
        ) {
          newCells[rowPickedRandomly][columnPickedRandomly].isMineHiddenIn = true;
          break;
        }
      }
    }

    return newCells;
  };

  const countAdjacentMines = (
    row: number,
    column: number,
    rowSize: number,
    columnSize: number,
    cells: Cell[][]
  ): number => {
    let adjacentMinesNumber = 0;
    const adjacentCells = getAdjacentCellsIndex(row, column, rowSize, columnSize);
    adjacentCells.forEach(([adjacentRow, adjacentColumn]) => {
      if (cells[adjacentRow][adjacentColumn].isMineHiddenIn) {
        adjacentMinesNumber++;
      }
    });

    return adjacentMinesNumber;
  };

  const openCell = (
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

  const executeChording = (
    row: number,
    column: number,
    boardParams: BoardParams,
    gameParams: GameParams,
    cells: Cell[][]
  ) => {
    let newCells = [...cells];
    let newGameParams = { ...gameParams };

    const adjacentCells = getAdjacentCellsIndex(
      row,
      column,
      boardParams.rowSize,
      boardParams.columnSize
    );
    adjacentCells.forEach(([adjacentRow, adjacentColumn]) => {
      if (
        !newCells[adjacentRow][adjacentColumn].isOpened &&
        !newCells[adjacentRow][adjacentColumn].isFlagged
      ) {
        ({ newCells: newCells, newGameParams: newGameParams } = openCell(
          adjacentRow,
          adjacentColumn,
          boardParams,
          newGameParams,
          newCells
        ));
      }
    });

    return { newCells, newGameParams };
  };

  const toggleFlag = (row: number, column: number, cells: Cell[][], gameParams: GameParams) => {
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

  return {
    cells,
    countAdjacentMines,
    executeChording,
    initializeCells,
    initializeMines,
    openCell,
    toggleFlag,
  };
});
