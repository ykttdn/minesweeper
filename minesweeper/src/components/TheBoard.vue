<script setup lang="ts">
import { inject } from "vue";
import BaseRow from "./BaseRow.vue";

const rowSize = inject("rowSize");
</script>

<template>
  <div class="board">
    <BaseRow
      v-for="rowNumber in rowSize"
      :key="rowNumber"
      :row-number="rowNumber"
    ></BaseRow>
  </div>
</template>
