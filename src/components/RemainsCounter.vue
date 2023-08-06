<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const parameters = useParametersStore();
const { gameParams } = storeToRefs(parameters);

const displayedMineNumber = computed(() => {
  const { remainingMineNumber } = gameParams.value;

  if (remainingMineNumber <= -100) {
    return "-99";
  } else if (remainingMineNumber <= -10) {
    return `${remainingMineNumber}`;
  } else if (remainingMineNumber <= -1) {
    return `- ${-remainingMineNumber}`;
  } else if (remainingMineNumber <= 9) {
    return `00${remainingMineNumber}`;
  } else if (remainingMineNumber <= 99) {
    return `0${remainingMineNumber}`;
  } else if (remainingMineNumber <= 999) {
    return `${remainingMineNumber}`;
  } else {
    return "999";
  }
});
</script>

<template>
  <div class="remains">{{ displayedMineNumber }}</div>
</template>
