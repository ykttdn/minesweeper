<script setup lang="ts">
import { computed } from "vue";

const { number } = defineProps<{
  number: number;
}>();

const displayedNumber = computed(() => {
  if (number <= -100) {
    return "-99";
  } else if (number <= -10) {
    return `${number}`;
  } else if (number <= -1) {
    return `- ${-number}`;
  } else if (number <= 9) {
    return `00${number}`;
  } else if (number <= 99) {
    return `0${number}`;
  } else if (number <= 999) {
    return `${number}`;
  } else {
    return "999";
  }
});
</script>

<template>
  <div class="display">{{ displayedNumber }}</div>
</template>

<style>
.display {
  border: 1px solid #000;
  font-family: "Philosopher", sans-serif;
  font-family: "Roboto Mono", monospace;
  background-color: #000;
  color: #f00;
  display: inline-block;
  vertical-align: middle;
  border-top: 2px solid #888;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #888;
  margin: 2px;
}
</style>
