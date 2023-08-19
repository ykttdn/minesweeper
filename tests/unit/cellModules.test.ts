import { describe, expect, test } from "vitest";
import type { BoardParams } from "../../src/types/boardParams";
import type { Cell } from "../../src/types/cell";
import type { CellIndex } from "../../src/types/cellIndex";
import type { GameParams } from "../../src/types/gameParams";
import { countAdjacentMines } from "../../src/stores/cellModules/countAdjacentMines";
import { initializeMines } from "../../src/stores/cellModules/initializeMines";
import { openCell } from "../../src/stores/cellModules/openCell";
import { toggleFlag } from "../../src/stores/cellModules/toggleFlag";
import { init2dCellArray } from "../../src/utils/Init2dCellArray";
import {
  ROW_SIZE_HARD,
  COLUMN_SIZE_HARD,
} from "../../src/utils/GameParameters";
import { random } from "../../src/utils/random";
import { getAdjacentCellsIndex } from "../../src/utils/GetAdjacentCellsIndex";
import { initGameParams } from "../../src/stores/paramsModules/initGameParams";
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

  test("should return adjacent mines' number", () => {
    // . : blank cell
    // M : mined cell
    // a-h : target cell (not mined)
    //
    //   0 1 2 3 4 5 6 7 8 9
    // 0 a b c . . . . . . .
    // 1 . M M M M M M M M M
    // 2 . d e . f . g M h M
    // 3 M M . M M M M M M M

    const rowSize = 4;
    const columnSize = 10;

    type TargetCell = {
      name: string;
      index: CellIndex;
      adjacentMineNumber: number;
    };
    const targetCells: TargetCell[] = [
      { name: "a", index: [0, 0], adjacentMineNumber: 1 },
      { name: "b", index: [0, 1], adjacentMineNumber: 2 },
      { name: "c", index: [0, 2], adjacentMineNumber: 3 },
      { name: "d", index: [2, 1], adjacentMineNumber: 4 },
      { name: "e", index: [2, 2], adjacentMineNumber: 5 },
      { name: "f", index: [2, 4], adjacentMineNumber: 6 },
      { name: "g", index: [2, 6], adjacentMineNumber: 7 },
      { name: "h", index: [2, 8], adjacentMineNumber: 8 },
    ];

    const mineIndices: CellIndex[] = [];
    for (let i = 1; i <= 9; i++) {
      mineIndices.push([1, i]);
    }
    mineIndices.push([2, 7]);
    mineIndices.push([2, 9]);
    for (let i = 0; i <= 9; i++) {
      if (i === 2) continue;
      mineIndices.push([3, i]);
    }

    const minedCells: Cell[][] = init2dCellArray(rowSize, columnSize);
    mineIndices.forEach(([row, column]) => {
      minedCells[row][column].isMineHiddenIn = true;
    });

    targetCells.forEach((targetCell) => {
      expect(
        countAdjacentMines(...targetCell.index, rowSize, columnSize, minedCells)
      ).toBe(targetCell.adjacentMineNumber);
    });
  });

  test("should open cells", () => {
    // . : blank cell (unopened => opened)
    // M : mined cell
    // F : flagged cell (mined)
    // f : flagged cell (not mined)
    // 1-2 : opened cell (represents adjacent mines' number)
    // x : cell remaining unopened
    // t : target cell (not mined)
    //
    // original                 expected
    //   0 1 2 3 4 5 6 7 8        0 1 2 3 4 5 6 7 8
    // 0 . . . . . . . . F      0 . . . 1 x 1 . 1 F
    // 1 . . . . M . . . .      1 . . . 1 M 1 . 1 1
    // 2 . . . . . f . . .      2 1 1 . 1 1 1 . . .
    // 3 M . . . . . . t .      3 M 2 1 . . . . t .
    // 4 . M . . f . . . .  =>  4 x M 1 . . . . . .
    // 5 . . . . . . . . .      5 x 1 1 . . 1 1 1 .
    // 6 . . . . . . M . .      6 x 1 . . . 1 M 1 .
    // 7 M . . . . . . . .      7 M 1 . . . 1 1 1 .
    // 8 . . . . . . . . .      8 x 1 . . . . . . .

    const mineIndices: CellIndex[] = [
      [0, 8],
      [1, 4],
      [3, 0],
      [4, 1],
      [6, 6],
      [7, 0],
    ];
    const flagIndices: CellIndex[] = [
      [0, 8],
      [2, 5],
      [4, 4],
    ];

    const rowSize = 9;
    const columnSize = 9;
    const mineNumber = mineIndices.length;
    const boardParams: BoardParams = {
      rowSize: rowSize,
      columnSize: columnSize,
      mineNumber: mineNumber,
    };

    const minedCells: Cell[][] = init2dCellArray(rowSize, columnSize);
    mineIndices.forEach(([row, column]) => {
      minedCells[row][column].isMineHiddenIn = true;
    });
    flagIndices.forEach(([row, column]) => {
      minedCells[row][column].isFlagged = true;
    });

    const gameParams: GameParams = initGameParams(boardParams);

    const expectedCells = JSON.parse(JSON.stringify(minedCells)) as Cell[][];
    expectedCells.forEach((cellRow, row) => {
      cellRow.forEach((cell, column) => {
        if (
          // if cell at [row, column] is not mined
          !mineIndices.some(
            (mineIndex) => mineIndex[0] === row && mineIndex[1] === column
          )
        ) {
          // eslint-disable-next-line no-param-reassign
          cell.isOpened = true;
        }
      });
    });
    // cells which are marked with "x"
    expectedCells[0][4].isOpened = false;
    expectedCells[4][0].isOpened = false;
    expectedCells[5][0].isOpened = false;
    expectedCells[6][0].isOpened = false;
    expectedCells[8][0].isOpened = false;

    // cells which are marked with "f"
    expectedCells[2][5].isFlagged = false;
    expectedCells[4][4].isFlagged = false;

    const expectedGameParams: GameParams = { ...gameParams };
    expectedGameParams.safeCellNumber = 5; // number of "x"

    const targetCell: CellIndex = [3, 7];

    expect(
      openCell(...targetCell, boardParams, gameParams, minedCells)
    ).toStrictEqual({
      newCells: expectedCells,
      newGameParams: expectedGameParams,
    });
  });

  test("should toggle flag", () => {
    // . : blank cell (not opened)
    // F : flagged cell
    // O : opened cell
    //
    //   0 1 2
    // 0 F . .
    // 1 . O .
    // 2 . . .
    const rowSize = 3;
    const columnSize = 3;
    const mineNumber = 2;

    const cells: Cell[][] = init2dCellArray(rowSize, columnSize);
    cells[0][0].isFlagged = true;
    cells[1][1].isOpened = true;

    const gameParams: GameParams = initGameParams({
      rowSize: rowSize,
      columnSize: columnSize,
      mineNumber: mineNumber,
    });

    // should add a flag
    //   0 1 2
    // 0 F . .
    // 1 . O F
    // 2 . . .
    const targetCell1: CellIndex = [1, 2];

    const expectedCells1 = JSON.parse(JSON.stringify(cells)) as Cell[][];
    expectedCells1[targetCell1[0]][targetCell1[1]].isFlagged = true;

    const expectedGameParams1 = { ...gameParams };
    expectedGameParams1.remainingMineNumber--;

    expect(toggleFlag(...targetCell1, cells, gameParams)).toStrictEqual({
      newCells: expectedCells1,
      newGameParams: expectedGameParams1,
    });

    // should remove a flag
    //   0 1 2
    // 0 . . .
    // 1 . O F
    // 2 . . .
    const expectedCells2 = JSON.parse(
      JSON.stringify(expectedCells1)
    ) as Cell[][];
    expectedCells2[0][0].isFlagged = false;

    const expectedGameParams2 = { ...expectedGameParams1 };
    expectedGameParams2.remainingMineNumber++;

    expect(toggleFlag(0, 0, expectedCells1, expectedGameParams1)).toStrictEqual(
      {
        newCells: expectedCells2,
        newGameParams: expectedGameParams2,
      }
    );
  });
});
