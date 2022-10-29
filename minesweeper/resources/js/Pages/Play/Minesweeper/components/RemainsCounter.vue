<script setup lang="ts">
import { inject } from "vue";

const displayedMineNumber = inject("displayedMineNumber");
</script>

<template>
    <div class="mine-counter">{{ displayedMineNumber }}</div>
</template>
