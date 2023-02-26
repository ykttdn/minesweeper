<script setup lang="ts">
import { useCellStore } from "@/stores/cell";
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";

const parameters = useParametersStore();
const { columnSize, rowSize } = storeToRefs(parameters);
const { initializeParameters } = parameters;

const { initializeCells } = useCellStore();
</script>

<template>
  <button
    class="reset-button face-normal"
    @click="initializeCells(rowSize, columnSize), initializeParameters()"
  ></button>
</template>
