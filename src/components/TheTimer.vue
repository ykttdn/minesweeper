<script setup lang="ts">
import { useTimerStore } from "@/stores/timer";
import { storeToRefs } from "pinia";
import DigitalDisplay from "./DigitalDisplay.vue";

const timerStore = useTimerStore();
const { timer } = storeToRefs(timerStore);
</script>

<template>
  <DigitalDisplay :number="timer.current"></DigitalDisplay>
</template>
