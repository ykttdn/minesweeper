<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const parameters = useParametersStore();
const { mineNumber } = storeToRefs(parameters);

const displayedMineNumber = computed(() => {
  if (mineNumber.value <= -100) {
    return "-99";
  } else if (mineNumber.value <= -10) {
    return `${mineNumber.value}`;
  } else if (mineNumber.value <= -1) {
    return `- ${-mineNumber.value}`;
  } else if (mineNumber.value <= 9) {
    return `00${mineNumber.value}`;
  } else if (mineNumber.value <= 99) {
    return `0${mineNumber.value}`;
  } else if (mineNumber.value <= 999) {
    return `${mineNumber.value}`;
  } else {
    return "999";
  }
});
</script>

<template>
  <div class="remains">{{ displayedMineNumber }}</div>
</template>
