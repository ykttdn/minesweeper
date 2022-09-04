<script setup lang="ts">
import { inject } from "vue";

const resetBoard = inject("resetBoard") as (newLevel?: string) => void;
</script>

<template>
  <button class="reset-button" @click="resetBoard()"></button>
</template>
