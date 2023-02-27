<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import {
  FACE_FAILURE,
  FACE_NORMAL,
  FACE_SUCCESS,
} from "@/utils/GameParameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const parameters = useParametersStore();
const { columnSize, hasOpenedAllSafeCells, hasOpenedMinedCell, rowSize } =
  storeToRefs(parameters);
const { initializeParameters } = parameters;

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
</script>

<template>
  <button
    :class="buttonState"
    @click="initializeCells(rowSize, columnSize), initializeParameters()"
  ></button>
</template>
