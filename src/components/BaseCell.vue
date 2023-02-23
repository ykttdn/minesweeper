<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { computed } from "vue";

const props = defineProps({
  rowNumber: Number,
  columnNumber: Number,
});
const { isOpened, openCell } = useCellStore();

const cellState = computed(() => {
  if (props.rowNumber === undefined || props.columnNumber === undefined) {
    return "cell cell--unopened";
  }

  if (isOpened[props.rowNumber][props.columnNumber]) {
    return "cell cell--opened";
  }
  return "cell cell--unopened";
});
</script>

<template>
  <div
    :id="`cell-${rowNumber}-${columnNumber}`"
    :class="cellState"
    @click="openCell(rowNumber, columnNumber)"
  ></div>
</template>
