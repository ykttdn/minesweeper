import { ref } from "vue";
import { defineStore } from "pinia";
import { initialize2DArray } from "@/utils/Initialize2DArray";
import { COLUMN_SIZE_HARD, ROW_SIZE_HARD } from "@/utils/GameParameters";
import { random } from "@/utils/random";

export const useCellStore = defineStore("cell", () => {
  const isMineHiddenIn = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );
  const isOpened = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );

  const hasGameStarted = ref(false);

  const initializeCells = (rowSize: number, columnSize: number) => {
    for (let row = 0; row < rowSize; row++) {
      for (let column = 0; column < columnSize; column++) {
        isOpened.value[row][column] = false;
      }
    }
  };

  const initializeParameters = () => {
    hasGameStarted.value = false;
  };

  const initializeMines = (
    rowSize: number,
    columnSize: number,
    mineNumber: number,
    rowClickedFirst: number | undefined,
    columnClickedFirst: number | undefined
  ) => {
    if (rowClickedFirst === undefined || columnClickedFirst === undefined) {
      return;
    }

    if (hasGameStarted.value) {
      return;
    }

    hasGameStarted.value = true;

    for (let row = 0; row < rowSize; row++) {
      for (let column = 0; column < columnSize; column++) {
        isMineHiddenIn.value[row][column] = false;
      }
    }

    for (let i = 0; i < mineNumber; i++) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const rowPickedRandomly = random(rowSize);
        const columnPickedRandomly = random(columnSize);
        if (
          !isMineHiddenIn.value[rowPickedRandomly][columnPickedRandomly] &&
          !(
            rowClickedFirst === rowPickedRandomly &&
            columnClickedFirst === columnPickedRandomly
          )
        ) {
          isMineHiddenIn.value[rowPickedRandomly][columnPickedRandomly] = true;
          break;
        }
      }
    }
  };

  const openCell = (row: number | undefined, column: number | undefined) => {
    if (row === undefined || column === undefined) {
      return;
    }
    isOpened.value[row][column] = true;
  };

  return {
    initializeCells,
    initializeMines,
    initializeParameters,
    isMineHiddenIn,
    isOpened,
    openCell,
  };
});
