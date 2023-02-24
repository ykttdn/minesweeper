<script setup lang="ts">
import { useCellStore } from "@/stores/cell";

const { toggleFlagMode } = useCellStore();
</script>

<template>
  <div class="bottom-area">
    <div class="switch" @click="toggleFlagMode"></div>
    <i class="fa-solid fa-flag flag-icon"></i>
  </div>
</template>
