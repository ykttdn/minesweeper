import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { initialize2DArray } from "@/utils/Initialize2DArray";
import { COLUMN_SIZE_HARD, ROW_SIZE_HARD } from "@/utils/GameParameters";
import { random } from "@/utils/random";
import { useParametersStore } from "./parameters";

export const useCellStore = defineStore("cell", () => {
  const parameters = useParametersStore();
  const { hasGameStarted, isFlagModeOn } = storeToRefs(parameters);

  const isMineHiddenIn = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );
  const isOpened = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );
  const isFlagged = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );

  const initializeCells = (rowSize: number, columnSize: number) => {
    for (let row = 0; row < rowSize; row++) {
      for (let column = 0; column < columnSize; column++) {
        isOpened.value[row][column] = false;
        isFlagged.value[row][column] = false;
      }
    }
  };

  const initializeMines = (
    rowSize: number,
    columnSize: number,
    mineNumber: number,
    rowClickedFirst: number,
    columnClickedFirst: number
  ) => {
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

  const openCell = (row: number, column: number) => {
    if (isFlagModeOn.value) {
      toggleFlag(row, column);
      return;
    }

    if (isFlagged.value[row][column]) {
      return;
    }

    isOpened.value[row][column] = true;
  };

  const toggleFlag = (row: number, column: number) => {
    if (isOpened.value[row][column]) {
      return;
    }

    isFlagged.value[row][column] = !isFlagged.value[row][column];
  };

  return {
    initializeCells,
    initializeMines,
    isFlagged,
    isMineHiddenIn,
    isOpened,
    openCell,
    toggleFlag,
  };
});
