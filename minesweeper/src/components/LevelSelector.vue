<script setup lang="ts">
import { ref } from "vue";

const level = ref("easy");
const emit = defineEmits(["changeParameters"]);
const changeLevel = (selectedLevel: string) =>
  emit("changeParameters", selectedLevel);
</script>

<template>
  <div class="level-selection">
    <label for="level">Level:</label>
    <select
      name="level"
      id="level"
      v-model="level"
      @change="changeLevel(level)"
    >
      <option value="easy">EASY</option>
      <option value="normal">NORMAL</option>
      <option value="hard">HARD</option>
    </select>
  </div>
  <span>{{ level }}</span>
</template>
