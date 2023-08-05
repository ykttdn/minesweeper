<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import BaseCell from "./BaseCell.vue";

defineProps({
  rowNumber: { type: Number, required: true },
});

const parameters = useParametersStore();
const { boardParams } = storeToRefs(parameters);
</script>

<template>
  <div class="row">
    <BaseCell
      v-for="columnNumber in boardParams.columnSize"
      :key="columnNumber"
      :row-number="rowNumber"
      :column-number="columnNumber - 1"
    ></BaseCell>
  </div>
</template>
