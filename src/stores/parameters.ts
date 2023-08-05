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

type Level = "easy" | "normal" | "hard";

type BoardParams = {
  rowSize: number;
  columnSize: number;
  mineNumber: number;
};

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

  const level = ref<Level>("easy");

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
    setBoardParams,
    toggleFlagMode,
  };
});
