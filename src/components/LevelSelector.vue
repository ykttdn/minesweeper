<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { useTimerStore } from "@/stores/timer";
import { storeToRefs } from "pinia";

const timerStore = useTimerStore();
const { resetTimer } = timerStore;
const { timer } = storeToRefs(timerStore);

const parameters = useParametersStore();
const {
  columnSize,
  hasGameStarted,
  hasOpenedMinedCell,
  level,
  mineNumber,
  remainingMineNumber,
  rowSize,
  safeCellNumber,
} = storeToRefs(parameters);
const { initGameParams, setBoardParams } = parameters;

const { initializeCells } = useCellStore();

const handleChange = () => {
  ({
    columnSize: columnSize.value,
    rowSize: rowSize.value,
    mineNumber: mineNumber.value,
  } = setBoardParams(level.value));
  initializeCells(rowSize.value, columnSize.value);

  ({
    hasGameStarted: hasGameStarted.value,
    hasOpenedMinedCell: hasOpenedMinedCell.value,
    remainingMineNumber: remainingMineNumber.value,
    safeCellNumber: safeCellNumber.value,
  } = initGameParams({
    rowSize: rowSize.value,
    columnSize: columnSize.value,
    mineNumber: mineNumber.value,
  }));

  timer.value = resetTimer(timer.value);
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
