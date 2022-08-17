<script setup lang="ts">
import BaseRow from "./BaseRow.vue";

const ROW_SIZE_EASY = 9;
const rowSize = ROW_SIZE_EASY;
</script>

<template>
  <div class="board">
    <BaseRow v-for="rowNumber in rowSize" :key="rowNumber"></BaseRow>
  </div>
</template>
