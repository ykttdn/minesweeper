<script setup lang="ts">
import { inject } from "vue";
import { openCell } from "../modules/OpenCell";

const props = defineProps({
  rowNumber: Number,
  columnNumber: Number,
});

const startGame = inject("startGame") as (
  row: number | undefined,
  column: number | undefined
) => void;

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
    @click="startGame(rowNumber, columnNumber), onClickCell()"
  ></div>
</template>
