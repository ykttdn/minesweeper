<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const parameters = useParametersStore();
const { remainingMineNumber } = storeToRefs(parameters);

const displayedMineNumber = computed(() => {
  if (remainingMineNumber.value <= -100) {
    return "-99";
  } else if (remainingMineNumber.value <= -10) {
    return `${remainingMineNumber.value}`;
  } else if (remainingMineNumber.value <= -1) {
    return `- ${-remainingMineNumber.value}`;
  } else if (remainingMineNumber.value <= 9) {
    return `00${remainingMineNumber.value}`;
  } else if (remainingMineNumber.value <= 99) {
    return `0${remainingMineNumber.value}`;
  } else if (remainingMineNumber.value <= 999) {
    return `${remainingMineNumber.value}`;
  } else {
    return "999";
  }
});
</script>

<template>
  <div class="remains">{{ displayedMineNumber }}</div>
</template>
