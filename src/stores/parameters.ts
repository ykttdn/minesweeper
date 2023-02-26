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
import { computed, ref } from "vue";

export const useParametersStore = defineStore("parameters", () => {
  const rowSize = ref(ROW_SIZE_EASY);
  const columnSize = ref(COLUMN_SIZE_EASY);
  const mineNumber = ref(MINE_NUMBER_EASY);

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

  const initializeParameters = () => {
    hasGameStarted.value = false;
    hasOpenedMinedCell.value = false;
    safeCellNumber.value = rowSize.value * columnSize.value - mineNumber.value;
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
    changeLevel,
    columnSize,
    hasGameStarted,
    hasOpenedAllSafeCells,
    hasOpenedMinedCell,
    initializeParameters,
    isFlagModeOn,
    level,
    mineNumber,
    rowSize,
    safeCellNumber,
    toggleFlagMode,
  };
});
