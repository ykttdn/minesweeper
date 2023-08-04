<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const parameters = useParametersStore();
const { elapsedTime } = storeToRefs(parameters);

const displayedTime = computed(() => {
  if (elapsedTime.value <= -100) {
    return "-99";
  } else if (elapsedTime.value <= -10) {
    return `${elapsedTime.value}`;
  } else if (elapsedTime.value <= -1) {
    return `- ${-elapsedTime.value}`;
  } else if (elapsedTime.value <= 9) {
    return `00${elapsedTime.value}`;
  } else if (elapsedTime.value <= 99) {
    return `0${elapsedTime.value}`;
  } else if (elapsedTime.value <= 999) {
    return `${elapsedTime.value}`;
  } else {
    return "999";
  }
});
</script>

<template>
  <div class="timer">{{ displayedTime }}</div>
</template>
