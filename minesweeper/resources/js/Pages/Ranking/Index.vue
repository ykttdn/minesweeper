<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Head } from "@inertiajs/inertia-vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Score from "@/Components/Score.vue";

defineProps(["scores"]);
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
            <div class="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <Score v-for="score in scores" :key="score.id" :score="score" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
