<script setup lang="ts">
import openCell from "../modules/OpenCell";

const props = defineProps({
  rowNumber: Number,
  columnNumber: Number,
});

const onClickCell = () => {
  const row = props.rowNumber;
  const column = props.columnNumber;
  if (row === undefined || column === undefined) {
    return;
  }

  openCell(row, column);
};
</script>

<template>
  <div
    :id="`cell-${rowNumber}-${columnNumber}`"
    class="cell cell--unopened"
    @click="onClickCell"
  ></div>
</template>
