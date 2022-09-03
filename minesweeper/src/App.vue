<script setup lang="ts">
import { nextTick, provide, ref } from "vue";
import MainHeader from "./components/MainHeader.vue";
import LevelSelector from "./components/LevelSelector.vue";
import PlaySection from "./components/PlaySection.vue";
import BottomSection from "./components/BottomSection.vue";
import {
  initializeMines,
  initializeParameters,
  isMineHiddenIn,
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

provide("rowSize", rowSize);
provide("columnSize", columnSize);

const hasFinishedResizingBoard = ref(true);
provide("hasFinishedResizingBoard", hasFinishedResizingBoard);

const hasGameStarted = ref(false);
provide("hasGameStarted", hasGameStarted);

const startGame = (
  rowClickedFirst: number | undefined,
  columnClickedFirst: number | undefined
) => {
  if (
    !hasGameStarted.value &&
    rowClickedFirst !== undefined &&
    columnClickedFirst !== undefined
  ) {
    console.log("Game Started");
    hasGameStarted.value = true;
    initializeParameters(rowSize.value, columnSize.value);
    initializeMines(
      rowSize.value,
      columnSize.value,
      mineNumber.value,
      rowClickedFirst,
      columnClickedFirst
    );
    console.log(isMineHiddenIn);
  }
};
provide("startGame", startGame);

const changeParameters = async (newLevel: string) => {
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

  hasGameStarted.value = false;

  console.log(
    `Level changed to ${newLevel}\n\trow size: ${rowSize.value}\n\tcolumn size: ${columnSize.value}\n\tmine number: ${mineNumber.value}`
  );

  await nextTick();

  hasFinishedResizingBoard.value = true;
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
