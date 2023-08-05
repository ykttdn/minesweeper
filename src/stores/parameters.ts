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
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useTimerStore } from "./timer";

export const useParametersStore = defineStore("parameters", () => {
  const timerStore = useTimerStore();
  const { resetTimer, stopTimer } = timerStore;
  const { timer } = storeToRefs(timerStore);

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
  watch(hasOpenedAllSafeCells, () => {
    if (hasOpenedAllSafeCells.value) {
      remainingMineNumber.value = 0;
    }
  });

  const hasOpenedMinedCell = ref(false);

  watch(hasOpenedAllSafeCells, () => {
    if (hasOpenedAllSafeCells.value) {
      stopTimer(timer.value);
    }
  });
  watch(hasOpenedMinedCell, () => {
    if (hasOpenedMinedCell.value) {
      stopTimer(timer.value);
    }
  });

  const initializeParameters = () => {
    hasGameStarted.value = false;
    hasOpenedMinedCell.value = false;
    remainingMineNumber.value = mineNumber.value;
    safeCellNumber.value = rowSize.value * columnSize.value - mineNumber.value;
    timer.value = resetTimer(timer.value);
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
    remainingMineNumber,
    rowSize,
    safeCellNumber,
    toggleFlagMode,
  };
});
