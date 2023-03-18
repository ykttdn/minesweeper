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
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useParametersStore = defineStore("parameters", () => {
  const rowSize = ref(ROW_SIZE_EASY);
  const columnSize = ref(COLUMN_SIZE_EASY);
  const mineNumber = ref(MINE_NUMBER_EASY);

  const remainingMineNumber = ref(mineNumber.value);

  const safeCellNumber = ref(
    rowSize.value * columnSize.value - mineNumber.value
  );

  const level = ref("easy");

  const hasGameStarted = ref(false);
  const hasOpenedAllSafeCells = computed(() => {
    if (safeCellNumber.value === 0) {
      return true;
    } else {
      return false;
    }
  });
  const hasOpenedMinedCell = ref(false);

  const timerId = ref(0);
  const elapsedTime = ref(0);
  const advanceTimer = () => {
    elapsedTime.value++;
    if (elapsedTime.value >= 999) {
      window.clearInterval(timerId.value);
    }
  };
  watch(hasOpenedAllSafeCells, () => {
    if (hasOpenedAllSafeCells.value) {
      window.clearInterval(timerId.value);
    }
  });
  watch(hasOpenedMinedCell, () => {
    if (hasOpenedMinedCell.value) {
      window.clearInterval(timerId.value);
    }
  });

  const initializeParameters = () => {
    elapsedTime.value = 0;
    hasGameStarted.value = false;
    hasOpenedMinedCell.value = false;
    remainingMineNumber.value = mineNumber.value;
    safeCellNumber.value = rowSize.value * columnSize.value - mineNumber.value;
    window.clearInterval(timerId.value);
    timerId.value = 0;
  };

  const isFlagModeOn = ref(false);
  const toggleFlagMode = () => {
    isFlagModeOn.value = !isFlagModeOn.value;
  };

  const changeLevel = () => {
    if (level.value === "normal") {
      rowSize.value = ROW_SIZE_NORMAL;
      columnSize.value = COLUMN_SIZE_NORMAL;
      mineNumber.value = MINE_NUMBER_NORMAL;
    } else if (level.value === "hard") {
      rowSize.value = ROW_SIZE_HARD;
      columnSize.value = COLUMN_SIZE_HARD;
      mineNumber.value = MINE_NUMBER_HARD;
    } else {
      rowSize.value = ROW_SIZE_EASY;
      columnSize.value = COLUMN_SIZE_EASY;
      mineNumber.value = MINE_NUMBER_EASY;
    }
  };

  return {
    advanceTimer,
    changeLevel,
    columnSize,
    elapsedTime,
    hasGameStarted,
    hasOpenedAllSafeCells,
    hasOpenedMinedCell,
    initializeParameters,
    isFlagModeOn,
    level,
    mineNumber,
    remainingMineNumber,
    rowSize,
    safeCellNumber,
    timerId,
    toggleFlagMode,
  };
});
