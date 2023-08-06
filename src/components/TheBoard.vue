<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import BaseRow from "./BaseRow.vue";

const parameters = useParametersStore();
const { boardParams } = storeToRefs(parameters);
</script>

<template>
  <div class="board">
    <BaseRow
      v-for="rowNumber in boardParams.rowSize"
      :key="rowNumber"
      :row-number="rowNumber - 1"
    ></BaseRow>
  </div>
</template>
