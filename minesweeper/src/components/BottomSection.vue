<script setup lang="ts">
import { toggleFlagMode } from "../modules/MainAlgorithm";

const onClickToggleButton = () => {
  toggleFlagMode();
};
</script>

<template>
  <div class="bottom-area">
    <div class="switch" @click="onClickToggleButton"></div>
    <i class="fa-solid fa-flag flag-icon"></i>
  </div>
</template>
