<script setup lang="ts">
import { useParametersStore } from "@/stores/parameters";
import { storeToRefs } from "pinia";

const parameters = useParametersStore();
const { level } = storeToRefs(parameters);

const emit = defineEmits(["changeParameters"]);
const changeLevel = (newLevel: string) => emit("changeParameters", newLevel);
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
</template>
