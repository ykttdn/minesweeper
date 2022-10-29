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
    <Head title="Minesweeper" />

    <AuthenticatedLayout>
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
