<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";

const parameters = useParametersStore();
const { columnSize, level, rowSize } = storeToRefs(parameters);
const { initializeParameters, changeLevel } = parameters;

const { initializeCells } = useCellStore();
</script>

<template>
  <div class="level-selection">
    <label for="level">Level:</label>
    <select
      name="level"
      id="level"
      v-model="level"
      @change="
        changeLevel(),
          initializeCells(rowSize, columnSize),
          initializeParameters()
      "
    >
      <option value="easy">EASY</option>
      <option value="normal">NORMAL</option>
      <option value="hard">HARD</option>
    </select>
  </div>
</template>
