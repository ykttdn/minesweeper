<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { getAdjacentCellsIndex } from "@/utils/GetAdjacentCellsIndex";
import { isCellInsideBoard } from "@/utils/IsCellInsideBoard";
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

const adjacentMinesNumber = computed(() => {
  if (
    !isOpened.value[props.rowNumber][props.columnNumber] ||
    isMineHiddenIn.value[props.rowNumber][props.columnNumber]
  ) {
    return "";
  }

  let count = 0;
  const adjacentCells = getAdjacentCellsIndex(
    props.rowNumber,
    props.columnNumber
  );
  for (const [adjacentRow, adjacentColumn] of adjacentCells) {
    if (
      isCellInsideBoard(
        adjacentRow,
        adjacentColumn,
        rowSize.value,
        columnSize.value
      ) &&
      isMineHiddenIn.value[adjacentRow][adjacentColumn]
    ) {
      count++;
    }
  }

  if (count > 0) {
    return count;
  } else {
    return "";
  }
});

const cellState = computed(() => {
  let className = "cell cell--unopened";

  if (isFlagged.value[props.rowNumber][props.columnNumber]) {
    className = "cell cell--unopened cell--flagged";
  }

  if (isOpened.value[props.rowNumber][props.columnNumber]) {
    if (isMineHiddenIn.value[props.rowNumber][props.columnNumber]) {
      className = "cell cell--exploded";
    } else {
      className = "cell cell--opened";
      if (adjacentMinesNumber.value > 0) {
        className += ` count-${adjacentMinesNumber.value}`;
      }
    }
  }

  return className;
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

  openCell(
    props.rowNumber,
    props.columnNumber,
    rowSize.value,
    columnSize.value
  );
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
  >
    {{ adjacentMinesNumber }}
  </div>
</template>
