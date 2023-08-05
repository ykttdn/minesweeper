<script setup lang="ts">
import { useTimerStore } from "@/stores/timer";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const timerStore = useTimerStore();
const { timer } = storeToRefs(timerStore);

const displayedTime = computed(() => {
  const elapsedTime = timer.value.current;

  if (elapsedTime <= -100) {
    return "-99";
  } else if (elapsedTime <= -10) {
    return `${elapsedTime}`;
  } else if (elapsedTime <= -1) {
    return `- ${-elapsedTime}`;
  } else if (elapsedTime <= 9) {
    return `00${elapsedTime}`;
  } else if (elapsedTime <= 99) {
    return `0${elapsedTime}`;
  } else if (elapsedTime <= 999) {
    return `${elapsedTime}`;
  } else {
    return "999";
  }
});
</script>

<template>
  <div class="timer">{{ displayedTime }}</div>
</template>
