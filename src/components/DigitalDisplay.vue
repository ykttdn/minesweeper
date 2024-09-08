<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  number: number;
}>();

const displayedNumber = computed(() => {
  if (props.number <= -100) {
    return "-99";
  } else if (props.number <= -10) {
    return `${props.number}`;
  } else if (props.number <= -1) {
    return `- ${-props.number}`;
  } else if (props.number <= 9) {
    return `00${props.number}`;
  } else if (props.number <= 99) {
    return `0${props.number}`;
  } else if (props.number <= 999) {
    return `${props.number}`;
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
