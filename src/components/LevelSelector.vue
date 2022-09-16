<script setup lang="ts">
import { inject } from "vue";

const selectedLevel = inject("level") as string;
const emit = defineEmits(["changeParameters"]);
const changeLevel = (newLevel: string) => emit("changeParameters", newLevel);
</script>

<template>
  <div class="level-selection">
    <label for="level">Level:</label>
    <select
      name="level"
      id="level"
      v-model="selectedLevel"
      @change="changeLevel(selectedLevel)"
    >
      <option value="easy">EASY</option>
      <option value="normal">NORMAL</option>
      <option value="hard">HARD</option>
    </select>
  </div>
</template>
