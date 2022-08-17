<script setup lang="ts">
import MainHeader from "./components/MainHeader.vue";
import LevelSelector from "./components/LevelSelector.vue";
import PlaySection from "./components/PlaySection.vue";
</script>

<template>
  <MainHeader></MainHeader>
  <main class="wrapper">
    <LevelSelector></LevelSelector>
    <PlaySection></PlaySection>
  </main>
</template>
