import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useCellStore } from "@/stores/cell";
import {
  COLUMN_SIZE_EASY,
  COLUMN_SIZE_HARD,
  ROW_SIZE_EASY,
  ROW_SIZE_HARD,
} from "@/utils/GameParameters";

describe("cell store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initialize cells", () => {
    const cellStore = useCellStore();
    const { initializeCells } = cellStore;
    const { cells } = storeToRefs(cellStore);

    initializeCells(ROW_SIZE_EASY, COLUMN_SIZE_EASY);

    expect(cells.value).toHaveLength(ROW_SIZE_EASY);
    expect(cells.value[0]).toHaveLength(COLUMN_SIZE_EASY);

    initializeCells(ROW_SIZE_HARD, COLUMN_SIZE_HARD);

    expect(cells.value).toHaveLength(ROW_SIZE_HARD);
    expect(cells.value[0]).toHaveLength(COLUMN_SIZE_HARD);
  });
});
