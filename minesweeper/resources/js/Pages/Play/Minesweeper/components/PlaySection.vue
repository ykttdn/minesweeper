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
            <RemainsCounter v-if="hasFinishedResizingBoard"></RemainsCounter>
            <ResetButton></ResetButton>
            <TheTimer v-if="hasFinishedResizingBoard"></TheTimer>
        </div>
        <TheBoard v-if="hasFinishedResizingBoard"></TheBoard>
    </div>
</template>
