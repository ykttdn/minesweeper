<script setup lang="ts">
import { storeToRefs } from "pinia";

import DigitalDisplay from "@/components/DigitalDisplay.vue";
import { useParametersStore } from "@/stores/parameters";

const parametersStore = useParametersStore();
const { gameParams } = storeToRefs(parametersStore);
</script>

<template>
  <DigitalDisplay :number="gameParams.remainingMineNumber" />
</template>
