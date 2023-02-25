<script setup lang="ts">
import { inject } from "vue";
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";

const parameters = useParametersStore();
const { level } = storeToRefs(parameters);

const resetBoard = inject("resetBoard") as (newLevel: string) => void;
</script>

<template>
  <button class="reset-button face-normal" @click="resetBoard(level)"></button>
</template>
