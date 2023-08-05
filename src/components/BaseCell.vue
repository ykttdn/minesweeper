<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { useTimerStore } from "@/stores/timer";
import {
  EXPLODED_CELL,
  FLAGGED_CELL,
  MINED_CELL,
  OPENED_CELL,
  UNOPENED_CELL,
  WRONGLY_FLAGGED_CELL,
} from "@/utils/GameParameters";
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
const {
  columnSize,
  hasGameStarted,
  hasOpenedAllSafeCells,
  hasOpenedMinedCell,
  isFlagModeOn,
  mineNumber,
  rowSize,
} = storeToRefs(parameters);

const timerStore = useTimerStore();
const { startTimer } = timerStore;
const { timer } = storeToRefs(timerStore);

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
  if (hasOpenedAllSafeCells.value) {
    if (
      isMineHiddenIn.value[props.rowNumber][props.columnNumber] &&
      !isFlagged.value[props.rowNumber][props.columnNumber]
    ) {
      return FLAGGED_CELL;
    }
  }

  if (hasOpenedMinedCell.value) {
    if (
      isMineHiddenIn.value[props.rowNumber][props.columnNumber] &&
      !isFlagged.value[props.rowNumber][props.columnNumber] &&
      !isOpened.value[props.rowNumber][props.columnNumber]
    ) {
      return MINED_CELL;
    }
    if (
      !isMineHiddenIn.value[props.rowNumber][props.columnNumber] &&
      isFlagged.value[props.rowNumber][props.columnNumber]
    ) {
      return WRONGLY_FLAGGED_CELL;
    }
  }

  if (isFlagged.value[props.rowNumber][props.columnNumber]) {
    return FLAGGED_CELL;
  }

  if (isOpened.value[props.rowNumber][props.columnNumber]) {
    if (isMineHiddenIn.value[props.rowNumber][props.columnNumber]) {
      return EXPLODED_CELL;
    } else {
      if (adjacentMinesNumber.value > 0) {
        return OPENED_CELL + ` count-${adjacentMinesNumber.value}`;
      } else {
        return OPENED_CELL;
      }
    }
  }

  return UNOPENED_CELL;
});

const onCellClicked = () => {
  if (hasOpenedAllSafeCells.value || hasOpenedMinedCell.value) {
    return;
  }

  if (timer.value.id === 0) {
    timer.value = startTimer(timer.value);
  }

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
  if (hasOpenedAllSafeCells.value || hasOpenedMinedCell.value) {
    return;
  }

  if (timer.value.id === 0) {
    timer.value = startTimer(timer.value);
  }

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
      hasOpenedMinedCell.value = true;
    }
  }

  executeChording(
    props.rowNumber,
    props.columnNumber,
    rowSize.value,
    columnSize.value
  );
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
