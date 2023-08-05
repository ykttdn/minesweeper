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
  boardParams,
  hasGameStarted,
  hasOpenedAllSafeCells,
  hasOpenedMinedCell,
  remainingMineNumber,
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
  initializeCells(boardParams.value.rowSize, boardParams.value.columnSize);

  ({
    hasGameStarted: hasGameStarted.value,
    hasOpenedMinedCell: hasOpenedMinedCell.value,
    remainingMineNumber: remainingMineNumber.value,
    safeCellNumber: safeCellNumber.value,
  } = initGameParams(boardParams.value));

  timer.value = resetTimer(timer.value);
};
</script>

<template>
  <button :class="buttonState" @click="handleClick"></button>
</template>
