<script setup lang="ts">
import { generate2dArray } from "./generate2dArray";
import { initializeMines } from "./initializeMines";
import RemainsCounter from "./RemainsCounter.vue";
import TheTimer from "./TheTimer.vue";

const props = defineProps({
  rowSize: Number,
  columnSize: Number,
  mineNumber: Number,
  hasResetTriggered: Boolean,
});

const emit = defineEmits(["initializeBoard"]);
const onClickResetButton = () => emit("initializeBoard");

let isMineHiddenIn: boolean[][] = generate2dArray(
  props.rowSize,
  props.columnSize,
  false
);

let hasGameStarted = false;

const onClickCell = (rowClicked: number, columnClicked: number) => {
  console.log(rowClicked, columnClicked);
  if (!hasGameStarted) {
    isMineHiddenIn = initializeMines(
      props.rowSize,
      props.columnSize,
      rowClicked,
      columnClicked,
      props.mineNumber,
      isMineHiddenIn
    );
    console.log(isMineHiddenIn);
    hasGameStarted = true;
  }
};

const OPENED_CELL = "cell cell--opened";
const EXPLODED_CELL = "cell cell--exploded";
const strToInt = (str: string) => parseInt(str, 10);

const changeCellState = (event: Event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    console.log("error");
    return;
  }
  const row = target.dataset.row;
  const column = target.dataset.column;
  if (row === undefined || column === undefined) {
    console.log("error");
    return;
  }
  console.log(row, column);
  if (isMineHiddenIn[strToInt(row)][strToInt(column)]) {
    target.className = EXPLODED_CELL;
    console.log("exploded");
  } else {
    target.className = OPENED_CELL;
    console.log("safe");
  }
};
</script>

<template>
  <div class="play-area">
    <div class="top-area">
      <RemainsCounter></RemainsCounter>
      <button class="reset-button" @click="onClickResetButton"></button>
      <TheTimer></TheTimer>
    </div>
    <div class="board" v-if="hasResetTriggered">
      <div class="row" v-for="rowNumber in rowSize" :key="rowNumber">
        <div
          class="cell cell--unopened"
          v-for="columnNumber in columnSize"
          :key="columnNumber"
          :data-row="rowNumber - 1"
          :data-column="columnNumber - 1"
          @click="onClickCell(rowNumber, columnNumber), changeCellState($event)"
        ></div>
      </div>
    </div>
  </div>
</template>
