<script setup lang="ts">
import { storeToRefs } from "pinia";

import BaseCell from "@/components/BaseCell.vue";
import { useParametersStore } from "@/stores/parameters";

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
    />
  </div>
</template>
