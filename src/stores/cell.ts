import { ref } from "vue";
import { defineStore } from "pinia";
import { COLUMN_SIZE_HARD, ROW_SIZE_HARD } from "@/utils/GameParameters";
import { init2dCellArray } from "@/utils/Init2dCellArray";
import { newCells } from "./cellModules/newCells";
import { initializeMines } from "./cellModules/initializeMines";
import { countAdjacentMines } from "./cellModules/countAdjacentMines";
import { openCell } from "./cellModules/openCell";
import { executeChording } from "./cellModules/executeChording";
import { toggleFlag } from "./cellModules/toggleFlag";

export const useCellStore = defineStore("cell", () => {
  const cells = ref(init2dCellArray(ROW_SIZE_HARD, COLUMN_SIZE_HARD));

  return {
    cells,
    countAdjacentMines,
    executeChording,
    initializeMines,
    newCells,
    openCell,
    toggleFlag,
  };
});
