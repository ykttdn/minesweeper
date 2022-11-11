<script setup lang="ts">
import { inject } from "vue";
import BaseCell from "./BaseCell.vue";
defineProps({
    rowNumber: Number,
});
const columnSize = inject("columnSize");
</script>

<template>
    <div class="row">
        <BaseCell
            v-for="columnNumber in columnSize"
            :key="columnNumber"
            :row-number="rowNumber"
            :column-number="columnNumber - 1"
        ></BaseCell>
    </div>
</template>
