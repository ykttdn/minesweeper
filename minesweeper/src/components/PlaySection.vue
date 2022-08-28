<script setup lang="ts">
import TheBoard from "./TheBoard.vue";
import RemainsCounter from "./RemainsCounter.vue";
import ResetButton from "./ResetButton.vue";
import TheTimer from "./TheTimer.vue";
import { inject } from "vue";

const hasFinishedResizingBoard = inject("hasFinishedResizingBoard");
</script>

<template>
  <div class="play-area">
    <div class="top-area">
      <RemainsCounter></RemainsCounter>
      <ResetButton></ResetButton>
      <TheTimer></TheTimer>
    </div>
    <TheBoard v-if="hasFinishedResizingBoard"></TheBoard>
  </div>
</template>
