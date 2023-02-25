<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import BaseCell from "./BaseCell.vue";

defineProps({
  rowNumber: Number,
});

const parameters = useParametersStore();
const { columnSize } = storeToRefs(parameters);
</script>

<template>
  <div class="row">
    <BaseCell
      v-for="columnNumber in columnSize"
      :key="columnNumber"
      :row-number="rowNumber"
      :column-number="columnNumber - 1"
    ></BaseCell>
  </div>
</template>
