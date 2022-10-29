<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Score from "@/Components/Score.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { useForm, Head } from "@inertiajs/inertia-vue3";

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
        <div class="wrapper">
            <div class="play-area">
                <div class="top-area">
                    <div class="mine-counter">000</div>
                    <button class="reset-button"></button>
                    <div class="timer">000</div>
                </div>
                <div class="board">
                    <div v-for="row in 9" :key="row" class="row">
                        <div
                            v-for="column in 9"
                            :key="column"
                            class="cell cell--unopened"
                        ></div>
                    </div>
                </div>
            </div>
        </div>

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
                <Score v-for="score in scores" :key="score.id" :score="score" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
