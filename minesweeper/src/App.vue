<script setup lang="ts">
import MainHeader from "./components/MainHeader.vue";
import LevelSelector from "./components/LevelSelector.vue";
import PlaySection from "./components/PlaySection.vue";
import BottomSection from "./components/BottomSection.vue";
</script>

<template>
  <MainHeader></MainHeader>
  <main class="wrapper">
    <LevelSelector></LevelSelector>
    <PlaySection></PlaySection>
    <BottomSection></BottomSection>
  </main>
</template>
