<script setup lang="ts">
import BaseRow from "@/components/BaseRow.vue";
import type { Cell } from "@/types/cell";

defineProps<{
  cells: Cell[][];
}>();
</script>

<template>
  <div class="board">
    <BaseRow
      v-for="(cellRow, row_i) in cells"
      :key="row_i"
      :cell-row="cellRow"
      :row-number="row_i"
    />
  </div>
</template>
