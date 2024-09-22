<script setup lang="ts">
import { storeToRefs } from "pinia";

import RemainsCounter from "@/components/RemainsCounter.vue";
import ResetButton from "@/components/ResetButton.vue";
import TheBoard from "@/components/TheBoard.vue";
import TheTimer from "@/components/TheTimer.vue";
import { useCellStore } from "@/stores/cell";

const cellStore = useCellStore();
const { cells } = storeToRefs(cellStore);
</script>

<template>
  <div class="play-area">
    <div class="top-area">
      <RemainsCounter />
      <ResetButton />
      <TheTimer />
    </div>
    <TheBoard :cells="cells" />
  </div>
</template>
