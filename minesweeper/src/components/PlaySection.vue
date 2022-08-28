<script setup lang="ts">
import RemainsCounter from "./RemainsCounter.vue";
import TheTimer from "./TheTimer.vue";

defineProps({
  rowSize: Number,
  columnSize: Number,
  hasResetTriggered: Boolean,
});

const emit = defineEmits(["initializeBoard"]);
const onClickResetButton = () => emit("initializeBoard");

const onClickCell = (rowNumber: number, columnNumber: number) => {
  console.log(rowNumber, columnNumber);
};

const OPENED_CELL = "cell cell--opened";

const changeCellState = (event: Event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    console.log("error");
    return;
  }
  const row = target.dataset.row;
  const column = target.dataset.column;
  console.log(row, column);
  target.className = OPENED_CELL;
  console.log("success");
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
          :data-row="rowNumber"
          :data-column="columnNumber"
          @click="onClickCell(rowNumber, columnNumber), changeCellState($event)"
        ></div>
      </div>
    </div>
  </div>
</template>
