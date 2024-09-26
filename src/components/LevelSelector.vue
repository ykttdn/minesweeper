<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { useTimerStore } from "@/stores/timer";

const { resetTimer } = useTimerStore();

const parameters = useParametersStore();
const { boardParams, gameParams, level } = storeToRefs(parameters);
const { initGameParams, setBoardParams } = parameters;

const cellStore = useCellStore();
const { initializeCells } = cellStore;

const handleChange = () => {
  boardParams.value = setBoardParams(level.value);

  initializeCells(boardParams.value.rowSize, boardParams.value.columnSize);

  gameParams.value = initGameParams(boardParams.value);

  resetTimer();
};
</script>

<template>
  <div class="level-selection">
    <label for="level">Level:</label>
    <select id="level" v-model="level" name="level" @change="handleChange">
      <option value="easy">EASY</option>
      <option value="normal">NORMAL</option>
      <option value="hard">HARD</option>
    </select>
  </div>
</template>
