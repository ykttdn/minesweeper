<script setup lang="ts">
defineProps({
  rowNumber: Number,
  columnNumber: Number,
});
</script>

<template>
  <div
    :id="`cell-${rowNumber}-${columnNumber}`"
    class="cell cell--unopened"
  ></div>
</template>
