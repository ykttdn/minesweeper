<script setup lang="ts">
import BottomSection from "@/components/BottomSection.vue";
import LevelSelector from "@/components/LevelSelector.vue";
import MainHeader from "@/components/MainHeader.vue";
import PlaySection from "@/components/PlaySection.vue";
</script>

<template>
  <MainHeader />
  <main class="wrapper">
    <LevelSelector />
    <PlaySection />
    <BottomSection />
  </main>
</template>
