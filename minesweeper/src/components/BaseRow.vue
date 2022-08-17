<script setup lang="ts">
import { inject } from "vue";
import BaseCell from "./BaseCell.vue";

const columnSize = inject("columnSize");
</script>

<template>
  <div class="row">
    <BaseCell v-for="columnNumber in columnSize" :key="columnNumber"></BaseCell>
  </div>
</template>
