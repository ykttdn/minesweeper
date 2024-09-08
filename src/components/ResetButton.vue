<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { useTimerStore } from "@/stores/timer";
import { FACE_FAILURE, FACE_NORMAL, FACE_SUCCESS } from "@/utils/GameParameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { resetTimer } = useTimerStore();

const parameters = useParametersStore();
const { boardParams, gameParams } = storeToRefs(parameters);
const { initGameParams } = parameters;

const cellStore = useCellStore();
const { newCells } = cellStore;
const { cells } = storeToRefs(cellStore);

const buttonState = computed(() => {
  if (gameParams.value.hasOpenedAllSafeCells) {
    return FACE_SUCCESS;
  } else if (gameParams.value.hasOpenedMinedCell) {
    return FACE_FAILURE;
  } else {
    return FACE_NORMAL;
  }
});

const handleClick = () => {
  cells.value = newCells(cells.value, boardParams.value.rowSize, boardParams.value.columnSize);

  gameParams.value = initGameParams(boardParams.value);

  resetTimer();
};
</script>

<template>
  <button :class="buttonState" @click="handleClick"></button>
</template>
