import { describe, expect, test } from "vitest";
import type { Cell } from "../../src/types/cell";
import { init2dCellArray } from "../../src/utils/Init2dCellArray";
import {
  ROW_SIZE_HARD,
  COLUMN_SIZE_HARD,
} from "../../src/utils/GameParameters";

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
});
