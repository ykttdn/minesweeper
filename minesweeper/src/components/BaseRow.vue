<script setup lang="ts">
import BaseCell from "./BaseCell.vue";

const COLUMN_SIZE_EASY = 9;
const columnSize = COLUMN_SIZE_EASY;
</script>

<template>
  <div class="row">
    <BaseCell v-for="columnNumber in columnSize" :key="columnNumber"></BaseCell>
  </div>
</template>
