<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";
import DigitalDisplay from "./DigitalDisplay.vue";

const parametersStore = useParametersStore();
const { gameParams } = storeToRefs(parametersStore);
</script>

<template>
  <DigitalDisplay :number="gameParams.remainingMineNumber"></DigitalDisplay>
</template>
