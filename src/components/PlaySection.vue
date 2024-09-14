<script setup lang="ts">
import RemainsCounter from "@/components/RemainsCounter.vue";
import ResetButton from "@/components/ResetButton.vue";
import TheBoard from "@/components/TheBoard.vue";
import TheTimer from "@/components/TheTimer.vue";
</script>

<template>
  <div class="play-area">
    <div class="top-area">
      <RemainsCounter />
      <ResetButton />
      <TheTimer />
    </div>
    <TheBoard />
  </div>
</template>
