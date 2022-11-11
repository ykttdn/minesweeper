<script setup lang="ts">
import { inject } from "vue";
import { toggleFlag, touchCell } from "../modules/MainAlgorithm";

defineProps({
    rowNumber: Number,
    columnNumber: Number,
});
const rowSize = inject("rowSize") as number;
const columnSize = inject("columnSize") as number;

const startGame = inject("startGame") as (
    row: number | undefined,
    column: number | undefined
) => void;

const onClickCell = (
    row: number | undefined,
    column: number | undefined,
    rowSize: number,
    columnSize: number
) => {
    if (row === undefined || column === undefined) {
        return;
    }
    touchCell(row, column, rowSize, columnSize);
};

const onContextMenu = (row: number | undefined, column: number | undefined) => {
    if (row === undefined || column === undefined) {
        return;
    }
    toggleFlag(row, column);
};
</script>

<template>
    <div
        :id="`cell-${rowNumber}-${columnNumber}`"
        class="cell cell--unopened"
        @click="
            startGame(rowNumber, columnNumber),
                onClickCell(rowNumber, columnNumber, rowSize, columnSize)
        "
        @contextmenu.prevent="onContextMenu(rowNumber, columnNumber)"
    ></div>
</template>
