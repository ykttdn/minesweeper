<script setup lang="ts">
import BaseCell from "@/components/BaseCell.vue";
import type { Cell } from "@/types/cell";

defineProps<{
  cellRow: Cell[];
  rowNumber: number;
}>();
</script>

<template>
  <div class="row">
    <BaseCell
      v-for="(_cell, col_i) in cellRow"
      :key="col_i"
      :row-number="rowNumber"
      :column-number="col_i"
    />
  </div>
</template>
