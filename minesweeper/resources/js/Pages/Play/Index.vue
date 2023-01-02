<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { computed, nextTick, provide, ref } from "vue";
import LevelSelector from "./Minesweeper/components/LevelSelector.vue";
import PlaySection from "./Minesweeper/components/PlaySection.vue";
import BottomSection from "./Minesweeper/components/BottomSection.vue";
import {
    initializeMines,
    initializeParameters,
    isFlagModeOn,
} from "./Minesweeper/modules/MainAlgorithm";
import {
    COLUMN_SIZE_EASY,
    COLUMN_SIZE_HARD,
    COLUMN_SIZE_NORMAL,
    MINE_NUMBER_EASY,
    MINE_NUMBER_HARD,
    MINE_NUMBER_NORMAL,
    ROW_SIZE_EASY,
    ROW_SIZE_HARD,
    ROW_SIZE_NORMAL,
} from "./Minesweeper/modules/GameParameters";
import Score from "@/Components/Score.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { useForm, Head } from "@inertiajs/inertia-vue3";

const rowSize = ref(ROW_SIZE_EASY);
const columnSize = ref(COLUMN_SIZE_EASY);
const mineNumber = ref(MINE_NUMBER_EASY);
const displayedMineNumber = computed(() => {
    if (mineNumber.value <= -100) {
        return "-99";
    } else if (mineNumber.value <= -10) {
        return `${mineNumber.value}`;
    } else if (mineNumber.value <= -1) {
        return `- ${-mineNumber.value}`;
    } else if (mineNumber.value <= 9) {
        return `00${mineNumber.value}`;
    } else if (mineNumber.value <= 99) {
        return `0${mineNumber.value}`;
    } else if (mineNumber.value <= 999) {
        return `${mineNumber.value}`;
    } else {
        return "999";
    }
});

provide("rowSize", rowSize);
provide("columnSize", columnSize);
provide("displayedMineNumber", displayedMineNumber);

const hasFinishedResizingBoard = ref(true);
provide("hasFinishedResizingBoard", hasFinishedResizingBoard);

const hasGameStarted = ref(false);
provide("hasGameStarted", hasGameStarted);

const startGame = (
    rowClickedFirst: number | undefined,
    columnClickedFirst: number | undefined
) => {
    if (isFlagModeOn) {
        return;
    }
    if (
        !hasGameStarted.value &&
        rowClickedFirst !== undefined &&
        columnClickedFirst !== undefined
    ) {
        hasGameStarted.value = true;
        initializeMines(
            rowSize.value,
            columnSize.value,
            mineNumber.value,
            rowClickedFirst,
            columnClickedFirst
        );
    }
};
provide("startGame", startGame);

const level = ref("easy");
provide("level", level);

const resetBoard = async (newLevel: string) => {
    hasFinishedResizingBoard.value = false;

    if (newLevel === "normal") {
        rowSize.value = ROW_SIZE_NORMAL;
        columnSize.value = COLUMN_SIZE_NORMAL;
        mineNumber.value = MINE_NUMBER_NORMAL;
    } else if (newLevel === "hard") {
        rowSize.value = ROW_SIZE_HARD;
        columnSize.value = COLUMN_SIZE_HARD;
        mineNumber.value = MINE_NUMBER_HARD;
    } else {
        rowSize.value = ROW_SIZE_EASY;
        columnSize.value = COLUMN_SIZE_EASY;
        mineNumber.value = MINE_NUMBER_EASY;
    }
    initializeParameters(rowSize.value, columnSize.value, mineNumber.value);

    hasGameStarted.value = false;

    await nextTick();

    hasFinishedResizingBoard.value = true;
};
provide("resetBoard", resetBoard);

defineProps(["scores"]);

const result = useForm({
    level: "",
    time: 0,
});
</script>

<template>
    <Head>
        <title>Minesweeper</title>

        <!-- reset CSS -->
        <link
            rel="stylesheet"
            href="https://unpkg.com/ress/dist/ress.min.css"
        />

        <!-- Google Fonts - Roboto Mono -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Philosopher:wght@700&family=Roboto+Mono:wght@700&display=swap"
            rel="stylesheet"
        />
    </Head>

    <AuthenticatedLayout>
        <main class="wrapper">
            <LevelSelector @change-parameters="resetBoard"></LevelSelector>
            <PlaySection></PlaySection>
            <BottomSection></BottomSection>
        </main>

        <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <form
                @submit.prevent="
                    result.post(route('play.store'), {
                        onSuccess: () => result.reset(),
                    })
                "
            >
                <select name="level" id="level" v-model="result.level">
                    <option value="easy">EASY</option>
                    <option value="normal">NORMAL</option>
                    <option value="hard">HARD</option>
                </select>
                <input type="number" v-model="result.time" />
                <PrimaryButton class="mt-4">Send</PrimaryButton>
            </form>

            <div class="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <Score
                    v-for="score in scores"
                    :key="score.id"
                    :score="score"
                    :showsLevel="true"
                    :ranking="0"
                />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
