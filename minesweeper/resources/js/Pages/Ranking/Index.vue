<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Head } from "@inertiajs/inertia-vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Score from "@/Components/Score.vue";

defineProps(["rankingEasy", "rankingNormal", "rankingHard"]);
</script>

<template>
    <Head>
        <title>Ranking</title>

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
        <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            EASY
            <div class="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <Score
                    v-for="score in rankingEasy"
                    :key="score.id"
                    :score="score"
                    :showsLevel="false"
                />
            </div>
        </div>
        <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            NORMAL
            <div class="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <Score
                    v-for="score in rankingNormal"
                    :key="score.id"
                    :score="score"
                    :showsLevel="false"
                />
            </div>
        </div>
        <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            HARD
            <div class="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <Score
                    v-for="score in rankingHard"
                    :key="score.id"
                    :score="score"
                    :showsLevel="false"
                />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
