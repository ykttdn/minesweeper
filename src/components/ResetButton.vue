<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { useTimerStore } from "@/stores/timer";
import {
  FACE_FAILURE,
  FACE_NORMAL,
  FACE_SUCCESS,
} from "@/utils/GameParameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const timerStore = useTimerStore();
const { resetTimer } = timerStore;
const { timer } = storeToRefs(timerStore);

const parameters = useParametersStore();
const {
  columnSize,
  hasGameStarted,
  hasOpenedAllSafeCells,
  hasOpenedMinedCell,
  mineNumber,
  remainingMineNumber,
  rowSize,
  safeCellNumber,
} = storeToRefs(parameters);
const { initGameParams } = parameters;

const { initializeCells } = useCellStore();

const buttonState = computed(() => {
  if (hasOpenedAllSafeCells.value) {
    return FACE_SUCCESS;
  } else if (hasOpenedMinedCell.value) {
    return FACE_FAILURE;
  } else {
    return FACE_NORMAL;
  }
});

const handleClick = () => {
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
  <button :class="buttonState" @click="handleClick"></button>
</template>
