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
import { getAdjacentCellsIndex } from "../../src/utils/GetAdjacentCellsIndex";
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

  test("should return adjacent cells' indices", () => {
    const boardParams: BoardParams = setBoardParams("easy");

    expect(
      getAdjacentCellsIndex(0, 0, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [0, 1],
      [1, 0],
      [1, 1],
    ]);

    expect(
      getAdjacentCellsIndex(0, 4, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [0, 3],
      [0, 5],
      [1, 3],
      [1, 4],
      [1, 5],
    ]);

    expect(
      getAdjacentCellsIndex(0, 8, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [0, 7],
      [1, 7],
      [1, 8],
    ]);

    expect(
      getAdjacentCellsIndex(4, 0, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [3, 0],
      [3, 1],
      [4, 1],
      [5, 0],
      [5, 1],
    ]);

    expect(
      getAdjacentCellsIndex(4, 4, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [3, 3],
      [3, 4],
      [3, 5],
      [4, 3],
      [4, 5],
      [5, 3],
      [5, 4],
      [5, 5],
    ]);

    expect(
      getAdjacentCellsIndex(4, 8, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [3, 7],
      [3, 8],
      [4, 7],
      [5, 7],
      [5, 8],
    ]);

    expect(
      getAdjacentCellsIndex(8, 0, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [7, 0],
      [7, 1],
      [8, 1],
    ]);

    expect(
      getAdjacentCellsIndex(8, 4, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [7, 3],
      [7, 4],
      [7, 5],
      [8, 3],
      [8, 5],
    ]);

    expect(
      getAdjacentCellsIndex(8, 8, boardParams.rowSize, boardParams.columnSize)
    ).toStrictEqual([
      [7, 7],
      [7, 8],
      [8, 7],
    ]);
  });
});
