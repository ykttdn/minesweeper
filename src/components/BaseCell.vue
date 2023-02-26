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
const { columnSize, hasGameStarted, isFlagModeOn, mineNumber, rowSize } =
  storeToRefs(parameters);

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

const onCellClicked = () => {
  if (isOpened.value[props.rowNumber][props.columnNumber]) {
    return;
  }

  if (isFlagModeOn.value) {
    toggleFlag(props.rowNumber, props.columnNumber);
    return;
  }

  if (isFlagged.value[props.rowNumber][props.columnNumber]) {
    return;
  }

  if (!hasGameStarted.value) {
    initializeMines(
      rowSize.value,
      columnSize.value,
      mineNumber.value,
      props.rowNumber,
      props.columnNumber
    );
    hasGameStarted.value = true;
  }

  openCell(props.rowNumber, props.columnNumber);
};

const onCellRightClicked = () => {
  if (isOpened.value[props.rowNumber][props.columnNumber]) {
    return;
  }

  toggleFlag(props.rowNumber, props.columnNumber);
};
</script>

<template>
  <div
    :id="`cell-${rowNumber}-${columnNumber}`"
    :class="cellState"
    @click="onCellClicked"
    @contextmenu.prevent="onCellRightClicked"
  ></div>
</template>
