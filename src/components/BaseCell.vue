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
const { cells } = storeToRefs(cellStore);

const parameters = useParametersStore();
const { boardParams, gameParams, isFlagModeOn } = storeToRefs(parameters);

const timerStore = useTimerStore();
const { startTimer } = timerStore;
const { timer } = storeToRefs(timerStore);

const adjacentMinesNumber = computed(() => {
  if (
    !cells.value[props.rowNumber][props.columnNumber].isOpened ||
    cells.value[props.rowNumber][props.columnNumber].isMineHiddenIn
  ) {
    return 0;
  }

  const counter = countAdjacentMines(
    props.rowNumber,
    props.columnNumber,
    boardParams.value.rowSize,
    boardParams.value.columnSize,
    cells.value
  );

  if (counter > 0) {
    return counter;
  } else {
    return 0;
  }
});

const cellState = computed(() => {
  const { isMineHiddenIn, isOpened, isFlagged } =
    cells.value[props.rowNumber][props.columnNumber];

  if (gameParams.value.hasOpenedAllSafeCells) {
    if (isMineHiddenIn && !isFlagged) {
      return FLAGGED_CELL;
    }
  }

  if (gameParams.value.hasOpenedMinedCell) {
    if (isMineHiddenIn && !isFlagged && !isOpened) {
      return MINED_CELL;
    }
    if (!isMineHiddenIn && isFlagged) {
      return WRONGLY_FLAGGED_CELL;
    }
  }

  if (isFlagged) {
    return FLAGGED_CELL;
  }

  if (isOpened) {
    if (isMineHiddenIn) {
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
  if (
    gameParams.value.hasOpenedAllSafeCells ||
    gameParams.value.hasOpenedMinedCell
  ) {
    return;
  }

  if (timer.value.id === 0) {
    timer.value = startTimer(timer.value);
  }

  if (cells.value[props.rowNumber][props.columnNumber].isOpened) {
    if (adjacentMinesNumber.value > 0) {
      triggerChording();
    }
    return;
  }

  if (isFlagModeOn.value) {
    toggleFlag(props.rowNumber, props.columnNumber);
    return;
  }

  if (cells.value[props.rowNumber][props.columnNumber].isFlagged) {
    return;
  }

  if (!gameParams.value.hasGameStarted) {
    cells.value = initializeMines(
      boardParams.value,
      props.rowNumber,
      props.columnNumber,
      cells.value
    );
    gameParams.value.hasGameStarted = true;
  }

  ({ newCells: cells.value, newGameParams: gameParams.value } = openCell(
    props.rowNumber,
    props.columnNumber,
    boardParams.value,
    gameParams.value,
    cells.value
  ));
};

const onCellRightClicked = () => {
  if (
    gameParams.value.hasOpenedAllSafeCells ||
    gameParams.value.hasOpenedMinedCell
  ) {
    return;
  }

  if (timer.value.id === 0) {
    timer.value = startTimer(timer.value);
  }

  if (cells.value[props.rowNumber][props.columnNumber].isOpened) {
    return;
  }

  toggleFlag(props.rowNumber, props.columnNumber);
};

const triggerChording = () => {
  let adjacentFlagsNumber = 0;
  const adjacentCells = getAdjacentCellsIndex(
    props.rowNumber,
    props.columnNumber,
    boardParams.value.rowSize,
    boardParams.value.columnSize
  );
  for (const [adjacentRow, adjacentColumn] of adjacentCells) {
    if (cells.value[adjacentRow][adjacentColumn].isFlagged) {
      adjacentFlagsNumber++;
    }
  }

  if (adjacentMinesNumber.value != adjacentFlagsNumber) {
    return;
  }

  for (const [adjacentRow, adjacentColumn] of adjacentCells) {
    if (
      cells.value[adjacentRow][adjacentColumn].isFlagged &&
      !cells.value[adjacentRow][adjacentColumn].isMineHiddenIn
    ) {
      gameParams.value.hasOpenedMinedCell = true;
    }
  }

  ({ newCells: cells.value, newGameParams: gameParams.value } = executeChording(
    props.rowNumber,
    props.columnNumber,
    boardParams.value,
    gameParams.value,
    cells.value
  ));
};
</script>

<template>
  <div
    :id="`cell-${rowNumber}-${columnNumber}`"
    :class="cellState"
    @click="onCellClicked"
    @contextmenu.prevent="onCellRightClicked"
  >
    {{ adjacentMinesNumber === 0 ? "" : adjacentMinesNumber }}
  </div>
</template>
