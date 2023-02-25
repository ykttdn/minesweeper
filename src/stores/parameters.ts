import {
  COLUMN_SIZE_EASY,
  MINE_NUMBER_EASY,
  ROW_SIZE_EASY,
} from "@/utils/GameParameters";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useParametersStore = defineStore("parameters", () => {
  const rowSize = ref(ROW_SIZE_EASY);
  const columnSize = ref(COLUMN_SIZE_EASY);
  const mineNumber = ref(MINE_NUMBER_EASY);

  const level = ref("easy");

  const hasGameStarted = ref(false);

  const hasFinishedResizingBoard = ref(true);

  const initializeParameters = () => {
    hasGameStarted.value = false;
  };

  const isFlagModeOn = ref(false);

  return {
    columnSize,
    hasGameStarted,
    hasFinishedResizingBoard,
    initializeParameters,
    isFlagModeOn,
    level,
    mineNumber,
    rowSize,
  };
});
