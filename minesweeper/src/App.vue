<script setup lang="ts">
import { computed, nextTick, provide, ref } from "vue";
import MainHeader from "./components/MainHeader.vue";
import LevelSelector from "./components/LevelSelector.vue";
import PlaySection from "./components/PlaySection.vue";
import BottomSection from "./components/BottomSection.vue";
import {
  initializeMines,
  initializeParameters,
  isFlagModeOn,
} from "./modules/MainAlgorithm";
import {
  COLUMN_SIZE_EASY,
  COLUMN_SIZE_HARD,
  COLUMN_SIZE_NORMAL,
  MINE_NUMBER_EASY,
  MINE_NUMBER_HARD,
  MINE_NUMBER_NORMAL,
  ROW_SIZE_EASY,
  ROW_SIZE_HARD,
  ROW_SIZE_NORMAL,
} from "./modules/GameParameters";

const rowSize = ref(ROW_SIZE_EASY);
const columnSize = ref(COLUMN_SIZE_EASY);
const mineNumber = ref(MINE_NUMBER_EASY);
const displayedMineNumber = computed(() => {
  if (mineNumber.value <= -100) {
    return "-99";
  } else if (mineNumber.value <= -10) {
    return `${mineNumber.value}`;
  } else if (mineNumber.value <= -1) {
    return `- ${-mineNumber.value}`;
  } else if (mineNumber.value <= 9) {
    return `00${mineNumber.value}`;
  } else if (mineNumber.value <= 99) {
    return `0${mineNumber.value}`;
  } else if (mineNumber.value <= 999) {
    return `${mineNumber.value}`;
  } else {
    return "999";
  }
});

provide("rowSize", rowSize);
provide("columnSize", columnSize);
provide("displayedMineNumber", displayedMineNumber);

const hasFinishedResizingBoard = ref(true);
provide("hasFinishedResizingBoard", hasFinishedResizingBoard);

const hasGameStarted = ref(false);
provide("hasGameStarted", hasGameStarted);

const startGame = (
  rowClickedFirst: number | undefined,
  columnClickedFirst: number | undefined
) => {
  if (isFlagModeOn) {
    return;
  }
  if (
    !hasGameStarted.value &&
    rowClickedFirst !== undefined &&
    columnClickedFirst !== undefined
  ) {
    hasGameStarted.value = true;
    initializeMines(
      rowSize.value,
      columnSize.value,
      mineNumber.value,
      rowClickedFirst,
      columnClickedFirst
    );
  }
};
provide("startGame", startGame);

const level = ref("easy");
provide("level", level);

const resetBoard = async (newLevel: string) => {
  hasFinishedResizingBoard.value = false;

  if (newLevel === "normal") {
    rowSize.value = ROW_SIZE_NORMAL;
    columnSize.value = COLUMN_SIZE_NORMAL;
    mineNumber.value = MINE_NUMBER_NORMAL;
  } else if (newLevel === "hard") {
    rowSize.value = ROW_SIZE_HARD;
    columnSize.value = COLUMN_SIZE_HARD;
    mineNumber.value = MINE_NUMBER_HARD;
  } else {
    rowSize.value = ROW_SIZE_EASY;
    columnSize.value = COLUMN_SIZE_EASY;
    mineNumber.value = MINE_NUMBER_EASY;
  }
  initializeParameters(rowSize.value, columnSize.value, mineNumber.value);

  hasGameStarted.value = false;

  await nextTick();

  hasFinishedResizingBoard.value = true;
};
provide("resetBoard", resetBoard);
</script>

<template>
  <MainHeader></MainHeader>
  <main class="wrapper">
    <LevelSelector @change-parameters="resetBoard"></LevelSelector>
    <PlaySection></PlaySection>
    <BottomSection></BottomSection>
  </main>
</template>
