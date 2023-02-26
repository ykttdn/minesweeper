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
const {
  countAdjacentMines,
  executeChording,
  initializeMines,
  openCell,
  toggleFlag,
} = cellStore;
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

  const counter = countAdjacentMines(
    props.rowNumber,
    props.columnNumber,
    rowSize.value,
    columnSize.value
  );

  if (counter > 0) {
    return counter;
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
    if (adjacentMinesNumber.value > 0) {
      triggerChording();
    }
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

const triggerChording = () => {
  let adjacentFlagsNumber = 0;
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
      isFlagged.value[adjacentRow][adjacentColumn]
    ) {
      adjacentFlagsNumber++;
    }
  }

  if (adjacentMinesNumber.value != adjacentFlagsNumber) {
    return;
  }

  let canExecuteChording = true;
  for (const [adjacentRow, adjacentColumn] of adjacentCells) {
    if (
      isCellInsideBoard(
        adjacentRow,
        adjacentColumn,
        rowSize.value,
        columnSize.value
      ) &&
      isFlagged.value[adjacentRow][adjacentColumn] &&
      !isMineHiddenIn.value[adjacentRow][adjacentColumn]
    ) {
      canExecuteChording = false;
    }
  }

  if (canExecuteChording) {
    executeChording(
      props.rowNumber,
      props.columnNumber,
      rowSize.value,
      columnSize.value
    );
  }
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
