<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";

const parameters = useParametersStore();
const { columnSize, level, mineNumber, rowSize } = storeToRefs(parameters);
const { initializeParameters, setBoardParams } = parameters;

const { initializeCells } = useCellStore();

const handleChange = () => {
  ({
    columnSize: columnSize.value,
    rowSize: rowSize.value,
    mineNumber: mineNumber.value,
  } = setBoardParams(level.value));
  initializeCells(rowSize.value, columnSize.value);
  initializeParameters();
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
