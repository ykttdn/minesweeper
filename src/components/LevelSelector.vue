<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { useTimerStore } from "@/stores/timer";
import { storeToRefs } from "pinia";

const { resetTimer } = useTimerStore();

const parameters = useParametersStore();
const { boardParams, gameParams, level } = storeToRefs(parameters);
const { initGameParams, setBoardParams } = parameters;

const cellStore = useCellStore();
const { newCells } = cellStore;
const { cells } = storeToRefs(cellStore);

const handleChange = () => {
  boardParams.value = setBoardParams(level.value);

  cells.value = newCells(
    cells.value,
    boardParams.value.rowSize,
    boardParams.value.columnSize
  );

  gameParams.value = initGameParams(boardParams.value);

  resetTimer();
};
</script>

<template>
  <div class="level-selection">
    <label for="level">Level:</label>
    <select name="level" id="level" v-model="level" @change="handleChange">
      <option value="easy">EASY</option>
      <option value="normal">NORMAL</option>
      <option value="hard">HARD</option>
    </select>
  </div>
</template>
