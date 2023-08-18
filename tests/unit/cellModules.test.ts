import { describe, expect, test } from "vitest";
import type { BoardParams } from "../../src/types/boardParams";
import type { Cell } from "../../src/types/cell";
import { initializeMines } from "../../src/stores/cellModules/initializeMines";
import { init2dCellArray } from "../../src/utils/Init2dCellArray";
import {
  ROW_SIZE_HARD,
  COLUMN_SIZE_HARD,
} from "../../src/utils/GameParameters";
import { random } from "../../src/utils/random";
import { setBoardParams } from "../../src/stores/paramsModules/setBoardParams";

describe("Cell modules", () => {
  test("should initialize cells", () => {
    const cells: Cell[][] = init2dCellArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD);

    // row size of cell array
    expect(cells).toHaveLength(ROW_SIZE_HARD);

    cells.forEach((cellRow) => {
      // column size of cell array
      expect(cellRow).toHaveLength(COLUMN_SIZE_HARD);

      cellRow.forEach((cell) => {
        expect(cell).toStrictEqual({
          isMineHiddenIn: false,
          isOpened: false,
          isFlagged: false,
        });
      });
    });
  });

  test("should initialize mines", () => {
    const cells: Cell[][] = init2dCellArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD);

    const boardParams: BoardParams = setBoardParams("normal");

    const rowClickedFirst = random(boardParams.rowSize);
    const columnClickedFirst = random(boardParams.columnSize);

    const minedCells: Cell[][] = initializeMines(
      boardParams,
      rowClickedFirst,
      columnClickedFirst,
      cells
    );

    expect(minedCells[rowClickedFirst][columnClickedFirst].isMineHiddenIn).toBe(
      false
    );

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
