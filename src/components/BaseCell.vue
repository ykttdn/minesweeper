<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { computed, inject } from "vue";

const props = defineProps({
  rowNumber: Number,
  columnNumber: Number,
});

const { initializeMines, isMineHiddenIn, isOpened, openCell } = useCellStore();

const rowSize = inject("rowSize") as number;
const columnSize = inject("columnSize") as number;
const mineNumber = inject("mineNumber") as number;

const cellState = computed(() => {
  if (props.rowNumber === undefined || props.columnNumber === undefined) {
    return "cell cell--unopened";
  }

  if (isOpened[props.rowNumber][props.columnNumber]) {
    if (isMineHiddenIn[props.rowNumber][props.columnNumber]) {
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
  ></div>
</template>
