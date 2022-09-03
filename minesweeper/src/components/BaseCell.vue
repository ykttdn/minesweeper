<script setup lang="ts">
import { inject } from "vue";
import { touchCell } from "../modules/MainAlgorithm";

defineProps({
  rowNumber: Number,
  columnNumber: Number,
});
const rowSize = inject("rowSize") as number;
const columnSize = inject("columnSize") as number;

const startGame = inject("startGame") as (
  row: number | undefined,
  column: number | undefined
) => void;

const onClickCell = (
  row: number | undefined,
  column: number | undefined,
  rowSize: number,
  columnSize: number
) => {
  if (row === undefined || column === undefined) {
    return;
  }
  touchCell(row, column, rowSize, columnSize);
};
</script>

<template>
  <div
    :id="`cell-${rowNumber}-${columnNumber}`"
    class="cell cell--unopened"
    @click="
      startGame(rowNumber, columnNumber),
        onClickCell(rowNumber, columnNumber, rowSize, columnSize)
    "
  ></div>
</template>
