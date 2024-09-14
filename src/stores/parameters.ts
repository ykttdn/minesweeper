import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

import { useTimerStore } from "@/stores/timer";
import type { BoardParams } from "@/types/boardParams";
import type { GameParams } from "@/types/gameParams";
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

export const useParametersStore = defineStore("parameters", () => {
  const timerStore = useTimerStore();
  const { stopTimer } = timerStore;

  const boardParams = ref<BoardParams>({
    rowSize: ROW_SIZE_EASY,
    columnSize: COLUMN_SIZE_EASY,
    mineNumber: MINE_NUMBER_EASY,
  });

  const gameParams = ref<GameParams>({
    hasGameStarted: false,
    hasOpenedAllSafeCells: false,
    hasOpenedMinedCell: false,
    remainingMineNumber: MINE_NUMBER_EASY,
    safeCellNumber: ROW_SIZE_EASY * COLUMN_SIZE_EASY - MINE_NUMBER_EASY,
  });

  const level = ref<Level>("easy");

  watchEffect(() => {
    if (gameParams.value.safeCellNumber === 0) {
      gameParams.value.hasOpenedAllSafeCells = true;
      gameParams.value.remainingMineNumber = 0;
      stopTimer();
    }
  });

  watchEffect(() => {
    if (gameParams.value.hasOpenedMinedCell) {
      stopTimer();
    }
  });

  const initGameParams = ({ rowSize, columnSize, mineNumber }: BoardParams): GameParams => {
    return {
      hasGameStarted: false,
      hasOpenedAllSafeCells: false,
      hasOpenedMinedCell: false,
      remainingMineNumber: mineNumber,
      safeCellNumber: rowSize * columnSize - mineNumber,
    };
  };

  const isFlagModeOn = ref(false);
  const toggleFlagMode = (flagMode: boolean): boolean => !flagMode;

  const setBoardParams = (level: Level): BoardParams => {
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

  return {
    boardParams,
    gameParams,
    initGameParams,
    isFlagModeOn,
    level,
    setBoardParams,
    toggleFlagMode,
  };
});
