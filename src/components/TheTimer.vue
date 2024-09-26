<script setup lang="ts">
import { storeToRefs } from "pinia";

import DigitalDisplay from "@/components/DigitalDisplay.vue";
import { useTimerStore } from "@/stores/timer";

const timerStore = useTimerStore();
const { timer } = storeToRefs(timerStore);
</script>

<template>
  <DigitalDisplay :number="timer.current" />
</template>
