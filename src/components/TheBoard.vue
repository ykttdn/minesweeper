<script setup lang="ts">
import { storeToRefs } from "pinia";

import BaseRow from "@/components/BaseRow.vue";
import { useParametersStore } from "@/stores/parameters";

const parameters = useParametersStore();
const { boardParams } = storeToRefs(parameters);
</script>

<template>
  <div class="board">
    <BaseRow
      v-for="rowNumber in boardParams.rowSize"
      :key="rowNumber"
      :row-number="rowNumber - 1"
    />
  </div>
</template>
