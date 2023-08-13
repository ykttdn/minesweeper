import { describe, expect, test } from "vitest";
import {
  COLUMN_SIZE_EASY,
  COLUMN_SIZE_HARD,
  COLUMN_SIZE_NORMAL,
  MINE_NUMBER_EASY,
  MINE_NUMBER_HARD,
  MINE_NUMBER_NORMAL,
  ROW_SIZE_EASY,
  ROW_SIZE_HARD,
  ROW_SIZE_NORMAL,
} from "../../src/utils/GameParameters";
import { initGameParams } from "../../src/stores/paramsModules/initGameParams";
import { toggleFlagMode } from "../../src/stores/paramsModules/toggleFlagMode";

describe("Params modules", () => {
  test("Initialize game params (Level: EASY)", () => {
    expect(
      initGameParams({
        rowSize: ROW_SIZE_EASY,
        columnSize: COLUMN_SIZE_EASY,
        mineNumber: MINE_NUMBER_EASY,
      })
    ).toStrictEqual({
      hasGameStarted: false,
      hasOpenedAllSafeCells: false,
      hasOpenedMinedCell: false,
      remainingMineNumber: MINE_NUMBER_EASY,
      safeCellNumber: ROW_SIZE_EASY * COLUMN_SIZE_EASY - MINE_NUMBER_EASY,
    });
  });
  test("Initialize game params (Level: NORMAL)", () => {
    expect(
      initGameParams({
        rowSize: ROW_SIZE_NORMAL,
        columnSize: COLUMN_SIZE_NORMAL,
        mineNumber: MINE_NUMBER_NORMAL,
      })
    ).toStrictEqual({
      hasGameStarted: false,
      hasOpenedAllSafeCells: false,
      hasOpenedMinedCell: false,
      remainingMineNumber: MINE_NUMBER_NORMAL,
      safeCellNumber: ROW_SIZE_NORMAL * COLUMN_SIZE_NORMAL - MINE_NUMBER_NORMAL,
    });
  });
  test("Initialize game params (Level: HARD)", () => {
    expect(
      initGameParams({
        rowSize: ROW_SIZE_HARD,
        columnSize: COLUMN_SIZE_HARD,
        mineNumber: MINE_NUMBER_HARD,
      })
    ).toStrictEqual({
      hasGameStarted: false,
      hasOpenedAllSafeCells: false,
      hasOpenedMinedCell: false,
      remainingMineNumber: MINE_NUMBER_HARD,
      safeCellNumber: ROW_SIZE_HARD * COLUMN_SIZE_HARD - MINE_NUMBER_HARD,
    });
  });

  test("Toggle flag mode", () => {
    expect(toggleFlagMode(false)).toBe(true);
    expect(toggleFlagMode(true)).toBe(false);
  });
});
