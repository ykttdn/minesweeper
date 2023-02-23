import { ref } from "vue";
import { defineStore } from "pinia";
import { initialize2DArray } from "@/utils/Initialize2DArray";
import { COLUMN_SIZE_HARD, ROW_SIZE_HARD } from "@/utils/GameParameters";

export const useCellStore = defineStore("cell", () => {
  const isOpened = ref(
    initialize2DArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD, false)
  );

  const openCell = (row: number | undefined, column: number | undefined) => {
    if (row === undefined || column === undefined) {
      return;
    }
    isOpened.value[row][column] = true;
  };

  return {
    isOpened,
    openCell,
  };
});
