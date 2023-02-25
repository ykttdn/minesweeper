<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { storeToRefs } from "pinia";
import { computed, inject } from "vue";

const props = defineProps({
  rowNumber: Number,
  columnNumber: Number,
});

const cellStore = useCellStore();
const { initializeMines, openCell, toggleFlag } = cellStore;
const { isFlagged, isMineHiddenIn, isOpened } = storeToRefs(cellStore);

const rowSize = inject("rowSize") as number;
const columnSize = inject("columnSize") as number;
const mineNumber = inject("mineNumber") as number;

const cellState = computed(() => {
  if (props.rowNumber === undefined || props.columnNumber === undefined) {
    return "cell cell--unopened";
  }

  if (isFlagged.value[props.rowNumber][props.columnNumber]) {
    return "cell cell--unopened cell--flagged";
  }

  if (isOpened.value[props.rowNumber][props.columnNumber]) {
    if (isMineHiddenIn.value[props.rowNumber][props.columnNumber]) {
      return "cell cell--exploded";
    } else {
      return "cell cell--opened";
    }
  }

  return "cell cell--unopened";
});
</script>

<template>
  <div
    :id="`cell-${rowNumber}-${columnNumber}`"
    :class="cellState"
    @click="
      initializeMines(rowSize, columnSize, mineNumber, rowNumber, columnNumber),
        openCell(rowNumber, columnNumber)
    "
    @contextmenu.prevent="toggleFlag(rowNumber, columnNumber)"
  ></div>
</template>
