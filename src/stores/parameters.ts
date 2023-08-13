import {
  COLUMN_SIZE_EASY,
  MINE_NUMBER_EASY,
  ROW_SIZE_EASY,
} from "@/utils/GameParameters";
import { defineStore, storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import { useTimerStore } from "./timer";
import type { Level } from "@/types/level";
import type { BoardParams } from "@/types/boardParams";
import type { GameParams } from "@/types/gameParams";
import { toggleFlagMode } from "./paramsModules/toggleFlagMode";
import { initGameParams } from "./paramsModules/initGameParams";
import { setBoardParams } from "./paramsModules/setBoardParams";

export const useParametersStore = defineStore("parameters", () => {
  const timerStore = useTimerStore();
  const { stopTimer } = timerStore;
  const { timer } = storeToRefs(timerStore);

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
      stopTimer(timer.value);
    }
  });

  watchEffect(() => {
    if (gameParams.value.hasOpenedMinedCell) {
      stopTimer(timer.value);
    }
  });

  const isFlagModeOn = ref(false);

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
