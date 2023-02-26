<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const props = defineProps({
  rowNumber: { type: Number, required: true },
  columnNumber: { type: Number, required: true },
});

const cellStore = useCellStore();
const { initializeMines, openCell, toggleFlag } = cellStore;
const { isFlagged, isMineHiddenIn, isOpened } = storeToRefs(cellStore);

const parameters = useParametersStore();
const { rowSize, columnSize, mineNumber } = storeToRefs(parameters);

const cellState = computed(() => {
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
