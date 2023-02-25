<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";

const parameters = useParametersStore();
const { columnSize, initializeParameters, rowSize } = parameters;

const { initializeCells } = useCellStore();
</script>

<template>
  <button
    class="reset-button face-normal"
    @click="initializeCells(rowSize, columnSize), initializeParameters()"
  ></button>
</template>
