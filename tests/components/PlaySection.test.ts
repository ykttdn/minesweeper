import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { storeToRefs } from "pinia";
import { describe, expect, it, vi } from "vitest";

import PlaySection from "@/components/PlaySection.vue";
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";

import { testCase } from "../helpers/testCase";

describe("play section component", () => {
  it("should open any cell", async () => {
    expect.hasAssertions();

    const wrapper = mount(PlaySection, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    });

    const anyCell = wrapper.find("#cell-2-3");

    expect(anyCell.classes()).toContain("cell--unopened");

    await anyCell.trigger("click");

    expect(anyCell.classes()).toContain("cell--opened");
  });

  it("should open cells recursively", async () => {
    expect.hasAssertions();

    const wrapper = mount(PlaySection, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    });

    // prevent from initializing mines
    const params = useParametersStore();
    const { gameParams } = storeToRefs(params);
    gameParams.value.hasGameStarted = true;

    const cellStore = useCellStore();
    const { cells } = storeToRefs(cellStore);
    cells.value = testCase.minedCells;

    await wrapper
      .find(`#cell-${testCase.targetCellIndex[0]}-${testCase.targetCellIndex[1]}`)
      .trigger("click");

    testCase.openedCellIndices.forEach(([row, col]) => {
      expect(wrapper.find(`#cell-${row}-${col}`).classes()).toContain("cell--opened");
    });

    testCase.unopenedCellIndices.forEach(([row, col]) => {
      expect(wrapper.find(`#cell-${row}-${col}`).classes()).toContain("cell--unopened");
    });
  });
});
