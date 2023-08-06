<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const parameters = useParametersStore();
const { isFlagModeOn } = storeToRefs(parameters);
const { toggleFlagMode } = parameters;

const switchButtonState = computed(() => {
  if (isFlagModeOn.value) {
    return "switch switch--on";
  } else {
    return "switch";
  }
});

const handleClick = () => {
  isFlagModeOn.value = toggleFlagMode(isFlagModeOn.value);
};
</script>

<template>
  <div class="bottom-area">
    <div :class="switchButtonState" @click="handleClick"></div>
    <i class="fa-solid fa-flag flag-icon"></i>
  </div>
</template>
