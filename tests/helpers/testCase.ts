import type { CellIndex } from "@/types/cellIndex";
import { COLUMN_SIZE_EASY, ROW_SIZE_EASY } from "@/utils/GameParameters";
import { init2dCellArray } from "@/utils/Init2dCellArray";

/*
. : blank cell (unopened => opened)
M : mined cell
F : flagged cell (mined)
f : flagged cell (not mined)
1-2 : opened cell (represents adjacent mines' number)
x : cell remaining unopened
t : target cell (not mined)

original                 expected
  0 1 2 3 4 5 6 7 8        0 1 2 3 4 5 6 7 8
0 . . . . . . . . F      0 . . . 1 x 1 . 1 F
1 . . . . M . . . .      1 . . . 1 M 1 . 1 1
2 . . . . . f . . .      2 1 1 . 1 1 1 . . .
3 M . . . . . . t .      3 M 2 1 . . . . t .
4 . M . . f . . . .  =>  4 x M 1 . . . . . .
5 . . . . . . . . .      5 x 1 1 . . 1 1 1 .
6 M . . . . . M . .      6 M 2 . . . 1 M 1 .
7 M . . . . . . . .      7 M 5 2 1 . 1 1 1 .
8 M M M . . . . . .      8 M M M 1 . . . . .
*/

const mineIndices: CellIndex[] = [
  [0, 8],
  [1, 4],
  [3, 0],
  [4, 1],
  [6, 0],
  [6, 6],
  [7, 0],
  [8, 0],
  [8, 1],
  [8, 2],
];

const flagIndices: CellIndex[] = [
  [0, 8],
  [2, 5],
  [4, 4],
];

const minedCells = init2dCellArray(ROW_SIZE_EASY, COLUMN_SIZE_EASY);
mineIndices.forEach(([row, column]) => {
  minedCells[row][column].isMineHiddenIn = true;
});
flagIndices.forEach(([row, column]) => {
  minedCells[row][column].isFlagged = true;
});

const targetCellIndex: CellIndex = [3, 7];

const unopenedCellIndices: CellIndex[] = [
  [0, 4],
  [0, 8],
  [1, 4],
  [3, 0],
  [4, 0],
  [4, 1],
  [5, 0],
  [6, 0],
  [6, 6],
  [7, 0],
  [8, 0],
  [8, 1],
  [8, 2],
];

const openedCellIndices: CellIndex[] = [];
for (let row = 0; row < ROW_SIZE_EASY; row++) {
  for (let col = 0; col < COLUMN_SIZE_EASY; col++) {
    if (
      !unopenedCellIndices.some(([unopened_row, unopened_col]) => {
        return unopened_row === row && unopened_col === col;
      })
    ) {
      openedCellIndices.push([row, col]);
    }
  }
}

const testCase = { minedCells, targetCellIndex, openedCellIndices, unopenedCellIndices };

export { testCase };
