<script setup lang="ts">
import { provide, ref } from "vue";
import MainHeader from "./components/MainHeader.vue";
import LevelSelector from "./components/LevelSelector.vue";
import PlaySection from "./components/PlaySection.vue";
import BottomSection from "./components/BottomSection.vue";

const rowSize = ref(9);
const columnSize = ref(9);
const mineNumber = ref(10);

provide("rowSize", rowSize);
provide("columnSize", columnSize);

const changeParameters = (selectedLevel: string) => {
  if (selectedLevel === "normal") {
    rowSize.value = 16;
    columnSize.value = 16;
    mineNumber.value = 40;
  } else if (selectedLevel === "hard") {
    rowSize.value = 16;
    columnSize.value = 30;
    mineNumber.value = 99;
  } else {
    rowSize.value = 9;
    columnSize.value = 9;
    mineNumber.value = 10;
  }

  console.log(
    `Level changed to ${selectedLevel}\n\trow size: ${rowSize.value}\n\tcolumn size: ${columnSize.value}\n\tmine number: ${mineNumber.value}`
  );
};
</script>

<template>
  <MainHeader></MainHeader>
  <main class="wrapper">
    <LevelSelector @change-parameters="changeParameters"></LevelSelector>
    <PlaySection></PlaySection>
    <BottomSection></BottomSection>
  </main>
</template>
