<script setup lang="ts">
import { toggleFlagMode } from "../modules/MainAlgorithm";

const onClickToggleButton = () => {
    toggleFlagMode();
};
</script>

<template>
    <div class="bottom-area">
        <div class="switch" @click="onClickToggleButton"></div>
        <div class="flag-icon"></div>
    </div>
</template>
