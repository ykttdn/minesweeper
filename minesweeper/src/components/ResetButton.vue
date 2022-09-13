<script setup lang="ts">
import { inject } from "vue";

const currentLevel = inject("level") as string;
const resetBoard = inject("resetBoard") as (newLevel: string) => void;
</script>

<template>
  <button
    class="reset-button face-normal"
    @click="resetBoard(currentLevel)"
  ></button>
</template>
