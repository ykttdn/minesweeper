import { describe, expect, test } from "vitest";
import type { BoardParams } from "../../src/types/boardParams";
import type { Cell } from "../../src/types/cell";
import { initializeMines } from "../../src/stores/cellModules/initializeMines";
import { init2dCellArray } from "../../src/utils/Init2dCellArray";
import {
  ROW_SIZE_HARD,
  COLUMN_SIZE_HARD,
  ROW_SIZE_NORMAL,
  COLUMN_SIZE_NORMAL,
  MINE_NUMBER_NORMAL,
} from "../../src/utils/GameParameters";
import { random } from "../../src/utils/random";

describe("Cell modules", () => {
  const cells: Cell[][] = init2dCellArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD);

  test("should initialize cells", () => {
    // row size of cell array
    expect(cells.length).toBe(ROW_SIZE_HARD);

    for (const cellRow of cells) {
      // column size of cell array
      expect(cellRow.length).toBe(COLUMN_SIZE_HARD);

      for (const cell of cellRow) {
        expect(cell).toStrictEqual({
          isMineHiddenIn: false,
          isOpened: false,
          isFlagged: false,
        });
      }
    }
  });

  const boardParams: BoardParams = {
    rowSize: ROW_SIZE_NORMAL,
    columnSize: COLUMN_SIZE_NORMAL,
    mineNumber: MINE_NUMBER_NORMAL,
  };

  const rowClickedFirst = random(boardParams.rowSize);
  const columnClickedFirst = random(boardParams.columnSize);

  const minedCells: Cell[][] = initializeMines(
    boardParams,
    rowClickedFirst,
    columnClickedFirst,
    cells
  );

  test("should initialize mines", () => {
    expect(minedCells[rowClickedFirst][columnClickedFirst].isMineHiddenIn)
      .toBeFalsy;

    let count = 0;
    minedCells.forEach((cellRow, row) => {
      cellRow.forEach((cell, column) => {
        if (
          cell.isMineHiddenIn &&
          row < boardParams.rowSize &&
          column < boardParams.columnSize
        ) {
          count++;
        }
      });
    });
    expect(count).toBe(boardParams.mineNumber);
  });
});
