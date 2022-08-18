<script setup lang="ts">
const props = defineProps({
  rowNumber: Number,
  columnNumber: Number,
});

const OPENED_CELL = "cell cell--opened";

const onClickCell = (event: Event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  const row = props.rowNumber;
  const column = props.columnNumber;
  if (row === undefined || column === undefined) {
    return;
  }
  console.log(row, column);
  target.className = OPENED_CELL;
};
</script>

<template>
  <div class="cell cell--unopened" @click="onClickCell"></div>
</template>
