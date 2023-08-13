import type { BoardParams } from "@/types/boardParams";
import type { Level } from "@/types/level";
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
} from "@/utils/GameParameters";

export const setBoardParams = (level: Level): BoardParams => {
  let rowSize: number, columnSize: number, mineNumber: number;

  if (level === "normal") {
    rowSize = ROW_SIZE_NORMAL;
    columnSize = COLUMN_SIZE_NORMAL;
    mineNumber = MINE_NUMBER_NORMAL;
  } else if (level === "hard") {
    rowSize = ROW_SIZE_HARD;
    columnSize = COLUMN_SIZE_HARD;
    mineNumber = MINE_NUMBER_HARD;
  } else {
    rowSize = ROW_SIZE_EASY;
    columnSize = COLUMN_SIZE_EASY;
    mineNumber = MINE_NUMBER_EASY;
  }

  return { rowSize, columnSize, mineNumber };
};
